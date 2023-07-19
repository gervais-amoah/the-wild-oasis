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
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    height: 62px;
    z-index: 2;
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
