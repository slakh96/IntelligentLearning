/* E2 Library - JS */

/*-----------------------------------------------------------*/
/* This is the code for the search page 
/*-----------------------------------------------------------*/
//import { setLoggedInProp, getLoggedIn, getLoggedInProp, getAllUsers, setLoggedIn, User } from './User.js';
// global variables 

///const user1 = new User();
const user1 = {
    firstName: "Abhi",
    lastName: "Kapoor",
    username: "user",
    password: "user",
    email: "abhi.kapoor@mail.utoronto.ca",
    eduLevel: "Undergraduate",
    phone: "18009249436",
    about: "I'm a strong 4th year student at the University of Toronto's Computer Science department. After spending over 2 years teaching various students fundamental JavaScript concepts, I've realized that my passion is to help new students gain an interest in web development.",
    experience: "Having worked as a Teaching Assistance at UofT for over 2 years, I've gained significant experience helping students understand even the most difficult concepts. Furthermore, I've volunteered as a tutor to help various young children in underdeveloped countries learning the basics of web programming. My strong experience coupled with my passion for teaching makes me an excellent candidate to be a tutor",
    resume: "/AbhiKapoorResume.pdf",
    linkedin: "https://linkedin/in/legendary.programmer",
    availability: "Weekday Evenings; Weekend Mornings",
    teaching: "CSC309, CSC324",
    beingTaught: "CSC108, CSC104",
    pic: "https://cdn.vox-cdn.com/thumbor/UbuUqi1oiUWZEiTe_mImgYTx3mo=/0x0:5004x3336/1200x800/filters:focal(2052x1306:2852x2106)/cdn.vox-cdn.com/uploads/chorus_image/image/64675676/1144469836.jpg.0.jpg",
    asTutorN: false,
    asTuteeN: false,
    adminN: false,
    promotionsN: true
}
const user2 = {
    firstName: "Sultan",
    lastName: "Kapoor",
    username: "sidhu",
    password: "user",
    email: "sidhu@mail.utoronto.ca",
    eduLevel: "Undergraduate",
    phone: "18009249437",
    about: "I'm a strong 1st year student at the University of Toronto's Computer Science department. After spending over 20 years teaching various students fundamental JavaScript concepts, I've realized that my passion is to help new students gain an interest in web development.",
    experience: "Having worked as a Teaching Assistance at UofT for over 6 years, I've gained significant experience helping students understand even the most difficult concepts. Furthermore, I've volunteered as a tutor to help various young children in underdeveloped countries learning the basics of web programming. My strong experience coupled with my passion for teaching makes me an excellent candidate to be a tutor",
    resume: "/SidhuResume.pdf",
    linkedin: "https://linkedin/in/legendaryer.programmer",
    availability: "Weekday Mornings; Weekend Mornings",
    teaching: "CSC309, CSC324, CSC369",
    beingTaught: "CSC108, CSC104, CSC300",
    pic: "https://cdn.vox-cdn.com/thumbor/UbuUqi1oiUWZEiTe_mImgYTx3mo=/0x0:5004x3336/1200x800/filters:focal(2052x1306:2852x2106)/cdn.vox-cdn.com/uploads/chorus_image/image/64675676/1144469836.jpg.0.jpg",
    asTutorN: false,
    asTuteeN: false,
    adminN: false,
    promotionsN: true
}
const searchButton = document.querySelector("#searchButton")
searchButton.addEventListener('click', displayAllResults)

// This function displays all the results when the search button is clicked 
function displayAllResults(e){

    // HARDCODED CALL, WILL REQUIRE SERVER
    // THE SERVER WILL BE ABLE TO GO THROUGH PROFILES AND SEARCH THE POSTS RELATING TO SEARCH QUERY
    // ALONG WITH ANY USERS WHO MAY BE TEACHING, OR SEEKING TO LEARN, THE SEARCHED COURSE / QUERY 
    e.preventDefault() 
    
    // let's create some user objects (this is dummy data)
    const arrayOfResults = [user1, user2]
    
    // let's add a div holding an h4 with the main title text 
    var mainTitleDivs = document.querySelectorAll(".mainTitle"); 
    for(let i = 0;i<mainTitleDivs.length;i++){
        const parent = mainTitleDivs[i].parentElement
        parent.removeChild(mainTitleDivs[i])
    }
    
    // let's first clear the previous search results 
    var searchResultEntries = document.querySelectorAll(".searchResultEntry"); 
    for(let i = 0;i<searchResultEntries.length;i++){
        const parent = searchResultEntries[i].parentElement
        parent.removeChild(searchResultEntries[i])
    }


    // The master div, will contain the other divs inside it
    const masterDiv = document.createElement("div")
    
    const mainTitleDiv = document.createElement('div');
    mainTitleDiv.className = "mainTitle"
    mainTitleDiv.classList.add("imageOverlayFixer")
    
    const searchResultH4 = document.createElement('h4')
    searchResultH4.textContent = "Search Results for: \'CSC309\'"
    mainTitleDiv.appendChild(searchResultH4)

    masterDiv.appendChild(mainTitleDiv)
    
    //document.body.appendChild(mainTitleDiv)
    
    // let's call the addSearchResultToDOM() function and pass each user to it 
    for(let i = 0;i<arrayOfResults.length;i++){
        addSearchResultToDOM(arrayOfResults[i], masterDiv)
    }

    const footer = document.querySelector("footer")
    footer.classList.add("eraseMargin")
    document.body.insertBefore(masterDiv, footer)

    //window.scrollTo(0, 10000)
    
}

// This function adds one search result to the DOM 
function addSearchResultToDOM(user, masterDiv){
    
    // let's first create a new div for this new search result 
    const newDiv = document.createElement('div')
    newDiv.className = "searchResultEntry"
    newDiv.classList.add("white");
    
    // let's now add the first name <p> tag and the <span> tag 
    const firstNameP = document.createElement('p')
    const firstNameSpan = document.createElement('span')
    firstNameSpan.textContent = "First Name: " + user.firstName; 
    firstNameP.appendChild(firstNameSpan)
    newDiv.appendChild(firstNameP)
     
    // let's now add the last name <p> tag and the <span> tag 
    const lastNameP = document.createElement('p')
    const lastNameSpan = document.createElement('span')
    lastNameSpan.textContent = "Last Name: " + user.lastName; 
    lastNameP.appendChild(lastNameSpan)
    newDiv.appendChild(lastNameP)
    
    // let's now add the username <p> tag and the <span> tag 
    const usernameP = document.createElement('p')
    const usernameSpan = document.createElement('span')
    usernameSpan.textContent = "Username: " + user.username; 
    usernameP.appendChild(usernameSpan)
    newDiv.appendChild(usernameP)
    
    // let's now add the email <p> tag and the <span> tag 
    const emailP = document.createElement('p')
    const emailSpan = document.createElement('span')
    emailSpan.textContent = "Email: " + user.email; 
    emailP.appendChild(emailSpan)
    newDiv.appendChild(emailP)
    
    // let's now add the about <p> tag and the <span> tag 
    const aboutP = document.createElement('p')
    const aboutSpan = document.createElement('span')
    aboutSpan.textContent = "About: " + user.about; 
    aboutP.appendChild(aboutSpan)
    newDiv.appendChild(aboutP)
    
    // let's now add the availability <p> tag and the <span> tag 
    const availabilityP = document.createElement('p')
    const availabilitySpan = document.createElement('span')
    availabilitySpan.textContent = "Availability: " + user.availability; 
    availabilityP.appendChild(availabilitySpan) 
    newDiv.appendChild(availabilityP)
    
    // let's now add a line separator 
    const lineSeparatorP = document.createElement('p')
    const lineSeparatorSpan = document.createElement('span')
    lineSeparatorSpan.textContent = "==================================================================================================="
    lineSeparatorP.appendChild(lineSeparatorSpan)
    newDiv.appendChild(lineSeparatorP)
    
    //let footer = document.querySelector("footer")
    // finally, let's append this new division to the document 
    masterDiv.appendChild(newDiv)
    //document.body.appendChild(newDiv)
    //document.body.insertBefore(newDiv, footer)
    
      
}




