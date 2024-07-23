# EtsyClone

EtsyClone is a  partial clone of the popular e-commerce website "Etsy". It aims to provide users with a a smooth online shopping experience and allow owners to manage their products efficiently. Additionally, it offers complete review management for users.

# Live Link
https://etsyclone-4ah1.onrender.com/


## Tech Stack
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
[db-schema]: ./images/DB_schema.png

 ### Database:
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

  ### Hosting:
 ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# Index

 [MVP List and Database Schema](https://github.com/TomArbaugh/EtsyClone/wiki#mvp-list) | [User Stories](https://github.com/TomArbaugh/EtsyClone/wiki#user-stories) 

# Landing Page/Products Page
 <img src='images/landingPage.png' width='600px'>

# Products Details Page
 <img src='' width='600px'>

# Shopping Cart Page
 <img src='' width='600px'>

# Order Page
 <img src='' width='600px'>

# Endpoints

## Auth Routes

### Current User
##
* Purpose: Authenticates a user
* Method: ```GET```
* URL: ```/api/auth/```
* Successful Response: HTTP Status Code 200
```python
{
    "email": "demo@aa.io",
    "first_name": "Demo",
    "id": 1,
    "last_name": "User",
    "username": "Demo"
}
```
* Error Response: HTTP Status Code 401
```python
{
  'errors': 'Unauthorized'
}
```
### Unauthorized (from @login_required)
##
* Purpose: This endpoint will be routed to in the case that a protected route does not pass validations for the current user.
* Method ```POST```
* URL: ```/api/auth/unauthorized```
* Successful Response: NA 
* Error Response: HTTP Status Code 401
```python
{
  'errors': 'Unauthorized'
}
```
### Sign Up
##
* Purpose: This fetch sends the signup form data to the backend to process the creation of a new user.
* Method: ```POST```
* URL: ```/api/auth/signup```
* Successful Response: HTTP Status 201
```python
{
   'id': INT,
   'username': STRING,
   'email': STRING,
}
```
* Error Response: HTTP Status 400
```python
{
   "email": [ "This field is required.",  "Email provided not found." ], 
   "password": [ "This field is required." ] 
}
```
### Login
##
* Purpose: This fetch attempts to login a user with the provided credentials.
* Method: ```POST```
* URL: ```/api/auth/login```
* Successful Response: HTTP Status 200
```python
{ 
    "email": "demo@aa.io", 
    "first_name": "Demo", 
    "id": 1, 
    "last_name": "User", 
    "username": "Demo" 
}
```
* Error Response: HTTP Status 400
```python
{
   'errors': {}
}
```
### Logout
##
* Purpose: This fetch will logout the current user.
* Method: ```POST```
* URL: ```/api/auth/logout```
* Successful Response: HTTP Status 200
```python
{
   'message': 'User logged Out'
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'No session'
}
```


# Future Features List
1. favorite

# Future Implementation Goals
1. Search Bar

# Connect
[LinkedIn]()