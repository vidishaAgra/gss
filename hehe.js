// URL of the API endpoint
const apiUrl = 'https://qzicsfudik.execute-api.us-east-1.amazonaws.com/test/gss_get_single_event?eventName=Lohri';

// Function to fetch event data
async function fetchEvent() {
    try {
        // Fetch the data from the API
        const response = await fetch(apiUrl);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const events = await response.json();

        // Log the first event to the console (or handle as needed)
        if (events.length > 0) {
            console.log("Single Event:");  // Log the first event for testing
        } else {
            console.log("No events found.");
        }
    } catch (error) {
        // Log any errors to the console
        console.error("Error fetching event:", error);
    }
}

// Call the fetchEvent function when the page loads
window.addEventListener('DOMContentLoaded', fetchEvent);
