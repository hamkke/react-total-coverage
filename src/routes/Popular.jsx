import { useQuery } from '@tanstack/react-query';
import { Outlet, useMatch } from 'react-router-dom';
import MovieCard from '../component/MovieCard';
import { getPopular } from '../api';
import { Container } from '../styles/common';

import { containerVariants } from '../commonVariants';
import DetailCard from './DetailCard';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { movieIdATOM } from '../atom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

const Popular = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['popularMovie'],
    queryFn: getPopular,
  });

  const movieModalMatch = useMatch('/:id');
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
        {movieModalMatch && clickedMovie && (
          <DetailCard
            key={clickedMovie.id}
            // setMovieId={setQWE}
            // movieId={movieId}
            layoutId={clickedMovie.id}
          />
        )}
      </AnimatePresence>

      <Outlet />
    </Container>
  );
};
export default Popular;
