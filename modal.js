const modal = document.getElementById('myModal');
const pageContent = document.querySelector('.page-container');
const newUserInput = document.getElementById('newUserInput');
const userAddBtn = document.querySelector('.newUserAddBtn');
const closeModalBtn = document.querySelector('.closeModalBtn');
userAddBtn.addEventListener('click', handleUserSubmit);
closeModalBtn.addEventListener('click', userCreated)

function userCreated() {
    modal.classList.add('hidden');
    pageContent.classList.remove('blur');
    userSelect.value = selectInitialValue;
}

function closeModal(evt) {
    if (evt.key === 'Escape') {
        modal.classList.add('hidden');
        pageContent.classList.remove('blur');
        userSelect.value = selectInitialValue;
    }
}
function openModal() {
    modal.classList.remove('hidden');
    pageContent.classList.add('blur');
}
function modalCheck() {
    if (newUserInput.value == '') {
        alert('Print new username')
    } else {
        userCreated();
        return true
    }
}

function handleUserSubmit() {
    if (modalCheck()) {
        const userName = newUserInput.value;
        const newUser = {
            id: users.length + 1,
            name: userName,
        };
        createUserOption(newUser.id, newUser.name);
        console.log(newUser.id, newUser.name);
        users.push(newUser);
        newUserInput.value = '';
        postNewUser(newUser);
    }
}
