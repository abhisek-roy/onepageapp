const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 50083; // Using the provided port

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));

// Load tasks from JSON file
let tasks = [];
try {
  const tasksData = fs.readFileSync(path.join(__dirname, '../data/tasks.json'), 'utf8');
  tasks = JSON.parse(tasksData);
} catch (err) {
  console.log('Failed to load tasks from JSON file, starting with empty tasks list');
}

// API routes
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = req.body;

  // Parse the duration and calculate the end date
  let duration = 0;
  if (newTask.duration) {
    const durationMatch = newTask.duration.match(/(\d+)([a-zA-Z]+)/);
    if (durationMatch) {
      const value = parseInt(durationMatch[1], 10);
      const unit = durationMatch[2].toLowerCase();

      if (unit === 'm') {
        duration = value;
      } else if (unit === 'h') {
        duration = value * 60;
      } else if (unit === 'd') {
        duration = value * 24 * 60;
      }
    }
  }

  // Set default startDate and calculate endDate based on duration
  const currentTime = new Date();
  const endDate = new Date(currentTime);
  endDate.setMinutes(currentTime.getMinutes() + duration);

  const taskWithDates = {
    ...newTask,
    startDate: currentTime.toISOString(),
    endDate: endDate.toISOString()
  };

  tasks.push(taskWithDates);
  res.status(201).json(taskWithDates);
});

app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedTask = req.body;
  const index = tasks.findIndex(task => task.id === id);

  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
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
const saveTasksToFile = () => {
  try {
    fs.writeFileSync(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2), 'utf8');
    console.log('Tasks saved to tasks.json');
  } catch (err) {
    console.error('Failed to save tasks to tasks.json', err);
  }
};

// Save tasks to file on server shutdown
process.on('SIGINT', () => {
  saveTasksToFile();
  process.exit();
});

process.on('SIGTERM', () => {
  saveTasksToFile();
  process.exit();
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});