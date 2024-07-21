import { useQuery } from '@tanstack/react-query';
import { Outlet, useMatch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MovieCard from '../component/MovieCard';
import DetailCard from './DetailCard';
import { getNowPlaying } from '../api';
import { Container } from '../styles/common';
import { containerVariants } from '../commonVariants';

const NowPlaying = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['nowPlayingMovie'],
    queryFn: getNowPlaying,
  });
  const movieModalMatch = useMatch('/now-playing/:id');
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
export default NowPlaying;
