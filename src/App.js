import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/LandingPage';
import { AuditActivity } from './pages/AuditActivity';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        {/* If you have a Navbar, place it here so it shows on all pages */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/audit-activity" element={<AuditActivity />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          
          {/* Catch-all 404 Route */}
          <Route path="*" element={
            <div className="flex items-center justify-center h-screen">
              <h2 className="text-white text-2xl">404 Page Not Found</h2>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;