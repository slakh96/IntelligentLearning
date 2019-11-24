'use strict'
const log = console.log

const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'

const mongoose = require('mongoose')

const { User, Course, Post, Review, Auth } = require('./models')

function findItemInDB(query, dbName) {
    mongoose.connect(url, (error, client) => {
        if (error) throw error;
        const output = convertToDBObj(dbName).find(query, findErrHandler)
        log(output)
    });
}


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
		// log(result)
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

const query1 = {postID: 1};
findItemInDB(query1, 'posts')