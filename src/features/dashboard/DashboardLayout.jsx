import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

import React from "react";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

export default function DashboardLayout() {
  const { isLoading, bookings, numDays } = useRecentBookings();
  const { isLoading: loadingStays, stays } = useRecentStays();

  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading || loadingStays || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={stays}
        cabinsCount={cabins.length}
        numDays={numDays}
      />
    </StyledDashboardLayout>
  );
}
