import { useState } from 'react';
import './MusicCard.css';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

type MusicCardProps = {
  trackName: string,
  previewUrl: string,
  trackId: number,
  isFav: boolean,
  handleRemoveFavorite?: () => void;
};

function MusicCard({
  trackName,
  previewUrl,
  trackId,
  isFav,
  handleRemoveFavorite = () => {} }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState(isFav);

  function toggleFavorite() {
    setIsFavorite((prevState) => !prevState);
    if (!isFavorite) {
      addSong({ trackName, previewUrl, trackId });
    } else {
      removeSong({ trackName, previewUrl, trackId });
      handleRemoveFavorite();
    }
  }

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
        htmlFor={ `favorite-${trackId}` }
        data-testid={ `checkbox-music-${trackId}` }
      >
        <img
          src={ `/src/images/${isFavorite ? 'checked_' : 'empty_'}heart.png` }
          alt="favorite"
        />
      </label>
      <input
        id={ `favorite-${trackId}` }
        type="checkbox"
        onChange={ toggleFavorite }
        checked={ isFavorite }
        className="hidden-input"
      />
    </div>
  );
}

export default MusicCard;
