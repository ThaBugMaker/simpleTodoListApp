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
  inValidateInput.classList.add('invalide-input');
  let timeOut = setTimeout(() => {
    deleteInvalidMsg(timeOut);
  }, 1500);
};
// REMOVING ERROR MSG WHEN !EMPTY
const deleteInvalidMsg = () => {
  inValidateInput.classList.add('hidden');
  inValidateInput.classList.remove('invalide-input');
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

  //   Validating  empty input || Showing Error message.
  //   if input filed is empty then show err msg!
  if (todoInput.value === '') {
    addingInvalidMsg();
    return false;
  } else {
    // else if user added value, hide err msg! & submit newTask
    // hidding err msg!
    deleteInvalidMsg();
    // Adding new task.
    newTodo.innerText = todoInput.value;
  }

  // Appending li to DIV
  todoDiv.appendChild(newTodo);

  //   Adding a class to li
  newTodo.classList.add('todo-item');

  // Save task to localStorage
  saveLocalTodos(todoInput.value);

  //   CHECK MARK BUTTON

  //   Creating Completed task button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';

  //   Adding a class to the button
  completeButton.classList.add('complete-btn');

  //   Appending complete button to DIV
  todoDiv.appendChild(completeButton);

  //   Creating Delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

  //   Adding a class to the button
  deleteButton.classList.add('delete-btn');

  //   Appending Delete button to DIV
  todoDiv.appendChild(deleteButton);

  //   Appending The Created DIV to list
  todoList.appendChild(todoDiv);

  //   Clearing the input filed.
  todoInput.value = '';
}

function deleteCheck(e) {
  const item = e.target;
  //  Delete Item
  if (item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    // Animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }

  //   CHECK MARK
  if (item.classList[0] === 'complete-btn') {
    const task = item.parentElement;
    task.classList.toggle('completed');
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
  //   console.log(tasks);
}

function saveLocalTodos(todo) {
  // CHECK If there is Tasks in Browser storage.
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  // CHECK If there is Tasks in Browser storage.
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach((todo) => {
    // Showing Elements From LocalStorage.

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('flex');
    todoDiv.classList.add('todo');

    //  Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;

    //   Adding a class to li
    newTodo.classList.add('todo-item');

    // Appending li to DIV
    todoDiv.appendChild(newTodo);

    //   CHECK MARK BUTTON

    //   Creating Completed task button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';

    //   Adding a class to the button
    completeButton.classList.add('complete-btn');

    //   Appending complete button to DIV
    todoDiv.appendChild(completeButton);

    //   Creating Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    //   Adding a class to the button
    deleteButton.classList.add('delete-btn');

    //   Appending Delete button to DIV
    todoDiv.appendChild(deleteButton);

    //   Appending The Created DIV to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // CHECK If there is Tasks in Browser storage.
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  console.log(todo.children[0].innerText);
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
