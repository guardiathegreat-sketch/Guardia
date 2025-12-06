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

// real visitor counter using storage
async function initVisitorCount() {
    const counter = document.getElementById('visitor-count');
    if (!counter) return;
    
    try {
        // get current count
        let result = await window.storage.get('visitor-count', true);
        let count = result ? parseInt(result.value) : 0;
        
        // increment by 1 for this visit
        count += 1;
        
        // save new count
        await window.storage.set('visitor-count', count.toString(), true);
        
        // display it
        counter.textContent = count;
    } catch (error) {
        // if storage fails, just show a default number
        counter.textContent = '1337';
        console.log('Storage not available');
    }
}

// initialize counter when page loads
window.addEventListener('load', initVisitorCount);

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

