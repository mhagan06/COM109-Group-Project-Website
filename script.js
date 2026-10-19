$(document).ready(function() {
    // 1. Create a list of all website pages for the search feature
    const pages = [
        { name: "Home", url: "Home.html" },
        { name: "History", url: "History.html" },
        { name: "Attractions", url: "Attractions.html" },
        { name: "Travelling to Belfast", url: "Travel.html" },
        { name: "Packages", url: "Packages.html" }
    ];

    // 2. Smooth scrolling: When clicking a link that starts with '#', glide to that section
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault(); // Stop the page from jumping instantly
        const target = $(this.getAttribute('href')); // Find the section the link points to
        if (target.length) {
            $('html, body').stop().animate({
                // Scroll down to the section, but stop 80 pixels above it (for the header)
                scrollTop: target.offset().top - 80 
            }, 800); // The scroll animation lasts 800 milliseconds
        }
    });

    // 3. Image Rotator (Hero Slider)
    let currentSlide = 0;
    const slides = $('.hero-slide');

    // Function to hide the current image and show the next one
    function nextSlide() {
        // Fade out the current slide
        slides.eq(currentSlide).removeClass('active').fadeOut(1000);
        // Move to the next index, or back to 0 if at the end of the list
        currentSlide = (currentSlide + 1) % slides.length;
        // Fade in the new slide
        slides.eq(currentSlide).addClass('active').fadeIn(1000);
    }
    // Switch images automatically every 5 seconds
    setInterval(nextSlide, 5000);

    // 4. Live Search Suggestions
    const $searchInput = $('#headerSearch');
    const $suggestionsBox = $('#searchSuggestions');

    // Run this whenever the user types into the search bar
    $searchInput.on('input', function() {
        const value = $(this).val().toLowerCase().trim();
        $suggestionsBox.empty(); // Clear the old list of suggestions

        if (value.length > 0) {
            // Check which page names contain the letters typed by the user
            const matches = pages.filter(page => page.name.toLowerCase().includes(value));

            if (matches.length > 0) {
                $suggestionsBox.show(); // Show the suggestion box
                matches.forEach(match => {
                    // Create a clickable row for each match
                    const $div = $('<div class="suggestion-item"></div>').text(match.name);
                    $div.on('click', function() {
                        window.location.href = match.url; // Go to the page when clicked
                    });
                    $suggestionsBox.append($div);
                });
            } else {
                $suggestionsBox.hide(); // Hide if no pages match
            }
        } else {
            $suggestionsBox.hide(); // Hide if the search bar is empty
        }
    });

    // 5. Execute Search (Go to the page when Enter is pressed)
    function performSearch() {
        const input = $searchInput.val().toLowerCase().trim();
        const match = pages.find(p => p.name.toLowerCase().includes(input));
        
        if (match) {
            window.location.href = match.url; // Navigate to the matching page
        } else if (input !== "") {
            // Alert the user if they typed something that doesn't exist
            alert("No matching page found. Try 'History' or 'Packages'!");
        }
    }

    // Trigger the search function if the 'Enter' key is pressed
    $searchInput.on('keydown', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    // Close the search results box if the user clicks anywhere else on the screen
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.search-box').length) {
            $suggestionsBox.hide();
        }
    });
});