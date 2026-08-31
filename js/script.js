// ======================================
// PawSense - LOGIN
// ======================================

function loginUser(event) {

    event.preventDefault();

    const username =
        document.getElementById("loginUsername").value.trim();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if (username === "" || email === "" || password === "") {

        alert("Please fill all details 🐾");

        return;
    }


    const user = {

        username: username,

        email: email,

        password: password

    };


    localStorage.setItem(
        "pawSenseUser",
        JSON.stringify(user)
    );


    localStorage.setItem(
        "pawSenseLoggedIn",
        "true"
    );


    window.location.href = "dashboard.html";

}



// ======================================
// SHOW USERNAME
// ======================================

function getUserName() {

    const user =
        JSON.parse(
            localStorage.getItem("pawSenseUser")
        );


    if (user) {

        return user.username;

    }


    return "Pet Owner";

}



// ======================================
// DASHBOARD USERNAME
// ======================================

document.addEventListener("DOMContentLoaded", function () {


    const userName =
        getUserName();


    const userElement =
        document.getElementById("userName");


    if (userElement) {

        userElement.textContent =
            userName;

    }


    const dashboardUser =
        document.getElementById("dashboardUser");


    if (dashboardUser) {

        dashboardUser.textContent =
            userName;

    }



    // ================================
    // PET INFORMATION
    // ================================

    const pet =
        JSON.parse(
            localStorage.getItem("pawSensePet")
        );


    if (pet) {


        const petName =
            document.getElementById("displayPetName");


        const petInfo =
            document.getElementById("displayPetInfo");


        if (petName) {

            petName.textContent =
                "🐾 " + pet.name;

        }


        if (petInfo) {

            petInfo.textContent =
                pet.type +
                " • " +
                pet.age +
                " years • " +
                pet.gender +
                " • " +
                pet.breed;

        }


        const healthName =
            document.getElementById("healthPetName");


        const healthInfo =
            document.getElementById("healthPetInfo");


        if (healthName) {

            healthName.textContent =
                "🐾 " + pet.name;

        }


        if (healthInfo) {

            healthInfo.textContent =
                pet.type +
                " • " +
                pet.age +
                " years • " +
                pet.gender +
                " • " +
                pet.breed;

        }

    }

});



// ======================================
// GET STARTED
// ======================================

function goToPetDetails() {

    window.location.href =
        "pet-details.html";

}



// ======================================
// SAVE PET DETAILS
// ======================================

function savePet(event) {

    event.preventDefault();


    const pet = {

        name:
            document.getElementById("petName").value.trim(),

        type:
            document.getElementById("petType").value,

        age:
            document.getElementById("petAge").value,

        gender:
            document.getElementById("petGender").value,

        breed:
            document.getElementById("petBreed").value.trim()

    };


    localStorage.setItem(
        "pawSensePet",
        JSON.stringify(pet)
    );


    window.location.href =
        "pet-dashboard.html";

}



// ======================================
// LOGOUT
// ======================================

function logoutUser() {

    localStorage.removeItem(
        "pawSenseLoggedIn"
    );


    localStorage.removeItem(
        "pawSenseUser"
    );


    localStorage.removeItem(
        "pawSensePet"
    );


    window.location.href =
        "login.html";

}