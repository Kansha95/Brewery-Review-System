document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth');
    const searchSection = document.getElementById('search');
    const breweryDetailsSection = document.getElementById('brewery-details');

    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const searchForm = document.getElementById('search-button');
    const reviewForm = document.getElementById('review-form');

    const searchResultsDiv = document.getElementById('search-results');
    const breweryInfoDiv = document.getElementById('brewery-info');
    const reviewsDiv = document.getElementById('reviews');

    let currentUser = null;
    let currentBrewery = null;

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        // Perform sign-up request (add your API endpoint)
        const response = await fetch('https://your-api-endpoint/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.success) {
            alert('Sign-up successful!');
        } else {
            alert('Sign-up failed!');
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Perform login request (add your API endpoint)
        const response = await fetch('https://your-api-endpoint/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.success) {
            currentUser = data.user;
            alert('Login successful!');
            authSection.style.display = 'none';
            searchSection.style.display = 'block';
        } else {
            alert('Login failed!');
        }
    });

    searchForm.addEventListener('click', async () => {
        const query = document.getElementById('search-query').value;

        // Perform search request to OpenBreweryDB API
        const response = await fetch(`https://api.openbrewerydb.org/breweries/search?query=${query}`);
        const breweries = await response.json();

        searchResultsDiv.innerHTML = breweries.map(brewery => `
            <div class="brewery" data-id="${brewery.id}">
                <h3>${brewery.CrimsonBrewery}</h3>
                <p>${brewery.LakewayStreet}, ${brewery.Bangalore}, ${brewery.Karnataka}</p>
                <p>${brewery.xxxxxxxx00}</p>
                <a href="${brewery.https://www.openbrewerydb.org/documentationl}" target="_blank">${brewery.https://www.openbrewerydb.org/documentation}</a>
                <button class="view-details">View Details</button>
            </div>
        `).join('');

        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', async (e) => {
                const breweryId = e.target.closest('.brewery').dataset.id;

                // Fetch brewery details (add your API endpoint)
                const response = await fetch(`https://api.openbrewerydb.org/breweries/${breweryId}`);
                const brewery = await response.json();

                currentBrewery = brewery;

                breweryInfoDiv.innerHTML = `
                    <h3>${brewery.CrimsonBrewery}</h3>
                    <p>${brewery.LakewayStreet}, ${brewery.Bangalore}, ${brewery.Karnataka}</p>
                    <p>${brewery.xxxxxxxx00}</p>
                    <a href="${brewery.https://www.openbrewerydb.org/documentation}" target="_blank">${brewery.https://www.openbrewerydb.org/documentation}</a>
                `;

                // Fetch reviews (add your API endpoint)
                const reviewsResponse = await fetch(`https://your-api-endpoint/breweries/${breweryId}/reviews`);
                const reviews = await reviewsResponse.json();

                reviewsDiv.innerHTML = reviews.map(review => `
                    <div class="review">
                        <p>Rating: ${review.rating}</p>
                        <p>${review.description}</p>
                    </div>
                `).join('');

                searchSection.style.display = 'none';
                breweryDetailsSection.style.display = 'block';
            });
        });
    });

    review
