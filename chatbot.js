import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);

    const handleSendMessage = async () => {
        try {
            const res = await axios.post('http://localhost:3001/api/chatgpt', { message });
            setResponses([...responses, { user: message, bot: res.data.response }]);
            setMessage('');
        } catch (error) {
            console.error("Error fetching response:", error);
        }
    };

    return (
        <div>
            <div>
                {responses.map((msg, index) => (
                    <div key={index}>
                        <div><strong>User:</strong> {msg.user}</div>
                        <div><strong>Bot:</strong> {msg.bot}</div>
                    </div>
                ))}
            </div>
            <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Ask about a job..." />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chatbot;
