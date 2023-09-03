import express from 'express';
import * as path from "path";
import * as process from "process";
import {serverRoute} from "./ServerRoute";
import Servers from "./Servers";
const app = express();
const port = process.argv[2] ?? 3000;

app.use('/server/:id', serverRoute);

app.use(express.static(path.join(__dirname, 'ui')));

app.get('/servers', (req, res) => {
    res.send(Servers.serverIds);
})

app.listen(port, () => {
    console.log('Minecraft overlay web listen to', port);
});
