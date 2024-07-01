from flask import Blueprint, jsonify, redirect
from flask_login import login_required, current_user
from app.models import Product, db
from app.forms import ProductForm

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_products():
    """
    Get all products
    """
    all_products = Product.query.all()
    return {"products": [product.to_dict() for product in all_products]}

@product_routes.route('/<int:product_id>')
def get_product_by_id(product_id):
    """
    Get a product by ID
    """
    product = Product.query.get(product_id)
    if product is None:
      return {'errors': {'message': 'Product not found'}}, 404
    return product.to_dict()

@product_routes.route('/', methods=['GET', 'POST'])
@login_required
def creat_product():
    """
    Create product
    """
    form = ProductForm()
    if form.validate_on_sumbit():
        new_product = Product(
            owner_id=current_user.id,
            name=form.data['Name'],
            category=form.data['Category'],
            description=form.data['Description'],
            price=form.data['Price'],
            stock=form.data['Stock']
        )
        db.session.add(new_product)
        db.session.commit()
        return redirect('/')
    if form.errors():
        return {'errors': form.errors}, 40
    
@product_routes.route('/current')
@login_required
def get_user_products():
    """
    Get all product by current logged-in user
    """
    user_id = current_user.id
    user_products = Product.query.filter_by(owner_id=user_id).all()
    return {"products": [product.to_dict() for product in user_products]}



  
    

