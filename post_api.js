'use strict'
const log = console.log

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const postObj = {postID: 1, userName: 'abcdefg', content: 'adsfasggdsgjlghjlkjgllcuyjghgsdgds', title: 'adsgasfgergg'}

// Import our mongoose connection
const mongoose = require('mongoose')
const { User, Course, Post, Review, Auth } = require('./models')

const models = [User, Course, Post, Review, Auth];

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

//Converts a database name; returns null if invalid database name
function convertToDBObj(dbName) {
	const result =  models.filter((model) => {
		return model.collection.collectionName == dbName;
	})
	if (result.length == 0){
		return null;
	}
	if (result.length > 1){
		log("WHY ARE THERE MULTIPLE MODELS WITH SAME NAME??");
	}
	return result[0]; //Should have only one item in it.
}

//Converts a database name
function convertToDBObj2(dbName) {
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

//Adds an item to the specified database. Throws error if unable to connect. Returns -1 on failure.
function addItemToDB(item, dbName){
	mongoose.connect(url, (error, client) => {
 
		if (error) throw error;
		const db = convertToDBObj(dbName);
		if (db == null){
			log("There was an invalid database name entered!");
			return -1;
		}
		const itemToAdd = new db(item);
		itemToAdd.save(insertErrHandler);
		return 0;
	});
}

//Removes an item from the specified database. Throws error if unable to connect. Returns -1 on failure.
function removeItemFromDB(item, dbName){
	mongoose.connect(url, (error, client) => {
 
		if (error) throw error;
		const db = convertToDBObj(dbName);
		if (db == null){
			log("There was an invalid database name entered!");
			return -1;
		}
		db.deleteOne(item, deleteErrHandler)
		return 0;
	});
}

function updateItemInDB(query, newAttributes, dbName){
	mongoose.connect(url, (error, client) => {
		if (error) throw error;
		const db = convertToDBObj(dbName);
		if (db == null){
			log("There was an invalid database name entered!");
			return -1;
		}
		db.updateMany(query, newAttributes, updateErrHandler);
		return 0;
	});
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

//Testing123
const addObj = {postID: 50, userName: 'lakhan77', content: 'William Nylander', title: 'Coach Keefe'}
const courseObj = {$set: {code: "CSC325", link: "http://CSC325.com"}};
updateItemInDB({code: "CSC324"}, courseObj, "courses");