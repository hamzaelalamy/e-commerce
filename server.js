
//requiring environment variables

//requiring necessary packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config()
//require middelware
const errorMiddleware = require('./middleware/errorMiddleware'); // Import error middleware

//requiring routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require( './routes/authRoutes' );

//connection to the database
mongoose.connect(process.env.DB_URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

//middleware
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Express routes
// app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/auth',authRoutes);
app.use('*', (req, res) => {
    res.status(404).json({message : 'Not Found'}) });


app.use(errorMiddleware);

//setting port and listening
const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=> {
    console.log( `App is listening on port ${PORT}` );

console.log(process.env.DB_URL);
})