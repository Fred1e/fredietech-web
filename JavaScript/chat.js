// JavaScript/chat.js

document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  const messagesContainer = document.getElementById('messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');

  // Load chat history from local storage
  const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
  chatHistory.forEach(({ id, message }) => {
    addMessage(message, id === socket.id ? 'user-message' : 'ai-message');
  });

  // Function to add a message to the chat
  function addMessage(text, type) {
    const messageElem = document.createElement('div');
    messageElem.classList.add('message', type);
    messageElem.textContent = text;
    messagesContainer.appendChild(messageElem);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Function to send a message
  function sendMessage() {
    const messageText = chatInput.value.trim();
    if (!messageText) return;

    addMessage(messageText, 'user-message');
    socket.emit('chat message', messageText);
    chatInput.value = '';
  }

  // Event listener for send button
  sendBtn.addEventListener('click', sendMessage);

  // Event listener for Enter key
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Listen for incoming messages
  socket.on('chat message', ({ id, message }) => {
    addMessage(message, id === socket.id ? 'user-message' : 'ai-message');
    // Update chat history in local storage
    chatHistory.push({ id, message });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  });
});
