import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ServersProvider} from "./ServersProvider";

fetch('/servers')
    .then(value => value.json())
    .then(config => {
        ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
            <React.StrictMode>
                <ServersProvider servers={config}>
                    <App />
                </ServersProvider>
            </React.StrictMode>,
        )
    });
