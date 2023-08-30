import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import Loading from '../loading';
import MusicCard from '../musicCard';
import './Album.css';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';

function Album() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [songs, setSongs] = useState<SongType[]>([]);
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);

  useEffect(() => {
    async function albumMusics() {
      setLoading(true);
      if (id) {
        const [albumData, ...albumSongs] = await getMusics(id);
        const favoritesData = await getFavoriteSongs();
        setAlbum(albumData);
        setSongs(albumSongs);
        setFavoriteSongs(favoritesData);
        setLoading(false);
      }
    }
    albumMusics();
  }, [id]);

  return (
    <div className="album-container">
      {loading && <Loading />}
      <img className="album-image" src={ album?.artworkUrl100 } alt="" />
      <p className="artist-name" data-testid="artist-name">{album?.artistName}</p>
      <p className="album-name" data-testid="album-name">{album?.collectionName}</p>
      {songs.map((song) => (
        <MusicCard
          trackId={ song.trackId }
          key={ song.trackId }
          trackName={ song.trackName }
          previewUrl={ song.previewUrl }
          isFav={ favoriteSongs
            .some((favorite) => song.trackId === favorite.trackId) }
        />
      ))}
    </div>
  );
}

export default Album;
