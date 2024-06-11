window.addEventListener('load', () => {
    // Function to fetch weather data from the API
    const fetchWeatherData = async (lat, lon) => {
        const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    let lastClass = '';

    const setBodyClass = (newClass) => {
        if (lastClass) {
            document.body.classList.remove(lastClass);
        }
        document.body.classList.add(newClass);
        lastClass = newClass;
    };

    // Function to handle different weather conditions
    const handleWeatherConditions = (weather) => {
        const weatherLower = weather.toLowerCase(); // Convert to lowercase
        if (weatherLower.includes('rain')) {
            setBodyClass('rainy');
            rain();
        } else {
            switch (weatherLower) {
                case 'clear':
                    setBodyClass('clear');
                    clear();
                    break;
                case 'clouds':
                case 'cloudy':
                    setBodyClass('cloudy');
                    cloudy();
                    break;
                case 'snow':
                    setBodyClass('snowy');
                    snow();
                    break;
                case 'fog':
                    setBodyClass('foggy');
                    fog();
                    break;
                case 'windy':
                    setBodyClass('windy');
                    windy();
                    break;
                default:
                    unknownWeather(weather);
            }
        }
    };

    // Methods for different weather conditions
    const clear = () => {
        document.getElementById('weather-info').textContent = 'It\'s clear!';
    };

    const cloudy = () => {
        document.getElementById('weather-info').textContent = 'It\'s cloudy!';
    };

    const rain = () => {
        document.getElementById('weather-info').textContent = 'It\'s raining!';
        createRaindrops();
    };

    const snow = () => {
        document.getElementById('weather-info').textContent = 'It\'s snowing!';
        createSnowflakes();
    };

    const fog = () => {
        document.getElementById('weather-info').textContent = 'It\'s foggy!';
    };

    const windy = () => {
        document.getElementById('weather-info').textContent = 'It\'s windy!';
        windEffect();
    };

    function unknownWeather(weather) {
        document.getElementById('weather-info').textContent = `It's ${weather}!`;
    }

    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Fetch weather data and handle it
            fetchWeatherData(lat, lon).then(data => {
                const weather = data.weather[0].main;
                console.log(weather);
                document.getElementById('weather-input').value = weather; // Set default value in textbox
                handleWeatherConditions(weather);
            });
        }, error => {
            console.error('Error getting location:', error);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
        const lat = 43.25 //default values
        const lon = -79.84
    }

    document.getElementById('update-weather-btn').addEventListener('click', () => {
        const userWeather = document.getElementById('weather-input').value;
        handleWeatherConditions(userWeather);
    });
});

// Create raindrops
function createRaindrops() {
    var rainEffect = document.getElementById("rain-effect");
    var numRaindrops = 400; // Number of raindrops

    var i = 0;

    // Create an interval to add raindrops with a delay
    var interval = setInterval(function() {
        if (i < numRaindrops) {
            var raindrop = document.createElement("div");
            raindrop.classList.add("raindrop");

             // Randomize position within the range from -100 to 100
             var x = Math.random() * 400 - 170; // Random horizontal position (-100 to 100)
             var y = Math.random() * 100 - 70; // Random vertical position (-100 to 100) 

            raindrop.style.left = x + "%";
            raindrop.style.top = y + "%";

            rainEffect.appendChild(raindrop);

            i++; // Increment counter
        } else {
            clearInterval(interval); // Stop the interval once all raindrops are created
        }
    }, 1);
}

// Create snowflakes
function createSnowflakes() {
    var snowEffect = document.getElementById("snow-effect");
    var numSnowflakes = 400; // Number of snowflakes

    var i = 0;

    // Create an interval to add snowflakes with a delay
    var interval = setInterval(function() {
        if (i < numSnowflakes) {
            var snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");

            // Randomize position within the range from -100 to 100
            var x = Math.random() * 300 - 200; // Random horizontal position (-100 to 100)
            var y = Math.random() * 100 - 90; // Random vertical position (-100 to 100)

            snowflake.style.left = x + "%";
            snowflake.style.top = y + "%";

            snowEffect.appendChild(snowflake);

            i++; // Increment counter
        } else {
            clearInterval(interval); // Stop the interval once all snowflakes are created
        }
    }, 1);
}

function windEffect() {
    setInterval(toggleWindEffect, getRandomInterval());
}

function toggleWindEffect() {
    var elements = document.querySelectorAll('.wind-affected'); // Select text elements affected by wind

    // Toggle the shaky class on text elements
    elements.forEach(function(element) {
        element.classList.toggle('windy');
        setTimeout(function() {
            element.classList.toggle('windy');
        }, Math.random()*1000+1000)
    });
}

// Function to get a random interval between 3 and 10 seconds
function getRandomInterval() {
    return Math.floor(Math.random() * (10000 - 3000 + 1) + 3000); // Random interval between 5000 ms (5 seconds) and 10000 ms (10 seconds)
}