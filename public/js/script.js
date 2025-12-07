$('#weather_form').submit(function(e) {
    e.preventDefault();
    
    var city = $('input[name="city"]').val();

    if(city === '') {
        alert('Please enter a city name.');
        return;
    }
    var submitButton = $('#check_weather');
    submitButton.prop('disabled', true);
    $('.weather_span').text('Checking...');

    $.ajax({
        type: 'POST',
        url: '/check',
        data: { city: city },
        success: function(data) {
            console.log(data);
            $('.weather_result').empty();
            if (data.length === 0) {
                $('.weather_result').append('<p>No weather data available for today.</p>');
            } else {
                data.forEach(function(entry) {
                    var weatherInfo = '<div class="weather_entry">' +
                        '<h4 class="mb-1 sfw-normal"><strong>' + city + '</strong></h4>' +
                        '<h5>Time: ' + entry.dt_txt + '</h5>' +
                        '<p>Temperature: <strong>' + entry.main.temp + '°C</strong></p>' +
                        '<p>Feels like: <strong>' + entry.main.feels_like + '°C</strong></p>' +  
                        '<p>Humidity: <strong>' + entry.main.humidity + '%</strong></p>' +
                        '<p>Chance of Rain: <strong>' + (entry.pop * 100) + '%</strong></p>' +
                        '<div class="d-flex flex-row align-items-center">' +
                            '<p class="mb-0 me-4">Weather: ' + entry.weather[0].description + '</p>' +
                            '<i class="fas fa-cloud fa-3x" style="color: #eee;"></i>' +
                        '</div>'
                        '<hr></div>';
                    $('.weather_result').append(weatherInfo);
                });
            }

            submitButton.prop('disabled', false);
            $('.weather_span').text('Check!');
        },
        error: function(err) {
            var error = JSON.parse(err.responseText);
            alert('Error fetching weather data: ' + error.error);

            submitButton.prop('disabled', false);
            $('.weather_span').text('Check!');
        }
    });
});
