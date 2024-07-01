from flask import Blueprint, jsonify, Flask
from flask_login import login_required
from app.models.review import reviews
from app.models.product import Product
from sqlalchemy.orm import sessionmaker, relationship, joinedload

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>/reviews')
def reviews_by_productId(id):
    reviews = Product.query.get(id)
    print("REVIEWS: ", reviews)
    return reviews.to_dict()
