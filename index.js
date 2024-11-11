document.addEventListener("DOMContentLoaded", function () {
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = {
                name: document.querySelector('[name="name"]').value,
                email: document.querySelector('[name="email"]').value,
                phone: document.querySelector('[name="phone"]').value,
                message: document.querySelector('[name="message"]').value
            };

            console.log('Contact Form Data:', formData);
        });
    }

    // Event Form Handling
    const eventForm = document.getElementById('form'); // Ensure this matches your form ID
    if (eventForm) {
        eventForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = {
                date: document.querySelector('[name="date"]').value,
                time: document.querySelector('[name="time"]').value,
                festival_name: document.querySelector('[name="festival_name"]').value,
                venue: document.querySelector('[name="venue"]').value,
                description: document.querySelector('[name="description"]').value,
                member_ticket_price: document.querySelector('[name="member_ticket_price"]').value,
                non_member_entry_price: document.querySelector('[name="non_member_entry_price"]').value,
                faqs: document.querySelector('[name="faqs"]').value,
                sponsors: document.querySelector('[name="sponsors"]').value,
                // Handle image upload or URL
                imageUpload: document.querySelector('[name="imageUpload"]').files[0] ? document.querySelector('[name="imageUpload"]').files[0].name : null,
                imageUrl: document.querySelector('[name="imageUrl"]').value || null
            };

            console.log('Event Form Data:', formData);
        });
    }

    // Call toggle function to set initial visibility for image input
    toggleImageInput();

    // Add event listener to toggle image input
    const imageChoice = document.getElementById('imageChoice');
    if (imageChoice) {
        imageChoice.addEventListener('change', toggleImageInput);
    }
});

// Function to toggle image input visibility
function toggleImageInput() {
    const choice = document.getElementById('imageChoice').value;
    const fileInputDiv = document.getElementById('fileInputDiv');
    const urlInputDiv = document.getElementById('urlInputDiv');

    if (choice === 'upload') {
        fileInputDiv.style.display = 'block';
        urlInputDiv.style.display = 'none';
    } else if (choice === 'url') {
        fileInputDiv.style.display = 'none';
        urlInputDiv.style.display = 'block';
    }
}

// document.addEventListener("DOMContentLoaded", function () {
//     console.log("Document is ready");

//     // Function to fetch event data from the API
//     async function fetchEventData() {
//         try {
//             console.log("Fetching data from API...");
//             // Fetch data from the API
//             const response = await fetch('https://j8s2ew6ehg.execute-api.us-east-1.amazonaws.com/test/GSS_getallevents');
            
//             // Check if the fetch was successful
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
            
//             const data = await response.json();
//             console.log("Data fetched successfully:", data);

//             // Extract relevant data
//             const events = data.map(event => {
//                 return {
//                     eventDate: event.eventDate,
//                     eventName: event.eventName,
//                     time: event.time
//                 };
//             });

//             console.log("Extracted events:", events);
//             renderEvents(events);
//         } catch (error) {
//             console.error("Error fetching event data:", error);
//         }
//     }

//     // Function to render event cards in the HTML
//     function renderEvents(events) {
//         const container = document.querySelector(".container"); // Select the container where events will go
        
//         // Check if the container exists
//         if (!container) {
//             console.error("Container element not found");
//             return;
//         }

//         console.log("Rendering events...");

//         // Clear any existing events
//         container.innerHTML = '';

//         // Loop through the events and create the event card for each
//         events.forEach(event => {
//             const eventCard = `
//                 <div class="event-card" style="background-color: #b8a397; margin-bottom: 20px; padding: 20px; border-radius: 10px; display: flex; align-items: center; font-size: 14px;">
//                     <div style="width: 80px; font-size: 20px; color: white; text-align: center;">
//                         <strong>${new Date(event.eventDate).getDate()}</strong><br>
//                         ${new Date(event.eventDate).toLocaleString('default', { month: 'long' })}<br>
//                         <span style="font-size: 14px;">${new Date(event.eventDate).toLocaleString('default', { weekday: 'long' })}</span>
//                     </div>
//                     <div style="flex-grow: 1; padding-left: 20px;">
//                         <h3 style="font-size: 18px; margin: 0; color: white;"><strong>${event.eventName}</strong></h3>
//                         <p style="color: #eee; font-size: 12px; margin: 5px 0;">${event.eventDate} (${event.time})</p>
//                     </div>
//                     <div>
//                         <a class="btn btn-primary" href="booking.html" style="background-color: transparent; border: 2px solid white; color: white; border-radius: 20px; padding: 8px 20px;">Read More</a>
//                     </div>
//                 </div>
//             `;

//             // Insert the event card into the container
//             container.innerHTML += eventCard;
//         });

//         console.log("Events rendered successfully");
//     }

//     // Fetch and display the event data when the page loads
//     fetchEventData();
// });
























  // let form = document.getElementById("form");
  // let textInput = document.getElementById("textInput");
  // let dateInput = document.getElementById("dateInput");
  // let textarea = document.getElementById("textarea");
  // let msg = document.createElement("div"); // Message for validation
  // form.insertBefore(msg, form.firstChild); // Insert validation message at the top
  // let tasksDiv = document.getElementById("tasks");
  // let add = document.getElementById("add");

  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   formValidation();
  // });

  // let formValidation = () => {
  //   if (textInput.value === "") {
  //     console.log("failure");
  //     msg.innerHTML = "Task title cannot be blank!";
  //     msg.style.color = "red";
  //   } else {
  //     console.log("success");
  //     msg.innerHTML = "";
  //     acceptData();
  //     // Manually close the modal by triggering a click on the close button
  //     document.querySelector(".btn-close").click(); 
  //   }
  // };

  // let data = JSON.parse(localStorage.getItem("data")) || []; // Initialize with existing localStorage data

  // let acceptData = () => {
  //   data.push({
  //     text: textInput.value,
  //     date: dateInput.value,
  //     description: textarea.value,
  //   });

  //   localStorage.setItem("data", JSON.stringify(data));
  //   console.log(data);
  //   createTasks();
  // };

  // let createTasks = () => {
  //   tasksDiv.innerHTML = "";
  //   data.map((x, y) => {
  //     return (tasksDiv.innerHTML += `
  //       <div class="task-item" style="background-color: #fff; border: 1px solid #ddd; padding: 10px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);" id=${y}>
  //         <span class="fw-bold">${x.text}</span>
  //         <span class="small text-secondary">${x.date}</span>
  //         <p>${x.description}</p>
  //         <div class="options" style="display: flex; justify-content: flex-end; gap: 10px;">
  //           <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit" style="color: #0d6efd; cursor: pointer;"></i>
  //           <i onClick="deleteTask(this)" class="fas fa-trash-alt" style="color: #dc3545; cursor: pointer;"></i>
  //         </div>
  //       </div>
  //     `);
  //   });

  //   resetForm();
  // };

  // let deleteTask = (e) => {
  //   e.parentElement.parentElement.remove();
  //   data.splice(e.parentElement.parentElement.id, 1);
  //   localStorage.setItem("data", JSON.stringify(data));
  //   console.log(data);
  // };

  // let editTask = (e) => {
  //   let selectedTask = e.parentElement.parentElement;

  //   textInput.value = selectedTask.children[0].innerHTML;
  //   dateInput.value = selectedTask.children[1].innerHTML;
  //   textarea.value = selectedTask.children[2].innerHTML;

  //   deleteTask(e); // Remove the existing task when editing
  // };

  // let resetForm = () => {
  //   textInput.value = "";
  //   dateInput.value = "";
  //   textarea.value = "";
  // };

  // // Load tasks from localStorage on page load
  // (() => {
  //   createTasks();
  // })();





  let form = document.getElementById("form");
let usernameInput = document.getElementById("usernameInput");
let emailInput = document.getElementById("emailInput");
let usersTable = document.getElementById("usersTable");
let addUser = document.getElementById("addUser");
let search = document.getElementById("search");
let userCount = document.getElementById("userCount");
let msg = document.createElement("div"); // Message for validation
form.insertBefore(msg, form.firstChild); // Insert validation message at the top

let usersData = JSON.parse(localStorage.getItem("usersData")) || []; // Initialize with existing localStorage data

// Add new user
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

// Form validation
let formValidation = () => {
    if (usernameInput.value === "" || emailInput.value === "") {
        msg.innerHTML = "Username and Email cannot be blank!";
        msg.style.color = "red";
    } else {
        msg.innerHTML = "";
        acceptUserData();
        // Close modal
        document.querySelector(".btn-close").click();
    }
};

// Accept user data and store in localStorage
let acceptUserData = () => {
    usersData.push({
        username: usernameInput.value,
        email: emailInput.value,
    });

    localStorage.setItem("usersData", JSON.stringify(usersData));
    createUserTable();
};

// Create user table rows
let createUserTable = () => {
    usersTable.innerHTML = "";
    usersData.map((user, index) => {
        return (usersTable.innerHTML += `
            <tr id=${index}>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <i onClick="editUser(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit" style="color: #0d6efd; cursor: pointer;"></i>
                    <i onClick="deleteUser(this)" class="fas fa-trash-alt" style="color: #dc3545; cursor: pointer;"></i>
                </td>
            </tr>
        `);
    });

    // Update the count of users
    userCount.innerText = usersData.length;

    // Reset form fields after submission
    resetForm();
};

// Delete user
let deleteUser = (e) => {
    let userIndex = e.parentElement.parentElement.id;
    usersData.splice(userIndex, 1);
    localStorage.setItem("usersData", JSON.stringify(usersData));
    createUserTable();
};

// Edit user
let editUser = (e) => {
    let selectedUser = e.parentElement.parentElement;
    usernameInput.value = selectedUser.children[0].innerHTML;
    emailInput.value = selectedUser.children[1].innerHTML;

    deleteUser(e); // Remove the existing user for editing
};

// Reset form fields
let resetForm = () => {
    usernameInput.value = "";
    emailInput.value = "";
};

// Search functionality
search.addEventListener("input", (e) => {
    let searchValue = e.target.value.toLowerCase();
    let filteredData = usersData.filter(user => 
        user.username.toLowerCase().includes(searchValue)
    );

    // Clear and rebuild table based on search results
    usersTable.innerHTML = "";
    filteredData.map((user, index) => {
        return (usersTable.innerHTML += `
            <tr id=${index}>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    <i onClick="editUser(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit" style="color: #0d6efd; cursor: pointer;"></i>
                    <i onClick="deleteUser(this)" class="fas fa-trash-alt" style="color: #dc3545; cursor: pointer;"></i>
                </td>
            </tr>
        `);
    });
});

// Load users from localStorage on page load
(() => {
    createUserTable();
})();



























