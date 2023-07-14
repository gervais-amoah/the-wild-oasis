import React, { useState } from "react";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";

export default function AddCabin() {
  const [isModalOpen, setIsModalOPen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsModalOPen(!isModalOpen)}>
        Add new cabin
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOPen(false)}>
          <CreateCabinForm onCloseModal={() => setIsModalOPen(false)} />
        </Modal>
      )}
    </div>
  );
}
