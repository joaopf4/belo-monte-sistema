import { TabelaFuncs, TableDiv } from "./styled";
import { toast } from "react-toastify";
import firebase from "./../../firebaseConnection"

export default function Tabela({
  listaVacas,
  edit,
  setEdit,
  setFuncionario,
}) {

  async function excluirFuncionario(id) {
    if (window.confirm('Deseja exlcuir esta vaca dos seus dados?')) {
      setEdit(false);
      setFuncionario({
        id: "",
        prenha: false, 
        bezerroAoPe: false,
        idade: 0,
        observacoes: "",
        IeP: 0,
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
      setFuncionario({
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
            {listaVacas.map((vaca) => {
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
                        setFuncionario({
                          nome: "",
                          cpf: "",
                          salarioBruto: "",
                          descontoPrev: "",
                          dependentes: "",
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
