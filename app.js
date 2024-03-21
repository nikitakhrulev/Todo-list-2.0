const toDoInput = document.querySelector('.todo-list-input')
const btn = document.querySelector('.todo-list-add-btn')
const toDoList = document.querySelector('.todo-list')
const todoForm = document.querySelector('.add-items');
const userSelect = document.getElementById('user-todo');
const newUserBtn = document.getElementById('newUserBtn');
todoForm.addEventListener('submit', handleSubmit)
document.addEventListener('DOMContentLoaded', initApp);
const selectInitialValue = userSelect.value;
userSelect.addEventListener('change', function(evt) {
    if (evt.target.value === 'choose') {
        modal.classList.remove('hidden');
        pageContent.classList.add('blur');
        userSelect.value = selectInitialValue;
    }
})
let users = [];
let todos = [];

function getUserName(userId) {
    const user = users.find(u => u.id === userId); // получение имени пользователя по id 
    return user.name;    //добавить определение пользователя в функцию ниже
}

async function initApp() {
    const [todosData, usersData] = await Promise.all([getAllTodos(), getAllUsers()]);
    todos = todosData;
    users = usersData;
    
    todos.forEach(todo => {
        printToDo(todo.id, todo.userId, todo.title, todo.completed);
    });
    users.forEach(user => {
        createUserOption(user.id, user.name)
    });
} 
function checkInput() {
    if (toDoInput.value === "" || userSelect.value === selectInitialValue) {
        alert('Fill all fields')
    } else {
        return true
    }
}

