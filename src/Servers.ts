import {getConfiguration, ServerConfig} from "./Configuration";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";

export interface ServerProcess {
    config: ServerConfig;
    outputs: string[];
    process?: ChildProcessWithoutNullStreams;
}

class Servers {
    private readonly servers: Map<string, ServerProcess> = new Map();
    public get serverIds(): string[] {
        return Array.from(this.servers.keys());
    }

    constructor() {
        const configuration = getConfiguration();
        console.log(configuration);

        for (const server of configuration.servers) {
            this.servers.set(server.JarFile, {
                config: server,
                outputs: []
            });
        }
    }

    public contains(serverId: string): boolean {
        return this.servers.has(serverId);
    }

    public isStarted(serverId: string): boolean {
        return this.getProcess(serverId) !== undefined;
    }

    public get(serverId: string): ServerProcess {
        return this.servers.get(serverId)!;
    }

    public createMinecraftProcess(serverId: string): void {
        const { config, outputs } = this.get(serverId);
        console.log('Start server with this config', config);
        const mineCraftProcess = spawn('java', [
            ...config.JavaOptions,
            '-jar',
            config.JarFile,
            ...config.ServerOptions]);

        mineCraftProcess.stdout.on('data', data => {
            console.log(`child data:\n${data}`);
            outputs.push(`${data}`);
        });

        mineCraftProcess.stderr.on('data', (data) => {
            console.error(`child stderr:\n${data}`);
            outputs.push(`Error -- ${data}`);
        });

        this.servers.set(serverId, {
            config,
            outputs,
            process: mineCraftProcess
        });
    }

    public async stopServer(serverId: string): Promise<void> {
        return new Promise(resolve => {
            this.getProcess(serverId)?.on('stop', () => {
                const server = this.get(serverId);
                server.process = undefined;
                resolve();
            });
            this.sendAsync(serverId, 'exit');
        });
    }

    public sendAsync(serverId: string, command: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getProcess(serverId)?.stdin.write(command + '\n', (error) => {
                if (!error) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }

    public send(serverId: string, command: string): void {
       this.getProcess(serverId)?.stdin.write(command + '\n', (error) => {
           if (error) {
               console.error(error);
           }
       });
    }

    private getProcess(serverId: string): ChildProcessWithoutNullStreams | undefined {
        return this.servers.get(serverId)!.process;
    }
}

export default new Servers();
