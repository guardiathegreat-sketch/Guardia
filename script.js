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

// fake visitor counter that goes up randomly
function updateVisitorCount() {
    const counter = document.getElementById('visitor-count');
    if (counter) {
        let count = parseInt(counter.textContent);
        count += Math.floor(Math.random() * 10) + 1;
        counter.textContent = count;
    }
}

// update visitor count every 3 seconds
setInterval(updateVisitorCount, 3000);

// fake download function
function fakeDownload() {
    const messages = [
        "downloading... just kidding lol",
        "ERROR: file not found (we never made the game)",
        "downloading... 0% complete... still 0%... yeah its not real",
        "VIRUS DETECTED jk there's nothing to download",
        "download complete! (it downloaded nothing)",
        "connecting to server... server doesn't exist lmao"
    ];
    
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    const msgElement = document.getElementById('download-msg');
    msgElement.textContent = randomMsg;
    
    // change button text temporarily
    const btn = document.querySelector('.download-btn');
    const originalText = btn.textContent;
    btn.textContent = "DOWNLOADING...";
    
    setTimeout(() => {
        btn.textContent = originalText;
    }, 2000);
}

// random alert on page load (annoying but goofy)
window.addEventListener('load', () => {
    setTimeout(() => {
        const shouldAlert = Math.random() > 0.5;
        if (shouldAlert) {
            alert("welcome to our epic website!!! 😎");
        }
    }, 1000);
});

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