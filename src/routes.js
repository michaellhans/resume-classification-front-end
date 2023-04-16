import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Page404 from './pages/Page404';
import SuggestionPage from './pages/SuggestionPage';
import PredictionPage from './pages/PredictionPage';
import HomePage from './pages/HomePage';
import ListResume from './pages/ListResume';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'prediction', element: <PredictionPage /> },
        { path: 'suggestion', element: <SuggestionPage /> },
        { path: 'list-resume', element: <ListResume /> },
      ],
    },
    {
      path: 'home',
      element: <HomePage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
