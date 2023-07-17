const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
    name: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }]
}, {
    versionKey: false
});

const BoardModel = mongoose.model('board', boardSchema);

module.exports = { BoardModel }