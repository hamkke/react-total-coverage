import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Popular from './Popular';
import ComingSoon from './ComingSoon';
import NowPlaying from './NowPlaying';
import Detail from './Detail';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Popular />,
        children: [
          {
            path: ':movieId',
            element: <Detail />,
          },
        ],
      },
      {
        path: 'coming-soon',
        element: <ComingSoon />,
        children: [
          {
            path: ':movieId',
            element: <Detail />,
          },
        ],
      },
      {
        path: 'now-playing',
        element: <NowPlaying />,
        children: [
          {
            path: ':id',
            element: <Detail />,
          },
        ],
      },
    ],
  },
]);

export default Router;
