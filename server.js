const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.static('public'));
app.use(express.json());

// Initialize data if missing
if (!fs.existsSync(DATA_FILE)) {
    const initialData = [
        { name: 'Google', url: 'https://google.com', category: 'External' }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

app.get('/api/links', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(data);
});

app.post('/api/links', (req, res) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
});

app.get('/api/status', async (req, res) => {
    const { url: urlString } = req.query;
    if (!urlString) return res.status(400).send('Missing URL');

    let responded = false;
    const sendResponse = (online) => {
        if (responded) return;
        responded = true;
        res.json({ online });
    };

    const checkUrl = (targetUrl) => {
        try {
            const url = new URL(targetUrl);
            const protocol = url.protocol === 'https:' ? https : http;
            
            const options = {
                method: 'GET',
                timeout: 5000,
                rejectUnauthorized: false,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) HomeServerDashboard/1.0'
                }
            };

            const checkReq = protocol.get(targetUrl, options, (checkRes) => {
                // Follow one level of redirect (common for routers)
                if ([301, 302, 307, 308].includes(checkRes.statusCode) && checkRes.headers.location) {
                    let redirectUrl = checkRes.headers.location;
                    if (!redirectUrl.startsWith('http')) {
                        redirectUrl = new URL(redirectUrl, targetUrl).href;
                    }
                    checkRes.resume();
                    return checkUrl(redirectUrl);
                }

                sendResponse(checkRes.statusCode < 500);
                checkRes.resume();
            });

            checkReq.on('error', (err) => {
                console.error(`Status check error for ${urlString}:`, err.message);
                sendResponse(false);
            });

            checkReq.on('timeout', () => {
                console.warn(`Status check timeout for ${urlString}`);
                checkReq.destroy();
                sendResponse(false);
            });

        } catch (err) {
            console.error(`Status check invalid URL ${targetUrl}:`, err.message);
            sendResponse(false);
        }
    };

    checkUrl(urlString);
});

app.listen(PORT, '0.0.0.0', () => {

    console.log(`Server running at http://0.0.0.0:${PORT}`);

});
