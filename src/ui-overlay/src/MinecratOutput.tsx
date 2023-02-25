import {useEffect, useState} from "react";
import './Minecraft.css';

export function MinecraftOutput() {
    const [outputs, setOutputs] = useState<string[]>([]);

    useEffect(() => {
      const interval = setInterval(() => {
          fetch("/outputs").then(data => data.json()).then(value => setOutputs(value));
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
