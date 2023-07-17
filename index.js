const express = require("express");
const { connection } = require('./db')
const {boardRouter} = require("./routes/board.routes");
const {taskRouter} = require("./routes/task.routes");
const {subtaskRouter} = require("./routes/subtask.routes")
const app = express();
require("dotenv").config();

app.use(express.json());
app.use('/boards', boardRouter)
app.use('/tasks', taskRouter);
app.use("/subtask", subtaskRouter)

app.get('/', (req, res) => {
    res.send("Hello! Express App")
});



app.listen(process.env.PORT, async () => {

    try {
       await connection
       console.log('connected to DB')
        console.log(`server is running at port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})