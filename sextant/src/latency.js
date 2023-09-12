import React, {Component} from 'react';

class PacketLatency extends Component {
    constructor(props) {
        super(props);
        this.ws = new WebSocket('ws://localhost:55455');
        this.state = {
            latency: null,
        };
    }

    componentDidMount() {
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data) {
                const currentTime = new Date().getTime();
                const packetLatency = currentTime - data;
                this.setState({ latency: packetLatency });
            }
        }
    }

    componentWillUnmount() {
        // Ensure you close the WebSocket when the component is unmounted to avoid potential memory leaks
        this.ws.close();
    }

    render() {
        return (
            <div>
                {this.state.latency !== null ? (
                    <div>Packet Latency: {String(this.state.latency)} ms</div>
                ) : (
                    <div>Waiting for data...</div>
                )}
            </div>
        );
    }
}

export default PacketLatency;
