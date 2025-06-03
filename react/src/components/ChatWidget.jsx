import React, { useState } from 'react';
import LiveChat from './LiveChat';

export default function ChatWidget() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {open && <LiveChat onClose={() => setOpen(false)} />}
            <button
                onClick={() => setOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#007bff',
                    color: 'white',
                    fontSize: '24px',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    zIndex: 1000,
                    cursor: 'pointer'
                }}
            >
                💬
            </button>
        </>
    );
}
