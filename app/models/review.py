from .db import db
from datetime import datetime

reviews = db.Table(
    'reviews',

    db.Model.metadata,
    db.Column('id', db.Integer, nullable=False),
    db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True),
    db.Column('user_id', db.Integer,db.ForeignKey('users.id'), primary_key=True),
    db.Column('review', db.String(2000), nullable=False),
    db.Column('stars', db.Integer, nullable=False),
    db.Column('created_at', db.DateTime, default=datetime.utcnow),
    db.Column('updated_at', db.DateTime, onupdate=datetime.utcnow)
)
