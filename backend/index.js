import express from 'express'
import cors from 'cors'
import mongoose from "mongoose"


const PORT = 5000
const app = express()
app.use(express.json())
app.use(cors())



async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/todos'), {
            serverSelectionTimeoutMS: 5000 // stops trying after 5 seconds
        };
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
}

connectDB();


const todoSchema = new mongoose.Schema({
    id: Number,
    text: String,
    isDone: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    }
})

const todoModel = mongoose.model("todos", todoSchema)




// add item to the list
app.post("/api/todo", async (req, res) => {
    const { text } = req.body;
    if (typeof text !== "string" || text.trim().length === 0) {
        return res.status(400).json({ error: "No valid text was sent." });
    }

    try {
        const lastTodo = await todoModel.findOne().sort({ id: -1 });
        const todo = await todoModel.create({
            id: lastTodo ? lastTodo.id + 1 : 1,
            text: text.trim(),
        });
        await todo.save();
        return res.status(201).json({ message: "Item added successfully.", item: todo });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Could not add item." });
    }
});



//get all todo items
app.get("/api/todo", async (req, res) => {
    try {
        const todos = await todoModel.find();
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not fetch todos." });
    }
})



// get a specific todo item
app.get("/api/todo/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID." });
        }

        const todo = await todoModel.findOne({ id: id });

        if (!todo) {
            return res.status(404).json({ error: "Todo item not found." });
        }

        res.json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not fetch todo item." });
    }
})



// edit an item on the list
app.patch("/api/todo/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { text, isDone } = req.body;

        const todo = await todoModel.findOneAndUpdate(
            { id: id },
            { ...(text !== undefined && { text }), ...(isDone !== undefined && { isDone }) },
            { new: true }
        );
        if (!todo) {
            return res.status(404).json({ error: "Todo item not found." });
        }

        return res.status(200).json({ message: "Item updated successfully.", item: todo });
    } catch (error) {
        console.error('Error updating item:', error);
        return res.status(500).json({ error: "Could not update item." });
    }
});


// delete an item on the list
app.delete("/api/todo/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const todo = await todoModel.findOneAndDelete({ id: id });
        if (!todo) {
            return res.status(404).json({ error: "Todo item not found." });
        }

        return res.status(200).json({ message: "Item deleted successfully." });
    } catch (error) {
        console.error('Error deleting item:', error);
        return res.status(500).json({ error: "Could not delete item." });
    }
});


app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})