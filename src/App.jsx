/* 
Title: Mission 6: MaveSec Security Dashboard 

App Features:
- Clickcing on "Camera" devices will open a modal window with youtube vid embed. Front Camera leads to a live YouTube feed from space, and Back Yard Camera is a live feed of Mt Fuji. Other devices does not have a modal window as it is not a video capture device.
- Clicking on the filter cateogories will filter the devices displayed: All, Camera, Door, Window, Motion.
- Custom font of "Chakra Petch", and bootstrap icons are used for icons.
- Status Counter displayed at the top for Online, Alert and Offline devices.
- Log In page, with an email and password form. Users attempting to go straight into /dashboard will be redirected to Login page. Keying in wrong email and password will still remain in Login page. 
- Log Out button.
- Persistent Login state with LocalStorage to survive refresh.

File Structure:
src/
  pages/
    Login.jsx
    Dashboard.jsx
    Icons.js
  context/
    AuthContext.jsx
  components/
    DeviceCard.jsx
    VideoModal.jsx
    RequireAuth.jsx
  hooks/
    useLocalStorage.js
  App.jsx
  App.css
  main.jsx
  index.css
*/

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;