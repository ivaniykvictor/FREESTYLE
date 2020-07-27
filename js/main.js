(function(){
    const menuActiveElement = document.getElementById('menuActive');
  
    const adaptiveMenu = document.getElementById('adaptiveMenu');
    adaptiveMenu.addEventListener('click', function() {
        menuActiveElement.classList.add("active");
    });

    const menuClose = document.getElementById('menuClose');
    menuClose.addEventListener('click', function() {
        menuActiveElement.classList.remove("active");
    });
})();