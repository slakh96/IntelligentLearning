//server.js for settings first off
'use strict';
const log = console.log;

const express = require('express');
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongooseConnection } = require('./db/mongooseConnection')
const { ObjectID } = require('mongodb')
//const { mongoose } = require('mongoose');
const { User, Course, Post, Review, Auth } = require('./models')
const models = [User, Course, Post, Review, Auth];

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());

app.use("/", express.static(__dirname))

// route for root
app.get('/', (req, res) => {
	console.log(__dirname + '/settings.html');
	res.sendFile(__dirname + '/settings.html')
})

/*********************************************************/

/*** API Routes below ************************************/

// a GET route to get all users
app.get('/users', (req, res) => {
    log("Reached server app.get");
	User.find({}).then((users) => {
        log("Users are", users);
		res.send({ users }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})

// a PATCH route for changing properties of a resource.
// (alternatively, a PUT is used more often for replacing entire resources).
app.patch('/users', (req, res) => {
    log("Reached app.patch");
    const id = '5ddac6f93a9d60409411f3f5'; //Manually inserted ID; we'll need to dynamically change this based on who's logged in
    const body = req.body;
    if (!ObjectID.isValid(id)) {
        log("Invalid ID!");
		res.status(404).send()
	}

	// Update the student by their id.
	User.findByIdAndUpdate(id, {$set: body}, {new: true}).then((user) => {
		if (!user) {
            log("Update response was NULL");
			res.status(404).send()
		} else {   
			res.send(user)
		}
	}).catch((error) => {
		log("There was an error when findByIdAndUpdate");
		log(error);
		res.status(400).send() // bad request for changing the user.
	})

})

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3002
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 