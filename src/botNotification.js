const { Client, GatewayIntentBits, bold } = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');
const client = new Client({ intents: [GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.Guilds] });

const app = express();
const port = process.argv[2] ?? 3001;
const botToken = process.argv[3];

app.use(bodyParser.json());
client.login(botToken);


// Web Server Setup
app.post('/minecraft-2bum', (req, res) => {
	const { serverId, channelId } = req.body;

	// Send a message to the Discord channel
	const server = client.guilds.cache.get(serverId);
	if (server) {
		const channel = server.channels.cache.get(channelId);
		if (channel) {
			channel.send(`I'ya 2 bum aussi. Il y en a 3 qui sont impliqués.`);
		}
	}

	res.status(200).send('Event received and processed.');
});

app.post('/minecraft-join', (req, res) => {
	const { serverId, channelId, player_name } = req.body;

	// Send a message to the Discord channel
	const server = client.guilds.cache.get(serverId);
	if (server) {
		const channel = server.channels.cache.get(channelId);
		if (channel) {
			channel.send(`Un pti baveux ${bold(player_name)} vient d'arriver`);
		}
	}

	res.status(200).send('Event received and processed.');
});

app.post('/minecraft-left', (req, res) => {
	const { serverId, channelId, player_name } = req.body;


	// Send a message to the Discord channel
	const server = client.guilds.cache.get(serverId);
	if (server) {
		const channel = server.channels.cache.get(channelId);
		if (channel) {
			channel.send(`Le pti baveux ${bold(player_name)} vient de partir`);
		}
	}

	res.status(200).send('Event received and processed.');
});

app.post('/open-bot', async (req, res) => {

	await new Promise((resolve) => {
		client.on('ready', () => {
			console.log(`Logged in as ${client.user.tag}`);
			resolve();
		});
	})

	res.status(200).send('Event received and processed.');
});

app.post('/close-bot', (req, res) => {
	res.status(200).send('Close bot');
});

app.listen(port, () => {
	console.log(`Web server listening on port ${port}`);
});
