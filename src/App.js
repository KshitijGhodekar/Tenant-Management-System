import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { LoginPage } from './Pages/Login/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import TenantView from './Pages/TenantView/TenantView';
import TenantProfile from './Pages/TenantProfile/TenantProfile';
import LandlordView from './Pages/LandlordView/LandLoardView';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/tenant-view' element={<TenantView />} />
        <Route path='/tenant-profile' element={<TenantProfile />} />
        <Route path='/landlord-view' element={<LandlordView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
