import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { FormContainer, Input } from '../../components/FormVaca/styled';

function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [passoword, setPassoword] = useState('');

  const {signUp, loadingAuth} = useContext(AuthContext);
  
  function handleSubmit(e) {
    e.preventDefault();
    if(nome !=='' && email !=='' && passoword !==''){
      signUp(email, passoword, nome)
    }
  }

    return (
      <FormContainer>
          <form onSubmit={handleSubmit}>
            <h1>Cadastrar um usuário</h1>
            <Input>
                <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value) } required />
            </Input>
            <Input>
                <input type="email" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value) } required />
            </Input>
            <Input>
                <input type="password" placeholder="*******" value={passoword} onChange={(e) => setPassoword(e.target.value) } required />
            </Input>
            <button type="submit">{loadingAuth ? 'Carregando' : 'Acessar'}</button>
          </form>

        <Link to="/">Já tem uma conta? Entre</Link>
      </FormContainer>
    );
  }
  
  export default SignUp;
  