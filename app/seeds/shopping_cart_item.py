from app.models import db, shopping_cart_item, environment, SCHEMA
from sqlalchemy.sql import text
from ..models.shopping_cart_item import shopping_cart_items

def seed_shopping_cart_items():
    items = [
        {'user_id': 1, 'product_id': 7, 'quantity': 1},
        {'user_id': 1, 'product_id': 8, 'quantity': 5},
        {'user_id': 1, 'product_id': 9, 'quantity': 2},
        {'user_id': 1, 'product_id': 10, 'quantity': 3},
        {'user_id': 2, 'product_id': 1, 'quantity': 1},
        {'user_id': 2, 'product_id': 2, 'quantity': 2},
        {'user_id': 2, 'product_id': 3, 'quantity': 3},
        {'user_id': 3, 'product_id': 4, 'quantity': 2},
        {'user_id': 3, 'product_id': 5, 'quantity': 3},
        {'user_id': 3, 'product_id': 6, 'quantity': 3},
    ]

    db.session.execute(shopping_cart_items.insert(), items)
    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_cart_items"))

    db.session.commit()
