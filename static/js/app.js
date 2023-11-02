// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const inValidateInput = document.querySelector('#invalid-input');
const filterOption = document.querySelector('.filter-tasks');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTasks);

// FUNCTIONS

// SHOWING ERROR MSG WHEN EMPTY
const addingInvalidMsg = () => {
  inValidateInput.classList.remove('hidden');
  inValidateInput.classList.add('invalid-input');
  let timeOut = setTimeout(() => {
    deleteInvalidMsg(timeOut);
  }, 1500);
};

// REMOVING ERROR MSG WHEN !EMPTY
const deleteInvalidMsg = () => {
  inValidateInput.classList.add('hidden');
  inValidateInput.classList.remove('invalid-input');
  return false;
};

// Adding New Task
function addTodo(e) {
  // Prevent form from submitting
  e.preventDefault();

  //   Create a todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('flex');
  todoDiv.classList.add('todo');

  //  Create Li
  const newTodo = document.createElement('li');

  //   Validating empty input || Showing Error message.
  //   if the input field is empty, then show an error message
  if (todoInput.value === '') {
    addingInvalidMsg();
    return false;
  } else {
    // else, if the user added a value, hide the error message and submit the new task
    // hiding the error message
    deleteInvalidMsg();
    // Adding new task
    newTodo.innerText = todoInput.value;
  }

  // Appending li to DIV
  todoDiv.appendChild(newTodo);

  // Adding a class to li
  newTodo.classList.add('todo-item');

  // Save task to localStorage
  saveLocalTodos(todoInput.value, false);

  // CHECK MARK BUTTON

  // Creating Completed task button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';

  // Adding a class to the button
  completeButton.classList.add('complete-btn');

  // Appending complete button to DIV
  todoDiv.appendChild(completeButton);

  // Creating Delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

  // Adding a class to the button
  deleteButton.classList.add('delete-btn');

  // Appending Delete button to DIV
  todoDiv.appendChild(deleteButton);

  // Appending The Created DIV to list
  todoList.appendChild(todoDiv);

  // Clearing the input field
  todoInput.value = '';
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    // Animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }

  if (item.classList[0] === 'complete-btn') {
    const task = item.parentElement;
    task.classList.toggle('completed');
    updateCompletionStatus(task);
  }
}

function filterTasks(e) {
  const tasks = todoList.childNodes;
  tasks.forEach((task) => {
    switch (e.target.value) {
      case 'all':
        task.style.display = 'flex';
        break;
      case 'completed':
        if (task.classList.contains('completed')) {
          task.style.display = 'flex';
        } else {
          task.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!task.classList.contains('completed')) {
          task.style.display = 'flex';
        } else {
          task.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo, completed) {
  // CHECK If there are tasks in Browser storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push({ text: todo, completed: completed }); // Store the completion status
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  // CHECK If there are tasks in Browser storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach((todo) => {
    // Showing Elements From LocalStorage

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('flex');
    todoDiv.classList.add('todo');

    //  Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo.text;

    // Adding a class to li
    newTodo.classList.add('todo-item');

    // Appending li to DIV
    todoDiv.appendChild(newTodo);

    // CHECK MARK BUTTON

    // Creating Completed task button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';

    // Adding a class to the button
    completeButton.classList.add('complete-btn');

    // Appending complete button to DIV
    todoDiv.appendChild(completeButton);

    // Creating Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    // Adding a class to the button
    deleteButton.classList.add('delete-btn');

    // Appending Delete button to DIV
    todoDiv.appendChild(deleteButton);

    // Appending The Created DIV to list
    todoList.appendChild(todoDiv);

    // Set the completion status based on the saved data
    if (todo.completed) {
      todoDiv.classList.add('completed');
    }
  });
}

function removeLocalTodos(todo) {
  // CHECK If there are tasks in Browser storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.querySelector('.todo-item').innerText;
  todos = todos.filter((item) => item.text !== todoIndex);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function updateCompletionStatus(task) {
  const text = task.querySelector('.todo-item').innerText;
  let todos = JSON.parse(localStorage.getItem('todos'));
  todos = todos.map((todo) => {
    if (todo.text === text) {
      return { text: todo.text, completed: task.classList.contains('completed') };
    }
    return todo;
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}
