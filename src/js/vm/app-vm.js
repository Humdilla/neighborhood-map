var app = app || {};

function initViewModel(venues, markers){
  function AppViewModel(venues, markers){
    /**
     * @description Set up event listeners for markers
     */
    this.setupMarkers = function(){
      this.filteredMarkers.forEach(function(marker, i){
        google.maps.event.clearListeners(marker, 'click');
        marker.addListener('click', (function(i){
          return function(e){
            self.selected(i);
          };
        })(i));
      });
    }
    
    /**
     * @description Show an infowindow with the venue's information
     * @param {Venue} venue
     * @param {Integer} index
     */
    this.showInfo = function(venue, index){
      
      // Put together photo url
      var url;
      try{
        var photo = venue.photos.groups[0].items[0];
        url = photo.prefix + photo.width + 'x' + photo.height + photo.suffix;
      }
      catch(e){
        url = 'img/no-img.svg';
      }
      
      app.infoWindow.setContent(
        '<div class="iwindow">'+
          '<h2 class="iwindow-title">'+venue.name+'</h2>'+
          '<img src="'+url+'" class="iwindow-img">'+
        '</div>');
      app.infoWindow.open(app.map, this.filteredMarkers[index]);
      if(window.innerWidth < 600)
        self.menuOn(false);
    };
    
    /**
     * @description Filter out venues by name and make only the remaining one's visible
     * @param {ViewModel} vm
     * @param {Event} e
     */
    this.filterVenues = function(vm, e){
      this.selected(null);
      this.filteredVenues.splice(0);
      this.filteredMarkers = [];
      this.venues.forEach(function(venue, i){
        if(venue.name.toUpperCase().startsWith(e.target.value.toUpperCase())){
          self.filteredVenues.push(venue);
          self.filteredMarkers.push(self.markers[i]);
          self.markers[i].setVisible(true);
        }
        else{
          self.markers[i].setVisible(false);
        }
      });
      this.setupMarkers();
      try{
        app.infoWindow.close();
      }catch(error){}
    };
    
    var self = this;
    this.menuOn = ko.observable(null);
    this.venues = venues;
    this.filteredVenues = ko.observableArray();
    venues.forEach(function(venue){
      self.filteredVenues.push(venue);
    });
    this.markers = markers;
    this.filteredMarkers = markers;
    this.setupMarkers();
    // Set up selected observable and subscribers
    this.selected = ko.observable(null).extend({notify: 'always'});
    this.selected.subscribe(function(oldVal){
      if(oldVal !== null)
        self.filteredMarkers[oldVal].setAnimation(null);
    }, null, 'beforeChange');
    this.selected.subscribe(function(newVal){
      if(newVal === null)
        return;
      self.showInfo(self.filteredVenues()[newVal], newVal);
      self.filteredMarkers[newVal].setAnimation(google.maps.Animation.BOUNCE);
    });
  }
  
  app.appViewModel = new AppViewModel(venues, markers);
  ko.applyBindings(app.appViewModel);
}