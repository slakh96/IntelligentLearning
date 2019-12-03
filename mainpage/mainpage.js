const log = console.log;
log('Loaded front-end javascript.');

function getAllPosts(e){
    //e.preventDefault();
    log("Reached the getAllPosts function");
    const url = '/posts';
    fetch(url).then((response) => { 
        if (response.status === 200) {
            // return a promise that resolves with the JSON body
            //log(response.json());
            log("Returning a positive result...")
           return response.json(); 
       } else {
            alert('Could not get posts');
       }                
    }).then((json) => {
        log("The query was successful");
        log(json);
    }).catch((error) => {
        log("There was an error...");
        log(error);
    })
}

function getUserData(){
    const url = "/users/check-session";


}

function addPost(e) {
    e.preventDefault();
    // the URL for the request
    const url = '/posts';
    let title = document.querySelector("#postCreatorTitle").value;
    let time = Date.now();
    let content = document.querySelector("#postCreatorInput").value; 
    let username = "";
    const cookieurl = '/users/check-session';
    // The data we are going to send in our request
    let data = {
        userName: "kasperiKapanen", //TODO: Change to person logged in
        content: "This is a test post",
        time: new Date(),
        title: "I am a Leafs player"
    }
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    // Send the request with fetch()
    fetch(cookieurl).then(
        response => {
            log("response is ");
            log(response);
            response.json().then(
                resp => {
                    log("resp is ")
                    log(resp)
                    if (resp){
                        log("haha ooga booga")
                        log(resp)
                    } else {
                        log("ooga booga")
                        return Promise.reject(resp);
                    }
                }
            )
        }
    ).then(
        res => {
            if (username.length > 0){
                fetch(request).then(function(res) {
                    log(res);
                })
            } else {
                return Promise.reject()
            }
        }
    ).catch((error) => {
        log("There was an error when adding a post!");
        log(error);
    });
}

// Adding posts

height = 1200;
numPosts = 9;
let createButton = document.querySelector("#postCreatorBtn");
createButton.addEventListener('click', addPost);