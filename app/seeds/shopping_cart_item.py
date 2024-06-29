from app.models import db, shopping_cart_item, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shopping_cart_items():
    cart1 = shopping_cart_item(
        user_id=1, product_id=[7, 8, 9, 10], quantity=1)
    cart2 = shopping_cart_item(
        user_id=2, product_id=[1, 2, 3], quantity=1)
    cart3 = shopping_cart_item(
        user_id=1, product_id=[4, 5, 6], quantity=1)

    db.session.add(cart1)
    db.session.add(cart2)
    db.session.add(cart3)
    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_cart_items"))

    db.session.commit()
