$(document).ready(function() {
  var borderButtons = [
    "Charlie Chaplin",
    "Buster Keaton",
    "Greta Garbo",
    "Max Linder",
    "Douglas Fairbanks",
    "Lillian Gish",
  ];
  var par = $("<p>");
  var div = $("<div>");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?apikey=KEisq4X4yK4PbMGynfJOqzvFkjVTYKtY&q=";
  var imageUrl = "";
  var gifUrl = "";

  createButtons();

  $(".add_button").on("click", function() {
    var userInput = $(".user_field_form")
      .val()
      .trim();
    borderButtons.push(userInput);
    createButtons();
    console.log(borderButtons);
    $(".user_field_form").val("");
  });

  function createButtons() {
    $(".button_bar").empty();

    for (i = 0; i < borderButtons.length; i++) {
      var buttonDisplay = $(".button_bar");
      var btn = $("<button>");
      btn.addClass("star_button");
      btn.append(borderButtons[i]);
      btn.attr("button-name", borderButtons[i]);
      buttonDisplay.append(btn);
    }
    getGifs();
  }

  function getGifs() {
    $(".star_button").on("click", function() {
      buttonText = $(this).attr("button-name");
      console.log(buttonText);
      $.ajax({
        url: queryURL + buttonText,
        method: "GET",
      }).then(function(response) {
        var results = response.data;
        console.log(response);

        for (i = 0; i < 10; i++) {
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

          if (results[i].rating !== "r") {
            var gifDiv = $(`<div class="image_divs">`);
            var imageUrl = results[i].images.fixed_height_still.url;
            var gifUrl = results[i].images.fixed_height.url;
            var rating = results[i].rating;
            var rating2 = rating.toUpperCase();
            var title = results[i].title;
            var image = $("<img>");
            var p = $("<p>").text("Rating: " + rating2);

            image.attr("src", imageUrl);
            image.attr("alt", buttonText + " Image");
            image.attr("state", "still");
            image.attr("gif_still", imageUrl);
            image.attr("gif_animated", gifUrl);
            image.addClass("gifImage");

            gifDiv.append(image);
            gifDiv.append(p);

            $(".display_area").prepend(gifDiv);
          }

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
