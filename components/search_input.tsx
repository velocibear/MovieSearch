import * as debounce from 'lodash.debounce';
import Movie from '../models/movie'
import MovieList from '../components/movie_list'
import MovieRepo from '../api/repo/movie_repo'
import * as React from "react";

// using some helper components for skeleton and styling to build this quicker
import TextField from '@material-ui/core/TextField';

// in a real app these would live outside this file
interface IProps {}
interface IState {
    searchQuery?: string;
    movies?: Movie[];
    message?: string;
}

class SearchInput extends React.Component <IProps, IState> {

    emitChangeDebounced: any;
    MovieRepo: MovieRepo;
    message: string

    constructor (props: any) {
        super(props);

        this.state = { 
            searchQuery: '',
            movies: [],
            message: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.emitChangeDebounced = debounce(this.emitChange, 500);

        this.MovieRepo = new MovieRepo();
    }

    componentWillUnmount (): void {
        this.emitChangeDebounced.cancel();
    }

    /**
    * Handle change from search input. Updates state and calls function to query from API.
    *
    * @param  {React.ChangeEvent<HTMLTextAreaElement>} event
    */
    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const searchQuery: string = event.target.value;

        // update state immediately so change is reflected in the input box
        this.setState({ searchQuery: searchQuery });

        // but wait 500 milliseconds until after user is done typing to hit search api
        this.emitChangeDebounced(searchQuery);
    }

    /**
    * Handles messaging to user of state of searching and calls API to search for movie
    *
    * @param  {string} value value from event (what's being searched for)
    */
    async emitChange (value: string): Promise<void> {
        if (value) {
            this.setState({ message: 'Searching...' });

            const movies: Movie[] = await this.MovieRepo.searchByQuery(value);
            
            this.setState({ movies: movies });
            this.setState({ message: '' });

            if (movies.length === 0) {
                this.setState({ message: 'No Results. Try another search' });
            }
        } else {
            // nothing being searched for so clear out movies in list and message
            this.setState({ movies: [] });
            this.setState({ message: '' });
        }
    }

    render () {
        return (
            <div>
                <TextField 
                    id="outlined-basic" 
                    label="Movie Search" variant="outlined" 
                    placeholder="Search for a movie!" 
                    value={this.state.searchQuery} 
                    onChange={this.handleChange} 
                    style={{ display: 'flex', marginBottom: '20px' }}/>

                <h3>{this.state.message}</h3>

                <MovieList movies={this.state.movies} layout="grid" />
            </div>
        );
    }
}

export default SearchInput