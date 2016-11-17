function AppViewModel(map){
  this.map = map;
  
  this.toggleMenu = function(){
    document.getElementById('search-menu').toggleClass('off-screen');
    document.getElementById('search-menu').toggleClass('on-screen');
  };
};

ko.applyBindings(new AppViewModel(), document.getElementById('search-menu'));
document.getElementById('search-menu').addClass('off-screen');
document.getElementById('search-menu').removeClass('on-screen');