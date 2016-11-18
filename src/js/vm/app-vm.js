var app = app || {};

function initViewModel(venues, markers){
  function AppViewModel(venues, markers){
    
    /**
     * @description Slide the menu off-screen
     */
    this.menuOn = function(){
      self.searchMenu.addClass('on-screen');
      self.searchMenu.removeClass('off-screen');
    };
    
    /**
     * @description Slide the menu on-screen
     */
    this.menuOff = function(){
      self.searchMenu.addClass('off-screen');
      self.searchMenu.removeClass('on-screen');
    };
    
    /**
     * @description Toggle the menu on/off-screen
     */
    this.toggleMenu = function(){
      self.searchMenu.toggleClass('off-screen');
      self.searchMenu.toggleClass('on-screen');
    };
    
    /**
     * @description Show an infowindow with the venue's information
     * @param {Venue} venue
     * @param {Integer} index
     */
    this.showInfo = function(venue, index){
      
      // Put together photo url
      try{
        var photo = venue.photos.groups[0].items[0];
        var url = photo.prefix + photo.width + 'x' + photo.height + photo.suffix;
      }
      catch(e){
        var url = 'img/no-img.svg';
      }
      
      app.infoWindow.setContent(
        '<div class="iwindow">'+
          '<h2 class="iwindow-title">'+venue.name+'</h2>'+
          '<img src="'+url+'" class="iwindow-img">'+
        '</div>');
      app.infoWindow.open(app.map, this.markers[index]);
      if(window.innerWidth < 600)
        self.menuOff();
    };
    
    /**
     * @description Filter out venues by name and make only the remaining one's visible
     * @param {ViewModel} vm
     * @param {Event} e
     */
    this.filterVenues = function(vm, e){
      this.filteredVenues.splice(0);
      this.venues.forEach(function(venue, i){
        if(venue.name.toUpperCase().startsWith(e.target.value.toUpperCase())){
          self.filteredVenues.push(venue);
          self.markers[i].setVisible(true);
        }
        else{
          self.markers[i].setVisible(false);
        }
      });
      try{
        app.infoWindow.close();
      }catch(e){}
    };
    
    var self = this;
    this.searchMenu = $('#search-menu');
    this.searchList = $('#search-list');
    this.venues = venues;
    this.filteredVenues = ko.observableArray();
    venues.forEach(function(venue){
      self.filteredVenues.push(venue);
    });
    this.markers = markers;
    // Listen for clicks on markers
    this.markers.forEach(function(marker, i){
      marker.addListener('click', (function(i){
        return function(e){
          self.selected(i);
        }
      })(i));
    });
    // Set up selected observable and subscribers
    this.selected = ko.observable(null);
    this.selected.subscribe(function(oldVal){
      if(oldVal != null)
        self.markers[oldVal].setAnimation(null);
    }, null, 'beforeChange');
    this.selected.subscribe(function(newVal){
      self.showInfo(self.venues[newVal], newVal);
      self.markers[newVal].setAnimation(google.maps.Animation.BOUNCE);
    });
  };
  
  app.appViewModel = new AppViewModel(venues, markers);
  ko.applyBindings(app.appViewModel);
}