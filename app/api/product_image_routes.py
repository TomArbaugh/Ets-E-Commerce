from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, ProductImage, db
from app.forms import ProductForm, ProductImageForm


product_image_routes = Blueprint('product_images', __name__)


@product_image_routes.route('/<int:image_id>', methods=['GET', 'PUT'])
@login_required
def update_product_image(image_id):
  """
  Update image
  """
  image = ProductImage.query.get(image_id)
  if image is None:
      return {'errors': {'message': 'Image not found'}}, 404
  
  product = Product.query.get(image.product_id)

  # if product is None:
  #     return {'errors': {'message': 'Product not found'}}, 404
  if product.owner_id != current_user.id:
      return {'errors': {'message': 'You are not authorized'}}, 403
  if request.method == 'GET':
      return image.to_dict()

  form = ProductImageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
      image.url = form.data['url']
      db.session.commit()
      return image.to_dict()
  if form.errors:
      return {'errors': form.errors}, 400


@product_image_routes.route('/<int:image_id>', methods=['DELETE'])
@login_required
def delete_image(image_id):
  image = ProductImage.query.get(image_id)
  if image is None:
      return {'errors': {'message': 'Image not found'}}, 404

  product = Product.query.get(image.product_id)  
  if product.owner_id != current_user.id:
      return {'errors': {'message': 'You are not authorized'}}, 403  
  db.session.delete(image)
  db.session.commit()
  return {'message': 'Image delete successfully'}
