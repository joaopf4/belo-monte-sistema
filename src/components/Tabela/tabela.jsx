import { TabelaFuncs, TableDiv } from "./styled";
import { toast } from "react-toastify";
import firebase from "../../services/firebaseConnection"

export default function Tabela({
  listaVacas,
  edit,
  setEdit,
  setVaca,
}) {

  async function excluirFuncionario(id) {
    if (window.confirm('Deseja exlcuir esta vaca dos seus dados?')) {
      setEdit(false);
      setVaca({
        id: "",
        prenha: false, 
        bezerroAoPe: false,
        idade: 0,
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
  };

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
        idade: snapshot.data().idade,
        observacoes: snapshot.data().observacoes,
      })
    })
  }

  return (
    <TableDiv>
      <TabelaFuncs>
        <thead>
          <tr>
            <th>ID</th>
            <th>Prenha</th>
            <th>Bezerro ao Pé</th>
            <th>Idade (meses)</th>
            <th>Observações</th>
            <th>IeP(dias)</th>
            <th>Editar</th>
            <th>Morte?</th>
            <th>Excluir</th>
          </tr>
        </thead>
        {listaVacas.length !== 0 && (
          <tbody>
            {listaVacas
            .sort(function(a, b) {
              const vacaA = Number(a.id)
              const vacaB = Number(b.id)
              let comparison = 0;
              if(vacaA > vacaB){
                comparison = 1;
              } else if (vacaA < vacaB) {
                comparison = -1;
              }
              return comparison
            })
            .map((vaca) => {
              return (
                <tr key={vaca.id}>
                  <td>{vaca.id}</td>
                  <td>{vaca.prenha === true ? 'Cheia (sim)' : 'Vazia(nao)'}</td>
                  <td>{vaca.bezerroAoPe === true ? 'Sim' : 'Não'}</td>
                  <td>{vaca.idade}</td>
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
                          idade: 0,
                          observacoes: "",
                          IeP: null,
                        });
                      }}
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                  <td><button>Morreu</button></td>
                  <td>
                    <button onClick={() => excluirFuncionario(vaca.id)}>
                      X
                    </button>
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
