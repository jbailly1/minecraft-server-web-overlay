import {createContext, PropsWithChildren, useContext} from "react";
import {AppConfig} from "../../Configuration";

const ConfigContext = createContext<AppConfig | undefined>(undefined);

interface Props {
    config: AppConfig;
}
export function ConfigProvider({ config, children }: PropsWithChildren<Props>) {
    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export function useConfiguration(): AppConfig {
    return useContext(ConfigContext)!;
}
