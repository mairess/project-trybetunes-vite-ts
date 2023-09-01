import { useState } from 'react';
import './MusicCard.css';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';

type MusicCardProps = {
  song: SongType
  isFav: boolean,
  handleRemoveFavorite?: () => void;
};

function MusicCard({ song, isFav, handleRemoveFavorite = () => {} }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState(isFav);

  function toggleFavorite() {
    setIsFavorite((prevState) => !prevState);
    if (!isFavorite) {
      addSong(song);
    } else {
      removeSong(song);
      handleRemoveFavorite();
    }
  }

  return (
    <div className="music-card-container">
      <h2>{song.trackName}</h2>
      <audio data-testid="audio-component" src={ song.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      <label
        htmlFor={ `favorite-${song.trackId}` }
        data-testid={ `checkbox-music-${song.trackId}` }
      >
        <img
          src={ `/src/images/${isFavorite ? 'checked_' : 'empty_'}heart.png` }
          alt="favorite"
        />
      </label>
      <input
        id={ `favorite-${song.trackId}` }
        type="checkbox"
        onChange={ toggleFavorite }
        checked={ isFavorite }
        className="hidden-input"
      />
    </div>
  );
}

export default MusicCard;
