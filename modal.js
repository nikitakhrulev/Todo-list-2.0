const modal = document.getElementById('myModal');
const pageContent = document.querySelector('.page-container');

function closeModal(evt) {
    if (evt.key === 'Escape') {
        modal.classList.add('hidden');
        pageContent.classList.remove('blur');
    }
}
function openModal() {
    modal.classList.remove('hidden');
    pageContent.classList.add('blur');
}