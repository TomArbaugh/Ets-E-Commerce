from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import CartItem, ShoppingCart, db

shopping_cart_routes = Blueprint('shopping_cart', __name__)
@shopping_cart_routes.route('/<int:shopping_cart_id>/cart_items')
@login_required
def get_cart_items(shopping_cart_id):
    shopping_cart = ShoppingCart.query.get(shopping_cart_id)
    if shopping_cart is None:
        return {'errors': {'message': 'Shopping Cart not found'}}, 404
    cart_items = CartItem.query.filter_by(shopping_cart_id=shopping_cart_id).all()
    return {"cart_items": [item.to_dict() for item in cart_items]}, 200

#  cart_items_with_product_details = []
#     for item in cart_items:
#         product = Product.query.get(item.product_id)
#         item_dict = item.to_dict()
#         item_dict['product'] = product.to_dict() if product else None
#         cart_items_with_product_details.append(item_dict)

#     return {"cart_items": cart_items_with_product_details}, 200
