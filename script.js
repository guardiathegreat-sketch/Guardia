// Load the character image from the uploaded file
async function loadImage() {
    try {
        const imageData = await window.fs.readFile('image.png');
        const blob = new Blob([imageData], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        document.getElementById('chatIcon').src = url;
        document.getElementById('headerIcon').src = url;
    } catch (error) {
        console.log('Using default image');
        // If you want to use a different image path, set it here:
        // document.getElementById('chatIcon').src = 'path/to/your/image.png';
        // document.getElementById('headerIcon').src = 'path/to/your/image.png';
    }
}

loadImage();

const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatOptions = document.getElementById('chatOptions');
const typingIndicator = document.getElementById('typingIndicator');

const responses = {
    help: {
        bot: "I'd be happy to help! What do you need assistance with?",
        options: [
            { text: "Technical issues", response: "tech" },
            { text: "Account questions", response: "account" },
            { text: "General inquiry", response: "general" }
        ]
    },
    info: {
        bot: "We're here to provide excellent support! Our team is available 24/7 to help with any questions you might have.",
        options: [
            { text: "Learn about features", response: "features" },
            { text: "Pricing information", response: "pricing" },
            { text: "Back to main menu", response: "menu" }
        ]
    },
    contact: {
        bot: "You can reach us at support@example.com or call us at 1-800-SUPPORT. We typically respond within 24 hours!",
        options: [
            { text: "Send an email", response: "email" },
            { text: "Schedule a call", response: "call" },
            { text: "Back to main menu", response: "menu" }
        ]
    },
    tech: {
        bot: "I can help with technical issues. Try clearing your cache, updating your browser, or restarting your device. Still having problems?",
        options: [
            { text: "It worked!", response: "thanks" },
            { text: "Still need help", response: "escalate" },
            { text: "Back", response: "help" }
        ]
    },
    account: {
        bot: "For account-related questions, you can reset your password, update your profile, or manage your subscription in your account settings.",
        options: [
            { text: "Reset password", response: "password" },
            { text: "Update profile", response: "profile" },
            { text: "Back", response: "help" }
        ]
    },
    general: {
        bot: "What would you like to know about?",
        options: [
            { text: "How it works", response: "how" },
            { text: "Getting started", response: "start" },
            { text: "Back", response: "help" }
        ]
    },
    features: {
        bot: "Our platform offers real-time collaboration, advanced analytics, and seamless integrations with your favorite tools!",
        options: [
            { text: "Sounds great!", response: "thanks" },
            { text: "Tell me more", response: "info" },
            { text: "Back", response: "menu" }
        ]
    },
    pricing: {
        bot: "We offer flexible plans starting at $9.99/month. Enterprise solutions are also available with custom pricing!",
        options: [
            { text: "Sign me up!", response: "signup" },
            { text: "Compare plans", response: "plans" },
            { text: "Back", response: "menu" }
        ]
    },
    thanks: {
        bot: "Great! I'm glad I could help. Is there anything else you need?",
        options: [
            { text: "Yes, another question", response: "menu" },
            { text: "No, thank you!", response: "end" }
        ]
    },
    escalate: {
        bot: "I'll connect you with a specialist. Please click 'Contact Support' and our team will get back to you shortly!",
        options: [
            { text: "Contact support", response: "contact" },
            { text: "Back to main menu", response: "menu" }
        ]
    },
    menu: {
        bot: "How can I assist you?",
        options: [
            { text: "I need help", response: "help" },
            { text: "Tell me more", response: "info" },
            { text: "Contact support", response: "contact" }
        ]
    },
    end: {
        bot: "Thank you for chatting with us! Have a wonderful day! 😊",
        options: [
            { text: "Start over", response: "menu" }
        ]
    }
};

chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
});

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    typingIndicator.classList.add('active');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
    typingIndicator.classList.remove('active');
}

function updateOptions(options) {
    chatOptions.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option.text;
        button.dataset.response = option.response;
        chatOptions.appendChild(button);
    });
}

chatOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('option-button')) {
        const responseKey = e.target.dataset.response;
        const userText = e.target.textContent;
        
        addMessage(userText, true);
        
        showTyping();
        
        setTimeout(() => {
            hideTyping();
            const response = responses[responseKey];
            if (response) {
                addMessage(response.bot);
                updateOptions(response.options);
            }
        }, 1000);
    }
});
