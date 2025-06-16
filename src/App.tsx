import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { PlayerComparison } from './pages/PlayerComparison';
import { TradeAnalyzer } from './pages/TradeAnalyzer';
import { Rankings } from './pages/Rankings';
import { HotPlayers } from './pages/HotPlayers';
import { Consistency } from './pages/Consistency';
import { WaiverWire } from './pages/WaiverWire';
import { Pricing } from './pages/Pricing';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/compare" element={<PlayerComparison />} />
            <Route path="/trade" element={<TradeAnalyzer />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/hot-players" element={<HotPlayers />} />
            <Route path="/consistency" element={<Consistency />} />
            <Route path="/waiver" element={<WaiverWire />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;