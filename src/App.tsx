import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store'; // Adjust this path if your main store file is located elsewhere (e.g., ./app/store)

// Public pages
import Login from './pages/Login';
import Register from './pages/Register';

// Core layout wrapper
import DashboardLayout from './layouts/DashboardLayout';

// Feature workspace views
import InspectionsPage from './features/inspections/Inspections';
import RatingsPage from './features/ratings/RatingsPage';
import RSMCPage from './features/rsmc/RSMCPage';
import Expenses from './features/expenses/Expenses';
import Photos from './features/photos/Photos';
import Calendar from './components/Calendar';
import Dashboard from './features/dashboard/Dashboard';
import SettingsPage from './features/settings/Settings';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Auth Gateways */}
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          {/* Dashboard Layout Base Workspace */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Dashboard Home - /dashboard */}
            <Route index element={<Dashboard/>} />
            
            {/* Sidebar Navigation Paths matching your exact feature folders */}
            <Route path="inspections" element={<InspectionsPage />} />
            <Route path="expenses" element={<Expenses/>} />
            <Route path="photos" element={<Photos/>} />
            <Route path="calendar" element={<Calendar/>} />
            <Route path="ratings" element={<RatingsPage/>} />
            <Route path="rsmc" element={<RSMCPage/>} />
            
            {/* Settings or any fallback placeholder */}
            <Route path="settings" element={<SettingsPage/>} />
          </Route>

          {/* Catch-all global safety fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
