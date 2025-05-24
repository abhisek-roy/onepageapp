const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 54040; // Using the provided port

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));

// File path for tasks storage
const tasksFilePath = path.join(__dirname, '../data/tasks.json');

// Load tasks from file
function loadTasksFromFile() {
  if (fs.existsSync(tasksFilePath)) {
    const data = fs.readFileSync(tasksFilePath, 'utf8');
    return JSON.parse(data);
  }
  return [];
}

// Save tasks to file
function saveTasksToFile(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
}

// Initialize tasks
let tasks = loadTasksFromFile();

// API routes
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  saveTasksToFile(tasks);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedTask = req.body;
  const index = tasks.findIndex(task => task.id === id);

  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    saveTasksToFile(tasks);
    res.json(tasks[index]);
  } else {
    res.status(404).send('Task not found');
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = tasks.findIndex(task => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasksToFile(tasks);
    res.status(204).send();
  } else {
    res.status(404).send('Task not found');
  }
});

// Serve the main page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});