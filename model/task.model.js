const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
	title: String,
	description: String,
	status: { type: String, enum: ['Todo', 'Doing', 'Done'], default: 'Todo' },
	subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subtask' }],
	board: { type: mongoose.Schema.Types.ObjectId, ref: 'board' }
}, {
    versionKey: false
});

const TaskModel = mongoose.model('task', taskSchema);

module.exports = { TaskModel }