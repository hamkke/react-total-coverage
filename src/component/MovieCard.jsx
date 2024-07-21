import { useRecoilValue } from 'recoil';
import { scrollATOM } from '../atom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath } from '../api';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #000;
`;

const Title = styled(motion.h1)`
  margin: 20px 0 10px;
  font-size: 14px;
`;
const Img = styled(motion.img)`
  display: block;
  width: 100%;
`;
// ----------------------------------------------
const itemVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
// ----------------------------------------------
const MovieCard = ({ id, title, imgPath }) => {
  const scrollRef = useRecoilValue(scrollATOM);
  const changedPath = makeImagePath(imgPath);

  const handleScroll = () => {
    scrollRef.current.offsetParent.style.overflowY = 'hidden';
  };

  return (
    <>
      <Container
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.3 },
        }}
        onClick={handleScroll}
        layoutId={id}
        variants={itemVariants}
      >
        <Link to={`${id}`}>
          <Img src={changedPath} alt={title} />
          <Title>{title}</Title>
        </Link>
      </Container>
    </>
  );
};
export default MovieCard;
