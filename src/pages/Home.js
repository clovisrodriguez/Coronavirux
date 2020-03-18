import React from 'react';
import GoogleMap from 'google-map-react';

import { getINSReport } from '../api';

export default () => {
  const handelApiLoaded = (map, maps) => {
    const request = {
      query: 'Bogotá',
      fields: ['name', 'geometry']
    }

    return new maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: { lat: 4.6311162, lng: -78.8344511 },
      radius: 27000
    });
  };

  getINSReport();

  return (
    <div>
      <GoogleMap
        style={{ height: '500px', width: '500px' }}
        bootstrapURLKeys={{ key: 'AIzaSyAnWeyMrHdwIJovYY2hdO18aonmJIiPvCM' }}
        center={{ lat: 4.6564955, lng: -74.0652501 }}
        zoom={7}
        onGoogleApiLoaded={({ map, maps }) => handelApiLoaded(map, maps)}
      ></GoogleMap>
    </div>
  );
};
