import React, { useRef, useState } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

const SearchAddress = ({ getLocation }) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const inpuRef = useRef();

  const handlePlaceChanged = () => {
    const [place] = inpuRef.current.getPlaces();

    if (place) {
      console.log("Place found");
      getLocation(place.geometry.location.lat(), place.geometry.location.lng())
    }
  }


  return (
    <div>
      <LoadScript
        googleMapsApiKey="AIzaSyA5x_4mPnEnGydlR0KJDlHTet3d1rxEDyo"
        libraries={["places"]}>

      </LoadScript>

      <StandaloneSearchBox
        onLoad={ref => (inpuRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          type="text"
          className="h-8 px-4 ml-8 border rounded-md w-full"
          placeholder="Enter location"
        />



      </StandaloneSearchBox>


    </div>
  )
}

export default SearchAddress;



// import React, { useEffect } from 'react';
// import './style.css';
// import './index.js';

// const AddressSelection = () => {
//   useEffect(() => {
//     const initMap = () => {
//       // Initialize Google Maps here
//       const map = new window.google.maps.Map(document.getElementById('gmp-map'), {
//         // Map options
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8,
//       });

//       const input = document.getElementById('location-input');
//       const autocomplete = new window.google.maps.places.Autocomplete(input);
//       autocomplete.bindTo('bounds', map);
//     };

//     initMap();

//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA5x_4mPnEnGydlR0KJDlHTet3d1rxEDyo&libraries=places,marker&callback=initMap&solution_channel=GMP_QB_addressselection_v2_cABC`;
//     script.async = true;
//     script.defer = true;
//     document.head.appendChild(script);

//     return () => {
//       document.head.removeChild(script);
//     };
//   }, []);

//   return (
//     <div className="card-container">
//       <div className="panel">
//         <div>
//           <img className="sb-title-icon" src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg" alt="" />
//           <span className="sb-title">Address Selection</span>
//         </div>
//         <input type="text" placeholder="Address" id="location-input" />
//       </div>
//       <div className="map" id="gmp-map"></div>
//     </div>
//   );
// };

// export default AddressSelection;
