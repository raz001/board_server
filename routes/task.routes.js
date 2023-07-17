const express = require('express');
const taskRouter = express.Router();

const { TaskModel } = require("../model/task.model");


// Create a task
taskRouter.post('/create', (req, res) => {
    const { boardId, title, description, status } = req.body;

    const task = new TaskModel({ title, description, status, board: boardId });
    task.save()
        .then((task) => {
            TaskModel.findByIdAndUpdate(boardId, { $push: { tasks: task._id } }, { new: true })
                .then(() => {
                    res.json({ task });
                })
                .catch((error) => {
                    res.status(500).json({ error: 'Failed to create a task' });
                });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to create a task' });
        });
});


// Read tasks 
taskRouter.get('/board/:boardId/status/:status', (req, res) => {
    const { boardId, status } = req.params;

    TaskModel.find({ board: boardId, status })
        .then((tasks) => {
            res.json(tasks);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to fetch tasks' });
        });
});

// Update a task
taskRouter.patch('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    TaskModel.findByIdAndUpdate(id, { title, description, status }, { new: true })
        .then((task) => {
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
            } else {
                res.json({ task });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to update the task' });
        });
});


// Delete a task
taskRouter.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    TaskModel.findByIdAndDelete(id)
        .then((task) => {
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
            } else {
                res.json({ message: 'Task deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to delete the task' });
        });
});


module.exports = { taskRouter }