import React, { useState, useEffect, useContext } from "react";
import firebase from "../../services/firebaseConnection";
import { AuthContext } from '../../contexts/auth'
import Tabela from "../../components/Tabela"
import FormVaca from "../../components/FormVaca/formVaca";
import SearchBar from "../../components/SearchBar/";
import { Cadastro } from "./styled";

function CadastroVaca() {
  const [vaca, setVaca] = useState({
    id: "",
    prenha: null, // true ? {tempoPrenha: 'date', dataExame: 'date'} : {temBezerro: false},
    bezerroAoPe: null, // true ? {mesNascimento: 'date', sexo: ''} : false,
    anoNascimento: new Date(),
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
              anoNascimento: item.data().anoNascimento,
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
      <FormVaca 
          edit={edit}
          vaca={vaca}
          setVaca={setVaca}
          setEdit={setEdit}
          listaVacas={listaVacas}
      />

      <SearchBar
        listaVacas={listaVacas}
        vaca={vaca}
        animal="Suas Vacas:"
        setEdit={setEdit}
        edit={edit}
        setVaca={setVaca}
      />

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
