const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
      <span contenteditable>${task.text}</span>
      <button data-index="${index}" class="delete">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Add Task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    saveAndRender();
  } else {
    alert('Please enter a task.');
  }
});

// Toggle Complete
taskList.addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    const index = e.target.dataset.index;
    tasks[index].completed = e.target.checked;
    saveAndRender();
  }
});

// Edit Task
taskList.addEventListener('input', (e) => {
  if (e.target.tagName === 'SPAN') {
    const index = [...taskList.children].indexOf(e.target.parentNode);
    tasks[index].text = e.target.textContent;
    saveAndRender(false);
  }
});

// Delete Task
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    saveAndRender();
  }
});

// Save to Local Storage and Render
function saveAndRender(save = true) {
  if (save) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  renderTasks();
}

// Initial Render
renderTasks();
