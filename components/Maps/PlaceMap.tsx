import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import SearchAddress from "@/components/SearchableInput/SearchableAddress.js";
import { useState } from 'react';
const mapContainerStyle = {
  width: '50vw',
  height: '70vh',
};

const PlaceMap = () => {

  const [center, setCenter] = useState({lat: -34.397, lng: 150.644});
  
  const handleAddressSelect = (latitude, longitude) => { 
    setCenter({ lat: latitude, lng: longitude});

  };

 
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA5x_4mPnEnGydlR0KJDlHTet3d1rxEDyo',
    libraries: ['places'],
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;

  }

  return (
    <div>
      <SearchAddress getLocation={handleAddressSelect} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default PlaceMap;