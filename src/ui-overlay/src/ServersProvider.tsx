import {createContext, PropsWithChildren, useContext, useMemo, useState} from "react";

interface ServerContextProps {
    selected: string;
    servers: string[];
    select: (val: string) => void;
}
const ServerContext = createContext<ServerContextProps>({
    select: () => undefined,
    selected: '',
    servers: []
});

export function ServersProvider({ servers, children }: PropsWithChildren<{ servers: string[] }>) {
    const [selected, select] = useState<string>(servers[0]);

    const value: ServerContextProps = useMemo(() => ({
        selected,
        servers,
        select,
    }), [select, servers]);

    return <ServerContext.Provider value={value}>
        {children}
    </ServerContext.Provider>
}

export function useServer() {
    return useContext(ServerContext).selected;
}

export function useSelectionServer() {
    const { select, servers } = useContext(ServerContext);

    return {
        select,
        servers
    };
}

