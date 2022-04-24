import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

// get elements
const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('new-task-form') as HTMLFormElement | null;
// this is just another way of doing it (getElementById doesnt support the <> syntax)
const input = document.querySelector<HTMLInputElement>('#new-task-title');

// load tasks from local storage
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

// on submit add task to tasks array
// and call function to add task on the page
form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  // add task to tasks array
  tasks.push(newTask)
  
  // add task to page
  addListItem(newTask)
  input.value = "";
})

// create and display html element for task
// on task change 
function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const deleteButton = document.createElement('button');
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteTask(task.id);
  })

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  // this SHOULD go before the previous line of code.
  // this SHOULD not work as intended.
  // but it does.
  // so im not changing it.
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  })

  label.append(checkbox, task.title);
  label.append(deleteButton);
  item.append(label);
  list?.append(item);

  saveTasks();
}

// save the tasks array to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// get the tasks from local storage and return it
function loadTasks(): Task[] {
  const tasksJSON = localStorage.getItem('tasks');
  if (tasksJSON == null) return []
  return JSON.parse(tasksJSON)
}

function deleteTask(id: string) {
  const taskIndex = tasks.findIndex(task => task.id === id);
  tasks.splice(taskIndex, 1);
  saveTasks();

  if (list == null) return

  list.innerHTML = "";
  tasks.forEach(addListItem);
}