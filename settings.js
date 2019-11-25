//File to handle interactions with the settings page
//const mongooseUtil = require("../IntelligentLearning/mongoose-functions");
//import {convertToDBObj} from "../IntelligentLearning/mongoose-functions";
const log = console.log;
log('Loaded front-end javascript.');
//This will be the script.js
function getLoggedInInfo(e){
    e.preventDefault();
    log("Reached the getLoggedIn function");
    const url = '/users';
    fetch(url).then((response) => { 
        if (response.status === 200) {
            // return a promise that resolves with the JSON body
            //log(response.json());
            log("Returning a positive result...")
           return response.json(); 
       } else {
            alert('Could not get loggedIn');
       }                
    }).then((json) => {
        log("The query was successful");
        log(json);
    }).catch((error) => {
        log("There was an error...");
        log(error);
    })
}

function saveLoggedInInfo(e){
    e.preventDefault();
    log("Reached the saveLoggedIn function");
    const url = '/users';
    log("URL is ", url);
    const data = {firstName: "Mitch", lastName: "Marner", email: "jakemuzzin@yahoo.com",
     highestEdu: "Undergraduate", userName: "jakeMuzzin8", phoneNumber: "1234567890",
     coursesTaught: "CSC309", coursesLearning: "CSC311", about: "U of T Student", 
    experience: "Two years teaching at a math learning center", linkedInLink: "https://linkedin.com/jakemuzzin8", 
    profilePic: "jakemuzzin.jpg", newPostingsForAsTutorCourses: false
    };
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request).then(function(response) {
        log("Sent!");
        log(response);
    }).catch((err) => {
        log("ERROR when receiving from savefn: ", err)
    });
};




//log(user1.firstName);
const saveBtn = document.querySelector('#save');
const cancelBtn = document.querySelector('#cancel');
saveBtn.addEventListener('click', saveLoggedInInfo);
cancelBtn.addEventListener('click', getLoggedInInfo);
function onSave(e) {
    // SERVER REQUIRED, WILL BE SAVING ALL THE CHANGED PROPERTIES IN THE CORRESPONDING USER OBJECT
    e.preventDefault();
    $('#saveConfirm').show();
    //$('#coursePopupWindow1').hide();
    }



    // const loggedIn = getLoggedIn();
    // const userProps = Object.keys(loggedIn);
    // for (let i = 0; i < userProps.length; i++){
    //     const stringProp = String(userProps[i]);
    //     const selector = '#'.concat(stringProp);
    //     //log(selector);
    //     const val = (document.querySelector(selector)).value;
    //     //log(prop);
    //     setLoggedInProp(stringProp, val);
    // }
$('#savePopupCloseButton1').click(function(){
    $('#saveConfirm').hide();
});
function onCancel(e) {
    //e.preventDefault();
    //onInit(e);
}

function onInit(e) {
    //e.preventDefault();
    // const loggedIn = getLoggedIn();
    // const userProps = Object.keys(loggedIn);
    // for (let i = 0; i < userProps.length; i++){
    //     const stringProp = String(userProps[i]);
    //     const curValue = getLoggedInProp(stringProp);
    //     const selector = '#'.concat(stringProp);
    //     (document.querySelector(selector)).value = curValue;
    // }
}
