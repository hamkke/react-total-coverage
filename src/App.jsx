import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { scrollATOM } from './atom';
import { Outlet } from 'react-router-dom';
import Header from './component/Header';
import { GlobalStyle } from './GlobalStyle';
import styled from 'styled-components';

const Everything = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function App() {
  const ref = useRef(null);
  const setScrollRef = useSetRecoilState(scrollATOM);
  useEffect(() => {
    setScrollRef(ref);
  }, [setScrollRef]);

  return (
    <div>
      <GlobalStyle />
      <Everything ref={ref} onClick={() => setScrollRef(ref)}>
        <Header />
        <Outlet />
      </Everything>
    </div>
  );
}
