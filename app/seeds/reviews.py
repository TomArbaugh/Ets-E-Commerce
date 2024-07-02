from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    review1 = Review(
        product_id=1, user_id=2, review='Good', stars=4, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    review2 = Review(
        product_id=2, user_id=2, review='Fair', stars=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    review3 = Review(
        product_id=3, user_id=2, review='Bad', stars=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    review4 = Review(
        product_id=4, user_id=3, review='Excellent', stars=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    review5 = Review(
        product_id=5, user_id=3, review='Awful', stars=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    review6 = Review(
        product_id=6, user_id=3, review='Not bad', stars=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    review7 = Review(
        product_id=7, user_id=1, review='OK', stars=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    review8 = Review(
        product_id=8, user_id=1, review='Best', stars=5, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    review9 = Review(
        product_id=9, user_id=1, review='Worst', stars=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    review10 = Review(
        product_id=10, user_id=1, review='Barely serviceable', stars=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())

    db.session.add_all([review1, review2, review3, review4, review5, review6, review7, review8, review9, review10])
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()

