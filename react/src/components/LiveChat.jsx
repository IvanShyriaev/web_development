import React, { useState, useEffect, useRef } from 'react';

export default function LiveChat({ onClose }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:8000/ws/chat/support/');

        socketRef.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessages((prev) => [...prev, { text: data.message, sender: 'ai' }]);
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => socketRef.current.close();
    }, []);

    const sendMessage = () => {
        if (input.trim() !== '') {
            const message = { text: input, sender: 'user' };
            socketRef.current.send(JSON.stringify({ message: input }));
            setMessages((prev) => [...prev, message]);
            setInput('');
        }
    };

    return (
        <div
            className="live-chat"
            style={{
                position: 'fixed',
                bottom: '90px',
                right: '20px',
                width: '300px',
                height: '350px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '8px',
                zIndex: 999,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
        >
            <div style={{ padding: '5px', borderBottom: '1px solid #ccc', textAlign: 'right' }}>
                <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '16px' }}>✕</button>
            </div>
            <div
                className="chat-box"
                style={{
                    flex: 1,
                    padding: '10px',
                    overflowY: 'auto',
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: '8px',
                            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#f1f8e9',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            maxWidth: '80%'
                        }}
                    >
                        {msg.sender === 'ai' && <strong>AI: </strong>}
                        {msg.sender === 'user' && <strong>Ви: </strong>}
                        {msg.text}
                    </div>
                ))}
            </div>
            <div
                className="chat-input"
                style={{ display: 'flex', padding: '10px' }}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    style={{ flex: 1, marginRight: '5px' }}
                />
                <button onClick={sendMessage}>➤</button>
            </div>
        </div>
    );
}

