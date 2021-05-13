import React, { useState, useEffect, useContext } from "react";
import firebase from "../../services/firebaseConnection";
import { AuthContext } from '../../contexts/auth'
import Tabela from "../../components/Tabela"
import FormCadastro from "../../components/FormCadastro/formCadastro";
import { Cadastro } from "./styled";

function CadastroVaca() {
  const [vaca, setVaca] = useState({
    id: "",
    prenha: false, // true ? {tempoPrenha: 'date', dataExame: 'date'} : {temBezerro: false},
    bezerroAoPe: false, // true ? {mesNascimento: 'date', sexo: ''} : false,
    idade: 0,
    observacoes: "",
    IeP: null,
    // morte: true && 'mandar id pra tabela de falecidos' 
  });
  const [listaVacas, setListaVacas] = useState([]);
  const [edit, setEdit] = useState(false);
  const { signOut } = useContext(AuthContext)

  useEffect(() => {
    async function buscaVacas() {
      await firebase
        .firestore()
        .collection("vacas")
        .onSnapshot((doc) => {
          let lista = [];
          doc.forEach((item) => {
            lista.push({
              id: item.id,
              prenha: item.data().prenha,
              bezerroAoPe: item.data().bezerroAoPe,
              idade: item.data().idade,
              observacoes: item.data().observacoes,
              IeP: item.data().IeP,
            })
          })
          setListaVacas(lista);
        });
    }
    buscaVacas();
  }, []);

  return (
    <Cadastro>
      <header>
        <h1>Belo Monte - Tabela de Vacas</h1>
      </header>
      <FormCadastro 
          edit={edit}
          vaca={vaca}
          setVaca={setVaca}
          // calculaIR={calculaIR}
          setEdit={setEdit}
          listaVacas={listaVacas}
      />

      <h2>Suas vacas: </h2>

      <Tabela 
        listaVacas={listaVacas}
        edit={edit}
        setEdit={setEdit}
        setVaca={setVaca}
      />

      <br />
      <button onClick={ () => signOut() }>Fazer logout</button>
      <br />
      <br />
    </Cadastro>
  );
}

export default CadastroVaca;
