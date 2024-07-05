from .db import db, environment, SCHEMA, add_prefix_for_prod
from .review import reviews
from .order_items import order_items


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(50), nullable = False)
    category = db.Column(db.String(50), nullable = False)
    description = db.Column(db.String(255), nullable =False)
    price = db.Column(db.Numeric(3,2), nullable = False)
    stock = db.Column(db.Integer, nullable = False)

    #one-to-many products=>product_images
    images = db.relationship(
        'ProductImage',
        back_populates = 'product',
        cascade="delete"
    )

    #many-to-one users=>products
    user = db.relationship(
        'User',
        back_populates = 'products'
    )

    #many-to-many users<=reviews=>products
    user_reviews = db.relationship(
        'User',
        secondary=reviews,
        back_populates = 'product_reviews'
    )
    
    #one-to-many products=>cart_items
    product_cart_items = db.relationship(
        'CartItem',
        back_populates = 'cart_product',
        cascade="delete"
    )

                #many-to-many orders<=order_items=>products
    order_products = db.relationship(
        'Order',
        secondary=order_items,
        back_populates = 'products_ordered'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'category': self.category,
            'description': self.description,
            'price': self.price,
            'stock': self.stock,
            'images': [image.to_dict() for image in self.images],
        }
