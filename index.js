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

document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is ready");

    // Function to fetch event data from the API
    async function fetchEventData() {
        try {
            console.log("Fetching data from API...");
            // Fetch data from the API
            const response = await fetch('https://j8s2ew6ehg.execute-api.us-east-1.amazonaws.com/test/GSS_getallevents');
            
            // Check if the fetch was successful
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            
            const data = await response.json();
            console.log("Data fetched successfully:", data);

            // Extract relevant data
            const events = data.map(event => {
                return {
                    eventDate: event.eventDate,
                    eventName: event.eventName,
                    time: event.time
                };
            });

            console.log("Extracted events:", events);
            renderEvents(events);
        } catch (error) {
            console.error("Error fetching event data:", error);
        }
    }

    // Function to render event cards in the HTML
    function renderEvents(events) {
        const container = document.querySelector(".container"); // Select the container where events will go
        
        // Check if the container exists
        if (!container) {
            console.error("Container element not found");
            return;
        }

        console.log("Rendering events...");

        // Clear any existing events
        container.innerHTML = '';

        // Loop through the events and create the event card for each
        events.forEach(event => {
            const eventCard = `
                <div class="event-card" style="background-color: #b8a397; margin-bottom: 20px; padding: 20px; border-radius: 10px; display: flex; align-items: center; font-size: 14px;">
                    <div style="width: 80px; font-size: 20px; color: white; text-align: center;">
                        <strong>${new Date(event.eventDate).getDate()}</strong><br>
                        ${new Date(event.eventDate).toLocaleString('default', { month: 'long' })}<br>
                        <span style="font-size: 14px;">${new Date(event.eventDate).toLocaleString('default', { weekday: 'long' })}</span>
                    </div>
                    <div style="flex-grow: 1; padding-left: 20px;">
                        <h3 style="font-size: 18px; margin: 0; color: white;"><strong>${event.eventName}</strong></h3>
                        <p style="color: #eee; font-size: 12px; margin: 5px 0;">${event.eventDate} (${event.time})</p>
                    </div>
                    <div>
                        <a class="btn btn-primary" href="booking.html" style="background-color: transparent; border: 2px solid white; color: white; border-radius: 20px; padding: 8px 20px;">Read More</a>
                    </div>
                </div>
            `;

            // Insert the event card into the container
            container.innerHTML += eventCard;
        });

        console.log("Events rendered successfully");
    }

    // Fetch and display the event data when the page loads
    fetchEventData();
});
