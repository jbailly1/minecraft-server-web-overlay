import React, {useCallback, useState} from "react";
import {BiSend} from "react-icons/Bi";
import {useCustomCommand} from "./useCustomCommand";

export function CustomCommand() {
    const [command, setCommand] = useState('');
    const { send } = useCustomCommand();

    const sendCommands = useCallback(async () => {
        await send(command);
        setCommand('');
    }, [send, command]);

    const onKeyUp = useCallback(async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await sendCommands();
        }
    }, [sendCommands]);

    return (
        <div className='right-commands'>
            <label>Command:</label>
            <input value={command} onChange={(e) => setCommand(e.target.value)} onKeyUp={onKeyUp} />
            <button className='primary' onClick={async () => sendCommands()} ><BiSend /></button>
        </div>
    );
}
