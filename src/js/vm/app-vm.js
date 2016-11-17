var app = app || {};

(function(){
  function AppViewModel(){
    
    var self = this;
    this.searchMenu = $('#search-menu');
    this.venues = [];
    this.filteredVenues = ko.observableArray();
    this.selected = null;
    
    /**
     * Slide the menu off-screen
     */
    this.menuOn = function(){
      self.searchMenu.addClass('on-screen');
      self.searchMenu.removeClass('off-screen');
    };
    
    /**
     * Slide the menu on-screen
     */
    this.menuOff = function(){
      self.searchMenu.addClass('off-screen');
      self.searchMenu.removeClass('on-screen');
    };
    
    /**
     * Toggle the menu on/off-screen
     */
    this.toggleMenu = function(){
      self.searchMenu.toggleClass('off-screen');
      self.searchMenu.toggleClass('on-screen');
    };
    
    /**
     * Show an infowindow with the venue's information
     * @param {Venue} venue
     */
    this.showInfo = function(venue){
      if(self.selected){
        self.selected.marker.setAnimation(null);
      }
      venue.marker.setAnimation(google.maps.Animation.BOUNCE);
      self.selected = venue;
      
      // Put together photo url
      try{
        var photo = venue.photos.groups[0].items[0];
        var url = photo.prefix + photo.width + 'x' + photo.height + photo.suffix;
      }
      catch(e){
        var url = 'img/no-img.svg';
      }
      
      app.infoWindow.setContent(`
        <div class="iwindow">
          <h2 class="iwindow-title">${venue.name}</h2>
          <img src="${url}" class="iwindow-img">
        </div>
      `);
      app.infoWindow.open(app.map, venue.marker);
      if(window.innerWidth < 600)
        self.menuOff();
    };
    
    /**
     * Filter out venues by name and make only the remaining one's visible
     * @param {ViewModel} vm
     * @param {Event} e
     */
    this.filterVenues = function(vm, e){
      ko.utils.arrayPushAll(this.filteredVenues, this.venues.splice(0));
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