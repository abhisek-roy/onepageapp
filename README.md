# One Page App

A simple task manager web application with a single-page interface.

## Features

- Add tasks with categories
- Mark tasks as completed
- Delete tasks
- Filter tasks by category
- Filter tasks by date (today, yesterday, this week, last week, this month, last month)
- View task statistics in a dashboard

## Project Structure

```
/onepageapp
├── /src
│   ├── /server
│   │   ├── basic-server.js
│   │   ├── server.js
│   │   └── simple-server.js
│   ├── /client
│   │   └── index.html
│   └── /data
│       └── tasks.json
├── /node_modules
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm installed

### Using the Date Filter

Once the application is running, you can filter tasks by date using the "Filter by date" dropdown menu. The available options are:

- All Dates: Show all tasks regardless of date
- Today: Show tasks that start and end today
- Yesterday: Show tasks that start and end yesterday
- This Week: Show tasks from the current week (Monday to Sunday)
- Last Week: Show tasks from the previous week (Monday to Sunday)
- This Month: Show tasks from the current month
- Last Month: Show tasks from the previous month

You can combine date filtering with category filtering to narrow down the tasks even further.

### Installation

1. Clone the repository
2. Run `npm install` to install dependencies

### Running the Application

To run the main server with persistent storage:

```bash
node src/server/server.js
```

The application will be available at http://localhost:50083

## Server Options

All servers will be available at http://localhost:50083

- `src/server/server.js`: Main server with persistent storage
- `src/server/basic-server.js`: Basic server with persistent storage
- `src/server/simple-server.js`: Simple server with in-memory storage only