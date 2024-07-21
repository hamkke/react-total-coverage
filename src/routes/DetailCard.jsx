import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { scrollATOM } from '../atom';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { getMovie, makeBgPath } from '../api';
import HOHOHO from '../hohoho.png';

const Ship = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #79cd7c64;
`;

const Container = styled(motion.div)`
  width: 50%;
  max-width: 700px;
  min-width: 400px;
`;

const MoviePoster = styled.div`
  margin: 20px 0;
  border: 1px solid #000;
  & img {
    display: block;
    width: 100%;
  }
`;
const Information = styled.div`
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #000;

  h2 {
    font-size: 30px;
  }

  p {
    margin-top: 5px;
    &:first-of-type {
      margin-top: 10px;
    }
  }
`;
const CloseSVG = styled(motion.svg)`
  width: 60px;
  height: 60px;
  stroke-width: 3;
  &:hover {
    color: ${(props) => props.theme.textColor};
  }
`;
// -------------------------------------------------------
const DetailCard = ({ layoutId }) => {
  const scrollRef = useRecoilValue(scrollATOM);
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = useQuery({
    queryKey: ['movieDetailInfo', layoutId],
    queryFn: () => getMovie(layoutId),
    // 어떤 조건이 충족될 때만 데이터를 가져오고 싶을 때 유용
    enabled: !!layoutId,
  });
  const handleBackAndScroll = () => {
    const result = location.pathname.replace(/\/\d+$/, '');
    navigate(result);
    scrollRef.current.offsetParent.style.overflowY = 'scroll';
  };
  if (!isLoading) null;
  return (
    <AnimatePresence>
      {layoutId && (
        <Ship
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          exit={{ opacity: 0 }}
          onClick={handleBackAndScroll}
        >
          <Container layoutId={layoutId} key={layoutId}>
            <CloseSVG
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path d='M6 18 18 6M6 6l12 12' />
            </CloseSVG>
            {!isLoading && (
              <MoviePoster>
                <img
                  onError={HOHOHO}
                  src={makeBgPath(data?.backdrop_path || HOHOHO)}
                  alt={data?.title}
                />
              </MoviePoster>
            )}

            <Information>
              <h2>✴︎ {data?.title}</h2>
              <p>✴︎ 개봉 : {data?.release_date}</p>
              <p>✴︎ 별점 : {Math.round(data?.vote_average)}</p>
              <p>✴︎ {data?.runtime}분</p>
              <p>✴︎ {data?.overview.slice(0, 200)}...</p>
            </Information>
          </Container>
        </Ship>
      )}
    </AnimatePresence>
  );
};
export default DetailCard;
