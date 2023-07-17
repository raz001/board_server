
const express = require('express');
const subtaskRouter = express.Router();
const {SubTaskModel} = require('../model/subtask.model');

// Create a subtask
subtaskRouter.post('/create', (req, res) => {
  const { title, isCompleted } = req.body;

  const subtask = new SubTaskModel({ title, isCompleted });
  subtask.save()
    .then((subtask) => {
      res.json(subtask);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create a subtask' });
    });
});

// Read all subtasks
subtaskRouter.get('/', (req, res) => {
  SubTaskModel.find()
    .then((subtasks) => {
      res.json(subtasks);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch subtasks' });
    });
});

// Read a subtask by ID
subtaskRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  SubTaskModel.findById(id)
    .then((subtask) => {
      if (!subtask) {
        res.status(404).json({ error: 'Subtask not found' });
      } else {
        res.json(subtask);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch the subtask' });
    });
});

// Update a subtask
subtaskRouter.patch('/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;

  SubTaskModel.findByIdAndUpdate(id, { title, isCompleted }, { new: true })
    .then((subtask) => {
      if (!subtask) {
        res.status(404).json({ error: 'Subtask not found' });
      } else {
        res.json(subtask);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update the subtask' });
    });
});

// Delete a subtask
subtaskRouter.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  SubTaskModel.findByIdAndDelete(id)
    .then((subtask) => {
      if (!subtask) {
        res.status(404).json({ error: 'Subtask not found' });
      } else {
        res.json({ message: 'Subtask deleted successfully' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete the subtask' });
    });
});

module.exports = {subtaskRouter};
