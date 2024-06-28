from .db import db

order_items = db.Table(
    "order_items",
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column('order_id', db.Integer, db.ForeignKey('orders.id')),
    db.Column('product_id', db.Integer, db.ForeignKey('products.id')),
    db.Column('quantity', db.Integer)
)

     

  
