from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_product_images():
    image1 = ProductImage(
        product_id=1, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/10-Custom-Neon-Sign.png"
    )
    image2 = ProductImage(
        product_id=2, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/8-Custom-Embroidered-Sweatshirt.png"
    )
    image3 = ProductImage(
        product_id=3, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/1-Custom-Leather-Wallet.png"
    )
    image4 = ProductImage(
        product_id=4, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/4-Personalized-Shoe-Tags.png"
    )
    image5 = ProductImage(
        product_id=5, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/5-Personalized-Wooden-Puzzle.png"
    )
    image6 = ProductImage(
        product_id=6, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/6-Personalized-Dog-Collar.png"
    )
    image7 = ProductImage(
        product_id=7, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/7-233yr-Old-Sourdough-Starter.png"
    )
    image8 = ProductImage(
        product_id=8, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/3-Toiletry-Bag.png"
    )
    image9 = ProductImage(
        product_id=9, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/9-Silver-Chain-Necklace.png"
    )
    image10 = ProductImage(
        product_id=10, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/2-Cable-Organizer.png"
    )

    image11 = ProductImage(
        product_id=11, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/11-Custom-Engraved-Wooden-Jewelry-Box.png"
    )
    image12 = ProductImage(
        product_id=12, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/12-6-Tier-Free-Standing-Shoe-Racks.png"
    )
    image13 = ProductImage(
        product_id=13, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/13-Wooden-Cell-Phone-Speaker.png"
    )
    image14 = ProductImage(
        product_id=14, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/14-Pickleball-Star-Champion-Party-Napkin.png"
    )
    image15 = ProductImage(
        product_id=15, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/15-Infinity-Bicycle-Necklace.png"
    )
    image16 = ProductImage(
        product_id=16, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/16-Modern-standing-desk-converter.png"
    )
    image17 = ProductImage(
        product_id=17, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/17-Linen-Pillowcase-in-Dusty-Rose.png"
    )
    image18 = ProductImage(
        product_id=18, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/18-Modern-Cat-House.png"
    )
    image19 = ProductImage(
        product_id=19, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/19-Personalized-Na-e-Bike-Headset-Cap-For-Cyclists.png"
    )
    image20 = ProductImage(
        product_id=20, url="https://etsy-clone-july24.s3.us-west-1.amazonaws.com/images-for-EstyClone/20-Frog-plush-toy.png"
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
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.add(image15)
    db.session.add(image16)
    db.session.add(image17)
    db.session.add(image18)
    db.session.add(image19)
    db.session.add(image20)
    db.session.commit()

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()

        