const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/menu')

// POST route to add a MenuItem
router.post('/', async (req, res) => {
    try{
        const data = req.body // Assuming the request body contains the MenuItem data

        // Create a new Menu document using the Mongoose model
        const newMenuItem = new MenuItem(data);

        const response = await newMenuItem.save();
        console.log('Data saved.');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Inetrnal Server Error'});
    }
})

// GET route to get a MenuItem
router.get('/', async (req, res) => {
    try{
        const data = await MenuItem.find();
        console.log('Data fetched.');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Inetrnal Server Error'});
    }
})

// Query params in NodeJS
router.get('/:taste', async (req, res) => {
    try{
        const tasteLike = req.params.taste; // Extract the taste type from URL parameter
        if(tasteLike == 'sweet' || tasteLike == 'sour' || tasteLike == 'spicy') {
            const response = await MenuItem.find({taste: tasteLike});
            console.log('Data fetched.');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({error: 'Inavlid taste type.'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Inetrnal Server Error'});
    }
    
})

module.exports = router;