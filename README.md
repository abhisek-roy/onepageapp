# One Page App

A simple task manager web application with a single-page interface.

## Features

- Add tasks with categories
- Mark tasks as completed
- Delete tasks
- Filter tasks by category
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

### Installation

1. Clone the repository
2. Run `npm install` to install dependencies

### Running the Application

To run the main server with persistent storage:

```bash
node src/server/server.js
```

The application will be available at http://localhost:54040

## Server Options

- `src/server/server.js`: Main server with persistent storage
- `src/server/basic-server.js`: Basic server with persistent storage
- `src/server/simple-server.js`: Simple server with in-memory storage only