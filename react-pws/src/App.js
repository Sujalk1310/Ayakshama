import './App.css';
import { useEffect, useState } from 'react';
import { generateToken, messaging } from './notifications/firebase';
import { onMessage } from 'firebase/messaging';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Cardiac from './Components/Cardiac';
import Home from './Components/Home';
import Ortho from './Components/Ortho';
import General from './Components/General';
import Gastro from './Components/Gastro';
import Doctors from './Components/Doctors';
import Patients from './Components/Patients';
import toast, { Toaster } from 'react-hot-toast';
 
function App() {
  const [mode, setMode] = useState('online');
  
  useEffect(() => {
    if (navigator.onLine) {
        generateToken();
        onMessage(messaging, (payload) => {
          console.log(payload);
          toast(payload.notification.body);
        })
    }
  }, [])

  return (
    <div className="App">
      <Toaster position='bottom-center'/>
      {mode === 'offline' ? <div className="alert alert-warning" role="alert">You are in Offline Mode</div> : null}
      <Router>
        <Routes>
          <Route element={<Doctors />} path="/doctors" />
          <Route element={<Patients />} path="/patients" />
          <Route element={<Cardiac />} path="/cardiac-form" />
          <Route element={<Ortho />} path="/ortho-form" />
          <Route element={<Gastro />} path="/gastro-form" />
          <Route element={<General />} path="/gen-form" />
          <Route element={<Home />} path="/" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
