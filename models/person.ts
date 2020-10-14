import Movie from "./movie";

export default class Person {
    private _id: number;
    private _name: string;
    private _biography: string;
    private _birthday: string;
    private _birthPlace: string;
    private _profile_path: string;
    private _movies: Movie[];

    constructor (data: any) {
        this._id = data.id ?? '';
        this._name = data.name ?? '';
        this._biography = data.biography ?? '';
        this._birthday = data.birthday ?? '';
        this._birthPlace = data.place_of_birth ?? '';
        this._profile_path = data.profile_path ?? '';

        this._movies = [];

        if (data.movie_credits !== undefined) {
            this._movies = data.movie_credits.cast.map((movie: Movie) => (new Movie(movie))).slice(0, 20);
        }
    }

    get id (): number {
        return this._id;
    }

    get name (): string {
        return this._name;
    }

    get biography (): string {
        return this._biography;
    }

    get birthday (): string {
        return this._birthday;
    }

    get birthPlace (): string {
        return this._birthPlace;
    }

    get profilePicture (): string {
        return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${this._profile_path}`;
    }

    get movies (): Movie[] {
        return this._movies;
    }

    public toJSON () {
        return {
            'id': this.id,
            'name': this.name,
            'biography': this.biography,
            'birthday': this.birthday,
            'birthPlace': this.birthPlace,
            'profilePicture': this.profilePicture,
            'movies': this.movies.map((movie: Movie) => (movie.toJSON()))
        }
    }
}
