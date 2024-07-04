# ShopSavvy - E-commerce Platform

Welcome to ShopSavvy! This is an E-commerce Platform designed to provide a seamless online shopping experience. Utilizing the MERN stack technology, ShopSavvy combines MongoDB for data handling, Express and Node.js for backend functionality, and React for a dynamic and responsive frontend.

## Features

- **Product Listings**: Browse a wide range of products with detailed descriptions, prices, and images.
- **Shopping Cart**: Easily add items to the cart and manage your selections before checkout.
- **User Authentication**: Secure user login and registration with JWT authentication.
- **Order Management**: Track orders from placement to delivery with real-time updates.
- **Admin Dashboard**: Administrators can manage products, orders, and users through an intuitive interface.
- **Payment Integration**: Seamless payment processing through integrated payment gateways, including Razorpay.
- **Search Functionality**: Advanced search options to easily find products.
- **Responsive Design**: Optimized for both desktop and mobile devices to ensure a smooth user experience.

## Deployment

The application is deployed on Netlify and can be accessed at [ShopSavvy](https://shop-savvy.netlify.app/).

## Installation

### Backend

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/ShopSavvy---Mern-e-commerce.git
   cd ShopSavvy---Mern-e-commerce
   
2. Navigate to the server directory
   ```bash
   cd server
   
3. Install backend dependencies
   ```bash
   npm install

4. Create a .env file in the server directory and add the following environment variables
   ```bash
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   DEV_MODE=development
   FRONTEND_URL=http://localhost:3000
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret

5. Start the backend server
   ```bash
   nodemon || node app.js

### Frontend

1. Navigate to the client directory

   ```bash
   cd ../client
2. Install frontend dependencies

   ```bash
   npm install

3. Create a .env file in the client directory and add the following

   ```bash
   REACT_APP_BASE_URL=http://localhost:8080/api/v1
   REACT_APP_CLOUD_NAME_CLOUDINARY=your_cloudinary_name
   REACT_APP_UPLOAD_PRESET_CLOUDINARY=your_cloudinary_preset_name
   REACT_APP_POSTAL_API=add_postal_api
   REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
   
4. Start the frontend development server

   ```bash
   npm start


## Contributing

Contributions are welcome! If you'd like to contribute to ApexBooking Health, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [MongoDB](https://www.mongodb.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)

## Contact

For any inquiries or support, please contact me at harismohanty8658gmail.com.

Thank you for using ShopSavvy!
