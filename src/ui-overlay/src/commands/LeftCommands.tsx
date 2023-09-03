import {ServerOnOff} from "./ServerOnOff";
import {FaSave, FaTrash} from "react-icons/fa";
import {FiUsers} from "react-icons/fi";
import {useServerApi} from "../useServerApi";

export const LeftCommands = () => {
    const createRequestPath = useServerApi();
    return (<div className='left-commands'>
        <ServerOnOff />
        <button className='primary' onClick={() => fetch(createRequestPath(`save`), { method: 'POST' }).then()}><FaSave /></button>
        <button className='primary' onClick={() => fetch(createRequestPath(`clear`), { method: 'post'}).then()}><FaTrash /></button>
        <button className='primary' onClick={() => fetch(createRequestPath(`send?command=list`), { method: 'post'}).then()}><FiUsers /></button>
    </div>
)
};
