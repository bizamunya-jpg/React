import { useEffect, useState } from 'react';
import './App.css';

const startingDevices = [
  { id: 1, name: 'Front entrance', location: 'Main building', status: 'Online', activity: 24 },
  { id: 2, name: 'Cold storage', location: 'Warehouse', status: 'Online', activity: 17 },
  { id: 3, name: 'Loading bay', location: 'West side', status: 'Attention', activity: 6 },
];

function DeviceRow({ device }) {
  return <li className="device-row"><div className="device-indicator" />
    <div className="device-details">
      <strong>{device.name}</strong>
      <span>{device.location}</span>
    </div>
    <span className={`status ${device.status === 'Online' ? 'online' : 'attention'}`}>{device.status}</span>
    <span className="activity-count">{device.activity} events</span>
  </li>;
}

function App() {
  const [devices, setDevices] = useState(startingDevices);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!isMonitoring) return undefined;
    const updateTimer = window.setInterval(() => {
      setDevices((currentDevices) => currentDevices.map((device) => ({ ...device, activity: device.activity + Math.floor(Math.random() * 3) })));
      setLastUpdated(new Date());
    }, 3000);
    return () => window.clearInterval(updateTimer);
  }, [isMonitoring]);

  function addNote(event) {
    event.preventDefault();
    const trimmedNote = note.trim();
    if (!trimmedNote) return;
    setNotes((currentNotes) => [{ id: Date.now(), text: trimmedNote, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...currentNotes]);
    setNote('');
  }

  const totalEvents = devices.reduce((total, device) => total + device.activity, 0);
  const attentionCount = devices.filter((device) => device.status === 'Attention').length;

  return <main className="monitor">
    <header className="topbar">
      <div>
        <p className="eyebrow">React basics in practice</p>
        <h1>Live monitor</h1>
      </div>
      <button className={isMonitoring ? 'pause-button' : 'start-button'}
        type="button" onClick={() => setIsMonitoring((currentState) => !currentState)}>
        {isMonitoring ? 'Pause updates' : 'Resume updates'}</button>
    </header>
    <section className="summary" aria-label="Monitoring summary">
      <article>
        <span>System status</span>
        <strong className={isMonitoring ? 'good' : 'muted'}>{isMonitoring ? 'Monitoring' : 'Paused'}</strong>
      </article>
      <article>
        <span>Connected devices</span>
        <strong>{devices.length}</strong>
      </article>
      <article>
        <span>Events today</span>
        <strong>{totalEvents}</strong>
      </article>
      <article>
        <span>Needs attention</span>
        <strong className={attentionCount ? 'warn' : 'good'}>{attentionCount}</strong>
      </article>
    </section>
    <section className="workspace">
      <div className="devices-panel">
        <div className="panel-heading">
          <div>
            <h2>Device activity</h2>
            <p>Last refresh: {lastUpdated.toLocaleTimeString()}</p>
          </div>
          <span className={isMonitoring ? 'live-badge' : 'paused-badge'}>
            {isMonitoring ? 'Live' : 'Paused'}</span>
        </div>
        <ul className="device-list">{devices.map((device) =>
          <DeviceRow key={device.id} device={device} />)}
        </ul>
      </div>
      <aside className="notes-panel">
        <div className="panel-heading">
          <div>
            <h2>Operator notes</h2>
            <p>Keep a short record of checks.</p>
          </div>
        </div>
        <form onSubmit={addNote}>
          <label htmlFor="monitor-note">New note</label>
          <textarea
            id="monitor-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="e.g. Checked the loading bay camera" rows="4" />
          <button className="note-button" type="submit">Add note</button></form>{notes.length === 0 ? <p className="empty-state">No notes have been added yet.</p> : <ul className="notes-list">{notes.map((entry) => <li key={entry.id}><p>{entry.text}</p><time>{entry.time}</time></li>)}</ul>}</aside></section>
  </main>;
}

export default App;
