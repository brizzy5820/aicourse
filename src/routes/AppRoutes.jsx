import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminConfig from '../pages/AdminConfig';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/admin/config"
        element={
          <ProtectedRoute>
            <AdminConfig />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}