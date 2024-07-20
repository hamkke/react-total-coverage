import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Popular from './Popular';
import ComingSoon from './ComingSoon';
import NowPlaying from './NowPlaying';
import DetailCard from './DetailCard';

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
            element: <DetailCard />,
          },
        ],
      },
      {
        path: 'coming-soon',
        element: <ComingSoon />,
        children: [
          {
            path: ':movieId',
            element: <DetailCard />,
          },
        ],
      },
      {
        path: 'now-playing',
        element: <NowPlaying />,
        children: [
          {
            path: ':movieId',
            element: <DetailCard />,
          },
        ],
      },
    ],
  },
]);

export default Router;
