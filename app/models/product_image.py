from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductImage(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))
    url = db.Column(db.String(2000), nullable = False)

    #many-to-one products=>product_images
    product = db.relationship(
        'Product',
        back_populates = 'images'
    )

    