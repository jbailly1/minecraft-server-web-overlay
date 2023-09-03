import {useConfiguration} from "../Configuration";
import {useImperativeHandle, useRef, useState, forwardRef} from "react";
import './Status.css';
import {FaInfoCircle} from "react-icons/fa";



const Status = () => {
    const serverConfig = useConfiguration();
    const [show, setShow] = useState(false);
    const buttonRef = useRef(null);

    const onClick = (e: any) => {
        if (e.target === buttonRef.current) {
            setShow(prevState => !prevState);
        } else {
            setShow(false);
        }
    };

    return (
        <>
        <button ref={buttonRef} onClick={onClick}><FaInfoCircle /></button>
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
