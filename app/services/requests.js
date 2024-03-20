async function getAllTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?');
    const data = await response.json();
    return data;
}
async function getAllUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
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
            notificationSuccess('Status changed')
            console.log('Status changed succesfully');
        } else {
            console.log("Status isn't changed")
        }
    } catch (error) {
        console.error('an error:', error)
        notificationError('change status')
    }
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
            notificationSuccess('New todo created')
            const newTodo = await response.json();
            return newTodo;
        } else {
            console.log("Failed to create new todo")
        }
    } catch (error) {
        console.error('an error:', error)
        notificationError('create new todo')
    } 
}
async function deleteTodo(todoId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            } 
        });
        if (response.ok) { 
            notificationSuccess('Todo deleted')
            console.log('Todo deleted successfully');
        } else {
            console.error('Failed to delete')
        }
    }
    catch (error) {
        console.error('An error occured:', error)
        notificationError('delete')
    }
}

async function postNewUser(user) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json',
            }   
        })
        if (response.ok) {
            notificationSuccess('New user created')
            console.log('New user created')
        } else {
            console.error('Failed to create new user')
        }
    } catch (error) {
        console.error('An error occured:', error)
        notificationError('create new user')
    }
}
    