import config from '../../config.json'
import Movie from '../../models/movie'

class MovieRepo {
    apiKey: string = '';
    baseURL: string = 'https://api.themoviedb.org/3/';

    constructor() {
        if ('apiKey' in config) {
            this.apiKey = config.apiKey;
        }
    }

    /**
    * Get popular movies from themoviedb. Builds the correct URL and calls _queryAPI to fetch the data from the API.
    *
    * @return {Promise<Movie[]>} Array of movies.
    */
    async getPopularMovies (): Promise<Movie[]> {
        const URL = `${this.baseURL}movie/popular?api_key=${this.apiKey}&language=en-US&page=1`;
        return this._queryAPI(URL);
    }

    /**
    * Get movie by ID from themoviedb. Builds the correct URL and calls _queryAPI to fetch the data from the API.
    *
    * @param {string | string[]} id id of movie to get.
    * @return {Promise<Movie>} Movie, 
    */
    async getMovieById (id: string | string[]): Promise<Movie> {
        const URL = `${this.baseURL}movie/${id}?api_key=${this.apiKey}&language=en-US&append_to_response=credits,similar`;
        return this._queryAPI(URL);
    }

    /**
    * Search themoviedb for movie by query. Builds the correct URL and calls _queryAPI to fetch the data from the API.
    *
    * @param {string} query to search db for.
    * @return {Promise<Movie[[]>} Array of movies.
    */
    async searchByQuery (query: string): Promise<Movie[]> {
        const URL = `${this.baseURL}search/movie?query=${query}&api_key=${this.apiKey}&language=en-US&page=1`;
        return this._queryAPI(URL);
    }

    /**
    * Private method to fetch and parse API response. Will transform response to either an arry of Movies or a single movie entity.
    *
    * @param {string} url url to fetch;
    * @return {Promise<any>} Array or movies or single movie
    */
    private async _queryAPI (url: string): Promise<any> {
        const res = await fetch(url);
        const result = await res.json();

        if (res.ok) {
            // check if API results are for a list of movies for a single movie
            if (result.hasOwnProperty('results')) {

                // build array of Movie objects from results of API search
                let movies: Movie[] = result.results.map((movie: Movie) => (new Movie(movie)));

                return movies;
            } else {
                // response is a single movie, transform it and then return
                const movie: Movie = new Movie(result);

                return movie;
            }
        }

        const responseError = {
            type: 'Error',
            message: result.message || 'Something went wrong',
            data: result.data || '',
            code: result.code || '',
        };

        // handling the errors instead of just logging them would be necessary in 'real' app.
        let error = new Error();
        console.error({ ...error, ...responseError });
    }
}

export default MovieRepo