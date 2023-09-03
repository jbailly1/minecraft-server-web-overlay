import {useSelectionServer, useServer} from "./ServersProvider";

export function ServerSelection(): JSX.Element {
    const { select, servers } = useSelectionServer();
    const selected = useServer();

    return (<select value={selected} onChange={(event) => select(event.target.value)}>
        {
            servers.map(server => <option key={server} value={server}>{server}</option>)
        }
    </select>);
}
