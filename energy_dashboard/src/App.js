// src/App.js

import React from 'react';
import './App.css';
import ConsumptionTrends from './components/ConsumptionTrends';
import EconomicImpact from './components/EconomicImpact';
import EnvironmentalImpact from './components/EnvironmentalImpact';
import PolicyFactors from './components/PolicyFactors';
import TechnologicalAdvancements from './components/TechnologicalAdvancements';
import RegionalDynamics from './components/RegionalDynamics';
import MarketDynamics from './components/MarketDynamics';
import StrategicPlanning from './components/StrategicPlanning';
import PESTLEAnalysis from './components/PESTLEAnalysis';
import InvestmentInsights from './components/InvestmentInsights';
import SocialImpact from './components/SocialImpact';
import RiskManagement from './components/RiskManagement';

function App() {
  return (
    <div className="App">
    <h1 style={{ textAlign: 'center', marginTop: '20px', fontSize: '50px', textDecoration: 'underline' }}>Energy Dashboard</h1>
    <div className="container">
        <EconomicImpact />
        <EnvironmentalImpact />
        <PolicyFactors />
        <MarketDynamics />
        <PESTLEAnalysis />
        <SocialImpact />
        <RiskManagement />
        <TechnologicalAdvancements/>
        <RegionalDynamics/>
        <InvestmentInsights/>
      </div>
    </div>
  );
}

export default App;
