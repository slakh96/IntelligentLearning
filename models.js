const mongoose = require('mongoose')

const User = mongoose.model('User', {
	firstName: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
    },
    lastName: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	email: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
    },
    highestEdu: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
    },
    userName: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
    },
    phoneNumber: {
		type: Number,
		required: true,
		minlegth: 1,
		trim: true
    },
    coursesTaught: {
		type: Array,
        required: false
    },
    coursesLearning: {
		type: Array,
		required: false
    },
    about: {
		type: String,
		required: false,
		trim: true
    },
    experience: {
		type: mongoose.Mixed,
		required: false
    },
    linkedInLink: {
		type: String,
		required: false,
		trim: true
    },
    availability: {
		type: mongoose.Mixed,
		required: false
    },
    profilePic: {
		type: String,
		required: false
    },
    newPostingsForAsTutorCourses: {
        type: Boolean,
        required: false
    },
    newPostingsForAsTutorCourses: {
        type: Boolean,
        default: true
    },
    newPostingsForAsTuteeCourses: {
        type: Boolean,
        default: true
    },
    adminNotifications: {
        type: Boolean,
        default: true
    },
    speacialOffersPromotions: {
        type: Boolean,
        default: true
    }
});

const Course = mongoose.model("Course", {
  code: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

const Post = mongoose.model("Post", {
  postID: {
    type: Number,
    required: true
  },
  userName: {
    type: String,
		required: true,
		minlegth: 1,
		trim: true
  },
  content: {
    type: String,
    required: true
  },
  time: {
    type = Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  }
});

const Review = mongoose.model("Review", {
  reviewID: {
    type: Number,
    required: true
  },
  author: {
    type: String,
		required: true,
		minlegth: 1,
		trim: true
  },
  target: {
    type: String,
		required: true,
		minlegth: 1,
		trim: true
  },
  content: {
    type: String,
    trim: true
  },
  rating: {
    type: Number, 
    required: true
  }
});

const Auth = mongoose.model("Authentication", {
    userName: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    }
  });

module.exports = { User, Course, Post, Review, Auth }