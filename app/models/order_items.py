from .db import db, environment, SCHEMA, add_prefix_for_prod

order_items = db.Table(
    "order_items",
    db.Model.metadata,
    
    db.Column('order_id', db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), primary_key = True),
    db.Column('product_id', db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key = True),
    db.Column('quantity', db.Integer)
)
