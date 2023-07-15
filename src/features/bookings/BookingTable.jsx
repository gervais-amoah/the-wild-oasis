import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import useBookings from "./useBookings";

function BookingTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy");

  const { isLoading, bookings, error } = useBookings();

  if (isLoading) return <Spinner />;
  if (error) {
    console.log(error);
    return null;
  }
  if (!bookings || !bookings.length) return <Empty resource="bookings" />;

  //  Sort the filtered bookings
  let sortedBookings;
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  if (field === "startDate") {
    sortedBookings = bookings.sort(
      (a, b) => modifier * a[field].localeCompare(b[field])
    );
  } else {
    sortedBookings = bookings.sort((a, b) => modifier * (a[field] - b[field]));
  }

  return (
    <Menus>
      <Table columns="1.2fr 1.5fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
