mapboxgl.accessToken = 'pk.eyJ1Ijoia29sZW0xIiwiYSI6ImNrdWJmbDd6YjBuMjYyb214aDQzdXhhcjEifQ.kCn7VV5AvXUFJZiDrXs3TQ';
const map = new mapboxgl.Map({
  container: 'map',
  center: [2.3364, 48.86091], // starting position [lng, lat]
  zoom: 15.7,
  style: 'mapbox://styles/mapbox/light-v10'
});

const markersCoord = [[2.3364, 48.86091] ,[2.3333, 48.8602] ,[2.3397, 48.8607] ,[2.3330, 48.8619] ,[2.3365, 48.8625]]
markersCoord.forEach(markerCoord => {
  const marker1 = new mapboxgl.Marker({
      color: '#757575'
    })
      .setLngLat(markerCoord)
      .addTo(map);
})

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');