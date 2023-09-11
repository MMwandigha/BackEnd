const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Create a simple in-memory database for storing todo items
const todoItems = [];

// Create a new todo item
app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  const newItem = {
    id: Date.now().toString(),
    title,
    description,
  };
  todoItems.push(newItem);
  res.status(201).json(newItem);
});

// Retrieve all todo items
app.get('/todos', (req, res) => {
  res.json(todoItems);
});

// Retrieve a single todo item by ID
app.get('/todos/:id', (req, res) => {
  const itemId = req.params.id;
  const item = todoItems.find((todo) => todo.id === itemId);
  if (!item) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(item);
});

// Update a todo item by ID
app.put('/todos/:id', (req, res) => {
  const itemId = req.params.id;
  const { title, description } = req.body;
  const itemIndex = todoItems.findIndex((todo) => todo.id === itemId);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  const updatedItem = { ...todoItems[itemIndex], title, description };
  todoItems[itemIndex] = updatedItem;
  res.json(updatedItem);
});

// Delete a todo item by ID
app.delete('/todos/:id', (req, res) => {
  const itemId = req.params.id;
  const itemIndex = todoItems.findIndex((todo) => todo.id === itemId);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  const deletedItem = todoItems.splice(itemIndex, 1)[0];
  res.json(deletedItem);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
