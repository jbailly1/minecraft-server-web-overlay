import {ServerOnOff} from "./ServerOnOff";
import {FaSave, FaTrash} from "react-icons/fa";
import {FiUsers} from "react-icons/fi";
import Status from "../status/Status";

export const LeftCommands = () => (
    <div className='left-commands'>
        <Status />
        <ServerOnOff />
        <button className='primary' onClick={() => fetch('/save', { method: 'POST' }).then()}><FaSave /></button>
        <button className='primary' onClick={() => fetch("/clear", { method: 'post'}).then()}><FaTrash /></button>
        <button className='primary' onClick={() => fetch("/send?command=list", { method: 'post'}).then()}><FiUsers /></button>
    </div>
);
