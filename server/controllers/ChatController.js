import Chat from "../models/ChatModel";


const newChat = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        console.log("Received data:", req.body);
        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const chat = new Chat({ senderId, receiverId });

        await chat.save();

        res.status(201).json({ message: "Chat created successfully", chat });

    } catch (error) {
        console.error("Error creating chat:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export { newChat };