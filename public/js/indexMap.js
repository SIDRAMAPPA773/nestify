// public/js/indexMap.js

document.addEventListener("DOMContentLoaded", function () {

  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  const listings = (window.listings || []).filter(l =>
    l.geometry && l.geometry.coordinates
  );

  if (!listings.length) {
    mapElement.innerHTML = "No listings available";
    return;
  }

  const map = new maplibregl.Map({
    container: 'map',
    style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
    zoom: 2
  });

  map.addControl(new maplibregl.NavigationControl());

  const bounds = new maplibregl.LngLatBounds();

  const geojson = {
    type: "FeatureCollection",
    features: listings.map(l => ({
      type: "Feature",
      properties: {
        title: l.title,
        location: l.location,
        id: l._id,
        price: l.price
      },
      geometry: {
        type: "Point",
        coordinates: l.geometry.coordinates
      }
    }))
  };

  listings.forEach(l => bounds.extend(l.geometry.coordinates));

  map.on('load', () => {

    map.addSource('listings', {
      type: 'geojson',
      data: geojson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50
    });

    // 🔴 CLUSTERS
    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'listings',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': '#ff5a5f',
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20, 10,
          25, 30,
          30
        ]
      }
    });

    // 🔢 CLUSTER COUNT
    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'listings',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count}',
        'text-size': 12
      }
    });

    // 🔥 CUSTOM MARKER STYLE (PRICE TAG STYLE)
    map.addLayer({
      id: 'unclustered-point',
      type: 'symbol',
      source: 'listings',
      filter: ['!', ['has', 'point_count']],
      layout: {
        'text-field': [
          'concat',
          '₹',
          ['to-string', ['get', 'price']]
        ],
        'text-size': 12,
        'text-offset': [0, 0],
        'text-anchor': 'center'
      },
      paint: {
        'text-color': '#fff'
      }
    });

    // 🔥 BACKGROUND FOR PRICE TAG
    map.addLayer({
      id: 'unclustered-bg',
      type: 'circle',
      source: 'listings',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#ff5a5f',
        'circle-radius': 14
      }
    }, 'unclustered-point'); // place below text

    // 🔥 POPUP
    map.on('click', 'unclustered-point', (e) => {
      const props = e.features[0].properties;
      const coords = e.features[0].geometry.coordinates;

      new maplibregl.Popup()
        .setLngLat(coords)
        .setHTML(`
          <div style="font-size:13px;">
            <b>${props.title}</b><br>
            ${props.location}<br>
            <a href="/listings/${props.id}">View</a>
          </div>
        `)
        .addTo(map);
    });

    // 🔥 CLUSTER CLICK
    map.on('click', 'clusters', (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      });

      const clusterId = features[0].properties.cluster_id;

      map.getSource('listings').getClusterExpansionZoom(
        clusterId,
        (err, zoom) => {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
        }
      );
    });

    // 🔥 CURSOR POINTER
    map.on('mouseenter', 'clusters', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'clusters', () => {
      map.getCanvas().style.cursor = '';
    });

    // 🔥 FIT ALL
    map.fitBounds(bounds, {
      padding: 60,
      maxZoom: 12,
      duration: 1000
    });

  });

});