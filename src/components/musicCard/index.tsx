import { useEffect, useState } from 'react';
import './MusicCard.css';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

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

  useEffect(() => {
    async function favoriteStatus() {
      if (isFavorite) {
        await addSong({ trackName, previewUrl, trackId });
      } else {
        await removeSong({ trackName, previewUrl, trackId });
      }
    }
    favoriteStatus();
  }, [trackName, previewUrl, trackId, isFavorite]);

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
      />
    </div>
  );
}

export default MusicCard;
