


const toDoInput = document.querySelector('.todo-list-input')
const btn = document.querySelector('.todo-list-add-btn')
const toDoList = document.querySelector('.todo-list')
const removeBtn = document.querySelectorAll('.remove');
removeBtn.forEach(btn => btn.addEventListener('click', removeToDo));
const todoForm = document.querySelector('.add-items');
todoForm.addEventListener('submit', handleSubmit)
document.addEventListener('DOMContentLoaded', initApp);
let users = [];
let todos = [];

function removeToDo() {
    const listItem = this.parentNode;
    listItem.remove();
}
function printToDo(id, userId, title, completed) {
    const li = document.createElement('li')
    li.innerHTML = `<div class="form-check"> <label class="form-check-label"> <input class="checkbox" type="checkbox"> ${title} <i class="input-helper"></i></label> </div> <i class="remove mdi mdi-close-circle-outline"></i>`;
    li.querySelector('.remove').addEventListener('click', removeToDo);

    const status = li.querySelector('.checkbox');
    status.checked = completed;
    status.addEventListener('change', handleStatusChange)


    toDoList.append(li)
    toDoInput.value = ''; //дописать функцию с учетом пропсов, добавить функцию, которая определяет id пользователя
}

async function getAllTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    const data = await response.json();
    return data;
}
async function getAllUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
}

async function initApp() {
    const [todosData, usersData] = await Promise.all([getAllTodos(), getAllUsers()]);
    todos = todosData;
    users = usersData;
    
    todos.forEach(todo => {
        printToDo(todo.id, todo.userId, todo.title, todo.completed);
    });
} 
async function createTodo(todo) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-type': 'application/json',
        }
    });
    try {
        if (response.ok) {
            console.log('New todo is created');
            const newTodo = await response.json();
            return newTodo;
        } else {
            console.log("Failed to create new todo")
        }
    } catch (error) {
        console.error('an error:', error)
    } 
}

async function handleSubmit(evt) {
    evt.preventDefault()

    const newTodoData = {
        title: toDoInput.value,
        completed: false,
    };
    const newTodo = await createTodo(newTodoData)
    toDoInput.value = '';
    console.log(newTodo)
    printToDo(1, 1, newTodo.title, newTodo.completed)
}


function handleStatusChange() {
    const todoId = this.parentElement.dataset.id;
    const completed = this.checked;
    toggleTodoComplete(todoId, completed)
}
async function toggleTodoComplete(todoId, completed) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'PATCH',
        body: JSON.stringify({completed}),
        headers: {
            'Content-type': 'application/json',
        }
    })
    try {
        if (response.ok) {
            console.log('Status changed succesfully');
        } else {
            console.log("Status isn't changed")
        }
    } catch (error) {
        console.error('an error:', error)
    }
}  