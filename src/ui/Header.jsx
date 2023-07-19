import React from "react";
import { styled } from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 915px) {
    padding: 2.4rem 2.5rem;
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    height: 62px;
    z-index: 2;
  }

  @media (max-width: 576px) {
    padding: 2.4rem 2rem;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}
