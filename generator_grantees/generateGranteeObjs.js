var csv = require('csvtojson');
var fs = require('fs');
var util = require('util');
var granteeData = [];

csv().fromFile('./mappingprojectdata.csv') 
  .on('json', (obj) => { //.ON RUNS FOR EVERY SINGLE LINE OF DATA AKA 95 TIMES
    granteeData.push(obj); //add each new object to the array
  }).on('done', (error) => {
    if (error) console.log(error);
    fixLatLng(granteeData);
    fs.writeFileSync('../src/static grantee objs/granteeobjs.json', JSON.stringify(granteeData)); //MAKE A FILE FROM THE COMPLETE ARRAY AFTER EVERYTHING ELSE FINISHES
  })
  
function fixLatLng(array){
  var lat, lng, commaPos, temp;
  var tempLatLngObj = [];
  for(i=0; i<array.length; i++){
    temp = array[i]["Lat/Lng"];
    commaPos = temp.indexOf(",");
    lat = parseFloat(temp.substring(0, commaPos));
    lng = parseFloat(temp.substring(commaPos+1));
    tempLatLngObj = {
      lat: lat,
      lng: lng
    };
    array[i]["Lat/Lng"] = tempLatLngObj;
  }
}