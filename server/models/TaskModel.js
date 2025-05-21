import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "New task",
    },
},
{
    timestamps: true,
});

export default mongoose.model("Task", taskSchema);
