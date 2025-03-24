import axios from 'axios'

const authHeaders = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDNiNGIyYWYzOGEwZjMzNDBmYjY3ODg0MTBhYTQ0YiIsIm5iZiI6MTc0Mjg0MDc2Ni42NzM5OTk4LCJzdWIiOiI2N2UxYTNiZWQ3MGM2MTU5MDM3NWJiMTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.68M6OI3HwjD6ahEtwntRsEFZGgxdDHz5ACw8KdEPWJQ"
};

export const getTrendingMovies = async () => {
    const url = "https://api.themoviedb.org/3/trending/movie/day";
    const options = {
        headers: {
            ...authHeaders
        }
    };
    const response = await axios.get(url, options);
    return response.data;
};

export const searchMovies = async (queryString) => {
    const url = "https://api.themoviedb.org/3/search/movie";
    const options = {
        headers: {
            ...authHeaders
        },
        params: {
            include_adults: "false",
            query: queryString
        }
    };
    const response = await axios.get(url, options);
    return response.data;
};

export const getMovieDetails = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
        headers: {
            ...authHeaders
        }
    };

    const response = await axios.get(url, options);
    return response.data;
};

export const getMovieCredits = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
    const options = {
        headers: {
            ...authHeaders
        }
    };

    const response = await axios.get(url, options);
    return response.data;
};

export const getMovieReviews = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
    const options = {
        headers: {
            ...authHeaders
        }
    };

    const response = await axios.get(url, options);
    return response.data;
}