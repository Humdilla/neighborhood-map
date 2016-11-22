var app = app || {};

(function(){
  // Attempt to load google maps
  $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCWec9GP8Gz3Mnu8S4gyt5DuPdmCScANXk')
  .done(function(){
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
  })
  .fail(function(){
    alert('Unable to load Google Maps');
  });
  // Attempt to load nearby venues from FourSquare
  app.myLat = null;
  app.myLng = null;
  app.venues = [];
  app.markers = [];
  if(typeof navigator.geolocation !== 'undefined'){
    navigator.geolocation.getCurrentPosition(
      function(position){
        app.myLat = position.coords.latitude;
        app.myLng = position.coords.longitude;
        $.ajax('https://api.foursquare.com/v2/venues/explore?ll='+app.myLat+','+app.myLng+
        '&client_id=FWFDODROAPV4MOMLR21M1JQE3H2C4HTFN0OAQFCNAOJC11OC'+
        '&client_secret=JBJ0MVCMYJ50LMPMRX4RRMFWBLBYQZULSIEADTXFKZ0SZVAR'+
        '&v=20161116&m=foursquare&radius=3000&venuePhotos=1', {
          success: function(result, status){
            var setupMarkers = function(){
              var bounds = new google.maps.LatLngBounds();
              result.response.groups[0].items.forEach(function(item, i){
                app.venues.push(item.venue);
                
                var marker = new google.maps.Marker({
                  position: {lat:item.venue.location.lat, lng:item.venue.location.lng},
                  map: app.map
                });
                app.markers.push(marker);
                
                // extend bounds to include new marker
                bounds.extend(marker.getPosition());
              });
              
              // fit map to contain markers
              app.map.fitBounds(bounds);
            };
            //If google maps is not loaded, give it a little time.
            if(typeof google !== 'undefined'){
              setupMarkers();
            }
            else{
              setTimeout(6000, function(){
                console.log('angus');
                if(typeof google !== 'undefined')
                  setupMarkers();
              });
            }
          },
          error: function(result, status){
            alert('Could not connect to Foursquare');
          },
          complete: function(){
            initViewModel(app.venues, app.markers);
            
            if(window.innerWidth >= 600)
              app.appViewModel.menuOn(true);
            else
              app.appViewModel.menuOn(false);
          }
        });
      },
      function(error){
        alert('Could not get your position');
      },
      {}
    );
  }
  else
    alert('Could not get your position');
})();
