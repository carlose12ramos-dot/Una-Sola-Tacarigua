import { createBrowserRouter } from 'react-router';
import Root from './pages/Root';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Cultura from './pages/Cultura';
import Geografia from './pages/Geografia';
import Sociedad from './pages/Sociedad';
import Offline from './pages/Offline';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'nosotros', Component: Nosotros },
      { path: 'cultura', Component: Cultura },
      { path: 'geografia', Component: Geografia },
      { path: 'sociedad', Component: Sociedad },
      { path: 'offline', Component: Offline },
      { path: '*', Component: NotFound },
    ],
  },
]);
