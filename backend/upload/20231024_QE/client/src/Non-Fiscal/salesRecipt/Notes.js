import { useContext } from "react";
import { Statee } from "./context/stateContext";

export default function Notes() {
  const { notes } = useContext(Statee);

  return (
    <>
      {/* <section className="mt-10 mb-5">
        <h3>Additional notes</h3>
        <p className="lg:w-1/2 text-justify">{notes}</p>
      </section> */}
    </>
  );
}
