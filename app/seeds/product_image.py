from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_product_image():
    image1 = ProductImage(
        product_id=1, url="image1"
    )
    image2 = ProductImage(
        product_id=2, url="image2"
    )
    image3 = ProductImage(
        product_id=3, url="image3"
    )
    image4 = ProductImage(
        product_id=4, url="image4"
    )
    image5 = ProductImage(
        product_id=5, url="image5"
    )
    image6 = ProductImage(
        product_id=6, url="image6"
    )
    image7 = ProductImage(
        product_id=7, url="image7"
    )
    image8 = ProductImage(
        product_id=8, url="image8"
    )
    image9 = ProductImage(
        product_id=9, url="image9"
    )
    image10 = ProductImage(
        product_id=10, url="image10"
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
