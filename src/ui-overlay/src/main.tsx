import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ConfigProvider} from "./Configuration";

fetch('/config')
    .then(value => value.json())
    .then(config => {
        ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
            <React.StrictMode>
                <ConfigProvider config={config}>
                    <App />
                </ConfigProvider>
            </React.StrictMode>,
        )
    });
