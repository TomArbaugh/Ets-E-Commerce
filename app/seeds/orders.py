from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text

def seed_orders():
    order1 = Order(
        purchaser_id=1, total=122.81, discount=0, status='pending')
    order2 = Order(
        purchaser_id=2, total=85.45, discount=0, status='pending')
    order3 = Order(
        purchaser_id=3, total=107.34, discount=0, status='pending')

    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)
    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
