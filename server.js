const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// File to store visitor count
const counterFile = path.join(__dirname, 'counter.json');

// Initialize counter file if it doesn't exist
if (!fs.existsSync(counterFile)) {
    fs.writeFileSync(counterFile, JSON.stringify({ count: 0 }));
}

// Get current visitor count
app.get('/api/visitor-count', (req, res) => {
    try {
        const data = fs.readFileSync(counterFile, 'utf8');
        const json = JSON.parse(data);
        res.json({ count: json.count });
    } catch (error) {
        res.json({ count: 0 });
    }
});

// Increment visitor count
app.post('/api/visitor-count', (req, res) => {
    try {
        const data = fs.readFileSync(counterFile, 'utf8');
        const json = JSON.parse(data);
        json.count += 1;
        fs.writeFileSync(counterFile, JSON.stringify(json));
        res.json({ count: json.count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update counter' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
