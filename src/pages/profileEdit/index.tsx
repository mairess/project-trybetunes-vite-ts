import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../loading';

function ProfileEdit() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType>({
    name: '',
    email: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const newUser = await getUser();
      setUser(newUser);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const buttonValidation = user.name.trim().length > 0
  && user.email.trim().length > 0
  && user.description.trim().length > 0
  && emailRegex.test(user.email);

  function handleSubmit() {
    setLoading(true);
    updateUser(user);
    navigate('/profile');
    setLoading(false);
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  if (loading) return <Loading />;

  return (
    <form action="">
      <label htmlFor="edit-name">Editar nome:</label>
      <input
        id="edit-name"
        name="name"
        data-testid="edit-input-name"
        type="text"
        onChange={ handleChange }
        value={ user.name }
      />

      <label htmlFor="edit-email">Editar email:</label>
      <input
        id="edit-email"
        name="email"
        data-testid="edit-input-email"
        type="email"
        onChange={ handleChange }
        value={ user.email }
      />

      <label htmlFor="edit-description">Editar descrição:</label>
      <textarea
        id="edit-description"
        name="description"
        data-testid="edit-input-description"
        onChange={ handleChange }
        value={ user.description }
      >
        Edite aqui
      </textarea>
      <input />

      <label htmlFor="edit-image">Alterar imagem:</label>
      <input
        id="edit-image"
        name="image"
        data-testid="edit-input-image"
        value={ user.image }
        onChange={ handleChange }
      />

      <button
        type="submit"
        data-testid="edit-button-save"
        disabled={ !buttonValidation }
        onClick={ handleSubmit }
      >
        Salvar
      </button>
    </form>
  );
}

export default ProfileEdit;
