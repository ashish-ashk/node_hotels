const express = require('express');
const router = express.Router();
const Person = require('./../models/person')
const {jwtAuthMiddleware, generateToken} = require('./../jwt')

// POST route to add a person
router.post('/signup', async (req, res) => {
    try{
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new Person to the database
        const response = await newPerson.save();
        console.log('Data saved.');

        const payload = {
            id: response.id,
            username: response.username
        }

        console.log(payload);

        const token = generateToken(payload);
        console.log("Token is: ", token);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Inetrnal Server Error'});
    }
})

// Login Route
router.post('/login', async (req, res) => {
    try{
        // Extract username and password
        const {username, password} = req.body;

        // Find the use by username
        const user = await Person.findOne({username: username});

        // If the user does not exist or password does not match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // Generate token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // return token as response
        res.json({token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({erroe: 'Internal Server Error'});
    }
})

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log('User Data: ', userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({erroe: 'Internal Server Error'});
    }
})

// GET route to get a person with jwt authentication
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try{
        const data = await Person.find();
        console.log('Data fetched.');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Inetrnal Server Error'});
    }
})

// Query params in NodeJS
router.get('/:workType', async (req, res) => {
    try{
        const workLike = req.params.workType; // Extract the work type from URL parameter
        if(workLike == 'chef' || workLike == 'waiter' || workLike == 'manager') {
            const response = await Person.find({work: workLike});
            console.log('Data fetched.');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({error: 'Inavlid work type.'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Inetrnal Server Error'});
    }
    
})

// Update the data using PUT
router.put('/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        })

        if(!response) {
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('Data updated.');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const  personId = req.params.id; // Extract the person's ID from the URL parameter

        // Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error: 'Person not found.'});
        }

        console.log('Data deleted.');
        res.status(200).json({message:'Person deleted successfully.'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;