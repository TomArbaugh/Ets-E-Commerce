from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    reviews = [
        
    ]
    review1 = Review(
        product1=1, user_id=2, review='Good', stars=4, created_at=datetime.utcnow, updated_at=datetime.utcnow)
    review2 = Review(
        product1=2, user_id=2, review='Fair', stars=3, created_at=datetime.utcnow, updated_at=datetime.utcnow)
    review3 = Review(
        product1=3, user_id=2, review='Bad', stars=2, created_at=datetime.utcnow, updated_at=datetime.utcnow)
    review4 = Review(
        product1=3, user_id=3, review='Excellent', stars=5, created_at=datetime.utcnow, updated_at=datetime.utcnow)
    review5 = Review(
        product1=3, user_id=3, review='Aweful', stars=1, created_at=datetime.utcnow, updated_at=datetime.utcnow)
    review6 = Review(
        product1=3, user_id=3, review='Not Bad', stars=3, created_at=datetime.utcnow, updated_at=datetime.utcnow)
    review7 = Review(
        product1=3, user_id=1, review='OK', stars=3, created_at=datetime.utcnow, updated_at=datetime.utcnow)
    review8 = Review(
        product1=3, user_id=1, review='Best', stars=5, created_at=datetime.utcnow, updated_at=datetime.utcnow)
    review9 = Review(
        product1=3, user_id=1, review='Worst', stars=1, created_at=datetime.utcnow, updated_at=datetime.utcnow)
    review10 = Review(
        product1=3, user_id=1, review='Barely Serviceable', stars=2, created_at=datetime.utcnow, updated_at=datetime.utcnow)

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
