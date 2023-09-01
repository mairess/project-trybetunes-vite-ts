import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../loading';
import { UserType } from '../../types';

function Profile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const newUser = await getUser();
      setUser(newUser);
      setLoading(false);
    };
    fetchUser();
  }, []);
  return (
    <div>
      <Link to="/profile/edit">
        Editar perfil
      </Link>
      <img
        data-testid="profile-image"
        className="profile-image"
        src={ user?.image }
        alt={ user?.name }
      />
      {loading && <Loading />}
      <h2>Nome</h2>
      <p>{user?.name}</p>
      <h2>Email</h2>
      <p>{user?.email}</p>
      <h2>Descrição</h2>
      <p>{user?.description}</p>
    </div>
  );
}

export default Profile;
