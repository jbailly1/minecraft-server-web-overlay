import {useState} from "react";
import { FaPlay, FaStop } from 'react-icons/fa'
import '../index.css';
import {useServerApi} from "../useServerApi";

export function ServerOnOff() {
    const createRequestPath = useServerApi();
    const [started, setStarted] = useState(true);

    const start = async () => {
        try {

            debugger;
            const response = await fetch(createRequestPath(`start`), { method: 'post' });
            if (response.ok) {
                setStarted(true);
            }
        } catch {
            console.error('start failed')
        }
    };

    const stop = async () => {
        await fetch(createRequestPath('stop'), { method: 'post' });
        setStarted(false);
    };

    return (
        <>
            {!started && <button className='start' disabled={started} onClick={start}><FaPlay /></button>}
            {started && <button className='stop' disabled={!started} onClick={stop}><FaStop /></button>}
        </>
    );
}
