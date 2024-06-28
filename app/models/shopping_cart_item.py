from .db import db, environment, SCHEMA, add_prefix_for_prod

shopping_cart_items = db.Table(
  'shopping_cart_items',

  db.Column('id', db.Integer, primary_key=True),
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True),
  db.Column('quantity', db.Integer)

)