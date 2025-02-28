import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
  max-width: calc(100% - 2rem);
  margin: 0 auto;
  width: 100%;

  @media (max-width: 767px) {
    width: calc(100% - 2rem);
    padding: 2.4rem 1.5rem;
  }
`;

Form.defaultProps = { type: "regular" };

export default Form;
