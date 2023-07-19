import React, { useState } from "react";
import { styled } from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import ToggleMode from "./ToggleMode";
import BurgerMenu from "./BurgerMenu";
import { CgMenuRightAlt } from "react-icons/cg";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <ToggleMode />
      </li>
      <li>
        <Logout />
      </li>
      <li>
        <BurgerMenu icon={<CgMenuRightAlt />} />
      </li>
    </StyledHeaderMenu>
  );
}
