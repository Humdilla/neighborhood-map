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
     */
    this.showInfo = function(venue, index){
      console.log(venue);
      if(self.selected != null){
        this.markers[self.selected].setAnimation(null);
        this.highlightOff(self.selected);
      }
      this.markers[index].setAnimation(google.maps.Animation.BOUNCE);
      this.highlightOn(index);
      this.selected = index;
      
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
      app.infoWindow.close();
    };
    
    /**
     * @description Highlight the list item at the given index
     * @param {Integer} index
     */
    this.highlightOn = function(index){
      $(this.searchList.children()[index]).addClass('selected');
    };
    
    this.highlightOff = function(index){
      $(this.searchList.children()[index]).removeClass('selected');
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
          self.showInfo(self.venues[i], i);
        }
      })(i));
    });
    this.selected = null;
  };
  
  app.appViewModel = new AppViewModel(venues, markers);
  ko.applyBindings(app.appViewModel);
}