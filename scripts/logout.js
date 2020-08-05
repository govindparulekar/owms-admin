$(document).ready(function(){
    $('.header #logout').click(function(){
        sessionStorage.removeItem('ATkn');
        window.location = '../';
    });
});