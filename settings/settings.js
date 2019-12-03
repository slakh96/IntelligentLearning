//File to handle interactions with the settings pages
const log = console.log;
log('Loaded front-end javascript.');
function getLoggedInInfo(e){
    e.preventDefault();
    let data;
    let resultAsJson; 
    log("Reached the getLoggedIn function");
    let url = '/users/check-session';
    const defaultId = '5de2fe71ae2dcd0f24b911e7';
    //url = '/users/' + defaultId;
    fetch(url).then((response) => {
        if (response.status == 200){

        response.json().then((resp) => {
            const loggedInUser = resp.currentUser; 
            fetch("/users/userName/" + loggedInUser).then((dat) => {  
                dat.json().then((da) => {
                    const data = da[0]
                    document.getElementById('firstName').value = data.firstName;
                    document.getElementById('lastName').value = data.lastName;
                    document.getElementById('username').value = data.userName;
                    document.getElementById('email').value = data.email;
                    document.getElementById('phone').value = data.phoneNumber;
                    document.getElementById('eduLevel').value = data.highestEdu;
                    document.getElementById('about').value = data.about;
                    document.getElementById('experience').value = data.experience;
                    document.getElementById('resume').value = data.resumeLink;
                    document.getElementById('linkedin').value = data.linkedInLink;
                    document.getElementById('availability').value = data.availability;
                    document.getElementById('teaching').value = data.coursesTaught.join(';');
                    document.getElementById('beingTaught').value = data.coursesLearning.join(';');
                    document.getElementById('pic').value = data.profilePic;
                    document.getElementById('asTutorN').checked = data.newPostingsForAsTutorCourses;
                    document.getElementById('asTuteeN').checked = data.newPostingsForAsTuteeCourses;
                    document.getElementById('adminN').checked = data.adminNotifications;
                    document.getElementById('promotionsN').checked = data.specialOffersPromotions;
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
        data = {firstName: "Fredrick", lastName: "Andersen", email: "fandersen@yahoo.com",
            highestEdu: "Undergraduate", userName: "freddyA", phoneNumber: "1234567890",
            coursesTaught: ["CSC309"], coursesLearning: ["CSC302"], about: "U of T Student", 
            experience: "Two years teaching at a math learning center", linkedInLink: "https://linkedin.com/jakemuzzin8", 
            profilePic: "jakemuzzin.jpg", newPostingsForAsTutorCourses: false, resumeLink: '/jamesReimer.pdf', 
            availability: "Monday mornings; Wednesday evenings", newPostingsForAsTuteeCourses: true,
            adminNotifications: true, specialOffersPromotions: false
            };
            return data;
    // }).finally((result) => {
    //         log("Result in finally is: ", result);
    })


}

function saveLoggedInInfo(e){
    e.preventDefault();
    log("Reached the saveLoggedIn function");
    const id = '5ddac6f93a9d60409411f3f5';
    const url = '/users/' + id;
    log("URL is ", url);
    const data = {firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value, 
            email: document.getElementById('email').value,
            highestEdu: document.getElementById('eduLevel').value, 
            userName: document.getElementById('username').value, 
            phoneNumber: parseInt(document.getElementById('phone').value),
            coursesTaught: document.getElementById('teaching').value.split(';'), 
            coursesLearning: document.getElementById('beingTaught').value.split(';'), 
            about: document.getElementById('about').value, 
            experience: document.getElementById('experience').value, 
            linkedInLink: document.getElementById('linkedin').value, 
            profilePic: document.getElementById('pic').value, 
            newPostingsForAsTutorCourses: document.getElementById('asTutorN').checked, 
            resumeLink: document.getElementById('resume').value, 
            availability: document.getElementById('availability').value, 
            newPostingsForAsTuteeCourses: document.getElementById('asTuteeN').checked,
            adminNotifications: document.getElementById('adminN').checked, 
            specialOffersPromotions: document.getElementById('promotionsN').checked
            };
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request).then(function(response) {
        log("Sent!");
        log(response);
    }).catch((err) => {
        log("ERROR when receiving from savefn: ", err)
    });
};




//log(user1.firstName);
const saveBtn = document.querySelector('#save');
const cancelBtn = document.querySelector('#cancel');
saveBtn.addEventListener('click', saveLoggedInInfo);
cancelBtn.addEventListener('click', getLoggedInInfo);
function onSave(e) {
    // SERVER REQUIRED, WILL BE SAVING ALL THE CHANGED PROPERTIES IN THE CORRESPONDING USER OBJECT
    e.preventDefault();
    $('#saveConfirm').show();
    //$('#coursePopupWindow1').hide();
    }



    // const loggedIn = getLoggedIn();
    // const userProps = Object.keys(loggedIn);
    // for (let i = 0; i < userProps.length; i++){
    //     const stringProp = String(userProps[i]);
    //     const selector = '#'.concat(stringProp);
    //     //log(selector);
    //     const val = (document.querySelector(selector)).value;
    //     //log(prop);
    //     setLoggedInProp(stringProp, val);
    // }
$('#savePopupCloseButton1').click(function(){
    $('#saveConfirm').hide();
});
function onCancel(e) {
    //e.preventDefault();
    //onInit(e);
}

function onInit(e) {
    //e.preventDefault();
    // const loggedIn = getLoggedIn();
    // const userProps = Object.keys(loggedIn);
    // for (let i = 0; i < userProps.length; i++){
    //     const stringProp = String(userProps[i]);
    //     const curValue = getLoggedInProp(stringProp);
    //     const selector = '#'.concat(stringProp);
    //     (document.querySelector(selector)).value = curValue;
    // }
}
