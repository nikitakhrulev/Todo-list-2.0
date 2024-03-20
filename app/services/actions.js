function printToDo(id, userId, title, completed) {
    const li = document.createElement('li')
    li.dataset.id = id;
    li.innerHTML = `<div class="form-check"> <label class="form-check-label"> <input class="checkbox" type="checkbox"> ${title} --- ${getUserName(userId)} <span class="input-helper"></span></label> </div> <i class="remove mdi mdi-close-circle-outline"></i>`;
   

    const status = li.querySelector('.checkbox');
    status.checked = completed;
    status.addEventListener('change', handleStatusChange)

    const close = li.querySelector('.remove');
    close.addEventListener('click', handleDeleteTodo)

    toDoList.append(li)
    toDoInput.value = '';
    userSelect.value = selectInitialValue;
}
async function handleSubmit(evt) {
    evt.preventDefault()
    if (checkInput()) {
        //добавить проверку пользователя
        const newTodoData = {
            title: toDoInput.value,
            userId: Number(userSelect.value),
            completed: false,
          };
        const newTodo = await createTodo(newTodoData)
        toDoInput.value = '';
        console.log(newTodo)
        printToDo(newTodo.id, newTodo.userId, newTodo.title, newTodo.completed)
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
    