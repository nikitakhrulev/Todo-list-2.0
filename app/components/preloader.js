const preloader = document.getElementById('preloader');
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        removePreloader(); 
    }, 2000); 
});



function removePreloader() {
    preloader.classList.add('unactive');
    pageContent.classList.remove('hidden')
}
