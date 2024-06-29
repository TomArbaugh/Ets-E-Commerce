from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from ..models.review import reviews

def seed_reviews():
    review_values = [
        {'product_id': 1, 'user_id': 2, 'review': 'Good', 'stars': 4, 'created_at': datetime.utcnow(), 'updated_at':datetime.utcnow()},
        {'product_id': 2, 'user_id': 2, 'review': 'Fair', 'stars': 3, 'created_at': datetime.utcnow(), 'updated_at':datetime.utcnow()},
        {'product_id': 3, 'user_id': 2, 'review': 'Bad', 'stars': 2, 'created_at': datetime.utcnow(), 'updated_at':datetime.utcnow()},
        {'product_id': 4, 'user_id': 3, 'review': 'Excellent', 'stars': 5, 'created_at': datetime.utcnow(), 'updated_at':datetime.utcnow()},
        {'product_id': 5, 'user_id': 3, 'review': 'Awful', 'stars': 1, 'created_at': datetime.utcnow(), 'updated_at':datetime.utcnow()},
        {'product_id': 6, 'user_id': 3, 'review': 'Not bad', 'stars': 3, 'created_at': datetime.utcnow(), 'updated_at':datetime.utcnow()},
        {'product_id': 7, 'user_id': 1, 'review': 'OK', 'stars': 3, 'created_at': datetime.utcnow(), 'updated_at':datetime.utcnow()},
        {'product_id': 8, 'user_id': 1, 'review': 'Best', 'stars': 5, 'created_at': datetime.utcnow(), 'updated_at':datetime.utcnow()},
        {'product_id': 9, 'user_id': 1, 'review': 'Worst', 'stars': 1, 'created_at': datetime.utcnow(), 'updated_at':datetime.utcnow()},
        {'product_id': 10, 'user_id': 1, 'review': 'Barely serviceable', 'stars': 2, 'created_at': datetime.utcnow(), 'updated_at':datetime.utcnow()},
    ]

    db.session.execute(reviews.insert(), review_values)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
