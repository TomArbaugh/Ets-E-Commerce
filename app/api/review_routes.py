# from flask import Blueprint, jsonify, Flask
# from flask_login import login_required
# from app.models.review import reviews
# from app.models.product import Product
# from app.models import db, User
# from sqlalchemy.orm import sessionmaker, relationship, joinedload

# review_routes = Blueprint('reviews', __name__)

# @review_routes.route('/<int:id>/reviews')
# def reviews_by_productId(id):
#     # reviews = Product.query.get(id).user_reviews
#     # print("REVIEWS: ", reviews)

#     reviews_records = db.session.query(reviews).join(User).filter(reviews.columns.product_id == id).all()

#     # product = Product.query.get(id)
#     for review in reviews_records:

#       return {
#         "userId": review.user_id,
#         "productId": review.product_id,
#         "review": review.review,
#         "stars": review.stars,
#         "createdAt": review.created_at,
#         "updatedAt": review.updated_at
#     }
