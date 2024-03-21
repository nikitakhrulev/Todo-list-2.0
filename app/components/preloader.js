const preloader = document.getElementById('preloader');
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        removePreloader(); 
    }, 2000); 
});
// if (document.readyState === "loading")


function removePreloader() {
    preloader.classList.add('unactive');
    pageContent.classList.remove('hidden')
}
