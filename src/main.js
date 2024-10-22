const form = document.getElementById('toDoApp');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', function () {
    let taskCount = localStorage.length;
    for (let i = 1; i <= taskCount; i++) {
        const task = localStorage.getItem(`task_${i}`);
        if (task) {
            addTask(task, false);
        }
    }
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

function addTask(taskText, saveToStorage = true) {
    const taskCount = localStorage.length + 1;

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item', 'flex', 'justify-between', 'items-center', 'py-2', 'border-b', 'border-gray-200');
    taskItem.innerHTML = `
        <span class="text-gray-800">${taskText}</span>
        <button class="bg-pink-400 text-white px-3 py-1 rounded-lg hover:bg-pink-500 transition-colors" onclick="removeTask(this, ${taskCount})">Remove</button>
    `;

    taskList.appendChild(taskItem);

    if (saveToStorage) {
        localStorage.setItem(`task_${taskCount}`, taskText);
    }
}

function removeTask(button, taskCount) {
    button.parentElement.remove();

    localStorage.removeItem(`task_${taskCount}`);
}
