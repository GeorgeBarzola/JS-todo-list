document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addButton = document.getElementById('addButton');
  const taskList = document.getElementById('taskList');

  addButton.addEventListener('click', function() {
    if (taskInput.value) {
      addTask(taskInput.value);
      taskInput.value = '';
    }
  });

  taskList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
      const taskItem = e.target.parentNode;
      removeTask(taskItem);
    } else if (e.target.tagName === 'INPUT') {
      const taskItem = e.target.parentNode;
      toggleTaskCompletion(taskItem);
    }
  });

  function addTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const taskTextElement = document.createElement('span');
    taskTextElement.innerText = taskText;

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerText = 'Delete';

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    saveTasks();
  }

  function removeTask(taskItem) {
    taskItem.remove();
    saveTasks();
  }

  function toggleTaskCompletion(taskItem) {
    taskItem.classList.toggle('completed');
    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    const taskItems = document.getElementsByClassName('task');
    for (let i = 0; i < taskItems.length; i++) {
      const taskText = taskItems[i].querySelector('span').innerText;
      const isCompleted = taskItems[i].classList.contains('completed');
      tasks.push({ text: taskText, completed: isCompleted });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tasks = JSON.parse(savedTasks);
      for (let i = 0; i < tasks.length; i++) {
        addTask(tasks[i].text);
        const taskItem = taskList.lastElementChild;
        if (tasks[i].completed) {
          toggleTaskCompletion(taskItem);
        }
      }
    }
  }

  loadTasks();
});
