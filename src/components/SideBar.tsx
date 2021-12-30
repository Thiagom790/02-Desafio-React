import { useEffect, useState } from "react";
import { Genre } from "../models/Genre";
import { api } from "../services/api";
import { Button } from "./Button";

import "../styles/sidebar.scss";

interface SideBarProps {
  genreID: number;
  onGenreSelected: (genre: Genre) => void;
}

export function SideBar({ genreID, onGenreSelected }: SideBarProps) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    api.get<Genre[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Genre>(`genres/${genreID}`).then((response) => {
      onGenreSelected(response.data);
    });
  }, [genreID]);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onGenreSelected(genre)}
            selected={genreID === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
