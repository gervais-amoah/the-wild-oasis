import React from "react";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

export default function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "no-discount", label: "Without Discount" },
        ]}
      />
    </TableOperations>
  );
}
