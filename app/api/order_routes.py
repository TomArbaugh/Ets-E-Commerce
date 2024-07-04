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
    for order in orders:

        order_obj = {
            'id': order.id,
            'purchaser_id': order.purchaser_id,
            'total': order.total,
            'discount': order.discount,
            'status': order.status
        }
        orders_array.append(order_obj)
    print("ORDERS", orders)
    return orders_array

@order_routes.route('/<int:id>/delete-order', methods=['DELETE'])
@login_required
def delete_order(id):
    """Delete an Order by Order ID"""

    order = Order.query.get(id)
    if order is None:
        return {'errors': {'message': 'Order not found'}}, 404

    if order.purchaser_id != current_user.id:
        return {'errors': {'message': 'You are not authorized'}}, 403

    print("ORDER: ", order)
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order canceled'})
