from .db import db, add_prefix_for_prod
from datetime import datetime

reviews = db.Table(
    'reviews',

    db.Model.metadata,
    db.Column('id', db.Integer, nullable=False),
    db.Column('product_id', db.Integer, db.ForeignKey(add_prefix_for_prod('products.id'), primary_key=True)),
    db.Column('user_id', db.Integer,db.ForeignKey(add_prefix_for_prod('users.id'), primary_key=True)),
    db.Column('review', db.String(2000), nullable=False),
    db.Column('stars', db.Integer, nullable=False),
    db.Column('created_at', db.DateTime, default=datetime.utcnow()),
    db.Column('updated_at', db.DateTime, onupdate=datetime.utcnow())
)
