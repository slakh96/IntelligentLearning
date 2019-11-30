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
	console.log(__dirname );
	res.sendFile(__dirname )
})




/*********************************************************/
/***************** SESSION COOKIES ***********************/
app.use(
	session({
		secret: "recipe", 
		resave: false, 
		saveUninitialized: false, 
		cookie: {
			expires: 60000, 
			httpOnly: true
		}
	})
)

/***** SULTAN MADE THESE FUNCTIONS SO ERROR CHECK PLS *****/

// new user 
app.post("/users/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password; 

	
})


/*********************************************************/

/*** API Routes below ************************************/

//posts

app.post('/posts', (req, res) => {
	// log(req.body)

	// Create a new student using the Student mongoose model
	const post = new Post({
		postID: req.body.postID,
		userName: req.body.userName,
		content: req.body.content,
		time: req.body.time,
		title: req.body.title
	})
	log("Created new post");
	// Save post to the database
	post.save().then((result) => {
		res.send(result)
	}, (error) => {
		log("There was an error when saving a new post...", error)
		res.status(400).send(error) // 400 for bad request
	})
})

// a GET route to get all posts
app.get('/posts', (req, res) => {
    log("Reached server posts app.get");
	Post.find({}).then((posts) => {
        log("Posts are", posts);
		res.send({ posts }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})

///Users

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

app.post('/users', (req, res) => {
	log("Reached server app.post for users");
	const newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		highestEdu: req.body.highestEdu,
		userName: req.body.userName,
		phoneNumber: req.body.phoneNumber,
		coursesTaught: req.body.coursesTaught,
		coursesLearning: req.body.coursesLearning,
		about: req.body.about,
		experience: req.body.experience,
		linkedInLink: req.body.linkedInLink,
		profilePic: req.body.profilePic,
		newPostingsForAsTutorCourses: req.body.newPostingsForAsTutorCourses
	});
	// Save student to the database
	newUser.save().then((result) => {
		res.send(result)
	}, (error) => {
		log("There was an error when saving a new post...", error)
		res.status(400).send(error) // 400 for bad request
	})

});

// a PATCH route for changing properties of a resource.
// (alternatively, a PUT is used more often for replacing entire resources).
app.patch('/users/:id', (req, res) => {
    log("Reached app.patch");
    //const id = '5ddac6f93a9d60409411f3f5'; //Manually inserted ID; we'll need to dynamically change this based on who's logged in
	const id = req.params.id;
	log("ID seen by server is: ", id);
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