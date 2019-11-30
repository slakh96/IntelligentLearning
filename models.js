const mongoose = require('mongoose')

const User = mongoose.model('users', {
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
		type: Array,
		required: false
    },
    linkedInLink: {
		type: String,
		required: false,
		trim: true
    },
    resumeLink: {
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

const Course = mongoose.model("courses", {
  code: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

const Post = mongoose.model("posts", {
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
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  }
});

const Review = mongoose.model("reviews", {
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

const Auth = mongoose.model("authentications", {
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