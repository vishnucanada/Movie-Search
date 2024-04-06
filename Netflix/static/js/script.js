$(document).ready(function() {
    $('#search-button').click(function() {
        var searchQuery = $('#search-input').val();

        
        $.ajax({
            type: 'POST',
            url: '/search',
            data: {search_query: searchQuery},
            success: function(response) {
                displaySearchResults(response);
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
        $("#search-container").addClass("searched");
    });

    function displaySearchResults(data) {
        console.log(data); // Log the data to inspect it
        
        var searchResultsDiv = $('#search-results');
        searchResultsDiv.empty(); // Clear the search results div
            
            // Check if the 'Search' property exists and it is an array
            if (data && Array.isArray(data.Search)) {
                // Loop through each movie in the 'Search' array
                data.Search.forEach(function(movie) {
                    var movieDiv = $('<div class="movie"></div>'); // Create a div for the movie
                    
                    var posterImg = $('<img>').attr('src', movie.Poster); // Create an img tag for the movie poster
                    posterImg.css({
                        'width': '100%',
                        'height': 'auto'
                    });

                    movieDiv.append(posterImg); // Append the poster to the movie div
                    
                    var movieInfoDiv = $('<div class="movie-info"></div>'); // Create a div for the movie info
                    movieInfoDiv.css({
                        'padding': '10px',
                        'background-color': '#f9f9f9'
                    });
                    movieInfoDiv.append('<h2>' + movie.Title + '</h2>'); // Append the movie title
                    movieInfoDiv.append('<p>Year: ' + movie.Year + '</p>'); // Append the movie year
                    
                    movieDiv.append(movieInfoDiv); // Append the movie info to the movie div
                    searchResultsDiv.append(movieDiv); // Append the movie div to the search results div
                });
            } else {
                console.error('Data does not contain the expected structure:', data); // Log an error message if the data structure is unexpected
            }
        }

});