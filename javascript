const API_URL = 'http://localhost:3000';

async function fetchTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  const empty = document.getElementById('emptyState');
  list.innerHTML = '';

  if (tasks.length === 0) {
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.text;
      const btn = document.createElement('button');
      btn.textContent = 'Delete';
      btn.onclick = () => deleteTask(task._id);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const task = input.value.trim();
  if (!task) return;

  await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: task }),
  });

  input.value = '';
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
  fetchTasks();
}

fetchTasks();