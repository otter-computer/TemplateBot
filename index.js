const Bot = require('./Bot');
const express = require('express');

const TemplateBot = new Bot();

// Start webserver
// Required for running on Azure WebApp
const webserver = express();
webserver.get('/', (req, res) => res.send('ping'));
webserver.listen(8080, () => {});

// Handle graceful shutdowns
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

function cleanup() {
  TemplateBot.destroy();
  process.exit();
}

TemplateBot.connect();
