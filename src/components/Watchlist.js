import '../styles.css'
import MovieCard from "./MovieCard";

export default function Watchlist({movies, watchlist, toggleWatchlist}) {

    const rederedWatchlist = () => {
        return (
            watchlist.map(id => {
                const movie = movies.find(movie => movie.id === id);
                return <MovieCard
                    key={id}
                    movie={movie}
                    toggleWatchlist={toggleWatchlist}
                    isWatchlisted={true}
                />
            })
        );
    }

    return (
        <div>
            <h1 className="title">Your Watchlist</h1>
            <div className="watchlist">
                {rederedWatchlist()}
            </div>
        </div>
    );

}
