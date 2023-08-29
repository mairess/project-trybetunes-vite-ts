import { useEffect, useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

function Header() {
  const [user, setUser] = useState<UserType | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTheUser() {
      setLoading(true);
      const newUser = await getUser();
      setUser(newUser);
      setLoading(false);
    }
    getTheUser();
  }, []);
  if (loading) {
    return 'Carregando...';
  }
  return (
    <header data-testid="header-component">
      <NavLink data-testid="link-to-search" to="/search">Pesquisar</NavLink>
      <NavLink data-testid="link-to-favorites" to="/favorites">Favoritos</NavLink>
      <NavLink data-testid="link-to-profile" to="/profile">Perfil</NavLink>
      <p data-testid="header-user-name">{ user?.name }</p>
    </header>
  );
}

export default Header;
