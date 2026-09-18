import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import DeviceCard from '../components/DeviceCard.jsx';
import VideoModal from '../components/VideoModal.jsx';
import typeIcons from './Icons.js';

const devices = [
    { name: 'Front Door Camera', type: 'Camera', status: 'Online', detail: 'Live Stream of NASA ISS (May be interrupted)', videoLink: 'https://www.youtube.com/watch?v=M3HKLzjvKPc' },
    { name: 'Back Yard Camera', type: 'Camera', status: 'Online', detail: 'Live Stream of Mt Fuji (May be cloudy weather)', videoLink: 'https://www.youtube.com/watch?v=Sv9hcJ3k5h4' },
    { name: 'Front Door Lock', type: 'Door', status: 'Online', detail: 'Locked' },
    { name: 'Garage Door', type: 'Door', status: 'Alert', detail: 'Left open — 14 min' },
    { name: 'Living Room Window', type: 'Window', status: 'Online', detail: 'Closed & latched' },
    { name: 'Bedroom Window', type: 'Window', status: 'Offline', detail: 'Sensor disconnected' },
    { name: 'Hallway Motion Sensor', type: 'Motion', status: 'Online', detail: 'No motion detected' },
    { name: 'Basement Motion Sensor', type: 'Motion', status: 'Offline', detail: 'Battery dead' }
];

export default function Dashboard() {
    const { userEmail, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [selectedDevice, setSelectedDevice] = useState(null);

    const onlineCount = devices.filter((xyz) => xyz.status === 'Online').length;
    const alertCount = devices.filter((xyz) => xyz.status === 'Alert').length;
    const offlineCount = devices.filter((xyz) => xyz.status === 'Offline').length;

    const filteredDevices = devices.filter((xyz) => filter === 'All' || xyz.type === filter);

    function handleLogout() {
        setIsLoggedIn(false);
        navigate('/login');
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="brand">
                    <img src="/logo.png" alt="MaveSec logo" className="logo" />
                    <div>
                        <h1>SafeNest</h1>
                        <p>Logged in as {userEmail}</p>
                    </div>
                </div>
                <button onClick={handleLogout}><i className="bi bi-box-arrow-right"></i> Log out</button>
            </header>

            <div className="status-summary">
                <div className="status-box status-box-online"> onClick={() => setFilter()}
                    <div><span className="status-number">{onlineCount}</span><p>Online</p></div>
                    <i className="bi bi-wifi"></i>
                </div>
                <div className="status-box status-box-alert">
                    <div><span className="status-number">{alertCount}</span><p>Alerts</p></div>
                    <i className="bi bi-bell-fill"></i>
                </div>
                <div className="status-box status-box-offline">
                    <div><span className="status-number">{offlineCount}</span><p>Offline</p></div>
                    <i className="bi bi-wifi-off"></i>
                </div>
            </div>

            <div className="filter-buttons">
                <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
                <button className={filter === 'Camera' ? 'active' : ''} onClick={() => setFilter('Camera')}>
                    <i className={`bi ${typeIcons.Camera}`}></i> Camera
                </button>
                <button className={filter === 'Door' ? 'active' : ''} onClick={() => setFilter('Door')}>
                    <i className={`bi ${typeIcons.Door}`}></i> Door
                </button>
                <button className={filter === 'Window' ? 'active' : ''} onClick={() => setFilter('Window')}>
                    <i className={`bi ${typeIcons.Window}`}></i> Window
                </button>
                <button className={filter === 'Motion' ? 'active' : ''} onClick={() => setFilter('Motion')}>
                    <i className={`bi ${typeIcons.Motion}`}></i> Motion Sensor
                </button>
            </div>

            <div className="device-grid">
                {filteredDevices.map((device) => (
                    <DeviceCard
                        key={device.name}
                        name={device.name}
                        type={device.type}
                        status={device.status}
                        detail={device.detail}
                        onCardClick={device.type === 'Camera' ? () => setSelectedDevice(device) : undefined}
                    />
                ))}
            </div>

            <VideoModal device={selectedDevice} onClose={() => setSelectedDevice(null)} />
        </div>

    );
}