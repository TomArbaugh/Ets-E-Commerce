from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .review import Review
from .shopping_cart_item import shopping_cart_items

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # one-to-many users=>products
    products = db.relationship(
        'Product',
        back_populates='user',
        cascade="delete"
    )

    # one-to-many users=>reviews
    product_reviews = db.relationship(
        'Review',
        back_populates='user',
        cascade="all, delete-orphan"
    )

    # many-to-many users<=shopping_cart_items=>products
    product_shopping_cart_items = db.relationship(
        'Product',
        secondary=shopping_cart_items,
        back_populates='user_shopping_cart_items'
    )
    
    # one-to-many users=>orders
    user_orders = db.relationship(
        'Order',
        back_populates='user',
        cascade="delete"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email
        }
