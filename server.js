require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())

//routes

// Fetch all products
app.get('/api', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }   
})

// Fetch product by id
app.get('/api/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})  
    }
})

// Add a product
app.post('/api', async(req, res) => {
    try {
       const product = await Product.create(req.body)
       res.status(200).json(product);

    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message}) 
    }
})

//update a product
app.put('/api/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete a product
app.delete('/api/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(3000, ()=> {
            console.log('Node Api app is running on port 3000')
        })
    })
    .catch(() => {
        console.log('Error connecting to MongoDB');
    });