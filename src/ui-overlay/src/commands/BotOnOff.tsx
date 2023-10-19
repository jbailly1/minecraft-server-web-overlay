import {useState} from "react";
import {RiDiscordFill, RiDiscordLine} from "react-icons/ri";

export function BotOnOff() {
    const [started, setStarted] = useState(true);

    const start = async () => {
        try {

            debugger;
            const response = await fetch('/enable-bot', { method: 'post' });
            if (response.ok) {
                setStarted(true);
            }
        } catch {
            console.error('start failed')
        }
    };

    const stop = async () => {
        await fetch('/disable-bot', { method: 'post' });
        setStarted(false);
    };

    return (
        <>
            {!started && <button className='start' disabled={started} onClick={start}><RiDiscordFill /></button>}
            {started && <button className='stop' disabled={!started} onClick={stop}><RiDiscordLine /></button>}
        </>
    );
}
