import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { useUser } from "../features/authentication/useUser";
import { toast } from "react-hot-toast";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media (max-width: 767px) {
    width: auto;
    padding: 2rem 1.5rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, onCloseModal, disabled }) {
  const { isVisitor } = useUser();

  function handleConfirm() {
    if (isVisitor) {
      toast.error("Visitors cannot do that action");
      return;
    }
    onConfirm();
  }

  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          $variation="secondary"
          onClick={onCloseModal}
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button $variation="danger" onClick={handleConfirm} disabled={disabled}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
