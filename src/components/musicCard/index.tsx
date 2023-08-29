import { useState } from 'react';
import './MusicCard.css';

type MusicCardProps = {
  trackName: string,
  previewUrl: string,
  trackId: number,
};

function MusicCard({ trackName, previewUrl, trackId }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  function toggleFavorite() {
    setIsFavorite((prevState) => !prevState);
  }
  const favID = `favorite-${trackId}`;

  return (
    <div className="music-card-container">
      <h2>{trackName}</h2>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      <label
        htmlFor={ favID }
        data-testid={ `checkbox-music-${trackId}` }
      >
        <img
          // src={ `/src/images/${isFavorite ? 'empty_' : 'checked_'}heart.png` }
          // src="/src/images/empty_heart.png"
          src={ `/src/images/${isFavorite ? 'checked_' : 'empty_'}heart.png` }
          alt="favorite"
        />
      </label>
      <input
        id={ favID }
        type="checkbox"
        onChange={ toggleFavorite }
      />
    </div>
  );
}

export default MusicCard;
