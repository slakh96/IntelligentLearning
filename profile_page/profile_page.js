const log = console.log;
function getLoggedInInfo(e){
    if (e){
        e.preventDefault();
    }
<<<<<<< HEAD
=======
    const x = document.getElementById('content');
    x.style.display = "block";
>>>>>>> 2e99a472786192119cf6212e621ced707941e4b6
    let data;
    let url = '/users/check-session';
    //url = '/users/' + defaultId;
    fetch(url).then((response) => {
        if (response.status == 200){
            const x = document.getElementById('content');
            x.style.display = "block";
        response.json().then((resp) => {
            const loggedInUser = resp.currentUser; 
            fetch("/users/userName/" + loggedInUser).then((dat) => {
                dat.json().then((da) => {
                    const data = da[0];
                    document.getElementById('profilePic').src = data.profilePic
                    const personalInfoDiv = document.getElementById('personalInfo')
                    addPersonalInfoToDOM(data, personalInfoDiv)

                    const emailDiv = document.getElementById('email')
                    const emailIcon = document.createElement('i')
                    emailIcon.className = "fa fa-envelope"
                    const email = document.createElement('a')
                    email.href = "mailto:".concat(data.email)
                    email.textContent = data.email
                    emailDiv.appendChild(emailIcon)
                    emailDiv.appendChild(email)

                    const phoneDiv = document.getElementById('phone')
                    const phoneIcon = document.createElement('i')
                    phoneIcon.className = "fa fa-phone"
                    const phone = document.createElement('a')
                    phone.textContent = data.phoneNumber
                    phoneDiv.appendChild(phoneIcon)
                    phoneDiv.appendChild(phone)

                    const linkedInDiv = document.getElementById('linkedin')
                    const linkedInIcon = document.createElement('i')
                    linkedInIcon.className = "fa fa-linkedin"
                    const linkedIn = document.createElement('a')
                    linkedIn.href = data.linkedInLink
                    linkedIn.textContent = "LinkedIn"
                    linkedInDiv.appendChild(linkedInIcon)
                    linkedInDiv.appendChild(linkedIn)

                    const resumeDiv = document.getElementById('resume')
                    const resumeIcon = document.createElement('i')
                    resumeIcon.className = "fa fa-file"
                    const resume = document.createElement('a')
                    resume.href = data.resumeLink
                    resume.textContent = "Resume"
                    resumeDiv.appendChild(resumeIcon)
                    resumeDiv.appendChild(resume)

                    // addcontactInfoToDOM(data, contactInfoDiv)
                    const about = document.createElement('p')
                    about.textContent = data.about
                    document.getElementById('about').appendChild(about)
                    const coursesDiv = document.getElementById('course');
                    data.coursesTaught.forEach(course => {
                        addCourseToDOM(course, coursesDiv)
                    });
                    const experienceDiv = document.getElementById('experience')
                    data.experience.forEach(experience => {
                        const title = document.createElement('h4')
                        const description = document.createElement('p')
                        title.textContent = experience.title
                        description.textContent = experience.description
                        experienceDiv.appendChild(title)
                        experienceDiv.appendChild(description)
                    });

                    const reviewDiv = document.getElementById('review')
                    fetch("/reviews/" + data.userName).then((dat) => {
                        dat.json().then((da) => {
                            da.forEach(review => {
                                const author = document.createElement('h4')
                                const content = document.createElement('p')
                                author.textContent = review.author
                                content.textContent = review.content
                                reviewDiv.appendChild(author)
                                reviewDiv.appendChild(content)
                            });
                        })
                    })
                })
                
            })
        });
        //fetch("/users/" + resultAsJson.)

        //return response.json();
        // data = {firstName: "Mitch", lastName: "Marner", email: "fandersen@yahoo.com",
        //     highestEdu: "Undergraduate", userName: "freddyA", phoneNumber: "1234567890",
        //     coursesTaught: ["CSC309"], coursesLearning: ["CSC302"], about: "U of T Student", 
        //     experience: "Two years teaching at a math learning center", linkedInLink: "https://linkedin.com/jakemuzzin8", 
        //     profilePic: "jakemuzzin.jpg", newPostingsForAsTutorCourses: false, resumeLink: '/jamesReimer.pdf', 
        //     availability: "Monday mornings; Wednesday evenings", newPostingsForAsTuteeCourses: true,
        //     adminNotifications: true, specialOffersPromotions: false
            //};
        }
        else{
            return Promise.reject("No user is logged in");
        }
    }).catch((error) =>{
        log("There was an error, ", error);
<<<<<<< HEAD
        signOut();
        // data = {//firstName: "Fredrick", lastName: "Andersen", email: "fandersen@yahoo.com",
        //     // highestEdu: "Undergraduate", userName: "freddyA", phoneNumber: "1234567890",
        //     // coursesTaught: ["CSC309"], coursesLearning: ["CSC302"], about: "U of T Student", 
        //     // experience: "Two years teaching at a math learning center", linkedInLink: "https://linkedin.com/jakemuzzin8", 
        //     // profilePic: "jakemuzzin.jpg", newPostingsForAsTutorCourses: false, resumeLink: '/jamesReimer.pdf', 
        //     // availability: "Monday mornings; Wednesday evenings", newPostingsForAsTuteeCourses: true,
        //     // adminNotifications: true, specialOffersPromotions: false
        //     };
        //     return data;
    })
}

function signOut(){
    const url = '/users/logout';
    fetch(url).then((result) => {
        log("Redirecting...");
        window.location.replace("../index/index.html");
    }).catch((error) => {
        log("There was an error when signing out: ", error);
=======
        data = {//firstName: "Fredrick", lastName: "Andersen", email: "fandersen@yahoo.com",
            // highestEdu: "Undergraduate", userName: "freddyA", phoneNumber: "1234567890",
            // coursesTaught: ["CSC309"], coursesLearning: ["CSC302"], about: "U of T Student", 
            // experience: "Two years teaching at a math learning center", linkedInLink: "https://linkedin.com/jakemuzzin8", 
            // profilePic: "jakemuzzin.jpg", newPostingsForAsTutorCourses: false, resumeLink: '/jamesReimer.pdf', 
            // availability: "Monday mornings; Wednesday evenings", newPostingsForAsTuteeCourses: true,
            // adminNotifications: true, specialOffersPromotions: false
            };
            return data;
>>>>>>> 2e99a472786192119cf6212e621ced707941e4b6
    })
}

function addPersonalInfoToDOM(user, masterDiv){
    const fullName = document.createElement('h2')
    fullName.textContent = user.firstName.concat(' ', user.lastName)
    const description = document.createElement('p')
    description.textContent = user.about
    masterDiv.appendChild(fullName)
    masterDiv.appendChild(description)
}

function addCourseToDOM(code, masterDiv){
    fetch("/courses/" + code).then((dat) => {
        dat.json().then((da) => {
            const container = document.createElement('div')
            const code = document.createElement('h4')
            const name = document.createElement('h5')
            container.className = "course"
            code.textContent = da.code
            name.textContent = da.name
            container.appendChild(code)
            container.appendChild(name)
            masterDiv.appendChild(container)
        }).catch((error) =>{
            log("There was an error, ", error);
        })
    })
}

// $(window).load(function () {
//     $("#reviewPopupTrigger").click(function(){
//        $('#reviewPopupWindow').show();
//     });
//     // $('.popupTrigger').click(function(){
//     //     $('.popupWindow').hide();
//     // });
//     $('#reviewPopupCloseButton').click(function(){
//         $('#reviewPopupWindow').hide();
//     });

//     $("#coursePopupTrigger1").click(function(){
//         $('#coursePopupWindow1').show();
//     });
//     $('#coursePopupCloseButton1').click(function(){
//         $('#coursePopupWindow1').hide();
//     });

//     $("#coursePopupTrigger2").click(function(){
//         $('#coursePopupWindow2').show();
//     });
//     $('#coursePopupCloseButton2').click(function(){
//         $('#coursePopupWindow2').hide();
//     });

//     $("#coursePopupTrigger3").click(function(){
//         $('#coursePopupWindow3').show();
//     });
//     $('#coursePopupCloseButton3').click(function(){
//         $('#coursePopupWindow3').hide();
//     });
// });