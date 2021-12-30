import { useState } from "react";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import "./styles/global.scss";
import { Genre } from "./models/Genre";

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  function handleGenreSelected(genre: Genre) {
    setSelectedGenre(genre);
    setSelectedGenreId(genre.id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genreID={selectedGenreId}
        onGenreSelected={handleGenreSelected}
      />
      <Content genreID={selectedGenreId} selectedGenre={selectedGenre} />
    </div>
  );
}
