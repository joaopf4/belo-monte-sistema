import { TabelaFuncs, TableDiv } from "./styled";
import { toast } from "react-toastify";
import firebase from "../../services/firebaseConnection";
import { useState, useMemo } from "react";

export default function Tabela({ listaVacas, edit, setEdit, setVaca }) {
  const [vacasOrdenadas, setVacasOrdenadas] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);

  useMemo(() => {
    let vacasSortidas = [...listaVacas];

    if (sortConfig !== null) {
      vacasSortidas.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
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
    if (window.confirm("Deseja exlcuir esta vaca dos seus dados?")) {
      setEdit(false);
      setVaca({
        id: "",
        prenha: false,
        bezerroAoPe: false,
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
          toast.info("Vaca excluída");
        });
    }
  }

  async function editarVaca(id) {
    setEdit(true);
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

  function getAge(anoNascimento) {
    const today = new Date().getFullYear();
    const anoNascimentoVaca = today - anoNascimento;

    return anoNascimentoVaca;
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
                ascending={sortConfig.direction === "ascending"}
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
            <th>Bezerro ao Pé</th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("anoNascimento")}
              >
                Idade (anos)
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
                <tr key={vaca.id}>
                  <td>{vaca.id}</td>
                  <td>{vaca.prenha === true ? "Cheia (sim)" : "Vazia(nao)"}</td>
                  <td>{vaca.bezerroAoPe === true ? "Sim" : "Não"}</td>
                  <td>{getAge(vaca.anoNascimento)}</td>
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
                            prenha: false,
                            bezerroAoPe: false,
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
                    <button>Morreu</button>
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
