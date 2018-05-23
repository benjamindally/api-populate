$(document).ready(function() {
  //add pre-existing buttons with which to query api
  var borderButtons = [
    "Charlie Chaplin",
    "Buster Keaton",
    "Greta Garbo",
    "Max Linder",
    "Douglas Fairbanks",
    "Lillian Gish",
  ];
  //set some html into easy to use variables
  var par = $("<p>");
  var div = $("<div>");
  //use this api url
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?apikey=KEisq4X4yK4PbMGynfJOqzvFkjVTYKtY&q=";
  var imageUrl = ""; //blank to be used later
  var gifUrl = ""; //blank to be used later

  //runs the function that creates new buttons based on user input
  createButtons();

  //on click event that will get the user input and then add that to a new button
  $(".add_button").on("click", function(event) {
    event.preventDefault();
    var userInput = $(".user_field_form")
      .val()
      .trim();
    borderButtons.push(userInput); //pushes the user input into the borderButons array
    createButtons();
    //resets the form field to blank
    $(".user_field_form").val("");
  });

  //the function that will create new buttons
  function createButtons() {
    //empties the button bar so it can be refilled as needed
    $(".button_bar").empty();

    //loop through the borderbuttons array above to add the buttons to the page
    for (i = 0; i < borderButtons.length; i++) {
      var buttonDisplay = $(".button_bar");
      var btn = $("<button>");
      btn.addClass("star_button");
      btn.append(borderButtons[i]);
      btn.attr("button-name", borderButtons[i]);
      buttonDisplay.append(btn);
    }
    getGifs(); //trigger the get gifs function
  }

  function getGifs() {
    //triggerst the finding of the gifs when the user clicks on one of the buttons
    $(".star_button").on("click", function() {
      buttonText = $(this).attr("button-name"); //gets the name from the button
      //runs the ajax call to the api
      $.ajax({
        url: queryURL + buttonText,
        method: "GET",
      }).then(function(response) {
        var results = response.data;

        //limits the number of gifs found to 10 and makes them still images
        for (i = 0; i < 10; i++) {
          $(".gifImage").on("click", function() {
            var state = $(this).attr("state");

            //toggles between still and moving
            if (state === "still") {
              $(this).attr("src", $(this).attr("gif_animated"));
              $(this).attr("state", "animated");
            } else if (state === "animated") {
              $(this).attr("src", $(this).attr("gif_still"));
              $(this).attr("state", "still");
            }
          });

          //does not display if it is rated 'r'
          if (results[i].rating !== "r") {
            //get the information from the api and sets it to variables
            var gifDiv = $(`<div class="image_divs">`);
            var imageUrl = results[i].images.fixed_height_still.url;
            var gifUrl = results[i].images.fixed_height.url;
            var rating = results[i].rating;
            var rating2 = rating.toUpperCase();
            var title = results[i].title;
            var image = $("<img>");
            var p = $("<p>").text("Rating: " + rating2);

            //this sets the image, alternative text, state, and gif url to the image found from the api call
            image.attr("src", imageUrl);
            image.attr("alt", buttonText + " Image");
            image.attr("state", "still");
            image.attr("gif_still", imageUrl);
            image.attr("gif_animated", gifUrl);
            image.addClass("gifImage");

            //this appends the image created
            gifDiv.append(image);
            gifDiv.append(p);

            $(".display_area").prepend(gifDiv);
          }

          //this toggles between still frame or moving gif
          $(".gifImage").on("click", function() {
            var state = $(this).attr("state");

            if (state === "still") {
              $(this).attr("src", $(this).attr("gif_animated"));
              $(this).attr("state", "animated");
            } else if (state === "animated") {
              $(this).attr("src", $(this).attr("gif_still"));
              $(this).attr("state", "still");
            }
          });
        }
      });
    });
  }
});
