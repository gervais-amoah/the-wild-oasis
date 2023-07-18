import React from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/ModeContext";

export default function ToggleMode() {
  const { isDarkMode, toggleMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleMode} style={{ outline: "none" }}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}
