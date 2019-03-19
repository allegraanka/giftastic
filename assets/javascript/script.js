
var apiKey = "GNW0OTze5X76HoWwOEzwwekxD5gFgsEB";
var baseUrl = "http://api.giphy.com/v1/gifs/search";

var topics = ["oops", "dancing", "party", "coffee"];

function getGifs() {
    var gifTopic = $(this).attr("data-name");
    var queryUrl = `${baseUrl}?q=${gifTopic}&api_key=${apiKey}&limit=10`;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var gifs = response.data;
        gifs.forEach(function (gif) {
            var gifContainer = $("<div class='gif-container'>");
            var gifStillUrl = gif.images.original_still.url;
            var gifAnimateUrl = gif.images.original.url;
            var title = gif.title;
            var rating = gif.rating;
            var gifHolder = $("<img>").attr({
                "src": gifStillUrl,
                "class": "gif",
                "data-still": gifStillUrl,
                "data-animate": gifAnimateUrl,
                "data-state": "still"
            });
            var titleHolder = $("<p>").text(`Title: ${title}`);
            var ratingHolder = $("<p>").text(`Rating: ${rating}`);
            gifContainer.append(gifHolder);
            gifContainer.append(titleHolder);
            gifContainer.append(ratingHolder);
            $("#gif-view").prepend(gifContainer);
        });
    });
};

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

function renderButtons() {
    $("#button-list").empty();                 
    createButtons();
};

$("#add-topic").on("click", function(event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    renderButtons();
});

renderButtons();

function createButtons() {
    topics.forEach(function(element) {        
        var button = $("<button>");           
        button.addClass("topic");            
        button.attr("data-name", element);    
        button.text(element);                 
        $("#button-list").append(button);
    });
};

$(document).on("click", ".topic", getGifs);