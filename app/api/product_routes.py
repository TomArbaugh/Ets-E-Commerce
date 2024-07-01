from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_products():
    """
    Get all products
    """
    all_products = Product.query.all()
    return {"products" : [product.to_dict() for product in all_products]}

@product_routes('/<int:product_id>')
def get_product_by_id(product_id):
    """
    Get a product by ID
    """
    product = Product.query.get(id)
    if product is None:
      return {'errors': {'message': 'Product not found'}}, 404
    return product.to_dict()





  
    

