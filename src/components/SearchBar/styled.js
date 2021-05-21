import styled from "styled-components";
import { theme } from "../../theme";

export const SearchBarDiv = styled.div `
  width: 80%;
  padding: 10px;
  font-size: 1rem;
  background-color: ${theme.darkBlue};
  color: ${theme.white};
  margin: 20px 0;
  display: grid;
  grid-template-columns: 3fr 2fr 1.5fr;
  grid-template-rows: 50px;
  align-items: center;
  grid-template-areas:
    ". . .";
  gap: 5px;
  div:nth-of-type(2){
    display: flex;
    justify-content: flex-end;
  }
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
`