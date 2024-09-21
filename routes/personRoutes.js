const express = require('express');
const router = express.Router();

const Person = require('./../models/person')

// POST route to add a person
router.post('/', async (req, res) => {
    try{
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        // newPerson.save((error, savedPerson) => {
        //     if(error){
        //         console.log('Error saving person: ', error);
        //         res.status(500).json({error: 'Internal server error'});
        //     }else {
        //         console.log('Data saved successfully');
        //         res.status(200).json(savedPerson);
        //     }
        // })
        // Nowadays above code will not work we us async-await now
        const response = await newPerson.save();
        console.log('Data saved.');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Inetrnal Server Error'});
    }
})

// GET route to get a person
router.get('/', async (req, res) => {
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