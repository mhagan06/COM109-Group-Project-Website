// 1. Define the list of website pages for the search system
const pages = [
    { name: "Home", url: "Home.html" },
    { name: "History", url: "history.html" },
    { name: "Attractions", url: "attractions.html" },
    { name: "Travelling to Belfast", url: "Travel.html" },
    { name: "Packages", url: "Packages.html" }
];

// Handle the accordion-style dropdown menus
$(document).ready(function () {
    $(".dropdown-btn").click(function () {
        // Find the specific hidden text belonging to the clicked button
        let content = $(this).next();

        // Close any other open dropdowns before opening this one
        $(".dropdown-content").not(content).slideUp();
        $(".dropdown-btn").not(this).removeClass("active");

        // Open or close the clicked dropdown with a sliding animation
        content.stop(true, true).slideToggle();
        $(this).toggleClass("active");
    });
});

// Add a subtle fading effect when hovering over specific buttons
$("#cta-btn, .buytickets").hover(
    function () {
        // Fade out slightly when the mouse enters
        $(this).stop().animate({ opacity: 0.8 }, 200);
    },
    function () {
        // Fade back to solid when the mouse leaves
        $(this).stop().animate({ opacity: 1 }, 200);
    }
);

// --- Map Reveal System ---
// Select all location maps on the page
const maps = document.querySelectorAll('.map');

  // Create a sensor to check when maps appear on the screen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the map is visible, add the 'show' class to trigger its animation
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.2 // Trigger when at least 20% of the map is visible
  });

  // Tell the sensor to watch every map in the list
  maps.forEach(map => {
    observer.observe(map);
  });

// --- Search System ---
const searchInput = document.getElementById('headerSearch');
const suggestionsBox = document.getElementById('searchSuggestions');

// 2. Run this code whenever the user types in the search bar
searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase().trim();
    suggestionsBox.innerHTML = ''; // Clear out the old suggestion list

    if (value.length > 0) {
        // Filter the pages list for names that match the typed letters
        const matches = pages.filter(page => page.name.toLowerCase().includes(value));

        if (matches.length > 0) {
            suggestionsBox.style.display = 'block'; // Show the suggestion box
            matches.forEach(match => {
                // Create a clickable item for each matching page
                const div = document.createElement('div');
                div.classList.add('suggestion-item');
                div.textContent = match.name;
                div.onclick = () => {
                    window.location.href = match.url; // Go to page on click
                };
                suggestionsBox.appendChild(div);
            });
        } else {
            suggestionsBox.style.display = 'none'; // Hide if no matches
        }
    } else {
        suggestionsBox.style.display = 'none'; // Hide if search bar is empty
    }
});

// 3. Hide the suggestion popup if the user clicks anywhere else
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
        suggestionsBox.style.display = 'none';
    }
});

// Function to find the page and navigate to it
function executeSearch() {
    const input = document.getElementById('headerSearch').value.toLowerCase().trim();
    // Look for an exact match first
    const match = pages.find(p => p.name.toLowerCase() === input);
    
    if (match) {
        window.location.href = match.url;
    } else {
        // If no exact match, look for a partial match (e.g., "hist" finds "History")
        const partialMatch = pages.find(p => p.name.toLowerCase().includes(input));
        if (partialMatch) {
            window.location.href = partialMatch.url;
        } else {
            // Show an alert if the user typed something completely different
            alert("No matching page found. Try 'History' or 'Packages'!");
        }
    }
}

// Allow the user to press 'Enter' on their keyboard to search
document.getElementById('headerSearch').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const input = this.value.toLowerCase().trim();
        
        // Find the page and navigate immediately
        const match = pages.find(p => p.name.toLowerCase() === input);
        
        if (match) {
            window.location.href = match.url;
        } else {
            // Try to find a partial match if they didn't type it perfectly
            const firstMatch = pages.find(p => p.name.toLowerCase().includes(input));
            if (firstMatch) {
                window.location.href = firstMatch.url;
            }
        }
    }
});