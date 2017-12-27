(function() {
  var loader = document.querySelector('.loader');
  setTimeout(function() {
    loader.className = loader.className + ' JS_on';   
  }, 100);
  setTimeout(function() {
    loader.className = 'loader';    
  }, 3000);
})();