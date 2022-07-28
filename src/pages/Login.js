import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import logoImg from '../images/Logo_useRecipes.png';
import '../CSS/Login.css';

const NUM = 6;

function Login() {
  const { email, setEmail } = useContext(RecipesContext);
  const [password, setPassword] = useState('');
  const history = useHistory();

  const validateEmail = () => (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));

  const validatePassword = () => password.length > NUM;

  const jsonEmail = JSON.stringify({ email });

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', jsonEmail);
    history.push('/foods');
  };

  return (
    <div className="loginComponent">
      <div className="boxContent">
        <img
          className="logoIMG"
          src={ logoImg }
          alt="iconLogo"
        />
        <input
          className="loginInput"
          type="email"
          data-testid="email-input"
          placeholder="E-mail"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          className="loginInput"
          type="password"
          data-testid="password-input"
          placeholder="Password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button
          className="loginBtn"
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ !(validatePassword() && validateEmail()) }
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default Login;
