import React from "react";
import { styled } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Input from "./ui/Input";
import Button from "./ui/Button";

const H1 = styled.h1`
  color: red;
  font-size: 30px;
  font-weight: 600;
  background-color: yellowgreen;
`;

const StyledApp = styled.main`
  background-color: darkred;
  padding: 20px;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>Hello World</H1>
        <Input placeholder="ok boomer" type="number" />
        <Button>HA!</Button>
      </StyledApp>
    </>
  );
}
