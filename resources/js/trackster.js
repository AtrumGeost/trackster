$(document).ready(function(){
  console.log( "ready!" );

  $("#search-input").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#search-button").click();
    }
  });


  $("#search-button").click(function(){
    var searchInput = $("#search-input").val();
    console.log(searchInput);
    Trackster.searchTracksByTitle(searchInput);
  });
});

var API_KEY = '9b49f28267ac7323e9f803308948933b';
var ROOT_URL = 'http://ws.audioscrobbler.com/2.0/'

var Trackster = {};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $("#tracks-container").empty();
  for (var i = 0; i < tracks.length; i++) {
    var num = i + 1;
    var tracksHtml ='<div class="row tracks">'+
      '<div class="col-1 track d-flex justify-content-between">'+
        '<a href="'+ tracks[i].url +'"><i class="fa fa-play-circle-o" aria-hidden="true"></i></a>'+
        '<span>'+num+'</span>'+
      '</div>'+
      '<div class="col-3 track">'+
        tracks[i].name+
      '</div>'+
      '<div class="col-2 track">'+
        tracks[i].artist+
      '</div>'+
      '<div class="col-2 track">'+
        '<img src="'+tracks[i].image[1]["#text"]+'" alt="'+tracks.name+'">'+
      '</div>'+
      '<div class="col-2 track">'+
        numeral(tracks[i].listeners).format('0,0');+
      '</div>'+
    '</div>';
    $("#tracks-container").append(tracksHtml);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: ROOT_URL + '?method=track.search&track='+ title +'&api_key=' + API_KEY + '&format=json',
    success: function(data){
      console.log(data.results.trackmatches.track);
      // console.log(data.results.trackmatches.track.length);
      Trackster.renderTracks(data.results.trackmatches.track);
    }
  });
};


// Application name	codecademy-trackster
// API key	9b49f28267ac7323e9f803308948933b
// Shared secret	bda93c8ebfe394f27193047fdf2f8663
// Registered to	GE0ST
