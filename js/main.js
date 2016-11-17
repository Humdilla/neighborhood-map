/**
 * Adds a class to the element's className if it does not already have it
 * @param {String}
 */
HTMLElement.prototype.addClass = function(c){
  var regex = new RegExp('(^|\\s)'+c+'($|\\s)', 'g');
  if(this.className.search(regex) == -1){
    this.className += ' '+c;
  }
}

/**
 * Removes a class from the element's className
 * @param {String}
 */
HTMLElement.prototype.removeClass = function(c){
  var regex = new RegExp('(^|\\s)'+c+'($|\\s)', 'g');
  this.className = this.className.replace(regex, '');
}

/**
 * Adds a class to the element's className if it doesn't exist. If it does
 * exist, it is removed from the element's className.
 * @param {String}
 */
HTMLElement.prototype.toggleClass = function(c){
  var regex = new RegExp('(^|\\s)'+c+'($|\\s)', 'g');
  if(this.className.search(regex) == -1){
    this.className += ' '+c;
    return;
  }
  this.className = this.className.replace(regex, '');
}

/**
 * Callback that initializes the google map.
 */
var initMap = function(){
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:41.727824, lng:-71.271180},
    zoom: 11
  });
}