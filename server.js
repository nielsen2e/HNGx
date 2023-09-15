require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./models/personModel')
const app = express()

app.use(express.json())

//routes

// Fetch all names
app.get('/api', async(req, res) => {
    try {
        const person = await Person.find({}, 'id name');
        res.status(200).json({person: person})
    } catch (error) {
        res.status(500).json({message: error.message})
    }   
})

// Fetch person by id
app.get('/api/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const person = await Person.findById(id);
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({message: error.message})  
    }
})

// Add person
app.post('/api', async(req, res) => {
    try {
       const person = await Person.create(req.body)
       res.status(200).json({person: person});
    } catch (error) {
       console.log(error.message);
       res.status(500).json({message: error.message}) 
    }
})

//update a person
app.put('/api/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const person = await Person.findByIdAndUpdate(id, req.body);
        // we cannot find such person in database
        if(!person){
            return res.status(404).json({message: `cannot find person with ID ${id}`})
        }
        const updatedPerson = await Person.findById(id);
        res.status(200).json(updatedPerson);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete a person
app.delete('/api/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const person = await Person.findByIdAndDelete(id);
        if(!person){
            return res.status(404).json({message: `cannot find any person with ID ${id}`})
        }
        res.status(200).json({message: `user with this ID ${id} has been deleted`}); 
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