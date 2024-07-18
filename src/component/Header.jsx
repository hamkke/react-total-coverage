import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 100%;
  border-bottom: 1px solid #000;
`;
const ListContainer = styled.ul`
  display: flex;
  & li + li {
    margin-left: 50px;
  }
`;
const List = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
`;
const Dot = styled(motion.div)`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${(props) => props.theme.textColor};
`;
const TAP = ['popular', 'coming-soon', 'now-playing'];
const Header = () => {
  const [selectedTab, setSelectedTab] = useState(TAP[0]);
  return (
    <Container>
      <ListContainer>
        {TAP.map((item) => {
          return (
            <List key={item} onClick={() => setSelectedTab(item)}>
              <Link to={item === 'popular' ? '/' : `/${item}`}>
                {item.toUpperCase()}
              </Link>
              {item === selectedTab ? (
                <Dot
                  layoutId='Dot'
                  style={
                    item === 'coming-soon'
                      ? { top: '-10px' }
                      : { bottom: '-10px' }
                  }
                />
              ) : null}
            </List>
          );
        })}
      </ListContainer>
    </Container>
  );
};
export default Header;
