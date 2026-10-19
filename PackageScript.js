// 1. Define the list of website pages for the search system
const pages = [
    { name: "Home", url: "Home.html" },
    { name: "History", url: "History.html" },
    { name: "Attractions", url: "Attractions.html" },
    { name: "Travelling to Belfast", url: "Travel.html" },
    { name: "Packages", url: "Packages.html" }
];

// 2. SEARCH POPUP LOGIC
// Identify the search bar and the box that will hold suggestions
const searchInput = document.getElementById('headerSearch');
const suggestionsBox = document.getElementById('searchSuggestions');

if (searchInput && suggestionsBox) {
    // Run this whenever the user types into the search input
    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase().trim();
        suggestionsBox.innerHTML = ''; // Clear the old list

        if (value.length > 0) {
            // Filter the pages list for names that match what the user typed
            const matches = pages.filter(page => page.name.toLowerCase().includes(value));
            
            if (matches.length > 0) {
                suggestionsBox.style.display = 'block'; // Show the dropdown
                matches.forEach(match => {
                    // Create a clickable div for each matching page
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
            suggestionsBox.style.display = 'none'; // Hide if input is empty
        }
    });

    // Hide the search results if the user clicks anywhere outside the search box
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            suggestionsBox.style.display = 'none';
        }
    });

    // Allow the user to press the 'Enter' key to search
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            executeSearch();
        }
    });
}

// 3. THE SEARCH EXECUTION
// This function navigates the user to the best-matching page
function executeSearch() {
    const input = document.getElementById('headerSearch').value.toLowerCase().trim();
    const match = pages.find(p => p.name.toLowerCase().includes(input));
    
    if (match) {
        window.location.href = match.url;
    } else if (input !== "") {
        // Show an alert if the user typed a page that doesn't exist
        alert("No matching page found. Try 'History' or 'Packages'!");
    }
}

// 4. GALLERY THUMBNAIL LOGIC
// This handles switching the big image when you hover over small dots
document.querySelectorAll('.thumb').forEach(dot => {
    dot.addEventListener('mouseover', function() {
        // Find the main image container inside this specific package
        const mainImg = this.closest('.package-gallery').querySelector('.main-img');
        const newImg = this.style.backgroundImage;
        
        // Swap the main image background to match the hovered thumbnail
        mainImg.style.backgroundImage = newImg;
        
        // Change dot colors so only the active one is yellow
        this.parentElement.querySelectorAll('.thumb').forEach(d => d.style.backgroundColor = '#555');
        this.style.backgroundColor = '#ffb400';
    });
});

// Expansion Logic for "View Details"
// This reveals the extra text inside a card when the button is clicked
document.querySelectorAll('.toggle-details').forEach(button => {
    button.addEventListener('click', function() {
        // Find the hidden text div located just before the button
        const extraDetails = this.previousElementSibling;
        
        // Show or hide the extra details
        extraDetails.classList.toggle('show');
        
        // Change the button text depending on whether it is open or closed
        if (extraDetails.classList.contains('show')) {
            this.textContent = 'Show Less';
        } else {
            this.textContent = 'View Details';
        }
    });
});

/* === Shared page behaviour (Smooth scrolling and Animations) === */

// Smooth scrolling: Glides down the page when clicking links that use '#'
const _anchors = document.querySelectorAll('a[href^="#"]');
if (_anchors.length > 0) {
    _anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = this.getAttribute('href');
            if (target && document.querySelector(target)) {
                e.preventDefault();
                document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Card Reveal: Makes cards fade in as the user scrolls down the page
const _cards = document.querySelectorAll('.card');
if (_cards.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class when the card comes into view
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    _cards.forEach(card => {
        card.classList.add('reveal-hidden'); // Hide them initially
        observer.observe(card); // Tell the sensor to watch this card
    });
}

// Hero image rotator: Automatically switches banner images every 5 seconds
const _slides = document.querySelectorAll('.hero-slide');
if (_slides.length > 0) {
    let _currentSlide = 0;
    function _nextSlide() {
        // Hide current image
        _slides[_currentSlide].classList.remove('active');
        // Go to next image, or back to the first one
        _currentSlide = (_currentSlide + 1) % _slides.length;
        // Show next image
        _slides[_currentSlide].classList.add('active');
    }
    setInterval(_nextSlide, 5000);
}