import React, { useState, useEffect } from "react";
import { Cadastro } from "./styled";
import firebase from "./../../firebaseConnection";
import Tabela from "../../components/Tabela"
import FormCadastro from "../../components/FormCadastro/formCadastro";

function CadastroFunc() {
  const [vaca, setVaca] = useState({
    id: "",
    prenha: true ? {tempoPrenha: 'date', dataExame: 'date'} : {temBezerro: false},
    bezerroAoPe: true ? {mesNascimento: 'date', sexo: ''} : false,
    idade: "data atual - data nascimento",
    observacoes: "",
    IEP: 'data atual - data nasc. ultimo bezerro',
    morte: true && 'mandar id pra tabela de falecidos' 
  });
  const [listaVacas, setListaVacas] = useState([]);
  const [edit, setEdit] = useState(false);

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
              IEP: item.data().IEP,
              morte: item.data().morte,
              descontoIR: item.data().descontoIR,
            })
          })
          setListaVacas(lista);
        });
    }
    buscaVacas();
  }, []);

  // async function calculaIR(funcionario) {
  //   const deducao = 164.56;
  //   const salarioBaseIR =
  //     funcionario.salarioBruto -
  //     funcionario.descontoPrev -
  //     deducao * funcionario.dependentes;
  //   setVaca((prevState) => ({
  //     ...prevState,
  //     salarioBase: salarioBaseIR,
  //   }));

  //   let aliquota = 0;
  //   let parcelaDeducao = 0;

  //   if (salarioBaseIR <= 1903.98) {
  //     aliquota = 0;
  //     parcelaDeducao = 0;
  //   } else if (salarioBaseIR > 1903.98 && salarioBaseIR <= 2826.65) {
  //     parcelaDeducao = 142.8;
  //     aliquota = 0.075;
  //   } else if (salarioBaseIR > 2826.65 && salarioBaseIR <= 3751.05) {
  //     parcelaDeducao = 354.8;
  //     aliquota = 0.15;
  //   } else if (salarioBaseIR > 3751.05 && salarioBaseIR <= 4664.68) {
  //     parcelaDeducao = 636.13;
  //     aliquota = 0.225;
  //   } else if (salarioBaseIR > 4664.68) {
  //     parcelaDeducao = 869.36;
  //     aliquota = 0.275;
  //   }
  //   const descontoIRRF = salarioBaseIR * aliquota - parcelaDeducao;
  //   setVaca((prevState) => ({
  //     ...prevState,
  //     descontoIR: descontoIRRF.toFixed(2),
  //   }));
  //   await firebase
  //     .firestore()
  //     .collection("funcionarios")
  //     .doc(funcionario.cpf)
  //     .set({
  //       ...funcionario,
  //       descontoIR: descontoIRRF.toFixed(2),
  //       salarioBase: salarioBaseIR,
  //     });

  //   return descontoIRRF;
  // };

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
      <br />
      <br />
    </Cadastro>
  );
}

export default CadastroFunc;
