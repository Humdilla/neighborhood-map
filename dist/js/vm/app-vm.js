function initViewModel(e,s){function n(e,s){this.menuOn=function(){n.searchMenu.addClass("on-screen"),n.searchMenu.removeClass("off-screen")},this.menuOff=function(){n.searchMenu.addClass("off-screen"),n.searchMenu.removeClass("on-screen")},this.toggleMenu=function(){n.searchMenu.toggleClass("off-screen"),n.searchMenu.toggleClass("on-screen")},this.showInfo=function(e,s){try{var i=e.photos.groups[0].items[0],t=i.prefix+i.width+"x"+i.height+i.suffix}catch(a){var t="img/no-img.svg"}app.infoWindow.setContent('<div class="iwindow"><h2 class="iwindow-title">'+e.name+'</h2><img src="'+t+'" class="iwindow-img"></div>'),app.infoWindow.open(app.map,this.markers[s]),window.innerWidth<600&&n.menuOff()},this.filterVenues=function(e,s){this.filteredVenues.splice(0),this.venues.forEach(function(e,i){e.name.toUpperCase().startsWith(s.target.value.toUpperCase())?(n.filteredVenues.push(e),n.markers[i].setVisible(!0)):n.markers[i].setVisible(!1)});try{app.infoWindow.close()}catch(s){}};var n=this;this.searchMenu=$("#search-menu"),this.searchList=$("#search-list"),this.venues=e,this.filteredVenues=ko.observableArray(),e.forEach(function(e){n.filteredVenues.push(e)}),this.markers=s,this.markers.forEach(function(e,s){e.addListener("click",function(e){return function(s){n.selected(e)}}(s))}),this.selected=ko.observable(null),this.selected.subscribe(function(e){null!=e&&n.markers[e].setAnimation(null)},null,"beforeChange"),this.selected.subscribe(function(e){n.showInfo(n.venues[e],e),n.markers[e].setAnimation(google.maps.Animation.BOUNCE)})}app.appViewModel=new n(e,s),ko.applyBindings(app.appViewModel)}var app=app||{};