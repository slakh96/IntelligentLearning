//signup.js - contains the functions to create a new user and allow them to be signed up.
//import { getLoggedIn, setLoggedIn, User, addUser } from './User.js';
//import { searchByProp, searchByPropList} from './util.js';
const log = console.log;
const signUpBtn = document.querySelector('#signUpSubmit');
signUpBtn.addEventListener('click', addUser);
//Function to sign up a new user; contains checks to see if the info entered is valid.
//Pass it the values from the html side
function addUser(e){
    // SERVER REQUIRED, WILL ADD THE NEWLY OBTAINED PROFILE'S DATA AND STORE IT ON THE SERVER SIDE
    e.preventDefault();
    const popUpTxt = document.querySelector('#failExplanation');
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmpw").value;
    const email = document.querySelector("#email").value;
    const eduLevel = document.querySelector("#eduLevel").value;
    const phoneNumber = document.querySelector("#phoneNumber").value;
    if (firstName.length == 0 || lastName.length == 0 || username.length == 0 || password.length == 0 || email.length == 0 || 
            eduLevel.length == 0 || phoneNumber.length == 0 ){
                log("Please fill in all fields to create your account");
                popUpTxt.innerHTML = "Please fill in all fields to create your account";
                $('#saveConfirm').show();
                return false;
            }
    if (password != confirmPassword){
        popUpTxt.innerHTML = "Passwords do not match!";
        $('#saveConfirm').show();
        return false;
    }
    if (!email.includes("@")){
        popUpTxt.innerHTML = "Invalid email; please enter a valid email";
        $('#saveConfirm').show();
        return false;
    }
    if (conflictingInfo(username, email, phoneNumber)){
        popUpTxt.innerHTML = "There is already a user with this username, email or phone number. Please use another one.";
        $('#saveConfirm').show();
        return false;
    }
    log("ok");
    location.href = "./mainpage.html";
    return true;
    
}

$('#savePopupCloseButton1').click(function(){
    $('#saveConfirm').hide();
});

function newUser(firstName, lastName, username, password, confirmPassword, email, eduLevel, phoneNumber, teaching, beingTaught){
    // if (getLoggedIn() != null){
    //     log("SOMEONE IS ALREADY LOGGED IN WHY ARE WE MAKING NEW ACCOUNTS");
    // }
    // if (firstName.length == 0 || lastName.length == 0 || username.length == 0 || password.length == 0 || email.length == 0 || 
    //     eduLevel.length == 0 || phoneNumber.length == 0 ){
    //         log("Please fill in all fields to create your account");
    //         return false;
    //     }
    // if (password != confirmPassword){
    //     log("Passwords do not match!");
    //     return false;
    // }
    // if (!email.includes("@")){
    //     log("Invalid email; please enter a valid email");
    //     return false;
    // }
    // if (conflictingInfo(username, email, phoneNumber)){
    //     log("There is already a user with this username, email or phone number. Please use another one.");
    //     return false;
    // }
    // //Valid input
    // const teachingCourses = teaching.split(";"); //Array of items split at ;
    // const learningCourses = beingTaught.split(";"); // Array of items split at ;
    // for (let i = 0; i< teachingCourses.length; i++){
    //     teachingCourses[i] = teachingCourses[i].trim();
    // }
    // for (let i = 0; i< learningCourses.length; i++){
    //     learningCourses[i] = learningCourses[i].trim();
    // }
    // const newUser = new User(firstName, lastName, username, password, email, eduLevel, phoneNumber, teachingCourses, learningCourses);
    // addUser(newUser); //Adds the new user to the list of current users.
    // setLoggedIn(newUser);
    // //Redirect to the home page?
    // return true;
}
//Checks if the specified information is already assigned to an existing user. 
function conflictingInfo(username, email, phoneNumber){
    if (username == "user" || username == "admin"){
        return true;
    }
    if (email == "user@mail.utoronto.ca" || email == "admin@mail.utoronto.ca"){
        return true;
    }
    return false;
    // if (searchByProp("username", username) !== null){
    //     return true; //Someone else has the same username
    // }
    // if (searchByProp("email", email) !== null){
    //     return true; //This email is already in use
    // }
    // if (searchByProp("phone", phoneNumber) !== null){
    //     return true;
    // }
    // return false;
}