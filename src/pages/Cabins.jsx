import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(() => {
    getCabins()
      .then((data) => console.log("Data received \n", data))
      .catch((err) => console.log("Some error occures\n", err));
  });

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <img
        src="https://tcpygydqvycpfkfjxicc.supabase.co/storage/v1/object/public/cabin-images/cabin-008.jpg"
        alt="Cabins interior"
      />
    </Row>
  );
}

export default Cabins;
