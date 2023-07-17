const mongoose = require("mongoose");

const subTaskSchema = mongoose.Schema({
    title: String,
    isCompleted: Boolean
}, {
    versionKey: false
});

const SubTaskModel = mongoose.model('subtask', subTaskSchema);

module.exports = { SubTaskModel }