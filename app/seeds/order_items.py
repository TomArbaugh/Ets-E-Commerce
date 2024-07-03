from app.models import db, order_items, environment, SCHEMA
from sqlalchemy.sql import text
from ..models.order_items import order_items

def seed_order_items():
    order_items_values = [
        {'order_id': 1, 'product_id': 7, 'quantity': 1},
        {'order_id': 1, 'product_id': 8, 'quantity': 5},
        {'order_id': 1, 'product_id': 9, 'quantity': 2},
        {'order_id': 1, 'product_id': 10, 'quantity': 3},
        {'order_id': 2, 'product_id': 1, 'quantity': 1},
        {'order_id': 2, 'product_id': 2, 'quantity': 2},
        {'order_id': 2, 'product_id': 3, 'quantity': 3},
        {'order_id': 3, 'product_id': 4, 'quantity': 2},
        {'order_id': 3, 'product_id': 5, 'quantity': 3},
        {'order_id': 3, 'product_id': 6, 'quantity': 3},
    ]

    db.session.execute(order_items.insert(), order_items_values)
    db.session.commit()

def undo_order_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_items"))

    db.session.commit()
