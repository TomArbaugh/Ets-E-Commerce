from flask import Blueprint, jsonify
from flask_login import login_required
from app.models.review import reviews
from app.models.product import Product

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>/reviews')
def reviews_by_productId(id):
    # reviews = Product.query.all()
    return "<h1>TEST</h1>"
