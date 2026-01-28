import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import TendersList from './pages/admin/TendersList';
import CreateTender from './pages/admin/CreateTender';
import BidManagement from './pages/admin/BidManagement';
import ContractorManagement from './pages/admin/ContractorManagement';
import AdminMessages from './pages/admin/AdminMessages';
import DocumentManagement from './pages/admin/DocumentManagement';
import AdminProfile from './pages/admin/AdminProfile';
import TenderDetails from './pages/TenderDetails';

// Shared Pages
import Notifications from './pages/Notifications';

// Contractor Pages
import ContractorDashboard from './pages/contractor/Dashboard';
import ActiveTenders from './pages/contractor/ActiveTenders';
import MyBids from './pages/contractor/MyBids';
import Profile from './pages/contractor/Profile';
import DocumentCenter from './pages/contractor/DocumentCenter';
import Messages from './pages/contractor/Messages';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
                  <Route path="/admin/messages" element={<AdminMessages />} />
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
                <Route path="/contractor/messages" element={<Messages />} />
                <Route path="/contractor/profile" element={<Profile />} />
                <Route path="/contractor/tenders/:id" element={<TenderDetails />} />
              </Route>

            </Route>
          </Route>

          {/* Root Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
