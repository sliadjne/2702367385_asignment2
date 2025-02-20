document.addEventListener("DOMContentLoaded", function () {
    const starsContainer = document.getElementById("stars");
    let savedRating = localStorage.getItem("userRating");

    // Create star elements dynamically
    function createStars(rating = 0) {
        starsContainer.innerHTML = ""; // Clear previous stars
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement("span");
            star.textContent = i <= rating ? "★" : "☆"; // Filled or empty star
            star.classList.add("star");
            star.dataset.value = i; // Assign star value
            starsContainer.appendChild(star);
        }
    }

    // Function to save and update rating
    function setRating(rating) {
        localStorage.setItem("userRating", rating);
        createStars(rating); // Refresh stars
    }

    // Event listener for clicking stars
    starsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("star")) {
            const rating = parseInt(e.target.dataset.value);
            setRating(rating);
        }
    });

    // Initialize stars (use saved rating or default 4 stars)
    createStars(savedRating ? parseInt(savedRating) : 4);
});

document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star");
    const ratingMessage = document.getElementById("rating-message");
    const suggestionBox = document.getElementById("suggestion-box");
    const submitButton = document.getElementById("submit-rating");
    const confirmationMessage = document.getElementById("confirmation-message");

    // Load saved rating & suggestion
    let savedRating = localStorage.getItem("userRating");
    let savedSuggestion = localStorage.getItem("userSuggestion");

    if (savedRating) {
        highlightStars(savedRating);
        ratingMessage.textContent = `You rated this ${savedRating} stars!`;
    }

    if (savedSuggestion) {
        suggestionBox.value = savedSuggestion;
    }

    // Star rating click event
    stars.forEach(star => {
        star.addEventListener("click", function () {
            let rating = this.getAttribute("data-value");
            localStorage.setItem("userRating", rating);
            highlightStars(rating);
            ratingMessage.textContent = `You rated this ${rating} stars!`;
        });
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            if (star.getAttribute("data-value") <= rating) {
                star.classList.add("active");
            } else {
                star.classList.remove("active");
            }
        });
    }

    // Submit suggestion
    submitButton.addEventListener("click", function () {
        let suggestion = suggestionBox.value.trim();

        if (suggestion !== "") {
            localStorage.setItem("userSuggestion", suggestion);
            confirmationMessage.textContent = "Thank you for your feedback! 💖";
        } else {
            confirmationMessage.textContent = "Please enter a suggestion!";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sparklesContainer = document.getElementById("sparkles-container");

    function createSparkle() {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");

        // Random position
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;

        // Random size for variety
        const size = Math.random() * 8 + 3; // Between 3px and 11px
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;

        sparklesContainer.appendChild(sparkle);

        // Remove after animation
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }

    // Generate sparkles every 250ms
    setInterval(createSparkle, 250);
});
