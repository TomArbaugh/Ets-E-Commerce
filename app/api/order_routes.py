from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Order, OrderItem, CartItem, ShoppingCart, db
from sqlalchemy import insert
from app.models.order_items import order_items

order_routes = Blueprint('orders', __name__)

@order_routes.route('/')
@login_required
def orders_by_userId():
    """Gets Orders By User ID"""

    orders = Order.query.filter_by(purchaser_id = current_user.id).all()

    orders_array = []
    for order in orders:

        order_obj = {
            'id': order.id,
            'purchaser_id': order.purchaser_id,
            'total': order.total,
            'discount': order.discount,
            'status': order.status,
            'products_ordered': [order.to_dict() for order in order.products_ordered]
        }
        orders_array.append(order_obj)
    print("ORDERS", orders)
    print("user", current_user.id)
    return orders_array

@order_routes.route('/checkout', methods=['POST'])
@login_required
def checkout_items():
    
    shopping_cart = ShoppingCart.query.filter_by(user_id=current_user.id)
    if shopping_cart is None:
        return {'errors': {'message': 'Shopping Cart not found'}}, 404
    
    new_order = Order(
        purchaser_id=current_user.id,
        total=calculate_total(shopping_cart), 
        status='Pending'
    )
    db.session.add(new_order)
    db.session.commit()

    cart_items = CartItem.query.filter_by(shopping_cart_id=shopping_cart.id).all()
    for cart_item in cart_items:
        order_item = (
            insert(order_items).
            values(
            order_id=new_order.id,
            product_id=cart_item.product_id,
            quantity=cart_item.quantity
            )
        )
        db.session.execute(order_item)
        db.session.delete(cart_item)
    db.session.commit()

    return new_order.to_dict(), 201

def calculate_total(shopping_cart): 
    total = 0
    for item in shopping_cart.cart_items:
        total += item.product.price * item.quantity
    return total

@order_routes.route('/<int:id>/delete-order', methods=['DELETE'])
@login_required
def delete_order(id):
    """Delete an Order by Order ID"""

    order = Order.query.get(id)
    if order is None:
        return {'errors': {'message': 'Order not found'}}, 404

    # if order.purchaser_id != current_user.id:
    #     return {'errors': {'message': 'You are not authorized'}}, 403

    print("ORDER: ", order)
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order canceled'})
