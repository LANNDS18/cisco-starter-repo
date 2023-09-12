import React, { useState, useEffect } from 'react';
import './App.css';
import Banner from "./banner";
import Exhibit from "./Exhibit";
import PacketLatency from "./latency";


async function fetchIPAddress() {
    try {
        const v4_response = await fetch('http://api.ipify.org/?format=json');
        const v6_response = await fetch('https://api64.ipify.org?format=json');
        if ( v4_response.ok && v6_response.ok) {
            const v4_data = await v4_response.json();
            const v6_data = await v6_response.json();
            return { ipv4: v4_data.ip, ipv6: v6_data.ip };
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
    const [ipData, setIP] = useState({ ipv4: '', ipv6: '' }); // Using an object for state

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
            <p> IPv4: {ipData.ipv4} </p>
            <p> IPv6: {ipData.ipv6} </p>
        </Exhibit>
        <Exhibit name={'Latency'}>
            <PacketLatency />
        </Exhibit>
    </div>
  );
}

export default App;
