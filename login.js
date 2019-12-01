//login.js - this file handles the js for logging in, including authentication

//import { setLoggedInProp, getLoggedIn, getLoggedInProp, getAllUsers, setLoggedIn } from './User.js';
const log = console.log;
const loginBtn = document.querySelector('#loginButton');
loginBtn.addEventListener('click', onLogin);
function onLogin(e) {
    //Get the properties from the html
    e.preventDefault();
    const username = document.querySelector("#usernameText").value;
    const password = document.querySelector("#passwordText").value;
    // The authentication process that follows is hardcoded
    // will need server calls to function fully 
    if (username == "user"){
        if (password == "user"){
            log("Logged in as standard user!");
            location.href = "./mainpage.html";
        }
        else {
            log("incorrect username/password, please try again.");
            $('#saveConfirm').show();
        }
    }
    else if (username == "admin"){
        if (password == "admin"){
            log("Logged in as admin user!");
            location.href = "./mainpageAdmin.html";
        }
        else {
            log("incorrect username/password, please try again.");
            $('#saveConfirm').show();
        }
    } else {
        log("about to send to Authentication database")
        const url = '/authentications' 

        fetch(url).then((response) => {
            if(response.status === 200){
                // return a promise that resolves with the JSON body 
                log("received from the Authentication database")
                log(response.json())

                // Now let's check if the password entered was correct 
                if(password === response.password){
                    log("ACCESS GRANTED")
                }
                else {
                    log("ACCESS DENIED")
                }
            } else {
                alert('Could not get from the Authentication database')
            }
        }).then((json) => {
            log("the query was successful")
            log(json)
        }).catch((error) => {
            log("There was an error...")
            log(error)
        })
    }
    

    /*
    This code commented out because 
    else {
        log("incorrect username/password, please try again.");
        $('#saveConfirm').show();
    }
    $('#savePopupCloseButton1').click(function(){
        $('#saveConfirm').hide();
    });
    */
    
//     const allUsers = getAllUsers();
//     if (getLoggedIn() != null) {
//         log("ERROR THERE IS ALREADY SOMEONE LOGGED IN WHY ARE WE ALLOWING SOMEONE ELSE TO LOG IN");
//     }
//     for (let i = 0; i < allUsers.length; i++){
//         log(allUsers[i].username);
//         if (allUsers[i].username == username) {
//             if (allUsers[i].password == password){
//                 setLoggedIn(allUsers[i]);
//                 log("Logged in!");
//                 return true;
//                 //Redirect to home page, tho maybe not here

//             }
//             else {
//                 log("ERROR: Incorrect Password");
//                 return false;
//             }
//         }
//     }
//     log("ERROR: Incorrect Username");
//     return false;
// }
// function onLogout(e) {
//     e.preventDefault();
//     setLoggedIn(null);
//     //Redirect to login page, tho maybe not from here
}