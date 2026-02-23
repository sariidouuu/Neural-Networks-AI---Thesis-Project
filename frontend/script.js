const chatArea    = document.getElementById('chat-area');
const promptInput = document.getElementById('prompt-input');

// ── AI Response ──
// Replace this function with your trained model's API call in the future
function getAIResponse(userPrompt) {
    return "I'm sorry, I'm not trained yet.";
}

    // ── Add a message bubble to the chat ──
    function addMessage(text, type) {
    const row = document.createElement('div');
    row.classList.add('message-row', type === 'prompt' ? 'prompt-row' : 'answer-row');

    const bubble = document.createElement('div');
    bubble.classList.add('bubble', type === 'prompt' ? 'prompt-bubble' : 'answer-bubble');

    const label = document.createElement('div');
    label.classList.add('bubble-label');
    label.textContent = type === 'prompt' ? 'You' : 'AI';

    const content = document.createElement('div');
    content.textContent = text;

    bubble.appendChild(label);
    bubble.appendChild(content);
    row.appendChild(bubble);
    chatArea.appendChild(row);

    // Scroll to the latest message
    chatArea.scrollTop = chatArea.scrollHeight;
}

// ── Send the prompt ──
function handleSend() {
    const text = promptInput.value.trim();
    if (!text) return;

    addMessage(text, 'prompt');

    promptInput.value = '';
    promptInput.style.height = 'auto';

  // Small delay to simulate AI "thinking"
    setTimeout(() => {
    const response = getAIResponse(text);
    addMessage(response, 'answer');
    }, 400);
}

// ── Keyboard events ──
// Enter = send | Shift+Enter = new line
promptInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
    }
});

// ── Auto-grow textarea as user types ──
promptInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 140) + 'px';
});