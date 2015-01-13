
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

    var street = $("#street").val();
    var city = $("#city").val();
    var address = street + ', ' + city;

    $greeting.text('So you want to live at ' + address + '?');

    var streetviewURL = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';

    $body.append('<img class="bgimg" src="'+ streetviewURL +'">');

    var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+address+'&api-key=8a2fe5748459a8fc8770f6b2d5c4a261:17:70571703';

$.getJSON(nytURL, function(data){

    $nytHeaderElem.text('New York Times articles about ' + address);
    articles = data.response.docs;
    for(item in articles){
        var article = articles[item];
        $nytElem.append('<li id="article">' +
        '<a href=' + article.web_url +'">' + article.headline.main + '</a>' +
        '<p>' + article.snippet + '</p>' +
        '</li>');
    }
    
    }).error(function (e) {
        $nytHeaderElem.text('New York Times articles could not be loaded');
    });


    var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");}, 8000);

    $.ajax({
        url: wikiURL, 
        dataType: "jsonp", 
        success: function(response){
            for(result in response[1]){

                $wikiElem.append('<li> <a href="http://en.wikipedia.org/wiki/' + response[1][result] +'">' + response[1][result] + '</a></li>');


            };   

            clearTimeout(wikiRequestTimeout);
        }

    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
