import React from "react";
import { FormContainer, Input, Button } from "./styled";
import firebase from "./../../firebaseConnection";
import { toast } from "react-toastify";

export default function FormCadastro({
  edit,
  vaca,
  setVaca,
  calculaIR,
  setEdit,
  listaFunc
}) {

  const handleChange = (e) => {
    const { id, value } = e.target;
    setVaca((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCpfMask = (e) => {
    const { id, value } = e.target;

    let newCPF = value;
    newCPF = newCPF.replace(/\D/g, "");
    newCPF = newCPF.replace(/(\d{3})(\d)/, "$1.$2");
    newCPF = newCPF.replace(/(\d{3})(\d)/, "$1.$2");
    newCPF = newCPF.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    if (newCPF.length < 15) {
      setVaca((prevState) => ({
        ...prevState,
        [id]: value,
        cpf: newCPF,
      }));
    }
  };

  async function cadastraFuncionario(e) {
    e.preventDefault();
    const funcCadastrado = listaFunc.some(
      (func) => func.id === vaca.cpf
    );

    if (funcCadastrado) {
      toast.warning("Este cpf já está cadastrado!");
      return;
    }

    await firebase
      .firestore()
      .collection("funcionarios")
      .doc(vaca.cpf)
      .set({
        nome: vaca.nome,
        cpf: vaca.cpf,
        salarioBruto: Number(vaca.salarioBruto),
        descontoPrev: Number(vaca.descontoPrev),
        dependentes: Number(vaca.dependentes),
      })
      .then(async () => {
        await firebase
        .firestore()
        .collection("funcionarios")
        .doc(vaca.cpf)
        .get()
        .then((snapshot) => {
          calculaIR(snapshot.data());
        });
        setVaca({
          nome:'',
          cpf:'',
          salarioBruto:'',
          descontoPrev:'',
          dependentes:''
        });
        toast.success("Vaca inserida com sucesso!");
      })
      .catch((error) => {
        toast.error("Não foi possível cadastrar o funcionário.", error);
      });
  };

  async function efetuaEdicao(e) {
    e.preventDefault();
    await firebase
    .firestore()
    .collection("funcionarios")
    .doc(vaca.cpf)
    .update({
      nome: vaca.nome,
      cpf: vaca.cpf,
      salarioBruto: vaca.salarioBruto,
      descontoPrev: vaca.descontoPrev,
      dependentes: vaca.dependentes
    })
    .then(() => {
      calculaIR(vaca);
      setVaca({
        nome:'',
        cpf:'',
        salarioBruto:'',
        descontoPrev:'',
        dependentes:''
      })
      toast.success('Funcionário atualizado com sucesso');
      setEdit(!edit);
    })
    .catch(() => {
      toast.error('Erro ao atualizar funcionário. O seu cpf não pode ser alterado');
    })
  }


  return (
    <FormContainer>
    <form onSubmit={!edit ? cadastraFuncionario : efetuaEdicao}>
      <label htmlFor="nome">ID:</label>
      <Input>
        <input
          name="nome"
          required
          type="text"
          id="nome"
          value={vaca.nome}
          onChange={handleChange}
          placeholder="Nome"
        />
      </Input>
      <label htmlFor="cpf">CPF:</label>
      <Input>
        <input
          name="cpf"
          required
          type="text"
          id="cpf"
          value={vaca.cpf}
          onChange={handleCpfMask}
          placeholder="000.000.000-00"
        />
      </Input>
      <label htmlFor="salarioBruto">Salário Bruto:</label>
      <Input>
        <input
          name="salarioBruto"
          required
          type="number"
          id="salarioBruto"
          value={vaca.salarioBruto}
          onChange={handleChange}
          placeholder="Só numeros(0000.00)"
        />
      </Input>
      <label htmlFor="descontoPrev">Desconto da previdência:</label>
      <Input>
        <input
          name="descontoPrev"
          required
          type="number"
          id="descontoPrev"
          value={vaca.descontoPrev}
          onChange={handleChange}
          placeholder="Só numeros(0000.00)"
        />
      </Input>
      <label htmlFor="dependentes">Número de dependentes:</label>
      <Input>
        <input
          name="dependentes"
          required
          type="number"
          id="dependentes"
          value={vaca.dependentes}
          onChange={handleChange}
          placeholder="Só numeros"
        />
      </Input>
      <Button type="submit">{!edit ? 'Cadastrar' : 'Editar'}</Button>
    </form>
  </FormContainer>
  );
}
