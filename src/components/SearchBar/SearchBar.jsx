/* eslint-disable eqeqeq */
import { useState } from "react";
import { toast } from "react-toastify";
import { scroller } from "react-scroll";
import {  Input } from "../FormVaca/styled";
import { SearchBarDiv, SearchBtn } from "./styled";


import firebase from "../../services/firebaseConnection";


export default function SearchBar({ listaVacas, animal, setEdit, setVaca, edit }) {
  const [searchId, setSearchId] = useState("");

  const handleChange = event => {
    setSearchId(event.target.value);
  };


  function scrollToForm() {
    scroller.scrollTo(`form`, {
      duration: 400,
      delay: 0,
      smooth: true,
      offset: -20
    })
  }


  async function editarVaca(id) {
    const vacaId = listaVacas.some(
      (vacaBanco) => vacaBanco.id === id
    );
    if(!vacaId) {
      toast.warning(`Nenhuma vaca com id ${id} encontrada.`);
      return;
    }
      setEdit(true);
      scrollToForm();
      setSearchId('');
      await firebase
        .firestore()
        .collection("vacas")
        .doc(id)
        .get()
        .then((snapshot) => {
          setVaca({
            id: snapshot.data().id,
            prenha: snapshot.data().prenha,
            bezerroAoPe: snapshot.data().bezerroAoPe,
            anoNascimento: snapshot.data().anoNascimento,
            observacoes: snapshot.data().observacoes,
          });
        });
  }

  return (
    <SearchBarDiv>
      <div>
        <h2>
          {animal}
        </h2>
      </div>
      <div>
        <strong color='black'>Busca por ID:</strong>
      </div>
      <div>
        <Input width="100%" margin='0'>
          <input
            type="number"
            placeholder="ID"
            onChange={handleChange}
            value={searchId}
          />

          {!edit ? (
            <SearchBtn onClick={(() => editarVaca(searchId))}>Edit</SearchBtn>
          ):(
            <SearchBtn
              onClick={() => {
                setEdit(false);
                setVaca({
                  id: "",
                  prenha: null,
                  bezerroAoPe: null,
                  anoNascimento: 0,
                  observacoes: "",
                  IeP: null,
                });
              }}
            >
              X
            </SearchBtn>
          )          
          }
        </Input>
      </div>

    </SearchBarDiv>
  );
}
