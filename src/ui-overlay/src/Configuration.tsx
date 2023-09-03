import {createContext, PropsWithChildren, useContext} from "react";
import {ServerConfig} from "../../Configuration";

const ConfigContext = createContext<ServerConfig | undefined>(undefined);

interface Props {
    config: ServerConfig;
}
export function ConfigProvider({ config, children }: PropsWithChildren<Props>) {
    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export function useConfiguration(): ServerConfig {
    return useContext(ConfigContext)!;
}
