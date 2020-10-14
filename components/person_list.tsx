import PersonCard from '../components/person_card'
import Person from '../models/person'
import styles from '../styles/MovieList.module.css'

function PersonList({ people }) {
    
    return (
        <div className={styles.listCarousel}>
            {people.map((person: Person) => (
                <PersonCard person={person} key={person.id} />
            ))}
        </div>
    );
}

export default PersonList