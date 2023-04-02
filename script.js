const chatlog = document.getElementById('chat-log');
const message = document.getElementById('message-input');
const form = document.querySelector('form');
const loadingIcon = document.getElementById('loading-icon');
let messages = [];

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const msgText = message.value;

    if (msgText.trim().length === 0)
        return;
    
    const newMsg = {
        role: "user",
        content: msgText
    };
    message.value = '';
    messages.push(newMsg);

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add('message-sent');
    messageElement.innerHTML = `
        <div class="message-text">${msgText}</div>
    `;
    chatlog.appendChild(messageElement);
    chatlog.scrollTop = chatlog.scrollHeight;
    sendMessage(msgText);
});

const sendMessage = () => {
    loadingIcon.style.display = 'block';
    fetch('http://localhost:3000', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages: messages
        })
    })
    .then(response => response.json())
    .then((data) => {
        const newAssistantMsg = { role: "assistant", content: data.completion.content };
        messages.push(newAssistantMsg);
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add('message-recieved');
        messageElement.innerHTML = `
            <div class="message-text">${data.completion.content}</div>
        `;
        chatlog.appendChild(messageElement);
        chatlog.scrollTop = chatlog.scrollHeight;
        loadingIcon.style.display = 'none';
    })
    .catch((error) => {
        alert("Something went wrong!");
        loadingIcon.style.display = 'none';
    });
};

if (messages.length === 0)
{
    const newMsg = {
        role: "user",
        content: "hello"
    };
    sendMessage([newMsg]);
}