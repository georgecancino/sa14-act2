const taskForm = document.querySelector('#task-form');
const taskTitleInput = document.querySelector('#task-title');
const taskDetailsInput = document.querySelector('#task-details');
const taskList = document.querySelector('#task-list');

function addTask(title, details) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${title}</span>
        <span>${details}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(li);

    taskTitleInput.value = '';
    taskDetailsInput.value = '';

    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');
    editBtn.addEventListener('click', () => editTask(li));
    deleteBtn.addEventListener('click', () => deleteTask(li));
}

function editTask(task) {
    const title = task.querySelector('span:first-child').textContent;
    const details = task.querySelector('span:nth-child(2)').textContent;
    const newTitle = prompt('Enter new title:', title);
    const newDetails = prompt('Enter new details:', details);
    
    if (newTitle !== null && newDetails !== null) {
        task.querySelector('span:first-child').textContent = newTitle;
        task.querySelector('span:nth-child(2)').textContent = newDetails;
    }
}

function deleteTask(task) {
    task.remove();
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskTitleInput.value.trim();
    const details = taskDetailsInput.value.trim();
    if (title !== '') {
        addTask(title, details);
    } else {
        alert('Please enter a task title.');
    }
});
