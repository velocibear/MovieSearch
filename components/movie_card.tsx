import Link from 'next/link'
import styles from '../styles/MovieCard.module.css'

// using some helper components for skeleton and styling to build this quicker
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

function MovieCard({ movie }) {
    let backgroundChipColor: string = 'gray';
    let chipLabel: string = movie.score;

    if (movie.score >= 8) {
        backgroundChipColor = 'lightgreen';
    }

    if (movie.score >= 5 && movie.score < 8) {
        backgroundChipColor = 'yellow';
    }

    if (movie.score < 5) {
        backgroundChipColor = 'red';
    }

    if (movie.voteCount == 0) {
        backgroundChipColor = 'gray';
        chipLabel = 'No Score'
    }

    return (
        <div className={styles.card}>
            <Link href={`/movies/${movie.id}`}>
                <Card variant="outlined" className={styles.content}>
                    <CardContent> 
                        <Typography>
                            <span className={styles.cardTitleText}>{movie.title}</span>
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            <span className={styles.cardTitleText}>{movie.releaseDate}</span>
                        </Typography>
                        {/* Don't love the inline styles here... */}
                        <Chip label={chipLabel} style={{ backgroundColor: backgroundChipColor, fontWeight: 700, marginTop: '15px' }}/>
                    </CardContent>
                    <CardMedia 
                        className={styles.poster}
                        image={movie.poster}
                    />
                </Card>
            </Link>
        </div>
    );
}

export default MovieCard