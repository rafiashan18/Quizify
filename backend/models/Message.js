const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" }, // Tracks resolution status
    adminReply: { type: String, default: "" }, 
    repliedAt: { type: Date } 
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
