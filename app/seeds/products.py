from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(
        owner_id=1, name='Custom Leather Wallet', category='Jewelry & Accessories', description="This personalized RFID leather wallet is the perfect gift or for the new dad to be!", price=48.00, stock=11)
    product2 = Product(
        owner_id=1, name='Cable Organizer', category='Home & Living', description='Keep your desk clean and organized with our premium wooden cable organizer. Upgrade your workspace with our premium wooden cable organizer and enjoy the convenience and beauty of a clutter-free desk.', price=15.40, stock=12)
    product3 = Product(
        owner_id=1, name='Toiletry Bag', category='Home & Living', description='The Personalized Dopp Kit has ample space to fit all of your travel-size containers and is long enough for grooming essentials like a toothbrush and a shaving kit.', price=22.05, stock=13)
    product4 = Product(
        owner_id=2, name='Personalized Shoe Tags', category='Clothing & Shoes', description='Whether they are for running trainers, gym trainers or general shoes, these shoe tags are the perfect addition to any pair of shoes.', price=20.00, stock=14)
    product5 = Product(
        owner_id=2, name='Personalized Wooden Puzzle', category='Toys & Entertainment', description="The specified sizes refer to a puzzle of 5-6 letters.The size of your puzzle will depend on the number of letters in your child's name.", price=51.52, stock=15)
    product6 = Product(
        owner_id=2, name='Personalized Dog Collar', category='Jewelry & Accessories', description="All our gorgeous pet collars are Premium Comfortable and perfect for dogs and cats of any breeds in any special occasions like wedding, and birthday or daily walk.", price=39.16, stock=16)
    product7 = Product(
        owner_id=3, name='233yr Old Sourdough Starter', category='Home & Living', description='This heritage starter will produce delicious and gorgeous bread, and it has a story that goes back to the 1800s!', price=35.82, stock=17)
    product8 = Product(
        owner_id=3, name='Custom Embroidered Sweatshirt', category='Clothing & Shoes', description='50% Cotton, 50% Polyester. Double-needle stitched neckline, bottom hem and sleeves t-shirt. All hoodies and crewneck sweatshirts are fleece.', price=34.20, stock=18)
    product9 = Product(
        owner_id=3, name='Silver Chain Necklace', category='Jewelry & Accessories', description='Stainless Steel. Handcrafted in CA, USA All chains come with a 2" extender.', price=44.80, stock=19)
    product10 = Product(
        owner_id=3, name='Custom Neon Sign', category='Home & Living', description='Customized Neon sign that reads out your preferred Name, Text, Font, Shape, Style, and Color.', price=7.99, stock=20)

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
