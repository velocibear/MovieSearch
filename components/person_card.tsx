import Link from 'next/link'
import styles from '../styles/PersonCard.module.css'

// using some helper components for skeleton and styling to build this quicker
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function PersonCard({ person }) {
    return (
        <div className={styles.card}>
            <Link href={`/person/${person.id}`}>
                <Card variant="outlined" className={styles.content}>
                    <CardMedia
                        className={styles.poster}
                        image={person.profilePicture}
                    />
                    <CardContent>
                        <Typography>
                            <span className={styles.cardTitleText}>{person.name}</span>
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </div>
    );
}

export default PersonCard