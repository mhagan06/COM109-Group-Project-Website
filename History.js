$(document).ready(function() {
    // 1. List all the pages for the search system
    const pages = [
        { name: "Home", url: "Home.html" },
        { name: "History", url: "History.html" },
        { name: "Attractions", url: "Attractions.html" },
        { name: "Travelling to Belfast", url: "Travel.html" },
        { name: "Packages", url: "Packages.html" }
    ];
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

    // Select the popup modal elements using jQuery
    const $modalOverlay = $('#modalOverlay');
    const $modalTitle = $('#modalTitle');
    const $modalText = $('#modalText');
    const $modalClose = $('#modalClose');

    // Check if the modal exists on the page before setting up the code
    if ($modalOverlay.length && $modalTitle.length && $modalText.length && $modalClose.length) {
      
      // Function to hide the popup and re-enable scrolling on the main page
      function closeModal() {
        $modalOverlay.removeClass('active');
        $('body').css('overflow', '');
      }

      // Close the popup when clicking the 'X', clicking outside the box, or pressing 'Esc'
      $modalClose.on('click', closeModal);
      $modalOverlay.on('click', function (e) {
        if (e.target === this) closeModal();
      });
      $(document).on('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
      });
    } else {
      // If elements are missing, show a warning in the browser log
      console.warn('History modal elements not found — modal behaviour disabled.');
    }

    // --- Animated Number Counter ---
    // This makes numbers count up from 0 to a target number
    function animateCounter($el) {
      const target = parseInt($el.attr('data-target'), 10) || 0; // Get the goal number
      const duration = 1800; // Total time for the animation in milliseconds
      const stepTime = 16;   // How often the number updates
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          $el.text(target.toLocaleString()); // Finish at the exact goal number
          clearInterval(timer);
        } else {
          $el.text(Math.floor(current).toLocaleString()); // Update the text with the current count
        }
      }, stepTime);
    }

    // Use a 'Sensor' to start counting only when the user scrolls to the numbers
    const $counters = $('.fact-number');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // If the number is visible on screen and hasn't animated yet, start it
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCounter($(entry.target));
        }
      });
    }, { threshold: 0.5 });

    // Tell the sensor to watch each fact number
    $counters.each((i, el) => counterObserver.observe(el));

    // --- Scroll Reveal for Timeline Items ---
    // This makes the history timeline items slide in as you scroll down
    const $timelineItems = $('.timeline-item');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Slide the item into its final position and make it solid
          $(entry.target).css({ opacity: '1', transform: 'translateX(0)' });
        }
      });
    }, { threshold: 0.2 });

    $timelineItems.each((i, item) => {
      // Set the items to be invisible and moved slightly to the side initially
      $(item).css({ opacity: '0', transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s` });
      
      // Even items slide from the left, odd items slide from the right
      if (i % 2 === 0) {
        $(item).css('transform', 'translateX(-30px)');
      } else {
        $(item).css('transform', 'translateX(30px)');
      }
      // Tell the sensor to watch each timeline item
      revealObserver.observe(item);
    });

    // --- Navbar scroll shadow ---
    // Make the navigation bar shadow deeper when the user scrolls down
    const $navbar = $('.navbar');
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > 50) {
        $navbar.css('box-shadow', '0 4px 20px rgba(0,0,0,0.4)');
      } else {
        $navbar.css('box-shadow', '0 2px 10px rgba(0,0,0,0.3)');
      }
    })
});
