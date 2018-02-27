$(document).ready(function(){
    var borderButtons = ["Charlie Chaplin", "Buster Keaton", "Greta Garbo", "Harold Lloyd", "Max Linder", "Douglas Fairbanks" , "Lillian Gish"];
    var par = $("<p>");
    var div = $("<div>");
    var queryURL = "https://api.giphy.com/v1/gifs/search?apikey=KEisq4X4yK4PbMGynfJOqzvFkjVTYKtY&q="

    for (i = 0; i < borderButtons.length; i++){
        var buttonDisplay = $(".button_bar");
        var btn = $("<button>");
        btn.append(borderButtons[i]);
        btn.attr("button-name", borderButtons[i]);
        buttonDisplay.append(btn);

    }

    $("button").on("click", function(){
        var buttonText = $(this).attr("button-name");
        $.ajax({
        url: queryURL + buttonText,
        method: "GET"
      }).then(function(response) {
        var results = response.data;
        console.log(response);   

        for (i = 0; i < 10; i++) {
            if (results.rating != "r"){
                var gifDiv = $(`<div class="image_divs">`)
                var imageUrl = results[i].images.fixed_height.url;
                var rating = results[i].rating;
                var rating2 = rating.toUpperCase();
                var title = results[i].title;
                var image = $("<img>");
                var p = $("<p>").text("Rating: " + rating2);
                var p2 = $("<p>").text("Rating: " + title);

                image.attr("src", imageUrl);
                image.attr("alt", buttonText + " Image");

                gifDiv.append(image);
                gifDiv.append(p);
                gifDiv.append(p2);

                $(".display_area").prepend(gifDiv);
            }
        }

      });
    })
})