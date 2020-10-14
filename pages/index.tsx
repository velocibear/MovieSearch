import Head from 'next/head'
import { GetServerSideProps } from 'next'
import Movie from '../models/movie'
import MovieList from '../components/movie_list'
import MovieRepo from '../api/repo/movie_repo'
import SearchInput from '../components/search_input'
import styles from '../styles/Home.module.css'

function Home ({ popularMoviesJSON }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Movie Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Movie Search
        </h1>

        <p className={styles.description}>
          Start typing to look for your favorite movie or check out the most popular movies below
        </p>

        <div>
          <SearchInput />
          <div>
            <h2>Popular Movies</h2>

            <MovieList movies={popularMoviesJSON} layout="carousel"/>
          </div>
        </div>
      </main>
    </div>
  );
}

// called on server. Gets data before rendering page.
export const getServerSideProps: GetServerSideProps = async context => {
  const movieRepo = new MovieRepo();
  const movies: Movie[] = await movieRepo.getPopularMovies();

  let popularMoviesJSON: object = {};

  if (movies) {
    // can only pass JSON objects to component so this creates that.
    popularMoviesJSON = movies.map((movie: Movie) => (movie.toJSON()))
  }

  // Pass data to the page via props
  return { props: { popularMoviesJSON }}
}

export default Home
