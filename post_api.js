'use strict'
const log = console.log

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const postObj = {postID: 1, userName: 'abcdefg', content: 'adsfasggdsgjlghjlkjgllcuyjghgsdgds', title: 'adsgasfgergg'}

// Import our mongoose connection
const mongoose = require('mongoose')
const { User, Course, Post, Review, Auth } = require('./models')
log(Post.collection.collectionName);
log(User.collection.collectionName);
log(Review.collection.collectionName);
log(Course.collection.collectionName);
log(Auth.collection.collectionName);

mongoose.connect(url, (error, client) => {
 
	if (error) throw error;

	const post = new Post(postObj)
   
	//post.save(insertErrHandler)
});


function convertToDBObj(dbName) {
	if (dbName == Post.collection.collectionName){
		return Post;
	}
	else if (dbName == User.collection.collectionName){
		return User;
	}
	else if (dbName == Review.collection.collectionName){
		return Review;
	}
	else if (dbName == Course.collection.collectionName){
		return Course;
	}
	else if (dbName == Auth.collection.collectionName){
		return Auth;
	}
	else {
		return null; // The user entered an invalid database
	}
}

function addItemToDB(item, dbName){
	const db = convertToDBObj(dbName);
}

//Handle insert query errors
function insertErrHandler(error, result) {
	if (error) {
		log("cannot insert data")
		throw error
	} else {
		log(result) // .ops has all the documents added
		//log(result.ops[0]._id.getTimestamp())
	}
}

//Handle find query errors
function findErrHandler(error, result) {
	if (error) {
		log("cannot find data")
		throw error
	} else {
		log(result) 
	}
}

//Handle update query errors
function updateErrHandler(error, result) {
	if (error) {
		log("cannot update data")
		throw error
	} else {
		log("Update Success") 
	}
}

//Handle delete query errors
function deleteErrHandler(error, result) {
	if (error) {
		log("cannot delete data")
		throw error
	} else {
		log("Delete Success") 
	}
}