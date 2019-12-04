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

// handlebars templating engine
const hbs = require('hbs')
// Set express property 'view engine' to be 'hbs'
app.set('view engine', 'hbs')
// setting up partials directory
// hbs.registerPartials(__dirname + '/views/partials')

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

// mainpage route will check if the user is logged in and serve
// the mainpage
app.get('/mainpage', (req, res) => {
	if (req.session.user) {
		const username = req.session.username
		log("stuff got here brossss")
		log(username);
		User.find({userName:username}).then( (user) => {
			if (!user) {
				res.status(404).send();
			} else {
				let allPosts = []
				Post.find({}).then((posts) => {
					if (!posts) {
						res.status(404).send();
					} else {
						allPosts = posts
					}
				}, (error) => {
					res.status(500).send(error) // server error
				})
				let coursesT = []
				user.coursesTaught.forEach((course) => coursesT.push({courseName: course}))
				let coursesL = []
				user.coursesLearning.forEach((course) => coursesL.push({courseName: course}))
				res.render('./mainpage/mainpage.hbs', {
					profilePic: user.profilePic,
					firstName: user.firstName,
					lastName: user.lastName,
					coursesTaught: coursesT,
					coursesLearning: coursesL,
					post: allPosts
				})
			}
		}).catch(
			error => {
				res.status(500).send();
			}
		);
	} else {
		res.redirect('/login')
	}
})

// profile page route will check if the user is logged in and serve
// the profile page
app.get('/profile_page', (req, res) => {
	if (req.session.user) {
		const username = req.session.userName
		User.find({userName:username}).then( (user) => {
			if (!user) {
				res.status(404).send();
			} else {
				const courses = []
				user.coursesTaught.array.forEach( (courseCode) => {
					Course.find({code:courseCode}).then( (course) => {
						if (!course) {
							res.status(404).send();
						} else {
							courses.push({code:course.code, name:course.name, link:course.link})
						}
					}).catch(
						error => {
							res.status(500).send();
						}
					);
				});
				let reviews = []
				Review.find({target: username}).then( (allReviews) => {
					if (!allReviews) {
						res.status(404).send();
					} else {
						reviews = allReviews
					}
				}).catch(
					error => {
						res.status(500).send();
					}
				);
				res.render('./profile_page/profile_page.hbs', {
					profilePic: user.profilePic,
					firstName: user.firstName,
					lastName: user.lastName,
					description: user.description,
					email: user.email,
					phoneNumber: user.phoneNumber,
					linkedInLink: user.linkedInLink,
					resumeLink: user.resumeLink,
					about: user.about,
					experience: user.experience,
					userCourse: courses,
					userReview: reviews
				})
			}
		}).catch(
			error => {
				res.status(500).send();
			}
		);
	} else {
		res.redirect('/login')
	}
})

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
	log("INSIDE USERS LOGOUT THIS IS HIGHLY")
	req.session.destroy(error => {
		if (error) {
			res.status(500).send(error);
		} else {
			log("Cleared session cookie");
			res.status(200).send();
			//res.sendFile(__dirname + '/login/login.html');
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
app.put("/authentications/:username", (req, res) => {
	log("Reached username update in auth PUT function");
	const username = req.params.username;
	const newUsername = req.body.userName;
	const password = req.body.password;
	const query = {userName: newUsername};
	if (password != undefined && password.length > 0){
		query.password = password;
	}
	log("New username is ", newUsername);
	log("New password is ", password)
	log("Query is ", query);

	Auth.findOne({userName: username}).then(
		user => {
			if (!user){
				res.status(404).send();
			} else {
				user.userName = newUsername;
				user.password = password;
				user.save().then(
					result => {
						if (!result){
							log("Server side error")
							res.status(500).send();
						} else {
							res.status(200).send();
						}
					}
				)
			}
		}
	)

	// const updatedAuthUser = new Auth(query);
	// updatedAuthUser.save().then((result) => {
	// 	log("Result is ", result);
	// 	if (!result){
	// 		res.status(404).send();
	// 	}
	// 	else{
	// 		res.status(200).send(result);
	// 	}
	// })
});



// });
app.patch("/authentications/:username", (req, res) => {
	log("Reached username update in auth function");
	const username = req.params.username;
	const newUsername = req.body.userName;
	const password = req.body.password;
	const query = {userName: newUsername};
	if (password != undefined && password.length > 0){
		query.password = password;
	}
	log("New username is ", newUsername);
	log("New password is ", password)
	log("Query is ", query);
	Auth.findOneAndUpdate({userName: username}, {$set: query}, {new: true}).then((user) => {
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

	const redirect = "/mainpage"
	
	Auth.findByUsernamePassword(auth.userName, auth.password).then(
		user => {
			log("Adding a user to the session: ", user.userName);
			req.session.user = user._id;
			req.session.username = user.userName;
			res.send({currentUser: req.session.userName});
			//res.redirect(redirect);
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
			
			req.session.user = result._id;
			req.session.username = result.userName;
			log("reqsessionuser is ", req.session.user);
			log("req session username is  ", req.session.username);
			//log("Result after signing up is ", result);
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
	log("Reached the wildcard get function ");
	log("Wildcard is ", wildcard);
	log("Query is ", query);
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
			findQuery = {};
			//res.status(400).send();
			break;
	}
	log("the find query generated was : ", findQuery)
	User.find(findQuery).then((users) => {
		if (!users){
			res.status(404).send();
		}
		//log("INSIDE WILDCARD FINCTION TE USERS IS :")
		//log(users)
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
	Post.deleteOne({time: id}).catch(
		(error) => {
		log("There was an error when deleting a post: ", error);
		res.status(500).send(); // server error, could not delete.
	});
});

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
	//log("username is ", username);
	const body = req.body;
	//log("req.body is ", req.body);
	User.findOneAndUpdate({userName: username}, {$set: body}, {new: true}).then((user) => {
		log("User after put is: ", user);
		if (!user) {
            log("Update response was NULL");
			res.status(404).send()
		} else {   
			req.session.username = req.body.userName;
			log("req.session.username is now ", req.session.username);
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

// GET COURSE BY COURSE CODE
app.get('/courses/:code', (req, res) => {
	log("REACHED 727")
	const courseCode = req.params.code;
	Course.findOne({code: courseCode}).then((course) => {
		if (!course){
			log("Couldn't find the course with the specified code");
			res.status(404).send()  // could not find this user
		}
		else {
			// log("Course is: ", course);
			res.status(200).send(course);
		}
	}).catch((error) => {
		log("There was an error when sending the course: ", error);
		res.status(500).send();  // server error
	})
})

// GET reviews BY target
app.get('/reviews/:target', (req, res) => {
	const targetName = req.params.target;
	Review.find({target: targetName}).then((allReviews) => {
		if (!allReviews){
			res.status(404).send()  // could not find reviews
		}
		else {
			// log("Course is: ", course);
			res.status(200).send(allReviews);
		}
	}).catch((error) => {
		log("There was an error when sending the course: ", error);
		res.status(500).send();  // server error
	})
})

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3002
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 