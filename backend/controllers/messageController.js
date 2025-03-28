const Message = require("../models/Message")
const {sendEmail} = require( "../middleware/nodemailer.js");

 //receiving user reply and notifying admin of a new message
const createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();

        await sendEmail(
            process.env.ADMIN_EMAIL, 
            `New Contact Form Submission - ${subject}`,
            `You received a new message from ${name} (${email}): \n\n${message}`,
            `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <p><strong>Message:</strong> ${message}</p>`
        );

        await sendEmail(
            email, 
            "Thank you for contacting us!",
            `Hi ${name},\n\nWe have received your message and will get back to you soon.`,
            `<p>Hi <strong>${name}</strong>,</p>
             <p>We have received your message and will get back to you soon.</p>
             <blockquote>${message}</blockquote>
             <p>Best Regards,<br>Quizify Team</p>`
        );

        res.status(201).json({ success: true, message: "Message saved and emails sent successfully!" });

    } catch (error) {
        console.error("Error saving message or sending email:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};


const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const message = await Message.findById(id);

        if (!message) {
            return res.status(404).json({ success: false, message: "Message not found." });
        }

        await Message.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Message deleted successfully." });
    }
     catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// admin reply  to the user 
const sendReply = async (req, res) => {
    try {
        const { id } = req.params; 
        const { reply } = req.body; 

        if (!reply) {
            return res.status(400).json({ success: false, message: "Reply cannot be empty." });
        }

        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ success: false, message: "Message not found." });
        }

        message.adminReply = reply;
        message.status = "resolved";
        message.repliedAt = new Date();
        await message.save();
        console.log(message)

        const emailBody = `Hello,

        You recently reached out to us with the following query:
        
        "${message.message}"
        
        Here is our response:
        "${reply}"
        
        Best regards,  
        Quizify Team  
        For more queries, contact us at rafiashan123456789@gmail.com.`;
        
        await sendEmail(message.email, message.subject, emailBody);
        
        res.status(200).json({
            success: true,
            message: "Reply sent successfully and email notification sent.",
            data: message,
        });

    } catch (error) {
        console.error("Error sending reply:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

// Whether the user query is resolved/pending
const resolveMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ success: false, message: "Message not found." });
        }

        const newStatus = message.status === "pending" ? "resolved" : "pending";

        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { status: newStatus },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: `Message status updated to ${newStatus}.`,
            data: updatedMessage,
        });
    } catch (error) {
        console.error("Error updating message status:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

//showing all the messages 
const showAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }); // Fetch all messages, newest first

        res.status(200).json({
            success: true,
            message: messages.length ? "Messages retrieved successfully." : "No queries received yet.",
            data: messages,
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};

module.exports={
    createMessage,
    deleteMessage,
    sendReply,
    resolveMessage,
    showAllMessages
}