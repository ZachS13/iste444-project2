const fs = require('fs');
const path = require('path');

// Ensure the log folder exists
const logDir = path.join(__dirname, 'log');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFilePath = path.join(logDir, 'server.log');

function logRequest({ endpoint, userId }) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] Endpoint: ${endpoint} | User ID: ${userId}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) console.error("Logging error:", err);
  });
}

module.exports = { logRequest };
