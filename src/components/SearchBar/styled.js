import styled from "styled-components";
import { theme } from "../../theme";
import { Button } from "../FormVaca/styled";

export const SearchBarDiv = styled.div `
  width: 80%;
  padding: 10px;
  font-size: 1rem;
  background-color: ${theme.darkBlue};
  color: ${theme.white};
  margin: 20px 0;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  grid-template-rows: 50px;
  align-items: center;
  grid-template-areas:
    ". . .";
  gap: 5px;
  @media(max-width: 500px) {
    grid-template-columns: 1.5fr 2fr 4.5fr;
  }
  div:nth-of-type(2){
    display: flex;
    justify-content: flex-end;
  }
  a {
    display: flex;
    align-items: center;
  }
  h2 {    
    @media(max-width: 400px) {
      font-size: 18px;// 15px
    }
  }
  strong {    
    @media(max-width: 400px) {
      font-size: 12px;// 15px
    }
  }
`

export const SearchBtn = styled(Button)`
  height: 70%;
  padding: 6px;
  box-shadow: rgba(17, 16, 16, 1) 2px 2px;
  align-self: center;
  display: flex;
  align-items: center;
  :active {
    transform: translateY(1px);
    transition: 0.15s;
    box-shadow: rgba(17, 16, 16, 1) 1px 1px;
  }
  @media(max-width: 400px) {
      font-size: 12px;// 15px
    }
`