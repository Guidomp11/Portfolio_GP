function qs(element) {
    return document.querySelector(element)
};


window.addEventListener('load', function() {
    let btn = document.querySelector('.btnMenu');
    let menuNav = document.querySelector('.sidebar');
    let logo = document.querySelector('img.logo');
    btn.addEventListener('click', function(){
        btn.classList.toggle('click');
        menuNav.classList.toggle('show');
    });
/*
    logo.addEventListener('click', function(){
        window.location.pathname = '/';
    });*/

})