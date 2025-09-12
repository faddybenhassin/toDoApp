import mongoose from "mongoose"




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

export default todoModel;