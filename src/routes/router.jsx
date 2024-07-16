import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Popular from './Popular';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Popular />,
      },
    ],
  },
]);

export default router;
