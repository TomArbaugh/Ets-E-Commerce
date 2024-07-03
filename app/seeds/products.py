from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(
        owner_id='1', name='necklace', category='jewlery', description='Customized Monogram Necklace, Turn Your Name into a One-of-a-Kind Statement Piece, Personalized Handmade Women Gold Name Necklace', price=48.00, stock=11)
    product2 = Product(
        owner_id='1', name='bracelet', category='jewlery', description='Custom Bracelet Personalized Jewelry Handmade Birthday Gift Name Bracelet Engraved Dainty Bar Bracelet Wedding Gift Anniversary Gift', price=15.40, stock=12)
    product3 = Product(
        owner_id='1', name='ring', category='jewlery', description='Double Name Ring • Two Name Ring in Sterling Silver, Gold and Rose Gold • Personalized Gift For Mom • Best Friend Gift ', price=22.05, stock=13)
    product4 = Product(
        owner_id='2', name='shirt', category='clothes', description='Comfort colors, Absolutely Not shirt, Funny Quote Tee, Viral Unisex shirt, Best', price=20.00, stock=14)
    product5 = Product(
        owner_id='2', name='dress', category='clothes', description='Anysize custom 3/4 sleeves soft linen cotton maxi dress with functional buttons side pockets spring summer fall plus size clothing', price=51.52, stock=15)
    product6 = Product(
        owner_id='2', name='pants', category='clothes', description='Custom Text Embroidered Sweatpants', price=39.16, stock=16)
    product7 = Product(
        owner_id='3', name='costume', category='baby', description='Kids Halloween DINOSAUR Costume Cape with spikes + dino spike accessory gloves - Ships Fast - 2 choice - Kids Halloween Dino Costume', price=35.82, stock=17)
    product8 = Product(
        owner_id='3', name='pajamas', category='baby', description='Bamboo Pink Zipper Pajamas with Friendship Bracelet Print', price=34.20, stock=18)
    product9 = Product(
        owner_id='3', name='jacket', category='baby', description='Blank Sport-Tek® Youth Waterproof Insulated Jacket, Sublimation and DTF Jacket', price=44.80, stock=19)
    product10 = Product(
        owner_id='3', name='onesie', category='baby', description='Custom Name Baby Onesie Custom Text Personalized Baby Onesie Pregnancy Announcement Onesie Birth Reveal Baby Onesie Baby Shower Gift', price=7.99, stock=20)

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
