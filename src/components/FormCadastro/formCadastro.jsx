import React from "react";
import { FormContainer, Input, Button } from "./styled";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";

export default function FormCadastro({
  edit,
  vaca,
  setVaca,
  setEdit,
  listaVacas
}) {

  const handleChange = (e) => {
    const { id, value } = e.target;
    setVaca((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    console.log(vaca);
  };

  const handleIeP = (e) => {
    const today = new Date();
    const lastBabyBorn = new Date(e.target.value);
    console.log('hoje--->', today, 'nasc bezerro --->', lastBabyBorn)
    let IePmilisecs = today - lastBabyBorn;
    const IePdays = ((IePmilisecs/(60*60*24*1000)) % 365).toFixed(0);

    setVaca((prevState) => ({
      ...prevState,
      IeP: IePdays,
    }));
    
  }

  async function cadastraVaca(e) {
    e.preventDefault();
    const vacaCadastrada = listaVacas.some(
      (vacaBanco) => vacaBanco.id === vaca.id
    );

    if (vacaCadastrada) {
      toast.warning(`A vaca ${vaca.id} já está cadastrada!`);
      return;
    }

    await firebase
      .firestore()
      .collection("vacas")
      .doc(vaca.id)
      .set({
        id: vaca.id,
        prenha: vaca.prenha,
        bezerroAoPe: vaca.bezerroAoPe,
        idade: vaca.idade,
        observacoes: vaca.observacoes,
        IeP: vaca.IeP,
      })
      .then(async () => {
        await firebase
        .firestore()
        .collection("vacas")
        .doc(vaca.id)
        .get()
        setVaca({
          id: "",
          prenha: false, 
          bezerroAoPe: false, 
          idade: 0,
          observacoes: "",
          IeP: null,
        });
        toast.success("Vaca inserida com sucesso!");
      })
      .catch((error) => {
        toast.error("Não foi possível cadastrar essa vaca.", error);
      });
  };

  async function efetuaEdicao(e) {
    e.preventDefault();
    await firebase
    .firestore()
    .collection("vacas")
    .doc(vaca.id)
    .update({
      id: vaca.id,
      prenha: vaca.prenha,
      bezerroAoPe: vaca.bezerroAoPe,
      idade: vaca.idade,
      observacoes: vaca.observacoes,
    })
    .then(() => {
      handleIeP(e)
      setVaca({
        id: "",
        prenha: false, 
        bezerroAoPe: false,
        idade: 0,
        observacoes: "",
        IeP: null,
      })
      toast.success('Vaca atualizada com sucesso');
      setEdit(!edit);
    })
    .catch((error) => {
      console.log(error)
      toast.error('Erro ao atualizar a vaca. O seu id não pode ser alterado', error);
    })
  }


  return (
    <FormContainer>
    <form onSubmit={!edit ? cadastraVaca : efetuaEdicao}>
      <label htmlFor="id">ID:</label>
      <Input>
        <input
          name="id"
          required
          type="text"
          id="id"
          value={vaca.id}
          onChange={handleChange}
          placeholder="ID"
        />
      </Input>

      <label >Prenha:</label>
      <div style={{alignSelf: 'flex-start', margin: '20px'}}>
        <input
          type="radio"
          name="prenha"
          required
          id="prenha"
          onChange={() => setVaca((prevState) => ({
            ...prevState,
            prenha: true
          }))}
        />
          <label htmlFor="prenha">Sim</label> <br/><br/>
        <input
          type="radio"
          name="prenha"
          required
          id="nãoprenha"
          onChange={() => setVaca((prevState) => ({
            ...prevState,
            prenha: false
          }))}
        />
          <label htmlFor="nãoprenha">Não</label>
      </div>

      <label htmlFor="salarioBruto">Bezerro ao Pé:</label>
      <div style={{alignSelf: 'flex-start', margin: '20px'}}>
        <input
          type="radio"
          name="temBezerro"
          required
          id="bezerro"
          onChange={() => setVaca((prevState) => ({
            ...prevState,
            bezerroAoPe: true
          }))}
        />
          <label htmlFor="bezerro">Sim</label> <br/><br/>
          {
            vaca.bezerroAoPe === true && 
            <>
            <label htmlFor="IeP">Data nascimento do mais recente?</label>
            <input
              type="date"
              name="IeP"
              required
              id="IeP"
              onChange={handleIeP}
            /> <br/>
            </>
          }
        <input
          type="radio"
          name="temBezerro"
          required
          id="semBezerro"
          onChange={() => setVaca((prevState) => ({
            ...prevState,
            bezerroAoPe: false
          }))}
        />
          <label htmlFor="semBezerro">Não</label>
      </div>

      <label htmlFor="idade">Idade (em meses):</label>
      <Input>
        <input
          name="idade"
          required
          type="number"
          id="idade"
          value={vaca.idade}
          onChange={handleChange}
        />
      </Input>
      <label htmlFor="observacoes">Observações</label>
      <Input>
        <input
          name="observacoes"
          type="text"
          id="observacoes"
          value={vaca.observacoes}
          onChange={handleChange}
          placeholder="Informações extras sobre a vaca"
        />
      </Input>
      <Button type="submit">{!edit ? 'Cadastrar' : 'Editar'}</Button>
    </form>
  </FormContainer>
  );
}
