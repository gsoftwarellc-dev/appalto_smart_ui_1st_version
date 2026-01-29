import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LandingPage from './pages/LandingPage';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import TendersList from './pages/admin/TendersList';
import CreateTender from './pages/admin/CreateTender';
import BidManagement from './pages/admin/BidManagement';
import ContractorManagement from './pages/admin/ContractorManagement';
import DocumentManagement from './pages/admin/DocumentManagement';
import AdminProfile from './pages/admin/AdminProfile';
import TenderDetails from './pages/TenderDetails';

// Shared Pages
import Notifications from './pages/Notifications';

// Owner Pages
import OwnerLayout from './components/layout/OwnerLayout';
import OwnerDashboard from './pages/owner/Dashboard';
import UserManagement from './pages/owner/UserManagement';
import TenderOversight from './pages/owner/TenderOversight';
import RevenueDashboard from './pages/owner/RevenueDashboard';
import AuditLog from './pages/owner/AuditLog';
import Configuration from './pages/owner/Configuration';
import NotificationControl from './pages/owner/NotificationControl';

// Contractor Pages
import ContractorDashboard from './pages/contractor/Dashboard';
import ActiveTenders from './pages/contractor/ActiveTenders';
import MyBids from './pages/contractor/MyBids';
import Profile from './pages/contractor/Profile';
import DocumentCenter from './pages/contractor/DocumentCenter';
import Billing from './pages/contractor/Billing';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'contractor']} />}>
            <Route element={<Layout />}>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="/admin/create-tender" element={<CreateTender />} />
                  <Route path="/admin/tenders" element={<TendersList />} />
                  <Route path="/admin/bids" element={<BidManagement />} />
                  <Route path="/admin/contractors" element={<ContractorManagement />} />
                  <Route path="/admin/documents" element={<DocumentManagement />} />
                  <Route path="/admin/notifications" element={<Notifications />} />
                  <Route path="/admin/profile" element={<AdminProfile />} />
                </Route>
                <Route path="/admin/tenders/:id" element={<TenderDetails />} />
              </Route>

              {/* Contractor Routes */}
              <Route element={<ProtectedRoute allowedRoles={['contractor']} />}>
                <Route path="/contractor" element={<ContractorDashboard />} />
                <Route path="/contractor/tenders" element={<ActiveTenders />} />
                <Route path="/contractor/bids" element={<MyBids />} />
                <Route path="/contractor/documents" element={<DocumentCenter />} />
                <Route path="/contractor/notifications" element={<Notifications />} />
                <Route path="/contractor/billing" element={<Billing />} />
                <Route path="/contractor/profile" element={<Profile />} />
                <Route path="/contractor/tenders/:id" element={<TenderDetails />} />
              </Route>



            </Route>
          </Route>

          {/* Owner Routes */}
          <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
            <Route path="/owner" element={<OwnerLayout />}>
              <Route index element={<OwnerDashboard />} />
              <Route path="/owner/users" element={<UserManagement />} />
              <Route path="/owner/tenders" element={<TenderOversight />} />
              <Route path="/owner/revenue" element={<RevenueDashboard />} />
              <Route path="/owner/audit" element={<AuditLog />} />
              <Route path="/owner/config" element={<Configuration />} />
              <Route path="/owner/notifications" element={<NotificationControl />} />
            </Route>
          </Route>

          {/* Root Redirect */}
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
