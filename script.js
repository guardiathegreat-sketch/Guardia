// page navigation
function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
}

// real visitor counter using server
async function initVisitorCount() {
    const counter = document.getElementById('visitor-count');
    if (!counter) return;
    
    try {
        // increment counter on server
        const response = await fetch('/api/visitor-count', {
            method: 'POST'
        });
        const data = await response.json();
        counter.textContent = data.count;
    } catch (error) {
        // if server fails, try to get current count
        try {
            const response = await fetch('/api/visitor-count');
            const data = await response.json();
            counter.textContent = data.count;
        } catch (err) {
            counter.textContent = '∞';
            console.log('Server not available');
        }
    }
}

// initialize counter when page loads
window.addEventListener('load', initVisitorCount);

function WindowsDownload() {
    const msgElement = document.getElementById('download-msg');
    const btn = document.querySelector('.downloadWin-btn');
    const originalText = btn.textContent;
    
    btn.textContent = "DOWNLOADING...";
    msgElement.textContent = "Starting download...";

    // Create a hidden link and trigger GitHub download
    const link = document.createElement('a');
    link.href = 'https://github.com/guardiathegreat-sketch/Guardia/releases/download/Windows/WinBa.zip';
    link.download = 'WinBa.zip';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
        btn.textContent = originalText;
        msgElement.textContent = "Download started! Check your downloads folder 😎";
    }, 1000);
}


// easter egg: konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.transform = 'rotate(180deg)';
        alert("congrats u found the secret code!!! now everything is upside down lol");
        setTimeout(() => {
            document.body.style.transform = 'rotate(0deg)';
        }, 5000);
    }
});

// make title blink colors
function randomColor() {
    const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
}

setInterval(() => {
    const title = document.querySelector('.main-title');
    if (title) {
        title.style.color = randomColor();
    }

}, 500);

// CHATBOT FUNCTIONS
let chatbotOpen = false;

function toggleChatbot() {
    const container = document.getElementById('chatbot-container');
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        container.classList.remove('chatbot-closed');
        container.classList.add('chatbot-open');
        // Add welcome message if first time opening
        const messagesDiv = document.getElementById('chatbot-messages');
        if (messagesDiv.children.length === 0) {
            addBotMessage("Hello my friend! I am Akull from Indian tech support. How may I help you today? 🙏");
        }
    } else {
        container.classList.remove('chatbot-open');
        container.classList.add('chatbot-closed');
    }
}

function addBotMessage(message) {
    const messagesDiv = document.getElementById('chatbot-messages');
    const botMsg = document.createElement('div');
    botMsg.className = 'bot-message';
    botMsg.textContent = message;
    messagesDiv.appendChild(botMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addUserMessage(message) {
    const messagesDiv = document.getElementById('chatbot-messages');
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.textContent = message;
    messagesDiv.appendChild(userMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function getBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    // Simple responses based on keywords
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')){
        return "Hello friend! Very nice to meet you! How can I be helping you today? 🙏";
    } else if (msg.includes('help') || msg.includes('problem')) {
        return "No worries friend! First, have you tried turning it off and on again? This fixes 99.9% of all problems!";
    } else if (msg.includes('download') || msg.includes('game')) {
        return "Ah yes! Our game is very good! Top quality! Just click the download button and your computer will be very happy!";
    } else if (msg.includes('guardia')) {
        return "Guardia is number one! Best of the best! They dominate everything since 2021! Very legendary!";
    } else if (msg.includes('thanks')) {
        return "No problem friend! Always happy to help! Please come again! 🙏";
    } else if (msg.includes('bye') || msg.includes('goodbye')) {
        return "Goodbye friend! Have a very nice day! Please come back anytime! 🙏";
    } else if (msg.includes('who are you') || msg.includes('your name')) {
        return "I am Rajesh Kumar from Indian tech support! I am here 24/7 to help you with any questions!";
    } else if (msg.includes('computer') || msg.includes('pc')) {
        return "Computer problems? No worries! First step is always restart. Second step is also restart. Very effective method!";
    } else if (msg.includes('slow') || msg.includes('fast')) {
        return "Ah yes! Computer speed issue is very common! Have you tried deleting your cache and cookies? This makes things go zoom zoom!";
    } else if (msg.includes('virus') || msg.includes('malware')) {
        return "Do not worry friend! I am expert in virus removal! Just run disk cleanup and install more RAM! Problem solved!";
    } else if (msg.includes('error') || msg.includes('crash')) {
        return "Error messages are normal friend! They are just computer's way of saying hello! Usually means you need more RAM!";
    } else {
        const randomResponses = [
            "I see I see... very interesting question friend! Let me consult my superior knowledge base...",
            "Ah yes this is common issue! Many people ask this same thing!",
            "Very good question friend! The answer is quite simple actually...",
            "Hmm... Have you checked if everything is plugged in properly first? This is step number one!",
            "Excellent! I am understanding your problem! The solution is coming to my mind now...",
            "You know friend, this is actually very simple fix! Trust me, I have been doing this for very long time!",
            "My supervisor is telling me that your problem can be fixed with one simple trick! Just clear your browser cache!",
            "Ah I see the issue now! You need to update your drivers! This fixes almost everything my friend!",
            "Have you tried using Google Chrome instead? It is much better browser for streaming and downloading!",
            "I am thinking this is maybe Windows Update issue? Let me check my manual here... yes yes, this is it!"
        ];
        return randomResponses[Math.floor(Math.random() * randomResponses.length)];
    }
}

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addUserMessage(message);
    input.value = '';
    
    // Simulate typing delay and add bot response
    setTimeout(() => {
        const response = getBotResponse(message);
        addBotMessage(response);
    }, 800);
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}



