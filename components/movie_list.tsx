import MovieCard from '../components/movie_card'
import Movie from '../models/movie'
import styles from '../styles/MovieList.module.css'

function MovieList({ movies, layout }) {
    let layoutStyle: string;

    switch (layout) {
        case 'carousel':
            layoutStyle = styles.listCarousel;
            break;
        case 'grid':
            layoutStyle = styles.listGrid;
            break;
    }

    return (
        <div className={layoutStyle}>
            {movies.map((movie: Movie) => (
                <MovieCard movie={movie} key={movie.id}/>
            ))}
        </div>
    );
}

export default MovieList