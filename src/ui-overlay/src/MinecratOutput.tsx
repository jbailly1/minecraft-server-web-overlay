import {useEffect, useState} from "react";
import './Minecraft.css';
import {useServer} from "./ServersProvider";
import {useServerApi} from "./useServerApi";

export function MinecraftOutput() {
    const createEndpoint = useServerApi();
    const [outputs, setOutputs] = useState<string[]>([]);

    useEffect(() => {
      const interval = setInterval(() => {
          fetch(createEndpoint('outputs')).then(data => data.json()).then(value => setOutputs(value));
      }, 2000);

      return () => {
          clearInterval(interval);
      }
    }, [])

    return (
        <div className="outputs">
            {outputs.map((val, index) => ( <div key={'m'+index}>{val}</div>))}
        </div>
    );
}
