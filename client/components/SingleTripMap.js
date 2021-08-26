import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
// import { MB_PUBKEY } from '../secrets';
if (process.env.NODE_ENV === 'production') {
  mapboxgl.accessToken =process.env.MB_PUBKEY;
} else {
mapboxgl.accessToken = MB_PUBKEY;

}

export default function MyTripMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div ref={mapContainer} className='map-container' />
    </div>
  );
}
