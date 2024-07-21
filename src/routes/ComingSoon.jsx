import { useQuery } from '@tanstack/react-query';
import { Outlet, useMatch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MovieCard from '../component/MovieCard';
import DetailCard from './DetailCard';
import { getComingSoon } from '../api';
import { containerVariants } from '../commonVariants';
import { Container } from '../styles/common';

const ComingSoon = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['comingSoonmovie'],
    queryFn: getComingSoon,
  });
  const movieModalMatch = useMatch('/coming-soon/:id');
  const clickedMovie =
    movieModalMatch?.params.id &&
    data?.results.find(
      (movie) => String(movie.id) === movieModalMatch.params.id
    );
  const { results } = data || {};
  return isLoading ? null : (
    <Container variants={containerVariants} initial='hidden' animate='visible'>
      {results.map((item) => {
        return (
          <MovieCard
            key={item.id}
            id={item.id}
            title={item.title}
            imgPath={item.poster_path}
            layoutId={item.id}
          />
        );
      })}

      <AnimatePresence>
        {clickedMovie && <DetailCard layoutId={clickedMovie.id} />}
      </AnimatePresence>

      <Outlet />
    </Container>
  );
};
export default ComingSoon;
