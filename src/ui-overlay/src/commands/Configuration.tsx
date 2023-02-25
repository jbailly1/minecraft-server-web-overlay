import {useState} from "react";

export function Configuration() {
    const [noGui, setNoGui] = useState(false);
    const [jarFile, setJarFile] = useState('server.jar');
    const [eulaChecked, setEulaCheck] = useState(false);
    const [customParams, setCustomParams] = useState('');

    return (
        <div>
            <div className='row'>
                <label>Server jar file path:</label>
                <input required type='text' value={jarFile} onChange={(e) => setJarFile(e.target.value)} />
            </div>
            <div className='row'>
                <label>Show server GUI:</label>
            </div>
        </div>
    )
}
