const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// In-memory demo data store
let items = [
  { id: 1, name: 'Sample Item 1', description: 'This is the first demo item' },
  { id: 2, name: 'Sample Item 2', description: 'This is the second demo item' }
];

// Root endpoint: service greeting and available routes directory
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome! The demo Node.js API server is running successfully.',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      hello: '/api/hello?name=YourName',
      items: '/api/items'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    uptime: `${process.uptime().toFixed(2)} seconds`,
    timestamp: new Date().toISOString()
  });
});

// Greeting endpoint with name query parameter
app.get('/api/hello', (req, res) => {
  const name = req.query.name || 'World';
  res.json({
    message: `Hello, ${name}! Welcome to the Demo API.`,
    timestamp: new Date().toISOString()
  });
});

// Get all items
app.get('/api/items', (req, res) => {
  res.json({
    count: items.length,
    data: items
  });
});

// Create a new item
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name,
    description: description || ''
  };

  items.push(newItem);
  res.status(201).json({
    message: 'Item created successfully',
    data: newItem
  });
});

// Start the HTTP server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Closing HTTP server gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received. Closing HTTP server gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
  });
});
