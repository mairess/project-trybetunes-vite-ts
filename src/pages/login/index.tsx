import { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../loading';
import logo from '../../images/logo.svg';

function Login() {
  const [inputName, setInputName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInputName(value);
  }

  function handleClick() {
    setLoading(true);
  }

  useEffect(() => {
    async function newUSer() {
      await createUser({ name: inputName });
      navigate('/Search');
    }
    if (loading) {
      newUSer();
    }
  }, [inputName, loading, navigate]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="form-container">
      <form action="" method="get" encType="multipart/form-data">
        <img src={ logo } alt="Logo" />
        <input
          data-testid="login-name-input"
          type="text"
          onChange={ handeChange }
          value={ inputName }
          placeholder="Qual é o seu nome?"
        />
        <button
          disabled={ inputName.length < 3 }
          data-testid="login-submit-button"
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
