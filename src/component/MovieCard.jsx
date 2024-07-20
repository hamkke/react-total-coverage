import { lazy, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { scrollATOM } from '../atom';
import { Link, useMatch } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import DetailCard from '../routes/DetailCard';
import { makeImagePath } from '../api';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #000;
`;

const Title = styled.h1`
  margin: 20px 0 10px;
  font-size: 14px;
`;
const Img = styled(motion.img)`
  display: block;
  width: 100%;
`;

const itemVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};
const MovieCard = ({ id, title, imgPath }) => {
  const [movieId, setMovieId] = useState(null);
  const scrollRef = useRecoilValue(scrollATOM);
  const changedPath = makeImagePath(imgPath);

  const handleModal = () => {
    setMovieId(id);
    scrollRef.current.offsetParent.style.overflowY = 'hidden';
  };

  // console.log(id);
  return (
    <>
      <Container
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.3 },
        }}
        onClick={handleModal}
        layoutId={id}
        variants={itemVariants}
      >
        <Link to={`${id}`}>
          <Img src={changedPath} alt={title} />
          <Title>{title}</Title>
        </Link>
      </Container>
      {/* 
      <AnimatePresence>
        <DetailCard
          setMovieId={setMovieId}
          movieId={movieId}
          layoutId={id}
          match={movieModalMatch}
        />
      </AnimatePresence> */}
    </>
  );
};
export default MovieCard;
