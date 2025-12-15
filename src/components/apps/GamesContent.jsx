import React, { useState } from "react";
import "./GamesContent.css";
import { gamesData } from "../../data/gamesData";
import GameDiskViewer from "./GameDiskViewer";

export default function GamesContent() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="games-bg">

      {selected ? (
        <GameDiskViewer game={selected} onClose={() => setSelected(null)} />
      ) : (
        <>
          <h2 className="games-title">Game Projects</h2>

          <div className="games-section-title">Released</div>
          <div className="games-grid">
            {gamesData
              .filter((g) => g.isReleased)
              .map((g) => (
                <GameCard key={g.id} game={g} onSelect={() => setSelected(g)} />
              ))}
          </div>

          <div className="games-section-title">In Development</div>
          <div className="games-grid">
            {gamesData
              .filter((g) => !g.isReleased)
              .map((g) => (
                <GameCard key={g.id} game={g} onSelect={() => setSelected(g)} />
              ))}
          </div>
        </>
      )}

    </div>
  );
}

function GameCard({ game, onSelect }) {
  return (
    <div className="game-card" onClick={onSelect}>
      <img src={game.cover} className="game-cover" alt="" />
      <div className="game-info">
        <div className="game-title">{game.title}</div>
        <div className="game-desc">{game.description}</div>
        {!game.isReleased && <div className="game-tag dev">In Development</div>}
      </div>
    </div>
  );
}
