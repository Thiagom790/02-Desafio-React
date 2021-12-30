import { useEffect, useState } from "react";
import { Genre } from "../models/Genre";
import { Movie } from "../models/Movie";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";
import "../styles/content.scss";

interface ContentProps {
  genreID: number;
  selectedGenre: Genre;
}

export function Content({ genreID, selectedGenre }: ContentProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${genreID}`).then((response) => {
      setMovies(response.data);
    });
  }, [genreID]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
