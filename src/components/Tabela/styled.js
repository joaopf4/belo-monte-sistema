import styled from "styled-components";
import { theme } from "../../theme";

export const TableDiv = styled.div `
  width: 80%;
  overflow-x: auto;
`
export const TabelaFuncs = styled.table`
  border-collapse: collapse;
  width: 100%;
  th {
    padding: 12px 6px;
    text-align: left;
    background-color: ${theme.darkBlue};
    color: ${theme.white};
    border: 1px solid #ddd;
    button{
      cursor: pointer;
      border: 2px solid;
      border-radius: 4px;
      font-family: inherit;
      color: inherit;
      font-weight: 700;
      background-color: transparent;
      font-size: inherit;
      padding: 0.5em;
      margin-bottom: 1px;
      :active::after {
          background-color: red;
          /* content: '☝️';
          display: block;
          margin-left: 1em; */
        } 
    }
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  tr:hover {
    background-color: #ddd;
  }
  td {
    padding: 10px 6px 10px 6px;
    border: 1px solid #ddd;
    background-color: ${(props) => props.background};
    button {
      display: block;
      margin: auto;
    }
  }
`;
