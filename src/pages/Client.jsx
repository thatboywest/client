import ClientNav from "../components/ClientNav";
import Pic from "../assets/Pic1.svg";
import "./Client.css";

function Client(params) {
  return (
    <>
      <ClientNav />
      <div className="hero">
        <div className="description">
          <h1>SwiftConnect</h1>
          <p>
            "Welcome to SwiftConnect Couriers, where seamless logistics meets
            exceptional service! At SwiftConnect, we're not just delivering
            packages; we're forging connections, bridging distances, and
            ensuring your parcels reach their destination with speed, precision,
            and a touch of unparalleled care. Our commitment to reliability,
            innovation, and customer satisfaction is what propels us forward.
            Join us on this journey, as we redefine the art of courier services,
            one swift delivery at a time!"
          </p>
          <button>Connect </button>
        </div>
        <div className="image">
          <img src={Pic} alt="" />
        </div>
      </div>
    </>
  );
}
export default Client;
