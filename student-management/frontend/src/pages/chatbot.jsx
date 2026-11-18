
import { useState } from 'react';
import './chatbot.css';

function Chatbot() {

    // Store conversation messages
    const [message, setMessage] = useState([
        {
            role: "assistant",
            content: "Hello! How can I help you?"
        }
    ]);

    // Store user input
    const [input, setInput] = useState("");

    // Send message
    function sendMessage(e) {

        e.preventDefault();

        if (input.trim() === "") return;

        const userMessage = {
            role: "user",
            content: input
        };

        const botMessage = {
            role: "assistant",
            content: "I am a bot, I will answer you soon..."
        };

        setMessage([
            ...message,
            userMessage,
            botMessage
        ]);

        setInput("");
    }

    return (
        <div className="chat-container">

            <h1>AI Chatbot</h1>

            <div className="chat-box">

                {message.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.role}
                    >
                        {msg.content}
                    </div>
                ))}

            </div>

            <form onSubmit={sendMessage}>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />

                <button type="submit">
                    Send
                </button>

            </form>

        </div>
    );
}

export default Chatbot;
