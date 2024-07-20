import {
  useNavigate,
  useLocation,
  useParams,
  useOutletContext,
  useMatch,
} from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { movieIdATOM, scrollATOM } from '../atom';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getMovie, makeBgPath, makeImagePath } from '../api';
import { useEffect } from 'react';

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
  position: relative;
  margin-top: -300px;
  width: 90%;
  min-width: 700px;
`;

const MoviePoster = styled.div`
  position: absolute;
  width: 70%;
  border: 1px solid #000;
  & img {
    display: block;
    width: 100%;
  }
`;
const Information = styled.div`
  position: absolute;
  right: -10px;
  bottom: -70px;
  padding: 10px;
  width: 350px;
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
  position: absolute;
  top: -70px;
  left: 0;
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
  const { data, isFetched } = useQuery({
    queryKey: ['movieDetailInfo', layoutId],
    queryFn: () => getMovie(layoutId),
    enabled: !!layoutId,
  });

  const handle = () => {
    // setMovieId(null);
    const result = location.pathname.replace(/\/\d+$/, '');
    navigate(result);
    scrollRef.current.offsetParent.style.overflowY = 'scroll';
  };
  useEffect(() => {
    console.log(123);
  }, []);
  return (
    <>
      <AnimatePresence>
        {isFetched && (
          <Ship
            key={layoutId}
            initial={false}
            animate={{
              opacity: 1,
              transition: { duration: 1 },
            }}
            exit={{ opacity: 0 }}
            onClick={handle}
          >
            <Container
              key={layoutId}
              layoutId={layoutId}
              transition={{ duration: 0.3 }}
            >
              <MoviePoster>
                <img
                  src={makeBgPath(data?.backdrop_path || '')}
                  alt={data?.title}
                />
              </MoviePoster>
              <CloseSVG
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path d='M6 18 18 6M6 6l12 12' />
              </CloseSVG>
              <Information>
                <h2>✴︎ {data?.title}</h2>
                <p>✴︎ 개봉 : {data?.release_date}</p>
                <p>✴︎ 별점 : {Math.round(data?.vote_average)}</p>
                <p>✴︎ {data?.runtime}분</p>
                {/* <p>✴︎ {data?.overview.slice(0, 100)}...</p> */}
              </Information>
            </Container>
          </Ship>
        )}
      </AnimatePresence>
    </>
  );
};
export default DetailCard;
