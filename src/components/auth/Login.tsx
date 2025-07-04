import { useForm } from '../../hooks/useForm';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
  const { handleLoginWithGoogle, handleLoginWithCredentials } = useContext(AuthContext);

  const { handleChange, email, pass } = useForm({
    initialState: {
      email: '',
      pass: ''
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLoginWithCredentials(email, pass);
  };

  return (
    <div className="container-auth">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={email}
        />
        <input
          name="pass"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={pass}
        />

        <div className="container-buttons">
          <button type="submit">Log In</button>
        </div>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Немає акаунту?&nbsp;
        <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
          Зареєструватися
        </Link>
      </p>
    </div>
  );
};
