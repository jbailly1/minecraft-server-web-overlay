import {useCustomCommand} from "./useCustomCommand";
import React, {useCallback, useState} from "react";
import {BiSend} from "react-icons/Bi";
import {BsFillChatRightTextFill} from "react-icons/bs";

export default function Chat() {
    const { send } = useCustomCommand();
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        await send(`say ${message}`);
        setMessage('');
    };

    const onKeyUp = useCallback(async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await sendMessage();
        }
    }, [sendMessage]);

    return (
        <div className='chat-commands'>
            <label><BsFillChatRightTextFill /></label>
            <input value={message} onChange={(e) => setMessage(e.target.value)} onKeyUp={onKeyUp} />
            <button className='primary' onClick={async () => sendMessage()} ><BiSend /></button>
        </div>
    );
}
