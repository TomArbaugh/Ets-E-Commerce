# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, first name, last name and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### User that is not logged in
* As an unregistered and unauthorized user I am able to view products listed for sale, and add them to my shopping cart


### Log in - User 1 : Shopper (not listing products)

* As a registered and user that is not listing products, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log-up form.
      * So that I can seamlessly access the site's functionality, e.g. purchase products that are listed for sale
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Log in - User 2 : Seller and Shopper (listing products)

* As a registered user and a user that listing products, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log-up form.
      * So that I can seamlessly access the site's functionality, 
        * purchase products that are listed for sale
        * also having the functionality to add, update, delete products for sale
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.
    * This demo user will be a Seller and a Shopper user profile

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to the home page, displaying products for sale.
      * So that I can easily log out to keep my information secure.

## Products

### Create Product for sale

* As a logged in user, I want to be able to list a new item for sale.
  * When I'm on the `/new-product` page:
    * I can create and submit a new product.
      * So that I can list items for sale that other users can purchase.
git clone
### Viewing Products for sale

* As a logged in _or_ logged out user, I want to be able to view a list of most recently listed products.
  * When I'm on the `/products` page:
    * I can view the ten most recently listed products.
      * So that I can add products to my shopping cart or my favorites list to save for later purchasing.

* As a logged in _or_ logged out user, I want to be able to view a specific product listing
  * When I'm on the `/products/:id` page:
    * I can view the product detail page 
      * So that I can review a full description of the product including the product's price, images, inventory quantity and reviews

### Updating a Product listing

* As a logged in user who has listed products for sale, I want to be able to edit any product listing's I have created via the Edit button associated with the product
  * When I'm on the `/products`, `/products/:id`, or `/users/:id/products` pages:
    * I can click "Edit" to make permanent changes to the products listing I have posted.
      * So that I can fix any errors I make in my product listing.

### Deleting a Product listing

* As a logged in user, I want to be able to delete any product listing's I have created by clicking a Delete button associated with the product listing anywhere that listing appears.
  * When I'm on the `/products`, `/products/:id`, or `/users/:id/products` pages:
    * I can click "Delete" to permanently delete a product listing I have posted.
      * So that when I realize I am tired of selling products, I can easily remove them.

## Favorites

### Add and remove Product to Favorites list

* As a logged in user, I want to be able to add any product listed by another user to my personal favorites list
  * When I'm on the `/products`, `/products/:id`, `/users/:id/favorites` pages:
    * I can click and unclick the corresponding heart icon on the product listing 
      * So that I can add and remove that specific product to my favorites list 

### Review a Product I have purchased


