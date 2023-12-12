import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { dogName } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const initialMsg = `Hola!! Soy ${dogName}, guau 🐾 ¡Porfavor Adoptame!`;
    setMessages([{ text: initialMsg, sender: 'dog' }]);
  }, [dogName]);

  const handleSendMessage = () => {
    if (message) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage(''); 

      setTimeout(() => {
        const dogResponse = 'Guau';
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: dogResponse, sender: 'dog' },
        ]);
      }, 1000);
    }
  };

  return (
    <div>
      <h1>Chat con {dogName}</h1>
      <div className="chat">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 'user' ? 'user-message' : 'dog-message'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div >
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={message}
            style={{ width: '500px', height: '36px' }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className='boton' onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;