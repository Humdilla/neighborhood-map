var app = app || {};

(function(){
  function AppViewModel(){
    
    var self = this;
    
    this.searchMenu = $('#search-menu');
    
    this.venues = [];
    this.filteredVenues = ko.observableArray();
    this.selected = null;
    
    this.menuOn = function(){
      self.searchMenu.addClass('on-screen');
      self.searchMenu.removeClass('off-screen');
    };
    
    this.menuOff = function(){
      self.searchMenu.addClass('off-screen');
      self.searchMenu.removeClass('on-screen');
    };
    
    this.toggleMenu = function(){
      self.searchMenu.toggleClass('off-screen');
      self.searchMenu.toggleClass('on-screen');
    };
    
    /**
     * Show an infowindow with the locations information
     * @param {Venue} venue
     */
    this.showInfo = function(venue){
      if(self.selected){
        self.selected.marker.setAnimation(null);
      }
      venue.marker.setAnimation(google.maps.Animation.BOUNCE);
      self.selected = venue;
      
      if(venue.photos.groups[0]){
        var photo = venue.photos.groups[0].items[0];
        var url = photo.prefix + photo.width + 'x' + photo.height + photo.suffix;
      }
      else{
        var url = 'img/no-img.svg'
      }
      
      app.infoWindow.setContent(`
        <div class="iwindow">
          <h2 class="iwindow-title">${venue.name}</h2>
          <img src="${url}" class="iwindow-img">
        </div>
      `);
      app.infoWindow.open(app.map, venue.marker);
    };
    
    this.filterVenues = function(vm, e){
      ko.utils.arrayPushAll(this.filteredLocations, this.venues.splice(0));
      self.filteredVenues.remove(function(venue){
        return !venue.name.toUpperCase().startsWith(e.target.value.toUpperCase());
      }).forEach(function(venue){
        self.venues.push(venue);
        venue.marker.setVisible(false);
      });
      this.filteredVenues().forEach(function(venue){
        venue.marker.setVisible(true);
      });
    };
  };

  app.appViewModel = new AppViewModel();
  ko.applyBindings(app.appViewModel);
})();