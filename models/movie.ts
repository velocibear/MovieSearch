import Person from "./person";

export default class Movie {
    private _id: number;
    private _title: string;
    private _release_date: number;
    private _overview: string;
    private _tagline: string;
    private _genres: string[];
    private _poster_path: string;
    private _backdrop_path: string;
    private _runtime: number;
    private _average_score: number;
    private _vote_count: number;
    private _budget: number;
    private _revenue: number;
    private _similarMovies: Movie[]
    private _cast: Person[]
    
    constructor (data: any) {
        this._id = data.id ?? '';
        this._title = data.title ?? '';
        this._release_date = data.release_date ?? '';
        this._overview = data.overview ?? '';
        this._tagline = data.tagline ?? '';
        this._genres = data.genres ?? '';
        this._poster_path = data.poster_path ?? '';
        this._backdrop_path = data.backdrop_path ?? '';
        this._runtime = data.runtime ?? '';
        this._average_score = data.vote_average ?? '';
        this._vote_count = data.vote_count ?? '';
        this._budget = data.budget ?? '';
        this._revenue = data.revenue ?? '';
        
        this._similarMovies = [];

        if (data.similar !== undefined) {
            this._similarMovies = data.similar.results.map((movie: Movie) => (new Movie(movie)));
        }

        this._cast = [];

        if (data.credits !== undefined) {
            // only keep track of top 10 cast members as many below that often that not do not have an image
            this._cast = data.credits.cast.map((person: Person) => (new Person(person))).slice(0, 10);
        }
    }

    get id (): number {
        return this._id;
    }

    get title (): string {
        return this._title;
    }

    get releaseDate (): number {
        return this._release_date;
    }

    get overview (): string {
        return this._overview;
    }

    get tagline (): string {
        return this._tagline;
    }

    get genres(): string[] {
        return this._genres;
    }

    get poster (): string {
        return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${this._poster_path}`;
    }

    get backdrop (): string {
        return `https://image.tmdb.org/t/p/w300_and_h450_bestv2${this._backdrop_path}`;
    }

    get runtimeMinutes (): number {
        return this._runtime;
    }

    get runtimeReadable(): string {
        const hours = Math.floor(this._runtime / 60);
        const minutes = this._runtime % 60;

        return `${hours}h ${minutes}m`;
    }

    get score (): number {
        return this._average_score;
    }

    get voteCount (): number {
        return this._vote_count;
    }

    get budget (): number {
        return this._budget;
    }

    get revenue (): number {
        return this._revenue;
    }

    get similarMovies (): Movie[] {
        return this._similarMovies;
    }

    get cast (): Person[] {
        return this._cast;
    }

    public toJSON () {
        return {
            'id': this.id,
            'title': this.title,
            'releaseDate': this.releaseDate,
            'overview': this.overview,
            'tagline': this.tagline,
            'genres': this.genres,
            'poster': this.poster,
            'backdrop': this.backdrop,
            'runtimeMinutes': this.runtimeMinutes,
            'runtimeReadable': this.runtimeReadable,
            'score': this.score,
            'voteCount': this.voteCount,
            'budget': this.budget,
            'revenue': this.revenue,
            'similarMovies': this.similarMovies.map((movie: Movie) => (movie.toJSON())),
            'cast': this.cast.map((person: Person) => (person.toJSON()))
        }
    }
}
