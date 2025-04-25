import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import '@fontsource/monoton';
import '@fontsource/poppins';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './Navbar';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import ActivityLog from './pages/ActivityLog';
import AccountSetting from './pages/AccountSetting';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'projectlist',
        element: <ProjectList />,
      },
      {
        path: 'projectdetail',
        element: <ProjectDetail />,
      },
      {
        path: 'activitylog',
        element: <ActivityLog />,
      },
      {
        path: 'accountsetting',
        element: <AccountSetting />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
