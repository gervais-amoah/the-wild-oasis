import React from "react";
import { CgClose } from "react-icons/cg";
import { styled } from "styled-components";
import BurgerMenu from "./BurgerMenu";
import Logo from "./Logo";
import MainNav from "./MainNav";

import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside.attrs({ id: "aside" })`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1/ -1;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 915px) {
    /* background-color: #361111; */
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    width: 100%; //100vw;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  &.show {
    transform: translateX(0);
  }
`;

const BurgerMenuPosition = styled.div`
  position: relative;
  z-index: 100;
`;

export default function Sidebar() {
  return (
    <StyledSidebar>
      <BurgerMenu icon={<CgClose />} />
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </StyledSidebar>
  );
}
