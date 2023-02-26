import {useConfiguration} from "../Configuration";
import {useState} from "react";
import {FiSettings} from "react-icons/fi";
import './Status.css';

export default function Status() {
    const serverConfig = useConfiguration();
    const [show, setShow] = useState(false);

    const onClick = () => {
        setShow(prevState => !prevState);
    };

    return (
        <>
        <button onClick={onClick}><FiSettings /></button>
            {show && <div className='status'>
            <div className='row'>
                <label>Jar file: </label><span>{serverConfig.JarFile}</span>
            </div>
            <div className='row'>
                <label>Java options: </label>
                {serverConfig.JavaOptions.map((option, index) =>
                    <span key={'option' + index}>{option}</span>
                )}
            </div>
            <div className='row'>
                <label>Server options: </label>
                {serverConfig.ServerOptions.map((option, index) =>
                    <span key={'option' + index}>{option}</span>
                )}
            </div>
        </div>}
        </>
    );
}
