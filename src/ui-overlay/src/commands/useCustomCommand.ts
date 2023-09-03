import {useServer} from "../ServersProvider";
import {useServerApi} from "../useServerApi";

export function useCustomCommand() {
    const createEndpoint = useServerApi();

    const send = async (command: string) => {
        try {
            await fetch(createEndpoint(`send?command=${command}`), {method: 'POST'});
        } catch {
            console.error('send command failed');
        }
    };

    return {
        send,
    }
}
