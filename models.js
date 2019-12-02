const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const log = console.log;

const UserSchema = new mongoose.Schema({
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
    specialOffersPromotions: {
        type: Boolean,
        default: true
    }
});

const AuthSchema = new mongoose.Schema({
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

const ReviewSchema = new mongoose.Schema({
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

const PostSchema = new mongoose.Schema({
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

const CourseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});



/** Mongoose Schema Functions for Authentication **/
AuthSchema.pre('save', function(next){
  const user = this;
  if (user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash; 
        next();
      });
    });
  } else {
    next();
  }
})

AuthSchema.statics.findByUsernamePassword = function(username, password) {
  const Auth = this;
  return Auth.findOne({userName: username}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        log(result);
        if (result){
          resolve(user)
        } else {
          reject();
        }
      });
    });
  });
};





const User = mongoose.model('users', UserSchema);

const Course = mongoose.model("courses", CourseSchema);

const Post = mongoose.model("posts", PostSchema);

const Review = mongoose.model("reviews", ReviewSchema);

const Auth = mongoose.model("authentications", AuthSchema);

module.exports = { User, Course, Post, Review, Auth }