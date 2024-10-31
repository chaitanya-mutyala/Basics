const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date-input');
const dueTimeInput = document.getElementById('due-time-input');
let selectedPriority = 'Low';

function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const dueTime = dueTimeInput.value;

    if (!taskText) {
        alert('Please enter a task.');
        return;
    }

    // Check if due date and time are in the future
    const now = new Date();
    const dueDateTime = new Date(`${dueDate}T${dueTime}`);
    if (dueDateTime <= now) {
        alert('Please select a future date and time.');
        return;
    }

    const listItem = document.createElement('li');
    listItem.classList.add(selectedPriority.toLowerCase());
    listItem.innerHTML = `
        <div>
            <span>${taskText}</span>
            <small class="time">Due: ${dueDateTime.toLocaleString()}</small>
        </div>
        <div class="task-options">
            <button onclick="markTaskAsDone(this)">Mark as Done</button>
            <button onclick="deleteTask(this)">Delete</button>
            <button onclick="closeOptions(this)">Cancel</button>
        </div>
    `;

    listItem.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleTaskOptions(listItem);
    });

    taskList.appendChild(listItem);
    clearInputs();
    sortTasksByDueDate();
}

function clearInputs() {
    taskInput.value = '';
    dueDateInput.value = '';
    dueTimeInput.value = '';
    selectedPriority = 'Low';
    document.getElementById('selected-priority').textContent = selectedPriority;
}

function markTaskAsDone(button) {
    const listItem = button.closest('li');
    listItem.classList.add('completed');
    closeOptions(button);
}

function deleteTask(button) {
    const listItem = button.closest('li');
    listItem.remove();
}

function closeOptions(button) {
    button.closest('.task-options').style.display = 'none';
}

function toggleTaskOptions(listItem) {
    const options = listItem.querySelector('.task-options');
    options.style.display = options.style.display === 'none' ? 'block' : 'none';
}

function sortTasksByDueDate() {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
        const aDate = new Date(a.querySelector('.time').textContent.split('Due: ')[1]);
        const bDate = new Date(b.querySelector('.time').textContent.split('Due: ')[1]);
        return aDate - bDate;
    });
    tasks.forEach(task => taskList.appendChild(task));
}

function setPriority(priority) {
    selectedPriority = priority;
    document.getElementById('selected-priority').textContent = priority;
    document.getElementById('priority-options').style.display = 'none';
}

function togglePriorityDropdown() {
    const dropdown = document.getElementById('priority-options');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('click', () => {
    document.getElementById('priority-options').style.display = 'none';
    document.querySelectorAll('.task-options').forEach(option => option.style.display = 'none');
});
