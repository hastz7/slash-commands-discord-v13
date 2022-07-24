const { Client, Collection, Discord } = require('discord.js');
const { token } = require('./src/config/config.json');
const http = require('http');

// new client
const client = new Client({ intents: 32767 });

// new http
http.createServer(function(req, res) {
  res.writeHead(200, { "content-type": "text/html" })
  res.end(`ONLINE!`)
}).listen(8080);

module.exports = client;

client.discord = Discord;
client.commands = new Collection();
client.cmdSlash = new Collection();
client.config = require('./src/config/config.json');

require('./src/handler')(client);

client.login(token);