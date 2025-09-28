import './chatBot.css'
import { useState, useEffect, useRef } from 'react'

export default function ChatBot() {
    const [chat, setChat] = useState(false);
    const [closing, setClosing] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { sender: "HokieBot", text: "Welcome to HokieBot! How may I help you?" }
    ]);

    // INTEGRATION: Added state for loading and API integration
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const API_BASE_URL = 'http://localhost:5000/api';

    // INTEGRATION: Enhanced handleSend to integrate with Databricks API
    const handleSend = async (e) => {
        e.preventDefault();
        if (input.trim() === "" || isLoading) return;
        
        const userMessage = input.trim();
        setInput("");
        setIsLoading(true);
        
        // Add user message immediately
        setMessages((prev) => [...prev, { sender: "You", text: userMessage }]);
        
        try {
            // INTEGRATION: Send message to backend API which connects to Databricks
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Add bot response from Databricks
            setMessages((prev) => [...prev, { 
                sender: "HokieBot", 
                text: data.response || "Sorry, I couldn't process your request." 
            }]);
            
        } catch (error) {
            console.error('INTEGRATION: Error sending message to Databricks:', error);
            setMessages((prev) => [...prev, { 
                sender: "HokieBot", 
                text: "Sorry, I'm having trouble connecting to the server. Please try again later." 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const hasUserMessage = messages.some((msg) => msg.sender === "You");

    // INTEGRATION: Quick action handler for pre-defined messages
    const handleQuickAction = (action) => {
        if (isLoading) return;
        
        const actionMessages = {
            "Schedule Tour": "I'd like to schedule a tour of the housing options.",
            "Pricing & Availability": "Can you show me pricing and availability for housing?",
            "Office Hours": "What are the office hours for housing services?",
            "Apply Online": "How can I apply online for housing?",
            "Pet Policy": "What is the pet policy for on-campus housing?",
            "Amenities": "What amenities are available in the housing options?",
            "Current Resident": "I'm a current resident and need help with housing."
        };
        
        const message = actionMessages[action];
        if (message) {
            setInput(message);
        }
    };

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
                            {/* INTEGRATION: Added onClick handlers to make buttons interactive */}
                            <button onClick={() => handleQuickAction("Schedule Tour")}>Schedule Tour</button>
                            <button onClick={() => handleQuickAction("Pricing & Availability")}>Pricing & Availability</button>
                            <button onClick={() => handleQuickAction("Office Hours")}>Office Hours</button>
                            <button onClick={() => handleQuickAction("Apply Online")}>Apply Online</button>
                            <button onClick={() => handleQuickAction("Pet Policy")}>Pet Policy</button>
                            <button onClick={() => handleQuickAction("Amenities")}>Amenities</button>
                            <button onClick={() => handleQuickAction("Current Resident")}>Current Resident</button>
                        </div>
                    )}
                    <form className="chatForm" onSubmit={handleSend}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isLoading ? "HokieBot is typing..." : "Ask me a question..."}
                            disabled={isLoading}
                        />
                        {/* INTEGRATION: Enhanced button with loading state */}
                        <button type="submit" disabled={isLoading || input.trim() === ""}>
                            {isLoading ? "..." : "➤"}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="chatLauncher" onClick={() => setChat(true)}>
                    💬 Chat
                </div>
            )}
        </div>
    );
}
