import express from "express"
import todoModel from "../models/todo.js";
import { verifyToken } from "../middleware/verify.js";

const router = express.Router()


// add item to the list
router.post("/api/todo", verifyToken, async (req, res) => {
    const { text, desc } = req.body;
    if (typeof text !== "string" || text.trim().length === 0) {
        return res.status(400).json({ error: "No valid text provided." });
    }

    try {
        const lastTodo = await todoModel.findOne({ userId: req.user.id }).sort({ id: -1 });
        const todo = await todoModel.create({
            id: lastTodo ? lastTodo.id + 1 : 1,
            text: text.trim(),
            userId: req.user.id,
        });
        await todo.save();
        return res.status(201).json({ message: "Item added successfully.", item: todo });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Could not add item." });
    }
});



//get all todo items
router.get("/api/todo", verifyToken, async (req, res) => {
    try {
        const todos = await todoModel.find({ userId: req.user.id });
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not fetch todos." });
    }
})



// get a specific todo item
router.get("/api/todo/:id", verifyToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID." });
        }

        const todo = await todoModel.findOne({ userId: req.user.id, id: id });

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
router.patch("/api/todo/:id", verifyToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID." });
        }
        const { text, isDone } = req.body;

        const todo = await todoModel.findOneAndUpdate(
            { userId: req.user.id, id: id },
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
router.delete("/api/todo/:id", verifyToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID." });
        }

        const todo = await todoModel.findOneAndDelete({userId: req.user.id, id: id });
        if (!todo) {
            return res.status(404).json({ error: "Todo item not found." });
        }

        return res.status(200).json({ message: "Item deleted successfully." });
    } catch (error) {
        console.error('Error deleting item:', error);
        return res.status(500).json({ error: "Could not delete item." });
    }
});

export default router;
