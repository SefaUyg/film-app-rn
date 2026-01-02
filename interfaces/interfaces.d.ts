declare module "*.png" {
    const value: number;
    export default value;
}
declare module "*.jpg" {
    const value: number;
    export default value;
}
declare module "*.jpeg" {
    const value: number;
    export default value;
}
declare module "*.webp" {
    const value: number;
    export default value;
}
declare module "*.gif" {
    const value: number;
    export default value;
}

declare module "*.svg" {
    const value: any;
    export default value;
}

declare global {
    type Nullable<T> = T | null;

    interface PaginatedResponse<T> {
        page: number;
        results: T[];
        total_pages: number;
        total_results: number;
    }

    interface Movie {
        id: number;
        title: string;
        name?: string;

        adult: boolean;
        backdrop_path: Nullable<string>;
        poster_path: Nullable<string>;

        genre_ids: number[];

        original_language: string;
        original_title: string;
        overview: string;

        popularity: number;
        release_date: string; // "YYYY-MM-DD"

        video: boolean;
        vote_average: number;
        vote_count: number;
    }

    interface TrendingMovie {
        searchTerm: string;
        movie_id: number;
        title: string;
        count: number;
        poster_url: string;
    }

    interface Genre {
        id: number;
        name: string;
    }

    interface GenresResponse {
        genres: Genre[];
    }

    interface Collection {
        id: number;
        name: string;
        poster_path: Nullable<string>;
        backdrop_path: Nullable<string>;
    }

    interface ProductionCompany {
        id: number;
        logo_path: Nullable<string>;
        name: string;
        origin_country: string;
    }

    interface ProductionCountry {
        iso_3166_1: string;
        name: string;
    }

    interface SpokenLanguage {
        english_name: string;
        iso_639_1: string;
        name: string;
    }

    interface MovieDetails {
        id: number;
        adult: boolean;

        backdrop_path: Nullable<string>;
        poster_path: Nullable<string>;

        title: string;
        original_title: string;
        overview: string;

        release_date: string;

        runtime: Nullable<number>; // minutes
        status: string; // "Released"
        tagline: string;

        popularity: number;
        vote_average: number;
        vote_count: number;

        genres: Genre[];

        homepage: Nullable<string>;
        imdb_id: Nullable<string>;

        belongs_to_collection: Nullable<Collection>;

        budget: number;
        revenue: number;

        production_companies: ProductionCompany[];
        production_countries: ProductionCountry[];
        spoken_languages: SpokenLanguage[];

        original_language: string;
    }

    interface CastMember {
        adult: boolean;
        cast_id?: number;
        character: string;
        credit_id: string;
        gender: Nullable<number>;
        id: number;
        known_for_department: string;
        name: string;
        order: number;
        original_name: string;
        popularity: number;
        profile_path: Nullable<string>;
    }

    interface CrewMember {
        adult: boolean;
        credit_id: string;
        department: string;
        gender: Nullable<number>;
        id: number;
        job: string;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: Nullable<string>;
    }

    interface CreditsResponse {
        id: number;
        cast: CastMember[];
        crew: CrewMember[];
    }

    // ---------------------------------------
    // Videos (Trailer/Teaser)
    // TMDB /movie/{id}/videos
    // ---------------------------------------
    type VideoSite = "YouTube" | "Vimeo" | string;
    type VideoType = "Trailer" | "Teaser" | "Clip" | "Featurette" | "Behind the Scenes" | string;

    interface Video {
        id: string;
        iso_639_1: string;
        iso_3166_1: string;
        name: string;
        key: string; // YouTube video key
        site: VideoSite;
        size: number; // 1080 vs
        type: VideoType;
        official: boolean;
        published_at: string;
    }

    interface VideosResponse {
        id: number;
        results: Video[];
    }

    interface TMDBImage {
        aspect_ratio: number;
        height: number;
        width: number;
        iso_639_1: Nullable<string>;
        file_path: string;
        vote_average: number;
        vote_count: number;
    }

    interface ImagesResponse {
        id: number;
        backdrops: TMDBImage[];
        posters: TMDBImage[];
        logos?: TMDBImage[];
    }

    interface ReviewAuthorDetails {
        name: string;
        username: string;
        avatar_path: Nullable<string>;
        rating: Nullable<number>;
    }

    interface Review {
        id: string;
        author: string;
        author_details: ReviewAuthorDetails;
        content: string;
        created_at: string;
        updated_at: string;
        url: string;
    }

    interface ReviewsResponse extends PaginatedResponse<Review> { }

    interface WatchProvider {
        display_priority: number;
        logo_path: string;
        provider_id: number;
        provider_name: string;
    }

    interface WatchProviderRegion {
        link: string;
        flatrate?: WatchProvider[];
        rent?: WatchProvider[];
        buy?: WatchProvider[];
    }

    interface WatchProvidersResponse {
        id: number;
        results: Record<string, WatchProviderRegion>;
    }

    interface ApiError {
        status_code?: number;
        status_message?: string;
        success?: boolean;
        message?: string;
    }
}

export { };
