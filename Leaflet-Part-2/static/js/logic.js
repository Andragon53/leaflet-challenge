// A function to determine the marker size based on the magnitude
function markerSize(magnitude) {
    return magnitude * 5;
}

// A function to determine marker colors based on earthquake depth
function chooseColor(depth) {
    if (depth <= 10) return "limegreen";
    else if (depth <= 30) return "greenyellow";
    else if (depth <= 50) return "yellow";
    else if (depth <= 70) return "orange";
    else if (depth <= 90) return "orangered";
    else return "red";
}

// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (quakeData) {
    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }
  
    // Create a GeoJSON layer that contains the features array on the quakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(quakeData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                color: 'black',
                weight: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: onEachFeature
    });
  
    // Send our earthquakes layer to the createMap function (Part 2)
    // createMap(earthquakes);
    
    // Create base layer.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    let myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [street, earthquakes]
    });

    // create a legend
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += "<h4>Depth Guide</h4>";
        div.innerHTML += '<i style="background: #32CD32"></i><span>-10 - 10</span><br>';
        div.innerHTML += '<i style="background: #ADFF2F"></i><span>10 - 30</span><br>';
        div.innerHTML += '<i style="background: #FFFF00"></i><span>30 - 50</span><br>';
        div.innerHTML += '<i style="background: #FFA500"></i><span>50 - 70</span><br>';
        div.innerHTML += '<i style="background: #FF4500"></i><span>70 - 90</span><br>';
        div.innerHTML += '<i style="background: #FF0000"></i><span>90+</span><br>';
        return div;
    };
    legend.addTo(myMap);
});
  
function createMap(earthquakes) {
    /* (For part 2) add and organize other basemaps
    
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    let overlayMaps = {
      Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    let myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [street, earthquakes]
    });
    */

    /* (For part 2) Add a layer control.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap); 
    */

}
  