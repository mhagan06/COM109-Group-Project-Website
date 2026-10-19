// 1. Create a list of all the pages on the website
    const pages = [
        { name: "Home", url: "Home.html" },
        { name: "History", url: "History.html" },
        { name: "Attractions", url: "Attractions.html" },
        { name: "Travelling to Belfast", url: "Travel.html" },
        { name: "Packages", url: "Packages.html" }
    ];

// Function to open Google Maps for a specific location
function openMap(locationName) {
    // Convert the name into a format that web links can understand
    const encodedLocation = encodeURIComponent(locationName + ", Belfast");
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    
    // Open the map link in a new browser tab
    window.open(mapUrl, '_blank');
}

// Wait for the page to finish loading before running the code
$(document).ready(function() {
    // When the 'Market Guide' button is clicked, open the official website
    $(".btn-primary:contains('Market Guide')").on('click', function() {
        window.open('https://visitbelfast.com/listing/st-george%E2%80%99s-market/97555101/', '_blank');
    });
});

$(document).ready(function() {
    // When the 'Trail Map' button is clicked, open the park website
    $(".btn-primary:contains('Trail Map')").on('click', function() {
        window.open('https://visitbelfast.com/listing/cave-hill-country-park/97346101/', '_blank');
    });
});

    // Select the search input field and the suggestion box
    const $searchInput = $('#headerSearch');
    const $suggestionsBox = $('#searchSuggestions');

    // Run this code whenever the user types in the search bar
    $searchInput.on('input', function() {
        // Get the text the user typed and make it lowercase
        const value = $(this).val().toLowerCase().trim();
        $suggestionsBox.empty(); // Clear old suggestions

        // If the user has typed at least one letter
        if (value.length > 0) {
            // Find pages that match the typed text
            const matches = pages.filter(page => page.name.toLowerCase().includes(value));

            // If a match is found, show the suggestion box
            if (matches.length > 0) {
                $suggestionsBox.show();
                matches.forEach(match => {
                    // Create a clickable item for each matching page
                    const $div = $('<div class="suggestion-item"></div>').text(match.name);
                    $div.on('click', function() {
                        window.location.href = match.url; // Go to the page when clicked
                    });
                    $suggestionsBox.append($div);
                });
            } else {
                $suggestionsBox.hide(); // Hide box if nothing matches
            }
        } else {
            $suggestionsBox.hide(); // Hide box if the search bar is empty
        }
    });

    // Function to go to a page when the user hits 'Enter' or clicks 'Go'
    function performSearch() {
        const input = $searchInput.val().toLowerCase().trim();
        const match = pages.find(p => p.name.toLowerCase().includes(input));
        
        if (match) {
            window.location.href = match.url; // Send the user to the matching page
        } else if (input !== "") {
            alert("No matching page found. Try 'History' or 'Packages'!");
        }
    }

    // Check if the user pressed the 'Enter' key inside the search bar
    $searchInput.on('keydown', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    // Close the search suggestions if the user clicks anywhere else on the screen
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.search-box').length) {
            $suggestionsBox.hide();
        }
    });