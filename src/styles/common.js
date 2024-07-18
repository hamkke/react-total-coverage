import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 30px;
  width: 50vw;
`;