// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
// import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

// import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtcmFkZWNraTAwMyIsImEiOiJja3NnbTJjMmQxbGxnMndwYTZnOXU5c3MyIn0.7hEc6AdwRA2mHrK-lTOvIw';

// export default function MyTripMap() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-70.9);
//   const [lat, setLat] = useState(42.35);
//   const [zoom, setZoom] = useState(9);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [lng, lat],
//       zoom: zoom,
//     });
//   });

//   useEffect(() => {
//     if (!map.current) return; // wait for map to initialize
//     map.current.on('move', () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//     });
//   });
//   const directions = new MapboxDirections({
//     accessToken: mapboxgl.accessToken,
//   });

//   map.current.addControl(directions, 'top-left');

//   map.current.on('load', function () {
//     // const startLng
//     directions.setOrigin('12, Elm Street, NY'); // can be address in form setOrigin("12, Elm Street, NY")

//     directions.setDestinaion([lng, lat]); // can be address
//   });

//   return (
//     <div>
//       <div ref={mapContainer} className='map-container' />
//     </div>
//   );
// }

