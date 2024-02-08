window.addEventListener('load', () => {
    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = 'YOUR_API_KEY';
    const lat = 43.25 //your latitude and longitude should be put here for accurate location data
    const lon = -79.84
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Function to fetch weather data from the API
    const fetchWeatherData = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    // Function to handle different weather conditions
    const handleWeatherConditions = (weather) => {
        switch (weather) {
            case 'Clear':
                sunny();
                break;
            case 'Clouds':
                cloudy();
                break;
            case 'Rain':
                rain();
                break;
            case 'Snow':
                snow();
                break;
            case 'Fog':
                fog();
                break;
            case 'Windy':
                windy();
                break;
            default:
                unknownWeather(weather);
        }
    };

    // Methods for different weather conditions
    const sunny = () => {
        document.getElementById('weather-info').textContent = 'It\'s sunny!';
        document.body.classList.add('sunny');
    };

    const cloudy = () => {
        document.getElementById('weather-info').textContent = 'It\'s cloudy!';
        document.body.classList.add('cloudy'); // Add cloudy class
    };

    const rain = () => {
        document.getElementById('weather-info').textContent = 'It\'s raining!';
        document.body.classList.add('rainy');
        createRaindrops();
    };

    const snow = () => {
        document.getElementById('weather-info').textContent = 'It\'s snowing!';
        document.body.classList.add('snowy');
        createSnowflakes();
    };

    const fog = () => {
        document.getElementById('weather-info').textContent = 'It\'s foggy!';
        document.body.classList.add('foggy'); // Add fog class
    };

    const windy = () => {
        document.getElementById('weather-info').textContent = 'It\'s windy!';
        windEffect();
    };

    function unknownWeather(weather) {
        document.getElementById('weather-info').textContent = `It\'s ${weather}!`;
    }

    // Fetch weather data and handle it
    fetchWeatherData().then(data => {
        const weather = data.weather[0].main;
        console.log(weather);
        handleWeatherConditions(weather);
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
    var elements = document.querySelectorAll('.wind-effected'); // Select text elements affected by wind

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