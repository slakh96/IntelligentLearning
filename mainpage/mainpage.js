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
                        username = resp.currentUser;
                        // The data we are going to send in our request
                        let data = {
                            userName: username, //TODO: Change to person logged in
                            content: content,
                            time: time,
                            title: title
                        }
                        return data;
                    } else {
                        log("ooga booga")
                        return Promise.reject(resp);
                    }
                }
            ).then(
                data => {
                    log("USERNAME HAHA")
                    log(username)
                    if (data.userName.length > 0){
                        fetch(request).then(function(res) {
                            log(res);
                        })
                    } else {
                        return Promise.reject(username);
                    }
                }
            ).catch(
                error => {
                    if (error) throw error
                }
            )
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