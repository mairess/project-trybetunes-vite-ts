import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import MusicCard from '../musicCard';
import { SongType } from '../../types';

function Favorites() {
  const [favoriteMusic, setFavoriteMusic] = useState<SongType[]>([]);
  const [updatedFavoriteList, setUpdatedFavoriteList] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const data = await getFavoriteSongs();
      setFavoriteMusic(data);
      setLoading(false);
    };
    fetchFavorites();
  }, [updatedFavoriteList]);

  const handleRemoveFavorite = () => {
    setUpdatedFavoriteList(!updatedFavoriteList);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      { favoriteMusic.length === 0 && <p>Sem favoritos :(</p> }
      { favoriteMusic.length > 0 && <p>Meus favoritos:</p> }
      { favoriteMusic.map((song) => (
        <MusicCard
          key={ song.trackId }
          song={ song }
          isFav
          handleRemoveFavorite={ () => handleRemoveFavorite() }
        />
      ))}
    </div>
  );
}

export default Favorites;
