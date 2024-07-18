import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { scrollATOM } from '../atom';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

/**
 *   background-image: linear-gradient(
      #ffffff49,
      ${(props) => props.theme.bgColor}
    ),
    url(${(props) => props.bgPhoto});
 */

const Ship = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: #00000034;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const Container = styled(motion.div)`
  width: 40%;
  height: 300px;
  background-color: #fff;
`;

const DetailCard = ({ setAniId, aniId }) => {
  const scrollRef = useRecoilValue(scrollATOM);
  const navigate = useNavigate();
  const location = useLocation();
  const handle = () => {
    setAniId(null);
    const result = location.pathname.replace(/\/\d+$/, '');
    navigate(result);
    scrollRef.current.offsetParent.style.overflowY = 'scroll';
  };
  return (
    <>
      {aniId && (
        <AnimatePresence>
          <Ship
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            onClick={handle}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              // strokeWidth={1.5}
              stroke='currentColor'
            >
              <path d='M6 18 18 6M6 6l12 12' />
            </svg>
            <Container
              layoutId={aniId}
              transition={{ duration: 0.3 }}
            ></Container>
          </Ship>
        </AnimatePresence>
      )}
    </>
  );
};
export default DetailCard;
