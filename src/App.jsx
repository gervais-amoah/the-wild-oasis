import React from "react";
import { styled } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Header from "./ui/Header";
import Row from "./ui/Row";

const StyledApp = styled.main`
  background-color: #dc4c4c;
  padding: 20px;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row direction="horizontal">
            <Header as="h1">The Wild Oasis</Header>
            <div>
              <Header as="h2">Check in and out</Header>
              <Button onClick={() => alert("Check in")}>Check in</Button>
              <Button onClick={() => alert("Check out")}>Check out</Button>
            </div>
          </Row>

          <Row direction="vertical">
            <Header as="h3">Form</Header>
            <form>
              <Input type="numver" placeholder="Number of guests" />
              <Input type="numver" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}
