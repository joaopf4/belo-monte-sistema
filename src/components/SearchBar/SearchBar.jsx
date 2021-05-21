/* eslint-disable eqeqeq */
import { SearchBarDiv } from "./styled";
import { toast } from "react-toastify";
import ToolTip from "../TooTip"
import firebase from "../../services/firebaseConnection";
import { useState, useEffect, useContext } from "react";
import {  Input } from "../FormVaca/styled";
import { Link } from "react-scroll";


export default function SearchBar({ listaVacas, setEdit, setVaca }) {
  const [searchId, setSearchId] = useState("");
  // const [foundVaca, setFoundVaca] = useContext();

  const handleChange = event => {
    setSearchId(event.target.value);
  };

  function acharVaca() {
    let vacaId = listaVacas.find(vaca => vaca.id === searchId);
    console.log(vacaId)
    // vacaId !== undefined && setFoundVaca(true)

  }
  

  return (
    <SearchBarDiv>
      <div>
        <h2>
          Suas vacas:
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
          <Link
            activeClass="active"
            to={searchId}
            // spy={true}
            smooth={true}
            offset={-10}
            duration={900}
          >
            <button onClick={acharVaca}>Go</button>
          </Link>
        </Input>
      </div>

    </SearchBarDiv>
  );
}
