$(document).ready(function() {
  // initial topics array
  var topics = [
    "skiing",
    "camping",
    "infomercials",
    "charlie day",
    "way too much coffee"
  ];
  // function that creates buttons from topics array and appends them to the top of the page
  var createButtons = function() {
    for (var i = 0; i < topics.length; i++) {
      var newButton = $("<button>");
      newButton.addClass("button m-2 p-2");
      newButton.attr("data-name", topics[i]);
      newButton.text(topics[i]);
      $("#buttons-go-here").append(newButton);
    }
  };
  // when the submit button is clicked whatever text is in the input html element is used to create and append a new button to the page
  $(document).on("click", ".input-button", function() {
    var inputHTML = document.getElementById("input").value;
    var newButton = $("<button>");
    newButton.addClass("button m-2 p-2");
    newButton.attr("data-name", inputHTML);
    newButton.text(inputHTML);
    $("#buttons-go-here").append(newButton);
  });
  // whenever a topic button is pressed the text is used in the chosen topic variable to get 10 gifs from giphyAPI using a for loop.
  // the gifs will be loaded as still pictures by changing the end of the url to include "_s.gif" for still.
  // an class="select-image" will be included for each image (line 42) and this class will be used for the lowest click event to animate/stop gifs
  // below each gif the gif rating, title, and link to the gifs giphy page will be included
  $(document).on("click", ".button", function() {
    $(".hide-body").show(); //shows background div for gifs
    $(".gifs").remove();
    var chosenTopic = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      chosenTopic +
      "&api_key=iGbM0lVfCEofqDLKmiCe3mVshNrH1Ldo&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        // variables to be prepended below
        var gifDiv = $("<div class='gifs'>");
        var rating = $("<p class='m-2'>").text("Rating: " + results[i].rating);
        var title = $("<p class='m-2'>").text("Tite: " + results[i].title);
        var url = $("<a href=" + results[i].url + " class='m-2'>").text(
          "Link to Giphy"
        );
        var chosenImage = $(
          "<img data-state='static' class='select-image m-2'>"
        );
        // convert url to static url
        var staticUrl = results[i].images.fixed_height.url;
        staticUrl = staticUrl.slice(0, staticUrl.length - 4);
        staticUrl += "_s.gif";
        chosenImage.attr("src", staticUrl);
        // prepend before looping to the image
        gifDiv.prepend(url);
        gifDiv.prepend(rating);
        gifDiv.prepend(title);
        gifDiv.prepend(chosenImage);
        $("#gifs-go-here").prepend(gifDiv);
      }
    });
  });
  // whenever a gif is clicked its url if changed to animate or stop the gif
  $(document).on("click", ".select-image", function() {
    var currentUrl = $(this).attr("src");
    var state = $(this).attr("data-state");
    if (state === "static") {
      var animateUrl = currentUrl.slice(0, currentUrl.length - 6);
      animateUrl += ".gif";
      $(this).attr("src", animateUrl);
      $(this).attr("data-state", "animate");
      return;
    }
    if (state === "animate") {
      var staticUrl = currentUrl.slice(0, currentUrl.length - 4);
      staticUrl += "_s.gif";
      $(this).attr("src", staticUrl);
      $(this).attr("data-state", "static");
      return;
    }
  });
  // loads initial buttons from array
  createButtons();
  // hides background div for gifs on load
  $(".hide-body").hide();
});