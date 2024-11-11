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

// Run the function to fetch and render event details when the page loads
document.addEventListener("DOMContentLoaded", fetchAndRenderEventDetails);

document.addEventListener('DOMContentLoaded', fetchEvents);








