import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from './pages/LandingPage';
import { AuditActivity } from './pages/AuditActivity';
import { Dashboard } from './pages/Dashboard';
import { FeaturesPage } from './pages/FeaturesPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { PricingPage } from './pages/PricingPage';
import axios from 'axios';

import { baseURL } from './components/api.js/BaseUrl';

// 2. GLOBAL CONFIG: This tells the browser "Always send cookies"
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Optional: Set the baseURL globally so you don't have to type it every time
axios.defaults.baseURL = baseURL;
function App() {
  return (
    <Router>
      
      <div className="App">
        {/* If you have a Navbar, place it here so it shows on all pages */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/docs" element={<DocumentationPage />} />
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