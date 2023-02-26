import {existsSync, readFileSync, writeFileSync} from "fs";
import path from "path";

export interface AppConfig {
    JarFile: string;
    JavaOptions: string[];
    ServerOptions: string[];
}

const defaultConfig = {
    JarFile: 'server.jar',
    JavaOptions: ['-Xmx2G'],
    ServerOptions: ['nogui']
};

const configFile = path.join(__dirname, "config.json");
export function getConfiguration(): AppConfig {
    if (existsSync(configFile)) {
        return JSON.parse(readFileSync(configFile, 'utf-8')) as AppConfig;
    } else {
        writeFileSync(configFile, JSON.stringify(defaultConfig), 'utf-8');
        return defaultConfig;
    }
}

