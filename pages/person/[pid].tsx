import { GetServerSideProps } from 'next'
import Error from 'next/error'
import PersonRepo from '../../api/repo/person_repo'
import MovieList from '../../components/movie_list'

// uses same styles as movie page. If had more time would make this more generic and clean up styles that are shared
import styles from '../../styles/Movie.module.css'

// using some helper components for skeleton and styling to build this quicker
import CardMedia from '@material-ui/core/CardMedia';

function PersonPage({ errorCode, person }) {
    if (errorCode) {
        return <Error statusCode={errorCode} />
    }

    return (
        <div>
            <div className={styles.container}>
                <CardMedia
                    className={styles.poster}
                    image={person.profilePicture}
                />

                <div className={styles.content}>
                    <h1>{person.name}</h1>
                    <p className={styles.infoText}>{person.birthday} | {person.birthPlace}</p>

                    {person.biography && <h4>Biography</h4>}
                    <p className={styles.overviewText}>{person.biography}</p>
                </div>
            </div>

            <div className={styles.footer}>
                {person.movies.length > 0 && <h2>Known For</h2>}
                <MovieList movies={person.movies} layout="carousel" />
            </div>
        </div>
    );
}

// called on server. Gets data before rendering page.
export const getServerSideProps: GetServerSideProps = async context => {
    const personRepo = new PersonRepo();
    let person = await personRepo.getPersonById(context.query.pid);

    if (person) {
        person = person.toJSON();

        // Pass data to the page via props
        return { props: { person } }
    } else {
        // no person was found, return 404 page
        const errorCode: number = 404;

        return { props: { errorCode } }
    }  
}

export default PersonPage