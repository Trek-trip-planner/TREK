import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
//import 'mapbox-gl/dist/mapbox-gl.css';
// import { MB_PUBKEY } from '../secrets';

mapboxgl.accessToken = MB_PUBKEY;

export default function SingleParkMap(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const numLat = Number(props.park.latitude);
  const numLong = Number(props.park.longitude);

  const [lng, setLng] = useState(Number(numLong.toFixed(4)));
  const [lat, setLat] = useState(Number(numLat.toFixed(4)));
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    const marker1 = new mapboxgl.Marker()
      .setLngLat([Number(numLong.toFixed(4)), Number(numLat.toFixed(4))])
      .addTo(map.current);

    return () => map.current.remove();
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
