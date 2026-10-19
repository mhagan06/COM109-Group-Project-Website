// Wait for the website content to load before running the code
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Create the HTML for the popup form (The Modal)
    const modalHTML = `
    <div id="bookingModal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Book Your Experience</h2>
            <p>Fill in your details below.</p>
            <form id="bookingForm">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="fullName" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="email" placeholder="email@example.com" required>
                </div>
                <div class="form-group">
                    <label>Select Package</label>
                    <select id="packageSelect">
                        <option value="Titanic Explorer">The Titanic Explorer</option>
                        <option value="Culture & Craic">Culture & Craic</option>
                        <option value="Coast & City">Coast & City</option>
                    </select>
                </div>
                <button type="submit" class="btn-primary" style="width:100%; padding:12px;">Send Request</button>
            </form>
        </div>
    </div>`;

    // Add the modal HTML to the very bottom of the page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Identify the important parts of the modal for the code to use
    const modal = document.getElementById("bookingModal");
    const bookBtn = document.getElementById("cta-btn");
    const closeBtn = document.querySelector(".close-modal");
    const form = document.getElementById('bookingForm');

    // 2. Set up the Open and Close buttons
    if (bookBtn) {
        // Show the modal when the "Book Now" button is clicked
        bookBtn.onclick = () => modal.style.display = "block";
    }

    if (closeBtn) {
        // Hide the modal when the 'X' is clicked
        closeBtn.onclick = () => modal.style.display = "none";
    }

    // Hide the modal if the user clicks the dark area outside of the white box
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
    };

    // 3. Handle what happens when the "Send Request" button is clicked
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop the website from refreshing after clicking submit
        
        // Collect all the information entered into the form
        const bookingResults = {
            customerName: document.getElementById('fullName').value,
            customerEmail: document.getElementById('email').value,
            selectedPackage: document.getElementById('packageSelect').value,
            timestamp: new Date().toLocaleString() // Adds the date and time of the booking
        };

        // Display the collected information in the Browser Console (F12)
        console.log("New Booking Received");
        console.table(bookingResults); // Shows the data as a nice table in the log
        
        // Show a popup message to tell the user it worked
        alert("Success! The booking data has been logged to the console.");
        
        // Clear the form fields and hide the modal
        form.reset();
        modal.style.display = "none";
    });
});