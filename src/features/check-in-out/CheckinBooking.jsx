import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

import { useEffect, useState } from 'react';
import { useMoveBack } from '../../hooks/useMoveBack';
import Checkbox from '../../ui/Checkbox';
import Spinner from '../../ui/Spinner';
import { formatCurrency } from '../../utils/helpers';
import { useBooking } from '../bookings/useBooking';
import { useCheckIn } from './useCheckIn';
import { useSettings } from '../settings/useSettings';
import Empty from '../../ui/Empty';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;

  @media (max-width: 576px) {
    padding: 2.4rem 2rem;
  }
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();

  const { isLoading, booking } = useBooking();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { checkin, isCheckingIn } = useCheckIn();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  if (!booking) return <Empty resource="booking" />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    status,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBeakfastPrice =
    (settings?.breakfastPrice || 0) * numGuests * numNights;

  function handleCheckin() {
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          extrasPrice: optionalBeakfastPrice,
          totalPrice: totalPrice + optionalBeakfastPrice,
          hasBreakfast: true,
        },
      });
    } else {
      checkin({ bookingId });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            // disabled={confirmPaid || isCheckingIn}
            id="breakfast"
          >
            Client wants to add breakfast for{' '}
            {formatCurrency(optionalBeakfastPrice)} ?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={setConfirmPaid}
          disabled={confirmPaid || isCheckingIn}
          id="confirmPaid"
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBeakfastPrice
              )} (Total price: ${formatCurrency(
                totalPrice
              )} and Breakfast price: ${formatCurrency(
                optionalBeakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button
            onClick={handleCheckin}
            disabled={!confirmPaid || isCheckingIn}
          >
            Check in booking #{bookingId}
          </Button>
        )}
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
