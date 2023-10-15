import './Styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import LandingPage from './Pages/LandingPage';
import BuyTokenPage from './Pages/BuyTokenPage';
import CreateProjectPage from './Pages/CreateProjectPage';
import ProjectList from './Pages/ProjectList';
import ProjectDetails from  './Pages/ProjectDetails';
import InvestForm from './Pages/InvestForm';
import MyInvestments  from './Pages/MyInvestments';
import InvestedProjectDetails from './Pages/InvestedProjectDetails';


import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { celo, celoAlfajores, celoCannoli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

function App() {
  const { chains, publicClient } = configureChains(
    [celoAlfajores, celo, celoCannoli],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: 'Kickstarter',
    projectId: '304bb25132c30b8673622bd3433ef4ee',
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  return (
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/buyTokenPage" element={<BuyTokenPage/>} />
          <Route path="/createProjectPage" element={<CreateProjectPage/>} />
          <Route path="/projectlist" element={<ProjectList/>} />
          <Route path="/projectdetails/:projectId" element={<ProjectDetails/>} />
          <Route path="/BackersDetails" element={<ProjectDetails/>} />
          <Route path="/myinvestments" element={<MyInvestments/>} />
          <Route path="/investform" element={<InvestForm/>} />
          <Route path="/investedprojectdetails/:projectId" element={<InvestedProjectDetails/>} />
        </Routes>
    </Router>
    </RainbowKitProvider>
    </WagmiConfig>
    
  );
}

export default App;
