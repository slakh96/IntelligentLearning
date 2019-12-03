const log = console.log;
log('Loaded front-end javascript.');
function getLoggedInInfo(e){
    if (e){
        e.preventDefault();
    }
    const x = document.getElementById('settingsContainer');
    x.style.display = "block";
    let data; 
    log("Reached the getLoggedIn function");
    let url = '/users/check-session';
    //url = '/users/' + defaultId;
    fetch(url).then((response) => {
        if (response.status == 200){

        response.json().then((resp) => {
            const loggedInUser = resp.currentUser; 
            fetch("/users/userName/" + loggedInUser).then((dat) => {  
                log("dat is ", dat);
                dat.json().then((da) => {
                    log("Da is ", da);
                    const data = da[0];
                    document.getElementById('profilePic').src = data.profilePic
                    const personalInfoDiv = document.getElementById('personalInfo')
                    addPersonalInfoToDOM(data, personalInfoDiv)
                    const contactInfoDiv = document.getElementById('contactInfo')
                    // addcontactInfoToDOM(data, contactInfoDiv)
                    const about = document.createElement('p')
                    about.textContent = user.about
                    document.getElementById('about').appendChild(about)
                    
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
        data = {//firstName: "Fredrick", lastName: "Andersen", email: "fandersen@yahoo.com",
            // highestEdu: "Undergraduate", userName: "freddyA", phoneNumber: "1234567890",
            // coursesTaught: ["CSC309"], coursesLearning: ["CSC302"], about: "U of T Student", 
            // experience: "Two years teaching at a math learning center", linkedInLink: "https://linkedin.com/jakemuzzin8", 
            // profilePic: "jakemuzzin.jpg", newPostingsForAsTutorCourses: false, resumeLink: '/jamesReimer.pdf', 
            // availability: "Monday mornings; Wednesday evenings", newPostingsForAsTuteeCourses: true,
            // adminNotifications: true, specialOffersPromotions: false
            };
            return data;
    // }).finally((result) => {
    //         log("Result in finally is: ", result);
    })
}

function addPersonalInfoToDOM(user, masterDiv){
    const fullName = document.createElement('h2')
    fullName.textContent = user.firstName + ' ' + user.fullName
    const description = document.createElement('p')
    description.textContent = user.about
    masterDiv.appendChild(fullName)
    masterDiv.appendChild(description)
}

function addCourseToDOM(user, masterDiv){
    const container = document.createElement('div')
    const code = document.createElement('h4')
    const name = document.createElement('h5')
    container.className = "course"
    code.
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