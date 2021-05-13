import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { FormContainer, Input } from '../../components/FormCadastro/styled';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn, loadingAuth} = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    signIn(email, password)
  }

    return (
      <FormContainer>
          <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>
            <Input>
                <input type="email" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value) } required />
            </Input>
            <Input>
                <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value) } required />
            </Input>
            <button type="submit">{loadingAuth ? 'Carregando' : 'Acessar'}</button>
          </form>

        <Link to="/register">Criar uma conta</Link>
      </FormContainer>
    );
  }
  
  export default SignIn;
  