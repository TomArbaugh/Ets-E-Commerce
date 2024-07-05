from app.models import db, ShoppingCart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shopping_carts():
    shopping_cart1 = ShoppingCart(user_id = '1')
    shopping_cart2 = ShoppingCart(user_id = '2')
    shopping_cart3 = ShoppingCart(user_id = '3')
    
    db.session.add(shopping_cart1)
    db.session.add(shopping_cart2)
    db.session.add(shopping_cart3)
    db.session.commit()

def undo_shopping_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_carts"))

    db.session.commit()
