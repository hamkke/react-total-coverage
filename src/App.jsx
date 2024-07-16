import { Outlet } from 'react-router-dom';
import Header from './component/Header';
import { GlobalStyle } from './GlobalStyle';

export default function App() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Outlet />
    </div>
  );
}
