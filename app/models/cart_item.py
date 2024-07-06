from .db import db, environment, SCHEMA, add_prefix_for_prod

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, unique=True)
    shopping_cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shopping_carts.id')))
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')))
    quantity = db.Column(db.Integer)

    # one-to-many relationship shopping_cart => cart_items
    shopping_cart = db.relationship(
        'ShoppingCart',
        back_populates='cart_items'
    )

    # one-to-many products => cart_items
    product = db.relationship(
        'Product',
        back_populates='product_cart_items'
    )

    def to_dict(self):
        # Get the first image URL, if any
        image_url = self.product.images[0].url if self.product.images else None

        return {
            'id': self.id,
            'shopping_cart_id': self.shopping_cart_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'product': {
                'name': self.product.name,
                'price': float(self.product.price),  # Convert decimal to float
                'image_url': image_url  # Include the image URL
            }
        }
