from flask import Blueprint, jsonify, request, flash
from flask_login import login_required, current_user
from app.models import CartItem, Product, db
from app.forms import CartItemForm


cart_item_routes = Blueprint('cart_items', __name__)


@cart_item_routes.route('/add/<int:product_id>', methods=['POST'])
@login_required
def add_product_to_cart(product_id):
  """ Add item to shopping cart """
  form = CartItemForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
      quantity = form.data['quantity']
      shopping_cart = current_user.shopping_cart
      product = Product.query.get(product_id)
      if product is None:
          flash('Product does not exist')
          return {'errors': {'message': 'Product not found'}}, 404


      cart_item = CartItem.query.filter_by(shopping_cart_id=shopping_cart.id, product_id=product_id).first()
      if cart_item:
          cart_item.quantity += quantity
      else:
          cart_item = CartItem(shopping_cart_id=shopping_cart.id, product_id=product_id, quantity=quantity)
          db.session.add(cart_item)
      db.session.commit()
      flash('Product added to cart successfully')
      return cart_item.to_dict(), 201 
  if form.errors:
      flash('Fail to add product to cart')
      return {'errors': form.errors}, 400


@cart_item_routes.route('/<int:cart_item_id>', methods=['DELETE'])
@login_required
def delete_cart_item(cart_item_id):
  """
  remove item from shopping cart
  """
  cart_item = CartItem.query.get(cart_item_id)
  if cart_item is None:
      return {'errors': {'message': 'Cart Item not found'}}, 404

  shopping_cart = current_user.shopping_cart
  print(shopping_cart)
  if cart_item.shopping_cart_id != shopping_cart.id:
      return {'errors': {'message': 'You are not authorized'}}, 403

  db.session.delete(cart_item)
  db.session.commit()
  return {'message': 'Cart Item delete successfully'}


