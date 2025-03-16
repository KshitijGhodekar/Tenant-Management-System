import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux"; 
import { LoginPage } from "./Pages/Login/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import TenantProfile from "./Pages/TenantProfile/TenantProfile";
import store from "./redux/store"; 

const TenantView = React.lazy(() => import("./Pages/TenantView/TenantView"));
const LandlordView = React.lazy(() => import("./Pages/LandlordView/LandLoardView"));
const PaymentPage = React.lazy(() => import("./Pages/PaymentPage/PaymentPage"));

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Provider store={store}> 
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/tenant-view"
              element={
                <ProtectedRoute>
                  <TenantView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tenant-profile"
              element={
                <ProtectedRoute>
                  <TenantProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/landlord-view"
              element={
                <ProtectedRoute>
                  <LandlordView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;