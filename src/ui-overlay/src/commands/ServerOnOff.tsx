import {useState} from "react";
import { FaPlay, FaStop } from 'react-icons/fa'
import '../index.css';

export function ServerOnOff() {
    const [started, setStarted] = useState(true);

    const start = async () => {
        try {

            debugger;
            const response = await fetch('/start', { method: 'post' });
            if (response.ok) {
                setStarted(true);
            }
        } catch {
            console.error('start failed')
        }
    };

    const stop = async () => {
        await fetch('/stop', { method: 'post' });
        setStarted(false);
    };

    return (
        <>
            {!started && <button className='start' disabled={started} onClick={start}><FaPlay /></button>}
            {started && <button className='stop' disabled={!started} onClick={stop}><FaStop /></button>}
        </>
    );
}
