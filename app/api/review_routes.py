from flask import Blueprint, jsonify, Flask, request
from flask_login import login_required, current_user
from app.models.review import reviews
from app.models.product import Product
from app.models import db, User
from sqlalchemy.orm import sessionmaker, relationship, joinedload
from flask_login import login_required, current_user
from ..forms.review_creater import CreateReview
from datetime import datetime
from sqlalchemy import insert, update, delete


review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:product_id>/reviews')
def reviews_by_productId(product_id):


   """Gets Reviews By Product ID"""
   # reviews = Product.query.get(id).user_reviews
   # print("REVIEWS: ", reviews)


   reviews_records = db.session.query(
       reviews.c.user_id,
       reviews.c.product_id,
       reviews.c.review,
       reviews.c.stars,
       reviews.c.created_at,
       reviews.c.updated_at,
       User.first_name,
       User.last_name
       ).join(User, reviews.columns.user_id == User.id).filter(reviews.columns.product_id == product_id).all()


   # product = Product.query.get(id)
   reviews_array = []
   for record in reviews_records:


       review_obj = {
           "user_id": record.user_id,
           "first_name": record.first_name,
           "last_name": record.last_name,
           "product_id": record.product_id,
           "review": record.review,
           "stars": record.stars,
           "createdAt": record.created_at,
           "updatedAt": record.updated_at
       }


       reviews_array.append(review_obj)
   return jsonify(reviews_array)




@review_routes.route('/<int:product_id>/edit-review/', methods=['GET', 'POST'])
@login_required
def edit_review(product_id):


       """Edit Review for a Product"""


       # reviews_records = db.session.query(reviews).join(User).filter(reviews.columns.product_id == product_id).all()


       # review = reviews_records.find(lambda review: review.user_id == current_user.id)


       # print('PRINT', review)
       # for review in reviews_records:
       #     if review.user_id == current_user.id:
       #         raise Exception('User can only create one review')


       # need to confirm customer has ordered product


       form = CreateReview()


       form['csrf_token'].data = request.cookies['csrf_token']


       if form.validate_on_submit():
           new_review = (
               update(reviews)
               .where(reviews.c.user_id == current_user.id, reviews.c.product_id == product_id)
               .values(
               # product_id=product_id,
               # user_id=current_user.id,
               review = form.data['review'],
               stars = form.data['stars'],
               # created_at = form.data['created_at'],
               updated_at = datetime.utcnow())
               )


           db.session.execute(new_review)
           db.session.commit()


       if form.errors:
           return "Errors in Route"


       return jsonify({ "message" : "Successful edit!"}), 200
       # return    {
       #     "user_id": new_review.user_id,
       #     "product_id": new_review.product_id,
       #     "review": new_review.review,
       #     "stars": new_review.stars,
       #     "createdAt": new_review.created_at,
       #     "updatedAt": new_review.updated_at
       # }




@review_routes.route('/<int:product_id>/create-review', methods=['POST'])
@login_required
def post_review(product_id):


       """Create Review for a Product"""


       # reviews_records = db.session.query(reviews).join(User).filter(reviews.columns.product_id == product_id).all()


       # for review in reviews_records:
       #     if review.user_id == current_user.id:
       #         raise Exception('User can only create one review')


       # need to confirm customer has ordered product


       # .join(User).filter(reviews.columns.product_id == id)


       form = CreateReview()
       # print("PRINT: ", form.data)
       form['csrf_token'].data = request.cookies['csrf_token']


       if form.validate_on_submit():
           new_review = (
               insert(reviews).
               values(
               product_id=product_id,
               user_id=current_user.id,
               review= form.data['review'],
               stars = form.data['stars'],
               created_at = datetime.utcnow(),
               updated_at = datetime.utcnow())
               )


           # print('PRINT', new_review)
           db.session.execute(new_review)
           db.session.commit()


       if form.errors:
           return "Errors in Route"


       return "Successful create!"


       # return    {
       #     "user_id": new_review.user_id,
       #     "product_id": new_review.product_id,
       #     "review": new_review.review,
       #     "stars": new_review.stars,
       #     "createdAt": new_review.created_at,
       #     "updatedAt": new_review.updated_at
       # }


@review_routes.route('/<int:product_id>/delete-review', methods=['DELETE'])
@login_required
def delete_review(product_id):
       """Delete Review for a Product"""
   # table.delete().where(table.c.id==7)
       # stmt = reviews.delete().where(reviews.c.user_id == current_user.id and reviews.c.product_id == product_id)
       # delete_review = reviews.delete().where(reviews.c.user_id == current_user.id and reviews.c.product_id == product_id)
       deleted_review = (
           delete(reviews)
           .where(reviews.c.user_id == current_user.id, reviews.c.product_id == product_id)
       )
       db.session.execute(deleted_review)
       db.session.commit()


       print("deleted: ", deleted_review)
       return jsonify({"message": "Review deleted"}), 200
