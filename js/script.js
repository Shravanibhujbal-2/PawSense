// ======================================
// PawSense - REGISTER
// ======================================

function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        alert("Passwords do not match! ❌");

        return;
    }


    const user = {

        name: name,
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


    alert(
        "Account created successfully! Welcome to PawSense! 🐾"
    );


    window.location.href = "dashboard.html";

}



// ======================================
// PawSense - LOGIN
// ======================================

function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    const savedUser =
        JSON.parse(
            localStorage.getItem("pawSenseUser")
        );


    if (!savedUser) {

        alert("Please create an account first! 🐾");

        window.location.href = "register.html";

        return;
    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem(
            "pawSenseLoggedIn",
            "true"
        );


        alert(
            "Welcome to PawSense, " +
            savedUser.name +
            "! 🐾"
        );


        window.location.href =
            "dashboard.html";

    } else {

        alert("Invalid email or password! ❌");

    }

}



// ======================================
// GET USER NAME
// ======================================

function getUserName() {

    const user =
        JSON.parse(
            localStorage.getItem("pawSenseUser")
        );


    if (user) {

        return user.name;

    }


    return "Pet Owner";

}



// ======================================
// PAGE LOAD
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

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


        // Health page
        loadHealthPets();


        // Health details page
        if (
            document.getElementById(
                "healthDetailsPetName"
            )
        ) {

            loadSelectedPetHealth();

        }

    }
);



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


    let pets =
        JSON.parse(
            localStorage.getItem("pawSensePets")
        ) || [];


    pets.push(pet);


    localStorage.setItem(
        "pawSensePets",
        JSON.stringify(pets)
    );


    localStorage.setItem(
        "pawSensePet",
        JSON.stringify(pet)
    );


    window.location.href =
        "pet-dashboard.html";

}



// ======================================
// RESET PASSWORD
// ======================================

function resetPassword(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "resetEmail"
        ).value.trim();


    const newPassword =
        document.getElementById(
            "newPassword"
        ).value;


    const confirmPassword =
        document.getElementById(
            "confirmNewPassword"
        ).value;


    const savedUser =
        JSON.parse(
            localStorage.getItem("pawSenseUser")
        );


    if (!savedUser) {

        alert(
            "No account found! Please create an account first. 🐾"
        );

        window.location.href =
            "register.html";

        return;
    }


    if (email !== savedUser.email) {

        alert(
            "Email address does not match! ❌"
        );

        return;
    }


    if (newPassword !== confirmPassword) {

        alert(
            "Passwords do not match! ❌"
        );

        return;
    }


    savedUser.password =
        newPassword;


    localStorage.setItem(
        "pawSenseUser",
        JSON.stringify(savedUser)
    );


    alert(
        "Password reset successfully! 🐾🔐"
    );


    window.location.href =
        "login.html";

}



// ======================================
// LOGOUT
// ======================================

function logoutUser() {

    localStorage.removeItem(
        "pawSenseLoggedIn"
    );


    window.location.href =
        "login.html";

}



// ======================================
// GET PET ICON
// ======================================

function getPetIcon(type) {

    if (type === "Dog")
        return "🐶";

    if (type === "Cat")
        return "🐱";

    if (type === "Rabbit")
        return "🐰";

    if (type === "Bird")
        return "🐦";

    return "🐾";

}



// ======================================
// VIEW PET DETAILS
// ======================================

function loadPetDetails() {

    const pet =
        JSON.parse(
            localStorage.getItem("pawSensePet")
        );


    if (!pet) {

        return;

    }


    const petName =
        document.getElementById("viewPetName");

    const petType =
        document.getElementById("viewPetType");

    const petAge =
        document.getElementById("viewPetAge");

    const petGender =
        document.getElementById("viewPetGender");

    const petBreed =
        document.getElementById("viewPetBreed");


    if (petName)
        petName.textContent = pet.name;

    if (petType)
        petType.textContent = pet.type;

    if (petAge)
        petAge.textContent =
            pet.age + " years";

    if (petGender)
        petGender.textContent =
            pet.gender;

    if (petBreed)
        petBreed.textContent =
            pet.breed || "Not specified";

}



// ======================================
// ADD ANOTHER PET
// ======================================

function addAnotherPet() {

    window.location.href =
        "pet-details.html";

}



// ======================================
// SHOW ALL PETS ON HEALTH PAGE
// ======================================

function loadHealthPets() {

    const pets =
        JSON.parse(
            localStorage.getItem("pawSensePets")
        ) || [];


    const container =
        document.getElementById(
            "healthPetsContainer"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    pets.forEach(
        function (pet, index) {

            const card =
                document.createElement("div");


            card.className =
                "health-pet-card";


            card.innerHTML = `

                <div class="health-pet-icon">
                    ${getPetIcon(pet.type)}
                </div>

                <h2>${pet.name}</h2>

                <button
                    class="view-health-btn"
                    onclick="viewHealthDetails(${index})">

                    View Health Details →

                </button>

            `;


            container.appendChild(card);

        }
    );

}



// ======================================
// OPEN SELECTED PET HEALTH
// ======================================

function viewHealthDetails(index) {

    localStorage.setItem(
        "selectedPetIndex",
        index
    );


    window.location.href =
        "health-details.html";

}



// ======================================
// LOAD SELECTED PET HEALTH DETAILS
// ======================================

function loadSelectedPetHealth() {

    const pets =
        JSON.parse(
            localStorage.getItem("pawSensePets")
        ) || [];


    const selectedIndex =
        localStorage.getItem(
            "selectedPetIndex"
        );


    if (
        selectedIndex === null ||
        !pets[selectedIndex]
    ) {

        return;

    }


    const pet =
        pets[selectedIndex];


    const petName =
        document.getElementById(
            "healthDetailsPetName"
        );


    const petInfo =
        document.getElementById(
            "healthDetailsPetInfo"
        );


    if (petName) {

        petName.textContent =
            pet.name + "'s Health";

    }


    if (petInfo) {

        petInfo.textContent =
            pet.type +
            " • " +
            pet.age +
            " years • " +
            pet.gender;

    }

}



// ======================================
// VIEW PET DETAILS PAGE LOAD
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            document.getElementById(
                "viewPetName"
            )
        ) {

            loadPetDetails();

        }

    }
);
// ======================================
// SAVE HEALTH DETAILS
// ======================================

function saveHealth(event) {

    event.preventDefault();

    const pets =
        JSON.parse(
            localStorage.getItem("pawSensePets")
        ) || [];

    const selectedIndex =
        localStorage.getItem("selectedPetIndex");

    if (
        selectedIndex === null ||
        !pets[selectedIndex]
    ) {
        alert("Pet not found! ❌");
        return;
    }

    const health = {

        weight:
            document.getElementById("petWeight").value,

        height:
            document.getElementById("petHeight").value,

        temperature:
            document.getElementById("petTemperature").value,

        status:
            document.getElementById("healthStatus").value,

        diet:
            document.getElementById("petDiet").value.trim(),

        allergies:
            document.getElementById("petAllergies").value.trim(),

        activity:
            document.getElementById("petActivity").value.trim(),

        symptoms:
            document.getElementById("petSymptoms").value.trim()

    };

    pets[selectedIndex].health = health;

    localStorage.setItem(
        "pawSensePets",
        JSON.stringify(pets)
    );

    alert("Health details saved successfully! ❤️🐾");

    window.location.href = "health.html";
}