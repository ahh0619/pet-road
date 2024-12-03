import { useState, useEffect } from 'react';

const useCurrentLocation = () => {
  const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 });

  const currentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lng: lon });
        },
        (error) => {
          console.error('Error getting geolocation: ', error);
        },
      );
    }
  };

  useEffect(() => {
    currentLocation();
  }, []);

  return location;
};

export default useCurrentLocation;
