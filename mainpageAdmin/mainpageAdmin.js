// height = 1200;
// numPosts = 9;
// let createButton = document.querySelector("#postCreatorBtn");
// console.log("Top of mainpageAdmin function");


// createButton.addEventListener('click', function(){
//     let submittedText = document.querySelector("#postCreatorInput").value;
//     let submittedTitle = document.querySelector('#postCreatorTitle').value;
//     if (submittedText == ""){
//         alert("Please enter text in the description box and try again!");
//     } 
//     else if (submittedTitle == ""){
//         alert("Please enter text in the title box and try again!");
//     }
//     else {
//         // HARDCODED HTML DOM MANIPULATION, THE REAL CALL WOULD REQUIRE SERVER
//         // SERVER WOULD BE ADDING THE POST TO THIS ADMIN USER'S PROFILE
//         numPosts++;
//         console.log("posting text");
//         // post text
//         let tn = document.createTextNode(submittedText)
//         let a1 = document.createElement("a")
//         let div1 = document.createElement("div")
//         div1.classList.add("postText")
//         div1.appendChild(a1.appendChild(tn));

//         // post time
//         let today = new Date();
//         let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//         let tn1 = document.createTextNode("X");
//         let tn2 = document.createTextNode(time);
//         let a11 = document.createElement("a")
//         let a12 = document.createElement("a")
//         let tn3 = document.createTextNode("Remove User");
//         let brk = document.createElement("br")
//         let brk2 = document.createElement("br")
//         let a13 = document.createElement("a");
//         //let tn12 = document.createTextNode("Jack Violence")
//         //let a22 = document.createElement("a")
//         a11.classList.add("postOps");
//         a11.classList.add("postRemove");
//         a13.classList.add("postOps");
//         a13.classList.add("userOps");
//         a11.appendChild(tn1);
//         a12.appendChild(tn2);
//         a13.appendChild(tn3);
//         let div2 = document.createElement("div")
//         div2.classList.add("timePosted")
//         div2.appendChild(a12);
//         div2.appendChild(a13);
//         div2.append(brk)
//         div2.append(brk2)
//         div2.appendChild(a11);

//         // post title
//         let tn11 = document.createTextNode(submittedTitle)
//         let a21 = document.createElement("a")
//         a21.href = "./profile_page.html"
//         a21.appendChild(tn11)
//         let div3 = document.createElement("div")
//         div3.classList.add("username")
//         div3.appendChild(a21)

//         //Post username
//         let tn12 = document.createTextNode("Jack Violence")
//         let a22 = document.createElement("a")
//         a22.href = "./profile_page.html"
//         a22.appendChild(tn12)
//         let div4 = document.createElement("div")
//         div4.appendChild(a22)

//         // master div
//         let masterdiv = document.createElement("div")
//         masterdiv.classList.add("post")
//         masterdiv.appendChild(div3)
//         masterdiv.appendChild(div2)
//         masterdiv.appendChild(div4);
//         masterdiv.appendChild(div1)

//         //adding to DOM
//         let postContainer = document.getElementById("postsContainer")
//         let firstChild = postContainer.firstChild
//         postContainer.insertBefore(masterdiv, firstChild)

//         //Add length of the page
//         let bodyContainer = document.getElementById("bodyContainer")
//         let newHeight = height += 150 
//         newHeight = numPosts * 250
//         bodyContainer.style.height = newHeight + "px"
//         document.querySelector("#postCreatorInput").value = ""
//         document.querySelector("#postCreatorTitle").value = ""
//         let postOps = document.getElementsByClassName("postRemove")
//         console.log(postOps)
//         a11.addEventListener('click', function(e){
//             console.log(e.target);
//             let parentPost = e.currentTarget.parentNode.parentNode
//             e.currentTarget.parentNode.parentNode.parentNode.removeChild(parentPost)
//             newHeight = height -= 125
//             bodyContainer.style.height = newHeight + "px"
//         })
//         let userOps = document.getElementsByClassName("userOps")
//         console.log(userOps)
//         a13.addEventListener('click', function(e){
//             console.log("Removing user/////////////////////////////sss");
//             e.currentTarget.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.innerHTML = "DELETED_USER";
//             console.log(e.currentTarget.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.innerHTML);
//             //e.currentTarget.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = "DELETED_USER";
//             //console.log(e.currentTarget.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
//             })
//     }
// })




// // Deleting posts

// let postOps = document.getElementsByClassName("postRemove");
// //console.log(postOps)
// // WOULD REQUIRE SERVER, THIS IS HARDCODED 
// // SERVER WOULD REMOVE THE POST FROM ANY USER'S PROFILE, AND SEND A WARNING TO THE USER
// for (let i = 0; i < postOps.length; i++){
//     postOps[i].addEventListener('click', function(e){
//         console.log("Post remove function");
//         numPosts --;
//         let parentPost = e.currentTarget.parentNode.parentNode
//         e.currentTarget.parentNode.parentNode.parentNode.removeChild(parentPost)
//         let bodyContainer = document.getElementById("bodyContainer")
//         let newHeight = height -= 125
//         newHeight = numPosts * 250;
//         bodyContainer.style.height = newHeight + "px"
//     })
// }

// //Deleting users

// let userOps = document.getElementsByClassName("userOps");
// // THIS IS A HARDCODED FUNCTION AS WELL, WILL REQUIRE SERVER
// // SERVER WILL REMOVE USER FROM THE SYSTEM, AND SEND THE REMOVED USER AN EMAIL SAYING THAT THEIR ACCOUNT HAS BEEN REMOVED 
// for (let i = 0; i < userOps.length; i++){
//     userOps[i].addEventListener('click', function(e){
//         console.log("Removing user///");
//         e.currentTarget.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = "DELETED_USER";
//         console.log(e.currentTarget.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
//     })
// }

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