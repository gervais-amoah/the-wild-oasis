import React from "react";
import { styled } from "styled-components";
import ButtonIcon from "./ButtonIcon";

const BurgerMenuBox = styled.div`
  position: relative;
  z-index: 100;
  @media (min-width: 916px) {
    display: none;
  }
`;

export default function BurgerMenu({ icon }) {
  function toggleBurgerMenu() {
    if (document.querySelector("#aside").classList.contains("show")) {
      document.querySelector("#aside").classList.remove("show");
    } else {
      document.querySelector("#aside").classList.add("show");
    }
  }

  // useEffect(() => {
  //   if (openMenu) {
  //     document.querySelector("#aside").classList.add("show");
  //   } else {
  //     document.querySelector("#aside").classList.remove("show");
  //   }
  // });

  return (
    <BurgerMenuBox>
      <ButtonIcon onClick={toggleBurgerMenu} style={{ outline: "none" }}>
        {icon}
      </ButtonIcon>
    </BurgerMenuBox>
  );
}
