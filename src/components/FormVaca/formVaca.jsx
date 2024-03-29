// import { useState } from "react";
import React from "react";
import { FormContainer, Input, Button } from "./styled";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { scroller } from "react-scroll";

export default function FormVaca({
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
    //  console.log(dateRange(vaca.anoNascimento, minAge(new Date())).length);
    console.log(vaca)
     
  };

  // const [idade, setIdade] = useState(0);

  const handleIeP = (e) => {
    const today = new Date();
    const lastBabyBorn = new Date(e.target.value);
    let IePmilisecs = today - lastBabyBorn;
    const IePdays = ((IePmilisecs/(60*60*24*1000)) % 365).toFixed(0);

    setVaca((prevState) => ({
      ...prevState,
      IeP: IePdays,
    }));
  }

  function scrollToVaca() {
    scroller.scrollTo(`${vaca.id}`, {
      duration: 800,
      delay: 200,
      smooth: true,
      offset: -20
    })
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
        anoNascimento: vaca.anoNascimento,
        observacoes: vaca.observacoes,
        IeP: vaca.IeP,
      })
      .then(async () => {
        await firebase
        .firestore()
        .collection("vacas")
        .doc(vaca.id)
        .get()
        scrollToVaca();
        setVaca({
          id: "",
          prenha: null, 
          bezerroAoPe: null, 
          anoNascimento: 0,
          observacoes: "",
          IeP: null,
        });
        toast.success(`Vaca ${vaca.id} inserida com sucesso!`);
      })
      .catch((error) => {
        toast.error("Não foi possível cadastrar essa vaca.", error);
        console.log(error)
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
      anoNascimento: vaca.anoNascimento,
      observacoes: vaca.observacoes,
    })
    .then(() => {
      scrollToVaca();
      handleIeP(e)
      setVaca({
        id: "",
        prenha: null, 
        bezerroAoPe: null,
        anoNascimento: 0,
        observacoes: "",
        IeP: null,
      })
      toast.success(`Vaca ${vaca.id} atualizada com sucesso`);
      setEdit(!edit);
    })
    .catch((error) => {
      console.log(error)
      toast.error(`Erro ao atualizar vaca ${vaca.id}. O seu id não pode ser alterado`, error);
    })
  } 

  function minAge(insertDate) {
    let date = insertDate;
    let mm = date.getMonth()+1; //January is 0!
    let yyyy = date.getFullYear();

    if(mm<10){
      mm='0'+mm
    } 

    date = yyyy+'-'+mm;
    
    return date;
  }


  return (
    <FormContainer>
    <form onSubmit={(!edit ? cadastraVaca : efetuaEdicao)} name='form'>
      <label htmlFor="id">ID:</label>
      <Input width="100%">
        <input
          name="id"
          required
          type="number"
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
          checked={vaca.prenha === true}
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
          checked={vaca.prenha === false}
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
          checked={vaca.bezerroAoPe === true}
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
          checked={vaca.bezerroAoPe === false}
          required
          id="semBezerro"
          onChange={() => setVaca((prevState) => ({
            ...prevState,
            bezerroAoPe: false
          }))}
        />
          <label htmlFor="semBezerro">Não</label>
      </div>

      <label htmlFor="anoNascimento">Ano e mês de nascimento:</label>
      <Input width="100%" >
        <input
          name="anoNascimento"
          required          
          type="month"  
          min={`${(parseInt(minAge(new Date()).split('-')[0])-20).toString()}-${minAge(new Date()).split('-')[1]}`}
          max={minAge(new Date())}
          step="1" 
          id="anoNascimento"
          value={vaca.anoNascimento}
          onChange={handleChange}
        />
      </Input>
      <label htmlFor="observacoes">Observações</label>
      <Input width="100%" marginBottom="40px">
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
