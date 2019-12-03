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
    let currentUser = "";

    log("about to send to Authentication database");
    const url = '/authentications/login'; 
    let sessionURL = '/users/check-session';

    const auth = {
        userName: username, 
        password: password
    }

    const request = new Request(url, {
        method:"post", 
        body: JSON.stringify(auth), 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    fetch(request).then(
        res => {
            if (res.status != 200){
                $('#saveConfirm').show();
                log("Rejecting promise in login js");
                return Promise.reject(res);

            }
        }
    ).then(
        () => {
            setTimeout(() => {
                location.href = "../mainpage/mainpage.html"
            }, 1000);
        }
    ).catch(
        error => {
            log("Error handling block in login js");
            log(error);
        }
    );

    $('#savePopupCloseButton1').click(function(){
        $('#saveConfirm').hide();
    });
}