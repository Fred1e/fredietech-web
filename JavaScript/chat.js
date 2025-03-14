let isDarkMode = true;

function toggleTheme() {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.body.style.backgroundColor = "var(--bg-dark)";
    document.body.style.color = "var(--text-dark)";
    document.querySelector("#chat-container").style.background = "var(--chat-bg-dark)";
    document.querySelector("#input-area").style.background = "var(--header-dark)";
    document.getElementById("theme-toggle").textContent = "Switch to Light Mode";
  } else {
    document.body.style.backgroundColor = "var(--bg-light)";
    document.body.style.color = "var(--text-light)";
    document.querySelector("#chat-container").style.background = "var(--chat-bg-light)";
    document.querySelector("#input-area").style.background = "var(--header-light)";
    document.getElementById("theme-toggle").textContent = "Switch to Dark Mode";
  }
}

async function getAIResponse(userMessage) {
  try {
    const response = await fetch(`https://keith-api.vercel.app/ai/gpt?q=${encodeURIComponent(userMessage)}`);
    const data = await response.json();
    return data.response || "I'm here to help with your questions about programming, chatbots, or media.";
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return "I'm sorry, but I couldn't process your request at the moment.";
  }
}

async function sendMessage() {
  const input = document.getElementById("chat-input");
  const messageText = input.value.trim();
  if (!messageText) return;

  addMessage(messageText, "user-message");
  input.value = "";

  const aiResponse = await getAIResponse(messageText);
  addMessage(aiResponse, "ai-message");
}

function addMessage(text, type) {
  const messagesContainer = document.getElementById("messages");
  const messageElem = document.createElement("div");
  messageElem.classList.add("message", type);
  messageElem.textContent = text;
  messagesContainer.appendChild(messageElem);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Handle file attachment (images and audio)
document.getElementById("file-input").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const mediaURL = e.target.result;
    addMediaMessage(mediaURL, file.type);
  };
  reader.readAsDataURL(file);
});

function addMediaMessage(mediaURL, type) {
  const messagesContainer = document.getElementById("messages");
  const mediaElem = document.createElement("div");
  mediaElem.classList.add("message", "user-message", "media-message");

  if (type.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = mediaURL;
        img.alt = "User attached image";
        mediaElem.appendChild(img);
      } else if(type.startsWith("audio/")) {
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = mediaURL;
        mediaElem.appendChild(audio);
      } else {
        mediaElem.textContent = "Unsupported media type.";
      }
      
      messagesContainer.appendChild(mediaElem);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
