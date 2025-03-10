function sendMessage() {
    let msg = document.getElementById("chat-input").value;
    if (msg) {
        let chatBox = document.getElementById("messages");
        let newMsg = document.createElement("p");
        newMsg.innerHTML = msg + ' <span onclick="react(this)">❤️</span>';
        chatBox.appendChild(newMsg);
        document.getElementById("chat-input").value = "";
    }
}

function react(element) {
    alert("You reacted with ❤️!");
}
