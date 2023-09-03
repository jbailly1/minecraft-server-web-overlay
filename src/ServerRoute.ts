import express from "express";
import Servers from './Servers';

export const serverRoute = express.Router();

function extractServerId(req: express.Request): string {
    return req.baseUrl.replace('/server/', '');
}

serverRoute.use('/', (req, res, next) => {
    const serverId = extractServerId(req);
    if (serverId && Servers.contains(`${serverId}`)) {
        next();
    } else {
        res.sendStatus(404);
    }
})
serverRoute.get('/started', (req, res) => {
    const serverId = extractServerId(req);
    res.send(Servers.get(`${serverId}`).process !== undefined);
});

serverRoute.get('/outputs', (req, res) => {
    const serverId = extractServerId(req);
    res.send(Servers.get(`${serverId}`).outputs.slice().reverse());
});

serverRoute.get('/config', (req, res) => {
    const serverId = extractServerId(req);
    res.send(Servers.get(`${serverId}`).config);
});

serverRoute.post('/start', (req, res) => {
    const serverId = extractServerId(req);
    if (Servers.isStarted(serverId)) {
        console.error('Already server process running', serverId);
        res.sendStatus(409);
    } else {
        Servers.createMinecraftProcess(serverId);
        res.sendStatus(200);
    }
});

serverRoute.post('/stop', (req, res) => {
    const serverId = extractServerId(req);
    if (!Servers.isStarted(serverId)) {
        console.error('Can not stop server', serverId);
        res.sendStatus(409);
    } else {
        Servers.stopServer(serverId).then(r => res.send(200));
    }
});

serverRoute.post('/send', (req, res) => {
    const serverId = extractServerId(req);
    Servers.send(serverId, `${req.query.command}`);
    res.sendStatus(200);
});

serverRoute.post('/save', (req, res) => {
    const serverId = extractServerId(req);
    if (!Servers.isStarted(serverId)) {
        console.error('Can not stop server', serverId);
        res.sendStatus(409);
    } else {
        Servers.send(serverId, 'save-all');
        res.sendStatus(200);
    }
});

serverRoute.post('/clear', (req, res) => {
    const serverId = extractServerId(req);
    if (!Servers.isStarted(serverId)) {
        console.error('Can not stop server', serverId);
        res.sendStatus(409);
    } else {
        Servers.get(serverId).outputs = [];
        res.sendStatus(200);
    }
});
