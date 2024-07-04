from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_cart_items():
    cart_item1 = CartItem(shopping_cart_id=1, product_id=7, quantity=1)
    cart_item2 = CartItem(shopping_cart_id=1, product_id=8, quantity=5)
    cart_item3 = CartItem(shopping_cart_id=1, product_id=9, quantity=2)
    cart_item4 = CartItem(shopping_cart_id=1, product_id=10, quantity=3)
    cart_item5 = CartItem(shopping_cart_id=2, product_id=1, quantity=1)
    cart_item6 = CartItem(shopping_cart_id=2, product_id=2, quantity=2)
    cart_item7 = CartItem(shopping_cart_id=2, product_id=3, quantity=3)
    cart_item8 = CartItem(shopping_cart_id=3, product_id=4, quantity=2)
    cart_item9 = CartItem(shopping_cart_id=3, product_id=5, quantity=3)
    cart_item10 = CartItem(shopping_cart_id=3, product_id=6, quantity=3)

    db.session.add(cart_item1)
    db.session.add(cart_item2)
    db.session.add(cart_item3)
    db.session.add(cart_item4)
    db.session.add(cart_item5)
    db.session.add(cart_item6)
    db.session.add(cart_item7)
    db.session.add(cart_item8)
    db.session.add(cart_item9)
    db.session.add(cart_item10)
    db.session.commit()

def undo_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))

    db.session.commit()