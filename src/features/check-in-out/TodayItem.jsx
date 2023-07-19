import styled from "styled-components";

const StyledTodayItem = styled.li`
  /* display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem; */
  /* gap: 1.2rem; */

  display: flex;
  align-items: center;
  gap: 2rem;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media (max-width: 576px) {
    flex-wrap: wrap;
    gap: 1.5rem;
  }
`;

const GuestBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const CheckInOutBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
  padding-left: 2rem;
`;

const Guest = styled.div`
  font-weight: 500;
`;

import React from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";
import CheckoutButton from "./CheckoutButton";

export default function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Depaerting</Tag>}

      <GuestBox>
        <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
        <Guest>{guests.fullName}</Guest>
      </GuestBox>

      <CheckInOutBox>
        <div>{numNights} nights</div>

        {status === "unconfirmed" && (
          <Button
            size="small"
            $variation="primary"
            as={Link}
            to={`/checkin/${id}`}
          >
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <CheckoutButton bookingId={id}>Check out</CheckoutButton>
        )}
      </CheckInOutBox>
    </StyledTodayItem>
  );
}
