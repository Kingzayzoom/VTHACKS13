import './chatBot.css'
import { useState, useEffect, useRef } from 'react'

export default function ChatBot() {
    const [chat, setChat] = useState(false);
    const [closing, setClosing] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { sender: "HokieBot", text: "Welcome to HokieBot! How may I help you?" }
    ]);

    const messagesEndRef = useRef(null);

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim() === "") return;
        setMessages((prev) => [...prev, { sender: "You", text: input }]);
        setInput("");
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const hasUserMessage = messages.some((msg) => msg.sender === "You");

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setChat(false);
            setClosing(false);
        }, 400);
    };

    return (
        <div className="chatWrapper">
            {chat ? (
                <div className={`chatWindow ${closing ? "slideDown" : "slideUp"}`}>
                    <div className="chatHeader">
                        <span>HokieBot</span>
                        <button onClick={handleClose}>−</button>
                    </div>
                    <div className="messages">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`message ${msg.sender === "You" ? "user" : "bot"}`}
                            >
                                <strong>{msg.sender}:</strong> {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    {!hasUserMessage && (
                        <div className="options">
                            <button>Schedule Tour</button>
                            <button>Pricing & Availability</button>
                            <button>Office Hours</button>
                            <button>Apply Online</button>
                            <button>Pet Policy</button>
                            <button>Amenities</button>
                            <button>Current Resident</button>
                        </div>
                    )}
                    <form className="chatForm" onSubmit={handleSend}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me a question..."
                        />
                        <button type="submit">➤</button>
                    </form>
                </div>
            ) : (
                <div className="chatLauncher" onClick={() => setChat(true)}>
                    💬
                </div>
            )}
        </div>
    );
}
