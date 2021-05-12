import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const mapboxToken = "pk.eyJ1IjoidG9yYXljYWFhIiwiYSI6ImNrZXhmOTk4YzBqb2Mydm1mZzB3cnUxNWQifQ.tCTNSJ5vcc_-pF57gh7PVw"

function Map() {
  const [viewport, setViewport] = useState({
    latitude: -37.801164799999995,
    longitude: 144.95907839999998,
    zoom: 11,
    bearing: 0,
    pitch: 0
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapboxApiAccessToken={mapboxToken}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}

export default Map;
