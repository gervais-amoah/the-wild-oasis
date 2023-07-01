import React from "react";
import { styled } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Header from "./ui/Header";

const StyledApp = styled.main`
  background-color: #dc4c4c;
  padding: 20px;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Header as="h1">Hello World</Header>
        <Header as="h2">Check in and out</Header>
        <Input placeholder="ok boomer" type="number" />
        <Button>HA!</Button>
      </StyledApp>
    </>
  );
}
