// ===============================
// JOBTRACK - SIGNUP
// ===============================

const signupForm = document.getElementById("signupForm");

const signupEmail = document.getElementById("signupEmail");

if (signupEmail) {
    signupEmail.addEventListener("input", function () {
        document.getElementById("emailError").textContent = "";
        document.getElementById("existingEmailError").textContent = "";
    });
}

const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");

if (signupPassword) {
    signupPassword.addEventListener("input", function () {
        document.getElementById("passwordError").textContent = "";
        document.getElementById("confirmPasswordError").textContent = "";
    });
}

if (confirmPassword) {
    confirmPassword.addEventListener("input", function () {
        document.getElementById("confirmPasswordError").textContent = "";
    });
}

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        // Stop the page from refreshing
        event.preventDefault();

        // Get values from the form
        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        
        if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("emailError").textContent =
        "Please enter a valid email address.";
    return;
}
document.getElementById("emailError").textContent = "";

        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        
            if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").textContent =
        "Passwords do not match.";
    return;
}

document.getElementById("confirmPasswordError").textContent = "";

if (password.length < 6) {
    document.getElementById("passwordError").textContent =
        "Password must be at least 6 characters long.";
    return;
}

document.getElementById("passwordError").textContent = "";


        // Get existing users from Local Storage
        let users = JSON.parse(localStorage.getItem("jobTrackUsers")) || [];

        // Check whether email already exists
        const existingUser = users.find(function (user) {
            return user.email === email;
        });

         if (existingUser) {
    document.getElementById("existingEmailError").textContent =
        "This email address is already registered. Please log in.";;
    return;
}

document.getElementById("existingEmailError").textContent = "";

        // Create new user
        const newUser = {
            name: name,
            email: email,
            password: password
        };

        // Add new user to users array
        users.push(newUser);

        // Save users to Local Storage
        localStorage.setItem("jobTrackUsers", JSON.stringify(users));

        alert("Account created successfully!");

        // Go to Login page
        window.location.href = "index.html";
    });
}

// ===============================
 // JOBTRACK - LOGIN
 // ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        // Get registered users from Local Storage
        const users =
            JSON.parse(localStorage.getItem("jobTrackUsers")) || [];

        // Find matching email and password
        const user = users.find(function (user) {
            return user.email === email &&
                   user.password === password;
        });

        if (user) {
            // Save the logged-in user
            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );

            // Open the dashboard
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid email or password!");
        }
    });
}

// ===============================
// DASHBOARD - CURRENT USER
// ===============================

const welcomeMessage =
    document.getElementById("welcomeMessage");

const logoutButton =
    document.getElementById("logoutButton");


// Check if user is logged in

if (welcomeMessage) {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    // If no user is logged in
    if (!currentUser) {

        window.location.href = "index.html";

    } else {

        // Display user's name
        welcomeMessage.textContent =
            `Welcome, ${currentUser.name}! 👋`;
    }
}


// ===============================
// LOGOUT
// ===============================

if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        // Remove logged-in user
        localStorage.removeItem("currentUser");

        // Return to login
        window.location.href = "index.html";
    });
}

// ===============================
// JOB APPLICATION - SAVE
// ===============================

const jobForm = document.getElementById("jobForm");

if (jobForm) {

    jobForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();

        // Check logged-in user
        const currentUser =
            JSON.parse(localStorage.getItem("currentUser"));

        if (!currentUser) {

            alert("Please login first.");

            window.location.href = "index.html";

            return;
        }


        // Get existing applications
        let applications =
            JSON.parse(
                localStorage.getItem("jobTrackApplications")
            ) || [];

            // Check whether we are editing an application
const editingApplication =
    JSON.parse(localStorage.getItem("editingApplication"));

if (editingApplication) {

    // Create updated application
    const updatedApplication = {

        id: editingApplication.id,

        userEmail: currentUser.email,

        company:
            document.getElementById("company").value.trim(),

        jobTitle:
            document.getElementById("jobTitle").value.trim(),

        location:
            document.getElementById("location").value.trim(),

        jobType:
            document.getElementById("jobType").value,

        status:
            document.getElementById("status").value,

        applicationDate:
            document.getElementById("applicationDate").value,

        interviewDate:
            document.getElementById("interviewDate").value,

        followUpDate:
            document.getElementById("followUpDate").value,

        jobLink:
            document.getElementById("jobLink").value.trim(),

        notes:
            document.getElementById("notes").value.trim()
    };

    // Find the existing application
    const index =
        applications.findIndex(function (application) {

            return application.id === editingApplication.id;

        });

    // Replace old application
    if (index !== -1) {

        applications[index] = updatedApplication;
    }

    // Remove editing mode
    localStorage.removeItem("editingApplication");

    alert("Application updated successfully!");

} else {

    // Create a new application
    const newApplication = {

        id: Date.now(),

        userEmail: currentUser.email,

        company:
            document.getElementById("company").value.trim(),

        jobTitle:
            document.getElementById("jobTitle").value.trim(),

        location:
            document.getElementById("location").value.trim(),

        jobType:
            document.getElementById("jobType").value,

        status:
            document.getElementById("status").value,

        applicationDate:
            document.getElementById("applicationDate").value,

        interviewDate:
            document.getElementById("interviewDate").value,

        followUpDate:
            document.getElementById("followUpDate").value,

        jobLink:
            document.getElementById("jobLink").value.trim(),

        notes:
            document.getElementById("notes").value.trim()
    };

    // Add new application
    applications.push(newApplication);

    alert("Job application saved successfully!");
}


        // Save updated applications
        localStorage.setItem(
            "jobTrackApplications",
            JSON.stringify(applications)
        );

        // Go back to dashboard
        window.location.href = "dashboard.html";

    });
}

// ===============================
// DASHBOARD - APPLICATION STATS
// ===============================

const totalApplications =
    document.getElementById("totalApplications");

if (totalApplications) {

    // Get current user
    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    // Get all applications
    const applications =
        JSON.parse(
            localStorage.getItem("jobTrackApplications")
        ) || [];


    // If there is no logged-in user
    if (!currentUser) {

        window.location.href = "index.html";

    } else {

        // Get only current user's applications
        const userApplications =
            applications.filter(function (application) {

                return application.userEmail === currentUser.email;

            });


            // Upcoming Interviews
const today = new Date();
today.setHours(0, 0, 0, 0);

const upcomingInterviews = userApplications
    .filter(function (application) {

        if (!application.interviewDate) {
            return false;
        }

        const interviewDate = new Date(application.interviewDate);

        return interviewDate >= today;
    })
    .sort(function (a, b) {

        return new Date(a.interviewDate) -
               new Date(b.interviewDate);
    });


// Upcoming Follow-ups
const upcomingFollowUps = userApplications
    .filter(function (application) {

        if (!application.followUpDate) {
            return false;
        }

        const followUpDate = new Date(application.followUpDate);

        return followUpDate >= today;
    })
    .sort(function (a, b) {

        return new Date(a.followUpDate) -
               new Date(b.followUpDate);
    });


// Display upcoming interview
const interviewElement =
    document.getElementById("upcomingInterviews");

if (upcomingInterviews.length > 0) {

    interviewElement.textContent =
        upcomingInterviews[0].company +
        " — " +
        upcomingInterviews[0].interviewDate;

} else {

    interviewElement.textContent =
        "No upcoming interviews.";
}


// Display upcoming follow-up
const followUpElement =
    document.getElementById("upcomingFollowUps");

if (upcomingFollowUps.length > 0) {

    followUpElement.textContent =
        upcomingFollowUps[0].company +
        " — " +
        upcomingFollowUps[0].followUpDate;

} else {

    followUpElement.textContent =
        "No upcoming follow-ups.";
}

        // Total
        document.getElementById("totalApplications").textContent =
            userApplications.length;


        // Applied
        const appliedCount =
            userApplications.filter(function (application) {

                return application.status === "Applied";

            }).length;


        // Interview
        const interviewCount =
            userApplications.filter(function (application) {

                return application.status === "Interview";

            }).length;


        // Selected
        const selectedCount =
            userApplications.filter(function (application) {

                return application.status === "Selected";

            }).length;
    // Rejected
    const rejectedCount =
        userApplications.filter(function (application) {

             return application.status === "Rejected";

        }).length;
        


        document.getElementById("appliedApplications").textContent =
            appliedCount;

        document.getElementById("interviewApplications").textContent =
            interviewCount;

        document.getElementById("selectedApplications").textContent =
            selectedCount;

         document.getElementById("rejectedApplications").textContent =
            rejectedCount;
    }
}

// ===============================
// DISPLAY MY APPLICATIONS
// ===============================
const applicationsList =
    document.getElementById("applicationsList");

if (applicationsList) {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        window.location.href = "index.html";
    } else {

        function displayApplications() {

            const applications =
                JSON.parse(
                    localStorage.getItem("jobTrackApplications")
                ) || [];

            const searchText =
                document.getElementById("searchApplications")
                    .value
                    .toLowerCase();

            const selectedStatus =
                document.getElementById("filterStatus").value;

            const userApplications =
                applications.filter(function (application) {

                    const belongsToUser =
                        application.userEmail === currentUser.email;

                    const matchesSearch =
                        application.company
                            .toLowerCase()
                            .includes(searchText) ||
                        application.jobTitle
                            .toLowerCase()
                            .includes(searchText);

                    const matchesStatus =
                        selectedStatus === "All" ||
                        application.status === selectedStatus;

                    return belongsToUser &&
                           matchesSearch &&
                           matchesStatus;
                });

            applicationsList.innerHTML = "";

            if (userApplications.length === 0) {

                applicationsList.innerHTML = `
                    <div class="empty-message">
                        <p>No matching applications found.</p>
                    </div>
                `;

            } else {

                userApplications.forEach(function (application) {

                    const card =
                        document.createElement("div");

                    card.className = "application-card";
                    
                    card.innerHTML = `
    <div class="application-card-header">

        <div>
            <h3>${application.company}</h3>

            <p class="application-job-title">
                ${application.jobTitle}
            </p>
        </div>

        <span class="status status-${application.status.toLowerCase()}">
            ${application.status}
        </span>

    </div>

    <p>
        <strong>Location:</strong>
        ${application.location}
    </p>

    <p>
        <strong>Type:</strong>
        ${application.jobType}
    </p>

                        <p>
                            <strong>Application Date:</strong>
                            ${application.applicationDate || "Not provided"}
                        </p>

                        <p>
                            <strong>Interview Date:</strong>
                            ${application.interviewDate || "Not scheduled"}
                        </p>

                        <p>
                            <strong>Follow-up Date:</strong>
                            ${application.followUpDate || "Not scheduled"}
                        </p>

                        <p>
                            <strong>Notes:</strong>
                            ${application.notes || "No notes"}
                        </p>

                        ${
                            application.jobLink
                            ? `<a href="${application.jobLink}"
                                 target="_blank">
                                 View Job
                               </a>`
                            : ""
                        }

                        <div class="application-actions">

                            <button
                                class="edit-button"
                                onclick="editApplication(${application.id})">
                                Edit
                            </button>

                            <button
                                class="delete-button"
                                onclick="deleteApplication(${application.id})">
                                Delete
                            </button>

                        </div>
                    `;

                    applicationsList.appendChild(card);
                });
            }
        }

        displayApplications();

        document
            .getElementById("searchApplications")
            .addEventListener("input", displayApplications);

        document
            .getElementById("filterStatus")
            .addEventListener("change", displayApplications);
    }
}

// ===============================
// DELETE APPLICATION
// ===============================

function deleteApplication(applicationId) {

    const confirmDelete =
        confirm("Are you sure you want to delete this application?");

    if (!confirmDelete) {
        return;
    }

    let applications =
        JSON.parse(
            localStorage.getItem("jobTrackApplications")
        ) || [];

    applications =
        applications.filter(function (application) {

            return application.id !== applicationId;

        });

    localStorage.setItem(
        "jobTrackApplications",
        JSON.stringify(applications)
    );

    alert("Application deleted successfully!");

    window.location.reload();
}

// ===============================
// ADD NEW APPLICATION
// ===============================

function addNewJob() {

    // Remove any previous editing mode
    localStorage.removeItem("editingApplication");

    // Open a fresh Add Job form
    window.location.href = "add-job.html";
}

// ===============================
// EDIT APPLICATION
// ===============================

function editApplication(applicationId) {

    const applications =
        JSON.parse(
            localStorage.getItem("jobTrackApplications")
        ) || [];

    const application =
        applications.find(function (application) {

            return application.id === applicationId;

        });

    if (!application) {
        alert("Application not found.");
        return;
    }

    // Store the application being edited
    localStorage.setItem(
        "editingApplication",
        JSON.stringify(application)
    );

    // Open Add/Edit form
    window.location.href = "add-job.html";
}

// ===============================
// LOAD APPLICATION FOR EDITING
// ===============================

const editingApplication =
    JSON.parse(localStorage.getItem("editingApplication"));
if (editingApplication && jobForm) {

    // Change page title
    document.getElementById("formTitle").textContent =
        "Edit Job Application";

    // Change button text
    document.getElementById("saveJobButton").textContent =
        "Update Application";


    // Load existing values

    document.getElementById("company").value =
        editingApplication.company;

    document.getElementById("jobTitle").value =
        editingApplication.jobTitle;

    document.getElementById("location").value =
        editingApplication.location;

    document.getElementById("jobType").value =
        editingApplication.jobType;

    document.getElementById("status").value =
        editingApplication.status;

    document.getElementById("applicationDate").value =
        editingApplication.applicationDate;

    document.getElementById("interviewDate").value =
        editingApplication.interviewDate;

    document.getElementById("followUpDate").value =
        editingApplication.followUpDate;

    document.getElementById("jobLink").value =
        editingApplication.jobLink;

    document.getElementById("notes").value =
        editingApplication.notes;
}