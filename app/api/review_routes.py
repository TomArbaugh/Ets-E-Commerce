from flask import Blueprint, jsonify, Flask
from flask_login import login_required
from app.models.review import reviews
from app.models.product import Product
from app.models import db, User
from sqlalchemy.orm import sessionmaker, relationship, joinedload
from flask_login import login_required, current_user
from ..forms.review_creater import CreateReview
from datetime import datetime
from sqlalchemy import insert, update, delete

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>/reviews')
def reviews_by_productId(id):

    """Gets Reviews By Product ID"""
    # reviews = Product.query.get(id).user_reviews
    # print("REVIEWS: ", reviews)

    reviews_records = db.session.query(reviews).join(User).filter(reviews.columns.product_id == id).all()

    # product = Product.query.get(id)
    reviews_array = []
    for review in reviews_records:

       review_obj = {
        "userId": review.user_id,
        "productId": review.product_id,
        "review": review.review,
        "stars": review.stars,
        "createdAt": review.created_at,
        "updatedAt": review.updated_at
    }

    reviews_array.append(review_obj)
    return reviews_array

@review_routes.route('/<int:id>/edit-review', methods=['GET', 'POST'])
@login_required
def edit_review(id):

        """Edit Review for a Product"""

        reviews_records = db.session.query(reviews).join(User).filter(reviews.columns.product_id == id).all()

        for review in reviews_records:
            if review.user_id == current_user.id:
                raise Exception('User can only create one review')

        # need to confirm customer has ordered product

        form = CreateReview()

        if form.validate_on_submit():
            new_review = (
                update(user_reviews).
                where(user_reviews.c.product_id == id).
                values(
                product_id=id,
                user_id=current_user.id,
                reviews= form.data['reveiws'],
                stars = form.data['stars'],
                created_at = form.data['created_at'],
                updated_at = datetime.utcnow())
                )

            db.session.commit()

        if form.errors:
            return "Errors in Route"

        return    {
            "userId": new_review.user_id,
            "productId": new_review.product_id,
            "review": new_review.review,
            "stars": new_review.stars,
            "createdAt": new_review.created_at,
            "updatedAt": new_review.updated_at
        }


@review_routes.route('/<int:id>/create-review', methods=['POST'])
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
            new_review = (
                insert(reviews).
                values(
                product_id=id,
                user_id=current_user.id,
                review= form.data['reveiw'],
                stars = form.data['stars'],
                created_at = datetime.utcnow(),
                updated_at = datetime.utcnow())
                )

            db.session.execute(new_review)
            db.session.commit()

        if form.errors:
            return "Errors in Route"

        return    {
            "userId": new_review.user_id,
            "productId": new_review.product_id,
            "review": new_review.review,
            "stars": new_review.stars,
            "createdAt": new_review.created_at,
            "updatedAt": new_review.updated_at
        }
