import { css, styled } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.direction === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.direction === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

Row.defaultProps = { direction: "vertical" };

export default Row;
