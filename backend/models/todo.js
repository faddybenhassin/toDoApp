import mongoose from "mongoose"




const todoSchema = new mongoose.Schema({
    id: Number,
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    text: String,
    desc: String,
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