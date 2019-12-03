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
const session = require('express-session');
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

// login route
app.post("/users/login", (req, res) => {
	const username = req.body.username;
	const password = req.body.password; 

	Auth.findByEmailPassword(username, password).then( user => {
		log("Setting the user id to be the current user...", user.userName)
		req.session.user = user._id;
		req.session.username = user.userName;
		res.send({
			currentUser:user.userName
		});
	}).catch (error => {
		res.status(400).send();
	});
});

app.get("/users/logout", (req, res) => {
	log("INSIDE USERS LOGOUT THIS IS HIGHLY BAD")
	req.session.destroy(error => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.send();
		}
	});
});

app.get("/users/check-session", (req, res) => {
	if (req.session.user) {
		res.send({
			currentUser: req.session.username
		});
	} else {
		log("There is no one currently logged in..");
		res.status(401).send();
	}
});


/*********************************************************/

/*** API Routes below ************************************/

// creating users
/**
 * Expects JSON in the form 
 * {
 * userName: username, 
 * password: password, 
 * firstName: name, 
 * lastName: name, 
 * email: email, 
 * highestEdu: edu, 
 * phoneNumber: number, 
 * coursesTaught: [courses],
 * coursesLearning: [courses], 
 * about: about, 
 * experience: experience, 
 * linkedInLink: link, 
 * resumeLink: link, 
 * availability: av, 
 * profilePic: pic, 
 * newPostingsForAsTutorCourses: something, 
 * newPostingsForAsTuteeCourses: something, 
 * adminNotifications: notifs, 
 * specialOffersPromotions: promos
 * }
 */
app.post("/authentications", (req, res) => {
	const auth  = new Auth({
		userName: req.body.userName, 
		password: req.body.password
	});

	auth.save().then(
		result => {
			res.send(result);
		}, error => {
			log(error);
			res.status(400).send(error);
		}
	);
	
});

app.patch("/authentications/:username", (req, res) => {
	log("Reached username update in auth function");
	const username = req.params.username;
	const newUsername = req.body.userName;
	log("New username is ", newUsername);
	Auth.findOneAndUpdate({userName: username}, {$set: {userName: newUsername}}, {new: true}).then((user) => {
		log("User after put is: ", user);
		if (!user) {
            log("Update response was NULL");
			res.status(404).send()
		} else {   
			res.send(user)
		}
	})
});

app.post("/authentications/login", (req, res) => {
	const auth = new Auth({
		userName: req.body.userName, 
		password: req.body.password
	});
	
	Auth.findByUsernamePassword(auth.userName, auth.password).then(
		user => {
			log("Adding a user to the session: ", user.userName);
			req.session.user = user._id;
			req.session.username = user.userName;
			res.send({currentUser: req.session.userName});
		}
	).catch((error) => {
		log("There was an error in authentications login function ", error);
		res.status(400).send();
	})
})

app.get("/authentications/:name", (req, res) => {
	const name = req.params.name;
	Auth.find({userName:name}).then(user => {
		if (user.length == 0){
			res.status(200).send();
		} else {
			res.status(401).send(); // 800 status code for a user that already exists
		}
	})
});

app.get("/users/:email", (req, res) => {
	log("Reached users email function");
	const email = req.params.email;
	User.find({email: email}).then(user => {
		if (user.length > 0){
			res.status(401).send();
		} else {
			res.status(200).send();
		}
	})
})

app.post("/users", (req, res) => {
	const newUser = new User({
		firstName: req.body.firstName, 
		lastName: req.body.lastName, 
		email: req.body.email, 
		highestEdu: req.body.highestEdu, 
		userName: req.body.userName, 
		phoneNumber: req.body.phoneNumber, 
		coursesTaught: req.body.coursesTaught, 
		couresLearning: req.body.coursesLearning, 
		about: req.body.about, 
		experience: req.body.experience, 
		linkedInLink: req.body.linkedInLink, 
		resumeLink: req.body.resumeLink, 
		availability: req.body.availability, 
		profilePic: req.body.profilePic, 
		newPostingsForAsTutorCourses: req.body.newPostingsForAsTutorCourses, 
		newPostingsForAsTuteeCourses: req.body.newPostingsForAsTuteeCourses, 
		adminNotifications: req.body.adminNotifications, 
		specialOffersPromotions: req.body.specialOffersPromotions
	});

	newUser.save().then(
		result => {
			res.send(result);
		}, error => {
			log(error);
			res.status(400).send(error);
		}
	);
});

app.delete("/authentications/:username", (req, res) => {
	const username = req.params.username;
	Auth.find({userName: username}).then( user => {
		if (!user) {
			res.status(404).send();
		} else {
			res.send(user);
		}
	}).catch(
		error => {
			res.status(500).send();
		}
	);
});

app.delete("/users/:username", (req, res) => {
	const username = req.params.username;
	User.find({userName: username}).then( user => {
		if (!user) {
			res.status(404).send();
		} else {
			log("IN SERVER JS THE STUDENT IS ", user)
			res.send(user);
		}
	}).catch(
		error => {
			res.status(500).send();
		}
	);
});

/**
 * Route for getting all users, for admin purposes
 */
app.get("/users", (req, res) => {
	User.find().then(
		users => {
			log();
			res.send({
				users
			});
		}, 
		error => {
			res.status(500).send(error);
		}
	);
});

/**
 * Getting users by course taught
 */
app.get("/users/learn/:course", (req, res) => {
	const course = req.params.course; 
	let result = [];
	User.find().then(
		users => {
			for (let i = 0; i < users.length; i++){
				if (users[i].coursesTaught.includes(course)){
					result.push(users[i]);
				}
			}
			if (result.length > 0){
				res.send(result);
			} else {
				res.status(404).send();
			}
		}
	).catch(error => {
		log(error)
		res.status(500).send(error);
	});
}); 
/**
 * Getting users by courses learning
 */

app.get("/users/teach/:course_learning", (req, res) => {
	const learning = req.params.learning;
	let result = [];
	User.find().then(
		users => {
			for (let i = 0; i < users.length; i++){
				if (users[i].coursesLearning.includes(learning)){
					result.push(users[i]);
				}
			}
			if (result.length > 0){
				res.send(result);
			} else {
				res.status(404).send();
			}
		}
	).catch(error => {
		log(error)
		res.status(500).send(error);
	})
})


app.get("/users/:wildcard/:query", (req, res) => {
	const wildcard = req.params.wildcard; 
	const query = req.params.query;
	let findQuery;
	switch(wildcard){
		case "userName":
			findQuery = {
			userName: query 
			}
			break;
		case "experience":
			findQuery = {
				experience: query
			}
			break;
		case "firstName":
			findQuery = {
				firstName: query
			}
			break;
		case "lastName":
			findQuery = {
				lastName: query
			}
			break;
		case "email":
			findQuery = {
				email: query
			}
			break;
		default:
			log("Bad search query. Query by username, experience, firstname, or lastname.");
			res.status(400).send();
			break;
	}
	log("the find query generated was : ", findQuery)
	User.find(findQuery).then((users) => {
		if (!users){
			res.status(404).send();
		}
		log("INSIDE WILDCARD FINCTION TE USERS IS :")
		log(users)
		res.send(users)
	})
	
	

});


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

/// a DELETE route to remove a post by its id.
app.delete('/posts/:id', (req, res) => {
	const id = req.params.id;

	// Validate id
	if (!ObjectID.isValid(id)) {
		log("The id to delete the post was invalid!");
		res.status(404).send();
	}

	// Delete a post by its id
	Post.findByIdAndRemove(id).then((post) => {
		if (!post) {
			log("There was no student found with that id...")
			res.status(404).send();
		} else {   
			res.send(post);
		}
	}).catch((error) => {
		log("There was an error when deleting a post: ", error);
		res.status(500).send(); // server error, could not delete.
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

app.get('/users/:id', (req, res) => {
	log("Getting user by id");
	const id = req.params.id;

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		log("There was invalid id when getting a user by ID");
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
	}

	User.findById(id).then((user) => {
		if (!user){
			log("Couldn't find the user with the specified id");
			res.status(404).send()  // could not find this user
		}
		else {
			log("User is: ", user);
			res.status.send(user);
		}
	}).catch((error) => {
		log("There was an error when sending the user: ", error);
		res.status(500).send();  // server error
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

app.put('/users/:username', (req, res) => {
	log("Reached the put users function");
	const username = req.params.username;
	log("username is ", username);
	const body = req.body;
	log("req.body is ", req.body);
	User.findOneAndUpdate({userName: username}, {$set: body}, {new: true}).then((user) => {
		log("User after put is: ", user);
		if (!user) {
            log("Update response was NULL");
			res.status(404).send()
		} else {   
			res.send(user)
		}
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

// app.patch("/users/:wildcard/:query", (req, res) => {
// 	const wildcard = req.params.wildcard; 
// 	const query = req.params.query;
// 	let findQuery;
// 	switch(wildcard){
// 		case "userName":
// 			findQuery = {
// 			userName: query 
// 			}
// 			break;
// 		case "experience":
// 			findQuery = {
// 				experience: query
// 			}
// 			break;
// 		case "firstName":
// 			findQuery = {
// 				firstName: query
// 			}
// 			break;
// 		case "lastName":
// 			findQuery = {
// 				lastName: query
// 			}
// 			break;
// 		case "email":
// 			findQuery = {
// 				email: query
// 			}
// 			break;
// 		default:
// 			log("Bad search query. Query by username, experience, firstname, or lastname.");
// 			res.status(400).send();
// 			break;
// 	}
// 	log("the find query generated was : ", findQuery)
// 	User.find(findQuery).then((users) => {
// 		if (!users){
// 			res.status(404).send();
// 		}
// 		log("INSIDE WILDCARD PATCH FINCTION TE USERS IS :")
// 		log(users)
// 		if (users.length == 1){
// 			users = users[0];
// 		}
// 		//res.send(users)
// 	})
	
	

// });



/*************************************************/
// Express server listening...
const port = process.env.PORT || 3002
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 