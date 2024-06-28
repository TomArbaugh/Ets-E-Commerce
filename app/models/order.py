from .db import db, environment, SCHEMA, add_prefix_for_prod
from .order_items import order_items


class Order(db.Model):

    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=true)
    purchaser_id = db.Column(db.Integer, db.ForeignKey('purchaser.id'), nullable=False)
    total = db.Column(db.Numeric, nullable=False)
    discount = db.Column(db.Numeric, default=None)
    status = db.Column(db.String(25), nullable=False)


    user = db.relationship(
        'User',
        back_populates = 'user_orders'
        )
    
            #many-to-many orders<=order_items=>products
    products_ordered = db.relationship(
        'Product',
        secondary=order_items,
        back_populates = 'order_products'
    )