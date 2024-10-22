

// Function to fetch events data from the API
async function fetchEvents() {
    const apiUrl = 'https://cgl75u0y9a.execute-api.us-east-1.amazonaws.com/test/get-events';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Assuming 'data' contains an array of events with eventDate, eventName, and time
        if (data && Array.isArray(data)) {
            renderEvents(data);
        } else {
            console.error('Invalid data format from API');
        }
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Function to render the event cards dynamically
function renderEvents(events) {
    const container = document.querySelector('.container');
    container.innerHTML = '';  // Clear any existing content

    events.forEach((event, index) => {
        const bgColor = index % 2 === 0 ? '#b8a397' : '#6e7b66';  // Alternating background color for events

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
        dateDiv.innerHTML = `
            <strong>${new Date(event.eventDate).getDate()}</strong><br>
            ${new Date(event.eventDate).toLocaleString('default', { month: 'long' })}<br>
            <span style="font-size: 14px;">${new Date(event.eventDate).toLocaleString('default', { weekday: 'long' })}</span>
        `;

        const eventInfoDiv = document.createElement('div');
        eventInfoDiv.style.flexGrow = '1';
        eventInfoDiv.style.paddingLeft = '20px';
        eventInfoDiv.innerHTML = `
            <h3 style="font-size: 18px; margin: 0; color: white;"><strong>${event.eventName}</strong></h3>
            <p style="color: #eee; font-size: 12px; margin: 5px 0;">${event.eventDate} (${event.time})</p>
        `;

        const buttonDiv = document.createElement('div');
        const button = document.createElement('a');
        button.classList.add('btn', 'btn-primary');
        button.href = 'booking.html';  // Assuming the link is the same for all events
        button.style.backgroundColor = 'transparent';
        button.style.border = '2px solid white';
        button.style.color = 'white';
        button.style.borderRadius = '20px';
        button.style.padding = '8px 20px';
        button.textContent = 'Read More';
        buttonDiv.appendChild(button);

        eventCard.appendChild(dateDiv);
        eventCard.appendChild(eventInfoDiv);
        eventCard.appendChild(buttonDiv);

        container.appendChild(eventCard);
    });
}

// Call the fetchEvents function when the page loads
document.addEventListener('DOMContentLoaded', fetchEvents);




// async function fetchEvents() {
//     const apiUrl = 'https://j8s2ew6ehg.execute-api.us-east-1.amazonaws.com/test/GSS_getallevents';

//     try {
//         const response = await fetch(apiUrl, { mode: 'no-cors' });  // Add no-cors mode
//         // Since the response will be opaque, you can't use the data directly
//         console.log('Fetched events with no-cors mode:', response);
//     } catch (error) {
//         console.error('Error fetching events:', error);
//     }
// }


// Function to fetch events

  
  // Call fetch function
//   fetchEvents();

//   async function fetchEvents() {
//     try {
//       const response = await fetch('https://cgl75u0y9a.execute-api.us-east-1.amazonaws.com/test/get-events', {
//         method: 'GET',
//         mode: 'no-cors' // Bypass CORS temporarily
//       });
//       console.log(response);
//       // You'll get an opaque response with no usable data
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   }
  
//   fetchEvents();
  