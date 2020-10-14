import { GetServerSideProps } from 'next'
import Error from 'next/error'
import MovieList from '../../components/movie_list'
import MovieRepo from '../../api/repo/movie_repo'
import PersonList from '../../components/person_list'
import styles from '../../styles/Movie.module.css'

// using some helper components for skeleton and styling to build this quicker
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

function MoviePage({ errorCode, movie  }) {
    if (errorCode) {
        return <Error statusCode={errorCode} />
    }

    return (
        <div>
            <div className={styles.container}>
                <CardMedia
                    className={styles.poster}
                    image={movie.poster}
                />

                <div className={styles.content}>
                    <h1>{movie.title}</h1>

                    <p className={styles.infoText}>{movie.releaseDate} | {movie.genres.map(({ name }) => `${name}`).join(', ')} | {movie.runtimeReadable}</p>

                    <Typography variant="subtitle1" color="textSecondary">
                        <span> {movie.tagline}</span>
                    </Typography>

                    <h4>Overview</h4>
                    <p className={styles.overviewText}>{movie.overview}</p>
                </div>
            </div>

            <div className={styles.footer}>
                <h2>Similar Movies</h2>

                <MovieList movies={movie.similarMovies} layout="carousel" />

                <h2>Cast</h2>

                <PersonList people={movie.cast} />
            </div>
        </div>
    );
}

// called on server. Gets data before rendering page.
export const getServerSideProps: GetServerSideProps = async context => {
    const movieRepo = new MovieRepo();
    let movie = await movieRepo.getMovieById(context.query.mid);

    if (movie) {
        movie = movie.toJSON();

        // Pass data to the page via props
        return { props: { movie } }
    } else {
        // no movie was found, return 404 page
        const errorCode: number = 404;

        return { props: { errorCode } }
    }
}

export default MoviePage