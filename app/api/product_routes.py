from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import Product, ProductImage, db
from app.forms import ProductForm, ProductImageForm
from app.api.AWS_helpers  import (
    upload_file_to_s3, get_unique_filename)

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_products():
    """
    Get all products
    """
    all_products = Product.query.order_by(Product.created_at.desc()).all()
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

@product_routes.route('/', methods=['POST'])
@login_required
def create_product():
    """
    Create product
    """

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_product = Product(
            owner_id=current_user.id,
            name=form.data['name'],
            category=form.data['category'],
            description=form.data['description'],
            price=form.data['price'],
            stock=form.data['stock']
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict(), 201  
    else:
        return {'errors': form.errors}, 400

@product_routes.route('/<int:product_id>', methods=['GET', 'PUT'])
@login_required
def update_product(product_id):
    """
    Update a product by ID (only accessible to the creator of the product)
    """
    product = Product.query.get(product_id)
    if product is None:
        return {'errors': {'message': 'Product not found'}}, 404
    if product.owner_id != current_user.id:
        return {'errors': {'message': 'You are not authorized'}}, 403
    if request.method == 'GET':
        return product.to_dict()
    
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product.name = form.data['name']
        product.category = form.data['category']
        product.description = form.data['description']
        product.price = form.data['price']
        product.stock = form.data['stock']
        db.session.commit()
        return product.to_dict()
    
    if form.errors:
        return {'errors': form.errors}, 400
    
@product_routes.route('/current')
@login_required
def get_user_products():
    """
    Get all product by current logged-in user
    """
    user_id = current_user.id
    user_products = Product.query.filter_by(owner_id=user_id).all()
    return {"products": [product.to_dict() for product in user_products]}

@product_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product(product_id):
    """
    Delete a product by current logged-in user
    """
    product = Product.query.get(product_id)
    if product is None:
      return {'errors': {'message': 'Product not found'}}, 404

    if product.owner_id != current_user.id:
        return {'errors': {'message': 'You are not authorized'}}, 403
    
    db.session.delete(product)
    db.session.commit()
    return {'message': 'Product delete successfully'}

@product_routes.route('/<int:product_id>/images')
def get_all_product_images(product_id):
    """
    Get product images by product id
    """
    images = ProductImage.query.filter_by(product_id=product_id).all()
    return {"images": [image.to_dict() for image in images]}

@product_routes.route('/<int:product_id>/images', methods=['POST'])
@login_required
def upload_product_image(product_id):
    """
    Upload image
    """
    product = Product.query.get(product_id)
    if product is None:
        return {'errors': {'message': 'Product not found'}}, 404

    if product.owner_id != current_user.id:
        return {'errors': {'message': 'You are not authorized'}}, 403

    form = ProductImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message (and we printed it above)
            return {'errors': upload['errors']}, 400

        url = upload["url"]
        new_image = ProductImage(product_id=product_id, url=url)
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict(), 201
    else:
        return {'errors': form.errors}, 400

    # if form.validate_on_submit():
    #     new_image = ProductImage(
    #         product_id = product_id,
    #         url = form.data['url']
    #     )
    #     db.session.add(new_image)
    #     db.session.commit()
    #     return new_image.to_dict(), 201
    # else:
    #     print("Form validation failed:", form.errors)  
    # return {'errors': form.errors}, 400


