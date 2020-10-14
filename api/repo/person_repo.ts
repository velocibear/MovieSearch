import config from '../../config.json'
import Person from '../../models/person'

class PersonRepo {
    apiKey: string = '';
    baseURL: string = 'https://api.themoviedb.org/3/';

    constructor() {
        if ('apiKey' in config) {
            this.apiKey = config.apiKey;
        }        
    }

    /**
    * Get person by ID from themoviedb. Builds the correct URL and calls _queryAPI to fetch the data from the API.
    *
    * @param {string | string[]} id id of person to get.
    * @return {Promise<Person>}
    */
    async getPersonById(id: string | string[]): Promise<Person> {
        const URL = `${this.baseURL}person/${id}?api_key=${this.apiKey}&language=en-US&append_to_response=movie_credits`;
        return this._queryAPI(URL);
    }

    /**
    * Private method to fetch and parse API response. Will transform response to a single Person entity.
    * TODO if had more time I would make a more generic repo that handled this instead of having duplicate code from the movie repo
    *
    * @param {string} url url to fetch;
    * @return {Promise<Person>} Person entity.
    */
    private async _queryAPI(url: string): Promise<Person> {
        const res = await fetch(url);
        const result = await res.json();

        if (res.ok) {
            const person: Person = new Person(result);

            return person;
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

export default PersonRepo