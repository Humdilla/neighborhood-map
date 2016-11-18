var app = app || {};

/**
 * @description Callback that initializes the google map.
 */
var initMap = function(){
  app.map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:41.727824, lng:-71.271180},
    zoom: 14
  });
  app.infoWindow = new google.maps.InfoWindow({
    maxWidth: 300
  });
  app.infoWindow.addListener('closeclick', function(){
    app.appViewModel.markers[app.appViewModel.selected()].setAnimation(null);
  });
};