/* eslint-disable eqeqeq */
import { TabelaFuncs, TableDiv } from "./styled";
import { toast } from "react-toastify";
import { scroller } from "react-scroll";
import ToolTip from "../TooTip"
import firebase from "../../services/firebaseConnection";
import { useState, useMemo } from "react";

export default function Tabela({ listaVacas, edit, setEdit, setVaca }) {
  const [vacasOrdenadas, setVacasOrdenadas] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [ocorrencias, setOcorrencias] = useState(null)

  useMemo(() => {
    let vacasSortidas = [...listaVacas];
    
    if (sortConfig !== null) {
      vacasSortidas.sort((a, b) => {
        if (Number(a[sortConfig.key]) < Number(b[sortConfig.key])) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (Number(a[sortConfig.key]) > Number(b[sortConfig.key])) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    setVacasOrdenadas(vacasSortidas);
    return vacasSortidas;
  }, [listaVacas, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }
      setSortConfig({ key, direction });
  };

  async function excluirVaca(id) {
    if (window.confirm(`Deseja exlcuir a vaca ${id} dos seus dados?`)) {
      setEdit(false);
      setVaca({
        id: "",
        prenha: null,
        bezerroAoPe: null,
        anoNascimento: 0,
        observacoes: "",
        IeP: null,
      });
      await firebase
        .firestore()
        .collection("vacas")
        .doc(id)
        .delete()
        .then(() => {
          toast.info(`Vaca ${id} excluída`);
        });
    }
  }

  function scrollToForm() {
    scroller.scrollTo(`form`, {
      duration: 400,
      delay: 0,
      smooth: true,
      offset: -20
    })
  }

  async function editarVaca(id) {
    setEdit(true);
    scrollToForm();
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

  function calcIdadeMeses(startDate, endDate) {
    let start = startDate.split('-');
    let end = endDate.split('-');
    let startYear = parseInt(start[0]);
    let endYear = parseInt(end[0]);
    let months = [];

    for(let i = startYear; i <= endYear; i++) {
      let endMonth = i !== endYear ? 11 : parseInt(end[1]) - 1;
      let startMon = i === startYear ? parseInt(start[1])-1 : 0;
      for(let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
        var month = j+1;
        var displayMonth = month < 10 ? '0'+month : month;
        months.push([i, displayMonth, '01'].join('-'));
      }
    }
    return months.length;
  }

  function transformaIdadeAnosEMeses(totalMeses) {
    let anos = Math.floor(totalMeses/12);
    let meses = totalMeses % 12

    return `${anos} anos e ${meses} meses`;
  }

  let numeroOc = [...listaVacas];
  function numeroDeOcorrencias(key, value) {

    switch(key) {
      case 'prenha':
       numeroOc = [...listaVacas].filter((vaca) => vaca.prenha == value)
       setOcorrencias(numeroOc.length)
       return ocorrencias;
      case 'bezerroAoPe':
       numeroOc = [...listaVacas].filter((vaca) => vaca.bezerroAoPe == value)
       setOcorrencias(numeroOc.length)
       return ocorrencias;
      case 'idade':
       numeroOc = [...listaVacas].filter((vaca) => vaca.anoNascimento == value)
       setOcorrencias(numeroOc.length)
       return ocorrencias;
      default: 
      return console.log(numeroOc.length);
    }
  }

  return (
    <TableDiv>
      <TabelaFuncs>
        <thead>
          <tr>
            <th>
              <button 
                type="button" 
                onClick={() => requestSort("id")}
              >
                ID
              </button>
            </th>
            <th>
              <button 
                type="button" 
                onClick={() => requestSort("prenha")}>
                Prenha
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("bezerroAoPe")}
              >
                Bezerro ao Pé
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("anoNascimento")}
              >
                Idade (meses)
              </button>
            </th>
            <th>Observações</th>
            <th>IeP(dias)</th>
            <th>Editar</th>
            <th>Morte?</th>
            <th>Excluir</th>
          </tr>
        </thead>
        {listaVacas.length !== 0 && (
          <tbody>
            {vacasOrdenadas.map((vaca) => {
              return (
                <tr key={vaca.id} id={vaca.id}>
                  
                  <td onClick={() => numeroDeOcorrencias('', vaca.id)}  >
                    <ToolTip toolTipText={numeroOc.length + " Vacas no total"}>{vaca.id}</ToolTip> 
                  </td>
                  
                  <td onMouseOver={() => numeroDeOcorrencias('prenha', vaca.prenha)}>
                    <ToolTip toolTipText={ocorrencias + (vaca.prenha === true ? " Vacas cheias" : " Vacas vazias")}>
                      {vaca.prenha === true ? "Cheia" : "Vazia"}
                    </ToolTip> 
                  </td>
                  <td onMouseOver={() => numeroDeOcorrencias('bezerroAoPe', vaca.bezerroAoPe)}>
                    <ToolTip toolTipText={ocorrencias + (vaca.bezerroAoPe === true ? " Vacas com bezerro" : " Vacas sem bezerro")}>
                      {vaca.bezerroAoPe === true ? "Sim" : "Não"}
                    </ToolTip>
                  </td>
                  <td onMouseOver={() => numeroDeOcorrencias('idade', vaca.anoNascimento)}>
                    <ToolTip toolTipText={ocorrencias + " Vaca(s) com " + calcIdadeMeses(vaca.anoNascimento, minAge(new Date())) + " meses"}>
                      {transformaIdadeAnosEMeses(calcIdadeMeses(vaca.anoNascimento, minAge(new Date())))}
                    </ToolTip>
                  </td>
                  <td>{vaca.observacoes}</td>
                  <td>{vaca.IeP}</td>
                  <td>
                    {!edit ? (
                      <button onClick={() => editarVaca(vaca.id)}>
                        Editar
                      </button>
                    ) : (
                      <button
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
                        Cancelar
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => console.log('teste aqui funções novas')}>Morreu</button>
                  </td>
                  <td>
                    <button onClick={() => excluirVaca(vaca.id)}>X</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </TabelaFuncs>
    </TableDiv>
  );
}
