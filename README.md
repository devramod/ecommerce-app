# MERN Stack Ecommerce Application

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack ecommerce application that allows users to browse and purchase products online.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
- [Run](#run)
- [Usage](#usage)
- [Technologies](#technologies)
- [Demo](#demo)
- [Contributing](#contributing)

### Features

This ecommerce application has the following features:

- Browse products and brands
- Shopping cart management
- Checkout and payment processing with Stripe
- Contact page
- User profile management
- User authentication
- User location
- Admin profile management
- Admin product management
- Order history and status tracking

### Installation

1. Clone the repository: `git clone https://github.com/devramod/ecommerce-app.git`
2. Install the dependencies: `npm install`

### Setup

1. Create a .env file in the client directory with the following variables:
    ```
     REACT_APP_SERVER_DOMAIN = http://localhost:8080
     REACT_APP_ADMIN_EMAIL = ram5sasanga@gmail.com
    ```
2. Create a .env file in the server directory with the following variables:
    ```
     MONGODB_USERNAME = ram5sasanga
     MONGODB_PASSWORD = icecream
     MONGODB_URL = "mongodb+srv://ram5sasanga:icecream@cluster0.hky9m8w.mongodb.net/icecream?retryWrites=true&w=majority"
     STRIPE_KEY = sk_test_51MtplaGhcHbzWbPl4oSZrUE5mJGTCPA4IlZqqtGJ24MSYCIaJQEiuqqbWuyJnpX8XnHWFcV4Vh8RgBHAHd99WwPR00E7UximML
     CLIENT_URL = http://localhost:3000
    ```

### Run

1. Run the server: `npm start`
2. Run the client: `npm start`

### Usage

To use this ecommerce application, follow these steps:

1. Create an account or sign in
2. Browse and search for products
3. Add products to your shopping cart
4. Proceed to checkout and enter your shipping and payment information
5. Place your order and track your order status in your account

As an admin, you can also manage products and users by logging in as an admin user. To use admin dashboard of this ecommerce application, follow these steps:

1. Sign in using: 
    - Email address: `ram5sasanga@gmail.com`
    - Password: `RaS123@#$`
    
This ecommerce application uses the following technologies:

### Front-end Technologies

- React.js: front-end library
- Redux, React-redux, Redux-toolkit: state managing and centralizing
- Redux-persist: persist and rehydrate redux store
- Redux-thunk
- React-router: routing
- Recharts: display charts
- Nivo.rocks: geography chart
- Material ui: ui development

### Back-end Technologies

- Node.js: back-end runtime
- Express.js: back-end web framework
- MongoDB: database management
- Mongoose: database connection

### Demo

- This application is deployed on Render.
- Please visit this link: <https://ecommerce-app-client.onrender.com/>

### Contributing

If you would like to contribute to this ecommerce application, feel free to submit a pull request or raise an issue.

