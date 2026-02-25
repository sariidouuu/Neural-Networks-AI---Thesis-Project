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

/* - BUTTON FOR SENDING THE PROMPT - */
const sendBtn = document.getElementById('send-btn');
sendBtn.addEventListener('click', handleSend);


/* ── MODEL SELECTOR ──*/
const modelBtn      = document.getElementById('model-btn');
const modelDropdown = document.getElementById('model-dropdown');
const modelOptions  = document.querySelectorAll('.model-option');

// Φόρτωσε την αποθηκευμένη επιλογή (default: 1)
let selectedModel = localStorage.getItem('selectedModel') || '1';
updateModelSelection();

modelBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    modelDropdown.classList.toggle('open');
});

// Κλείσε το dropdown αν κάνεις click αλλού
document.addEventListener('click', function () {
    modelDropdown.classList.remove('open');
});

modelOptions.forEach(function (option) {
    option.addEventListener('click', function () {
        selectedModel = this.getAttribute('data-model');
        localStorage.setItem('selectedModel', selectedModel);
        updateModelSelection();
        modelDropdown.classList.remove('open');
    });
});

function updateModelSelection() {
    modelOptions.forEach(function (option) {
        if (option.getAttribute('data-model') === selectedModel) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
}

// ── Ενημέρωσε την getAIResponse να "ξέρει" ποιο μοντέλο είναι ενεργό ──
function getAIResponse(userPrompt) {
    // Όταν εκπαιδεύσεις τα μοντέλα, αντικατέστησε εδώ με τα API calls
    // if (selectedModel === '1') { return model1.predict(userPrompt); }
    // if (selectedModel === '2') { return model2.predict(userPrompt); }
    return "I'm sorry, I'm not trained yet.";
}