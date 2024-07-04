from .db import db, environment, SCHEMA, add_prefix_for_prod

class ShoppingCart(db.Model):
    __tablename__='shopping_carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    #one-to-one relationship shopping_cart => cart_items
    user = db.relationship(
        'User',
        back_populates = 'shopping_cart'
    )

    #one-to-many relationship shopping_cart=>cart_items
    cart_items = db.relationship(
        'CartItem',
        back_populates = 'shopping_cart',
        cascade="delete"
    )


   
