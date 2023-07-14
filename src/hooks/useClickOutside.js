import { useEffect, useRef } from "react";

export function useClickOutside(onClickOutside, phase = true) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside(122);
      }
    };

    document.addEventListener("click", handleClickOutside, phase);

    return () => {
      document.removeEventListener("click", handleClickOutside, phase);
    };
  }, [onClickOutside, phase]);

  return ref;
}
