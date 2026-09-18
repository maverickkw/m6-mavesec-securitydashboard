export default function VideoModal({ device, onClose }) {
    if (!device) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h2>{device.name}</h2>
                <div className="video-wrapper">
                    <iframe
                        src={`${device.videoLink.replace('watch?v=', 'embed/')}?autoplay=1&mute=1`}
                        title={device.name}
                        allow="autoplay"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}