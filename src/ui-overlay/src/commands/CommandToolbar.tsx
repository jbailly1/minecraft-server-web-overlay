import {LeftCommands} from "./LeftCommands";
import {CustomCommand} from "./CustomCommand";
import Chat from "./Chat";

export const CommandsToolbar = () =>(
    <div className='commands'>
        <LeftCommands />
        <Chat />
        <CustomCommand />
    </div>
);
