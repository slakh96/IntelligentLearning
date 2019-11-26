
const log = console.log;
log('Loaded front-end javascript.');

function getAllPosts(e){
    e.preventDefault();
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

function addPost(e) {
    e.preventDefault();
    // the URL for the request
    const url = '/posts';

    // The data we are going to send in our request
    let data = {
        postID: 16,
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
    fetch(request).then(function(res) {
        log(res);
    }).catch((error) => {
        log("There was an error when adding a post!");
        log(error);
    });
}

// Adding posts

height = 1200;
numPosts = 9
let createButton = document.querySelector("#postCreatorBtn");
createButton.addEventListener('click', addPost);
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
//         // THIS IS JUST THE PHYSICAL HARDCODED IMPLEMENTATION
//         // SERVER CALL REQUIRED TO ADD THIS POST TO THE PROFILE'S POSTS 
//         numPosts ++;
//         // post text
//         let tn = document.createTextNode(submittedText)
//         let a1 = document.createElement("a")
//         let div1 = document.createElement("div")
//         div1.classList.add("postText")
//         div1.appendChild(a1.appendChild(tn));

//         // post time
//         let today = new Date();
//         let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//         let tn1 = document.createTextNode("");
//         let tn2 = document.createTextNode(time);
//         let a11 = document.createElement("a")
//         let a12 = document.createElement("a")
//         //let tn12 = document.createTextNode("Jack Violence")
//         //let a22 = document.createElement("a")
//         a11.classList.add("postOps")
//         a11.appendChild(tn1)
//         a12.appendChild(tn2)
//         let div2 = document.createElement("div")
//         div2.classList.add("timePosted")
//         div2.appendChild(a12)
//         div2.appendChild(a11)

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
//         let postOps = document.getElementsByClassName("postOps")
//         //console.log(postOps)
//         for (let i = 0; i < postOps.length; i++){
//             postOps[i].addEventListener('click', function(e){
//             console.log(e.target);
//             let parentPost = e.currentTarget.parentNode.parentNode
//             e.currentTarget.parentNode.parentNode.parentNode.removeChild(parentPost)
//             newHeight = height -= 125
//             bodyContainer.style.height = newHeight + "px"
//             })
//         }
//     }
// })

// // Deleting posts

// let postOps = document.getElementsByClassName("postOps")
// console.log(postOps)
// for (let i = 0; i < postOps.length; i++){
//     postOps[i].addEventListener('click', function(e){
//         console.log(e.target);
//         let parentPost = e.currentTarget.parentNode.parentNode
//         e.currentTarget.parentNode.parentNode.parentNode.removeChild(parentPost)
//         let bodyContainer = document.getElementById("bodyContainer")
//         let newHeight = height -= 125
//         bodyContainer.style.height = newHeight + "px"
//     })
// }