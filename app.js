const toDoInput = document.querySelector('.todo-list-input')
const btn = document.querySelector('.todo-list-add-btn')
const toDoList = document.querySelector('.todo-list')
const todoForm = document.querySelector('.add-items');
const userSelect = document.getElementById('user-todo');
const newUserBtn = document.getElementById('newUserBtn');
todoForm.addEventListener('submit', handleSubmit)
document.addEventListener('DOMContentLoaded', initApp);
newUserBtn.addEventListener('click', openModal);
document.addEventListener('keydown', closeModal);
let users = [];
let todos = [];

function getUserName(userId) {
    const user = users.find(u => u.id === userId); // получение имени пользователя по id 
    return user.name;    //добавить определение пользователя в функцию ниже
}

function printToDo(id, userId, title, completed) {
    const li = document.createElement('li')
    li.dataset.id = id;
    li.innerHTML = `<div class="form-check"> <label class="form-check-label"> <input class="checkbox" type="checkbox"> ${title} by ${getUserName(userId)} <span class="input-helper"></span></label> </div> <i class="remove mdi mdi-close-circle-outline"></i>`;
   

    const status = li.querySelector('.checkbox');
    status.checked = completed;
    status.addEventListener('change', handleStatusChange)

    const close = li.querySelector('.remove');
    close.addEventListener('click', handleDeleteTodo)

    toDoList.append(li)
    toDoInput.value = '';
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

async function handleSubmit(evt) {
    evt.preventDefault()
    if (toDoInput.value !== "") { //добавить проверку пользователя
        const newTodoData = {
            title: toDoInput.value,
            userId: Number(userSelect.value),
            completed: false,
        };
        const newTodo = await createTodo(newTodoData)
        toDoInput.value = '';
        console.log(newTodo)
        printToDo(newTodo.id, newTodo.userId, newTodo.title, newTodo.completed)
    } else {
        alert('Print new todo')
    }
}

function handleStatusChange() {
    const todoId = this.parentElement.dataset.id;
    const completed = this.checked;
    toggleTodoComplete(todoId, completed)
}

//deletion
function handleDeleteTodo() {
    const todoId = this.parentElement.dataset.id;
    
    if (deleteTodo(todoId)) {
        removeTodo(todoId);
    }
    }
    function removeTodo(todoId) {
        todos = todos.filter(el => parseInt(el.id) !== parseInt(todoId));
        const todo = document.querySelector(`[data-id='${todoId}']`)
        todo.remove(); 
    }

    function createUserOption(userId, userName) {
        const option = document.createElement('option');
        option.value = userId;
        option.innerText = userName;
    
        userSelect.append(option)
    }
    