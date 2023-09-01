import { useEffect, useState } from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import Loading from '../loading';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';

function Search() {
  const [inputName, setInputName] = useState<string>('');
  const [inpuNameToClear, setInputNameToClear] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbum] = useState<AlbumType[]>([]);

  function handeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInputName(value);
    setInputNameToClear(value);
  }

  function handleClick() {
    setLoading(true);
    setInputNameToClear('');
  }

  useEffect(() => {
    async function newAlbum() {
      const albumData = await searchAlbumsAPI(inputName);
      setAlbum(albumData);
      setLoading(false);
    }
    if (loading) {
      newAlbum();
    }
  }, [inputName, loading]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <form action="">
      <div>
        <input
          data-testid="search-artist-input"
          type="text"
          onChange={ handeChange }
          value={ inpuNameToClear }
          placeholder="NOME DO ARTISTA"
        />
        <button
          data-testid="search-artist-button"
          disabled={ inputName.length < 2 }
          onClick={ handleClick }
        >
          Pesquisar
        </button>
      </div>
      <div>
        {(albums.length > 0) && (`Resultado de álbuns de: ${inputName}`)}
        {(albums.length === 0) && ('Nenhum álbum foi encontrado')}
        {albums.map((album) => (
          <div key={ album.artistId } className="album">
            <img src={ album.artworkUrl100 } alt={ album.artistName } />
            <p>{ album.artistName }</p>
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              { album.collectionName }
            </Link>
          </div>
        ))}
      </div>
    </form>
  );
}
export default Search;
