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
