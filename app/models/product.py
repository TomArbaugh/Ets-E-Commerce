from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .review import reviews
from .order_items import order_items

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # New field

    images = db.relationship(
        'ProductImage',
        back_populates='product',
        cascade="delete"
    )

    user = db.relationship(
        'User',
        back_populates='products'
    )

    user_reviews = db.relationship(
        'User',
        secondary=reviews,
        back_populates='product_reviews'
    )

    product_cart_items = db.relationship(
        'CartItem',
        back_populates='product',
        cascade="delete"
    )

    order_products = db.relationship(
        'Order',
        secondary=order_items,
        back_populates='products_ordered'
    )

    def to_dict(self):
      return {
        'id': self.id,
        'owner_id': self.owner_id,
        'name': self.name,
        'category': self.category,
        'description': self.description,
        'price': f"{self.price:.2f}",
        'stock': self.stock,
        'created_at': self.created_at,  
        'images': [image.to_dict() for image in self.images] if self.images else [],
    }
