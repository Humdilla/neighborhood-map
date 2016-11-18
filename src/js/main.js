var app = app || {};


(function(){
  //Get current position, along with nearby locations from foursquare
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $.ajax('https://api.foursquare.com/v2/venues/explore?ll='+lat+','+lng+
        '&client_id=FWFDODROAPV4MOMLR21M1JQE3H2C4HTFN0OAQFCNAOJC11OC'+
        '&client_secret=JBJ0MVCMYJ50LMPMRX4RRMFWBLBYQZULSIEADTXFKZ0SZVAR'+
        '&v=20161116&m=foursquare&radius=3000&venuePhotos=1', {
          // Populate venues list and make a map marker for each one
          complete: function(result, status){
            var venues = [];
            var markers = [];
            try{
              var bounds = new google.maps.LatLngBounds();
              result.responseJSON.response.groups[0].items.forEach(function(item, i){
                venues.push(item.venue);
                
                var marker = new google.maps.Marker({
                  position: {lat:item.venue.location.lat, lng:item.venue.location.lng},
                  map: app.map
                });
                markers.push(marker);
                
                // extend bounds to include new marker
                bounds.extend(marker.getPosition());
              });
              
              initViewModel(venues, markers);
              
              // Some stuff we can't do with css
              if(window.innerWidth >= 600)
                app.appViewModel.menuOn();
              else
                app.appViewModel.menuOff();
              
              // fit map to contain markers
              app.map.fitBounds(bounds);
            }
            catch(e){
              initViewModel(venues, markers);
            }
          }
        });
      },
      function(error){
        alert('Could not connect to Foursquare');
      },
      {}
    );
  }
})();
