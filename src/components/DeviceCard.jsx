import typeIcons from '../pages/Icons.js';

export default function DeviceCard({ name, type, status, detail, onCardClick }) {
    const isOn = status === 'Online' || status === 'Alert';

    return (
        <div className={`device-card ${onCardClick ? 'clickable' : ''}`} onClick={onCardClick}>
            <div className="device-header">
                <div className="device-icon"><i className={`bi ${typeIcons[type]}`}></i></div>
                <div className="device-title">
                    <h3>{name}</h3>
                    <span className={`status-dot status-${status.toLowerCase()}`}>{status}</span>
                </div>
            </div>
            <p className="device-type">{type}</p>
            <p className="device-detail">{detail}</p>
            <button>{isOn ? 'Turn off' : 'Turn on'}</button>
        </div>
    );
}