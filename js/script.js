// ======================================
// PawSense - FRONTEND ONLY
// No LocalStorage / No Backend / No Database
// ======================================


// ======================================
// GLOBAL DATA
// ======================================

let currentUser = null;
let pets = [];
let selectedPetIndex = null;


// ======================================
// URL PET DATA
// ======================================

function savePetsInURL() {

    return encodeURIComponent(
        JSON.stringify(pets)
    );

}


function loadPetsFromURL() {

    const params =
        new URLSearchParams(window.location.search);

    const petsData =
        params.get("pets");

    if (petsData) {

        try {

            pets =
                JSON.parse(
                    decodeURIComponent(petsData)
                );

        } catch (error) {

            pets = [];

        }

    }

    const selected =
        params.get("selected");

    if (selected !== null) {

        selectedPetIndex =
            parseInt(selected);

    }

}


// ======================================
// REGISTER
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

    currentUser = {

        name: name,
        email: email,
        password: password

    };

    alert(
        "Account created successfully! Welcome to PawSense! 🐾"
    );

    window.location.href =
        "dashboard.html";

}


// ======================================
// LOGIN
// ======================================

function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    if (!currentUser) {

        alert(
            "Please create an account first! 🐾"
        );

        window.location.href =
            "register.html";

        return;

    }

    if (
        email === currentUser.email &&
        password === currentUser.password
    ) {

        alert(
            "Welcome to PawSense, " +
            currentUser.name +
            "! 🐾"
        );

        window.location.href =
            "dashboard.html";

    } else {

        alert(
            "Invalid email or password! ❌"
        );

    }

}


// ======================================
// GET USER NAME
// ======================================

function getUserName() {

    if (currentUser) {

        return currentUser.name;

    }

    return "Pet Owner";

}


// ======================================
// PAGE LOAD
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadPetsFromURL();


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


        loadHealthPets();


        if (
            document.getElementById(
                "healthDetailsPetName"
            )
        ) {

            loadSelectedPetHealth();

        }


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
            document.getElementById(
                "petName"
            ).value.trim(),

        type:
            document.getElementById(
                "petType"
            ).value,

        age:
            document.getElementById(
                "petAge"
            ).value,

        gender:
            document.getElementById(
                "petGender"
            ).value,

        breed:
            document.getElementById(
                "petBreed"
            ).value.trim(),


        health: {

            weight:
                document.getElementById(
                    "petWeight"
                ).value,

            height:
                document.getElementById(
                    "petHeight"
                ).value,

            temperature:
                document.getElementById(
                    "petTemperature"
                ).value,

            status:
                document.getElementById(
                    "healthStatus"
                ).value,

            diet:
                document.getElementById(
                    "petDiet"
                ).value.trim(),

            allergies:
                document.getElementById(
                    "petAllergies"
                ).value.trim(),

            activity:
                document.getElementById(
                    "petActivity"
                ).value.trim(),

            symptoms:
                document.getElementById(
                    "petSymptoms"
                ).value.trim()

        }

    };


    pets.push(pet);


    selectedPetIndex =
        pets.length - 1;


    alert(
        pet.name +
        " added successfully! 🐾❤️"
    );


    window.location.href =
        "health.html?pets=" +
        savePetsInURL();

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
// LOAD ALL PETS ON HEALTH PAGE
// ======================================

function loadHealthPets() {

    const container =
        document.getElementById(
            "healthPetsContainer"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (pets.length === 0) {

        container.innerHTML = `

            <div class="info-card">

                <div class="category-big-icon">
                    🐾
                </div>

                <h2>
                    No pets added yet
                </h2>

                <p>
                    Add your pet details to manage
                    their health information.
                </p>

            </div>

        `;

        return;

    }


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

                <h2>
                    ${pet.name}
                </h2>

                <p>
                    ${pet.type}
                    •
                    ${pet.age} years
                    •
                    ${pet.gender}
                </p>

                <button
                    class="view-health-btn"
                    onclick="viewHealthDetails(${index})">

                    👀 View Details →

                </button>

                <button
                    class="delete-pet-btn"
                    onclick="deletePet(${index})">

                    🗑️ Delete

                </button>

            `;


            container.appendChild(card);

        }
    );

}


// ======================================
// DELETE PET
// ======================================

function deletePet(index) {

    const pet =
        pets[index];


    if (!pet) {

        return;

    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            pet.name +
            "? 🐾"
        );


    if (!confirmDelete) {

        return;

    }


    pets.splice(index, 1);


    selectedPetIndex =
        null;


    alert(
        "Pet deleted successfully! 🗑️"
    );


    window.location.href =
        "health.html?pets=" +
        savePetsInURL();

}


// ======================================
// VIEW HEALTH DETAILS
// ======================================

function viewHealthDetails(index) {

    if (!pets[index]) {

        return;

    }


    selectedPetIndex =
        index;


    window.location.href =
        "health-details.html?pets=" +
        savePetsInURL() +
        "&selected=" +
        index;

}


// ======================================
// LOAD SELECTED PET HEALTH DETAILS
// ======================================

function loadSelectedPetHealth() {

    if (
        selectedPetIndex === null ||
        !pets[selectedPetIndex]
    ) {

        return;

    }


    const pet =
        pets[selectedPetIndex];


    const health =
        pet.health || {};


    // Heading

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


    // Basic Information

    const detailPetName =
        document.getElementById(
            "detailPetName"
        );

    const detailPetType =
        document.getElementById(
            "detailPetType"
        );

    const detailPetAge =
        document.getElementById(
            "detailPetAge"
        );

    const detailPetGender =
        document.getElementById(
            "detailPetGender"
        );

    const detailPetBreed =
        document.getElementById(
            "detailPetBreed"
        );


    if (detailPetName)
        detailPetName.textContent =
            pet.name;


    if (detailPetType)
        detailPetType.textContent =
            pet.type;


    if (detailPetAge)
        detailPetAge.textContent =
            pet.age + " years";


    if (detailPetGender)
        detailPetGender.textContent =
            pet.gender;


    if (detailPetBreed)
        detailPetBreed.textContent =
            pet.breed || "Not specified";


    // Health Information

    const detailWeight =
        document.getElementById(
            "detailWeight"
        );

    const detailHeight =
        document.getElementById(
            "detailHeight"
        );

    const detailTemperature =
        document.getElementById(
            "detailTemperature"
        );

    const detailHealthStatus =
        document.getElementById(
            "detailHealthStatus"
        );

    const detailDiet =
        document.getElementById(
            "detailDiet"
        );

    const detailAllergies =
        document.getElementById(
            "detailAllergies"
        );

    const detailActivity =
        document.getElementById(
            "detailActivity"
        );

    const detailSymptoms =
        document.getElementById(
            "detailSymptoms"
        );


    if (detailWeight)
        detailWeight.textContent =
            health.weight
                ? health.weight + " kg"
                : "Not specified";


    if (detailHeight)
        detailHeight.textContent =
            health.height
                ? health.height + " cm"
                : "Not specified";


    if (detailTemperature)
        detailTemperature.textContent =
            health.temperature
                ? health.temperature + " °C"
                : "Not specified";


    if (detailHealthStatus)
        detailHealthStatus.textContent =
            health.status || "Not specified";


    if (detailDiet)
        detailDiet.textContent =
            health.diet || "Not specified";


    if (detailAllergies)
        detailAllergies.textContent =
            health.allergies || "None";


    if (detailActivity)
        detailActivity.textContent =
            health.activity || "Not specified";


    if (detailSymptoms)
        detailSymptoms.textContent =
            health.symptoms || "None";

}


// ======================================
// LOAD PET DETAILS
// ======================================

function loadPetDetails() {

    if (
        selectedPetIndex === null ||
        !pets[selectedPetIndex]
    ) {

        return;

    }


    const pet =
        pets[selectedPetIndex];


    const petName =
        document.getElementById(
            "viewPetName"
        );

    const petType =
        document.getElementById(
            "viewPetType"
        );

    const petAge =
        document.getElementById(
            "viewPetAge"
        );

    const petGender =
        document.getElementById(
            "viewPetGender"
        );

    const petBreed =
        document.getElementById(
            "viewPetBreed"
        );


    if (petName)
        petName.textContent =
            pet.name;


    if (petType)
        petType.textContent =
            pet.type;


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
        "add-pet.html?pets=" +
        savePetsInURL();

}


// ======================================
// SAVE HEALTH DETAILS
// ======================================

function saveHealth(event) {

    event.preventDefault();


    if (
        selectedPetIndex === null ||
        !pets[selectedPetIndex]
    ) {

        alert(
            "Pet details not found! ❌"
        );

        return;

    }


    const health = {

        weight:
            document.getElementById(
                "petWeight"
            ).value,

        height:
            document.getElementById(
                "petHeight"
            ).value,

        temperature:
            document.getElementById(
                "petTemperature"
            ).value,

        status:
            document.getElementById(
                "healthStatus"
            ).value,

        diet:
            document.getElementById(
                "petDiet"
            ).value.trim(),

        allergies:
            document.getElementById(
                "petAllergies"
            ).value.trim(),

        activity:
            document.getElementById(
                "petActivity"
            ).value.trim(),

        symptoms:
            document.getElementById(
                "petSymptoms"
            ).value.trim()

    };


    pets[selectedPetIndex].health =
        health;


    alert(
        "Health details saved successfully! ❤️🐾"
    );


    window.location.href =
        "health.html?pets=" +
        savePetsInURL();

}


// ======================================
// SHARE WITH DOCTOR
// ======================================

function shareWithDoctor() {

    if (
        selectedPetIndex === null ||
        !pets[selectedPetIndex]
    ) {

        alert(
            "Pet details not found! ❌"
        );

        return;

    }


    const pet =
        pets[selectedPetIndex];


    let healthText =
        "No health information added.";


    if (pet.health) {

        healthText =

            "Weight: " +
            (pet.health.weight || "Not specified") +
            " kg\n" +

            "Height: " +
            (pet.health.height || "Not specified") +
            " cm\n" +

            "Temperature: " +
            (pet.health.temperature || "Not specified") +
            " °C\n" +

            "Health Status: " +
            (pet.health.status || "Not specified") +
            "\n" +

            "Diet: " +
            (pet.health.diet || "Not specified") +
            "\n" +

            "Allergies: " +
            (pet.health.allergies || "None") +
            "\n" +

            "Activity: " +
            (pet.health.activity || "Not specified") +
            "\n" +

            "Symptoms: " +
            (pet.health.symptoms || "None");

    }


    alert(

        "Pet Details Ready to Share 👨‍⚕️🐾\n\n" +

        "Name: " +
        pet.name +

        "\nType: " +
        pet.type +

        "\nAge: " +
        pet.age +
        " years" +

        "\nGender: " +
        pet.gender +

        "\nBreed: " +
        (pet.breed || "Not specified") +

        "\n\nHealth Details:\n" +
        healthText

    );

}


// ======================================
// RESET PASSWORD
// ======================================

function resetPassword(event) {

    event.preventDefault();


    if (!currentUser) {

        alert(
            "No account found! Please create an account first. 🐾"
        );

        window.location.href =
            "register.html";

        return;

    }


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


    if (email !== currentUser.email) {

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


    currentUser.password =
        newPassword;


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

    currentUser = null;

    pets = [];

    selectedPetIndex = null;


    window.location.href =
        "login.html";

}