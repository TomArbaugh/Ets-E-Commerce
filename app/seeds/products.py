from app.models import db, Product, environment, SCHEMA
from datetime import datetime  
from sqlalchemy.sql import text

def seed_products():
    product1 = Product(
        owner_id=3, name='Custom Neon Sign', category='Home & Living', description='Customized Neon sign that reads out your preferred Name, Text, Font, Shape, Style, and Color.', price=7.99, stock=20, created_at=datetime.now())
    product2 = Product(
        owner_id=3, name='Custom Embroidered Sweatshirt', category='Clothing & Shoes', description='50% Cotton, 50% Polyester. Double-needle stitched neckline, bottom hem and sleeves t-shirt. All hoodies and crewneck sweatshirts are fleece.', price=34.20, stock=18, created_at=datetime(2024, 6, 3, 12, 0))
    product3 = Product(
        owner_id=1, name='Custom Leather Wallet', category='Jewelry & Accessories', description="This personalized RFID leather wallet is the perfect gift or for the new dad to be!", price=48.00, stock=11, created_at=datetime(2024,  6, 2, 12, 0))
    product4 = Product(
        owner_id=2, name='Personalized Shoe Tags', category='Clothing & Shoes', description='Whether they are for running trainers, gym trainers or general shoes, these shoe tags are the perfect addition to any pair of shoes.', price=20.00, stock=14, created_at=datetime(2023,  6, 4, 12, 0))
    product5 = Product(
        owner_id=2, name='Personalized Wooden Puzzle', category='Toys & Entertainment', description="The specified sizes refer to a puzzle of 5-6 letters.The size of your puzzle will depend on the number of letters in your child's name.", price=51.52, stock=15, created_at=datetime(2023,  6, 5, 12, 0))
    product6 = Product(
        owner_id=2, name='Personalized Dog Collar', category='Jewelry & Accessories', description="All our gorgeous pet collars are Premium Comfortable and perfect for dogs and cats of any breeds in any special occasions like wedding, and birthday or daily walk.", price=39.16, stock=16, created_at=datetime(2023,  6, 6, 12, 0))
    product7 = Product(
        owner_id=3, name='233yr Old Sourdough Starter', category='Home & Living', description='This heritage starter will produce delicious and gorgeous bread, and it has a story that goes back to the 1800s!', price=35.82, stock=17, created_at=datetime(2023,  6, 7, 12, 0))
    product8 = Product(
        owner_id=1, name='Toiletry Bag', category='Home & Living', description='The Personalized Dopp Kit has ample space to fit all of your travel-size containers and is long enough for grooming essentials like a toothbrush and a shaving kit.', price=22.05, stock=13, created_at=datetime(2023,  6, 8, 12, 0))
    product9 = Product(
        owner_id=3, name='Silver Chain Necklace', category='Jewelry & Accessories', description='Stainless Steel. Handcrafted in CA, USA All chains come with a 2" extender.', price=44.80, stock=19, created_at=datetime(2023,  6, 6, 12, 0))
    product10 = Product(
        owner_id=1, name='Cable Organizer', category='Home & Living', description='Keep your desk clean and organized with our premium wooden cable organizer. Upgrade your workspace with our premium wooden cable organizer and enjoy the convenience and beauty of a clutter-free desk.', price=15.40, stock=12, created_at=datetime(2023,  6, 10, 12, 0))

    # new products
    product11 = Product(
        owner_id=2, name='Custom Engraved Wooden Jewelry Box', category='Jewelry & Accessories', description='Presenting the custom engraved wooden jewelry box – an exquisite blend of elegance and function, tailored to cradle your cherished jewelry pieces with the utmost care.', price=60.00, stock=10, created_at=datetime(2024, 6, 15, 12, 0))
    product12 = Product(
        owner_id=2, name='6-Tier Free Standing Shoe Racks', category='Home & Living', description='Keep your shoes in one place with this spacious shoe rack that can accommodate a variety of shoe sizes and styles.', price=120.00, stock=15, created_at=datetime(2024, 6, 16, 12, 0))
    product13 = Product(
        owner_id=3, name='Wooden Cell Phone Speaker', category='Toys & Entertainment', description='Meet our top selling Beat Block Wooden Cell Phone Speaker. No wires are needed to power this speaker.', price=25.00, stock=30, created_at=datetime(2024, 6, 17, 12, 0))
    product14 = Product(
        owner_id=1, name='Pickleball Star Champion Party Napkin', category='Home & Living', description="Serve up style with the Pickleball Star Champion Napkin, showcasing a vibrant 'Pickleball Star' motif with a playful pickleball and pickle graphic.", price=12.00, stock=50, created_at=datetime(2024, 6, 18, 12, 0))
    product15 = Product(
        owner_id=3, name='Infinity Bicycle Necklace', category='Jewelry & Accessories', description='Sterling Silver Bicycle Pendant is made by hand in our workshop with care.', price=35.00, stock=25, created_at=datetime(2024, 6, 19, 12, 0))
    product16 = Product(
        owner_id=2, name='Modern Standing Desk Converter', category='Home & Living', description='This standing desk converter is made of CNC-milled high quality Baltic birch plywood, collapsible to take anywhere.', price=150.00, stock=10, created_at=datetime(2024, 6, 20, 12, 0))
    product17 = Product(
        owner_id=1, name='Linen Pillowcase in Dusty Rose', category='Home & Living', description='Fall into a blooming bed and relax like a queen, this wonderful dusty rose linen pillowcase is a perfect addition to your bedroom.', price=45.00, stock=20, created_at=datetime(2024, 6, 21, 12, 0))
    product18 = Product(
        owner_id=1, name='Modern Cat House', category='Home & Living', description='Our elegant, simple design cat cave is the perfect place to make your feline friend feel comfortable, safe and warm, while improving the aesthetic atmosphere of your home!', price=90.00, stock=15, created_at=datetime(2024, 6, 22, 12, 0))
    product19 = Product(
        owner_id=2, name='Personalized Name Bike Headset Cap For Cyclists', category='Jewelry & Accessories', description='Add some personalization to your bike with this aluminium headset cap, easily installed on virtually any bike in minutes.', price=20.00, stock=30, created_at=datetime(2024, 6, 23, 12, 0))
    product20 = Product(
        owner_id=2, name='Frog Plush Toy', category='Toys & Entertainment', description='Frog toy is ready to become friends with your kids and tell a lot of stories! Click to read more details and look all the pictures in the listing...', price=25.00, stock=40, created_at=datetime(2024, 6, 24, 12, 0))

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
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)
    db.session.add(product16)
    db.session.add(product17)
    db.session.add(product18)
    db.session.add(product19)
    db.session.add(product20)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
