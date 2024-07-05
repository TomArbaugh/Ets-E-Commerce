from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Order, db

order_routes = Blueprint('orders', __name__)

@order_routes.route('/')
@login_required
def orders_by_userId():
    """Gets Orders By User ID"""

    orders = Order.query.filter_by(purchaser_id = current_user.id).all()

    orders_array = []
    # order_items_array = []
    for order in orders:
        # order_items = db.session.query(order_items).join(Order).filter(order_items.columns.order_id == order.id).all()

        # for order_item in order_items:
        #     order_item_obj = {
        #         'order_id': order_item.order_id,
        #         'product_id': order_item.product_id,
        #         'quantity': order_item.quantity
        #     }
        #     order_items_array.append(order_item_obj)

        order_obj = {
            'id': order.id,
            'purchaser_id': order.purchaser_id,
            'total': order.total,
            'discount': order.discount,
            'status': order.status,
            'products_ordered': [order.to_dict() for order in order.products_ordered]
            # 'order_items':  order_items
        }
        orders_array.append(order_obj)
    # print("ORDERS", orders)
    # print("user", current_user.id)
    return  orders_array
        


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
