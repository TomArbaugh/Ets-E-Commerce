from flask import Blueprint, jsonify, request,flash, redirect, url_for
from flask_login import login_required, current_user
from app.models import CartItem, ShoppingCart, Product, db
from app.forms import CartItemForm

cart_item_routes = Blueprint('cart_items', __name__)

@cart_item_routes('/add/<int:product_id>', method = ['POST'])
@login_required
def add_product_to_cart(product_id):
    """
    Add item to shopping cart
    """
    form = CartItemForm()
    if form.validate_on_submit():
        quantity = form.data['quantity']
        shopping_cart = current_user.shopping_cart
        product = Product.query.get(product_id)
        if not product:
            flash('product id not exist')
            redirect('/products/product_id')

        cart_item = CartItem.query.filter_by(shopping_cart_id=shopping_cart.id, product_id=product_id).first()
        if cart_item:
            cart_item.quantity += quantity
        else:
            cart_item = CartItem(shopping_cart_id=shopping_cart.id, product_id=product_id, quantity=quantity)
            db.session.add(cart_item)
        db.session.commit()
        flash('Product added to cart successfully', 'success')
        return redirect(f'/shopping_carts/{shopping_cart.id}/cart_items')
    
    flash('Fail to add product to shopping cart, choose another product')
    return redirect('/products')

  