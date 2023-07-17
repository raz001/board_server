const express = require('express');
const { BoardModel } = require('../model/board.model')
const boardRouter = express.Router();


// read all boards
boardRouter.get('/', async (req, res) => {
    try {
        const boards = await BoardModel.find();
        res.json({ boards })
    } catch (error) {
        res.json({ error })
    }

});

// read a board by ID 
boardRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const board = await BoardModel.findById({ _id: id });
        if (!board) {
            res.status(404).json({ error: 'Board not found' })
        } else {
            res.json({ board })
        }
    } catch (error) {
        res.status(500).json({ error });
    }
})

// create a board
boardRouter.post('/create', async (req, res) => {
    const { name } = req.body;
    try {
        const board = new BoardModel({ name });
        console.log(req.body)
        await board.save();
        res.json({ msg: 'new board is added', board: req.body })
    } catch (error) {
        res.json({ error: error })
    }
});


// update a board
boardRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const board = await BoardModel.findByIdAndUpdate({ _id: id }, req.body);
        if (!board) {
            res.status(404).json({ error: 'Board not found' });
        } else {
            res.json({ board });
        }
    } catch (error) {
        res.json({ error })
    }
});

// delete a board
boardRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const board = await BoardModel.findByIdAndDelete({ _id: id });
        if (!board) {
            res.status(404).json({ error: 'Board not found' });
        } else {
            res.json({ msg: 'Board deleted successfully' });
        }
    } catch (error) {
        res.json({ error })
    }
});

module.exports = { boardRouter }