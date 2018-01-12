var csv = require('csvtojson');
var fs = require('fs');
var util = require('util');
var arrayOfCounties = [];
var arrayOfCoords;
csv().fromFile('./Minnesota Counties.csv')
  .on('json', (obj) => {
    handleGeoData(obj);
    arrayOfCounties.push({
      name: obj['County Name'],
      coords: arrayOfCoords
    });
  }).on('done', (error) => {
    if (error) console.log(error);
    fs.writeFileSync('../src/static coords/Minnesota Counties.json', JSON.stringify(arrayOfCounties));
  })

function handleGeoData(data) {

  //strips out the markup tags
  data.geometry = data.geometry.replace('<Polygon><outerBoundaryIs><LinearRing><coordinates>', '');
  data.geometry = data.geometry.replace('</coordinates></LinearRing></outerBoundaryIs></Polygon>', '');

  var rawArray = data.geometry.match(/-?\d+(\.\d+)?,-?\d+(\.\d+)?/g);
  arrayOfCoords = [];
  for (var i = 0; i < rawArray.length; i++) {
    var coordinates = rawArray[i].split(',');
    arrayOfCoords.push({
      lat: parseFloat(coordinates[1]),
      lng: parseFloat(coordinates[0])
    });
  }
}
