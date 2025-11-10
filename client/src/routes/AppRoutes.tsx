import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import Status404 from '../components/Status/Status404';
import BaseLayout from '../layouts/BaseLayout';
import RoutesLoader from '../components/RoutesLoader';

// Pages

const Dashboard = RoutesLoader(lazy(() => import('../pages/index')));

const AppRoutes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          }
        ]
      }
    ]
  }
];

export default AppRoutes;
