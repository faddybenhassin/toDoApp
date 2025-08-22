import express from 'express'
import cors from 'cors'


const PORT = 5000
const app = express()
app.use(express.json())
app.use(cors())

const todos = [
    {
        id: 1,
        text: "go get some bitches",
        isDone: false
    },
    {
        id: 2,
        text: "stop being a faggot",
        isDone: true
    }
]

// add item to the list
app.post("/api/todo", (req, res) => {
    const { text } = req.body;
    if (text.length > 0) {
        todos.push(
            {
                id: todos[todos.length - 1].id + 1,
                text: text,
                isDone: false
            }
        )
        res.status(201).send("item pushed successfuly")
    } else {
        res.status(400).send("ERR: no text was sent")

    }
    res.status(404).send("error")

});




//get all todo items
app.get("/api/todo", (req, res) => {
    res.json(todos)
})



//get a specific todo item
app.get("/api/todo/:id", (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.status(400).send("ERR: invalid Id")
    };

    const todoItem = todos.find((todo) => todo.id === parseInt(id));

    if (!todoItem) {
        return res.status(404).send("ERR: no todo item found")
    };

    res.json(todoItem);
})



// edit an item on the list
app.patch("/api/todo/:id", (req, res) => {
    const { body, params: { id } } = req;

    const foundIndex = todos.findIndex((todo) => todo.id === parseInt(id))
    if (foundIndex === -1) {
        return res.status(404).send("ERR: todo item not found!")
    }

    todos[foundIndex] = { ...todos[foundIndex], ...body }
    res.status(200).send("item updated")
});


// delete an item on the list
app.delete("/api/todo/:id", (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.status(400).send("ERR: invalid Id")
    };


    const foundIndex = todos.findIndex((todo) => todo.id === parseInt(id))

    if (foundIndex === -1) {
        return res.status(404).send("ERR: todo item not found!")
    }
    todos.splice(foundIndex, 1)
    res.status(200).send("item deleted")

});


app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})