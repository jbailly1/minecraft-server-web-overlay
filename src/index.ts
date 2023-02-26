import express from 'express';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import * as path from "path";
import * as process from "process";
import {getConfiguration} from "./Configuration";
const app = express();
const port = process.argv[2] ?? 3000;

interface MinecraftProcessProps {
    onOutputData: (val: string) => void;
    onErrorData: (val: string) => void;
}

const configuration = getConfiguration();

let minecraftProcessOutPut: string[] = [];
const createMinecraftProcess = ({ onOutputData, onErrorData }: MinecraftProcessProps) => {
    console.log('Start server with this config', configuration);
    const mineCraftProcess = spawn('java', [
        ...configuration.JavaOptions,
        '-jar',
        configuration.JarFile,
        ...configuration.ServerOptions]);

    mineCraftProcess.stdout.on('data', data => {
        console.log(`child data:\n${data}`);
        onOutputData(`${data}`);
    });

    mineCraftProcess.stderr.on('data', (data) => {
        console.error(`child stderr:\n${data}`);
        onErrorData(`${data}`);
    });

    return mineCraftProcess;
}

let mineCraftProcess: ChildProcessWithoutNullStreams | undefined = createMinecraftProcess({
    onOutputData: val => minecraftProcessOutPut.push(val),
    onErrorData: () => undefined,
});

const send = (command: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        mineCraftProcess?.stdin.write(command + '\n', (error) => {
            if (!error) {
                resolve();
            } else {
                reject();
            }
        });
    });
}

app.use(express.static(path.join(__dirname, 'ui')));

app.get("/outputs", (req, res) => {
    res.send(Array.from(minecraftProcessOutPut).reverse());
});

app.get("/isStarted", (req, res) => {
   res.send(mineCraftProcess !== undefined);
});

app.get("/config", (req, res) => {
   res.send(configuration);
});

app.post("/start", (req, res) => {
   if (mineCraftProcess !== undefined) {
       console.error('minecraftprosse running');
       res.sendStatus(409);
   } else {
       mineCraftProcess = createMinecraftProcess({
           onOutputData: val => minecraftProcessOutPut.push(val),
           onErrorData: () => undefined,
       });
       res.sendStatus(200);
   }
});

app.post('/stop', (req, res) => {
   if (mineCraftProcess === undefined) {
       res.sendStatus(409);
   } else {
        send('stop').then(() => {
            mineCraftProcess?.on('exit', () => {
                mineCraftProcess = undefined;
                res.sendStatus(200);
            })
        });
   }
});

app.post("/send", (req, res) => {
    mineCraftProcess?.stdin.write(`${req.query.command}\n`, (error) => {
        if (error) {
            console.error('send failed', error);
        } else {
            console.log('succeed')
        }
    });
    res.sendStatus(200);
});

app.post("/save", (req, res) => {
    mineCraftProcess?.stdin.write(`save-all\n`);
    res.sendStatus(200);
});

app.post("/clear", (req, res) => {
   minecraftProcessOutPut = [];
   res.sendStatus(200);
});

app.listen(port, () => {
    console.log('Minecraft overlay web listen to', port);
});
