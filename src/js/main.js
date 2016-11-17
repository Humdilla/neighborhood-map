var app = app || {};

$(document).ready(function(e){
  // Some stuff we can't do with css
  if(window.innerWidth >= 600)
    app.appViewModel.menuOn();
  else
    app.appViewModel.menuOff();
});

(function(){
  
  //Get current position, along with nearby locations from foursquare
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var date = new Date();
        $.ajax('https://api.foursquare.com/v2/venues/explore?ll='+lat+','+lng+
         '&client_id=FWFDODROAPV4MOMLR21M1JQE3H2C4HTFN0OAQFCNAOJC11OC'+
         '&client_secret=JBJ0MVCMYJ50LMPMRX4RRMFWBLBYQZULSIEADTXFKZ0SZVAR'+
         '&v=20161116'+
         '&m=foursquare'+
         '&radius=3000'+
         '&venuePhotos=1', {
          // Populate venues list and make a map marker for each one
          complete: function(result, status){
            var bounds = new google.maps.LatLngBounds();
            result.responseJSON.response.groups[0].items.forEach(function(item){
              app.appViewModel.filteredVenues.push(item.venue);
              
              item.venue.marker = new google.maps.Marker({
                position: {lat:item.venue.location.lat, lng:item.venue.location.lng},
                map: app.map
              });
              
              // listen for click on a marker to select that venue
              item.venue.marker.addListener('click', (function(venue){
                return function(e){
                  app.appViewModel.showInfo(venue);
                };
              })(item.venue));
              
              // extend bounds to include new marker
              bounds.extend(item.venue.marker.getPosition());
            });
            // fit map to contain markers
            app.map.fitBounds(bounds);
          }
        });
      },
      function(error){
      },
      {
        
      }
    );
  }
})();
