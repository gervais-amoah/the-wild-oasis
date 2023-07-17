import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";

import { useNavigate } from "react-router-dom";
import { useDeleteBooking } from "./useDeleteBooking";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useBooking } from "./useBooking";
import { useCheckOut } from "./useCheckout";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();

  const { deleteBooking, isDeleting } = useDeleteBooking();

  const { checkOut, isCheckingOut } = useCheckOut();

  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="delete">
            <Button $variation="danger">Delete the booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate("/bookings"),
                })
              }
              disabled={isDeleting}
              resourceName="booking"
            />
          </Modal.Window>
        </Modal>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}
        <Button
          $variation="secondary"
          onClick={moveBack}
          disabled={isCheckingOut}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
