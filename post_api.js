'use strict'
const log = console.log

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const postObj = {postID: 1, userName: 'abcdefg', content: 'adsfasggdsgjlghjlkjgllcuyjghgsdgds', title: 'adsgasfgergg'}

// Import our mongoose connection
const mongoose = require('mongoose')
const { User, Course, Post, Review, Auth } = require('./models')

mongoose.connect(url, (error, client) => {
 
	if (error) throw error;

	const post = new Post(postObj)
   
	post.save(insertErrHandler)
});

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