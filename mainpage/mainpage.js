const log = console.log;
log('Loaded front-end javascript.');

// function signOut(){
//     const url = '/users/logout';
//     fetch(url).then((result) => {
//         log("Redirecting...");
//        window.location.replace("../index/index.html");
//     }).catch((error) => {
//         log("There was an error when signing out: ", error);
//     })
// }

function getAllPosts(e){
    //e.preventDefault();
    log("Reached the getAllPosts function");
    const url = '/posts';
    fetch(url).then((response) => { 
        if (response.status === 200) {
            // return a promise that resolves with the JSON body
            //log(response.json());
            log("Returning a positive result...")
           response.json().then(
               result => {
                   log("this stuff ")
                    updateDOM(result.posts);
               }
           ); 
       } else {
            alert('Could not get posts');
       }                
    }).then((json) => {
        log("something here idk")
    }).catch((error) => {
        log("There was an error...");
        log(error);
    })
}

function initialSetup(e){
    const url = '/posts';
    fetch(url).then((response) => { 
        if (response.status === 200) {
            // return a promise that resolves with the JSON body
            //log(response.json());
            log("Returning a positive result...")
           response.json().then(
               result => {
                   log("this stuff ")
                    updateDOM(result.posts);
               }
           ); 
       } else {
            alert('Could not get posts');
       }                
    }).then((json) => {
        log("something here idk")
    }).catch((error) => {
        log("There was an error...");
        log(error);
    });

    const cookieurl = '/users/check-session';
    let username = "";
    fetch(cookieurl).then(
        response => {
            response.json().then(
                cookie => {
                    if (cookie){
                        username = cookie.currentUser
                        document.querySelector("#profileName a").textContent = username;
                        const miniurl = "/users/userName/" + username
                        fetch(miniurl).then(
                            users => {
                                log ("users HEEERERESJ;FLKADJ;FLKASDJ;LFIASJHJF;")
                                log(users);
                                users.json().then(
                                    stuff => {
                                        log("STUFF LOGGIN")
                                        log(stuff)
                                        const currentUser = stuff[0]
                                        document.querySelector("#courseslol").textContent = ""+currentUser.coursesTaught
                                        document.querySelector("#subjslol").textContent = ""+currentUser.coursesLearning
                                    }
                                )
                            }
                        )
                    }
                }
            )
        }
    )
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
    fetch(cookieurl).then(
        response => {
            response.json().then(
                resp => {
                    if (resp){
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
                        return Promise.reject(resp);
                    }
                }
            ).then(
                data => {
                    if (data.userName.length > 0){
                        const request = new Request(url, {
                            method: 'POST', 
                            body: JSON.stringify(data),
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json'
                            },
                        });
                        fetch(request).then(
                            () => {
                                const allPosts = "/posts"
                                fetch(allPosts).then(
                                    posts => {
                                        //log("THE POSTS CURRENTLY IN THE THING ARE THE FOLLOWING")
                                        posts.json().then(
                                            result => {
                                                clearText()
                                                clearDOM()
                                                log("type of result.posts")
                                                log(typeof(result.posts))
                                                updateDOM(result.posts)
                                            }
                                        )
                                    }
                                )
                            }
                        )
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
function clearText(){
    document.querySelector("#postCreatorTitle").value = "";
    document.querySelector("#postCreatorInput").value = "";
}

function clearDOM(){
    document.querySelector("#postsContainer").innerHTML = ""
    const postHTML = "<div class=\"post\"><div class=\"username\"><a href=\"./profile_page.html\">Welcome to Intelligent Learning!</a></div><div class=\"timePosted\"><a>10:09 am</a><p>Intelligent Learning</p></div><br><div class=\"postText\"><a>Want to see the options you have available? <br> Search people by subject taught in the search function. <br> Feel free to explore the posts on your homepage as well!</a></div></div>"
    document.querySelector("#postsContainer").innerHTML = postHTML;
}

function updateDOM(posts){
    log("POSTS ARE THE FOLLOWING LOLLLLLL")
    log(posts); 
    if (posts.length > 0){
        document.querySelector("#postsContainer").innerHTML = ""
        let height = 0;      
        let currentPost = null;
        for (let i = 0; i < posts.length; i++){
            currentPost = posts[i];
            height += 250;
            document.querySelector("#postsContainer").innerHTML += "<div class=\"post\"><div class=\"username\"><a href=\"./profile_page.html\">"+(currentPost.title)+"</a></div><div class=\"timePosted\"><a>"+(currentPost.time)+"</a><p>"+(currentPost.userName)+"</p></div><br><div class=\"postText\"><a>"+(currentPost.content)+"</a></div></div>"
        }
        document.getElementById("bodyContainer").style.height = (100 + height)+"px"
    }
}

height = 1200;
numPosts = 9;
let createButton = document.querySelector("#postCreatorBtn");
createButton.addEventListener('click', addPost);