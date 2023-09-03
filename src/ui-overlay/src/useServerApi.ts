import {useServer} from "./ServersProvider";
import {useCallback} from "react";

export function useServerApi() {
    const serverId = useServer();

    const createEndpoint = useCallback((endpoint: string) => {
        return `/server/${serverId}/${endpoint}`;
    }, [serverId]);

    return createEndpoint;
}
