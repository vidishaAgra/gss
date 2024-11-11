const AdminEventsPage = {
    apiBaseUrl: 'https://qzicsfudik.execute-api.us-east-1.amazonaws.com/test',

    // Fetch all events from the API for admin page
    async fetchEvents() {
        const url = `${this.apiBaseUrl}/gss_get_all_events`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            
            console.log('Fetched events:', data);

            if (Array.isArray(data)) {
                this.renderEvents(data);
            } else {
                console.error('Unexpected data format from API');
            }
        } catch (error) {
            console.error('Error fetching events:', error.message);
        }
    },

    // Render all events in the container
    renderEvents(events) {
        const container = document.querySelector('#events-container');
        container.innerHTML = '';  // Clear existing content

        events.forEach((event, index) => {
            const bgColor = index % 2 === 0 ? '#b8a397' : '#6e7b66';
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.style.backgroundColor = bgColor;
            eventCard.style.marginBottom = '20px';
            eventCard.style.padding = '20px';
            eventCard.style.borderRadius = '10px';
            eventCard.style.display = 'flex';
            eventCard.style.alignItems = 'center';
            eventCard.style.fontSize = '14px';

            const dateDiv = document.createElement('div');
            dateDiv.style.width = '80px';
            dateDiv.style.fontSize = '20px';
            dateDiv.style.color = 'white';
            dateDiv.style.textAlign = 'center';

            const eventDate = new Date(event.eventDate);
            dateDiv.innerHTML = `
                <strong>${eventDate.getDate()}</strong><br>
                ${eventDate.toLocaleString('default', { month: 'long' })}<br>
                <span style="font-size: 14px;">${eventDate.toLocaleString('default', { weekday: 'long' })}</span>
            `;

            const eventInfoDiv = document.createElement('div');
            eventInfoDiv.style.flexGrow = '1';
            eventInfoDiv.style.paddingLeft = '20px';
            eventInfoDiv.innerHTML = `
                <h3 style="font-size: 18px; margin: 0; color: white;"><strong>${event.eventName}</strong></h3>
                <p style="color: #eee; font-size: 12px; margin: 5px 0;">${event.eventDate} (${event.time})</p>
            `;

            const buttonDiv = document.createElement('div');
            buttonDiv.style.display = 'flex';
            buttonDiv.style.gap = '10px';

            const updateButton = document.createElement('button');
            updateButton.classList.add('btn', 'btn-warning');
            updateButton.style.backgroundColor = 'transparent';
            updateButton.style.border = '2px solid white';
            updateButton.style.color = 'white';
            updateButton.style.borderRadius = '20px';
            updateButton.style.padding = '8px 20px';
            updateButton.textContent = 'Update';
            updateButton.onclick = () => this.openUpdatePage(event.eventName);
            buttonDiv.appendChild(updateButton);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.style.backgroundColor = 'transparent';
            deleteButton.style.border = '2px solid white';
            deleteButton.style.color = 'white';
            deleteButton.style.borderRadius = '20px';
            deleteButton.style.padding = '8px 20px';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => this.deleteEvent(event.eventName);
            buttonDiv.appendChild(deleteButton);

            eventCard.appendChild(dateDiv);
            eventCard.appendChild(eventInfoDiv);
            eventCard.appendChild(buttonDiv);
            container.appendChild(eventCard);
        });
    },

    // Open AdminSingleEvent.html with eventName as query parameter
    openUpdatePage(eventName) {
        window.location.href = `AdminSingleEvent.html?eventName=${encodeURIComponent(eventName)}`;
    },

    // Function to delete an event
    async deleteEvent(eventName) {
        const url = `${this.apiBaseUrl}/gss_delete_event?eventName=${encodeURIComponent(eventName)}`;

        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Failed to delete event: ${response.statusText}`);
            }

            console.log(`Event "${eventName}" deleted successfully`);
            this.fetchEvents();
        } catch (error) {
            console.error(`Error deleting event "${eventName}":`, error.message);
        }
    },

    // Function to get eventName from the URL
    getEventNameFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("eventName");
    },

    // Fetch and render event details for editing
    async fetchAndRenderEventDetails() {
        const eventName = this.getEventNameFromURL();
        
        if (!eventName) {
            console.error("No eventName specified in URL.");
            return;
        }

        const url = `${this.apiBaseUrl}/gss_get_single_event?eventName=${eventName}`;
        
        try {
            const response = await fetch(url);
            const eventData = await response.json();
            
            if (!eventData || !eventData.eventName) {
                console.error("Event data not found.");
                return;
            }

            document.getElementById("event-name").value = eventData.eventName;
            document.getElementById("event-date").value = eventData.eventDate;
            document.getElementById("event-time").value = eventData.time;
            document.getElementById("event-venue").value = eventData.venue;
            document.getElementById("event-payment").value = eventData.payment;
            document.getElementById("event-member-price").value = eventData.memberPrice;
            document.getElementById("event-nonmember-price").value = eventData.nonmemberPrice;
            document.getElementById("event-description").value = eventData.description;

            console.log("Event details loaded for editing.");
        } catch (error) {
            console.error("Failed to fetch event details:", error);
        }
    },

    // Function to handle event updates
    async updateEventDetails() {
        const eventName = this.getEventNameFromURL();
        
        if (!eventName) {
            console.error("No eventName specified in URL.");
            return;
        }

        const updatedEventData = {
            eventName: document.getElementById("event-name").value,
            eventDate: document.getElementById("event-date").value,
            time: document.getElementById("event-time").value,
            venue: document.getElementById("event-venue").value,
            payment: document.getElementById("event-payment").value,
            memberPrice: document.getElementById("event-member-price").value,
            nonmemberPrice: document.getElementById("event-nonmember-price").value,
            description: document.getElementById("event-description").value,
        };

        const url = `${this.apiBaseUrl}/gss_update_event`;

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedEventData)
            });

            if (!response.ok) {
                throw new Error(`Failed to update event: ${response.statusText}`);
            }

            console.log("Event updated successfully.");
            alert("Event details updated successfully.");
            window.location.href = 'AdminEventsPage.html';
        } catch (error) {
            console.error("Error updating event:", error);
        }
    }
};

// Initialize event fetching on page load
document.addEventListener('DOMContentLoaded', () => AdminEventsPage.fetchEvents());

// Fetch all members from the API
async function fetchMembers() {
    const membersApiUrl = 'https://qzicsfudik.execute-api.us-east-1.amazonaws.com/test/gss_get_all_users';

    try {
        const response = await fetch(membersApiUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        
        console.log('Fetched members:', data);  // Check the structure of the fetched data

        // Ensure the data is an array before rendering
        if (Array.isArray(data)) {
            renderMembers(data);
        } else {
            console.error('Unexpected data format from API');
        }
    } catch (error) {
        console.error('Error fetching members:', error.message);
    }
}

// Render all members in the container
function renderMembers(members) {
    const container = document.querySelector('#members-container'); // Target container where members should be displayed
    container.innerHTML = '';  // Clear any existing content

    members.forEach((member, index) => {
        // Set alternating background colors for each member
        const bgColor = index % 2 === 0 ? '#e1e1e1' : '#c9d3cc';

        // Create member card
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
        memberCard.style.backgroundColor = bgColor;
        memberCard.style.marginBottom = '20px';
        memberCard.style.padding = '20px';
        memberCard.style.borderRadius = '10px';
        memberCard.style.display = 'flex';
        memberCard.style.alignItems = 'center';
        memberCard.style.fontSize = '14px';

        // Create and style member information section
        const memberInfoDiv = document.createElement('div');
        memberInfoDiv.style.flexGrow = '1';
        memberInfoDiv.style.paddingLeft = '20px';
        memberInfoDiv.innerHTML = `
            <h3 style="font-size: 18px; margin: 0; color: black;"><strong>${member.full_name}</strong></h3>
            <p style="color: #555; font-size: 12px; margin: 5px 0;">Email: ${member.email}</p>
            <p style="color: #555; font-size: 12px; margin: 5px 0;">Phone: ${member.phone_number}</p>
        `;

        // Create and style "Edit" and "Delete" buttons
        const buttonDiv = document.createElement('div');
        const editButton = document.createElement('button');
        editButton.classList.add('btn');
        editButton.textContent = 'Edit';
        editButton.style.backgroundColor = '#6e7b66';  // Update the color to #798475
        // editButton.style.marginRight = '1px';
        editButton.onclick = () => editMember(member.email); // Add your edit functionality here
        
        editButton.onclick = () => {
            window.location.href = `SingleMember.html?email=${encodeURIComponent(member.email)}`;
        };


        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteMember(member.email); // Add your delete functionality here
        
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);

        // Append info and buttons to member card
        memberCard.appendChild(memberInfoDiv);
        memberCard.appendChild(buttonDiv);

        // Append the member card to the main container
        container.appendChild(memberCard);
    });
}




// Call the function to fetch and render members when the page loads
document.addEventListener('DOMContentLoaded', fetchMembers);






// Function to get the email from the URL
function getEmailFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("email");
}

// Function to fetch and render the single member's data
async function fetchAndRenderMemberDetails() {
    const email = getEmailFromURL();
    
    if (!email) {
        console.error("No email specified in URL.");
        return;
    }

    const singleUserApiUrl = `https://qzicsfudik.execute-api.us-east-1.amazonaws.com/test/gss_get_single_user?email=${encodeURIComponent(email)}`;
    
    try {
        const response = await fetch(singleUserApiUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const memberData = await response.json();

        if (!memberData || !memberData.full_name) {
            console.error("Member data not found.");
            return;
        }

        // Populate the input fields with fetched member data
        document.getElementById("member-name").value = memberData.full_name;
        document.getElementById("member-email").value = memberData.email;
        document.getElementById("member-phone").value = memberData.phone_number;

        console.log("Member details rendered successfully.");
    } catch (error) {
        console.error("Failed to fetch member details:", error);
    }
}

// Function to update member details
async function updateMemberDetails() {
    const email = getEmailFromURL();
    if (!email) {
        console.error("No email specified in URL.");
        return;
    }

    // Get updated values from the input fields
    const updatedMember = {
        full_name: document.getElementById("member-name").value,
        email: document.getElementById("member-email").value,  // Email is disabled, so it shouldn't change
        phone_number: document.getElementById("member-phone").value
    };

    const updateUserApiUrl = `https://qzicsfudik.execute-api.us-east-1.amazonaws.com/test/gss_update_user`;
    
    try {
        const response = await fetch(updateUserApiUrl, {
            method: "POST",  // Use the correct method according to your API
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedMember)
        });

        if (response.ok) {
            alert("Member details updated successfully!");
        } else {
            throw new Error(`Failed to update member details: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error updating member details:", error);
        alert("An error occurred while updating member details.");
    }
}

// Event listener for "Update" button click
document.getElementById("update-button").addEventListener("click", updateMemberDetails);

// Run the function to fetch and render member details when the page loads
document.addEventListener("DOMContentLoaded", fetchAndRenderMemberDetails);






//----------------------------------------------------------------------------------------





// Fetch and render the single member's data
async function fetchAndRenderMemberDetails() {
    const email = getEmailFromURL();
    
    if (!email) {
        console.error("No email specified in URL.");
        return;
    }

    const singleUserApiUrl = `https://qzicsfudik.execute-api.us-east-1.amazonaws.com/test/gss_get_single_user?email=${encodeURIComponent(email)}`;
    
    try {
        const response = await fetch(singleUserApiUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const memberData = await response.json();

        if (!memberData || !memberData.full_name) {
            console.error("Member data not found.");
            return;
        }

        // Populate the input fields with fetched member data
        document.getElementById("member-name").value = memberData.full_name;
        document.getElementById("member-email").value = memberData.email;
        document.getElementById("member-phone").value = memberData.phone_number;

        console.log("Member details rendered successfully.");
    } catch (error) {
        console.error("Failed to fetch member details:", error);
    }
}

// Function to get the email from the URL
function getEmailFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("email");
}

// Function to delete a member
async function deleteMember(email) {
    const deleteUserApiUrl = `https://qzicsfudik.execute-api.us-east-1.amazonaws.com/test/gss_delete_user?email=${encodeURIComponent(email)}`;

    try {
        const response = await fetch(deleteUserApiUrl, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert("Member deleted successfully!");
            // Redirect back to the members list page
            window.location.href = 'SeeMembers.html';  // Change this to the actual list page
        } else {
            throw new Error(`Failed to delete member: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error deleting member:", error);
        alert("An error occurred while deleting the member.");
    }
}

// Event listener for "Update" button click
document.getElementById("update-button").addEventListener("click", updateMemberDetails);

// Event listener for "Delete" button click
document.getElementById("delete-button").addEventListener("click", () => {
    const email = getEmailFromURL();
    if (email) {
        const confirmDelete = confirm("Are you sure you want to delete this member?");
        if (confirmDelete) {
            deleteMember(email);
        }
    }
});

// Update member details
async function updateMemberDetails() {
    const email = getEmailFromURL();
    if (!email) {
        console.error("No email specified in URL.");
        return;
    }

    // Get updated values from the input fields
    const updatedMember = {
        full_name: document.getElementById("member-name").value,
        email: document.getElementById("member-email").value,  // Email is disabled, so it shouldn't change
        phone_number: document.getElementById("member-phone").value
    };

    const updateUserApiUrl = `https://qzicsfudik.execute-api.us-east-1.amazonaws.com/test/gss_update_user`;
    
    try {
        const response = await fetch(updateUserApiUrl, {
            method: "POST",  // Use the correct method according to your API
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedMember)
        });

        if (response.ok) {
            alert("Member details updated successfully!");
        } else {
            throw new Error(`Failed to update member details: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error updating member details:", error);
        alert("An error occurred while updating member details.");
    }
}

// Call the function to fetch and render member details when the page loads
document.addEventListener("DOMContentLoaded", fetchAndRenderMemberDetails);









