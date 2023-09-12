import React, { useState, useEffect } from 'react';
import './App.css';
import Banner from "./banner";
import Exhibit from "./Exhibit";


async function fetchIPAddress() {
    try {
        const response = await fetch('http://api.ipify.org/?format=json');
        if (response.ok) {
            const data = await response.json();
            return data.ip;
        } else {
            console.error("Failed to fetch IP.");
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

function App() {
    const [ip, setIP] = useState('');

    useEffect(() => {
        (async function() {
            const ipAddress = await fetchIPAddress();
            if (ipAddress) {
                setIP(ipAddress);
            }
        })();
    }, []);

    return (
    <div className="App">
        <Banner bannerText={'Sextant'}/>
        <Exhibit name={'IP Address'}>
            <p> IPv4: {ip} </p>
        </Exhibit>
        <Exhibit name={'abc2'}>
            <p>This is a child component or content inside the Exhibit component.</p>
        </Exhibit>
    </div>
  );
}

export default App;
