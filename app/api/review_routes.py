from flask import Blueprint, jsonify, Flask
from flask_login import login_required
from app.models.review import reviews
from app.models.product import Product
from app.models import db, User
from sqlalchemy.orm import sessionmaker, relationship, joinedload
from flask_login import login_required, current_user
from ..forms.review_creater import CreateReview
from datetime import datetime

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>/reviews')
def reviews_by_productId(id):

    """Gets Reviews By Product ID"""
    # reviews = Product.query.get(id).user_reviews
    # print("REVIEWS: ", reviews)

    reviews_records = db.session.query(reviews).join(User).filter(reviews.columns.product_id == id).all()

    # product = Product.query.get(id)
    for review in reviews_records:

       return {
        "userId": review.user_id,
        "productId": review.product_id,
        "review": review.review,
        "stars": review.stars,
        "createdAt": review.created_at,
        "updatedAt": review.updated_at
    }

@review_routes.route('/<int:id>/review', methods=['GET', 'POST'])

@login_required
def post_review(id):
       
        """Create Review for a Product"""

        reviews_records = db.session.query(reviews).join(User).filter(reviews.columns.product_id == id).all()

        for review in reviews_records:
            if review.user_id == current_user.id:
                raise Exception('User can only create one review')
        
        # need to confirm customer has ordered product

        form = CreateReview()

        if form.validate_on_submit():
            review = reviews.insert().values(
                product_id = id,
                user_id = form.data['user_id'],
                stars = form.data['stars'],
                reviews = form.data['reviews'],
                created_at = datetime.utcnow(),
                updated_at = datetime.utcnow()
            )
             
            db.session.add(review)
            db.session.commit()

        if form.errors:
            return "Errors in Route"
        
        return    {
            "userId": review.user_id,
            "productId": review.product_id,
            "review": review.review,
            "stars": review.stars,
            "createdAt": review.created_at,
            "updatedAt": review.updated_at
        }
        


        

