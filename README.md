# eCommerce Website

Welcome to our eCommerce website README! This document provides an overview of our project, installation instructions, usage guidelines, and additional notes.

## Overview

Our eCommerce website is built using Node.js, Express, and MongoDB. It provides a platform for users to browse products, add them to their cart, and make purchases. Sellers can also register and list their products for sale on the platform.

## Features

- User authentication and authorization
- Product browsing and searching
- Shopping cart functionality
- Secure checkout process
- Seller registration and product listing
- Admin dashboard for managing users, products, and orders

## Technologies Used

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express**: A web application framework for Node.js used for building APIs and web apps.
- **MongoDB**: A NoSQL database used for storing product, user, and order data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: A method for securely transmitting information between parties as a JSON object.

## Installation

To run this project locally, make sure you have Node.js and MongoDB installed on your machine. Then, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/KareemEmad52/ecommerce-nodejs.git
   ```


2. Navigate into the project directory:

   ```bash
   cd ecommerce-nodejs
   ```

3. Install dependencies using npm or yarn:

   ```bash
   npm install
   # or
   yarn
   ```

4. Create a .env file in the root directory and configure environment variables:

   ```bash
   PORT=3000
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   ```
Replace your-mongodb-uri with your MongoDB connection string and your-jwt-secret with a secret key for JWT .

## Usage

- Here is The API after deploying : <a href="https://ecom-zgup.onrender.com/api/v1/categories" targer="_blank">https://ecom-zgup.onrender.com/api/v1/categories</a>

- API Documentation : <a href="https://documenter.getpostman.com/view/29885940/2sA2xcZuW6" targer="_blank">https://documenter.getpostman.com/view/29885940/2sA2xcZuW6</a>



## License

This project is licensed under the MIT License.
