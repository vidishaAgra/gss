// Fetch all events from the API
async function fetchEvents() {
    const allEventsApiUrl = 'https://qzicsfudik.execute-api.us-east-1.amazonaws.com/test/gss_get_all_events';

    try {
        const response = await fetch(allEventsApiUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        
        console.log('Fetched events:', data);  // Check the structure of the fetched data

        // Ensure the data is an array before rendering
        if (Array.isArray(data)) {
            renderEvents(data);
        } else {
            console.error('Unexpected data format from API');
        }
    } catch (error) {
        console.error('Error fetching events:', error.message);
    }
}

// Render all events in the container
function renderEvents(events) {
    const container = document.querySelector('#events-container'); // Target container where events should be displayed
    container.innerHTML = '';  // Clear any existing content

    events.forEach((event, index) => {
        // Set alternating background colors for each event
        const bgColor = index % 2 === 0 ? '#b8a397' : '#6e7b66';

        // Create event card
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.style.backgroundColor = bgColor;
        eventCard.style.marginBottom = '20px';
        eventCard.style.padding = '20px';
        eventCard.style.borderRadius = '10px';
        eventCard.style.display = 'flex';
        eventCard.style.alignItems = 'center';
        eventCard.style.fontSize = '14px';

        // Create and style date section
        const dateDiv = document.createElement('div');
        dateDiv.style.width = '80px';
        dateDiv.style.fontSize = '20px';
        dateDiv.style.color = 'white';
        dateDiv.style.textAlign = 'center';

        // Format the event date
        const eventDate = new Date(event.eventDate);
        dateDiv.innerHTML = `
            <strong>${eventDate.getDate()}</strong><br>
            ${eventDate.toLocaleString('default', { month: 'long' })}<br>
            <span style="font-size: 14px;">${eventDate.toLocaleString('default', { weekday: 'long' })}</span>
        `;

        // Create and style event information section
        const eventInfoDiv = document.createElement('div');
        eventInfoDiv.style.flexGrow = '1';
        eventInfoDiv.style.paddingLeft = '20px';
        eventInfoDiv.innerHTML = `
            <h3 style="font-size: 18px; margin: 0; color: white;"><strong>${event.eventName}</strong></h3>
            <p style="color: #eee; font-size: 12px; margin: 5px 0;">${event.eventDate} (${event.time})</p>
        `;

        // Create and style "Read More" button
        const buttonDiv = document.createElement('div');
        const button = document.createElement('a');
        button.classList.add('btn', 'btn-primary');
        button.href = `booking.html?eventName=${encodeURIComponent(event.eventName)}`;
        button.style.backgroundColor = 'transparent';
        button.style.border = '2px solid white';
        button.style.color = 'white';
        button.style.borderRadius = '20px';
        button.style.padding = '8px 20px';
        button.textContent = 'Read More';
        buttonDiv.appendChild(button);

        // Append date, info, and button to event card
        eventCard.appendChild(dateDiv);
        eventCard.appendChild(eventInfoDiv);
        eventCard.appendChild(buttonDiv);

        // Append the event card to the main container
        container.appendChild(eventCard);
    });
}

// index2.js

// Function to get the eventName from the URL
function getEventNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("eventName");
}

// Function to fetch event data from API and render on the page
async function fetchAndRenderEventDetails() {
    const eventName = getEventNameFromURL();
    
    if (!eventName) {
        console.error("No eventName specified in URL.");
        return;
    }

    try {
        const response = await fetch(`https://qzicsfudik.execute-api.us-east-1.amazonaws.com/test/gss_get_single_event?eventName=${eventName}`);
        const eventData = await response.json();
        
        // Check if the API response contains event data
        if (!eventData || !eventData.eventName) {
            console.error("Event data not found.");
            return;
        }

        // Render event details on the page
        document.getElementById("event-name").textContent = eventData.eventName;
        document.getElementById("event-date").textContent = `Date: ${eventData.eventDate}`;
        document.getElementById("event-time").textContent = `Time: ${eventData.time}`;
        document.getElementById("event-venue").textContent = `Venue: ${eventData.venue}`;
        document.getElementById("event-payment").textContent = `Fee: $${eventData.payment}`;
        document.getElementById("event-member-price").textContent = `Member Price: $${eventData.memberPrice}`;
        document.getElementById("event-nonmember-price").textContent = `Non-Member Price: $${eventData.nonmemberPrice}`;

        // Event description
        document.getElementById("event-description").textContent = eventData.description;

        // Scheduled Activities
        const activitiesContainer = document.getElementById("activities-container");
        eventData.scheduledActivities.forEach((activity, index) => {
            const activityItem = document.createElement("p");
            activityItem.textContent = `${index + 1}. ${activity}`;
            activitiesContainer.appendChild(activityItem);
        });

        console.log("Event details rendered successfully.");
    } catch (error) {
        console.error("Failed to fetch event details:", error);
    }
}
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

// Run the function to fetch and render event details when the page loads
document.addEventListener("DOMContentLoaded", fetchAndRenderEventDetails);

document.addEventListener('DOMContentLoaded', fetchEvents);










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











