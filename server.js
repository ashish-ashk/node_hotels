const express = require('express')
const app = express()
const db = require('./db')
require ('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000

// const Person = require('./models/person')
// const MenuItem = require('./models/menu')

app.get('/', function (req, res) {
  res.send('This is my first server response.')
})

app.get('/food', function(req, res){
    res.send(`Your food is on the way.`);
})

app.get('/order', function(req, res){
    var obj = {
        name : 'Ashish',
        age : 23,
        city : 'New Delhi'
    };
    res.send(obj);
})

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
    console.log('Listening on port 3000...')
})
//this is comment for testing