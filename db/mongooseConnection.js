/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
   const mongoose = require('mongoose')
   console.log("Establishing the mongoose db connection");
   /* Connnect to our database */
   // Get the URI of the local database, or the one specified on deployment.
   const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27018/phase2'
   
   mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true});
   console.log("Established the mongoose db connection");
   module.exports = { mongoose }  // Export the active connection.