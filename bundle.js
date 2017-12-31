/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var coordinates = __webpack_require__(2);
var goodhueBoundaries = __webpack_require__(3);
var granteeData = __webpack_require__(4);
var counties = __webpack_require__(5);
//keys in granteeData: Grantee Name, Address, Year Grant Received, Type of Grant Received, $ amt for grant, POC led?, Have a map from them?, Lat/Lng

var initCenter = {lat: 46.459, lng: -93.685};

var HeadwatersBlue = '#6AD1E3'; //rgb(106,209,227)
var iconShape = {
    coords: [21,0,48,0,48,45,21,45,25,0],
    type: 'poly'
  };

var initBounds;
var lastSelection = ''; //a string to tell us which marker is selected
var selected = false; //a bool to tell us if a marker is currently selected
var infoboxSet = false; // a bool to tell us if the infobox has been set already so it doesn't get set multiple

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                               INITMAP                            //////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: initCenter,
          mapTypeControl: false,
          streetViewControl: false,
          styles: [
                  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                  {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                  },
                  {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{color: '#263c3f'}]
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#6b9a76'}]
                  },
                  {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{color: '#38414e'}]
                  },
                  {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#212a37'}]
                  },
                  {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#9ca5b3'}]
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{color: '#746855'}]
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#1f2835'}]
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#f3d19c'}]
                  },
                  {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{color: '#2f3948'}]
                  },
                  {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#d59563'}]
                  },
                  {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{color: '#17263c'}]
                  },
                  {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#515c6d'}]
                  },
                  {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{color: '#17263c'}]
                  }
                ]
      });

      var granteeDataFULL = granteeData;
      var pocArray = [];
      var markerArray=[]; 

      var icon = {
          url: 'http://www.arcencieldeco.com.tn/wp-content/uploads/2015/10/icon.png',
          scaledSize: new google.maps.Size(73, 50),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(36.5,50)};

      var pocIcon = {
          url: 'http://www.arcencieldeco.com.tn/wp-content/uploads/2015/10/icon.png',
          scaledSize: new google.maps.Size(73, 50),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(36.5,50)};

      var clusterIcon = {
          textColor: '#fff',
          //textSize: 14,
          url: 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclusterer/images/m1.png', 
          height: 52, 
          width: 53
        };

      var clusterStyles = [
          //3 different types of markers: small, medium, and large are all set to look the same
          clusterIcon, clusterIcon, clusterIcon
        ];
      var mcOptions = {
          styles: clusterStyles,
          maxZoom: 15,
          gridSize: 30,
          imageSizes: [50, 50, 50]
        };

      // I'm not using granteeDataFULL['marker'] bc you can't access a whole array 
      // of just one array like that and I need to pass in an array to the map() method in addMarkers
      for(i=0;i<granteeDataFULL.length;i++){
        granteeDataFULL[i]['poly']=[];
        granteeDataFULL[i]['Geography'] = granteeDataFULL[i]['Geography'].split("; ");
        granteeDataFULL[i]['Year Grant Received'] = granteeDataFULL[i]['Year Grant Received'].split("; ");
        granteeDataFULL[i]['Type of Grant Received'] = granteeDataFULL[i]['Type of Grant Received'].split("; ");
        for(j=0;j<granteeDataFULL[i]['Type of Grant Received'].length;j++){
            if(granteeDataFULL[i]['Type of Grant Received'][j]==='CIG') granteeDataFULL[i]['Type of Grant Received'][j]='Community Innovation Grant';
            if(granteeDataFULL[i]['Type of Grant Received'][j]==='GP') granteeDataFULL[i]['Type of Grant Received'][j]='Giving Project';
            if(granteeDataFULL[i]['Type of Grant Received'][j]==='FSC') granteeDataFULL[i]['Type of Grant Received'][j]='Fund of the Sacred Circle';
            if(granteeDataFULL[i]['Type of Grant Received'][j]==='SCF') granteeDataFULL[i]['Type of Grant Received'][j]='Social Change Fund';
            if(granteeDataFULL[i]['Type of Grant Received'][j]==='EFBL') granteeDataFULL[i]['Type of Grant Received'][j]='Emergency Fund for Black Lives';
        }
        granteeDataFULL[i]['Description'] = granteeDataFULL[i]['Description'].split("; ");
        if(granteeDataFULL[i]['POC led?']==='TRUE') pocArray.push(granteeDataFULL[i]);
        }
      
      var markerClusterer = addMarkers(granteeDataFULL, map, markerArray, icon, mcOptions); 
      addPolys(granteeDataFULL, map);
      setGranteeListBox(granteeDataFULL);
      addListeners(granteeDataFULL, markerClusterer.getMarkers(), map);
      addNameListeners(granteeDataFULL, markerClusterer.getMarkers(), map);

      /////////////////////////////////////////////////////////////////////////////////////////////////////
      ///////////////                 INIT BUTTONS                                            /////////////
      /////////////////////////////////////////////////////////////////////////////////////////////////////

      var resetButtonControlDiv = document.createElement('div');
      var resetView = new ResetView(resetButtonControlDiv, map);
      resetButtonControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(resetButtonControlDiv);


      var pocControlDiv = document.createElement('div');
      var pocMap = new PocMap(pocControlDiv, granteeDataFULL, pocArray, map, markerArray, markerClusterer, icon, pocIcon, mcOptions); 
      pocControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(pocControlDiv);
}
//////////////////////////////////////////////////////////////////////////////////////
///////////                 ADD MARKERS                                  /////////////
//////////////////////////////////////////////////////////////////////////////////////
function addMarkers(granteeArray, map, markerArray, icon, mcOptions){
  markerArray = [];
  for(i=0;i<granteeArray.length;i++){
        markerArray.push(granteeArray[i]['Lat/Lng']);
      }
      markerArray = markerArray.map(function(location, i){
        return new google.maps.Marker({
          position: location,
          icon: icon,
          iconShape: iconShape
        });
      });
  return new MarkerClusterer(map, markerArray, mcOptions);
}

//////////////////////////////////////////////////////////////////////////////////////
///////////                 ADD POLYS                                    /////////////
//////////////////////////////////////////////////////////////////////////////////////
function addPolys(array, map){
//array is passed in as granteeDataFULL

//Minnesota state borders
  var mnBoudaries = new google.maps.Polygon({
      paths: coordinates,
      strokeColor: HeadwatersBlue,
      strokeOpacity: 0.8,
      strokeWeight: 10,
      fillColor: HeadwatersBlue,
      fillOpacity: 0,
      zIndex: 2
  });
  mnBoudaries.setMap(map);

  ////// sets up polys for each grantee //////
  for(i=0; i<array.length; i++){
    var geographyLength = array[i]['Geography'].length;
    //SPECIAL CASE: Statewide
    if(array[i]['Geography'][0]==='Statewide'){
      var tempStatewide = new google.maps.Polygon({
        paths: coordinates,
        strokeColor: HeadwatersBlue, //rgb(231,76,60)
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: HeadwatersBlue, //rgb(231,76,60)
        fillOpacity: 0.5,
      });
      array[i]['poly'].push(tempStatewide);
      array[i]['poly'][0].setMap(null);
    }
    for(j=0;j<geographyLength;j++){
        addAPoly(i, j, array, map);
    }
    }

}
function addAPoly(i,j, array, map){//searches through all counties to find the one that matches array[i]['Geography'][j]
  for(n=0; n<counties.length; n++){
    var temp = 0;
    if(array[i]['Geography'][j]===counties[n]['name']) {
      temp = new google.maps.Polygon({
        paths: counties[n]['coords'],
        strokeOpacity: 0,
        strokeWeight: 1,
        fillColor: HeadwatersBlue, //rgb(231,76,60)
        fillOpacity: 0.5
      });
      array[i]['poly'].push(temp);
      if(array[i]['poly'][j]) array[i]['poly'][j].setMap(null);
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////
///////////                 BUTTONS                                      /////////////
//////////////////////////////////////////////////////////////////////////////////////
function ResetView(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '1px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.style.marginRight = '5px';
        controlUI.style.marginTop = '5px';
        controlUI.title = 'Click to reset the view';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Tahoma,Arial,sans-serif';
        controlText.style.fontSize = '12px';
        controlText.style.paddingTop = '5px';
        controlText.style.paddingBottom = '5px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Reset View';
        controlUI.appendChild(controlText);

        var boundsCounter = 1;
        google.maps.event.addListener(map, 'bounds_changed', function() {
          if(boundsCounter == 1){
            initBounds = map.getBounds();
            boundsCounter++;
          } 
        })

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
            map.fitBounds(initBounds);
            map.setZoom(6);
        });
}

function PocMap(controlDiv, granteeArray, pocArray, map, markers, clusterer, icon, pocIcon, mcOptions) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '1px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.style.marginRight = '5px';
        controlUI.style.marginTop = '5px';
        controlUI.title = 'Click to see organizations led by People of Color';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Tahoma,Arial,sans-serif';
        controlText.style.fontSize = '12px';
        controlText.style.paddingTop = '5px';
        controlText.style.paddingBottom = '5px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Click to view Organizations led by People of Color';
        controlUI.appendChild(controlText);

        var pocCounter = 0;

        controlUI.addEventListener('click', function() {
          clusterer.clearMarkers();
          if(pocCounter%2==0){
            controlText.innerHTML = 'Click to see All Organizations';
            deselectAll(granteeArray, markers);
            markers = [];
            clusterer = addMarkers(pocArray, map, markers, pocIcon, mcOptions);
            addListeners(pocArray, clusterer.getMarkers(), map);
            setGranteeListBox(pocArray);
            addNameListeners(pocArray, clusterer.getMarkers(), map);
            document.getElementById('which-map').innerHTML = "<h4>Organizations led by People of Color</h4>";
          }
          else{
            controlText.innerHTML = 'Click to see Organizations led by People of Color';
            deselectAll(pocArray, markers);
            markers = [];
            clusterer = addMarkers(granteeArray, map, markers, icon, mcOptions);
            addListeners(granteeArray, clusterer.getMarkers(), map);
            setGranteeListBox(granteeArray);
            addNameListeners(granteeArray, clusterer.getMarkers(), map);
            document.getElementById('which-map').innerHTML = "<h4>All Organizations</h4>";
          }
          pocCounter++;
      });
}

//////////////////////////////////////////////////////////////////////////////////////
///////////                 MAP INTERACTIVITY                            /////////////
//////////////////////////////////////////////////////////////////////////////////////
//adds all google maps listeners
function addListeners(array, markers, map){
  for(i=0;i<array.length;i++){ //this for loop is to cycle through each of the grantee objs
    addListens(i, array, markers, map); 
  }
}

//adds all of the google listeners to make one marker interactive
function addListens(granteePos, array, markers, map){
    //REMEMBER: I run **showHideInfo(undefined, "show", granteePos, array, map);** 
    //once outside of the polyPos for-loops to make sure that every single marker has a listener, 
    //even if it doesn't have a poly attached
    google.maps.event.addListener(markers[granteePos], 'mouseover', function(){
        if(selected==false){
          showHideInfo(array[granteePos]['poly'][0], "show", granteePos, array, map); 
          for(polyPos=1; polyPos<array[granteePos]['poly'].length; polyPos++) 
            showHideInfo(array[granteePos]['poly'][polyPos], "show", granteePos, array, map);
        }
        if(markers[granteePos]!=lastSelection){
          for(polyPos=0; polyPos<array[granteePos]['poly'].length; polyPos++) 
            if(array[granteePos]['poly'][polyPos]) array[granteePos]['poly'][polyPos].setMap(map);
        }
    });
    google.maps.event.addListener(markers[granteePos], 'mouseout', function(){
        if(selected==false) deselectAll(array, map); 
        if(markers[granteePos]!=lastSelection){

          for(polyPos=0; polyPos<array[granteePos]['poly'].length; polyPos++) 
            if(array[granteePos]['poly'][polyPos]) array[granteePos]['poly'][polyPos].setMap(null);
        }
    });
    google.maps.event.addListener(markers[granteePos],'click', function() {
        var currentSelection = markers[granteePos];
        if(selected == false){
          showHideInfo(array[granteePos]['poly'][0], "show", granteePos, array, map); 
          for(polyPos=1; polyPos<array[granteePos]['poly'].length; polyPos++) 
            showHideInfo(array[granteePos]['poly'][polyPos], "show", granteePos, array, map);
          lastSelection = markers[granteePos];
          selected = true;
        }
        else if(currentSelection === lastSelection){
          showHideInfo(array[granteePos]['poly'][0], "hide", granteePos, array, map); 
          for(polyPos=1; polyPos<array[granteePos]['poly'].length; polyPos++) 
            showHideInfo(array[granteePos]['poly'][polyPos], "hide", granteePos, array, map);
          selected = false;
        }
        else{
          deselectAll(array, map);
          showHideInfo(array[granteePos]['poly'][0], "show", granteePos, array, map);
          for(polyPos=1; polyPos<array[granteePos]['poly'].length; polyPos++) 
            showHideInfo(array[granteePos]['poly'][polyPos], "show", granteePos, array, map);
          lastSelection = markers[granteePos];
          selected = true;
        }
    });
}

//adds all menu listeners
function addNameListeners(array, markers, map){
  for(i=0;i<array.length;i++){
    addNameListens(i, array, markers, map);
  }
}

//adds all menu listeners to make one marker interactive
function addNameListens(granteePos, array, markers, map){
    //REMEMBER: I run **showHideInfo(undefined, "show", granteePos, array, map);** 
    //once outside of the polyPos for-loops to make sure that every single marker has a listener, 
    //even if it doesn't have a poly attached
    var element = document.getElementById('para'+granteePos);
    element.addEventListener("mouseover", function(){
        if(selected==false){
          showHideInfo(array[granteePos]['poly'][0], "show", granteePos, array, map); 
          for(polyPos=1; polyPos<array[granteePos]['poly'].length; polyPos++) 
            showHideInfo(array[granteePos]['poly'][polyPos], "show", granteePos, array, map);
        }
    });
    element.addEventListener("mouseout", function(){
        if(selected==false) deselectAll(array, map); 
    });
    element.addEventListener("click", function(){
        var currentSelection = markers[granteePos];
        if(selected == false){
          showHideInfo(array[granteePos]['poly'][0], "show", granteePos, array, map);
          for(polyPos=1; polyPos<array[granteePos]['poly'].length; polyPos++) 
            showHideInfo(array[granteePos]['poly'][polyPos], "show", granteePos, array, map);
          lastSelection = markers[granteePos];
          selected = true;
        }
        else if(currentSelection === lastSelection){
          showHideInfo(array[granteePos]['poly'][0], "hide", granteePos, array, map);
          for(polyPos=1; polyPos<array[granteePos]['poly'].length; polyPos++) 
            showHideInfo(array[granteePos]['poly'][polyPos], "hide", granteePos, array, map);
          selected = false;
        }
        else{
          deselectAll(array, map);
          showHideInfo(array[granteePos]['poly'][0], "show", granteePos, array, map);
          for(polyPos=1; polyPos<array[granteePos]['poly'].length; polyPos++) 
            showHideInfo(array[granteePos]['poly'][polyPos], "show", granteePos, array, map);
          lastSelection = markers[granteePos];
          selected = true;
        }
    });
}

function showHideInfo(poly, str, granteePos, array, map){
  if (str === "show"){
    if (poly) poly.setMap(map);
    setInfobox(granteePos, array);
    document.getElementById('para'+granteePos).style.fontWeight = '900';
  }
  else if (str === "hide"){
    if (poly) poly.setMap(null);
    document.getElementById('infobox').style.display = 'none';
    document.getElementById('para'+granteePos).style.fontWeight = '100';
  }
  else console.log("Error: you didn't put in SHOW or HIDE into second param");
}

function deselectAll(array, map){
  for(i=0;i<array.length; i++){
    document.getElementById('para'+i).style.fontWeight = '100';
    for(j=0;j<array[i]['poly'].length;j++){
      showHideInfo(array[i]['poly'][j], "hide", i, array, map);
    }
  }
  for(j=0;j<document.getElementsByClassName('descr-type-year').length;j++){
    document.getElementsByClassName('descr-type-year')[j].style.display = 'none';
  }
  selected = false;
  infoboxSet = false;

}

//////////////////////////////////////////////////////////////////////////////////////
///////////                 BOX CONTENT                                  /////////////
//////////////////////////////////////////////////////////////////////////////////////
function setInfobox(pos, array){
  if(infoboxSet==false){
    for(i=0;i<array[pos]['Type of Grant Received'].length;i++){
      document.getElementById('org name').innerHTML = array[pos]['Grantee Name'] +" <br>";
      document.getElementById('address').innerHTML = array[pos]['Address']+"</br></br>";
      if(array[pos]['Description'][i]){
        if(array[pos]['Type of Grant Received'][i] === 'Community Innovation Grant')
          document.getElementsByClassName('description')[i].innerHTML = "<strong>Project Description: </strong>" + array[pos]['Description'][i]+" <br><br>";
        else
          document.getElementsByClassName('description')[i].innerHTML = "<strong>Description: </strong>" + array[pos]['Description'][i]+" <br><br>";
      }
      else{
        document.getElementsByClassName('description')[i].innerHTML = "<strong>Description: </strong>See above. <br><br>";
      }
      document.getElementsByClassName('grant type')[i].innerHTML = array[pos]['Type of Grant Received'][i]+" <br><br>";
      document.getElementsByClassName('grant year')[i].innerHTML = array[pos]['Year Grant Received'][i]+" <br><br>";
      document.getElementsByClassName('descr-type-year')[i].style.display = 'block';
    }
    document.getElementById('infobox').style.display = 'block';
    infoboxSet = true;
  }
}
function setGranteeListBox(array){
  var names = "";
  for(i=0;i<array.length;i++){
    names = names + "<p id= para"+i+">"+array[i]['Grantee Name'] + "<br/></p>";
  }
  document.getElementById('granteelistbox').innerHTML = names;
}



window.initMap = initMap;
var s = document.createElement('script');
s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDN1Cyr9vplNuUCSAZo3wVEBJ9hTsiYrE8&callback=initMap";
s.type = "text/javascript";
s.async = false;
document.getElementsByTagName('head')[0].appendChild(s);
var t = document.createElement('script');
t.src = "../v3-utility-library/markerclusterer/src/markerclusterer.js";
t.type = "text/javascript";
document.getElementsByTagName('head')[0].appendChild(t);



/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = [
	{
		"lat": 46.124864,
		"lng": -96.572156
	},
	{
		"lat": 46.12491,
		"lng": -96.572181
	},
	{
		"lat": 46.125285,
		"lng": -96.571996
	},
	{
		"lat": 46.125444,
		"lng": -96.571922
	},
	{
		"lat": 46.125465,
		"lng": -96.571914
	},
	{
		"lat": 46.12567,
		"lng": -96.57171
	},
	{
		"lat": 46.125911,
		"lng": -96.571299
	},
	{
		"lat": 46.125969,
		"lng": -96.570819
	},
	{
		"lat": 46.126043,
		"lng": -96.5699
	},
	{
		"lat": 46.126052,
		"lng": -96.569789
	},
	{
		"lat": 46.126061,
		"lng": -96.569679
	},
	{
		"lat": 46.126153,
		"lng": -96.569695
	},
	{
		"lat": 46.12644,
		"lng": -96.569728
	},
	{
		"lat": 46.126793,
		"lng": -96.569829
	},
	{
		"lat": 46.127112,
		"lng": -96.569904
	},
	{
		"lat": 46.128074,
		"lng": -96.570095
	},
	{
		"lat": 46.128218,
		"lng": -96.570105
	},
	{
		"lat": 46.128398,
		"lng": -96.570096
	},
	{
		"lat": 46.128577,
		"lng": -96.570069
	},
	{
		"lat": 46.128612,
		"lng": -96.570059
	},
	{
		"lat": 46.12868,
		"lng": -96.570026
	},
	{
		"lat": 46.128716,
		"lng": -96.570016
	},
	{
		"lat": 46.128816,
		"lng": -96.56996
	},
	{
		"lat": 46.129045,
		"lng": -96.569811
	},
	{
		"lat": 46.129141,
		"lng": -96.569739
	},
	{
		"lat": 46.1292,
		"lng": -96.569682
	},
	{
		"lat": 46.129264,
		"lng": -96.569636
	},
	{
		"lat": 46.129356,
		"lng": -96.569555
	},
	{
		"lat": 46.12942,
		"lng": -96.569507
	},
	{
		"lat": 46.129508,
		"lng": -96.569418
	},
	{
		"lat": 46.129672,
		"lng": -96.569217
	},
	{
		"lat": 46.129813,
		"lng": -96.569056
	},
	{
		"lat": 46.129949,
		"lng": -96.568887
	},
	{
		"lat": 46.130062,
		"lng": -96.568761
	},
	{
		"lat": 46.130153,
		"lng": -96.568678
	},
	{
		"lat": 46.130253,
		"lng": -96.568617
	},
	{
		"lat": 46.130322,
		"lng": -96.568587
	},
	{
		"lat": 46.130352,
		"lng": -96.56858
	},
	{
		"lat": 46.130408,
		"lng": -96.568692
	},
	{
		"lat": 46.130463,
		"lng": -96.568803
	},
	{
		"lat": 46.130577,
		"lng": -96.569032
	},
	{
		"lat": 46.130573,
		"lng": -96.569599
	},
	{
		"lat": 46.130547,
		"lng": -96.569767
	},
	{
		"lat": 46.13048,
		"lng": -96.570211
	},
	{
		"lat": 46.130564,
		"lng": -96.570919
	},
	{
		"lat": 46.130819,
		"lng": -96.57134
	},
	{
		"lat": 46.131101,
		"lng": -96.571379
	},
	{
		"lat": 46.131401,
		"lng": -96.571047
	},
	{
		"lat": 46.131769,
		"lng": -96.57023
	},
	{
		"lat": 46.131929,
		"lng": -96.569815
	},
	{
		"lat": 46.132016,
		"lng": -96.569591
	},
	{
		"lat": 46.132232,
		"lng": -96.568869
	},
	{
		"lat": 46.132268,
		"lng": -96.56875
	},
	{
		"lat": 46.132303,
		"lng": -96.568632
	},
	{
		"lat": 46.132441,
		"lng": -96.568635
	},
	{
		"lat": 46.132835,
		"lng": -96.568659
	},
	{
		"lat": 46.132978,
		"lng": -96.568679
	},
	{
		"lat": 46.13305,
		"lng": -96.568684
	},
	{
		"lat": 46.133157,
		"lng": -96.568705
	},
	{
		"lat": 46.133226,
		"lng": -96.568732
	},
	{
		"lat": 46.13326,
		"lng": -96.568751
	},
	{
		"lat": 46.133356,
		"lng": -96.568819
	},
	{
		"lat": 46.133417,
		"lng": -96.568875
	},
	{
		"lat": 46.133473,
		"lng": -96.56894
	},
	{
		"lat": 46.133524,
		"lng": -96.569012
	},
	{
		"lat": 46.133642,
		"lng": -96.569201
	},
	{
		"lat": 46.133644,
		"lng": -96.569204
	},
	{
		"lat": 46.13373,
		"lng": -96.569369
	},
	{
		"lat": 46.13393,
		"lng": -96.569797
	},
	{
		"lat": 46.133979,
		"lng": -96.569933
	},
	{
		"lat": 46.133999,
		"lng": -96.569977
	},
	{
		"lat": 46.134028,
		"lng": -96.57007
	},
	{
		"lat": 46.134158,
		"lng": -96.570379
	},
	{
		"lat": 46.134186,
		"lng": -96.570474
	},
	{
		"lat": 46.134274,
		"lng": -96.570698
	},
	{
		"lat": 46.13433,
		"lng": -96.57083
	},
	{
		"lat": 46.134343,
		"lng": -96.570878
	},
	{
		"lat": 46.13448,
		"lng": -96.57118
	},
	{
		"lat": 46.134623,
		"lng": -96.571412
	},
	{
		"lat": 46.13475,
		"lng": -96.571595
	},
	{
		"lat": 46.134831,
		"lng": -96.571696
	},
	{
		"lat": 46.134923,
		"lng": -96.571778
	},
	{
		"lat": 46.135025,
		"lng": -96.571829
	},
	{
		"lat": 46.13512,
		"lng": -96.571858
	},
	{
		"lat": 46.135156,
		"lng": -96.571864
	},
	{
		"lat": 46.135336,
		"lng": -96.571864
	},
	{
		"lat": 46.13548,
		"lng": -96.57185
	},
	{
		"lat": 46.13555,
		"lng": -96.57183
	},
	{
		"lat": 46.135654,
		"lng": -96.571786
	},
	{
		"lat": 46.135847,
		"lng": -96.571648
	},
	{
		"lat": 46.135973,
		"lng": -96.57155
	},
	{
		"lat": 46.136071,
		"lng": -96.571486
	},
	{
		"lat": 46.136135,
		"lng": -96.571438
	},
	{
		"lat": 46.136168,
		"lng": -96.571419
	},
	{
		"lat": 46.136203,
		"lng": -96.571406
	},
	{
		"lat": 46.136367,
		"lng": -96.571303
	},
	{
		"lat": 46.136435,
		"lng": -96.57127
	},
	{
		"lat": 46.136538,
		"lng": -96.571235
	},
	{
		"lat": 46.13661,
		"lng": -96.571211
	},
	{
		"lat": 46.13679,
		"lng": -96.571206
	},
	{
		"lat": 46.136826,
		"lng": -96.571209
	},
	{
		"lat": 46.136897,
		"lng": -96.571226
	},
	{
		"lat": 46.136967,
		"lng": -96.571252
	},
	{
		"lat": 46.137069,
		"lng": -96.571301
	},
	{
		"lat": 46.137169,
		"lng": -96.571359
	},
	{
		"lat": 46.137354,
		"lng": -96.57152
	},
	{
		"lat": 46.137649,
		"lng": -96.571814
	},
	{
		"lat": 46.137719,
		"lng": -96.571891
	},
	{
		"lat": 46.137811,
		"lng": -96.57199
	},
	{
		"lat": 46.13782,
		"lng": -96.572
	},
	{
		"lat": 46.137851,
		"lng": -96.572025
	},
	{
		"lat": 46.137932,
		"lng": -96.572128
	},
	{
		"lat": 46.138034,
		"lng": -96.572273
	},
	{
		"lat": 46.138144,
		"lng": -96.572406
	},
	{
		"lat": 46.138243,
		"lng": -96.572555
	},
	{
		"lat": 46.138353,
		"lng": -96.572687
	},
	{
		"lat": 46.138415,
		"lng": -96.572741
	},
	{
		"lat": 46.138481,
		"lng": -96.57278
	},
	{
		"lat": 46.138687,
		"lng": -96.572875
	},
	{
		"lat": 46.138793,
		"lng": -96.572903
	},
	{
		"lat": 46.138864,
		"lng": -96.572913
	},
	{
		"lat": 46.139044,
		"lng": -96.572921
	},
	{
		"lat": 46.139187,
		"lng": -96.572903
	},
	{
		"lat": 46.139328,
		"lng": -96.572867
	},
	{
		"lat": 46.1394,
		"lng": -96.572857
	},
	{
		"lat": 46.13954,
		"lng": -96.572813
	},
	{
		"lat": 46.139574,
		"lng": -96.572796
	},
	{
		"lat": 46.139889,
		"lng": -96.572692
	},
	{
		"lat": 46.140141,
		"lng": -96.572677
	},
	{
		"lat": 46.140285,
		"lng": -96.57269
	},
	{
		"lat": 46.14032,
		"lng": -96.572701
	},
	{
		"lat": 46.14049,
		"lng": -96.572785
	},
	{
		"lat": 46.14059,
		"lng": -96.572841
	},
	{
		"lat": 46.140688,
		"lng": -96.572906
	},
	{
		"lat": 46.140719,
		"lng": -96.572934
	},
	{
		"lat": 46.140801,
		"lng": -96.573035
	},
	{
		"lat": 46.140888,
		"lng": -96.573126
	},
	{
		"lat": 46.141016,
		"lng": -96.573308
	},
	{
		"lat": 46.14126,
		"lng": -96.573686
	},
	{
		"lat": 46.141327,
		"lng": -96.573807
	},
	{
		"lat": 46.141475,
		"lng": -96.574099
	},
	{
		"lat": 46.141751,
		"lng": -96.574505
	},
	{
		"lat": 46.141882,
		"lng": -96.57468
	},
	{
		"lat": 46.141937,
		"lng": -96.574746
	},
	{
		"lat": 46.142055,
		"lng": -96.574865
	},
	{
		"lat": 46.142179,
		"lng": -96.574968
	},
	{
		"lat": 46.142248,
		"lng": -96.574999
	},
	{
		"lat": 46.142463,
		"lng": -96.575029
	},
	{
		"lat": 46.142571,
		"lng": -96.575016
	},
	{
		"lat": 46.14264,
		"lng": -96.574988
	},
	{
		"lat": 46.14274,
		"lng": -96.574935
	},
	{
		"lat": 46.142879,
		"lng": -96.574882
	},
	{
		"lat": 46.143048,
		"lng": -96.574796
	},
	{
		"lat": 46.143189,
		"lng": -96.57476
	},
	{
		"lat": 46.143296,
		"lng": -96.574741
	},
	{
		"lat": 46.143584,
		"lng": -96.574732
	},
	{
		"lat": 46.14369,
		"lng": -96.574759
	},
	{
		"lat": 46.14376,
		"lng": -96.574786
	},
	{
		"lat": 46.143886,
		"lng": -96.574884
	},
	{
		"lat": 46.144044,
		"lng": -96.575095
	},
	{
		"lat": 46.144117,
		"lng": -96.575209
	},
	{
		"lat": 46.144161,
		"lng": -96.57529
	},
	{
		"lat": 46.144222,
		"lng": -96.575417
	},
	{
		"lat": 46.144254,
		"lng": -96.575509
	},
	{
		"lat": 46.144323,
		"lng": -96.575803
	},
	{
		"lat": 46.144343,
		"lng": -96.57586
	},
	{
		"lat": 46.144362,
		"lng": -96.575959
	},
	{
		"lat": 46.144368,
		"lng": -96.57601
	},
	{
		"lat": 46.14439,
		"lng": -96.576109
	},
	{
		"lat": 46.144483,
		"lng": -96.576386
	},
	{
		"lat": 46.14454,
		"lng": -96.576517
	},
	{
		"lat": 46.144552,
		"lng": -96.576566
	},
	{
		"lat": 46.144568,
		"lng": -96.576612
	},
	{
		"lat": 46.144607,
		"lng": -96.576698
	},
	{
		"lat": 46.14464,
		"lng": -96.57679
	},
	{
		"lat": 46.144653,
		"lng": -96.576838
	},
	{
		"lat": 46.144695,
		"lng": -96.57692
	},
	{
		"lat": 46.144873,
		"lng": -96.577175
	},
	{
		"lat": 46.144956,
		"lng": -96.577272
	},
	{
		"lat": 46.145018,
		"lng": -96.577324
	},
	{
		"lat": 46.145114,
		"lng": -96.57739
	},
	{
		"lat": 46.145321,
		"lng": -96.577471
	},
	{
		"lat": 46.145536,
		"lng": -96.577501
	},
	{
		"lat": 46.145643,
		"lng": -96.577507
	},
	{
		"lat": 46.145715,
		"lng": -96.577504
	},
	{
		"lat": 46.14618,
		"lng": -96.577457
	},
	{
		"lat": 46.146324,
		"lng": -96.577465
	},
	{
		"lat": 46.146467,
		"lng": -96.577481
	},
	{
		"lat": 46.146502,
		"lng": -96.577492
	},
	{
		"lat": 46.146569,
		"lng": -96.577527
	},
	{
		"lat": 46.146716,
		"lng": -96.577676
	},
	{
		"lat": 46.146867,
		"lng": -96.577895
	},
	{
		"lat": 46.146912,
		"lng": -96.577975
	},
	{
		"lat": 46.147019,
		"lng": -96.578181
	},
	{
		"lat": 46.14711,
		"lng": -96.578404
	},
	{
		"lat": 46.147139,
		"lng": -96.578496
	},
	{
		"lat": 46.147165,
		"lng": -96.578593
	},
	{
		"lat": 46.147224,
		"lng": -96.578889
	},
	{
		"lat": 46.147237,
		"lng": -96.578937
	},
	{
		"lat": 46.147304,
		"lng": -96.579119
	},
	{
		"lat": 46.147379,
		"lng": -96.579228
	},
	{
		"lat": 46.147409,
		"lng": -96.579258
	},
	{
		"lat": 46.147441,
		"lng": -96.579281
	},
	{
		"lat": 46.14751,
		"lng": -96.579311
	},
	{
		"lat": 46.147685,
		"lng": -96.579367
	},
	{
		"lat": 46.14772,
		"lng": -96.579372
	},
	{
		"lat": 46.147972,
		"lng": -96.579369
	},
	{
		"lat": 46.148044,
		"lng": -96.57936
	},
	{
		"lat": 46.148325,
		"lng": -96.579287
	},
	{
		"lat": 46.148571,
		"lng": -96.579206
	},
	{
		"lat": 46.148712,
		"lng": -96.57918
	},
	{
		"lat": 46.148856,
		"lng": -96.579175
	},
	{
		"lat": 46.149106,
		"lng": -96.579202
	},
	{
		"lat": 46.149352,
		"lng": -96.579276
	},
	{
		"lat": 46.14942,
		"lng": -96.579306
	},
	{
		"lat": 46.149486,
		"lng": -96.579345
	},
	{
		"lat": 46.149657,
		"lng": -96.579428
	},
	{
		"lat": 46.149787,
		"lng": -96.579512
	},
	{
		"lat": 46.149889,
		"lng": -96.579563
	},
	{
		"lat": 46.150122,
		"lng": -96.579697
	},
	{
		"lat": 46.150183,
		"lng": -96.579749
	},
	{
		"lat": 46.150342,
		"lng": -96.579869
	},
	{
		"lat": 46.150475,
		"lng": -96.579948
	},
	{
		"lat": 46.150769,
		"lng": -96.580136
	},
	{
		"lat": 46.150835,
		"lng": -96.580174
	},
	{
		"lat": 46.150971,
		"lng": -96.580235
	},
	{
		"lat": 46.151076,
		"lng": -96.580273
	},
	{
		"lat": 46.151147,
		"lng": -96.58029
	},
	{
		"lat": 46.151253,
		"lng": -96.580303
	},
	{
		"lat": 46.151361,
		"lng": -96.580305
	},
	{
		"lat": 46.151505,
		"lng": -96.580296
	},
	{
		"lat": 46.15154,
		"lng": -96.580288
	},
	{
		"lat": 46.151641,
		"lng": -96.580233
	},
	{
		"lat": 46.151672,
		"lng": -96.580206
	},
	{
		"lat": 46.151737,
		"lng": -96.580168
	},
	{
		"lat": 46.151801,
		"lng": -96.58012
	},
	{
		"lat": 46.151972,
		"lng": -96.579933
	},
	{
		"lat": 46.152104,
		"lng": -96.57976
	},
	{
		"lat": 46.152397,
		"lng": -96.579337
	},
	{
		"lat": 46.152533,
		"lng": -96.579139
	},
	{
		"lat": 46.152742,
		"lng": -96.578854
	},
	{
		"lat": 46.152831,
		"lng": -96.578691
	},
	{
		"lat": 46.152882,
		"lng": -96.578554
	},
	{
		"lat": 46.153091,
		"lng": -96.578423
	},
	{
		"lat": 46.153153,
		"lng": -96.578371
	},
	{
		"lat": 46.153186,
		"lng": -96.578349
	},
	{
		"lat": 46.153361,
		"lng": -96.578283
	},
	{
		"lat": 46.153468,
		"lng": -96.578264
	},
	{
		"lat": 46.153576,
		"lng": -96.578253
	},
	{
		"lat": 46.155021,
		"lng": -96.578303
	},
	{
		"lat": 46.155381,
		"lng": -96.578334
	},
	{
		"lat": 46.155739,
		"lng": -96.578373
	},
	{
		"lat": 46.1561,
		"lng": -96.578394
	},
	{
		"lat": 46.156389,
		"lng": -96.578382
	},
	{
		"lat": 46.156532,
		"lng": -96.578357
	},
	{
		"lat": 46.156567,
		"lng": -96.578345
	},
	{
		"lat": 46.1566,
		"lng": -96.578327
	},
	{
		"lat": 46.156671,
		"lng": -96.578302
	},
	{
		"lat": 46.156807,
		"lng": -96.578235
	},
	{
		"lat": 46.156907,
		"lng": -96.578175
	},
	{
		"lat": 46.156971,
		"lng": -96.578129
	},
	{
		"lat": 46.157132,
		"lng": -96.578029
	},
	{
		"lat": 46.157226,
		"lng": -96.577952
	},
	{
		"lat": 46.15729,
		"lng": -96.577907
	},
	{
		"lat": 46.157382,
		"lng": -96.577823
	},
	{
		"lat": 46.157446,
		"lng": -96.577777
	},
	{
		"lat": 46.157506,
		"lng": -96.577719
	},
	{
		"lat": 46.157539,
		"lng": -96.577699
	},
	{
		"lat": 46.157697,
		"lng": -96.577574
	},
	{
		"lat": 46.157786,
		"lng": -96.577486
	},
	{
		"lat": 46.158034,
		"lng": -96.577275
	},
	{
		"lat": 46.1581,
		"lng": -96.577233
	},
	{
		"lat": 46.158161,
		"lng": -96.577178
	},
	{
		"lat": 46.158228,
		"lng": -96.57714
	},
	{
		"lat": 46.158587,
		"lng": -96.576901
	},
	{
		"lat": 46.158721,
		"lng": -96.576825
	},
	{
		"lat": 46.158815,
		"lng": -96.576752
	},
	{
		"lat": 46.158845,
		"lng": -96.576722
	},
	{
		"lat": 46.159106,
		"lng": -96.57655
	},
	{
		"lat": 46.159196,
		"lng": -96.576465
	},
	{
		"lat": 46.159295,
		"lng": -96.576402
	},
	{
		"lat": 46.159395,
		"lng": -96.576345
	},
	{
		"lat": 46.159582,
		"lng": -96.576265
	},
	{
		"lat": 46.159639,
		"lng": -96.576358
	},
	{
		"lat": 46.159696,
		"lng": -96.576451
	},
	{
		"lat": 46.159936,
		"lng": -96.576842
	},
	{
		"lat": 46.160341,
		"lng": -96.577502
	},
	{
		"lat": 46.160674,
		"lng": -96.578002
	},
	{
		"lat": 46.16071,
		"lng": -96.578657
	},
	{
		"lat": 46.160732,
		"lng": -96.579034
	},
	{
		"lat": 46.160766,
		"lng": -96.579332
	},
	{
		"lat": 46.16079,
		"lng": -96.579368
	},
	{
		"lat": 46.160913,
		"lng": -96.579582
	},
	{
		"lat": 46.161042,
		"lng": -96.579774
	},
	{
		"lat": 46.161151,
		"lng": -96.579913
	},
	{
		"lat": 46.161192,
		"lng": -96.579934
	},
	{
		"lat": 46.161263,
		"lng": -96.579938
	},
	{
		"lat": 46.161292,
		"lng": -96.57994
	},
	{
		"lat": 46.161481,
		"lng": -96.579917
	},
	{
		"lat": 46.161528,
		"lng": -96.579868
	},
	{
		"lat": 46.161583,
		"lng": -96.579839
	},
	{
		"lat": 46.161632,
		"lng": -96.57979
	},
	{
		"lat": 46.161685,
		"lng": -96.579763
	},
	{
		"lat": 46.161743,
		"lng": -96.579707
	},
	{
		"lat": 46.161866,
		"lng": -96.579547
	},
	{
		"lat": 46.162039,
		"lng": -96.579282
	},
	{
		"lat": 46.16206,
		"lng": -96.579228
	},
	{
		"lat": 46.162143,
		"lng": -96.579106
	},
	{
		"lat": 46.162226,
		"lng": -96.578925
	},
	{
		"lat": 46.16226,
		"lng": -96.57887
	},
	{
		"lat": 46.162309,
		"lng": -96.578772
	},
	{
		"lat": 46.162454,
		"lng": -96.57842
	},
	{
		"lat": 46.16251,
		"lng": -96.578267
	},
	{
		"lat": 46.16258,
		"lng": -96.578134
	},
	{
		"lat": 46.162614,
		"lng": -96.578057
	},
	{
		"lat": 46.162615,
		"lng": -96.578044
	},
	{
		"lat": 46.162621,
		"lng": -96.578007
	},
	{
		"lat": 46.162642,
		"lng": -96.577967
	},
	{
		"lat": 46.162649,
		"lng": -96.577919
	},
	{
		"lat": 46.16269,
		"lng": -96.57783
	},
	{
		"lat": 46.162697,
		"lng": -96.577781
	},
	{
		"lat": 46.162836,
		"lng": -96.577536
	},
	{
		"lat": 46.162868,
		"lng": -96.577412
	},
	{
		"lat": 46.162899,
		"lng": -96.577289
	},
	{
		"lat": 46.162933,
		"lng": -96.577293
	},
	{
		"lat": 46.162977,
		"lng": -96.577299
	},
	{
		"lat": 46.163037,
		"lng": -96.577296
	},
	{
		"lat": 46.163072,
		"lng": -96.577295
	},
	{
		"lat": 46.163192,
		"lng": -96.577281
	},
	{
		"lat": 46.163552,
		"lng": -96.577282
	},
	{
		"lat": 46.163753,
		"lng": -96.577308
	},
	{
		"lat": 46.163838,
		"lng": -96.57732
	},
	{
		"lat": 46.163943,
		"lng": -96.577356
	},
	{
		"lat": 46.164046,
		"lng": -96.577401
	},
	{
		"lat": 46.164142,
		"lng": -96.57747
	},
	{
		"lat": 46.164176,
		"lng": -96.577488
	},
	{
		"lat": 46.164395,
		"lng": -96.577667
	},
	{
		"lat": 46.164546,
		"lng": -96.577806
	},
	{
		"lat": 46.164613,
		"lng": -96.577845
	},
	{
		"lat": 46.164648,
		"lng": -96.577859
	},
	{
		"lat": 46.164683,
		"lng": -96.577864
	},
	{
		"lat": 46.164755,
		"lng": -96.577864
	},
	{
		"lat": 46.164827,
		"lng": -96.577854
	},
	{
		"lat": 46.164966,
		"lng": -96.577798
	},
	{
		"lat": 46.165094,
		"lng": -96.577707
	},
	{
		"lat": 46.165218,
		"lng": -96.577602
	},
	{
		"lat": 46.165306,
		"lng": -96.577513
	},
	{
		"lat": 46.165458,
		"lng": -96.577372
	},
	{
		"lat": 46.165608,
		"lng": -96.577235
	},
	{
		"lat": 46.165673,
		"lng": -96.57719
	},
	{
		"lat": 46.165742,
		"lng": -96.577161
	},
	{
		"lat": 46.165808,
		"lng": -96.57712
	},
	{
		"lat": 46.165843,
		"lng": -96.57711
	},
	{
		"lat": 46.166014,
		"lng": -96.577033
	},
	{
		"lat": 46.166036,
		"lng": -96.57702
	},
	{
		"lat": 46.1661,
		"lng": -96.577102
	},
	{
		"lat": 46.166164,
		"lng": -96.577184
	},
	{
		"lat": 46.166436,
		"lng": -96.577519
	},
	{
		"lat": 46.166445,
		"lng": -96.577688
	},
	{
		"lat": 46.166458,
		"lng": -96.577914
	},
	{
		"lat": 46.166372,
		"lng": -96.578642
	},
	{
		"lat": 46.166439,
		"lng": -96.579052
	},
	{
		"lat": 46.166449,
		"lng": -96.579292
	},
	{
		"lat": 46.166572,
		"lng": -96.580071
	},
	{
		"lat": 46.166582,
		"lng": -96.580092
	},
	{
		"lat": 46.166811,
		"lng": -96.580573
	},
	{
		"lat": 46.167075,
		"lng": -96.580657
	},
	{
		"lat": 46.167229,
		"lng": -96.580706
	},
	{
		"lat": 46.167648,
		"lng": -96.580608
	},
	{
		"lat": 46.167934,
		"lng": -96.580091
	},
	{
		"lat": 46.167944,
		"lng": -96.580052
	},
	{
		"lat": 46.168173,
		"lng": -96.579202
	},
	{
		"lat": 46.168146,
		"lng": -96.578472
	},
	{
		"lat": 46.168117,
		"lng": -96.578006
	},
	{
		"lat": 46.167972,
		"lng": -96.576742
	},
	{
		"lat": 46.168077,
		"lng": -96.576442
	},
	{
		"lat": 46.168416,
		"lng": -96.575487
	},
	{
		"lat": 46.168451,
		"lng": -96.575388
	},
	{
		"lat": 46.168486,
		"lng": -96.57529
	},
	{
		"lat": 46.168511,
		"lng": -96.575284
	},
	{
		"lat": 46.168616,
		"lng": -96.575258
	},
	{
		"lat": 46.16876,
		"lng": -96.575254
	},
	{
		"lat": 46.168967,
		"lng": -96.575276
	},
	{
		"lat": 46.169011,
		"lng": -96.575281
	},
	{
		"lat": 46.169151,
		"lng": -96.575326
	},
	{
		"lat": 46.169489,
		"lng": -96.575502
	},
	{
		"lat": 46.169552,
		"lng": -96.575552
	},
	{
		"lat": 46.16958,
		"lng": -96.575585
	},
	{
		"lat": 46.16964,
		"lng": -96.575642
	},
	{
		"lat": 46.169696,
		"lng": -96.575706
	},
	{
		"lat": 46.169821,
		"lng": -96.575891
	},
	{
		"lat": 46.169868,
		"lng": -96.57597
	},
	{
		"lat": 46.17,
		"lng": -96.576216
	},
	{
		"lat": 46.170065,
		"lng": -96.576337
	},
	{
		"lat": 46.170167,
		"lng": -96.576482
	},
	{
		"lat": 46.170215,
		"lng": -96.576558
	},
	{
		"lat": 46.170265,
		"lng": -96.576623
	},
	{
		"lat": 46.170269,
		"lng": -96.576665
	},
	{
		"lat": 46.170293,
		"lng": -96.576861
	},
	{
		"lat": 46.170382,
		"lng": -96.577601
	},
	{
		"lat": 46.170112,
		"lng": -96.578362
	},
	{
		"lat": 46.169801,
		"lng": -96.579006
	},
	{
		"lat": 46.16974,
		"lng": -96.579518
	},
	{
		"lat": 46.169725,
		"lng": -96.579654
	},
	{
		"lat": 46.169748,
		"lng": -96.580917
	},
	{
		"lat": 46.169773,
		"lng": -96.582112
	},
	{
		"lat": 46.169838,
		"lng": -96.583179
	},
	{
		"lat": 46.170132,
		"lng": -96.583774
	},
	{
		"lat": 46.170599,
		"lng": -96.583862
	},
	{
		"lat": 46.171149,
		"lng": -96.583476
	},
	{
		"lat": 46.171421,
		"lng": -96.58253
	},
	{
		"lat": 46.171566,
		"lng": -96.581327
	},
	{
		"lat": 46.171719,
		"lng": -96.580147
	},
	{
		"lat": 46.171709,
		"lng": -96.579936
	},
	{
		"lat": 46.171691,
		"lng": -96.579498
	},
	{
		"lat": 46.171366,
		"lng": -96.578635
	},
	{
		"lat": 46.171281,
		"lng": -96.578159
	},
	{
		"lat": 46.171425,
		"lng": -96.577612
	},
	{
		"lat": 46.171509,
		"lng": -96.577194
	},
	{
		"lat": 46.171528,
		"lng": -96.577102
	},
	{
		"lat": 46.171546,
		"lng": -96.577011
	},
	{
		"lat": 46.171583,
		"lng": -96.577009
	},
	{
		"lat": 46.171834,
		"lng": -96.577032
	},
	{
		"lat": 46.17194,
		"lng": -96.577054
	},
	{
		"lat": 46.172042,
		"lng": -96.577087
	},
	{
		"lat": 46.172045,
		"lng": -96.577088
	},
	{
		"lat": 46.172223,
		"lng": -96.577129
	},
	{
		"lat": 46.172401,
		"lng": -96.577147
	},
	{
		"lat": 46.172473,
		"lng": -96.577147
	},
	{
		"lat": 46.172795,
		"lng": -96.5771
	},
	{
		"lat": 46.172972,
		"lng": -96.577055
	},
	{
		"lat": 46.173006,
		"lng": -96.577038
	},
	{
		"lat": 46.173137,
		"lng": -96.576954
	},
	{
		"lat": 46.173205,
		"lng": -96.576921
	},
	{
		"lat": 46.173303,
		"lng": -96.576855
	},
	{
		"lat": 46.173364,
		"lng": -96.576801
	},
	{
		"lat": 46.17343,
		"lng": -96.576758
	},
	{
		"lat": 46.173453,
		"lng": -96.57675
	},
	{
		"lat": 46.17364,
		"lng": -96.57669
	},
	{
		"lat": 46.173889,
		"lng": -96.576643
	},
	{
		"lat": 46.173944,
		"lng": -96.576636
	},
	{
		"lat": 46.173994,
		"lng": -96.576763
	},
	{
		"lat": 46.174013,
		"lng": -96.576816
	},
	{
		"lat": 46.174376,
		"lng": -96.577822
	},
	{
		"lat": 46.174372,
		"lng": -96.578459
	},
	{
		"lat": 46.174126,
		"lng": -96.579059
	},
	{
		"lat": 46.173893,
		"lng": -96.579395
	},
	{
		"lat": 46.173793,
		"lng": -96.57954
	},
	{
		"lat": 46.173363,
		"lng": -96.580044
	},
	{
		"lat": 46.173366,
		"lng": -96.580693
	},
	{
		"lat": 46.173693,
		"lng": -96.581185
	},
	{
		"lat": 46.173932,
		"lng": -96.581617
	},
	{
		"lat": 46.173799,
		"lng": -96.582264
	},
	{
		"lat": 46.173483,
		"lng": -96.582538
	},
	{
		"lat": 46.173088,
		"lng": -96.582613
	},
	{
		"lat": 46.172772,
		"lng": -96.582944
	},
	{
		"lat": 46.172663,
		"lng": -96.583522
	},
	{
		"lat": 46.173072,
		"lng": -96.583818
	},
	{
		"lat": 46.173563,
		"lng": -96.583779
	},
	{
		"lat": 46.174154,
		"lng": -96.583324
	},
	{
		"lat": 46.174918,
		"lng": -96.582292
	},
	{
		"lat": 46.175287,
		"lng": -96.581647
	},
	{
		"lat": 46.175432,
		"lng": -96.581396
	},
	{
		"lat": 46.175774,
		"lng": -96.58074
	},
	{
		"lat": 46.176361,
		"lng": -96.579683
	},
	{
		"lat": 46.176711,
		"lng": -96.57928
	},
	{
		"lat": 46.176781,
		"lng": -96.579199
	},
	{
		"lat": 46.176832,
		"lng": -96.579141
	},
	{
		"lat": 46.176895,
		"lng": -96.579207
	},
	{
		"lat": 46.176947,
		"lng": -96.579278
	},
	{
		"lat": 46.177046,
		"lng": -96.579428
	},
	{
		"lat": 46.177127,
		"lng": -96.579598
	},
	{
		"lat": 46.177229,
		"lng": -96.579926
	},
	{
		"lat": 46.177254,
		"lng": -96.580128
	},
	{
		"lat": 46.177275,
		"lng": -96.580226
	},
	{
		"lat": 46.177284,
		"lng": -96.580315
	},
	{
		"lat": 46.177317,
		"lng": -96.580632
	},
	{
		"lat": 46.177331,
		"lng": -96.58094
	},
	{
		"lat": 46.177337,
		"lng": -96.581199
	},
	{
		"lat": 46.177337,
		"lng": -96.581766
	},
	{
		"lat": 46.177316,
		"lng": -96.582588
	},
	{
		"lat": 46.177317,
		"lng": -96.582898
	},
	{
		"lat": 46.17731,
		"lng": -96.58362
	},
	{
		"lat": 46.177287,
		"lng": -96.58403
	},
	{
		"lat": 46.177282,
		"lng": -96.584165
	},
	{
		"lat": 46.17728,
		"lng": -96.584235
	},
	{
		"lat": 46.177272,
		"lng": -96.584337
	},
	{
		"lat": 46.177274,
		"lng": -96.584698
	},
	{
		"lat": 46.177306,
		"lng": -96.585366
	},
	{
		"lat": 46.177318,
		"lng": -96.585448
	},
	{
		"lat": 46.177322,
		"lng": -96.585482
	},
	{
		"lat": 46.177335,
		"lng": -96.585566
	},
	{
		"lat": 46.177338,
		"lng": -96.585584
	},
	{
		"lat": 46.177344,
		"lng": -96.585619
	},
	{
		"lat": 46.177309,
		"lng": -96.585647
	},
	{
		"lat": 46.177244,
		"lng": -96.585698
	},
	{
		"lat": 46.176851,
		"lng": -96.586007
	},
	{
		"lat": 46.176769,
		"lng": -96.585976
	},
	{
		"lat": 46.176517,
		"lng": -96.58588
	},
	{
		"lat": 46.176056,
		"lng": -96.585774
	},
	{
		"lat": 46.175734,
		"lng": -96.585585
	},
	{
		"lat": 46.175417,
		"lng": -96.585627
	},
	{
		"lat": 46.175466,
		"lng": -96.586247
	},
	{
		"lat": 46.175916,
		"lng": -96.586801
	},
	{
		"lat": 46.175967,
		"lng": -96.586863
	},
	{
		"lat": 46.176361,
		"lng": -96.58748
	},
	{
		"lat": 46.176417,
		"lng": -96.588087
	},
	{
		"lat": 46.176235,
		"lng": -96.588884
	},
	{
		"lat": 46.175932,
		"lng": -96.589179
	},
	{
		"lat": 46.175708,
		"lng": -96.589374
	},
	{
		"lat": 46.174905,
		"lng": -96.590163
	},
	{
		"lat": 46.174544,
		"lng": -96.591059
	},
	{
		"lat": 46.174603,
		"lng": -96.592044
	},
	{
		"lat": 46.175211,
		"lng": -96.592682
	},
	{
		"lat": 46.176948,
		"lng": -96.591847
	},
	{
		"lat": 46.178107,
		"lng": -96.592076
	},
	{
		"lat": 46.178405,
		"lng": -96.59176
	},
	{
		"lat": 46.178496,
		"lng": -96.591665
	},
	{
		"lat": 46.178593,
		"lng": -96.590323
	},
	{
		"lat": 46.178734,
		"lng": -96.589332
	},
	{
		"lat": 46.178905,
		"lng": -96.588939
	},
	{
		"lat": 46.179033,
		"lng": -96.588544
	},
	{
		"lat": 46.179058,
		"lng": -96.588466
	},
	{
		"lat": 46.179084,
		"lng": -96.588387
	},
	{
		"lat": 46.179163,
		"lng": -96.588434
	},
	{
		"lat": 46.17928,
		"lng": -96.588503
	},
	{
		"lat": 46.179418,
		"lng": -96.588535
	},
	{
		"lat": 46.179509,
		"lng": -96.588557
	},
	{
		"lat": 46.179574,
		"lng": -96.588582
	},
	{
		"lat": 46.179709,
		"lng": -96.588651
	},
	{
		"lat": 46.179813,
		"lng": -96.588693
	},
	{
		"lat": 46.179832,
		"lng": -96.588699
	},
	{
		"lat": 46.180162,
		"lng": -96.588812
	},
	{
		"lat": 46.180335,
		"lng": -96.588878
	},
	{
		"lat": 46.180796,
		"lng": -96.589001
	},
	{
		"lat": 46.180846,
		"lng": -96.589017
	},
	{
		"lat": 46.181006,
		"lng": -96.589068
	},
	{
		"lat": 46.181145,
		"lng": -96.589118
	},
	{
		"lat": 46.181183,
		"lng": -96.589128
	},
	{
		"lat": 46.181217,
		"lng": -96.58917
	},
	{
		"lat": 46.181285,
		"lng": -96.589253
	},
	{
		"lat": 46.181341,
		"lng": -96.589242
	},
	{
		"lat": 46.181395,
		"lng": -96.589233
	},
	{
		"lat": 46.181424,
		"lng": -96.589178
	},
	{
		"lat": 46.181475,
		"lng": -96.58908
	},
	{
		"lat": 46.181528,
		"lng": -96.588977
	},
	{
		"lat": 46.181649,
		"lng": -96.588745
	},
	{
		"lat": 46.181675,
		"lng": -96.588467
	},
	{
		"lat": 46.181494,
		"lng": -96.588015
	},
	{
		"lat": 46.181484,
		"lng": -96.587989
	},
	{
		"lat": 46.18145,
		"lng": -96.587853
	},
	{
		"lat": 46.181296,
		"lng": -96.587234
	},
	{
		"lat": 46.181404,
		"lng": -96.586876
	},
	{
		"lat": 46.181479,
		"lng": -96.586551
	},
	{
		"lat": 46.181649,
		"lng": -96.586299
	},
	{
		"lat": 46.181812,
		"lng": -96.586151
	},
	{
		"lat": 46.182093,
		"lng": -96.586132
	},
	{
		"lat": 46.182254,
		"lng": -96.586164
	},
	{
		"lat": 46.182342,
		"lng": -96.586182
	},
	{
		"lat": 46.182503,
		"lng": -96.586301
	},
	{
		"lat": 46.182775,
		"lng": -96.586559
	},
	{
		"lat": 46.18291,
		"lng": -96.586839
	},
	{
		"lat": 46.183044,
		"lng": -96.587247
	},
	{
		"lat": 46.183059,
		"lng": -96.587304
	},
	{
		"lat": 46.183313,
		"lng": -96.588243
	},
	{
		"lat": 46.183338,
		"lng": -96.588326
	},
	{
		"lat": 46.183361,
		"lng": -96.58841
	},
	{
		"lat": 46.183384,
		"lng": -96.588492
	},
	{
		"lat": 46.183406,
		"lng": -96.588574
	},
	{
		"lat": 46.183673,
		"lng": -96.589551
	},
	{
		"lat": 46.183811,
		"lng": -96.590068
	},
	{
		"lat": 46.183987,
		"lng": -96.590727
	},
	{
		"lat": 46.184338,
		"lng": -96.591301
	},
	{
		"lat": 46.184682,
		"lng": -96.591572
	},
	{
		"lat": 46.185063,
		"lng": -96.591277
	},
	{
		"lat": 46.185287,
		"lng": -96.59033
	},
	{
		"lat": 46.185407,
		"lng": -96.589826
	},
	{
		"lat": 46.185552,
		"lng": -96.589106
	},
	{
		"lat": 46.185573,
		"lng": -96.58896
	},
	{
		"lat": 46.185773,
		"lng": -96.587617
	},
	{
		"lat": 46.185782,
		"lng": -96.587558
	},
	{
		"lat": 46.185801,
		"lng": -96.587428
	},
	{
		"lat": 46.185863,
		"lng": -96.587419
	},
	{
		"lat": 46.186007,
		"lng": -96.587434
	},
	{
		"lat": 46.186075,
		"lng": -96.587466
	},
	{
		"lat": 46.186106,
		"lng": -96.587492
	},
	{
		"lat": 46.186198,
		"lng": -96.587652
	},
	{
		"lat": 46.186218,
		"lng": -96.587694
	},
	{
		"lat": 46.186248,
		"lng": -96.587788
	},
	{
		"lat": 46.186274,
		"lng": -96.587938
	},
	{
		"lat": 46.186295,
		"lng": -96.588036
	},
	{
		"lat": 46.186306,
		"lng": -96.588138
	},
	{
		"lat": 46.186322,
		"lng": -96.588394
	},
	{
		"lat": 46.186329,
		"lng": -96.588445
	},
	{
		"lat": 46.186345,
		"lng": -96.588701
	},
	{
		"lat": 46.186386,
		"lng": -96.589004
	},
	{
		"lat": 46.186479,
		"lng": -96.589224
	},
	{
		"lat": 46.186603,
		"lng": -96.589411
	},
	{
		"lat": 46.186656,
		"lng": -96.589481
	},
	{
		"lat": 46.186747,
		"lng": -96.589563
	},
	{
		"lat": 46.18678,
		"lng": -96.589585
	},
	{
		"lat": 46.186882,
		"lng": -96.589634
	},
	{
		"lat": 46.186918,
		"lng": -96.589641
	},
	{
		"lat": 46.187097,
		"lng": -96.589618
	},
	{
		"lat": 46.187132,
		"lng": -96.589607
	},
	{
		"lat": 46.187199,
		"lng": -96.589568
	},
	{
		"lat": 46.187273,
		"lng": -96.589467
	},
	{
		"lat": 46.187321,
		"lng": -96.589391
	},
	{
		"lat": 46.18738,
		"lng": -96.589261
	},
	{
		"lat": 46.187415,
		"lng": -96.589171
	},
	{
		"lat": 46.187441,
		"lng": -96.589075
	},
	{
		"lat": 46.187474,
		"lng": -96.588984
	},
	{
		"lat": 46.187514,
		"lng": -96.588841
	},
	{
		"lat": 46.187545,
		"lng": -96.588748
	},
	{
		"lat": 46.187563,
		"lng": -96.588649
	},
	{
		"lat": 46.1876,
		"lng": -96.588504
	},
	{
		"lat": 46.187637,
		"lng": -96.588304
	},
	{
		"lat": 46.187676,
		"lng": -96.588053
	},
	{
		"lat": 46.187702,
		"lng": -96.587957
	},
	{
		"lat": 46.187722,
		"lng": -96.587914
	},
	{
		"lat": 46.187797,
		"lng": -96.587681
	},
	{
		"lat": 46.187825,
		"lng": -96.587619
	},
	{
		"lat": 46.187837,
		"lng": -96.587595
	},
	{
		"lat": 46.18786,
		"lng": -96.587555
	},
	{
		"lat": 46.187912,
		"lng": -96.587485
	},
	{
		"lat": 46.187995,
		"lng": -96.587386
	},
	{
		"lat": 46.188026,
		"lng": -96.58736
	},
	{
		"lat": 46.188059,
		"lng": -96.587343
	},
	{
		"lat": 46.188199,
		"lng": -96.587293
	},
	{
		"lat": 46.188342,
		"lng": -96.587302
	},
	{
		"lat": 46.188449,
		"lng": -96.58732
	},
	{
		"lat": 46.188485,
		"lng": -96.587331
	},
	{
		"lat": 46.188655,
		"lng": -96.587413
	},
	{
		"lat": 46.188719,
		"lng": -96.587457
	},
	{
		"lat": 46.188811,
		"lng": -96.587538
	},
	{
		"lat": 46.188927,
		"lng": -96.587659
	},
	{
		"lat": 46.189178,
		"lng": -96.587949
	},
	{
		"lat": 46.1893,
		"lng": -96.588059
	},
	{
		"lat": 46.189327,
		"lng": -96.588093
	},
	{
		"lat": 46.189392,
		"lng": -96.588137
	},
	{
		"lat": 46.189452,
		"lng": -96.588194
	},
	{
		"lat": 46.189591,
		"lng": -96.588357
	},
	{
		"lat": 46.189691,
		"lng": -96.588505
	},
	{
		"lat": 46.189735,
		"lng": -96.588586
	},
	{
		"lat": 46.189839,
		"lng": -96.588916
	},
	{
		"lat": 46.189875,
		"lng": -96.589169
	},
	{
		"lat": 46.189879,
		"lng": -96.589271
	},
	{
		"lat": 46.189869,
		"lng": -96.589529
	},
	{
		"lat": 46.189849,
		"lng": -96.589732
	},
	{
		"lat": 46.189845,
		"lng": -96.589939
	},
	{
		"lat": 46.189863,
		"lng": -96.590091
	},
	{
		"lat": 46.189887,
		"lng": -96.590189
	},
	{
		"lat": 46.189906,
		"lng": -96.590233
	},
	{
		"lat": 46.190005,
		"lng": -96.590382
	},
	{
		"lat": 46.190057,
		"lng": -96.590453
	},
	{
		"lat": 46.190123,
		"lng": -96.590494
	},
	{
		"lat": 46.190191,
		"lng": -96.590528
	},
	{
		"lat": 46.19026,
		"lng": -96.590554
	},
	{
		"lat": 46.190332,
		"lng": -96.590565
	},
	{
		"lat": 46.190368,
		"lng": -96.590562
	},
	{
		"lat": 46.190474,
		"lng": -96.590538
	},
	{
		"lat": 46.190576,
		"lng": -96.590492
	},
	{
		"lat": 46.190638,
		"lng": -96.59044
	},
	{
		"lat": 46.190794,
		"lng": -96.590226
	},
	{
		"lat": 46.190874,
		"lng": -96.590056
	},
	{
		"lat": 46.190887,
		"lng": -96.590008
	},
	{
		"lat": 46.191002,
		"lng": -96.589689
	},
	{
		"lat": 46.191121,
		"lng": -96.589316
	},
	{
		"lat": 46.191186,
		"lng": -96.589136
	},
	{
		"lat": 46.191245,
		"lng": -96.589008
	},
	{
		"lat": 46.191278,
		"lng": -96.588918
	},
	{
		"lat": 46.191378,
		"lng": -96.588705
	},
	{
		"lat": 46.191535,
		"lng": -96.588424
	},
	{
		"lat": 46.191722,
		"lng": -96.588045
	},
	{
		"lat": 46.191797,
		"lng": -96.587869
	},
	{
		"lat": 46.191908,
		"lng": -96.587667
	},
	{
		"lat": 46.192067,
		"lng": -96.587459
	},
	{
		"lat": 46.192162,
		"lng": -96.587385
	},
	{
		"lat": 46.192227,
		"lng": -96.587342
	},
	{
		"lat": 46.192262,
		"lng": -96.587326
	},
	{
		"lat": 46.192404,
		"lng": -96.587306
	},
	{
		"lat": 46.192546,
		"lng": -96.58734
	},
	{
		"lat": 46.192706,
		"lng": -96.587457
	},
	{
		"lat": 46.192804,
		"lng": -96.587521
	},
	{
		"lat": 46.192923,
		"lng": -96.587636
	},
	{
		"lat": 46.193052,
		"lng": -96.587727
	},
	{
		"lat": 46.19321,
		"lng": -96.587849
	},
	{
		"lat": 46.193276,
		"lng": -96.587891
	},
	{
		"lat": 46.193378,
		"lng": -96.587943
	},
	{
		"lat": 46.193531,
		"lng": -96.587954
	},
	{
		"lat": 46.193638,
		"lng": -96.587933
	},
	{
		"lat": 46.193707,
		"lng": -96.587905
	},
	{
		"lat": 46.19374,
		"lng": -96.587884
	},
	{
		"lat": 46.193831,
		"lng": -96.587801
	},
	{
		"lat": 46.193878,
		"lng": -96.587724
	},
	{
		"lat": 46.193964,
		"lng": -96.587558
	},
	{
		"lat": 46.19398,
		"lng": -96.587513
	},
	{
		"lat": 46.194002,
		"lng": -96.587362
	},
	{
		"lat": 46.194005,
		"lng": -96.587157
	},
	{
		"lat": 46.193983,
		"lng": -96.586903
	},
	{
		"lat": 46.19397,
		"lng": -96.586802
	},
	{
		"lat": 46.193944,
		"lng": -96.586653
	},
	{
		"lat": 46.193903,
		"lng": -96.58635
	},
	{
		"lat": 46.193883,
		"lng": -96.586147
	},
	{
		"lat": 46.193879,
		"lng": -96.586045
	},
	{
		"lat": 46.193885,
		"lng": -96.585995
	},
	{
		"lat": 46.193882,
		"lng": -96.585893
	},
	{
		"lat": 46.193895,
		"lng": -96.585742
	},
	{
		"lat": 46.193922,
		"lng": -96.585541
	},
	{
		"lat": 46.193958,
		"lng": -96.585397
	},
	{
		"lat": 46.193998,
		"lng": -96.585313
	},
	{
		"lat": 46.194104,
		"lng": -96.585176
	},
	{
		"lat": 46.194133,
		"lng": -96.585146
	},
	{
		"lat": 46.194198,
		"lng": -96.585102
	},
	{
		"lat": 46.194232,
		"lng": -96.585088
	},
	{
		"lat": 46.194339,
		"lng": -96.585061
	},
	{
		"lat": 46.194446,
		"lng": -96.585047
	},
	{
		"lat": 46.194517,
		"lng": -96.585055
	},
	{
		"lat": 46.194624,
		"lng": -96.585077
	},
	{
		"lat": 46.194691,
		"lng": -96.585112
	},
	{
		"lat": 46.194755,
		"lng": -96.585159
	},
	{
		"lat": 46.194811,
		"lng": -96.585224
	},
	{
		"lat": 46.194884,
		"lng": -96.585336
	},
	{
		"lat": 46.194948,
		"lng": -96.58546
	},
	{
		"lat": 46.194982,
		"lng": -96.58555
	},
	{
		"lat": 46.195043,
		"lng": -96.585792
	},
	{
		"lat": 46.195054,
		"lng": -96.585893
	},
	{
		"lat": 46.19507,
		"lng": -96.585993
	},
	{
		"lat": 46.195092,
		"lng": -96.586298
	},
	{
		"lat": 46.195095,
		"lng": -96.586388
	},
	{
		"lat": 46.195096,
		"lng": -96.5864
	},
	{
		"lat": 46.195116,
		"lng": -96.586552
	},
	{
		"lat": 46.195152,
		"lng": -96.587063
	},
	{
		"lat": 46.195161,
		"lng": -96.587268
	},
	{
		"lat": 46.195168,
		"lng": -96.587835
	},
	{
		"lat": 46.195165,
		"lng": -96.58799
	},
	{
		"lat": 46.195141,
		"lng": -96.588607
	},
	{
		"lat": 46.195139,
		"lng": -96.588916
	},
	{
		"lat": 46.195126,
		"lng": -96.589535
	},
	{
		"lat": 46.195125,
		"lng": -96.589742
	},
	{
		"lat": 46.195162,
		"lng": -96.590253
	},
	{
		"lat": 46.195175,
		"lng": -96.590302
	},
	{
		"lat": 46.195182,
		"lng": -96.590422
	},
	{
		"lat": 46.195194,
		"lng": -96.590523
	},
	{
		"lat": 46.195241,
		"lng": -96.590718
	},
	{
		"lat": 46.195274,
		"lng": -96.59081
	},
	{
		"lat": 46.195424,
		"lng": -96.591031
	},
	{
		"lat": 46.195479,
		"lng": -96.591096
	},
	{
		"lat": 46.195538,
		"lng": -96.591155
	},
	{
		"lat": 46.195571,
		"lng": -96.591176
	},
	{
		"lat": 46.195675,
		"lng": -96.591217
	},
	{
		"lat": 46.195747,
		"lng": -96.591226
	},
	{
		"lat": 46.195781,
		"lng": -96.591213
	},
	{
		"lat": 46.195783,
		"lng": -96.591212
	},
	{
		"lat": 46.195888,
		"lng": -96.591192
	},
	{
		"lat": 46.195898,
		"lng": -96.591186
	},
	{
		"lat": 46.195932,
		"lng": -96.591166
	},
	{
		"lat": 46.19602,
		"lng": -96.591112
	},
	{
		"lat": 46.196145,
		"lng": -96.591014
	},
	{
		"lat": 46.196229,
		"lng": -96.590917
	},
	{
		"lat": 46.196333,
		"lng": -96.590776
	},
	{
		"lat": 46.196476,
		"lng": -96.590545
	},
	{
		"lat": 46.19663,
		"lng": -96.590261
	},
	{
		"lat": 46.196748,
		"lng": -96.590003
	},
	{
		"lat": 46.196836,
		"lng": -96.589777
	},
	{
		"lat": 46.196879,
		"lng": -96.589635
	},
	{
		"lat": 46.19692,
		"lng": -96.589438
	},
	{
		"lat": 46.196945,
		"lng": -96.589341
	},
	{
		"lat": 46.196963,
		"lng": -96.589241
	},
	{
		"lat": 46.196994,
		"lng": -96.588988
	},
	{
		"lat": 46.196997,
		"lng": -96.588782
	},
	{
		"lat": 46.19699,
		"lng": -96.588525
	},
	{
		"lat": 46.196983,
		"lng": -96.58801
	},
	{
		"lat": 46.196997,
		"lng": -96.58739
	},
	{
		"lat": 46.196997,
		"lng": -96.586771
	},
	{
		"lat": 46.19699,
		"lng": -96.586514
	},
	{
		"lat": 46.196998,
		"lng": -96.585998
	},
	{
		"lat": 46.19699,
		"lng": -96.585741
	},
	{
		"lat": 46.197002,
		"lng": -96.585483
	},
	{
		"lat": 46.197015,
		"lng": -96.585382
	},
	{
		"lat": 46.197067,
		"lng": -96.58519
	},
	{
		"lat": 46.197076,
		"lng": -96.58514
	},
	{
		"lat": 46.197106,
		"lng": -96.585047
	},
	{
		"lat": 46.197321,
		"lng": -96.584772
	},
	{
		"lat": 46.197349,
		"lng": -96.58474
	},
	{
		"lat": 46.197511,
		"lng": -96.584629
	},
	{
		"lat": 46.197711,
		"lng": -96.584522
	},
	{
		"lat": 46.197815,
		"lng": -96.58448
	},
	{
		"lat": 46.197885,
		"lng": -96.584462
	},
	{
		"lat": 46.198022,
		"lng": -96.5844
	},
	{
		"lat": 46.198445,
		"lng": -96.584345
	},
	{
		"lat": 46.198516,
		"lng": -96.584344
	},
	{
		"lat": 46.198657,
		"lng": -96.584366
	},
	{
		"lat": 46.198762,
		"lng": -96.584397
	},
	{
		"lat": 46.1988,
		"lng": -96.584416
	},
	{
		"lat": 46.19883,
		"lng": -96.584432
	},
	{
		"lat": 46.199008,
		"lng": -96.58447
	},
	{
		"lat": 46.199187,
		"lng": -96.584453
	},
	{
		"lat": 46.199293,
		"lng": -96.584429
	},
	{
		"lat": 46.199363,
		"lng": -96.584405
	},
	{
		"lat": 46.199399,
		"lng": -96.584398
	},
	{
		"lat": 46.199603,
		"lng": -96.584305
	},
	{
		"lat": 46.199835,
		"lng": -96.584173
	},
	{
		"lat": 46.199905,
		"lng": -96.584147
	},
	{
		"lat": 46.199969,
		"lng": -96.584103
	},
	{
		"lat": 46.2003,
		"lng": -96.583913
	},
	{
		"lat": 46.200364,
		"lng": -96.583867
	},
	{
		"lat": 46.200465,
		"lng": -96.583813
	},
	{
		"lat": 46.200497,
		"lng": -96.583789
	},
	{
		"lat": 46.200597,
		"lng": -96.583733
	},
	{
		"lat": 46.200735,
		"lng": -96.583677
	},
	{
		"lat": 46.200877,
		"lng": -96.583649
	},
	{
		"lat": 46.201021,
		"lng": -96.583641
	},
	{
		"lat": 46.201127,
		"lng": -96.583662
	},
	{
		"lat": 46.201163,
		"lng": -96.583674
	},
	{
		"lat": 46.201244,
		"lng": -96.58373
	},
	{
		"lat": 46.20127,
		"lng": -96.583765
	},
	{
		"lat": 46.201363,
		"lng": -96.583923
	},
	{
		"lat": 46.201403,
		"lng": -96.584008
	},
	{
		"lat": 46.201429,
		"lng": -96.584105
	},
	{
		"lat": 46.201447,
		"lng": -96.584204
	},
	{
		"lat": 46.20146,
		"lng": -96.584461
	},
	{
		"lat": 46.201462,
		"lng": -96.584719
	},
	{
		"lat": 46.201453,
		"lng": -96.584872
	},
	{
		"lat": 46.201426,
		"lng": -96.585075
	},
	{
		"lat": 46.201389,
		"lng": -96.585274
	},
	{
		"lat": 46.201366,
		"lng": -96.585371
	},
	{
		"lat": 46.201359,
		"lng": -96.585422
	},
	{
		"lat": 46.201329,
		"lng": -96.58557
	},
	{
		"lat": 46.201304,
		"lng": -96.585667
	},
	{
		"lat": 46.201258,
		"lng": -96.585915
	},
	{
		"lat": 46.201244,
		"lng": -96.585962
	},
	{
		"lat": 46.201222,
		"lng": -96.586166
	},
	{
		"lat": 46.201212,
		"lng": -96.586424
	},
	{
		"lat": 46.201215,
		"lng": -96.586579
	},
	{
		"lat": 46.201264,
		"lng": -96.58688
	},
	{
		"lat": 46.201315,
		"lng": -96.587016
	},
	{
		"lat": 46.201464,
		"lng": -96.58724
	},
	{
		"lat": 46.201492,
		"lng": -96.587273
	},
	{
		"lat": 46.201589,
		"lng": -96.587341
	},
	{
		"lat": 46.201625,
		"lng": -96.587349
	},
	{
		"lat": 46.201696,
		"lng": -96.587342
	},
	{
		"lat": 46.201839,
		"lng": -96.587311
	},
	{
		"lat": 46.201971,
		"lng": -96.587227
	},
	{
		"lat": 46.202027,
		"lng": -96.587164
	},
	{
		"lat": 46.20207,
		"lng": -96.58713
	},
	{
		"lat": 46.202125,
		"lng": -96.587064
	},
	{
		"lat": 46.202276,
		"lng": -96.586843
	},
	{
		"lat": 46.202423,
		"lng": -96.586618
	},
	{
		"lat": 46.202492,
		"lng": -96.586501
	},
	{
		"lat": 46.202556,
		"lng": -96.586378
	},
	{
		"lat": 46.202636,
		"lng": -96.586207
	},
	{
		"lat": 46.202822,
		"lng": -96.585767
	},
	{
		"lat": 46.20291,
		"lng": -96.585544
	},
	{
		"lat": 46.203248,
		"lng": -96.584753
	},
	{
		"lat": 46.203313,
		"lng": -96.58463
	},
	{
		"lat": 46.203338,
		"lng": -96.584592
	},
	{
		"lat": 46.203419,
		"lng": -96.58449
	},
	{
		"lat": 46.203476,
		"lng": -96.584427
	},
	{
		"lat": 46.203539,
		"lng": -96.584378
	},
	{
		"lat": 46.203607,
		"lng": -96.584344
	},
	{
		"lat": 46.203639,
		"lng": -96.584319
	},
	{
		"lat": 46.20374,
		"lng": -96.584269
	},
	{
		"lat": 46.203811,
		"lng": -96.584247
	},
	{
		"lat": 46.203882,
		"lng": -96.584235
	},
	{
		"lat": 46.203989,
		"lng": -96.584224
	},
	{
		"lat": 46.204025,
		"lng": -96.584228
	},
	{
		"lat": 46.204094,
		"lng": -96.584258
	},
	{
		"lat": 46.20416,
		"lng": -96.584298
	},
	{
		"lat": 46.204189,
		"lng": -96.584329
	},
	{
		"lat": 46.204264,
		"lng": -96.584439
	},
	{
		"lat": 46.204328,
		"lng": -96.584563
	},
	{
		"lat": 46.20436,
		"lng": -96.584655
	},
	{
		"lat": 46.204379,
		"lng": -96.584755
	},
	{
		"lat": 46.204395,
		"lng": -96.58496
	},
	{
		"lat": 46.20439,
		"lng": -96.585114
	},
	{
		"lat": 46.204385,
		"lng": -96.585165
	},
	{
		"lat": 46.204383,
		"lng": -96.585268
	},
	{
		"lat": 46.20437,
		"lng": -96.585421
	},
	{
		"lat": 46.204351,
		"lng": -96.585573
	},
	{
		"lat": 46.204276,
		"lng": -96.58597
	},
	{
		"lat": 46.204228,
		"lng": -96.586378
	},
	{
		"lat": 46.204189,
		"lng": -96.586838
	},
	{
		"lat": 46.204163,
		"lng": -96.5873
	},
	{
		"lat": 46.204187,
		"lng": -96.587866
	},
	{
		"lat": 46.204213,
		"lng": -96.588277
	},
	{
		"lat": 46.20428,
		"lng": -96.588571
	},
	{
		"lat": 46.204295,
		"lng": -96.588618
	},
	{
		"lat": 46.204337,
		"lng": -96.588701
	},
	{
		"lat": 46.204462,
		"lng": -96.588886
	},
	{
		"lat": 46.20449,
		"lng": -96.588919
	},
	{
		"lat": 46.204522,
		"lng": -96.588942
	},
	{
		"lat": 46.204625,
		"lng": -96.588985
	},
	{
		"lat": 46.204766,
		"lng": -96.589027
	},
	{
		"lat": 46.204874,
		"lng": -96.589032
	},
	{
		"lat": 46.204946,
		"lng": -96.589027
	},
	{
		"lat": 46.205053,
		"lng": -96.589009
	},
	{
		"lat": 46.205227,
		"lng": -96.588948
	},
	{
		"lat": 46.205427,
		"lng": -96.588832
	},
	{
		"lat": 46.205525,
		"lng": -96.588768
	},
	{
		"lat": 46.205556,
		"lng": -96.588743
	},
	{
		"lat": 46.205584,
		"lng": -96.588709
	},
	{
		"lat": 46.205647,
		"lng": -96.58866
	},
	{
		"lat": 46.205796,
		"lng": -96.58852
	},
	{
		"lat": 46.205825,
		"lng": -96.588488
	},
	{
		"lat": 46.205918,
		"lng": -96.588409
	},
	{
		"lat": 46.205975,
		"lng": -96.588348
	},
	{
		"lat": 46.206168,
		"lng": -96.58821
	},
	{
		"lat": 46.206397,
		"lng": -96.58806
	},
	{
		"lat": 46.206532,
		"lng": -96.587986
	},
	{
		"lat": 46.206622,
		"lng": -96.587957
	},
	{
		"lat": 46.206689,
		"lng": -96.58792
	},
	{
		"lat": 46.206721,
		"lng": -96.587895
	},
	{
		"lat": 46.206892,
		"lng": -96.587707
	},
	{
		"lat": 46.206967,
		"lng": -96.587595
	},
	{
		"lat": 46.207028,
		"lng": -96.587467
	},
	{
		"lat": 46.207073,
		"lng": -96.587386
	},
	{
		"lat": 46.207129,
		"lng": -96.587254
	},
	{
		"lat": 46.207173,
		"lng": -96.587113
	},
	{
		"lat": 46.207198,
		"lng": -96.586962
	},
	{
		"lat": 46.207231,
		"lng": -96.586657
	},
	{
		"lat": 46.207237,
		"lng": -96.586554
	},
	{
		"lat": 46.207242,
		"lng": -96.586296
	},
	{
		"lat": 46.207231,
		"lng": -96.585884
	},
	{
		"lat": 46.207242,
		"lng": -96.585214
	},
	{
		"lat": 46.207251,
		"lng": -96.585059
	},
	{
		"lat": 46.207298,
		"lng": -96.584549
	},
	{
		"lat": 46.207308,
		"lng": -96.584499
	},
	{
		"lat": 46.207335,
		"lng": -96.584404
	},
	{
		"lat": 46.207382,
		"lng": -96.584265
	},
	{
		"lat": 46.20745,
		"lng": -96.584144
	},
	{
		"lat": 46.207556,
		"lng": -96.584006
	},
	{
		"lat": 46.207616,
		"lng": -96.583949
	},
	{
		"lat": 46.207712,
		"lng": -96.583879
	},
	{
		"lat": 46.207816,
		"lng": -96.583841
	},
	{
		"lat": 46.207882,
		"lng": -96.583801
	},
	{
		"lat": 46.207951,
		"lng": -96.583772
	},
	{
		"lat": 46.208059,
		"lng": -96.583761
	},
	{
		"lat": 46.208165,
		"lng": -96.583779
	},
	{
		"lat": 46.208237,
		"lng": -96.583787
	},
	{
		"lat": 46.208342,
		"lng": -96.583822
	},
	{
		"lat": 46.208375,
		"lng": -96.583842
	},
	{
		"lat": 46.208465,
		"lng": -96.583926
	},
	{
		"lat": 46.208519,
		"lng": -96.583995
	},
	{
		"lat": 46.208568,
		"lng": -96.584069
	},
	{
		"lat": 46.208792,
		"lng": -96.584472
	},
	{
		"lat": 46.208871,
		"lng": -96.584644
	},
	{
		"lat": 46.209042,
		"lng": -96.585036
	},
	{
		"lat": 46.209164,
		"lng": -96.585292
	},
	{
		"lat": 46.209301,
		"lng": -96.58556
	},
	{
		"lat": 46.209505,
		"lng": -96.585957
	},
	{
		"lat": 46.209792,
		"lng": -96.586487
	},
	{
		"lat": 46.209834,
		"lng": -96.586571
	},
	{
		"lat": 46.20987,
		"lng": -96.58666
	},
	{
		"lat": 46.2099,
		"lng": -96.586754
	},
	{
		"lat": 46.209919,
		"lng": -96.586798
	},
	{
		"lat": 46.209962,
		"lng": -96.587005
	},
	{
		"lat": 46.209967,
		"lng": -96.587056
	},
	{
		"lat": 46.209962,
		"lng": -96.587262
	},
	{
		"lat": 46.209929,
		"lng": -96.587516
	},
	{
		"lat": 46.209903,
		"lng": -96.587612
	},
	{
		"lat": 46.209842,
		"lng": -96.587797
	},
	{
		"lat": 46.209821,
		"lng": -96.587896
	},
	{
		"lat": 46.209768,
		"lng": -96.58803
	},
	{
		"lat": 46.209729,
		"lng": -96.588117
	},
	{
		"lat": 46.209697,
		"lng": -96.588209
	},
	{
		"lat": 46.209509,
		"lng": -96.588586
	},
	{
		"lat": 46.209409,
		"lng": -96.588734
	},
	{
		"lat": 46.209227,
		"lng": -96.588985
	},
	{
		"lat": 46.209114,
		"lng": -96.589112
	},
	{
		"lat": 46.20895,
		"lng": -96.589313
	},
	{
		"lat": 46.208875,
		"lng": -96.589424
	},
	{
		"lat": 46.208664,
		"lng": -96.589775
	},
	{
		"lat": 46.208562,
		"lng": -96.589988
	},
	{
		"lat": 46.208519,
		"lng": -96.590129
	},
	{
		"lat": 46.208489,
		"lng": -96.590278
	},
	{
		"lat": 46.208473,
		"lng": -96.590379
	},
	{
		"lat": 46.20846,
		"lng": -96.590688
	},
	{
		"lat": 46.208463,
		"lng": -96.590792
	},
	{
		"lat": 46.208479,
		"lng": -96.590837
	},
	{
		"lat": 46.208602,
		"lng": -96.591025
	},
	{
		"lat": 46.208659,
		"lng": -96.591089
	},
	{
		"lat": 46.20869,
		"lng": -96.591114
	},
	{
		"lat": 46.208725,
		"lng": -96.591128
	},
	{
		"lat": 46.208939,
		"lng": -96.591171
	},
	{
		"lat": 46.209011,
		"lng": -96.591177
	},
	{
		"lat": 46.209083,
		"lng": -96.591173
	},
	{
		"lat": 46.209118,
		"lng": -96.591162
	},
	{
		"lat": 46.209215,
		"lng": -96.591096
	},
	{
		"lat": 46.20934,
		"lng": -96.590993
	},
	{
		"lat": 46.209517,
		"lng": -96.590818
	},
	{
		"lat": 46.209772,
		"lng": -96.590534
	},
	{
		"lat": 46.209938,
		"lng": -96.590336
	},
	{
		"lat": 46.210026,
		"lng": -96.590249
	},
	{
		"lat": 46.210384,
		"lng": -96.589919
	},
	{
		"lat": 46.21051,
		"lng": -96.589803
	},
	{
		"lat": 46.210633,
		"lng": -96.589697
	},
	{
		"lat": 46.210697,
		"lng": -96.589649
	},
	{
		"lat": 46.210758,
		"lng": -96.589595
	},
	{
		"lat": 46.210791,
		"lng": -96.589575
	},
	{
		"lat": 46.210853,
		"lng": -96.589523
	},
	{
		"lat": 46.210922,
		"lng": -96.589492
	},
	{
		"lat": 46.210986,
		"lng": -96.589444
	},
	{
		"lat": 46.21122,
		"lng": -96.589312
	},
	{
		"lat": 46.211317,
		"lng": -96.589246
	},
	{
		"lat": 46.211385,
		"lng": -96.589212
	},
	{
		"lat": 46.211449,
		"lng": -96.589164
	},
	{
		"lat": 46.211515,
		"lng": -96.589124
	},
	{
		"lat": 46.211579,
		"lng": -96.589076
	},
	{
		"lat": 46.211715,
		"lng": -96.589006
	},
	{
		"lat": 46.211846,
		"lng": -96.588922
	},
	{
		"lat": 46.211914,
		"lng": -96.588888
	},
	{
		"lat": 46.212009,
		"lng": -96.588816
	},
	{
		"lat": 46.212139,
		"lng": -96.588727
	},
	{
		"lat": 46.212174,
		"lng": -96.588711
	},
	{
		"lat": 46.212457,
		"lng": -96.588539
	},
	{
		"lat": 46.212489,
		"lng": -96.588515
	},
	{
		"lat": 46.212524,
		"lng": -96.588501
	},
	{
		"lat": 46.212807,
		"lng": -96.588428
	},
	{
		"lat": 46.212879,
		"lng": -96.58844
	},
	{
		"lat": 46.212948,
		"lng": -96.588469
	},
	{
		"lat": 46.213012,
		"lng": -96.588517
	},
	{
		"lat": 46.213069,
		"lng": -96.588581
	},
	{
		"lat": 46.213094,
		"lng": -96.588618
	},
	{
		"lat": 46.21316,
		"lng": -96.58874
	},
	{
		"lat": 46.213201,
		"lng": -96.588826
	},
	{
		"lat": 46.213252,
		"lng": -96.588962
	},
	{
		"lat": 46.213277,
		"lng": -96.589059
	},
	{
		"lat": 46.213308,
		"lng": -96.589208
	},
	{
		"lat": 46.213333,
		"lng": -96.589304
	},
	{
		"lat": 46.213387,
		"lng": -96.589867
	},
	{
		"lat": 46.213401,
		"lng": -96.589969
	},
	{
		"lat": 46.213421,
		"lng": -96.590277
	},
	{
		"lat": 46.213457,
		"lng": -96.590946
	},
	{
		"lat": 46.213479,
		"lng": -96.591273
	},
	{
		"lat": 46.213514,
		"lng": -96.591768
	},
	{
		"lat": 46.213513,
		"lng": -96.591871
	},
	{
		"lat": 46.213542,
		"lng": -96.592179
	},
	{
		"lat": 46.213552,
		"lng": -96.592227
	},
	{
		"lat": 46.213651,
		"lng": -96.592444
	},
	{
		"lat": 46.213673,
		"lng": -96.592484
	},
	{
		"lat": 46.213799,
		"lng": -96.592668
	},
	{
		"lat": 46.213914,
		"lng": -96.592792
	},
	{
		"lat": 46.213978,
		"lng": -96.592839
	},
	{
		"lat": 46.214046,
		"lng": -96.592872
	},
	{
		"lat": 46.214154,
		"lng": -96.59289
	},
	{
		"lat": 46.214297,
		"lng": -96.592889
	},
	{
		"lat": 46.214402,
		"lng": -96.592852
	},
	{
		"lat": 46.214468,
		"lng": -96.592811
	},
	{
		"lat": 46.214564,
		"lng": -96.59274
	},
	{
		"lat": 46.214738,
		"lng": -96.592556
	},
	{
		"lat": 46.214918,
		"lng": -96.592387
	},
	{
		"lat": 46.214983,
		"lng": -96.592345
	},
	{
		"lat": 46.215109,
		"lng": -96.592246
	},
	{
		"lat": 46.215206,
		"lng": -96.592182
	},
	{
		"lat": 46.215375,
		"lng": -96.592094
	},
	{
		"lat": 46.215439,
		"lng": -96.592049
	},
	{
		"lat": 46.21554,
		"lng": -96.591991
	},
	{
		"lat": 46.215638,
		"lng": -96.591927
	},
	{
		"lat": 46.2157,
		"lng": -96.591876
	},
	{
		"lat": 46.215797,
		"lng": -96.591807
	},
	{
		"lat": 46.215864,
		"lng": -96.59177
	},
	{
		"lat": 46.216027,
		"lng": -96.591662
	},
	{
		"lat": 46.216164,
		"lng": -96.591595
	},
	{
		"lat": 46.216411,
		"lng": -96.591525
	},
	{
		"lat": 46.216554,
		"lng": -96.59152
	},
	{
		"lat": 46.216733,
		"lng": -96.591506
	},
	{
		"lat": 46.217236,
		"lng": -96.591511
	},
	{
		"lat": 46.217416,
		"lng": -96.591523
	},
	{
		"lat": 46.217631,
		"lng": -96.591551
	},
	{
		"lat": 46.217805,
		"lng": -96.591609
	},
	{
		"lat": 46.217909,
		"lng": -96.591651
	},
	{
		"lat": 46.21801,
		"lng": -96.591706
	},
	{
		"lat": 46.218115,
		"lng": -96.591742
	},
	{
		"lat": 46.218249,
		"lng": -96.591816
	},
	{
		"lat": 46.218315,
		"lng": -96.591858
	},
	{
		"lat": 46.218407,
		"lng": -96.591939
	},
	{
		"lat": 46.21847,
		"lng": -96.591987
	},
	{
		"lat": 46.218577,
		"lng": -96.592126
	},
	{
		"lat": 46.218771,
		"lng": -96.592429
	},
	{
		"lat": 46.218872,
		"lng": -96.592643
	},
	{
		"lat": 46.21897,
		"lng": -96.592918
	},
	{
		"lat": 46.219021,
		"lng": -96.593166
	},
	{
		"lat": 46.21905,
		"lng": -96.59326
	},
	{
		"lat": 46.219077,
		"lng": -96.59341
	},
	{
		"lat": 46.219102,
		"lng": -96.593613
	},
	{
		"lat": 46.219118,
		"lng": -96.593713
	},
	{
		"lat": 46.219136,
		"lng": -96.593918
	},
	{
		"lat": 46.219162,
		"lng": -96.594068
	},
	{
		"lat": 46.219184,
		"lng": -96.594165
	},
	{
		"lat": 46.219199,
		"lng": -96.594371
	},
	{
		"lat": 46.219211,
		"lng": -96.594472
	},
	{
		"lat": 46.219237,
		"lng": -96.594622
	},
	{
		"lat": 46.219273,
		"lng": -96.594926
	},
	{
		"lat": 46.219283,
		"lng": -96.594976
	},
	{
		"lat": 46.219312,
		"lng": -96.59507
	},
	{
		"lat": 46.219342,
		"lng": -96.595209
	},
	{
		"lat": 46.219357,
		"lng": -96.595256
	},
	{
		"lat": 46.219376,
		"lng": -96.5953
	},
	{
		"lat": 46.219421,
		"lng": -96.59538
	},
	{
		"lat": 46.219546,
		"lng": -96.595566
	},
	{
		"lat": 46.219627,
		"lng": -96.595666
	},
	{
		"lat": 46.219688,
		"lng": -96.595723
	},
	{
		"lat": 46.21972,
		"lng": -96.595746
	},
	{
		"lat": 46.219788,
		"lng": -96.595777
	},
	{
		"lat": 46.219929,
		"lng": -96.595823
	},
	{
		"lat": 46.220109,
		"lng": -96.595822
	},
	{
		"lat": 46.220466,
		"lng": -96.595774
	},
	{
		"lat": 46.220537,
		"lng": -96.595758
	},
	{
		"lat": 46.220712,
		"lng": -96.595698
	},
	{
		"lat": 46.220917,
		"lng": -96.595601
	},
	{
		"lat": 46.221016,
		"lng": -96.595541
	},
	{
		"lat": 46.221081,
		"lng": -96.595495
	},
	{
		"lat": 46.221251,
		"lng": -96.595412
	},
	{
		"lat": 46.221614,
		"lng": -96.595189
	},
	{
		"lat": 46.221752,
		"lng": -96.595129
	},
	{
		"lat": 46.221784,
		"lng": -96.595107
	},
	{
		"lat": 46.221987,
		"lng": -96.595
	},
	{
		"lat": 46.222193,
		"lng": -96.594907
	},
	{
		"lat": 46.222366,
		"lng": -96.594837
	},
	{
		"lat": 46.222506,
		"lng": -96.594789
	},
	{
		"lat": 46.222648,
		"lng": -96.594755
	},
	{
		"lat": 46.222753,
		"lng": -96.594719
	},
	{
		"lat": 46.222932,
		"lng": -96.594683
	},
	{
		"lat": 46.223112,
		"lng": -96.594681
	},
	{
		"lat": 46.223507,
		"lng": -96.594713
	},
	{
		"lat": 46.223579,
		"lng": -96.594724
	},
	{
		"lat": 46.223823,
		"lng": -96.594809
	},
	{
		"lat": 46.223857,
		"lng": -96.594829
	},
	{
		"lat": 46.223926,
		"lng": -96.594857
	},
	{
		"lat": 46.224057,
		"lng": -96.594943
	},
	{
		"lat": 46.224119,
		"lng": -96.594994
	},
	{
		"lat": 46.224206,
		"lng": -96.595086
	},
	{
		"lat": 46.224296,
		"lng": -96.595172
	},
	{
		"lat": 46.224358,
		"lng": -96.595225
	},
	{
		"lat": 46.224613,
		"lng": -96.595511
	},
	{
		"lat": 46.224877,
		"lng": -96.595781
	},
	{
		"lat": 46.225002,
		"lng": -96.595884
	},
	{
		"lat": 46.225099,
		"lng": -96.59595
	},
	{
		"lat": 46.225159,
		"lng": -96.596008
	},
	{
		"lat": 46.225379,
		"lng": -96.596274
	},
	{
		"lat": 46.225442,
		"lng": -96.596325
	},
	{
		"lat": 46.225469,
		"lng": -96.59636
	},
	{
		"lat": 46.225527,
		"lng": -96.596421
	},
	{
		"lat": 46.225601,
		"lng": -96.596533
	},
	{
		"lat": 46.22566,
		"lng": -96.596593
	},
	{
		"lat": 46.225676,
		"lng": -96.596606
	},
	{
		"lat": 46.225755,
		"lng": -96.596667
	},
	{
		"lat": 46.225853,
		"lng": -96.596731
	},
	{
		"lat": 46.225947,
		"lng": -96.596807
	},
	{
		"lat": 46.226014,
		"lng": -96.596846
	},
	{
		"lat": 46.226111,
		"lng": -96.596914
	},
	{
		"lat": 46.226245,
		"lng": -96.59699
	},
	{
		"lat": 46.226484,
		"lng": -96.597103
	},
	{
		"lat": 46.226836,
		"lng": -96.59721
	},
	{
		"lat": 46.227049,
		"lng": -96.597263
	},
	{
		"lat": 46.227587,
		"lng": -96.59734
	},
	{
		"lat": 46.227763,
		"lng": -96.59739
	},
	{
		"lat": 46.228112,
		"lng": -96.59752
	},
	{
		"lat": 46.228386,
		"lng": -96.597647
	},
	{
		"lat": 46.228633,
		"lng": -96.597723
	},
	{
		"lat": 46.22888,
		"lng": -96.597792
	},
	{
		"lat": 46.228952,
		"lng": -96.597805
	},
	{
		"lat": 46.229059,
		"lng": -96.597816
	},
	{
		"lat": 46.229275,
		"lng": -96.59782
	},
	{
		"lat": 46.229454,
		"lng": -96.59779
	},
	{
		"lat": 46.229559,
		"lng": -96.597755
	},
	{
		"lat": 46.229638,
		"lng": -96.59772
	},
	{
		"lat": 46.22977,
		"lng": -96.597637
	},
	{
		"lat": 46.229804,
		"lng": -96.597622
	},
	{
		"lat": 46.230087,
		"lng": -96.597547
	},
	{
		"lat": 46.230121,
		"lng": -96.59753
	},
	{
		"lat": 46.230331,
		"lng": -96.597458
	},
	{
		"lat": 46.230466,
		"lng": -96.597387
	},
	{
		"lat": 46.230597,
		"lng": -96.597299
	},
	{
		"lat": 46.230659,
		"lng": -96.597247
	},
	{
		"lat": 46.230723,
		"lng": -96.597201
	},
	{
		"lat": 46.230971,
		"lng": -96.597137
	},
	{
		"lat": 46.231114,
		"lng": -96.597111
	},
	{
		"lat": 46.231197,
		"lng": -96.597083
	},
	{
		"lat": 46.231325,
		"lng": -96.597039
	},
	{
		"lat": 46.231572,
		"lng": -96.596969
	},
	{
		"lat": 46.23186,
		"lng": -96.596937
	},
	{
		"lat": 46.232004,
		"lng": -96.59693
	},
	{
		"lat": 46.232071,
		"lng": -96.59693
	},
	{
		"lat": 46.23222,
		"lng": -96.596932
	},
	{
		"lat": 46.232364,
		"lng": -96.596939
	},
	{
		"lat": 46.232649,
		"lng": -96.596993
	},
	{
		"lat": 46.232719,
		"lng": -96.597018
	},
	{
		"lat": 46.232755,
		"lng": -96.597025
	},
	{
		"lat": 46.232929,
		"lng": -96.59709
	},
	{
		"lat": 46.233067,
		"lng": -96.597151
	},
	{
		"lat": 46.233237,
		"lng": -96.597235
	},
	{
		"lat": 46.233303,
		"lng": -96.597275
	},
	{
		"lat": 46.233338,
		"lng": -96.59729
	},
	{
		"lat": 46.233601,
		"lng": -96.597454
	},
	{
		"lat": 46.234008,
		"lng": -96.597785
	},
	{
		"lat": 46.234157,
		"lng": -96.59793
	},
	{
		"lat": 46.234189,
		"lng": -96.597955
	},
	{
		"lat": 46.234276,
		"lng": -96.598047
	},
	{
		"lat": 46.234376,
		"lng": -96.59814
	},
	{
		"lat": 46.234427,
		"lng": -96.598188
	},
	{
		"lat": 46.234674,
		"lng": -96.5984
	},
	{
		"lat": 46.234739,
		"lng": -96.598443
	},
	{
		"lat": 46.234799,
		"lng": -96.5985
	},
	{
		"lat": 46.235055,
		"lng": -96.598722
	},
	{
		"lat": 46.235077,
		"lng": -96.598741
	},
	{
		"lat": 46.235111,
		"lng": -96.598757
	},
	{
		"lat": 46.235148,
		"lng": -96.598783
	},
	{
		"lat": 46.235208,
		"lng": -96.598825
	},
	{
		"lat": 46.235375,
		"lng": -96.598921
	},
	{
		"lat": 46.235478,
		"lng": -96.598969
	},
	{
		"lat": 46.235617,
		"lng": -96.599021
	},
	{
		"lat": 46.235723,
		"lng": -96.59905
	},
	{
		"lat": 46.235867,
		"lng": -96.599046
	},
	{
		"lat": 46.235931,
		"lng": -96.599032
	},
	{
		"lat": 46.235938,
		"lng": -96.599031
	},
	{
		"lat": 46.236149,
		"lng": -96.598961
	},
	{
		"lat": 46.236486,
		"lng": -96.598778
	},
	{
		"lat": 46.23678,
		"lng": -96.598585
	},
	{
		"lat": 46.236809,
		"lng": -96.598554
	},
	{
		"lat": 46.236878,
		"lng": -96.598523
	},
	{
		"lat": 46.236978,
		"lng": -96.598467
	},
	{
		"lat": 46.23701,
		"lng": -96.598442
	},
	{
		"lat": 46.237212,
		"lng": -96.598324
	},
	{
		"lat": 46.237314,
		"lng": -96.598277
	},
	{
		"lat": 46.237416,
		"lng": -96.598222
	},
	{
		"lat": 46.237623,
		"lng": -96.598137
	},
	{
		"lat": 46.237729,
		"lng": -96.598102
	},
	{
		"lat": 46.237797,
		"lng": -96.59807
	},
	{
		"lat": 46.237972,
		"lng": -96.598009
	},
	{
		"lat": 46.238151,
		"lng": -96.597974
	},
	{
		"lat": 46.238259,
		"lng": -96.597966
	},
	{
		"lat": 46.238551,
		"lng": -96.597982
	},
	{
		"lat": 46.238943,
		"lng": -96.598004
	},
	{
		"lat": 46.239336,
		"lng": -96.598068
	},
	{
		"lat": 46.239504,
		"lng": -96.598088
	},
	{
		"lat": 46.239552,
		"lng": -96.598094
	},
	{
		"lat": 46.239839,
		"lng": -96.598119
	},
	{
		"lat": 46.240234,
		"lng": -96.598166
	},
	{
		"lat": 46.240484,
		"lng": -96.598211
	},
	{
		"lat": 46.240769,
		"lng": -96.59828
	},
	{
		"lat": 46.241122,
		"lng": -96.598379
	},
	{
		"lat": 46.241227,
		"lng": -96.598414
	},
	{
		"lat": 46.241738,
		"lng": -96.59862
	},
	{
		"lat": 46.241817,
		"lng": -96.598652
	},
	{
		"lat": 46.241922,
		"lng": -96.598688
	},
	{
		"lat": 46.242137,
		"lng": -96.598725
	},
	{
		"lat": 46.242209,
		"lng": -96.598733
	},
	{
		"lat": 46.242317,
		"lng": -96.598729
	},
	{
		"lat": 46.242352,
		"lng": -96.598721
	},
	{
		"lat": 46.242422,
		"lng": -96.598693
	},
	{
		"lat": 46.242493,
		"lng": -96.598681
	},
	{
		"lat": 46.242563,
		"lng": -96.598662
	},
	{
		"lat": 46.242598,
		"lng": -96.598646
	},
	{
		"lat": 46.242663,
		"lng": -96.598603
	},
	{
		"lat": 46.242758,
		"lng": -96.598529
	},
	{
		"lat": 46.242846,
		"lng": -96.598439
	},
	{
		"lat": 46.242928,
		"lng": -96.598338
	},
	{
		"lat": 46.243052,
		"lng": -96.598151
	},
	{
		"lat": 46.243168,
		"lng": -96.597954
	},
	{
		"lat": 46.243231,
		"lng": -96.597828
	},
	{
		"lat": 46.243327,
		"lng": -96.597609
	},
	{
		"lat": 46.243527,
		"lng": -96.597061
	},
	{
		"lat": 46.243546,
		"lng": -96.597018
	},
	{
		"lat": 46.243595,
		"lng": -96.59688
	},
	{
		"lat": 46.243677,
		"lng": -96.596594
	},
	{
		"lat": 46.243709,
		"lng": -96.596393
	},
	{
		"lat": 46.243717,
		"lng": -96.596135
	},
	{
		"lat": 46.24376,
		"lng": -96.595993
	},
	{
		"lat": 46.243844,
		"lng": -96.595764
	},
	{
		"lat": 46.243873,
		"lng": -96.59567
	},
	{
		"lat": 46.243985,
		"lng": -96.595406
	},
	{
		"lat": 46.244065,
		"lng": -96.595234
	},
	{
		"lat": 46.244142,
		"lng": -96.595125
	},
	{
		"lat": 46.244302,
		"lng": -96.594916
	},
	{
		"lat": 46.24436,
		"lng": -96.594855
	},
	{
		"lat": 46.244558,
		"lng": -96.594729
	},
	{
		"lat": 46.244725,
		"lng": -96.594633
	},
	{
		"lat": 46.245066,
		"lng": -96.594469
	},
	{
		"lat": 46.245194,
		"lng": -96.594374
	},
	{
		"lat": 46.245224,
		"lng": -96.594346
	},
	{
		"lat": 46.245338,
		"lng": -96.594218
	},
	{
		"lat": 46.245416,
		"lng": -96.594112
	},
	{
		"lat": 46.245464,
		"lng": -96.594035
	},
	{
		"lat": 46.245524,
		"lng": -96.593906
	},
	{
		"lat": 46.24554,
		"lng": -96.593859
	},
	{
		"lat": 46.245583,
		"lng": -96.593683
	},
	{
		"lat": 46.2456,
		"lng": -96.593616
	},
	{
		"lat": 46.245617,
		"lng": -96.593516
	},
	{
		"lat": 46.245635,
		"lng": -96.593363
	},
	{
		"lat": 46.245635,
		"lng": -96.593311
	},
	{
		"lat": 46.245622,
		"lng": -96.593105
	},
	{
		"lat": 46.245589,
		"lng": -96.592904
	},
	{
		"lat": 46.245577,
		"lng": -96.592856
	},
	{
		"lat": 46.245559,
		"lng": -96.592811
	},
	{
		"lat": 46.24553,
		"lng": -96.592716
	},
	{
		"lat": 46.24549,
		"lng": -96.59263
	},
	{
		"lat": 46.245435,
		"lng": -96.592497
	},
	{
		"lat": 46.24533,
		"lng": -96.592287
	},
	{
		"lat": 46.24527,
		"lng": -96.592158
	},
	{
		"lat": 46.245256,
		"lng": -96.59211
	},
	{
		"lat": 46.245178,
		"lng": -96.591937
	},
	{
		"lat": 46.245072,
		"lng": -96.591666
	},
	{
		"lat": 46.245058,
		"lng": -96.591619
	},
	{
		"lat": 46.245039,
		"lng": -96.59149
	},
	{
		"lat": 46.245033,
		"lng": -96.591449
	},
	{
		"lat": 46.245024,
		"lng": -96.591243
	},
	{
		"lat": 46.245028,
		"lng": -96.591139
	},
	{
		"lat": 46.245046,
		"lng": -96.590987
	},
	{
		"lat": 46.245092,
		"lng": -96.590737
	},
	{
		"lat": 46.245125,
		"lng": -96.590589
	},
	{
		"lat": 46.245142,
		"lng": -96.590529
	},
	{
		"lat": 46.245279,
		"lng": -96.590067
	},
	{
		"lat": 46.24536,
		"lng": -96.589835
	},
	{
		"lat": 46.24546,
		"lng": -96.58962
	},
	{
		"lat": 46.245531,
		"lng": -96.589441
	},
	{
		"lat": 46.24557,
		"lng": -96.589354
	},
	{
		"lat": 46.245674,
		"lng": -96.589143
	},
	{
		"lat": 46.245773,
		"lng": -96.588927
	},
	{
		"lat": 46.245882,
		"lng": -96.588659
	},
	{
		"lat": 46.245976,
		"lng": -96.58838
	},
	{
		"lat": 46.246017,
		"lng": -96.588182
	},
	{
		"lat": 46.246098,
		"lng": -96.588079
	},
	{
		"lat": 46.246221,
		"lng": -96.58789
	},
	{
		"lat": 46.246246,
		"lng": -96.587846
	},
	{
		"lat": 46.246267,
		"lng": -96.587811
	},
	{
		"lat": 46.246326,
		"lng": -96.587681
	},
	{
		"lat": 46.246487,
		"lng": -96.587277
	},
	{
		"lat": 46.24658,
		"lng": -96.587055
	},
	{
		"lat": 46.246626,
		"lng": -96.586952
	},
	{
		"lat": 46.246853,
		"lng": -96.586447
	},
	{
		"lat": 46.24688,
		"lng": -96.586383
	},
	{
		"lat": 46.247025,
		"lng": -96.586053
	},
	{
		"lat": 46.247181,
		"lng": -96.585767
	},
	{
		"lat": 46.247321,
		"lng": -96.585531
	},
	{
		"lat": 46.247459,
		"lng": -96.585366
	},
	{
		"lat": 46.2477,
		"lng": -96.585056
	},
	{
		"lat": 46.24781,
		"lng": -96.584923
	},
	{
		"lat": 46.247901,
		"lng": -96.584835
	},
	{
		"lat": 46.24808,
		"lng": -96.584665
	},
	{
		"lat": 46.248237,
		"lng": -96.584539
	},
	{
		"lat": 46.24837,
		"lng": -96.584425
	},
	{
		"lat": 46.248422,
		"lng": -96.58438
	},
	{
		"lat": 46.248675,
		"lng": -96.584188
	},
	{
		"lat": 46.248908,
		"lng": -96.58405
	},
	{
		"lat": 46.249177,
		"lng": -96.583902
	},
	{
		"lat": 46.24952,
		"lng": -96.583749
	},
	{
		"lat": 46.249591,
		"lng": -96.583733
	},
	{
		"lat": 46.249807,
		"lng": -96.583715
	},
	{
		"lat": 46.249842,
		"lng": -96.58372
	},
	{
		"lat": 46.24991,
		"lng": -96.583755
	},
	{
		"lat": 46.250152,
		"lng": -96.583857
	},
	{
		"lat": 46.250184,
		"lng": -96.583879
	},
	{
		"lat": 46.250246,
		"lng": -96.583934
	},
	{
		"lat": 46.250329,
		"lng": -96.584032
	},
	{
		"lat": 46.250354,
		"lng": -96.58407
	},
	{
		"lat": 46.250416,
		"lng": -96.584196
	},
	{
		"lat": 46.250462,
		"lng": -96.584336
	},
	{
		"lat": 46.250484,
		"lng": -96.584435
	},
	{
		"lat": 46.250519,
		"lng": -96.584635
	},
	{
		"lat": 46.250527,
		"lng": -96.584738
	},
	{
		"lat": 46.250514,
		"lng": -96.585202
	},
	{
		"lat": 46.250502,
		"lng": -96.585304
	},
	{
		"lat": 46.250441,
		"lng": -96.585655
	},
	{
		"lat": 46.25041,
		"lng": -96.585784
	},
	{
		"lat": 46.250384,
		"lng": -96.5859
	},
	{
		"lat": 46.250299,
		"lng": -96.586183
	},
	{
		"lat": 46.250156,
		"lng": -96.5866
	},
	{
		"lat": 46.250145,
		"lng": -96.58665
	},
	{
		"lat": 46.250128,
		"lng": -96.586695
	},
	{
		"lat": 46.250086,
		"lng": -96.586778
	},
	{
		"lat": 46.249985,
		"lng": -96.587052
	},
	{
		"lat": 46.249938,
		"lng": -96.587248
	},
	{
		"lat": 46.249882,
		"lng": -96.587438
	},
	{
		"lat": 46.249831,
		"lng": -96.587631
	},
	{
		"lat": 46.249763,
		"lng": -96.58787
	},
	{
		"lat": 46.249726,
		"lng": -96.58807
	},
	{
		"lat": 46.249686,
		"lng": -96.588214
	},
	{
		"lat": 46.249665,
		"lng": -96.588313
	},
	{
		"lat": 46.249605,
		"lng": -96.588525
	},
	{
		"lat": 46.249565,
		"lng": -96.588723
	},
	{
		"lat": 46.249529,
		"lng": -96.588977
	},
	{
		"lat": 46.249511,
		"lng": -96.58913
	},
	{
		"lat": 46.249466,
		"lng": -96.58959
	},
	{
		"lat": 46.24948,
		"lng": -96.589951
	},
	{
		"lat": 46.249513,
		"lng": -96.59031
	},
	{
		"lat": 46.249576,
		"lng": -96.59066
	},
	{
		"lat": 46.24966,
		"lng": -96.591056
	},
	{
		"lat": 46.249741,
		"lng": -96.591343
	},
	{
		"lat": 46.249759,
		"lng": -96.591388
	},
	{
		"lat": 46.249845,
		"lng": -96.591553
	},
	{
		"lat": 46.249863,
		"lng": -96.591598
	},
	{
		"lat": 46.24993,
		"lng": -96.59172
	},
	{
		"lat": 46.250008,
		"lng": -96.591826
	},
	{
		"lat": 46.250338,
		"lng": -96.5923
	},
	{
		"lat": 46.250772,
		"lng": -96.592844
	},
	{
		"lat": 46.250829,
		"lng": -96.592907
	},
	{
		"lat": 46.250922,
		"lng": -96.592985
	},
	{
		"lat": 46.251187,
		"lng": -96.593252
	},
	{
		"lat": 46.251279,
		"lng": -96.593334
	},
	{
		"lat": 46.251404,
		"lng": -96.593436
	},
	{
		"lat": 46.251532,
		"lng": -96.59353
	},
	{
		"lat": 46.25172,
		"lng": -96.593682
	},
	{
		"lat": 46.251818,
		"lng": -96.593746
	},
	{
		"lat": 46.252,
		"lng": -96.593913
	},
	{
		"lat": 46.252141,
		"lng": -96.594074
	},
	{
		"lat": 46.252194,
		"lng": -96.594145
	},
	{
		"lat": 46.252278,
		"lng": -96.594242
	},
	{
		"lat": 46.252742,
		"lng": -96.594891
	},
	{
		"lat": 46.252907,
		"lng": -96.595091
	},
	{
		"lat": 46.253025,
		"lng": -96.595209
	},
	{
		"lat": 46.25312,
		"lng": -96.595284
	},
	{
		"lat": 46.253186,
		"lng": -96.595326
	},
	{
		"lat": 46.253254,
		"lng": -96.595358
	},
	{
		"lat": 46.253398,
		"lng": -96.595375
	},
	{
		"lat": 46.25347,
		"lng": -96.595378
	},
	{
		"lat": 46.253649,
		"lng": -96.595348
	},
	{
		"lat": 46.253718,
		"lng": -96.595324
	},
	{
		"lat": 46.253787,
		"lng": -96.595291
	},
	{
		"lat": 46.253819,
		"lng": -96.595268
	},
	{
		"lat": 46.253848,
		"lng": -96.595238
	},
	{
		"lat": 46.253902,
		"lng": -96.595169
	},
	{
		"lat": 46.253961,
		"lng": -96.595111
	},
	{
		"lat": 46.253988,
		"lng": -96.595076
	},
	{
		"lat": 46.254102,
		"lng": -96.594904
	},
	{
		"lat": 46.254187,
		"lng": -96.594777
	},
	{
		"lat": 46.254281,
		"lng": -96.59462
	},
	{
		"lat": 46.254512,
		"lng": -96.594159
	},
	{
		"lat": 46.254727,
		"lng": -96.593811
	},
	{
		"lat": 46.254967,
		"lng": -96.593497
	},
	{
		"lat": 46.255025,
		"lng": -96.593436
	},
	{
		"lat": 46.255086,
		"lng": -96.593382
	},
	{
		"lat": 46.255244,
		"lng": -96.593257
	},
	{
		"lat": 46.255398,
		"lng": -96.593123
	},
	{
		"lat": 46.255458,
		"lng": -96.593067
	},
	{
		"lat": 46.25562,
		"lng": -96.592956
	},
	{
		"lat": 46.255651,
		"lng": -96.59293
	},
	{
		"lat": 46.255785,
		"lng": -96.592853
	},
	{
		"lat": 46.255991,
		"lng": -96.592763
	},
	{
		"lat": 46.256097,
		"lng": -96.592727
	},
	{
		"lat": 46.256165,
		"lng": -96.592693
	},
	{
		"lat": 46.256235,
		"lng": -96.592671
	},
	{
		"lat": 46.25645,
		"lng": -96.592641
	},
	{
		"lat": 46.256558,
		"lng": -96.592637
	},
	{
		"lat": 46.256737,
		"lng": -96.592658
	},
	{
		"lat": 46.256845,
		"lng": -96.592677
	},
	{
		"lat": 46.256984,
		"lng": -96.592727
	},
	{
		"lat": 46.257073,
		"lng": -96.592776
	},
	{
		"lat": 46.257119,
		"lng": -96.592801
	},
	{
		"lat": 46.257182,
		"lng": -96.592851
	},
	{
		"lat": 46.257247,
		"lng": -96.592885
	},
	{
		"lat": 46.257252,
		"lng": -96.592888
	},
	{
		"lat": 46.257313,
		"lng": -96.592928
	},
	{
		"lat": 46.257342,
		"lng": -96.592958
	},
	{
		"lat": 46.257531,
		"lng": -96.593108
	},
	{
		"lat": 46.25763,
		"lng": -96.59317
	},
	{
		"lat": 46.257724,
		"lng": -96.593244
	},
	{
		"lat": 46.257763,
		"lng": -96.593268
	},
	{
		"lat": 46.257823,
		"lng": -96.593307
	},
	{
		"lat": 46.257917,
		"lng": -96.593382
	},
	{
		"lat": 46.257935,
		"lng": -96.593394
	},
	{
		"lat": 46.258052,
		"lng": -96.593471
	},
	{
		"lat": 46.258113,
		"lng": -96.593512
	},
	{
		"lat": 46.258337,
		"lng": -96.593676
	},
	{
		"lat": 46.258399,
		"lng": -96.593714
	},
	{
		"lat": 46.258403,
		"lng": -96.593716
	},
	{
		"lat": 46.258495,
		"lng": -96.593798
	},
	{
		"lat": 46.258506,
		"lng": -96.593807
	},
	{
		"lat": 46.258581,
		"lng": -96.593868
	},
	{
		"lat": 46.25862,
		"lng": -96.5939
	},
	{
		"lat": 46.258649,
		"lng": -96.59393
	},
	{
		"lat": 46.258806,
		"lng": -96.594055
	},
	{
		"lat": 46.258838,
		"lng": -96.594081
	},
	{
		"lat": 46.258885,
		"lng": -96.594114
	},
	{
		"lat": 46.258935,
		"lng": -96.594149
	},
	{
		"lat": 46.258987,
		"lng": -96.594201
	},
	{
		"lat": 46.258994,
		"lng": -96.594208
	},
	{
		"lat": 46.259149,
		"lng": -96.594339
	},
	{
		"lat": 46.259179,
		"lng": -96.594369
	},
	{
		"lat": 46.259276,
		"lng": -96.594485
	},
	{
		"lat": 46.259316,
		"lng": -96.594534
	},
	{
		"lat": 46.259367,
		"lng": -96.594586
	},
	{
		"lat": 46.259375,
		"lng": -96.594594
	},
	{
		"lat": 46.259412,
		"lng": -96.594645
	},
	{
		"lat": 46.259531,
		"lng": -96.594808
	},
	{
		"lat": 46.259544,
		"lng": -96.594827
	},
	{
		"lat": 46.259587,
		"lng": -96.59489
	},
	{
		"lat": 46.259909,
		"lng": -96.595362
	},
	{
		"lat": 46.259987,
		"lng": -96.59547
	},
	{
		"lat": 46.26031,
		"lng": -96.595957
	},
	{
		"lat": 46.260525,
		"lng": -96.596305
	},
	{
		"lat": 46.26072,
		"lng": -96.596678
	},
	{
		"lat": 46.260759,
		"lng": -96.596764
	},
	{
		"lat": 46.260858,
		"lng": -96.59704
	},
	{
		"lat": 46.260949,
		"lng": -96.59732
	},
	{
		"lat": 46.260953,
		"lng": -96.597339
	},
	{
		"lat": 46.260996,
		"lng": -96.597516
	},
	{
		"lat": 46.261031,
		"lng": -96.597716
	},
	{
		"lat": 46.261052,
		"lng": -96.597815
	},
	{
		"lat": 46.261091,
		"lng": -96.597959
	},
	{
		"lat": 46.261098,
		"lng": -96.598029
	},
	{
		"lat": 46.261099,
		"lng": -96.598041
	},
	{
		"lat": 46.261103,
		"lng": -96.598078
	},
	{
		"lat": 46.261105,
		"lng": -96.598091
	},
	{
		"lat": 46.261112,
		"lng": -96.598164
	},
	{
		"lat": 46.261122,
		"lng": -96.598362
	},
	{
		"lat": 46.261125,
		"lng": -96.598421
	},
	{
		"lat": 46.261172,
		"lng": -96.599177
	},
	{
		"lat": 46.261189,
		"lng": -96.599449
	},
	{
		"lat": 46.261196,
		"lng": -96.599554
	},
	{
		"lat": 46.261203,
		"lng": -96.599604
	},
	{
		"lat": 46.261224,
		"lng": -96.599702
	},
	{
		"lat": 46.261258,
		"lng": -96.59985
	},
	{
		"lat": 46.261272,
		"lng": -96.599898
	},
	{
		"lat": 46.261291,
		"lng": -96.599942
	},
	{
		"lat": 46.261338,
		"lng": -96.60002
	},
	{
		"lat": 46.261491,
		"lng": -96.60024
	},
	{
		"lat": 46.261579,
		"lng": -96.60033
	},
	{
		"lat": 46.261606,
		"lng": -96.600351
	},
	{
		"lat": 46.26161,
		"lng": -96.600354
	},
	{
		"lat": 46.261645,
		"lng": -96.600371
	},
	{
		"lat": 46.26175,
		"lng": -96.600402
	},
	{
		"lat": 46.261822,
		"lng": -96.600414
	},
	{
		"lat": 46.261852,
		"lng": -96.600415
	},
	{
		"lat": 46.261858,
		"lng": -96.600415
	},
	{
		"lat": 46.261916,
		"lng": -96.600408
	},
	{
		"lat": 46.262037,
		"lng": -96.600394
	},
	{
		"lat": 46.262108,
		"lng": -96.600378
	},
	{
		"lat": 46.262109,
		"lng": -96.600377
	},
	{
		"lat": 46.26217,
		"lng": -96.600355
	},
	{
		"lat": 46.262178,
		"lng": -96.600352
	},
	{
		"lat": 46.262211,
		"lng": -96.600329
	},
	{
		"lat": 46.262282,
		"lng": -96.600263
	},
	{
		"lat": 46.262362,
		"lng": -96.600189
	},
	{
		"lat": 46.262394,
		"lng": -96.600166
	},
	{
		"lat": 46.262505,
		"lng": -96.600034
	},
	{
		"lat": 46.262596,
		"lng": -96.599961
	},
	{
		"lat": 46.262599,
		"lng": -96.599959
	},
	{
		"lat": 46.262719,
		"lng": -96.599883
	},
	{
		"lat": 46.262746,
		"lng": -96.599865
	},
	{
		"lat": 46.262764,
		"lng": -96.599855
	},
	{
		"lat": 46.262795,
		"lng": -96.59983
	},
	{
		"lat": 46.262819,
		"lng": -96.599802
	},
	{
		"lat": 46.262841,
		"lng": -96.599779
	},
	{
		"lat": 46.262909,
		"lng": -96.599702
	},
	{
		"lat": 46.26297,
		"lng": -96.599648
	},
	{
		"lat": 46.263106,
		"lng": -96.59948
	},
	{
		"lat": 46.26326,
		"lng": -96.599348
	},
	{
		"lat": 46.263363,
		"lng": -96.5993
	},
	{
		"lat": 46.263463,
		"lng": -96.599252
	},
	{
		"lat": 46.263693,
		"lng": -96.59913
	},
	{
		"lat": 46.263775,
		"lng": -96.599085
	},
	{
		"lat": 46.263862,
		"lng": -96.599036
	},
	{
		"lat": 46.264001,
		"lng": -96.59897
	},
	{
		"lat": 46.264105,
		"lng": -96.598911
	},
	{
		"lat": 46.264241,
		"lng": -96.598916
	},
	{
		"lat": 46.264296,
		"lng": -96.598917
	},
	{
		"lat": 46.264377,
		"lng": -96.59892
	},
	{
		"lat": 46.264544,
		"lng": -96.598926
	},
	{
		"lat": 46.26471,
		"lng": -96.598931
	},
	{
		"lat": 46.264862,
		"lng": -96.598878
	},
	{
		"lat": 46.264877,
		"lng": -96.598874
	},
	{
		"lat": 46.264979,
		"lng": -96.598839
	},
	{
		"lat": 46.265044,
		"lng": -96.598817
	},
	{
		"lat": 46.265283,
		"lng": -96.598736
	},
	{
		"lat": 46.265622,
		"lng": -96.598494
	},
	{
		"lat": 46.267259,
		"lng": -96.59733
	},
	{
		"lat": 46.267359,
		"lng": -96.59726
	},
	{
		"lat": 46.267784,
		"lng": -96.596916
	},
	{
		"lat": 46.267805,
		"lng": -96.596899
	},
	{
		"lat": 46.267831,
		"lng": -96.596893
	},
	{
		"lat": 46.26799,
		"lng": -96.59686
	},
	{
		"lat": 46.268043,
		"lng": -96.59685
	},
	{
		"lat": 46.268142,
		"lng": -96.59683
	},
	{
		"lat": 46.268532,
		"lng": -96.596957
	},
	{
		"lat": 46.268599,
		"lng": -96.596979
	},
	{
		"lat": 46.269144,
		"lng": -96.597221
	},
	{
		"lat": 46.269612,
		"lng": -96.597499
	},
	{
		"lat": 46.269922,
		"lng": -96.597587
	},
	{
		"lat": 46.270006,
		"lng": -96.597612
	},
	{
		"lat": 46.270394,
		"lng": -96.597441
	},
	{
		"lat": 46.270413,
		"lng": -96.597433
	},
	{
		"lat": 46.27072,
		"lng": -96.597137
	},
	{
		"lat": 46.270732,
		"lng": -96.597126
	},
	{
		"lat": 46.271307,
		"lng": -96.596184
	},
	{
		"lat": 46.271487,
		"lng": -96.596056
	},
	{
		"lat": 46.271511,
		"lng": -96.59604
	},
	{
		"lat": 46.271714,
		"lng": -96.596096
	},
	{
		"lat": 46.271871,
		"lng": -96.596233
	},
	{
		"lat": 46.271904,
		"lng": -96.596262
	},
	{
		"lat": 46.272256,
		"lng": -96.596921
	},
	{
		"lat": 46.272496,
		"lng": -96.597233
	},
	{
		"lat": 46.272731,
		"lng": -96.597316
	},
	{
		"lat": 46.272813,
		"lng": -96.597346
	},
	{
		"lat": 46.273081,
		"lng": -96.597202
	},
	{
		"lat": 46.273375,
		"lng": -96.596603
	},
	{
		"lat": 46.273454,
		"lng": -96.596002
	},
	{
		"lat": 46.273507,
		"lng": -96.595474
	},
	{
		"lat": 46.27375,
		"lng": -96.595148
	},
	{
		"lat": 46.274284,
		"lng": -96.595044
	},
	{
		"lat": 46.27469,
		"lng": -96.595047
	},
	{
		"lat": 46.275417,
		"lng": -96.595233
	},
	{
		"lat": 46.275426,
		"lng": -96.595236
	},
	{
		"lat": 46.276568,
		"lng": -96.595483
	},
	{
		"lat": 46.276788,
		"lng": -96.595615
	},
	{
		"lat": 46.276909,
		"lng": -96.595688
	},
	{
		"lat": 46.277214,
		"lng": -96.595872
	},
	{
		"lat": 46.277271,
		"lng": -96.595909
	},
	{
		"lat": 46.277391,
		"lng": -96.595986
	},
	{
		"lat": 46.277502,
		"lng": -96.596057
	},
	{
		"lat": 46.277835,
		"lng": -96.59627
	},
	{
		"lat": 46.277935,
		"lng": -96.596334
	},
	{
		"lat": 46.277943,
		"lng": -96.596345
	},
	{
		"lat": 46.278012,
		"lng": -96.596437
	},
	{
		"lat": 46.278082,
		"lng": -96.596528
	},
	{
		"lat": 46.278478,
		"lng": -96.59705
	},
	{
		"lat": 46.278763,
		"lng": -96.597469
	},
	{
		"lat": 46.279601,
		"lng": -96.598701
	},
	{
		"lat": 46.280105,
		"lng": -96.5998
	},
	{
		"lat": 46.28037,
		"lng": -96.600185
	},
	{
		"lat": 46.280737,
		"lng": -96.600371
	},
	{
		"lat": 46.281131,
		"lng": -96.60032
	},
	{
		"lat": 46.281315,
		"lng": -96.600242
	},
	{
		"lat": 46.282271,
		"lng": -96.59984
	},
	{
		"lat": 46.282299,
		"lng": -96.599807
	},
	{
		"lat": 46.282531,
		"lng": -96.599598
	},
	{
		"lat": 46.282543,
		"lng": -96.599587
	},
	{
		"lat": 46.282657,
		"lng": -96.59946
	},
	{
		"lat": 46.282809,
		"lng": -96.599322
	},
	{
		"lat": 46.282925,
		"lng": -96.599199
	},
	{
		"lat": 46.283008,
		"lng": -96.599101
	},
	{
		"lat": 46.283034,
		"lng": -96.599064
	},
	{
		"lat": 46.283148,
		"lng": -96.598939
	},
	{
		"lat": 46.283372,
		"lng": -96.598632
	},
	{
		"lat": 46.283409,
		"lng": -96.598583
	},
	{
		"lat": 46.283531,
		"lng": -96.598393
	},
	{
		"lat": 46.283835,
		"lng": -96.59795
	},
	{
		"lat": 46.283958,
		"lng": -96.597762
	},
	{
		"lat": 46.284293,
		"lng": -96.597222
	},
	{
		"lat": 46.284312,
		"lng": -96.597178
	},
	{
		"lat": 46.284358,
		"lng": -96.597098
	},
	{
		"lat": 46.284529,
		"lng": -96.596765
	},
	{
		"lat": 46.284669,
		"lng": -96.596465
	},
	{
		"lat": 46.284835,
		"lng": -96.596066
	},
	{
		"lat": 46.284967,
		"lng": -96.59582
	},
	{
		"lat": 46.285027,
		"lng": -96.59569
	},
	{
		"lat": 46.285221,
		"lng": -96.595317
	},
	{
		"lat": 46.285246,
		"lng": -96.595275
	},
	{
		"lat": 46.28534,
		"lng": -96.595123
	},
	{
		"lat": 46.285446,
		"lng": -96.594984
	},
	{
		"lat": 46.285475,
		"lng": -96.594952
	},
	{
		"lat": 46.285525,
		"lng": -96.594909
	},
	{
		"lat": 46.285583,
		"lng": -96.594848
	},
	{
		"lat": 46.285646,
		"lng": -96.594797
	},
	{
		"lat": 46.285714,
		"lng": -96.594764
	},
	{
		"lat": 46.285749,
		"lng": -96.594753
	},
	{
		"lat": 46.285857,
		"lng": -96.594748
	},
	{
		"lat": 46.285965,
		"lng": -96.594755
	},
	{
		"lat": 46.286179,
		"lng": -96.594798
	},
	{
		"lat": 46.286248,
		"lng": -96.59483
	},
	{
		"lat": 46.286275,
		"lng": -96.594849
	},
	{
		"lat": 46.28628,
		"lng": -96.594853
	},
	{
		"lat": 46.286358,
		"lng": -96.594925
	},
	{
		"lat": 46.286401,
		"lng": -96.594964
	},
	{
		"lat": 46.286428,
		"lng": -96.594999
	},
	{
		"lat": 46.286476,
		"lng": -96.595076
	},
	{
		"lat": 46.286537,
		"lng": -96.595204
	},
	{
		"lat": 46.286539,
		"lng": -96.59521
	},
	{
		"lat": 46.286554,
		"lng": -96.595249
	},
	{
		"lat": 46.286571,
		"lng": -96.595319
	},
	{
		"lat": 46.286601,
		"lng": -96.595445
	},
	{
		"lat": 46.286625,
		"lng": -96.595648
	},
	{
		"lat": 46.286627,
		"lng": -96.595772
	},
	{
		"lat": 46.28663,
		"lng": -96.595906
	},
	{
		"lat": 46.286621,
		"lng": -96.596061
	},
	{
		"lat": 46.286596,
		"lng": -96.596288
	},
	{
		"lat": 46.286565,
		"lng": -96.596571
	},
	{
		"lat": 46.286521,
		"lng": -96.596768
	},
	{
		"lat": 46.286494,
		"lng": -96.596864
	},
	{
		"lat": 46.286432,
		"lng": -96.59705
	},
	{
		"lat": 46.286337,
		"lng": -96.597385
	},
	{
		"lat": 46.28629,
		"lng": -96.597635
	},
	{
		"lat": 46.286144,
		"lng": -96.598273
	},
	{
		"lat": 46.286088,
		"lng": -96.598463
	},
	{
		"lat": 46.286069,
		"lng": -96.598563
	},
	{
		"lat": 46.286056,
		"lng": -96.598611
	},
	{
		"lat": 46.286022,
		"lng": -96.598703
	},
	{
		"lat": 46.285966,
		"lng": -96.598893
	},
	{
		"lat": 46.28594,
		"lng": -96.599044
	},
	{
		"lat": 46.28592,
		"lng": -96.599132
	},
	{
		"lat": 46.285908,
		"lng": -96.599192
	},
	{
		"lat": 46.285865,
		"lng": -96.599496
	},
	{
		"lat": 46.285838,
		"lng": -96.599804
	},
	{
		"lat": 46.285831,
		"lng": -96.600103
	},
	{
		"lat": 46.285829,
		"lng": -96.600157
	},
	{
		"lat": 46.285825,
		"lng": -96.60032
	},
	{
		"lat": 46.285825,
		"lng": -96.600375
	},
	{
		"lat": 46.285824,
		"lng": -96.600424
	},
	{
		"lat": 46.285855,
		"lng": -96.601043
	},
	{
		"lat": 46.285885,
		"lng": -96.60135
	},
	{
		"lat": 46.285934,
		"lng": -96.601599
	},
	{
		"lat": 46.285934,
		"lng": -96.601601
	},
	{
		"lat": 46.28595,
		"lng": -96.601646
	},
	{
		"lat": 46.286019,
		"lng": -96.601765
	},
	{
		"lat": 46.286083,
		"lng": -96.601854
	},
	{
		"lat": 46.2862,
		"lng": -96.602017
	},
	{
		"lat": 46.286257,
		"lng": -96.602079
	},
	{
		"lat": 46.286388,
		"lng": -96.602165
	},
	{
		"lat": 46.286457,
		"lng": -96.602196
	},
	{
		"lat": 46.286565,
		"lng": -96.602209
	},
	{
		"lat": 46.286709,
		"lng": -96.602199
	},
	{
		"lat": 46.286848,
		"lng": -96.602147
	},
	{
		"lat": 46.286946,
		"lng": -96.602083
	},
	{
		"lat": 46.287061,
		"lng": -96.601959
	},
	{
		"lat": 46.287116,
		"lng": -96.601892
	},
	{
		"lat": 46.287317,
		"lng": -96.601597
	},
	{
		"lat": 46.287338,
		"lng": -96.601555
	},
	{
		"lat": 46.287432,
		"lng": -96.601275
	},
	{
		"lat": 46.287498,
		"lng": -96.601036
	},
	{
		"lat": 46.287508,
		"lng": -96.600987
	},
	{
		"lat": 46.287534,
		"lng": -96.600783
	},
	{
		"lat": 46.287561,
		"lng": -96.600322
	},
	{
		"lat": 46.287562,
		"lng": -96.600168
	},
	{
		"lat": 46.28755,
		"lng": -96.599873
	},
	{
		"lat": 46.287548,
		"lng": -96.599807
	},
	{
		"lat": 46.287552,
		"lng": -96.599448
	},
	{
		"lat": 46.287548,
		"lng": -96.599035
	},
	{
		"lat": 46.28755,
		"lng": -96.59864
	},
	{
		"lat": 46.28755,
		"lng": -96.598572
	},
	{
		"lat": 46.287557,
		"lng": -96.598263
	},
	{
		"lat": 46.28756,
		"lng": -96.598169
	},
	{
		"lat": 46.287587,
		"lng": -96.597543
	},
	{
		"lat": 46.287625,
		"lng": -96.597238
	},
	{
		"lat": 46.287662,
		"lng": -96.597091
	},
	{
		"lat": 46.287718,
		"lng": -96.596902
	},
	{
		"lat": 46.28775,
		"lng": -96.596809
	},
	{
		"lat": 46.287762,
		"lng": -96.596782
	},
	{
		"lat": 46.28781,
		"lng": -96.59668
	},
	{
		"lat": 46.287903,
		"lng": -96.596522
	},
	{
		"lat": 46.288001,
		"lng": -96.596379
	},
	{
		"lat": 46.288065,
		"lng": -96.596334
	},
	{
		"lat": 46.28819,
		"lng": -96.59623
	},
	{
		"lat": 46.288247,
		"lng": -96.596171
	},
	{
		"lat": 46.288308,
		"lng": -96.596111
	},
	{
		"lat": 46.288399,
		"lng": -96.596029
	},
	{
		"lat": 46.288433,
		"lng": -96.596012
	},
	{
		"lat": 46.288597,
		"lng": -96.595908
	},
	{
		"lat": 46.288699,
		"lng": -96.595861
	},
	{
		"lat": 46.28877,
		"lng": -96.595849
	},
	{
		"lat": 46.288842,
		"lng": -96.595845
	},
	{
		"lat": 46.288985,
		"lng": -96.595824
	},
	{
		"lat": 46.289111,
		"lng": -96.595812
	},
	{
		"lat": 46.289128,
		"lng": -96.595811
	},
	{
		"lat": 46.289236,
		"lng": -96.595807
	},
	{
		"lat": 46.289272,
		"lng": -96.595811
	},
	{
		"lat": 46.289343,
		"lng": -96.595831
	},
	{
		"lat": 46.289409,
		"lng": -96.595872
	},
	{
		"lat": 46.289419,
		"lng": -96.595876
	},
	{
		"lat": 46.289513,
		"lng": -96.59591
	},
	{
		"lat": 46.28962,
		"lng": -96.595939
	},
	{
		"lat": 46.289799,
		"lng": -96.595959
	},
	{
		"lat": 46.289812,
		"lng": -96.595961
	},
	{
		"lat": 46.289977,
		"lng": -96.595992
	},
	{
		"lat": 46.290052,
		"lng": -96.596003
	},
	{
		"lat": 46.290227,
		"lng": -96.596026
	},
	{
		"lat": 46.290583,
		"lng": -96.596094
	},
	{
		"lat": 46.290686,
		"lng": -96.596134
	},
	{
		"lat": 46.290955,
		"lng": -96.596271
	},
	{
		"lat": 46.291194,
		"lng": -96.596379
	},
	{
		"lat": 46.291397,
		"lng": -96.596485
	},
	{
		"lat": 46.291462,
		"lng": -96.596527
	},
	{
		"lat": 46.291511,
		"lng": -96.596603
	},
	{
		"lat": 46.291579,
		"lng": -96.596723
	},
	{
		"lat": 46.291643,
		"lng": -96.596848
	},
	{
		"lat": 46.2917,
		"lng": -96.596978
	},
	{
		"lat": 46.291782,
		"lng": -96.597147
	},
	{
		"lat": 46.291829,
		"lng": -96.597285
	},
	{
		"lat": 46.291856,
		"lng": -96.597381
	},
	{
		"lat": 46.291866,
		"lng": -96.59743
	},
	{
		"lat": 46.291899,
		"lng": -96.597522
	},
	{
		"lat": 46.291907,
		"lng": -96.597573
	},
	{
		"lat": 46.291925,
		"lng": -96.597618
	},
	{
		"lat": 46.291951,
		"lng": -96.597714
	},
	{
		"lat": 46.291973,
		"lng": -96.597754
	},
	{
		"lat": 46.292017,
		"lng": -96.597895
	},
	{
		"lat": 46.292055,
		"lng": -96.597983
	},
	{
		"lat": 46.292132,
		"lng": -96.598273
	},
	{
		"lat": 46.292167,
		"lng": -96.598472
	},
	{
		"lat": 46.292183,
		"lng": -96.598519
	},
	{
		"lat": 46.292206,
		"lng": -96.59867
	},
	{
		"lat": 46.292253,
		"lng": -96.598919
	},
	{
		"lat": 46.292274,
		"lng": -96.599071
	},
	{
		"lat": 46.292296,
		"lng": -96.599169
	},
	{
		"lat": 46.292322,
		"lng": -96.599424
	},
	{
		"lat": 46.292334,
		"lng": -96.599579
	},
	{
		"lat": 46.292351,
		"lng": -96.599887
	},
	{
		"lat": 46.292353,
		"lng": -96.599961
	},
	{
		"lat": 46.29237,
		"lng": -96.600608
	},
	{
		"lat": 46.292397,
		"lng": -96.60107
	},
	{
		"lat": 46.292419,
		"lng": -96.601378
	},
	{
		"lat": 46.29247,
		"lng": -96.601785
	},
	{
		"lat": 46.292498,
		"lng": -96.60204
	},
	{
		"lat": 46.292509,
		"lng": -96.602089
	},
	{
		"lat": 46.292541,
		"lng": -96.602344
	},
	{
		"lat": 46.292559,
		"lng": -96.602389
	},
	{
		"lat": 46.292573,
		"lng": -96.602437
	},
	{
		"lat": 46.292581,
		"lng": -96.602487
	},
	{
		"lat": 46.292615,
		"lng": -96.602634
	},
	{
		"lat": 46.292709,
		"lng": -96.602927
	},
	{
		"lat": 46.292735,
		"lng": -96.603023
	},
	{
		"lat": 46.29274,
		"lng": -96.603048
	},
	{
		"lat": 46.292755,
		"lng": -96.603122
	},
	{
		"lat": 46.292797,
		"lng": -96.603265
	},
	{
		"lat": 46.292833,
		"lng": -96.603465
	},
	{
		"lat": 46.292856,
		"lng": -96.603616
	},
	{
		"lat": 46.292868,
		"lng": -96.60377
	},
	{
		"lat": 46.292885,
		"lng": -96.60387
	},
	{
		"lat": 46.292908,
		"lng": -96.604126
	},
	{
		"lat": 46.292935,
		"lng": -96.604536
	},
	{
		"lat": 46.292962,
		"lng": -96.604686
	},
	{
		"lat": 46.292981,
		"lng": -96.604839
	},
	{
		"lat": 46.293007,
		"lng": -96.604989
	},
	{
		"lat": 46.293039,
		"lng": -96.605082
	},
	{
		"lat": 46.29305,
		"lng": -96.605131
	},
	{
		"lat": 46.293118,
		"lng": -96.605313
	},
	{
		"lat": 46.293191,
		"lng": -96.605427
	},
	{
		"lat": 46.293249,
		"lng": -96.605486
	},
	{
		"lat": 46.293313,
		"lng": -96.605535
	},
	{
		"lat": 46.293371,
		"lng": -96.605596
	},
	{
		"lat": 46.293474,
		"lng": -96.605642
	},
	{
		"lat": 46.293615,
		"lng": -96.605681
	},
	{
		"lat": 46.293723,
		"lng": -96.605694
	},
	{
		"lat": 46.293831,
		"lng": -96.605683
	},
	{
		"lat": 46.294045,
		"lng": -96.605647
	},
	{
		"lat": 46.29408,
		"lng": -96.605635
	},
	{
		"lat": 46.294147,
		"lng": -96.605598
	},
	{
		"lat": 46.294176,
		"lng": -96.605568
	},
	{
		"lat": 46.294279,
		"lng": -96.605519
	},
	{
		"lat": 46.294341,
		"lng": -96.605467
	},
	{
		"lat": 46.294438,
		"lng": -96.605399
	},
	{
		"lat": 46.294521,
		"lng": -96.605301
	},
	{
		"lat": 46.29461,
		"lng": -96.605213
	},
	{
		"lat": 46.294663,
		"lng": -96.605143
	},
	{
		"lat": 46.294838,
		"lng": -96.604883
	},
	{
		"lat": 46.295023,
		"lng": -96.604567
	},
	{
		"lat": 46.295063,
		"lng": -96.604482
	},
	{
		"lat": 46.295216,
		"lng": -96.604017
	},
	{
		"lat": 46.295255,
		"lng": -96.603873
	},
	{
		"lat": 46.29535,
		"lng": -96.603595
	},
	{
		"lat": 46.295387,
		"lng": -96.60345
	},
	{
		"lat": 46.295455,
		"lng": -96.603212
	},
	{
		"lat": 46.295516,
		"lng": -96.603025
	},
	{
		"lat": 46.29555,
		"lng": -96.602934
	},
	{
		"lat": 46.29559,
		"lng": -96.60279
	},
	{
		"lat": 46.295651,
		"lng": -96.602603
	},
	{
		"lat": 46.295689,
		"lng": -96.602458
	},
	{
		"lat": 46.295724,
		"lng": -96.602367
	},
	{
		"lat": 46.295785,
		"lng": -96.60218
	},
	{
		"lat": 46.295987,
		"lng": -96.601406
	},
	{
		"lat": 46.296058,
		"lng": -96.601169
	},
	{
		"lat": 46.296093,
		"lng": -96.601079
	},
	{
		"lat": 46.296153,
		"lng": -96.60089
	},
	{
		"lat": 46.296191,
		"lng": -96.600745
	},
	{
		"lat": 46.296233,
		"lng": -96.600548
	},
	{
		"lat": 46.296253,
		"lng": -96.600395
	},
	{
		"lat": 46.296266,
		"lng": -96.600347
	},
	{
		"lat": 46.296281,
		"lng": -96.600248
	},
	{
		"lat": 46.29629,
		"lng": -96.600196
	},
	{
		"lat": 46.296325,
		"lng": -96.600049
	},
	{
		"lat": 46.296354,
		"lng": -96.599955
	},
	{
		"lat": 46.29638,
		"lng": -96.599804
	},
	{
		"lat": 46.296405,
		"lng": -96.599707
	},
	{
		"lat": 46.296437,
		"lng": -96.599614
	},
	{
		"lat": 46.296493,
		"lng": -96.599368
	},
	{
		"lat": 46.296535,
		"lng": -96.599117
	},
	{
		"lat": 46.296559,
		"lng": -96.599019
	},
	{
		"lat": 46.296601,
		"lng": -96.598876
	},
	{
		"lat": 46.296623,
		"lng": -96.598725
	},
	{
		"lat": 46.296663,
		"lng": -96.59858
	},
	{
		"lat": 46.296708,
		"lng": -96.59844
	},
	{
		"lat": 46.296734,
		"lng": -96.598344
	},
	{
		"lat": 46.296782,
		"lng": -96.598205
	},
	{
		"lat": 46.296862,
		"lng": -96.598033
	},
	{
		"lat": 46.296932,
		"lng": -96.597915
	},
	{
		"lat": 46.297005,
		"lng": -96.597802
	},
	{
		"lat": 46.297223,
		"lng": -96.597532
	},
	{
		"lat": 46.29728,
		"lng": -96.59747
	},
	{
		"lat": 46.297377,
		"lng": -96.59739
	},
	{
		"lat": 46.297416,
		"lng": -96.597377
	},
	{
		"lat": 46.297587,
		"lng": -96.597298
	},
	{
		"lat": 46.297728,
		"lng": -96.597262
	},
	{
		"lat": 46.297872,
		"lng": -96.597251
	},
	{
		"lat": 46.298015,
		"lng": -96.597248
	},
	{
		"lat": 46.298195,
		"lng": -96.597267
	},
	{
		"lat": 46.298337,
		"lng": -96.597301
	},
	{
		"lat": 46.298477,
		"lng": -96.59735
	},
	{
		"lat": 46.298536,
		"lng": -96.597377
	},
	{
		"lat": 46.298682,
		"lng": -96.597445
	},
	{
		"lat": 46.298745,
		"lng": -96.597494
	},
	{
		"lat": 46.298763,
		"lng": -96.597513
	},
	{
		"lat": 46.29883,
		"lng": -96.597533
	},
	{
		"lat": 46.29924,
		"lng": -96.598028
	},
	{
		"lat": 46.299714,
		"lng": -96.598803
	},
	{
		"lat": 46.300155,
		"lng": -96.599445
	},
	{
		"lat": 46.300369,
		"lng": -96.600132
	},
	{
		"lat": 46.300451,
		"lng": -96.600341
	},
	{
		"lat": 46.30069,
		"lng": -96.60095
	},
	{
		"lat": 46.300702,
		"lng": -96.601042
	},
	{
		"lat": 46.300702,
		"lng": -96.601159
	},
	{
		"lat": 46.300698,
		"lng": -96.601499
	},
	{
		"lat": 46.300724,
		"lng": -96.601565
	},
	{
		"lat": 46.300764,
		"lng": -96.601651
	},
	{
		"lat": 46.30083,
		"lng": -96.601834
	},
	{
		"lat": 46.300914,
		"lng": -96.602002
	},
	{
		"lat": 46.300981,
		"lng": -96.602184
	},
	{
		"lat": 46.301025,
		"lng": -96.602266
	},
	{
		"lat": 46.301073,
		"lng": -96.602344
	},
	{
		"lat": 46.301175,
		"lng": -96.60249
	},
	{
		"lat": 46.301288,
		"lng": -96.602618
	},
	{
		"lat": 46.301413,
		"lng": -96.602721
	},
	{
		"lat": 46.301471,
		"lng": -96.602781
	},
	{
		"lat": 46.301624,
		"lng": -96.602916
	},
	{
		"lat": 46.301683,
		"lng": -96.602975
	},
	{
		"lat": 46.301792,
		"lng": -96.603109
	},
	{
		"lat": 46.301966,
		"lng": -96.603293
	},
	{
		"lat": 46.302087,
		"lng": -96.603405
	},
	{
		"lat": 46.302181,
		"lng": -96.603482
	},
	{
		"lat": 46.302203,
		"lng": -96.603497
	},
	{
		"lat": 46.302246,
		"lng": -96.603527
	},
	{
		"lat": 46.302386,
		"lng": -96.603575
	},
	{
		"lat": 46.30253,
		"lng": -96.603586
	},
	{
		"lat": 46.302672,
		"lng": -96.603563
	},
	{
		"lat": 46.302742,
		"lng": -96.603538
	},
	{
		"lat": 46.302776,
		"lng": -96.60352
	},
	{
		"lat": 46.302873,
		"lng": -96.603453
	},
	{
		"lat": 46.303023,
		"lng": -96.603313
	},
	{
		"lat": 46.303135,
		"lng": -96.603183
	},
	{
		"lat": 46.303244,
		"lng": -96.603047
	},
	{
		"lat": 46.303387,
		"lng": -96.602816
	},
	{
		"lat": 46.303436,
		"lng": -96.602678
	},
	{
		"lat": 46.303456,
		"lng": -96.602634
	},
	{
		"lat": 46.303548,
		"lng": -96.602475
	},
	{
		"lat": 46.303634,
		"lng": -96.60231
	},
	{
		"lat": 46.303715,
		"lng": -96.602138
	},
	{
		"lat": 46.303845,
		"lng": -96.601829
	},
	{
		"lat": 46.303875,
		"lng": -96.601734
	},
	{
		"lat": 46.303966,
		"lng": -96.601512
	},
	{
		"lat": 46.30401,
		"lng": -96.601429
	},
	{
		"lat": 46.304059,
		"lng": -96.601354
	},
	{
		"lat": 46.304368,
		"lng": -96.60092
	},
	{
		"lat": 46.304564,
		"lng": -96.600692
	},
	{
		"lat": 46.30467,
		"lng": -96.600575
	},
	{
		"lat": 46.304791,
		"lng": -96.600464
	},
	{
		"lat": 46.304823,
		"lng": -96.60044
	},
	{
		"lat": 46.304924,
		"lng": -96.600385
	},
	{
		"lat": 46.305089,
		"lng": -96.600284
	},
	{
		"lat": 46.305293,
		"lng": -96.600181
	},
	{
		"lat": 46.305397,
		"lng": -96.600139
	},
	{
		"lat": 46.305712,
		"lng": -96.600038
	},
	{
		"lat": 46.305891,
		"lng": -96.6
	},
	{
		"lat": 46.306105,
		"lng": -96.599971
	},
	{
		"lat": 46.306285,
		"lng": -96.599957
	},
	{
		"lat": 46.306665,
		"lng": -96.599986
	},
	{
		"lat": 46.307045,
		"lng": -96.600016
	},
	{
		"lat": 46.307396,
		"lng": -96.600044
	},
	{
		"lat": 46.307971,
		"lng": -96.600279
	},
	{
		"lat": 46.308039,
		"lng": -96.600307
	},
	{
		"lat": 46.308838,
		"lng": -96.600275
	},
	{
		"lat": 46.308873,
		"lng": -96.600255
	},
	{
		"lat": 46.309066,
		"lng": -96.600143
	},
	{
		"lat": 46.309113,
		"lng": -96.600076
	},
	{
		"lat": 46.309265,
		"lng": -96.599967
	},
	{
		"lat": 46.309383,
		"lng": -96.599826
	},
	{
		"lat": 46.309562,
		"lng": -96.599572
	},
	{
		"lat": 46.309719,
		"lng": -96.599358
	},
	{
		"lat": 46.309833,
		"lng": -96.599235
	},
	{
		"lat": 46.309972,
		"lng": -96.59907
	},
	{
		"lat": 46.310016,
		"lng": -96.59905
	},
	{
		"lat": 46.31024,
		"lng": -96.598886
	},
	{
		"lat": 46.310374,
		"lng": -96.598811
	},
	{
		"lat": 46.310612,
		"lng": -96.598695
	},
	{
		"lat": 46.310781,
		"lng": -96.598604
	},
	{
		"lat": 46.310846,
		"lng": -96.598561
	},
	{
		"lat": 46.311017,
		"lng": -96.598483
	},
	{
		"lat": 46.311226,
		"lng": -96.598405
	},
	{
		"lat": 46.311439,
		"lng": -96.598357
	},
	{
		"lat": 46.311461,
		"lng": -96.59835
	},
	{
		"lat": 46.311544,
		"lng": -96.598324
	},
	{
		"lat": 46.311667,
		"lng": -96.5983
	},
	{
		"lat": 46.311972,
		"lng": -96.598243
	},
	{
		"lat": 46.312299,
		"lng": -96.598202
	},
	{
		"lat": 46.312511,
		"lng": -96.598176
	},
	{
		"lat": 46.312731,
		"lng": -96.598179
	},
	{
		"lat": 46.312875,
		"lng": -96.598187
	},
	{
		"lat": 46.313197,
		"lng": -96.598225
	},
	{
		"lat": 46.313411,
		"lng": -96.598261
	},
	{
		"lat": 46.313768,
		"lng": -96.598331
	},
	{
		"lat": 46.313947,
		"lng": -96.598353
	},
	{
		"lat": 46.314055,
		"lng": -96.598346
	},
	{
		"lat": 46.314377,
		"lng": -96.598308
	},
	{
		"lat": 46.314484,
		"lng": -96.598289
	},
	{
		"lat": 46.314519,
		"lng": -96.598276
	},
	{
		"lat": 46.314732,
		"lng": -96.598225
	},
	{
		"lat": 46.314766,
		"lng": -96.598208
	},
	{
		"lat": 46.314798,
		"lng": -96.598184
	},
	{
		"lat": 46.314899,
		"lng": -96.598132
	},
	{
		"lat": 46.314993,
		"lng": -96.598055
	},
	{
		"lat": 46.315084,
		"lng": -96.59797
	},
	{
		"lat": 46.315116,
		"lng": -96.597948
	},
	{
		"lat": 46.315178,
		"lng": -96.597894
	},
	{
		"lat": 46.315236,
		"lng": -96.597833
	},
	{
		"lat": 46.315347,
		"lng": -96.597703
	},
	{
		"lat": 46.315499,
		"lng": -96.597566
	},
	{
		"lat": 46.315587,
		"lng": -96.597476
	},
	{
		"lat": 46.315638,
		"lng": -96.597412
	},
	{
		"lat": 46.315669,
		"lng": -96.597375
	},
	{
		"lat": 46.315902,
		"lng": -96.597136
	},
	{
		"lat": 46.315994,
		"lng": -96.597054
	},
	{
		"lat": 46.316059,
		"lng": -96.59701
	},
	{
		"lat": 46.316093,
		"lng": -96.596995
	},
	{
		"lat": 46.316158,
		"lng": -96.596949
	},
	{
		"lat": 46.316364,
		"lng": -96.596858
	},
	{
		"lat": 46.316538,
		"lng": -96.596792
	},
	{
		"lat": 46.316753,
		"lng": -96.596755
	},
	{
		"lat": 46.317004,
		"lng": -96.596767
	},
	{
		"lat": 46.317148,
		"lng": -96.596781
	},
	{
		"lat": 46.317321,
		"lng": -96.596851
	},
	{
		"lat": 46.317458,
		"lng": -96.596918
	},
	{
		"lat": 46.31749,
		"lng": -96.596942
	},
	{
		"lat": 46.31759,
		"lng": -96.596999
	},
	{
		"lat": 46.317621,
		"lng": -96.597025
	},
	{
		"lat": 46.317706,
		"lng": -96.597122
	},
	{
		"lat": 46.317782,
		"lng": -96.597232
	},
	{
		"lat": 46.317853,
		"lng": -96.597349
	},
	{
		"lat": 46.31793,
		"lng": -96.597524
	},
	{
		"lat": 46.317959,
		"lng": -96.597619
	},
	{
		"lat": 46.317996,
		"lng": -96.597764
	},
	{
		"lat": 46.31812,
		"lng": -96.598137
	},
	{
		"lat": 46.318192,
		"lng": -96.598317
	},
	{
		"lat": 46.318405,
		"lng": -96.599264
	},
	{
		"lat": 46.318434,
		"lng": -96.599467
	},
	{
		"lat": 46.318461,
		"lng": -96.599563
	},
	{
		"lat": 46.318506,
		"lng": -96.599758
	},
	{
		"lat": 46.318527,
		"lng": -96.599801
	},
	{
		"lat": 46.318539,
		"lng": -96.599849
	},
	{
		"lat": 46.318552,
		"lng": -96.599951
	},
	{
		"lat": 46.318583,
		"lng": -96.600044
	},
	{
		"lat": 46.318603,
		"lng": -96.600087
	},
	{
		"lat": 46.318633,
		"lng": -96.600181
	},
	{
		"lat": 46.318696,
		"lng": -96.600307
	},
	{
		"lat": 46.318881,
		"lng": -96.600622
	},
	{
		"lat": 46.319035,
		"lng": -96.600837
	},
	{
		"lat": 46.319144,
		"lng": -96.600971
	},
	{
		"lat": 46.319173,
		"lng": -96.601001
	},
	{
		"lat": 46.319299,
		"lng": -96.601098
	},
	{
		"lat": 46.319328,
		"lng": -96.601127
	},
	{
		"lat": 46.319395,
		"lng": -96.601168
	},
	{
		"lat": 46.319498,
		"lng": -96.601204
	},
	{
		"lat": 46.319533,
		"lng": -96.601207
	},
	{
		"lat": 46.319602,
		"lng": -96.601229
	},
	{
		"lat": 46.319638,
		"lng": -96.60123
	},
	{
		"lat": 46.319707,
		"lng": -96.601206
	},
	{
		"lat": 46.320444,
		"lng": -96.601027
	},
	{
		"lat": 46.32073,
		"lng": -96.600984
	},
	{
		"lat": 46.3208,
		"lng": -96.600957
	},
	{
		"lat": 46.321086,
		"lng": -96.6009
	},
	{
		"lat": 46.321156,
		"lng": -96.600878
	},
	{
		"lat": 46.321263,
		"lng": -96.600853
	},
	{
		"lat": 46.321439,
		"lng": -96.6008
	},
	{
		"lat": 46.321581,
		"lng": -96.600765
	},
	{
		"lat": 46.321754,
		"lng": -96.600696
	},
	{
		"lat": 46.321968,
		"lng": -96.600646
	},
	{
		"lat": 46.322218,
		"lng": -96.600599
	},
	{
		"lat": 46.322506,
		"lng": -96.600588
	},
	{
		"lat": 46.322662,
		"lng": -96.600593
	},
	{
		"lat": 46.322697,
		"lng": -96.600606
	},
	{
		"lat": 46.322769,
		"lng": -96.600613
	},
	{
		"lat": 46.322849,
		"lng": -96.600627
	},
	{
		"lat": 46.322947,
		"lng": -96.600645
	},
	{
		"lat": 46.323156,
		"lng": -96.600727
	},
	{
		"lat": 46.323393,
		"lng": -96.600846
	},
	{
		"lat": 46.323463,
		"lng": -96.600874
	},
	{
		"lat": 46.323642,
		"lng": -96.600903
	},
	{
		"lat": 46.323714,
		"lng": -96.600904
	},
	{
		"lat": 46.32382,
		"lng": -96.600879
	},
	{
		"lat": 46.32389,
		"lng": -96.600853
	},
	{
		"lat": 46.324247,
		"lng": -96.600792
	},
	{
		"lat": 46.324349,
		"lng": -96.600737
	},
	{
		"lat": 46.324413,
		"lng": -96.600691
	},
	{
		"lat": 46.324713,
		"lng": -96.600406
	},
	{
		"lat": 46.32477,
		"lng": -96.600343
	},
	{
		"lat": 46.324918,
		"lng": -96.600194
	},
	{
		"lat": 46.325041,
		"lng": -96.600088
	},
	{
		"lat": 46.325105,
		"lng": -96.60004
	},
	{
		"lat": 46.325165,
		"lng": -96.599983
	},
	{
		"lat": 46.325259,
		"lng": -96.599907
	},
	{
		"lat": 46.32536,
		"lng": -96.599851
	},
	{
		"lat": 46.325429,
		"lng": -96.599823
	},
	{
		"lat": 46.325571,
		"lng": -96.599788
	},
	{
		"lat": 46.325642,
		"lng": -96.599801
	},
	{
		"lat": 46.32575,
		"lng": -96.59981
	},
	{
		"lat": 46.325822,
		"lng": -96.59982
	},
	{
		"lat": 46.325893,
		"lng": -96.599812
	},
	{
		"lat": 46.325929,
		"lng": -96.599817
	},
	{
		"lat": 46.326037,
		"lng": -96.599806
	},
	{
		"lat": 46.326215,
		"lng": -96.599768
	},
	{
		"lat": 46.326287,
		"lng": -96.599761
	},
	{
		"lat": 46.326395,
		"lng": -96.599764
	},
	{
		"lat": 46.326466,
		"lng": -96.599775
	},
	{
		"lat": 46.32657,
		"lng": -96.599815
	},
	{
		"lat": 46.326636,
		"lng": -96.599858
	},
	{
		"lat": 46.326817,
		"lng": -96.600027
	},
	{
		"lat": 46.326844,
		"lng": -96.60006
	},
	{
		"lat": 46.32689,
		"lng": -96.600141
	},
	{
		"lat": 46.326929,
		"lng": -96.600227
	},
	{
		"lat": 46.326962,
		"lng": -96.600319
	},
	{
		"lat": 46.326984,
		"lng": -96.600418
	},
	{
		"lat": 46.326984,
		"lng": -96.600419
	},
	{
		"lat": 46.327003,
		"lng": -96.600623
	},
	{
		"lat": 46.327013,
		"lng": -96.600777
	},
	{
		"lat": 46.327008,
		"lng": -96.601036
	},
	{
		"lat": 46.326938,
		"lng": -96.601327
	},
	{
		"lat": 46.326714,
		"lng": -96.601979
	},
	{
		"lat": 46.326679,
		"lng": -96.602069
	},
	{
		"lat": 46.326639,
		"lng": -96.602152
	},
	{
		"lat": 46.326622,
		"lng": -96.602253
	},
	{
		"lat": 46.326587,
		"lng": -96.602398
	},
	{
		"lat": 46.326411,
		"lng": -96.603661
	},
	{
		"lat": 46.326378,
		"lng": -96.603753
	},
	{
		"lat": 46.326305,
		"lng": -96.603931
	},
	{
		"lat": 46.326243,
		"lng": -96.604058
	},
	{
		"lat": 46.326166,
		"lng": -96.604232
	},
	{
		"lat": 46.326112,
		"lng": -96.604367
	},
	{
		"lat": 46.326083,
		"lng": -96.604462
	},
	{
		"lat": 46.326021,
		"lng": -96.604604
	},
	{
		"lat": 46.326007,
		"lng": -96.604638
	},
	{
		"lat": 46.325942,
		"lng": -96.604822
	},
	{
		"lat": 46.325913,
		"lng": -96.604971
	},
	{
		"lat": 46.325885,
		"lng": -96.605174
	},
	{
		"lat": 46.325884,
		"lng": -96.605278
	},
	{
		"lat": 46.325892,
		"lng": -96.605432
	},
	{
		"lat": 46.325909,
		"lng": -96.605533
	},
	{
		"lat": 46.325923,
		"lng": -96.60558
	},
	{
		"lat": 46.32596,
		"lng": -96.605669
	},
	{
		"lat": 46.326006,
		"lng": -96.605749
	},
	{
		"lat": 46.326133,
		"lng": -96.605931
	},
	{
		"lat": 46.32616,
		"lng": -96.605959
	},
	{
		"lat": 46.326191,
		"lng": -96.605992
	},
	{
		"lat": 46.326223,
		"lng": -96.606016
	},
	{
		"lat": 46.32639,
		"lng": -96.606113
	},
	{
		"lat": 46.326496,
		"lng": -96.606132
	},
	{
		"lat": 46.326604,
		"lng": -96.606138
	},
	{
		"lat": 46.326675,
		"lng": -96.60613
	},
	{
		"lat": 46.326746,
		"lng": -96.606114
	},
	{
		"lat": 46.326845,
		"lng": -96.606054
	},
	{
		"lat": 46.326876,
		"lng": -96.606028
	},
	{
		"lat": 46.326904,
		"lng": -96.605997
	},
	{
		"lat": 46.326967,
		"lng": -96.605948
	},
	{
		"lat": 46.327058,
		"lng": -96.605865
	},
	{
		"lat": 46.327203,
		"lng": -96.605715
	},
	{
		"lat": 46.327285,
		"lng": -96.605613
	},
	{
		"lat": 46.327664,
		"lng": -96.605071
	},
	{
		"lat": 46.327982,
		"lng": -96.604512
	},
	{
		"lat": 46.328002,
		"lng": -96.60447
	},
	{
		"lat": 46.328034,
		"lng": -96.604378
	},
	{
		"lat": 46.328311,
		"lng": -96.60264
	},
	{
		"lat": 46.328345,
		"lng": -96.602476
	},
	{
		"lat": 46.328496,
		"lng": -96.601757
	},
	{
		"lat": 46.32853,
		"lng": -96.601667
	},
	{
		"lat": 46.328707,
		"lng": -96.601055
	},
	{
		"lat": 46.328763,
		"lng": -96.60081
	},
	{
		"lat": 46.328814,
		"lng": -96.600672
	},
	{
		"lat": 46.328876,
		"lng": -96.600546
	},
	{
		"lat": 46.328979,
		"lng": -96.600272
	},
	{
		"lat": 46.329109,
		"lng": -96.600025
	},
	{
		"lat": 46.329201,
		"lng": -96.599865
	},
	{
		"lat": 46.329411,
		"lng": -96.599583
	},
	{
		"lat": 46.329661,
		"lng": -96.5994
	},
	{
		"lat": 46.329984,
		"lng": -96.599379
	},
	{
		"lat": 46.330251,
		"lng": -96.599513
	},
	{
		"lat": 46.330348,
		"lng": -96.599582
	},
	{
		"lat": 46.330481,
		"lng": -96.59966
	},
	{
		"lat": 46.33057,
		"lng": -96.599748
	},
	{
		"lat": 46.330646,
		"lng": -96.599858
	},
	{
		"lat": 46.330693,
		"lng": -96.599937
	},
	{
		"lat": 46.330805,
		"lng": -96.600203
	},
	{
		"lat": 46.330909,
		"lng": -96.600413
	},
	{
		"lat": 46.330961,
		"lng": -96.60055
	},
	{
		"lat": 46.33102,
		"lng": -96.600794
	},
	{
		"lat": 46.331109,
		"lng": -96.601295
	},
	{
		"lat": 46.331139,
		"lng": -96.601444
	},
	{
		"lat": 46.33116,
		"lng": -96.601649
	},
	{
		"lat": 46.331183,
		"lng": -96.60201
	},
	{
		"lat": 46.331182,
		"lng": -96.602268
	},
	{
		"lat": 46.331171,
		"lng": -96.602578
	},
	{
		"lat": 46.331049,
		"lng": -96.603304
	},
	{
		"lat": 46.331024,
		"lng": -96.6034
	},
	{
		"lat": 46.331015,
		"lng": -96.603451
	},
	{
		"lat": 46.330979,
		"lng": -96.603912
	},
	{
		"lat": 46.330974,
		"lng": -96.604067
	},
	{
		"lat": 46.330987,
		"lng": -96.604169
	},
	{
		"lat": 46.330987,
		"lng": -96.604221
	},
	{
		"lat": 46.330998,
		"lng": -96.604375
	},
	{
		"lat": 46.33102,
		"lng": -96.605332
	},
	{
		"lat": 46.331063,
		"lng": -96.605688
	},
	{
		"lat": 46.331083,
		"lng": -96.605892
	},
	{
		"lat": 46.33111,
		"lng": -96.605988
	},
	{
		"lat": 46.331191,
		"lng": -96.606159
	},
	{
		"lat": 46.331214,
		"lng": -96.606198
	},
	{
		"lat": 46.331366,
		"lng": -96.606419
	},
	{
		"lat": 46.331421,
		"lng": -96.606484
	},
	{
		"lat": 46.331451,
		"lng": -96.606513
	},
	{
		"lat": 46.331484,
		"lng": -96.606536
	},
	{
		"lat": 46.331518,
		"lng": -96.606551
	},
	{
		"lat": 46.331569,
		"lng": -96.606562
	},
	{
		"lat": 46.33159,
		"lng": -96.606605
	},
	{
		"lat": 46.331659,
		"lng": -96.606724
	},
	{
		"lat": 46.331923,
		"lng": -96.607214
	},
	{
		"lat": 46.332075,
		"lng": -96.607433
	},
	{
		"lat": 46.332211,
		"lng": -96.607603
	},
	{
		"lat": 46.332365,
		"lng": -96.607735
	},
	{
		"lat": 46.332398,
		"lng": -96.607756
	},
	{
		"lat": 46.332492,
		"lng": -96.607833
	},
	{
		"lat": 46.332556,
		"lng": -96.607879
	},
	{
		"lat": 46.333401,
		"lng": -96.608435
	},
	{
		"lat": 46.333456,
		"lng": -96.608471
	},
	{
		"lat": 46.333559,
		"lng": -96.608514
	},
	{
		"lat": 46.333629,
		"lng": -96.608524
	},
	{
		"lat": 46.333839,
		"lng": -96.608577
	},
	{
		"lat": 46.33391,
		"lng": -96.608588
	},
	{
		"lat": 46.33398,
		"lng": -96.608606
	},
	{
		"lat": 46.334086,
		"lng": -96.608623
	},
	{
		"lat": 46.334228,
		"lng": -96.608638
	},
	{
		"lat": 46.334299,
		"lng": -96.608653
	},
	{
		"lat": 46.334974,
		"lng": -96.608748
	},
	{
		"lat": 46.335079,
		"lng": -96.608777
	},
	{
		"lat": 46.335115,
		"lng": -96.60878
	},
	{
		"lat": 46.335639,
		"lng": -96.608954
	},
	{
		"lat": 46.335836,
		"lng": -96.609181
	},
	{
		"lat": 46.336064,
		"lng": -96.609433
	},
	{
		"lat": 46.336193,
		"lng": -96.609614
	},
	{
		"lat": 46.336305,
		"lng": -96.609817
	},
	{
		"lat": 46.336376,
		"lng": -96.609996
	},
	{
		"lat": 46.3364,
		"lng": -96.610035
	},
	{
		"lat": 46.33642,
		"lng": -96.610078
	},
	{
		"lat": 46.336433,
		"lng": -96.610126
	},
	{
		"lat": 46.336451,
		"lng": -96.610171
	},
	{
		"lat": 46.336495,
		"lng": -96.610253
	},
	{
		"lat": 46.336593,
		"lng": -96.610469
	},
	{
		"lat": 46.336715,
		"lng": -96.610725
	},
	{
		"lat": 46.336793,
		"lng": -96.610958
	},
	{
		"lat": 46.336819,
		"lng": -96.611061
	},
	{
		"lat": 46.336855,
		"lng": -96.611201
	},
	{
		"lat": 46.336874,
		"lng": -96.6113
	},
	{
		"lat": 46.336931,
		"lng": -96.611706
	},
	{
		"lat": 46.336949,
		"lng": -96.611963
	},
	{
		"lat": 46.336955,
		"lng": -96.61248
	},
	{
		"lat": 46.336989,
		"lng": -96.612995
	},
	{
		"lat": 46.337013,
		"lng": -96.613092
	},
	{
		"lat": 46.337056,
		"lng": -96.613327
	},
	{
		"lat": 46.337068,
		"lng": -96.613392
	},
	{
		"lat": 46.337119,
		"lng": -96.613585
	},
	{
		"lat": 46.337152,
		"lng": -96.613677
	},
	{
		"lat": 46.337176,
		"lng": -96.613775
	},
	{
		"lat": 46.337212,
		"lng": -96.613864
	},
	{
		"lat": 46.337227,
		"lng": -96.613911
	},
	{
		"lat": 46.337325,
		"lng": -96.614129
	},
	{
		"lat": 46.337369,
		"lng": -96.61421
	},
	{
		"lat": 46.337442,
		"lng": -96.614325
	},
	{
		"lat": 46.337487,
		"lng": -96.614405
	},
	{
		"lat": 46.337635,
		"lng": -96.614632
	},
	{
		"lat": 46.337899,
		"lng": -96.614985
	},
	{
		"lat": 46.338245,
		"lng": -96.615356
	},
	{
		"lat": 46.338398,
		"lng": -96.615493
	},
	{
		"lat": 46.338563,
		"lng": -96.615596
	},
	{
		"lat": 46.338639,
		"lng": -96.61563
	},
	{
		"lat": 46.338679,
		"lng": -96.615715
	},
	{
		"lat": 46.338753,
		"lng": -96.615829
	},
	{
		"lat": 46.338781,
		"lng": -96.615862
	},
	{
		"lat": 46.33887,
		"lng": -96.615949
	},
	{
		"lat": 46.338933,
		"lng": -96.616
	},
	{
		"lat": 46.339235,
		"lng": -96.61628
	},
	{
		"lat": 46.339404,
		"lng": -96.616473
	},
	{
		"lat": 46.339462,
		"lng": -96.61652
	},
	{
		"lat": 46.339506,
		"lng": -96.616601
	},
	{
		"lat": 46.339525,
		"lng": -96.616645
	},
	{
		"lat": 46.339602,
		"lng": -96.616879
	},
	{
		"lat": 46.33963,
		"lng": -96.617029
	},
	{
		"lat": 46.339646,
		"lng": -96.617075
	},
	{
		"lat": 46.339666,
		"lng": -96.617175
	},
	{
		"lat": 46.339684,
		"lng": -96.617328
	},
	{
		"lat": 46.339721,
		"lng": -96.617527
	},
	{
		"lat": 46.339781,
		"lng": -96.61809
	},
	{
		"lat": 46.339814,
		"lng": -96.618449
	},
	{
		"lat": 46.339843,
		"lng": -96.619068
	},
	{
		"lat": 46.339863,
		"lng": -96.619239
	},
	{
		"lat": 46.339867,
		"lng": -96.619272
	},
	{
		"lat": 46.339908,
		"lng": -96.619524
	},
	{
		"lat": 46.339929,
		"lng": -96.619623
	},
	{
		"lat": 46.339956,
		"lng": -96.619719
	},
	{
		"lat": 46.34001,
		"lng": -96.619854
	},
	{
		"lat": 46.34009,
		"lng": -96.620025
	},
	{
		"lat": 46.340243,
		"lng": -96.620245
	},
	{
		"lat": 46.340357,
		"lng": -96.620372
	},
	{
		"lat": 46.340389,
		"lng": -96.620396
	},
	{
		"lat": 46.340423,
		"lng": -96.620414
	},
	{
		"lat": 46.340602,
		"lng": -96.620434
	},
	{
		"lat": 46.340782,
		"lng": -96.620435
	},
	{
		"lat": 46.340817,
		"lng": -96.620441
	},
	{
		"lat": 46.340925,
		"lng": -96.620445
	},
	{
		"lat": 46.341069,
		"lng": -96.620437
	},
	{
		"lat": 46.341176,
		"lng": -96.620415
	},
	{
		"lat": 46.341245,
		"lng": -96.620383
	},
	{
		"lat": 46.341314,
		"lng": -96.620358
	},
	{
		"lat": 46.341348,
		"lng": -96.620338
	},
	{
		"lat": 46.34178,
		"lng": -96.620158
	},
	{
		"lat": 46.34193,
		"lng": -96.620045
	},
	{
		"lat": 46.34226,
		"lng": -96.619795
	},
	{
		"lat": 46.342694,
		"lng": -96.619532
	},
	{
		"lat": 46.342941,
		"lng": -96.619368
	},
	{
		"lat": 46.343243,
		"lng": -96.619169
	},
	{
		"lat": 46.343273,
		"lng": -96.619139
	},
	{
		"lat": 46.343563,
		"lng": -96.618806
	},
	{
		"lat": 46.343906,
		"lng": -96.618542
	},
	{
		"lat": 46.344296,
		"lng": -96.618147
	},
	{
		"lat": 46.345006,
		"lng": -96.617156
	},
	{
		"lat": 46.345049,
		"lng": -96.617092
	},
	{
		"lat": 46.345575,
		"lng": -96.616432
	},
	{
		"lat": 46.345686,
		"lng": -96.616365
	},
	{
		"lat": 46.345702,
		"lng": -96.616355
	},
	{
		"lat": 46.345849,
		"lng": -96.616267
	},
	{
		"lat": 46.345895,
		"lng": -96.616202
	},
	{
		"lat": 46.34642,
		"lng": -96.616202
	},
	{
		"lat": 46.346512,
		"lng": -96.616302
	},
	{
		"lat": 46.34676,
		"lng": -96.616334
	},
	{
		"lat": 46.346817,
		"lng": -96.61637
	},
	{
		"lat": 46.346974,
		"lng": -96.61647
	},
	{
		"lat": 46.347132,
		"lng": -96.616569
	},
	{
		"lat": 46.347388,
		"lng": -96.616674
	},
	{
		"lat": 46.347467,
		"lng": -96.616781
	},
	{
		"lat": 46.347538,
		"lng": -96.616897
	},
	{
		"lat": 46.347559,
		"lng": -96.61694
	},
	{
		"lat": 46.347631,
		"lng": -96.61712
	},
	{
		"lat": 46.347659,
		"lng": -96.617215
	},
	{
		"lat": 46.347702,
		"lng": -96.617412
	},
	{
		"lat": 46.34772,
		"lng": -96.617565
	},
	{
		"lat": 46.347725,
		"lng": -96.61772
	},
	{
		"lat": 46.347723,
		"lng": -96.618134
	},
	{
		"lat": 46.347721,
		"lng": -96.619834
	},
	{
		"lat": 46.347661,
		"lng": -96.620334
	},
	{
		"lat": 46.347607,
		"lng": -96.620789
	},
	{
		"lat": 46.347628,
		"lng": -96.621219
	},
	{
		"lat": 46.347976,
		"lng": -96.622364
	},
	{
		"lat": 46.348114,
		"lng": -96.622818
	},
	{
		"lat": 46.348251,
		"lng": -96.623271
	},
	{
		"lat": 46.348671,
		"lng": -96.62529
	},
	{
		"lat": 46.348982,
		"lng": -96.626486
	},
	{
		"lat": 46.349041,
		"lng": -96.626674
	},
	{
		"lat": 46.349124,
		"lng": -96.62696
	},
	{
		"lat": 46.349254,
		"lng": -96.627443
	},
	{
		"lat": 46.349417,
		"lng": -96.627844
	},
	{
		"lat": 46.349987,
		"lng": -96.628622
	},
	{
		"lat": 46.350452,
		"lng": -96.628899
	},
	{
		"lat": 46.350522,
		"lng": -96.628921
	},
	{
		"lat": 46.351567,
		"lng": -96.629392
	},
	{
		"lat": 46.351602,
		"lng": -96.629403
	},
	{
		"lat": 46.351889,
		"lng": -96.629423
	},
	{
		"lat": 46.352033,
		"lng": -96.629418
	},
	{
		"lat": 46.352249,
		"lng": -96.629395
	},
	{
		"lat": 46.352392,
		"lng": -96.629368
	},
	{
		"lat": 46.352498,
		"lng": -96.629341
	},
	{
		"lat": 46.352709,
		"lng": -96.629274
	},
	{
		"lat": 46.352849,
		"lng": -96.629224
	},
	{
		"lat": 46.353132,
		"lng": -96.629145
	},
	{
		"lat": 46.353199,
		"lng": -96.629107
	},
	{
		"lat": 46.353403,
		"lng": -96.629089
	},
	{
		"lat": 46.353974,
		"lng": -96.629039
	},
	{
		"lat": 46.354037,
		"lng": -96.629087
	},
	{
		"lat": 46.354161,
		"lng": -96.629194
	},
	{
		"lat": 46.354247,
		"lng": -96.629287
	},
	{
		"lat": 46.354319,
		"lng": -96.629403
	},
	{
		"lat": 46.354386,
		"lng": -96.629586
	},
	{
		"lat": 46.354409,
		"lng": -96.629683
	},
	{
		"lat": 46.354414,
		"lng": -96.629735
	},
	{
		"lat": 46.354403,
		"lng": -96.630095
	},
	{
		"lat": 46.35437,
		"lng": -96.630296
	},
	{
		"lat": 46.354325,
		"lng": -96.630492
	},
	{
		"lat": 46.354297,
		"lng": -96.630587
	},
	{
		"lat": 46.354264,
		"lng": -96.630679
	},
	{
		"lat": 46.354205,
		"lng": -96.630809
	},
	{
		"lat": 46.354066,
		"lng": -96.631046
	},
	{
		"lat": 46.353864,
		"lng": -96.631342
	},
	{
		"lat": 46.353807,
		"lng": -96.631405
	},
	{
		"lat": 46.353487,
		"lng": -96.631822
	},
	{
		"lat": 46.35319,
		"lng": -96.632199
	},
	{
		"lat": 46.353086,
		"lng": -96.632342
	},
	{
		"lat": 46.352935,
		"lng": -96.632632
	},
	{
		"lat": 46.352862,
		"lng": -96.63281
	},
	{
		"lat": 46.352833,
		"lng": -96.632905
	},
	{
		"lat": 46.352749,
		"lng": -96.633247
	},
	{
		"lat": 46.352656,
		"lng": -96.633834
	},
	{
		"lat": 46.35262,
		"lng": -96.634057
	},
	{
		"lat": 46.352585,
		"lng": -96.63428
	},
	{
		"lat": 46.352609,
		"lng": -96.635715
	},
	{
		"lat": 46.35248,
		"lng": -96.636789
	},
	{
		"lat": 46.352318,
		"lng": -96.637145
	},
	{
		"lat": 46.352242,
		"lng": -96.63738
	},
	{
		"lat": 46.352209,
		"lng": -96.637471
	},
	{
		"lat": 46.352196,
		"lng": -96.63752
	},
	{
		"lat": 46.352181,
		"lng": -96.637595
	},
	{
		"lat": 46.352147,
		"lng": -96.637769
	},
	{
		"lat": 46.352114,
		"lng": -96.637917
	},
	{
		"lat": 46.35209,
		"lng": -96.638068
	},
	{
		"lat": 46.352059,
		"lng": -96.638217
	},
	{
		"lat": 46.352037,
		"lng": -96.638369
	},
	{
		"lat": 46.352021,
		"lng": -96.638522
	},
	{
		"lat": 46.351972,
		"lng": -96.638825
	},
	{
		"lat": 46.351933,
		"lng": -96.638969
	},
	{
		"lat": 46.351889,
		"lng": -96.639166
	},
	{
		"lat": 46.351737,
		"lng": -96.639692
	},
	{
		"lat": 46.351624,
		"lng": -96.640015
	},
	{
		"lat": 46.351588,
		"lng": -96.640104
	},
	{
		"lat": 46.351525,
		"lng": -96.64023
	},
	{
		"lat": 46.35147,
		"lng": -96.640364
	},
	{
		"lat": 46.351448,
		"lng": -96.640405
	},
	{
		"lat": 46.351228,
		"lng": -96.640747
	},
	{
		"lat": 46.351015,
		"lng": -96.641027
	},
	{
		"lat": 46.350874,
		"lng": -96.641187
	},
	{
		"lat": 46.350812,
		"lng": -96.64124
	},
	{
		"lat": 46.350644,
		"lng": -96.641434
	},
	{
		"lat": 46.350427,
		"lng": -96.641706
	},
	{
		"lat": 46.350256,
		"lng": -96.641973
	},
	{
		"lat": 46.350234,
		"lng": -96.642018
	},
	{
		"lat": 46.350176,
		"lng": -96.642145
	},
	{
		"lat": 46.35009,
		"lng": -96.642372
	},
	{
		"lat": 46.35004,
		"lng": -96.642566
	},
	{
		"lat": 46.350022,
		"lng": -96.642666
	},
	{
		"lat": 46.34999,
		"lng": -96.64292
	},
	{
		"lat": 46.349983,
		"lng": -96.643024
	},
	{
		"lat": 46.34998,
		"lng": -96.643333
	},
	{
		"lat": 46.349998,
		"lng": -96.643591
	},
	{
		"lat": 46.350024,
		"lng": -96.643742
	},
	{
		"lat": 46.350122,
		"lng": -96.644185
	},
	{
		"lat": 46.350213,
		"lng": -96.644467
	},
	{
		"lat": 46.350294,
		"lng": -96.644639
	},
	{
		"lat": 46.350384,
		"lng": -96.6448
	},
	{
		"lat": 46.350506,
		"lng": -96.644991
	},
	{
		"lat": 46.350669,
		"lng": -96.645194
	},
	{
		"lat": 46.350847,
		"lng": -96.645372
	},
	{
		"lat": 46.350968,
		"lng": -96.645484
	},
	{
		"lat": 46.351086,
		"lng": -96.645604
	},
	{
		"lat": 46.351221,
		"lng": -96.645582
	},
	{
		"lat": 46.351294,
		"lng": -96.645586
	},
	{
		"lat": 46.351435,
		"lng": -96.645622
	},
	{
		"lat": 46.351504,
		"lng": -96.645655
	},
	{
		"lat": 46.351759,
		"lng": -96.645846
	},
	{
		"lat": 46.351825,
		"lng": -96.645887
	},
	{
		"lat": 46.351979,
		"lng": -96.64602
	},
	{
		"lat": 46.352338,
		"lng": -96.646259
	},
	{
		"lat": 46.352407,
		"lng": -96.646288
	},
	{
		"lat": 46.352536,
		"lng": -96.64638
	},
	{
		"lat": 46.352705,
		"lng": -96.646466
	},
	{
		"lat": 46.352809,
		"lng": -96.64651
	},
	{
		"lat": 46.352986,
		"lng": -96.646557
	},
	{
		"lat": 46.353018,
		"lng": -96.646579
	},
	{
		"lat": 46.353194,
		"lng": -96.646631
	},
	{
		"lat": 46.35326,
		"lng": -96.646674
	},
	{
		"lat": 46.353501,
		"lng": -96.646778
	},
	{
		"lat": 46.353606,
		"lng": -96.646813
	},
	{
		"lat": 46.353749,
		"lng": -96.646843
	},
	{
		"lat": 46.353817,
		"lng": -96.646877
	},
	{
		"lat": 46.353886,
		"lng": -96.646903
	},
	{
		"lat": 46.353958,
		"lng": -96.646918
	},
	{
		"lat": 46.354205,
		"lng": -96.646989
	},
	{
		"lat": 46.354383,
		"lng": -96.647027
	},
	{
		"lat": 46.354417,
		"lng": -96.647044
	},
	{
		"lat": 46.354593,
		"lng": -96.647098
	},
	{
		"lat": 46.354735,
		"lng": -96.647134
	},
	{
		"lat": 46.354802,
		"lng": -96.647171
	},
	{
		"lat": 46.355044,
		"lng": -96.647271
	},
	{
		"lat": 46.355181,
		"lng": -96.647337
	},
	{
		"lat": 46.355286,
		"lng": -96.647374
	},
	{
		"lat": 46.355421,
		"lng": -96.647445
	},
	{
		"lat": 46.35562,
		"lng": -96.647566
	},
	{
		"lat": 46.355826,
		"lng": -96.647663
	},
	{
		"lat": 46.355925,
		"lng": -96.647724
	},
	{
		"lat": 46.35623,
		"lng": -96.647885
	},
	{
		"lat": 46.356668,
		"lng": -96.648124
	},
	{
		"lat": 46.356873,
		"lng": -96.648223
	},
	{
		"lat": 46.357116,
		"lng": -96.648321
	},
	{
		"lat": 46.357184,
		"lng": -96.648356
	},
	{
		"lat": 46.35733,
		"lng": -96.648401
	},
	{
		"lat": 46.357543,
		"lng": -96.648458
	},
	{
		"lat": 46.35765,
		"lng": -96.648478
	},
	{
		"lat": 46.357722,
		"lng": -96.648484
	},
	{
		"lat": 46.357794,
		"lng": -96.648483
	},
	{
		"lat": 46.358081,
		"lng": -96.64845
	},
	{
		"lat": 46.358151,
		"lng": -96.648426
	},
	{
		"lat": 46.358356,
		"lng": -96.648325
	},
	{
		"lat": 46.358422,
		"lng": -96.648284
	},
	{
		"lat": 46.358489,
		"lng": -96.648248
	},
	{
		"lat": 46.358618,
		"lng": -96.648156
	},
	{
		"lat": 46.358833,
		"lng": -96.647967
	},
	{
		"lat": 46.35904,
		"lng": -96.64768
	},
	{
		"lat": 46.359089,
		"lng": -96.647605
	},
	{
		"lat": 46.359195,
		"lng": -96.647334
	},
	{
		"lat": 46.359241,
		"lng": -96.647193
	},
	{
		"lat": 46.359279,
		"lng": -96.647105
	},
	{
		"lat": 46.359326,
		"lng": -96.64691
	},
	{
		"lat": 46.359341,
		"lng": -96.646863
	},
	{
		"lat": 46.359361,
		"lng": -96.646819
	},
	{
		"lat": 46.359376,
		"lng": -96.646773
	},
	{
		"lat": 46.359386,
		"lng": -96.646723
	},
	{
		"lat": 46.359401,
		"lng": -96.646676
	},
	{
		"lat": 46.35944,
		"lng": -96.646589
	},
	{
		"lat": 46.359508,
		"lng": -96.646406
	},
	{
		"lat": 46.359582,
		"lng": -96.646171
	},
	{
		"lat": 46.35963,
		"lng": -96.646032
	},
	{
		"lat": 46.359684,
		"lng": -96.64584
	},
	{
		"lat": 46.359731,
		"lng": -96.645645
	},
	{
		"lat": 46.360226,
		"lng": -96.644464
	},
	{
		"lat": 46.360256,
		"lng": -96.644434
	},
	{
		"lat": 46.36033,
		"lng": -96.644322
	},
	{
		"lat": 46.360413,
		"lng": -96.644155
	},
	{
		"lat": 46.360479,
		"lng": -96.644035
	},
	{
		"lat": 46.360695,
		"lng": -96.643694
	},
	{
		"lat": 46.361232,
		"lng": -96.643149
	},
	{
		"lat": 46.361267,
		"lng": -96.643134
	},
	{
		"lat": 46.361408,
		"lng": -96.643095
	},
	{
		"lat": 46.361587,
		"lng": -96.643071
	},
	{
		"lat": 46.361623,
		"lng": -96.643071
	},
	{
		"lat": 46.361802,
		"lng": -96.643107
	},
	{
		"lat": 46.361935,
		"lng": -96.643185
	},
	{
		"lat": 46.361997,
		"lng": -96.643238
	},
	{
		"lat": 46.362135,
		"lng": -96.643404
	},
	{
		"lat": 46.36226,
		"lng": -96.643591
	},
	{
		"lat": 46.362347,
		"lng": -96.643756
	},
	{
		"lat": 46.362446,
		"lng": -96.643972
	},
	{
		"lat": 46.362501,
		"lng": -96.644162
	},
	{
		"lat": 46.362554,
		"lng": -96.64441
	},
	{
		"lat": 46.362617,
		"lng": -96.644866
	},
	{
		"lat": 46.362624,
		"lng": -96.644969
	},
	{
		"lat": 46.362638,
		"lng": -96.645071
	},
	{
		"lat": 46.36265,
		"lng": -96.645225
	},
	{
		"lat": 46.362685,
		"lng": -96.645479
	},
	{
		"lat": 46.362711,
		"lng": -96.645839
	},
	{
		"lat": 46.362759,
		"lng": -96.646352
	},
	{
		"lat": 46.36279,
		"lng": -96.647298
	},
	{
		"lat": 46.362794,
		"lng": -96.647658
	},
	{
		"lat": 46.362812,
		"lng": -96.647812
	},
	{
		"lat": 46.362835,
		"lng": -96.647909
	},
	{
		"lat": 46.362933,
		"lng": -96.648512
	},
	{
		"lat": 46.363005,
		"lng": -96.648858
	},
	{
		"lat": 46.363062,
		"lng": -96.649103
	},
	{
		"lat": 46.36311,
		"lng": -96.649241
	},
	{
		"lat": 46.363483,
		"lng": -96.650177
	},
	{
		"lat": 46.363573,
		"lng": -96.650448
	},
	{
		"lat": 46.363684,
		"lng": -96.650783
	},
	{
		"lat": 46.363801,
		"lng": -96.651044
	},
	{
		"lat": 46.36394,
		"lng": -96.651406
	},
	{
		"lat": 46.364017,
		"lng": -96.651582
	},
	{
		"lat": 46.364159,
		"lng": -96.651941
	},
	{
		"lat": 46.364436,
		"lng": -96.652547
	},
	{
		"lat": 46.364604,
		"lng": -96.652884
	},
	{
		"lat": 46.364737,
		"lng": -96.653128
	},
	{
		"lat": 46.365086,
		"lng": -96.653786
	},
	{
		"lat": 46.365182,
		"lng": -96.653942
	},
	{
		"lat": 46.36546,
		"lng": -96.654347
	},
	{
		"lat": 46.365798,
		"lng": -96.654812
	},
	{
		"lat": 46.365937,
		"lng": -96.654977
	},
	{
		"lat": 46.366023,
		"lng": -96.655056
	},
	{
		"lat": 46.366079,
		"lng": -96.655121
	},
	{
		"lat": 46.36617,
		"lng": -96.655206
	},
	{
		"lat": 46.366299,
		"lng": -96.655297
	},
	{
		"lat": 46.366359,
		"lng": -96.655354
	},
	{
		"lat": 46.366456,
		"lng": -96.655423
	},
	{
		"lat": 46.366486,
		"lng": -96.655453
	},
	{
		"lat": 46.366518,
		"lng": -96.655477
	},
	{
		"lat": 46.366584,
		"lng": -96.655515
	},
	{
		"lat": 46.366755,
		"lng": -96.6556
	},
	{
		"lat": 46.367106,
		"lng": -96.65571
	},
	{
		"lat": 46.367569,
		"lng": -96.655815
	},
	{
		"lat": 46.367995,
		"lng": -96.655924
	},
	{
		"lat": 46.368101,
		"lng": -96.655957
	},
	{
		"lat": 46.368385,
		"lng": -96.65603
	},
	{
		"lat": 46.368525,
		"lng": -96.656075
	},
	{
		"lat": 46.368838,
		"lng": -96.656202
	},
	{
		"lat": 46.368971,
		"lng": -96.65628
	},
	{
		"lat": 46.369074,
		"lng": -96.656326
	},
	{
		"lat": 46.369273,
		"lng": -96.656465
	},
	{
		"lat": 46.369388,
		"lng": -96.65654
	},
	{
		"lat": 46.369415,
		"lng": -96.656565
	},
	{
		"lat": 46.369507,
		"lng": -96.656618
	},
	{
		"lat": 46.369621,
		"lng": -96.656714
	},
	{
		"lat": 46.369698,
		"lng": -96.656803
	},
	{
		"lat": 46.369752,
		"lng": -96.656858
	},
	{
		"lat": 46.369801,
		"lng": -96.656921
	},
	{
		"lat": 46.369855,
		"lng": -96.656977
	},
	{
		"lat": 46.369922,
		"lng": -96.657072
	},
	{
		"lat": 46.369952,
		"lng": -96.657114
	},
	{
		"lat": 46.370124,
		"lng": -96.657379
	},
	{
		"lat": 46.370193,
		"lng": -96.657499
	},
	{
		"lat": 46.370298,
		"lng": -96.657708
	},
	{
		"lat": 46.370378,
		"lng": -96.657881
	},
	{
		"lat": 46.370424,
		"lng": -96.658021
	},
	{
		"lat": 46.370616,
		"lng": -96.65869
	},
	{
		"lat": 46.370675,
		"lng": -96.658935
	},
	{
		"lat": 46.370705,
		"lng": -96.659028
	},
	{
		"lat": 46.370751,
		"lng": -96.659225
	},
	{
		"lat": 46.370815,
		"lng": -96.659466
	},
	{
		"lat": 46.370865,
		"lng": -96.659603
	},
	{
		"lat": 46.370926,
		"lng": -96.659731
	},
	{
		"lat": 46.371072,
		"lng": -96.659959
	},
	{
		"lat": 46.371213,
		"lng": -96.660121
	},
	{
		"lat": 46.371366,
		"lng": -96.660257
	},
	{
		"lat": 46.37146,
		"lng": -96.660331
	},
	{
		"lat": 46.371493,
		"lng": -96.660351
	},
	{
		"lat": 46.371563,
		"lng": -96.660379
	},
	{
		"lat": 46.371634,
		"lng": -96.660386
	},
	{
		"lat": 46.371741,
		"lng": -96.660362
	},
	{
		"lat": 46.371775,
		"lng": -96.660347
	},
	{
		"lat": 46.371976,
		"lng": -96.660232
	},
	{
		"lat": 46.37204,
		"lng": -96.660186
	},
	{
		"lat": 46.372251,
		"lng": -96.659988
	},
	{
		"lat": 46.372279,
		"lng": -96.659955
	},
	{
		"lat": 46.372506,
		"lng": -96.659625
	},
	{
		"lat": 46.37272,
		"lng": -96.659276
	},
	{
		"lat": 46.372741,
		"lng": -96.659234
	},
	{
		"lat": 46.372758,
		"lng": -96.659188
	},
	{
		"lat": 46.372843,
		"lng": -96.659021
	},
	{
		"lat": 46.372879,
		"lng": -96.658931
	},
	{
		"lat": 46.372997,
		"lng": -96.658723
	},
	{
		"lat": 46.373039,
		"lng": -96.658651
	},
	{
		"lat": 46.37306,
		"lng": -96.658609
	},
	{
		"lat": 46.373076,
		"lng": -96.658563
	},
	{
		"lat": 46.37329,
		"lng": -96.658146
	},
	{
		"lat": 46.373357,
		"lng": -96.658024
	},
	{
		"lat": 46.373488,
		"lng": -96.657847
	},
	{
		"lat": 46.3736,
		"lng": -96.657717
	},
	{
		"lat": 46.373631,
		"lng": -96.657689
	},
	{
		"lat": 46.373698,
		"lng": -96.65766
	},
	{
		"lat": 46.373794,
		"lng": -96.657589
	},
	{
		"lat": 46.373899,
		"lng": -96.657555
	},
	{
		"lat": 46.373971,
		"lng": -96.657547
	},
	{
		"lat": 46.374115,
		"lng": -96.657558
	},
	{
		"lat": 46.374186,
		"lng": -96.657578
	},
	{
		"lat": 46.374287,
		"lng": -96.657631
	},
	{
		"lat": 46.374318,
		"lng": -96.657656
	},
	{
		"lat": 46.374371,
		"lng": -96.657727
	},
	{
		"lat": 46.374419,
		"lng": -96.657804
	},
	{
		"lat": 46.374502,
		"lng": -96.657973
	},
	{
		"lat": 46.374526,
		"lng": -96.658071
	},
	{
		"lat": 46.374531,
		"lng": -96.658122
	},
	{
		"lat": 46.374537,
		"lng": -96.658329
	},
	{
		"lat": 46.374521,
		"lng": -96.658638
	},
	{
		"lat": 46.374496,
		"lng": -96.658789
	},
	{
		"lat": 46.374444,
		"lng": -96.659037
	},
	{
		"lat": 46.374389,
		"lng": -96.659337
	},
	{
		"lat": 46.374367,
		"lng": -96.659489
	},
	{
		"lat": 46.37435,
		"lng": -96.659642
	},
	{
		"lat": 46.37438,
		"lng": -96.659791
	},
	{
		"lat": 46.374389,
		"lng": -96.659894
	},
	{
		"lat": 46.374371,
		"lng": -96.660203
	},
	{
		"lat": 46.374343,
		"lng": -96.660354
	},
	{
		"lat": 46.374337,
		"lng": -96.660561
	},
	{
		"lat": 46.374346,
		"lng": -96.660664
	},
	{
		"lat": 46.374364,
		"lng": -96.660764
	},
	{
		"lat": 46.374376,
		"lng": -96.660918
	},
	{
		"lat": 46.374392,
		"lng": -96.66128
	},
	{
		"lat": 46.374404,
		"lng": -96.661849
	},
	{
		"lat": 46.37439,
		"lng": -96.662522
	},
	{
		"lat": 46.374379,
		"lng": -96.662677
	},
	{
		"lat": 46.374341,
		"lng": -96.663088
	},
	{
		"lat": 46.374316,
		"lng": -96.663656
	},
	{
		"lat": 46.37431,
		"lng": -96.663967
	},
	{
		"lat": 46.374325,
		"lng": -96.664277
	},
	{
		"lat": 46.374362,
		"lng": -96.66453
	},
	{
		"lat": 46.374385,
		"lng": -96.664628
	},
	{
		"lat": 46.374404,
		"lng": -96.664781
	},
	{
		"lat": 46.374422,
		"lng": -96.664881
	},
	{
		"lat": 46.374442,
		"lng": -96.665034
	},
	{
		"lat": 46.374466,
		"lng": -96.665131
	},
	{
		"lat": 46.374518,
		"lng": -96.665379
	},
	{
		"lat": 46.374575,
		"lng": -96.665569
	},
	{
		"lat": 46.374637,
		"lng": -96.665756
	},
	{
		"lat": 46.374744,
		"lng": -96.666026
	},
	{
		"lat": 46.374802,
		"lng": -96.666156
	},
	{
		"lat": 46.37487,
		"lng": -96.666278
	},
	{
		"lat": 46.37508,
		"lng": -96.666632
	},
	{
		"lat": 46.375136,
		"lng": -96.666697
	},
	{
		"lat": 46.375187,
		"lng": -96.666771
	},
	{
		"lat": 46.375361,
		"lng": -96.666954
	},
	{
		"lat": 46.375518,
		"lng": -96.66708
	},
	{
		"lat": 46.375579,
		"lng": -96.667135
	},
	{
		"lat": 46.375675,
		"lng": -96.667208
	},
	{
		"lat": 46.375742,
		"lng": -96.667246
	},
	{
		"lat": 46.375807,
		"lng": -96.66729
	},
	{
		"lat": 46.375874,
		"lng": -96.667327
	},
	{
		"lat": 46.376012,
		"lng": -96.667388
	},
	{
		"lat": 46.376117,
		"lng": -96.667422
	},
	{
		"lat": 46.376368,
		"lng": -96.66747
	},
	{
		"lat": 46.376548,
		"lng": -96.667473
	},
	{
		"lat": 46.376872,
		"lng": -96.667464
	},
	{
		"lat": 46.37734,
		"lng": -96.667422
	},
	{
		"lat": 46.377626,
		"lng": -96.667369
	},
	{
		"lat": 46.377835,
		"lng": -96.667289
	},
	{
		"lat": 46.377937,
		"lng": -96.667239
	},
	{
		"lat": 46.378042,
		"lng": -96.667203
	},
	{
		"lat": 46.378145,
		"lng": -96.667156
	},
	{
		"lat": 46.378216,
		"lng": -96.667136
	},
	{
		"lat": 46.378908,
		"lng": -96.666923
	},
	{
		"lat": 46.378968,
		"lng": -96.666917
	},
	{
		"lat": 46.379445,
		"lng": -96.666866
	},
	{
		"lat": 46.379667,
		"lng": -96.666842
	},
	{
		"lat": 46.379889,
		"lng": -96.666818
	},
	{
		"lat": 46.380063,
		"lng": -96.66689
	},
	{
		"lat": 46.380811,
		"lng": -96.667266
	},
	{
		"lat": 46.380948,
		"lng": -96.66733
	},
	{
		"lat": 46.381015,
		"lng": -96.66737
	},
	{
		"lat": 46.381117,
		"lng": -96.66742
	},
	{
		"lat": 46.381283,
		"lng": -96.66752
	},
	{
		"lat": 46.381386,
		"lng": -96.667567
	},
	{
		"lat": 46.381556,
		"lng": -96.667659
	},
	{
		"lat": 46.381588,
		"lng": -96.667677
	},
	{
		"lat": 46.381846,
		"lng": -96.66786
	},
	{
		"lat": 46.382016,
		"lng": -96.667972
	},
	{
		"lat": 46.382043,
		"lng": -96.667989
	},
	{
		"lat": 46.382136,
		"lng": -96.668067
	},
	{
		"lat": 46.382264,
		"lng": -96.668163
	},
	{
		"lat": 46.382421,
		"lng": -96.66829
	},
	{
		"lat": 46.382635,
		"lng": -96.668482
	},
	{
		"lat": 46.38276,
		"lng": -96.668583
	},
	{
		"lat": 46.382818,
		"lng": -96.668646
	},
	{
		"lat": 46.38288,
		"lng": -96.668699
	},
	{
		"lat": 46.382939,
		"lng": -96.668757
	},
	{
		"lat": 46.38313,
		"lng": -96.668902
	},
	{
		"lat": 46.383428,
		"lng": -96.669194
	},
	{
		"lat": 46.383484,
		"lng": -96.669259
	},
	{
		"lat": 46.383516,
		"lng": -96.669284
	},
	{
		"lat": 46.383584,
		"lng": -96.66932
	},
	{
		"lat": 46.383616,
		"lng": -96.669343
	},
	{
		"lat": 46.38372,
		"lng": -96.669386
	},
	{
		"lat": 46.384026,
		"lng": -96.669539
	},
	{
		"lat": 46.384095,
		"lng": -96.669567
	},
	{
		"lat": 46.384271,
		"lng": -96.669622
	},
	{
		"lat": 46.384379,
		"lng": -96.669637
	},
	{
		"lat": 46.384559,
		"lng": -96.669637
	},
	{
		"lat": 46.384809,
		"lng": -96.669591
	},
	{
		"lat": 46.384916,
		"lng": -96.669565
	},
	{
		"lat": 46.384986,
		"lng": -96.669542
	},
	{
		"lat": 46.385054,
		"lng": -96.669509
	},
	{
		"lat": 46.385159,
		"lng": -96.669471
	},
	{
		"lat": 46.385329,
		"lng": -96.669386
	},
	{
		"lat": 46.385496,
		"lng": -96.669289
	},
	{
		"lat": 46.385814,
		"lng": -96.66905
	},
	{
		"lat": 46.385845,
		"lng": -96.669022
	},
	{
		"lat": 46.38591,
		"lng": -96.668978
	},
	{
		"lat": 46.386034,
		"lng": -96.668872
	},
	{
		"lat": 46.386129,
		"lng": -96.6688
	},
	{
		"lat": 46.386445,
		"lng": -96.668457
	},
	{
		"lat": 46.386528,
		"lng": -96.668357
	},
	{
		"lat": 46.386768,
		"lng": -96.668274
	},
	{
		"lat": 46.386975,
		"lng": -96.668186
	},
	{
		"lat": 46.387045,
		"lng": -96.668161
	},
	{
		"lat": 46.387188,
		"lng": -96.668129
	},
	{
		"lat": 46.38726,
		"lng": -96.668125
	},
	{
		"lat": 46.387476,
		"lng": -96.668143
	},
	{
		"lat": 46.387618,
		"lng": -96.668178
	},
	{
		"lat": 46.387753,
		"lng": -96.66825
	},
	{
		"lat": 46.387814,
		"lng": -96.668305
	},
	{
		"lat": 46.387925,
		"lng": -96.668438
	},
	{
		"lat": 46.387998,
		"lng": -96.668552
	},
	{
		"lat": 46.388232,
		"lng": -96.669011
	},
	{
		"lat": 46.388431,
		"lng": -96.669443
	},
	{
		"lat": 46.388513,
		"lng": -96.669612
	},
	{
		"lat": 46.388806,
		"lng": -96.670136
	},
	{
		"lat": 46.388886,
		"lng": -96.670308
	},
	{
		"lat": 46.388972,
		"lng": -96.670474
	},
	{
		"lat": 46.38902,
		"lng": -96.670613
	},
	{
		"lat": 46.389046,
		"lng": -96.670709
	},
	{
		"lat": 46.389075,
		"lng": -96.670738
	},
	{
		"lat": 46.389234,
		"lng": -96.670859
	},
	{
		"lat": 46.389295,
		"lng": -96.670915
	},
	{
		"lat": 46.389424,
		"lng": -96.671003
	},
	{
		"lat": 46.389458,
		"lng": -96.671019
	},
	{
		"lat": 46.389494,
		"lng": -96.671027
	},
	{
		"lat": 46.389602,
		"lng": -96.671024
	},
	{
		"lat": 46.389745,
		"lng": -96.670997
	},
	{
		"lat": 46.389779,
		"lng": -96.67098
	},
	{
		"lat": 46.389839,
		"lng": -96.670923
	},
	{
		"lat": 46.389918,
		"lng": -96.670816
	},
	{
		"lat": 46.389964,
		"lng": -96.670738
	},
	{
		"lat": 46.389982,
		"lng": -96.670693
	},
	{
		"lat": 46.390002,
		"lng": -96.670593
	},
	{
		"lat": 46.39001,
		"lng": -96.670491
	},
	{
		"lat": 46.390016,
		"lng": -96.670336
	},
	{
		"lat": 46.390003,
		"lng": -96.670129
	},
	{
		"lat": 46.389981,
		"lng": -96.670031
	},
	{
		"lat": 46.389904,
		"lng": -96.669525
	},
	{
		"lat": 46.389875,
		"lng": -96.669224
	},
	{
		"lat": 46.38987,
		"lng": -96.669166
	},
	{
		"lat": 46.389866,
		"lng": -96.668855
	},
	{
		"lat": 46.389886,
		"lng": -96.668338
	},
	{
		"lat": 46.389903,
		"lng": -96.668238
	},
	{
		"lat": 46.389942,
		"lng": -96.668094
	},
	{
		"lat": 46.389981,
		"lng": -96.668007
	},
	{
		"lat": 46.390078,
		"lng": -96.667854
	},
	{
		"lat": 46.390213,
		"lng": -96.667683
	},
	{
		"lat": 46.390243,
		"lng": -96.667654
	},
	{
		"lat": 46.390374,
		"lng": -96.667567
	},
	{
		"lat": 46.390514,
		"lng": -96.667516
	},
	{
		"lat": 46.390585,
		"lng": -96.667504
	},
	{
		"lat": 46.390729,
		"lng": -96.667501
	},
	{
		"lat": 46.390873,
		"lng": -96.667519
	},
	{
		"lat": 46.390908,
		"lng": -96.667528
	},
	{
		"lat": 46.391046,
		"lng": -96.667588
	},
	{
		"lat": 46.391114,
		"lng": -96.667624
	},
	{
		"lat": 46.391244,
		"lng": -96.667709
	},
	{
		"lat": 46.391339,
		"lng": -96.667785
	},
	{
		"lat": 46.391448,
		"lng": -96.667919
	},
	{
		"lat": 46.391495,
		"lng": -96.667998
	},
	{
		"lat": 46.391536,
		"lng": -96.668083
	},
	{
		"lat": 46.391584,
		"lng": -96.668222
	},
	{
		"lat": 46.391624,
		"lng": -96.668381
	},
	{
		"lat": 46.391641,
		"lng": -96.668535
	},
	{
		"lat": 46.39165,
		"lng": -96.66869
	},
	{
		"lat": 46.391653,
		"lng": -96.668949
	},
	{
		"lat": 46.391628,
		"lng": -96.669257
	},
	{
		"lat": 46.391607,
		"lng": -96.669409
	},
	{
		"lat": 46.391581,
		"lng": -96.66956
	},
	{
		"lat": 46.391498,
		"lng": -96.669903
	},
	{
		"lat": 46.391417,
		"lng": -96.670191
	},
	{
		"lat": 46.391301,
		"lng": -96.67057
	},
	{
		"lat": 46.391222,
		"lng": -96.670859
	},
	{
		"lat": 46.391205,
		"lng": -96.670905
	},
	{
		"lat": 46.391157,
		"lng": -96.6711
	},
	{
		"lat": 46.39114,
		"lng": -96.671146
	},
	{
		"lat": 46.391092,
		"lng": -96.671341
	},
	{
		"lat": 46.391037,
		"lng": -96.671532
	},
	{
		"lat": 46.390977,
		"lng": -96.671777
	},
	{
		"lat": 46.390948,
		"lng": -96.671871
	},
	{
		"lat": 46.390819,
		"lng": -96.67241
	},
	{
		"lat": 46.39065,
		"lng": -96.673203
	},
	{
		"lat": 46.390621,
		"lng": -96.673298
	},
	{
		"lat": 46.390573,
		"lng": -96.673563
	},
	{
		"lat": 46.390567,
		"lng": -96.673599
	},
	{
		"lat": 46.390536,
		"lng": -96.673801
	},
	{
		"lat": 46.390528,
		"lng": -96.674163
	},
	{
		"lat": 46.39054,
		"lng": -96.674265
	},
	{
		"lat": 46.390573,
		"lng": -96.674413
	},
	{
		"lat": 46.390637,
		"lng": -96.674597
	},
	{
		"lat": 46.390678,
		"lng": -96.674683
	},
	{
		"lat": 46.390701,
		"lng": -96.674722
	},
	{
		"lat": 46.390905,
		"lng": -96.675016
	},
	{
		"lat": 46.390962,
		"lng": -96.675078
	},
	{
		"lat": 46.39106,
		"lng": -96.675144
	},
	{
		"lat": 46.391196,
		"lng": -96.675208
	},
	{
		"lat": 46.391338,
		"lng": -96.675248
	},
	{
		"lat": 46.39159,
		"lng": -96.67525
	},
	{
		"lat": 46.391698,
		"lng": -96.67524
	},
	{
		"lat": 46.391839,
		"lng": -96.675199
	},
	{
		"lat": 46.391972,
		"lng": -96.675119
	},
	{
		"lat": 46.39213,
		"lng": -96.674996
	},
	{
		"lat": 46.392214,
		"lng": -96.674899
	},
	{
		"lat": 46.392318,
		"lng": -96.674754
	},
	{
		"lat": 46.392708,
		"lng": -96.674145
	},
	{
		"lat": 46.393313,
		"lng": -96.673256
	},
	{
		"lat": 46.393538,
		"lng": -96.672996
	},
	{
		"lat": 46.393655,
		"lng": -96.672875
	},
	{
		"lat": 46.393813,
		"lng": -96.672751
	},
	{
		"lat": 46.394041,
		"lng": -96.672596
	},
	{
		"lat": 46.394174,
		"lng": -96.672515
	},
	{
		"lat": 46.394348,
		"lng": -96.672451
	},
	{
		"lat": 46.394563,
		"lng": -96.672414
	},
	{
		"lat": 46.394635,
		"lng": -96.672409
	},
	{
		"lat": 46.395031,
		"lng": -96.672431
	},
	{
		"lat": 46.395102,
		"lng": -96.67244
	},
	{
		"lat": 46.39528,
		"lng": -96.672486
	},
	{
		"lat": 46.395384,
		"lng": -96.672528
	},
	{
		"lat": 46.395589,
		"lng": -96.672624
	},
	{
		"lat": 46.395964,
		"lng": -96.672913
	},
	{
		"lat": 46.396579,
		"lng": -96.673653
	},
	{
		"lat": 46.396768,
		"lng": -96.673802
	},
	{
		"lat": 46.397063,
		"lng": -96.673921
	},
	{
		"lat": 46.397495,
		"lng": -96.674119
	},
	{
		"lat": 46.397762,
		"lng": -96.674275
	},
	{
		"lat": 46.397958,
		"lng": -96.674402
	},
	{
		"lat": 46.398052,
		"lng": -96.67448
	},
	{
		"lat": 46.398142,
		"lng": -96.674565
	},
	{
		"lat": 46.398227,
		"lng": -96.674661
	},
	{
		"lat": 46.398258,
		"lng": -96.674685
	},
	{
		"lat": 46.398359,
		"lng": -96.674741
	},
	{
		"lat": 46.398485,
		"lng": -96.674841
	},
	{
		"lat": 46.398551,
		"lng": -96.674901
	},
	{
		"lat": 46.398577,
		"lng": -96.674924
	},
	{
		"lat": 46.398747,
		"lng": -96.675113
	},
	{
		"lat": 46.399088,
		"lng": -96.675574
	},
	{
		"lat": 46.399143,
		"lng": -96.67564
	},
	{
		"lat": 46.399373,
		"lng": -96.675889
	},
	{
		"lat": 46.399463,
		"lng": -96.675975
	},
	{
		"lat": 46.399556,
		"lng": -96.676056
	},
	{
		"lat": 46.399688,
		"lng": -96.676139
	},
	{
		"lat": 46.400059,
		"lng": -96.676337
	},
	{
		"lat": 46.400124,
		"lng": -96.676383
	},
	{
		"lat": 46.400358,
		"lng": -96.676518
	},
	{
		"lat": 46.4008,
		"lng": -96.676743
	},
	{
		"lat": 46.40111,
		"lng": -96.676877
	},
	{
		"lat": 46.401564,
		"lng": -96.677042
	},
	{
		"lat": 46.40184,
		"lng": -96.677159
	},
	{
		"lat": 46.402285,
		"lng": -96.677371
	},
	{
		"lat": 46.402766,
		"lng": -96.677591
	},
	{
		"lat": 46.40308,
		"lng": -96.677706
	},
	{
		"lat": 46.403433,
		"lng": -96.677811
	},
	{
		"lat": 46.403607,
		"lng": -96.677873
	},
	{
		"lat": 46.40429,
		"lng": -96.678208
	},
	{
		"lat": 46.404304,
		"lng": -96.678215
	},
	{
		"lat": 46.404492,
		"lng": -96.678319
	},
	{
		"lat": 46.404591,
		"lng": -96.678381
	},
	{
		"lat": 46.404751,
		"lng": -96.678499
	},
	{
		"lat": 46.404818,
		"lng": -96.678537
	},
	{
		"lat": 46.405065,
		"lng": -96.678752
	},
	{
		"lat": 46.40513,
		"lng": -96.678797
	},
	{
		"lat": 46.405414,
		"lng": -96.679019
	},
	{
		"lat": 46.405605,
		"lng": -96.679165
	},
	{
		"lat": 46.405702,
		"lng": -96.679232
	},
	{
		"lat": 46.405924,
		"lng": -96.679404
	},
	{
		"lat": 46.406044,
		"lng": -96.679488
	},
	{
		"lat": 46.406086,
		"lng": -96.679517
	},
	{
		"lat": 46.406371,
		"lng": -96.67974
	},
	{
		"lat": 46.406525,
		"lng": -96.679875
	},
	{
		"lat": 46.40667,
		"lng": -96.680028
	},
	{
		"lat": 46.40673,
		"lng": -96.680085
	},
	{
		"lat": 46.406785,
		"lng": -96.680152
	},
	{
		"lat": 46.406871,
		"lng": -96.680246
	},
	{
		"lat": 46.40698,
		"lng": -96.680383
	},
	{
		"lat": 46.40708,
		"lng": -96.680473
	},
	{
		"lat": 46.407108,
		"lng": -96.680505
	},
	{
		"lat": 46.407285,
		"lng": -96.680764
	},
	{
		"lat": 46.40745,
		"lng": -96.681038
	},
	{
		"lat": 46.407468,
		"lng": -96.681083
	},
	{
		"lat": 46.407538,
		"lng": -96.681322
	},
	{
		"lat": 46.407562,
		"lng": -96.681473
	},
	{
		"lat": 46.40758,
		"lng": -96.681731
	},
	{
		"lat": 46.407556,
		"lng": -96.682092
	},
	{
		"lat": 46.407544,
		"lng": -96.682194
	},
	{
		"lat": 46.407515,
		"lng": -96.682344
	},
	{
		"lat": 46.407479,
		"lng": -96.68249
	},
	{
		"lat": 46.407462,
		"lng": -96.682536
	},
	{
		"lat": 46.407438,
		"lng": -96.682633
	},
	{
		"lat": 46.407391,
		"lng": -96.682773
	},
	{
		"lat": 46.407269,
		"lng": -96.683089
	},
	{
		"lat": 46.407229,
		"lng": -96.683175
	},
	{
		"lat": 46.407214,
		"lng": -96.683222
	},
	{
		"lat": 46.407142,
		"lng": -96.683401
	},
	{
		"lat": 46.406969,
		"lng": -96.683795
	},
	{
		"lat": 46.406748,
		"lng": -96.684268
	},
	{
		"lat": 46.40662,
		"lng": -96.68452
	},
	{
		"lat": 46.406467,
		"lng": -96.684807
	},
	{
		"lat": 46.406308,
		"lng": -96.685133
	},
	{
		"lat": 46.406137,
		"lng": -96.685488
	},
	{
		"lat": 46.40606,
		"lng": -96.685662
	},
	{
		"lat": 46.406048,
		"lng": -96.685712
	},
	{
		"lat": 46.406031,
		"lng": -96.685757
	},
	{
		"lat": 46.405988,
		"lng": -96.68584
	},
	{
		"lat": 46.405953,
		"lng": -96.685931
	},
	{
		"lat": 46.405913,
		"lng": -96.686017
	},
	{
		"lat": 46.405883,
		"lng": -96.686111
	},
	{
		"lat": 46.405863,
		"lng": -96.686154
	},
	{
		"lat": 46.405785,
		"lng": -96.686387
	},
	{
		"lat": 46.405728,
		"lng": -96.686576
	},
	{
		"lat": 46.40569,
		"lng": -96.686722
	},
	{
		"lat": 46.405646,
		"lng": -96.686919
	},
	{
		"lat": 46.405602,
		"lng": -96.687165
	},
	{
		"lat": 46.405569,
		"lng": -96.68738
	},
	{
		"lat": 46.405564,
		"lng": -96.687484
	},
	{
		"lat": 46.405575,
		"lng": -96.687638
	},
	{
		"lat": 46.405601,
		"lng": -96.687789
	},
	{
		"lat": 46.405646,
		"lng": -96.687931
	},
	{
		"lat": 46.405655,
		"lng": -96.687981
	},
	{
		"lat": 46.40571,
		"lng": -96.688122
	},
	{
		"lat": 46.405758,
		"lng": -96.688199
	},
	{
		"lat": 46.405836,
		"lng": -96.688307
	},
	{
		"lat": 46.406009,
		"lng": -96.688491
	},
	{
		"lat": 46.406036,
		"lng": -96.688526
	},
	{
		"lat": 46.406131,
		"lng": -96.6886
	},
	{
		"lat": 46.406196,
		"lng": -96.688641
	},
	{
		"lat": 46.406286,
		"lng": -96.688727
	},
	{
		"lat": 46.406415,
		"lng": -96.688819
	},
	{
		"lat": 46.406508,
		"lng": -96.688898
	},
	{
		"lat": 46.406572,
		"lng": -96.688944
	},
	{
		"lat": 46.406605,
		"lng": -96.688962
	},
	{
		"lat": 46.406634,
		"lng": -96.688994
	},
	{
		"lat": 46.406764,
		"lng": -96.689071
	},
	{
		"lat": 46.406834,
		"lng": -96.689113
	},
	{
		"lat": 46.407006,
		"lng": -96.689187
	},
	{
		"lat": 46.407143,
		"lng": -96.689253
	},
	{
		"lat": 46.407213,
		"lng": -96.689278
	},
	{
		"lat": 46.407427,
		"lng": -96.689318
	},
	{
		"lat": 46.40757,
		"lng": -96.689337
	},
	{
		"lat": 46.408218,
		"lng": -96.689391
	},
	{
		"lat": 46.408326,
		"lng": -96.68941
	},
	{
		"lat": 46.408468,
		"lng": -96.689444
	},
	{
		"lat": 46.40871,
		"lng": -96.689545
	},
	{
		"lat": 46.408842,
		"lng": -96.689627
	},
	{
		"lat": 46.408944,
		"lng": -96.689678
	},
	{
		"lat": 46.409041,
		"lng": -96.689747
	},
	{
		"lat": 46.409246,
		"lng": -96.689846
	},
	{
		"lat": 46.409387,
		"lng": -96.689889
	},
	{
		"lat": 46.409494,
		"lng": -96.689907
	},
	{
		"lat": 46.409602,
		"lng": -96.689903
	},
	{
		"lat": 46.409638,
		"lng": -96.689897
	},
	{
		"lat": 46.409672,
		"lng": -96.689881
	},
	{
		"lat": 46.409834,
		"lng": -96.689767
	},
	{
		"lat": 46.409952,
		"lng": -96.689649
	},
	{
		"lat": 46.410007,
		"lng": -96.689582
	},
	{
		"lat": 46.410162,
		"lng": -96.689365
	},
	{
		"lat": 46.410255,
		"lng": -96.689208
	},
	{
		"lat": 46.410404,
		"lng": -96.688914
	},
	{
		"lat": 46.410679,
		"lng": -96.688306
	},
	{
		"lat": 46.410787,
		"lng": -96.6881
	},
	{
		"lat": 46.410803,
		"lng": -96.688053
	},
	{
		"lat": 46.410918,
		"lng": -96.68779
	},
	{
		"lat": 46.411003,
		"lng": -96.687622
	},
	{
		"lat": 46.411113,
		"lng": -96.687355
	},
	{
		"lat": 46.41133,
		"lng": -96.686878
	},
	{
		"lat": 46.411438,
		"lng": -96.686671
	},
	{
		"lat": 46.411611,
		"lng": -96.686278
	},
	{
		"lat": 46.411624,
		"lng": -96.686245
	},
	{
		"lat": 46.411666,
		"lng": -96.686143
	},
	{
		"lat": 46.411753,
		"lng": -96.685979
	},
	{
		"lat": 46.411793,
		"lng": -96.685892
	},
	{
		"lat": 46.411862,
		"lng": -96.685773
	},
	{
		"lat": 46.411899,
		"lng": -96.685683
	},
	{
		"lat": 46.411993,
		"lng": -96.685526
	},
	{
		"lat": 46.412029,
		"lng": -96.685436
	},
	{
		"lat": 46.412096,
		"lng": -96.685315
	},
	{
		"lat": 46.412171,
		"lng": -96.685202
	},
	{
		"lat": 46.412252,
		"lng": -96.6851
	},
	{
		"lat": 46.412364,
		"lng": -96.68497
	},
	{
		"lat": 46.412394,
		"lng": -96.684941
	},
	{
		"lat": 46.412495,
		"lng": -96.684885
	},
	{
		"lat": 46.412632,
		"lng": -96.684824
	},
	{
		"lat": 46.412704,
		"lng": -96.684812
	},
	{
		"lat": 46.412884,
		"lng": -96.684803
	},
	{
		"lat": 46.4131,
		"lng": -96.684816
	},
	{
		"lat": 46.413243,
		"lng": -96.684833
	},
	{
		"lat": 46.413254,
		"lng": -96.684835
	},
	{
		"lat": 46.413386,
		"lng": -96.68486
	},
	{
		"lat": 46.413594,
		"lng": -96.684943
	},
	{
		"lat": 46.41373,
		"lng": -96.685011
	},
	{
		"lat": 46.413864,
		"lng": -96.685087
	},
	{
		"lat": 46.413928,
		"lng": -96.685134
	},
	{
		"lat": 46.413994,
		"lng": -96.685173
	},
	{
		"lat": 46.414179,
		"lng": -96.685332
	},
	{
		"lat": 46.414212,
		"lng": -96.685355
	},
	{
		"lat": 46.414241,
		"lng": -96.685386
	},
	{
		"lat": 46.414291,
		"lng": -96.68546
	},
	{
		"lat": 46.414408,
		"lng": -96.685656
	},
	{
		"lat": 46.41444,
		"lng": -96.685731
	},
	{
		"lat": 46.414488,
		"lng": -96.68587
	},
	{
		"lat": 46.41457,
		"lng": -96.686211
	},
	{
		"lat": 46.41459,
		"lng": -96.686416
	},
	{
		"lat": 46.414596,
		"lng": -96.686675
	},
	{
		"lat": 46.414572,
		"lng": -96.687088
	},
	{
		"lat": 46.414561,
		"lng": -96.68719
	},
	{
		"lat": 46.41453,
		"lng": -96.687392
	},
	{
		"lat": 46.414475,
		"lng": -96.687582
	},
	{
		"lat": 46.414433,
		"lng": -96.68778
	},
	{
		"lat": 46.414406,
		"lng": -96.68793
	},
	{
		"lat": 46.414396,
		"lng": -96.688032
	},
	{
		"lat": 46.414391,
		"lng": -96.688109
	},
	{
		"lat": 46.414382,
		"lng": -96.688291
	},
	{
		"lat": 46.414357,
		"lng": -96.688652
	},
	{
		"lat": 46.414341,
		"lng": -96.68948
	},
	{
		"lat": 46.414329,
		"lng": -96.689738
	},
	{
		"lat": 46.414229,
		"lng": -96.691391
	},
	{
		"lat": 46.414204,
		"lng": -96.691595
	},
	{
		"lat": 46.414141,
		"lng": -96.691999
	},
	{
		"lat": 46.414095,
		"lng": -96.692249
	},
	{
		"lat": 46.414053,
		"lng": -96.692447
	},
	{
		"lat": 46.413988,
		"lng": -96.692688
	},
	{
		"lat": 46.413938,
		"lng": -96.692826
	},
	{
		"lat": 46.413909,
		"lng": -96.69292
	},
	{
		"lat": 46.413853,
		"lng": -96.693051
	},
	{
		"lat": 46.413824,
		"lng": -96.693146
	},
	{
		"lat": 46.413561,
		"lng": -96.693881
	},
	{
		"lat": 46.413481,
		"lng": -96.694053
	},
	{
		"lat": 46.413391,
		"lng": -96.694276
	},
	{
		"lat": 46.413053,
		"lng": -96.69501
	},
	{
		"lat": 46.41294,
		"lng": -96.695275
	},
	{
		"lat": 46.412841,
		"lng": -96.695551
	},
	{
		"lat": 46.412795,
		"lng": -96.695691
	},
	{
		"lat": 46.412785,
		"lng": -96.695741
	},
	{
		"lat": 46.41275,
		"lng": -96.695831
	},
	{
		"lat": 46.412707,
		"lng": -96.696029
	},
	{
		"lat": 46.412627,
		"lng": -96.69648
	},
	{
		"lat": 46.412604,
		"lng": -96.696632
	},
	{
		"lat": 46.412573,
		"lng": -96.696887
	},
	{
		"lat": 46.412576,
		"lng": -96.697197
	},
	{
		"lat": 46.412608,
		"lng": -96.69766
	},
	{
		"lat": 46.412623,
		"lng": -96.697814
	},
	{
		"lat": 46.412655,
		"lng": -96.698015
	},
	{
		"lat": 46.412676,
		"lng": -96.698114
	},
	{
		"lat": 46.41272,
		"lng": -96.698256
	},
	{
		"lat": 46.412732,
		"lng": -96.698313
	},
	{
		"lat": 46.412774,
		"lng": -96.698457
	},
	{
		"lat": 46.412809,
		"lng": -96.698547
	},
	{
		"lat": 46.412855,
		"lng": -96.698687
	},
	{
		"lat": 46.412895,
		"lng": -96.698773
	},
	{
		"lat": 46.41293,
		"lng": -96.698863
	},
	{
		"lat": 46.41304,
		"lng": -96.699068
	},
	{
		"lat": 46.413088,
		"lng": -96.699146
	},
	{
		"lat": 46.413359,
		"lng": -96.699537
	},
	{
		"lat": 46.413367,
		"lng": -96.699549
	},
	{
		"lat": 46.413552,
		"lng": -96.699794
	},
	{
		"lat": 46.413718,
		"lng": -96.699993
	},
	{
		"lat": 46.413825,
		"lng": -96.700131
	},
	{
		"lat": 46.413882,
		"lng": -96.700195
	},
	{
		"lat": 46.414018,
		"lng": -96.700365
	},
	{
		"lat": 46.414104,
		"lng": -96.700458
	},
	{
		"lat": 46.414164,
		"lng": -96.700516
	},
	{
		"lat": 46.414219,
		"lng": -96.700584
	},
	{
		"lat": 46.414448,
		"lng": -96.700834
	},
	{
		"lat": 46.41483,
		"lng": -96.701307
	},
	{
		"lat": 46.415002,
		"lng": -96.701496
	},
	{
		"lat": 46.415063,
		"lng": -96.70155
	},
	{
		"lat": 46.41513,
		"lng": -96.70159
	},
	{
		"lat": 46.415224,
		"lng": -96.701666
	},
	{
		"lat": 46.415359,
		"lng": -96.701738
	},
	{
		"lat": 46.415464,
		"lng": -96.701775
	},
	{
		"lat": 46.415606,
		"lng": -96.701814
	},
	{
		"lat": 46.415893,
		"lng": -96.701853
	},
	{
		"lat": 46.416072,
		"lng": -96.701831
	},
	{
		"lat": 46.41614,
		"lng": -96.701798
	},
	{
		"lat": 46.416272,
		"lng": -96.701714
	},
	{
		"lat": 46.41628,
		"lng": -96.701708
	},
	{
		"lat": 46.416335,
		"lng": -96.701665
	},
	{
		"lat": 46.416483,
		"lng": -96.701517
	},
	{
		"lat": 46.41651,
		"lng": -96.701483
	},
	{
		"lat": 46.416661,
		"lng": -96.70126
	},
	{
		"lat": 46.416729,
		"lng": -96.70114
	},
	{
		"lat": 46.416789,
		"lng": -96.701011
	},
	{
		"lat": 46.416856,
		"lng": -96.700828
	},
	{
		"lat": 46.41693,
		"lng": -96.700592
	},
	{
		"lat": 46.417024,
		"lng": -96.7002
	},
	{
		"lat": 46.417062,
		"lng": -96.7
	},
	{
		"lat": 46.417085,
		"lng": -96.699902
	},
	{
		"lat": 46.41713,
		"lng": -96.699652
	},
	{
		"lat": 46.41715,
		"lng": -96.699395
	},
	{
		"lat": 46.417183,
		"lng": -96.699193
	},
	{
		"lat": 46.417214,
		"lng": -96.698938
	},
	{
		"lat": 46.417234,
		"lng": -96.698525
	},
	{
		"lat": 46.417223,
		"lng": -96.697594
	},
	{
		"lat": 46.417202,
		"lng": -96.697388
	},
	{
		"lat": 46.417166,
		"lng": -96.697188
	},
	{
		"lat": 46.417122,
		"lng": -96.69699
	},
	{
		"lat": 46.417094,
		"lng": -96.696896
	},
	{
		"lat": 46.41703,
		"lng": -96.696711
	},
	{
		"lat": 46.416941,
		"lng": -96.696486
	},
	{
		"lat": 46.416686,
		"lng": -96.695923
	},
	{
		"lat": 46.416574,
		"lng": -96.695721
	},
	{
		"lat": 46.416426,
		"lng": -96.695494
	},
	{
		"lat": 46.416324,
		"lng": -96.695348
	},
	{
		"lat": 46.415866,
		"lng": -96.694731
	},
	{
		"lat": 46.415824,
		"lng": -96.694674
	},
	{
		"lat": 46.415748,
		"lng": -96.694565
	},
	{
		"lat": 46.415627,
		"lng": -96.694373
	},
	{
		"lat": 46.415606,
		"lng": -96.694331
	},
	{
		"lat": 46.415559,
		"lng": -96.694191
	},
	{
		"lat": 46.415507,
		"lng": -96.693991
	},
	{
		"lat": 46.4155,
		"lng": -96.693941
	},
	{
		"lat": 46.415485,
		"lng": -96.693631
	},
	{
		"lat": 46.415555,
		"lng": -96.693178
	},
	{
		"lat": 46.415582,
		"lng": -96.693082
	},
	{
		"lat": 46.4156,
		"lng": -96.693037
	},
	{
		"lat": 46.415701,
		"lng": -96.692825
	},
	{
		"lat": 46.415817,
		"lng": -96.692627
	},
	{
		"lat": 46.415893,
		"lng": -96.692518
	},
	{
		"lat": 46.416111,
		"lng": -96.692248
	},
	{
		"lat": 46.4162,
		"lng": -96.692158
	},
	{
		"lat": 46.416361,
		"lng": -96.692044
	},
	{
		"lat": 46.416498,
		"lng": -96.691979
	},
	{
		"lat": 46.416568,
		"lng": -96.691957
	},
	{
		"lat": 46.416712,
		"lng": -96.691949
	},
	{
		"lat": 46.416855,
		"lng": -96.69195
	},
	{
		"lat": 46.417142,
		"lng": -96.691984
	},
	{
		"lat": 46.417455,
		"lng": -96.692099
	},
	{
		"lat": 46.417523,
		"lng": -96.69213
	},
	{
		"lat": 46.417697,
		"lng": -96.692197
	},
	{
		"lat": 46.417762,
		"lng": -96.69224
	},
	{
		"lat": 46.417797,
		"lng": -96.692253
	},
	{
		"lat": 46.417961,
		"lng": -96.692357
	},
	{
		"lat": 46.418099,
		"lng": -96.692415
	},
	{
		"lat": 46.418164,
		"lng": -96.69246
	},
	{
		"lat": 46.418231,
		"lng": -96.692498
	},
	{
		"lat": 46.418296,
		"lng": -96.692542
	},
	{
		"lat": 46.418531,
		"lng": -96.692672
	},
	{
		"lat": 46.418661,
		"lng": -96.692761
	},
	{
		"lat": 46.418729,
		"lng": -96.692795
	},
	{
		"lat": 46.418861,
		"lng": -96.692877
	},
	{
		"lat": 46.418997,
		"lng": -96.692945
	},
	{
		"lat": 46.419172,
		"lng": -96.69301
	},
	{
		"lat": 46.419313,
		"lng": -96.69305
	},
	{
		"lat": 46.419635,
		"lng": -96.693103
	},
	{
		"lat": 46.419743,
		"lng": -96.693102
	},
	{
		"lat": 46.420029,
		"lng": -96.693058
	},
	{
		"lat": 46.420315,
		"lng": -96.693002
	},
	{
		"lat": 46.420385,
		"lng": -96.692978
	},
	{
		"lat": 46.420416,
		"lng": -96.692951
	},
	{
		"lat": 46.42045,
		"lng": -96.692935
	},
	{
		"lat": 46.420556,
		"lng": -96.692907
	},
	{
		"lat": 46.420624,
		"lng": -96.692874
	},
	{
		"lat": 46.420731,
		"lng": -96.692846
	},
	{
		"lat": 46.420874,
		"lng": -96.692823
	},
	{
		"lat": 46.421051,
		"lng": -96.692774
	},
	{
		"lat": 46.421154,
		"lng": -96.692729
	},
	{
		"lat": 46.421226,
		"lng": -96.692717
	},
	{
		"lat": 46.421296,
		"lng": -96.692693
	},
	{
		"lat": 46.421511,
		"lng": -96.692667
	},
	{
		"lat": 46.421583,
		"lng": -96.692664
	},
	{
		"lat": 46.421655,
		"lng": -96.692676
	},
	{
		"lat": 46.421689,
		"lng": -96.692691
	},
	{
		"lat": 46.421755,
		"lng": -96.692732
	},
	{
		"lat": 46.42179,
		"lng": -96.692746
	},
	{
		"lat": 46.421851,
		"lng": -96.692801
	},
	{
		"lat": 46.421879,
		"lng": -96.692834
	},
	{
		"lat": 46.421952,
		"lng": -96.692948
	},
	{
		"lat": 46.422012,
		"lng": -96.693077
	},
	{
		"lat": 46.422059,
		"lng": -96.693217
	},
	{
		"lat": 46.422085,
		"lng": -96.693313
	},
	{
		"lat": 46.422094,
		"lng": -96.693363
	},
	{
		"lat": 46.422105,
		"lng": -96.693465
	},
	{
		"lat": 46.42211,
		"lng": -96.693672
	},
	{
		"lat": 46.422104,
		"lng": -96.693775
	},
	{
		"lat": 46.422081,
		"lng": -96.693927
	},
	{
		"lat": 46.422068,
		"lng": -96.693975
	},
	{
		"lat": 46.422045,
		"lng": -96.694025
	},
	{
		"lat": 46.422033,
		"lng": -96.694075
	},
	{
		"lat": 46.421995,
		"lng": -96.694162
	},
	{
		"lat": 46.421961,
		"lng": -96.694253
	},
	{
		"lat": 46.421899,
		"lng": -96.694381
	},
	{
		"lat": 46.421809,
		"lng": -96.694541
	},
	{
		"lat": 46.421732,
		"lng": -96.694651
	},
	{
		"lat": 46.421522,
		"lng": -96.694932
	},
	{
		"lat": 46.421186,
		"lng": -96.695398
	},
	{
		"lat": 46.420912,
		"lng": -96.695811
	},
	{
		"lat": 46.420742,
		"lng": -96.696079
	},
	{
		"lat": 46.420652,
		"lng": -96.696239
	},
	{
		"lat": 46.420411,
		"lng": -96.69669
	},
	{
		"lat": 46.420264,
		"lng": -96.696984
	},
	{
		"lat": 46.420177,
		"lng": -96.697148
	},
	{
		"lat": 46.420054,
		"lng": -96.697403
	},
	{
		"lat": 46.419919,
		"lng": -96.697709
	},
	{
		"lat": 46.419908,
		"lng": -96.697758
	},
	{
		"lat": 46.419859,
		"lng": -96.697896
	},
	{
		"lat": 46.419819,
		"lng": -96.69804
	},
	{
		"lat": 46.419801,
		"lng": -96.698085
	},
	{
		"lat": 46.419738,
		"lng": -96.698382
	},
	{
		"lat": 46.419711,
		"lng": -96.698478
	},
	{
		"lat": 46.419678,
		"lng": -96.69857
	},
	{
		"lat": 46.419656,
		"lng": -96.698668
	},
	{
		"lat": 46.419559,
		"lng": -96.698885
	},
	{
		"lat": 46.419457,
		"lng": -96.699158
	},
	{
		"lat": 46.419282,
		"lng": -96.699551
	},
	{
		"lat": 46.419042,
		"lng": -96.700066
	},
	{
		"lat": 46.418753,
		"lng": -96.700595
	},
	{
		"lat": 46.418476,
		"lng": -96.701071
	},
	{
		"lat": 46.418366,
		"lng": -96.701276
	},
	{
		"lat": 46.418206,
		"lng": -96.701555
	},
	{
		"lat": 46.418075,
		"lng": -96.701802
	},
	{
		"lat": 46.418034,
		"lng": -96.701887
	},
	{
		"lat": 46.417878,
		"lng": -96.702171
	},
	{
		"lat": 46.417656,
		"lng": -96.702642
	},
	{
		"lat": 46.417619,
		"lng": -96.702731
	},
	{
		"lat": 46.417526,
		"lng": -96.703011
	},
	{
		"lat": 46.417487,
		"lng": -96.703155
	},
	{
		"lat": 46.417441,
		"lng": -96.703351
	},
	{
		"lat": 46.417433,
		"lng": -96.703401
	},
	{
		"lat": 46.417419,
		"lng": -96.703556
	},
	{
		"lat": 46.417424,
		"lng": -96.70371
	},
	{
		"lat": 46.417453,
		"lng": -96.70386
	},
	{
		"lat": 46.41748,
		"lng": -96.703957
	},
	{
		"lat": 46.417497,
		"lng": -96.704001
	},
	{
		"lat": 46.417544,
		"lng": -96.70408
	},
	{
		"lat": 46.417695,
		"lng": -96.704301
	},
	{
		"lat": 46.417804,
		"lng": -96.704436
	},
	{
		"lat": 46.417898,
		"lng": -96.704512
	},
	{
		"lat": 46.417995,
		"lng": -96.704581
	},
	{
		"lat": 46.4182,
		"lng": -96.704679
	},
	{
		"lat": 46.418304,
		"lng": -96.704722
	},
	{
		"lat": 46.418444,
		"lng": -96.704769
	},
	{
		"lat": 46.418484,
		"lng": -96.70478
	},
	{
		"lat": 46.418585,
		"lng": -96.704807
	},
	{
		"lat": 46.418728,
		"lng": -96.70483
	},
	{
		"lat": 46.418872,
		"lng": -96.704817
	},
	{
		"lat": 46.419229,
		"lng": -96.704755
	},
	{
		"lat": 46.419404,
		"lng": -96.704695
	},
	{
		"lat": 46.419575,
		"lng": -96.704612
	},
	{
		"lat": 46.419724,
		"lng": -96.704512
	},
	{
		"lat": 46.419883,
		"lng": -96.704391
	},
	{
		"lat": 46.420069,
		"lng": -96.704233
	},
	{
		"lat": 46.420258,
		"lng": -96.704083
	},
	{
		"lat": 46.420316,
		"lng": -96.704023
	},
	{
		"lat": 46.420533,
		"lng": -96.703838
	},
	{
		"lat": 46.420598,
		"lng": -96.703793
	},
	{
		"lat": 46.420657,
		"lng": -96.703735
	},
	{
		"lat": 46.420783,
		"lng": -96.703633
	},
	{
		"lat": 46.421303,
		"lng": -96.703169
	},
	{
		"lat": 46.4214,
		"lng": -96.703101
	},
	{
		"lat": 46.421557,
		"lng": -96.702975
	},
	{
		"lat": 46.421656,
		"lng": -96.702911
	},
	{
		"lat": 46.421717,
		"lng": -96.702858
	},
	{
		"lat": 46.421782,
		"lng": -96.702813
	},
	{
		"lat": 46.421844,
		"lng": -96.702761
	},
	{
		"lat": 46.421912,
		"lng": -96.702726
	},
	{
		"lat": 46.422036,
		"lng": -96.702623
	},
	{
		"lat": 46.422203,
		"lng": -96.702525
	},
	{
		"lat": 46.422475,
		"lng": -96.702391
	},
	{
		"lat": 46.422545,
		"lng": -96.702362
	},
	{
		"lat": 46.42265,
		"lng": -96.702328
	},
	{
		"lat": 46.422752,
		"lng": -96.702282
	},
	{
		"lat": 46.422927,
		"lng": -96.702222
	},
	{
		"lat": 46.423034,
		"lng": -96.702201
	},
	{
		"lat": 46.423104,
		"lng": -96.702176
	},
	{
		"lat": 46.423319,
		"lng": -96.702151
	},
	{
		"lat": 46.423535,
		"lng": -96.70215
	},
	{
		"lat": 46.423679,
		"lng": -96.702163
	},
	{
		"lat": 46.423894,
		"lng": -96.702193
	},
	{
		"lat": 46.424109,
		"lng": -96.702214
	},
	{
		"lat": 46.424217,
		"lng": -96.702219
	},
	{
		"lat": 46.424361,
		"lng": -96.702212
	},
	{
		"lat": 46.424935,
		"lng": -96.702135
	},
	{
		"lat": 46.425078,
		"lng": -96.702108
	},
	{
		"lat": 46.425171,
		"lng": -96.702063
	},
	{
		"lat": 46.42518,
		"lng": -96.702059
	},
	{
		"lat": 46.425246,
		"lng": -96.702018
	},
	{
		"lat": 46.425315,
		"lng": -96.701987
	},
	{
		"lat": 46.425445,
		"lng": -96.701897
	},
	{
		"lat": 46.425508,
		"lng": -96.701847
	},
	{
		"lat": 46.425566,
		"lng": -96.701786
	},
	{
		"lat": 46.425677,
		"lng": -96.701654
	},
	{
		"lat": 46.425754,
		"lng": -96.701546
	},
	{
		"lat": 46.425878,
		"lng": -96.701358
	},
	{
		"lat": 46.425935,
		"lng": -96.701226
	},
	{
		"lat": 46.425983,
		"lng": -96.701087
	},
	{
		"lat": 46.426021,
		"lng": -96.700887
	},
	{
		"lat": 46.426032,
		"lng": -96.700785
	},
	{
		"lat": 46.426048,
		"lng": -96.700527
	},
	{
		"lat": 46.426035,
		"lng": -96.700321
	},
	{
		"lat": 46.426006,
		"lng": -96.700117
	},
	{
		"lat": 46.425963,
		"lng": -96.69992
	},
	{
		"lat": 46.425938,
		"lng": -96.699769
	},
	{
		"lat": 46.425929,
		"lng": -96.699666
	},
	{
		"lat": 46.425923,
		"lng": -96.699511
	},
	{
		"lat": 46.425926,
		"lng": -96.699355
	},
	{
		"lat": 46.425934,
		"lng": -96.699305
	},
	{
		"lat": 46.42601,
		"lng": -96.699129
	},
	{
		"lat": 46.426087,
		"lng": -96.699021
	},
	{
		"lat": 46.426143,
		"lng": -96.698955
	},
	{
		"lat": 46.426174,
		"lng": -96.698929
	},
	{
		"lat": 46.426276,
		"lng": -96.698881
	},
	{
		"lat": 46.426383,
		"lng": -96.698855
	},
	{
		"lat": 46.426491,
		"lng": -96.698854
	},
	{
		"lat": 46.426562,
		"lng": -96.698865
	},
	{
		"lat": 46.426597,
		"lng": -96.698876
	},
	{
		"lat": 46.426666,
		"lng": -96.698908
	},
	{
		"lat": 46.426699,
		"lng": -96.698929
	},
	{
		"lat": 46.426758,
		"lng": -96.698988
	},
	{
		"lat": 46.426785,
		"lng": -96.699023
	},
	{
		"lat": 46.426906,
		"lng": -96.699214
	},
	{
		"lat": 46.426971,
		"lng": -96.699339
	},
	{
		"lat": 46.427063,
		"lng": -96.699561
	},
	{
		"lat": 46.427075,
		"lng": -96.699609
	},
	{
		"lat": 46.427104,
		"lng": -96.699676
	},
	{
		"lat": 46.427131,
		"lng": -96.699772
	},
	{
		"lat": 46.427176,
		"lng": -96.699969
	},
	{
		"lat": 46.427205,
		"lng": -96.700064
	},
	{
		"lat": 46.427241,
		"lng": -96.700357
	},
	{
		"lat": 46.427249,
		"lng": -96.70042
	},
	{
		"lat": 46.427248,
		"lng": -96.700627
	},
	{
		"lat": 46.427231,
		"lng": -96.70104
	},
	{
		"lat": 46.427202,
		"lng": -96.701348
	},
	{
		"lat": 46.427188,
		"lng": -96.701449
	},
	{
		"lat": 46.427131,
		"lng": -96.701748
	},
	{
		"lat": 46.427087,
		"lng": -96.701946
	},
	{
		"lat": 46.427024,
		"lng": -96.702188
	},
	{
		"lat": 46.426968,
		"lng": -96.702379
	},
	{
		"lat": 46.426794,
		"lng": -96.702831
	},
	{
		"lat": 46.426714,
		"lng": -96.703003
	},
	{
		"lat": 46.426681,
		"lng": -96.703094
	},
	{
		"lat": 46.426639,
		"lng": -96.703179
	},
	{
		"lat": 46.426582,
		"lng": -96.70331
	},
	{
		"lat": 46.426331,
		"lng": -96.703815
	},
	{
		"lat": 46.426271,
		"lng": -96.704003
	},
	{
		"lat": 46.426233,
		"lng": -96.704148
	},
	{
		"lat": 46.426226,
		"lng": -96.704199
	},
	{
		"lat": 46.426218,
		"lng": -96.704354
	},
	{
		"lat": 46.426221,
		"lng": -96.704406
	},
	{
		"lat": 46.426229,
		"lng": -96.704456
	},
	{
		"lat": 46.426244,
		"lng": -96.704502
	},
	{
		"lat": 46.426266,
		"lng": -96.704544
	},
	{
		"lat": 46.426316,
		"lng": -96.704618
	},
	{
		"lat": 46.426344,
		"lng": -96.704651
	},
	{
		"lat": 46.426406,
		"lng": -96.704705
	},
	{
		"lat": 46.426472,
		"lng": -96.704745
	},
	{
		"lat": 46.426507,
		"lng": -96.704757
	},
	{
		"lat": 46.426615,
		"lng": -96.704755
	},
	{
		"lat": 46.426722,
		"lng": -96.704743
	},
	{
		"lat": 46.426822,
		"lng": -96.704683
	},
	{
		"lat": 46.426912,
		"lng": -96.704597
	},
	{
		"lat": 46.42709,
		"lng": -96.704341
	},
	{
		"lat": 46.427159,
		"lng": -96.704222
	},
	{
		"lat": 46.427271,
		"lng": -96.703957
	},
	{
		"lat": 46.427305,
		"lng": -96.703866
	},
	{
		"lat": 46.427399,
		"lng": -96.703645
	},
	{
		"lat": 46.4275,
		"lng": -96.703372
	},
	{
		"lat": 46.427538,
		"lng": -96.703283
	},
	{
		"lat": 46.427666,
		"lng": -96.702914
	},
	{
		"lat": 46.427702,
		"lng": -96.702824
	},
	{
		"lat": 46.427747,
		"lng": -96.702744
	},
	{
		"lat": 46.427761,
		"lng": -96.702696
	},
	{
		"lat": 46.427781,
		"lng": -96.702653
	},
	{
		"lat": 46.42785,
		"lng": -96.702535
	},
	{
		"lat": 46.427935,
		"lng": -96.702368
	},
	{
		"lat": 46.427983,
		"lng": -96.702292
	},
	{
		"lat": 46.428051,
		"lng": -96.702172
	},
	{
		"lat": 46.428175,
		"lng": -96.701987
	},
	{
		"lat": 46.42836,
		"lng": -96.701742
	},
	{
		"lat": 46.42853,
		"lng": -96.70155
	},
	{
		"lat": 46.428588,
		"lng": -96.70149
	},
	{
		"lat": 46.428802,
		"lng": -96.7013
	},
	{
		"lat": 46.42895,
		"lng": -96.701154
	},
	{
		"lat": 46.429043,
		"lng": -96.701075
	},
	{
		"lat": 46.42914,
		"lng": -96.701007
	},
	{
		"lat": 46.42923,
		"lng": -96.700922
	},
	{
		"lat": 46.429293,
		"lng": -96.700874
	},
	{
		"lat": 46.429398,
		"lng": -96.700838
	},
	{
		"lat": 46.4295,
		"lng": -96.700786
	},
	{
		"lat": 46.42957,
		"lng": -96.700764
	},
	{
		"lat": 46.429642,
		"lng": -96.700755
	},
	{
		"lat": 46.429714,
		"lng": -96.700753
	},
	{
		"lat": 46.429856,
		"lng": -96.700785
	},
	{
		"lat": 46.429925,
		"lng": -96.700816
	},
	{
		"lat": 46.43002,
		"lng": -96.700889
	},
	{
		"lat": 46.43005,
		"lng": -96.700918
	},
	{
		"lat": 46.430177,
		"lng": -96.701101
	},
	{
		"lat": 46.430199,
		"lng": -96.701142
	},
	{
		"lat": 46.430236,
		"lng": -96.701231
	},
	{
		"lat": 46.430284,
		"lng": -96.70137
	},
	{
		"lat": 46.43031,
		"lng": -96.701466
	},
	{
		"lat": 46.430324,
		"lng": -96.701567
	},
	{
		"lat": 46.430332,
		"lng": -96.701826
	},
	{
		"lat": 46.430321,
		"lng": -96.702136
	},
	{
		"lat": 46.430313,
		"lng": -96.702238
	},
	{
		"lat": 46.430298,
		"lng": -96.70234
	},
	{
		"lat": 46.43027,
		"lng": -96.702489
	},
	{
		"lat": 46.430236,
		"lng": -96.702636
	},
	{
		"lat": 46.430219,
		"lng": -96.702682
	},
	{
		"lat": 46.430177,
		"lng": -96.702832
	},
	{
		"lat": 46.430126,
		"lng": -96.702969
	},
	{
		"lat": 46.429852,
		"lng": -96.703382
	},
	{
		"lat": 46.429646,
		"lng": -96.70367
	},
	{
		"lat": 46.429462,
		"lng": -96.703917
	},
	{
		"lat": 46.429262,
		"lng": -96.704215
	},
	{
		"lat": 46.429131,
		"lng": -96.704461
	},
	{
		"lat": 46.42903,
		"lng": -96.704676
	},
	{
		"lat": 46.429014,
		"lng": -96.704722
	},
	{
		"lat": 46.428993,
		"lng": -96.704765
	},
	{
		"lat": 46.428976,
		"lng": -96.704811
	},
	{
		"lat": 46.428935,
		"lng": -96.704954
	},
	{
		"lat": 46.428901,
		"lng": -96.705101
	},
	{
		"lat": 46.428853,
		"lng": -96.705351
	},
	{
		"lat": 46.428814,
		"lng": -96.705709
	},
	{
		"lat": 46.428811,
		"lng": -96.705968
	},
	{
		"lat": 46.428813,
		"lng": -96.706071
	},
	{
		"lat": 46.428842,
		"lng": -96.706327
	},
	{
		"lat": 46.428882,
		"lng": -96.706471
	},
	{
		"lat": 46.428975,
		"lng": -96.706751
	},
	{
		"lat": 46.429082,
		"lng": -96.706926
	},
	{
		"lat": 46.429094,
		"lng": -96.706946
	},
	{
		"lat": 46.429271,
		"lng": -96.707204
	},
	{
		"lat": 46.429375,
		"lng": -96.707347
	},
	{
		"lat": 46.429492,
		"lng": -96.707468
	},
	{
		"lat": 46.429553,
		"lng": -96.707522
	},
	{
		"lat": 46.42965,
		"lng": -96.707592
	},
	{
		"lat": 46.429787,
		"lng": -96.707655
	},
	{
		"lat": 46.429927,
		"lng": -96.707698
	},
	{
		"lat": 46.430212,
		"lng": -96.70776
	},
	{
		"lat": 46.430356,
		"lng": -96.707757
	},
	{
		"lat": 46.430607,
		"lng": -96.707734
	},
	{
		"lat": 46.430714,
		"lng": -96.707715
	},
	{
		"lat": 46.430963,
		"lng": -96.707655
	},
	{
		"lat": 46.430998,
		"lng": -96.707642
	},
	{
		"lat": 46.431031,
		"lng": -96.707623
	},
	{
		"lat": 46.431101,
		"lng": -96.707599
	},
	{
		"lat": 46.431203,
		"lng": -96.707547
	},
	{
		"lat": 46.431413,
		"lng": -96.707477
	},
	{
		"lat": 46.431514,
		"lng": -96.707424
	},
	{
		"lat": 46.43158,
		"lng": -96.707381
	},
	{
		"lat": 46.431648,
		"lng": -96.707347
	},
	{
		"lat": 46.431748,
		"lng": -96.707288
	},
	{
		"lat": 46.431843,
		"lng": -96.707215
	},
	{
		"lat": 46.432102,
		"lng": -96.707037
	},
	{
		"lat": 46.432407,
		"lng": -96.706761
	},
	{
		"lat": 46.43252,
		"lng": -96.706633
	},
	{
		"lat": 46.432649,
		"lng": -96.706452
	},
	{
		"lat": 46.432773,
		"lng": -96.706264
	},
	{
		"lat": 46.432965,
		"lng": -96.705955
	},
	{
		"lat": 46.433051,
		"lng": -96.705789
	},
	{
		"lat": 46.433147,
		"lng": -96.705569
	},
	{
		"lat": 46.433208,
		"lng": -96.705441
	},
	{
		"lat": 46.433245,
		"lng": -96.705352
	},
	{
		"lat": 46.433278,
		"lng": -96.705291
	},
	{
		"lat": 46.433443,
		"lng": -96.704984
	},
	{
		"lat": 46.433635,
		"lng": -96.704676
	},
	{
		"lat": 46.4338,
		"lng": -96.704476
	},
	{
		"lat": 46.433896,
		"lng": -96.704406
	},
	{
		"lat": 46.434032,
		"lng": -96.704339
	},
	{
		"lat": 46.434318,
		"lng": -96.704291
	},
	{
		"lat": 46.434426,
		"lng": -96.704287
	},
	{
		"lat": 46.434642,
		"lng": -96.704303
	},
	{
		"lat": 46.434723,
		"lng": -96.704352
	},
	{
		"lat": 46.434791,
		"lng": -96.704386
	},
	{
		"lat": 46.434861,
		"lng": -96.704412
	},
	{
		"lat": 46.434897,
		"lng": -96.70442
	},
	{
		"lat": 46.435077,
		"lng": -96.704419
	},
	{
		"lat": 46.435184,
		"lng": -96.704396
	},
	{
		"lat": 46.435315,
		"lng": -96.704311
	},
	{
		"lat": 46.43562,
		"lng": -96.704151
	},
	{
		"lat": 46.435652,
		"lng": -96.70413
	},
	{
		"lat": 46.435681,
		"lng": -96.7041
	},
	{
		"lat": 46.435836,
		"lng": -96.703966
	},
	{
		"lat": 46.435948,
		"lng": -96.703836
	},
	{
		"lat": 46.436241,
		"lng": -96.703534
	},
	{
		"lat": 46.436472,
		"lng": -96.703288
	},
	{
		"lat": 46.436566,
		"lng": -96.703209
	},
	{
		"lat": 46.436704,
		"lng": -96.703149
	},
	{
		"lat": 46.436774,
		"lng": -96.703127
	},
	{
		"lat": 46.436846,
		"lng": -96.703119
	},
	{
		"lat": 46.436918,
		"lng": -96.70312
	},
	{
		"lat": 46.437062,
		"lng": -96.703134
	},
	{
		"lat": 46.437232,
		"lng": -96.703218
	},
	{
		"lat": 46.437295,
		"lng": -96.703269
	},
	{
		"lat": 46.437374,
		"lng": -96.703375
	},
	{
		"lat": 46.437447,
		"lng": -96.703489
	},
	{
		"lat": 46.437524,
		"lng": -96.703665
	},
	{
		"lat": 46.437602,
		"lng": -96.703899
	},
	{
		"lat": 46.437675,
		"lng": -96.704013
	},
	{
		"lat": 46.437897,
		"lng": -96.704278
	},
	{
		"lat": 46.438097,
		"lng": -96.7045
	},
	{
		"lat": 46.438178,
		"lng": -96.704603
	},
	{
		"lat": 46.438198,
		"lng": -96.704646
	},
	{
		"lat": 46.438231,
		"lng": -96.704738
	},
	{
		"lat": 46.438245,
		"lng": -96.704839
	},
	{
		"lat": 46.438246,
		"lng": -96.704942
	},
	{
		"lat": 46.438234,
		"lng": -96.704991
	},
	{
		"lat": 46.438199,
		"lng": -96.705082
	},
	{
		"lat": 46.438178,
		"lng": -96.705123
	},
	{
		"lat": 46.438129,
		"lng": -96.705199
	},
	{
		"lat": 46.438048,
		"lng": -96.705301
	},
	{
		"lat": 46.437888,
		"lng": -96.705418
	},
	{
		"lat": 46.437755,
		"lng": -96.705494
	},
	{
		"lat": 46.437719,
		"lng": -96.705504
	},
	{
		"lat": 46.437651,
		"lng": -96.705534
	},
	{
		"lat": 46.437618,
		"lng": -96.705556
	},
	{
		"lat": 46.437557,
		"lng": -96.705611
	},
	{
		"lat": 46.437399,
		"lng": -96.705735
	},
	{
		"lat": 46.437301,
		"lng": -96.705797
	},
	{
		"lat": 46.437166,
		"lng": -96.705873
	},
	{
		"lat": 46.437111,
		"lng": -96.705918
	},
	{
		"lat": 46.437104,
		"lng": -96.705925
	},
	{
		"lat": 46.437039,
		"lng": -96.705968
	},
	{
		"lat": 46.437009,
		"lng": -96.705997
	},
	{
		"lat": 46.436843,
		"lng": -96.706195
	},
	{
		"lat": 46.436631,
		"lng": -96.706477
	},
	{
		"lat": 46.43648,
		"lng": -96.706698
	},
	{
		"lat": 46.436433,
		"lng": -96.706777
	},
	{
		"lat": 46.436261,
		"lng": -96.707041
	},
	{
		"lat": 46.436149,
		"lng": -96.707244
	},
	{
		"lat": 46.436043,
		"lng": -96.707453
	},
	{
		"lat": 46.435903,
		"lng": -96.707754
	},
	{
		"lat": 46.43585,
		"lng": -96.707946
	},
	{
		"lat": 46.435783,
		"lng": -96.708242
	},
	{
		"lat": 46.435764,
		"lng": -96.708342
	},
	{
		"lat": 46.435736,
		"lng": -96.708546
	},
	{
		"lat": 46.435665,
		"lng": -96.709211
	},
	{
		"lat": 46.435628,
		"lng": -96.709622
	},
	{
		"lat": 46.435608,
		"lng": -96.710242
	},
	{
		"lat": 46.435605,
		"lng": -96.71045
	},
	{
		"lat": 46.435625,
		"lng": -96.71107
	},
	{
		"lat": 46.435649,
		"lng": -96.71143
	},
	{
		"lat": 46.435689,
		"lng": -96.711629
	},
	{
		"lat": 46.435728,
		"lng": -96.711774
	},
	{
		"lat": 46.435819,
		"lng": -96.711934
	},
	{
		"lat": 46.435947,
		"lng": -96.712117
	},
	{
		"lat": 46.436003,
		"lng": -96.712182
	},
	{
		"lat": 46.436062,
		"lng": -96.71224
	},
	{
		"lat": 46.436094,
		"lng": -96.712264
	},
	{
		"lat": 46.436163,
		"lng": -96.712294
	},
	{
		"lat": 46.436269,
		"lng": -96.712318
	},
	{
		"lat": 46.436306,
		"lng": -96.712319
	},
	{
		"lat": 46.436446,
		"lng": -96.712367
	},
	{
		"lat": 46.43648,
		"lng": -96.712383
	},
	{
		"lat": 46.436608,
		"lng": -96.712478
	},
	{
		"lat": 46.436704,
		"lng": -96.712485
	},
	{
		"lat": 46.436776,
		"lng": -96.712484
	},
	{
		"lat": 46.436955,
		"lng": -96.712461
	},
	{
		"lat": 46.437383,
		"lng": -96.712376
	},
	{
		"lat": 46.437594,
		"lng": -96.712307
	},
	{
		"lat": 46.437663,
		"lng": -96.71228
	},
	{
		"lat": 46.437699,
		"lng": -96.712273
	},
	{
		"lat": 46.437771,
		"lng": -96.712284
	},
	{
		"lat": 46.4378,
		"lng": -96.712313
	},
	{
		"lat": 46.437826,
		"lng": -96.71235
	},
	{
		"lat": 46.437868,
		"lng": -96.712434
	},
	{
		"lat": 46.437884,
		"lng": -96.71248
	},
	{
		"lat": 46.437896,
		"lng": -96.712529
	},
	{
		"lat": 46.437907,
		"lng": -96.712631
	},
	{
		"lat": 46.437883,
		"lng": -96.712783
	},
	{
		"lat": 46.437816,
		"lng": -96.712966
	},
	{
		"lat": 46.437724,
		"lng": -96.713188
	},
	{
		"lat": 46.437582,
		"lng": -96.713608
	},
	{
		"lat": 46.437569,
		"lng": -96.713657
	},
	{
		"lat": 46.437561,
		"lng": -96.713707
	},
	{
		"lat": 46.437547,
		"lng": -96.713755
	},
	{
		"lat": 46.437492,
		"lng": -96.713889
	},
	{
		"lat": 46.437446,
		"lng": -96.713969
	},
	{
		"lat": 46.437406,
		"lng": -96.714055
	},
	{
		"lat": 46.437225,
		"lng": -96.714308
	},
	{
		"lat": 46.437212,
		"lng": -96.714356
	},
	{
		"lat": 46.437205,
		"lng": -96.714407
	},
	{
		"lat": 46.437199,
		"lng": -96.714562
	},
	{
		"lat": 46.437225,
		"lng": -96.714871
	},
	{
		"lat": 46.437254,
		"lng": -96.715074
	},
	{
		"lat": 46.437264,
		"lng": -96.715176
	},
	{
		"lat": 46.437274,
		"lng": -96.715226
	},
	{
		"lat": 46.437316,
		"lng": -96.71537
	},
	{
		"lat": 46.437326,
		"lng": -96.71542
	},
	{
		"lat": 46.43733,
		"lng": -96.715523
	},
	{
		"lat": 46.437327,
		"lng": -96.715627
	},
	{
		"lat": 46.437318,
		"lng": -96.71573
	},
	{
		"lat": 46.437272,
		"lng": -96.71587
	},
	{
		"lat": 46.437182,
		"lng": -96.716031
	},
	{
		"lat": 46.43713,
		"lng": -96.716103
	},
	{
		"lat": 46.436998,
		"lng": -96.716188
	},
	{
		"lat": 46.43693,
		"lng": -96.716224
	},
	{
		"lat": 46.436859,
		"lng": -96.716225
	},
	{
		"lat": 46.436787,
		"lng": -96.716218
	},
	{
		"lat": 46.436679,
		"lng": -96.716199
	},
	{
		"lat": 46.436649,
		"lng": -96.716176
	},
	{
		"lat": 46.43646,
		"lng": -96.715936
	},
	{
		"lat": 46.436364,
		"lng": -96.715781
	},
	{
		"lat": 46.436296,
		"lng": -96.71566
	},
	{
		"lat": 46.436246,
		"lng": -96.715586
	},
	{
		"lat": 46.436192,
		"lng": -96.715453
	},
	{
		"lat": 46.436149,
		"lng": -96.715311
	},
	{
		"lat": 46.43613,
		"lng": -96.715211
	},
	{
		"lat": 46.436099,
		"lng": -96.715118
	},
	{
		"lat": 46.436079,
		"lng": -96.715074
	},
	{
		"lat": 46.435989,
		"lng": -96.714913
	},
	{
		"lat": 46.435717,
		"lng": -96.714497
	},
	{
		"lat": 46.43546,
		"lng": -96.714134
	},
	{
		"lat": 46.435432,
		"lng": -96.714101
	},
	{
		"lat": 46.435283,
		"lng": -96.713955
	},
	{
		"lat": 46.435124,
		"lng": -96.713836
	},
	{
		"lat": 46.435026,
		"lng": -96.713771
	},
	{
		"lat": 46.434955,
		"lng": -96.71375
	},
	{
		"lat": 46.434775,
		"lng": -96.713742
	},
	{
		"lat": 46.434668,
		"lng": -96.713756
	},
	{
		"lat": 46.434597,
		"lng": -96.713771
	},
	{
		"lat": 46.434562,
		"lng": -96.713784
	},
	{
		"lat": 46.434429,
		"lng": -96.713863
	},
	{
		"lat": 46.434369,
		"lng": -96.71392
	},
	{
		"lat": 46.434335,
		"lng": -96.713935
	},
	{
		"lat": 46.434303,
		"lng": -96.71396
	},
	{
		"lat": 46.434112,
		"lng": -96.714195
	},
	{
		"lat": 46.434022,
		"lng": -96.714357
	},
	{
		"lat": 46.433974,
		"lng": -96.714496
	},
	{
		"lat": 46.433959,
		"lng": -96.714597
	},
	{
		"lat": 46.433946,
		"lng": -96.714751
	},
	{
		"lat": 46.433938,
		"lng": -96.715009
	},
	{
		"lat": 46.43394,
		"lng": -96.715061
	},
	{
		"lat": 46.433977,
		"lng": -96.715418
	},
	{
		"lat": 46.434013,
		"lng": -96.715672
	},
	{
		"lat": 46.434073,
		"lng": -96.715915
	},
	{
		"lat": 46.434101,
		"lng": -96.71601
	},
	{
		"lat": 46.434121,
		"lng": -96.716053
	},
	{
		"lat": 46.434212,
		"lng": -96.716213
	},
	{
		"lat": 46.434363,
		"lng": -96.716436
	},
	{
		"lat": 46.434496,
		"lng": -96.716611
	},
	{
		"lat": 46.434648,
		"lng": -96.71675
	},
	{
		"lat": 46.434743,
		"lng": -96.716824
	},
	{
		"lat": 46.434842,
		"lng": -96.716884
	},
	{
		"lat": 46.435216,
		"lng": -96.71707
	},
	{
		"lat": 46.43532,
		"lng": -96.717116
	},
	{
		"lat": 46.435494,
		"lng": -96.717181
	},
	{
		"lat": 46.435599,
		"lng": -96.717214
	},
	{
		"lat": 46.435918,
		"lng": -96.717298
	},
	{
		"lat": 46.436203,
		"lng": -96.717355
	},
	{
		"lat": 46.436344,
		"lng": -96.717395
	},
	{
		"lat": 46.436416,
		"lng": -96.717407
	},
	{
		"lat": 46.436559,
		"lng": -96.717411
	},
	{
		"lat": 46.436737,
		"lng": -96.717374
	},
	{
		"lat": 46.437017,
		"lng": -96.71727
	},
	{
		"lat": 46.437231,
		"lng": -96.717229
	},
	{
		"lat": 46.437518,
		"lng": -96.717199
	},
	{
		"lat": 46.437626,
		"lng": -96.717202
	},
	{
		"lat": 46.437842,
		"lng": -96.717224
	},
	{
		"lat": 46.437914,
		"lng": -96.717237
	},
	{
		"lat": 46.438583,
		"lng": -96.71745
	},
	{
		"lat": 46.438825,
		"lng": -96.717549
	},
	{
		"lat": 46.438996,
		"lng": -96.71763
	},
	{
		"lat": 46.439096,
		"lng": -96.71769
	},
	{
		"lat": 46.439224,
		"lng": -96.717784
	},
	{
		"lat": 46.439374,
		"lng": -96.717927
	},
	{
		"lat": 46.439431,
		"lng": -96.71799
	},
	{
		"lat": 46.439558,
		"lng": -96.718173
	},
	{
		"lat": 46.439682,
		"lng": -96.718378
	},
	{
		"lat": 46.439724,
		"lng": -96.718446
	},
	{
		"lat": 46.439838,
		"lng": -96.718708
	},
	{
		"lat": 46.439879,
		"lng": -96.718794
	},
	{
		"lat": 46.439941,
		"lng": -96.71898
	},
	{
		"lat": 46.439996,
		"lng": -96.71928
	},
	{
		"lat": 46.440009,
		"lng": -96.719329
	},
	{
		"lat": 46.440021,
		"lng": -96.71943
	},
	{
		"lat": 46.440033,
		"lng": -96.71974
	},
	{
		"lat": 46.44002,
		"lng": -96.72005
	},
	{
		"lat": 46.440006,
		"lng": -96.720152
	},
	{
		"lat": 46.439978,
		"lng": -96.720302
	},
	{
		"lat": 46.439963,
		"lng": -96.720349
	},
	{
		"lat": 46.439885,
		"lng": -96.720524
	},
	{
		"lat": 46.439814,
		"lng": -96.72064
	},
	{
		"lat": 46.439689,
		"lng": -96.720828
	},
	{
		"lat": 46.439596,
		"lng": -96.720985
	},
	{
		"lat": 46.439553,
		"lng": -96.721069
	},
	{
		"lat": 46.439541,
		"lng": -96.721118
	},
	{
		"lat": 46.439523,
		"lng": -96.721271
	},
	{
		"lat": 46.439521,
		"lng": -96.721375
	},
	{
		"lat": 46.439533,
		"lng": -96.721423
	},
	{
		"lat": 46.439582,
		"lng": -96.721561
	},
	{
		"lat": 46.439603,
		"lng": -96.721604
	},
	{
		"lat": 46.439679,
		"lng": -96.721714
	},
	{
		"lat": 46.439734,
		"lng": -96.72178
	},
	{
		"lat": 46.439764,
		"lng": -96.721809
	},
	{
		"lat": 46.439829,
		"lng": -96.721853
	},
	{
		"lat": 46.439863,
		"lng": -96.72187
	},
	{
		"lat": 46.439969,
		"lng": -96.721899
	},
	{
		"lat": 46.440077,
		"lng": -96.721897
	},
	{
		"lat": 46.440218,
		"lng": -96.721864
	},
	{
		"lat": 46.440322,
		"lng": -96.721819
	},
	{
		"lat": 46.440454,
		"lng": -96.721736
	},
	{
		"lat": 46.440484,
		"lng": -96.721709
	},
	{
		"lat": 46.440582,
		"lng": -96.721644
	},
	{
		"lat": 46.440613,
		"lng": -96.721618
	},
	{
		"lat": 46.440671,
		"lng": -96.721557
	},
	{
		"lat": 46.440824,
		"lng": -96.721338
	},
	{
		"lat": 46.440947,
		"lng": -96.721148
	},
	{
		"lat": 46.441134,
		"lng": -96.720706
	},
	{
		"lat": 46.44125,
		"lng": -96.720326
	},
	{
		"lat": 46.44132,
		"lng": -96.719978
	},
	{
		"lat": 46.441381,
		"lng": -96.719791
	},
	{
		"lat": 46.441482,
		"lng": -96.719576
	},
	{
		"lat": 46.441566,
		"lng": -96.719347
	},
	{
		"lat": 46.441644,
		"lng": -96.719114
	},
	{
		"lat": 46.441671,
		"lng": -96.719017
	},
	{
		"lat": 46.441704,
		"lng": -96.71887
	},
	{
		"lat": 46.441732,
		"lng": -96.718719
	},
	{
		"lat": 46.441825,
		"lng": -96.718273
	},
	{
		"lat": 46.441855,
		"lng": -96.718071
	},
	{
		"lat": 46.441867,
		"lng": -96.717941
	},
	{
		"lat": 46.441879,
		"lng": -96.717814
	},
	{
		"lat": 46.441883,
		"lng": -96.717742
	},
	{
		"lat": 46.441896,
		"lng": -96.717506
	},
	{
		"lat": 46.441902,
		"lng": -96.71725
	},
	{
		"lat": 46.441892,
		"lng": -96.71689
	},
	{
		"lat": 46.441877,
		"lng": -96.716582
	},
	{
		"lat": 46.44186,
		"lng": -96.71643
	},
	{
		"lat": 46.4418,
		"lng": -96.715976
	},
	{
		"lat": 46.441704,
		"lng": -96.715374
	},
	{
		"lat": 46.441645,
		"lng": -96.715077
	},
	{
		"lat": 46.441615,
		"lng": -96.714876
	},
	{
		"lat": 46.44154,
		"lng": -96.71448
	},
	{
		"lat": 46.441526,
		"lng": -96.714433
	},
	{
		"lat": 46.441506,
		"lng": -96.714334
	},
	{
		"lat": 46.441482,
		"lng": -96.714236
	},
	{
		"lat": 46.441438,
		"lng": -96.714097
	},
	{
		"lat": 46.4414,
		"lng": -96.714009
	},
	{
		"lat": 46.441391,
		"lng": -96.713935
	},
	{
		"lat": 46.441378,
		"lng": -96.713886
	},
	{
		"lat": 46.441347,
		"lng": -96.713738
	},
	{
		"lat": 46.4413,
		"lng": -96.7136
	},
	{
		"lat": 46.441209,
		"lng": -96.713378
	},
	{
		"lat": 46.441176,
		"lng": -96.713286
	},
	{
		"lat": 46.441164,
		"lng": -96.713239
	},
	{
		"lat": 46.441136,
		"lng": -96.713089
	},
	{
		"lat": 46.441124,
		"lng": -96.713041
	},
	{
		"lat": 46.441096,
		"lng": -96.71284
	},
	{
		"lat": 46.44109,
		"lng": -96.712737
	},
	{
		"lat": 46.441098,
		"lng": -96.712584
	},
	{
		"lat": 46.441121,
		"lng": -96.712487
	},
	{
		"lat": 46.441168,
		"lng": -96.712409
	},
	{
		"lat": 46.441223,
		"lng": -96.712343
	},
	{
		"lat": 46.441288,
		"lng": -96.712303
	},
	{
		"lat": 46.4415,
		"lng": -96.712255
	},
	{
		"lat": 46.441749,
		"lng": -96.712278
	},
	{
		"lat": 46.441888,
		"lng": -96.712325
	},
	{
		"lat": 46.441922,
		"lng": -96.712342
	},
	{
		"lat": 46.441982,
		"lng": -96.712396
	},
	{
		"lat": 46.442008,
		"lng": -96.712432
	},
	{
		"lat": 46.442054,
		"lng": -96.71251
	},
	{
		"lat": 46.442097,
		"lng": -96.712594
	},
	{
		"lat": 46.442133,
		"lng": -96.712683
	},
	{
		"lat": 46.442167,
		"lng": -96.712829
	},
	{
		"lat": 46.442186,
		"lng": -96.712929
	},
	{
		"lat": 46.442204,
		"lng": -96.71308
	},
	{
		"lat": 46.442227,
		"lng": -96.713178
	},
	{
		"lat": 46.442273,
		"lng": -96.713318
	},
	{
		"lat": 46.442474,
		"lng": -96.71361
	},
	{
		"lat": 46.442582,
		"lng": -96.713746
	},
	{
		"lat": 46.442728,
		"lng": -96.713895
	},
	{
		"lat": 46.442809,
		"lng": -96.713995
	},
	{
		"lat": 46.442898,
		"lng": -96.714083
	},
	{
		"lat": 46.443034,
		"lng": -96.714251
	},
	{
		"lat": 46.443238,
		"lng": -96.71454
	},
	{
		"lat": 46.443382,
		"lng": -96.71477
	},
	{
		"lat": 46.443468,
		"lng": -96.714934
	},
	{
		"lat": 46.443807,
		"lng": -96.715723
	},
	{
		"lat": 46.443877,
		"lng": -96.715838
	},
	{
		"lat": 46.444057,
		"lng": -96.716091
	},
	{
		"lat": 46.444111,
		"lng": -96.716157
	},
	{
		"lat": 46.44414,
		"lng": -96.716186
	},
	{
		"lat": 46.444166,
		"lng": -96.716216
	},
	{
		"lat": 46.444216,
		"lng": -96.716242
	},
	{
		"lat": 46.444282,
		"lng": -96.716279
	},
	{
		"lat": 46.444436,
		"lng": -96.716331
	},
	{
		"lat": 46.444445,
		"lng": -96.716332
	},
	{
		"lat": 46.444627,
		"lng": -96.716362
	},
	{
		"lat": 46.444695,
		"lng": -96.716275
	},
	{
		"lat": 46.444933,
		"lng": -96.715994
	},
	{
		"lat": 46.444992,
		"lng": -96.715924
	},
	{
		"lat": 46.445271,
		"lng": -96.715294
	},
	{
		"lat": 46.445542,
		"lng": -96.714408
	},
	{
		"lat": 46.445644,
		"lng": -96.714039
	},
	{
		"lat": 46.445724,
		"lng": -96.713755
	},
	{
		"lat": 46.445828,
		"lng": -96.713322
	},
	{
		"lat": 46.445915,
		"lng": -96.712963
	},
	{
		"lat": 46.446081,
		"lng": -96.712287
	},
	{
		"lat": 46.446248,
		"lng": -96.711855
	},
	{
		"lat": 46.446464,
		"lng": -96.711388
	},
	{
		"lat": 46.446705,
		"lng": -96.71127
	},
	{
		"lat": 46.446965,
		"lng": -96.711535
	},
	{
		"lat": 46.447216,
		"lng": -96.711975
	},
	{
		"lat": 46.447524,
		"lng": -96.712298
	},
	{
		"lat": 46.447856,
		"lng": -96.712703
	},
	{
		"lat": 46.448446,
		"lng": -96.712989
	},
	{
		"lat": 46.448761,
		"lng": -96.713347
	},
	{
		"lat": 46.448708,
		"lng": -96.714208
	},
	{
		"lat": 46.448429,
		"lng": -96.71497
	},
	{
		"lat": 46.448406,
		"lng": -96.715036
	},
	{
		"lat": 46.447931,
		"lng": -96.715296
	},
	{
		"lat": 46.447359,
		"lng": -96.715393
	},
	{
		"lat": 46.446747,
		"lng": -96.715363
	},
	{
		"lat": 46.446409,
		"lng": -96.715529
	},
	{
		"lat": 46.446354,
		"lng": -96.715661
	},
	{
		"lat": 46.446306,
		"lng": -96.715774
	},
	{
		"lat": 46.446259,
		"lng": -96.715887
	},
	{
		"lat": 46.446262,
		"lng": -96.715887
	},
	{
		"lat": 46.446312,
		"lng": -96.715903
	},
	{
		"lat": 46.446368,
		"lng": -96.715922
	},
	{
		"lat": 46.446401,
		"lng": -96.715941
	},
	{
		"lat": 46.44643,
		"lng": -96.715973
	},
	{
		"lat": 46.446447,
		"lng": -96.715998
	},
	{
		"lat": 46.446455,
		"lng": -96.716009
	},
	{
		"lat": 46.446476,
		"lng": -96.716047
	},
	{
		"lat": 46.446545,
		"lng": -96.716172
	},
	{
		"lat": 46.446563,
		"lng": -96.716216
	},
	{
		"lat": 46.446584,
		"lng": -96.716315
	},
	{
		"lat": 46.446598,
		"lng": -96.716363
	},
	{
		"lat": 46.446625,
		"lng": -96.716566
	},
	{
		"lat": 46.44662,
		"lng": -96.716722
	},
	{
		"lat": 46.446613,
		"lng": -96.716772
	},
	{
		"lat": 46.446601,
		"lng": -96.716822
	},
	{
		"lat": 46.446583,
		"lng": -96.716866
	},
	{
		"lat": 46.44653,
		"lng": -96.716965
	},
	{
		"lat": 46.446517,
		"lng": -96.71699
	},
	{
		"lat": 46.446469,
		"lng": -96.717067
	},
	{
		"lat": 46.446385,
		"lng": -96.717166
	},
	{
		"lat": 46.446354,
		"lng": -96.717191
	},
	{
		"lat": 46.446253,
		"lng": -96.717246
	},
	{
		"lat": 46.446223,
		"lng": -96.717275
	},
	{
		"lat": 46.446171,
		"lng": -96.717346
	},
	{
		"lat": 46.446148,
		"lng": -96.717386
	},
	{
		"lat": 46.446108,
		"lng": -96.717472
	},
	{
		"lat": 46.446077,
		"lng": -96.717566
	},
	{
		"lat": 46.446043,
		"lng": -96.717714
	},
	{
		"lat": 46.446033,
		"lng": -96.717816
	},
	{
		"lat": 46.44605,
		"lng": -96.718022
	},
	{
		"lat": 46.446078,
		"lng": -96.718172
	},
	{
		"lat": 46.446197,
		"lng": -96.718605
	},
	{
		"lat": 46.446214,
		"lng": -96.718651
	},
	{
		"lat": 46.446236,
		"lng": -96.718692
	},
	{
		"lat": 46.446305,
		"lng": -96.718874
	},
	{
		"lat": 46.446425,
		"lng": -96.719169
	},
	{
		"lat": 46.446487,
		"lng": -96.719321
	},
	{
		"lat": 46.44653,
		"lng": -96.719464
	},
	{
		"lat": 46.44656,
		"lng": -96.719595
	},
	{
		"lat": 46.446564,
		"lng": -96.719611
	},
	{
		"lat": 46.446579,
		"lng": -96.719712
	},
	{
		"lat": 46.446594,
		"lng": -96.719768
	},
	{
		"lat": 46.446609,
		"lng": -96.71987
	},
	{
		"lat": 46.446629,
		"lng": -96.719969
	},
	{
		"lat": 46.44666,
		"lng": -96.720063
	},
	{
		"lat": 46.446672,
		"lng": -96.720112
	},
	{
		"lat": 46.446689,
		"lng": -96.720157
	},
	{
		"lat": 46.446749,
		"lng": -96.720287
	},
	{
		"lat": 46.446868,
		"lng": -96.720499
	},
	{
		"lat": 46.446885,
		"lng": -96.720528
	},
	{
		"lat": 46.446985,
		"lng": -96.720677
	},
	{
		"lat": 46.447065,
		"lng": -96.720782
	},
	{
		"lat": 46.447139,
		"lng": -96.720867
	},
	{
		"lat": 46.447177,
		"lng": -96.720912
	},
	{
		"lat": 46.447237,
		"lng": -96.720968
	},
	{
		"lat": 46.447456,
		"lng": -96.721148
	},
	{
		"lat": 46.447615,
		"lng": -96.721269
	},
	{
		"lat": 46.447771,
		"lng": -96.721399
	},
	{
		"lat": 46.447902,
		"lng": -96.721482
	},
	{
		"lat": 46.448072,
		"lng": -96.721568
	},
	{
		"lat": 46.448105,
		"lng": -96.72159
	},
	{
		"lat": 46.448174,
		"lng": -96.72162
	},
	{
		"lat": 46.448252,
		"lng": -96.721661
	},
	{
		"lat": 46.448309,
		"lng": -96.721691
	},
	{
		"lat": 46.448412,
		"lng": -96.721736
	},
	{
		"lat": 46.448517,
		"lng": -96.721775
	},
	{
		"lat": 46.448683,
		"lng": -96.721811
	},
	{
		"lat": 46.448695,
		"lng": -96.721814
	},
	{
		"lat": 46.448803,
		"lng": -96.721829
	},
	{
		"lat": 46.448874,
		"lng": -96.721823
	},
	{
		"lat": 46.448981,
		"lng": -96.721797
	},
	{
		"lat": 46.449081,
		"lng": -96.721739
	},
	{
		"lat": 46.44917,
		"lng": -96.721651
	},
	{
		"lat": 46.449226,
		"lng": -96.721586
	},
	{
		"lat": 46.449274,
		"lng": -96.721509
	},
	{
		"lat": 46.449363,
		"lng": -96.721347
	},
	{
		"lat": 46.449425,
		"lng": -96.72122
	},
	{
		"lat": 46.449467,
		"lng": -96.721078
	},
	{
		"lat": 46.449498,
		"lng": -96.720929
	},
	{
		"lat": 46.449517,
		"lng": -96.720777
	},
	{
		"lat": 46.449536,
		"lng": -96.720677
	},
	{
		"lat": 46.44954,
		"lng": -96.720574
	},
	{
		"lat": 46.449534,
		"lng": -96.72042
	},
	{
		"lat": 46.449495,
		"lng": -96.720167
	},
	{
		"lat": 46.449464,
		"lng": -96.720018
	},
	{
		"lat": 46.449448,
		"lng": -96.719917
	},
	{
		"lat": 46.449437,
		"lng": -96.719815
	},
	{
		"lat": 46.449433,
		"lng": -96.719794
	},
	{
		"lat": 46.449419,
		"lng": -96.719715
	},
	{
		"lat": 46.449382,
		"lng": -96.719252
	},
	{
		"lat": 46.449346,
		"lng": -96.717596
	},
	{
		"lat": 46.449341,
		"lng": -96.717078
	},
	{
		"lat": 46.449344,
		"lng": -96.716353
	},
	{
		"lat": 46.449361,
		"lng": -96.715835
	},
	{
		"lat": 46.449383,
		"lng": -96.715474
	},
	{
		"lat": 46.449416,
		"lng": -96.715114
	},
	{
		"lat": 46.449461,
		"lng": -96.714757
	},
	{
		"lat": 46.449517,
		"lng": -96.714457
	},
	{
		"lat": 46.449533,
		"lng": -96.71441
	},
	{
		"lat": 46.449584,
		"lng": -96.714217
	},
	{
		"lat": 46.449715,
		"lng": -96.713848
	},
	{
		"lat": 46.449729,
		"lng": -96.7138
	},
	{
		"lat": 46.449806,
		"lng": -96.713624
	},
	{
		"lat": 46.44989,
		"lng": -96.713456
	},
	{
		"lat": 46.450054,
		"lng": -96.713255
	},
	{
		"lat": 46.450139,
		"lng": -96.71316
	},
	{
		"lat": 46.450199,
		"lng": -96.713102
	},
	{
		"lat": 46.450232,
		"lng": -96.71308
	},
	{
		"lat": 46.450369,
		"lng": -96.713015
	},
	{
		"lat": 46.450474,
		"lng": -96.712978
	},
	{
		"lat": 46.450545,
		"lng": -96.712962
	},
	{
		"lat": 46.450724,
		"lng": -96.712941
	},
	{
		"lat": 46.450754,
		"lng": -96.71294
	},
	{
		"lat": 46.450832,
		"lng": -96.712938
	},
	{
		"lat": 46.451011,
		"lng": -96.712961
	},
	{
		"lat": 46.451116,
		"lng": -96.712999
	},
	{
		"lat": 46.451424,
		"lng": -96.713142
	},
	{
		"lat": 46.451716,
		"lng": -96.713305
	},
	{
		"lat": 46.451879,
		"lng": -96.713414
	},
	{
		"lat": 46.452045,
		"lng": -96.713513
	},
	{
		"lat": 46.452108,
		"lng": -96.713563
	},
	{
		"lat": 46.452258,
		"lng": -96.713704
	},
	{
		"lat": 46.452373,
		"lng": -96.71383
	},
	{
		"lat": 46.452454,
		"lng": -96.713932
	},
	{
		"lat": 46.452578,
		"lng": -96.714119
	},
	{
		"lat": 46.452623,
		"lng": -96.714201
	},
	{
		"lat": 46.452661,
		"lng": -96.714288
	},
	{
		"lat": 46.452682,
		"lng": -96.714344
	},
	{
		"lat": 46.452713,
		"lng": -96.714424
	},
	{
		"lat": 46.452757,
		"lng": -96.714566
	},
	{
		"lat": 46.452814,
		"lng": -96.714811
	},
	{
		"lat": 46.452857,
		"lng": -96.714954
	},
	{
		"lat": 46.452882,
		"lng": -96.715105
	},
	{
		"lat": 46.452896,
		"lng": -96.715152
	},
	{
		"lat": 46.452924,
		"lng": -96.715355
	},
	{
		"lat": 46.452968,
		"lng": -96.716024
	},
	{
		"lat": 46.452974,
		"lng": -96.71623
	},
	{
		"lat": 46.452993,
		"lng": -96.716525
	},
	{
		"lat": 46.453005,
		"lng": -96.716692
	},
	{
		"lat": 46.453019,
		"lng": -96.716794
	},
	{
		"lat": 46.453027,
		"lng": -96.716897
	},
	{
		"lat": 46.453035,
		"lng": -96.716947
	},
	{
		"lat": 46.453049,
		"lng": -96.716995
	},
	{
		"lat": 46.453084,
		"lng": -96.717086
	},
	{
		"lat": 46.453133,
		"lng": -96.717161
	},
	{
		"lat": 46.453163,
		"lng": -96.717192
	},
	{
		"lat": 46.453196,
		"lng": -96.717209
	},
	{
		"lat": 46.453267,
		"lng": -96.717229
	},
	{
		"lat": 46.453298,
		"lng": -96.717251
	},
	{
		"lat": 46.453349,
		"lng": -96.717325
	},
	{
		"lat": 46.453403,
		"lng": -96.717393
	},
	{
		"lat": 46.453463,
		"lng": -96.717451
	},
	{
		"lat": 46.4536,
		"lng": -96.717513
	},
	{
		"lat": 46.45367,
		"lng": -96.717539
	},
	{
		"lat": 46.453776,
		"lng": -96.717569
	},
	{
		"lat": 46.453885,
		"lng": -96.717573
	},
	{
		"lat": 46.453956,
		"lng": -96.717558
	},
	{
		"lat": 46.454025,
		"lng": -96.717526
	},
	{
		"lat": 46.45409,
		"lng": -96.717481
	},
	{
		"lat": 46.454122,
		"lng": -96.717503
	},
	{
		"lat": 46.454294,
		"lng": -96.717584
	},
	{
		"lat": 46.454329,
		"lng": -96.717592
	},
	{
		"lat": 46.454365,
		"lng": -96.717593
	},
	{
		"lat": 46.454401,
		"lng": -96.717587
	},
	{
		"lat": 46.454931,
		"lng": -96.717434
	},
	{
		"lat": 46.455216,
		"lng": -96.717372
	},
	{
		"lat": 46.455388,
		"lng": -96.717295
	},
	{
		"lat": 46.455516,
		"lng": -96.717199
	},
	{
		"lat": 46.455544,
		"lng": -96.717166
	},
	{
		"lat": 46.455667,
		"lng": -96.71706
	},
	{
		"lat": 46.455726,
		"lng": -96.717002
	},
	{
		"lat": 46.455837,
		"lng": -96.716872
	},
	{
		"lat": 46.45594,
		"lng": -96.716727
	},
	{
		"lat": 46.455957,
		"lng": -96.716682
	},
	{
		"lat": 46.455964,
		"lng": -96.716631
	},
	{
		"lat": 46.455975,
		"lng": -96.716477
	},
	{
		"lat": 46.455971,
		"lng": -96.716219
	},
	{
		"lat": 46.455961,
		"lng": -96.716064
	},
	{
		"lat": 46.455921,
		"lng": -96.715812
	},
	{
		"lat": 46.455867,
		"lng": -96.715678
	},
	{
		"lat": 46.455836,
		"lng": -96.715585
	},
	{
		"lat": 46.455712,
		"lng": -96.71533
	},
	{
		"lat": 46.455588,
		"lng": -96.715143
	},
	{
		"lat": 46.455351,
		"lng": -96.714825
	},
	{
		"lat": 46.455144,
		"lng": -96.714536
	},
	{
		"lat": 46.455034,
		"lng": -96.714332
	},
	{
		"lat": 46.455019,
		"lng": -96.714297
	},
	{
		"lat": 46.454997,
		"lng": -96.714242
	},
	{
		"lat": 46.454953,
		"lng": -96.7141
	},
	{
		"lat": 46.454939,
		"lng": -96.713998
	},
	{
		"lat": 46.454923,
		"lng": -96.713792
	},
	{
		"lat": 46.45493,
		"lng": -96.713533
	},
	{
		"lat": 46.45495,
		"lng": -96.713328
	},
	{
		"lat": 46.455005,
		"lng": -96.713081
	},
	{
		"lat": 46.45502,
		"lng": -96.71298
	},
	{
		"lat": 46.455031,
		"lng": -96.712931
	},
	{
		"lat": 46.455053,
		"lng": -96.71289
	},
	{
		"lat": 46.45515,
		"lng": -96.712672
	},
	{
		"lat": 46.455218,
		"lng": -96.712551
	},
	{
		"lat": 46.45529,
		"lng": -96.712436
	},
	{
		"lat": 46.455446,
		"lng": -96.71222
	},
	{
		"lat": 46.455571,
		"lng": -96.712154
	},
	{
		"lat": 46.455607,
		"lng": -96.712137
	},
	{
		"lat": 46.455674,
		"lng": -96.712108
	},
	{
		"lat": 46.455854,
		"lng": -96.712084
	},
	{
		"lat": 46.456142,
		"lng": -96.712087
	},
	{
		"lat": 46.456213,
		"lng": -96.7121
	},
	{
		"lat": 46.456318,
		"lng": -96.712127
	},
	{
		"lat": 46.456378,
		"lng": -96.712141
	},
	{
		"lat": 46.456391,
		"lng": -96.712145
	},
	{
		"lat": 46.456532,
		"lng": -96.712187
	},
	{
		"lat": 46.456555,
		"lng": -96.712195
	},
	{
		"lat": 46.456614,
		"lng": -96.712216
	},
	{
		"lat": 46.456672,
		"lng": -96.712236
	},
	{
		"lat": 46.456776,
		"lng": -96.712282
	},
	{
		"lat": 46.456809,
		"lng": -96.712303
	},
	{
		"lat": 46.456903,
		"lng": -96.712379
	},
	{
		"lat": 46.457251,
		"lng": -96.712397
	},
	{
		"lat": 46.457647,
		"lng": -96.712398
	},
	{
		"lat": 46.457863,
		"lng": -96.712381
	},
	{
		"lat": 46.458255,
		"lng": -96.712301
	},
	{
		"lat": 46.458466,
		"lng": -96.712233
	},
	{
		"lat": 46.458568,
		"lng": -96.712183
	},
	{
		"lat": 46.458734,
		"lng": -96.712085
	},
	{
		"lat": 46.458796,
		"lng": -96.712031
	},
	{
		"lat": 46.458861,
		"lng": -96.711987
	},
	{
		"lat": 46.458895,
		"lng": -96.711971
	},
	{
		"lat": 46.45896,
		"lng": -96.711925
	},
	{
		"lat": 46.459059,
		"lng": -96.711865
	},
	{
		"lat": 46.459195,
		"lng": -96.711795
	},
	{
		"lat": 46.45926,
		"lng": -96.711751
	},
	{
		"lat": 46.459532,
		"lng": -96.711614
	},
	{
		"lat": 46.459639,
		"lng": -96.711596
	},
	{
		"lat": 46.459783,
		"lng": -96.711611
	},
	{
		"lat": 46.459853,
		"lng": -96.711632
	},
	{
		"lat": 46.459985,
		"lng": -96.711718
	},
	{
		"lat": 46.460166,
		"lng": -96.711888
	},
	{
		"lat": 46.460252,
		"lng": -96.71198
	},
	{
		"lat": 46.460383,
		"lng": -96.712159
	},
	{
		"lat": 46.460505,
		"lng": -96.712349
	},
	{
		"lat": 46.460638,
		"lng": -96.712594
	},
	{
		"lat": 46.460698,
		"lng": -96.712724
	},
	{
		"lat": 46.460749,
		"lng": -96.712861
	},
	{
		"lat": 46.460835,
		"lng": -96.713146
	},
	{
		"lat": 46.460885,
		"lng": -96.713395
	},
	{
		"lat": 46.460902,
		"lng": -96.71344
	},
	{
		"lat": 46.460917,
		"lng": -96.713542
	},
	{
		"lat": 46.46096,
		"lng": -96.713793
	},
	{
		"lat": 46.461028,
		"lng": -96.714354
	},
	{
		"lat": 46.461035,
		"lng": -96.71451
	},
	{
		"lat": 46.461127,
		"lng": -96.715641
	},
	{
		"lat": 46.461226,
		"lng": -96.717084
	},
	{
		"lat": 46.461246,
		"lng": -96.717237
	},
	{
		"lat": 46.461271,
		"lng": -96.717546
	},
	{
		"lat": 46.461289,
		"lng": -96.717646
	},
	{
		"lat": 46.461313,
		"lng": -96.717903
	},
	{
		"lat": 46.461329,
		"lng": -96.718004
	},
	{
		"lat": 46.461341,
		"lng": -96.718053
	},
	{
		"lat": 46.461365,
		"lng": -96.718119
	},
	{
		"lat": 46.461425,
		"lng": -96.718282
	},
	{
		"lat": 46.461601,
		"lng": -96.718543
	},
	{
		"lat": 46.46163,
		"lng": -96.718575
	},
	{
		"lat": 46.461722,
		"lng": -96.718656
	},
	{
		"lat": 46.461789,
		"lng": -96.718692
	},
	{
		"lat": 46.46186,
		"lng": -96.718714
	},
	{
		"lat": 46.461931,
		"lng": -96.718729
	},
	{
		"lat": 46.462075,
		"lng": -96.718729
	},
	{
		"lat": 46.46211,
		"lng": -96.718717
	},
	{
		"lat": 46.462177,
		"lng": -96.718681
	},
	{
		"lat": 46.462209,
		"lng": -96.718658
	},
	{
		"lat": 46.4623,
		"lng": -96.718572
	},
	{
		"lat": 46.462327,
		"lng": -96.718539
	},
	{
		"lat": 46.462531,
		"lng": -96.718247
	},
	{
		"lat": 46.462604,
		"lng": -96.718132
	},
	{
		"lat": 46.462792,
		"lng": -96.71789
	},
	{
		"lat": 46.462878,
		"lng": -96.717796
	},
	{
		"lat": 46.462941,
		"lng": -96.717745
	},
	{
		"lat": 46.463169,
		"lng": -96.717492
	},
	{
		"lat": 46.463274,
		"lng": -96.71735
	},
	{
		"lat": 46.463375,
		"lng": -96.717317
	},
	{
		"lat": 46.463476,
		"lng": -96.71726
	},
	{
		"lat": 46.463566,
		"lng": -96.717174
	},
	{
		"lat": 46.463616,
		"lng": -96.717098
	},
	{
		"lat": 46.463706,
		"lng": -96.716937
	},
	{
		"lat": 46.463761,
		"lng": -96.716803
	},
	{
		"lat": 46.463869,
		"lng": -96.716475
	},
	{
		"lat": 46.463923,
		"lng": -96.716283
	},
	{
		"lat": 46.46394,
		"lng": -96.716238
	},
	{
		"lat": 46.46414,
		"lng": -96.715806
	},
	{
		"lat": 46.464176,
		"lng": -96.715717
	},
	{
		"lat": 46.464225,
		"lng": -96.715578
	},
	{
		"lat": 46.464272,
		"lng": -96.7155
	},
	{
		"lat": 46.464331,
		"lng": -96.715369
	},
	{
		"lat": 46.464363,
		"lng": -96.715277
	},
	{
		"lat": 46.464421,
		"lng": -96.715145
	},
	{
		"lat": 46.464601,
		"lng": -96.714697
	},
	{
		"lat": 46.464679,
		"lng": -96.714522
	},
	{
		"lat": 46.464789,
		"lng": -96.714317
	},
	{
		"lat": 46.464861,
		"lng": -96.714138
	},
	{
		"lat": 46.464885,
		"lng": -96.714099
	},
	{
		"lat": 46.464905,
		"lng": -96.714056
	},
	{
		"lat": 46.464993,
		"lng": -96.713771
	},
	{
		"lat": 46.465012,
		"lng": -96.713672
	},
	{
		"lat": 46.465117,
		"lng": -96.713545
	},
	{
		"lat": 46.465306,
		"lng": -96.713303
	},
	{
		"lat": 46.465336,
		"lng": -96.713275
	},
	{
		"lat": 46.465474,
		"lng": -96.713109
	},
	{
		"lat": 46.465634,
		"lng": -96.71299
	},
	{
		"lat": 46.465733,
		"lng": -96.712927
	},
	{
		"lat": 46.465801,
		"lng": -96.712894
	},
	{
		"lat": 46.465907,
		"lng": -96.712862
	},
	{
		"lat": 46.466015,
		"lng": -96.712856
	},
	{
		"lat": 46.466159,
		"lng": -96.712871
	},
	{
		"lat": 46.466226,
		"lng": -96.712907
	},
	{
		"lat": 46.466348,
		"lng": -96.713019
	},
	{
		"lat": 46.466434,
		"lng": -96.713112
	},
	{
		"lat": 46.466486,
		"lng": -96.713184
	},
	{
		"lat": 46.466599,
		"lng": -96.713385
	},
	{
		"lat": 46.466636,
		"lng": -96.713474
	},
	{
		"lat": 46.466651,
		"lng": -96.713521
	},
	{
		"lat": 46.466659,
		"lng": -96.713572
	},
	{
		"lat": 46.466674,
		"lng": -96.713778
	},
	{
		"lat": 46.466673,
		"lng": -96.71383
	},
	{
		"lat": 46.466661,
		"lng": -96.713985
	},
	{
		"lat": 46.466627,
		"lng": -96.714186
	},
	{
		"lat": 46.466606,
		"lng": -96.714286
	},
	{
		"lat": 46.466574,
		"lng": -96.714378
	},
	{
		"lat": 46.466551,
		"lng": -96.714476
	},
	{
		"lat": 46.466509,
		"lng": -96.71462
	},
	{
		"lat": 46.46645,
		"lng": -96.714864
	},
	{
		"lat": 46.466396,
		"lng": -96.715111
	},
	{
		"lat": 46.466378,
		"lng": -96.715212
	},
	{
		"lat": 46.466345,
		"lng": -96.715519
	},
	{
		"lat": 46.466342,
		"lng": -96.715623
	},
	{
		"lat": 46.466344,
		"lng": -96.715778
	},
	{
		"lat": 46.46636,
		"lng": -96.715984
	},
	{
		"lat": 46.466394,
		"lng": -96.716186
	},
	{
		"lat": 46.466447,
		"lng": -96.716379
	},
	{
		"lat": 46.466501,
		"lng": -96.716512
	},
	{
		"lat": 46.466543,
		"lng": -96.716597
	},
	{
		"lat": 46.466744,
		"lng": -96.716895
	},
	{
		"lat": 46.466859,
		"lng": -96.717019
	},
	{
		"lat": 46.466983,
		"lng": -96.717126
	},
	{
		"lat": 46.467079,
		"lng": -96.717196
	},
	{
		"lat": 46.467109,
		"lng": -96.717225
	},
	{
		"lat": 46.467278,
		"lng": -96.717313
	},
	{
		"lat": 46.467438,
		"lng": -96.717433
	},
	{
		"lat": 46.467499,
		"lng": -96.717489
	},
	{
		"lat": 46.467555,
		"lng": -96.717552
	},
	{
		"lat": 46.467579,
		"lng": -96.717591
	},
	{
		"lat": 46.467621,
		"lng": -96.717676
	},
	{
		"lat": 46.467657,
		"lng": -96.717765
	},
	{
		"lat": 46.467703,
		"lng": -96.717845
	},
	{
		"lat": 46.467782,
		"lng": -96.718018
	},
	{
		"lat": 46.467819,
		"lng": -96.718164
	},
	{
		"lat": 46.467837,
		"lng": -96.718264
	},
	{
		"lat": 46.467837,
		"lng": -96.718368
	},
	{
		"lat": 46.467814,
		"lng": -96.71852
	},
	{
		"lat": 46.467801,
		"lng": -96.718568
	},
	{
		"lat": 46.467763,
		"lng": -96.718656
	},
	{
		"lat": 46.467673,
		"lng": -96.718817
	},
	{
		"lat": 46.467578,
		"lng": -96.718972
	},
	{
		"lat": 46.467501,
		"lng": -96.719082
	},
	{
		"lat": 46.467395,
		"lng": -96.719222
	},
	{
		"lat": 46.467336,
		"lng": -96.719282
	},
	{
		"lat": 46.467204,
		"lng": -96.719363
	},
	{
		"lat": 46.467169,
		"lng": -96.719378
	},
	{
		"lat": 46.466974,
		"lng": -96.719504
	},
	{
		"lat": 46.466838,
		"lng": -96.719574
	},
	{
		"lat": 46.466713,
		"lng": -96.719677
	},
	{
		"lat": 46.466653,
		"lng": -96.719734
	},
	{
		"lat": 46.466541,
		"lng": -96.719864
	},
	{
		"lat": 46.466453,
		"lng": -96.719955
	},
	{
		"lat": 46.466302,
		"lng": -96.720097
	},
	{
		"lat": 46.466207,
		"lng": -96.72017
	},
	{
		"lat": 46.466115,
		"lng": -96.72025
	},
	{
		"lat": 46.465986,
		"lng": -96.720341
	},
	{
		"lat": 46.465925,
		"lng": -96.720396
	},
	{
		"lat": 46.465767,
		"lng": -96.72052
	},
	{
		"lat": 46.465646,
		"lng": -96.720632
	},
	{
		"lat": 46.465394,
		"lng": -96.720925
	},
	{
		"lat": 46.465317,
		"lng": -96.721034
	},
	{
		"lat": 46.465244,
		"lng": -96.721213
	},
	{
		"lat": 46.465231,
		"lng": -96.721261
	},
	{
		"lat": 46.465222,
		"lng": -96.721416
	},
	{
		"lat": 46.465226,
		"lng": -96.721468
	},
	{
		"lat": 46.46526,
		"lng": -96.721615
	},
	{
		"lat": 46.465276,
		"lng": -96.721662
	},
	{
		"lat": 46.465322,
		"lng": -96.721772
	},
	{
		"lat": 46.465344,
		"lng": -96.721813
	},
	{
		"lat": 46.465595,
		"lng": -96.722185
	},
	{
		"lat": 46.465729,
		"lng": -96.722358
	},
	{
		"lat": 46.465819,
		"lng": -96.722444
	},
	{
		"lat": 46.466036,
		"lng": -96.722628
	},
	{
		"lat": 46.466095,
		"lng": -96.722688
	},
	{
		"lat": 46.466344,
		"lng": -96.722896
	},
	{
		"lat": 46.466409,
		"lng": -96.72294
	},
	{
		"lat": 46.466509,
		"lng": -96.722997
	},
	{
		"lat": 46.466612,
		"lng": -96.723046
	},
	{
		"lat": 46.466717,
		"lng": -96.723083
	},
	{
		"lat": 46.466896,
		"lng": -96.723107
	},
	{
		"lat": 46.466968,
		"lng": -96.723098
	},
	{
		"lat": 46.467037,
		"lng": -96.72307
	},
	{
		"lat": 46.467103,
		"lng": -96.723028
	},
	{
		"lat": 46.467164,
		"lng": -96.722973
	},
	{
		"lat": 46.467228,
		"lng": -96.722926
	},
	{
		"lat": 46.467263,
		"lng": -96.722931
	},
	{
		"lat": 46.467369,
		"lng": -96.722961
	},
	{
		"lat": 46.467512,
		"lng": -96.72299
	},
	{
		"lat": 46.467798,
		"lng": -96.723034
	},
	{
		"lat": 46.468013,
		"lng": -96.723061
	},
	{
		"lat": 46.468085,
		"lng": -96.723065
	},
	{
		"lat": 46.468265,
		"lng": -96.723055
	},
	{
		"lat": 46.468515,
		"lng": -96.723017
	},
	{
		"lat": 46.468656,
		"lng": -96.722974
	},
	{
		"lat": 46.468791,
		"lng": -96.722903
	},
	{
		"lat": 46.46892,
		"lng": -96.722811
	},
	{
		"lat": 46.46895,
		"lng": -96.722781
	},
	{
		"lat": 46.469013,
		"lng": -96.722731
	},
	{
		"lat": 46.469169,
		"lng": -96.722517
	},
	{
		"lat": 46.46928,
		"lng": -96.722312
	},
	{
		"lat": 46.469331,
		"lng": -96.722175
	},
	{
		"lat": 46.469469,
		"lng": -96.721642
	},
	{
		"lat": 46.469554,
		"lng": -96.721357
	},
	{
		"lat": 46.469616,
		"lng": -96.721169
	},
	{
		"lat": 46.469658,
		"lng": -96.721085
	},
	{
		"lat": 46.46971,
		"lng": -96.720949
	},
	{
		"lat": 46.469777,
		"lng": -96.720827
	},
	{
		"lat": 46.469961,
		"lng": -96.720579
	},
	{
		"lat": 46.470048,
		"lng": -96.720488
	},
	{
		"lat": 46.470081,
		"lng": -96.720467
	},
	{
		"lat": 46.470172,
		"lng": -96.720381
	},
	{
		"lat": 46.470267,
		"lng": -96.720307
	},
	{
		"lat": 46.470379,
		"lng": -96.720177
	},
	{
		"lat": 46.470551,
		"lng": -96.719991
	},
	{
		"lat": 46.470728,
		"lng": -96.719732
	},
	{
		"lat": 46.470771,
		"lng": -96.719649
	},
	{
		"lat": 46.470786,
		"lng": -96.719602
	},
	{
		"lat": 46.470825,
		"lng": -96.719515
	},
	{
		"lat": 46.470847,
		"lng": -96.719416
	},
	{
		"lat": 46.470901,
		"lng": -96.719225
	},
	{
		"lat": 46.470927,
		"lng": -96.718916
	},
	{
		"lat": 46.470912,
		"lng": -96.718295
	},
	{
		"lat": 46.470843,
		"lng": -96.717787
	},
	{
		"lat": 46.470757,
		"lng": -96.717305
	},
	{
		"lat": 46.470727,
		"lng": -96.717135
	},
	{
		"lat": 46.470709,
		"lng": -96.716982
	},
	{
		"lat": 46.470671,
		"lng": -96.716728
	},
	{
		"lat": 46.47056,
		"lng": -96.716128
	},
	{
		"lat": 46.47054,
		"lng": -96.716003
	},
	{
		"lat": 46.470496,
		"lng": -96.715724
	},
	{
		"lat": 46.470479,
		"lng": -96.715571
	},
	{
		"lat": 46.470475,
		"lng": -96.715311
	},
	{
		"lat": 46.470507,
		"lng": -96.715004
	},
	{
		"lat": 46.4705,
		"lng": -96.714797
	},
	{
		"lat": 46.470553,
		"lng": -96.714649
	},
	{
		"lat": 46.47065,
		"lng": -96.714496
	},
	{
		"lat": 46.470856,
		"lng": -96.714287
	},
	{
		"lat": 46.470888,
		"lng": -96.714262
	},
	{
		"lat": 46.470991,
		"lng": -96.714218
	},
	{
		"lat": 46.471092,
		"lng": -96.714162
	},
	{
		"lat": 46.471161,
		"lng": -96.714136
	},
	{
		"lat": 46.47134,
		"lng": -96.714115
	},
	{
		"lat": 46.471412,
		"lng": -96.714114
	},
	{
		"lat": 46.471519,
		"lng": -96.714134
	},
	{
		"lat": 46.471659,
		"lng": -96.71417
	},
	{
		"lat": 46.471764,
		"lng": -96.714209
	},
	{
		"lat": 46.471865,
		"lng": -96.714261
	},
	{
		"lat": 46.471964,
		"lng": -96.71432
	},
	{
		"lat": 46.47206,
		"lng": -96.714391
	},
	{
		"lat": 46.472151,
		"lng": -96.714474
	},
	{
		"lat": 46.472176,
		"lng": -96.714512
	},
	{
		"lat": 46.472261,
		"lng": -96.714606
	},
	{
		"lat": 46.472337,
		"lng": -96.714717
	},
	{
		"lat": 46.472407,
		"lng": -96.714836
	},
	{
		"lat": 46.472446,
		"lng": -96.714922
	},
	{
		"lat": 46.472459,
		"lng": -96.714971
	},
	{
		"lat": 46.472495,
		"lng": -96.71506
	},
	{
		"lat": 46.472545,
		"lng": -96.715254
	},
	{
		"lat": 46.472569,
		"lng": -96.715406
	},
	{
		"lat": 46.472572,
		"lng": -96.715458
	},
	{
		"lat": 46.472591,
		"lng": -96.71561
	},
	{
		"lat": 46.47264,
		"lng": -96.716385
	},
	{
		"lat": 46.472681,
		"lng": -96.716637
	},
	{
		"lat": 46.472695,
		"lng": -96.716843
	},
	{
		"lat": 46.472709,
		"lng": -96.716945
	},
	{
		"lat": 46.472719,
		"lng": -96.717151
	},
	{
		"lat": 46.472742,
		"lng": -96.717302
	},
	{
		"lat": 46.472753,
		"lng": -96.717351
	},
	{
		"lat": 46.472792,
		"lng": -96.717438
	},
	{
		"lat": 46.472854,
		"lng": -96.717681
	},
	{
		"lat": 46.472883,
		"lng": -96.717776
	},
	{
		"lat": 46.473006,
		"lng": -96.718031
	},
	{
		"lat": 46.473116,
		"lng": -96.718236
	},
	{
		"lat": 46.473195,
		"lng": -96.718409
	},
	{
		"lat": 46.473308,
		"lng": -96.718675
	},
	{
		"lat": 46.473359,
		"lng": -96.718869
	},
	{
		"lat": 46.473384,
		"lng": -96.71902
	},
	{
		"lat": 46.473406,
		"lng": -96.719329
	},
	{
		"lat": 46.473405,
		"lng": -96.719485
	},
	{
		"lat": 46.4734,
		"lng": -96.719588
	},
	{
		"lat": 46.473384,
		"lng": -96.719742
	},
	{
		"lat": 46.47335,
		"lng": -96.719943
	},
	{
		"lat": 46.473314,
		"lng": -96.720033
	},
	{
		"lat": 46.473201,
		"lng": -96.720234
	},
	{
		"lat": 46.472998,
		"lng": -96.720527
	},
	{
		"lat": 46.47289,
		"lng": -96.720664
	},
	{
		"lat": 46.472708,
		"lng": -96.720831
	},
	{
		"lat": 46.472674,
		"lng": -96.72085
	},
	{
		"lat": 46.472513,
		"lng": -96.720966
	},
	{
		"lat": 46.472198,
		"lng": -96.721074
	},
	{
		"lat": 46.472055,
		"lng": -96.721093
	},
	{
		"lat": 46.471839,
		"lng": -96.721105
	},
	{
		"lat": 46.471588,
		"lng": -96.721142
	},
	{
		"lat": 46.471516,
		"lng": -96.721158
	},
	{
		"lat": 46.471237,
		"lng": -96.721259
	},
	{
		"lat": 46.471066,
		"lng": -96.721341
	},
	{
		"lat": 46.470933,
		"lng": -96.721423
	},
	{
		"lat": 46.470905,
		"lng": -96.721454
	},
	{
		"lat": 46.470803,
		"lng": -96.7216
	},
	{
		"lat": 46.470744,
		"lng": -96.721731
	},
	{
		"lat": 46.4707,
		"lng": -96.721982
	},
	{
		"lat": 46.470687,
		"lng": -96.722084
	},
	{
		"lat": 46.470701,
		"lng": -96.722394
	},
	{
		"lat": 46.470714,
		"lng": -96.722549
	},
	{
		"lat": 46.470725,
		"lng": -96.722755
	},
	{
		"lat": 46.470745,
		"lng": -96.722921
	},
	{
		"lat": 46.47075,
		"lng": -96.72296
	},
	{
		"lat": 46.470763,
		"lng": -96.723114
	},
	{
		"lat": 46.470817,
		"lng": -96.723361
	},
	{
		"lat": 46.470868,
		"lng": -96.723555
	},
	{
		"lat": 46.470884,
		"lng": -96.723602
	},
	{
		"lat": 46.470905,
		"lng": -96.723643
	},
	{
		"lat": 46.470979,
		"lng": -96.72388
	},
	{
		"lat": 46.471102,
		"lng": -96.724196
	},
	{
		"lat": 46.471235,
		"lng": -96.72462
	},
	{
		"lat": 46.471255,
		"lng": -96.724664
	},
	{
		"lat": 46.471282,
		"lng": -96.724814
	},
	{
		"lat": 46.471348,
		"lng": -96.725056
	},
	{
		"lat": 46.47143,
		"lng": -96.725453
	},
	{
		"lat": 46.471444,
		"lng": -96.725501
	},
	{
		"lat": 46.471472,
		"lng": -96.725651
	},
	{
		"lat": 46.471526,
		"lng": -96.725897
	},
	{
		"lat": 46.471576,
		"lng": -96.726092
	},
	{
		"lat": 46.471654,
		"lng": -96.726325
	},
	{
		"lat": 46.47168,
		"lng": -96.726422
	},
	{
		"lat": 46.471801,
		"lng": -96.726615
	},
	{
		"lat": 46.471877,
		"lng": -96.726724
	},
	{
		"lat": 46.472035,
		"lng": -96.726936
	},
	{
		"lat": 46.472094,
		"lng": -96.726995
	},
	{
		"lat": 46.472282,
		"lng": -96.727147
	},
	{
		"lat": 46.472349,
		"lng": -96.727185
	},
	{
		"lat": 46.472419,
		"lng": -96.727208
	},
	{
		"lat": 46.472562,
		"lng": -96.727231
	},
	{
		"lat": 46.472706,
		"lng": -96.727239
	},
	{
		"lat": 46.472778,
		"lng": -96.727237
	},
	{
		"lat": 46.473101,
		"lng": -96.727202
	},
	{
		"lat": 46.473244,
		"lng": -96.727177
	},
	{
		"lat": 46.473315,
		"lng": -96.727159
	},
	{
		"lat": 46.473958,
		"lng": -96.727048
	},
	{
		"lat": 46.474101,
		"lng": -96.727018
	},
	{
		"lat": 46.474171,
		"lng": -96.726996
	},
	{
		"lat": 46.474207,
		"lng": -96.72699
	},
	{
		"lat": 46.474383,
		"lng": -96.726933
	},
	{
		"lat": 46.474485,
		"lng": -96.726884
	},
	{
		"lat": 46.474591,
		"lng": -96.726851
	},
	{
		"lat": 46.474968,
		"lng": -96.726678
	},
	{
		"lat": 46.475165,
		"lng": -96.72655
	},
	{
		"lat": 46.475234,
		"lng": -96.726519
	},
	{
		"lat": 46.475269,
		"lng": -96.72651
	},
	{
		"lat": 46.475485,
		"lng": -96.726511
	},
	{
		"lat": 46.475701,
		"lng": -96.726538
	},
	{
		"lat": 46.475985,
		"lng": -96.726599
	},
	{
		"lat": 46.476157,
		"lng": -96.726677
	},
	{
		"lat": 46.476189,
		"lng": -96.726701
	},
	{
		"lat": 46.476278,
		"lng": -96.72679
	},
	{
		"lat": 46.47638,
		"lng": -96.726936
	},
	{
		"lat": 46.476445,
		"lng": -96.72706
	},
	{
		"lat": 46.476482,
		"lng": -96.727149
	},
	{
		"lat": 46.476558,
		"lng": -96.727383
	},
	{
		"lat": 46.476568,
		"lng": -96.727432
	},
	{
		"lat": 46.47661,
		"lng": -96.727549
	},
	{
		"lat": 46.47662,
		"lng": -96.727591
	},
	{
		"lat": 46.47671,
		"lng": -96.727936
	},
	{
		"lat": 46.476729,
		"lng": -96.727981
	},
	{
		"lat": 46.476742,
		"lng": -96.728029
	},
	{
		"lat": 46.47678,
		"lng": -96.728229
	},
	{
		"lat": 46.476803,
		"lng": -96.728381
	},
	{
		"lat": 46.476813,
		"lng": -96.728483
	},
	{
		"lat": 46.476814,
		"lng": -96.728535
	},
	{
		"lat": 46.4768,
		"lng": -96.728637
	},
	{
		"lat": 46.476769,
		"lng": -96.728786
	},
	{
		"lat": 46.476857,
		"lng": -96.729071
	},
	{
		"lat": 46.476893,
		"lng": -96.729161
	},
	{
		"lat": 46.476915,
		"lng": -96.729202
	},
	{
		"lat": 46.477169,
		"lng": -96.72957
	},
	{
		"lat": 46.477254,
		"lng": -96.729665
	},
	{
		"lat": 46.477285,
		"lng": -96.729692
	},
	{
		"lat": 46.477449,
		"lng": -96.729799
	},
	{
		"lat": 46.477623,
		"lng": -96.729865
	},
	{
		"lat": 46.477659,
		"lng": -96.729874
	},
	{
		"lat": 46.477839,
		"lng": -96.729896
	},
	{
		"lat": 46.477911,
		"lng": -96.729893
	},
	{
		"lat": 46.477982,
		"lng": -96.729879
	},
	{
		"lat": 46.478017,
		"lng": -96.729867
	},
	{
		"lat": 46.478051,
		"lng": -96.729877
	},
	{
		"lat": 46.478153,
		"lng": -96.729955
	},
	{
		"lat": 46.478274,
		"lng": -96.730047
	},
	{
		"lat": 46.478491,
		"lng": -96.730231
	},
	{
		"lat": 46.478586,
		"lng": -96.730305
	},
	{
		"lat": 46.478693,
		"lng": -96.730445
	},
	{
		"lat": 46.478738,
		"lng": -96.730526
	},
	{
		"lat": 46.478756,
		"lng": -96.73057
	},
	{
		"lat": 46.478784,
		"lng": -96.730666
	},
	{
		"lat": 46.478794,
		"lng": -96.730716
	},
	{
		"lat": 46.478803,
		"lng": -96.730871
	},
	{
		"lat": 46.478795,
		"lng": -96.730974
	},
	{
		"lat": 46.478775,
		"lng": -96.731074
	},
	{
		"lat": 46.478712,
		"lng": -96.73126
	},
	{
		"lat": 46.478666,
		"lng": -96.731341
	},
	{
		"lat": 46.478616,
		"lng": -96.731415
	},
	{
		"lat": 46.478573,
		"lng": -96.731498
	},
	{
		"lat": 46.478548,
		"lng": -96.731536
	},
	{
		"lat": 46.478411,
		"lng": -96.731704
	},
	{
		"lat": 46.47835,
		"lng": -96.73176
	},
	{
		"lat": 46.478286,
		"lng": -96.731808
	},
	{
		"lat": 46.478212,
		"lng": -96.731854
	},
	{
		"lat": 46.478187,
		"lng": -96.73187
	},
	{
		"lat": 46.478163,
		"lng": -96.731903
	},
	{
		"lat": 46.478151,
		"lng": -96.732006
	},
	{
		"lat": 46.478147,
		"lng": -96.732162
	},
	{
		"lat": 46.478168,
		"lng": -96.732314
	},
	{
		"lat": 46.4782,
		"lng": -96.732407
	},
	{
		"lat": 46.47824,
		"lng": -96.732494
	},
	{
		"lat": 46.478341,
		"lng": -96.732642
	},
	{
		"lat": 46.478402,
		"lng": -96.732696
	},
	{
		"lat": 46.478467,
		"lng": -96.732743
	},
	{
		"lat": 46.478534,
		"lng": -96.732781
	},
	{
		"lat": 46.478712,
		"lng": -96.732819
	},
	{
		"lat": 46.478928,
		"lng": -96.732825
	},
	{
		"lat": 46.479109,
		"lng": -96.732824
	},
	{
		"lat": 46.479469,
		"lng": -96.732808
	},
	{
		"lat": 46.47952,
		"lng": -96.732799
	},
	{
		"lat": 46.479652,
		"lng": -96.732786
	},
	{
		"lat": 46.47976,
		"lng": -96.732802
	},
	{
		"lat": 46.479863,
		"lng": -96.732848
	},
	{
		"lat": 46.479991,
		"lng": -96.732945
	},
	{
		"lat": 46.48002,
		"lng": -96.732975
	},
	{
		"lat": 46.480115,
		"lng": -96.733049
	},
	{
		"lat": 46.480204,
		"lng": -96.733138
	},
	{
		"lat": 46.480386,
		"lng": -96.733388
	},
	{
		"lat": 46.480472,
		"lng": -96.733554
	},
	{
		"lat": 46.480527,
		"lng": -96.733688
	},
	{
		"lat": 46.480556,
		"lng": -96.733782
	},
	{
		"lat": 46.480592,
		"lng": -96.733928
	},
	{
		"lat": 46.480616,
		"lng": -96.734132
	},
	{
		"lat": 46.480625,
		"lng": -96.734287
	},
	{
		"lat": 46.480629,
		"lng": -96.73465
	},
	{
		"lat": 46.480627,
		"lng": -96.734701
	},
	{
		"lat": 46.480615,
		"lng": -96.734804
	},
	{
		"lat": 46.480582,
		"lng": -96.735005
	},
	{
		"lat": 46.48057,
		"lng": -96.735054
	},
	{
		"lat": 46.480511,
		"lng": -96.735185
	},
	{
		"lat": 46.48048,
		"lng": -96.735278
	},
	{
		"lat": 46.480385,
		"lng": -96.735434
	},
	{
		"lat": 46.480334,
		"lng": -96.735508
	},
	{
		"lat": 46.480249,
		"lng": -96.735604
	},
	{
		"lat": 46.480184,
		"lng": -96.735647
	},
	{
		"lat": 46.480116,
		"lng": -96.735681
	},
	{
		"lat": 46.480046,
		"lng": -96.735707
	},
	{
		"lat": 46.479974,
		"lng": -96.735717
	},
	{
		"lat": 46.479794,
		"lng": -96.735726
	},
	{
		"lat": 46.479579,
		"lng": -96.735699
	},
	{
		"lat": 46.479473,
		"lng": -96.73567
	},
	{
		"lat": 46.4793,
		"lng": -96.735599
	},
	{
		"lat": 46.479234,
		"lng": -96.735559
	},
	{
		"lat": 46.479063,
		"lng": -96.735479
	},
	{
		"lat": 46.478931,
		"lng": -96.735398
	},
	{
		"lat": 46.478829,
		"lng": -96.735353
	},
	{
		"lat": 46.478803,
		"lng": -96.735347
	},
	{
		"lat": 46.478793,
		"lng": -96.735345
	},
	{
		"lat": 46.478724,
		"lng": -96.735317
	},
	{
		"lat": 46.478618,
		"lng": -96.735284
	},
	{
		"lat": 46.478511,
		"lng": -96.735267
	},
	{
		"lat": 46.478332,
		"lng": -96.735253
	},
	{
		"lat": 46.47826,
		"lng": -96.735258
	},
	{
		"lat": 46.478118,
		"lng": -96.735286
	},
	{
		"lat": 46.477914,
		"lng": -96.735385
	},
	{
		"lat": 46.477788,
		"lng": -96.735485
	},
	{
		"lat": 46.477731,
		"lng": -96.735549
	},
	{
		"lat": 46.477678,
		"lng": -96.735618
	},
	{
		"lat": 46.47763,
		"lng": -96.735695
	},
	{
		"lat": 46.477563,
		"lng": -96.735817
	},
	{
		"lat": 46.477497,
		"lng": -96.736001
	},
	{
		"lat": 46.477453,
		"lng": -96.736252
	},
	{
		"lat": 46.47743,
		"lng": -96.736457
	},
	{
		"lat": 46.477427,
		"lng": -96.736679
	},
	{
		"lat": 46.477426,
		"lng": -96.736716
	},
	{
		"lat": 46.477455,
		"lng": -96.736919
	},
	{
		"lat": 46.477472,
		"lng": -96.737072
	},
	{
		"lat": 46.47749,
		"lng": -96.737173
	},
	{
		"lat": 46.47755,
		"lng": -96.737417
	},
	{
		"lat": 46.477569,
		"lng": -96.737461
	},
	{
		"lat": 46.477593,
		"lng": -96.737559
	},
	{
		"lat": 46.477645,
		"lng": -96.737694
	},
	{
		"lat": 46.477812,
		"lng": -96.738092
	},
	{
		"lat": 46.477834,
		"lng": -96.738134
	},
	{
		"lat": 46.477906,
		"lng": -96.73825
	},
	{
		"lat": 46.477957,
		"lng": -96.738325
	},
	{
		"lat": 46.478108,
		"lng": -96.738543
	},
	{
		"lat": 46.478164,
		"lng": -96.738609
	},
	{
		"lat": 46.478229,
		"lng": -96.738651
	},
	{
		"lat": 46.478324,
		"lng": -96.738725
	},
	{
		"lat": 46.478531,
		"lng": -96.738813
	},
	{
		"lat": 46.478706,
		"lng": -96.738875
	},
	{
		"lat": 46.478776,
		"lng": -96.738895
	},
	{
		"lat": 46.478883,
		"lng": -96.738916
	},
	{
		"lat": 46.478955,
		"lng": -96.73892
	},
	{
		"lat": 46.479133,
		"lng": -96.7389
	},
	{
		"lat": 46.479204,
		"lng": -96.73888
	},
	{
		"lat": 46.479509,
		"lng": -96.738727
	},
	{
		"lat": 46.479632,
		"lng": -96.738637
	},
	{
		"lat": 46.4797,
		"lng": -96.738602
	},
	{
		"lat": 46.479857,
		"lng": -96.738477
	},
	{
		"lat": 46.480426,
		"lng": -96.737938
	},
	{
		"lat": 46.480482,
		"lng": -96.737874
	},
	{
		"lat": 46.480689,
		"lng": -96.737668
	},
	{
		"lat": 46.480752,
		"lng": -96.73762
	},
	{
		"lat": 46.480867,
		"lng": -96.737496
	},
	{
		"lat": 46.481046,
		"lng": -96.737322
	},
	{
		"lat": 46.481337,
		"lng": -96.736936
	},
	{
		"lat": 46.481412,
		"lng": -96.736823
	},
	{
		"lat": 46.481593,
		"lng": -96.736501
	},
	{
		"lat": 46.481635,
		"lng": -96.736417
	},
	{
		"lat": 46.481716,
		"lng": -96.736186
	},
	{
		"lat": 46.481721,
		"lng": -96.736159
	},
	{
		"lat": 46.481744,
		"lng": -96.736036
	},
	{
		"lat": 46.481833,
		"lng": -96.735218
	},
	{
		"lat": 46.481906,
		"lng": -96.734817
	},
	{
		"lat": 46.481946,
		"lng": -96.734514
	},
	{
		"lat": 46.481964,
		"lng": -96.734427
	},
	{
		"lat": 46.481977,
		"lng": -96.734365
	},
	{
		"lat": 46.481992,
		"lng": -96.734264
	},
	{
		"lat": 46.482015,
		"lng": -96.734165
	},
	{
		"lat": 46.48205,
		"lng": -96.733912
	},
	{
		"lat": 46.482197,
		"lng": -96.733273
	},
	{
		"lat": 46.482243,
		"lng": -96.733133
	},
	{
		"lat": 46.48228,
		"lng": -96.733044
	},
	{
		"lat": 46.482373,
		"lng": -96.732887
	},
	{
		"lat": 46.482537,
		"lng": -96.732685
	},
	{
		"lat": 46.482595,
		"lng": -96.732624
	},
	{
		"lat": 46.482627,
		"lng": -96.732599
	},
	{
		"lat": 46.482761,
		"lng": -96.732523
	},
	{
		"lat": 46.482936,
		"lng": -96.732463
	},
	{
		"lat": 46.482971,
		"lng": -96.732458
	},
	{
		"lat": 46.48308,
		"lng": -96.732461
	},
	{
		"lat": 46.483222,
		"lng": -96.732486
	},
	{
		"lat": 46.483257,
		"lng": -96.732499
	},
	{
		"lat": 46.483358,
		"lng": -96.732556
	},
	{
		"lat": 46.483486,
		"lng": -96.732649
	},
	{
		"lat": 46.483579,
		"lng": -96.732728
	},
	{
		"lat": 46.483781,
		"lng": -96.732945
	},
	{
		"lat": 46.483858,
		"lng": -96.733053
	},
	{
		"lat": 46.484021,
		"lng": -96.733329
	},
	{
		"lat": 46.484154,
		"lng": -96.733636
	},
	{
		"lat": 46.484215,
		"lng": -96.733822
	},
	{
		"lat": 46.484318,
		"lng": -96.734094
	},
	{
		"lat": 46.484365,
		"lng": -96.734233
	},
	{
		"lat": 46.484416,
		"lng": -96.734369
	},
	{
		"lat": 46.484494,
		"lng": -96.734542
	},
	{
		"lat": 46.48468,
		"lng": -96.734922
	},
	{
		"lat": 46.484739,
		"lng": -96.735052
	},
	{
		"lat": 46.484749,
		"lng": -96.735079
	},
	{
		"lat": 46.484775,
		"lng": -96.735142
	},
	{
		"lat": 46.484797,
		"lng": -96.735183
	},
	{
		"lat": 46.484832,
		"lng": -96.735273
	},
	{
		"lat": 46.484889,
		"lng": -96.735406
	},
	{
		"lat": 46.484948,
		"lng": -96.735811
	},
	{
		"lat": 46.48503,
		"lng": -96.736154
	},
	{
		"lat": 46.485092,
		"lng": -96.736341
	},
	{
		"lat": 46.485114,
		"lng": -96.736439
	},
	{
		"lat": 46.485146,
		"lng": -96.736641
	},
	{
		"lat": 46.485159,
		"lng": -96.73669
	},
	{
		"lat": 46.485167,
		"lng": -96.736739
	},
	{
		"lat": 46.485258,
		"lng": -96.737819
	},
	{
		"lat": 46.485279,
		"lng": -96.737971
	},
	{
		"lat": 46.485287,
		"lng": -96.738074
	},
	{
		"lat": 46.485317,
		"lng": -96.738223
	},
	{
		"lat": 46.48534,
		"lng": -96.73828
	},
	{
		"lat": 46.485364,
		"lng": -96.738378
	},
	{
		"lat": 46.485399,
		"lng": -96.738468
	},
	{
		"lat": 46.48548,
		"lng": -96.738639
	},
	{
		"lat": 46.485572,
		"lng": -96.738798
	},
	{
		"lat": 46.485801,
		"lng": -96.739128
	},
	{
		"lat": 46.485882,
		"lng": -96.73923
	},
	{
		"lat": 46.485967,
		"lng": -96.739326
	},
	{
		"lat": 46.486092,
		"lng": -96.739429
	},
	{
		"lat": 46.486253,
		"lng": -96.739544
	},
	{
		"lat": 46.486322,
		"lng": -96.739576
	},
	{
		"lat": 46.486461,
		"lng": -96.739629
	},
	{
		"lat": 46.486568,
		"lng": -96.739655
	},
	{
		"lat": 46.486747,
		"lng": -96.739679
	},
	{
		"lat": 46.486855,
		"lng": -96.739676
	},
	{
		"lat": 46.486962,
		"lng": -96.739661
	},
	{
		"lat": 46.487103,
		"lng": -96.739615
	},
	{
		"lat": 46.48717,
		"lng": -96.739578
	},
	{
		"lat": 46.487359,
		"lng": -96.739427
	},
	{
		"lat": 46.487511,
		"lng": -96.739289
	},
	{
		"lat": 46.487625,
		"lng": -96.739162
	},
	{
		"lat": 46.487834,
		"lng": -96.738879
	},
	{
		"lat": 46.488105,
		"lng": -96.738461
	},
	{
		"lat": 46.48822,
		"lng": -96.7382
	},
	{
		"lat": 46.488236,
		"lng": -96.738153
	},
	{
		"lat": 46.488295,
		"lng": -96.737909
	},
	{
		"lat": 46.488332,
		"lng": -96.737655
	},
	{
		"lat": 46.488337,
		"lng": -96.737448
	},
	{
		"lat": 46.488335,
		"lng": -96.737293
	},
	{
		"lat": 46.488318,
		"lng": -96.736931
	},
	{
		"lat": 46.488309,
		"lng": -96.736828
	},
	{
		"lat": 46.488235,
		"lng": -96.736321
	},
	{
		"lat": 46.488174,
		"lng": -96.735969
	},
	{
		"lat": 46.488104,
		"lng": -96.735514
	},
	{
		"lat": 46.48808,
		"lng": -96.735205
	},
	{
		"lat": 46.488081,
		"lng": -96.734894
	},
	{
		"lat": 46.488093,
		"lng": -96.734792
	},
	{
		"lat": 46.488124,
		"lng": -96.734698
	},
	{
		"lat": 46.48819,
		"lng": -96.734576
	},
	{
		"lat": 46.488265,
		"lng": -96.734464
	},
	{
		"lat": 46.488401,
		"lng": -96.734295
	},
	{
		"lat": 46.488459,
		"lng": -96.734234
	},
	{
		"lat": 46.488591,
		"lng": -96.73415
	},
	{
		"lat": 46.488696,
		"lng": -96.734115
	},
	{
		"lat": 46.488732,
		"lng": -96.73411
	},
	{
		"lat": 46.488804,
		"lng": -96.734114
	},
	{
		"lat": 46.488948,
		"lng": -96.734136
	},
	{
		"lat": 46.48898,
		"lng": -96.734156
	},
	{
		"lat": 46.489102,
		"lng": -96.734267
	},
	{
		"lat": 46.489385,
		"lng": -96.734588
	},
	{
		"lat": 46.489477,
		"lng": -96.734669
	},
	{
		"lat": 46.489676,
		"lng": -96.734892
	},
	{
		"lat": 46.489702,
		"lng": -96.734927
	},
	{
		"lat": 46.489844,
		"lng": -96.735087
	},
	{
		"lat": 46.48995,
		"lng": -96.735228
	},
	{
		"lat": 46.490007,
		"lng": -96.735292
	},
	{
		"lat": 46.490272,
		"lng": -96.735643
	},
	{
		"lat": 46.490822,
		"lng": -96.736391
	},
	{
		"lat": 46.491063,
		"lng": -96.736703
	},
	{
		"lat": 46.491183,
		"lng": -96.736818
	},
	{
		"lat": 46.491249,
		"lng": -96.736861
	},
	{
		"lat": 46.491311,
		"lng": -96.736914
	},
	{
		"lat": 46.491348,
		"lng": -96.73693
	},
	{
		"lat": 46.491454,
		"lng": -96.736962
	},
	{
		"lat": 46.491525,
		"lng": -96.736975
	},
	{
		"lat": 46.491561,
		"lng": -96.736976
	},
	{
		"lat": 46.491741,
		"lng": -96.736958
	},
	{
		"lat": 46.491811,
		"lng": -96.736933
	},
	{
		"lat": 46.491878,
		"lng": -96.736895
	},
	{
		"lat": 46.491968,
		"lng": -96.736809
	},
	{
		"lat": 46.492099,
		"lng": -96.736631
	},
	{
		"lat": 46.492148,
		"lng": -96.736555
	},
	{
		"lat": 46.492219,
		"lng": -96.736368
	},
	{
		"lat": 46.492235,
		"lng": -96.736328
	},
	{
		"lat": 46.492281,
		"lng": -96.736132
	},
	{
		"lat": 46.492303,
		"lng": -96.73598
	},
	{
		"lat": 46.492304,
		"lng": -96.735773
	},
	{
		"lat": 46.492298,
		"lng": -96.735152
	},
	{
		"lat": 46.492304,
		"lng": -96.735049
	},
	{
		"lat": 46.492326,
		"lng": -96.734379
	},
	{
		"lat": 46.492344,
		"lng": -96.734122
	},
	{
		"lat": 46.492397,
		"lng": -96.733715
	},
	{
		"lat": 46.492417,
		"lng": -96.733615
	},
	{
		"lat": 46.49245,
		"lng": -96.733523
	},
	{
		"lat": 46.492472,
		"lng": -96.733481
	},
	{
		"lat": 46.492655,
		"lng": -96.733233
	},
	{
		"lat": 46.492686,
		"lng": -96.733205
	},
	{
		"lat": 46.492755,
		"lng": -96.733178
	},
	{
		"lat": 46.492826,
		"lng": -96.733175
	},
	{
		"lat": 46.492934,
		"lng": -96.733188
	},
	{
		"lat": 46.492969,
		"lng": -96.733203
	},
	{
		"lat": 46.493066,
		"lng": -96.733272
	},
	{
		"lat": 46.493186,
		"lng": -96.733384
	},
	{
		"lat": 46.49325,
		"lng": -96.733433
	},
	{
		"lat": 46.493319,
		"lng": -96.733462
	},
	{
		"lat": 46.49342,
		"lng": -96.733519
	},
	{
		"lat": 46.493515,
		"lng": -96.733592
	},
	{
		"lat": 46.493548,
		"lng": -96.733612
	},
	{
		"lat": 46.49361,
		"lng": -96.733665
	},
	{
		"lat": 46.493694,
		"lng": -96.733762
	},
	{
		"lat": 46.493785,
		"lng": -96.733844
	},
	{
		"lat": 46.493867,
		"lng": -96.733947
	},
	{
		"lat": 46.494024,
		"lng": -96.734159
	},
	{
		"lat": 46.494109,
		"lng": -96.734255
	},
	{
		"lat": 46.494139,
		"lng": -96.734282
	},
	{
		"lat": 46.494276,
		"lng": -96.734448
	},
	{
		"lat": 46.49447,
		"lng": -96.734698
	},
	{
		"lat": 46.494491,
		"lng": -96.734725
	},
	{
		"lat": 46.494645,
		"lng": -96.734858
	},
	{
		"lat": 46.494679,
		"lng": -96.734876
	},
	{
		"lat": 46.494714,
		"lng": -96.734887
	},
	{
		"lat": 46.49478,
		"lng": -96.734927
	},
	{
		"lat": 46.494816,
		"lng": -96.734937
	},
	{
		"lat": 46.49496,
		"lng": -96.734948
	},
	{
		"lat": 46.495175,
		"lng": -96.734918
	},
	{
		"lat": 46.495282,
		"lng": -96.734895
	},
	{
		"lat": 46.49535,
		"lng": -96.734865
	},
	{
		"lat": 46.495482,
		"lng": -96.73478
	},
	{
		"lat": 46.495574,
		"lng": -96.734701
	},
	{
		"lat": 46.495664,
		"lng": -96.734613
	},
	{
		"lat": 46.495894,
		"lng": -96.734285
	},
	{
		"lat": 46.495983,
		"lng": -96.734122
	},
	{
		"lat": 46.49606,
		"lng": -96.733947
	},
	{
		"lat": 46.496128,
		"lng": -96.733826
	},
	{
		"lat": 46.496181,
		"lng": -96.733755
	},
	{
		"lat": 46.49621,
		"lng": -96.733724
	},
	{
		"lat": 46.49637,
		"lng": -96.733606
	},
	{
		"lat": 46.496524,
		"lng": -96.733471
	},
	{
		"lat": 46.49666,
		"lng": -96.733405
	},
	{
		"lat": 46.496695,
		"lng": -96.733393
	},
	{
		"lat": 46.496839,
		"lng": -96.73338
	},
	{
		"lat": 46.496983,
		"lng": -96.733393
	},
	{
		"lat": 46.497052,
		"lng": -96.733423
	},
	{
		"lat": 46.497116,
		"lng": -96.733468
	},
	{
		"lat": 46.49715,
		"lng": -96.733486
	},
	{
		"lat": 46.497214,
		"lng": -96.733535
	},
	{
		"lat": 46.49727,
		"lng": -96.7336
	},
	{
		"lat": 46.497502,
		"lng": -96.733923
	},
	{
		"lat": 46.497588,
		"lng": -96.73409
	},
	{
		"lat": 46.497644,
		"lng": -96.734223
	},
	{
		"lat": 46.497721,
		"lng": -96.734507
	},
	{
		"lat": 46.497768,
		"lng": -96.734704
	},
	{
		"lat": 46.49778,
		"lng": -96.734858
	},
	{
		"lat": 46.497786,
		"lng": -96.735014
	},
	{
		"lat": 46.497785,
		"lng": -96.73548
	},
	{
		"lat": 46.497772,
		"lng": -96.735842
	},
	{
		"lat": 46.49775,
		"lng": -96.736151
	},
	{
		"lat": 46.497676,
		"lng": -96.736815
	},
	{
		"lat": 46.497647,
		"lng": -96.737279
	},
	{
		"lat": 46.497644,
		"lng": -96.737382
	},
	{
		"lat": 46.497647,
		"lng": -96.737485
	},
	{
		"lat": 46.497662,
		"lng": -96.73769
	},
	{
		"lat": 46.497664,
		"lng": -96.737794
	},
	{
		"lat": 46.497695,
		"lng": -96.737996
	},
	{
		"lat": 46.497735,
		"lng": -96.738141
	},
	{
		"lat": 46.497752,
		"lng": -96.738186
	},
	{
		"lat": 46.497981,
		"lng": -96.738516
	},
	{
		"lat": 46.498039,
		"lng": -96.738577
	},
	{
		"lat": 46.498087,
		"lng": -96.738598
	},
	{
		"lat": 46.498145,
		"lng": -96.738623
	},
	{
		"lat": 46.498257,
		"lng": -96.738645
	},
	{
		"lat": 46.498407,
		"lng": -96.738646
	},
	{
		"lat": 46.498595,
		"lng": -96.738614
	},
	{
		"lat": 46.498706,
		"lng": -96.738587
	},
	{
		"lat": 46.498742,
		"lng": -96.73857
	},
	{
		"lat": 46.498777,
		"lng": -96.738546
	},
	{
		"lat": 46.49885,
		"lng": -96.738518
	},
	{
		"lat": 46.498866,
		"lng": -96.738508
	},
	{
		"lat": 46.499012,
		"lng": -96.738413
	},
	{
		"lat": 46.499074,
		"lng": -96.738364
	},
	{
		"lat": 46.499161,
		"lng": -96.738277
	},
	{
		"lat": 46.499251,
		"lng": -96.738198
	},
	{
		"lat": 46.499383,
		"lng": -96.73803
	},
	{
		"lat": 46.499433,
		"lng": -96.737959
	},
	{
		"lat": 46.499501,
		"lng": -96.737843
	},
	{
		"lat": 46.499554,
		"lng": -96.737711
	},
	{
		"lat": 46.499569,
		"lng": -96.737665
	},
	{
		"lat": 46.49966,
		"lng": -96.737587
	},
	{
		"lat": 46.499743,
		"lng": -96.737493
	},
	{
		"lat": 46.499859,
		"lng": -96.737376
	},
	{
		"lat": 46.499879,
		"lng": -96.737334
	},
	{
		"lat": 46.49994,
		"lng": -96.737207
	},
	{
		"lat": 46.500054,
		"lng": -96.737006
	},
	{
		"lat": 46.500118,
		"lng": -96.73688
	},
	{
		"lat": 46.500267,
		"lng": -96.736656
	},
	{
		"lat": 46.500351,
		"lng": -96.736559
	},
	{
		"lat": 46.500519,
		"lng": -96.736466
	},
	{
		"lat": 46.500588,
		"lng": -96.736438
	},
	{
		"lat": 46.500624,
		"lng": -96.736431
	},
	{
		"lat": 46.500696,
		"lng": -96.73643
	},
	{
		"lat": 46.500804,
		"lng": -96.736439
	},
	{
		"lat": 46.500837,
		"lng": -96.736459
	},
	{
		"lat": 46.500928,
		"lng": -96.736542
	},
	{
		"lat": 46.501062,
		"lng": -96.736715
	},
	{
		"lat": 46.501111,
		"lng": -96.736792
	},
	{
		"lat": 46.501129,
		"lng": -96.736837
	},
	{
		"lat": 46.501212,
		"lng": -96.737006
	},
	{
		"lat": 46.501227,
		"lng": -96.737053
	},
	{
		"lat": 46.50125,
		"lng": -96.737151
	},
	{
		"lat": 46.501279,
		"lng": -96.737246
	},
	{
		"lat": 46.501302,
		"lng": -96.737344
	},
	{
		"lat": 46.501327,
		"lng": -96.737496
	},
	{
		"lat": 46.501347,
		"lng": -96.737701
	},
	{
		"lat": 46.501353,
		"lng": -96.737856
	},
	{
		"lat": 46.501353,
		"lng": -96.738116
	},
	{
		"lat": 46.501349,
		"lng": -96.738271
	},
	{
		"lat": 46.501309,
		"lng": -96.738681
	},
	{
		"lat": 46.501256,
		"lng": -96.739036
	},
	{
		"lat": 46.501204,
		"lng": -96.739284
	},
	{
		"lat": 46.501168,
		"lng": -96.73943
	},
	{
		"lat": 46.501152,
		"lng": -96.739477
	},
	{
		"lat": 46.50109,
		"lng": -96.739717
	},
	{
		"lat": 46.501062,
		"lng": -96.739812
	},
	{
		"lat": 46.501014,
		"lng": -96.739951
	},
	{
		"lat": 46.500892,
		"lng": -96.740207
	},
	{
		"lat": 46.500772,
		"lng": -96.7404
	},
	{
		"lat": 46.500615,
		"lng": -96.740613
	},
	{
		"lat": 46.500528,
		"lng": -96.740705
	},
	{
		"lat": 46.500496,
		"lng": -96.74073
	},
	{
		"lat": 46.500266,
		"lng": -96.740879
	},
	{
		"lat": 46.500127,
		"lng": -96.740931
	},
	{
		"lat": 46.500024,
		"lng": -96.740978
	},
	{
		"lat": 46.499917,
		"lng": -96.740999
	},
	{
		"lat": 46.499865,
		"lng": -96.741024
	},
	{
		"lat": 46.499688,
		"lng": -96.741075
	},
	{
		"lat": 46.499619,
		"lng": -96.741105
	},
	{
		"lat": 46.499486,
		"lng": -96.741181
	},
	{
		"lat": 46.499392,
		"lng": -96.741259
	},
	{
		"lat": 46.499336,
		"lng": -96.741324
	},
	{
		"lat": 46.499258,
		"lng": -96.741432
	},
	{
		"lat": 46.499235,
		"lng": -96.741473
	},
	{
		"lat": 46.49922,
		"lng": -96.741519
	},
	{
		"lat": 46.499216,
		"lng": -96.741571
	},
	{
		"lat": 46.499219,
		"lng": -96.741778
	},
	{
		"lat": 46.49923,
		"lng": -96.74188
	},
	{
		"lat": 46.499243,
		"lng": -96.741928
	},
	{
		"lat": 46.499305,
		"lng": -96.742056
	},
	{
		"lat": 46.499378,
		"lng": -96.74217
	},
	{
		"lat": 46.499458,
		"lng": -96.742276
	},
	{
		"lat": 46.499487,
		"lng": -96.742306
	},
	{
		"lat": 46.499584,
		"lng": -96.742374
	},
	{
		"lat": 46.499618,
		"lng": -96.74239
	},
	{
		"lat": 46.499689,
		"lng": -96.74241
	},
	{
		"lat": 46.499761,
		"lng": -96.742412
	},
	{
		"lat": 46.499868,
		"lng": -96.742428
	},
	{
		"lat": 46.499976,
		"lng": -96.742415
	},
	{
		"lat": 46.500047,
		"lng": -96.7424
	},
	{
		"lat": 46.500186,
		"lng": -96.742343
	},
	{
		"lat": 46.500319,
		"lng": -96.742266
	},
	{
		"lat": 46.500477,
		"lng": -96.742141
	},
	{
		"lat": 46.500628,
		"lng": -96.741918
	},
	{
		"lat": 46.500697,
		"lng": -96.741798
	},
	{
		"lat": 46.500826,
		"lng": -96.741549
	},
	{
		"lat": 46.500907,
		"lng": -96.741377
	},
	{
		"lat": 46.500982,
		"lng": -96.7412
	},
	{
		"lat": 46.501023,
		"lng": -96.741115
	},
	{
		"lat": 46.501039,
		"lng": -96.741069
	},
	{
		"lat": 46.501078,
		"lng": -96.740981
	},
	{
		"lat": 46.501147,
		"lng": -96.740799
	},
	{
		"lat": 46.501222,
		"lng": -96.740623
	},
	{
		"lat": 46.501329,
		"lng": -96.740414
	},
	{
		"lat": 46.501447,
		"lng": -96.740219
	},
	{
		"lat": 46.501499,
		"lng": -96.740148
	},
	{
		"lat": 46.501801,
		"lng": -96.739779
	},
	{
		"lat": 46.502069,
		"lng": -96.739434
	},
	{
		"lat": 46.502343,
		"lng": -96.739096
	},
	{
		"lat": 46.50279,
		"lng": -96.738571
	},
	{
		"lat": 46.502851,
		"lng": -96.738517
	},
	{
		"lat": 46.502909,
		"lng": -96.738455
	},
	{
		"lat": 46.50327,
		"lng": -96.738112
	},
	{
		"lat": 46.503476,
		"lng": -96.737903
	},
	{
		"lat": 46.503678,
		"lng": -96.737685
	},
	{
		"lat": 46.503741,
		"lng": -96.737636
	},
	{
		"lat": 46.504062,
		"lng": -96.737301
	},
	{
		"lat": 46.504252,
		"lng": -96.737062
	},
	{
		"lat": 46.504338,
		"lng": -96.736969
	},
	{
		"lat": 46.50443,
		"lng": -96.736887
	},
	{
		"lat": 46.504599,
		"lng": -96.736692
	},
	{
		"lat": 46.504652,
		"lng": -96.736623
	},
	{
		"lat": 46.504682,
		"lng": -96.736594
	},
	{
		"lat": 46.504932,
		"lng": -96.736234
	},
	{
		"lat": 46.505031,
		"lng": -96.736083
	},
	{
		"lat": 46.505077,
		"lng": -96.736003
	},
	{
		"lat": 46.505096,
		"lng": -96.735959
	},
	{
		"lat": 46.505196,
		"lng": -96.735683
	},
	{
		"lat": 46.505237,
		"lng": -96.735484
	},
	{
		"lat": 46.505254,
		"lng": -96.735383
	},
	{
		"lat": 46.505261,
		"lng": -96.735228
	},
	{
		"lat": 46.505258,
		"lng": -96.735073
	},
	{
		"lat": 46.505229,
		"lng": -96.73487
	},
	{
		"lat": 46.505195,
		"lng": -96.734778
	},
	{
		"lat": 46.505109,
		"lng": -96.734612
	},
	{
		"lat": 46.505034,
		"lng": -96.7345
	},
	{
		"lat": 46.505005,
		"lng": -96.73447
	},
	{
		"lat": 46.504941,
		"lng": -96.734423
	},
	{
		"lat": 46.504769,
		"lng": -96.734346
	},
	{
		"lat": 46.504662,
		"lng": -96.734331
	},
	{
		"lat": 46.504193,
		"lng": -96.734362
	},
	{
		"lat": 46.504014,
		"lng": -96.734381
	},
	{
		"lat": 46.503798,
		"lng": -96.734396
	},
	{
		"lat": 46.503582,
		"lng": -96.734378
	},
	{
		"lat": 46.503548,
		"lng": -96.734364
	},
	{
		"lat": 46.503489,
		"lng": -96.734315
	},
	{
		"lat": 46.503433,
		"lng": -96.734249
	},
	{
		"lat": 46.503408,
		"lng": -96.734211
	},
	{
		"lat": 46.503347,
		"lng": -96.734084
	},
	{
		"lat": 46.503333,
		"lng": -96.733982
	},
	{
		"lat": 46.503331,
		"lng": -96.733879
	},
	{
		"lat": 46.503334,
		"lng": -96.733775
	},
	{
		"lat": 46.503348,
		"lng": -96.733674
	},
	{
		"lat": 46.503388,
		"lng": -96.733588
	},
	{
		"lat": 46.503438,
		"lng": -96.733513
	},
	{
		"lat": 46.503467,
		"lng": -96.733482
	},
	{
		"lat": 46.503567,
		"lng": -96.733423
	},
	{
		"lat": 46.503772,
		"lng": -96.733326
	},
	{
		"lat": 46.503878,
		"lng": -96.733297
	},
	{
		"lat": 46.504057,
		"lng": -96.733264
	},
	{
		"lat": 46.504129,
		"lng": -96.733259
	},
	{
		"lat": 46.504381,
		"lng": -96.733272
	},
	{
		"lat": 46.504632,
		"lng": -96.733305
	},
	{
		"lat": 46.504772,
		"lng": -96.733351
	},
	{
		"lat": 46.50491,
		"lng": -96.733414
	},
	{
		"lat": 46.504976,
		"lng": -96.733454
	},
	{
		"lat": 46.50508,
		"lng": -96.733498
	},
	{
		"lat": 46.505185,
		"lng": -96.733532
	},
	{
		"lat": 46.505252,
		"lng": -96.733568
	},
	{
		"lat": 46.505424,
		"lng": -96.733646
	},
	{
		"lat": 46.505529,
		"lng": -96.733681
	},
	{
		"lat": 46.505599,
		"lng": -96.733698
	},
	{
		"lat": 46.505634,
		"lng": -96.733712
	},
	{
		"lat": 46.50574,
		"lng": -96.733739
	},
	{
		"lat": 46.505845,
		"lng": -96.733773
	},
	{
		"lat": 46.50588,
		"lng": -96.733779
	},
	{
		"lat": 46.506194,
		"lng": -96.733889
	},
	{
		"lat": 46.506436,
		"lng": -96.733991
	},
	{
		"lat": 46.506767,
		"lng": -96.734194
	},
	{
		"lat": 46.50683,
		"lng": -96.734243
	},
	{
		"lat": 46.506983,
		"lng": -96.734379
	},
	{
		"lat": 46.507122,
		"lng": -96.734545
	},
	{
		"lat": 46.507173,
		"lng": -96.734616
	},
	{
		"lat": 46.507322,
		"lng": -96.734843
	},
	{
		"lat": 46.507406,
		"lng": -96.73501
	},
	{
		"lat": 46.507498,
		"lng": -96.735233
	},
	{
		"lat": 46.507531,
		"lng": -96.735325
	},
	{
		"lat": 46.507628,
		"lng": -96.73566
	},
	{
		"lat": 46.507692,
		"lng": -96.735902
	},
	{
		"lat": 46.507724,
		"lng": -96.735995
	},
	{
		"lat": 46.507747,
		"lng": -96.736093
	},
	{
		"lat": 46.507826,
		"lng": -96.736382
	},
	{
		"lat": 46.507892,
		"lng": -96.736566
	},
	{
		"lat": 46.507996,
		"lng": -96.736896
	},
	{
		"lat": 46.508014,
		"lng": -96.736941
	},
	{
		"lat": 46.508113,
		"lng": -96.73733
	},
	{
		"lat": 46.508198,
		"lng": -96.737615
	},
	{
		"lat": 46.508255,
		"lng": -96.737747
	},
	{
		"lat": 46.508269,
		"lng": -96.737795
	},
	{
		"lat": 46.508331,
		"lng": -96.737922
	},
	{
		"lat": 46.508418,
		"lng": -96.738087
	},
	{
		"lat": 46.508588,
		"lng": -96.738356
	},
	{
		"lat": 46.508664,
		"lng": -96.738466
	},
	{
		"lat": 46.508744,
		"lng": -96.738571
	},
	{
		"lat": 46.508833,
		"lng": -96.738658
	},
	{
		"lat": 46.508899,
		"lng": -96.738702
	},
	{
		"lat": 46.50905,
		"lng": -96.73884
	},
	{
		"lat": 46.50924,
		"lng": -96.738988
	},
	{
		"lat": 46.509341,
		"lng": -96.739043
	},
	{
		"lat": 46.509407,
		"lng": -96.739088
	},
	{
		"lat": 46.509508,
		"lng": -96.739142
	},
	{
		"lat": 46.509668,
		"lng": -96.73926
	},
	{
		"lat": 46.509801,
		"lng": -96.73934
	},
	{
		"lat": 46.509926,
		"lng": -96.739443
	},
	{
		"lat": 46.510016,
		"lng": -96.739528
	},
	{
		"lat": 46.51011,
		"lng": -96.739605
	},
	{
		"lat": 46.510199,
		"lng": -96.739693
	},
	{
		"lat": 46.510256,
		"lng": -96.739756
	},
	{
		"lat": 46.51031,
		"lng": -96.739824
	},
	{
		"lat": 46.510334,
		"lng": -96.739862
	},
	{
		"lat": 46.510414,
		"lng": -96.739967
	},
	{
		"lat": 46.510581,
		"lng": -96.740164
	},
	{
		"lat": 46.510786,
		"lng": -96.740374
	},
	{
		"lat": 46.510853,
		"lng": -96.740412
	},
	{
		"lat": 46.510889,
		"lng": -96.740421
	},
	{
		"lat": 46.511104,
		"lng": -96.740445
	},
	{
		"lat": 46.511176,
		"lng": -96.740435
	},
	{
		"lat": 46.511246,
		"lng": -96.740413
	},
	{
		"lat": 46.511346,
		"lng": -96.740352
	},
	{
		"lat": 46.511417,
		"lng": -96.740263
	},
	{
		"lat": 46.51146,
		"lng": -96.74018
	},
	{
		"lat": 46.511498,
		"lng": -96.740092
	},
	{
		"lat": 46.51153,
		"lng": -96.74
	},
	{
		"lat": 46.511557,
		"lng": -96.739849
	},
	{
		"lat": 46.51157,
		"lng": -96.73954
	},
	{
		"lat": 46.511562,
		"lng": -96.739178
	},
	{
		"lat": 46.511556,
		"lng": -96.739075
	},
	{
		"lat": 46.511527,
		"lng": -96.738926
	},
	{
		"lat": 46.511494,
		"lng": -96.738834
	},
	{
		"lat": 46.511483,
		"lng": -96.738784
	},
	{
		"lat": 46.511477,
		"lng": -96.738733
	},
	{
		"lat": 46.511443,
		"lng": -96.738655
	},
	{
		"lat": 46.511434,
		"lng": -96.738605
	},
	{
		"lat": 46.511418,
		"lng": -96.738559
	},
	{
		"lat": 46.511379,
		"lng": -96.738472
	},
	{
		"lat": 46.511236,
		"lng": -96.738115
	},
	{
		"lat": 46.51115,
		"lng": -96.73795
	},
	{
		"lat": 46.511096,
		"lng": -96.737815
	},
	{
		"lat": 46.511074,
		"lng": -96.737774
	},
	{
		"lat": 46.511018,
		"lng": -96.737584
	},
	{
		"lat": 46.511006,
		"lng": -96.737554
	},
	{
		"lat": 46.510963,
		"lng": -96.73745
	},
	{
		"lat": 46.510949,
		"lng": -96.737402
	},
	{
		"lat": 46.510915,
		"lng": -96.737311
	},
	{
		"lat": 46.510874,
		"lng": -96.737226
	},
	{
		"lat": 46.510832,
		"lng": -96.737083
	},
	{
		"lat": 46.510763,
		"lng": -96.736789
	},
	{
		"lat": 46.51068,
		"lng": -96.736338
	},
	{
		"lat": 46.510659,
		"lng": -96.736133
	},
	{
		"lat": 46.510656,
		"lng": -96.735977
	},
	{
		"lat": 46.510678,
		"lng": -96.735616
	},
	{
		"lat": 46.510707,
		"lng": -96.73536
	},
	{
		"lat": 46.510723,
		"lng": -96.735259
	},
	{
		"lat": 46.510809,
		"lng": -96.735031
	},
	{
		"lat": 46.510891,
		"lng": -96.734861
	},
	{
		"lat": 46.510991,
		"lng": -96.734711
	},
	{
		"lat": 46.511074,
		"lng": -96.73461
	},
	{
		"lat": 46.511133,
		"lng": -96.734551
	},
	{
		"lat": 46.511189,
		"lng": -96.734486
	},
	{
		"lat": 46.511251,
		"lng": -96.734434
	},
	{
		"lat": 46.51135,
		"lng": -96.734371
	},
	{
		"lat": 46.511451,
		"lng": -96.734315
	},
	{
		"lat": 46.511555,
		"lng": -96.734273
	},
	{
		"lat": 46.51173,
		"lng": -96.734213
	},
	{
		"lat": 46.511874,
		"lng": -96.734196
	},
	{
		"lat": 46.512125,
		"lng": -96.734216
	},
	{
		"lat": 46.51216,
		"lng": -96.734227
	},
	{
		"lat": 46.512296,
		"lng": -96.734296
	},
	{
		"lat": 46.512393,
		"lng": -96.734362
	},
	{
		"lat": 46.512452,
		"lng": -96.734421
	},
	{
		"lat": 46.512582,
		"lng": -96.734601
	},
	{
		"lat": 46.512691,
		"lng": -96.734806
	},
	{
		"lat": 46.51281,
		"lng": -96.735064
	},
	{
		"lat": 46.512846,
		"lng": -96.735153
	},
	{
		"lat": 46.512877,
		"lng": -96.735246
	},
	{
		"lat": 46.512912,
		"lng": -96.735335
	},
	{
		"lat": 46.512976,
		"lng": -96.73552
	},
	{
		"lat": 46.512999,
		"lng": -96.73556
	},
	{
		"lat": 46.513046,
		"lng": -96.735699
	},
	{
		"lat": 46.513068,
		"lng": -96.735739
	},
	{
		"lat": 46.513144,
		"lng": -96.735936
	},
	{
		"lat": 46.513155,
		"lng": -96.735965
	},
	{
		"lat": 46.51336,
		"lng": -96.736389
	},
	{
		"lat": 46.513432,
		"lng": -96.736505
	},
	{
		"lat": 46.513616,
		"lng": -96.736753
	},
	{
		"lat": 46.513993,
		"lng": -96.737237
	},
	{
		"lat": 46.514054,
		"lng": -96.737292
	},
	{
		"lat": 46.514087,
		"lng": -96.737314
	},
	{
		"lat": 46.514175,
		"lng": -96.737403
	},
	{
		"lat": 46.514267,
		"lng": -96.737483
	},
	{
		"lat": 46.514427,
		"lng": -96.737602
	},
	{
		"lat": 46.514462,
		"lng": -96.737618
	},
	{
		"lat": 46.514526,
		"lng": -96.737663
	},
	{
		"lat": 46.514595,
		"lng": -96.737693
	},
	{
		"lat": 46.514674,
		"lng": -96.737749
	},
	{
		"lat": 46.514879,
		"lng": -96.737847
	},
	{
		"lat": 46.515087,
		"lng": -96.737926
	},
	{
		"lat": 46.515265,
		"lng": -96.737973
	},
	{
		"lat": 46.515479,
		"lng": -96.738003
	},
	{
		"lat": 46.515659,
		"lng": -96.738014
	},
	{
		"lat": 46.515873,
		"lng": -96.737983
	},
	{
		"lat": 46.516013,
		"lng": -96.737935
	},
	{
		"lat": 46.51619,
		"lng": -96.737886
	},
	{
		"lat": 46.516522,
		"lng": -96.737693
	},
	{
		"lat": 46.516658,
		"lng": -96.737625
	},
	{
		"lat": 46.516719,
		"lng": -96.737572
	},
	{
		"lat": 46.516886,
		"lng": -96.737474
	},
	{
		"lat": 46.516956,
		"lng": -96.737451
	},
	{
		"lat": 46.517062,
		"lng": -96.737428
	},
	{
		"lat": 46.517242,
		"lng": -96.737405
	},
	{
		"lat": 46.517349,
		"lng": -96.737411
	},
	{
		"lat": 46.517421,
		"lng": -96.737422
	},
	{
		"lat": 46.517492,
		"lng": -96.737444
	},
	{
		"lat": 46.51756,
		"lng": -96.737478
	},
	{
		"lat": 46.517685,
		"lng": -96.737581
	},
	{
		"lat": 46.517861,
		"lng": -96.73776
	},
	{
		"lat": 46.517913,
		"lng": -96.737832
	},
	{
		"lat": 46.51797,
		"lng": -96.737895
	},
	{
		"lat": 46.518106,
		"lng": -96.738065
	},
	{
		"lat": 46.518156,
		"lng": -96.738139
	},
	{
		"lat": 46.518209,
		"lng": -96.738207
	},
	{
		"lat": 46.51835,
		"lng": -96.738369
	},
	{
		"lat": 46.518456,
		"lng": -96.738506
	},
	{
		"lat": 46.518599,
		"lng": -96.738665
	},
	{
		"lat": 46.518864,
		"lng": -96.739014
	},
	{
		"lat": 46.518975,
		"lng": -96.739145
	},
	{
		"lat": 46.519065,
		"lng": -96.739231
	},
	{
		"lat": 46.519227,
		"lng": -96.739345
	},
	{
		"lat": 46.519293,
		"lng": -96.739386
	},
	{
		"lat": 46.519328,
		"lng": -96.739402
	},
	{
		"lat": 46.519388,
		"lng": -96.739457
	},
	{
		"lat": 46.519519,
		"lng": -96.73954
	},
	{
		"lat": 46.519582,
		"lng": -96.739591
	},
	{
		"lat": 46.519616,
		"lng": -96.73961
	},
	{
		"lat": 46.519677,
		"lng": -96.739664
	},
	{
		"lat": 46.519775,
		"lng": -96.73973
	},
	{
		"lat": 46.519903,
		"lng": -96.739825
	},
	{
		"lat": 46.519962,
		"lng": -96.739883
	},
	{
		"lat": 46.520047,
		"lng": -96.739981
	},
	{
		"lat": 46.520245,
		"lng": -96.740282
	},
	{
		"lat": 46.520266,
		"lng": -96.740324
	},
	{
		"lat": 46.520312,
		"lng": -96.740465
	},
	{
		"lat": 46.520322,
		"lng": -96.740514
	},
	{
		"lat": 46.520322,
		"lng": -96.74067
	},
	{
		"lat": 46.520315,
		"lng": -96.740721
	},
	{
		"lat": 46.520294,
		"lng": -96.74082
	},
	{
		"lat": 46.520279,
		"lng": -96.740868
	},
	{
		"lat": 46.520225,
		"lng": -96.741002
	},
	{
		"lat": 46.52018,
		"lng": -96.741083
	},
	{
		"lat": 46.520104,
		"lng": -96.741194
	},
	{
		"lat": 46.519945,
		"lng": -96.741404
	},
	{
		"lat": 46.519737,
		"lng": -96.74161
	},
	{
		"lat": 46.51964,
		"lng": -96.741681
	},
	{
		"lat": 46.51958,
		"lng": -96.741737
	},
	{
		"lat": 46.519516,
		"lng": -96.741785
	},
	{
		"lat": 46.519433,
		"lng": -96.741885
	},
	{
		"lat": 46.519355,
		"lng": -96.741993
	},
	{
		"lat": 46.519309,
		"lng": -96.742072
	},
	{
		"lat": 46.519215,
		"lng": -96.742294
	},
	{
		"lat": 46.519202,
		"lng": -96.742342
	},
	{
		"lat": 46.519157,
		"lng": -96.742593
	},
	{
		"lat": 46.519142,
		"lng": -96.742695
	},
	{
		"lat": 46.519138,
		"lng": -96.742746
	},
	{
		"lat": 46.51914,
		"lng": -96.743057
	},
	{
		"lat": 46.519179,
		"lng": -96.743363
	},
	{
		"lat": 46.51921,
		"lng": -96.743512
	},
	{
		"lat": 46.519251,
		"lng": -96.743656
	},
	{
		"lat": 46.519273,
		"lng": -96.743697
	},
	{
		"lat": 46.519304,
		"lng": -96.743791
	},
	{
		"lat": 46.519328,
		"lng": -96.74384
	},
	{
		"lat": 46.519341,
		"lng": -96.743889
	},
	{
		"lat": 46.519391,
		"lng": -96.744027
	},
	{
		"lat": 46.519597,
		"lng": -96.744452
	},
	{
		"lat": 46.519687,
		"lng": -96.744614
	},
	{
		"lat": 46.519941,
		"lng": -96.74498
	},
	{
		"lat": 46.520022,
		"lng": -96.745083
	},
	{
		"lat": 46.52011,
		"lng": -96.745173
	},
	{
		"lat": 46.520175,
		"lng": -96.745217
	},
	{
		"lat": 46.520209,
		"lng": -96.74523
	},
	{
		"lat": 46.520317,
		"lng": -96.74523
	},
	{
		"lat": 46.520389,
		"lng": -96.745216
	},
	{
		"lat": 46.520423,
		"lng": -96.745197
	},
	{
		"lat": 46.520453,
		"lng": -96.74517
	},
	{
		"lat": 46.52053,
		"lng": -96.745061
	},
	{
		"lat": 46.520576,
		"lng": -96.744981
	},
	{
		"lat": 46.520595,
		"lng": -96.744937
	},
	{
		"lat": 46.520643,
		"lng": -96.744797
	},
	{
		"lat": 46.52067,
		"lng": -96.744593
	},
	{
		"lat": 46.520667,
		"lng": -96.744386
	},
	{
		"lat": 46.520653,
		"lng": -96.744076
	},
	{
		"lat": 46.520627,
		"lng": -96.743819
	},
	{
		"lat": 46.52053,
		"lng": -96.743109
	},
	{
		"lat": 46.520512,
		"lng": -96.743008
	},
	{
		"lat": 46.520492,
		"lng": -96.742856
	},
	{
		"lat": 46.520473,
		"lng": -96.742598
	},
	{
		"lat": 46.520471,
		"lng": -96.742495
	},
	{
		"lat": 46.520489,
		"lng": -96.742237
	},
	{
		"lat": 46.5205,
		"lng": -96.742188
	},
	{
		"lat": 46.520557,
		"lng": -96.741998
	},
	{
		"lat": 46.520606,
		"lng": -96.74186
	},
	{
		"lat": 46.520693,
		"lng": -96.741695
	},
	{
		"lat": 46.520733,
		"lng": -96.741632
	},
	{
		"lat": 46.520767,
		"lng": -96.741581
	},
	{
		"lat": 46.521073,
		"lng": -96.741142
	},
	{
		"lat": 46.521182,
		"lng": -96.741005
	},
	{
		"lat": 46.521281,
		"lng": -96.740856
	},
	{
		"lat": 46.521411,
		"lng": -96.740675
	},
	{
		"lat": 46.521556,
		"lng": -96.740445
	},
	{
		"lat": 46.521599,
		"lng": -96.740361
	},
	{
		"lat": 46.5217,
		"lng": -96.740086
	},
	{
		"lat": 46.521738,
		"lng": -96.739942
	},
	{
		"lat": 46.521766,
		"lng": -96.739846
	},
	{
		"lat": 46.521824,
		"lng": -96.739441
	},
	{
		"lat": 46.521852,
		"lng": -96.738872
	},
	{
		"lat": 46.52184,
		"lng": -96.738614
	},
	{
		"lat": 46.521807,
		"lng": -96.738359
	},
	{
		"lat": 46.521793,
		"lng": -96.738153
	},
	{
		"lat": 46.521791,
		"lng": -96.737894
	},
	{
		"lat": 46.521795,
		"lng": -96.737842
	},
	{
		"lat": 46.521805,
		"lng": -96.737792
	},
	{
		"lat": 46.521861,
		"lng": -96.737601
	},
	{
		"lat": 46.521948,
		"lng": -96.737436
	},
	{
		"lat": 46.522003,
		"lng": -96.737369
	},
	{
		"lat": 46.522066,
		"lng": -96.737316
	},
	{
		"lat": 46.522093,
		"lng": -96.737282
	},
	{
		"lat": 46.522123,
		"lng": -96.737254
	},
	{
		"lat": 46.522251,
		"lng": -96.73716
	},
	{
		"lat": 46.522422,
		"lng": -96.737083
	},
	{
		"lat": 46.522561,
		"lng": -96.737032
	},
	{
		"lat": 46.522631,
		"lng": -96.737012
	},
	{
		"lat": 46.523205,
		"lng": -96.736937
	},
	{
		"lat": 46.523455,
		"lng": -96.736891
	},
	{
		"lat": 46.52349,
		"lng": -96.736878
	},
	{
		"lat": 46.523561,
		"lng": -96.736863
	},
	{
		"lat": 46.523596,
		"lng": -96.736848
	},
	{
		"lat": 46.523738,
		"lng": -96.73682
	},
	{
		"lat": 46.523879,
		"lng": -96.736776
	},
	{
		"lat": 46.52413,
		"lng": -96.736741
	},
	{
		"lat": 46.524345,
		"lng": -96.736757
	},
	{
		"lat": 46.524452,
		"lng": -96.736783
	},
	{
		"lat": 46.524692,
		"lng": -96.736893
	},
	{
		"lat": 46.524758,
		"lng": -96.736933
	},
	{
		"lat": 46.524793,
		"lng": -96.736945
	},
	{
		"lat": 46.524856,
		"lng": -96.736994
	},
	{
		"lat": 46.524956,
		"lng": -96.737055
	},
	{
		"lat": 46.525016,
		"lng": -96.73711
	},
	{
		"lat": 46.525074,
		"lng": -96.737173
	},
	{
		"lat": 46.525174,
		"lng": -96.737322
	},
	{
		"lat": 46.52522,
		"lng": -96.737401
	},
	{
		"lat": 46.525262,
		"lng": -96.737485
	},
	{
		"lat": 46.525316,
		"lng": -96.73762
	},
	{
		"lat": 46.525343,
		"lng": -96.737716
	},
	{
		"lat": 46.525361,
		"lng": -96.737761
	},
	{
		"lat": 46.525373,
		"lng": -96.73781
	},
	{
		"lat": 46.525388,
		"lng": -96.737911
	},
	{
		"lat": 46.525404,
		"lng": -96.737958
	},
	{
		"lat": 46.525413,
		"lng": -96.738008
	},
	{
		"lat": 46.525471,
		"lng": -96.73852
	},
	{
		"lat": 46.525499,
		"lng": -96.73888
	},
	{
		"lat": 46.525504,
		"lng": -96.739087
	},
	{
		"lat": 46.525502,
		"lng": -96.739242
	},
	{
		"lat": 46.52549,
		"lng": -96.7395
	},
	{
		"lat": 46.525476,
		"lng": -96.739706
	},
	{
		"lat": 46.52545,
		"lng": -96.73991
	},
	{
		"lat": 46.525421,
		"lng": -96.74006
	},
	{
		"lat": 46.525365,
		"lng": -96.74025
	},
	{
		"lat": 46.525344,
		"lng": -96.740293
	},
	{
		"lat": 46.525278,
		"lng": -96.740477
	},
	{
		"lat": 46.525237,
		"lng": -96.740562
	},
	{
		"lat": 46.525166,
		"lng": -96.740742
	},
	{
		"lat": 46.525127,
		"lng": -96.740829
	},
	{
		"lat": 46.525119,
		"lng": -96.74088
	},
	{
		"lat": 46.525057,
		"lng": -96.741064
	},
	{
		"lat": 46.525019,
		"lng": -96.741153
	},
	{
		"lat": 46.524928,
		"lng": -96.741434
	},
	{
		"lat": 46.524905,
		"lng": -96.741532
	},
	{
		"lat": 46.524868,
		"lng": -96.741732
	},
	{
		"lat": 46.524854,
		"lng": -96.74178
	},
	{
		"lat": 46.524838,
		"lng": -96.741881
	},
	{
		"lat": 46.524778,
		"lng": -96.742444
	},
	{
		"lat": 46.524762,
		"lng": -96.742672
	},
	{
		"lat": 46.524753,
		"lng": -96.742804
	},
	{
		"lat": 46.524763,
		"lng": -96.742959
	},
	{
		"lat": 46.524768,
		"lng": -96.743166
	},
	{
		"lat": 46.524754,
		"lng": -96.74358
	},
	{
		"lat": 46.524726,
		"lng": -96.743992
	},
	{
		"lat": 46.524711,
		"lng": -96.744302
	},
	{
		"lat": 46.524705,
		"lng": -96.744509
	},
	{
		"lat": 46.524711,
		"lng": -96.744768
	},
	{
		"lat": 46.524733,
		"lng": -96.744909
	},
	{
		"lat": 46.52476,
		"lng": -96.745006
	},
	{
		"lat": 46.524819,
		"lng": -96.745136
	},
	{
		"lat": 46.524872,
		"lng": -96.745206
	},
	{
		"lat": 46.524982,
		"lng": -96.745335
	},
	{
		"lat": 46.525048,
		"lng": -96.745376
	},
	{
		"lat": 46.525083,
		"lng": -96.745386
	},
	{
		"lat": 46.525186,
		"lng": -96.745435
	},
	{
		"lat": 46.525326,
		"lng": -96.745481
	},
	{
		"lat": 46.525396,
		"lng": -96.745459
	},
	{
		"lat": 46.525429,
		"lng": -96.745436
	},
	{
		"lat": 46.52549,
		"lng": -96.745381
	},
	{
		"lat": 46.525573,
		"lng": -96.745281
	},
	{
		"lat": 46.525665,
		"lng": -96.745122
	},
	{
		"lat": 46.525823,
		"lng": -96.744717
	},
	{
		"lat": 46.525833,
		"lng": -96.744667
	},
	{
		"lat": 46.525915,
		"lng": -96.744438
	},
	{
		"lat": 46.525985,
		"lng": -96.744259
	},
	{
		"lat": 46.526028,
		"lng": -96.744175
	},
	{
		"lat": 46.526062,
		"lng": -96.744085
	},
	{
		"lat": 46.52626,
		"lng": -96.743716
	},
	{
		"lat": 46.526335,
		"lng": -96.743605
	},
	{
		"lat": 46.526392,
		"lng": -96.74354
	},
	{
		"lat": 46.526515,
		"lng": -96.743433
	},
	{
		"lat": 46.526544,
		"lng": -96.743401
	},
	{
		"lat": 46.526576,
		"lng": -96.743378
	},
	{
		"lat": 46.526678,
		"lng": -96.743327
	},
	{
		"lat": 46.526748,
		"lng": -96.743301
	},
	{
		"lat": 46.526883,
		"lng": -96.74323
	},
	{
		"lat": 46.526987,
		"lng": -96.743189
	},
	{
		"lat": 46.527191,
		"lng": -96.743086
	},
	{
		"lat": 46.527431,
		"lng": -96.742976
	},
	{
		"lat": 46.527464,
		"lng": -96.742954
	},
	{
		"lat": 46.527533,
		"lng": -96.742923
	},
	{
		"lat": 46.527599,
		"lng": -96.742885
	},
	{
		"lat": 46.527725,
		"lng": -96.742801
	},
	{
		"lat": 46.527762,
		"lng": -96.742777
	},
	{
		"lat": 46.528013,
		"lng": -96.742574
	},
	{
		"lat": 46.528109,
		"lng": -96.742503
	},
	{
		"lat": 46.528229,
		"lng": -96.742388
	},
	{
		"lat": 46.528325,
		"lng": -96.742317
	},
	{
		"lat": 46.528513,
		"lng": -96.742163
	},
	{
		"lat": 46.528615,
		"lng": -96.742114
	},
	{
		"lat": 46.528716,
		"lng": -96.742059
	},
	{
		"lat": 46.528751,
		"lng": -96.742048
	},
	{
		"lat": 46.528823,
		"lng": -96.74204
	},
	{
		"lat": 46.529111,
		"lng": -96.742038
	},
	{
		"lat": 46.529291,
		"lng": -96.74205
	},
	{
		"lat": 46.529792,
		"lng": -96.74212
	},
	{
		"lat": 46.530006,
		"lng": -96.742156
	},
	{
		"lat": 46.530327,
		"lng": -96.742219
	},
	{
		"lat": 46.530432,
		"lng": -96.742252
	},
	{
		"lat": 46.530574,
		"lng": -96.742287
	},
	{
		"lat": 46.531038,
		"lng": -96.742374
	},
	{
		"lat": 46.531143,
		"lng": -96.742414
	},
	{
		"lat": 46.531496,
		"lng": -96.742515
	},
	{
		"lat": 46.53153,
		"lng": -96.742532
	},
	{
		"lat": 46.531672,
		"lng": -96.742565
	},
	{
		"lat": 46.531774,
		"lng": -96.742617
	},
	{
		"lat": 46.531952,
		"lng": -96.742658
	},
	{
		"lat": 46.532128,
		"lng": -96.74271
	},
	{
		"lat": 46.532233,
		"lng": -96.742748
	},
	{
		"lat": 46.532588,
		"lng": -96.742833
	},
	{
		"lat": 46.533154,
		"lng": -96.742985
	},
	{
		"lat": 46.533257,
		"lng": -96.743035
	},
	{
		"lat": 46.533396,
		"lng": -96.743089
	},
	{
		"lat": 46.533429,
		"lng": -96.743108
	},
	{
		"lat": 46.533493,
		"lng": -96.743157
	},
	{
		"lat": 46.533623,
		"lng": -96.743244
	},
	{
		"lat": 46.533654,
		"lng": -96.743271
	},
	{
		"lat": 46.533738,
		"lng": -96.743368
	},
	{
		"lat": 46.533816,
		"lng": -96.743475
	},
	{
		"lat": 46.533941,
		"lng": -96.743662
	},
	{
		"lat": 46.533984,
		"lng": -96.743746
	},
	{
		"lat": 46.534016,
		"lng": -96.743839
	},
	{
		"lat": 46.534069,
		"lng": -96.743975
	},
	{
		"lat": 46.534124,
		"lng": -96.744166
	},
	{
		"lat": 46.534137,
		"lng": -96.744232
	},
	{
		"lat": 46.534207,
		"lng": -96.744471
	},
	{
		"lat": 46.534251,
		"lng": -96.744723
	},
	{
		"lat": 46.534274,
		"lng": -96.744821
	},
	{
		"lat": 46.534288,
		"lng": -96.744975
	},
	{
		"lat": 46.534345,
		"lng": -96.745486
	},
	{
		"lat": 46.534358,
		"lng": -96.745535
	},
	{
		"lat": 46.534369,
		"lng": -96.745638
	},
	{
		"lat": 46.534399,
		"lng": -96.745787
	},
	{
		"lat": 46.534418,
		"lng": -96.74583
	},
	{
		"lat": 46.534547,
		"lng": -96.746011
	},
	{
		"lat": 46.534635,
		"lng": -96.746102
	},
	{
		"lat": 46.534667,
		"lng": -96.746125
	},
	{
		"lat": 46.534774,
		"lng": -96.746152
	},
	{
		"lat": 46.534881,
		"lng": -96.746165
	},
	{
		"lat": 46.534953,
		"lng": -96.746161
	},
	{
		"lat": 46.534988,
		"lng": -96.746149
	},
	{
		"lat": 46.535022,
		"lng": -96.74613
	},
	{
		"lat": 46.535053,
		"lng": -96.746103
	},
	{
		"lat": 46.53511,
		"lng": -96.746041
	},
	{
		"lat": 46.535213,
		"lng": -96.745895
	},
	{
		"lat": 46.535278,
		"lng": -96.745771
	},
	{
		"lat": 46.535315,
		"lng": -96.745681
	},
	{
		"lat": 46.535345,
		"lng": -96.745587
	},
	{
		"lat": 46.535381,
		"lng": -96.745441
	},
	{
		"lat": 46.535424,
		"lng": -96.745189
	},
	{
		"lat": 46.535436,
		"lng": -96.74514
	},
	{
		"lat": 46.535484,
		"lng": -96.744626
	},
	{
		"lat": 46.535498,
		"lng": -96.744004
	},
	{
		"lat": 46.535497,
		"lng": -96.743745
	},
	{
		"lat": 46.535488,
		"lng": -96.743227
	},
	{
		"lat": 46.535454,
		"lng": -96.742501
	},
	{
		"lat": 46.535437,
		"lng": -96.742295
	},
	{
		"lat": 46.535373,
		"lng": -96.741944
	},
	{
		"lat": 46.535317,
		"lng": -96.741698
	},
	{
		"lat": 46.535258,
		"lng": -96.741399
	},
	{
		"lat": 46.535177,
		"lng": -96.740948
	},
	{
		"lat": 46.535112,
		"lng": -96.740653
	},
	{
		"lat": 46.535017,
		"lng": -96.740264
	},
	{
		"lat": 46.534927,
		"lng": -96.739871
	},
	{
		"lat": 46.534888,
		"lng": -96.739727
	},
	{
		"lat": 46.53487,
		"lng": -96.739681
	},
	{
		"lat": 46.534831,
		"lng": -96.739537
	},
	{
		"lat": 46.534814,
		"lng": -96.739436
	},
	{
		"lat": 46.534731,
		"lng": -96.739094
	},
	{
		"lat": 46.534685,
		"lng": -96.738954
	},
	{
		"lat": 46.534662,
		"lng": -96.738855
	},
	{
		"lat": 46.534594,
		"lng": -96.738616
	},
	{
		"lat": 46.534574,
		"lng": -96.738463
	},
	{
		"lat": 46.534562,
		"lng": -96.738309
	},
	{
		"lat": 46.534563,
		"lng": -96.738205
	},
	{
		"lat": 46.534571,
		"lng": -96.738102
	},
	{
		"lat": 46.53458,
		"lng": -96.738052
	},
	{
		"lat": 46.534602,
		"lng": -96.738011
	},
	{
		"lat": 46.534682,
		"lng": -96.737907
	},
	{
		"lat": 46.534712,
		"lng": -96.737877
	},
	{
		"lat": 46.534777,
		"lng": -96.737835
	},
	{
		"lat": 46.534883,
		"lng": -96.737813
	},
	{
		"lat": 46.535027,
		"lng": -96.737812
	},
	{
		"lat": 46.535135,
		"lng": -96.737823
	},
	{
		"lat": 46.535277,
		"lng": -96.737855
	},
	{
		"lat": 46.535412,
		"lng": -96.73793
	},
	{
		"lat": 46.535547,
		"lng": -96.737993
	},
	{
		"lat": 46.535611,
		"lng": -96.73804
	},
	{
		"lat": 46.535735,
		"lng": -96.738144
	},
	{
		"lat": 46.535789,
		"lng": -96.738213
	},
	{
		"lat": 46.535915,
		"lng": -96.738395
	},
	{
		"lat": 46.535987,
		"lng": -96.738512
	},
	{
		"lat": 46.536008,
		"lng": -96.738554
	},
	{
		"lat": 46.536056,
		"lng": -96.738629
	},
	{
		"lat": 46.53614,
		"lng": -96.738799
	},
	{
		"lat": 46.536253,
		"lng": -96.739063
	},
	{
		"lat": 46.53637,
		"lng": -96.739382
	},
	{
		"lat": 46.536408,
		"lng": -96.739471
	},
	{
		"lat": 46.536493,
		"lng": -96.739698
	},
	{
		"lat": 46.536515,
		"lng": -96.739797
	},
	{
		"lat": 46.536543,
		"lng": -96.739892
	},
	{
		"lat": 46.536578,
		"lng": -96.739983
	},
	{
		"lat": 46.536602,
		"lng": -96.740081
	},
	{
		"lat": 46.536637,
		"lng": -96.740171
	},
	{
		"lat": 46.536708,
		"lng": -96.740465
	},
	{
		"lat": 46.536813,
		"lng": -96.740849
	},
	{
		"lat": 46.536857,
		"lng": -96.740991
	},
	{
		"lat": 46.536927,
		"lng": -96.741285
	},
	{
		"lat": 46.536934,
		"lng": -96.741336
	},
	{
		"lat": 46.537004,
		"lng": -96.741629
	},
	{
		"lat": 46.537034,
		"lng": -96.741724
	},
	{
		"lat": 46.537054,
		"lng": -96.741767
	},
	{
		"lat": 46.537102,
		"lng": -96.741844
	},
	{
		"lat": 46.537331,
		"lng": -96.742176
	},
	{
		"lat": 46.537412,
		"lng": -96.742279
	},
	{
		"lat": 46.537472,
		"lng": -96.742334
	},
	{
		"lat": 46.53753,
		"lng": -96.742396
	},
	{
		"lat": 46.537621,
		"lng": -96.74248
	},
	{
		"lat": 46.537751,
		"lng": -96.742568
	},
	{
		"lat": 46.537856,
		"lng": -96.742607
	},
	{
		"lat": 46.537927,
		"lng": -96.742627
	},
	{
		"lat": 46.537961,
		"lng": -96.742644
	},
	{
		"lat": 46.538104,
		"lng": -96.742655
	},
	{
		"lat": 46.538212,
		"lng": -96.742639
	},
	{
		"lat": 46.538314,
		"lng": -96.742587
	},
	{
		"lat": 46.538455,
		"lng": -96.742427
	},
	{
		"lat": 46.538607,
		"lng": -96.742208
	},
	{
		"lat": 46.538652,
		"lng": -96.742126
	},
	{
		"lat": 46.538735,
		"lng": -96.741898
	},
	{
		"lat": 46.538774,
		"lng": -96.741811
	},
	{
		"lat": 46.538832,
		"lng": -96.741621
	},
	{
		"lat": 46.538885,
		"lng": -96.74132
	},
	{
		"lat": 46.538937,
		"lng": -96.74086
	},
	{
		"lat": 46.538944,
		"lng": -96.740342
	},
	{
		"lat": 46.538936,
		"lng": -96.740031
	},
	{
		"lat": 46.538909,
		"lng": -96.739359
	},
	{
		"lat": 46.538908,
		"lng": -96.739151
	},
	{
		"lat": 46.538916,
		"lng": -96.738841
	},
	{
		"lat": 46.538925,
		"lng": -96.738687
	},
	{
		"lat": 46.538942,
		"lng": -96.738586
	},
	{
		"lat": 46.538964,
		"lng": -96.738487
	},
	{
		"lat": 46.538978,
		"lng": -96.73844
	},
	{
		"lat": 46.539053,
		"lng": -96.738329
	},
	{
		"lat": 46.539084,
		"lng": -96.738301
	},
	{
		"lat": 46.539187,
		"lng": -96.738257
	},
	{
		"lat": 46.539223,
		"lng": -96.738252
	},
	{
		"lat": 46.539294,
		"lng": -96.73826
	},
	{
		"lat": 46.539329,
		"lng": -96.738275
	},
	{
		"lat": 46.539391,
		"lng": -96.738326
	},
	{
		"lat": 46.539418,
		"lng": -96.738361
	},
	{
		"lat": 46.539491,
		"lng": -96.738473
	},
	{
		"lat": 46.539553,
		"lng": -96.738599
	},
	{
		"lat": 46.539568,
		"lng": -96.738646
	},
	{
		"lat": 46.539613,
		"lng": -96.738727
	},
	{
		"lat": 46.539656,
		"lng": -96.738869
	},
	{
		"lat": 46.539692,
		"lng": -96.739016
	},
	{
		"lat": 46.539735,
		"lng": -96.739266
	},
	{
		"lat": 46.539776,
		"lng": -96.739622
	},
	{
		"lat": 46.539788,
		"lng": -96.740141
	},
	{
		"lat": 46.539803,
		"lng": -96.741229
	},
	{
		"lat": 46.539824,
		"lng": -96.741538
	},
	{
		"lat": 46.539845,
		"lng": -96.74169
	},
	{
		"lat": 46.539855,
		"lng": -96.741793
	},
	{
		"lat": 46.539874,
		"lng": -96.741887
	},
	{
		"lat": 46.53988,
		"lng": -96.741938
	},
	{
		"lat": 46.539933,
		"lng": -96.742186
	},
	{
		"lat": 46.539968,
		"lng": -96.742334
	},
	{
		"lat": 46.540024,
		"lng": -96.742523
	},
	{
		"lat": 46.540136,
		"lng": -96.742789
	},
	{
		"lat": 46.540266,
		"lng": -96.743157
	},
	{
		"lat": 46.540319,
		"lng": -96.743349
	},
	{
		"lat": 46.540342,
		"lng": -96.743447
	},
	{
		"lat": 46.540362,
		"lng": -96.7436
	},
	{
		"lat": 46.540372,
		"lng": -96.743754
	},
	{
		"lat": 46.540368,
		"lng": -96.743858
	},
	{
		"lat": 46.540358,
		"lng": -96.743961
	},
	{
		"lat": 46.540349,
		"lng": -96.744011
	},
	{
		"lat": 46.540316,
		"lng": -96.744103
	},
	{
		"lat": 46.540229,
		"lng": -96.744268
	},
	{
		"lat": 46.540053,
		"lng": -96.744527
	},
	{
		"lat": 46.539973,
		"lng": -96.744633
	},
	{
		"lat": 46.53972,
		"lng": -96.744921
	},
	{
		"lat": 46.539638,
		"lng": -96.745023
	},
	{
		"lat": 46.539525,
		"lng": -96.745149
	},
	{
		"lat": 46.539406,
		"lng": -96.745265
	},
	{
		"lat": 46.539215,
		"lng": -96.745499
	},
	{
		"lat": 46.539189,
		"lng": -96.745536
	},
	{
		"lat": 46.539145,
		"lng": -96.745617
	},
	{
		"lat": 46.53905,
		"lng": -96.745773
	},
	{
		"lat": 46.538963,
		"lng": -96.746
	},
	{
		"lat": 46.53892,
		"lng": -96.746142
	},
	{
		"lat": 46.538873,
		"lng": -96.746339
	},
	{
		"lat": 46.538859,
		"lng": -96.74644
	},
	{
		"lat": 46.538849,
		"lng": -96.746595
	},
	{
		"lat": 46.538849,
		"lng": -96.746647
	},
	{
		"lat": 46.538859,
		"lng": -96.746802
	},
	{
		"lat": 46.538879,
		"lng": -96.746955
	},
	{
		"lat": 46.538961,
		"lng": -96.747242
	},
	{
		"lat": 46.539091,
		"lng": -96.747613
	},
	{
		"lat": 46.539206,
		"lng": -96.747875
	},
	{
		"lat": 46.539237,
		"lng": -96.747969
	},
	{
		"lat": 46.539272,
		"lng": -96.748059
	},
	{
		"lat": 46.539335,
		"lng": -96.748184
	},
	{
		"lat": 46.539517,
		"lng": -96.748569
	},
	{
		"lat": 46.539707,
		"lng": -96.748944
	},
	{
		"lat": 46.53982,
		"lng": -96.749146
	},
	{
		"lat": 46.539869,
		"lng": -96.749223
	},
	{
		"lat": 46.539912,
		"lng": -96.749306
	},
	{
		"lat": 46.540033,
		"lng": -96.749498
	},
	{
		"lat": 46.540183,
		"lng": -96.749722
	},
	{
		"lat": 46.540263,
		"lng": -96.749826
	},
	{
		"lat": 46.540351,
		"lng": -96.749917
	},
	{
		"lat": 46.540416,
		"lng": -96.749961
	},
	{
		"lat": 46.540513,
		"lng": -96.750007
	},
	{
		"lat": 46.540519,
		"lng": -96.75001
	},
	{
		"lat": 46.540589,
		"lng": -96.75003
	},
	{
		"lat": 46.540723,
		"lng": -96.750107
	},
	{
		"lat": 46.540759,
		"lng": -96.750116
	},
	{
		"lat": 46.54083,
		"lng": -96.750108
	},
	{
		"lat": 46.540901,
		"lng": -96.750088
	},
	{
		"lat": 46.540932,
		"lng": -96.750063
	},
	{
		"lat": 46.541045,
		"lng": -96.749933
	},
	{
		"lat": 46.541308,
		"lng": -96.749579
	},
	{
		"lat": 46.541406,
		"lng": -96.749361
	},
	{
		"lat": 46.541451,
		"lng": -96.74922
	},
	{
		"lat": 46.541489,
		"lng": -96.749132
	},
	{
		"lat": 46.541519,
		"lng": -96.749028
	},
	{
		"lat": 46.541555,
		"lng": -96.748937
	},
	{
		"lat": 46.541632,
		"lng": -96.748647
	},
	{
		"lat": 46.541688,
		"lng": -96.748401
	},
	{
		"lat": 46.54172,
		"lng": -96.748146
	},
	{
		"lat": 46.541737,
		"lng": -96.748045
	},
	{
		"lat": 46.541763,
		"lng": -96.747789
	},
	{
		"lat": 46.541772,
		"lng": -96.747739
	},
	{
		"lat": 46.541818,
		"lng": -96.747382
	},
	{
		"lat": 46.54183,
		"lng": -96.747333
	},
	{
		"lat": 46.541859,
		"lng": -96.747131
	},
	{
		"lat": 46.541915,
		"lng": -96.746832
	},
	{
		"lat": 46.542003,
		"lng": -96.746117
	},
	{
		"lat": 46.54203,
		"lng": -96.745705
	},
	{
		"lat": 46.542043,
		"lng": -96.745447
	},
	{
		"lat": 46.542046,
		"lng": -96.745136
	},
	{
		"lat": 46.542038,
		"lng": -96.744981
	},
	{
		"lat": 46.542016,
		"lng": -96.744829
	},
	{
		"lat": 46.541979,
		"lng": -96.744628
	},
	{
		"lat": 46.541957,
		"lng": -96.74453
	},
	{
		"lat": 46.541927,
		"lng": -96.744437
	},
	{
		"lat": 46.541902,
		"lng": -96.744341
	},
	{
		"lat": 46.541851,
		"lng": -96.744204
	},
	{
		"lat": 46.541821,
		"lng": -96.74411
	},
	{
		"lat": 46.541707,
		"lng": -96.743846
	},
	{
		"lat": 46.541339,
		"lng": -96.743143
	},
	{
		"lat": 46.541269,
		"lng": -96.743025
	},
	{
		"lat": 46.541004,
		"lng": -96.742602
	},
	{
		"lat": 46.540893,
		"lng": -96.7424
	},
	{
		"lat": 46.540857,
		"lng": -96.742309
	},
	{
		"lat": 46.540832,
		"lng": -96.742273
	},
	{
		"lat": 46.54075,
		"lng": -96.742103
	},
	{
		"lat": 46.540693,
		"lng": -96.741913
	},
	{
		"lat": 46.540673,
		"lng": -96.741813
	},
	{
		"lat": 46.540659,
		"lng": -96.741712
	},
	{
		"lat": 46.54065,
		"lng": -96.741609
	},
	{
		"lat": 46.540647,
		"lng": -96.741453
	},
	{
		"lat": 46.540653,
		"lng": -96.74135
	},
	{
		"lat": 46.540671,
		"lng": -96.741196
	},
	{
		"lat": 46.540693,
		"lng": -96.741097
	},
	{
		"lat": 46.540761,
		"lng": -96.740915
	},
	{
		"lat": 46.540799,
		"lng": -96.740826
	},
	{
		"lat": 46.540949,
		"lng": -96.740603
	},
	{
		"lat": 46.541077,
		"lng": -96.740422
	},
	{
		"lat": 46.54127,
		"lng": -96.740188
	},
	{
		"lat": 46.541301,
		"lng": -96.740162
	},
	{
		"lat": 46.541441,
		"lng": -96.739998
	},
	{
		"lat": 46.541615,
		"lng": -96.739814
	},
	{
		"lat": 46.541737,
		"lng": -96.739659
	},
	{
		"lat": 46.541797,
		"lng": -96.739602
	},
	{
		"lat": 46.541907,
		"lng": -96.73947
	},
	{
		"lat": 46.542341,
		"lng": -96.739011
	},
	{
		"lat": 46.542373,
		"lng": -96.738987
	},
	{
		"lat": 46.542461,
		"lng": -96.738897
	},
	{
		"lat": 46.542626,
		"lng": -96.738793
	},
	{
		"lat": 46.542762,
		"lng": -96.738729
	},
	{
		"lat": 46.542833,
		"lng": -96.738716
	},
	{
		"lat": 46.543048,
		"lng": -96.738701
	},
	{
		"lat": 46.54312,
		"lng": -96.738703
	},
	{
		"lat": 46.543228,
		"lng": -96.738715
	},
	{
		"lat": 46.543396,
		"lng": -96.738805
	},
	{
		"lat": 46.543462,
		"lng": -96.738847
	},
	{
		"lat": 46.543551,
		"lng": -96.738935
	},
	{
		"lat": 46.543578,
		"lng": -96.738969
	},
	{
		"lat": 46.54365,
		"lng": -96.739084
	},
	{
		"lat": 46.543663,
		"lng": -96.739108
	},
	{
		"lat": 46.543716,
		"lng": -96.739207
	},
	{
		"lat": 46.54372,
		"lng": -96.739221
	},
	{
		"lat": 46.543731,
		"lng": -96.739254
	},
	{
		"lat": 46.543773,
		"lng": -96.739339
	},
	{
		"lat": 46.543844,
		"lng": -96.739577
	},
	{
		"lat": 46.543845,
		"lng": -96.739581
	},
	{
		"lat": 46.543873,
		"lng": -96.739706
	},
	{
		"lat": 46.543888,
		"lng": -96.739774
	},
	{
		"lat": 46.543893,
		"lng": -96.739826
	},
	{
		"lat": 46.543906,
		"lng": -96.740136
	},
	{
		"lat": 46.543915,
		"lng": -96.741018
	},
	{
		"lat": 46.543919,
		"lng": -96.741122
	},
	{
		"lat": 46.543916,
		"lng": -96.741797
	},
	{
		"lat": 46.543899,
		"lng": -96.742003
	},
	{
		"lat": 46.543891,
		"lng": -96.742071
	},
	{
		"lat": 46.54387,
		"lng": -96.742259
	},
	{
		"lat": 46.543801,
		"lng": -96.742554
	},
	{
		"lat": 46.543756,
		"lng": -96.742695
	},
	{
		"lat": 46.543748,
		"lng": -96.742746
	},
	{
		"lat": 46.543734,
		"lng": -96.742794
	},
	{
		"lat": 46.543681,
		"lng": -96.742929
	},
	{
		"lat": 46.54365,
		"lng": -96.743023
	},
	{
		"lat": 46.543638,
		"lng": -96.743071
	},
	{
		"lat": 46.543573,
		"lng": -96.743255
	},
	{
		"lat": 46.5435,
		"lng": -96.743434
	},
	{
		"lat": 46.543362,
		"lng": -96.743797
	},
	{
		"lat": 46.54335,
		"lng": -96.743845
	},
	{
		"lat": 46.543319,
		"lng": -96.743938
	},
	{
		"lat": 46.543267,
		"lng": -96.744075
	},
	{
		"lat": 46.543228,
		"lng": -96.744162
	},
	{
		"lat": 46.543214,
		"lng": -96.74421
	},
	{
		"lat": 46.543162,
		"lng": -96.744346
	},
	{
		"lat": 46.543106,
		"lng": -96.744592
	},
	{
		"lat": 46.543038,
		"lng": -96.744995
	},
	{
		"lat": 46.543027,
		"lng": -96.745098
	},
	{
		"lat": 46.543018,
		"lng": -96.745357
	},
	{
		"lat": 46.543026,
		"lng": -96.745564
	},
	{
		"lat": 46.543053,
		"lng": -96.745821
	},
	{
		"lat": 46.5431,
		"lng": -96.746124
	},
	{
		"lat": 46.543114,
		"lng": -96.746173
	},
	{
		"lat": 46.543139,
		"lng": -96.746324
	},
	{
		"lat": 46.543245,
		"lng": -96.746765
	},
	{
		"lat": 46.543286,
		"lng": -96.746909
	},
	{
		"lat": 46.543317,
		"lng": -96.747003
	},
	{
		"lat": 46.543401,
		"lng": -96.747345
	},
	{
		"lat": 46.543431,
		"lng": -96.747439
	},
	{
		"lat": 46.543451,
		"lng": -96.747483
	},
	{
		"lat": 46.543479,
		"lng": -96.747578
	},
	{
		"lat": 46.5435,
		"lng": -96.747677
	},
	{
		"lat": 46.543542,
		"lng": -96.747821
	},
	{
		"lat": 46.543574,
		"lng": -96.747969
	},
	{
		"lat": 46.543608,
		"lng": -96.748171
	},
	{
		"lat": 46.54362,
		"lng": -96.74822
	},
	{
		"lat": 46.543694,
		"lng": -96.74862
	},
	{
		"lat": 46.543715,
		"lng": -96.748877
	},
	{
		"lat": 46.543717,
		"lng": -96.748963
	},
	{
		"lat": 46.543727,
		"lng": -96.749343
	},
	{
		"lat": 46.543768,
		"lng": -96.749723
	},
	{
		"lat": 46.543952,
		"lng": -96.750229
	},
	{
		"lat": 46.544025,
		"lng": -96.750407
	},
	{
		"lat": 46.544048,
		"lng": -96.750448
	},
	{
		"lat": 46.544131,
		"lng": -96.750544
	},
	{
		"lat": 46.5442,
		"lng": -96.750572
	},
	{
		"lat": 46.544272,
		"lng": -96.750584
	},
	{
		"lat": 46.544448,
		"lng": -96.75059
	},
	{
		"lat": 46.544482,
		"lng": -96.750581
	},
	{
		"lat": 46.544552,
		"lng": -96.750576
	},
	{
		"lat": 46.544656,
		"lng": -96.750542
	},
	{
		"lat": 46.544722,
		"lng": -96.750503
	},
	{
		"lat": 46.544784,
		"lng": -96.750441
	},
	{
		"lat": 46.544809,
		"lng": -96.750416
	},
	{
		"lat": 46.544886,
		"lng": -96.750309
	},
	{
		"lat": 46.544904,
		"lng": -96.750265
	},
	{
		"lat": 46.544962,
		"lng": -96.750011
	},
	{
		"lat": 46.544983,
		"lng": -96.74992
	},
	{
		"lat": 46.545009,
		"lng": -96.749823
	},
	{
		"lat": 46.545107,
		"lng": -96.749545
	},
	{
		"lat": 46.545168,
		"lng": -96.749357
	},
	{
		"lat": 46.545224,
		"lng": -96.749166
	},
	{
		"lat": 46.545392,
		"lng": -96.748654
	},
	{
		"lat": 46.545424,
		"lng": -96.748557
	},
	{
		"lat": 46.545522,
		"lng": -96.748281
	},
	{
		"lat": 46.545553,
		"lng": -96.748208
	},
	{
		"lat": 46.545578,
		"lng": -96.748148
	},
	{
		"lat": 46.54564,
		"lng": -96.748021
	},
	{
		"lat": 46.545766,
		"lng": -96.747836
	},
	{
		"lat": 46.545814,
		"lng": -96.747759
	},
	{
		"lat": 46.54587,
		"lng": -96.747692
	},
	{
		"lat": 46.545989,
		"lng": -96.747575
	},
	{
		"lat": 46.546054,
		"lng": -96.747531
	},
	{
		"lat": 46.546211,
		"lng": -96.747405
	},
	{
		"lat": 46.54624,
		"lng": -96.747372
	},
	{
		"lat": 46.546339,
		"lng": -96.747311
	},
	{
		"lat": 46.546499,
		"lng": -96.747193
	},
	{
		"lat": 46.546598,
		"lng": -96.747132
	},
	{
		"lat": 46.546825,
		"lng": -96.746975
	},
	{
		"lat": 46.546919,
		"lng": -96.746898
	},
	{
		"lat": 46.546949,
		"lng": -96.746868
	},
	{
		"lat": 46.547058,
		"lng": -96.746733
	},
	{
		"lat": 46.547232,
		"lng": -96.746549
	},
	{
		"lat": 46.547576,
		"lng": -96.746172
	},
	{
		"lat": 46.547857,
		"lng": -96.745772
	},
	{
		"lat": 46.54793,
		"lng": -96.745658
	},
	{
		"lat": 46.547998,
		"lng": -96.745536
	},
	{
		"lat": 46.548079,
		"lng": -96.745365
	},
	{
		"lat": 46.548162,
		"lng": -96.745136
	},
	{
		"lat": 46.548182,
		"lng": -96.745092
	},
	{
		"lat": 46.548225,
		"lng": -96.74495
	},
	{
		"lat": 46.548257,
		"lng": -96.744802
	},
	{
		"lat": 46.548262,
		"lng": -96.744698
	},
	{
		"lat": 46.54826,
		"lng": -96.744491
	},
	{
		"lat": 46.548254,
		"lng": -96.74444
	},
	{
		"lat": 46.548219,
		"lng": -96.744293
	},
	{
		"lat": 46.548191,
		"lng": -96.744197
	},
	{
		"lat": 46.548151,
		"lng": -96.744112
	},
	{
		"lat": 46.548134,
		"lng": -96.744066
	},
	{
		"lat": 46.548091,
		"lng": -96.743983
	},
	{
		"lat": 46.547942,
		"lng": -96.743757
	},
	{
		"lat": 46.547804,
		"lng": -96.743591
	},
	{
		"lat": 46.547715,
		"lng": -96.743504
	},
	{
		"lat": 46.547599,
		"lng": -96.743379
	},
	{
		"lat": 46.547505,
		"lng": -96.743302
	},
	{
		"lat": 46.547378,
		"lng": -96.743207
	},
	{
		"lat": 46.547344,
		"lng": -96.743188
	},
	{
		"lat": 46.547206,
		"lng": -96.743129
	},
	{
		"lat": 46.547142,
		"lng": -96.743082
	},
	{
		"lat": 46.547073,
		"lng": -96.743048
	},
	{
		"lat": 46.547008,
		"lng": -96.743005
	},
	{
		"lat": 46.5467,
		"lng": -96.742856
	},
	{
		"lat": 46.546665,
		"lng": -96.742845
	},
	{
		"lat": 46.546492,
		"lng": -96.742769
	},
	{
		"lat": 46.546422,
		"lng": -96.742745
	},
	{
		"lat": 46.546285,
		"lng": -96.742682
	},
	{
		"lat": 46.54622,
		"lng": -96.742637
	},
	{
		"lat": 46.546151,
		"lng": -96.742607
	},
	{
		"lat": 46.546019,
		"lng": -96.742525
	},
	{
		"lat": 46.545848,
		"lng": -96.742441
	},
	{
		"lat": 46.545688,
		"lng": -96.742322
	},
	{
		"lat": 46.545629,
		"lng": -96.742262
	},
	{
		"lat": 46.545517,
		"lng": -96.742133
	},
	{
		"lat": 46.545388,
		"lng": -96.741951
	},
	{
		"lat": 46.545365,
		"lng": -96.741911
	},
	{
		"lat": 46.545347,
		"lng": -96.741866
	},
	{
		"lat": 46.545313,
		"lng": -96.741719
	},
	{
		"lat": 46.5453,
		"lng": -96.741564
	},
	{
		"lat": 46.545303,
		"lng": -96.741357
	},
	{
		"lat": 46.545308,
		"lng": -96.741292
	},
	{
		"lat": 46.54531,
		"lng": -96.74128
	},
	{
		"lat": 46.545318,
		"lng": -96.741242
	},
	{
		"lat": 46.545359,
		"lng": -96.741098
	},
	{
		"lat": 46.545424,
		"lng": -96.740974
	},
	{
		"lat": 46.545473,
		"lng": -96.740898
	},
	{
		"lat": 46.545554,
		"lng": -96.740795
	},
	{
		"lat": 46.545641,
		"lng": -96.740701
	},
	{
		"lat": 46.545673,
		"lng": -96.740679
	},
	{
		"lat": 46.545841,
		"lng": -96.740586
	},
	{
		"lat": 46.546052,
		"lng": -96.740518
	},
	{
		"lat": 46.546195,
		"lng": -96.740497
	},
	{
		"lat": 46.546375,
		"lng": -96.740492
	},
	{
		"lat": 46.546482,
		"lng": -96.740499
	},
	{
		"lat": 46.546838,
		"lng": -96.740569
	},
	{
		"lat": 46.546941,
		"lng": -96.740613
	},
	{
		"lat": 46.547151,
		"lng": -96.740689
	},
	{
		"lat": 46.547357,
		"lng": -96.740777
	},
	{
		"lat": 46.547525,
		"lng": -96.740871
	},
	{
		"lat": 46.547687,
		"lng": -96.740982
	},
	{
		"lat": 46.54778,
		"lng": -96.741062
	},
	{
		"lat": 46.547861,
		"lng": -96.741164
	},
	{
		"lat": 46.54817,
		"lng": -96.741597
	},
	{
		"lat": 46.548498,
		"lng": -96.742079
	},
	{
		"lat": 46.548627,
		"lng": -96.74226
	},
	{
		"lat": 46.548793,
		"lng": -96.742459
	},
	{
		"lat": 46.549019,
		"lng": -96.742717
	},
	{
		"lat": 46.549193,
		"lng": -96.742904
	},
	{
		"lat": 46.549287,
		"lng": -96.74298
	},
	{
		"lat": 46.549461,
		"lng": -96.743165
	},
	{
		"lat": 46.549646,
		"lng": -96.743412
	},
	{
		"lat": 46.549973,
		"lng": -96.743896
	},
	{
		"lat": 46.550071,
		"lng": -96.744048
	},
	{
		"lat": 46.550278,
		"lng": -96.744407
	},
	{
		"lat": 46.550343,
		"lng": -96.744531
	},
	{
		"lat": 46.550489,
		"lng": -96.744888
	},
	{
		"lat": 46.550514,
		"lng": -96.744986
	},
	{
		"lat": 46.550547,
		"lng": -96.745077
	},
	{
		"lat": 46.55056,
		"lng": -96.745126
	},
	{
		"lat": 46.550598,
		"lng": -96.745214
	},
	{
		"lat": 46.550652,
		"lng": -96.745461
	},
	{
		"lat": 46.550658,
		"lng": -96.745513
	},
	{
		"lat": 46.55065,
		"lng": -96.745824
	},
	{
		"lat": 46.550641,
		"lng": -96.745927
	},
	{
		"lat": 46.550625,
		"lng": -96.746028
	},
	{
		"lat": 46.550557,
		"lng": -96.746267
	},
	{
		"lat": 46.550483,
		"lng": -96.746444
	},
	{
		"lat": 46.550418,
		"lng": -96.746567
	},
	{
		"lat": 46.550215,
		"lng": -96.746928
	},
	{
		"lat": 46.549622,
		"lng": -96.747827
	},
	{
		"lat": 46.549537,
		"lng": -96.747994
	},
	{
		"lat": 46.549478,
		"lng": -96.748124
	},
	{
		"lat": 46.549428,
		"lng": -96.748262
	},
	{
		"lat": 46.54938,
		"lng": -96.748458
	},
	{
		"lat": 46.549365,
		"lng": -96.748717
	},
	{
		"lat": 46.549369,
		"lng": -96.74882
	},
	{
		"lat": 46.549375,
		"lng": -96.748871
	},
	{
		"lat": 46.549401,
		"lng": -96.748969
	},
	{
		"lat": 46.549422,
		"lng": -96.74901
	},
	{
		"lat": 46.549525,
		"lng": -96.749156
	},
	{
		"lat": 46.549585,
		"lng": -96.749212
	},
	{
		"lat": 46.549656,
		"lng": -96.749231
	},
	{
		"lat": 46.549872,
		"lng": -96.749235
	},
	{
		"lat": 46.550052,
		"lng": -96.74922
	},
	{
		"lat": 46.550087,
		"lng": -96.749208
	},
	{
		"lat": 46.550251,
		"lng": -96.749103
	},
	{
		"lat": 46.550369,
		"lng": -96.749006
	},
	{
		"lat": 46.550404,
		"lng": -96.748991
	},
	{
		"lat": 46.550707,
		"lng": -96.748709
	},
	{
		"lat": 46.550825,
		"lng": -96.748591
	},
	{
		"lat": 46.55091,
		"lng": -96.748494
	},
	{
		"lat": 46.551074,
		"lng": -96.748292
	},
	{
		"lat": 46.551104,
		"lng": -96.748263
	},
	{
		"lat": 46.551169,
		"lng": -96.748219
	},
	{
		"lat": 46.551325,
		"lng": -96.748088
	},
	{
		"lat": 46.551579,
		"lng": -96.747896
	},
	{
		"lat": 46.551817,
		"lng": -96.747773
	},
	{
		"lat": 46.551922,
		"lng": -96.747739
	},
	{
		"lat": 46.552129,
		"lng": -96.747647
	},
	{
		"lat": 46.552437,
		"lng": -96.747501
	},
	{
		"lat": 46.552577,
		"lng": -96.747451
	},
	{
		"lat": 46.552713,
		"lng": -96.747385
	},
	{
		"lat": 46.553098,
		"lng": -96.747244
	},
	{
		"lat": 46.553165,
		"lng": -96.747209
	},
	{
		"lat": 46.553197,
		"lng": -96.747184
	},
	{
		"lat": 46.553266,
		"lng": -96.747152
	},
	{
		"lat": 46.553329,
		"lng": -96.747104
	},
	{
		"lat": 46.553497,
		"lng": -96.74701
	},
	{
		"lat": 46.553695,
		"lng": -96.746887
	},
	{
		"lat": 46.553929,
		"lng": -96.746751
	},
	{
		"lat": 46.553964,
		"lng": -96.746737
	},
	{
		"lat": 46.553997,
		"lng": -96.746716
	},
	{
		"lat": 46.554027,
		"lng": -96.746688
	},
	{
		"lat": 46.554232,
		"lng": -96.746593
	},
	{
		"lat": 46.554295,
		"lng": -96.746541
	},
	{
		"lat": 46.554362,
		"lng": -96.746507
	},
	{
		"lat": 46.554429,
		"lng": -96.746466
	},
	{
		"lat": 46.55449,
		"lng": -96.746412
	},
	{
		"lat": 46.554557,
		"lng": -96.746373
	},
	{
		"lat": 46.554619,
		"lng": -96.746321
	},
	{
		"lat": 46.554781,
		"lng": -96.746205
	},
	{
		"lat": 46.554881,
		"lng": -96.746146
	},
	{
		"lat": 46.554979,
		"lng": -96.746081
	},
	{
		"lat": 46.55501,
		"lng": -96.746055
	},
	{
		"lat": 46.55511,
		"lng": -96.745995
	},
	{
		"lat": 46.555212,
		"lng": -96.745944
	},
	{
		"lat": 46.555471,
		"lng": -96.745848
	},
	{
		"lat": 46.555507,
		"lng": -96.74584
	},
	{
		"lat": 46.555723,
		"lng": -96.74583
	},
	{
		"lat": 46.555795,
		"lng": -96.745842
	},
	{
		"lat": 46.555898,
		"lng": -96.745887
	},
	{
		"lat": 46.555963,
		"lng": -96.745931
	},
	{
		"lat": 46.556026,
		"lng": -96.745981
	},
	{
		"lat": 46.556084,
		"lng": -96.746043
	},
	{
		"lat": 46.556204,
		"lng": -96.746237
	},
	{
		"lat": 46.556256,
		"lng": -96.746373
	},
	{
		"lat": 46.556269,
		"lng": -96.746421
	},
	{
		"lat": 46.556287,
		"lng": -96.746521
	},
	{
		"lat": 46.556301,
		"lng": -96.746569
	},
	{
		"lat": 46.55632,
		"lng": -96.746668
	},
	{
		"lat": 46.556331,
		"lng": -96.746926
	},
	{
		"lat": 46.556325,
		"lng": -96.74708
	},
	{
		"lat": 46.55631,
		"lng": -96.747287
	},
	{
		"lat": 46.556227,
		"lng": -96.747948
	},
	{
		"lat": 46.5562,
		"lng": -96.748097
	},
	{
		"lat": 46.556179,
		"lng": -96.748249
	},
	{
		"lat": 46.556048,
		"lng": -96.748891
	},
	{
		"lat": 46.556009,
		"lng": -96.749143
	},
	{
		"lat": 46.555965,
		"lng": -96.749339
	},
	{
		"lat": 46.555943,
		"lng": -96.74949
	},
	{
		"lat": 46.555914,
		"lng": -96.749639
	},
	{
		"lat": 46.555811,
		"lng": -96.750234
	},
	{
		"lat": 46.555806,
		"lng": -96.750285
	},
	{
		"lat": 46.555788,
		"lng": -96.750382
	},
	{
		"lat": 46.555764,
		"lng": -96.750479
	},
	{
		"lat": 46.555734,
		"lng": -96.750677
	},
	{
		"lat": 46.555708,
		"lng": -96.750769
	},
	{
		"lat": 46.555648,
		"lng": -96.751058
	},
	{
		"lat": 46.555622,
		"lng": -96.751151
	},
	{
		"lat": 46.555568,
		"lng": -96.751448
	},
	{
		"lat": 46.555532,
		"lng": -96.751753
	},
	{
		"lat": 46.555541,
		"lng": -96.751907
	},
	{
		"lat": 46.55555,
		"lng": -96.752009
	},
	{
		"lat": 46.555558,
		"lng": -96.75206
	},
	{
		"lat": 46.555571,
		"lng": -96.752109
	},
	{
		"lat": 46.555593,
		"lng": -96.75226
	},
	{
		"lat": 46.55567,
		"lng": -96.752713
	},
	{
		"lat": 46.555717,
		"lng": -96.752962
	},
	{
		"lat": 46.555761,
		"lng": -96.753101
	},
	{
		"lat": 46.555794,
		"lng": -96.753191
	},
	{
		"lat": 46.555858,
		"lng": -96.753316
	},
	{
		"lat": 46.555905,
		"lng": -96.753395
	},
	{
		"lat": 46.555955,
		"lng": -96.753468
	},
	{
		"lat": 46.556121,
		"lng": -96.753739
	},
	{
		"lat": 46.556268,
		"lng": -96.753966
	},
	{
		"lat": 46.556303,
		"lng": -96.754014
	},
	{
		"lat": 46.556449,
		"lng": -96.754215
	},
	{
		"lat": 46.55654,
		"lng": -96.754298
	},
	{
		"lat": 46.556712,
		"lng": -96.75437
	},
	{
		"lat": 46.556818,
		"lng": -96.754397
	},
	{
		"lat": 46.55689,
		"lng": -96.754396
	},
	{
		"lat": 46.556996,
		"lng": -96.754378
	},
	{
		"lat": 46.557101,
		"lng": -96.754352
	},
	{
		"lat": 46.557271,
		"lng": -96.754281
	},
	{
		"lat": 46.557371,
		"lng": -96.754227
	},
	{
		"lat": 46.557403,
		"lng": -96.754204
	},
	{
		"lat": 46.557469,
		"lng": -96.754168
	},
	{
		"lat": 46.557501,
		"lng": -96.754144
	},
	{
		"lat": 46.557618,
		"lng": -96.754026
	},
	{
		"lat": 46.557723,
		"lng": -96.753884
	},
	{
		"lat": 46.557769,
		"lng": -96.753806
	},
	{
		"lat": 46.557786,
		"lng": -96.75376
	},
	{
		"lat": 46.557865,
		"lng": -96.753592
	},
	{
		"lat": 46.557927,
		"lng": -96.75335
	},
	{
		"lat": 46.557988,
		"lng": -96.753051
	},
	{
		"lat": 46.558089,
		"lng": -96.752499
	},
	{
		"lat": 46.558143,
		"lng": -96.752253
	},
	{
		"lat": 46.558265,
		"lng": -96.751606
	},
	{
		"lat": 46.558305,
		"lng": -96.751251
	},
	{
		"lat": 46.558357,
		"lng": -96.750539
	},
	{
		"lat": 46.558365,
		"lng": -96.750026
	},
	{
		"lat": 46.558371,
		"lng": -96.749923
	},
	{
		"lat": 46.558356,
		"lng": -96.749664
	},
	{
		"lat": 46.55835,
		"lng": -96.749147
	},
	{
		"lat": 46.55834,
		"lng": -96.748888
	},
	{
		"lat": 46.558367,
		"lng": -96.748267
	},
	{
		"lat": 46.558378,
		"lng": -96.748164
	},
	{
		"lat": 46.558397,
		"lng": -96.748064
	},
	{
		"lat": 46.558396,
		"lng": -96.747909
	},
	{
		"lat": 46.558414,
		"lng": -96.747598
	},
	{
		"lat": 46.558448,
		"lng": -96.747397
	},
	{
		"lat": 46.55849,
		"lng": -96.747254
	},
	{
		"lat": 46.558559,
		"lng": -96.747072
	},
	{
		"lat": 46.558579,
		"lng": -96.747028
	},
	{
		"lat": 46.558686,
		"lng": -96.74689
	},
	{
		"lat": 46.558716,
		"lng": -96.746861
	},
	{
		"lat": 46.55878,
		"lng": -96.746816
	},
	{
		"lat": 46.558849,
		"lng": -96.746785
	},
	{
		"lat": 46.558919,
		"lng": -96.746761
	},
	{
		"lat": 46.558989,
		"lng": -96.746744
	},
	{
		"lat": 46.559097,
		"lng": -96.746734
	},
	{
		"lat": 46.559133,
		"lng": -96.746741
	},
	{
		"lat": 46.559196,
		"lng": -96.746763
	},
	{
		"lat": 46.559203,
		"lng": -96.746765
	},
	{
		"lat": 46.559274,
		"lng": -96.746781
	},
	{
		"lat": 46.559342,
		"lng": -96.746812
	},
	{
		"lat": 46.559536,
		"lng": -96.746951
	},
	{
		"lat": 46.559628,
		"lng": -96.747032
	},
	{
		"lat": 46.559657,
		"lng": -96.747063
	},
	{
		"lat": 46.559865,
		"lng": -96.747344
	},
	{
		"lat": 46.559867,
		"lng": -96.747347
	},
	{
		"lat": 46.559995,
		"lng": -96.74753
	},
	{
		"lat": 46.560094,
		"lng": -96.747681
	},
	{
		"lat": 46.560158,
		"lng": -96.747807
	},
	{
		"lat": 46.560327,
		"lng": -96.748077
	},
	{
		"lat": 46.560517,
		"lng": -96.748518
	},
	{
		"lat": 46.56075,
		"lng": -96.749162
	},
	{
		"lat": 46.560781,
		"lng": -96.749256
	},
	{
		"lat": 46.560862,
		"lng": -96.749544
	},
	{
		"lat": 46.560896,
		"lng": -96.749691
	},
	{
		"lat": 46.560923,
		"lng": -96.749834
	},
	{
		"lat": 46.560992,
		"lng": -96.75019
	},
	{
		"lat": 46.561084,
		"lng": -96.750583
	},
	{
		"lat": 46.561101,
		"lng": -96.750725
	},
	{
		"lat": 46.561126,
		"lng": -96.750796
	},
	{
		"lat": 46.561134,
		"lng": -96.750846
	},
	{
		"lat": 46.561157,
		"lng": -96.750944
	},
	{
		"lat": 46.561174,
		"lng": -96.750989
	},
	{
		"lat": 46.561187,
		"lng": -96.751091
	},
	{
		"lat": 46.561257,
		"lng": -96.751385
	},
	{
		"lat": 46.56132,
		"lng": -96.75157
	},
	{
		"lat": 46.561329,
		"lng": -96.75162
	},
	{
		"lat": 46.561331,
		"lng": -96.751626
	},
	{
		"lat": 46.561493,
		"lng": -96.752021
	},
	{
		"lat": 46.561525,
		"lng": -96.752117
	},
	{
		"lat": 46.561594,
		"lng": -96.752236
	},
	{
		"lat": 46.561622,
		"lng": -96.752268
	},
	{
		"lat": 46.56167,
		"lng": -96.752344
	},
	{
		"lat": 46.561697,
		"lng": -96.752378
	},
	{
		"lat": 46.561786,
		"lng": -96.752465
	},
	{
		"lat": 46.561962,
		"lng": -96.752502
	},
	{
		"lat": 46.562067,
		"lng": -96.752499
	},
	{
		"lat": 46.562171,
		"lng": -96.752481
	},
	{
		"lat": 46.562236,
		"lng": -96.752439
	},
	{
		"lat": 46.562297,
		"lng": -96.752386
	},
	{
		"lat": 46.562383,
		"lng": -96.752298
	},
	{
		"lat": 46.562511,
		"lng": -96.752117
	},
	{
		"lat": 46.56261,
		"lng": -96.751968
	},
	{
		"lat": 46.562698,
		"lng": -96.751806
	},
	{
		"lat": 46.562734,
		"lng": -96.751717
	},
	{
		"lat": 46.562809,
		"lng": -96.751481
	},
	{
		"lat": 46.562846,
		"lng": -96.751283
	},
	{
		"lat": 46.562847,
		"lng": -96.751251
	},
	{
		"lat": 46.562855,
		"lng": -96.751128
	},
	{
		"lat": 46.562857,
		"lng": -96.750921
	},
	{
		"lat": 46.562831,
		"lng": -96.750615
	},
	{
		"lat": 46.562769,
		"lng": -96.750327
	},
	{
		"lat": 46.562693,
		"lng": -96.749971
	},
	{
		"lat": 46.562656,
		"lng": -96.749826
	},
	{
		"lat": 46.562561,
		"lng": -96.749491
	},
	{
		"lat": 46.562531,
		"lng": -96.749342
	},
	{
		"lat": 46.562483,
		"lng": -96.749146
	},
	{
		"lat": 46.562471,
		"lng": -96.749084
	},
	{
		"lat": 46.5624,
		"lng": -96.748695
	},
	{
		"lat": 46.562366,
		"lng": -96.748547
	},
	{
		"lat": 46.562345,
		"lng": -96.748394
	},
	{
		"lat": 46.562323,
		"lng": -96.748188
	},
	{
		"lat": 46.562311,
		"lng": -96.748034
	},
	{
		"lat": 46.562307,
		"lng": -96.747722
	},
	{
		"lat": 46.562337,
		"lng": -96.74736
	},
	{
		"lat": 46.562366,
		"lng": -96.747265
	},
	{
		"lat": 46.562388,
		"lng": -96.747166
	},
	{
		"lat": 46.562418,
		"lng": -96.747072
	},
	{
		"lat": 46.562502,
		"lng": -96.746903
	},
	{
		"lat": 46.562548,
		"lng": -96.746823
	},
	{
		"lat": 46.56273,
		"lng": -96.746571
	},
	{
		"lat": 46.562788,
		"lng": -96.746509
	},
	{
		"lat": 46.562885,
		"lng": -96.74644
	},
	{
		"lat": 46.562954,
		"lng": -96.746408
	},
	{
		"lat": 46.56302,
		"lng": -96.746368
	},
	{
		"lat": 46.563089,
		"lng": -96.746341
	},
	{
		"lat": 46.563268,
		"lng": -96.746301
	},
	{
		"lat": 46.563806,
		"lng": -96.746246
	},
	{
		"lat": 46.563855,
		"lng": -96.746244
	},
	{
		"lat": 46.564239,
		"lng": -96.746236
	},
	{
		"lat": 46.564454,
		"lng": -96.746214
	},
	{
		"lat": 46.56474,
		"lng": -96.746157
	},
	{
		"lat": 46.564917,
		"lng": -96.746105
	},
	{
		"lat": 46.565019,
		"lng": -96.746054
	},
	{
		"lat": 46.565051,
		"lng": -96.746031
	},
	{
		"lat": 46.565081,
		"lng": -96.746001
	},
	{
		"lat": 46.565085,
		"lng": -96.745996
	},
	{
		"lat": 46.565157,
		"lng": -96.745891
	},
	{
		"lat": 46.565177,
		"lng": -96.745848
	},
	{
		"lat": 46.565186,
		"lng": -96.745822
	},
	{
		"lat": 46.565228,
		"lng": -96.74571
	},
	{
		"lat": 46.565258,
		"lng": -96.745561
	},
	{
		"lat": 46.565273,
		"lng": -96.745406
	},
	{
		"lat": 46.565265,
		"lng": -96.745303
	},
	{
		"lat": 46.565252,
		"lng": -96.745227
	},
	{
		"lat": 46.565248,
		"lng": -96.745202
	},
	{
		"lat": 46.565212,
		"lng": -96.745112
	},
	{
		"lat": 46.565188,
		"lng": -96.745036
	},
	{
		"lat": 46.565182,
		"lng": -96.745018
	},
	{
		"lat": 46.565049,
		"lng": -96.744773
	},
	{
		"lat": 46.564877,
		"lng": -96.744506
	},
	{
		"lat": 46.564773,
		"lng": -96.744362
	},
	{
		"lat": 46.564505,
		"lng": -96.744026
	},
	{
		"lat": 46.564258,
		"lng": -96.743715
	},
	{
		"lat": 46.56394,
		"lng": -96.743295
	},
	{
		"lat": 46.563636,
		"lng": -96.742854
	},
	{
		"lat": 46.563471,
		"lng": -96.742578
	},
	{
		"lat": 46.56344,
		"lng": -96.742484
	},
	{
		"lat": 46.563411,
		"lng": -96.742352
	},
	{
		"lat": 46.56341,
		"lng": -96.7423
	},
	{
		"lat": 46.563421,
		"lng": -96.742145
	},
	{
		"lat": 46.563441,
		"lng": -96.742045
	},
	{
		"lat": 46.563477,
		"lng": -96.741977
	},
	{
		"lat": 46.563556,
		"lng": -96.741872
	},
	{
		"lat": 46.563644,
		"lng": -96.741782
	},
	{
		"lat": 46.563678,
		"lng": -96.741762
	},
	{
		"lat": 46.563783,
		"lng": -96.741725
	},
	{
		"lat": 46.563854,
		"lng": -96.74173
	},
	{
		"lat": 46.56389,
		"lng": -96.741738
	},
	{
		"lat": 46.563997,
		"lng": -96.74175
	},
	{
		"lat": 46.564134,
		"lng": -96.741815
	},
	{
		"lat": 46.56423,
		"lng": -96.741887
	},
	{
		"lat": 46.564375,
		"lng": -96.742039
	},
	{
		"lat": 46.564474,
		"lng": -96.742162
	},
	{
		"lat": 46.564538,
		"lng": -96.742242
	},
	{
		"lat": 46.564988,
		"lng": -96.74284
	},
	{
		"lat": 46.565194,
		"lng": -96.743051
	},
	{
		"lat": 46.565261,
		"lng": -96.743089
	},
	{
		"lat": 46.565308,
		"lng": -96.743137
	},
	{
		"lat": 46.565349,
		"lng": -96.743179
	},
	{
		"lat": 46.565483,
		"lng": -96.743241
	},
	{
		"lat": 46.565521,
		"lng": -96.743259
	},
	{
		"lat": 46.565547,
		"lng": -96.743265
	},
	{
		"lat": 46.565627,
		"lng": -96.743284
	},
	{
		"lat": 46.565735,
		"lng": -96.743298
	},
	{
		"lat": 46.565915,
		"lng": -96.743294
	},
	{
		"lat": 46.566023,
		"lng": -96.743285
	},
	{
		"lat": 46.566094,
		"lng": -96.74327
	},
	{
		"lat": 46.56649,
		"lng": -96.74324
	},
	{
		"lat": 46.566562,
		"lng": -96.743246
	},
	{
		"lat": 46.566668,
		"lng": -96.743273
	},
	{
		"lat": 46.566703,
		"lng": -96.743287
	},
	{
		"lat": 46.566804,
		"lng": -96.743343
	},
	{
		"lat": 46.566928,
		"lng": -96.74345
	},
	{
		"lat": 46.566984,
		"lng": -96.743514
	},
	{
		"lat": 46.567079,
		"lng": -96.74367
	},
	{
		"lat": 46.567162,
		"lng": -96.74384
	},
	{
		"lat": 46.567186,
		"lng": -96.743938
	},
	{
		"lat": 46.567215,
		"lng": -96.744032
	},
	{
		"lat": 46.567236,
		"lng": -96.744132
	},
	{
		"lat": 46.567246,
		"lng": -96.744234
	},
	{
		"lat": 46.567248,
		"lng": -96.744442
	},
	{
		"lat": 46.567234,
		"lng": -96.744804
	},
	{
		"lat": 46.567206,
		"lng": -96.745061
	},
	{
		"lat": 46.567156,
		"lng": -96.745416
	},
	{
		"lat": 46.56712,
		"lng": -96.745829
	},
	{
		"lat": 46.567119,
		"lng": -96.745932
	},
	{
		"lat": 46.567109,
		"lng": -96.74614
	},
	{
		"lat": 46.567115,
		"lng": -96.746659
	},
	{
		"lat": 46.567122,
		"lng": -96.746762
	},
	{
		"lat": 46.567157,
		"lng": -96.747016
	},
	{
		"lat": 46.56717,
		"lng": -96.747065
	},
	{
		"lat": 46.567206,
		"lng": -96.747155
	},
	{
		"lat": 46.567227,
		"lng": -96.747196
	},
	{
		"lat": 46.567355,
		"lng": -96.747379
	},
	{
		"lat": 46.567452,
		"lng": -96.747447
	},
	{
		"lat": 46.567523,
		"lng": -96.747463
	},
	{
		"lat": 46.567667,
		"lng": -96.747451
	},
	{
		"lat": 46.567775,
		"lng": -96.747433
	},
	{
		"lat": 46.567915,
		"lng": -96.747386
	},
	{
		"lat": 46.567949,
		"lng": -96.747369
	},
	{
		"lat": 46.568047,
		"lng": -96.747302
	},
	{
		"lat": 46.568171,
		"lng": -96.747197
	},
	{
		"lat": 46.568262,
		"lng": -96.747112
	},
	{
		"lat": 46.568348,
		"lng": -96.747018
	},
	{
		"lat": 46.568506,
		"lng": -96.746807
	},
	{
		"lat": 46.568678,
		"lng": -96.746541
	},
	{
		"lat": 46.568768,
		"lng": -96.746379
	},
	{
		"lat": 46.569047,
		"lng": -96.745903
	},
	{
		"lat": 46.569197,
		"lng": -96.745678
	},
	{
		"lat": 46.56925,
		"lng": -96.745607
	},
	{
		"lat": 46.569417,
		"lng": -96.74541
	},
	{
		"lat": 46.569607,
		"lng": -96.745172
	},
	{
		"lat": 46.569701,
		"lng": -96.745092
	},
	{
		"lat": 46.569833,
		"lng": -96.745009
	},
	{
		"lat": 46.569867,
		"lng": -96.744994
	},
	{
		"lat": 46.570009,
		"lng": -96.744954
	},
	{
		"lat": 46.570189,
		"lng": -96.744959
	},
	{
		"lat": 46.57033,
		"lng": -96.745002
	},
	{
		"lat": 46.5705,
		"lng": -96.745089
	},
	{
		"lat": 46.570664,
		"lng": -96.745197
	},
	{
		"lat": 46.570694,
		"lng": -96.745224
	},
	{
		"lat": 46.570833,
		"lng": -96.74539
	},
	{
		"lat": 46.571027,
		"lng": -96.745697
	},
	{
		"lat": 46.571088,
		"lng": -96.745826
	},
	{
		"lat": 46.571117,
		"lng": -96.745921
	},
	{
		"lat": 46.571151,
		"lng": -96.746013
	},
	{
		"lat": 46.571175,
		"lng": -96.74611
	},
	{
		"lat": 46.571206,
		"lng": -96.746204
	},
	{
		"lat": 46.571245,
		"lng": -96.746349
	},
	{
		"lat": 46.571289,
		"lng": -96.746491
	},
	{
		"lat": 46.571321,
		"lng": -96.74664
	},
	{
		"lat": 46.571353,
		"lng": -96.746732
	},
	{
		"lat": 46.571373,
		"lng": -96.746832
	},
	{
		"lat": 46.571397,
		"lng": -96.746926
	},
	{
		"lat": 46.571443,
		"lng": -96.74723
	},
	{
		"lat": 46.571455,
		"lng": -96.747385
	},
	{
		"lat": 46.571489,
		"lng": -96.748422
	},
	{
		"lat": 46.571479,
		"lng": -96.748629
	},
	{
		"lat": 46.571463,
		"lng": -96.748836
	},
	{
		"lat": 46.571451,
		"lng": -96.748938
	},
	{
		"lat": 46.571422,
		"lng": -96.749034
	},
	{
		"lat": 46.571394,
		"lng": -96.749184
	},
	{
		"lat": 46.571367,
		"lng": -96.74928
	},
	{
		"lat": 46.571307,
		"lng": -96.749525
	},
	{
		"lat": 46.571267,
		"lng": -96.749724
	},
	{
		"lat": 46.571231,
		"lng": -96.74987
	},
	{
		"lat": 46.571217,
		"lng": -96.749917
	},
	{
		"lat": 46.571189,
		"lng": -96.750013
	},
	{
		"lat": 46.571115,
		"lng": -96.75036
	},
	{
		"lat": 46.571102,
		"lng": -96.750408
	},
	{
		"lat": 46.571083,
		"lng": -96.750452
	},
	{
		"lat": 46.571004,
		"lng": -96.750739
	},
	{
		"lat": 46.570947,
		"lng": -96.750871
	},
	{
		"lat": 46.57092,
		"lng": -96.750968
	},
	{
		"lat": 46.570903,
		"lng": -96.751013
	},
	{
		"lat": 46.570878,
		"lng": -96.75111
	},
	{
		"lat": 46.570809,
		"lng": -96.751406
	},
	{
		"lat": 46.57077,
		"lng": -96.751657
	},
	{
		"lat": 46.570766,
		"lng": -96.751709
	},
	{
		"lat": 46.570766,
		"lng": -96.751916
	},
	{
		"lat": 46.570776,
		"lng": -96.752071
	},
	{
		"lat": 46.570787,
		"lng": -96.752121
	},
	{
		"lat": 46.570804,
		"lng": -96.752167
	},
	{
		"lat": 46.57085,
		"lng": -96.752247
	},
	{
		"lat": 46.571005,
		"lng": -96.752462
	},
	{
		"lat": 46.571065,
		"lng": -96.752521
	},
	{
		"lat": 46.571093,
		"lng": -96.752554
	},
	{
		"lat": 46.571186,
		"lng": -96.752633
	},
	{
		"lat": 46.571285,
		"lng": -96.752695
	},
	{
		"lat": 46.571317,
		"lng": -96.75272
	},
	{
		"lat": 46.571384,
		"lng": -96.752759
	},
	{
		"lat": 46.571557,
		"lng": -96.75282
	},
	{
		"lat": 46.57166,
		"lng": -96.752867
	},
	{
		"lat": 46.571802,
		"lng": -96.752895
	},
	{
		"lat": 46.571838,
		"lng": -96.752897
	},
	{
		"lat": 46.571946,
		"lng": -96.752883
	},
	{
		"lat": 46.572158,
		"lng": -96.752845
	},
	{
		"lat": 46.572385,
		"lng": -96.752779
	},
	{
		"lat": 46.572403,
		"lng": -96.752772
	},
	{
		"lat": 46.572506,
		"lng": -96.752726
	},
	{
		"lat": 46.572606,
		"lng": -96.752669
	},
	{
		"lat": 46.572704,
		"lng": -96.752602
	},
	{
		"lat": 46.572766,
		"lng": -96.752553
	},
	{
		"lat": 46.5728,
		"lng": -96.752535
	},
	{
		"lat": 46.572957,
		"lng": -96.752411
	},
	{
		"lat": 46.573066,
		"lng": -96.752278
	},
	{
		"lat": 46.573118,
		"lng": -96.752207
	},
	{
		"lat": 46.573217,
		"lng": -96.752056
	},
	{
		"lat": 46.57326,
		"lng": -96.751973
	},
	{
		"lat": 46.573293,
		"lng": -96.751882
	},
	{
		"lat": 46.573319,
		"lng": -96.751786
	},
	{
		"lat": 46.573354,
		"lng": -96.751696
	},
	{
		"lat": 46.573394,
		"lng": -96.75161
	},
	{
		"lat": 46.573443,
		"lng": -96.751472
	},
	{
		"lat": 46.573454,
		"lng": -96.751423
	},
	{
		"lat": 46.573497,
		"lng": -96.751282
	},
	{
		"lat": 46.573552,
		"lng": -96.751037
	},
	{
		"lat": 46.573589,
		"lng": -96.750839
	},
	{
		"lat": 46.573612,
		"lng": -96.750741
	},
	{
		"lat": 46.57363,
		"lng": -96.750537
	},
	{
		"lat": 46.573654,
		"lng": -96.750333
	},
	{
		"lat": 46.57367,
		"lng": -96.750232
	},
	{
		"lat": 46.573673,
		"lng": -96.750129
	},
	{
		"lat": 46.573644,
		"lng": -96.749561
	},
	{
		"lat": 46.573583,
		"lng": -96.748996
	},
	{
		"lat": 46.573551,
		"lng": -96.748741
	},
	{
		"lat": 46.573517,
		"lng": -96.74854
	},
	{
		"lat": 46.573478,
		"lng": -96.748341
	},
	{
		"lat": 46.573444,
		"lng": -96.748194
	},
	{
		"lat": 46.573415,
		"lng": -96.748043
	},
	{
		"lat": 46.573403,
		"lng": -96.747941
	},
	{
		"lat": 46.573385,
		"lng": -96.747631
	},
	{
		"lat": 46.573385,
		"lng": -96.747527
	},
	{
		"lat": 46.573392,
		"lng": -96.747372
	},
	{
		"lat": 46.573413,
		"lng": -96.747114
	},
	{
		"lat": 46.573434,
		"lng": -96.747014
	},
	{
		"lat": 46.57347,
		"lng": -96.746925
	},
	{
		"lat": 46.573534,
		"lng": -96.746799
	},
	{
		"lat": 46.573653,
		"lng": -96.746606
	},
	{
		"lat": 46.573763,
		"lng": -96.746472
	},
	{
		"lat": 46.573877,
		"lng": -96.746344
	},
	{
		"lat": 46.573969,
		"lng": -96.746263
	},
	{
		"lat": 46.574035,
		"lng": -96.746221
	},
	{
		"lat": 46.574136,
		"lng": -96.746168
	},
	{
		"lat": 46.574278,
		"lng": -96.746137
	},
	{
		"lat": 46.574422,
		"lng": -96.746119
	},
	{
		"lat": 46.574494,
		"lng": -96.74612
	},
	{
		"lat": 46.574602,
		"lng": -96.746137
	},
	{
		"lat": 46.574779,
		"lng": -96.746183
	},
	{
		"lat": 46.574831,
		"lng": -96.7462
	},
	{
		"lat": 46.57499,
		"lng": -96.746252
	},
	{
		"lat": 46.575058,
		"lng": -96.746285
	},
	{
		"lat": 46.575323,
		"lng": -96.746448
	},
	{
		"lat": 46.575391,
		"lng": -96.746483
	},
	{
		"lat": 46.575514,
		"lng": -96.746593
	},
	{
		"lat": 46.575546,
		"lng": -96.746615
	},
	{
		"lat": 46.575731,
		"lng": -96.746863
	},
	{
		"lat": 46.575875,
		"lng": -96.747096
	},
	{
		"lat": 46.576008,
		"lng": -96.747425
	},
	{
		"lat": 46.576051,
		"lng": -96.747623
	},
	{
		"lat": 46.576142,
		"lng": -96.748179
	},
	{
		"lat": 46.576205,
		"lng": -96.748742
	},
	{
		"lat": 46.576233,
		"lng": -96.749155
	},
	{
		"lat": 46.576278,
		"lng": -96.750243
	},
	{
		"lat": 46.576279,
		"lng": -96.750347
	},
	{
		"lat": 46.576323,
		"lng": -96.750703
	},
	{
		"lat": 46.576332,
		"lng": -96.750858
	},
	{
		"lat": 46.576366,
		"lng": -96.75174
	},
	{
		"lat": 46.576366,
		"lng": -96.751844
	},
	{
		"lat": 46.576339,
		"lng": -96.752309
	},
	{
		"lat": 46.576328,
		"lng": -96.752412
	},
	{
		"lat": 46.576317,
		"lng": -96.752461
	},
	{
		"lat": 46.576294,
		"lng": -96.752666
	},
	{
		"lat": 46.576258,
		"lng": -96.752867
	},
	{
		"lat": 46.576216,
		"lng": -96.753065
	},
	{
		"lat": 46.576125,
		"lng": -96.753404
	},
	{
		"lat": 46.576046,
		"lng": -96.753637
	},
	{
		"lat": 46.576005,
		"lng": -96.753722
	},
	{
		"lat": 46.575888,
		"lng": -96.753919
	},
	{
		"lat": 46.575812,
		"lng": -96.75403
	},
	{
		"lat": 46.575733,
		"lng": -96.754136
	},
	{
		"lat": 46.575701,
		"lng": -96.75416
	},
	{
		"lat": 46.575558,
		"lng": -96.754317
	},
	{
		"lat": 46.575494,
		"lng": -96.754363
	},
	{
		"lat": 46.575291,
		"lng": -96.754577
	},
	{
		"lat": 46.5751,
		"lng": -96.754722
	},
	{
		"lat": 46.574933,
		"lng": -96.754815
	},
	{
		"lat": 46.574707,
		"lng": -96.754975
	},
	{
		"lat": 46.574673,
		"lng": -96.75499
	},
	{
		"lat": 46.574609,
		"lng": -96.755037
	},
	{
		"lat": 46.574521,
		"lng": -96.755128
	},
	{
		"lat": 46.57444,
		"lng": -96.755231
	},
	{
		"lat": 46.574345,
		"lng": -96.755387
	},
	{
		"lat": 46.574312,
		"lng": -96.755479
	},
	{
		"lat": 46.574299,
		"lng": -96.755686
	},
	{
		"lat": 46.574301,
		"lng": -96.755738
	},
	{
		"lat": 46.574313,
		"lng": -96.75584
	},
	{
		"lat": 46.574324,
		"lng": -96.755889
	},
	{
		"lat": 46.574451,
		"lng": -96.756073
	},
	{
		"lat": 46.574533,
		"lng": -96.756174
	},
	{
		"lat": 46.57465,
		"lng": -96.756296
	},
	{
		"lat": 46.574814,
		"lng": -96.756404
	},
	{
		"lat": 46.575055,
		"lng": -96.75651
	},
	{
		"lat": 46.575125,
		"lng": -96.756529
	},
	{
		"lat": 46.575341,
		"lng": -96.756553
	},
	{
		"lat": 46.575449,
		"lng": -96.756547
	},
	{
		"lat": 46.575592,
		"lng": -96.756524
	},
	{
		"lat": 46.575949,
		"lng": -96.756454
	},
	{
		"lat": 46.576021,
		"lng": -96.756445
	},
	{
		"lat": 46.576237,
		"lng": -96.75644
	},
	{
		"lat": 46.576452,
		"lng": -96.756461
	},
	{
		"lat": 46.576596,
		"lng": -96.756482
	},
	{
		"lat": 46.576631,
		"lng": -96.756494
	},
	{
		"lat": 46.576766,
		"lng": -96.756567
	},
	{
		"lat": 46.576801,
		"lng": -96.756576
	},
	{
		"lat": 46.576835,
		"lng": -96.756592
	},
	{
		"lat": 46.576899,
		"lng": -96.756641
	},
	{
		"lat": 46.576956,
		"lng": -96.756704
	},
	{
		"lat": 46.577149,
		"lng": -96.756938
	},
	{
		"lat": 46.577269,
		"lng": -96.757052
	},
	{
		"lat": 46.577525,
		"lng": -96.757338
	},
	{
		"lat": 46.577617,
		"lng": -96.75742
	},
	{
		"lat": 46.577648,
		"lng": -96.757444
	},
	{
		"lat": 46.577723,
		"lng": -96.757483
	},
	{
		"lat": 46.577758,
		"lng": -96.757493
	},
	{
		"lat": 46.57783,
		"lng": -96.7575
	},
	{
		"lat": 46.577902,
		"lng": -96.7575
	},
	{
		"lat": 46.577972,
		"lng": -96.757478
	},
	{
		"lat": 46.578005,
		"lng": -96.757458
	},
	{
		"lat": 46.578085,
		"lng": -96.757354
	},
	{
		"lat": 46.578132,
		"lng": -96.757275
	},
	{
		"lat": 46.57815,
		"lng": -96.75723
	},
	{
		"lat": 46.578158,
		"lng": -96.757179
	},
	{
		"lat": 46.578154,
		"lng": -96.756765
	},
	{
		"lat": 46.578133,
		"lng": -96.75656
	},
	{
		"lat": 46.578074,
		"lng": -96.756154
	},
	{
		"lat": 46.578064,
		"lng": -96.756103
	},
	{
		"lat": 46.578015,
		"lng": -96.755695
	},
	{
		"lat": 46.578008,
		"lng": -96.755592
	},
	{
		"lat": 46.578012,
		"lng": -96.755074
	},
	{
		"lat": 46.578042,
		"lng": -96.754714
	},
	{
		"lat": 46.57807,
		"lng": -96.754511
	},
	{
		"lat": 46.57817,
		"lng": -96.754067
	},
	{
		"lat": 46.578265,
		"lng": -96.753847
	},
	{
		"lat": 46.578382,
		"lng": -96.75365
	},
	{
		"lat": 46.578661,
		"lng": -96.753243
	},
	{
		"lat": 46.578745,
		"lng": -96.753146
	},
	{
		"lat": 46.578775,
		"lng": -96.753117
	},
	{
		"lat": 46.578842,
		"lng": -96.753078
	},
	{
		"lat": 46.578871,
		"lng": -96.753048
	},
	{
		"lat": 46.578905,
		"lng": -96.753031
	},
	{
		"lat": 46.578937,
		"lng": -96.753008
	},
	{
		"lat": 46.578997,
		"lng": -96.752949
	},
	{
		"lat": 46.579024,
		"lng": -96.752915
	},
	{
		"lat": 46.579086,
		"lng": -96.752863
	},
	{
		"lat": 46.579186,
		"lng": -96.752804
	},
	{
		"lat": 46.579323,
		"lng": -96.752738
	},
	{
		"lat": 46.579392,
		"lng": -96.752711
	},
	{
		"lat": 46.579747,
		"lng": -96.752622
	},
	{
		"lat": 46.579961,
		"lng": -96.752581
	},
	{
		"lat": 46.580536,
		"lng": -96.752521
	},
	{
		"lat": 46.581184,
		"lng": -96.752485
	},
	{
		"lat": 46.581652,
		"lng": -96.752447
	},
	{
		"lat": 46.581757,
		"lng": -96.752409
	},
	{
		"lat": 46.581825,
		"lng": -96.752378
	},
	{
		"lat": 46.581921,
		"lng": -96.752307
	},
	{
		"lat": 46.582007,
		"lng": -96.752213
	},
	{
		"lat": 46.582061,
		"lng": -96.752143
	},
	{
		"lat": 46.582084,
		"lng": -96.752103
	},
	{
		"lat": 46.582137,
		"lng": -96.751968
	},
	{
		"lat": 46.582151,
		"lng": -96.75192
	},
	{
		"lat": 46.582164,
		"lng": -96.751818
	},
	{
		"lat": 46.582163,
		"lng": -96.751559
	},
	{
		"lat": 46.582139,
		"lng": -96.751354
	},
	{
		"lat": 46.582072,
		"lng": -96.751058
	},
	{
		"lat": 46.582006,
		"lng": -96.750817
	},
	{
		"lat": 46.581966,
		"lng": -96.75073
	},
	{
		"lat": 46.58195,
		"lng": -96.750684
	},
	{
		"lat": 46.581887,
		"lng": -96.750557
	},
	{
		"lat": 46.581771,
		"lng": -96.750361
	},
	{
		"lat": 46.581431,
		"lng": -96.749825
	},
	{
		"lat": 46.58138,
		"lng": -96.749753
	},
	{
		"lat": 46.580995,
		"lng": -96.749283
	},
	{
		"lat": 46.580866,
		"lng": -96.749101
	},
	{
		"lat": 46.580665,
		"lng": -96.748803
	},
	{
		"lat": 46.580647,
		"lng": -96.748758
	},
	{
		"lat": 46.580602,
		"lng": -96.748561
	},
	{
		"lat": 46.580596,
		"lng": -96.748509
	},
	{
		"lat": 46.580592,
		"lng": -96.748406
	},
	{
		"lat": 46.580597,
		"lng": -96.74825
	},
	{
		"lat": 46.58062,
		"lng": -96.74794
	},
	{
		"lat": 46.580639,
		"lng": -96.747787
	},
	{
		"lat": 46.580684,
		"lng": -96.747646
	},
	{
		"lat": 46.580726,
		"lng": -96.747561
	},
	{
		"lat": 46.580848,
		"lng": -96.74737
	},
	{
		"lat": 46.580901,
		"lng": -96.7473
	},
	{
		"lat": 46.580959,
		"lng": -96.747237
	},
	{
		"lat": 46.580993,
		"lng": -96.747222
	},
	{
		"lat": 46.581059,
		"lng": -96.747181
	},
	{
		"lat": 46.581094,
		"lng": -96.747167
	},
	{
		"lat": 46.581201,
		"lng": -96.747148
	},
	{
		"lat": 46.581351,
		"lng": -96.74715
	},
	{
		"lat": 46.581525,
		"lng": -96.747153
	},
	{
		"lat": 46.581776,
		"lng": -96.747184
	},
	{
		"lat": 46.581917,
		"lng": -96.747225
	},
	{
		"lat": 46.582022,
		"lng": -96.747266
	},
	{
		"lat": 46.582159,
		"lng": -96.747328
	},
	{
		"lat": 46.582295,
		"lng": -96.7474
	},
	{
		"lat": 46.582657,
		"lng": -96.74763
	},
	{
		"lat": 46.582813,
		"lng": -96.747759
	},
	{
		"lat": 46.582902,
		"lng": -96.747849
	},
	{
		"lat": 46.582962,
		"lng": -96.747906
	},
	{
		"lat": 46.583042,
		"lng": -96.74801
	},
	{
		"lat": 46.583299,
		"lng": -96.748375
	},
	{
		"lat": 46.583394,
		"lng": -96.748531
	},
	{
		"lat": 46.583506,
		"lng": -96.748734
	},
	{
		"lat": 46.583569,
		"lng": -96.74886
	},
	{
		"lat": 46.583607,
		"lng": -96.748949
	},
	{
		"lat": 46.583674,
		"lng": -96.749132
	},
	{
		"lat": 46.583694,
		"lng": -96.749232
	},
	{
		"lat": 46.583713,
		"lng": -96.749355
	},
	{
		"lat": 46.583726,
		"lng": -96.749434
	},
	{
		"lat": 46.583753,
		"lng": -96.74953
	},
	{
		"lat": 46.583788,
		"lng": -96.749732
	},
	{
		"lat": 46.583799,
		"lng": -96.749834
	},
	{
		"lat": 46.583808,
		"lng": -96.750404
	},
	{
		"lat": 46.583801,
		"lng": -96.750611
	},
	{
		"lat": 46.583793,
		"lng": -96.750661
	},
	{
		"lat": 46.583788,
		"lng": -96.750765
	},
	{
		"lat": 46.583767,
		"lng": -96.75097
	},
	{
		"lat": 46.583754,
		"lng": -96.751019
	},
	{
		"lat": 46.583722,
		"lng": -96.751272
	},
	{
		"lat": 46.583661,
		"lng": -96.751674
	},
	{
		"lat": 46.583632,
		"lng": -96.751823
	},
	{
		"lat": 46.583607,
		"lng": -96.752026
	},
	{
		"lat": 46.583547,
		"lng": -96.752374
	},
	{
		"lat": 46.583526,
		"lng": -96.752472
	},
	{
		"lat": 46.583519,
		"lng": -96.752523
	},
	{
		"lat": 46.58343,
		"lng": -96.752747
	},
	{
		"lat": 46.583314,
		"lng": -96.753009
	},
	{
		"lat": 46.583267,
		"lng": -96.753086
	},
	{
		"lat": 46.583191,
		"lng": -96.753197
	},
	{
		"lat": 46.583112,
		"lng": -96.753303
	},
	{
		"lat": 46.582947,
		"lng": -96.753504
	},
	{
		"lat": 46.5826,
		"lng": -96.753957
	},
	{
		"lat": 46.582291,
		"lng": -96.75446
	},
	{
		"lat": 46.582247,
		"lng": -96.754541
	},
	{
		"lat": 46.582207,
		"lng": -96.754627
	},
	{
		"lat": 46.582153,
		"lng": -96.75482
	},
	{
		"lat": 46.582135,
		"lng": -96.754865
	},
	{
		"lat": 46.582102,
		"lng": -96.75512
	},
	{
		"lat": 46.582098,
		"lng": -96.755223
	},
	{
		"lat": 46.582105,
		"lng": -96.755327
	},
	{
		"lat": 46.582135,
		"lng": -96.755634
	},
	{
		"lat": 46.582209,
		"lng": -96.756035
	},
	{
		"lat": 46.582245,
		"lng": -96.756288
	},
	{
		"lat": 46.58228,
		"lng": -96.75649
	},
	{
		"lat": 46.582332,
		"lng": -96.756897
	},
	{
		"lat": 46.582337,
		"lng": -96.756999
	},
	{
		"lat": 46.582358,
		"lng": -96.757256
	},
	{
		"lat": 46.582348,
		"lng": -96.757515
	},
	{
		"lat": 46.582327,
		"lng": -96.757667
	},
	{
		"lat": 46.582281,
		"lng": -96.757807
	},
	{
		"lat": 46.582189,
		"lng": -96.758019
	},
	{
		"lat": 46.582174,
		"lng": -96.758066
	},
	{
		"lat": 46.582096,
		"lng": -96.75824
	},
	{
		"lat": 46.582082,
		"lng": -96.758288
	},
	{
		"lat": 46.582062,
		"lng": -96.758332
	},
	{
		"lat": 46.581952,
		"lng": -96.758537
	},
	{
		"lat": 46.581699,
		"lng": -96.758974
	},
	{
		"lat": 46.58162,
		"lng": -96.759147
	},
	{
		"lat": 46.581606,
		"lng": -96.759183
	},
	{
		"lat": 46.581568,
		"lng": -96.759284
	},
	{
		"lat": 46.581558,
		"lng": -96.759333
	},
	{
		"lat": 46.581492,
		"lng": -96.759517
	},
	{
		"lat": 46.581449,
		"lng": -96.759715
	},
	{
		"lat": 46.581432,
		"lng": -96.759816
	},
	{
		"lat": 46.581421,
		"lng": -96.759918
	},
	{
		"lat": 46.581423,
		"lng": -96.760177
	},
	{
		"lat": 46.581429,
		"lng": -96.760228
	},
	{
		"lat": 46.581448,
		"lng": -96.760329
	},
	{
		"lat": 46.581475,
		"lng": -96.760425
	},
	{
		"lat": 46.581508,
		"lng": -96.760518
	},
	{
		"lat": 46.581605,
		"lng": -96.760671
	},
	{
		"lat": 46.581688,
		"lng": -96.760771
	},
	{
		"lat": 46.581718,
		"lng": -96.760799
	},
	{
		"lat": 46.581783,
		"lng": -96.760844
	},
	{
		"lat": 46.581812,
		"lng": -96.760876
	},
	{
		"lat": 46.581843,
		"lng": -96.760901
	},
	{
		"lat": 46.581913,
		"lng": -96.76093
	},
	{
		"lat": 46.581978,
		"lng": -96.760974
	},
	{
		"lat": 46.582151,
		"lng": -96.761049
	},
	{
		"lat": 46.582257,
		"lng": -96.761079
	},
	{
		"lat": 46.582649,
		"lng": -96.761159
	},
	{
		"lat": 46.582757,
		"lng": -96.761155
	},
	{
		"lat": 46.5829,
		"lng": -96.761127
	},
	{
		"lat": 46.583041,
		"lng": -96.761087
	},
	{
		"lat": 46.58311,
		"lng": -96.761059
	},
	{
		"lat": 46.583143,
		"lng": -96.761037
	},
	{
		"lat": 46.5832,
		"lng": -96.760974
	},
	{
		"lat": 46.58329,
		"lng": -96.760862
	},
	{
		"lat": 46.583378,
		"lng": -96.760724
	},
	{
		"lat": 46.583464,
		"lng": -96.760558
	},
	{
		"lat": 46.583524,
		"lng": -96.760428
	},
	{
		"lat": 46.583541,
		"lng": -96.760383
	},
	{
		"lat": 46.58362,
		"lng": -96.760094
	},
	{
		"lat": 46.583683,
		"lng": -96.759743
	},
	{
		"lat": 46.583789,
		"lng": -96.759195
	},
	{
		"lat": 46.583798,
		"lng": -96.759145
	},
	{
		"lat": 46.583828,
		"lng": -96.758837
	},
	{
		"lat": 46.583832,
		"lng": -96.758734
	},
	{
		"lat": 46.583867,
		"lng": -96.758219
	},
	{
		"lat": 46.583872,
		"lng": -96.758012
	},
	{
		"lat": 46.583878,
		"lng": -96.757909
	},
	{
		"lat": 46.58388,
		"lng": -96.757754
	},
	{
		"lat": 46.583877,
		"lng": -96.757443
	},
	{
		"lat": 46.583855,
		"lng": -96.756924
	},
	{
		"lat": 46.583832,
		"lng": -96.756615
	},
	{
		"lat": 46.583798,
		"lng": -96.756047
	},
	{
		"lat": 46.583796,
		"lng": -96.755891
	},
	{
		"lat": 46.58383,
		"lng": -96.755323
	},
	{
		"lat": 46.583867,
		"lng": -96.754859
	},
	{
		"lat": 46.583926,
		"lng": -96.754615
	},
	{
		"lat": 46.584039,
		"lng": -96.75429
	},
	{
		"lat": 46.584143,
		"lng": -96.753959
	},
	{
		"lat": 46.58422,
		"lng": -96.75367
	},
	{
		"lat": 46.584326,
		"lng": -96.753229
	},
	{
		"lat": 46.58438,
		"lng": -96.752982
	},
	{
		"lat": 46.584443,
		"lng": -96.752524
	},
	{
		"lat": 46.5845,
		"lng": -96.752224
	},
	{
		"lat": 46.584527,
		"lng": -96.75202
	},
	{
		"lat": 46.584561,
		"lng": -96.751872
	},
	{
		"lat": 46.584615,
		"lng": -96.751571
	},
	{
		"lat": 46.584674,
		"lng": -96.751325
	},
	{
		"lat": 46.584709,
		"lng": -96.751234
	},
	{
		"lat": 46.584782,
		"lng": -96.75112
	},
	{
		"lat": 46.584836,
		"lng": -96.751051
	},
	{
		"lat": 46.584925,
		"lng": -96.750963
	},
	{
		"lat": 46.58505,
		"lng": -96.750859
	},
	{
		"lat": 46.585116,
		"lng": -96.750817
	},
	{
		"lat": 46.585185,
		"lng": -96.750787
	},
	{
		"lat": 46.585327,
		"lng": -96.750756
	},
	{
		"lat": 46.585435,
		"lng": -96.750751
	},
	{
		"lat": 46.585651,
		"lng": -96.750753
	},
	{
		"lat": 46.585722,
		"lng": -96.750758
	},
	{
		"lat": 46.5859,
		"lng": -96.750801
	},
	{
		"lat": 46.586108,
		"lng": -96.750889
	},
	{
		"lat": 46.58624,
		"lng": -96.75097
	},
	{
		"lat": 46.586334,
		"lng": -96.751049
	},
	{
		"lat": 46.586624,
		"lng": -96.751256
	},
	{
		"lat": 46.58678,
		"lng": -96.751384
	},
	{
		"lat": 46.586906,
		"lng": -96.751496
	},
	{
		"lat": 46.586964,
		"lng": -96.751547
	},
	{
		"lat": 46.58703,
		"lng": -96.75159
	},
	{
		"lat": 46.58706,
		"lng": -96.751617
	},
	{
		"lat": 46.587183,
		"lng": -96.751686
	},
	{
		"lat": 46.58759,
		"lng": -96.75189
	},
	{
		"lat": 46.587893,
		"lng": -96.752052
	},
	{
		"lat": 46.587958,
		"lng": -96.752099
	},
	{
		"lat": 46.588025,
		"lng": -96.752137
	},
	{
		"lat": 46.588119,
		"lng": -96.752213
	},
	{
		"lat": 46.588148,
		"lng": -96.752244
	},
	{
		"lat": 46.588218,
		"lng": -96.752363
	},
	{
		"lat": 46.588293,
		"lng": -96.75254
	},
	{
		"lat": 46.588351,
		"lng": -96.75273
	},
	{
		"lat": 46.588392,
		"lng": -96.752983
	},
	{
		"lat": 46.588393,
		"lng": -96.753035
	},
	{
		"lat": 46.588378,
		"lng": -96.753294
	},
	{
		"lat": 46.58837,
		"lng": -96.753344
	},
	{
		"lat": 46.588302,
		"lng": -96.753584
	},
	{
		"lat": 46.588226,
		"lng": -96.753761
	},
	{
		"lat": 46.588178,
		"lng": -96.753901
	},
	{
		"lat": 46.588074,
		"lng": -96.754113
	},
	{
		"lat": 46.587935,
		"lng": -96.754416
	},
	{
		"lat": 46.587851,
		"lng": -96.754584
	},
	{
		"lat": 46.587631,
		"lng": -96.754995
	},
	{
		"lat": 46.587293,
		"lng": -96.7556
	},
	{
		"lat": 46.587096,
		"lng": -96.755968
	},
	{
		"lat": 46.587019,
		"lng": -96.756143
	},
	{
		"lat": 46.586974,
		"lng": -96.756284
	},
	{
		"lat": 46.586953,
		"lng": -96.756326
	},
	{
		"lat": 46.586923,
		"lng": -96.75642
	},
	{
		"lat": 46.586904,
		"lng": -96.75652
	},
	{
		"lat": 46.586887,
		"lng": -96.756566
	},
	{
		"lat": 46.586878,
		"lng": -96.756616
	},
	{
		"lat": 46.586862,
		"lng": -96.756769
	},
	{
		"lat": 46.586857,
		"lng": -96.756873
	},
	{
		"lat": 46.586858,
		"lng": -96.757236
	},
	{
		"lat": 46.586882,
		"lng": -96.757493
	},
	{
		"lat": 46.586911,
		"lng": -96.757643
	},
	{
		"lat": 46.586932,
		"lng": -96.757796
	},
	{
		"lat": 46.586956,
		"lng": -96.757893
	},
	{
		"lat": 46.586993,
		"lng": -96.758094
	},
	{
		"lat": 46.587037,
		"lng": -96.758292
	},
	{
		"lat": 46.587077,
		"lng": -96.758437
	},
	{
		"lat": 46.587164,
		"lng": -96.758721
	},
	{
		"lat": 46.587189,
		"lng": -96.758818
	},
	{
		"lat": 46.587235,
		"lng": -96.758959
	},
	{
		"lat": 46.587324,
		"lng": -96.759185
	},
	{
		"lat": 46.587567,
		"lng": -96.759699
	},
	{
		"lat": 46.587737,
		"lng": -96.760034
	},
	{
		"lat": 46.587977,
		"lng": -96.760551
	},
	{
		"lat": 46.587994,
		"lng": -96.760597
	},
	{
		"lat": 46.588167,
		"lng": -96.760929
	},
	{
		"lat": 46.588312,
		"lng": -96.761225
	},
	{
		"lat": 46.588399,
		"lng": -96.76139
	},
	{
		"lat": 46.588618,
		"lng": -96.761735
	},
	{
		"lat": 46.589052,
		"lng": -96.762356
	},
	{
		"lat": 46.589136,
		"lng": -96.762454
	},
	{
		"lat": 46.589324,
		"lng": -96.762608
	},
	{
		"lat": 46.589543,
		"lng": -96.762702
	},
	{
		"lat": 46.589896,
		"lng": -96.762809
	},
	{
		"lat": 46.590139,
		"lng": -96.762901
	},
	{
		"lat": 46.590455,
		"lng": -96.763002
	},
	{
		"lat": 46.590669,
		"lng": -96.763042
	},
	{
		"lat": 46.590992,
		"lng": -96.763069
	},
	{
		"lat": 46.591027,
		"lng": -96.763061
	},
	{
		"lat": 46.591061,
		"lng": -96.763044
	},
	{
		"lat": 46.591241,
		"lng": -96.763017
	},
	{
		"lat": 46.591379,
		"lng": -96.76296
	},
	{
		"lat": 46.591409,
		"lng": -96.762932
	},
	{
		"lat": 46.591473,
		"lng": -96.762886
	},
	{
		"lat": 46.591623,
		"lng": -96.762743
	},
	{
		"lat": 46.591755,
		"lng": -96.762567
	},
	{
		"lat": 46.591878,
		"lng": -96.762378
	},
	{
		"lat": 46.591967,
		"lng": -96.762214
	},
	{
		"lat": 46.592019,
		"lng": -96.762078
	},
	{
		"lat": 46.592065,
		"lng": -96.761937
	},
	{
		"lat": 46.5921,
		"lng": -96.761791
	},
	{
		"lat": 46.592107,
		"lng": -96.76174
	},
	{
		"lat": 46.592117,
		"lng": -96.761585
	},
	{
		"lat": 46.592124,
		"lng": -96.761377
	},
	{
		"lat": 46.59211,
		"lng": -96.761015
	},
	{
		"lat": 46.592103,
		"lng": -96.760964
	},
	{
		"lat": 46.592057,
		"lng": -96.760768
	},
	{
		"lat": 46.591949,
		"lng": -96.76044
	},
	{
		"lat": 46.591882,
		"lng": -96.7602
	},
	{
		"lat": 46.591811,
		"lng": -96.76002
	},
	{
		"lat": 46.591784,
		"lng": -96.759924
	},
	{
		"lat": 46.591722,
		"lng": -96.759796
	},
	{
		"lat": 46.591617,
		"lng": -96.759526
	},
	{
		"lat": 46.591597,
		"lng": -96.759483
	},
	{
		"lat": 46.591556,
		"lng": -96.759339
	},
	{
		"lat": 46.591427,
		"lng": -96.758745
	},
	{
		"lat": 46.591413,
		"lng": -96.758644
	},
	{
		"lat": 46.591402,
		"lng": -96.758489
	},
	{
		"lat": 46.591397,
		"lng": -96.758333
	},
	{
		"lat": 46.591425,
		"lng": -96.757971
	},
	{
		"lat": 46.591445,
		"lng": -96.757819
	},
	{
		"lat": 46.591479,
		"lng": -96.757617
	},
	{
		"lat": 46.591523,
		"lng": -96.757475
	},
	{
		"lat": 46.591591,
		"lng": -96.757292
	},
	{
		"lat": 46.59171,
		"lng": -96.757034
	},
	{
		"lat": 46.59176,
		"lng": -96.75696
	},
	{
		"lat": 46.591778,
		"lng": -96.756916
	},
	{
		"lat": 46.591964,
		"lng": -96.756603
	},
	{
		"lat": 46.592203,
		"lng": -96.756287
	},
	{
		"lat": 46.592288,
		"lng": -96.756191
	},
	{
		"lat": 46.592375,
		"lng": -96.756101
	},
	{
		"lat": 46.59247,
		"lng": -96.756028
	},
	{
		"lat": 46.592761,
		"lng": -96.755821
	},
	{
		"lat": 46.592926,
		"lng": -96.755714
	},
	{
		"lat": 46.59299,
		"lng": -96.755666
	},
	{
		"lat": 46.593093,
		"lng": -96.755619
	},
	{
		"lat": 46.593198,
		"lng": -96.755585
	},
	{
		"lat": 46.593335,
		"lng": -96.75552
	},
	{
		"lat": 46.593441,
		"lng": -96.75549
	},
	{
		"lat": 46.593763,
		"lng": -96.755428
	},
	{
		"lat": 46.594085,
		"lng": -96.75538
	},
	{
		"lat": 46.594372,
		"lng": -96.755356
	},
	{
		"lat": 46.594553,
		"lng": -96.755354
	},
	{
		"lat": 46.594696,
		"lng": -96.755372
	},
	{
		"lat": 46.594803,
		"lng": -96.755398
	},
	{
		"lat": 46.594907,
		"lng": -96.75544
	},
	{
		"lat": 46.595004,
		"lng": -96.755506
	},
	{
		"lat": 46.595127,
		"lng": -96.755615
	},
	{
		"lat": 46.595182,
		"lng": -96.755682
	},
	{
		"lat": 46.595284,
		"lng": -96.755828
	},
	{
		"lat": 46.595379,
		"lng": -96.755984
	},
	{
		"lat": 46.5954,
		"lng": -96.756027
	},
	{
		"lat": 46.595418,
		"lng": -96.756087
	},
	{
		"lat": 46.595454,
		"lng": -96.756177
	},
	{
		"lat": 46.595477,
		"lng": -96.756275
	},
	{
		"lat": 46.595507,
		"lng": -96.756479
	},
	{
		"lat": 46.595534,
		"lng": -96.756944
	},
	{
		"lat": 46.595537,
		"lng": -96.757152
	},
	{
		"lat": 46.595524,
		"lng": -96.757254
	},
	{
		"lat": 46.595466,
		"lng": -96.7575
	},
	{
		"lat": 46.595449,
		"lng": -96.757601
	},
	{
		"lat": 46.595359,
		"lng": -96.757884
	},
	{
		"lat": 46.595204,
		"lng": -96.758294
	},
	{
		"lat": 46.595006,
		"lng": -96.758846
	},
	{
		"lat": 46.59496,
		"lng": -96.759042
	},
	{
		"lat": 46.594933,
		"lng": -96.759138
	},
	{
		"lat": 46.594913,
		"lng": -96.759181
	},
	{
		"lat": 46.594897,
		"lng": -96.759227
	},
	{
		"lat": 46.594888,
		"lng": -96.759278
	},
	{
		"lat": 46.594838,
		"lng": -96.759416
	},
	{
		"lat": 46.594828,
		"lng": -96.759466
	},
	{
		"lat": 46.594799,
		"lng": -96.759561
	},
	{
		"lat": 46.59475,
		"lng": -96.759699
	},
	{
		"lat": 46.59471,
		"lng": -96.759784
	},
	{
		"lat": 46.594698,
		"lng": -96.759833
	},
	{
		"lat": 46.594659,
		"lng": -96.75992
	},
	{
		"lat": 46.594633,
		"lng": -96.760017
	},
	{
		"lat": 46.594576,
		"lng": -96.760149
	},
	{
		"lat": 46.59456,
		"lng": -96.760196
	},
	{
		"lat": 46.59455,
		"lng": -96.760245
	},
	{
		"lat": 46.594533,
		"lng": -96.76029
	},
	{
		"lat": 46.59451,
		"lng": -96.760332
	},
	{
		"lat": 46.594488,
		"lng": -96.76043
	},
	{
		"lat": 46.594473,
		"lng": -96.760477
	},
	{
		"lat": 46.594452,
		"lng": -96.760519
	},
	{
		"lat": 46.594437,
		"lng": -96.760566
	},
	{
		"lat": 46.594403,
		"lng": -96.760713
	},
	{
		"lat": 46.594347,
		"lng": -96.760847
	},
	{
		"lat": 46.594334,
		"lng": -96.760895
	},
	{
		"lat": 46.594285,
		"lng": -96.761033
	},
	{
		"lat": 46.594194,
		"lng": -96.761255
	},
	{
		"lat": 46.594166,
		"lng": -96.761351
	},
	{
		"lat": 46.594102,
		"lng": -96.761648
	},
	{
		"lat": 46.594077,
		"lng": -96.7618
	},
	{
		"lat": 46.594053,
		"lng": -96.762161
	},
	{
		"lat": 46.594047,
		"lng": -96.762316
	},
	{
		"lat": 46.594048,
		"lng": -96.762524
	},
	{
		"lat": 46.594066,
		"lng": -96.762782
	},
	{
		"lat": 46.594083,
		"lng": -96.762882
	},
	{
		"lat": 46.594123,
		"lng": -96.763027
	},
	{
		"lat": 46.59417,
		"lng": -96.763167
	},
	{
		"lat": 46.594189,
		"lng": -96.763211
	},
	{
		"lat": 46.594371,
		"lng": -96.763533
	},
	{
		"lat": 46.594599,
		"lng": -96.763863
	},
	{
		"lat": 46.594681,
		"lng": -96.763964
	},
	{
		"lat": 46.5948,
		"lng": -96.76408
	},
	{
		"lat": 46.594996,
		"lng": -96.764212
	},
	{
		"lat": 46.595064,
		"lng": -96.764242
	},
	{
		"lat": 46.595262,
		"lng": -96.764365
	},
	{
		"lat": 46.595463,
		"lng": -96.76448
	},
	{
		"lat": 46.595498,
		"lng": -96.764493
	},
	{
		"lat": 46.595564,
		"lng": -96.764532
	},
	{
		"lat": 46.595909,
		"lng": -96.764684
	},
	{
		"lat": 46.596187,
		"lng": -96.764791
	},
	{
		"lat": 46.596328,
		"lng": -96.764832
	},
	{
		"lat": 46.596792,
		"lng": -96.764912
	},
	{
		"lat": 46.596933,
		"lng": -96.764948
	},
	{
		"lat": 46.597381,
		"lng": -96.76514
	},
	{
		"lat": 46.597421,
		"lng": -96.765161
	},
	{
		"lat": 46.597684,
		"lng": -96.765301
	},
	{
		"lat": 46.597855,
		"lng": -96.765382
	},
	{
		"lat": 46.598024,
		"lng": -96.765471
	},
	{
		"lat": 46.598052,
		"lng": -96.765502
	},
	{
		"lat": 46.598162,
		"lng": -96.765576
	},
	{
		"lat": 46.598254,
		"lng": -96.765657
	},
	{
		"lat": 46.598348,
		"lng": -96.765732
	},
	{
		"lat": 46.598466,
		"lng": -96.765851
	},
	{
		"lat": 46.598718,
		"lng": -96.76622
	},
	{
		"lat": 46.59876,
		"lng": -96.766304
	},
	{
		"lat": 46.598831,
		"lng": -96.766543
	},
	{
		"lat": 46.598856,
		"lng": -96.766694
	},
	{
		"lat": 46.598887,
		"lng": -96.767054
	},
	{
		"lat": 46.598871,
		"lng": -96.767416
	},
	{
		"lat": 46.598833,
		"lng": -96.767616
	},
	{
		"lat": 46.598776,
		"lng": -96.767862
	},
	{
		"lat": 46.598746,
		"lng": -96.767956
	},
	{
		"lat": 46.598686,
		"lng": -96.768087
	},
	{
		"lat": 46.598655,
		"lng": -96.76818
	},
	{
		"lat": 46.598472,
		"lng": -96.768565
	},
	{
		"lat": 46.598338,
		"lng": -96.768808
	},
	{
		"lat": 46.598217,
		"lng": -96.769
	},
	{
		"lat": 46.598014,
		"lng": -96.769295
	},
	{
		"lat": 46.597958,
		"lng": -96.76936
	},
	{
		"lat": 46.597933,
		"lng": -96.769398
	},
	{
		"lat": 46.597845,
		"lng": -96.769487
	},
	{
		"lat": 46.597718,
		"lng": -96.769586
	},
	{
		"lat": 46.59734,
		"lng": -96.769758
	},
	{
		"lat": 46.597164,
		"lng": -96.76981
	},
	{
		"lat": 46.596949,
		"lng": -96.769844
	},
	{
		"lat": 46.596553,
		"lng": -96.769858
	},
	{
		"lat": 46.596445,
		"lng": -96.769851
	},
	{
		"lat": 46.596194,
		"lng": -96.76982
	},
	{
		"lat": 46.596014,
		"lng": -96.769828
	},
	{
		"lat": 46.595943,
		"lng": -96.769844
	},
	{
		"lat": 46.595838,
		"lng": -96.769879
	},
	{
		"lat": 46.595706,
		"lng": -96.769961
	},
	{
		"lat": 46.595614,
		"lng": -96.770043
	},
	{
		"lat": 46.595564,
		"lng": -96.770118
	},
	{
		"lat": 46.595521,
		"lng": -96.770201
	},
	{
		"lat": 46.595509,
		"lng": -96.77025
	},
	{
		"lat": 46.595486,
		"lng": -96.770455
	},
	{
		"lat": 46.595485,
		"lng": -96.770507
	},
	{
		"lat": 46.595503,
		"lng": -96.770661
	},
	{
		"lat": 46.595515,
		"lng": -96.77071
	},
	{
		"lat": 46.595532,
		"lng": -96.770756
	},
	{
		"lat": 46.595592,
		"lng": -96.770885
	},
	{
		"lat": 46.595719,
		"lng": -96.771068
	},
	{
		"lat": 46.595826,
		"lng": -96.771207
	},
	{
		"lat": 46.595909,
		"lng": -96.771306
	},
	{
		"lat": 46.595995,
		"lng": -96.771398
	},
	{
		"lat": 46.596056,
		"lng": -96.771454
	},
	{
		"lat": 46.596213,
		"lng": -96.771579
	},
	{
		"lat": 46.596281,
		"lng": -96.77161
	},
	{
		"lat": 46.596311,
		"lng": -96.771639
	},
	{
		"lat": 46.596494,
		"lng": -96.771722
	},
	{
		"lat": 46.596619,
		"lng": -96.771778
	},
	{
		"lat": 46.596759,
		"lng": -96.771819
	},
	{
		"lat": 46.596938,
		"lng": -96.771849
	},
	{
		"lat": 46.596974,
		"lng": -96.771848
	},
	{
		"lat": 46.597044,
		"lng": -96.771823
	},
	{
		"lat": 46.597115,
		"lng": -96.771811
	},
	{
		"lat": 46.597222,
		"lng": -96.771826
	},
	{
		"lat": 46.597294,
		"lng": -96.771827
	},
	{
		"lat": 46.597653,
		"lng": -96.771859
	},
	{
		"lat": 46.597725,
		"lng": -96.771859
	},
	{
		"lat": 46.597975,
		"lng": -96.771879
	},
	{
		"lat": 46.598151,
		"lng": -96.77187
	},
	{
		"lat": 46.598221,
		"lng": -96.771859
	},
	{
		"lat": 46.598506,
		"lng": -96.771873
	},
	{
		"lat": 46.598828,
		"lng": -96.771914
	},
	{
		"lat": 46.599007,
		"lng": -96.771914
	},
	{
		"lat": 46.599078,
		"lng": -96.771934
	},
	{
		"lat": 46.599112,
		"lng": -96.77195
	},
	{
		"lat": 46.599161,
		"lng": -96.771969
	},
	{
		"lat": 46.599197,
		"lng": -96.771977
	},
	{
		"lat": 46.599334,
		"lng": -96.772038
	},
	{
		"lat": 46.599538,
		"lng": -96.772139
	},
	{
		"lat": 46.599745,
		"lng": -96.772232
	},
	{
		"lat": 46.59988,
		"lng": -96.7723
	},
	{
		"lat": 46.599929,
		"lng": -96.772319
	},
	{
		"lat": 46.59995,
		"lng": -96.772327
	},
	{
		"lat": 46.600325,
		"lng": -96.772506
	},
	{
		"lat": 46.600432,
		"lng": -96.772532
	},
	{
		"lat": 46.600539,
		"lng": -96.772545
	},
	{
		"lat": 46.600575,
		"lng": -96.772544
	},
	{
		"lat": 46.600646,
		"lng": -96.772528
	},
	{
		"lat": 46.600718,
		"lng": -96.772529
	},
	{
		"lat": 46.600824,
		"lng": -96.772497
	},
	{
		"lat": 46.600891,
		"lng": -96.77246
	},
	{
		"lat": 46.600923,
		"lng": -96.772436
	},
	{
		"lat": 46.601041,
		"lng": -96.772317
	},
	{
		"lat": 46.601118,
		"lng": -96.772208
	},
	{
		"lat": 46.601166,
		"lng": -96.772131
	},
	{
		"lat": 46.601209,
		"lng": -96.772047
	},
	{
		"lat": 46.601247,
		"lng": -96.77196
	},
	{
		"lat": 46.601273,
		"lng": -96.771864
	},
	{
		"lat": 46.601293,
		"lng": -96.771821
	},
	{
		"lat": 46.601325,
		"lng": -96.771728
	},
	{
		"lat": 46.601337,
		"lng": -96.771679
	},
	{
		"lat": 46.60144,
		"lng": -96.771467
	},
	{
		"lat": 46.601509,
		"lng": -96.771285
	},
	{
		"lat": 46.601618,
		"lng": -96.770979
	},
	{
		"lat": 46.60169,
		"lng": -96.77078
	},
	{
		"lat": 46.601733,
		"lng": -96.770638
	},
	{
		"lat": 46.601766,
		"lng": -96.770546
	},
	{
		"lat": 46.601806,
		"lng": -96.770461
	},
	{
		"lat": 46.601937,
		"lng": -96.770284
	},
	{
		"lat": 46.602001,
		"lng": -96.770236
	},
	{
		"lat": 46.602041,
		"lng": -96.770213
	},
	{
		"lat": 46.602068,
		"lng": -96.770198
	},
	{
		"lat": 46.602166,
		"lng": -96.770132
	},
	{
		"lat": 46.602308,
		"lng": -96.770102
	},
	{
		"lat": 46.60238,
		"lng": -96.770104
	},
	{
		"lat": 46.602451,
		"lng": -96.77012
	},
	{
		"lat": 46.602485,
		"lng": -96.770138
	},
	{
		"lat": 46.602513,
		"lng": -96.770171
	},
	{
		"lat": 46.60259,
		"lng": -96.770279
	},
	{
		"lat": 46.602657,
		"lng": -96.770401
	},
	{
		"lat": 46.602741,
		"lng": -96.770569
	},
	{
		"lat": 46.6028,
		"lng": -96.7707
	},
	{
		"lat": 46.602834,
		"lng": -96.770792
	},
	{
		"lat": 46.602909,
		"lng": -96.770967
	},
	{
		"lat": 46.602978,
		"lng": -96.771149
	},
	{
		"lat": 46.603024,
		"lng": -96.77129
	},
	{
		"lat": 46.603028,
		"lng": -96.771304
	},
	{
		"lat": 46.603065,
		"lng": -96.771434
	},
	{
		"lat": 46.603097,
		"lng": -96.771582
	},
	{
		"lat": 46.603126,
		"lng": -96.771677
	},
	{
		"lat": 46.603137,
		"lng": -96.771726
	},
	{
		"lat": 46.603229,
		"lng": -96.771948
	},
	{
		"lat": 46.603251,
		"lng": -96.77199
	},
	{
		"lat": 46.603352,
		"lng": -96.772138
	},
	{
		"lat": 46.603437,
		"lng": -96.772234
	},
	{
		"lat": 46.603471,
		"lng": -96.772251
	},
	{
		"lat": 46.603723,
		"lng": -96.772257
	},
	{
		"lat": 46.60383,
		"lng": -96.772236
	},
	{
		"lat": 46.603865,
		"lng": -96.772223
	},
	{
		"lat": 46.603928,
		"lng": -96.772173
	},
	{
		"lat": 46.603987,
		"lng": -96.772113
	},
	{
		"lat": 46.604117,
		"lng": -96.771935
	},
	{
		"lat": 46.604189,
		"lng": -96.771819
	},
	{
		"lat": 46.604228,
		"lng": -96.771732
	},
	{
		"lat": 46.604295,
		"lng": -96.771548
	},
	{
		"lat": 46.604368,
		"lng": -96.771311
	},
	{
		"lat": 46.604404,
		"lng": -96.77111
	},
	{
		"lat": 46.604527,
		"lng": -96.770514
	},
	{
		"lat": 46.604553,
		"lng": -96.770417
	},
	{
		"lat": 46.604604,
		"lng": -96.770169
	},
	{
		"lat": 46.604665,
		"lng": -96.769926
	},
	{
		"lat": 46.604755,
		"lng": -96.769645
	},
	{
		"lat": 46.604807,
		"lng": -96.769509
	},
	{
		"lat": 46.604859,
		"lng": -96.769317
	},
	{
		"lat": 46.604936,
		"lng": -96.769142
	},
	{
		"lat": 46.605068,
		"lng": -96.768896
	},
	{
		"lat": 46.605143,
		"lng": -96.76878
	},
	{
		"lat": 46.605218,
		"lng": -96.768686
	},
	{
		"lat": 46.605362,
		"lng": -96.768509
	},
	{
		"lat": 46.605422,
		"lng": -96.768451
	},
	{
		"lat": 46.605587,
		"lng": -96.768349
	},
	{
		"lat": 46.605792,
		"lng": -96.768253
	},
	{
		"lat": 46.605932,
		"lng": -96.768205
	},
	{
		"lat": 46.606184,
		"lng": -96.76821
	},
	{
		"lat": 46.60629,
		"lng": -96.768231
	},
	{
		"lat": 46.606324,
		"lng": -96.768246
	},
	{
		"lat": 46.606455,
		"lng": -96.768331
	},
	{
		"lat": 46.606543,
		"lng": -96.768422
	},
	{
		"lat": 46.606608,
		"lng": -96.768546
	},
	{
		"lat": 46.606638,
		"lng": -96.76861
	},
	{
		"lat": 46.606648,
		"lng": -96.768633
	},
	{
		"lat": 46.606682,
		"lng": -96.768724
	},
	{
		"lat": 46.606716,
		"lng": -96.768872
	},
	{
		"lat": 46.606724,
		"lng": -96.768922
	},
	{
		"lat": 46.606748,
		"lng": -96.769231
	},
	{
		"lat": 46.606756,
		"lng": -96.76949
	},
	{
		"lat": 46.606736,
		"lng": -96.769747
	},
	{
		"lat": 46.606687,
		"lng": -96.770047
	},
	{
		"lat": 46.606687,
		"lng": -96.770049
	},
	{
		"lat": 46.606666,
		"lng": -96.770149
	},
	{
		"lat": 46.606644,
		"lng": -96.7703
	},
	{
		"lat": 46.606602,
		"lng": -96.770657
	},
	{
		"lat": 46.606531,
		"lng": -96.771057
	},
	{
		"lat": 46.606519,
		"lng": -96.771158
	},
	{
		"lat": 46.606487,
		"lng": -96.771307
	},
	{
		"lat": 46.606463,
		"lng": -96.77151
	},
	{
		"lat": 46.606422,
		"lng": -96.771761
	},
	{
		"lat": 46.606413,
		"lng": -96.771864
	},
	{
		"lat": 46.606383,
		"lng": -96.772065
	},
	{
		"lat": 46.606373,
		"lng": -96.772166
	},
	{
		"lat": 46.60632,
		"lng": -96.772466
	},
	{
		"lat": 46.606202,
		"lng": -96.772955
	},
	{
		"lat": 46.606117,
		"lng": -96.773238
	},
	{
		"lat": 46.60604,
		"lng": -96.773526
	},
	{
		"lat": 46.60597,
		"lng": -96.773707
	},
	{
		"lat": 46.605931,
		"lng": -96.773852
	},
	{
		"lat": 46.605876,
		"lng": -96.773986
	},
	{
		"lat": 46.605826,
		"lng": -96.774179
	},
	{
		"lat": 46.605789,
		"lng": -96.774309
	},
	{
		"lat": 46.605745,
		"lng": -96.774468
	},
	{
		"lat": 46.605706,
		"lng": -96.774555
	},
	{
		"lat": 46.605666,
		"lng": -96.774699
	},
	{
		"lat": 46.60559,
		"lng": -96.774935
	},
	{
		"lat": 46.605534,
		"lng": -96.775126
	},
	{
		"lat": 46.605486,
		"lng": -96.775321
	},
	{
		"lat": 46.605443,
		"lng": -96.775519
	},
	{
		"lat": 46.605415,
		"lng": -96.775713
	},
	{
		"lat": 46.605414,
		"lng": -96.775722
	},
	{
		"lat": 46.605404,
		"lng": -96.776031
	},
	{
		"lat": 46.605406,
		"lng": -96.776135
	},
	{
		"lat": 46.605427,
		"lng": -96.776445
	},
	{
		"lat": 46.605444,
		"lng": -96.776546
	},
	{
		"lat": 46.605513,
		"lng": -96.776785
	},
	{
		"lat": 46.605564,
		"lng": -96.776921
	},
	{
		"lat": 46.605608,
		"lng": -96.777016
	},
	{
		"lat": 46.605625,
		"lng": -96.777063
	},
	{
		"lat": 46.605712,
		"lng": -96.777226
	},
	{
		"lat": 46.605868,
		"lng": -96.77751
	},
	{
		"lat": 46.606172,
		"lng": -96.777953
	},
	{
		"lat": 46.606437,
		"lng": -96.778304
	},
	{
		"lat": 46.606497,
		"lng": -96.778363
	},
	{
		"lat": 46.606529,
		"lng": -96.778387
	},
	{
		"lat": 46.606642,
		"lng": -96.778512
	},
	{
		"lat": 46.606702,
		"lng": -96.77857
	},
	{
		"lat": 46.606765,
		"lng": -96.77862
	},
	{
		"lat": 46.606798,
		"lng": -96.77864
	},
	{
		"lat": 46.606934,
		"lng": -96.778703
	},
	{
		"lat": 46.606966,
		"lng": -96.778728
	},
	{
		"lat": 46.607,
		"lng": -96.778744
	},
	{
		"lat": 46.607174,
		"lng": -96.778804
	},
	{
		"lat": 46.607317,
		"lng": -96.778829
	},
	{
		"lat": 46.60746,
		"lng": -96.778832
	},
	{
		"lat": 46.60753,
		"lng": -96.778818
	},
	{
		"lat": 46.607565,
		"lng": -96.778803
	},
	{
		"lat": 46.607631,
		"lng": -96.778764
	},
	{
		"lat": 46.607694,
		"lng": -96.778716
	},
	{
		"lat": 46.60778,
		"lng": -96.778625
	},
	{
		"lat": 46.607883,
		"lng": -96.778482
	},
	{
		"lat": 46.607961,
		"lng": -96.778311
	},
	{
		"lat": 46.608016,
		"lng": -96.778121
	},
	{
		"lat": 46.608077,
		"lng": -96.777878
	},
	{
		"lat": 46.608086,
		"lng": -96.777828
	},
	{
		"lat": 46.608089,
		"lng": -96.777776
	},
	{
		"lat": 46.608107,
		"lng": -96.777624
	},
	{
		"lat": 46.608123,
		"lng": -96.777525
	},
	{
		"lat": 46.608136,
		"lng": -96.777373
	},
	{
		"lat": 46.608188,
		"lng": -96.776605
	},
	{
		"lat": 46.608206,
		"lng": -96.776381
	},
	{
		"lat": 46.608213,
		"lng": -96.776298
	},
	{
		"lat": 46.608225,
		"lng": -96.776197
	},
	{
		"lat": 46.608237,
		"lng": -96.775992
	},
	{
		"lat": 46.608258,
		"lng": -96.775788
	},
	{
		"lat": 46.608292,
		"lng": -96.775588
	},
	{
		"lat": 46.608327,
		"lng": -96.775441
	},
	{
		"lat": 46.608379,
		"lng": -96.775194
	},
	{
		"lat": 46.608395,
		"lng": -96.775093
	},
	{
		"lat": 46.608467,
		"lng": -96.774747
	},
	{
		"lat": 46.608474,
		"lng": -96.774696
	},
	{
		"lat": 46.608521,
		"lng": -96.774501
	},
	{
		"lat": 46.608537,
		"lng": -96.774455
	},
	{
		"lat": 46.60857,
		"lng": -96.774307
	},
	{
		"lat": 46.608605,
		"lng": -96.774216
	},
	{
		"lat": 46.608656,
		"lng": -96.773968
	},
	{
		"lat": 46.608702,
		"lng": -96.773771
	},
	{
		"lat": 46.608772,
		"lng": -96.773532
	},
	{
		"lat": 46.608817,
		"lng": -96.773392
	},
	{
		"lat": 46.608882,
		"lng": -96.773209
	},
	{
		"lat": 46.608903,
		"lng": -96.773167
	},
	{
		"lat": 46.608953,
		"lng": -96.77303
	},
	{
		"lat": 46.609006,
		"lng": -96.772896
	},
	{
		"lat": 46.609055,
		"lng": -96.77282
	},
	{
		"lat": 46.609209,
		"lng": -96.772605
	},
	{
		"lat": 46.609293,
		"lng": -96.772511
	},
	{
		"lat": 46.60936,
		"lng": -96.772474
	},
	{
		"lat": 46.609428,
		"lng": -96.772444
	},
	{
		"lat": 46.609499,
		"lng": -96.772427
	},
	{
		"lat": 46.609571,
		"lng": -96.772427
	},
	{
		"lat": 46.609606,
		"lng": -96.77242
	},
	{
		"lat": 46.60975,
		"lng": -96.772425
	},
	{
		"lat": 46.609785,
		"lng": -96.772435
	},
	{
		"lat": 46.609875,
		"lng": -96.772521
	},
	{
		"lat": 46.60995,
		"lng": -96.772631
	},
	{
		"lat": 46.610022,
		"lng": -96.772746
	},
	{
		"lat": 46.61013,
		"lng": -96.772954
	},
	{
		"lat": 46.610207,
		"lng": -96.773129
	},
	{
		"lat": 46.610236,
		"lng": -96.773224
	},
	{
		"lat": 46.610259,
		"lng": -96.773323
	},
	{
		"lat": 46.610294,
		"lng": -96.773413
	},
	{
		"lat": 46.61048,
		"lng": -96.773796
	},
	{
		"lat": 46.610598,
		"lng": -96.773991
	},
	{
		"lat": 46.610781,
		"lng": -96.774239
	},
	{
		"lat": 46.610805,
		"lng": -96.774278
	},
	{
		"lat": 46.610862,
		"lng": -96.774341
	},
	{
		"lat": 46.611018,
		"lng": -96.77447
	},
	{
		"lat": 46.61112,
		"lng": -96.774518
	},
	{
		"lat": 46.611366,
		"lng": -96.774595
	},
	{
		"lat": 46.611651,
		"lng": -96.774661
	},
	{
		"lat": 46.611762,
		"lng": -96.774672
	},
	{
		"lat": 46.611956,
		"lng": -96.77463
	},
	{
		"lat": 46.612028,
		"lng": -96.774623
	},
	{
		"lat": 46.612063,
		"lng": -96.774612
	},
	{
		"lat": 46.6121,
		"lng": -96.774584
	},
	{
		"lat": 46.612169,
		"lng": -96.774555
	},
	{
		"lat": 46.612205,
		"lng": -96.774548
	},
	{
		"lat": 46.612308,
		"lng": -96.774506
	},
	{
		"lat": 46.612344,
		"lng": -96.7745
	},
	{
		"lat": 46.612551,
		"lng": -96.774424
	},
	{
		"lat": 46.612691,
		"lng": -96.774379
	},
	{
		"lat": 46.612758,
		"lng": -96.774344
	},
	{
		"lat": 46.612829,
		"lng": -96.774325
	},
	{
		"lat": 46.612932,
		"lng": -96.774282
	},
	{
		"lat": 46.612966,
		"lng": -96.774263
	},
	{
		"lat": 46.613105,
		"lng": -96.774214
	},
	{
		"lat": 46.613208,
		"lng": -96.774168
	},
	{
		"lat": 46.613385,
		"lng": -96.77412
	},
	{
		"lat": 46.613489,
		"lng": -96.774083
	},
	{
		"lat": 46.613557,
		"lng": -96.774049
	},
	{
		"lat": 46.613661,
		"lng": -96.774008
	},
	{
		"lat": 46.613729,
		"lng": -96.773973
	},
	{
		"lat": 46.613761,
		"lng": -96.77395
	},
	{
		"lat": 46.613789,
		"lng": -96.773916
	},
	{
		"lat": 46.613937,
		"lng": -96.77377
	},
	{
		"lat": 46.614022,
		"lng": -96.773675
	},
	{
		"lat": 46.614149,
		"lng": -96.773493
	},
	{
		"lat": 46.614206,
		"lng": -96.773362
	},
	{
		"lat": 46.614237,
		"lng": -96.773269
	},
	{
		"lat": 46.614248,
		"lng": -96.77322
	},
	{
		"lat": 46.614262,
		"lng": -96.773118
	},
	{
		"lat": 46.614265,
		"lng": -96.772652
	},
	{
		"lat": 46.614252,
		"lng": -96.772392
	},
	{
		"lat": 46.614219,
		"lng": -96.77198
	},
	{
		"lat": 46.614217,
		"lng": -96.771566
	},
	{
		"lat": 46.614229,
		"lng": -96.771411
	},
	{
		"lat": 46.614243,
		"lng": -96.771309
	},
	{
		"lat": 46.614254,
		"lng": -96.77126
	},
	{
		"lat": 46.614305,
		"lng": -96.771123
	},
	{
		"lat": 46.614325,
		"lng": -96.77108
	},
	{
		"lat": 46.614375,
		"lng": -96.771007
	},
	{
		"lat": 46.614481,
		"lng": -96.770868
	},
	{
		"lat": 46.614542,
		"lng": -96.770814
	},
	{
		"lat": 46.614674,
		"lng": -96.770735
	},
	{
		"lat": 46.614709,
		"lng": -96.770727
	},
	{
		"lat": 46.614781,
		"lng": -96.770721
	},
	{
		"lat": 46.614996,
		"lng": -96.770731
	},
	{
		"lat": 46.615103,
		"lng": -96.770754
	},
	{
		"lat": 46.615171,
		"lng": -96.770785
	},
	{
		"lat": 46.61527,
		"lng": -96.770843
	},
	{
		"lat": 46.615399,
		"lng": -96.770935
	},
	{
		"lat": 46.61558,
		"lng": -96.771104
	},
	{
		"lat": 46.615668,
		"lng": -96.771192
	},
	{
		"lat": 46.615691,
		"lng": -96.771233
	},
	{
		"lat": 46.615942,
		"lng": -96.771601
	},
	{
		"lat": 46.616041,
		"lng": -96.771751
	},
	{
		"lat": 46.616063,
		"lng": -96.771792
	},
	{
		"lat": 46.616079,
		"lng": -96.771838
	},
	{
		"lat": 46.616102,
		"lng": -96.771878
	},
	{
		"lat": 46.616142,
		"lng": -96.771964
	},
	{
		"lat": 46.616224,
		"lng": -96.772193
	},
	{
		"lat": 46.61626,
		"lng": -96.772283
	},
	{
		"lat": 46.6163,
		"lng": -96.772426
	},
	{
		"lat": 46.616322,
		"lng": -96.772525
	},
	{
		"lat": 46.616387,
		"lng": -96.772709
	},
	{
		"lat": 46.616414,
		"lng": -96.772805
	},
	{
		"lat": 46.616421,
		"lng": -96.772908
	},
	{
		"lat": 46.616424,
		"lng": -96.773167
	},
	{
		"lat": 46.61641,
		"lng": -96.773372
	},
	{
		"lat": 46.616393,
		"lng": -96.773525
	},
	{
		"lat": 46.616348,
		"lng": -96.773722
	},
	{
		"lat": 46.616332,
		"lng": -96.773768
	},
	{
		"lat": 46.616238,
		"lng": -96.773986
	},
	{
		"lat": 46.616196,
		"lng": -96.774069
	},
	{
		"lat": 46.616025,
		"lng": -96.774335
	},
	{
		"lat": 46.615842,
		"lng": -96.77458
	},
	{
		"lat": 46.615758,
		"lng": -96.774676
	},
	{
		"lat": 46.615639,
		"lng": -96.774791
	},
	{
		"lat": 46.615572,
		"lng": -96.77483
	},
	{
		"lat": 46.615541,
		"lng": -96.774855
	},
	{
		"lat": 46.615367,
		"lng": -96.775038
	},
	{
		"lat": 46.615313,
		"lng": -96.775104
	},
	{
		"lat": 46.615169,
		"lng": -96.775259
	},
	{
		"lat": 46.614962,
		"lng": -96.775464
	},
	{
		"lat": 46.614794,
		"lng": -96.775659
	},
	{
		"lat": 46.614629,
		"lng": -96.775861
	},
	{
		"lat": 46.614571,
		"lng": -96.775922
	},
	{
		"lat": 46.614486,
		"lng": -96.776021
	},
	{
		"lat": 46.614432,
		"lng": -96.776086
	},
	{
		"lat": 46.614345,
		"lng": -96.776177
	},
	{
		"lat": 46.614216,
		"lng": -96.776359
	},
	{
		"lat": 46.614147,
		"lng": -96.776477
	},
	{
		"lat": 46.614084,
		"lng": -96.776603
	},
	{
		"lat": 46.614048,
		"lng": -96.776692
	},
	{
		"lat": 46.614037,
		"lng": -96.776741
	},
	{
		"lat": 46.613986,
		"lng": -96.776879
	},
	{
		"lat": 46.613977,
		"lng": -96.776929
	},
	{
		"lat": 46.613944,
		"lng": -96.777021
	},
	{
		"lat": 46.613894,
		"lng": -96.777271
	},
	{
		"lat": 46.613864,
		"lng": -96.777474
	},
	{
		"lat": 46.613828,
		"lng": -96.77778
	},
	{
		"lat": 46.613822,
		"lng": -96.777883
	},
	{
		"lat": 46.613829,
		"lng": -96.778038
	},
	{
		"lat": 46.61385,
		"lng": -96.778346
	},
	{
		"lat": 46.613901,
		"lng": -96.778595
	},
	{
		"lat": 46.613953,
		"lng": -96.778787
	},
	{
		"lat": 46.613976,
		"lng": -96.778886
	},
	{
		"lat": 46.614024,
		"lng": -96.779024
	},
	{
		"lat": 46.614051,
		"lng": -96.77912
	},
	{
		"lat": 46.614071,
		"lng": -96.779164
	},
	{
		"lat": 46.614104,
		"lng": -96.779255
	},
	{
		"lat": 46.614179,
		"lng": -96.779432
	},
	{
		"lat": 46.614265,
		"lng": -96.779659
	},
	{
		"lat": 46.614473,
		"lng": -96.780081
	},
	{
		"lat": 46.614488,
		"lng": -96.780129
	},
	{
		"lat": 46.614578,
		"lng": -96.780289
	},
	{
		"lat": 46.614732,
		"lng": -96.780508
	},
	{
		"lat": 46.615141,
		"lng": -96.781014
	},
	{
		"lat": 46.615198,
		"lng": -96.781078
	},
	{
		"lat": 46.615382,
		"lng": -96.781238
	},
	{
		"lat": 46.615448,
		"lng": -96.781278
	},
	{
		"lat": 46.615518,
		"lng": -96.781305
	},
	{
		"lat": 46.615869,
		"lng": -96.781391
	},
	{
		"lat": 46.616008,
		"lng": -96.781443
	},
	{
		"lat": 46.616079,
		"lng": -96.781455
	},
	{
		"lat": 46.616285,
		"lng": -96.78152
	},
	{
		"lat": 46.61644,
		"lng": -96.781537
	},
	{
		"lat": 46.616478,
		"lng": -96.781542
	},
	{
		"lat": 46.616549,
		"lng": -96.781533
	},
	{
		"lat": 46.616721,
		"lng": -96.781482
	},
	{
		"lat": 46.616787,
		"lng": -96.781442
	},
	{
		"lat": 46.616816,
		"lng": -96.781409
	},
	{
		"lat": 46.616851,
		"lng": -96.781397
	},
	{
		"lat": 46.616865,
		"lng": -96.781381
	},
	{
		"lat": 46.616908,
		"lng": -96.781336
	},
	{
		"lat": 46.616971,
		"lng": -96.78129
	},
	{
		"lat": 46.616982,
		"lng": -96.781278
	},
	{
		"lat": 46.617027,
		"lng": -96.78123
	},
	{
		"lat": 46.617129,
		"lng": -96.781089
	},
	{
		"lat": 46.617195,
		"lng": -96.780966
	},
	{
		"lat": 46.617247,
		"lng": -96.780831
	},
	{
		"lat": 46.617283,
		"lng": -96.780685
	},
	{
		"lat": 46.617301,
		"lng": -96.780585
	},
	{
		"lat": 46.617321,
		"lng": -96.780433
	},
	{
		"lat": 46.617335,
		"lng": -96.780281
	},
	{
		"lat": 46.617343,
		"lng": -96.780127
	},
	{
		"lat": 46.617339,
		"lng": -96.780076
	},
	{
		"lat": 46.61734,
		"lng": -96.779871
	},
	{
		"lat": 46.617332,
		"lng": -96.779615
	},
	{
		"lat": 46.617334,
		"lng": -96.779513
	},
	{
		"lat": 46.61733,
		"lng": -96.779359
	},
	{
		"lat": 46.617299,
		"lng": -96.778999
	},
	{
		"lat": 46.617266,
		"lng": -96.7788
	},
	{
		"lat": 46.617204,
		"lng": -96.778508
	},
	{
		"lat": 46.617166,
		"lng": -96.778313
	},
	{
		"lat": 46.617106,
		"lng": -96.778075
	},
	{
		"lat": 46.617056,
		"lng": -96.777839
	},
	{
		"lat": 46.617043,
		"lng": -96.777742
	},
	{
		"lat": 46.617027,
		"lng": -96.777698
	},
	{
		"lat": 46.616988,
		"lng": -96.777454
	},
	{
		"lat": 46.616926,
		"lng": -96.777162
	},
	{
		"lat": 46.61687,
		"lng": -96.776759
	},
	{
		"lat": 46.61686,
		"lng": -96.776604
	},
	{
		"lat": 46.616852,
		"lng": -96.776243
	},
	{
		"lat": 46.616869,
		"lng": -96.776142
	},
	{
		"lat": 46.616891,
		"lng": -96.776044
	},
	{
		"lat": 46.616996,
		"lng": -96.775772
	},
	{
		"lat": 46.617104,
		"lng": -96.775564
	},
	{
		"lat": 46.617222,
		"lng": -96.775368
	},
	{
		"lat": 46.61738,
		"lng": -96.775156
	},
	{
		"lat": 46.617523,
		"lng": -96.774998
	},
	{
		"lat": 46.617554,
		"lng": -96.774971
	},
	{
		"lat": 46.617651,
		"lng": -96.774903
	},
	{
		"lat": 46.617787,
		"lng": -96.774835
	},
	{
		"lat": 46.617894,
		"lng": -96.77481
	},
	{
		"lat": 46.617966,
		"lng": -96.774801
	},
	{
		"lat": 46.618074,
		"lng": -96.774796
	},
	{
		"lat": 46.618577,
		"lng": -96.774825
	},
	{
		"lat": 46.618649,
		"lng": -96.774841
	},
	{
		"lat": 46.618701,
		"lng": -96.774869
	},
	{
		"lat": 46.618804,
		"lng": -96.774913
	},
	{
		"lat": 46.618982,
		"lng": -96.774954
	},
	{
		"lat": 46.619263,
		"lng": -96.774991
	},
	{
		"lat": 46.619555,
		"lng": -96.77503
	},
	{
		"lat": 46.619663,
		"lng": -96.775038
	},
	{
		"lat": 46.619734,
		"lng": -96.775036
	},
	{
		"lat": 46.620129,
		"lng": -96.775049
	},
	{
		"lat": 46.620416,
		"lng": -96.775085
	},
	{
		"lat": 46.620595,
		"lng": -96.775095
	},
	{
		"lat": 46.620739,
		"lng": -96.775115
	},
	{
		"lat": 46.620845,
		"lng": -96.775142
	},
	{
		"lat": 46.620982,
		"lng": -96.775204
	},
	{
		"lat": 46.621076,
		"lng": -96.775281
	},
	{
		"lat": 46.621127,
		"lng": -96.775354
	},
	{
		"lat": 46.621148,
		"lng": -96.775396
	},
	{
		"lat": 46.621201,
		"lng": -96.775532
	},
	{
		"lat": 46.621221,
		"lng": -96.775632
	},
	{
		"lat": 46.621236,
		"lng": -96.775733
	},
	{
		"lat": 46.621241,
		"lng": -96.775993
	},
	{
		"lat": 46.621233,
		"lng": -96.776096
	},
	{
		"lat": 46.621191,
		"lng": -96.776239
	},
	{
		"lat": 46.621029,
		"lng": -96.776583
	},
	{
		"lat": 46.620938,
		"lng": -96.776744
	},
	{
		"lat": 46.620585,
		"lng": -96.777265
	},
	{
		"lat": 46.620431,
		"lng": -96.777483
	},
	{
		"lat": 46.620324,
		"lng": -96.777621
	},
	{
		"lat": 46.620223,
		"lng": -96.77777
	},
	{
		"lat": 46.620042,
		"lng": -96.778022
	},
	{
		"lat": 46.619928,
		"lng": -96.778223
	},
	{
		"lat": 46.619782,
		"lng": -96.778519
	},
	{
		"lat": 46.619766,
		"lng": -96.778566
	},
	{
		"lat": 46.619736,
		"lng": -96.778616
	},
	{
		"lat": 46.619625,
		"lng": -96.778882
	},
	{
		"lat": 46.619542,
		"lng": -96.779112
	},
	{
		"lat": 46.619505,
		"lng": -96.779258
	},
	{
		"lat": 46.619491,
		"lng": -96.77936
	},
	{
		"lat": 46.61948,
		"lng": -96.779515
	},
	{
		"lat": 46.619478,
		"lng": -96.779723
	},
	{
		"lat": 46.619485,
		"lng": -96.779878
	},
	{
		"lat": 46.619523,
		"lng": -96.780185
	},
	{
		"lat": 46.61955,
		"lng": -96.780335
	},
	{
		"lat": 46.619586,
		"lng": -96.780482
	},
	{
		"lat": 46.619615,
		"lng": -96.780577
	},
	{
		"lat": 46.619637,
		"lng": -96.780676
	},
	{
		"lat": 46.61969,
		"lng": -96.780812
	},
	{
		"lat": 46.619761,
		"lng": -96.780929
	},
	{
		"lat": 46.619914,
		"lng": -96.78115
	},
	{
		"lat": 46.620048,
		"lng": -96.781322
	},
	{
		"lat": 46.620261,
		"lng": -96.781518
	},
	{
		"lat": 46.620354,
		"lng": -96.781598
	},
	{
		"lat": 46.620452,
		"lng": -96.781663
	},
	{
		"lat": 46.620521,
		"lng": -96.78169
	},
	{
		"lat": 46.620554,
		"lng": -96.781712
	},
	{
		"lat": 46.620656,
		"lng": -96.781758
	},
	{
		"lat": 46.620755,
		"lng": -96.781819
	},
	{
		"lat": 46.620922,
		"lng": -96.781912
	},
	{
		"lat": 46.620987,
		"lng": -96.781958
	},
	{
		"lat": 46.621186,
		"lng": -96.782073
	},
	{
		"lat": 46.621256,
		"lng": -96.782098
	},
	{
		"lat": 46.621393,
		"lng": -96.782164
	},
	{
		"lat": 46.621517,
		"lng": -96.782265
	},
	{
		"lat": 46.621551,
		"lng": -96.782283
	},
	{
		"lat": 46.621635,
		"lng": -96.782379
	},
	{
		"lat": 46.621795,
		"lng": -96.782585
	},
	{
		"lat": 46.621893,
		"lng": -96.782737
	},
	{
		"lat": 46.621957,
		"lng": -96.782862
	},
	{
		"lat": 46.621995,
		"lng": -96.78295
	},
	{
		"lat": 46.622077,
		"lng": -96.78312
	},
	{
		"lat": 46.622094,
		"lng": -96.783166
	},
	{
		"lat": 46.622122,
		"lng": -96.783262
	},
	{
		"lat": 46.622142,
		"lng": -96.783305
	},
	{
		"lat": 46.622153,
		"lng": -96.783354
	},
	{
		"lat": 46.622157,
		"lng": -96.783406
	},
	{
		"lat": 46.622158,
		"lng": -96.78351
	},
	{
		"lat": 46.622153,
		"lng": -96.783561
	},
	{
		"lat": 46.622136,
		"lng": -96.783662
	},
	{
		"lat": 46.622089,
		"lng": -96.783802
	},
	{
		"lat": 46.622053,
		"lng": -96.783891
	},
	{
		"lat": 46.622032,
		"lng": -96.783933
	},
	{
		"lat": 46.621996,
		"lng": -96.784022
	},
	{
		"lat": 46.621973,
		"lng": -96.784062
	},
	{
		"lat": 46.621873,
		"lng": -96.78421
	},
	{
		"lat": 46.621743,
		"lng": -96.784387
	},
	{
		"lat": 46.621578,
		"lng": -96.784583
	},
	{
		"lat": 46.621516,
		"lng": -96.784636
	},
	{
		"lat": 46.621347,
		"lng": -96.784717
	},
	{
		"lat": 46.621244,
		"lng": -96.784757
	},
	{
		"lat": 46.620996,
		"lng": -96.784822
	},
	{
		"lat": 46.620782,
		"lng": -96.784831
	},
	{
		"lat": 46.620711,
		"lng": -96.784829
	},
	{
		"lat": 46.620461,
		"lng": -96.784838
	},
	{
		"lat": 46.620107,
		"lng": -96.784819
	},
	{
		"lat": 46.620072,
		"lng": -96.784821
	},
	{
		"lat": 46.620001,
		"lng": -96.784813
	},
	{
		"lat": 46.619967,
		"lng": -96.784823
	},
	{
		"lat": 46.619896,
		"lng": -96.78482
	},
	{
		"lat": 46.619827,
		"lng": -96.784828
	},
	{
		"lat": 46.619686,
		"lng": -96.784834
	},
	{
		"lat": 46.619581,
		"lng": -96.784856
	},
	{
		"lat": 46.619406,
		"lng": -96.784904
	},
	{
		"lat": 46.619302,
		"lng": -96.784945
	},
	{
		"lat": 46.619169,
		"lng": -96.785016
	},
	{
		"lat": 46.619137,
		"lng": -96.78504
	},
	{
		"lat": 46.619031,
		"lng": -96.785177
	},
	{
		"lat": 46.618958,
		"lng": -96.785291
	},
	{
		"lat": 46.618919,
		"lng": -96.785376
	},
	{
		"lat": 46.618885,
		"lng": -96.785523
	},
	{
		"lat": 46.618882,
		"lng": -96.785574
	},
	{
		"lat": 46.618864,
		"lng": -96.785674
	},
	{
		"lat": 46.618859,
		"lng": -96.785726
	},
	{
		"lat": 46.618846,
		"lng": -96.786037
	},
	{
		"lat": 46.618858,
		"lng": -96.786215
	},
	{
		"lat": 46.618858,
		"lng": -96.786267
	},
	{
		"lat": 46.618867,
		"lng": -96.786369
	},
	{
		"lat": 46.618885,
		"lng": -96.78647
	},
	{
		"lat": 46.618898,
		"lng": -96.786518
	},
	{
		"lat": 46.618953,
		"lng": -96.786652
	},
	{
		"lat": 46.619001,
		"lng": -96.78673
	},
	{
		"lat": 46.619205,
		"lng": -96.787022
	},
	{
		"lat": 46.619259,
		"lng": -96.78709
	},
	{
		"lat": 46.619317,
		"lng": -96.78715
	},
	{
		"lat": 46.61935,
		"lng": -96.787172
	},
	{
		"lat": 46.619439,
		"lng": -96.787259
	},
	{
		"lat": 46.619472,
		"lng": -96.787281
	},
	{
		"lat": 46.61954,
		"lng": -96.787314
	},
	{
		"lat": 46.619671,
		"lng": -96.787395
	},
	{
		"lat": 46.619773,
		"lng": -96.787446
	},
	{
		"lat": 46.620053,
		"lng": -96.787537
	},
	{
		"lat": 46.620125,
		"lng": -96.787541
	},
	{
		"lat": 46.620414,
		"lng": -96.787527
	},
	{
		"lat": 46.620627,
		"lng": -96.787494
	},
	{
		"lat": 46.620944,
		"lng": -96.787406
	},
	{
		"lat": 46.62108,
		"lng": -96.787338
	},
	{
		"lat": 46.621112,
		"lng": -96.787314
	},
	{
		"lat": 46.62128,
		"lng": -96.787224
	},
	{
		"lat": 46.621444,
		"lng": -96.787124
	},
	{
		"lat": 46.621696,
		"lng": -96.786929
	},
	{
		"lat": 46.621827,
		"lng": -96.786848
	},
	{
		"lat": 46.622042,
		"lng": -96.786666
	},
	{
		"lat": 46.62213,
		"lng": -96.786596
	},
	{
		"lat": 46.622226,
		"lng": -96.786521
	},
	{
		"lat": 46.622421,
		"lng": -96.786298
	},
	{
		"lat": 46.622804,
		"lng": -96.785687
	},
	{
		"lat": 46.622831,
		"lng": -96.785651
	},
	{
		"lat": 46.622995,
		"lng": -96.785378
	},
	{
		"lat": 46.623036,
		"lng": -96.785294
	},
	{
		"lat": 46.623215,
		"lng": -96.784852
	},
	{
		"lat": 46.623245,
		"lng": -96.784758
	},
	{
		"lat": 46.623289,
		"lng": -96.784561
	},
	{
		"lat": 46.62336,
		"lng": -96.784271
	},
	{
		"lat": 46.623377,
		"lng": -96.784225
	},
	{
		"lat": 46.623404,
		"lng": -96.784076
	},
	{
		"lat": 46.623431,
		"lng": -96.783873
	},
	{
		"lat": 46.623455,
		"lng": -96.783777
	},
	{
		"lat": 46.62349,
		"lng": -96.783578
	},
	{
		"lat": 46.623518,
		"lng": -96.783484
	},
	{
		"lat": 46.623571,
		"lng": -96.783351
	},
	{
		"lat": 46.623628,
		"lng": -96.783221
	},
	{
		"lat": 46.62365,
		"lng": -96.783181
	},
	{
		"lat": 46.623684,
		"lng": -96.78309
	},
	{
		"lat": 46.623747,
		"lng": -96.782966
	},
	{
		"lat": 46.623816,
		"lng": -96.782799
	},
	{
		"lat": 46.623948,
		"lng": -96.782481
	},
	{
		"lat": 46.623989,
		"lng": -96.782397
	},
	{
		"lat": 46.624062,
		"lng": -96.782221
	},
	{
		"lat": 46.624086,
		"lng": -96.782182
	},
	{
		"lat": 46.624106,
		"lng": -96.782139
	},
	{
		"lat": 46.624158,
		"lng": -96.782003
	},
	{
		"lat": 46.624231,
		"lng": -96.781767
	},
	{
		"lat": 46.624255,
		"lng": -96.781669
	},
	{
		"lat": 46.624345,
		"lng": -96.781388
	},
	{
		"lat": 46.624363,
		"lng": -96.781344
	},
	{
		"lat": 46.624377,
		"lng": -96.781296
	},
	{
		"lat": 46.624398,
		"lng": -96.781198
	},
	{
		"lat": 46.624424,
		"lng": -96.781102
	},
	{
		"lat": 46.624448,
		"lng": -96.780951
	},
	{
		"lat": 46.624451,
		"lng": -96.7809
	},
	{
		"lat": 46.624483,
		"lng": -96.780647
	},
	{
		"lat": 46.624492,
		"lng": -96.780493
	},
	{
		"lat": 46.624498,
		"lng": -96.780235
	},
	{
		"lat": 46.624488,
		"lng": -96.779976
	},
	{
		"lat": 46.624447,
		"lng": -96.779463
	},
	{
		"lat": 46.624434,
		"lng": -96.779256
	},
	{
		"lat": 46.624431,
		"lng": -96.779048
	},
	{
		"lat": 46.624437,
		"lng": -96.778738
	},
	{
		"lat": 46.624442,
		"lng": -96.778687
	},
	{
		"lat": 46.624445,
		"lng": -96.778583
	},
	{
		"lat": 46.624453,
		"lng": -96.778481
	},
	{
		"lat": 46.624474,
		"lng": -96.778329
	},
	{
		"lat": 46.624504,
		"lng": -96.778179
	},
	{
		"lat": 46.624539,
		"lng": -96.778088
	},
	{
		"lat": 46.624616,
		"lng": -96.77798
	},
	{
		"lat": 46.624679,
		"lng": -96.777931
	},
	{
		"lat": 46.624782,
		"lng": -96.77788
	},
	{
		"lat": 46.624817,
		"lng": -96.77788
	},
	{
		"lat": 46.624958,
		"lng": -96.777921
	},
	{
		"lat": 46.624994,
		"lng": -96.777918
	},
	{
		"lat": 46.625134,
		"lng": -96.777963
	},
	{
		"lat": 46.625198,
		"lng": -96.778009
	},
	{
		"lat": 46.625228,
		"lng": -96.778037
	},
	{
		"lat": 46.625282,
		"lng": -96.778105
	},
	{
		"lat": 46.625428,
		"lng": -96.778332
	},
	{
		"lat": 46.625582,
		"lng": -96.778683
	},
	{
		"lat": 46.625645,
		"lng": -96.778927
	},
	{
		"lat": 46.625662,
		"lng": -96.779027
	},
	{
		"lat": 46.625685,
		"lng": -96.779126
	},
	{
		"lat": 46.625699,
		"lng": -96.77928
	},
	{
		"lat": 46.625774,
		"lng": -96.780312
	},
	{
		"lat": 46.62578,
		"lng": -96.780519
	},
	{
		"lat": 46.625777,
		"lng": -96.780693
	},
	{
		"lat": 46.625775,
		"lng": -96.780829
	},
	{
		"lat": 46.625753,
		"lng": -96.781033
	},
	{
		"lat": 46.62573,
		"lng": -96.781289
	},
	{
		"lat": 46.625675,
		"lng": -96.781643
	},
	{
		"lat": 46.625651,
		"lng": -96.781848
	},
	{
		"lat": 46.625611,
		"lng": -96.7821
	},
	{
		"lat": 46.625602,
		"lng": -96.782135
	},
	{
		"lat": 46.625522,
		"lng": -96.782492
	},
	{
		"lat": 46.625479,
		"lng": -96.782634
	},
	{
		"lat": 46.625472,
		"lng": -96.782685
	},
	{
		"lat": 46.625457,
		"lng": -96.782732
	},
	{
		"lat": 46.625437,
		"lng": -96.782775
	},
	{
		"lat": 46.625404,
		"lng": -96.782867
	},
	{
		"lat": 46.625364,
		"lng": -96.783009
	},
	{
		"lat": 46.625333,
		"lng": -96.783102
	},
	{
		"lat": 46.625293,
		"lng": -96.783245
	},
	{
		"lat": 46.625273,
		"lng": -96.783288
	},
	{
		"lat": 46.625243,
		"lng": -96.783381
	},
	{
		"lat": 46.625148,
		"lng": -96.783713
	},
	{
		"lat": 46.625142,
		"lng": -96.783764
	},
	{
		"lat": 46.625025,
		"lng": -96.784139
	},
	{
		"lat": 46.624929,
		"lng": -96.784517
	},
	{
		"lat": 46.624889,
		"lng": -96.784604
	},
	{
		"lat": 46.624792,
		"lng": -96.784755
	},
	{
		"lat": 46.624726,
		"lng": -96.784876
	},
	{
		"lat": 46.624669,
		"lng": -96.785006
	},
	{
		"lat": 46.624448,
		"lng": -96.785539
	},
	{
		"lat": 46.624348,
		"lng": -96.785752
	},
	{
		"lat": 46.624257,
		"lng": -96.785976
	},
	{
		"lat": 46.624178,
		"lng": -96.786147
	},
	{
		"lat": 46.624164,
		"lng": -96.786195
	},
	{
		"lat": 46.624147,
		"lng": -96.786229
	},
	{
		"lat": 46.624064,
		"lng": -96.786409
	},
	{
		"lat": 46.624003,
		"lng": -96.786594
	},
	{
		"lat": 46.623983,
		"lng": -96.786694
	},
	{
		"lat": 46.623968,
		"lng": -96.78674
	},
	{
		"lat": 46.623948,
		"lng": -96.786893
	},
	{
		"lat": 46.623923,
		"lng": -96.787044
	},
	{
		"lat": 46.623893,
		"lng": -96.7873
	},
	{
		"lat": 46.623887,
		"lng": -96.787403
	},
	{
		"lat": 46.623886,
		"lng": -96.787646
	},
	{
		"lat": 46.623886,
		"lng": -96.787815
	},
	{
		"lat": 46.623951,
		"lng": -96.788431
	},
	{
		"lat": 46.623983,
		"lng": -96.788632
	},
	{
		"lat": 46.624068,
		"lng": -96.789026
	},
	{
		"lat": 46.624105,
		"lng": -96.789172
	},
	{
		"lat": 46.624141,
		"lng": -96.789262
	},
	{
		"lat": 46.624203,
		"lng": -96.789505
	},
	{
		"lat": 46.624246,
		"lng": -96.789702
	},
	{
		"lat": 46.624253,
		"lng": -96.789752
	},
	{
		"lat": 46.624279,
		"lng": -96.789848
	},
	{
		"lat": 46.6243,
		"lng": -96.789891
	},
	{
		"lat": 46.624357,
		"lng": -96.790136
	},
	{
		"lat": 46.624401,
		"lng": -96.790285
	},
	{
		"lat": 46.624414,
		"lng": -96.790326
	},
	{
		"lat": 46.624481,
		"lng": -96.79051
	},
	{
		"lat": 46.624525,
		"lng": -96.790652
	},
	{
		"lat": 46.624604,
		"lng": -96.790823
	},
	{
		"lat": 46.624647,
		"lng": -96.790905
	},
	{
		"lat": 46.624744,
		"lng": -96.791058
	},
	{
		"lat": 46.624907,
		"lng": -96.791261
	},
	{
		"lat": 46.624971,
		"lng": -96.791306
	},
	{
		"lat": 46.625042,
		"lng": -96.791325
	},
	{
		"lat": 46.625219,
		"lng": -96.791312
	},
	{
		"lat": 46.62529,
		"lng": -96.791291
	},
	{
		"lat": 46.625386,
		"lng": -96.791225
	},
	{
		"lat": 46.625415,
		"lng": -96.791193
	},
	{
		"lat": 46.625494,
		"lng": -96.791089
	},
	{
		"lat": 46.625515,
		"lng": -96.791048
	},
	{
		"lat": 46.625565,
		"lng": -96.790976
	},
	{
		"lat": 46.625646,
		"lng": -96.790806
	},
	{
		"lat": 46.625757,
		"lng": -96.790541
	},
	{
		"lat": 46.625825,
		"lng": -96.790302
	},
	{
		"lat": 46.625876,
		"lng": -96.790165
	},
	{
		"lat": 46.625888,
		"lng": -96.790116
	},
	{
		"lat": 46.625925,
		"lng": -96.789915
	},
	{
		"lat": 46.625982,
		"lng": -96.789509
	},
	{
		"lat": 46.626003,
		"lng": -96.789409
	},
	{
		"lat": 46.626122,
		"lng": -96.78892
	},
	{
		"lat": 46.626164,
		"lng": -96.788667
	},
	{
		"lat": 46.626192,
		"lng": -96.788464
	},
	{
		"lat": 46.62621,
		"lng": -96.788363
	},
	{
		"lat": 46.626265,
		"lng": -96.788117
	},
	{
		"lat": 46.626307,
		"lng": -96.787973
	},
	{
		"lat": 46.626347,
		"lng": -96.787774
	},
	{
		"lat": 46.626386,
		"lng": -96.787468
	},
	{
		"lat": 46.626488,
		"lng": -96.787162
	},
	{
		"lat": 46.626513,
		"lng": -96.787124
	},
	{
		"lat": 46.626578,
		"lng": -96.787
	},
	{
		"lat": 46.626596,
		"lng": -96.786955
	},
	{
		"lat": 46.626609,
		"lng": -96.786907
	},
	{
		"lat": 46.626667,
		"lng": -96.786777
	},
	{
		"lat": 46.626712,
		"lng": -96.786696
	},
	{
		"lat": 46.62675,
		"lng": -96.786608
	},
	{
		"lat": 46.626773,
		"lng": -96.786568
	},
	{
		"lat": 46.626781,
		"lng": -96.786518
	},
	{
		"lat": 46.626846,
		"lng": -96.786396
	},
	{
		"lat": 46.626893,
		"lng": -96.786322
	},
	{
		"lat": 46.626915,
		"lng": -96.78628
	},
	{
		"lat": 46.627127,
		"lng": -96.78601
	},
	{
		"lat": 46.62724,
		"lng": -96.785883
	},
	{
		"lat": 46.627422,
		"lng": -96.78572
	},
	{
		"lat": 46.627509,
		"lng": -96.78563
	},
	{
		"lat": 46.627572,
		"lng": -96.785584
	},
	{
		"lat": 46.62764,
		"lng": -96.785548
	},
	{
		"lat": 46.627738,
		"lng": -96.785484
	},
	{
		"lat": 46.627812,
		"lng": -96.785442
	},
	{
		"lat": 46.627939,
		"lng": -96.785374
	},
	{
		"lat": 46.628043,
		"lng": -96.785329
	},
	{
		"lat": 46.628434,
		"lng": -96.785256
	},
	{
		"lat": 46.628613,
		"lng": -96.785234
	},
	{
		"lat": 46.628865,
		"lng": -96.785229
	},
	{
		"lat": 46.62908,
		"lng": -96.785233
	},
	{
		"lat": 46.629187,
		"lng": -96.785242
	},
	{
		"lat": 46.629257,
		"lng": -96.785255
	},
	{
		"lat": 46.629471,
		"lng": -96.785257
	},
	{
		"lat": 46.629866,
		"lng": -96.785241
	},
	{
		"lat": 46.629937,
		"lng": -96.785224
	},
	{
		"lat": 46.630041,
		"lng": -96.785186
	},
	{
		"lat": 46.630138,
		"lng": -96.785117
	},
	{
		"lat": 46.630191,
		"lng": -96.785049
	},
	{
		"lat": 46.630251,
		"lng": -96.784991
	},
	{
		"lat": 46.630302,
		"lng": -96.78492
	},
	{
		"lat": 46.630327,
		"lng": -96.784876
	},
	{
		"lat": 46.630378,
		"lng": -96.784782
	},
	{
		"lat": 46.630391,
		"lng": -96.78476
	},
	{
		"lat": 46.630416,
		"lng": -96.784723
	},
	{
		"lat": 46.630435,
		"lng": -96.78468
	},
	{
		"lat": 46.630486,
		"lng": -96.784489
	},
	{
		"lat": 46.630486,
		"lng": -96.784485
	},
	{
		"lat": 46.630501,
		"lng": -96.784391
	},
	{
		"lat": 46.630504,
		"lng": -96.784381
	},
	{
		"lat": 46.630526,
		"lng": -96.784337
	},
	{
		"lat": 46.63055,
		"lng": -96.784202
	},
	{
		"lat": 46.63058,
		"lng": -96.783951
	},
	{
		"lat": 46.630631,
		"lng": -96.783074
	},
	{
		"lat": 46.630644,
		"lng": -96.78292
	},
	{
		"lat": 46.630658,
		"lng": -96.782819
	},
	{
		"lat": 46.630694,
		"lng": -96.782673
	},
	{
		"lat": 46.630774,
		"lng": -96.782442
	},
	{
		"lat": 46.630793,
		"lng": -96.782399
	},
	{
		"lat": 46.630893,
		"lng": -96.782253
	},
	{
		"lat": 46.630974,
		"lng": -96.782155
	},
	{
		"lat": 46.631073,
		"lng": -96.782097
	},
	{
		"lat": 46.631142,
		"lng": -96.782074
	},
	{
		"lat": 46.631178,
		"lng": -96.782068
	},
	{
		"lat": 46.631284,
		"lng": -96.78209
	},
	{
		"lat": 46.631383,
		"lng": -96.782149
	},
	{
		"lat": 46.631412,
		"lng": -96.782179
	},
	{
		"lat": 46.63152,
		"lng": -96.782313
	},
	{
		"lat": 46.631544,
		"lng": -96.782353
	},
	{
		"lat": 46.63158,
		"lng": -96.782441
	},
	{
		"lat": 46.631642,
		"lng": -96.782569
	},
	{
		"lat": 46.63168,
		"lng": -96.782694
	},
	{
		"lat": 46.63169,
		"lng": -96.782744
	},
	{
		"lat": 46.631715,
		"lng": -96.782948
	},
	{
		"lat": 46.631717,
		"lng": -96.783
	},
	{
		"lat": 46.631703,
		"lng": -96.783258
	},
	{
		"lat": 46.631691,
		"lng": -96.783359
	},
	{
		"lat": 46.631628,
		"lng": -96.783764
	},
	{
		"lat": 46.631605,
		"lng": -96.783862
	},
	{
		"lat": 46.631563,
		"lng": -96.784111
	},
	{
		"lat": 46.631563,
		"lng": -96.784114
	},
	{
		"lat": 46.631558,
		"lng": -96.784165
	},
	{
		"lat": 46.631548,
		"lng": -96.784215
	},
	{
		"lat": 46.631432,
		"lng": -96.784595
	},
	{
		"lat": 46.631366,
		"lng": -96.784778
	},
	{
		"lat": 46.631329,
		"lng": -96.784867
	},
	{
		"lat": 46.631266,
		"lng": -96.784993
	},
	{
		"lat": 46.631127,
		"lng": -96.78523
	},
	{
		"lat": 46.63103,
		"lng": -96.785382
	},
	{
		"lat": 46.630953,
		"lng": -96.785489
	},
	{
		"lat": 46.630899,
		"lng": -96.785556
	},
	{
		"lat": 46.630613,
		"lng": -96.785941
	},
	{
		"lat": 46.630537,
		"lng": -96.786049
	},
	{
		"lat": 46.630268,
		"lng": -96.786461
	},
	{
		"lat": 46.630239,
		"lng": -96.78649
	},
	{
		"lat": 46.630114,
		"lng": -96.786674
	},
	{
		"lat": 46.629943,
		"lng": -96.786939
	},
	{
		"lat": 46.629855,
		"lng": -96.787102
	},
	{
		"lat": 46.629801,
		"lng": -96.787237
	},
	{
		"lat": 46.629788,
		"lng": -96.787285
	},
	{
		"lat": 46.629718,
		"lng": -96.787467
	},
	{
		"lat": 46.629604,
		"lng": -96.787668
	},
	{
		"lat": 46.629588,
		"lng": -96.787714
	},
	{
		"lat": 46.629322,
		"lng": -96.788204
	},
	{
		"lat": 46.629292,
		"lng": -96.788299
	},
	{
		"lat": 46.629264,
		"lng": -96.788449
	},
	{
		"lat": 46.62925,
		"lng": -96.788551
	},
	{
		"lat": 46.629237,
		"lng": -96.7886
	},
	{
		"lat": 46.629224,
		"lng": -96.788702
	},
	{
		"lat": 46.629212,
		"lng": -96.788855
	},
	{
		"lat": 46.629215,
		"lng": -96.789062
	},
	{
		"lat": 46.629227,
		"lng": -96.789217
	},
	{
		"lat": 46.629247,
		"lng": -96.78958
	},
	{
		"lat": 46.629297,
		"lng": -96.789829
	},
	{
		"lat": 46.629349,
		"lng": -96.789965
	},
	{
		"lat": 46.629445,
		"lng": -96.790242
	},
	{
		"lat": 46.629499,
		"lng": -96.790376
	},
	{
		"lat": 46.629514,
		"lng": -96.790422
	},
	{
		"lat": 46.629527,
		"lng": -96.790524
	},
	{
		"lat": 46.629575,
		"lng": -96.790718
	},
	{
		"lat": 46.629636,
		"lng": -96.790894
	},
	{
		"lat": 46.629698,
		"lng": -96.791022
	},
	{
		"lat": 46.629723,
		"lng": -96.791059
	},
	{
		"lat": 46.629785,
		"lng": -96.791184
	},
	{
		"lat": 46.629898,
		"lng": -96.791383
	},
	{
		"lat": 46.629999,
		"lng": -96.791598
	},
	{
		"lat": 46.630084,
		"lng": -96.791764
	},
	{
		"lat": 46.630155,
		"lng": -96.791944
	},
	{
		"lat": 46.63019,
		"lng": -96.792092
	},
	{
		"lat": 46.630208,
		"lng": -96.792137
	},
	{
		"lat": 46.630254,
		"lng": -96.792334
	},
	{
		"lat": 46.630297,
		"lng": -96.792476
	},
	{
		"lat": 46.630331,
		"lng": -96.792568
	},
	{
		"lat": 46.630366,
		"lng": -96.792715
	},
	{
		"lat": 46.630429,
		"lng": -96.792903
	},
	{
		"lat": 46.630496,
		"lng": -96.793142
	},
	{
		"lat": 46.630517,
		"lng": -96.793184
	},
	{
		"lat": 46.630576,
		"lng": -96.793372
	},
	{
		"lat": 46.63064,
		"lng": -96.793559
	},
	{
		"lat": 46.630771,
		"lng": -96.793869
	},
	{
		"lat": 46.630795,
		"lng": -96.793907
	},
	{
		"lat": 46.630927,
		"lng": -96.794154
	},
	{
		"lat": 46.630973,
		"lng": -96.794233
	},
	{
		"lat": 46.631081,
		"lng": -96.794369
	},
	{
		"lat": 46.63125,
		"lng": -96.794563
	},
	{
		"lat": 46.631386,
		"lng": -96.794733
	},
	{
		"lat": 46.631506,
		"lng": -96.794926
	},
	{
		"lat": 46.631526,
		"lng": -96.79497
	},
	{
		"lat": 46.631557,
		"lng": -96.795064
	},
	{
		"lat": 46.631569,
		"lng": -96.795166
	},
	{
		"lat": 46.631571,
		"lng": -96.795269
	},
	{
		"lat": 46.631562,
		"lng": -96.795425
	},
	{
		"lat": 46.631512,
		"lng": -96.795619
	},
	{
		"lat": 46.631435,
		"lng": -96.795794
	},
	{
		"lat": 46.631334,
		"lng": -96.795944
	},
	{
		"lat": 46.631307,
		"lng": -96.795978
	},
	{
		"lat": 46.631244,
		"lng": -96.796027
	},
	{
		"lat": 46.631209,
		"lng": -96.796041
	},
	{
		"lat": 46.631102,
		"lng": -96.79606
	},
	{
		"lat": 46.630995,
		"lng": -96.796058
	},
	{
		"lat": 46.630674,
		"lng": -96.795995
	},
	{
		"lat": 46.630531,
		"lng": -96.795979
	},
	{
		"lat": 46.630322,
		"lng": -96.795904
	},
	{
		"lat": 46.63018,
		"lng": -96.79587
	},
	{
		"lat": 46.6301,
		"lng": -96.795847
	},
	{
		"lat": 46.629933,
		"lng": -96.795799
	},
	{
		"lat": 46.629791,
		"lng": -96.795765
	},
	{
		"lat": 46.629651,
		"lng": -96.795714
	},
	{
		"lat": 46.629545,
		"lng": -96.795686
	},
	{
		"lat": 46.629509,
		"lng": -96.795681
	},
	{
		"lat": 46.629365,
		"lng": -96.795684
	},
	{
		"lat": 46.629258,
		"lng": -96.795707
	},
	{
		"lat": 46.629153,
		"lng": -96.795746
	},
	{
		"lat": 46.629023,
		"lng": -96.795835
	},
	{
		"lat": 46.628992,
		"lng": -96.795861
	},
	{
		"lat": 46.628878,
		"lng": -96.795989
	},
	{
		"lat": 46.628809,
		"lng": -96.796109
	},
	{
		"lat": 46.628709,
		"lng": -96.796322
	},
	{
		"lat": 46.628686,
		"lng": -96.796421
	},
	{
		"lat": 46.628665,
		"lng": -96.796573
	},
	{
		"lat": 46.628657,
		"lng": -96.796676
	},
	{
		"lat": 46.628658,
		"lng": -96.796778
	},
	{
		"lat": 46.628654,
		"lng": -96.79683
	},
	{
		"lat": 46.62868,
		"lng": -96.797137
	},
	{
		"lat": 46.628717,
		"lng": -96.797282
	},
	{
		"lat": 46.628765,
		"lng": -96.79742
	},
	{
		"lat": 46.628834,
		"lng": -96.79754
	},
	{
		"lat": 46.628907,
		"lng": -96.797653
	},
	{
		"lat": 46.629113,
		"lng": -96.797941
	},
	{
		"lat": 46.629195,
		"lng": -96.798041
	},
	{
		"lat": 46.629226,
		"lng": -96.798069
	},
	{
		"lat": 46.629326,
		"lng": -96.798125
	},
	{
		"lat": 46.629466,
		"lng": -96.798175
	},
	{
		"lat": 46.629573,
		"lng": -96.798195
	},
	{
		"lat": 46.629897,
		"lng": -96.798216
	},
	{
		"lat": 46.630041,
		"lng": -96.79821
	},
	{
		"lat": 46.63022,
		"lng": -96.798178
	},
	{
		"lat": 46.630326,
		"lng": -96.798128
	},
	{
		"lat": 46.630327,
		"lng": -96.798039
	},
	{
		"lat": 46.630528,
		"lng": -96.797968
	},
	{
		"lat": 46.631209,
		"lng": -96.79747
	},
	{
		"lat": 46.631548,
		"lng": -96.797303
	},
	{
		"lat": 46.631594,
		"lng": -96.79727
	},
	{
		"lat": 46.631866,
		"lng": -96.797103
	},
	{
		"lat": 46.632819,
		"lng": -96.796405
	},
	{
		"lat": 46.63318,
		"lng": -96.79604
	},
	{
		"lat": 46.633451,
		"lng": -96.795279
	},
	{
		"lat": 46.633595,
		"lng": -96.794821
	},
	{
		"lat": 46.633629,
		"lng": -96.794717
	},
	{
		"lat": 46.634258,
		"lng": -96.792964
	},
	{
		"lat": 46.634823,
		"lng": -96.792301
	},
	{
		"lat": 46.635005,
		"lng": -96.792234
	},
	{
		"lat": 46.635367,
		"lng": -96.791935
	},
	{
		"lat": 46.635481,
		"lng": -96.791935
	},
	{
		"lat": 46.636162,
		"lng": -96.791568
	},
	{
		"lat": 46.636843,
		"lng": -96.791367
	},
	{
		"lat": 46.637503,
		"lng": -96.791298
	},
	{
		"lat": 46.638346,
		"lng": -96.791076
	},
	{
		"lat": 46.638669,
		"lng": -96.790782
	},
	{
		"lat": 46.639092,
		"lng": -96.789597
	},
	{
		"lat": 46.639612,
		"lng": -96.787886
	},
	{
		"lat": 46.639823,
		"lng": -96.787294
	},
	{
		"lat": 46.640133,
		"lng": -96.786075
	},
	{
		"lat": 46.640249,
		"lng": -96.785878
	},
	{
		"lat": 46.640523,
		"lng": -96.785815
	},
	{
		"lat": 46.640772,
		"lng": -96.785982
	},
	{
		"lat": 46.641129,
		"lng": -96.786615
	},
	{
		"lat": 46.641642,
		"lng": -96.789461
	},
	{
		"lat": 46.641896,
		"lng": -96.790159
	},
	{
		"lat": 46.641908,
		"lng": -96.790191
	},
	{
		"lat": 46.642132,
		"lng": -96.790491
	},
	{
		"lat": 46.64256,
		"lng": -96.790826
	},
	{
		"lat": 46.642992,
		"lng": -96.790864
	},
	{
		"lat": 46.643081,
		"lng": -96.790891
	},
	{
		"lat": 46.644292,
		"lng": -96.791245
	},
	{
		"lat": 46.644662,
		"lng": -96.791459
	},
	{
		"lat": 46.644683,
		"lng": -96.791471
	},
	{
		"lat": 46.64496,
		"lng": -96.791764
	},
	{
		"lat": 46.645355,
		"lng": -96.792354
	},
	{
		"lat": 46.646078,
		"lng": -96.793733
	},
	{
		"lat": 46.646447,
		"lng": -96.794158
	},
	{
		"lat": 46.646652,
		"lng": -96.794122
	},
	{
		"lat": 46.646899,
		"lng": -96.793854
	},
	{
		"lat": 46.64725,
		"lng": -96.792825
	},
	{
		"lat": 46.647616,
		"lng": -96.791134
	},
	{
		"lat": 46.647794,
		"lng": -96.790869
	},
	{
		"lat": 46.648042,
		"lng": -96.790666
	},
	{
		"lat": 46.648313,
		"lng": -96.790531
	},
	{
		"lat": 46.648815,
		"lng": -96.790558
	},
	{
		"lat": 46.649066,
		"lng": -96.790653
	},
	{
		"lat": 46.650247,
		"lng": -96.792224
	},
	{
		"lat": 46.651866,
		"lng": -96.794186
	},
	{
		"lat": 46.652492,
		"lng": -96.79507
	},
	{
		"lat": 46.653143,
		"lng": -96.796153
	},
	{
		"lat": 46.653377,
		"lng": -96.796679
	},
	{
		"lat": 46.653532,
		"lng": -96.798131
	},
	{
		"lat": 46.653584,
		"lng": -96.798237
	},
	{
		"lat": 46.65379,
		"lng": -96.798657
	},
	{
		"lat": 46.654112,
		"lng": -96.79895
	},
	{
		"lat": 46.655204,
		"lng": -96.798936
	},
	{
		"lat": 46.655613,
		"lng": -96.798798
	},
	{
		"lat": 46.656477,
		"lng": -96.79882
	},
	{
		"lat": 46.65705,
		"lng": -96.799045
	},
	{
		"lat": 46.657596,
		"lng": -96.799037
	},
	{
		"lat": 46.657912,
		"lng": -96.798835
	},
	{
		"lat": 46.658092,
		"lng": -96.798667
	},
	{
		"lat": 46.658532,
		"lng": -96.797504
	},
	{
		"lat": 46.658756,
		"lng": -96.79717
	},
	{
		"lat": 46.659004,
		"lng": -96.797035
	},
	{
		"lat": 46.659224,
		"lng": -96.797093
	},
	{
		"lat": 46.6596,
		"lng": -96.797206
	},
	{
		"lat": 46.660073,
		"lng": -96.797917
	},
	{
		"lat": 46.660644,
		"lng": -96.799735
	},
	{
		"lat": 46.660847,
		"lng": -96.800006
	},
	{
		"lat": 46.661103,
		"lng": -96.799877
	},
	{
		"lat": 46.661339,
		"lng": -96.799511
	},
	{
		"lat": 46.661804,
		"lng": -96.797844
	},
	{
		"lat": 46.661993,
		"lng": -96.797578
	},
	{
		"lat": 46.662457,
		"lng": -96.797418
	},
	{
		"lat": 46.662733,
		"lng": -96.797456
	},
	{
		"lat": 46.663145,
		"lng": -96.797597
	},
	{
		"lat": 46.663442,
		"lng": -96.797836
	},
	{
		"lat": 46.663625,
		"lng": -96.797872
	},
	{
		"lat": 46.66383,
		"lng": -96.798077
	},
	{
		"lat": 46.664037,
		"lng": -96.798115
	},
	{
		"lat": 46.664126,
		"lng": -96.798284
	},
	{
		"lat": 46.664791,
		"lng": -96.798562
	},
	{
		"lat": 46.66509,
		"lng": -96.798567
	},
	{
		"lat": 46.665348,
		"lng": -96.798302
	},
	{
		"lat": 46.665661,
		"lng": -96.796029
	},
	{
		"lat": 46.665781,
		"lng": -96.795729
	},
	{
		"lat": 46.665991,
		"lng": -96.795565
	},
	{
		"lat": 46.666314,
		"lng": -96.795603
	},
	{
		"lat": 46.666702,
		"lng": -96.79581
	},
	{
		"lat": 46.667014,
		"lng": -96.796452
	},
	{
		"lat": 46.667102,
		"lng": -96.796756
	},
	{
		"lat": 46.666969,
		"lng": -96.797926
	},
	{
		"lat": 46.66667,
		"lng": -96.799261
	},
	{
		"lat": 46.666698,
		"lng": -96.800367
	},
	{
		"lat": 46.666892,
		"lng": -96.801207
	},
	{
		"lat": 46.66699,
		"lng": -96.801383
	},
	{
		"lat": 46.667234,
		"lng": -96.801809
	},
	{
		"lat": 46.667508,
		"lng": -96.802074
	},
	{
		"lat": 46.667851,
		"lng": -96.802041
	},
	{
		"lat": 46.668057,
		"lng": -96.801908
	},
	{
		"lat": 46.668514,
		"lng": -96.801344
	},
	{
		"lat": 46.668788,
		"lng": -96.800215
	},
	{
		"lat": 46.668902,
		"lng": -96.79912
	},
	{
		"lat": 46.668764,
		"lng": -96.797825
	},
	{
		"lat": 46.66849,
		"lng": -96.797194
	},
	{
		"lat": 46.667987,
		"lng": -96.796763
	},
	{
		"lat": 46.66753,
		"lng": -96.796132
	},
	{
		"lat": 46.667439,
		"lng": -96.795866
	},
	{
		"lat": 46.667507,
		"lng": -96.795136
	},
	{
		"lat": 46.667713,
		"lng": -96.794704
	},
	{
		"lat": 46.667916,
		"lng": -96.79441
	},
	{
		"lat": 46.668033,
		"lng": -96.79424
	},
	{
		"lat": 46.668558,
		"lng": -96.793907
	},
	{
		"lat": 46.669289,
		"lng": -96.793675
	},
	{
		"lat": 46.669678,
		"lng": -96.793708
	},
	{
		"lat": 46.669975,
		"lng": -96.79384
	},
	{
		"lat": 46.670135,
		"lng": -96.79394
	},
	{
		"lat": 46.670203,
		"lng": -96.793973
	},
	{
		"lat": 46.670843,
		"lng": -96.794604
	},
	{
		"lat": 46.671415,
		"lng": -96.794637
	},
	{
		"lat": 46.671575,
		"lng": -96.794172
	},
	{
		"lat": 46.671641,
		"lng": -96.793368
	},
	{
		"lat": 46.671789,
		"lng": -96.792475
	},
	{
		"lat": 46.671701,
		"lng": -96.792302
	},
	{
		"lat": 46.671771,
		"lng": -96.792268
	},
	{
		"lat": 46.671892,
		"lng": -96.791932
	},
	{
		"lat": 46.672198,
		"lng": -96.791633
	},
	{
		"lat": 46.672525,
		"lng": -96.791469
	},
	{
		"lat": 46.67278,
		"lng": -96.791539
	},
	{
		"lat": 46.673057,
		"lng": -96.791679
	},
	{
		"lat": 46.67347,
		"lng": -96.792057
	},
	{
		"lat": 46.673901,
		"lng": -96.792771
	},
	{
		"lat": 46.673988,
		"lng": -96.793177
	},
	{
		"lat": 46.673836,
		"lng": -96.794054
	},
	{
		"lat": 46.673301,
		"lng": -96.795701
	},
	{
		"lat": 46.67331,
		"lng": -96.796681
	},
	{
		"lat": 46.673435,
		"lng": -96.797694
	},
	{
		"lat": 46.673659,
		"lng": -96.798272
	},
	{
		"lat": 46.674163,
		"lng": -96.798853
	},
	{
		"lat": 46.67437,
		"lng": -96.798957
	},
	{
		"lat": 46.674875,
		"lng": -96.79937
	},
	{
		"lat": 46.675245,
		"lng": -96.79951
	},
	{
		"lat": 46.676012,
		"lng": -96.799487
	},
	{
		"lat": 46.676571,
		"lng": -96.79936
	},
	{
		"lat": 46.678248,
		"lng": -96.79925
	},
	{
		"lat": 46.678453,
		"lng": -96.798984
	},
	{
		"lat": 46.678567,
		"lng": -96.798586
	},
	{
		"lat": 46.678704,
		"lng": -96.797224
	},
	{
		"lat": 46.678933,
		"lng": -96.79666
	},
	{
		"lat": 46.679275,
		"lng": -96.795996
	},
	{
		"lat": 46.679549,
		"lng": -96.795166
	},
	{
		"lat": 46.679549,
		"lng": -96.794767
	},
	{
		"lat": 46.679458,
		"lng": -96.794369
	},
	{
		"lat": 46.679138,
		"lng": -96.793904
	},
	{
		"lat": 46.678864,
		"lng": -96.793672
	},
	{
		"lat": 46.677538,
		"lng": -96.793374
	},
	{
		"lat": 46.677173,
		"lng": -96.793142
	},
	{
		"lat": 46.676738,
		"lng": -96.792577
	},
	{
		"lat": 46.676555,
		"lng": -96.792145
	},
	{
		"lat": 46.676555,
		"lng": -96.788825
	},
	{
		"lat": 46.676737,
		"lng": -96.788095
	},
	{
		"lat": 46.676989,
		"lng": -96.787597
	},
	{
		"lat": 46.677103,
		"lng": -96.78753
	},
	{
		"lat": 46.677446,
		"lng": -96.78743
	},
	{
		"lat": 46.677811,
		"lng": -96.787497
	},
	{
		"lat": 46.678223,
		"lng": -96.787696
	},
	{
		"lat": 46.678634,
		"lng": -96.788326
	},
	{
		"lat": 46.679251,
		"lng": -96.789554
	},
	{
		"lat": 46.679754,
		"lng": -96.790417
	},
	{
		"lat": 46.680417,
		"lng": -96.791779
	},
	{
		"lat": 46.680783,
		"lng": -96.792609
	},
	{
		"lat": 46.680943,
		"lng": -96.793173
	},
	{
		"lat": 46.681031,
		"lng": -96.793306
	},
	{
		"lat": 46.681423,
		"lng": -96.793903
	},
	{
		"lat": 46.68204,
		"lng": -96.794368
	},
	{
		"lat": 46.682109,
		"lng": -96.794468
	},
	{
		"lat": 46.682337,
		"lng": -96.794567
	},
	{
		"lat": 46.682428,
		"lng": -96.7947
	},
	{
		"lat": 46.682817,
		"lng": -96.794833
	},
	{
		"lat": 46.683297,
		"lng": -96.794799
	},
	{
		"lat": 46.683502,
		"lng": -96.794401
	},
	{
		"lat": 46.68355,
		"lng": -96.794103
	},
	{
		"lat": 46.683569,
		"lng": -96.793967
	},
	{
		"lat": 46.683566,
		"lng": -96.793499
	},
	{
		"lat": 46.683303,
		"lng": -96.792031
	},
	{
		"lat": 46.68309,
		"lng": -96.791298
	},
	{
		"lat": 46.682626,
		"lng": -96.790633
	},
	{
		"lat": 46.681885,
		"lng": -96.789703
	},
	{
		"lat": 46.681697,
		"lng": -96.789236
	},
	{
		"lat": 46.681691,
		"lng": -96.788434
	},
	{
		"lat": 46.681828,
		"lng": -96.788133
	},
	{
		"lat": 46.682033,
		"lng": -96.787931
	},
	{
		"lat": 46.682307,
		"lng": -96.787729
	},
	{
		"lat": 46.682973,
		"lng": -96.787557
	},
	{
		"lat": 46.683916,
		"lng": -96.787617
	},
	{
		"lat": 46.684285,
		"lng": -96.787714
	},
	{
		"lat": 46.684561,
		"lng": -96.787846
	},
	{
		"lat": 46.684974,
		"lng": -96.787842
	},
	{
		"lat": 46.685203,
		"lng": -96.787607
	},
	{
		"lat": 46.685199,
		"lng": -96.787073
	},
	{
		"lat": 46.685105,
		"lng": -96.786806
	},
	{
		"lat": 46.684756,
		"lng": -96.786173
	},
	{
		"lat": 46.684615,
		"lng": -96.785707
	},
	{
		"lat": 46.684634,
		"lng": -96.785073
	},
	{
		"lat": 46.684813,
		"lng": -96.784503
	},
	{
		"lat": 46.684996,
		"lng": -96.784269
	},
	{
		"lat": 46.68527,
		"lng": -96.784066
	},
	{
		"lat": 46.685729,
		"lng": -96.783928
	},
	{
		"lat": 46.686074,
		"lng": -96.78396
	},
	{
		"lat": 46.68672,
		"lng": -96.784123
	},
	{
		"lat": 46.68672,
		"lng": -96.784205
	},
	{
		"lat": 46.686811,
		"lng": -96.784338
	},
	{
		"lat": 46.687132,
		"lng": -96.78447
	},
	{
		"lat": 46.687384,
		"lng": -96.784703
	},
	{
		"lat": 46.687591,
		"lng": -96.785069
	},
	{
		"lat": 46.687683,
		"lng": -96.785369
	},
	{
		"lat": 46.687821,
		"lng": -96.786201
	},
	{
		"lat": 46.687823,
		"lng": -96.787866
	},
	{
		"lat": 46.688192,
		"lng": -96.789296
	},
	{
		"lat": 46.688422,
		"lng": -96.789795
	},
	{
		"lat": 46.689133,
		"lng": -96.790626
	},
	{
		"lat": 46.689957,
		"lng": -96.790625
	},
	{
		"lat": 46.690324,
		"lng": -96.790325
	},
	{
		"lat": 46.690666,
		"lng": -96.789625
	},
	{
		"lat": 46.691121,
		"lng": -96.786829
	},
	{
		"lat": 46.691303,
		"lng": -96.786295
	},
	{
		"lat": 46.691463,
		"lng": -96.786095
	},
	{
		"lat": 46.691898,
		"lng": -96.785995
	},
	{
		"lat": 46.692289,
		"lng": -96.786294
	},
	{
		"lat": 46.693,
		"lng": -96.787292
	},
	{
		"lat": 46.693229,
		"lng": -96.787292
	},
	{
		"lat": 46.693549,
		"lng": -96.786858
	},
	{
		"lat": 46.693662,
		"lng": -96.785559
	},
	{
		"lat": 46.693891,
		"lng": -96.785126
	},
	{
		"lat": 46.694372,
		"lng": -96.784925
	},
	{
		"lat": 46.695036,
		"lng": -96.784958
	},
	{
		"lat": 46.695792,
		"lng": -96.78519
	},
	{
		"lat": 46.696274,
		"lng": -96.785555
	},
	{
		"lat": 46.697557,
		"lng": -96.786119
	},
	{
		"lat": 46.697603,
		"lng": -96.786185
	},
	{
		"lat": 46.69774,
		"lng": -96.786218
	},
	{
		"lat": 46.697878,
		"lng": -96.786318
	},
	{
		"lat": 46.69797,
		"lng": -96.786318
	},
	{
		"lat": 46.698038,
		"lng": -96.786418
	},
	{
		"lat": 46.69813,
		"lng": -96.786418
	},
	{
		"lat": 46.698818,
		"lng": -96.787116
	},
	{
		"lat": 46.699208,
		"lng": -96.787315
	},
	{
		"lat": 46.69985,
		"lng": -96.787847
	},
	{
		"lat": 46.70024,
		"lng": -96.788079
	},
	{
		"lat": 46.700629,
		"lng": -96.788012
	},
	{
		"lat": 46.700927,
		"lng": -96.787578
	},
	{
		"lat": 46.700971,
		"lng": -96.786879
	},
	{
		"lat": 46.700809,
		"lng": -96.785214
	},
	{
		"lat": 46.700853,
		"lng": -96.784415
	},
	{
		"lat": 46.701013,
		"lng": -96.784249
	},
	{
		"lat": 46.701448,
		"lng": -96.784215
	},
	{
		"lat": 46.70177,
		"lng": -96.784514
	},
	{
		"lat": 46.701885,
		"lng": -96.784813
	},
	{
		"lat": 46.702115,
		"lng": -96.785779
	},
	{
		"lat": 46.702208,
		"lng": -96.786711
	},
	{
		"lat": 46.702211,
		"lng": -96.788542
	},
	{
		"lat": 46.702304,
		"lng": -96.789807
	},
	{
		"lat": 46.702602,
		"lng": -96.790373
	},
	{
		"lat": 46.702969,
		"lng": -96.790905
	},
	{
		"lat": 46.703023,
		"lng": -96.790946
	},
	{
		"lat": 46.703359,
		"lng": -96.791204
	},
	{
		"lat": 46.703747,
		"lng": -96.791204
	},
	{
		"lat": 46.704044,
		"lng": -96.790739
	},
	{
		"lat": 46.704233,
		"lng": -96.790375
	},
	{
		"lat": 46.704519,
		"lng": -96.789826
	},
	{
		"lat": 46.704684,
		"lng": -96.789503
	},
	{
		"lat": 46.705163,
		"lng": -96.787948
	},
	{
		"lat": 46.705434,
		"lng": -96.786665
	},
	{
		"lat": 46.705547,
		"lng": -96.785922
	},
	{
		"lat": 46.705585,
		"lng": -96.784505
	},
	{
		"lat": 46.705792,
		"lng": -96.784031
	},
	{
		"lat": 46.705977,
		"lng": -96.783827
	},
	{
		"lat": 46.706442,
		"lng": -96.783859
	},
	{
		"lat": 46.706437,
		"lng": -96.783962
	},
	{
		"lat": 46.706643,
		"lng": -96.784062
	},
	{
		"lat": 46.707213,
		"lng": -96.784894
	},
	{
		"lat": 46.707508,
		"lng": -96.785526
	},
	{
		"lat": 46.707735,
		"lng": -96.786424
	},
	{
		"lat": 46.707916,
		"lng": -96.787221
	},
	{
		"lat": 46.70812,
		"lng": -96.787788
	},
	{
		"lat": 46.708392,
		"lng": -96.788619
	},
	{
		"lat": 46.708781,
		"lng": -96.789153
	},
	{
		"lat": 46.709077,
		"lng": -96.789452
	},
	{
		"lat": 46.709168,
		"lng": -96.789486
	},
	{
		"lat": 46.709351,
		"lng": -96.789585
	},
	{
		"lat": 46.709557,
		"lng": -96.789553
	},
	{
		"lat": 46.709946,
		"lng": -96.789188
	},
	{
		"lat": 46.710246,
		"lng": -96.788059
	},
	{
		"lat": 46.710411,
		"lng": -96.786231
	},
	{
		"lat": 46.710711,
		"lng": -96.784967
	},
	{
		"lat": 46.711125,
		"lng": -96.783971
	},
	{
		"lat": 46.711423,
		"lng": -96.783574
	},
	{
		"lat": 46.711734,
		"lng": -96.783544
	},
	{
		"lat": 46.711768,
		"lng": -96.78354
	},
	{
		"lat": 46.712018,
		"lng": -96.783804
	},
	{
		"lat": 46.712202,
		"lng": -96.784001
	},
	{
		"lat": 46.712572,
		"lng": -96.785026
	},
	{
		"lat": 46.712852,
		"lng": -96.786183
	},
	{
		"lat": 46.713084,
		"lng": -96.786877
	},
	{
		"lat": 46.713405,
		"lng": -96.787339
	},
	{
		"lat": 46.713589,
		"lng": -96.787503
	},
	{
		"lat": 46.713998,
		"lng": -96.787468
	},
	{
		"lat": 46.714791,
		"lng": -96.786471
	},
	{
		"lat": 46.715918,
		"lng": -96.784411
	},
	{
		"lat": 46.716096,
		"lng": -96.783747
	},
	{
		"lat": 46.716317,
		"lng": -96.782553
	},
	{
		"lat": 46.716405,
		"lng": -96.782344
	},
	{
		"lat": 46.716499,
		"lng": -96.782121
	},
	{
		"lat": 46.716888,
		"lng": -96.78212
	},
	{
		"lat": 46.717117,
		"lng": -96.782252
	},
	{
		"lat": 46.717508,
		"lng": -96.782817
	},
	{
		"lat": 46.717807,
		"lng": -96.783781
	},
	{
		"lat": 46.717946,
		"lng": -96.785212
	},
	{
		"lat": 46.717996,
		"lng": -96.786741
	},
	{
		"lat": 46.718158,
		"lng": -96.787772
	},
	{
		"lat": 46.717999,
		"lng": -96.788404
	},
	{
		"lat": 46.717542,
		"lng": -96.789137
	},
	{
		"lat": 46.717429,
		"lng": -96.789537
	},
	{
		"lat": 46.717453,
		"lng": -96.790169
	},
	{
		"lat": 46.717614,
		"lng": -96.7908
	},
	{
		"lat": 46.717798,
		"lng": -96.791066
	},
	{
		"lat": 46.718004,
		"lng": -96.791232
	},
	{
		"lat": 46.718874,
		"lng": -96.791197
	},
	{
		"lat": 46.719284,
		"lng": -96.790931
	},
	{
		"lat": 46.71965,
		"lng": -96.790267
	},
	{
		"lat": 46.719742,
		"lng": -96.789469
	},
	{
		"lat": 46.719834,
		"lng": -96.786913
	},
	{
		"lat": 46.719902,
		"lng": -96.786348
	},
	{
		"lat": 46.720496,
		"lng": -96.784754
	},
	{
		"lat": 46.720861,
		"lng": -96.784023
	},
	{
		"lat": 46.721226,
		"lng": -96.782894
	},
	{
		"lat": 46.722048,
		"lng": -96.7811
	},
	{
		"lat": 46.722917,
		"lng": -96.779904
	},
	{
		"lat": 46.722966,
		"lng": -96.779888
	},
	{
		"lat": 46.723303,
		"lng": -96.779775
	},
	{
		"lat": 46.723688,
		"lng": -96.77981
	},
	{
		"lat": 46.723958,
		"lng": -96.780076
	},
	{
		"lat": 46.724296,
		"lng": -96.780507
	},
	{
		"lat": 46.724586,
		"lng": -96.781268
	},
	{
		"lat": 46.724718,
		"lng": -96.781795
	},
	{
		"lat": 46.724921,
		"lng": -96.781995
	},
	{
		"lat": 46.725193,
		"lng": -96.78203
	},
	{
		"lat": 46.725308,
		"lng": -96.7818
	},
	{
		"lat": 46.72552,
		"lng": -96.780647
	},
	{
		"lat": 46.725752,
		"lng": -96.779988
	},
	{
		"lat": 46.72614,
		"lng": -96.779497
	},
	{
		"lat": 46.726642,
		"lng": -96.779136
	},
	{
		"lat": 46.728117,
		"lng": -96.779146
	},
	{
		"lat": 46.728298,
		"lng": -96.779246
	},
	{
		"lat": 46.729567,
		"lng": -96.779321
	},
	{
		"lat": 46.729816,
		"lng": -96.779515
	},
	{
		"lat": 46.729951,
		"lng": -96.779616
	},
	{
		"lat": 46.730136,
		"lng": -96.779971
	},
	{
		"lat": 46.730032,
		"lng": -96.780494
	},
	{
		"lat": 46.729856,
		"lng": -96.780724
	},
	{
		"lat": 46.729523,
		"lng": -96.780956
	},
	{
		"lat": 46.729344,
		"lng": -96.78096
	},
	{
		"lat": 46.729038,
		"lng": -96.78142
	},
	{
		"lat": 46.728844,
		"lng": -96.781976
	},
	{
		"lat": 46.728874,
		"lng": -96.78253
	},
	{
		"lat": 46.728994,
		"lng": -96.783016
	},
	{
		"lat": 46.729245,
		"lng": -96.783338
	},
	{
		"lat": 46.729407,
		"lng": -96.783485
	},
	{
		"lat": 46.730061,
		"lng": -96.784075
	},
	{
		"lat": 46.730444,
		"lng": -96.784232
	},
	{
		"lat": 46.730976,
		"lng": -96.784225
	},
	{
		"lat": 46.731142,
		"lng": -96.784223
	},
	{
		"lat": 46.731533,
		"lng": -96.784352
	},
	{
		"lat": 46.731878,
		"lng": -96.784551
	},
	{
		"lat": 46.732705,
		"lng": -96.784546
	},
	{
		"lat": 46.733001,
		"lng": -96.784212
	},
	{
		"lat": 46.733067,
		"lng": -96.783776
	},
	{
		"lat": 46.733125,
		"lng": -96.78184
	},
	{
		"lat": 46.733349,
		"lng": -96.781105
	},
	{
		"lat": 46.733532,
		"lng": -96.780903
	},
	{
		"lat": 46.733807,
		"lng": -96.780768
	},
	{
		"lat": 46.734289,
		"lng": -96.780765
	},
	{
		"lat": 46.734403,
		"lng": -96.780864
	},
	{
		"lat": 46.734565,
		"lng": -96.780897
	},
	{
		"lat": 46.735258,
		"lng": -96.78176
	},
	{
		"lat": 46.735609,
		"lng": -96.782593
	},
	{
		"lat": 46.735955,
		"lng": -96.783091
	},
	{
		"lat": 46.736138,
		"lng": -96.783156
	},
	{
		"lat": 46.73646,
		"lng": -96.783122
	},
	{
		"lat": 46.736733,
		"lng": -96.782821
	},
	{
		"lat": 46.736983,
		"lng": -96.782284
	},
	{
		"lat": 46.737207,
		"lng": -96.781513
	},
	{
		"lat": 46.73755,
		"lng": -96.781145
	},
	{
		"lat": 46.737938,
		"lng": -96.780943
	},
	{
		"lat": 46.738421,
		"lng": -96.780939
	},
	{
		"lat": 46.738696,
		"lng": -96.781105
	},
	{
		"lat": 46.738928,
		"lng": -96.781403
	},
	{
		"lat": 46.739505,
		"lng": -96.781936
	},
	{
		"lat": 46.740013,
		"lng": -96.782598
	},
	{
		"lat": 46.740291,
		"lng": -96.782864
	},
	{
		"lat": 46.740588,
		"lng": -96.782829
	},
	{
		"lat": 46.740772,
		"lng": -96.782661
	},
	{
		"lat": 46.740928,
		"lng": -96.782193
	},
	{
		"lat": 46.740968,
		"lng": -96.781088
	},
	{
		"lat": 46.741195,
		"lng": -96.780522
	},
	{
		"lat": 46.741423,
		"lng": -96.780352
	},
	{
		"lat": 46.741769,
		"lng": -96.780451
	},
	{
		"lat": 46.742159,
		"lng": -96.780782
	},
	{
		"lat": 46.742392,
		"lng": -96.781215
	},
	{
		"lat": 46.742604,
		"lng": -96.782282
	},
	{
		"lat": 46.742631,
		"lng": -96.782882
	},
	{
		"lat": 46.74256,
		"lng": -96.786321
	},
	{
		"lat": 46.742725,
		"lng": -96.786889
	},
	{
		"lat": 46.742979,
		"lng": -96.787287
	},
	{
		"lat": 46.74314,
		"lng": -96.787353
	},
	{
		"lat": 46.743782,
		"lng": -96.787215
	},
	{
		"lat": 46.744216,
		"lng": -96.786845
	},
	{
		"lat": 46.744513,
		"lng": -96.786475
	},
	{
		"lat": 46.744646,
		"lng": -96.785842
	},
	{
		"lat": 46.744618,
		"lng": -96.785206
	},
	{
		"lat": 46.744006,
		"lng": -96.782574
	},
	{
		"lat": 46.743935,
		"lng": -96.782105
	},
	{
		"lat": 46.744021,
		"lng": -96.781138
	},
	{
		"lat": 46.744178,
		"lng": -96.780737
	},
	{
		"lat": 46.74459,
		"lng": -96.780433
	},
	{
		"lat": 46.745004,
		"lng": -96.780298
	},
	{
		"lat": 46.745464,
		"lng": -96.780363
	},
	{
		"lat": 46.745737,
		"lng": -96.780499
	},
	{
		"lat": 46.745963,
		"lng": -96.780834
	},
	{
		"lat": 46.746505,
		"lng": -96.784312
	},
	{
		"lat": 46.746906,
		"lng": -96.785518
	},
	{
		"lat": 46.747694,
		"lng": -96.787128
	},
	{
		"lat": 46.748239,
		"lng": -96.787668
	},
	{
		"lat": 46.748813,
		"lng": -96.787639
	},
	{
		"lat": 46.748976,
		"lng": -96.787474
	},
	{
		"lat": 46.749167,
		"lng": -96.786674
	},
	{
		"lat": 46.749037,
		"lng": -96.785871
	},
	{
		"lat": 46.748684,
		"lng": -96.784465
	},
	{
		"lat": 46.748717,
		"lng": -96.78333
	},
	{
		"lat": 46.748835,
		"lng": -96.782997
	},
	{
		"lat": 46.74916,
		"lng": -96.782599
	},
	{
		"lat": 46.749548,
		"lng": -96.782537
	},
	{
		"lat": 46.750002,
		"lng": -96.782677
	},
	{
		"lat": 46.750409,
		"lng": -96.782783
	},
	{
		"lat": 46.750454,
		"lng": -96.782851
	},
	{
		"lat": 46.750569,
		"lng": -96.782885
	},
	{
		"lat": 46.750909,
		"lng": -96.783289
	},
	{
		"lat": 46.751179,
		"lng": -96.783792
	},
	{
		"lat": 46.751424,
		"lng": -96.784663
	},
	{
		"lat": 46.751615,
		"lng": -96.786268
	},
	{
		"lat": 46.751697,
		"lng": -96.787304
	},
	{
		"lat": 46.751567,
		"lng": -96.788838
	},
	{
		"lat": 46.751839,
		"lng": -96.789242
	},
	{
		"lat": 46.751999,
		"lng": -96.789377
	},
	{
		"lat": 46.752366,
		"lng": -96.789314
	},
	{
		"lat": 46.752529,
		"lng": -96.789181
	},
	{
		"lat": 46.752668,
		"lng": -96.788983
	},
	{
		"lat": 46.752858,
		"lng": -96.788383
	},
	{
		"lat": 46.752864,
		"lng": -96.787682
	},
	{
		"lat": 46.752783,
		"lng": -96.786579
	},
	{
		"lat": 46.752407,
		"lng": -96.785107
	},
	{
		"lat": 46.752439,
		"lng": -96.784171
	},
	{
		"lat": 46.752769,
		"lng": -96.783139
	},
	{
		"lat": 46.75305,
		"lng": -96.782708
	},
	{
		"lat": 46.753945,
		"lng": -96.78275
	},
	{
		"lat": 46.754242,
		"lng": -96.782852
	},
	{
		"lat": 46.75431,
		"lng": -96.78292
	},
	{
		"lat": 46.754516,
		"lng": -96.782988
	},
	{
		"lat": 46.754832,
		"lng": -96.783492
	},
	{
		"lat": 46.754985,
		"lng": -96.784329
	},
	{
		"lat": 46.754912,
		"lng": -96.784796
	},
	{
		"lat": 46.754924,
		"lng": -96.785965
	},
	{
		"lat": 46.755095,
		"lng": -96.787235
	},
	{
		"lat": 46.755655,
		"lng": -96.78871
	},
	{
		"lat": 46.756063,
		"lng": -96.789282
	},
	{
		"lat": 46.756609,
		"lng": -96.789789
	},
	{
		"lat": 46.756701,
		"lng": -96.789789
	},
	{
		"lat": 46.757021,
		"lng": -96.789755
	},
	{
		"lat": 46.757501,
		"lng": -96.789389
	},
	{
		"lat": 46.757706,
		"lng": -96.788924
	},
	{
		"lat": 46.757866,
		"lng": -96.788359
	},
	{
		"lat": 46.757934,
		"lng": -96.78766
	},
	{
		"lat": 46.757774,
		"lng": -96.787129
	},
	{
		"lat": 46.756951,
		"lng": -96.785932
	},
	{
		"lat": 46.756403,
		"lng": -96.784769
	},
	{
		"lat": 46.756471,
		"lng": -96.783505
	},
	{
		"lat": 46.756585,
		"lng": -96.783106
	},
	{
		"lat": 46.756745,
		"lng": -96.78294
	},
	{
		"lat": 46.757819,
		"lng": -96.782906
	},
	{
		"lat": 46.758345,
		"lng": -96.783105
	},
	{
		"lat": 46.758687,
		"lng": -96.783238
	},
	{
		"lat": 46.758733,
		"lng": -96.783371
	},
	{
		"lat": 46.758802,
		"lng": -96.783338
	},
	{
		"lat": 46.759076,
		"lng": -96.783604
	},
	{
		"lat": 46.75919,
		"lng": -96.78387
	},
	{
		"lat": 46.759373,
		"lng": -96.7848
	},
	{
		"lat": 46.759488,
		"lng": -96.785831
	},
	{
		"lat": 46.759739,
		"lng": -96.786529
	},
	{
		"lat": 46.760059,
		"lng": -96.786994
	},
	{
		"lat": 46.760356,
		"lng": -96.787294
	},
	{
		"lat": 46.761042,
		"lng": -96.787293
	},
	{
		"lat": 46.761613,
		"lng": -96.786728
	},
	{
		"lat": 46.761864,
		"lng": -96.786395
	},
	{
		"lat": 46.762024,
		"lng": -96.785763
	},
	{
		"lat": 46.762115,
		"lng": -96.784766
	},
	{
		"lat": 46.762001,
		"lng": -96.784001
	},
	{
		"lat": 46.761772,
		"lng": -96.783469
	},
	{
		"lat": 46.760995,
		"lng": -96.782206
	},
	{
		"lat": 46.7604,
		"lng": -96.781076
	},
	{
		"lat": 46.760195,
		"lng": -96.780345
	},
	{
		"lat": 46.760194,
		"lng": -96.779081
	},
	{
		"lat": 46.760422,
		"lng": -96.778217
	},
	{
		"lat": 46.760582,
		"lng": -96.777984
	},
	{
		"lat": 46.760925,
		"lng": -96.777851
	},
	{
		"lat": 46.761588,
		"lng": -96.77785
	},
	{
		"lat": 46.762136,
		"lng": -96.778082
	},
	{
		"lat": 46.762433,
		"lng": -96.778249
	},
	{
		"lat": 46.762845,
		"lng": -96.778913
	},
	{
		"lat": 46.762959,
		"lng": -96.779312
	},
	{
		"lat": 46.763051,
		"lng": -96.779645
	},
	{
		"lat": 46.762892,
		"lng": -96.78297
	},
	{
		"lat": 46.763006,
		"lng": -96.783867
	},
	{
		"lat": 46.763258,
		"lng": -96.785397
	},
	{
		"lat": 46.763601,
		"lng": -96.786494
	},
	{
		"lat": 46.76415,
		"lng": -96.787857
	},
	{
		"lat": 46.764858,
		"lng": -96.78912
	},
	{
		"lat": 46.765361,
		"lng": -96.789519
	},
	{
		"lat": 46.766024,
		"lng": -96.789519
	},
	{
		"lat": 46.766252,
		"lng": -96.789352
	},
	{
		"lat": 46.766458,
		"lng": -96.788853
	},
	{
		"lat": 46.766503,
		"lng": -96.788388
	},
	{
		"lat": 46.766503,
		"lng": -96.787856
	},
	{
		"lat": 46.766492,
		"lng": -96.787762
	},
	{
		"lat": 46.76623,
		"lng": -96.785689
	},
	{
		"lat": 46.765312,
		"lng": -96.780992
	},
	{
		"lat": 46.764533,
		"lng": -96.778797
	},
	{
		"lat": 46.764506,
		"lng": -96.778396
	},
	{
		"lat": 46.764531,
		"lng": -96.778238
	},
	{
		"lat": 46.764644,
		"lng": -96.778179
	},
	{
		"lat": 46.764695,
		"lng": -96.777881
	},
	{
		"lat": 46.764969,
		"lng": -96.776817
	},
	{
		"lat": 46.76522,
		"lng": -96.776418
	},
	{
		"lat": 46.766043,
		"lng": -96.775686
	},
	{
		"lat": 46.766751,
		"lng": -96.775453
	},
	{
		"lat": 46.767185,
		"lng": -96.775485
	},
	{
		"lat": 46.767528,
		"lng": -96.775751
	},
	{
		"lat": 46.767802,
		"lng": -96.776183
	},
	{
		"lat": 46.76842,
		"lng": -96.778976
	},
	{
		"lat": 46.768535,
		"lng": -96.780639
	},
	{
		"lat": 46.768924,
		"lng": -96.78443
	},
	{
		"lat": 46.76913,
		"lng": -96.786059
	},
	{
		"lat": 46.769473,
		"lng": -96.787056
	},
	{
		"lat": 46.769976,
		"lng": -96.78802
	},
	{
		"lat": 46.770342,
		"lng": -96.788419
	},
	{
		"lat": 46.77121,
		"lng": -96.789217
	},
	{
		"lat": 46.771553,
		"lng": -96.78935
	},
	{
		"lat": 46.771759,
		"lng": -96.789549
	},
	{
		"lat": 46.772353,
		"lng": -96.789749
	},
	{
		"lat": 46.772627,
		"lng": -96.789782
	},
	{
		"lat": 46.772787,
		"lng": -96.789882
	},
	{
		"lat": 46.773107,
		"lng": -96.789915
	},
	{
		"lat": 46.773404,
		"lng": -96.790048
	},
	{
		"lat": 46.774448,
		"lng": -96.790077
	},
	{
		"lat": 46.774569,
		"lng": -96.790079
	},
	{
		"lat": 46.774797,
		"lng": -96.789813
	},
	{
		"lat": 46.774911,
		"lng": -96.789514
	},
	{
		"lat": 46.775002,
		"lng": -96.788882
	},
	{
		"lat": 46.774727,
		"lng": -96.788017
	},
	{
		"lat": 46.774132,
		"lng": -96.786522
	},
	{
		"lat": 46.773993,
		"lng": -96.785923
	},
	{
		"lat": 46.774085,
		"lng": -96.784992
	},
	{
		"lat": 46.774312,
		"lng": -96.784294
	},
	{
		"lat": 46.774746,
		"lng": -96.783728
	},
	{
		"lat": 46.774952,
		"lng": -96.783628
	},
	{
		"lat": 46.774963,
		"lng": -96.783542
	},
	{
		"lat": 46.775957,
		"lng": -96.783172
	},
	{
		"lat": 46.776136,
		"lng": -96.783135
	},
	{
		"lat": 46.776396,
		"lng": -96.783095
	},
	{
		"lat": 46.777219,
		"lng": -96.783161
	},
	{
		"lat": 46.777653,
		"lng": -96.783394
	},
	{
		"lat": 46.77779,
		"lng": -96.783394
	},
	{
		"lat": 46.778247,
		"lng": -96.783793
	},
	{
		"lat": 46.778407,
		"lng": -96.784192
	},
	{
		"lat": 46.778458,
		"lng": -96.784831
	},
	{
		"lat": 46.778547,
		"lng": -96.785886
	},
	{
		"lat": 46.778356,
		"lng": -96.787209
	},
	{
		"lat": 46.77803,
		"lng": -96.788145
	},
	{
		"lat": 46.777724,
		"lng": -96.788727
	},
	{
		"lat": 46.776803,
		"lng": -96.790247
	},
	{
		"lat": 46.776168,
		"lng": -96.791379
	},
	{
		"lat": 46.77593,
		"lng": -96.792155
	},
	{
		"lat": 46.775834,
		"lng": -96.794444
	},
	{
		"lat": 46.775947,
		"lng": -96.795056
	},
	{
		"lat": 46.776285,
		"lng": -96.795924
	},
	{
		"lat": 46.776665,
		"lng": -96.796501
	},
	{
		"lat": 46.776999,
		"lng": -96.796756
	},
	{
		"lat": 46.777464,
		"lng": -96.796722
	},
	{
		"lat": 46.77786,
		"lng": -96.796365
	},
	{
		"lat": 46.778387,
		"lng": -96.795684
	},
	{
		"lat": 46.779374,
		"lng": -96.794131
	},
	{
		"lat": 46.779923,
		"lng": -96.793322
	},
	{
		"lat": 46.780781,
		"lng": -96.792574
	},
	{
		"lat": 46.781485,
		"lng": -96.791861
	},
	{
		"lat": 46.781953,
		"lng": -96.791282
	},
	{
		"lat": 46.782501,
		"lng": -96.790675
	},
	{
		"lat": 46.783525,
		"lng": -96.788589
	},
	{
		"lat": 46.783686,
		"lng": -96.788214
	},
	{
		"lat": 46.784052,
		"lng": -96.787881
	},
	{
		"lat": 46.784663,
		"lng": -96.787363
	},
	{
		"lat": 46.784759,
		"lng": -96.78728
	},
	{
		"lat": 46.785146,
		"lng": -96.78714
	},
	{
		"lat": 46.785496,
		"lng": -96.787136
	},
	{
		"lat": 46.785651,
		"lng": -96.787136
	},
	{
		"lat": 46.786177,
		"lng": -96.787568
	},
	{
		"lat": 46.786497,
		"lng": -96.788002
	},
	{
		"lat": 46.786886,
		"lng": -96.7895
	},
	{
		"lat": 46.787023,
		"lng": -96.7899
	},
	{
		"lat": 46.787297,
		"lng": -96.790233
	},
	{
		"lat": 46.788029,
		"lng": -96.790234
	},
	{
		"lat": 46.788533,
		"lng": -96.789933
	},
	{
		"lat": 46.789174,
		"lng": -96.789334
	},
	{
		"lat": 46.789379,
		"lng": -96.789301
	},
	{
		"lat": 46.789562,
		"lng": -96.789568
	},
	{
		"lat": 46.789562,
		"lng": -96.790067
	},
	{
		"lat": 46.789472,
		"lng": -96.790467
	},
	{
		"lat": 46.789083,
		"lng": -96.791265
	},
	{
		"lat": 46.788648,
		"lng": -96.792132
	},
	{
		"lat": 46.788555,
		"lng": -96.792831
	},
	{
		"lat": 46.788555,
		"lng": -96.79433
	},
	{
		"lat": 46.788806,
		"lng": -96.795096
	},
	{
		"lat": 46.789155,
		"lng": -96.795486
	},
	{
		"lat": 46.789401,
		"lng": -96.795762
	},
	{
		"lat": 46.789881,
		"lng": -96.796195
	},
	{
		"lat": 46.791572,
		"lng": -96.796992
	},
	{
		"lat": 46.79244,
		"lng": -96.796959
	},
	{
		"lat": 46.792783,
		"lng": -96.796693
	},
	{
		"lat": 46.793286,
		"lng": -96.795661
	},
	{
		"lat": 46.793583,
		"lng": -96.795029
	},
	{
		"lat": 46.793811,
		"lng": -96.794663
	},
	{
		"lat": 46.794108,
		"lng": -96.794397
	},
	{
		"lat": 46.794634,
		"lng": -96.794263
	},
	{
		"lat": 46.795091,
		"lng": -96.794396
	},
	{
		"lat": 46.795479,
		"lng": -96.794629
	},
	{
		"lat": 46.795776,
		"lng": -96.794928
	},
	{
		"lat": 46.796233,
		"lng": -96.795627
	},
	{
		"lat": 46.796553,
		"lng": -96.796558
	},
	{
		"lat": 46.796622,
		"lng": -96.797024
	},
	{
		"lat": 46.796257,
		"lng": -96.799613
	},
	{
		"lat": 46.796257,
		"lng": -96.799619
	},
	{
		"lat": 46.79628,
		"lng": -96.800451
	},
	{
		"lat": 46.796417,
		"lng": -96.801083
	},
	{
		"lat": 46.796645,
		"lng": -96.801549
	},
	{
		"lat": 46.796965,
		"lng": -96.801914
	},
	{
		"lat": 46.797157,
		"lng": -96.801905
	},
	{
		"lat": 46.797651,
		"lng": -96.801881
	},
	{
		"lat": 46.797879,
		"lng": -96.801748
	},
	{
		"lat": 46.798176,
		"lng": -96.801281
	},
	{
		"lat": 46.798588,
		"lng": -96.800084
	},
	{
		"lat": 46.798862,
		"lng": -96.799029
	},
	{
		"lat": 46.799103,
		"lng": -96.79809
	},
	{
		"lat": 46.799411,
		"lng": -96.797163
	},
	{
		"lat": 46.799915,
		"lng": -96.796235
	},
	{
		"lat": 46.800287,
		"lng": -96.795978
	},
	{
		"lat": 46.800772,
		"lng": -96.795817
	},
	{
		"lat": 46.801697,
		"lng": -96.795817
	},
	{
		"lat": 46.801994,
		"lng": -96.795918
	},
	{
		"lat": 46.80207,
		"lng": -96.795945
	},
	{
		"lat": 46.802424,
		"lng": -96.795976
	},
	{
		"lat": 46.802885,
		"lng": -96.796138
	},
	{
		"lat": 46.803082,
		"lng": -96.796266
	},
	{
		"lat": 46.803135,
		"lng": -96.796352
	},
	{
		"lat": 46.803356,
		"lng": -96.796448
	},
	{
		"lat": 46.803434,
		"lng": -96.796525
	},
	{
		"lat": 46.803513,
		"lng": -96.796637
	},
	{
		"lat": 46.803712,
		"lng": -96.796755
	},
	{
		"lat": 46.803891,
		"lng": -96.796819
	},
	{
		"lat": 46.804168,
		"lng": -96.797198
	},
	{
		"lat": 46.80454,
		"lng": -96.797805
	},
	{
		"lat": 46.804635,
		"lng": -96.798127
	},
	{
		"lat": 46.804624,
		"lng": -96.798373
	},
	{
		"lat": 46.804551,
		"lng": -96.799386
	},
	{
		"lat": 46.804324,
		"lng": -96.800484
	},
	{
		"lat": 46.804232,
		"lng": -96.801181
	},
	{
		"lat": 46.804253,
		"lng": -96.801747
	},
	{
		"lat": 46.804321,
		"lng": -96.802141
	},
	{
		"lat": 46.804619,
		"lng": -96.802844
	},
	{
		"lat": 46.804758,
		"lng": -96.803077
	},
	{
		"lat": 46.805099,
		"lng": -96.803144
	},
	{
		"lat": 46.805533,
		"lng": -96.802845
	},
	{
		"lat": 46.805877,
		"lng": -96.802078
	},
	{
		"lat": 46.806128,
		"lng": -96.800178
	},
	{
		"lat": 46.806242,
		"lng": -96.798485
	},
	{
		"lat": 46.806539,
		"lng": -96.796819
	},
	{
		"lat": 46.806816,
		"lng": -96.79625
	},
	{
		"lat": 46.807066,
		"lng": -96.795853
	},
	{
		"lat": 46.807388,
		"lng": -96.795751
	},
	{
		"lat": 46.807795,
		"lng": -96.795756
	},
	{
		"lat": 46.808229,
		"lng": -96.795922
	},
	{
		"lat": 46.808707,
		"lng": -96.796485
	},
	{
		"lat": 46.809096,
		"lng": -96.797481
	},
	{
		"lat": 46.809761,
		"lng": -96.799514
	},
	{
		"lat": 46.810081,
		"lng": -96.80095
	},
	{
		"lat": 46.810405,
		"lng": -96.801453
	},
	{
		"lat": 46.810997,
		"lng": -96.802151
	},
	{
		"lat": 46.811314,
		"lng": -96.80241
	},
	{
		"lat": 46.811449,
		"lng": -96.802446
	},
	{
		"lat": 46.811521,
		"lng": -96.802544
	},
	{
		"lat": 46.811863,
		"lng": -96.802478
	},
	{
		"lat": 46.812206,
		"lng": -96.802281
	},
	{
		"lat": 46.812464,
		"lng": -96.802013
	},
	{
		"lat": 46.812464,
		"lng": -96.801896
	},
	{
		"lat": 46.812636,
		"lng": -96.80164
	},
	{
		"lat": 46.813052,
		"lng": -96.800984
	},
	{
		"lat": 46.8135,
		"lng": -96.80036
	},
	{
		"lat": 46.8147,
		"lng": -96.799688
	},
	{
		"lat": 46.815436,
		"lng": -96.799336
	},
	{
		"lat": 46.816332,
		"lng": -96.799512
	},
	{
		"lat": 46.816972,
		"lng": -96.799624
	},
	{
		"lat": 46.817628,
		"lng": -96.799912
	},
	{
		"lat": 46.817947,
		"lng": -96.799938
	},
	{
		"lat": 46.818294,
		"lng": -96.799965
	},
	{
		"lat": 46.818428,
		"lng": -96.799976
	},
	{
		"lat": 46.81886,
		"lng": -96.80004
	},
	{
		"lat": 46.819664,
		"lng": -96.80016
	},
	{
		"lat": 46.821789,
		"lng": -96.798469
	},
	{
		"lat": 46.821967,
		"lng": -96.798327
	},
	{
		"lat": 46.822364,
		"lng": -96.79796
	},
	{
		"lat": 46.823264,
		"lng": -96.792559
	},
	{
		"lat": 46.825764,
		"lng": -96.792959
	},
	{
		"lat": 46.826812,
		"lng": -96.792263
	},
	{
		"lat": 46.827864,
		"lng": -96.791559
	},
	{
		"lat": 46.827824,
		"lng": -96.791358
	},
	{
		"lat": 46.826336,
		"lng": -96.78386
	},
	{
		"lat": 46.825116,
		"lng": -96.782101
	},
	{
		"lat": 46.825127,
		"lng": -96.781845
	},
	{
		"lat": 46.824742,
		"lng": -96.781377
	},
	{
		"lat": 46.824765,
		"lng": -96.78134
	},
	{
		"lat": 46.824823,
		"lng": -96.781279
	},
	{
		"lat": 46.825763,
		"lng": -96.780271
	},
	{
		"lat": 46.828042,
		"lng": -96.782929
	},
	{
		"lat": 46.828149,
		"lng": -96.783122
	},
	{
		"lat": 46.828266,
		"lng": -96.783355
	},
	{
		"lat": 46.830276,
		"lng": -96.786901
	},
	{
		"lat": 46.832566,
		"lng": -96.792698
	},
	{
		"lat": 46.833051,
		"lng": -96.793925
	},
	{
		"lat": 46.833064,
		"lng": -96.793959
	},
	{
		"lat": 46.834364,
		"lng": -96.793159
	},
	{
		"lat": 46.834461,
		"lng": -96.792665
	},
	{
		"lat": 46.834303,
		"lng": -96.792651
	},
	{
		"lat": 46.834128,
		"lng": -96.79209
	},
	{
		"lat": 46.832618,
		"lng": -96.787234
	},
	{
		"lat": 46.833058,
		"lng": -96.78515
	},
	{
		"lat": 46.833402,
		"lng": -96.784907
	},
	{
		"lat": 46.833377,
		"lng": -96.784526
	},
	{
		"lat": 46.833418,
		"lng": -96.784747
	},
	{
		"lat": 46.833539,
		"lng": -96.784805
	},
	{
		"lat": 46.836167,
		"lng": -96.782898
	},
	{
		"lat": 46.836283,
		"lng": -96.782887
	},
	{
		"lat": 46.837063,
		"lng": -96.782759
	},
	{
		"lat": 46.837463,
		"lng": -96.783659
	},
	{
		"lat": 46.838763,
		"lng": -96.786759
	},
	{
		"lat": 46.8399,
		"lng": -96.787561
	},
	{
		"lat": 46.840463,
		"lng": -96.787959
	},
	{
		"lat": 46.841063,
		"lng": -96.787159
	},
	{
		"lat": 46.840963,
		"lng": -96.781959
	},
	{
		"lat": 46.839163,
		"lng": -96.778559
	},
	{
		"lat": 46.838918,
		"lng": -96.775949
	},
	{
		"lat": 46.838863,
		"lng": -96.775359
	},
	{
		"lat": 46.840363,
		"lng": -96.775059
	},
	{
		"lat": 46.842163,
		"lng": -96.776759
	},
	{
		"lat": 46.843663,
		"lng": -96.779659
	},
	{
		"lat": 46.845663,
		"lng": -96.781659
	},
	{
		"lat": 46.847263,
		"lng": -96.781259
	},
	{
		"lat": 46.84765,
		"lng": -96.780717
	},
	{
		"lat": 46.847763,
		"lng": -96.780559
	},
	{
		"lat": 46.8478,
		"lng": -96.780496
	},
	{
		"lat": 46.848663,
		"lng": -96.778959
	},
	{
		"lat": 46.849963,
		"lng": -96.773858
	},
	{
		"lat": 46.851463,
		"lng": -96.773158
	},
	{
		"lat": 46.851688,
		"lng": -96.773534
	},
	{
		"lat": 46.852363,
		"lng": -96.774658
	},
	{
		"lat": 46.852463,
		"lng": -96.776959
	},
	{
		"lat": 46.851163,
		"lng": -96.781359
	},
	{
		"lat": 46.851963,
		"lng": -96.784159
	},
	{
		"lat": 46.854267,
		"lng": -96.785255
	},
	{
		"lat": 46.854863,
		"lng": -96.785459
	},
	{
		"lat": 46.855763,
		"lng": -96.783859
	},
	{
		"lat": 46.853963,
		"lng": -96.778059
	},
	{
		"lat": 46.854463,
		"lng": -96.776058
	},
	{
		"lat": 46.857263,
		"lng": -96.777258
	},
	{
		"lat": 46.858564,
		"lng": -96.779157
	},
	{
		"lat": 46.858661,
		"lng": -96.779307
	},
	{
		"lat": 46.861663,
		"lng": -96.783959
	},
	{
		"lat": 46.863263,
		"lng": -96.783859
	},
	{
		"lat": 46.864463,
		"lng": -96.782958
	},
	{
		"lat": 46.864901,
		"lng": -96.782567
	},
	{
		"lat": 46.865979,
		"lng": -96.781605
	},
	{
		"lat": 46.866257,
		"lng": -96.781358
	},
	{
		"lat": 46.866255,
		"lng": -96.781318
	},
	{
		"lat": 46.866528,
		"lng": -96.781194
	},
	{
		"lat": 46.866862,
		"lng": -96.781043
	},
	{
		"lat": 46.867174,
		"lng": -96.780759
	},
	{
		"lat": 46.867179,
		"lng": -96.780689
	},
	{
		"lat": 46.868359,
		"lng": -96.780367
	},
	{
		"lat": 46.868527,
		"lng": -96.780457
	},
	{
		"lat": 46.868635,
		"lng": -96.780502
	},
	{
		"lat": 46.869451,
		"lng": -96.781363
	},
	{
		"lat": 46.869689,
		"lng": -96.782062
	},
	{
		"lat": 46.870809,
		"lng": -96.782259
	},
	{
		"lat": 46.87078,
		"lng": -96.782022
	},
	{
		"lat": 46.872164,
		"lng": -96.780477
	},
	{
		"lat": 46.872679,
		"lng": -96.779406
	},
	{
		"lat": 46.872719,
		"lng": -96.77931
	},
	{
		"lat": 46.873763,
		"lng": -96.776258
	},
	{
		"lat": 46.87386,
		"lng": -96.776208
	},
	{
		"lat": 46.874181,
		"lng": -96.775936
	},
	{
		"lat": 46.874281,
		"lng": -96.775853
	},
	{
		"lat": 46.874426,
		"lng": -96.775915
	},
	{
		"lat": 46.875037,
		"lng": -96.776408
	},
	{
		"lat": 46.875164,
		"lng": -96.776504
	},
	{
		"lat": 46.875957,
		"lng": -96.779241
	},
	{
		"lat": 46.876895,
		"lng": -96.78019
	},
	{
		"lat": 46.876953,
		"lng": -96.780247
	},
	{
		"lat": 46.877004,
		"lng": -96.780298
	},
	{
		"lat": 46.877039,
		"lng": -96.78019
	},
	{
		"lat": 46.879276,
		"lng": -96.781184
	},
	{
		"lat": 46.880066,
		"lng": -96.780212
	},
	{
		"lat": 46.879877,
		"lng": -96.779331
	},
	{
		"lat": 46.879299,
		"lng": -96.778449
	},
	{
		"lat": 46.879196,
		"lng": -96.77668
	},
	{
		"lat": 46.879168,
		"lng": -96.776201
	},
	{
		"lat": 46.879131,
		"lng": -96.775545
	},
	{
		"lat": 46.879129,
		"lng": -96.775518
	},
	{
		"lat": 46.879894,
		"lng": -96.774189
	},
	{
		"lat": 46.880042,
		"lng": -96.773934
	},
	{
		"lat": 46.880132,
		"lng": -96.773805
	},
	{
		"lat": 46.880333,
		"lng": -96.773518
	},
	{
		"lat": 46.881153,
		"lng": -96.772357
	},
	{
		"lat": 46.881063,
		"lng": -96.771658
	},
	{
		"lat": 46.879763,
		"lng": -96.771358
	},
	{
		"lat": 46.878256,
		"lng": -96.771991
	},
	{
		"lat": 46.877435,
		"lng": -96.771297
	},
	{
		"lat": 46.877509,
		"lng": -96.769779
	},
	{
		"lat": 46.878634,
		"lng": -96.769019
	},
	{
		"lat": 46.879508,
		"lng": -96.768429
	},
	{
		"lat": 46.883472,
		"lng": -96.76729
	},
	{
		"lat": 46.88362,
		"lng": -96.767231
	},
	{
		"lat": 46.884735,
		"lng": -96.767779
	},
	{
		"lat": 46.884743,
		"lng": -96.768058
	},
	{
		"lat": 46.884762,
		"lng": -96.769688
	},
	{
		"lat": 46.884763,
		"lng": -96.769758
	},
	{
		"lat": 46.884063,
		"lng": -96.771858
	},
	{
		"lat": 46.884763,
		"lng": -96.773558
	},
	{
		"lat": 46.886267,
		"lng": -96.773942
	},
	{
		"lat": 46.888663,
		"lng": -96.774658
	},
	{
		"lat": 46.889757,
		"lng": -96.774272
	},
	{
		"lat": 46.890363,
		"lng": -96.773158
	},
	{
		"lat": 46.890809,
		"lng": -96.772153
	},
	{
		"lat": 46.891963,
		"lng": -96.769558
	},
	{
		"lat": 46.893663,
		"lng": -96.770158
	},
	{
		"lat": 46.893863,
		"lng": -96.771258
	},
	{
		"lat": 46.893863,
		"lng": -96.773358
	},
	{
		"lat": 46.894063,
		"lng": -96.774858
	},
	{
		"lat": 46.894747,
		"lng": -96.775814
	},
	{
		"lat": 46.895619,
		"lng": -96.776713
	},
	{
		"lat": 46.897579,
		"lng": -96.776049
	},
	{
		"lat": 46.898074,
		"lng": -96.775525
	},
	{
		"lat": 46.898272,
		"lng": -96.775307
	},
	{
		"lat": 46.899363,
		"lng": -96.774758
	},
	{
		"lat": 46.900263,
		"lng": -96.770658
	},
	{
		"lat": 46.901763,
		"lng": -96.770758
	},
	{
		"lat": 46.902163,
		"lng": -96.771558
	},
	{
		"lat": 46.902297,
		"lng": -96.771749
	},
	{
		"lat": 46.903147,
		"lng": -96.772964
	},
	{
		"lat": 46.903563,
		"lng": -96.773558
	},
	{
		"lat": 46.904171,
		"lng": -96.77287
	},
	{
		"lat": 46.904443,
		"lng": -96.772694
	},
	{
		"lat": 46.906763,
		"lng": -96.770458
	},
	{
		"lat": 46.906331,
		"lng": -96.769782
	},
	{
		"lat": 46.905797,
		"lng": -96.768719
	},
	{
		"lat": 46.905163,
		"lng": -96.767458
	},
	{
		"lat": 46.904929,
		"lng": -96.766262
	},
	{
		"lat": 46.905012,
		"lng": -96.765658
	},
	{
		"lat": 46.90501,
		"lng": -96.765618
	},
	{
		"lat": 46.907157,
		"lng": -96.764601
	},
	{
		"lat": 46.907463,
		"lng": -96.764457
	},
	{
		"lat": 46.909456,
		"lng": -96.76354
	},
	{
		"lat": 46.912001,
		"lng": -96.763867
	},
	{
		"lat": 46.912001,
		"lng": -96.763904
	},
	{
		"lat": 46.912507,
		"lng": -96.763973
	},
	{
		"lat": 46.913005,
		"lng": -96.763822
	},
	{
		"lat": 46.915708,
		"lng": -96.759599
	},
	{
		"lat": 46.916931,
		"lng": -96.762209
	},
	{
		"lat": 46.918053,
		"lng": -96.762494
	},
	{
		"lat": 46.918054,
		"lng": -96.759941
	},
	{
		"lat": 46.913764,
		"lng": -96.755687
	},
	{
		"lat": 46.914665,
		"lng": -96.75343
	},
	{
		"lat": 46.915968,
		"lng": -96.755134
	},
	{
		"lat": 46.91597,
		"lng": -96.756143
	},
	{
		"lat": 46.919547,
		"lng": -96.761269
	},
	{
		"lat": 46.920063,
		"lng": -96.761757
	},
	{
		"lat": 46.923363,
		"lng": -96.763257
	},
	{
		"lat": 46.924363,
		"lng": -96.761357
	},
	{
		"lat": 46.922863,
		"lng": -96.756957
	},
	{
		"lat": 46.923063,
		"lng": -96.753757
	},
	{
		"lat": 46.924563,
		"lng": -96.753257
	},
	{
		"lat": 46.926363,
		"lng": -96.763557
	},
	{
		"lat": 46.927563,
		"lng": -96.765257
	},
	{
		"lat": 46.928139,
		"lng": -96.765189
	},
	{
		"lat": 46.929063,
		"lng": -96.765057
	},
	{
		"lat": 46.929463,
		"lng": -96.762557
	},
	{
		"lat": 46.927763,
		"lng": -96.759057
	},
	{
		"lat": 46.928463,
		"lng": -96.756857
	},
	{
		"lat": 46.929549,
		"lng": -96.75714
	},
	{
		"lat": 46.930763,
		"lng": -96.757457
	},
	{
		"lat": 46.932163,
		"lng": -96.761257
	},
	{
		"lat": 46.934663,
		"lng": -96.761757
	},
	{
		"lat": 46.935063,
		"lng": -96.763257
	},
	{
		"lat": 46.933863,
		"lng": -96.765457
	},
	{
		"lat": 46.930863,
		"lng": -96.775157
	},
	{
		"lat": 46.928363,
		"lng": -96.775157
	},
	{
		"lat": 46.926958,
		"lng": -96.77621
	},
	{
		"lat": 46.926363,
		"lng": -96.776657
	},
	{
		"lat": 46.926063,
		"lng": -96.777958
	},
	{
		"lat": 46.928062,
		"lng": -96.778557
	},
	{
		"lat": 46.928262,
		"lng": -96.780259
	},
	{
		"lat": 46.928052,
		"lng": -96.780463
	},
	{
		"lat": 46.924663,
		"lng": -96.783757
	},
	{
		"lat": 46.924965,
		"lng": -96.785759
	},
	{
		"lat": 46.929163,
		"lng": -96.785058
	},
	{
		"lat": 46.929917,
		"lng": -96.785735
	},
	{
		"lat": 46.930163,
		"lng": -96.785956
	},
	{
		"lat": 46.930165,
		"lng": -96.787658
	},
	{
		"lat": 46.927965,
		"lng": -96.789158
	},
	{
		"lat": 46.927364,
		"lng": -96.790458
	},
	{
		"lat": 46.927675,
		"lng": -96.790825
	},
	{
		"lat": 46.928465,
		"lng": -96.791758
	},
	{
		"lat": 46.929073,
		"lng": -96.791737
	},
	{
		"lat": 46.929943,
		"lng": -96.791707
	},
	{
		"lat": 46.930929,
		"lng": -96.791673
	},
	{
		"lat": 46.931784,
		"lng": -96.791538
	},
	{
		"lat": 46.932821,
		"lng": -96.791376
	},
	{
		"lat": 46.933862,
		"lng": -96.791213
	},
	{
		"lat": 46.934255,
		"lng": -96.791293
	},
	{
		"lat": 46.93529,
		"lng": -96.791105
	},
	{
		"lat": 46.935449,
		"lng": -96.791035
	},
	{
		"lat": 46.935569,
		"lng": -96.790982
	},
	{
		"lat": 46.936336,
		"lng": -96.790644
	},
	{
		"lat": 46.936526,
		"lng": -96.79056
	},
	{
		"lat": 46.936552,
		"lng": -96.790549
	},
	{
		"lat": 46.937355,
		"lng": -96.790194
	},
	{
		"lat": 46.9374,
		"lng": -96.790174
	},
	{
		"lat": 46.937682,
		"lng": -96.79005
	},
	{
		"lat": 46.938025,
		"lng": -96.790319
	},
	{
		"lat": 46.938295,
		"lng": -96.790515
	},
	{
		"lat": 46.940564,
		"lng": -96.792158
	},
	{
		"lat": 46.941059,
		"lng": -96.792083
	},
	{
		"lat": 46.941287,
		"lng": -96.792047
	},
	{
		"lat": 46.944466,
		"lng": -96.791558
	},
	{
		"lat": 46.946764,
		"lng": -96.792656
	},
	{
		"lat": 46.946964,
		"lng": -96.795358
	},
	{
		"lat": 46.944563,
		"lng": -96.798061
	},
	{
		"lat": 46.945867,
		"lng": -96.80173
	},
	{
		"lat": 46.946012,
		"lng": -96.802183
	},
	{
		"lat": 46.946332,
		"lng": -96.802855
	},
	{
		"lat": 46.946605,
		"lng": -96.803526
	},
	{
		"lat": 46.946893,
		"lng": -96.803943
	},
	{
		"lat": 46.947149,
		"lng": -96.804262
	},
	{
		"lat": 46.947468,
		"lng": -96.804662
	},
	{
		"lat": 46.947548,
		"lng": -96.804662
	},
	{
		"lat": 46.948564,
		"lng": -96.802758
	},
	{
		"lat": 46.948684,
		"lng": -96.801766
	},
	{
		"lat": 46.948435,
		"lng": -96.800948
	},
	{
		"lat": 46.948545,
		"lng": -96.800327
	},
	{
		"lat": 46.948587,
		"lng": -96.80022
	},
	{
		"lat": 46.948789,
		"lng": -96.799706
	},
	{
		"lat": 46.949215,
		"lng": -96.799156
	},
	{
		"lat": 46.949613,
		"lng": -96.798856
	},
	{
		"lat": 46.950273,
		"lng": -96.798685
	},
	{
		"lat": 46.951214,
		"lng": -96.798593
	},
	{
		"lat": 46.951974,
		"lng": -96.798674
	},
	{
		"lat": 46.952028,
		"lng": -96.798678
	},
	{
		"lat": 46.952684,
		"lng": -96.79879
	},
	{
		"lat": 46.952988,
		"lng": -96.798758
	},
	{
		"lat": 46.953756,
		"lng": -96.799094
	},
	{
		"lat": 46.954316,
		"lng": -96.799606
	},
	{
		"lat": 46.954844,
		"lng": -96.800454
	},
	{
		"lat": 46.955244,
		"lng": -96.801126
	},
	{
		"lat": 46.955548,
		"lng": -96.80151
	},
	{
		"lat": 46.955596,
		"lng": -96.80159
	},
	{
		"lat": 46.955772,
		"lng": -96.80215
	},
	{
		"lat": 46.95598,
		"lng": -96.802534
	},
	{
		"lat": 46.95646,
		"lng": -96.803078
	},
	{
		"lat": 46.956652,
		"lng": -96.803302
	},
	{
		"lat": 46.95678,
		"lng": -96.80343
	},
	{
		"lat": 46.957068,
		"lng": -96.803622
	},
	{
		"lat": 46.957404,
		"lng": -96.803686
	},
	{
		"lat": 46.95782,
		"lng": -96.80375
	},
	{
		"lat": 46.958172,
		"lng": -96.80375
	},
	{
		"lat": 46.958428,
		"lng": -96.803494
	},
	{
		"lat": 46.958492,
		"lng": -96.803014
	},
	{
		"lat": 46.95878,
		"lng": -96.801702
	},
	{
		"lat": 46.958908,
		"lng": -96.80119
	},
	{
		"lat": 46.959068,
		"lng": -96.800646
	},
	{
		"lat": 46.959228,
		"lng": -96.79991
	},
	{
		"lat": 46.959724,
		"lng": -96.799206
	},
	{
		"lat": 46.960108,
		"lng": -96.798918
	},
	{
		"lat": 46.9603,
		"lng": -96.79879
	},
	{
		"lat": 46.960444,
		"lng": -96.798758
	},
	{
		"lat": 46.960636,
		"lng": -96.798694
	},
	{
		"lat": 46.960988,
		"lng": -96.798486
	},
	{
		"lat": 46.961372,
		"lng": -96.798342
	},
	{
		"lat": 46.961884,
		"lng": -96.798214
	},
	{
		"lat": 46.962204,
		"lng": -96.798053
	},
	{
		"lat": 46.962508,
		"lng": -96.797797
	},
	{
		"lat": 46.96302,
		"lng": -96.797285
	},
	{
		"lat": 46.963313,
		"lng": -96.796887
	},
	{
		"lat": 46.963749,
		"lng": -96.796388
	},
	{
		"lat": 46.96426,
		"lng": -96.795693
	},
	{
		"lat": 46.964987,
		"lng": -96.795201
	},
	{
		"lat": 46.965433,
		"lng": -96.794993
	},
	{
		"lat": 46.965838,
		"lng": -96.795045
	},
	{
		"lat": 46.96614,
		"lng": -96.795391
	},
	{
		"lat": 46.966442,
		"lng": -96.79622
	},
	{
		"lat": 46.966841,
		"lng": -96.79708
	},
	{
		"lat": 46.967478,
		"lng": -96.798272
	},
	{
		"lat": 46.967398,
		"lng": -96.7984
	},
	{
		"lat": 46.967774,
		"lng": -96.799049
	},
	{
		"lat": 46.96787,
		"lng": -96.799215
	},
	{
		"lat": 46.968075,
		"lng": -96.799615
	},
	{
		"lat": 46.968323,
		"lng": -96.800683
	},
	{
		"lat": 46.968353,
		"lng": -96.801209
	},
	{
		"lat": 46.968287,
		"lng": -96.80159
	},
	{
		"lat": 46.96795,
		"lng": -96.801971
	},
	{
		"lat": 46.967519,
		"lng": -96.80216
	},
	{
		"lat": 46.966945,
		"lng": -96.802268
	},
	{
		"lat": 46.966467,
		"lng": -96.802153
	},
	{
		"lat": 46.96596,
		"lng": -96.801817
	},
	{
		"lat": 46.965564,
		"lng": -96.80148
	},
	{
		"lat": 46.965231,
		"lng": -96.801191
	},
	{
		"lat": 46.964817,
		"lng": -96.801093
	},
	{
		"lat": 46.964434,
		"lng": -96.801313
	},
	{
		"lat": 46.964209,
		"lng": -96.801599
	},
	{
		"lat": 46.964128,
		"lng": -96.801981
	},
	{
		"lat": 46.964204,
		"lng": -96.802459
	},
	{
		"lat": 46.964518,
		"lng": -96.80313
	},
	{
		"lat": 46.965337,
		"lng": -96.803739
	},
	{
		"lat": 46.965597,
		"lng": -96.803932
	},
	{
		"lat": 46.96628,
		"lng": -96.804287
	},
	{
		"lat": 46.966868,
		"lng": -96.804513
	},
	{
		"lat": 46.967295,
		"lng": -96.804819
	},
	{
		"lat": 46.967672,
		"lng": -96.805792
	},
	{
		"lat": 46.967669,
		"lng": -96.806254
	},
	{
		"lat": 46.967636,
		"lng": -96.806524
	},
	{
		"lat": 46.967555,
		"lng": -96.806651
	},
	{
		"lat": 46.967345,
		"lng": -96.806912
	},
	{
		"lat": 46.967299,
		"lng": -96.806969
	},
	{
		"lat": 46.96685,
		"lng": -96.807131
	},
	{
		"lat": 46.966208,
		"lng": -96.807357
	},
	{
		"lat": 46.965566,
		"lng": -96.807422
	},
	{
		"lat": 46.964988,
		"lng": -96.807567
	},
	{
		"lat": 46.964636,
		"lng": -96.807601
	},
	{
		"lat": 46.964347,
		"lng": -96.807987
	},
	{
		"lat": 46.964075,
		"lng": -96.808437
	},
	{
		"lat": 46.963914,
		"lng": -96.808935
	},
	{
		"lat": 46.963835,
		"lng": -96.809786
	},
	{
		"lat": 46.964159,
		"lng": -96.811133
	},
	{
		"lat": 46.964609,
		"lng": -96.81216
	},
	{
		"lat": 46.964867,
		"lng": -96.8124
	},
	{
		"lat": 46.965317,
		"lng": -96.812785
	},
	{
		"lat": 46.965832,
		"lng": -96.813072
	},
	{
		"lat": 46.966152,
		"lng": -96.81328
	},
	{
		"lat": 46.966602,
		"lng": -96.81405
	},
	{
		"lat": 46.966958,
		"lng": -96.815575
	},
	{
		"lat": 46.967042,
		"lng": -96.817485
	},
	{
		"lat": 46.967077,
		"lng": -96.818608
	},
	{
		"lat": 46.967415,
		"lng": -96.819555
	},
	{
		"lat": 46.967977,
		"lng": -96.820307
	},
	{
		"lat": 46.969184,
		"lng": -96.82159
	},
	{
		"lat": 46.97002,
		"lng": -96.822664
	},
	{
		"lat": 46.970566,
		"lng": -96.823065
	},
	{
		"lat": 46.970839,
		"lng": -96.823224
	},
	{
		"lat": 46.971241,
		"lng": -96.823272
	},
	{
		"lat": 46.971482,
		"lng": -96.823175
	},
	{
		"lat": 46.971849,
		"lng": -96.822628
	},
	{
		"lat": 46.972136,
		"lng": -96.822099
	},
	{
		"lat": 46.972424,
		"lng": -96.821681
	},
	{
		"lat": 46.972595,
		"lng": -96.821561
	},
	{
		"lat": 46.972841,
		"lng": -96.821391
	},
	{
		"lat": 46.973435,
		"lng": -96.821325
	},
	{
		"lat": 46.974236,
		"lng": -96.821293
	},
	{
		"lat": 46.974813,
		"lng": -96.821148
	},
	{
		"lat": 46.975504,
		"lng": -96.820953
	},
	{
		"lat": 46.975967,
		"lng": -96.820487
	},
	{
		"lat": 46.976352,
		"lng": -96.820166
	},
	{
		"lat": 46.976818,
		"lng": -96.820037
	},
	{
		"lat": 46.977344,
		"lng": -96.819875
	},
	{
		"lat": 46.978305,
		"lng": -96.819907
	},
	{
		"lat": 46.979378,
		"lng": -96.820113
	},
	{
		"lat": 46.980388,
		"lng": -96.820433
	},
	{
		"lat": 46.981462,
		"lng": -96.8208
	},
	{
		"lat": 46.982229,
		"lng": -96.821263
	},
	{
		"lat": 46.982966,
		"lng": -96.821391
	},
	{
		"lat": 46.983767,
		"lng": -96.82171
	},
	{
		"lat": 46.985017,
		"lng": -96.822029
	},
	{
		"lat": 46.985529,
		"lng": -96.822348
	},
	{
		"lat": 46.985914,
		"lng": -96.822604
	},
	{
		"lat": 46.98617,
		"lng": -96.82286
	},
	{
		"lat": 46.986298,
		"lng": -96.823069
	},
	{
		"lat": 46.986635,
		"lng": -96.82382
	},
	{
		"lat": 46.987133,
		"lng": -96.82542
	},
	{
		"lat": 46.987485,
		"lng": -96.826156
	},
	{
		"lat": 46.987662,
		"lng": -96.826284
	},
	{
		"lat": 46.987918,
		"lng": -96.82638
	},
	{
		"lat": 46.988446,
		"lng": -96.826348
	},
	{
		"lat": 46.988767,
		"lng": -96.826027
	},
	{
		"lat": 46.989118,
		"lng": -96.825002
	},
	{
		"lat": 46.989215,
		"lng": -96.823882
	},
	{
		"lat": 46.989311,
		"lng": -96.823465
	},
	{
		"lat": 46.989774,
		"lng": -96.822921
	},
	{
		"lat": 46.990142,
		"lng": -96.822536
	},
	{
		"lat": 46.990591,
		"lng": -96.822345
	},
	{
		"lat": 46.990944,
		"lng": -96.822376
	},
	{
		"lat": 46.991265,
		"lng": -96.822489
	},
	{
		"lat": 46.991258,
		"lng": -96.822518
	},
	{
		"lat": 46.991501,
		"lng": -96.822694
	},
	{
		"lat": 46.991821,
		"lng": -96.82311
	},
	{
		"lat": 46.992173,
		"lng": -96.823558
	},
	{
		"lat": 46.992541,
		"lng": -96.824054
	},
	{
		"lat": 46.992957,
		"lng": -96.824438
	},
	{
		"lat": 46.993309,
		"lng": -96.824598
	},
	{
		"lat": 46.994349,
		"lng": -96.824534
	},
	{
		"lat": 46.995165,
		"lng": -96.824502
	},
	{
		"lat": 46.996173,
		"lng": -96.82447
	},
	{
		"lat": 46.996909,
		"lng": -96.82423
	},
	{
		"lat": 46.997437,
		"lng": -96.823926
	},
	{
		"lat": 46.997693,
		"lng": -96.823526
	},
	{
		"lat": 46.997821,
		"lng": -96.822902
	},
	{
		"lat": 46.997821,
		"lng": -96.822294
	},
	{
		"lat": 46.997693,
		"lng": -96.821654
	},
	{
		"lat": 46.997389,
		"lng": -96.820918
	},
	{
		"lat": 46.997181,
		"lng": -96.820454
	},
	{
		"lat": 46.997229,
		"lng": -96.81991
	},
	{
		"lat": 46.997373,
		"lng": -96.819478
	},
	{
		"lat": 46.997725,
		"lng": -96.819366
	},
	{
		"lat": 46.998221,
		"lng": -96.819382
	},
	{
		"lat": 46.998413,
		"lng": -96.819478
	},
	{
		"lat": 46.998685,
		"lng": -96.819926
	},
	{
		"lat": 46.998973,
		"lng": -96.820886
	},
	{
		"lat": 46.999261,
		"lng": -96.82223
	},
	{
		"lat": 46.999965,
		"lng": -96.822982
	},
	{
		"lat": 46.999965,
		"lng": -96.82318
	},
	{
		"lat": 47.00033,
		"lng": -96.823313
	},
	{
		"lat": 47.000404,
		"lng": -96.823322
	},
	{
		"lat": 47.000881,
		"lng": -96.82338
	},
	{
		"lat": 47.00136,
		"lng": -96.823013
	},
	{
		"lat": 47.00184,
		"lng": -96.822512
	},
	{
		"lat": 47.002823,
		"lng": -96.821076
	},
	{
		"lat": 47.003006,
		"lng": -96.820943
	},
	{
		"lat": 47.003326,
		"lng": -96.820976
	},
	{
		"lat": 47.003486,
		"lng": -96.821076
	},
	{
		"lat": 47.003645,
		"lng": -96.821344
	},
	{
		"lat": 47.003897,
		"lng": -96.822145
	},
	{
		"lat": 47.003668,
		"lng": -96.823181
	},
	{
		"lat": 47.003394,
		"lng": -96.823648
	},
	{
		"lat": 47.002503,
		"lng": -96.82495
	},
	{
		"lat": 47.001726,
		"lng": -96.826353
	},
	{
		"lat": 47.001588,
		"lng": -96.826821
	},
	{
		"lat": 47.001611,
		"lng": -96.827489
	},
	{
		"lat": 47.001885,
		"lng": -96.827956
	},
	{
		"lat": 47.002274,
		"lng": -96.82819
	},
	{
		"lat": 47.003165,
		"lng": -96.828157
	},
	{
		"lat": 47.003439,
		"lng": -96.828057
	},
	{
		"lat": 47.004285,
		"lng": -96.828124
	},
	{
		"lat": 47.004627,
		"lng": -96.828258
	},
	{
		"lat": 47.005061,
		"lng": -96.828792
	},
	{
		"lat": 47.00529,
		"lng": -96.82936
	},
	{
		"lat": 47.005358,
		"lng": -96.829794
	},
	{
		"lat": 47.005267,
		"lng": -96.830228
	},
	{
		"lat": 47.004353,
		"lng": -96.831798
	},
	{
		"lat": 47.004147,
		"lng": -96.832399
	},
	{
		"lat": 47.00417,
		"lng": -96.832967
	},
	{
		"lat": 47.004421,
		"lng": -96.833334
	},
	{
		"lat": 47.004741,
		"lng": -96.833602
	},
	{
		"lat": 47.005106,
		"lng": -96.833769
	},
	{
		"lat": 47.006477,
		"lng": -96.833769
	},
	{
		"lat": 47.00682,
		"lng": -96.833903
	},
	{
		"lat": 47.007048,
		"lng": -96.834337
	},
	{
		"lat": 47.007254,
		"lng": -96.834839
	},
	{
		"lat": 47.007185,
		"lng": -96.835406
	},
	{
		"lat": 47.006842,
		"lng": -96.836375
	},
	{
		"lat": 47.006408,
		"lng": -96.837143
	},
	{
		"lat": 47.006065,
		"lng": -96.838111
	},
	{
		"lat": 47.006088,
		"lng": -96.838679
	},
	{
		"lat": 47.006248,
		"lng": -96.839114
	},
	{
		"lat": 47.006546,
		"lng": -96.839448
	},
	{
		"lat": 47.006728,
		"lng": -96.839548
	},
	{
		"lat": 47.007162,
		"lng": -96.839515
	},
	{
		"lat": 47.007482,
		"lng": -96.839248
	},
	{
		"lat": 47.008031,
		"lng": -96.838814
	},
	{
		"lat": 47.008808,
		"lng": -96.837712
	},
	{
		"lat": 47.009356,
		"lng": -96.836343
	},
	{
		"lat": 47.00979,
		"lng": -96.833971
	},
	{
		"lat": 47.01011,
		"lng": -96.833504
	},
	{
		"lat": 47.010407,
		"lng": -96.83337
	},
	{
		"lat": 47.010979,
		"lng": -96.833404
	},
	{
		"lat": 47.011436,
		"lng": -96.833537
	},
	{
		"lat": 47.011481,
		"lng": -96.833638
	},
	{
		"lat": 47.011664,
		"lng": -96.833671
	},
	{
		"lat": 47.012144,
		"lng": -96.834005
	},
	{
		"lat": 47.012762,
		"lng": -96.833939
	},
	{
		"lat": 47.014339,
		"lng": -96.832503
	},
	{
		"lat": 47.015184,
		"lng": -96.832303
	},
	{
		"lat": 47.01539,
		"lng": -96.832403
	},
	{
		"lat": 47.016029,
		"lng": -96.833038
	},
	{
		"lat": 47.016715,
		"lng": -96.834408
	},
	{
		"lat": 47.017012,
		"lng": -96.834742
	},
	{
		"lat": 47.017446,
		"lng": -96.834776
	},
	{
		"lat": 47.017697,
		"lng": -96.834375
	},
	{
		"lat": 47.017949,
		"lng": -96.833707
	},
	{
		"lat": 47.018315,
		"lng": -96.831302
	},
	{
		"lat": 47.01852,
		"lng": -96.830968
	},
	{
		"lat": 47.018817,
		"lng": -96.8307
	},
	{
		"lat": 47.018909,
		"lng": -96.830634
	},
	{
		"lat": 47.020586,
		"lng": -96.830138
	},
	{
		"lat": 47.020944,
		"lng": -96.830039
	},
	{
		"lat": 47.021246,
		"lng": -96.829777
	},
	{
		"lat": 47.02155,
		"lng": -96.829516
	},
	{
		"lat": 47.022396,
		"lng": -96.828294
	},
	{
		"lat": 47.022564,
		"lng": -96.827862
	},
	{
		"lat": 47.022611,
		"lng": -96.827801
	},
	{
		"lat": 47.022901,
		"lng": -96.827386
	},
	{
		"lat": 47.023223,
		"lng": -96.826367
	},
	{
		"lat": 47.023365,
		"lng": -96.825523
	},
	{
		"lat": 47.023464,
		"lng": -96.824353
	},
	{
		"lat": 47.023652,
		"lng": -96.82345
	},
	{
		"lat": 47.024119,
		"lng": -96.822048
	},
	{
		"lat": 47.024402,
		"lng": -96.820947
	},
	{
		"lat": 47.024502,
		"lng": -96.819609
	},
	{
		"lat": 47.024192,
		"lng": -96.818169
	},
	{
		"lat": 47.023766,
		"lng": -96.816862
	},
	{
		"lat": 47.023765,
		"lng": -96.81685
	},
	{
		"lat": 47.023703,
		"lng": -96.816225
	},
	{
		"lat": 47.023754,
		"lng": -96.815456
	},
	{
		"lat": 47.023871,
		"lng": -96.81529
	},
	{
		"lat": 47.024401,
		"lng": -96.814793
	},
	{
		"lat": 47.024813,
		"lng": -96.814729
	},
	{
		"lat": 47.025087,
		"lng": -96.814799
	},
	{
		"lat": 47.025155,
		"lng": -96.814867
	},
	{
		"lat": 47.025247,
		"lng": -96.8149
	},
	{
		"lat": 47.025813,
		"lng": -96.815541
	},
	{
		"lat": 47.027169,
		"lng": -96.817425
	},
	{
		"lat": 47.02769,
		"lng": -96.817998
	},
	{
		"lat": 47.02785,
		"lng": -96.818066
	},
	{
		"lat": 47.028236,
		"lng": -96.818337
	},
	{
		"lat": 47.028441,
		"lng": -96.818439
	},
	{
		"lat": 47.0286,
		"lng": -96.818541
	},
	{
		"lat": 47.028805,
		"lng": -96.818677
	},
	{
		"lat": 47.029397,
		"lng": -96.819183
	},
	{
		"lat": 47.030347,
		"lng": -96.820462
	},
	{
		"lat": 47.030526,
		"lng": -96.820831
	},
	{
		"lat": 47.030638,
		"lng": -96.821233
	},
	{
		"lat": 47.030678,
		"lng": -96.821769
	},
	{
		"lat": 47.030574,
		"lng": -96.823307
	},
	{
		"lat": 47.030055,
		"lng": -96.825143
	},
	{
		"lat": 47.030071,
		"lng": -96.826012
	},
	{
		"lat": 47.030206,
		"lng": -96.826382
	},
	{
		"lat": 47.030658,
		"lng": -96.826955
	},
	{
		"lat": 47.03093,
		"lng": -96.827225
	},
	{
		"lat": 47.031272,
		"lng": -96.827327
	},
	{
		"lat": 47.032095,
		"lng": -96.827268
	},
	{
		"lat": 47.03267,
		"lng": -96.826904
	},
	{
		"lat": 47.032948,
		"lng": -96.826572
	},
	{
		"lat": 47.033624,
		"lng": -96.824905
	},
	{
		"lat": 47.033747,
		"lng": -96.824036
	},
	{
		"lat": 47.033754,
		"lng": -96.823301
	},
	{
		"lat": 47.033646,
		"lng": -96.822429
	},
	{
		"lat": 47.033321,
		"lng": -96.820353
	},
	{
		"lat": 47.033105,
		"lng": -96.81878
	},
	{
		"lat": 47.03316,
		"lng": -96.817676
	},
	{
		"lat": 47.033325,
		"lng": -96.817142
	},
	{
		"lat": 47.033788,
		"lng": -96.816343
	},
	{
		"lat": 47.034389,
		"lng": -96.81568
	},
	{
		"lat": 47.034573,
		"lng": -96.815648
	},
	{
		"lat": 47.034583,
		"lng": -96.815639
	},
	{
		"lat": 47.034982,
		"lng": -96.81525
	},
	{
		"lat": 47.037772,
		"lng": -96.812991
	},
	{
		"lat": 47.038271,
		"lng": -96.812726
	},
	{
		"lat": 47.038634,
		"lng": -96.812659
	},
	{
		"lat": 47.038951,
		"lng": -96.812758
	},
	{
		"lat": 47.039246,
		"lng": -96.813023
	},
	{
		"lat": 47.039723,
		"lng": -96.813787
	},
	{
		"lat": 47.039883,
		"lng": -96.814385
	},
	{
		"lat": 47.03977,
		"lng": -96.815646
	},
	{
		"lat": 47.039633,
		"lng": -96.816077
	},
	{
		"lat": 47.038908,
		"lng": -96.817173
	},
	{
		"lat": 47.038704,
		"lng": -96.817239
	},
	{
		"lat": 47.037933,
		"lng": -96.817903
	},
	{
		"lat": 47.036731,
		"lng": -96.818435
	},
	{
		"lat": 47.036232,
		"lng": -96.818833
	},
	{
		"lat": 47.035847,
		"lng": -96.819464
	},
	{
		"lat": 47.035597,
		"lng": -96.820394
	},
	{
		"lat": 47.03571,
		"lng": -96.82119
	},
	{
		"lat": 47.035802,
		"lng": -96.821488
	},
	{
		"lat": 47.036256,
		"lng": -96.822053
	},
	{
		"lat": 47.036937,
		"lng": -96.822716
	},
	{
		"lat": 47.037663,
		"lng": -96.822848
	},
	{
		"lat": 47.038252,
		"lng": -96.822749
	},
	{
		"lat": 47.038865,
		"lng": -96.822549
	},
	{
		"lat": 47.042122,
		"lng": -96.820156
	},
	{
		"lat": 47.045285,
		"lng": -96.817834
	},
	{
		"lat": 47.045852,
		"lng": -96.817601
	},
	{
		"lat": 47.046419,
		"lng": -96.817633
	},
	{
		"lat": 47.047077,
		"lng": -96.817865
	},
	{
		"lat": 47.047372,
		"lng": -96.818198
	},
	{
		"lat": 47.047554,
		"lng": -96.818596
	},
	{
		"lat": 47.047668,
		"lng": -96.819392
	},
	{
		"lat": 47.047577,
		"lng": -96.820455
	},
	{
		"lat": 47.047147,
		"lng": -96.821783
	},
	{
		"lat": 47.04649,
		"lng": -96.823244
	},
	{
		"lat": 47.046218,
		"lng": -96.824704
	},
	{
		"lat": 47.045561,
		"lng": -96.825601
	},
	{
		"lat": 47.045243,
		"lng": -96.826398
	},
	{
		"lat": 47.045244,
		"lng": -96.826862
	},
	{
		"lat": 47.045561,
		"lng": -96.827459
	},
	{
		"lat": 47.045675,
		"lng": -96.827559
	},
	{
		"lat": 47.046332,
		"lng": -96.827559
	},
	{
		"lat": 47.046627,
		"lng": -96.82726
	},
	{
		"lat": 47.046854,
		"lng": -96.826829
	},
	{
		"lat": 47.046945,
		"lng": -96.826563
	},
	{
		"lat": 47.047146,
		"lng": -96.825184
	},
	{
		"lat": 47.047509,
		"lng": -96.823702
	},
	{
		"lat": 47.048033,
		"lng": -96.82249
	},
	{
		"lat": 47.048763,
		"lng": -96.821007
	},
	{
		"lat": 47.049264,
		"lng": -96.819963
	},
	{
		"lat": 47.049493,
		"lng": -96.819559
	},
	{
		"lat": 47.050064,
		"lng": -96.818716
	},
	{
		"lat": 47.051118,
		"lng": -96.817737
	},
	{
		"lat": 47.051231,
		"lng": -96.817723
	},
	{
		"lat": 47.051393,
		"lng": -96.817703
	},
	{
		"lat": 47.0516,
		"lng": -96.817571
	},
	{
		"lat": 47.052309,
		"lng": -96.817708
	},
	{
		"lat": 47.053082,
		"lng": -96.818685
	},
	{
		"lat": 47.053762,
		"lng": -96.819928
	},
	{
		"lat": 47.054506,
		"lng": -96.821975
	},
	{
		"lat": 47.054909,
		"lng": -96.823552
	},
	{
		"lat": 47.055314,
		"lng": -96.824727
	},
	{
		"lat": 47.055564,
		"lng": -96.825063
	},
	{
		"lat": 47.055724,
		"lng": -96.825098
	},
	{
		"lat": 47.056456,
		"lng": -96.825102
	},
	{
		"lat": 47.05658,
		"lng": -96.824984
	},
	{
		"lat": 47.057055,
		"lng": -96.824536
	},
	{
		"lat": 47.057425,
		"lng": -96.823935
	},
	{
		"lat": 47.058123,
		"lng": -96.821862
	},
	{
		"lat": 47.058239,
		"lng": -96.821695
	},
	{
		"lat": 47.058674,
		"lng": -96.821563
	},
	{
		"lat": 47.059017,
		"lng": -96.821632
	},
	{
		"lat": 47.059177,
		"lng": -96.8217
	},
	{
		"lat": 47.05954,
		"lng": -96.822238
	},
	{
		"lat": 47.059674,
		"lng": -96.823043
	},
	{
		"lat": 47.059506,
		"lng": -96.824348
	},
	{
		"lat": 47.059106,
		"lng": -96.826323
	},
	{
		"lat": 47.059122,
		"lng": -96.827428
	},
	{
		"lat": 47.059412,
		"lng": -96.82887
	},
	{
		"lat": 47.05966,
		"lng": -96.829575
	},
	{
		"lat": 47.060046,
		"lng": -96.830147
	},
	{
		"lat": 47.060252,
		"lng": -96.830283
	},
	{
		"lat": 47.060823,
		"lng": -96.830386
	},
	{
		"lat": 47.060961,
		"lng": -96.830287
	},
	{
		"lat": 47.061307,
		"lng": -96.829887
	},
	{
		"lat": 47.061607,
		"lng": -96.82942
	},
	{
		"lat": 47.061933,
		"lng": -96.82845
	},
	{
		"lat": 47.062077,
		"lng": -96.827177
	},
	{
		"lat": 47.061856,
		"lng": -96.825936
	},
	{
		"lat": 47.061337,
		"lng": -96.824393
	},
	{
		"lat": 47.060957,
		"lng": -96.822883
	},
	{
		"lat": 47.060847,
		"lng": -96.822213
	},
	{
		"lat": 47.060921,
		"lng": -96.82094
	},
	{
		"lat": 47.061177,
		"lng": -96.820238
	},
	{
		"lat": 47.061522,
		"lng": -96.819804
	},
	{
		"lat": 47.061729,
		"lng": -96.819739
	},
	{
		"lat": 47.062073,
		"lng": -96.819774
	},
	{
		"lat": 47.062347,
		"lng": -96.819876
	},
	{
		"lat": 47.06275,
		"lng": -96.820208
	},
	{
		"lat": 47.062758,
		"lng": -96.820214
	},
	{
		"lat": 47.062904,
		"lng": -96.8204
	},
	{
		"lat": 47.063132,
		"lng": -96.820432
	},
	{
		"lat": 47.063821,
		"lng": -96.821571
	},
	{
		"lat": 47.06392,
		"lng": -96.821697
	},
	{
		"lat": 47.064104,
		"lng": -96.821734
	},
	{
		"lat": 47.064084,
		"lng": -96.821832
	},
	{
		"lat": 47.064107,
		"lng": -96.821899
	},
	{
		"lat": 47.065195,
		"lng": -96.823032
	},
	{
		"lat": 47.065422,
		"lng": -96.823232
	},
	{
		"lat": 47.065581,
		"lng": -96.823266
	},
	{
		"lat": 47.065627,
		"lng": -96.823333
	},
	{
		"lat": 47.065808,
		"lng": -96.823366
	},
	{
		"lat": 47.065967,
		"lng": -96.8235
	},
	{
		"lat": 47.066786,
		"lng": -96.823435
	},
	{
		"lat": 47.067308,
		"lng": -96.823337
	},
	{
		"lat": 47.068946,
		"lng": -96.823241
	},
	{
		"lat": 47.069696,
		"lng": -96.823476
	},
	{
		"lat": 47.070422,
		"lng": -96.82391
	},
	{
		"lat": 47.070467,
		"lng": -96.823977
	},
	{
		"lat": 47.070649,
		"lng": -96.82401
	},
	{
		"lat": 47.070853,
		"lng": -96.824277
	},
	{
		"lat": 47.071057,
		"lng": -96.824377
	},
	{
		"lat": 47.071534,
		"lng": -96.824546
	},
	{
		"lat": 47.072035,
		"lng": -96.824513
	},
	{
		"lat": 47.072377,
		"lng": -96.824115
	},
	{
		"lat": 47.072515,
		"lng": -96.823516
	},
	{
		"lat": 47.072746,
		"lng": -96.82162
	},
	{
		"lat": 47.073135,
		"lng": -96.820723
	},
	{
		"lat": 47.073478,
		"lng": -96.820224
	},
	{
		"lat": 47.073955,
		"lng": -96.819859
	},
	{
		"lat": 47.074365,
		"lng": -96.819627
	},
	{
		"lat": 47.075342,
		"lng": -96.81963
	},
	{
		"lat": 47.075728,
		"lng": -96.82023
	},
	{
		"lat": 47.07609,
		"lng": -96.82093
	},
	{
		"lat": 47.076292,
		"lng": -96.821861
	},
	{
		"lat": 47.076199,
		"lng": -96.822826
	},
	{
		"lat": 47.075947,
		"lng": -96.823691
	},
	{
		"lat": 47.075764,
		"lng": -96.824057
	},
	{
		"lat": 47.075171,
		"lng": -96.824821
	},
	{
		"lat": 47.074419,
		"lng": -96.825451
	},
	{
		"lat": 47.074306,
		"lng": -96.825451
	},
	{
		"lat": 47.074191,
		"lng": -96.82555
	},
	{
		"lat": 47.073168,
		"lng": -96.82598
	},
	{
		"lat": 47.072781,
		"lng": -96.826378
	},
	{
		"lat": 47.072598,
		"lng": -96.826778
	},
	{
		"lat": 47.072596,
		"lng": -96.827376
	},
	{
		"lat": 47.07289,
		"lng": -96.828076
	},
	{
		"lat": 47.073434,
		"lng": -96.828842
	},
	{
		"lat": 47.07391,
		"lng": -96.829276
	},
	{
		"lat": 47.074421,
		"lng": -96.829278
	},
	{
		"lat": 47.07462,
		"lng": -96.829276
	},
	{
		"lat": 47.074806,
		"lng": -96.829103
	},
	{
		"lat": 47.075502,
		"lng": -96.828003
	},
	{
		"lat": 47.076497,
		"lng": -96.826147
	},
	{
		"lat": 47.076955,
		"lng": -96.8245
	},
	{
		"lat": 47.077253,
		"lng": -96.823094
	},
	{
		"lat": 47.077573,
		"lng": -96.822098
	},
	{
		"lat": 47.077919,
		"lng": -96.821204
	},
	{
		"lat": 47.078212,
		"lng": -96.819215
	},
	{
		"lat": 47.078455,
		"lng": -96.816713
	},
	{
		"lat": 47.078662,
		"lng": -96.816129
	},
	{
		"lat": 47.078987,
		"lng": -96.815751
	},
	{
		"lat": 47.079409,
		"lng": -96.815645
	},
	{
		"lat": 47.079877,
		"lng": -96.815712
	},
	{
		"lat": 47.080064,
		"lng": -96.815778
	},
	{
		"lat": 47.080608,
		"lng": -96.816563
	},
	{
		"lat": 47.081013,
		"lng": -96.817897
	},
	{
		"lat": 47.081253,
		"lng": -96.818786
	},
	{
		"lat": 47.081819,
		"lng": -96.819538
	},
	{
		"lat": 47.082242,
		"lng": -96.819946
	},
	{
		"lat": 47.08283,
		"lng": -96.820285
	},
	{
		"lat": 47.083041,
		"lng": -96.820386
	},
	{
		"lat": 47.08379,
		"lng": -96.820382
	},
	{
		"lat": 47.084256,
		"lng": -96.820139
	},
	{
		"lat": 47.084653,
		"lng": -96.819795
	},
	{
		"lat": 47.085071,
		"lng": -96.819176
	},
	{
		"lat": 47.086135,
		"lng": -96.817113
	},
	{
		"lat": 47.086808,
		"lng": -96.816184
	},
	{
		"lat": 47.087344,
		"lng": -96.815735
	},
	{
		"lat": 47.087648,
		"lng": -96.815562
	},
	{
		"lat": 47.087906,
		"lng": -96.815527
	},
	{
		"lat": 47.087998,
		"lng": -96.815775
	},
	{
		"lat": 47.088466,
		"lng": -96.815973
	},
	{
		"lat": 47.088776,
		"lng": -96.816449
	},
	{
		"lat": 47.089357,
		"lng": -96.81845
	},
	{
		"lat": 47.089625,
		"lng": -96.818925
	},
	{
		"lat": 47.089739,
		"lng": -96.819492
	},
	{
		"lat": 47.089669,
		"lng": -96.820749
	},
	{
		"lat": 47.089474,
		"lng": -96.821691
	},
	{
		"lat": 47.089017,
		"lng": -96.822881
	},
	{
		"lat": 47.088389,
		"lng": -96.824148
	},
	{
		"lat": 47.088136,
		"lng": -96.824897
	},
	{
		"lat": 47.088149,
		"lng": -96.825275
	},
	{
		"lat": 47.088269,
		"lng": -96.825688
	},
	{
		"lat": 47.088663,
		"lng": -96.826292
	},
	{
		"lat": 47.08892,
		"lng": -96.826363
	},
	{
		"lat": 47.08963,
		"lng": -96.826316
	},
	{
		"lat": 47.08985,
		"lng": -96.82613
	},
	{
		"lat": 47.090252,
		"lng": -96.825385
	},
	{
		"lat": 47.090472,
		"lng": -96.824196
	},
	{
		"lat": 47.090776,
		"lng": -96.821183
	},
	{
		"lat": 47.091121,
		"lng": -96.819179
	},
	{
		"lat": 47.091405,
		"lng": -96.817989
	},
	{
		"lat": 47.091805,
		"lng": -96.817463
	},
	{
		"lat": 47.092088,
		"lng": -96.817251
	},
	{
		"lat": 47.092501,
		"lng": -96.817069
	},
	{
		"lat": 47.09271,
		"lng": -96.817091
	},
	{
		"lat": 47.092924,
		"lng": -96.817108
	},
	{
		"lat": 47.094006,
		"lng": -96.817586
	},
	{
		"lat": 47.095089,
		"lng": -96.817693
	},
	{
		"lat": 47.096129,
		"lng": -96.81756
	},
	{
		"lat": 47.09717,
		"lng": -96.817128
	},
	{
		"lat": 47.097198,
		"lng": -96.817211
	},
	{
		"lat": 47.097857,
		"lng": -96.81722
	},
	{
		"lat": 47.09806,
		"lng": -96.81729
	},
	{
		"lat": 47.098284,
		"lng": -96.817493
	},
	{
		"lat": 47.098597,
		"lng": -96.817929
	},
	{
		"lat": 47.099312,
		"lng": -96.820466
	},
	{
		"lat": 47.099557,
		"lng": -96.820801
	},
	{
		"lat": 47.099759,
		"lng": -96.821004
	},
	{
		"lat": 47.099962,
		"lng": -96.821073
	},
	{
		"lat": 47.100894,
		"lng": -96.82102
	},
	{
		"lat": 47.101443,
		"lng": -96.820552
	},
	{
		"lat": 47.102402,
		"lng": -96.819447
	},
	{
		"lat": 47.102928,
		"lng": -96.818444
	},
	{
		"lat": 47.103613,
		"lng": -96.816804
	},
	{
		"lat": 47.104139,
		"lng": -96.815934
	},
	{
		"lat": 47.104525,
		"lng": -96.815736
	},
	{
		"lat": 47.104662,
		"lng": -96.815659
	},
	{
		"lat": 47.105494,
		"lng": -96.815763
	},
	{
		"lat": 47.10615,
		"lng": -96.816041
	},
	{
		"lat": 47.107122,
		"lng": -96.816208
	},
	{
		"lat": 47.108481,
		"lng": -96.816191
	},
	{
		"lat": 47.108507,
		"lng": -96.816319
	},
	{
		"lat": 47.108984,
		"lng": -96.816589
	},
	{
		"lat": 47.10912,
		"lng": -96.816823
	},
	{
		"lat": 47.109118,
		"lng": -96.817223
	},
	{
		"lat": 47.10898,
		"lng": -96.817557
	},
	{
		"lat": 47.108728,
		"lng": -96.817856
	},
	{
		"lat": 47.108427,
		"lng": -96.818353
	},
	{
		"lat": 47.108407,
		"lng": -96.818388
	},
	{
		"lat": 47.108037,
		"lng": -96.819521
	},
	{
		"lat": 47.107991,
		"lng": -96.819821
	},
	{
		"lat": 47.107989,
		"lng": -96.820255
	},
	{
		"lat": 47.108236,
		"lng": -96.821058
	},
	{
		"lat": 47.108507,
		"lng": -96.82156
	},
	{
		"lat": 47.108892,
		"lng": -96.822095
	},
	{
		"lat": 47.109391,
		"lng": -96.822498
	},
	{
		"lat": 47.109664,
		"lng": -96.822666
	},
	{
		"lat": 47.110553,
		"lng": -96.822669
	},
	{
		"lat": 47.111717,
		"lng": -96.822174
	},
	{
		"lat": 47.112265,
		"lng": -96.821776
	},
	{
		"lat": 47.112815,
		"lng": -96.821311
	},
	{
		"lat": 47.113751,
		"lng": -96.820614
	},
	{
		"lat": 47.114572,
		"lng": -96.820585
	},
	{
		"lat": 47.115754,
		"lng": -96.821192
	},
	{
		"lat": 47.116934,
		"lng": -96.822364
	},
	{
		"lat": 47.117499,
		"lng": -96.823301
	},
	{
		"lat": 47.11777,
		"lng": -96.824037
	},
	{
		"lat": 47.118173,
		"lng": -96.825575
	},
	{
		"lat": 47.11851,
		"lng": -96.826578
	},
	{
		"lat": 47.119197,
		"lng": -96.827204
	},
	{
		"lat": 47.119638,
		"lng": -96.827306
	},
	{
		"lat": 47.119649,
		"lng": -96.827416
	},
	{
		"lat": 47.120221,
		"lng": -96.827717
	},
	{
		"lat": 47.120769,
		"lng": -96.828387
	},
	{
		"lat": 47.120906,
		"lng": -96.828956
	},
	{
		"lat": 47.120427,
		"lng": -96.831502
	},
	{
		"lat": 47.120404,
		"lng": -96.833076
	},
	{
		"lat": 47.120678,
		"lng": -96.834415
	},
	{
		"lat": 47.121477,
		"lng": -96.83676
	},
	{
		"lat": 47.12198,
		"lng": -96.837564
	},
	{
		"lat": 47.122597,
		"lng": -96.837531
	},
	{
		"lat": 47.123215,
		"lng": -96.836962
	},
	{
		"lat": 47.123443,
		"lng": -96.836661
	},
	{
		"lat": 47.123626,
		"lng": -96.835957
	},
	{
		"lat": 47.123764,
		"lng": -96.834919
	},
	{
		"lat": 47.12365,
		"lng": -96.833646
	},
	{
		"lat": 47.123421,
		"lng": -96.832406
	},
	{
		"lat": 47.122827,
		"lng": -96.829861
	},
	{
		"lat": 47.122736,
		"lng": -96.828924
	},
	{
		"lat": 47.12285,
		"lng": -96.826712
	},
	{
		"lat": 47.123101,
		"lng": -96.825809
	},
	{
		"lat": 47.123353,
		"lng": -96.82544
	},
	{
		"lat": 47.123856,
		"lng": -96.825072
	},
	{
		"lat": 47.12429,
		"lng": -96.824871
	},
	{
		"lat": 47.124968,
		"lng": -96.824807
	},
	{
		"lat": 47.1265,
		"lng": -96.824773
	},
	{
		"lat": 47.127183,
		"lng": -96.824471
	},
	{
		"lat": 47.127615,
		"lng": -96.824136
	},
	{
		"lat": 47.128299,
		"lng": -96.823199
	},
	{
		"lat": 47.128661,
		"lng": -96.822597
	},
	{
		"lat": 47.129343,
		"lng": -96.821159
	},
	{
		"lat": 47.129707,
		"lng": -96.820857
	},
	{
		"lat": 47.130049,
		"lng": -96.820689
	},
	{
		"lat": 47.130369,
		"lng": -96.820723
	},
	{
		"lat": 47.130667,
		"lng": -96.821157
	},
	{
		"lat": 47.130851,
		"lng": -96.821858
	},
	{
		"lat": 47.13067,
		"lng": -96.82256
	},
	{
		"lat": 47.130284,
		"lng": -96.823397
	},
	{
		"lat": 47.129374,
		"lng": -96.824701
	},
	{
		"lat": 47.129009,
		"lng": -96.825404
	},
	{
		"lat": 47.128668,
		"lng": -96.826373
	},
	{
		"lat": 47.12851,
		"lng": -96.827276
	},
	{
		"lat": 47.128513,
		"lng": -96.82838
	},
	{
		"lat": 47.128719,
		"lng": -96.829248
	},
	{
		"lat": 47.128834,
		"lng": -96.829649
	},
	{
		"lat": 47.129224,
		"lng": -96.830417
	},
	{
		"lat": 47.12968,
		"lng": -96.83075
	},
	{
		"lat": 47.129931,
		"lng": -96.830884
	},
	{
		"lat": 47.130638,
		"lng": -96.830815
	},
	{
		"lat": 47.131162,
		"lng": -96.830581
	},
	{
		"lat": 47.131595,
		"lng": -96.830247
	},
	{
		"lat": 47.131823,
		"lng": -96.829979
	},
	{
		"lat": 47.132255,
		"lng": -96.829143
	},
	{
		"lat": 47.132914,
		"lng": -96.827604
	},
	{
		"lat": 47.1333,
		"lng": -96.827001
	},
	{
		"lat": 47.133871,
		"lng": -96.826466
	},
	{
		"lat": 47.13412,
		"lng": -96.826366
	},
	{
		"lat": 47.134941,
		"lng": -96.82633
	},
	{
		"lat": 47.135672,
		"lng": -96.826697
	},
	{
		"lat": 47.135775,
		"lng": -96.826782
	},
	{
		"lat": 47.136769,
		"lng": -96.827598
	},
	{
		"lat": 47.137157,
		"lng": -96.827798
	},
	{
		"lat": 47.137865,
		"lng": -96.828063
	},
	{
		"lat": 47.138253,
		"lng": -96.828131
	},
	{
		"lat": 47.138251,
		"lng": -96.82816
	},
	{
		"lat": 47.138606,
		"lng": -96.828253
	},
	{
		"lat": 47.138935,
		"lng": -96.828277
	},
	{
		"lat": 47.139836,
		"lng": -96.828562
	},
	{
		"lat": 47.14022,
		"lng": -96.828826
	},
	{
		"lat": 47.140316,
		"lng": -96.828926
	},
	{
		"lat": 47.140555,
		"lng": -96.829057
	},
	{
		"lat": 47.140941,
		"lng": -96.829458
	},
	{
		"lat": 47.14148,
		"lng": -96.8302
	},
	{
		"lat": 47.14157,
		"lng": -96.830594
	},
	{
		"lat": 47.141611,
		"lng": -96.83068
	},
	{
		"lat": 47.141657,
		"lng": -96.830822
	},
	{
		"lat": 47.14169,
		"lng": -96.830972
	},
	{
		"lat": 47.14173,
		"lng": -96.831118
	},
	{
		"lat": 47.14174,
		"lng": -96.831168
	},
	{
		"lat": 47.141764,
		"lng": -96.831374
	},
	{
		"lat": 47.141774,
		"lng": -96.831424
	},
	{
		"lat": 47.141802,
		"lng": -96.83163
	},
	{
		"lat": 47.141856,
		"lng": -96.832095
	},
	{
		"lat": 47.141909,
		"lng": -96.832613
	},
	{
		"lat": 47.14193,
		"lng": -96.832713
	},
	{
		"lat": 47.141936,
		"lng": -96.832765
	},
	{
		"lat": 47.141957,
		"lng": -96.832865
	},
	{
		"lat": 47.141975,
		"lng": -96.83302
	},
	{
		"lat": 47.142012,
		"lng": -96.833167
	},
	{
		"lat": 47.142073,
		"lng": -96.833357
	},
	{
		"lat": 47.142091,
		"lng": -96.833403
	},
	{
		"lat": 47.142192,
		"lng": -96.833619
	},
	{
		"lat": 47.142239,
		"lng": -96.833698
	},
	{
		"lat": 47.142494,
		"lng": -96.834068
	},
	{
		"lat": 47.14255,
		"lng": -96.834135
	},
	{
		"lat": 47.142638,
		"lng": -96.834226
	},
	{
		"lat": 47.142701,
		"lng": -96.834276
	},
	{
		"lat": 47.142731,
		"lng": -96.834306
	},
	{
		"lat": 47.142891,
		"lng": -96.834426
	},
	{
		"lat": 47.142924,
		"lng": -96.834445
	},
	{
		"lat": 47.143134,
		"lng": -96.834519
	},
	{
		"lat": 47.143419,
		"lng": -96.834588
	},
	{
		"lat": 47.143633,
		"lng": -96.834628
	},
	{
		"lat": 47.143777,
		"lng": -96.834642
	},
	{
		"lat": 47.143886,
		"lng": -96.834636
	},
	{
		"lat": 47.143958,
		"lng": -96.834626
	},
	{
		"lat": 47.144028,
		"lng": -96.834602
	},
	{
		"lat": 47.144095,
		"lng": -96.834563
	},
	{
		"lat": 47.14416,
		"lng": -96.834518
	},
	{
		"lat": 47.144311,
		"lng": -96.834376
	},
	{
		"lat": 47.144395,
		"lng": -96.834276
	},
	{
		"lat": 47.144448,
		"lng": -96.834205
	},
	{
		"lat": 47.144593,
		"lng": -96.833973
	},
	{
		"lat": 47.144636,
		"lng": -96.833888
	},
	{
		"lat": 47.144673,
		"lng": -96.833799
	},
	{
		"lat": 47.144697,
		"lng": -96.83376
	},
	{
		"lat": 47.144744,
		"lng": -96.833618
	},
	{
		"lat": 47.144782,
		"lng": -96.833529
	},
	{
		"lat": 47.144795,
		"lng": -96.83348
	},
	{
		"lat": 47.144829,
		"lng": -96.833388
	},
	{
		"lat": 47.144912,
		"lng": -96.833042
	},
	{
		"lat": 47.144985,
		"lng": -96.832693
	},
	{
		"lat": 47.14503,
		"lng": -96.832332
	},
	{
		"lat": 47.14505,
		"lng": -96.832125
	},
	{
		"lat": 47.145076,
		"lng": -96.83192
	},
	{
		"lat": 47.145085,
		"lng": -96.831763
	},
	{
		"lat": 47.145092,
		"lng": -96.831346
	},
	{
		"lat": 47.145098,
		"lng": -96.831241
	},
	{
		"lat": 47.145127,
		"lng": -96.830302
	},
	{
		"lat": 47.14516,
		"lng": -96.829833
	},
	{
		"lat": 47.14523,
		"lng": -96.82932
	},
	{
		"lat": 47.14529,
		"lng": -96.829073
	},
	{
		"lat": 47.145309,
		"lng": -96.829029
	},
	{
		"lat": 47.145407,
		"lng": -96.828876
	},
	{
		"lat": 47.145463,
		"lng": -96.82881
	},
	{
		"lat": 47.145525,
		"lng": -96.828755
	},
	{
		"lat": 47.145557,
		"lng": -96.828734
	},
	{
		"lat": 47.145626,
		"lng": -96.828703
	},
	{
		"lat": 47.145727,
		"lng": -96.828647
	},
	{
		"lat": 47.145906,
		"lng": -96.828613
	},
	{
		"lat": 47.146157,
		"lng": -96.828608
	},
	{
		"lat": 47.14623,
		"lng": -96.828613
	},
	{
		"lat": 47.146419,
		"lng": -96.828648
	},
	{
		"lat": 47.14652,
		"lng": -96.828704
	},
	{
		"lat": 47.146649,
		"lng": -96.828797
	},
	{
		"lat": 47.14674,
		"lng": -96.828881
	},
	{
		"lat": 47.147056,
		"lng": -96.829228
	},
	{
		"lat": 47.147385,
		"lng": -96.829636
	},
	{
		"lat": 47.147599,
		"lng": -96.829918
	},
	{
		"lat": 47.147807,
		"lng": -96.830206
	},
	{
		"lat": 47.148023,
		"lng": -96.830485
	},
	{
		"lat": 47.148256,
		"lng": -96.830732
	},
	{
		"lat": 47.148471,
		"lng": -96.830923
	},
	{
		"lat": 47.148661,
		"lng": -96.831071
	},
	{
		"lat": 47.14869,
		"lng": -96.831102
	},
	{
		"lat": 47.148819,
		"lng": -96.831195
	},
	{
		"lat": 47.148955,
		"lng": -96.831267
	},
	{
		"lat": 47.149021,
		"lng": -96.831311
	},
	{
		"lat": 47.149148,
		"lng": -96.83141
	},
	{
		"lat": 47.149208,
		"lng": -96.831468
	},
	{
		"lat": 47.149303,
		"lng": -96.831544
	},
	{
		"lat": 47.149363,
		"lng": -96.831601
	},
	{
		"lat": 47.149447,
		"lng": -96.8317
	},
	{
		"lat": 47.149575,
		"lng": -96.831884
	},
	{
		"lat": 47.149646,
		"lng": -96.832003
	},
	{
		"lat": 47.149687,
		"lng": -96.83209
	},
	{
		"lat": 47.149741,
		"lng": -96.832226
	},
	{
		"lat": 47.149787,
		"lng": -96.832368
	},
	{
		"lat": 47.149827,
		"lng": -96.832513
	},
	{
		"lat": 47.149842,
		"lng": -96.832669
	},
	{
		"lat": 47.149827,
		"lng": -96.83293
	},
	{
		"lat": 47.149801,
		"lng": -96.833082
	},
	{
		"lat": 47.14974,
		"lng": -96.833271
	},
	{
		"lat": 47.14972,
		"lng": -96.833315
	},
	{
		"lat": 47.149488,
		"lng": -96.833716
	},
	{
		"lat": 47.149245,
		"lng": -96.834104
	},
	{
		"lat": 47.149032,
		"lng": -96.834459
	},
	{
		"lat": 47.1489,
		"lng": -96.834707
	},
	{
		"lat": 47.14886,
		"lng": -96.834794
	},
	{
		"lat": 47.148837,
		"lng": -96.834834
	},
	{
		"lat": 47.148736,
		"lng": -96.83505
	},
	{
		"lat": 47.148651,
		"lng": -96.83528
	},
	{
		"lat": 47.148637,
		"lng": -96.835328
	},
	{
		"lat": 47.148628,
		"lng": -96.835378
	},
	{
		"lat": 47.148556,
		"lng": -96.835673
	},
	{
		"lat": 47.148516,
		"lng": -96.835928
	},
	{
		"lat": 47.1485,
		"lng": -96.836083
	},
	{
		"lat": 47.148504,
		"lng": -96.836293
	},
	{
		"lat": 47.148518,
		"lng": -96.836501
	},
	{
		"lat": 47.148547,
		"lng": -96.836706
	},
	{
		"lat": 47.1486,
		"lng": -96.836956
	},
	{
		"lat": 47.148618,
		"lng": -96.837001
	},
	{
		"lat": 47.148643,
		"lng": -96.837099
	},
	{
		"lat": 47.148663,
		"lng": -96.837143
	},
	{
		"lat": 47.148693,
		"lng": -96.837238
	},
	{
		"lat": 47.148811,
		"lng": -96.8375
	},
	{
		"lat": 47.148903,
		"lng": -96.837662
	},
	{
		"lat": 47.149121,
		"lng": -96.83801
	},
	{
		"lat": 47.14917,
		"lng": -96.838088
	},
	{
		"lat": 47.149518,
		"lng": -96.838619
	},
	{
		"lat": 47.149738,
		"lng": -96.838966
	},
	{
		"lat": 47.149856,
		"lng": -96.839163
	},
	{
		"lat": 47.150107,
		"lng": -96.839609
	},
	{
		"lat": 47.150417,
		"lng": -96.840046
	},
	{
		"lat": 47.150475,
		"lng": -96.840122
	},
	{
		"lat": 47.150711,
		"lng": -96.840431
	},
	{
		"lat": 47.150803,
		"lng": -96.840564
	},
	{
		"lat": 47.150853,
		"lng": -96.840607
	},
	{
		"lat": 47.150887,
		"lng": -96.840651
	},
	{
		"lat": 47.150907,
		"lng": -96.840677
	},
	{
		"lat": 47.150965,
		"lng": -96.840738
	},
	{
		"lat": 47.151209,
		"lng": -96.840959
	},
	{
		"lat": 47.151275,
		"lng": -96.840999
	},
	{
		"lat": 47.151337,
		"lng": -96.841053
	},
	{
		"lat": 47.151401,
		"lng": -96.841101
	},
	{
		"lat": 47.151536,
		"lng": -96.841176
	},
	{
		"lat": 47.151641,
		"lng": -96.841216
	},
	{
		"lat": 47.151712,
		"lng": -96.84123
	},
	{
		"lat": 47.151856,
		"lng": -96.841247
	},
	{
		"lat": 47.152,
		"lng": -96.841238
	},
	{
		"lat": 47.152105,
		"lng": -96.841199
	},
	{
		"lat": 47.152203,
		"lng": -96.841135
	},
	{
		"lat": 47.152322,
		"lng": -96.841016
	},
	{
		"lat": 47.152401,
		"lng": -96.840909
	},
	{
		"lat": 47.152524,
		"lng": -96.840719
	},
	{
		"lat": 47.152558,
		"lng": -96.840627
	},
	{
		"lat": 47.15262,
		"lng": -96.840381
	},
	{
		"lat": 47.152677,
		"lng": -96.840078
	},
	{
		"lat": 47.152728,
		"lng": -96.839508
	},
	{
		"lat": 47.152746,
		"lng": -96.838671
	},
	{
		"lat": 47.152752,
		"lng": -96.838149
	},
	{
		"lat": 47.152757,
		"lng": -96.837992
	},
	{
		"lat": 47.152768,
		"lng": -96.837836
	},
	{
		"lat": 47.152783,
		"lng": -96.837733
	},
	{
		"lat": 47.152806,
		"lng": -96.837474
	},
	{
		"lat": 47.152837,
		"lng": -96.83727
	},
	{
		"lat": 47.152878,
		"lng": -96.837069
	},
	{
		"lat": 47.152962,
		"lng": -96.83678
	},
	{
		"lat": 47.153023,
		"lng": -96.83665
	},
	{
		"lat": 47.153046,
		"lng": -96.836611
	},
	{
		"lat": 47.153123,
		"lng": -96.836501
	},
	{
		"lat": 47.15326,
		"lng": -96.836331
	},
	{
		"lat": 47.153318,
		"lng": -96.83627
	},
	{
		"lat": 47.153385,
		"lng": -96.83623
	},
	{
		"lat": 47.153454,
		"lng": -96.836197
	},
	{
		"lat": 47.153486,
		"lng": -96.836173
	},
	{
		"lat": 47.153555,
		"lng": -96.836145
	},
	{
		"lat": 47.153626,
		"lng": -96.836129
	},
	{
		"lat": 47.153698,
		"lng": -96.836121
	},
	{
		"lat": 47.15377,
		"lng": -96.83612
	},
	{
		"lat": 47.153986,
		"lng": -96.836138
	},
	{
		"lat": 47.154128,
		"lng": -96.836176
	},
	{
		"lat": 47.154337,
		"lng": -96.836257
	},
	{
		"lat": 47.154611,
		"lng": -96.836388
	},
	{
		"lat": 47.154852,
		"lng": -96.836496
	},
	{
		"lat": 47.155198,
		"lng": -96.836639
	},
	{
		"lat": 47.155541,
		"lng": -96.836799
	},
	{
		"lat": 47.155681,
		"lng": -96.836851
	},
	{
		"lat": 47.155787,
		"lng": -96.836881
	},
	{
		"lat": 47.15593,
		"lng": -96.836907
	},
	{
		"lat": 47.156002,
		"lng": -96.836906
	},
	{
		"lat": 47.156146,
		"lng": -96.836887
	},
	{
		"lat": 47.156228,
		"lng": -96.836827
	},
	{
		"lat": 47.156352,
		"lng": -96.83672
	},
	{
		"lat": 47.156408,
		"lng": -96.836655
	},
	{
		"lat": 47.156536,
		"lng": -96.836471
	},
	{
		"lat": 47.156583,
		"lng": -96.836391
	},
	{
		"lat": 47.156648,
		"lng": -96.836205
	},
	{
		"lat": 47.156664,
		"lng": -96.836102
	},
	{
		"lat": 47.156669,
		"lng": -96.835998
	},
	{
		"lat": 47.156662,
		"lng": -96.835894
	},
	{
		"lat": 47.156632,
		"lng": -96.835633
	},
	{
		"lat": 47.156636,
		"lng": -96.835582
	},
	{
		"lat": 47.156617,
		"lng": -96.83548
	},
	{
		"lat": 47.156561,
		"lng": -96.835177
	},
	{
		"lat": 47.156521,
		"lng": -96.835032
	},
	{
		"lat": 47.156476,
		"lng": -96.834889
	},
	{
		"lat": 47.15639,
		"lng": -96.83472
	},
	{
		"lat": 47.155954,
		"lng": -96.834022
	},
	{
		"lat": 47.155735,
		"lng": -96.833607
	},
	{
		"lat": 47.155696,
		"lng": -96.833518
	},
	{
		"lat": 47.155601,
		"lng": -96.833361
	},
	{
		"lat": 47.155493,
		"lng": -96.833151
	},
	{
		"lat": 47.155474,
		"lng": -96.833107
	},
	{
		"lat": 47.155442,
		"lng": -96.833013
	},
	{
		"lat": 47.155365,
		"lng": -96.832836
	},
	{
		"lat": 47.155297,
		"lng": -96.832652
	},
	{
		"lat": 47.155255,
		"lng": -96.832508
	},
	{
		"lat": 47.155191,
		"lng": -96.832321
	},
	{
		"lat": 47.155157,
		"lng": -96.832173
	},
	{
		"lat": 47.155124,
		"lng": -96.83208
	},
	{
		"lat": 47.155044,
		"lng": -96.831788
	},
	{
		"lat": 47.154989,
		"lng": -96.831485
	},
	{
		"lat": 47.154897,
		"lng": -96.830926
	},
	{
		"lat": 47.154862,
		"lng": -96.83067
	},
	{
		"lat": 47.154844,
		"lng": -96.830569
	},
	{
		"lat": 47.154806,
		"lng": -96.830259
	},
	{
		"lat": 47.154748,
		"lng": -96.82948
	},
	{
		"lat": 47.154725,
		"lng": -96.829063
	},
	{
		"lat": 47.154703,
		"lng": -96.828803
	},
	{
		"lat": 47.154667,
		"lng": -96.828493
	},
	{
		"lat": 47.154654,
		"lng": -96.828337
	},
	{
		"lat": 47.154643,
		"lng": -96.828129
	},
	{
		"lat": 47.154639,
		"lng": -96.827868
	},
	{
		"lat": 47.154647,
		"lng": -96.827659
	},
	{
		"lat": 47.154653,
		"lng": -96.827241
	},
	{
		"lat": 47.154666,
		"lng": -96.826771
	},
	{
		"lat": 47.154676,
		"lng": -96.826667
	},
	{
		"lat": 47.154687,
		"lng": -96.826617
	},
	{
		"lat": 47.154764,
		"lng": -96.825684
	},
	{
		"lat": 47.154781,
		"lng": -96.825583
	},
	{
		"lat": 47.15479,
		"lng": -96.825479
	},
	{
		"lat": 47.154812,
		"lng": -96.825379
	},
	{
		"lat": 47.154805,
		"lng": -96.82533
	},
	{
		"lat": 47.15483,
		"lng": -96.825241
	},
	{
		"lat": 47.154897,
		"lng": -96.824945
	},
	{
		"lat": 47.154912,
		"lng": -96.824897
	},
	{
		"lat": 47.154935,
		"lng": -96.824798
	},
	{
		"lat": 47.154964,
		"lng": -96.824703
	},
	{
		"lat": 47.155046,
		"lng": -96.824472
	},
	{
		"lat": 47.1551,
		"lng": -96.82428
	},
	{
		"lat": 47.155149,
		"lng": -96.824141
	},
	{
		"lat": 47.155189,
		"lng": -96.824055
	},
	{
		"lat": 47.155202,
		"lng": -96.824007
	},
	{
		"lat": 47.155243,
		"lng": -96.823921
	},
	{
		"lat": 47.155353,
		"lng": -96.823653
	},
	{
		"lat": 47.155416,
		"lng": -96.823464
	},
	{
		"lat": 47.155471,
		"lng": -96.82333
	},
	{
		"lat": 47.155552,
		"lng": -96.823157
	},
	{
		"lat": 47.155598,
		"lng": -96.823077
	},
	{
		"lat": 47.155705,
		"lng": -96.822938
	},
	{
		"lat": 47.155735,
		"lng": -96.822907
	},
	{
		"lat": 47.155787,
		"lng": -96.822836
	},
	{
		"lat": 47.1559,
		"lng": -96.822706
	},
	{
		"lat": 47.15596,
		"lng": -96.822648
	},
	{
		"lat": 47.156149,
		"lng": -96.8225
	},
	{
		"lat": 47.156278,
		"lng": -96.822409
	},
	{
		"lat": 47.156341,
		"lng": -96.822359
	},
	{
		"lat": 47.156616,
		"lng": -96.822234
	},
	{
		"lat": 47.156757,
		"lng": -96.822192
	},
	{
		"lat": 47.1569,
		"lng": -96.822166
	},
	{
		"lat": 47.157044,
		"lng": -96.822168
	},
	{
		"lat": 47.157152,
		"lng": -96.822176
	},
	{
		"lat": 47.157258,
		"lng": -96.822211
	},
	{
		"lat": 47.157499,
		"lng": -96.822315
	},
	{
		"lat": 47.157563,
		"lng": -96.822363
	},
	{
		"lat": 47.157597,
		"lng": -96.822382
	},
	{
		"lat": 47.157659,
		"lng": -96.822434
	},
	{
		"lat": 47.157745,
		"lng": -96.82253
	},
	{
		"lat": 47.157824,
		"lng": -96.822636
	},
	{
		"lat": 47.158047,
		"lng": -96.82298
	},
	{
		"lat": 47.158135,
		"lng": -96.823145
	},
	{
		"lat": 47.15821,
		"lng": -96.823324
	},
	{
		"lat": 47.158302,
		"lng": -96.823609
	},
	{
		"lat": 47.158327,
		"lng": -96.823707
	},
	{
		"lat": 47.158385,
		"lng": -96.823899
	},
	{
		"lat": 47.158449,
		"lng": -96.824143
	},
	{
		"lat": 47.158495,
		"lng": -96.824285
	},
	{
		"lat": 47.158529,
		"lng": -96.824434
	},
	{
		"lat": 47.158561,
		"lng": -96.824529
	},
	{
		"lat": 47.158597,
		"lng": -96.824731
	},
	{
		"lat": 47.158607,
		"lng": -96.825044
	},
	{
		"lat": 47.158611,
		"lng": -96.825358
	},
	{
		"lat": 47.158583,
		"lng": -96.825933
	},
	{
		"lat": 47.158533,
		"lng": -96.826398
	},
	{
		"lat": 47.158484,
		"lng": -96.826758
	},
	{
		"lat": 47.158382,
		"lng": -96.827793
	},
	{
		"lat": 47.158307,
		"lng": -96.828306
	},
	{
		"lat": 47.158265,
		"lng": -96.828561
	},
	{
		"lat": 47.158236,
		"lng": -96.828766
	},
	{
		"lat": 47.158198,
		"lng": -96.829233
	},
	{
		"lat": 47.15818,
		"lng": -96.829545
	},
	{
		"lat": 47.158177,
		"lng": -96.829859
	},
	{
		"lat": 47.158184,
		"lng": -96.830068
	},
	{
		"lat": 47.158201,
		"lng": -96.830328
	},
	{
		"lat": 47.158223,
		"lng": -96.830482
	},
	{
		"lat": 47.158239,
		"lng": -96.830637
	},
	{
		"lat": 47.158281,
		"lng": -96.830895
	},
	{
		"lat": 47.158326,
		"lng": -96.831094
	},
	{
		"lat": 47.158381,
		"lng": -96.831229
	},
	{
		"lat": 47.158633,
		"lng": -96.831603
	},
	{
		"lat": 47.158715,
		"lng": -96.831706
	},
	{
		"lat": 47.158773,
		"lng": -96.83177
	},
	{
		"lat": 47.158864,
		"lng": -96.831854
	},
	{
		"lat": 47.158897,
		"lng": -96.831873
	},
	{
		"lat": 47.159073,
		"lng": -96.831937
	},
	{
		"lat": 47.159179,
		"lng": -96.831969
	},
	{
		"lat": 47.159431,
		"lng": -96.83199
	},
	{
		"lat": 47.159503,
		"lng": -96.831983
	},
	{
		"lat": 47.159718,
		"lng": -96.831945
	},
	{
		"lat": 47.159788,
		"lng": -96.831922
	},
	{
		"lat": 47.159889,
		"lng": -96.831865
	},
	{
		"lat": 47.160021,
		"lng": -96.831781
	},
	{
		"lat": 47.160176,
		"lng": -96.831649
	},
	{
		"lat": 47.160234,
		"lng": -96.831587
	},
	{
		"lat": 47.160296,
		"lng": -96.831534
	},
	{
		"lat": 47.160527,
		"lng": -96.831204
	},
	{
		"lat": 47.160622,
		"lng": -96.831047
	},
	{
		"lat": 47.160719,
		"lng": -96.830826
	},
	{
		"lat": 47.160828,
		"lng": -96.830439
	},
	{
		"lat": 47.16086,
		"lng": -96.830289
	},
	{
		"lat": 47.160885,
		"lng": -96.830136
	},
	{
		"lat": 47.160911,
		"lng": -96.82993
	},
	{
		"lat": 47.160942,
		"lng": -96.829618
	},
	{
		"lat": 47.16097,
		"lng": -96.828678
	},
	{
		"lat": 47.160966,
		"lng": -96.828102
	},
	{
		"lat": 47.160946,
		"lng": -96.827578
	},
	{
		"lat": 47.160942,
		"lng": -96.827369
	},
	{
		"lat": 47.160943,
		"lng": -96.826584
	},
	{
		"lat": 47.160952,
		"lng": -96.826218
	},
	{
		"lat": 47.160964,
		"lng": -96.825904
	},
	{
		"lat": 47.160995,
		"lng": -96.825278
	},
	{
		"lat": 47.161025,
		"lng": -96.824914
	},
	{
		"lat": 47.161071,
		"lng": -96.824501
	},
	{
		"lat": 47.161102,
		"lng": -96.82435
	},
	{
		"lat": 47.161185,
		"lng": -96.823787
	},
	{
		"lat": 47.161213,
		"lng": -96.823637
	},
	{
		"lat": 47.161219,
		"lng": -96.823585
	},
	{
		"lat": 47.161247,
		"lng": -96.823433
	},
	{
		"lat": 47.161251,
		"lng": -96.823381
	},
	{
		"lat": 47.16128,
		"lng": -96.82323
	},
	{
		"lat": 47.16131,
		"lng": -96.823135
	},
	{
		"lat": 47.16139,
		"lng": -96.822843
	},
	{
		"lat": 47.161422,
		"lng": -96.822749
	},
	{
		"lat": 47.16146,
		"lng": -96.822602
	},
	{
		"lat": 47.16148,
		"lng": -96.822559
	},
	{
		"lat": 47.16155,
		"lng": -96.822376
	},
	{
		"lat": 47.161787,
		"lng": -96.821852
	},
	{
		"lat": 47.16181,
		"lng": -96.821811
	},
	{
		"lat": 47.161849,
		"lng": -96.821723
	},
	{
		"lat": 47.161963,
		"lng": -96.82152
	},
	{
		"lat": 47.162082,
		"lng": -96.821323
	},
	{
		"lat": 47.162103,
		"lng": -96.82128
	},
	{
		"lat": 47.162119,
		"lng": -96.821233
	},
	{
		"lat": 47.162206,
		"lng": -96.821066
	},
	{
		"lat": 47.162355,
		"lng": -96.820838
	},
	{
		"lat": 47.162495,
		"lng": -96.820599
	},
	{
		"lat": 47.162672,
		"lng": -96.82034
	},
	{
		"lat": 47.162753,
		"lng": -96.820237
	},
	{
		"lat": 47.162867,
		"lng": -96.82011
	},
	{
		"lat": 47.162891,
		"lng": -96.820071
	},
	{
		"lat": 47.162921,
		"lng": -96.820043
	},
	{
		"lat": 47.163021,
		"lng": -96.819964
	},
	{
		"lat": 47.163081,
		"lng": -96.819908
	},
	{
		"lat": 47.163147,
		"lng": -96.819866
	},
	{
		"lat": 47.163298,
		"lng": -96.819723
	},
	{
		"lat": 47.163445,
		"lng": -96.819573
	},
	{
		"lat": 47.163571,
		"lng": -96.81947
	},
	{
		"lat": 47.163699,
		"lng": -96.819378
	},
	{
		"lat": 47.163792,
		"lng": -96.819297
	},
	{
		"lat": 47.163925,
		"lng": -96.819218
	},
	{
		"lat": 47.164089,
		"lng": -96.819108
	},
	{
		"lat": 47.164293,
		"lng": -96.819009
	},
	{
		"lat": 47.164434,
		"lng": -96.818959
	},
	{
		"lat": 47.164577,
		"lng": -96.818934
	},
	{
		"lat": 47.164901,
		"lng": -96.81895
	},
	{
		"lat": 47.164972,
		"lng": -96.818969
	},
	{
		"lat": 47.165075,
		"lng": -96.819015
	},
	{
		"lat": 47.165207,
		"lng": -96.8191
	},
	{
		"lat": 47.165307,
		"lng": -96.819235
	},
	{
		"lat": 47.165312,
		"lng": -96.819242
	},
	{
		"lat": 47.165388,
		"lng": -96.819355
	},
	{
		"lat": 47.165509,
		"lng": -96.819549
	},
	{
		"lat": 47.165552,
		"lng": -96.819632
	},
	{
		"lat": 47.165611,
		"lng": -96.819764
	},
	{
		"lat": 47.165685,
		"lng": -96.819944
	},
	{
		"lat": 47.165746,
		"lng": -96.820134
	},
	{
		"lat": 47.165756,
		"lng": -96.820184
	},
	{
		"lat": 47.165851,
		"lng": -96.820524
	},
	{
		"lat": 47.165882,
		"lng": -96.820674
	},
	{
		"lat": 47.165899,
		"lng": -96.820776
	},
	{
		"lat": 47.16591,
		"lng": -96.820879
	},
	{
		"lat": 47.165942,
		"lng": -96.821296
	},
	{
		"lat": 47.165955,
		"lng": -96.821765
	},
	{
		"lat": 47.165962,
		"lng": -96.822497
	},
	{
		"lat": 47.16598,
		"lng": -96.822862
	},
	{
		"lat": 47.166002,
		"lng": -96.823174
	},
	{
		"lat": 47.166013,
		"lng": -96.823278
	},
	{
		"lat": 47.166022,
		"lng": -96.823328
	},
	{
		"lat": 47.166036,
		"lng": -96.823377
	},
	{
		"lat": 47.16605,
		"lng": -96.82348
	},
	{
		"lat": 47.166071,
		"lng": -96.82358
	},
	{
		"lat": 47.166159,
		"lng": -96.823867
	},
	{
		"lat": 47.166233,
		"lng": -96.824047
	},
	{
		"lat": 47.166276,
		"lng": -96.82413
	},
	{
		"lat": 47.166421,
		"lng": -96.824364
	},
	{
		"lat": 47.166548,
		"lng": -96.824549
	},
	{
		"lat": 47.16668,
		"lng": -96.82473
	},
	{
		"lat": 47.16677,
		"lng": -96.824815
	},
	{
		"lat": 47.166931,
		"lng": -96.824934
	},
	{
		"lat": 47.166998,
		"lng": -96.824975
	},
	{
		"lat": 47.167206,
		"lng": -96.825065
	},
	{
		"lat": 47.167451,
		"lng": -96.825152
	},
	{
		"lat": 47.167769,
		"lng": -96.825242
	},
	{
		"lat": 47.167913,
		"lng": -96.825265
	},
	{
		"lat": 47.168021,
		"lng": -96.825275
	},
	{
		"lat": 47.168202,
		"lng": -96.82527
	},
	{
		"lat": 47.168633,
		"lng": -96.825215
	},
	{
		"lat": 47.168848,
		"lng": -96.825176
	},
	{
		"lat": 47.168954,
		"lng": -96.825143
	},
	{
		"lat": 47.169093,
		"lng": -96.825087
	},
	{
		"lat": 47.169226,
		"lng": -96.825006
	},
	{
		"lat": 47.169546,
		"lng": -96.824766
	},
	{
		"lat": 47.169672,
		"lng": -96.824663
	},
	{
		"lat": 47.169927,
		"lng": -96.824468
	},
	{
		"lat": 47.170112,
		"lng": -96.824306
	},
	{
		"lat": 47.17017,
		"lng": -96.824262
	},
	{
		"lat": 47.170207,
		"lng": -96.824233
	},
	{
		"lat": 47.170237,
		"lng": -96.824204
	},
	{
		"lat": 47.170282,
		"lng": -96.824168
	},
	{
		"lat": 47.170398,
		"lng": -96.824043
	},
	{
		"lat": 47.170519,
		"lng": -96.823931
	},
	{
		"lat": 47.170634,
		"lng": -96.823804
	},
	{
		"lat": 47.170753,
		"lng": -96.823687
	},
	{
		"lat": 47.170875,
		"lng": -96.823577
	},
	{
		"lat": 47.170908,
		"lng": -96.823556
	},
	{
		"lat": 47.170943,
		"lng": -96.823541
	},
	{
		"lat": 47.171195,
		"lng": -96.823337
	},
	{
		"lat": 47.171254,
		"lng": -96.823277
	},
	{
		"lat": 47.171318,
		"lng": -96.823228
	},
	{
		"lat": 47.171441,
		"lng": -96.82312
	},
	{
		"lat": 47.171475,
		"lng": -96.823104
	},
	{
		"lat": 47.171539,
		"lng": -96.823055
	},
	{
		"lat": 47.171638,
		"lng": -96.822992
	},
	{
		"lat": 47.171706,
		"lng": -96.822956
	},
	{
		"lat": 47.171771,
		"lng": -96.822911
	},
	{
		"lat": 47.171904,
		"lng": -96.82283
	},
	{
		"lat": 47.172513,
		"lng": -96.822507
	},
	{
		"lat": 47.172617,
		"lng": -96.822462
	},
	{
		"lat": 47.172723,
		"lng": -96.82243
	},
	{
		"lat": 47.172831,
		"lng": -96.822419
	},
	{
		"lat": 47.172903,
		"lng": -96.822428
	},
	{
		"lat": 47.173079,
		"lng": -96.822484
	},
	{
		"lat": 47.173411,
		"lng": -96.822685
	},
	{
		"lat": 47.173565,
		"lng": -96.822823
	},
	{
		"lat": 47.173652,
		"lng": -96.822916
	},
	{
		"lat": 47.173888,
		"lng": -96.823239
	},
	{
		"lat": 47.173974,
		"lng": -96.823408
	},
	{
		"lat": 47.174012,
		"lng": -96.823496
	},
	{
		"lat": 47.174045,
		"lng": -96.82359
	},
	{
		"lat": 47.174181,
		"lng": -96.824186
	},
	{
		"lat": 47.174218,
		"lng": -96.824389
	},
	{
		"lat": 47.174241,
		"lng": -96.824714
	},
	{
		"lat": 47.174259,
		"lng": -96.825132
	},
	{
		"lat": 47.17426,
		"lng": -96.82529
	},
	{
		"lat": 47.174256,
		"lng": -96.825447
	},
	{
		"lat": 47.174173,
		"lng": -96.826434
	},
	{
		"lat": 47.17409,
		"lng": -96.826943
	},
	{
		"lat": 47.174063,
		"lng": -96.82715
	},
	{
		"lat": 47.174045,
		"lng": -96.827251
	},
	{
		"lat": 47.173978,
		"lng": -96.827766
	},
	{
		"lat": 47.173967,
		"lng": -96.827922
	},
	{
		"lat": 47.173965,
		"lng": -96.828184
	},
	{
		"lat": 47.17394,
		"lng": -96.828497
	},
	{
		"lat": 47.173942,
		"lng": -96.828601
	},
	{
		"lat": 47.17395,
		"lng": -96.828705
	},
	{
		"lat": 47.173955,
		"lng": -96.828862
	},
	{
		"lat": 47.174023,
		"lng": -96.82943
	},
	{
		"lat": 47.174039,
		"lng": -96.829532
	},
	{
		"lat": 47.174061,
		"lng": -96.82974
	},
	{
		"lat": 47.174115,
		"lng": -96.829989
	},
	{
		"lat": 47.174209,
		"lng": -96.83033
	},
	{
		"lat": 47.174253,
		"lng": -96.830473
	},
	{
		"lat": 47.174336,
		"lng": -96.830706
	},
	{
		"lat": 47.174413,
		"lng": -96.830883
	},
	{
		"lat": 47.174687,
		"lng": -96.83137
	},
	{
		"lat": 47.174804,
		"lng": -96.831569
	},
	{
		"lat": 47.174901,
		"lng": -96.831724
	},
	{
		"lat": 47.175259,
		"lng": -96.832243
	},
	{
		"lat": 47.175442,
		"lng": -96.832497
	},
	{
		"lat": 47.175656,
		"lng": -96.832778
	},
	{
		"lat": 47.17574,
		"lng": -96.832876
	},
	{
		"lat": 47.175885,
		"lng": -96.833032
	},
	{
		"lat": 47.176006,
		"lng": -96.833147
	},
	{
		"lat": 47.176131,
		"lng": -96.833252
	},
	{
		"lat": 47.176328,
		"lng": -96.833383
	},
	{
		"lat": 47.176431,
		"lng": -96.833431
	},
	{
		"lat": 47.176501,
		"lng": -96.833456
	},
	{
		"lat": 47.176572,
		"lng": -96.833474
	},
	{
		"lat": 47.176644,
		"lng": -96.833484
	},
	{
		"lat": 47.176716,
		"lng": -96.833481
	},
	{
		"lat": 47.176896,
		"lng": -96.833458
	},
	{
		"lat": 47.176931,
		"lng": -96.833447
	},
	{
		"lat": 47.177068,
		"lng": -96.833381
	},
	{
		"lat": 47.177197,
		"lng": -96.833287
	},
	{
		"lat": 47.177258,
		"lng": -96.833232
	},
	{
		"lat": 47.177287,
		"lng": -96.8332
	},
	{
		"lat": 47.177465,
		"lng": -96.83294
	},
	{
		"lat": 47.177532,
		"lng": -96.832817
	},
	{
		"lat": 47.177579,
		"lng": -96.832676
	},
	{
		"lat": 47.1776,
		"lng": -96.832632
	},
	{
		"lat": 47.177629,
		"lng": -96.832497
	},
	{
		"lat": 47.17767,
		"lng": -96.832351
	},
	{
		"lat": 47.177697,
		"lng": -96.832199
	},
	{
		"lat": 47.177713,
		"lng": -96.832044
	},
	{
		"lat": 47.177731,
		"lng": -96.831573
	},
	{
		"lat": 47.177725,
		"lng": -96.831417
	},
	{
		"lat": 47.177691,
		"lng": -96.831001
	},
	{
		"lat": 47.177535,
		"lng": -96.830085
	},
	{
		"lat": 47.177442,
		"lng": -96.829634
	},
	{
		"lat": 47.177367,
		"lng": -96.829229
	},
	{
		"lat": 47.177324,
		"lng": -96.829029
	},
	{
		"lat": 47.177307,
		"lng": -96.828927
	},
	{
		"lat": 47.177258,
		"lng": -96.828515
	},
	{
		"lat": 47.177237,
		"lng": -96.827836
	},
	{
		"lat": 47.177237,
		"lng": -96.827418
	},
	{
		"lat": 47.177258,
		"lng": -96.827106
	},
	{
		"lat": 47.177286,
		"lng": -96.826955
	},
	{
		"lat": 47.177327,
		"lng": -96.8267
	},
	{
		"lat": 47.17737,
		"lng": -96.826501
	},
	{
		"lat": 47.177407,
		"lng": -96.8263
	},
	{
		"lat": 47.177491,
		"lng": -96.825955
	},
	{
		"lat": 47.177498,
		"lng": -96.825903
	},
	{
		"lat": 47.177519,
		"lng": -96.825804
	},
	{
		"lat": 47.177569,
		"lng": -96.825608
	},
	{
		"lat": 47.177656,
		"lng": -96.825379
	},
	{
		"lat": 47.177743,
		"lng": -96.825212
	},
	{
		"lat": 47.177762,
		"lng": -96.825168
	},
	{
		"lat": 47.177859,
		"lng": -96.825014
	},
	{
		"lat": 47.178045,
		"lng": -96.824768
	},
	{
		"lat": 47.178248,
		"lng": -96.824551
	},
	{
		"lat": 47.178338,
		"lng": -96.824463
	},
	{
		"lat": 47.178536,
		"lng": -96.824339
	},
	{
		"lat": 47.178711,
		"lng": -96.824274
	},
	{
		"lat": 47.178782,
		"lng": -96.824253
	},
	{
		"lat": 47.178926,
		"lng": -96.824242
	},
	{
		"lat": 47.179465,
		"lng": -96.824268
	},
	{
		"lat": 47.179501,
		"lng": -96.824274
	},
	{
		"lat": 47.179543,
		"lng": -96.824297
	},
	{
		"lat": 47.179567,
		"lng": -96.82431
	},
	{
		"lat": 47.179602,
		"lng": -96.824324
	},
	{
		"lat": 47.179637,
		"lng": -96.824339
	},
	{
		"lat": 47.179874,
		"lng": -96.824465
	},
	{
		"lat": 47.179962,
		"lng": -96.824556
	},
	{
		"lat": 47.180019,
		"lng": -96.824606
	},
	{
		"lat": 47.180024,
		"lng": -96.824611
	},
	{
		"lat": 47.180082,
		"lng": -96.824674
	},
	{
		"lat": 47.18016,
		"lng": -96.824782
	},
	{
		"lat": 47.180234,
		"lng": -96.824896
	},
	{
		"lat": 47.180304,
		"lng": -96.825016
	},
	{
		"lat": 47.180347,
		"lng": -96.825099
	},
	{
		"lat": 47.180577,
		"lng": -96.825632
	},
	{
		"lat": 47.180608,
		"lng": -96.825726
	},
	{
		"lat": 47.180666,
		"lng": -96.825859
	},
	{
		"lat": 47.180717,
		"lng": -96.825996
	},
	{
		"lat": 47.180809,
		"lng": -96.826281
	},
	{
		"lat": 47.180859,
		"lng": -96.82642
	},
	{
		"lat": 47.180887,
		"lng": -96.826516
	},
	{
		"lat": 47.180956,
		"lng": -96.826699
	},
	{
		"lat": 47.181033,
		"lng": -96.826937
	},
	{
		"lat": 47.181094,
		"lng": -96.827067
	},
	{
		"lat": 47.18127,
		"lng": -96.827329
	},
	{
		"lat": 47.181382,
		"lng": -96.827462
	},
	{
		"lat": 47.181446,
		"lng": -96.827509
	},
	{
		"lat": 47.181514,
		"lng": -96.827547
	},
	{
		"lat": 47.181583,
		"lng": -96.827577
	},
	{
		"lat": 47.181618,
		"lng": -96.827586
	},
	{
		"lat": 47.181762,
		"lng": -96.827597
	},
	{
		"lat": 47.181798,
		"lng": -96.827593
	},
	{
		"lat": 47.181869,
		"lng": -96.827568
	},
	{
		"lat": 47.182005,
		"lng": -96.827499
	},
	{
		"lat": 47.182098,
		"lng": -96.827419
	},
	{
		"lat": 47.182276,
		"lng": -96.827159
	},
	{
		"lat": 47.182299,
		"lng": -96.827119
	},
	{
		"lat": 47.182371,
		"lng": -96.826938
	},
	{
		"lat": 47.182407,
		"lng": -96.82679
	},
	{
		"lat": 47.182422,
		"lng": -96.826743
	},
	{
		"lat": 47.182439,
		"lng": -96.826641
	},
	{
		"lat": 47.182451,
		"lng": -96.826328
	},
	{
		"lat": 47.182446,
		"lng": -96.82617
	},
	{
		"lat": 47.182412,
		"lng": -96.82586
	},
	{
		"lat": 47.18237,
		"lng": -96.825605
	},
	{
		"lat": 47.182331,
		"lng": -96.825297
	},
	{
		"lat": 47.182246,
		"lng": -96.824897
	},
	{
		"lat": 47.182221,
		"lng": -96.824744
	},
	{
		"lat": 47.182201,
		"lng": -96.824591
	},
	{
		"lat": 47.182172,
		"lng": -96.824281
	},
	{
		"lat": 47.182163,
		"lng": -96.824126
	},
	{
		"lat": 47.18217,
		"lng": -96.823657
	},
	{
		"lat": 47.182183,
		"lng": -96.823501
	},
	{
		"lat": 47.182224,
		"lng": -96.823194
	},
	{
		"lat": 47.182245,
		"lng": -96.823095
	},
	{
		"lat": 47.182263,
		"lng": -96.82305
	},
	{
		"lat": 47.182324,
		"lng": -96.82286
	},
	{
		"lat": 47.182398,
		"lng": -96.822681
	},
	{
		"lat": 47.182519,
		"lng": -96.822487
	},
	{
		"lat": 47.182833,
		"lng": -96.822053
	},
	{
		"lat": 47.182888,
		"lng": -96.821987
	},
	{
		"lat": 47.183079,
		"lng": -96.821839
	},
	{
		"lat": 47.183147,
		"lng": -96.821806
	},
	{
		"lat": 47.183179,
		"lng": -96.821783
	},
	{
		"lat": 47.183349,
		"lng": -96.821694
	},
	{
		"lat": 47.183415,
		"lng": -96.821654
	},
	{
		"lat": 47.18345,
		"lng": -96.821639
	},
	{
		"lat": 47.183661,
		"lng": -96.821574
	},
	{
		"lat": 47.183769,
		"lng": -96.821554
	},
	{
		"lat": 47.184021,
		"lng": -96.821534
	},
	{
		"lat": 47.184314,
		"lng": -96.821555
	},
	{
		"lat": 47.18442,
		"lng": -96.821584
	},
	{
		"lat": 47.184698,
		"lng": -96.821698
	},
	{
		"lat": 47.184766,
		"lng": -96.821734
	},
	{
		"lat": 47.185026,
		"lng": -96.821914
	},
	{
		"lat": 47.185087,
		"lng": -96.82197
	},
	{
		"lat": 47.185175,
		"lng": -96.822062
	},
	{
		"lat": 47.185305,
		"lng": -96.822244
	},
	{
		"lat": 47.185399,
		"lng": -96.822403
	},
	{
		"lat": 47.185544,
		"lng": -96.822702
	},
	{
		"lat": 47.185638,
		"lng": -96.822925
	},
	{
		"lat": 47.185685,
		"lng": -96.823066
	},
	{
		"lat": 47.185738,
		"lng": -96.823203
	},
	{
		"lat": 47.185791,
		"lng": -96.823397
	},
	{
		"lat": 47.185844,
		"lng": -96.823648
	},
	{
		"lat": 47.185863,
		"lng": -96.823802
	},
	{
		"lat": 47.185882,
		"lng": -96.824063
	},
	{
		"lat": 47.18588,
		"lng": -96.824167
	},
	{
		"lat": 47.185869,
		"lng": -96.824376
	},
	{
		"lat": 47.185846,
		"lng": -96.824583
	},
	{
		"lat": 47.185811,
		"lng": -96.824786
	},
	{
		"lat": 47.185806,
		"lng": -96.824838
	},
	{
		"lat": 47.185736,
		"lng": -96.825191
	},
	{
		"lat": 47.185653,
		"lng": -96.82548
	},
	{
		"lat": 47.185605,
		"lng": -96.825621
	},
	{
		"lat": 47.185582,
		"lng": -96.825662
	},
	{
		"lat": 47.185486,
		"lng": -96.825883
	},
	{
		"lat": 47.185355,
		"lng": -96.826133
	},
	{
		"lat": 47.185192,
		"lng": -96.826414
	},
	{
		"lat": 47.185175,
		"lng": -96.82646
	},
	{
		"lat": 47.185154,
		"lng": -96.82656
	},
	{
		"lat": 47.185137,
		"lng": -96.826715
	},
	{
		"lat": 47.185126,
		"lng": -96.826764
	},
	{
		"lat": 47.18511,
		"lng": -96.826812
	},
	{
		"lat": 47.184969,
		"lng": -96.827115
	},
	{
		"lat": 47.184936,
		"lng": -96.827208
	},
	{
		"lat": 47.184874,
		"lng": -96.827336
	},
	{
		"lat": 47.184796,
		"lng": -96.827512
	},
	{
		"lat": 47.184754,
		"lng": -96.827597
	},
	{
		"lat": 47.184724,
		"lng": -96.827693
	},
	{
		"lat": 47.184684,
		"lng": -96.827779
	},
	{
		"lat": 47.184668,
		"lng": -96.827827
	},
	{
		"lat": 47.18457,
		"lng": -96.828046
	},
	{
		"lat": 47.184535,
		"lng": -96.828137
	},
	{
		"lat": 47.184399,
		"lng": -96.828446
	},
	{
		"lat": 47.184373,
		"lng": -96.828544
	},
	{
		"lat": 47.184314,
		"lng": -96.828675
	},
	{
		"lat": 47.184253,
		"lng": -96.828865
	},
	{
		"lat": 47.184187,
		"lng": -96.829051
	},
	{
		"lat": 47.184159,
		"lng": -96.829147
	},
	{
		"lat": 47.184138,
		"lng": -96.82919
	},
	{
		"lat": 47.184085,
		"lng": -96.829385
	},
	{
		"lat": 47.184011,
		"lng": -96.829622
	},
	{
		"lat": 47.183941,
		"lng": -96.829863
	},
	{
		"lat": 47.183923,
		"lng": -96.829908
	},
	{
		"lat": 47.183851,
		"lng": -96.830148
	},
	{
		"lat": 47.183789,
		"lng": -96.830337
	},
	{
		"lat": 47.183702,
		"lng": -96.830681
	},
	{
		"lat": 47.183636,
		"lng": -96.830981
	},
	{
		"lat": 47.183565,
		"lng": -96.831333
	},
	{
		"lat": 47.18346,
		"lng": -96.831889
	},
	{
		"lat": 47.183389,
		"lng": -96.832456
	},
	{
		"lat": 47.183374,
		"lng": -96.832554
	},
	{
		"lat": 47.183371,
		"lng": -96.832868
	},
	{
		"lat": 47.183374,
		"lng": -96.83313
	},
	{
		"lat": 47.183395,
		"lng": -96.833494
	},
	{
		"lat": 47.183413,
		"lng": -96.833649
	},
	{
		"lat": 47.183437,
		"lng": -96.833748
	},
	{
		"lat": 47.183454,
		"lng": -96.833849
	},
	{
		"lat": 47.183488,
		"lng": -96.833999
	},
	{
		"lat": 47.183523,
		"lng": -96.83409
	},
	{
		"lat": 47.183566,
		"lng": -96.834233
	},
	{
		"lat": 47.183678,
		"lng": -96.834561
	},
	{
		"lat": 47.183801,
		"lng": -96.83482
	},
	{
		"lat": 47.183886,
		"lng": -96.834989
	},
	{
		"lat": 47.184023,
		"lng": -96.835232
	},
	{
		"lat": 47.184175,
		"lng": -96.835455
	},
	{
		"lat": 47.184284,
		"lng": -96.835592
	},
	{
		"lat": 47.184407,
		"lng": -96.835703
	},
	{
		"lat": 47.184571,
		"lng": -96.835812
	},
	{
		"lat": 47.184775,
		"lng": -96.835919
	},
	{
		"lat": 47.18488,
		"lng": -96.835956
	},
	{
		"lat": 47.185128,
		"lng": -96.836029
	},
	{
		"lat": 47.185236,
		"lng": -96.836045
	},
	{
		"lat": 47.185344,
		"lng": -96.836042
	},
	{
		"lat": 47.185488,
		"lng": -96.836022
	},
	{
		"lat": 47.185628,
		"lng": -96.835975
	},
	{
		"lat": 47.185796,
		"lng": -96.835878
	},
	{
		"lat": 47.185894,
		"lng": -96.835813
	},
	{
		"lat": 47.185956,
		"lng": -96.83576
	},
	{
		"lat": 47.18599,
		"lng": -96.835741
	},
	{
		"lat": 47.186199,
		"lng": -96.835534
	},
	{
		"lat": 47.18626,
		"lng": -96.83548
	},
	{
		"lat": 47.186317,
		"lng": -96.835414
	},
	{
		"lat": 47.186697,
		"lng": -96.834856
	},
	{
		"lat": 47.186791,
		"lng": -96.834696
	},
	{
		"lat": 47.187023,
		"lng": -96.83423
	},
	{
		"lat": 47.187123,
		"lng": -96.834012
	},
	{
		"lat": 47.187394,
		"lng": -96.833391
	},
	{
		"lat": 47.187499,
		"lng": -96.833116
	},
	{
		"lat": 47.187548,
		"lng": -96.832976
	},
	{
		"lat": 47.187577,
		"lng": -96.83288
	},
	{
		"lat": 47.187639,
		"lng": -96.832635
	},
	{
		"lat": 47.187682,
		"lng": -96.83249
	},
	{
		"lat": 47.187716,
		"lng": -96.832341
	},
	{
		"lat": 47.187743,
		"lng": -96.832244
	},
	{
		"lat": 47.187832,
		"lng": -96.831845
	},
	{
		"lat": 47.187871,
		"lng": -96.831698
	},
	{
		"lat": 47.187888,
		"lng": -96.831596
	},
	{
		"lat": 47.187984,
		"lng": -96.831146
	},
	{
		"lat": 47.188011,
		"lng": -96.83094
	},
	{
		"lat": 47.188029,
		"lng": -96.830839
	},
	{
		"lat": 47.18814,
		"lng": -96.829699
	},
	{
		"lat": 47.188182,
		"lng": -96.829338
	},
	{
		"lat": 47.18823,
		"lng": -96.828872
	},
	{
		"lat": 47.188302,
		"lng": -96.828412
	},
	{
		"lat": 47.188406,
		"lng": -96.827856
	},
	{
		"lat": 47.188422,
		"lng": -96.827809
	},
	{
		"lat": 47.188471,
		"lng": -96.827612
	},
	{
		"lat": 47.188539,
		"lng": -96.827314
	},
	{
		"lat": 47.188601,
		"lng": -96.827125
	},
	{
		"lat": 47.188668,
		"lng": -96.82694
	},
	{
		"lat": 47.188724,
		"lng": -96.826814
	},
	{
		"lat": 47.188759,
		"lng": -96.826722
	},
	{
		"lat": 47.188803,
		"lng": -96.826639
	},
	{
		"lat": 47.188853,
		"lng": -96.826564
	},
	{
		"lat": 47.189067,
		"lng": -96.826283
	},
	{
		"lat": 47.189288,
		"lng": -96.826012
	},
	{
		"lat": 47.189375,
		"lng": -96.82592
	},
	{
		"lat": 47.189505,
		"lng": -96.82583
	},
	{
		"lat": 47.189642,
		"lng": -96.825762
	},
	{
		"lat": 47.189677,
		"lng": -96.825752
	},
	{
		"lat": 47.189821,
		"lng": -96.825733
	},
	{
		"lat": 47.19011,
		"lng": -96.825712
	},
	{
		"lat": 47.190326,
		"lng": -96.825722
	},
	{
		"lat": 47.190398,
		"lng": -96.82573
	},
	{
		"lat": 47.190537,
		"lng": -96.825782
	},
	{
		"lat": 47.190847,
		"lng": -96.825926
	},
	{
		"lat": 47.191141,
		"lng": -96.826125
	},
	{
		"lat": 47.191269,
		"lng": -96.826224
	},
	{
		"lat": 47.191297,
		"lng": -96.826256
	},
	{
		"lat": 47.191481,
		"lng": -96.826422
	},
	{
		"lat": 47.191636,
		"lng": -96.826594
	},
	{
		"lat": 47.19183,
		"lng": -96.826904
	},
	{
		"lat": 47.1919,
		"lng": -96.827025
	},
	{
		"lat": 47.191988,
		"lng": -96.827191
	},
	{
		"lat": 47.192058,
		"lng": -96.827311
	},
	{
		"lat": 47.192546,
		"lng": -96.828083
	},
	{
		"lat": 47.192617,
		"lng": -96.828201
	},
	{
		"lat": 47.192731,
		"lng": -96.828405
	},
	{
		"lat": 47.192792,
		"lng": -96.828535
	},
	{
		"lat": 47.192885,
		"lng": -96.828759
	},
	{
		"lat": 47.192899,
		"lng": -96.828807
	},
	{
		"lat": 47.192938,
		"lng": -96.828895
	},
	{
		"lat": 47.193076,
		"lng": -96.829263
	},
	{
		"lat": 47.193135,
		"lng": -96.829453
	},
	{
		"lat": 47.193184,
		"lng": -96.829593
	},
	{
		"lat": 47.193271,
		"lng": -96.829822
	},
	{
		"lat": 47.193435,
		"lng": -96.830399
	},
	{
		"lat": 47.193464,
		"lng": -96.8305
	},
	{
		"lat": 47.193496,
		"lng": -96.830582
	},
	{
		"lat": 47.193505,
		"lng": -96.830632
	},
	{
		"lat": 47.193645,
		"lng": -96.831228
	},
	{
		"lat": 47.193733,
		"lng": -96.831572
	},
	{
		"lat": 47.193832,
		"lng": -96.831909
	},
	{
		"lat": 47.193879,
		"lng": -96.83205
	},
	{
		"lat": 47.193942,
		"lng": -96.832296
	},
	{
		"lat": 47.19398,
		"lng": -96.832385
	},
	{
		"lat": 47.193996,
		"lng": -96.832432
	},
	{
		"lat": 47.194018,
		"lng": -96.832532
	},
	{
		"lat": 47.19413,
		"lng": -96.83286
	},
	{
		"lat": 47.194188,
		"lng": -96.833052
	},
	{
		"lat": 47.194225,
		"lng": -96.8332
	},
	{
		"lat": 47.194299,
		"lng": -96.833438
	},
	{
		"lat": 47.194336,
		"lng": -96.833586
	},
	{
		"lat": 47.194371,
		"lng": -96.833678
	},
	{
		"lat": 47.194456,
		"lng": -96.833967
	},
	{
		"lat": 47.194508,
		"lng": -96.834104
	},
	{
		"lat": 47.194519,
		"lng": -96.834154
	},
	{
		"lat": 47.194574,
		"lng": -96.834289
	},
	{
		"lat": 47.194623,
		"lng": -96.83443
	},
	{
		"lat": 47.194775,
		"lng": -96.834786
	},
	{
		"lat": 47.194861,
		"lng": -96.834954
	},
	{
		"lat": 47.194999,
		"lng": -96.835196
	},
	{
		"lat": 47.195094,
		"lng": -96.835354
	},
	{
		"lat": 47.195313,
		"lng": -96.835702
	},
	{
		"lat": 47.195802,
		"lng": -96.8364
	},
	{
		"lat": 47.195951,
		"lng": -96.836628
	},
	{
		"lat": 47.196095,
		"lng": -96.836863
	},
	{
		"lat": 47.196252,
		"lng": -96.837216
	},
	{
		"lat": 47.196323,
		"lng": -96.837398
	},
	{
		"lat": 47.196367,
		"lng": -96.837542
	},
	{
		"lat": 47.1964,
		"lng": -96.837692
	},
	{
		"lat": 47.196429,
		"lng": -96.837788
	},
	{
		"lat": 47.196452,
		"lng": -96.837888
	},
	{
		"lat": 47.196467,
		"lng": -96.83799
	},
	{
		"lat": 47.196481,
		"lng": -96.838039
	},
	{
		"lat": 47.196501,
		"lng": -96.838246
	},
	{
		"lat": 47.19651,
		"lng": -96.838403
	},
	{
		"lat": 47.196505,
		"lng": -96.838665
	},
	{
		"lat": 47.196494,
		"lng": -96.838822
	},
	{
		"lat": 47.19644,
		"lng": -96.839126
	},
	{
		"lat": 47.196377,
		"lng": -96.839315
	},
	{
		"lat": 47.196357,
		"lng": -96.839359
	},
	{
		"lat": 47.196176,
		"lng": -96.839686
	},
	{
		"lat": 47.196101,
		"lng": -96.8398
	},
	{
		"lat": 47.195945,
		"lng": -96.840018
	},
	{
		"lat": 47.195889,
		"lng": -96.840084
	},
	{
		"lat": 47.195767,
		"lng": -96.840197
	},
	{
		"lat": 47.195735,
		"lng": -96.84022
	},
	{
		"lat": 47.195667,
		"lng": -96.840255
	},
	{
		"lat": 47.195534,
		"lng": -96.840336
	},
	{
		"lat": 47.195356,
		"lng": -96.840382
	},
	{
		"lat": 47.195142,
		"lng": -96.840422
	},
	{
		"lat": 47.194783,
		"lng": -96.84047
	},
	{
		"lat": 47.194675,
		"lng": -96.840472
	},
	{
		"lat": 47.194531,
		"lng": -96.840464
	},
	{
		"lat": 47.194388,
		"lng": -96.840432
	},
	{
		"lat": 47.194176,
		"lng": -96.840365
	},
	{
		"lat": 47.194142,
		"lng": -96.840349
	},
	{
		"lat": 47.194078,
		"lng": -96.840301
	},
	{
		"lat": 47.194008,
		"lng": -96.840273
	},
	{
		"lat": 47.193902,
		"lng": -96.840243
	},
	{
		"lat": 47.193768,
		"lng": -96.840166
	},
	{
		"lat": 47.193736,
		"lng": -96.84014
	},
	{
		"lat": 47.193634,
		"lng": -96.840087
	},
	{
		"lat": 47.193569,
		"lng": -96.840043
	},
	{
		"lat": 47.193394,
		"lng": -96.839979
	},
	{
		"lat": 47.193329,
		"lng": -96.839933
	},
	{
		"lat": 47.193227,
		"lng": -96.83988
	},
	{
		"lat": 47.193162,
		"lng": -96.839833
	},
	{
		"lat": 47.19299,
		"lng": -96.839757
	},
	{
		"lat": 47.19289,
		"lng": -96.839695
	},
	{
		"lat": 47.192856,
		"lng": -96.839679
	},
	{
		"lat": 47.192712,
		"lng": -96.839652
	},
	{
		"lat": 47.192642,
		"lng": -96.839627
	},
	{
		"lat": 47.192573,
		"lng": -96.839595
	},
	{
		"lat": 47.192503,
		"lng": -96.839551
	},
	{
		"lat": 47.192467,
		"lng": -96.839541
	},
	{
		"lat": 47.192363,
		"lng": -96.839496
	},
	{
		"lat": 47.192292,
		"lng": -96.839487
	},
	{
		"lat": 47.191967,
		"lng": -96.839507
	},
	{
		"lat": 47.191823,
		"lng": -96.839531
	},
	{
		"lat": 47.19165,
		"lng": -96.839601
	},
	{
		"lat": 47.191412,
		"lng": -96.839725
	},
	{
		"lat": 47.191349,
		"lng": -96.839774
	},
	{
		"lat": 47.191238,
		"lng": -96.839909
	},
	{
		"lat": 47.191104,
		"lng": -96.840084
	},
	{
		"lat": 47.191014,
		"lng": -96.840249
	},
	{
		"lat": 47.190952,
		"lng": -96.840436
	},
	{
		"lat": 47.190917,
		"lng": -96.840527
	},
	{
		"lat": 47.190858,
		"lng": -96.84083
	},
	{
		"lat": 47.190835,
		"lng": -96.840983
	},
	{
		"lat": 47.190817,
		"lng": -96.841191
	},
	{
		"lat": 47.190822,
		"lng": -96.841558
	},
	{
		"lat": 47.19084,
		"lng": -96.841819
	},
	{
		"lat": 47.190856,
		"lng": -96.841974
	},
	{
		"lat": 47.190883,
		"lng": -96.842126
	},
	{
		"lat": 47.190903,
		"lng": -96.842281
	},
	{
		"lat": 47.190923,
		"lng": -96.842382
	},
	{
		"lat": 47.190947,
		"lng": -96.842535
	},
	{
		"lat": 47.19099,
		"lng": -96.842679
	},
	{
		"lat": 47.191076,
		"lng": -96.842909
	},
	{
		"lat": 47.191115,
		"lng": -96.842997
	},
	{
		"lat": 47.191224,
		"lng": -96.843206
	},
	{
		"lat": 47.191419,
		"lng": -96.843515
	},
	{
		"lat": 47.191699,
		"lng": -96.843923
	},
	{
		"lat": 47.191779,
		"lng": -96.844028
	},
	{
		"lat": 47.191866,
		"lng": -96.844123
	},
	{
		"lat": 47.19196,
		"lng": -96.8442
	},
	{
		"lat": 47.191989,
		"lng": -96.84423
	},
	{
		"lat": 47.192217,
		"lng": -96.844389
	},
	{
		"lat": 47.192317,
		"lng": -96.844448
	},
	{
		"lat": 47.19242,
		"lng": -96.844498
	},
	{
		"lat": 47.192902,
		"lng": -96.844711
	},
	{
		"lat": 47.193042,
		"lng": -96.844761
	},
	{
		"lat": 47.193184,
		"lng": -96.8448
	},
	{
		"lat": 47.193364,
		"lng": -96.844829
	},
	{
		"lat": 47.19358,
		"lng": -96.844847
	},
	{
		"lat": 47.193652,
		"lng": -96.844844
	},
	{
		"lat": 47.193975,
		"lng": -96.844804
	},
	{
		"lat": 47.194046,
		"lng": -96.84478
	},
	{
		"lat": 47.194189,
		"lng": -96.844753
	},
	{
		"lat": 47.194294,
		"lng": -96.844715
	},
	{
		"lat": 47.19436,
		"lng": -96.844674
	},
	{
		"lat": 47.194464,
		"lng": -96.844626
	},
	{
		"lat": 47.194596,
		"lng": -96.844544
	},
	{
		"lat": 47.194786,
		"lng": -96.844397
	},
	{
		"lat": 47.194914,
		"lng": -96.844251
	},
	{
		"lat": 47.194968,
		"lng": -96.84418
	},
	{
		"lat": 47.195044,
		"lng": -96.844069
	},
	{
		"lat": 47.195127,
		"lng": -96.843967
	},
	{
		"lat": 47.1952,
		"lng": -96.843851
	},
	{
		"lat": 47.19533,
		"lng": -96.84367
	},
	{
		"lat": 47.1955,
		"lng": -96.843475
	},
	{
		"lat": 47.195588,
		"lng": -96.843382
	},
	{
		"lat": 47.195835,
		"lng": -96.843077
	},
	{
		"lat": 47.196077,
		"lng": -96.842761
	},
	{
		"lat": 47.196339,
		"lng": -96.842403
	},
	{
		"lat": 47.196695,
		"lng": -96.841885
	},
	{
		"lat": 47.196968,
		"lng": -96.841467
	},
	{
		"lat": 47.197294,
		"lng": -96.840979
	},
	{
		"lat": 47.197565,
		"lng": -96.84056
	},
	{
		"lat": 47.198089,
		"lng": -96.839767
	},
	{
		"lat": 47.198219,
		"lng": -96.839588
	},
	{
		"lat": 47.198553,
		"lng": -96.839189
	},
	{
		"lat": 47.198839,
		"lng": -96.838873
	},
	{
		"lat": 47.198957,
		"lng": -96.838751
	},
	{
		"lat": 47.199009,
		"lng": -96.838679
	},
	{
		"lat": 47.199097,
		"lng": -96.838589
	},
	{
		"lat": 47.199529,
		"lng": -96.838113
	},
	{
		"lat": 47.199871,
		"lng": -96.837726
	},
	{
		"lat": 47.199931,
		"lng": -96.837668
	},
	{
		"lat": 47.200071,
		"lng": -96.837502
	},
	{
		"lat": 47.200219,
		"lng": -96.837353
	},
	{
		"lat": 47.200334,
		"lng": -96.837226
	},
	{
		"lat": 47.200723,
		"lng": -96.836846
	},
	{
		"lat": 47.200967,
		"lng": -96.836621
	},
	{
		"lat": 47.201091,
		"lng": -96.836513
	},
	{
		"lat": 47.201124,
		"lng": -96.836492
	},
	{
		"lat": 47.201464,
		"lng": -96.836194
	},
	{
		"lat": 47.202149,
		"lng": -96.835515
	},
	{
		"lat": 47.202575,
		"lng": -96.83512
	},
	{
		"lat": 47.202785,
		"lng": -96.834916
	},
	{
		"lat": 47.202847,
		"lng": -96.834862
	},
	{
		"lat": 47.202962,
		"lng": -96.834735
	},
	{
		"lat": 47.203024,
		"lng": -96.834681
	},
	{
		"lat": 47.203259,
		"lng": -96.834438
	},
	{
		"lat": 47.203437,
		"lng": -96.834179
	},
	{
		"lat": 47.203484,
		"lng": -96.834099
	},
	{
		"lat": 47.203548,
		"lng": -96.833972
	},
	{
		"lat": 47.203643,
		"lng": -96.83375
	},
	{
		"lat": 47.203674,
		"lng": -96.833655
	},
	{
		"lat": 47.203694,
		"lng": -96.833606
	},
	{
		"lat": 47.203718,
		"lng": -96.833508
	},
	{
		"lat": 47.203735,
		"lng": -96.833406
	},
	{
		"lat": 47.203744,
		"lng": -96.833249
	},
	{
		"lat": 47.203745,
		"lng": -96.833144
	},
	{
		"lat": 47.203736,
		"lng": -96.832882
	},
	{
		"lat": 47.203728,
		"lng": -96.832778
	},
	{
		"lat": 47.203705,
		"lng": -96.832624
	},
	{
		"lat": 47.203683,
		"lng": -96.832524
	},
	{
		"lat": 47.203643,
		"lng": -96.832378
	},
	{
		"lat": 47.20362,
		"lng": -96.832279
	},
	{
		"lat": 47.203523,
		"lng": -96.832058
	},
	{
		"lat": 47.203468,
		"lng": -96.831922
	},
	{
		"lat": 47.203425,
		"lng": -96.831838
	},
	{
		"lat": 47.20325,
		"lng": -96.831573
	},
	{
		"lat": 47.203113,
		"lng": -96.831402
	},
	{
		"lat": 47.203055,
		"lng": -96.83134
	},
	{
		"lat": 47.202964,
		"lng": -96.831256
	},
	{
		"lat": 47.202646,
		"lng": -96.831007
	},
	{
		"lat": 47.202409,
		"lng": -96.830878
	},
	{
		"lat": 47.201998,
		"lng": -96.830681
	},
	{
		"lat": 47.201753,
		"lng": -96.830593
	},
	{
		"lat": 47.201547,
		"lng": -96.830493
	},
	{
		"lat": 47.201407,
		"lng": -96.830442
	},
	{
		"lat": 47.201269,
		"lng": -96.830378
	},
	{
		"lat": 47.201198,
		"lng": -96.830366
	},
	{
		"lat": 47.201092,
		"lng": -96.83033
	},
	{
		"lat": 47.200821,
		"lng": -96.830186
	},
	{
		"lat": 47.200692,
		"lng": -96.830091
	},
	{
		"lat": 47.200511,
		"lng": -96.829919
	},
	{
		"lat": 47.200428,
		"lng": -96.829817
	},
	{
		"lat": 47.200275,
		"lng": -96.829595
	},
	{
		"lat": 47.200228,
		"lng": -96.829515
	},
	{
		"lat": 47.200188,
		"lng": -96.829428
	},
	{
		"lat": 47.200134,
		"lng": -96.829291
	},
	{
		"lat": 47.200121,
		"lng": -96.829242
	},
	{
		"lat": 47.200068,
		"lng": -96.828938
	},
	{
		"lat": 47.200048,
		"lng": -96.828625
	},
	{
		"lat": 47.20005,
		"lng": -96.828468
	},
	{
		"lat": 47.200061,
		"lng": -96.828364
	},
	{
		"lat": 47.200107,
		"lng": -96.828112
	},
	{
		"lat": 47.200168,
		"lng": -96.827922
	},
	{
		"lat": 47.200233,
		"lng": -96.827795
	},
	{
		"lat": 47.200309,
		"lng": -96.827684
	},
	{
		"lat": 47.200363,
		"lng": -96.827615
	},
	{
		"lat": 47.200423,
		"lng": -96.827555
	},
	{
		"lat": 47.200517,
		"lng": -96.827479
	},
	{
		"lat": 47.200962,
		"lng": -96.827256
	},
	{
		"lat": 47.201137,
		"lng": -96.827195
	},
	{
		"lat": 47.201214,
		"lng": -96.82718
	},
	{
		"lat": 47.201244,
		"lng": -96.827174
	},
	{
		"lat": 47.201316,
		"lng": -96.827167
	},
	{
		"lat": 47.201532,
		"lng": -96.827181
	},
	{
		"lat": 47.201568,
		"lng": -96.827189
	},
	{
		"lat": 47.201672,
		"lng": -96.82723
	},
	{
		"lat": 47.201775,
		"lng": -96.82728
	},
	{
		"lat": 47.201841,
		"lng": -96.827322
	},
	{
		"lat": 47.201944,
		"lng": -96.827373
	},
	{
		"lat": 47.202109,
		"lng": -96.82748
	},
	{
		"lat": 47.20227,
		"lng": -96.827596
	},
	{
		"lat": 47.202491,
		"lng": -96.827774
	},
	{
		"lat": 47.202552,
		"lng": -96.827831
	},
	{
		"lat": 47.202618,
		"lng": -96.827873
	},
	{
		"lat": 47.202648,
		"lng": -96.827902
	},
	{
		"lat": 47.202702,
		"lng": -96.827971
	},
	{
		"lat": 47.202937,
		"lng": -96.828215
	},
	{
		"lat": 47.202998,
		"lng": -96.828271
	},
	{
		"lat": 47.203099,
		"lng": -96.82839
	},
	{
		"lat": 47.20316,
		"lng": -96.828445
	},
	{
		"lat": 47.203218,
		"lng": -96.828508
	},
	{
		"lat": 47.203494,
		"lng": -96.828846
	},
	{
		"lat": 47.203601,
		"lng": -96.828987
	},
	{
		"lat": 47.204031,
		"lng": -96.82962
	},
	{
		"lat": 47.204301,
		"lng": -96.830044
	},
	{
		"lat": 47.204441,
		"lng": -96.830284
	},
	{
		"lat": 47.204508,
		"lng": -96.830407
	},
	{
		"lat": 47.204593,
		"lng": -96.830576
	},
	{
		"lat": 47.204632,
		"lng": -96.830664
	},
	{
		"lat": 47.204929,
		"lng": -96.831257
	},
	{
		"lat": 47.20503,
		"lng": -96.831474
	},
	{
		"lat": 47.205129,
		"lng": -96.831753
	},
	{
		"lat": 47.205182,
		"lng": -96.83189
	},
	{
		"lat": 47.205324,
		"lng": -96.832312
	},
	{
		"lat": 47.205366,
		"lng": -96.832457
	},
	{
		"lat": 47.205384,
		"lng": -96.832503
	},
	{
		"lat": 47.20544,
		"lng": -96.832696
	},
	{
		"lat": 47.205504,
		"lng": -96.832883
	},
	{
		"lat": 47.205543,
		"lng": -96.833028
	},
	{
		"lat": 47.205587,
		"lng": -96.833171
	},
	{
		"lat": 47.205607,
		"lng": -96.833214
	},
	{
		"lat": 47.205701,
		"lng": -96.833498
	},
	{
		"lat": 47.205711,
		"lng": -96.833548
	},
	{
		"lat": 47.205741,
		"lng": -96.833644
	},
	{
		"lat": 47.205776,
		"lng": -96.833735
	},
	{
		"lat": 47.205819,
		"lng": -96.833879
	},
	{
		"lat": 47.20587,
		"lng": -96.834018
	},
	{
		"lat": 47.205894,
		"lng": -96.834116
	},
	{
		"lat": 47.205949,
		"lng": -96.834311
	},
	{
		"lat": 47.206025,
		"lng": -96.834547
	},
	{
		"lat": 47.206106,
		"lng": -96.834839
	},
	{
		"lat": 47.206128,
		"lng": -96.834939
	},
	{
		"lat": 47.206219,
		"lng": -96.835281
	},
	{
		"lat": 47.206238,
		"lng": -96.835325
	},
	{
		"lat": 47.206281,
		"lng": -96.83547
	},
	{
		"lat": 47.20635,
		"lng": -96.835654
	},
	{
		"lat": 47.206392,
		"lng": -96.835799
	},
	{
		"lat": 47.206431,
		"lng": -96.835887
	},
	{
		"lat": 47.206459,
		"lng": -96.835984
	},
	{
		"lat": 47.206552,
		"lng": -96.836212
	},
	{
		"lat": 47.206737,
		"lng": -96.8366
	},
	{
		"lat": 47.206785,
		"lng": -96.836679
	},
	{
		"lat": 47.206937,
		"lng": -96.836903
	},
	{
		"lat": 47.206992,
		"lng": -96.836971
	},
	{
		"lat": 47.207052,
		"lng": -96.83703
	},
	{
		"lat": 47.207116,
		"lng": -96.837078
	},
	{
		"lat": 47.207218,
		"lng": -96.83713
	},
	{
		"lat": 47.207324,
		"lng": -96.837164
	},
	{
		"lat": 47.207468,
		"lng": -96.837178
	},
	{
		"lat": 47.207684,
		"lng": -96.837163
	},
	{
		"lat": 47.20772,
		"lng": -96.837153
	},
	{
		"lat": 47.207754,
		"lng": -96.837136
	},
	{
		"lat": 47.207818,
		"lng": -96.83709
	},
	{
		"lat": 47.207853,
		"lng": -96.837075
	},
	{
		"lat": 47.207981,
		"lng": -96.836981
	},
	{
		"lat": 47.208104,
		"lng": -96.836871
	},
	{
		"lat": 47.208272,
		"lng": -96.836672
	},
	{
		"lat": 47.208397,
		"lng": -96.836483
	},
	{
		"lat": 47.208469,
		"lng": -96.836366
	},
	{
		"lat": 47.208489,
		"lng": -96.836322
	},
	{
		"lat": 47.208556,
		"lng": -96.836136
	},
	{
		"lat": 47.208569,
		"lng": -96.836088
	},
	{
		"lat": 47.208589,
		"lng": -96.835987
	},
	{
		"lat": 47.208606,
		"lng": -96.83594
	},
	{
		"lat": 47.208646,
		"lng": -96.835685
	},
	{
		"lat": 47.208681,
		"lng": -96.835321
	},
	{
		"lat": 47.208706,
		"lng": -96.834798
	},
	{
		"lat": 47.208717,
		"lng": -96.834065
	},
	{
		"lat": 47.208717,
		"lng": -96.833383
	},
	{
		"lat": 47.208738,
		"lng": -96.832859
	},
	{
		"lat": 47.208749,
		"lng": -96.832756
	},
	{
		"lat": 47.208775,
		"lng": -96.832603
	},
	{
		"lat": 47.20882,
		"lng": -96.832295
	},
	{
		"lat": 47.208883,
		"lng": -96.83205
	},
	{
		"lat": 47.20895,
		"lng": -96.831751
	},
	{
		"lat": 47.208977,
		"lng": -96.831654
	},
	{
		"lat": 47.209136,
		"lng": -96.831305
	},
	{
		"lat": 47.209183,
		"lng": -96.831228
	},
	{
		"lat": 47.209272,
		"lng": -96.831063
	},
	{
		"lat": 47.209323,
		"lng": -96.830989
	},
	{
		"lat": 47.209483,
		"lng": -96.830777
	},
	{
		"lat": 47.209543,
		"lng": -96.830718
	},
	{
		"lat": 47.209606,
		"lng": -96.830669
	},
	{
		"lat": 47.209738,
		"lng": -96.830584
	},
	{
		"lat": 47.209807,
		"lng": -96.830554
	},
	{
		"lat": 47.209872,
		"lng": -96.830507
	},
	{
		"lat": 47.210248,
		"lng": -96.830321
	},
	{
		"lat": 47.210283,
		"lng": -96.83031
	},
	{
		"lat": 47.210534,
		"lng": -96.830273
	},
	{
		"lat": 47.210606,
		"lng": -96.830269
	},
	{
		"lat": 47.210931,
		"lng": -96.830285
	},
	{
		"lat": 47.210965,
		"lng": -96.830304
	},
	{
		"lat": 47.21107,
		"lng": -96.830341
	},
	{
		"lat": 47.211204,
		"lng": -96.830419
	},
	{
		"lat": 47.211272,
		"lng": -96.830452
	},
	{
		"lat": 47.211406,
		"lng": -96.830534
	},
	{
		"lat": 47.211467,
		"lng": -96.830588
	},
	{
		"lat": 47.211598,
		"lng": -96.830674
	},
	{
		"lat": 47.21166,
		"lng": -96.830727
	},
	{
		"lat": 47.211719,
		"lng": -96.830787
	},
	{
		"lat": 47.211856,
		"lng": -96.830957
	},
	{
		"lat": 47.21206,
		"lng": -96.831254
	},
	{
		"lat": 47.212385,
		"lng": -96.831745
	},
	{
		"lat": 47.2126,
		"lng": -96.832099
	},
	{
		"lat": 47.213,
		"lng": -96.832775
	},
	{
		"lat": 47.213068,
		"lng": -96.832897
	},
	{
		"lat": 47.213395,
		"lng": -96.833587
	},
	{
		"lat": 47.213595,
		"lng": -96.834023
	},
	{
		"lat": 47.213702,
		"lng": -96.834234
	},
	{
		"lat": 47.21388,
		"lng": -96.834628
	},
	{
		"lat": 47.213896,
		"lng": -96.834675
	},
	{
		"lat": 47.214065,
		"lng": -96.835016
	},
	{
		"lat": 47.214239,
		"lng": -96.835351
	},
	{
		"lat": 47.214504,
		"lng": -96.83578
	},
	{
		"lat": 47.21463,
		"lng": -96.835968
	},
	{
		"lat": 47.214786,
		"lng": -96.836187
	},
	{
		"lat": 47.21495,
		"lng": -96.836392
	},
	{
		"lat": 47.215037,
		"lng": -96.836486
	},
	{
		"lat": 47.215172,
		"lng": -96.836661
	},
	{
		"lat": 47.215258,
		"lng": -96.836756
	},
	{
		"lat": 47.21532,
		"lng": -96.836811
	},
	{
		"lat": 47.21564,
		"lng": -96.837053
	},
	{
		"lat": 47.215774,
		"lng": -96.837133
	},
	{
		"lat": 47.215949,
		"lng": -96.837198
	},
	{
		"lat": 47.216162,
		"lng": -96.837252
	},
	{
		"lat": 47.216233,
		"lng": -96.837275
	},
	{
		"lat": 47.216304,
		"lng": -96.83729
	},
	{
		"lat": 47.216376,
		"lng": -96.837298
	},
	{
		"lat": 47.216448,
		"lng": -96.837284
	},
	{
		"lat": 47.216517,
		"lng": -96.837258
	},
	{
		"lat": 47.216551,
		"lng": -96.83724
	},
	{
		"lat": 47.216622,
		"lng": -96.837218
	},
	{
		"lat": 47.216686,
		"lng": -96.83717
	},
	{
		"lat": 47.216751,
		"lng": -96.837135
	},
	{
		"lat": 47.216783,
		"lng": -96.837112
	},
	{
		"lat": 47.216875,
		"lng": -96.837028
	},
	{
		"lat": 47.21697,
		"lng": -96.836954
	},
	{
		"lat": 47.216999,
		"lng": -96.836922
	},
	{
		"lat": 47.21709,
		"lng": -96.836838
	},
	{
		"lat": 47.217244,
		"lng": -96.836616
	},
	{
		"lat": 47.217342,
		"lng": -96.836464
	},
	{
		"lat": 47.217449,
		"lng": -96.836252
	},
	{
		"lat": 47.217597,
		"lng": -96.835893
	},
	{
		"lat": 47.217686,
		"lng": -96.835665
	},
	{
		"lat": 47.217698,
		"lng": -96.835616
	},
	{
		"lat": 47.217804,
		"lng": -96.835342
	},
	{
		"lat": 47.217835,
		"lng": -96.835247
	},
	{
		"lat": 47.217908,
		"lng": -96.835066
	},
	{
		"lat": 47.217939,
		"lng": -96.834971
	},
	{
		"lat": 47.21798,
		"lng": -96.834886
	},
	{
		"lat": 47.218036,
		"lng": -96.834751
	},
	{
		"lat": 47.21812,
		"lng": -96.834581
	},
	{
		"lat": 47.218177,
		"lng": -96.834447
	},
	{
		"lat": 47.218337,
		"lng": -96.834164
	},
	{
		"lat": 47.21841,
		"lng": -96.834048
	},
	{
		"lat": 47.218734,
		"lng": -96.83363
	},
	{
		"lat": 47.218879,
		"lng": -96.833473
	},
	{
		"lat": 47.219061,
		"lng": -96.833303
	},
	{
		"lat": 47.219126,
		"lng": -96.833258
	},
	{
		"lat": 47.219185,
		"lng": -96.833198
	},
	{
		"lat": 47.219251,
		"lng": -96.833156
	},
	{
		"lat": 47.219455,
		"lng": -96.83305
	},
	{
		"lat": 47.219628,
		"lng": -96.832973
	},
	{
		"lat": 47.219698,
		"lng": -96.832947
	},
	{
		"lat": 47.219912,
		"lng": -96.832907
	},
	{
		"lat": 47.219984,
		"lng": -96.832899
	},
	{
		"lat": 47.220272,
		"lng": -96.832922
	},
	{
		"lat": 47.220416,
		"lng": -96.832944
	},
	{
		"lat": 47.220522,
		"lng": -96.832975
	},
	{
		"lat": 47.220833,
		"lng": -96.833114
	},
	{
		"lat": 47.221038,
		"lng": -96.833217
	},
	{
		"lat": 47.221267,
		"lng": -96.833371
	},
	{
		"lat": 47.221362,
		"lng": -96.833447
	},
	{
		"lat": 47.221451,
		"lng": -96.833536
	},
	{
		"lat": 47.221577,
		"lng": -96.83364
	},
	{
		"lat": 47.221723,
		"lng": -96.833794
	},
	{
		"lat": 47.221934,
		"lng": -96.833996
	},
	{
		"lat": 47.221989,
		"lng": -96.834065
	},
	{
		"lat": 47.222142,
		"lng": -96.834287
	},
	{
		"lat": 47.222412,
		"lng": -96.83471
	},
	{
		"lat": 47.222475,
		"lng": -96.834838
	},
	{
		"lat": 47.222573,
		"lng": -96.835059
	},
	{
		"lat": 47.222695,
		"lng": -96.83538
	},
	{
		"lat": 47.222723,
		"lng": -96.835477
	},
	{
		"lat": 47.222759,
		"lng": -96.835568
	},
	{
		"lat": 47.222864,
		"lng": -96.836014
	},
	{
		"lat": 47.222904,
		"lng": -96.836161
	},
	{
		"lat": 47.222942,
		"lng": -96.836363
	},
	{
		"lat": 47.222986,
		"lng": -96.836672
	},
	{
		"lat": 47.223002,
		"lng": -96.836827
	},
	{
		"lat": 47.223018,
		"lng": -96.837035
	},
	{
		"lat": 47.223023,
		"lng": -96.837193
	},
	{
		"lat": 47.223023,
		"lng": -96.83735
	},
	{
		"lat": 47.223009,
		"lng": -96.837874
	},
	{
		"lat": 47.222996,
		"lng": -96.83803
	},
	{
		"lat": 47.22297,
		"lng": -96.838183
	},
	{
		"lat": 47.222912,
		"lng": -96.838431
	},
	{
		"lat": 47.222868,
		"lng": -96.838574
	},
	{
		"lat": 47.222813,
		"lng": -96.83871
	},
	{
		"lat": 47.22278,
		"lng": -96.838803
	},
	{
		"lat": 47.222728,
		"lng": -96.838926
	},
	{
		"lat": 47.222713,
		"lng": -96.838973
	},
	{
		"lat": 47.222651,
		"lng": -96.839103
	},
	{
		"lat": 47.222604,
		"lng": -96.839182
	},
	{
		"lat": 47.222453,
		"lng": -96.839408
	},
	{
		"lat": 47.222375,
		"lng": -96.839517
	},
	{
		"lat": 47.222294,
		"lng": -96.839621
	},
	{
		"lat": 47.222205,
		"lng": -96.839712
	},
	{
		"lat": 47.222046,
		"lng": -96.839836
	},
	{
		"lat": 47.221881,
		"lng": -96.839941
	},
	{
		"lat": 47.221742,
		"lng": -96.839995
	},
	{
		"lat": 47.221604,
		"lng": -96.84006
	},
	{
		"lat": 47.221534,
		"lng": -96.840085
	},
	{
		"lat": 47.221104,
		"lng": -96.840168
	},
	{
		"lat": 47.220888,
		"lng": -96.840182
	},
	{
		"lat": 47.220347,
		"lng": -96.840188
	},
	{
		"lat": 47.219985,
		"lng": -96.840167
	},
	{
		"lat": 47.219769,
		"lng": -96.840161
	},
	{
		"lat": 47.219336,
		"lng": -96.840184
	},
	{
		"lat": 47.219157,
		"lng": -96.840217
	},
	{
		"lat": 47.21898,
		"lng": -96.840271
	},
	{
		"lat": 47.218776,
		"lng": -96.840374
	},
	{
		"lat": 47.21871,
		"lng": -96.840415
	},
	{
		"lat": 47.218645,
		"lng": -96.840463
	},
	{
		"lat": 47.218552,
		"lng": -96.840541
	},
	{
		"lat": 47.218436,
		"lng": -96.840667
	},
	{
		"lat": 47.218272,
		"lng": -96.84087
	},
	{
		"lat": 47.218083,
		"lng": -96.841187
	},
	{
		"lat": 47.218009,
		"lng": -96.841366
	},
	{
		"lat": 47.217977,
		"lng": -96.841461
	},
	{
		"lat": 47.21794,
		"lng": -96.84155
	},
	{
		"lat": 47.217908,
		"lng": -96.841644
	},
	{
		"lat": 47.217866,
		"lng": -96.841788
	},
	{
		"lat": 47.217829,
		"lng": -96.841936
	},
	{
		"lat": 47.217788,
		"lng": -96.842137
	},
	{
		"lat": 47.217749,
		"lng": -96.842393
	},
	{
		"lat": 47.217736,
		"lng": -96.842549
	},
	{
		"lat": 47.217728,
		"lng": -96.842706
	},
	{
		"lat": 47.217724,
		"lng": -96.842915
	},
	{
		"lat": 47.217752,
		"lng": -96.84328
	},
	{
		"lat": 47.217788,
		"lng": -96.843429
	},
	{
		"lat": 47.217795,
		"lng": -96.84348
	},
	{
		"lat": 47.217827,
		"lng": -96.84363
	},
	{
		"lat": 47.217926,
		"lng": -96.843967
	},
	{
		"lat": 47.217961,
		"lng": -96.844058
	},
	{
		"lat": 47.218023,
		"lng": -96.844187
	},
	{
		"lat": 47.218095,
		"lng": -96.844306
	},
	{
		"lat": 47.218219,
		"lng": -96.844495
	},
	{
		"lat": 47.21861,
		"lng": -96.84504
	},
	{
		"lat": 47.218665,
		"lng": -96.845107
	},
	{
		"lat": 47.21878,
		"lng": -96.845234
	},
	{
		"lat": 47.218964,
		"lng": -96.8454
	},
	{
		"lat": 47.219092,
		"lng": -96.845498
	},
	{
		"lat": 47.219261,
		"lng": -96.845587
	},
	{
		"lat": 47.219582,
		"lng": -96.84567
	},
	{
		"lat": 47.219833,
		"lng": -96.845712
	},
	{
		"lat": 47.219904,
		"lng": -96.84573
	},
	{
		"lat": 47.220003,
		"lng": -96.845764
	},
	{
		"lat": 47.22011,
		"lng": -96.845788
	},
	{
		"lat": 47.22029,
		"lng": -96.845807
	},
	{
		"lat": 47.220543,
		"lng": -96.84579
	},
	{
		"lat": 47.220865,
		"lng": -96.84573
	},
	{
		"lat": 47.220972,
		"lng": -96.845704
	},
	{
		"lat": 47.221107,
		"lng": -96.845634
	},
	{
		"lat": 47.221305,
		"lng": -96.845507
	},
	{
		"lat": 47.221402,
		"lng": -96.845435
	},
	{
		"lat": 47.221706,
		"lng": -96.845154
	},
	{
		"lat": 47.221789,
		"lng": -96.845053
	},
	{
		"lat": 47.22192,
		"lng": -96.844872
	},
	{
		"lat": 47.222301,
		"lng": -96.844313
	},
	{
		"lat": 47.222395,
		"lng": -96.844155
	},
	{
		"lat": 47.222461,
		"lng": -96.84403
	},
	{
		"lat": 47.222523,
		"lng": -96.843901
	},
	{
		"lat": 47.222581,
		"lng": -96.843768
	},
	{
		"lat": 47.22271,
		"lng": -96.843516
	},
	{
		"lat": 47.222749,
		"lng": -96.843427
	},
	{
		"lat": 47.222815,
		"lng": -96.843303
	},
	{
		"lat": 47.223091,
		"lng": -96.842688
	},
	{
		"lat": 47.223254,
		"lng": -96.842279
	},
	{
		"lat": 47.223333,
		"lng": -96.842044
	},
	{
		"lat": 47.223354,
		"lng": -96.842001
	},
	{
		"lat": 47.223408,
		"lng": -96.841865
	},
	{
		"lat": 47.223451,
		"lng": -96.841721
	},
	{
		"lat": 47.223537,
		"lng": -96.841491
	},
	{
		"lat": 47.22359,
		"lng": -96.841296
	},
	{
		"lat": 47.223625,
		"lng": -96.841205
	},
	{
		"lat": 47.223638,
		"lng": -96.841156
	},
	{
		"lat": 47.223687,
		"lng": -96.841016
	},
	{
		"lat": 47.223713,
		"lng": -96.840918
	},
	{
		"lat": 47.223758,
		"lng": -96.840775
	},
	{
		"lat": 47.223806,
		"lng": -96.840577
	},
	{
		"lat": 47.223821,
		"lng": -96.84053
	},
	{
		"lat": 47.223907,
		"lng": -96.840184
	},
	{
		"lat": 47.22416,
		"lng": -96.839316
	},
	{
		"lat": 47.22425,
		"lng": -96.83903
	},
	{
		"lat": 47.224291,
		"lng": -96.838884
	},
	{
		"lat": 47.224325,
		"lng": -96.838792
	},
	{
		"lat": 47.224334,
		"lng": -96.838741
	},
	{
		"lat": 47.224368,
		"lng": -96.838649
	},
	{
		"lat": 47.224444,
		"lng": -96.83838
	},
	{
		"lat": 47.224684,
		"lng": -96.837335
	},
	{
		"lat": 47.224701,
		"lng": -96.837234
	},
	{
		"lat": 47.224748,
		"lng": -96.837035
	},
	{
		"lat": 47.224811,
		"lng": -96.836625
	},
	{
		"lat": 47.224877,
		"lng": -96.83611
	},
	{
		"lat": 47.225036,
		"lng": -96.835358
	},
	{
		"lat": 47.225082,
		"lng": -96.835104
	},
	{
		"lat": 47.225134,
		"lng": -96.834853
	},
	{
		"lat": 47.225153,
		"lng": -96.834698
	},
	{
		"lat": 47.22524,
		"lng": -96.834136
	},
	{
		"lat": 47.22531,
		"lng": -96.833838
	},
	{
		"lat": 47.22541,
		"lng": -96.833444
	},
	{
		"lat": 47.225538,
		"lng": -96.833011
	},
	{
		"lat": 47.225603,
		"lng": -96.832824
	},
	{
		"lat": 47.225632,
		"lng": -96.832728
	},
	{
		"lat": 47.225805,
		"lng": -96.832329
	},
	{
		"lat": 47.225936,
		"lng": -96.832078
	},
	{
		"lat": 47.226012,
		"lng": -96.831966
	},
	{
		"lat": 47.226146,
		"lng": -96.831791
	},
	{
		"lat": 47.226175,
		"lng": -96.831759
	},
	{
		"lat": 47.226302,
		"lng": -96.831661
	},
	{
		"lat": 47.226401,
		"lng": -96.831595
	},
	{
		"lat": 47.226606,
		"lng": -96.831494
	},
	{
		"lat": 47.226711,
		"lng": -96.831454
	},
	{
		"lat": 47.226819,
		"lng": -96.831439
	},
	{
		"lat": 47.226963,
		"lng": -96.831431
	},
	{
		"lat": 47.227251,
		"lng": -96.831463
	},
	{
		"lat": 47.227462,
		"lng": -96.831539
	},
	{
		"lat": 47.2276,
		"lng": -96.831602
	},
	{
		"lat": 47.22786,
		"lng": -96.831782
	},
	{
		"lat": 47.227956,
		"lng": -96.831855
	},
	{
		"lat": 47.228015,
		"lng": -96.831917
	},
	{
		"lat": 47.228124,
		"lng": -96.832055
	},
	{
		"lat": 47.228352,
		"lng": -96.83239
	},
	{
		"lat": 47.228497,
		"lng": -96.832623
	},
	{
		"lat": 47.228624,
		"lng": -96.832878
	},
	{
		"lat": 47.228832,
		"lng": -96.833429
	},
	{
		"lat": 47.22902,
		"lng": -96.833996
	},
	{
		"lat": 47.229087,
		"lng": -96.834181
	},
	{
		"lat": 47.229123,
		"lng": -96.83433
	},
	{
		"lat": 47.229164,
		"lng": -96.834475
	},
	{
		"lat": 47.229182,
		"lng": -96.83452
	},
	{
		"lat": 47.229282,
		"lng": -96.834857
	},
	{
		"lat": 47.229361,
		"lng": -96.835205
	},
	{
		"lat": 47.229375,
		"lng": -96.835334
	},
	{
		"lat": 47.229389,
		"lng": -96.835383
	},
	{
		"lat": 47.229449,
		"lng": -96.835739
	},
	{
		"lat": 47.22946,
		"lng": -96.835843
	},
	{
		"lat": 47.229477,
		"lng": -96.836157
	},
	{
		"lat": 47.229471,
		"lng": -96.836471
	},
	{
		"lat": 47.229449,
		"lng": -96.836678
	},
	{
		"lat": 47.229413,
		"lng": -96.836882
	},
	{
		"lat": 47.229194,
		"lng": -96.837989
	},
	{
		"lat": 47.229134,
		"lng": -96.8384
	},
	{
		"lat": 47.229098,
		"lng": -96.838709
	},
	{
		"lat": 47.229064,
		"lng": -96.839336
	},
	{
		"lat": 47.229066,
		"lng": -96.839546
	},
	{
		"lat": 47.22909,
		"lng": -96.839858
	},
	{
		"lat": 47.229114,
		"lng": -96.840064
	},
	{
		"lat": 47.229162,
		"lng": -96.840371
	},
	{
		"lat": 47.229223,
		"lng": -96.840672
	},
	{
		"lat": 47.229248,
		"lng": -96.84077
	},
	{
		"lat": 47.229265,
		"lng": -96.840816
	},
	{
		"lat": 47.229286,
		"lng": -96.840896
	},
	{
		"lat": 47.229319,
		"lng": -96.840997
	},
	{
		"lat": 47.229404,
		"lng": -96.841228
	},
	{
		"lat": 47.229462,
		"lng": -96.841361
	},
	{
		"lat": 47.229508,
		"lng": -96.841441
	},
	{
		"lat": 47.229712,
		"lng": -96.841739
	},
	{
		"lat": 47.2299,
		"lng": -96.841982
	},
	{
		"lat": 47.230178,
		"lng": -96.842318
	},
	{
		"lat": 47.230291,
		"lng": -96.842448
	},
	{
		"lat": 47.230415,
		"lng": -96.842554
	},
	{
		"lat": 47.23058,
		"lng": -96.842662
	},
	{
		"lat": 47.230684,
		"lng": -96.842704
	},
	{
		"lat": 47.230825,
		"lng": -96.842751
	},
	{
		"lat": 47.230932,
		"lng": -96.842778
	},
	{
		"lat": 47.231004,
		"lng": -96.842787
	},
	{
		"lat": 47.231328,
		"lng": -96.842762
	},
	{
		"lat": 47.231649,
		"lng": -96.842691
	},
	{
		"lat": 47.231719,
		"lng": -96.842663
	},
	{
		"lat": 47.231819,
		"lng": -96.842603
	},
	{
		"lat": 47.232056,
		"lng": -96.842479
	},
	{
		"lat": 47.232248,
		"lng": -96.842334
	},
	{
		"lat": 47.232286,
		"lng": -96.842303
	},
	{
		"lat": 47.232342,
		"lng": -96.842257
	},
	{
		"lat": 47.232376,
		"lng": -96.842241
	},
	{
		"lat": 47.232448,
		"lng": -96.842167
	},
	{
		"lat": 47.232577,
		"lng": -96.842075
	},
	{
		"lat": 47.232638,
		"lng": -96.842018
	},
	{
		"lat": 47.232763,
		"lng": -96.841915
	},
	{
		"lat": 47.232884,
		"lng": -96.841801
	},
	{
		"lat": 47.232917,
		"lng": -96.841779
	},
	{
		"lat": 47.233031,
		"lng": -96.84165
	},
	{
		"lat": 47.233208,
		"lng": -96.841469
	},
	{
		"lat": 47.233262,
		"lng": -96.841398
	},
	{
		"lat": 47.233415,
		"lng": -96.841176
	},
	{
		"lat": 47.23359,
		"lng": -96.84091
	},
	{
		"lat": 47.233879,
		"lng": -96.840442
	},
	{
		"lat": 47.234102,
		"lng": -96.840031
	},
	{
		"lat": 47.234289,
		"lng": -96.839711
	},
	{
		"lat": 47.234367,
		"lng": -96.839535
	},
	{
		"lat": 47.23453,
		"lng": -96.839127
	},
	{
		"lat": 47.234695,
		"lng": -96.838662
	},
	{
		"lat": 47.234707,
		"lng": -96.838612
	},
	{
		"lat": 47.234756,
		"lng": -96.838472
	},
	{
		"lat": 47.234799,
		"lng": -96.838327
	},
	{
		"lat": 47.234888,
		"lng": -96.837929
	},
	{
		"lat": 47.234936,
		"lng": -96.837676
	},
	{
		"lat": 47.234963,
		"lng": -96.837417
	},
	{
		"lat": 47.234985,
		"lng": -96.837263
	},
	{
		"lat": 47.234995,
		"lng": -96.837106
	},
	{
		"lat": 47.234995,
		"lng": -96.837054
	},
	{
		"lat": 47.234984,
		"lng": -96.836897
	},
	{
		"lat": 47.234952,
		"lng": -96.836639
	},
	{
		"lat": 47.234908,
		"lng": -96.836439
	},
	{
		"lat": 47.234868,
		"lng": -96.836293
	},
	{
		"lat": 47.234804,
		"lng": -96.836105
	},
	{
		"lat": 47.234749,
		"lng": -96.835969
	},
	{
		"lat": 47.23457,
		"lng": -96.835575
	},
	{
		"lat": 47.234483,
		"lng": -96.835408
	},
	{
		"lat": 47.234308,
		"lng": -96.835142
	},
	{
		"lat": 47.234105,
		"lng": -96.834844
	},
	{
		"lat": 47.233889,
		"lng": -96.834566
	},
	{
		"lat": 47.233805,
		"lng": -96.834465
	},
	{
		"lat": 47.233632,
		"lng": -96.834277
	},
	{
		"lat": 47.233365,
		"lng": -96.834008
	},
	{
		"lat": 47.233183,
		"lng": -96.833837
	},
	{
		"lat": 47.232873,
		"lng": -96.833568
	},
	{
		"lat": 47.232683,
		"lng": -96.833417
	},
	{
		"lat": 47.232623,
		"lng": -96.833361
	},
	{
		"lat": 47.232557,
		"lng": -96.833316
	},
	{
		"lat": 47.232215,
		"lng": -96.833025
	},
	{
		"lat": 47.23179,
		"lng": -96.832627
	},
	{
		"lat": 47.231622,
		"lng": -96.832428
	},
	{
		"lat": 47.231542,
		"lng": -96.832322
	},
	{
		"lat": 47.231443,
		"lng": -96.83217
	},
	{
		"lat": 47.231405,
		"lng": -96.832081
	},
	{
		"lat": 47.23139,
		"lng": -96.832033
	},
	{
		"lat": 47.23138,
		"lng": -96.831983
	},
	{
		"lat": 47.231354,
		"lng": -96.831894
	},
	{
		"lat": 47.231307,
		"lng": -96.83164
	},
	{
		"lat": 47.231289,
		"lng": -96.831432
	},
	{
		"lat": 47.23128,
		"lng": -96.831275
	},
	{
		"lat": 47.231276,
		"lng": -96.830961
	},
	{
		"lat": 47.231281,
		"lng": -96.830856
	},
	{
		"lat": 47.231312,
		"lng": -96.830545
	},
	{
		"lat": 47.231346,
		"lng": -96.830341
	},
	{
		"lat": 47.231387,
		"lng": -96.830196
	},
	{
		"lat": 47.23141,
		"lng": -96.830096
	},
	{
		"lat": 47.231456,
		"lng": -96.829955
	},
	{
		"lat": 47.231597,
		"lng": -96.82965
	},
	{
		"lat": 47.231614,
		"lng": -96.829604
	},
	{
		"lat": 47.231716,
		"lng": -96.829388
	},
	{
		"lat": 47.231767,
		"lng": -96.829314
	},
	{
		"lat": 47.231933,
		"lng": -96.829113
	},
	{
		"lat": 47.231991,
		"lng": -96.829051
	},
	{
		"lat": 47.232053,
		"lng": -96.828998
	},
	{
		"lat": 47.232088,
		"lng": -96.828985
	},
	{
		"lat": 47.232155,
		"lng": -96.828948
	},
	{
		"lat": 47.232253,
		"lng": -96.82888
	},
	{
		"lat": 47.232321,
		"lng": -96.828844
	},
	{
		"lat": 47.232495,
		"lng": -96.828778
	},
	{
		"lat": 47.232567,
		"lng": -96.828762
	},
	{
		"lat": 47.232997,
		"lng": -96.828694
	},
	{
		"lat": 47.233286,
		"lng": -96.828672
	},
	{
		"lat": 47.233502,
		"lng": -96.82869
	},
	{
		"lat": 47.233826,
		"lng": -96.828734
	},
	{
		"lat": 47.233967,
		"lng": -96.828778
	},
	{
		"lat": 47.234248,
		"lng": -96.828878
	},
	{
		"lat": 47.234456,
		"lng": -96.828969
	},
	{
		"lat": 47.234591,
		"lng": -96.829041
	},
	{
		"lat": 47.234723,
		"lng": -96.829126
	},
	{
		"lat": 47.234881,
		"lng": -96.829255
	},
	{
		"lat": 47.234946,
		"lng": -96.829299
	},
	{
		"lat": 47.235004,
		"lng": -96.829363
	},
	{
		"lat": 47.235406,
		"lng": -96.829713
	},
	{
		"lat": 47.235702,
		"lng": -96.830013
	},
	{
		"lat": 47.235765,
		"lng": -96.830065
	},
	{
		"lat": 47.235908,
		"lng": -96.830223
	},
	{
		"lat": 47.236032,
		"lng": -96.830332
	},
	{
		"lat": 47.236092,
		"lng": -96.830391
	},
	{
		"lat": 47.236187,
		"lng": -96.830464
	},
	{
		"lat": 47.236245,
		"lng": -96.830527
	},
	{
		"lat": 47.236306,
		"lng": -96.830584
	},
	{
		"lat": 47.236334,
		"lng": -96.830618
	},
	{
		"lat": 47.236395,
		"lng": -96.830673
	},
	{
		"lat": 47.236535,
		"lng": -96.830838
	},
	{
		"lat": 47.236667,
		"lng": -96.831018
	},
	{
		"lat": 47.236793,
		"lng": -96.831206
	},
	{
		"lat": 47.237014,
		"lng": -96.831552
	},
	{
		"lat": 47.237156,
		"lng": -96.831789
	},
	{
		"lat": 47.237386,
		"lng": -96.832194
	},
	{
		"lat": 47.23777,
		"lng": -96.832891
	},
	{
		"lat": 47.238012,
		"lng": -96.833348
	},
	{
		"lat": 47.238041,
		"lng": -96.833393
	},
	{
		"lat": 47.238085,
		"lng": -96.833464
	},
	{
		"lat": 47.238628,
		"lng": -96.834235
	},
	{
		"lat": 47.238892,
		"lng": -96.834593
	},
	{
		"lat": 47.238973,
		"lng": -96.834697
	},
	{
		"lat": 47.239121,
		"lng": -96.834847
	},
	{
		"lat": 47.239341,
		"lng": -96.835028
	},
	{
		"lat": 47.239375,
		"lng": -96.835048
	},
	{
		"lat": 47.23948,
		"lng": -96.835134
	},
	{
		"lat": 47.239642,
		"lng": -96.835249
	},
	{
		"lat": 47.239676,
		"lng": -96.835268
	},
	{
		"lat": 47.239849,
		"lng": -96.835343
	},
	{
		"lat": 47.240061,
		"lng": -96.835411
	},
	{
		"lat": 47.240274,
		"lng": -96.835465
	},
	{
		"lat": 47.240812,
		"lng": -96.835565
	},
	{
		"lat": 47.241311,
		"lng": -96.835689
	},
	{
		"lat": 47.241381,
		"lng": -96.835713
	},
	{
		"lat": 47.241559,
		"lng": -96.83576
	},
	{
		"lat": 47.241664,
		"lng": -96.835799
	},
	{
		"lat": 47.241802,
		"lng": -96.835859
	},
	{
		"lat": 47.241936,
		"lng": -96.835939
	},
	{
		"lat": 47.241967,
		"lng": -96.835964
	},
	{
		"lat": 47.241996,
		"lng": -96.835996
	},
	{
		"lat": 47.242059,
		"lng": -96.836049
	},
	{
		"lat": 47.242117,
		"lng": -96.836111
	},
	{
		"lat": 47.242365,
		"lng": -96.836493
	},
	{
		"lat": 47.242387,
		"lng": -96.836535
	},
	{
		"lat": 47.24246,
		"lng": -96.836716
	},
	{
		"lat": 47.242518,
		"lng": -96.836908
	},
	{
		"lat": 47.242551,
		"lng": -96.837112
	},
	{
		"lat": 47.242559,
		"lng": -96.837269
	},
	{
		"lat": 47.242551,
		"lng": -96.837531
	},
	{
		"lat": 47.242533,
		"lng": -96.837687
	},
	{
		"lat": 47.242488,
		"lng": -96.837941
	},
	{
		"lat": 47.242431,
		"lng": -96.838134
	},
	{
		"lat": 47.242397,
		"lng": -96.838227
	},
	{
		"lat": 47.242314,
		"lng": -96.838398
	},
	{
		"lat": 47.242246,
		"lng": -96.838521
	},
	{
		"lat": 47.242123,
		"lng": -96.838713
	},
	{
		"lat": 47.241971,
		"lng": -96.838938
	},
	{
		"lat": 47.241865,
		"lng": -96.839081
	},
	{
		"lat": 47.241807,
		"lng": -96.839143
	},
	{
		"lat": 47.241742,
		"lng": -96.839188
	},
	{
		"lat": 47.241711,
		"lng": -96.839216
	},
	{
		"lat": 47.241624,
		"lng": -96.83931
	},
	{
		"lat": 47.24146,
		"lng": -96.839417
	},
	{
		"lat": 47.241326,
		"lng": -96.839496
	},
	{
		"lat": 47.241258,
		"lng": -96.839529
	},
	{
		"lat": 47.241226,
		"lng": -96.839554
	},
	{
		"lat": 47.240778,
		"lng": -96.839756
	},
	{
		"lat": 47.24046,
		"lng": -96.839853
	},
	{
		"lat": 47.240104,
		"lng": -96.839947
	},
	{
		"lat": 47.239892,
		"lng": -96.84001
	},
	{
		"lat": 47.239823,
		"lng": -96.84004
	},
	{
		"lat": 47.239682,
		"lng": -96.840088
	},
	{
		"lat": 47.239545,
		"lng": -96.840154
	},
	{
		"lat": 47.239446,
		"lng": -96.840218
	},
	{
		"lat": 47.239351,
		"lng": -96.840291
	},
	{
		"lat": 47.239144,
		"lng": -96.840504
	},
	{
		"lat": 47.239062,
		"lng": -96.840607
	},
	{
		"lat": 47.238958,
		"lng": -96.840751
	},
	{
		"lat": 47.238916,
		"lng": -96.840836
	},
	{
		"lat": 47.238835,
		"lng": -96.84107
	},
	{
		"lat": 47.238799,
		"lng": -96.841218
	},
	{
		"lat": 47.238783,
		"lng": -96.84132
	},
	{
		"lat": 47.238766,
		"lng": -96.841528
	},
	{
		"lat": 47.238773,
		"lng": -96.841737
	},
	{
		"lat": 47.238785,
		"lng": -96.841946
	},
	{
		"lat": 47.238801,
		"lng": -96.842102
	},
	{
		"lat": 47.238835,
		"lng": -96.842358
	},
	{
		"lat": 47.238884,
		"lng": -96.842556
	},
	{
		"lat": 47.238981,
		"lng": -96.842836
	},
	{
		"lat": 47.239023,
		"lng": -96.842922
	},
	{
		"lat": 47.23914,
		"lng": -96.84312
	},
	{
		"lat": 47.239266,
		"lng": -96.843307
	},
	{
		"lat": 47.239398,
		"lng": -96.843486
	},
	{
		"lat": 47.239486,
		"lng": -96.843579
	},
	{
		"lat": 47.239613,
		"lng": -96.843662
	},
	{
		"lat": 47.239717,
		"lng": -96.843701
	},
	{
		"lat": 47.239788,
		"lng": -96.843721
	},
	{
		"lat": 47.239931,
		"lng": -96.843751
	},
	{
		"lat": 47.240328,
		"lng": -96.843782
	},
	{
		"lat": 47.240544,
		"lng": -96.843767
	},
	{
		"lat": 47.240903,
		"lng": -96.843698
	},
	{
		"lat": 47.241147,
		"lng": -96.843603
	},
	{
		"lat": 47.241684,
		"lng": -96.843299
	},
	{
		"lat": 47.241746,
		"lng": -96.843247
	},
	{
		"lat": 47.241941,
		"lng": -96.84311
	},
	{
		"lat": 47.242088,
		"lng": -96.84296
	},
	{
		"lat": 47.242174,
		"lng": -96.842864
	},
	{
		"lat": 47.242339,
		"lng": -96.84266
	},
	{
		"lat": 47.242389,
		"lng": -96.842585
	},
	{
		"lat": 47.242684,
		"lng": -96.8422
	},
	{
		"lat": 47.242815,
		"lng": -96.842019
	},
	{
		"lat": 47.243063,
		"lng": -96.84164
	},
	{
		"lat": 47.243111,
		"lng": -96.84156
	},
	{
		"lat": 47.24313,
		"lng": -96.841516
	},
	{
		"lat": 47.243274,
		"lng": -96.841281
	},
	{
		"lat": 47.243366,
		"lng": -96.841119
	},
	{
		"lat": 47.243496,
		"lng": -96.840869
	},
	{
		"lat": 47.243587,
		"lng": -96.840706
	},
	{
		"lat": 47.243645,
		"lng": -96.840574
	},
	{
		"lat": 47.243669,
		"lng": -96.840534
	},
	{
		"lat": 47.243746,
		"lng": -96.840357
	},
	{
		"lat": 47.243947,
		"lng": -96.83986
	},
	{
		"lat": 47.244008,
		"lng": -96.83973
	},
	{
		"lat": 47.244078,
		"lng": -96.839547
	},
	{
		"lat": 47.244193,
		"lng": -96.839222
	},
	{
		"lat": 47.244255,
		"lng": -96.839033
	},
	{
		"lat": 47.244266,
		"lng": -96.838983
	},
	{
		"lat": 47.244298,
		"lng": -96.838888
	},
	{
		"lat": 47.244412,
		"lng": -96.838446
	},
	{
		"lat": 47.244467,
		"lng": -96.838253
	},
	{
		"lat": 47.244513,
		"lng": -96.838054
	},
	{
		"lat": 47.244607,
		"lng": -96.837714
	},
	{
		"lat": 47.244698,
		"lng": -96.837315
	},
	{
		"lat": 47.244748,
		"lng": -96.837009
	},
	{
		"lat": 47.244791,
		"lng": -96.836701
	},
	{
		"lat": 47.24483,
		"lng": -96.836554
	},
	{
		"lat": 47.244839,
		"lng": -96.83645
	},
	{
		"lat": 47.244871,
		"lng": -96.8363
	},
	{
		"lat": 47.244903,
		"lng": -96.836095
	},
	{
		"lat": 47.244938,
		"lng": -96.835946
	},
	{
		"lat": 47.244959,
		"lng": -96.835792
	},
	{
		"lat": 47.244973,
		"lng": -96.835744
	},
	{
		"lat": 47.244999,
		"lng": -96.835591
	},
	{
		"lat": 47.245034,
		"lng": -96.835442
	},
	{
		"lat": 47.245049,
		"lng": -96.835395
	},
	{
		"lat": 47.245149,
		"lng": -96.835002
	},
	{
		"lat": 47.245179,
		"lng": -96.834907
	},
	{
		"lat": 47.245215,
		"lng": -96.834759
	},
	{
		"lat": 47.24526,
		"lng": -96.834615
	},
	{
		"lat": 47.245271,
		"lng": -96.834566
	},
	{
		"lat": 47.245381,
		"lng": -96.834236
	},
	{
		"lat": 47.245437,
		"lng": -96.834101
	},
	{
		"lat": 47.245468,
		"lng": -96.834007
	},
	{
		"lat": 47.245497,
		"lng": -96.833948
	},
	{
		"lat": 47.245585,
		"lng": -96.833719
	},
	{
		"lat": 47.245668,
		"lng": -96.833548
	},
	{
		"lat": 47.245703,
		"lng": -96.833456
	},
	{
		"lat": 47.245745,
		"lng": -96.833371
	},
	{
		"lat": 47.245869,
		"lng": -96.833181
	},
	{
		"lat": 47.246023,
		"lng": -96.83296
	},
	{
		"lat": 47.246209,
		"lng": -96.83271
	},
	{
		"lat": 47.24641,
		"lng": -96.832488
	},
	{
		"lat": 47.246531,
		"lng": -96.832374
	},
	{
		"lat": 47.246658,
		"lng": -96.832274
	},
	{
		"lat": 47.24683,
		"lng": -96.832193
	},
	{
		"lat": 47.246865,
		"lng": -96.832181
	},
	{
		"lat": 47.247008,
		"lng": -96.832154
	},
	{
		"lat": 47.247333,
		"lng": -96.83215
	},
	{
		"lat": 47.247369,
		"lng": -96.832155
	},
	{
		"lat": 47.247475,
		"lng": -96.832188
	},
	{
		"lat": 47.247681,
		"lng": -96.832281
	},
	{
		"lat": 47.247748,
		"lng": -96.832321
	},
	{
		"lat": 47.247842,
		"lng": -96.832398
	},
	{
		"lat": 47.247909,
		"lng": -96.83244
	},
	{
		"lat": 47.24797,
		"lng": -96.832494
	},
	{
		"lat": 47.248149,
		"lng": -96.832672
	},
	{
		"lat": 47.248214,
		"lng": -96.832719
	},
	{
		"lat": 47.248361,
		"lng": -96.832871
	},
	{
		"lat": 47.248453,
		"lng": -96.832955
	},
	{
		"lat": 47.24868,
		"lng": -96.833213
	},
	{
		"lat": 47.248782,
		"lng": -96.833363
	},
	{
		"lat": 47.248903,
		"lng": -96.833557
	},
	{
		"lat": 47.249195,
		"lng": -96.834091
	},
	{
		"lat": 47.24932,
		"lng": -96.83428
	},
	{
		"lat": 47.249667,
		"lng": -96.83474
	},
	{
		"lat": 47.24981,
		"lng": -96.834899
	},
	{
		"lat": 47.249958,
		"lng": -96.83505
	},
	{
		"lat": 47.250128,
		"lng": -96.835244
	},
	{
		"lat": 47.25019,
		"lng": -96.835298
	},
	{
		"lat": 47.250291,
		"lng": -96.835355
	},
	{
		"lat": 47.250323,
		"lng": -96.835378
	},
	{
		"lat": 47.250385,
		"lng": -96.835434
	},
	{
		"lat": 47.250553,
		"lng": -96.835528
	},
	{
		"lat": 47.250618,
		"lng": -96.835573
	},
	{
		"lat": 47.250686,
		"lng": -96.835606
	},
	{
		"lat": 47.250786,
		"lng": -96.835667
	},
	{
		"lat": 47.251148,
		"lng": -96.835906
	},
	{
		"lat": 47.251182,
		"lng": -96.835923
	},
	{
		"lat": 47.251313,
		"lng": -96.83601
	},
	{
		"lat": 47.251408,
		"lng": -96.836086
	},
	{
		"lat": 47.251507,
		"lng": -96.836151
	},
	{
		"lat": 47.251812,
		"lng": -96.836312
	},
	{
		"lat": 47.252181,
		"lng": -96.836529
	},
	{
		"lat": 47.252475,
		"lng": -96.836729
	},
	{
		"lat": 47.252699,
		"lng": -96.836899
	},
	{
		"lat": 47.252824,
		"lng": -96.837005
	},
	{
		"lat": 47.252882,
		"lng": -96.837067
	},
	{
		"lat": 47.253003,
		"lng": -96.837262
	},
	{
		"lat": 47.253022,
		"lng": -96.837306
	},
	{
		"lat": 47.253051,
		"lng": -96.837403
	},
	{
		"lat": 47.25306,
		"lng": -96.837454
	},
	{
		"lat": 47.253078,
		"lng": -96.837609
	},
	{
		"lat": 47.253084,
		"lng": -96.837819
	},
	{
		"lat": 47.253079,
		"lng": -96.837976
	},
	{
		"lat": 47.253068,
		"lng": -96.838132
	},
	{
		"lat": 47.253043,
		"lng": -96.838392
	},
	{
		"lat": 47.253028,
		"lng": -96.838495
	},
	{
		"lat": 47.252982,
		"lng": -96.838693
	},
	{
		"lat": 47.252946,
		"lng": -96.838785
	},
	{
		"lat": 47.252921,
		"lng": -96.838872
	},
	{
		"lat": 47.252885,
		"lng": -96.838963
	},
	{
		"lat": 47.252794,
		"lng": -96.839127
	},
	{
		"lat": 47.252667,
		"lng": -96.839313
	},
	{
		"lat": 47.252582,
		"lng": -96.839409
	},
	{
		"lat": 47.252487,
		"lng": -96.839487
	},
	{
		"lat": 47.252354,
		"lng": -96.839569
	},
	{
		"lat": 47.252253,
		"lng": -96.839625
	},
	{
		"lat": 47.25201,
		"lng": -96.839727
	},
	{
		"lat": 47.251833,
		"lng": -96.839777
	},
	{
		"lat": 47.251689,
		"lng": -96.839797
	},
	{
		"lat": 47.251473,
		"lng": -96.839816
	},
	{
		"lat": 47.25122,
		"lng": -96.839813
	},
	{
		"lat": 47.250968,
		"lng": -96.839837
	},
	{
		"lat": 47.250645,
		"lng": -96.839896
	},
	{
		"lat": 47.250505,
		"lng": -96.839946
	},
	{
		"lat": 47.250211,
		"lng": -96.840146
	},
	{
		"lat": 47.250026,
		"lng": -96.840311
	},
	{
		"lat": 47.249931,
		"lng": -96.840425
	},
	{
		"lat": 47.249887,
		"lng": -96.840478
	},
	{
		"lat": 47.249855,
		"lng": -96.840525
	},
	{
		"lat": 47.249785,
		"lng": -96.840625
	},
	{
		"lat": 47.249757,
		"lng": -96.840659
	},
	{
		"lat": 47.249682,
		"lng": -96.840771
	},
	{
		"lat": 47.249659,
		"lng": -96.840812
	},
	{
		"lat": 47.2496,
		"lng": -96.840944
	},
	{
		"lat": 47.24955,
		"lng": -96.841083
	},
	{
		"lat": 47.249512,
		"lng": -96.841171
	},
	{
		"lat": 47.249496,
		"lng": -96.841218
	},
	{
		"lat": 47.249426,
		"lng": -96.841571
	},
	{
		"lat": 47.249418,
		"lng": -96.841675
	},
	{
		"lat": 47.249404,
		"lng": -96.841989
	},
	{
		"lat": 47.249405,
		"lng": -96.842198
	},
	{
		"lat": 47.249411,
		"lng": -96.842303
	},
	{
		"lat": 47.249447,
		"lng": -96.842719
	},
	{
		"lat": 47.249496,
		"lng": -96.843025
	},
	{
		"lat": 47.249582,
		"lng": -96.843256
	},
	{
		"lat": 47.249646,
		"lng": -96.843382
	},
	{
		"lat": 47.249774,
		"lng": -96.843568
	},
	{
		"lat": 47.249853,
		"lng": -96.843675
	},
	{
		"lat": 47.249946,
		"lng": -96.843758
	},
	{
		"lat": 47.25001,
		"lng": -96.843809
	},
	{
		"lat": 47.250053,
		"lng": -96.843842
	},
	{
		"lat": 47.250073,
		"lng": -96.843858
	},
	{
		"lat": 47.25033,
		"lng": -96.844049
	},
	{
		"lat": 47.250558,
		"lng": -96.844206
	},
	{
		"lat": 47.250662,
		"lng": -96.84425
	},
	{
		"lat": 47.250942,
		"lng": -96.844354
	},
	{
		"lat": 47.251155,
		"lng": -96.844413
	},
	{
		"lat": 47.251227,
		"lng": -96.844422
	},
	{
		"lat": 47.251407,
		"lng": -96.8444
	},
	{
		"lat": 47.251442,
		"lng": -96.844388
	},
	{
		"lat": 47.251514,
		"lng": -96.844376
	},
	{
		"lat": 47.251585,
		"lng": -96.844356
	},
	{
		"lat": 47.251653,
		"lng": -96.844322
	},
	{
		"lat": 47.251757,
		"lng": -96.844281
	},
	{
		"lat": 47.251791,
		"lng": -96.844262
	},
	{
		"lat": 47.25192,
		"lng": -96.844168
	},
	{
		"lat": 47.251989,
		"lng": -96.844135
	},
	{
		"lat": 47.252054,
		"lng": -96.84409
	},
	{
		"lat": 47.252113,
		"lng": -96.84403
	},
	{
		"lat": 47.252237,
		"lng": -96.843923
	},
	{
		"lat": 47.252297,
		"lng": -96.843864
	},
	{
		"lat": 47.252379,
		"lng": -96.843763
	},
	{
		"lat": 47.252523,
		"lng": -96.843605
	},
	{
		"lat": 47.252632,
		"lng": -96.843467
	},
	{
		"lat": 47.252664,
		"lng": -96.843443
	},
	{
		"lat": 47.252783,
		"lng": -96.843326
	},
	{
		"lat": 47.252939,
		"lng": -96.843197
	},
	{
		"lat": 47.253005,
		"lng": -96.843152
	},
	{
		"lat": 47.253225,
		"lng": -96.842977
	},
	{
		"lat": 47.25331,
		"lng": -96.842879
	},
	{
		"lat": 47.25344,
		"lng": -96.842698
	},
	{
		"lat": 47.253461,
		"lng": -96.842655
	},
	{
		"lat": 47.25356,
		"lng": -96.842376
	},
	{
		"lat": 47.253597,
		"lng": -96.842286
	},
	{
		"lat": 47.253647,
		"lng": -96.84209
	},
	{
		"lat": 47.253745,
		"lng": -96.841753
	},
	{
		"lat": 47.253781,
		"lng": -96.841662
	},
	{
		"lat": 47.253793,
		"lng": -96.841612
	},
	{
		"lat": 47.253809,
		"lng": -96.841566
	},
	{
		"lat": 47.253872,
		"lng": -96.84143
	},
	{
		"lat": 47.253982,
		"lng": -96.84116
	},
	{
		"lat": 47.254045,
		"lng": -96.841031
	},
	{
		"lat": 47.25412,
		"lng": -96.840852
	},
	{
		"lat": 47.254262,
		"lng": -96.840489
	},
	{
		"lat": 47.254327,
		"lng": -96.840302
	},
	{
		"lat": 47.254397,
		"lng": -96.840119
	},
	{
		"lat": 47.254476,
		"lng": -96.839943
	},
	{
		"lat": 47.254492,
		"lng": -96.839896
	},
	{
		"lat": 47.254541,
		"lng": -96.839818
	},
	{
		"lat": 47.254769,
		"lng": -96.839483
	},
	{
		"lat": 47.254824,
		"lng": -96.839414
	},
	{
		"lat": 47.255052,
		"lng": -96.839159
	},
	{
		"lat": 47.255174,
		"lng": -96.839045
	},
	{
		"lat": 47.255207,
		"lng": -96.839024
	},
	{
		"lat": 47.255238,
		"lng": -96.838997
	},
	{
		"lat": 47.255265,
		"lng": -96.838962
	},
	{
		"lat": 47.255297,
		"lng": -96.838939
	},
	{
		"lat": 47.255332,
		"lng": -96.838924
	},
	{
		"lat": 47.255464,
		"lng": -96.83884
	},
	{
		"lat": 47.255702,
		"lng": -96.83872
	},
	{
		"lat": 47.255767,
		"lng": -96.838674
	},
	{
		"lat": 47.255939,
		"lng": -96.838593
	},
	{
		"lat": 47.256009,
		"lng": -96.838566
	},
	{
		"lat": 47.25608,
		"lng": -96.838553
	},
	{
		"lat": 47.256225,
		"lng": -96.838542
	},
	{
		"lat": 47.256368,
		"lng": -96.838568
	},
	{
		"lat": 47.256439,
		"lng": -96.83859
	},
	{
		"lat": 47.25668,
		"lng": -96.838702
	},
	{
		"lat": 47.256816,
		"lng": -96.838774
	},
	{
		"lat": 47.256915,
		"lng": -96.838836
	},
	{
		"lat": 47.257009,
		"lng": -96.838915
	},
	{
		"lat": 47.257092,
		"lng": -96.839016
	},
	{
		"lat": 47.257245,
		"lng": -96.839239
	},
	{
		"lat": 47.257316,
		"lng": -96.839357
	},
	{
		"lat": 47.257379,
		"lng": -96.839485
	},
	{
		"lat": 47.257431,
		"lng": -96.839624
	},
	{
		"lat": 47.257474,
		"lng": -96.839768
	},
	{
		"lat": 47.25752,
		"lng": -96.839967
	},
	{
		"lat": 47.257537,
		"lng": -96.840069
	},
	{
		"lat": 47.257584,
		"lng": -96.840588
	},
	{
		"lat": 47.257598,
		"lng": -96.841165
	},
	{
		"lat": 47.257596,
		"lng": -96.84127
	},
	{
		"lat": 47.25758,
		"lng": -96.841426
	},
	{
		"lat": 47.25745,
		"lng": -96.842297
	},
	{
		"lat": 47.257407,
		"lng": -96.842552
	},
	{
		"lat": 47.257336,
		"lng": -96.843066
	},
	{
		"lat": 47.257309,
		"lng": -96.843218
	},
	{
		"lat": 47.257293,
		"lng": -96.843266
	},
	{
		"lat": 47.257271,
		"lng": -96.84342
	},
	{
		"lat": 47.25726,
		"lng": -96.843524
	},
	{
		"lat": 47.257249,
		"lng": -96.843733
	},
	{
		"lat": 47.257249,
		"lng": -96.843995
	},
	{
		"lat": 47.25729,
		"lng": -96.844411
	},
	{
		"lat": 47.257312,
		"lng": -96.844511
	},
	{
		"lat": 47.257391,
		"lng": -96.844747
	},
	{
		"lat": 47.257436,
		"lng": -96.844829
	},
	{
		"lat": 47.25759,
		"lng": -96.845051
	},
	{
		"lat": 47.257674,
		"lng": -96.84515
	},
	{
		"lat": 47.257734,
		"lng": -96.845209
	},
	{
		"lat": 47.2578,
		"lng": -96.845253
	},
	{
		"lat": 47.257834,
		"lng": -96.84527
	},
	{
		"lat": 47.257939,
		"lng": -96.845308
	},
	{
		"lat": 47.258118,
		"lng": -96.845339
	},
	{
		"lat": 47.258191,
		"lng": -96.845339
	},
	{
		"lat": 47.258334,
		"lng": -96.845313
	},
	{
		"lat": 47.258405,
		"lng": -96.845293
	},
	{
		"lat": 47.258471,
		"lng": -96.84525
	},
	{
		"lat": 47.258563,
		"lng": -96.845171
	},
	{
		"lat": 47.258621,
		"lng": -96.84511
	},
	{
		"lat": 47.258675,
		"lng": -96.84504
	},
	{
		"lat": 47.258761,
		"lng": -96.844945
	},
	{
		"lat": 47.25889,
		"lng": -96.84476
	},
	{
		"lat": 47.258936,
		"lng": -96.84468
	},
	{
		"lat": 47.258977,
		"lng": -96.844593
	},
	{
		"lat": 47.259032,
		"lng": -96.844458
	},
	{
		"lat": 47.259043,
		"lng": -96.844407
	},
	{
		"lat": 47.25908,
		"lng": -96.844318
	},
	{
		"lat": 47.259095,
		"lng": -96.84427
	},
	{
		"lat": 47.259181,
		"lng": -96.843815
	},
	{
		"lat": 47.259194,
		"lng": -96.843712
	},
	{
		"lat": 47.259202,
		"lng": -96.84345
	},
	{
		"lat": 47.2592,
		"lng": -96.842978
	},
	{
		"lat": 47.259196,
		"lng": -96.842873
	},
	{
		"lat": 47.259148,
		"lng": -96.8423
	},
	{
		"lat": 47.25913,
		"lng": -96.842145
	},
	{
		"lat": 47.259067,
		"lng": -96.841789
	},
	{
		"lat": 47.259052,
		"lng": -96.841742
	},
	{
		"lat": 47.259031,
		"lng": -96.841641
	},
	{
		"lat": 47.25885,
		"lng": -96.841012
	},
	{
		"lat": 47.258791,
		"lng": -96.840821
	},
	{
		"lat": 47.258752,
		"lng": -96.840674
	},
	{
		"lat": 47.258676,
		"lng": -96.840436
	},
	{
		"lat": 47.258636,
		"lng": -96.840291
	},
	{
		"lat": 47.258613,
		"lng": -96.840191
	},
	{
		"lat": 47.258529,
		"lng": -96.839902
	},
	{
		"lat": 47.258434,
		"lng": -96.839452
	},
	{
		"lat": 47.258389,
		"lng": -96.839145
	},
	{
		"lat": 47.258353,
		"lng": -96.838942
	},
	{
		"lat": 47.258312,
		"lng": -96.838633
	},
	{
		"lat": 47.2583,
		"lng": -96.838371
	},
	{
		"lat": 47.2583,
		"lng": -96.838109
	},
	{
		"lat": 47.258319,
		"lng": -96.837848
	},
	{
		"lat": 47.258344,
		"lng": -96.837694
	},
	{
		"lat": 47.258386,
		"lng": -96.83755
	},
	{
		"lat": 47.258482,
		"lng": -96.837268
	},
	{
		"lat": 47.258524,
		"lng": -96.837182
	},
	{
		"lat": 47.258561,
		"lng": -96.837092
	},
	{
		"lat": 47.258593,
		"lng": -96.836998
	},
	{
		"lat": 47.258614,
		"lng": -96.836955
	},
	{
		"lat": 47.258731,
		"lng": -96.836756
	},
	{
		"lat": 47.258857,
		"lng": -96.836568
	},
	{
		"lat": 47.259122,
		"lng": -96.836214
	},
	{
		"lat": 47.259237,
		"lng": -96.836085
	},
	{
		"lat": 47.259328,
		"lng": -96.836
	},
	{
		"lat": 47.259459,
		"lng": -96.835915
	},
	{
		"lat": 47.259696,
		"lng": -96.835789
	},
	{
		"lat": 47.259969,
		"lng": -96.835654
	},
	{
		"lat": 47.260039,
		"lng": -96.835632
	},
	{
		"lat": 47.260075,
		"lng": -96.835628
	},
	{
		"lat": 47.260146,
		"lng": -96.835606
	},
	{
		"lat": 47.260213,
		"lng": -96.835567
	},
	{
		"lat": 47.260353,
		"lng": -96.835513
	},
	{
		"lat": 47.260424,
		"lng": -96.835502
	},
	{
		"lat": 47.260459,
		"lng": -96.835489
	},
	{
		"lat": 47.260709,
		"lng": -96.835433
	},
	{
		"lat": 47.261034,
		"lng": -96.835419
	},
	{
		"lat": 47.261394,
		"lng": -96.83545
	},
	{
		"lat": 47.261573,
		"lng": -96.835488
	},
	{
		"lat": 47.261749,
		"lng": -96.835544
	},
	{
		"lat": 47.261854,
		"lng": -96.835583
	},
	{
		"lat": 47.26213,
		"lng": -96.835707
	},
	{
		"lat": 47.262231,
		"lng": -96.835763
	},
	{
		"lat": 47.262461,
		"lng": -96.835917
	},
	{
		"lat": 47.262523,
		"lng": -96.835971
	},
	{
		"lat": 47.262633,
		"lng": -96.836107
	},
	{
		"lat": 47.262812,
		"lng": -96.836367
	},
	{
		"lat": 47.262859,
		"lng": -96.836447
	},
	{
		"lat": 47.262901,
		"lng": -96.836532
	},
	{
		"lat": 47.262963,
		"lng": -96.836722
	},
	{
		"lat": 47.263011,
		"lng": -96.836941
	},
	{
		"lat": 47.263026,
		"lng": -96.837043
	},
	{
		"lat": 47.263046,
		"lng": -96.837304
	},
	{
		"lat": 47.26306,
		"lng": -96.837566
	},
	{
		"lat": 47.26305,
		"lng": -96.837986
	},
	{
		"lat": 47.263015,
		"lng": -96.838402
	},
	{
		"lat": 47.262999,
		"lng": -96.838504
	},
	{
		"lat": 47.26294,
		"lng": -96.838807
	},
	{
		"lat": 47.262882,
		"lng": -96.839218
	},
	{
		"lat": 47.262829,
		"lng": -96.839631
	},
	{
		"lat": 47.262795,
		"lng": -96.839995
	},
	{
		"lat": 47.262761,
		"lng": -96.840411
	},
	{
		"lat": 47.262717,
		"lng": -96.840826
	},
	{
		"lat": 47.262696,
		"lng": -96.841086
	},
	{
		"lat": 47.262675,
		"lng": -96.841452
	},
	{
		"lat": 47.262645,
		"lng": -96.841816
	},
	{
		"lat": 47.262579,
		"lng": -96.842116
	},
	{
		"lat": 47.262525,
		"lng": -96.84231
	},
	{
		"lat": 47.262485,
		"lng": -96.842397
	},
	{
		"lat": 47.262452,
		"lng": -96.84249
	},
	{
		"lat": 47.262411,
		"lng": -96.842576
	},
	{
		"lat": 47.262376,
		"lng": -96.842668
	},
	{
		"lat": 47.262292,
		"lng": -96.842839
	},
	{
		"lat": 47.262122,
		"lng": -96.843111
	},
	{
		"lat": 47.261941,
		"lng": -96.843367
	},
	{
		"lat": 47.261522,
		"lng": -96.843866
	},
	{
		"lat": 47.26144,
		"lng": -96.84397
	},
	{
		"lat": 47.261215,
		"lng": -96.844311
	},
	{
		"lat": 47.261122,
		"lng": -96.844471
	},
	{
		"lat": 47.261057,
		"lng": -96.844598
	},
	{
		"lat": 47.261025,
		"lng": -96.844691
	},
	{
		"lat": 47.260969,
		"lng": -96.844885
	},
	{
		"lat": 47.260923,
		"lng": -96.845027
	},
	{
		"lat": 47.260834,
		"lng": -96.845426
	},
	{
		"lat": 47.260818,
		"lng": -96.845529
	},
	{
		"lat": 47.260798,
		"lng": -96.845789
	},
	{
		"lat": 47.260798,
		"lng": -96.845947
	},
	{
		"lat": 47.260819,
		"lng": -96.84626
	},
	{
		"lat": 47.260834,
		"lng": -96.846363
	},
	{
		"lat": 47.260851,
		"lng": -96.84641
	},
	{
		"lat": 47.260872,
		"lng": -96.84651
	},
	{
		"lat": 47.260908,
		"lng": -96.846605
	},
	{
		"lat": 47.260949,
		"lng": -96.846712
	},
	{
		"lat": 47.261016,
		"lng": -96.846836
	},
	{
		"lat": 47.261117,
		"lng": -96.846986
	},
	{
		"lat": 47.261196,
		"lng": -96.847094
	},
	{
		"lat": 47.261312,
		"lng": -96.84722
	},
	{
		"lat": 47.261405,
		"lng": -96.847298
	},
	{
		"lat": 47.261472,
		"lng": -96.84734
	},
	{
		"lat": 47.261717,
		"lng": -96.847427
	},
	{
		"lat": 47.261825,
		"lng": -96.847443
	},
	{
		"lat": 47.261933,
		"lng": -96.847448
	},
	{
		"lat": 47.262545,
		"lng": -96.847382
	},
	{
		"lat": 47.262616,
		"lng": -96.847365
	},
	{
		"lat": 47.262757,
		"lng": -96.847315
	},
	{
		"lat": 47.263304,
		"lng": -96.847048
	},
	{
		"lat": 47.263334,
		"lng": -96.847018
	},
	{
		"lat": 47.263433,
		"lng": -96.846955
	},
	{
		"lat": 47.263463,
		"lng": -96.846927
	},
	{
		"lat": 47.263624,
		"lng": -96.846807
	},
	{
		"lat": 47.26369,
		"lng": -96.846766
	},
	{
		"lat": 47.263812,
		"lng": -96.846655
	},
	{
		"lat": 47.263877,
		"lng": -96.846608
	},
	{
		"lat": 47.264126,
		"lng": -96.846395
	},
	{
		"lat": 47.264589,
		"lng": -96.845987
	},
	{
		"lat": 47.264791,
		"lng": -96.845766
	},
	{
		"lat": 47.264851,
		"lng": -96.845707
	},
	{
		"lat": 47.264907,
		"lng": -96.845642
	},
	{
		"lat": 47.265135,
		"lng": -96.845305
	},
	{
		"lat": 47.265203,
		"lng": -96.845183
	},
	{
		"lat": 47.265299,
		"lng": -96.84496
	},
	{
		"lat": 47.265362,
		"lng": -96.844771
	},
	{
		"lat": 47.26542,
		"lng": -96.844556
	},
	{
		"lat": 47.265436,
		"lng": -96.844508
	},
	{
		"lat": 47.265458,
		"lng": -96.844408
	},
	{
		"lat": 47.265501,
		"lng": -96.844154
	},
	{
		"lat": 47.265513,
		"lng": -96.843945
	},
	{
		"lat": 47.265512,
		"lng": -96.843787
	},
	{
		"lat": 47.265503,
		"lng": -96.84363
	},
	{
		"lat": 47.26548,
		"lng": -96.84337
	},
	{
		"lat": 47.265455,
		"lng": -96.843164
	},
	{
		"lat": 47.265424,
		"lng": -96.842959
	},
	{
		"lat": 47.265358,
		"lng": -96.842659
	},
	{
		"lat": 47.265249,
		"lng": -96.842216
	},
	{
		"lat": 47.265152,
		"lng": -96.841877
	},
	{
		"lat": 47.265013,
		"lng": -96.841571
	},
	{
		"lat": 47.264962,
		"lng": -96.841433
	},
	{
		"lat": 47.264902,
		"lng": -96.841242
	},
	{
		"lat": 47.264868,
		"lng": -96.841093
	},
	{
		"lat": 47.264775,
		"lng": -96.840753
	},
	{
		"lat": 47.26462,
		"lng": -96.840056
	},
	{
		"lat": 47.264577,
		"lng": -96.839801
	},
	{
		"lat": 47.264553,
		"lng": -96.839488
	},
	{
		"lat": 47.264559,
		"lng": -96.838912
	},
	{
		"lat": 47.264568,
		"lng": -96.838703
	},
	{
		"lat": 47.264582,
		"lng": -96.838546
	},
	{
		"lat": 47.264608,
		"lng": -96.837656
	},
	{
		"lat": 47.264653,
		"lng": -96.837348
	},
	{
		"lat": 47.264719,
		"lng": -96.837048
	},
	{
		"lat": 47.264794,
		"lng": -96.836753
	},
	{
		"lat": 47.264858,
		"lng": -96.836566
	},
	{
		"lat": 47.264968,
		"lng": -96.836295
	},
	{
		"lat": 47.265177,
		"lng": -96.835806
	},
	{
		"lat": 47.26531,
		"lng": -96.835558
	},
	{
		"lat": 47.265434,
		"lng": -96.835367
	},
	{
		"lat": 47.26567,
		"lng": -96.835042
	},
	{
		"lat": 47.265701,
		"lng": -96.835015
	},
	{
		"lat": 47.265758,
		"lng": -96.834951
	},
	{
		"lat": 47.265852,
		"lng": -96.834875
	},
	{
		"lat": 47.26595,
		"lng": -96.834808
	},
	{
		"lat": 47.266155,
		"lng": -96.834705
	},
	{
		"lat": 47.266261,
		"lng": -96.834674
	},
	{
		"lat": 47.26633,
		"lng": -96.834645
	},
	{
		"lat": 47.266437,
		"lng": -96.834624
	},
	{
		"lat": 47.266508,
		"lng": -96.8346
	},
	{
		"lat": 47.266651,
		"lng": -96.834578
	},
	{
		"lat": 47.266699,
		"lng": -96.834577
	},
	{
		"lat": 47.26676,
		"lng": -96.834576
	},
	{
		"lat": 47.267012,
		"lng": -96.834591
	},
	{
		"lat": 47.267156,
		"lng": -96.834605
	},
	{
		"lat": 47.267335,
		"lng": -96.834642
	},
	{
		"lat": 47.267441,
		"lng": -96.834675
	},
	{
		"lat": 47.267614,
		"lng": -96.834748
	},
	{
		"lat": 47.267919,
		"lng": -96.834912
	},
	{
		"lat": 47.267948,
		"lng": -96.834942
	},
	{
		"lat": 47.267997,
		"lng": -96.834972
	},
	{
		"lat": 47.268057,
		"lng": -96.835031
	},
	{
		"lat": 47.268121,
		"lng": -96.835078
	},
	{
		"lat": 47.268206,
		"lng": -96.835175
	},
	{
		"lat": 47.268265,
		"lng": -96.835235
	},
	{
		"lat": 47.268321,
		"lng": -96.8353
	},
	{
		"lat": 47.268603,
		"lng": -96.835707
	},
	{
		"lat": 47.268752,
		"lng": -96.835935
	},
	{
		"lat": 47.268799,
		"lng": -96.836014
	},
	{
		"lat": 47.268876,
		"lng": -96.836192
	},
	{
		"lat": 47.268943,
		"lng": -96.836378
	},
	{
		"lat": 47.268967,
		"lng": -96.836477
	},
	{
		"lat": 47.269026,
		"lng": -96.836668
	},
	{
		"lat": 47.269083,
		"lng": -96.836917
	},
	{
		"lat": 47.269111,
		"lng": -96.837014
	},
	{
		"lat": 47.269121,
		"lng": -96.837065
	},
	{
		"lat": 47.269139,
		"lng": -96.83722
	},
	{
		"lat": 47.269156,
		"lng": -96.837322
	},
	{
		"lat": 47.269209,
		"lng": -96.83784
	},
	{
		"lat": 47.26923,
		"lng": -96.838153
	},
	{
		"lat": 47.269231,
		"lng": -96.838415
	},
	{
		"lat": 47.269215,
		"lng": -96.83873
	},
	{
		"lat": 47.269192,
		"lng": -96.838937
	},
	{
		"lat": 47.269148,
		"lng": -96.839192
	},
	{
		"lat": 47.269113,
		"lng": -96.83934
	},
	{
		"lat": 47.269032,
		"lng": -96.839632
	},
	{
		"lat": 47.269,
		"lng": -96.839726
	},
	{
		"lat": 47.268837,
		"lng": -96.840365
	},
	{
		"lat": 47.268821,
		"lng": -96.840412
	},
	{
		"lat": 47.268787,
		"lng": -96.840561
	},
	{
		"lat": 47.268745,
		"lng": -96.840706
	},
	{
		"lat": 47.268671,
		"lng": -96.841057
	},
	{
		"lat": 47.268617,
		"lng": -96.841362
	},
	{
		"lat": 47.26857,
		"lng": -96.841723
	},
	{
		"lat": 47.268549,
		"lng": -96.84193
	},
	{
		"lat": 47.268505,
		"lng": -96.842715
	},
	{
		"lat": 47.268507,
		"lng": -96.84282
	},
	{
		"lat": 47.26855,
		"lng": -96.843446
	},
	{
		"lat": 47.26857,
		"lng": -96.843654
	},
	{
		"lat": 47.268607,
		"lng": -96.843856
	},
	{
		"lat": 47.268629,
		"lng": -96.844064
	},
	{
		"lat": 47.268644,
		"lng": -96.844166
	},
	{
		"lat": 47.268703,
		"lng": -96.844414
	},
	{
		"lat": 47.268726,
		"lng": -96.844674
	},
	{
		"lat": 47.268753,
		"lng": -96.844827
	},
	{
		"lat": 47.268775,
		"lng": -96.844926
	},
	{
		"lat": 47.268817,
		"lng": -96.845071
	},
	{
		"lat": 47.268852,
		"lng": -96.845163
	},
	{
		"lat": 47.268899,
		"lng": -96.845304
	},
	{
		"lat": 47.269007,
		"lng": -96.845577
	},
	{
		"lat": 47.269176,
		"lng": -96.845917
	},
	{
		"lat": 47.26927,
		"lng": -96.846077
	},
	{
		"lat": 47.2697,
		"lng": -96.846713
	},
	{
		"lat": 47.270046,
		"lng": -96.847175
	},
	{
		"lat": 47.270101,
		"lng": -96.847242
	},
	{
		"lat": 47.27016,
		"lng": -96.847302
	},
	{
		"lat": 47.270287,
		"lng": -96.847403
	},
	{
		"lat": 47.270368,
		"lng": -96.847461
	},
	{
		"lat": 47.270468,
		"lng": -96.847521
	},
	{
		"lat": 47.270743,
		"lng": -96.847651
	},
	{
		"lat": 47.270778,
		"lng": -96.847662
	},
	{
		"lat": 47.270886,
		"lng": -96.847681
	},
	{
		"lat": 47.271066,
		"lng": -96.84769
	},
	{
		"lat": 47.271247,
		"lng": -96.847678
	},
	{
		"lat": 47.271353,
		"lng": -96.847648
	},
	{
		"lat": 47.271531,
		"lng": -96.84761
	},
	{
		"lat": 47.271602,
		"lng": -96.847585
	},
	{
		"lat": 47.27167,
		"lng": -96.847553
	},
	{
		"lat": 47.271776,
		"lng": -96.847517
	},
	{
		"lat": 47.272043,
		"lng": -96.847359
	},
	{
		"lat": 47.272238,
		"lng": -96.847224
	},
	{
		"lat": 47.272358,
		"lng": -96.847107
	},
	{
		"lat": 47.272391,
		"lng": -96.847085
	},
	{
		"lat": 47.272449,
		"lng": -96.847023
	},
	{
		"lat": 47.272603,
		"lng": -96.846802
	},
	{
		"lat": 47.272721,
		"lng": -96.846604
	},
	{
		"lat": 47.272761,
		"lng": -96.846516
	},
	{
		"lat": 47.272811,
		"lng": -96.846441
	},
	{
		"lat": 47.272916,
		"lng": -96.846227
	},
	{
		"lat": 47.273001,
		"lng": -96.845996
	},
	{
		"lat": 47.27306,
		"lng": -96.845804
	},
	{
		"lat": 47.273093,
		"lng": -96.845712
	},
	{
		"lat": 47.273138,
		"lng": -96.845568
	},
	{
		"lat": 47.273176,
		"lng": -96.845366
	},
	{
		"lat": 47.273233,
		"lng": -96.845117
	},
	{
		"lat": 47.27325,
		"lng": -96.845016
	},
	{
		"lat": 47.273282,
		"lng": -96.844704
	},
	{
		"lat": 47.273336,
		"lng": -96.844028
	},
	{
		"lat": 47.273366,
		"lng": -96.843716
	},
	{
		"lat": 47.273394,
		"lng": -96.84351
	},
	{
		"lat": 47.273416,
		"lng": -96.843303
	},
	{
		"lat": 47.273506,
		"lng": -96.842741
	},
	{
		"lat": 47.273537,
		"lng": -96.84259
	},
	{
		"lat": 47.273574,
		"lng": -96.842442
	},
	{
		"lat": 47.273603,
		"lng": -96.842346
	},
	{
		"lat": 47.273626,
		"lng": -96.842246
	},
	{
		"lat": 47.273688,
		"lng": -96.842057
	},
	{
		"lat": 47.273742,
		"lng": -96.841862
	},
	{
		"lat": 47.27378,
		"lng": -96.841772
	},
	{
		"lat": 47.273876,
		"lng": -96.841491
	},
	{
		"lat": 47.273932,
		"lng": -96.841356
	},
	{
		"lat": 47.274019,
		"lng": -96.841188
	},
	{
		"lat": 47.274116,
		"lng": -96.841032
	},
	{
		"lat": 47.274277,
		"lng": -96.840822
	},
	{
		"lat": 47.274333,
		"lng": -96.840757
	},
	{
		"lat": 47.27452,
		"lng": -96.840598
	},
	{
		"lat": 47.274714,
		"lng": -96.840461
	},
	{
		"lat": 47.274783,
		"lng": -96.840426
	},
	{
		"lat": 47.274948,
		"lng": -96.840322
	},
	{
		"lat": 47.275152,
		"lng": -96.840217
	},
	{
		"lat": 47.275222,
		"lng": -96.840188
	},
	{
		"lat": 47.275328,
		"lng": -96.840154
	},
	{
		"lat": 47.275362,
		"lng": -96.840137
	},
	{
		"lat": 47.275576,
		"lng": -96.84009
	},
	{
		"lat": 47.275792,
		"lng": -96.840059
	},
	{
		"lat": 47.276008,
		"lng": -96.840059
	},
	{
		"lat": 47.276551,
		"lng": -96.84009
	},
	{
		"lat": 47.276908,
		"lng": -96.840164
	},
	{
		"lat": 47.277122,
		"lng": -96.840214
	},
	{
		"lat": 47.277587,
		"lng": -96.840301
	},
	{
		"lat": 47.277632,
		"lng": -96.840313
	},
	{
		"lat": 47.277693,
		"lng": -96.84033
	},
	{
		"lat": 47.277867,
		"lng": -96.840403
	},
	{
		"lat": 47.277903,
		"lng": -96.840409
	},
	{
		"lat": 47.277971,
		"lng": -96.840441
	},
	{
		"lat": 47.27836,
		"lng": -96.840565
	},
	{
		"lat": 47.278964,
		"lng": -96.840723
	},
	{
		"lat": 47.279318,
		"lng": -96.840827
	},
	{
		"lat": 47.279745,
		"lng": -96.840926
	},
	{
		"lat": 47.279817,
		"lng": -96.840938
	},
	{
		"lat": 47.280214,
		"lng": -96.840977
	},
	{
		"lat": 47.280827,
		"lng": -96.84097
	},
	{
		"lat": 47.281116,
		"lng": -96.840973
	},
	{
		"lat": 47.281368,
		"lng": -96.840992
	},
	{
		"lat": 47.281873,
		"lng": -96.841054
	},
	{
		"lat": 47.282053,
		"lng": -96.841069
	},
	{
		"lat": 47.28227,
		"lng": -96.841078
	},
	{
		"lat": 47.282523,
		"lng": -96.84107
	},
	{
		"lat": 47.282848,
		"lng": -96.841075
	},
	{
		"lat": 47.2831,
		"lng": -96.841093
	},
	{
		"lat": 47.283243,
		"lng": -96.841126
	},
	{
		"lat": 47.283664,
		"lng": -96.841278
	},
	{
		"lat": 47.28391,
		"lng": -96.84136
	},
	{
		"lat": 47.284191,
		"lng": -96.841462
	},
	{
		"lat": 47.284367,
		"lng": -96.841519
	},
	{
		"lat": 47.284576,
		"lng": -96.841605
	},
	{
		"lat": 47.284746,
		"lng": -96.841692
	},
	{
		"lat": 47.284781,
		"lng": -96.841705
	},
	{
		"lat": 47.284915,
		"lng": -96.841783
	},
	{
		"lat": 47.284952,
		"lng": -96.841798
	},
	{
		"lat": 47.284985,
		"lng": -96.841821
	},
	{
		"lat": 47.285154,
		"lng": -96.841915
	},
	{
		"lat": 47.285353,
		"lng": -96.842036
	},
	{
		"lat": 47.285423,
		"lng": -96.842066
	},
	{
		"lat": 47.285729,
		"lng": -96.842222
	},
	{
		"lat": 47.285863,
		"lng": -96.842301
	},
	{
		"lat": 47.286548,
		"lng": -96.842638
	},
	{
		"lat": 47.287209,
		"lng": -96.842911
	},
	{
		"lat": 47.287624,
		"lng": -96.843093
	},
	{
		"lat": 47.287972,
		"lng": -96.843236
	},
	{
		"lat": 47.288387,
		"lng": -96.843421
	},
	{
		"lat": 47.288457,
		"lng": -96.843444
	},
	{
		"lat": 47.288813,
		"lng": -96.843535
	},
	{
		"lat": 47.289385,
		"lng": -96.843662
	},
	{
		"lat": 47.28942,
		"lng": -96.843675
	},
	{
		"lat": 47.289598,
		"lng": -96.843718
	},
	{
		"lat": 47.289988,
		"lng": -96.843834
	},
	{
		"lat": 47.290489,
		"lng": -96.843937
	},
	{
		"lat": 47.291463,
		"lng": -96.844032
	},
	{
		"lat": 47.291752,
		"lng": -96.84403
	},
	{
		"lat": 47.292221,
		"lng": -96.843976
	},
	{
		"lat": 47.292364,
		"lng": -96.843944
	},
	{
		"lat": 47.292939,
		"lng": -96.843857
	},
	{
		"lat": 47.293009,
		"lng": -96.843835
	},
	{
		"lat": 47.293113,
		"lng": -96.843788
	},
	{
		"lat": 47.293314,
		"lng": -96.843668
	},
	{
		"lat": 47.293379,
		"lng": -96.843624
	},
	{
		"lat": 47.293413,
		"lng": -96.843608
	},
	{
		"lat": 47.293901,
		"lng": -96.843265
	},
	{
		"lat": 47.294155,
		"lng": -96.843066
	},
	{
		"lat": 47.294371,
		"lng": -96.842875
	},
	{
		"lat": 47.29453,
		"lng": -96.84275
	},
	{
		"lat": 47.29459,
		"lng": -96.842692
	},
	{
		"lat": 47.294685,
		"lng": -96.842617
	},
	{
		"lat": 47.295076,
		"lng": -96.842239
	},
	{
		"lat": 47.2952,
		"lng": -96.842131
	},
	{
		"lat": 47.295288,
		"lng": -96.842038
	},
	{
		"lat": 47.295408,
		"lng": -96.841895
	},
	{
		"lat": 47.295595,
		"lng": -96.841672
	},
	{
		"lat": 47.29562,
		"lng": -96.84165
	},
	{
		"lat": 47.295645,
		"lng": -96.84163
	},
	{
		"lat": 47.295991,
		"lng": -96.84125
	},
	{
		"lat": 47.296022,
		"lng": -96.841223
	},
	{
		"lat": 47.296158,
		"lng": -96.84105
	},
	{
		"lat": 47.296274,
		"lng": -96.840925
	},
	{
		"lat": 47.296514,
		"lng": -96.840607
	},
	{
		"lat": 47.296599,
		"lng": -96.84051
	},
	{
		"lat": 47.29695,
		"lng": -96.840056
	},
	{
		"lat": 47.297135,
		"lng": -96.839806
	},
	{
		"lat": 47.297468,
		"lng": -96.839324
	},
	{
		"lat": 47.297619,
		"lng": -96.839098
	},
	{
		"lat": 47.297638,
		"lng": -96.839056
	},
	{
		"lat": 47.297641,
		"lng": -96.83895
	},
	{
		"lat": 47.297658,
		"lng": -96.838848
	},
	{
		"lat": 47.297672,
		"lng": -96.8388
	},
	{
		"lat": 47.297691,
		"lng": -96.838755
	},
	{
		"lat": 47.297735,
		"lng": -96.838672
	},
	{
		"lat": 47.297839,
		"lng": -96.838526
	},
	{
		"lat": 47.298159,
		"lng": -96.838103
	},
	{
		"lat": 47.298445,
		"lng": -96.837782
	},
	{
		"lat": 47.298564,
		"lng": -96.837662
	},
	{
		"lat": 47.298699,
		"lng": -96.837488
	},
	{
		"lat": 47.299048,
		"lng": -96.837114
	},
	{
		"lat": 47.299289,
		"lng": -96.836882
	},
	{
		"lat": 47.299458,
		"lng": -96.836685
	},
	{
		"lat": 47.299519,
		"lng": -96.836629
	},
	{
		"lat": 47.299582,
		"lng": -96.836579
	},
	{
		"lat": 47.299642,
		"lng": -96.83652
	},
	{
		"lat": 47.29974,
		"lng": -96.836451
	},
	{
		"lat": 47.300007,
		"lng": -96.836295
	},
	{
		"lat": 47.300203,
		"lng": -96.836161
	},
	{
		"lat": 47.300271,
		"lng": -96.836124
	},
	{
		"lat": 47.30047,
		"lng": -96.835998
	},
	{
		"lat": 47.300604,
		"lng": -96.835922
	},
	{
		"lat": 47.30074,
		"lng": -96.835852
	},
	{
		"lat": 47.301222,
		"lng": -96.835624
	},
	{
		"lat": 47.301362,
		"lng": -96.835573
	},
	{
		"lat": 47.301465,
		"lng": -96.835525
	},
	{
		"lat": 47.301608,
		"lng": -96.835487
	},
	{
		"lat": 47.301748,
		"lng": -96.835438
	},
	{
		"lat": 47.302034,
		"lng": -96.835375
	},
	{
		"lat": 47.302245,
		"lng": -96.835306
	},
	{
		"lat": 47.302314,
		"lng": -96.835272
	},
	{
		"lat": 47.30238,
		"lng": -96.835232
	},
	{
		"lat": 47.30266,
		"lng": -96.835124
	},
	{
		"lat": 47.302831,
		"lng": -96.835044
	},
	{
		"lat": 47.302897,
		"lng": -96.835002
	},
	{
		"lat": 47.303024,
		"lng": -96.834901
	},
	{
		"lat": 47.303108,
		"lng": -96.834801
	},
	{
		"lat": 47.303169,
		"lng": -96.834745
	},
	{
		"lat": 47.303281,
		"lng": -96.834612
	},
	{
		"lat": 47.303452,
		"lng": -96.834341
	},
	{
		"lat": 47.303521,
		"lng": -96.834219
	},
	{
		"lat": 47.303668,
		"lng": -96.833989
	},
	{
		"lat": 47.303738,
		"lng": -96.833868
	},
	{
		"lat": 47.30378,
		"lng": -96.833784
	},
	{
		"lat": 47.303836,
		"lng": -96.833649
	},
	{
		"lat": 47.303851,
		"lng": -96.833602
	},
	{
		"lat": 47.303934,
		"lng": -96.833429
	},
	{
		"lat": 47.303991,
		"lng": -96.833237
	},
	{
		"lat": 47.304048,
		"lng": -96.833103
	},
	{
		"lat": 47.304159,
		"lng": -96.832773
	},
	{
		"lat": 47.304194,
		"lng": -96.832682
	},
	{
		"lat": 47.304224,
		"lng": -96.832587
	},
	{
		"lat": 47.304311,
		"lng": -96.832357
	},
	{
		"lat": 47.304368,
		"lng": -96.832223
	},
	{
		"lat": 47.304435,
		"lng": -96.832037
	},
	{
		"lat": 47.304532,
		"lng": -96.831815
	},
	{
		"lat": 47.304554,
		"lng": -96.831751
	},
	{
		"lat": 47.304596,
		"lng": -96.831665
	},
	{
		"lat": 47.304801,
		"lng": -96.831298
	},
	{
		"lat": 47.304925,
		"lng": -96.831108
	},
	{
		"lat": 47.305005,
		"lng": -96.831002
	},
	{
		"lat": 47.30509,
		"lng": -96.830904
	},
	{
		"lat": 47.305181,
		"lng": -96.830818
	},
	{
		"lat": 47.30542,
		"lng": -96.830697
	},
	{
		"lat": 47.305489,
		"lng": -96.830667
	},
	{
		"lat": 47.305633,
		"lng": -96.830641
	},
	{
		"lat": 47.305741,
		"lng": -96.830634
	},
	{
		"lat": 47.306066,
		"lng": -96.83066
	},
	{
		"lat": 47.306207,
		"lng": -96.830705
	},
	{
		"lat": 47.306311,
		"lng": -96.830749
	},
	{
		"lat": 47.306448,
		"lng": -96.830816
	},
	{
		"lat": 47.30661,
		"lng": -96.830932
	},
	{
		"lat": 47.306639,
		"lng": -96.830963
	},
	{
		"lat": 47.306692,
		"lng": -96.831035
	},
	{
		"lat": 47.306887,
		"lng": -96.831346
	},
	{
		"lat": 47.306977,
		"lng": -96.83151
	},
	{
		"lat": 47.307062,
		"lng": -96.83168
	},
	{
		"lat": 47.307337,
		"lng": -96.832167
	},
	{
		"lat": 47.307504,
		"lng": -96.832444
	},
	{
		"lat": 47.307883,
		"lng": -96.833007
	},
	{
		"lat": 47.307961,
		"lng": -96.833117
	},
	{
		"lat": 47.308386,
		"lng": -96.833607
	},
	{
		"lat": 47.30851,
		"lng": -96.833714
	},
	{
		"lat": 47.308608,
		"lng": -96.833782
	},
	{
		"lat": 47.308768,
		"lng": -96.833903
	},
	{
		"lat": 47.309061,
		"lng": -96.834106
	},
	{
		"lat": 47.309327,
		"lng": -96.834271
	},
	{
		"lat": 47.30939,
		"lng": -96.834323
	},
	{
		"lat": 47.309521,
		"lng": -96.834411
	},
	{
		"lat": 47.309825,
		"lng": -96.834581
	},
	{
		"lat": 47.310023,
		"lng": -96.834708
	},
	{
		"lat": 47.310214,
		"lng": -96.834856
	},
	{
		"lat": 47.310304,
		"lng": -96.834944
	},
	{
		"lat": 47.310488,
		"lng": -96.835111
	},
	{
		"lat": 47.310799,
		"lng": -96.835379
	},
	{
		"lat": 47.310886,
		"lng": -96.835474
	},
	{
		"lat": 47.310947,
		"lng": -96.835528
	},
	{
		"lat": 47.311108,
		"lng": -96.835741
	},
	{
		"lat": 47.311179,
		"lng": -96.83586
	},
	{
		"lat": 47.311309,
		"lng": -96.836113
	},
	{
		"lat": 47.31137,
		"lng": -96.836243
	},
	{
		"lat": 47.311407,
		"lng": -96.836332
	},
	{
		"lat": 47.311464,
		"lng": -96.836526
	},
	{
		"lat": 47.311526,
		"lng": -96.836828
	},
	{
		"lat": 47.311549,
		"lng": -96.837088
	},
	{
		"lat": 47.311554,
		"lng": -96.837351
	},
	{
		"lat": 47.311536,
		"lng": -96.837559
	},
	{
		"lat": 47.311522,
		"lng": -96.837662
	},
	{
		"lat": 47.311466,
		"lng": -96.837912
	},
	{
		"lat": 47.311427,
		"lng": -96.838059
	},
	{
		"lat": 47.311344,
		"lng": -96.838292
	},
	{
		"lat": 47.311303,
		"lng": -96.838379
	},
	{
		"lat": 47.311258,
		"lng": -96.83846
	},
	{
		"lat": 47.311161,
		"lng": -96.838616
	},
	{
		"lat": 47.311005,
		"lng": -96.838835
	},
	{
		"lat": 47.310894,
		"lng": -96.838969
	},
	{
		"lat": 47.310684,
		"lng": -96.839172
	},
	{
		"lat": 47.310621,
		"lng": -96.839223
	},
	{
		"lat": 47.310491,
		"lng": -96.839316
	},
	{
		"lat": 47.31039,
		"lng": -96.83937
	},
	{
		"lat": 47.310293,
		"lng": -96.839429
	},
	{
		"lat": 47.310191,
		"lng": -96.839481
	},
	{
		"lat": 47.310028,
		"lng": -96.839594
	},
	{
		"lat": 47.30996,
		"lng": -96.83963
	},
	{
		"lat": 47.309831,
		"lng": -96.839723
	},
	{
		"lat": 47.309762,
		"lng": -96.839757
	},
	{
		"lat": 47.309701,
		"lng": -96.839812
	},
	{
		"lat": 47.309507,
		"lng": -96.839955
	},
	{
		"lat": 47.309354,
		"lng": -96.840094
	},
	{
		"lat": 47.309295,
		"lng": -96.840154
	},
	{
		"lat": 47.309232,
		"lng": -96.840207
	},
	{
		"lat": 47.309143,
		"lng": -96.840297
	},
	{
		"lat": 47.309091,
		"lng": -96.840369
	},
	{
		"lat": 47.308992,
		"lng": -96.840522
	},
	{
		"lat": 47.308903,
		"lng": -96.840689
	},
	{
		"lat": 47.30884,
		"lng": -96.840817
	},
	{
		"lat": 47.308789,
		"lng": -96.840956
	},
	{
		"lat": 47.30876,
		"lng": -96.841052
	},
	{
		"lat": 47.308697,
		"lng": -96.841354
	},
	{
		"lat": 47.308649,
		"lng": -96.841607
	},
	{
		"lat": 47.308609,
		"lng": -96.841917
	},
	{
		"lat": 47.308603,
		"lng": -96.842074
	},
	{
		"lat": 47.308607,
		"lng": -96.842232
	},
	{
		"lat": 47.308619,
		"lng": -96.842335
	},
	{
		"lat": 47.308629,
		"lng": -96.842492
	},
	{
		"lat": 47.308638,
		"lng": -96.842543
	},
	{
		"lat": 47.308719,
		"lng": -96.842835
	},
	{
		"lat": 47.308738,
		"lng": -96.84288
	},
	{
		"lat": 47.308827,
		"lng": -96.843045
	},
	{
		"lat": 47.308977,
		"lng": -96.843273
	},
	{
		"lat": 47.30908,
		"lng": -96.84342
	},
	{
		"lat": 47.309219,
		"lng": -96.843588
	},
	{
		"lat": 47.309305,
		"lng": -96.843685
	},
	{
		"lat": 47.309335,
		"lng": -96.843712
	},
	{
		"lat": 47.309574,
		"lng": -96.843836
	},
	{
		"lat": 47.309678,
		"lng": -96.843877
	},
	{
		"lat": 47.309856,
		"lng": -96.843927
	},
	{
		"lat": 47.310112,
		"lng": -96.843946
	},
	{
		"lat": 47.3102,
		"lng": -96.843934
	},
	{
		"lat": 47.310245,
		"lng": -96.843928
	},
	{
		"lat": 47.310388,
		"lng": -96.843892
	},
	{
		"lat": 47.310524,
		"lng": -96.843821
	},
	{
		"lat": 47.310655,
		"lng": -96.843733
	},
	{
		"lat": 47.310747,
		"lng": -96.84365
	},
	{
		"lat": 47.310877,
		"lng": -96.843559
	},
	{
		"lat": 47.310971,
		"lng": -96.843479
	},
	{
		"lat": 47.311067,
		"lng": -96.843406
	},
	{
		"lat": 47.311221,
		"lng": -96.843272
	},
	{
		"lat": 47.3114,
		"lng": -96.843094
	},
	{
		"lat": 47.311521,
		"lng": -96.842982
	},
	{
		"lat": 47.311755,
		"lng": -96.842735
	},
	{
		"lat": 47.312126,
		"lng": -96.842409
	},
	{
		"lat": 47.312223,
		"lng": -96.842339
	},
	{
		"lat": 47.312361,
		"lng": -96.842278
	},
	{
		"lat": 47.312571,
		"lng": -96.842199
	},
	{
		"lat": 47.312633,
		"lng": -96.842185
	},
	{
		"lat": 47.312643,
		"lng": -96.842183
	},
	{
		"lat": 47.312787,
		"lng": -96.842165
	},
	{
		"lat": 47.312986,
		"lng": -96.842186
	},
	{
		"lat": 47.313057,
		"lng": -96.842201
	},
	{
		"lat": 47.313196,
		"lng": -96.842259
	},
	{
		"lat": 47.313401,
		"lng": -96.842363
	},
	{
		"lat": 47.31353,
		"lng": -96.842456
	},
	{
		"lat": 47.313651,
		"lng": -96.842572
	},
	{
		"lat": 47.313764,
		"lng": -96.842702
	},
	{
		"lat": 47.314013,
		"lng": -96.843081
	},
	{
		"lat": 47.31413,
		"lng": -96.843282
	},
	{
		"lat": 47.314215,
		"lng": -96.843452
	},
	{
		"lat": 47.314292,
		"lng": -96.84363
	},
	{
		"lat": 47.314364,
		"lng": -96.843812
	},
	{
		"lat": 47.314466,
		"lng": -96.844247
	},
	{
		"lat": 47.314507,
		"lng": -96.844392
	},
	{
		"lat": 47.314518,
		"lng": -96.844496
	},
	{
		"lat": 47.314556,
		"lng": -96.844699
	},
	{
		"lat": 47.314577,
		"lng": -96.844906
	},
	{
		"lat": 47.314637,
		"lng": -96.84537
	},
	{
		"lat": 47.314668,
		"lng": -96.84552
	},
	{
		"lat": 47.314685,
		"lng": -96.845676
	},
	{
		"lat": 47.3147,
		"lng": -96.845778
	},
	{
		"lat": 47.314742,
		"lng": -96.845979
	},
	{
		"lat": 47.314758,
		"lng": -96.846026
	},
	{
		"lat": 47.314897,
		"lng": -96.846333
	},
	{
		"lat": 47.315096,
		"lng": -96.846638
	},
	{
		"lat": 47.315211,
		"lng": -96.846766
	},
	{
		"lat": 47.315307,
		"lng": -96.846839
	},
	{
		"lat": 47.315374,
		"lng": -96.846879
	},
	{
		"lat": 47.315512,
		"lng": -96.846939
	},
	{
		"lat": 47.315583,
		"lng": -96.846961
	},
	{
		"lat": 47.31569,
		"lng": -96.846985
	},
	{
		"lat": 47.315834,
		"lng": -96.846976
	},
	{
		"lat": 47.315906,
		"lng": -96.846966
	},
	{
		"lat": 47.316263,
		"lng": -96.846889
	},
	{
		"lat": 47.316333,
		"lng": -96.846863
	},
	{
		"lat": 47.316401,
		"lng": -96.846829
	},
	{
		"lat": 47.316528,
		"lng": -96.846728
	},
	{
		"lat": 47.316584,
		"lng": -96.846662
	},
	{
		"lat": 47.316637,
		"lng": -96.846591
	},
	{
		"lat": 47.316918,
		"lng": -96.846183
	},
	{
		"lat": 47.316991,
		"lng": -96.846066
	},
	{
		"lat": 47.317034,
		"lng": -96.845982
	},
	{
		"lat": 47.317094,
		"lng": -96.845851
	},
	{
		"lat": 47.317145,
		"lng": -96.845712
	},
	{
		"lat": 47.317301,
		"lng": -96.845358
	},
	{
		"lat": 47.317376,
		"lng": -96.845162
	},
	{
		"lat": 47.317423,
		"lng": -96.845037
	},
	{
		"lat": 47.317552,
		"lng": -96.844721
	},
	{
		"lat": 47.317583,
		"lng": -96.844626
	},
	{
		"lat": 47.317622,
		"lng": -96.844537
	},
	{
		"lat": 47.317704,
		"lng": -96.844304
	},
	{
		"lat": 47.317779,
		"lng": -96.844125
	},
	{
		"lat": 47.317866,
		"lng": -96.843895
	},
	{
		"lat": 47.317891,
		"lng": -96.843797
	},
	{
		"lat": 47.317929,
		"lng": -96.843707
	},
	{
		"lat": 47.317953,
		"lng": -96.843608
	},
	{
		"lat": 47.318008,
		"lng": -96.843414
	},
	{
		"lat": 47.318243,
		"lng": -96.842763
	},
	{
		"lat": 47.318271,
		"lng": -96.842666
	},
	{
		"lat": 47.318302,
		"lng": -96.842515
	},
	{
		"lat": 47.318352,
		"lng": -96.842318
	},
	{
		"lat": 47.318382,
		"lng": -96.842166
	},
	{
		"lat": 47.318427,
		"lng": -96.841966
	},
	{
		"lat": 47.318471,
		"lng": -96.841604
	},
	{
		"lat": 47.318499,
		"lng": -96.841452
	},
	{
		"lat": 47.318554,
		"lng": -96.840934
	},
	{
		"lat": 47.318578,
		"lng": -96.840515
	},
	{
		"lat": 47.318583,
		"lng": -96.840357
	},
	{
		"lat": 47.318577,
		"lng": -96.83999
	},
	{
		"lat": 47.318525,
		"lng": -96.839259
	},
	{
		"lat": 47.318503,
		"lng": -96.838892
	},
	{
		"lat": 47.318489,
		"lng": -96.838578
	},
	{
		"lat": 47.318421,
		"lng": -96.837744
	},
	{
		"lat": 47.318408,
		"lng": -96.837429
	},
	{
		"lat": 47.318408,
		"lng": -96.837167
	},
	{
		"lat": 47.318386,
		"lng": -96.837012
	},
	{
		"lat": 47.318405,
		"lng": -96.836954
	},
	{
		"lat": 47.31842,
		"lng": -96.83691
	},
	{
		"lat": 47.318479,
		"lng": -96.836777
	},
	{
		"lat": 47.318599,
		"lng": -96.836454
	},
	{
		"lat": 47.31866,
		"lng": -96.836323
	},
	{
		"lat": 47.318765,
		"lng": -96.836048
	},
	{
		"lat": 47.318884,
		"lng": -96.835785
	},
	{
		"lat": 47.318948,
		"lng": -96.835657
	},
	{
		"lat": 47.31906,
		"lng": -96.835451
	},
	{
		"lat": 47.319136,
		"lng": -96.835339
	},
	{
		"lat": 47.319297,
		"lng": -96.835128
	},
	{
		"lat": 47.319384,
		"lng": -96.835034
	},
	{
		"lat": 47.31954,
		"lng": -96.834902
	},
	{
		"lat": 47.31964,
		"lng": -96.834842
	},
	{
		"lat": 47.319813,
		"lng": -96.834762
	},
	{
		"lat": 47.319953,
		"lng": -96.83471
	},
	{
		"lat": 47.32024,
		"lng": -96.83466
	},
	{
		"lat": 47.320384,
		"lng": -96.834643
	},
	{
		"lat": 47.320492,
		"lng": -96.834646
	},
	{
		"lat": 47.320672,
		"lng": -96.834662
	},
	{
		"lat": 47.320814,
		"lng": -96.834707
	},
	{
		"lat": 47.321192,
		"lng": -96.834886
	},
	{
		"lat": 47.321324,
		"lng": -96.834969
	},
	{
		"lat": 47.321487,
		"lng": -96.835083
	},
	{
		"lat": 47.321611,
		"lng": -96.835192
	},
	{
		"lat": 47.321785,
		"lng": -96.83538
	},
	{
		"lat": 47.321966,
		"lng": -96.835555
	},
	{
		"lat": 47.322119,
		"lng": -96.835694
	},
	{
		"lat": 47.322176,
		"lng": -96.835758
	},
	{
		"lat": 47.322295,
		"lng": -96.835878
	},
	{
		"lat": 47.322351,
		"lng": -96.835945
	},
	{
		"lat": 47.322667,
		"lng": -96.836376
	},
	{
		"lat": 47.322811,
		"lng": -96.836534
	},
	{
		"lat": 47.322905,
		"lng": -96.836613
	},
	{
		"lat": 47.323096,
		"lng": -96.836762
	},
	{
		"lat": 47.323125,
		"lng": -96.836794
	},
	{
		"lat": 47.323267,
		"lng": -96.836884
	},
	{
		"lat": 47.32337,
		"lng": -96.836932
	},
	{
		"lat": 47.323653,
		"lng": -96.837018
	},
	{
		"lat": 47.323938,
		"lng": -96.837089
	},
	{
		"lat": 47.324046,
		"lng": -96.837101
	},
	{
		"lat": 47.324299,
		"lng": -96.837072
	},
	{
		"lat": 47.324344,
		"lng": -96.837064
	},
	{
		"lat": 47.324586,
		"lng": -96.837019
	},
	{
		"lat": 47.324621,
		"lng": -96.837007
	},
	{
		"lat": 47.324633,
		"lng": -96.837001
	},
	{
		"lat": 47.324724,
		"lng": -96.836957
	},
	{
		"lat": 47.324822,
		"lng": -96.8369
	},
	{
		"lat": 47.324977,
		"lng": -96.836766
	},
	{
		"lat": 47.325061,
		"lng": -96.836664
	},
	{
		"lat": 47.325088,
		"lng": -96.836631
	},
	{
		"lat": 47.325174,
		"lng": -96.836534
	},
	{
		"lat": 47.325226,
		"lng": -96.836462
	},
	{
		"lat": 47.32546,
		"lng": -96.835995
	},
	{
		"lat": 47.325564,
		"lng": -96.835719
	},
	{
		"lat": 47.325593,
		"lng": -96.835623
	},
	{
		"lat": 47.325614,
		"lng": -96.835523
	},
	{
		"lat": 47.325651,
		"lng": -96.835375
	},
	{
		"lat": 47.325706,
		"lng": -96.835015
	},
	{
		"lat": 47.325733,
		"lng": -96.834703
	},
	{
		"lat": 47.325737,
		"lng": -96.834493
	},
	{
		"lat": 47.325761,
		"lng": -96.833811
	},
	{
		"lat": 47.325769,
		"lng": -96.833443
	},
	{
		"lat": 47.325759,
		"lng": -96.833023
	},
	{
		"lat": 47.325724,
		"lng": -96.832447
	},
	{
		"lat": 47.325714,
		"lng": -96.831765
	},
	{
		"lat": 47.32572,
		"lng": -96.831555
	},
	{
		"lat": 47.32575,
		"lng": -96.831243
	},
	{
		"lat": 47.325783,
		"lng": -96.831093
	},
	{
		"lat": 47.325829,
		"lng": -96.83095
	},
	{
		"lat": 47.325848,
		"lng": -96.830905
	},
	{
		"lat": 47.326038,
		"lng": -96.830523
	},
	{
		"lat": 47.326077,
		"lng": -96.830435
	},
	{
		"lat": 47.3261,
		"lng": -96.830335
	},
	{
		"lat": 47.326181,
		"lng": -96.8301
	},
	{
		"lat": 47.326287,
		"lng": -96.829888
	},
	{
		"lat": 47.326477,
		"lng": -96.829573
	},
	{
		"lat": 47.326556,
		"lng": -96.829464
	},
	{
		"lat": 47.32672,
		"lng": -96.829259
	},
	{
		"lat": 47.326782,
		"lng": -96.829204
	},
	{
		"lat": 47.326847,
		"lng": -96.82916
	},
	{
		"lat": 47.326878,
		"lng": -96.829132
	},
	{
		"lat": 47.326944,
		"lng": -96.82909
	},
	{
		"lat": 47.327113,
		"lng": -96.828999
	},
	{
		"lat": 47.327388,
		"lng": -96.828868
	},
	{
		"lat": 47.327599,
		"lng": -96.828795
	},
	{
		"lat": 47.327671,
		"lng": -96.828781
	},
	{
		"lat": 47.327815,
		"lng": -96.828764
	},
	{
		"lat": 47.327995,
		"lng": -96.828764
	},
	{
		"lat": 47.328031,
		"lng": -96.828769
	},
	{
		"lat": 47.328138,
		"lng": -96.8288
	},
	{
		"lat": 47.328242,
		"lng": -96.828843
	},
	{
		"lat": 47.328408,
		"lng": -96.828944
	},
	{
		"lat": 47.328506,
		"lng": -96.829013
	},
	{
		"lat": 47.328631,
		"lng": -96.829117
	},
	{
		"lat": 47.328845,
		"lng": -96.829313
	},
	{
		"lat": 47.32891,
		"lng": -96.829358
	},
	{
		"lat": 47.328939,
		"lng": -96.829389
	},
	{
		"lat": 47.329094,
		"lng": -96.829524
	},
	{
		"lat": 47.329123,
		"lng": -96.829556
	},
	{
		"lat": 47.329217,
		"lng": -96.829635
	},
	{
		"lat": 47.329281,
		"lng": -96.829682
	},
	{
		"lat": 47.329311,
		"lng": -96.829713
	},
	{
		"lat": 47.32945,
		"lng": -96.829881
	},
	{
		"lat": 47.329536,
		"lng": -96.829977
	},
	{
		"lat": 47.329589,
		"lng": -96.830048
	},
	{
		"lat": 47.329868,
		"lng": -96.830459
	},
	{
		"lat": 47.329992,
		"lng": -96.830651
	},
	{
		"lat": 47.330111,
		"lng": -96.830848
	},
	{
		"lat": 47.330155,
		"lng": -96.830932
	},
	{
		"lat": 47.330268,
		"lng": -96.8312
	},
	{
		"lat": 47.330339,
		"lng": -96.831383
	},
	{
		"lat": 47.330378,
		"lng": -96.831472
	},
	{
		"lat": 47.330405,
		"lng": -96.831569
	},
	{
		"lat": 47.330442,
		"lng": -96.831659
	},
	{
		"lat": 47.330627,
		"lng": -96.832284
	},
	{
		"lat": 47.33074,
		"lng": -96.832783
	},
	{
		"lat": 47.330771,
		"lng": -96.832878
	},
	{
		"lat": 47.330781,
		"lng": -96.832929
	},
	{
		"lat": 47.330792,
		"lng": -96.833033
	},
	{
		"lat": 47.330812,
		"lng": -96.833134
	},
	{
		"lat": 47.330825,
		"lng": -96.833237
	},
	{
		"lat": 47.330852,
		"lng": -96.83339
	},
	{
		"lat": 47.330878,
		"lng": -96.833488
	},
	{
		"lat": 47.330909,
		"lng": -96.8338
	},
	{
		"lat": 47.330945,
		"lng": -96.834375
	},
	{
		"lat": 47.330953,
		"lng": -96.834584
	},
	{
		"lat": 47.330944,
		"lng": -96.835004
	},
	{
		"lat": 47.330923,
		"lng": -96.835159
	},
	{
		"lat": 47.330846,
		"lng": -96.835396
	},
	{
		"lat": 47.330818,
		"lng": -96.835493
	},
	{
		"lat": 47.330709,
		"lng": -96.835823
	},
	{
		"lat": 47.330597,
		"lng": -96.83603
	},
	{
		"lat": 47.330472,
		"lng": -96.83622
	},
	{
		"lat": 47.330292,
		"lng": -96.836478
	},
	{
		"lat": 47.330134,
		"lng": -96.836694
	},
	{
		"lat": 47.330052,
		"lng": -96.836797
	},
	{
		"lat": 47.329965,
		"lng": -96.83689
	},
	{
		"lat": 47.329721,
		"lng": -96.837116
	},
	{
		"lat": 47.32959,
		"lng": -96.837204
	},
	{
		"lat": 47.329193,
		"lng": -96.837455
	},
	{
		"lat": 47.329097,
		"lng": -96.837528
	},
	{
		"lat": 47.328867,
		"lng": -96.83768
	},
	{
		"lat": 47.328804,
		"lng": -96.837731
	},
	{
		"lat": 47.328671,
		"lng": -96.837815
	},
	{
		"lat": 47.328543,
		"lng": -96.837912
	},
	{
		"lat": 47.328482,
		"lng": -96.837966
	},
	{
		"lat": 47.32829,
		"lng": -96.838111
	},
	{
		"lat": 47.328224,
		"lng": -96.838154
	},
	{
		"lat": 47.327787,
		"lng": -96.83862
	},
	{
		"lat": 47.327533,
		"lng": -96.838915
	},
	{
		"lat": 47.327406,
		"lng": -96.839101
	},
	{
		"lat": 47.327343,
		"lng": -96.83923
	},
	{
		"lat": 47.327108,
		"lng": -96.839628
	},
	{
		"lat": 47.326993,
		"lng": -96.839831
	},
	{
		"lat": 47.32693,
		"lng": -96.839959
	},
	{
		"lat": 47.326871,
		"lng": -96.840092
	},
	{
		"lat": 47.326836,
		"lng": -96.840183
	},
	{
		"lat": 47.326725,
		"lng": -96.840513
	},
	{
		"lat": 47.326659,
		"lng": -96.840758
	},
	{
		"lat": 47.326606,
		"lng": -96.841009
	},
	{
		"lat": 47.326551,
		"lng": -96.841314
	},
	{
		"lat": 47.326522,
		"lng": -96.841574
	},
	{
		"lat": 47.326505,
		"lng": -96.841835
	},
	{
		"lat": 47.326501,
		"lng": -96.841993
	},
	{
		"lat": 47.326556,
		"lng": -96.842619
	},
	{
		"lat": 47.326598,
		"lng": -96.842874
	},
	{
		"lat": 47.326644,
		"lng": -96.843289
	},
	{
		"lat": 47.32667,
		"lng": -96.843457
	},
	{
		"lat": 47.326707,
		"lng": -96.843605
	},
	{
		"lat": 47.326732,
		"lng": -96.843759
	},
	{
		"lat": 47.326772,
		"lng": -96.843906
	},
	{
		"lat": 47.326831,
		"lng": -96.844097
	},
	{
		"lat": 47.326946,
		"lng": -96.844364
	},
	{
		"lat": 47.327077,
		"lng": -96.844615
	},
	{
		"lat": 47.327242,
		"lng": -96.844893
	},
	{
		"lat": 47.32747,
		"lng": -96.845231
	},
	{
		"lat": 47.327577,
		"lng": -96.845371
	},
	{
		"lat": 47.327665,
		"lng": -96.845465
	},
	{
		"lat": 47.327853,
		"lng": -96.84562
	},
	{
		"lat": 47.327911,
		"lng": -96.845682
	},
	{
		"lat": 47.328037,
		"lng": -96.845786
	},
	{
		"lat": 47.328134,
		"lng": -96.845855
	},
	{
		"lat": 47.328301,
		"lng": -96.845955
	},
	{
		"lat": 47.328403,
		"lng": -96.846009
	},
	{
		"lat": 47.328684,
		"lng": -96.846109
	},
	{
		"lat": 47.328861,
		"lng": -96.846159
	},
	{
		"lat": 47.329005,
		"lng": -96.846178
	},
	{
		"lat": 47.329511,
		"lng": -96.846184
	},
	{
		"lat": 47.329762,
		"lng": -96.846138
	},
	{
		"lat": 47.3299,
		"lng": -96.846072
	},
	{
		"lat": 47.330075,
		"lng": -96.846006
	},
	{
		"lat": 47.330175,
		"lng": -96.845947
	},
	{
		"lat": 47.330339,
		"lng": -96.845836
	},
	{
		"lat": 47.330431,
		"lng": -96.845753
	},
	{
		"lat": 47.330558,
		"lng": -96.845654
	},
	{
		"lat": 47.330648,
		"lng": -96.845566
	},
	{
		"lat": 47.33073,
		"lng": -96.845463
	},
	{
		"lat": 47.330929,
		"lng": -96.845235
	},
	{
		"lat": 47.331088,
		"lng": -96.845019
	},
	{
		"lat": 47.331164,
		"lng": -96.844907
	},
	{
		"lat": 47.331382,
		"lng": -96.844557
	},
	{
		"lat": 47.331614,
		"lng": -96.844153
	},
	{
		"lat": 47.331693,
		"lng": -96.843978
	},
	{
		"lat": 47.331741,
		"lng": -96.843836
	},
	{
		"lat": 47.331768,
		"lng": -96.843739
	},
	{
		"lat": 47.331803,
		"lng": -96.843647
	},
	{
		"lat": 47.331834,
		"lng": -96.843552
	},
	{
		"lat": 47.331857,
		"lng": -96.843453
	},
	{
		"lat": 47.332058,
		"lng": -96.842894
	},
	{
		"lat": 47.332072,
		"lng": -96.842846
	},
	{
		"lat": 47.332134,
		"lng": -96.842544
	},
	{
		"lat": 47.332178,
		"lng": -96.842181
	},
	{
		"lat": 47.332204,
		"lng": -96.841868
	},
	{
		"lat": 47.332216,
		"lng": -96.841395
	},
	{
		"lat": 47.332218,
		"lng": -96.840975
	},
	{
		"lat": 47.332215,
		"lng": -96.840817
	},
	{
		"lat": 47.332198,
		"lng": -96.840503
	},
	{
		"lat": 47.332189,
		"lng": -96.840398
	},
	{
		"lat": 47.332139,
		"lng": -96.840037
	},
	{
		"lat": 47.332052,
		"lng": -96.8391
	},
	{
		"lat": 47.331937,
		"lng": -96.838218
	},
	{
		"lat": 47.331894,
		"lng": -96.837855
	},
	{
		"lat": 47.331882,
		"lng": -96.837646
	},
	{
		"lat": 47.33187,
		"lng": -96.837331
	},
	{
		"lat": 47.331872,
		"lng": -96.837068
	},
	{
		"lat": 47.331896,
		"lng": -96.836597
	},
	{
		"lat": 47.33193,
		"lng": -96.836447
	},
	{
		"lat": 47.331949,
		"lng": -96.836345
	},
	{
		"lat": 47.331962,
		"lng": -96.836242
	},
	{
		"lat": 47.331983,
		"lng": -96.836141
	},
	{
		"lat": 47.332082,
		"lng": -96.835746
	},
	{
		"lat": 47.332128,
		"lng": -96.835603
	},
	{
		"lat": 47.332138,
		"lng": -96.835553
	},
	{
		"lat": 47.332202,
		"lng": -96.835364
	},
	{
		"lat": 47.33234,
		"lng": -96.835056
	},
	{
		"lat": 47.332404,
		"lng": -96.834929
	},
	{
		"lat": 47.332473,
		"lng": -96.834807
	},
	{
		"lat": 47.332702,
		"lng": -96.834471
	},
	{
		"lat": 47.332755,
		"lng": -96.834399
	},
	{
		"lat": 47.332814,
		"lng": -96.834338
	},
	{
		"lat": 47.33295,
		"lng": -96.834165
	},
	{
		"lat": 47.333296,
		"lng": -96.833881
	},
	{
		"lat": 47.333492,
		"lng": -96.833746
	},
	{
		"lat": 47.333618,
		"lng": -96.833645
	},
	{
		"lat": 47.333685,
		"lng": -96.833606
	},
	{
		"lat": 47.333747,
		"lng": -96.83355
	},
	{
		"lat": 47.333945,
		"lng": -96.833424
	},
	{
		"lat": 47.333976,
		"lng": -96.833396
	},
	{
		"lat": 47.334112,
		"lng": -96.833322
	},
	{
		"lat": 47.334277,
		"lng": -96.833218
	},
	{
		"lat": 47.334413,
		"lng": -96.833144
	},
	{
		"lat": 47.334508,
		"lng": -96.83307
	},
	{
		"lat": 47.33477,
		"lng": -96.832893
	},
	{
		"lat": 47.334969,
		"lng": -96.832769
	},
	{
		"lat": 47.335032,
		"lng": -96.832717
	},
	{
		"lat": 47.335098,
		"lng": -96.832675
	},
	{
		"lat": 47.335159,
		"lng": -96.832618
	},
	{
		"lat": 47.335458,
		"lng": -96.832434
	},
	{
		"lat": 47.335522,
		"lng": -96.832383
	},
	{
		"lat": 47.33575,
		"lng": -96.832226
	},
	{
		"lat": 47.335874,
		"lng": -96.832119
	},
	{
		"lat": 47.336065,
		"lng": -96.831971
	},
	{
		"lat": 47.33644,
		"lng": -96.831653
	},
	{
		"lat": 47.336684,
		"lng": -96.831429
	},
	{
		"lat": 47.336872,
		"lng": -96.831272
	},
	{
		"lat": 47.336905,
		"lng": -96.831251
	},
	{
		"lat": 47.336975,
		"lng": -96.831221
	},
	{
		"lat": 47.33711,
		"lng": -96.831147
	},
	{
		"lat": 47.337141,
		"lng": -96.831121
	},
	{
		"lat": 47.337273,
		"lng": -96.831034
	},
	{
		"lat": 47.337407,
		"lng": -96.830958
	},
	{
		"lat": 47.337506,
		"lng": -96.830893
	},
	{
		"lat": 47.337808,
		"lng": -96.830718
	},
	{
		"lat": 47.337983,
		"lng": -96.830633
	},
	{
		"lat": 47.338014,
		"lng": -96.830618
	},
	{
		"lat": 47.338121,
		"lng": -96.830595
	},
	{
		"lat": 47.338283,
		"lng": -96.830574
	},
	{
		"lat": 47.338391,
		"lng": -96.830577
	},
	{
		"lat": 47.338643,
		"lng": -96.830613
	},
	{
		"lat": 47.338786,
		"lng": -96.830643
	},
	{
		"lat": 47.338857,
		"lng": -96.830667
	},
	{
		"lat": 47.338961,
		"lng": -96.830712
	},
	{
		"lat": 47.339129,
		"lng": -96.830806
	},
	{
		"lat": 47.339192,
		"lng": -96.830859
	},
	{
		"lat": 47.339291,
		"lng": -96.830923
	},
	{
		"lat": 47.339383,
		"lng": -96.831005
	},
	{
		"lat": 47.339499,
		"lng": -96.831132
	},
	{
		"lat": 47.339591,
		"lng": -96.831214
	},
	{
		"lat": 47.339773,
		"lng": -96.83147
	},
	{
		"lat": 47.340065,
		"lng": -96.831936
	},
	{
		"lat": 47.340151,
		"lng": -96.832105
	},
	{
		"lat": 47.340331,
		"lng": -96.832498
	},
	{
		"lat": 47.340348,
		"lng": -96.832544
	},
	{
		"lat": 47.340392,
		"lng": -96.832628
	},
	{
		"lat": 47.340448,
		"lng": -96.832763
	},
	{
		"lat": 47.340481,
		"lng": -96.832857
	},
	{
		"lat": 47.340501,
		"lng": -96.832901
	},
	{
		"lat": 47.340568,
		"lng": -96.833086
	},
	{
		"lat": 47.340695,
		"lng": -96.833405
	},
	{
		"lat": 47.340728,
		"lng": -96.833499
	},
	{
		"lat": 47.340752,
		"lng": -96.833598
	},
	{
		"lat": 47.340787,
		"lng": -96.833689
	},
	{
		"lat": 47.340913,
		"lng": -96.834181
	},
	{
		"lat": 47.34094,
		"lng": -96.834387
	},
	{
		"lat": 47.340965,
		"lng": -96.834485
	},
	{
		"lat": 47.341,
		"lng": -96.83485
	},
	{
		"lat": 47.341007,
		"lng": -96.834954
	},
	{
		"lat": 47.341016,
		"lng": -96.835322
	},
	{
		"lat": 47.34101,
		"lng": -96.835584
	},
	{
		"lat": 47.340976,
		"lng": -96.836054
	},
	{
		"lat": 47.340949,
		"lng": -96.836261
	},
	{
		"lat": 47.34085,
		"lng": -96.836766
	},
	{
		"lat": 47.340767,
		"lng": -96.837056
	},
	{
		"lat": 47.340743,
		"lng": -96.837154
	},
	{
		"lat": 47.340675,
		"lng": -96.837397
	},
	{
		"lat": 47.340625,
		"lng": -96.837649
	},
	{
		"lat": 47.340591,
		"lng": -96.837799
	},
	{
		"lat": 47.340567,
		"lng": -96.837952
	},
	{
		"lat": 47.340521,
		"lng": -96.838314
	},
	{
		"lat": 47.340503,
		"lng": -96.838575
	},
	{
		"lat": 47.34051,
		"lng": -96.838785
	},
	{
		"lat": 47.340531,
		"lng": -96.839046
	},
	{
		"lat": 47.340558,
		"lng": -96.839144
	},
	{
		"lat": 47.340583,
		"lng": -96.83935
	},
	{
		"lat": 47.340604,
		"lng": -96.839451
	},
	{
		"lat": 47.340619,
		"lng": -96.839554
	},
	{
		"lat": 47.340639,
		"lng": -96.839655
	},
	{
		"lat": 47.34072,
		"lng": -96.839889
	},
	{
		"lat": 47.34083,
		"lng": -96.84016
	},
	{
		"lat": 47.340935,
		"lng": -96.840375
	},
	{
		"lat": 47.341106,
		"lng": -96.840645
	},
	{
		"lat": 47.341238,
		"lng": -96.840825
	},
	{
		"lat": 47.341378,
		"lng": -96.84099
	},
	{
		"lat": 47.341559,
		"lng": -96.841163
	},
	{
		"lat": 47.341655,
		"lng": -96.841236
	},
	{
		"lat": 47.34178,
		"lng": -96.841342
	},
	{
		"lat": 47.341815,
		"lng": -96.841358
	},
	{
		"lat": 47.341914,
		"lng": -96.841423
	},
	{
		"lat": 47.341983,
		"lng": -96.841454
	},
	{
		"lat": 47.34205,
		"lng": -96.841492
	},
	{
		"lat": 47.34212,
		"lng": -96.841518
	},
	{
		"lat": 47.342333,
		"lng": -96.841578
	},
	{
		"lat": 47.342507,
		"lng": -96.841646
	},
	{
		"lat": 47.342574,
		"lng": -96.841686
	},
	{
		"lat": 47.342728,
		"lng": -96.841759
	},
	{
		"lat": 47.34311,
		"lng": -96.841917
	},
	{
		"lat": 47.343424,
		"lng": -96.84204
	},
	{
		"lat": 47.343778,
		"lng": -96.84215
	},
	{
		"lat": 47.343952,
		"lng": -96.842221
	},
	{
		"lat": 47.34402,
		"lng": -96.842257
	},
	{
		"lat": 47.34415,
		"lng": -96.842347
	},
	{
		"lat": 47.344407,
		"lng": -96.84254
	},
	{
		"lat": 47.344499,
		"lng": -96.842624
	},
	{
		"lat": 47.344595,
		"lng": -96.842696
	},
	{
		"lat": 47.344656,
		"lng": -96.842754
	},
	{
		"lat": 47.344998,
		"lng": -96.843142
	},
	{
		"lat": 47.345076,
		"lng": -96.843252
	},
	{
		"lat": 47.345174,
		"lng": -96.843407
	},
	{
		"lat": 47.345283,
		"lng": -96.843616
	},
	{
		"lat": 47.345403,
		"lng": -96.843879
	},
	{
		"lat": 47.345411,
		"lng": -96.843928
	},
	{
		"lat": 47.345411,
		"lng": -96.844033
	},
	{
		"lat": 47.345424,
		"lng": -96.844136
	},
	{
		"lat": 47.345458,
		"lng": -96.844286
	},
	{
		"lat": 47.345504,
		"lng": -96.844429
	},
	{
		"lat": 47.345591,
		"lng": -96.844659
	},
	{
		"lat": 47.345676,
		"lng": -96.844831
	},
	{
		"lat": 47.345718,
		"lng": -96.844901
	},
	{
		"lat": 47.345819,
		"lng": -96.845067
	},
	{
		"lat": 47.345922,
		"lng": -96.845214
	},
	{
		"lat": 47.34601,
		"lng": -96.845307
	},
	{
		"lat": 47.346037,
		"lng": -96.845341
	},
	{
		"lat": 47.346363,
		"lng": -96.845833
	},
	{
		"lat": 47.346675,
		"lng": -96.846271
	},
	{
		"lat": 47.346731,
		"lng": -96.846338
	},
	{
		"lat": 47.346937,
		"lng": -96.846552
	},
	{
		"lat": 47.347028,
		"lng": -96.846639
	},
	{
		"lat": 47.347189,
		"lng": -96.846758
	},
	{
		"lat": 47.347322,
		"lng": -96.84684
	},
	{
		"lat": 47.347423,
		"lng": -96.846896
	},
	{
		"lat": 47.347553,
		"lng": -96.846986
	},
	{
		"lat": 47.347711,
		"lng": -96.847114
	},
	{
		"lat": 47.347885,
		"lng": -96.847181
	},
	{
		"lat": 47.348029,
		"lng": -96.84721
	},
	{
		"lat": 47.348133,
		"lng": -96.847254
	},
	{
		"lat": 47.34827,
		"lng": -96.847321
	},
	{
		"lat": 47.348447,
		"lng": -96.847374
	},
	{
		"lat": 47.348519,
		"lng": -96.847387
	},
	{
		"lat": 47.34866,
		"lng": -96.847431
	},
	{
		"lat": 47.348696,
		"lng": -96.847436
	},
	{
		"lat": 47.348913,
		"lng": -96.847437
	},
	{
		"lat": 47.349056,
		"lng": -96.847408
	},
	{
		"lat": 47.349411,
		"lng": -96.847312
	},
	{
		"lat": 47.349446,
		"lng": -96.847298
	},
	{
		"lat": 47.349513,
		"lng": -96.847259
	},
	{
		"lat": 47.349607,
		"lng": -96.847183
	},
	{
		"lat": 47.349713,
		"lng": -96.847039
	},
	{
		"lat": 47.349784,
		"lng": -96.84692
	},
	{
		"lat": 47.34984,
		"lng": -96.846785
	},
	{
		"lat": 47.349866,
		"lng": -96.846687
	},
	{
		"lat": 47.349948,
		"lng": -96.846454
	},
	{
		"lat": 47.350049,
		"lng": -96.84606
	},
	{
		"lat": 47.350084,
		"lng": -96.845856
	},
	{
		"lat": 47.35021,
		"lng": -96.845199
	},
	{
		"lat": 47.350227,
		"lng": -96.84499
	},
	{
		"lat": 47.35025,
		"lng": -96.844624
	},
	{
		"lat": 47.350247,
		"lng": -96.844466
	},
	{
		"lat": 47.350232,
		"lng": -96.844364
	},
	{
		"lat": 47.350213,
		"lng": -96.84405
	},
	{
		"lat": 47.350221,
		"lng": -96.84399
	},
	{
		"lat": 47.350227,
		"lng": -96.843832
	},
	{
		"lat": 47.350237,
		"lng": -96.843782
	},
	{
		"lat": 47.350288,
		"lng": -96.843644
	},
	{
		"lat": 47.350313,
		"lng": -96.843586
	},
	{
		"lat": 47.350326,
		"lng": -96.843554
	},
	{
		"lat": 47.350355,
		"lng": -96.843507
	},
	{
		"lat": 47.350374,
		"lng": -96.843476
	},
	{
		"lat": 47.350399,
		"lng": -96.843406
	},
	{
		"lat": 47.350441,
		"lng": -96.84329
	},
	{
		"lat": 47.350507,
		"lng": -96.843165
	},
	{
		"lat": 47.350556,
		"lng": -96.843088
	},
	{
		"lat": 47.350583,
		"lng": -96.843053
	},
	{
		"lat": 47.350613,
		"lng": -96.843024
	},
	{
		"lat": 47.350677,
		"lng": -96.842975
	},
	{
		"lat": 47.350743,
		"lng": -96.842932
	},
	{
		"lat": 47.350778,
		"lng": -96.842915
	},
	{
		"lat": 47.350921,
		"lng": -96.842889
	},
	{
		"lat": 47.351137,
		"lng": -96.842914
	},
	{
		"lat": 47.351172,
		"lng": -96.842923
	},
	{
		"lat": 47.351239,
		"lng": -96.842963
	},
	{
		"lat": 47.351308,
		"lng": -96.842995
	},
	{
		"lat": 47.351405,
		"lng": -96.843063
	},
	{
		"lat": 47.351501,
		"lng": -96.843138
	},
	{
		"lat": 47.351683,
		"lng": -96.843309
	},
	{
		"lat": 47.351798,
		"lng": -96.843436
	},
	{
		"lat": 47.351881,
		"lng": -96.843538
	},
	{
		"lat": 47.352168,
		"lng": -96.843938
	},
	{
		"lat": 47.352331,
		"lng": -96.844145
	},
	{
		"lat": 47.352361,
		"lng": -96.844175
	},
	{
		"lat": 47.352489,
		"lng": -96.844273
	},
	{
		"lat": 47.35254,
		"lng": -96.844328
	},
	{
		"lat": 47.352555,
		"lng": -96.844342
	},
	{
		"lat": 47.35258,
		"lng": -96.844366
	},
	{
		"lat": 47.352603,
		"lng": -96.844402
	},
	{
		"lat": 47.35263,
		"lng": -96.844437
	},
	{
		"lat": 47.35266,
		"lng": -96.844467
	},
	{
		"lat": 47.35277,
		"lng": -96.844604
	},
	{
		"lat": 47.352855,
		"lng": -96.8447
	},
	{
		"lat": 47.352887,
		"lng": -96.844726
	},
	{
		"lat": 47.353005,
		"lng": -96.844847
	},
	{
		"lat": 47.353102,
		"lng": -96.844917
	},
	{
		"lat": 47.353239,
		"lng": -96.844987
	},
	{
		"lat": 47.353451,
		"lng": -96.845054
	},
	{
		"lat": 47.353559,
		"lng": -96.845063
	},
	{
		"lat": 47.353631,
		"lng": -96.845051
	},
	{
		"lat": 47.353699,
		"lng": -96.845017
	},
	{
		"lat": 47.353803,
		"lng": -96.844974
	},
	{
		"lat": 47.353839,
		"lng": -96.844964
	},
	{
		"lat": 47.353872,
		"lng": -96.844944
	},
	{
		"lat": 47.354065,
		"lng": -96.844798
	},
	{
		"lat": 47.354185,
		"lng": -96.844685
	},
	{
		"lat": 47.354271,
		"lng": -96.844588
	},
	{
		"lat": 47.354348,
		"lng": -96.844477
	},
	{
		"lat": 47.354446,
		"lng": -96.844324
	},
	{
		"lat": 47.354528,
		"lng": -96.844151
	},
	{
		"lat": 47.354615,
		"lng": -96.843921
	},
	{
		"lat": 47.35464,
		"lng": -96.843822
	},
	{
		"lat": 47.354691,
		"lng": -96.843571
	},
	{
		"lat": 47.354719,
		"lng": -96.843258
	},
	{
		"lat": 47.354716,
		"lng": -96.843153
	},
	{
		"lat": 47.35469,
		"lng": -96.842947
	},
	{
		"lat": 47.354659,
		"lng": -96.842795
	},
	{
		"lat": 47.354554,
		"lng": -96.842348
	},
	{
		"lat": 47.354539,
		"lng": -96.8423
	},
	{
		"lat": 47.35439,
		"lng": -96.84194
	},
	{
		"lat": 47.354347,
		"lng": -96.841855
	},
	{
		"lat": 47.354298,
		"lng": -96.841778
	},
	{
		"lat": 47.354254,
		"lng": -96.841694
	},
	{
		"lat": 47.354063,
		"lng": -96.841379
	},
	{
		"lat": 47.353914,
		"lng": -96.841082
	},
	{
		"lat": 47.353858,
		"lng": -96.840948
	},
	{
		"lat": 47.353697,
		"lng": -96.840536
	},
	{
		"lat": 47.353581,
		"lng": -96.84027
	},
	{
		"lat": 47.353518,
		"lng": -96.840082
	},
	{
		"lat": 47.353492,
		"lng": -96.839974
	},
	{
		"lat": 47.353436,
		"lng": -96.839562
	},
	{
		"lat": 47.353404,
		"lng": -96.83925
	},
	{
		"lat": 47.353404,
		"lng": -96.838935
	},
	{
		"lat": 47.35341,
		"lng": -96.838725
	},
	{
		"lat": 47.353437,
		"lng": -96.838413
	},
	{
		"lat": 47.353489,
		"lng": -96.838107
	},
	{
		"lat": 47.353514,
		"lng": -96.838008
	},
	{
		"lat": 47.35363,
		"lng": -96.837742
	},
	{
		"lat": 47.353676,
		"lng": -96.83766
	},
	{
		"lat": 47.353726,
		"lng": -96.837584
	},
	{
		"lat": 47.353919,
		"lng": -96.837346
	},
	{
		"lat": 47.354009,
		"lng": -96.837258
	},
	{
		"lat": 47.35414,
		"lng": -96.837171
	},
	{
		"lat": 47.354244,
		"lng": -96.837124
	},
	{
		"lat": 47.354314,
		"lng": -96.837101
	},
	{
		"lat": 47.354386,
		"lng": -96.837085
	},
	{
		"lat": 47.354455,
		"lng": -96.837056
	},
	{
		"lat": 47.354527,
		"lng": -96.837044
	},
	{
		"lat": 47.354672,
		"lng": -96.837038
	},
	{
		"lat": 47.354816,
		"lng": -96.837044
	},
	{
		"lat": 47.355101,
		"lng": -96.837111
	},
	{
		"lat": 47.355239,
		"lng": -96.837175
	},
	{
		"lat": 47.355474,
		"lng": -96.83731
	},
	{
		"lat": 47.355536,
		"lng": -96.837362
	},
	{
		"lat": 47.355656,
		"lng": -96.83748
	},
	{
		"lat": 47.35574,
		"lng": -96.837579
	},
	{
		"lat": 47.355841,
		"lng": -96.837731
	},
	{
		"lat": 47.355957,
		"lng": -96.837932
	},
	{
		"lat": 47.356032,
		"lng": -96.838111
	},
	{
		"lat": 47.356168,
		"lng": -96.83854
	},
	{
		"lat": 47.356226,
		"lng": -96.838789
	},
	{
		"lat": 47.356265,
		"lng": -96.838991
	},
	{
		"lat": 47.356307,
		"lng": -96.839407
	},
	{
		"lat": 47.356323,
		"lng": -96.839616
	},
	{
		"lat": 47.356336,
		"lng": -96.839878
	},
	{
		"lat": 47.356348,
		"lng": -96.840246
	},
	{
		"lat": 47.35635,
		"lng": -96.840561
	},
	{
		"lat": 47.35633,
		"lng": -96.841244
	},
	{
		"lat": 47.356335,
		"lng": -96.841454
	},
	{
		"lat": 47.356377,
		"lng": -96.84245
	},
	{
		"lat": 47.356399,
		"lng": -96.843237
	},
	{
		"lat": 47.3564,
		"lng": -96.843448
	},
	{
		"lat": 47.356417,
		"lng": -96.844183
	},
	{
		"lat": 47.356424,
		"lng": -96.844918
	},
	{
		"lat": 47.356424,
		"lng": -96.845759
	},
	{
		"lat": 47.356418,
		"lng": -96.846547
	},
	{
		"lat": 47.356429,
		"lng": -96.847019
	},
	{
		"lat": 47.356442,
		"lng": -96.847229
	},
	{
		"lat": 47.356486,
		"lng": -96.847751
	},
	{
		"lat": 47.356548,
		"lng": -96.848375
	},
	{
		"lat": 47.356569,
		"lng": -96.848476
	},
	{
		"lat": 47.356583,
		"lng": -96.848635
	},
	{
		"lat": 47.35662,
		"lng": -96.848784
	},
	{
		"lat": 47.356664,
		"lng": -96.849039
	},
	{
		"lat": 47.356717,
		"lng": -96.84929
	},
	{
		"lat": 47.356821,
		"lng": -96.849682
	},
	{
		"lat": 47.356857,
		"lng": -96.849831
	},
	{
		"lat": 47.356925,
		"lng": -96.850074
	},
	{
		"lat": 47.35701,
		"lng": -96.850306
	},
	{
		"lat": 47.357071,
		"lng": -96.850496
	},
	{
		"lat": 47.357091,
		"lng": -96.85054
	},
	{
		"lat": 47.357395,
		"lng": -96.851061
	},
	{
		"lat": 47.357523,
		"lng": -96.851247
	},
	{
		"lat": 47.357888,
		"lng": -96.851756
	},
	{
		"lat": 47.357945,
		"lng": -96.851822
	},
	{
		"lat": 47.358064,
		"lng": -96.851941
	},
	{
		"lat": 47.358127,
		"lng": -96.851993
	},
	{
		"lat": 47.358388,
		"lng": -96.852175
	},
	{
		"lat": 47.358525,
		"lng": -96.852239
	},
	{
		"lat": 47.358735,
		"lng": -96.852319
	},
	{
		"lat": 47.358841,
		"lng": -96.852348
	},
	{
		"lat": 47.358985,
		"lng": -96.852375
	},
	{
		"lat": 47.359129,
		"lng": -96.852371
	},
	{
		"lat": 47.359525,
		"lng": -96.852314
	},
	{
		"lat": 47.35956,
		"lng": -96.852303
	},
	{
		"lat": 47.359903,
		"lng": -96.852136
	},
	{
		"lat": 47.360292,
		"lng": -96.851862
	},
	{
		"lat": 47.360384,
		"lng": -96.851779
	},
	{
		"lat": 47.360471,
		"lng": -96.851685
	},
	{
		"lat": 47.360707,
		"lng": -96.85136
	},
	{
		"lat": 47.360808,
		"lng": -96.85121
	},
	{
		"lat": 47.360999,
		"lng": -96.850895
	},
	{
		"lat": 47.361204,
		"lng": -96.850528
	},
	{
		"lat": 47.361269,
		"lng": -96.850401
	},
	{
		"lat": 47.361408,
		"lng": -96.850159
	},
	{
		"lat": 47.3619,
		"lng": -96.849387
	},
	{
		"lat": 47.361944,
		"lng": -96.849304
	},
	{
		"lat": 47.361994,
		"lng": -96.849228
	},
	{
		"lat": 47.36208,
		"lng": -96.849059
	},
	{
		"lat": 47.362198,
		"lng": -96.848859
	},
	{
		"lat": 47.362219,
		"lng": -96.848817
	},
	{
		"lat": 47.362376,
		"lng": -96.848598
	},
	{
		"lat": 47.362536,
		"lng": -96.848386
	},
	{
		"lat": 47.362625,
		"lng": -96.848296
	},
	{
		"lat": 47.362752,
		"lng": -96.848196
	},
	{
		"lat": 47.362818,
		"lng": -96.848153
	},
	{
		"lat": 47.363058,
		"lng": -96.848035
	},
	{
		"lat": 47.363163,
		"lng": -96.847995
	},
	{
		"lat": 47.363264,
		"lng": -96.847941
	},
	{
		"lat": 47.363408,
		"lng": -96.847918
	},
	{
		"lat": 47.363589,
		"lng": -96.847908
	},
	{
		"lat": 47.363661,
		"lng": -96.847912
	},
	{
		"lat": 47.363874,
		"lng": -96.847969
	},
	{
		"lat": 47.363909,
		"lng": -96.847984
	},
	{
		"lat": 47.364077,
		"lng": -96.848081
	},
	{
		"lat": 47.364146,
		"lng": -96.848109
	},
	{
		"lat": 47.364315,
		"lng": -96.848201
	},
	{
		"lat": 47.364335,
		"lng": -96.848208
	},
	{
		"lat": 47.364386,
		"lng": -96.848225
	},
	{
		"lat": 47.364484,
		"lng": -96.848293
	},
	{
		"lat": 47.36462,
		"lng": -96.848362
	},
	{
		"lat": 47.364652,
		"lng": -96.848386
	},
	{
		"lat": 47.364682,
		"lng": -96.848417
	},
	{
		"lat": 47.364745,
		"lng": -96.848467
	},
	{
		"lat": 47.364812,
		"lng": -96.848506
	},
	{
		"lat": 47.364902,
		"lng": -96.848594
	},
	{
		"lat": 47.365017,
		"lng": -96.848721
	},
	{
		"lat": 47.365048,
		"lng": -96.848749
	},
	{
		"lat": 47.36509,
		"lng": -96.848778
	},
	{
		"lat": 47.365148,
		"lng": -96.84884
	},
	{
		"lat": 47.365179,
		"lng": -96.848867
	},
	{
		"lat": 47.365262,
		"lng": -96.848969
	},
	{
		"lat": 47.365323,
		"lng": -96.849025
	},
	{
		"lat": 47.365518,
		"lng": -96.849259
	},
	{
		"lat": 47.365605,
		"lng": -96.849353
	},
	{
		"lat": 47.365659,
		"lng": -96.849422
	},
	{
		"lat": 47.36571,
		"lng": -96.849496
	},
	{
		"lat": 47.365964,
		"lng": -96.849793
	},
	{
		"lat": 47.366129,
		"lng": -96.850072
	},
	{
		"lat": 47.366268,
		"lng": -96.850379
	},
	{
		"lat": 47.366349,
		"lng": -96.850613
	},
	{
		"lat": 47.366406,
		"lng": -96.850807
	},
	{
		"lat": 47.366423,
		"lng": -96.850963
	},
	{
		"lat": 47.366448,
		"lng": -96.851061
	},
	{
		"lat": 47.366452,
		"lng": -96.851113
	},
	{
		"lat": 47.366465,
		"lng": -96.851586
	},
	{
		"lat": 47.366434,
		"lng": -96.852109
	},
	{
		"lat": 47.366383,
		"lng": -96.852523
	},
	{
		"lat": 47.366359,
		"lng": -96.852676
	},
	{
		"lat": 47.366328,
		"lng": -96.852828
	},
	{
		"lat": 47.366303,
		"lng": -96.853035
	},
	{
		"lat": 47.36625,
		"lng": -96.853394
	},
	{
		"lat": 47.366155,
		"lng": -96.854117
	},
	{
		"lat": 47.366117,
		"lng": -96.854374
	},
	{
		"lat": 47.366093,
		"lng": -96.854581
	},
	{
		"lat": 47.366063,
		"lng": -96.854947
	},
	{
		"lat": 47.366063,
		"lng": -96.855157
	},
	{
		"lat": 47.36607,
		"lng": -96.85542
	},
	{
		"lat": 47.366134,
		"lng": -96.856203
	},
	{
		"lat": 47.366175,
		"lng": -96.856512
	},
	{
		"lat": 47.366203,
		"lng": -96.856665
	},
	{
		"lat": 47.36624,
		"lng": -96.856813
	},
	{
		"lat": 47.366256,
		"lng": -96.85686
	},
	{
		"lat": 47.36634,
		"lng": -96.857031
	},
	{
		"lat": 47.366552,
		"lng": -96.85739
	},
	{
		"lat": 47.366653,
		"lng": -96.857541
	},
	{
		"lat": 47.366844,
		"lng": -96.857781
	},
	{
		"lat": 47.366934,
		"lng": -96.85787
	},
	{
		"lat": 47.36705,
		"lng": -96.857995
	},
	{
		"lat": 47.367111,
		"lng": -96.858051
	},
	{
		"lat": 47.367144,
		"lng": -96.858072
	},
	{
		"lat": 47.367316,
		"lng": -96.858152
	},
	{
		"lat": 47.36753,
		"lng": -96.858206
	},
	{
		"lat": 47.367602,
		"lng": -96.858211
	},
	{
		"lat": 47.36771,
		"lng": -96.858198
	},
	{
		"lat": 47.367745,
		"lng": -96.858185
	},
	{
		"lat": 47.3678,
		"lng": -96.858174
	},
	{
		"lat": 47.367884,
		"lng": -96.858146
	},
	{
		"lat": 47.367926,
		"lng": -96.858132
	},
	{
		"lat": 47.367998,
		"lng": -96.858119
	},
	{
		"lat": 47.368076,
		"lng": -96.858085
	},
	{
		"lat": 47.368125,
		"lng": -96.858064
	},
	{
		"lat": 47.36824,
		"lng": -96.858014
	},
	{
		"lat": 47.368338,
		"lng": -96.857946
	},
	{
		"lat": 47.368488,
		"lng": -96.857799
	},
	{
		"lat": 47.368549,
		"lng": -96.857745
	},
	{
		"lat": 47.368691,
		"lng": -96.857582
	},
	{
		"lat": 47.368874,
		"lng": -96.857327
	},
	{
		"lat": 47.368969,
		"lng": -96.85717
	},
	{
		"lat": 47.369039,
		"lng": -96.856985
	},
	{
		"lat": 47.369085,
		"lng": -96.856843
	},
	{
		"lat": 47.369136,
		"lng": -96.856703
	},
	{
		"lat": 47.369164,
		"lng": -96.856607
	},
	{
		"lat": 47.369216,
		"lng": -96.856469
	},
	{
		"lat": 47.369264,
		"lng": -96.856215
	},
	{
		"lat": 47.369321,
		"lng": -96.855966
	},
	{
		"lat": 47.369423,
		"lng": -96.855572
	},
	{
		"lat": 47.369475,
		"lng": -96.855321
	},
	{
		"lat": 47.369574,
		"lng": -96.854707
	},
	{
		"lat": 47.369606,
		"lng": -96.854448
	},
	{
		"lat": 47.369652,
		"lng": -96.85398
	},
	{
		"lat": 47.369701,
		"lng": -96.853353
	},
	{
		"lat": 47.369728,
		"lng": -96.852829
	},
	{
		"lat": 47.369739,
		"lng": -96.852461
	},
	{
		"lat": 47.369739,
		"lng": -96.852304
	},
	{
		"lat": 47.369712,
		"lng": -96.851621
	},
	{
		"lat": 47.3697,
		"lng": -96.851465
	},
	{
		"lat": 47.369688,
		"lng": -96.851361
	},
	{
		"lat": 47.369578,
		"lng": -96.850642
	},
	{
		"lat": 47.369566,
		"lng": -96.850593
	},
	{
		"lat": 47.369521,
		"lng": -96.850449
	},
	{
		"lat": 47.369434,
		"lng": -96.850103
	},
	{
		"lat": 47.369369,
		"lng": -96.849888
	},
	{
		"lat": 47.36933,
		"lng": -96.849741
	},
	{
		"lat": 47.369233,
		"lng": -96.84946
	},
	{
		"lat": 47.369087,
		"lng": -96.849098
	},
	{
		"lat": 47.368938,
		"lng": -96.8488
	},
	{
		"lat": 47.368761,
		"lng": -96.848403
	},
	{
		"lat": 47.368635,
		"lng": -96.848085
	},
	{
		"lat": 47.368573,
		"lng": -96.847895
	},
	{
		"lat": 47.368518,
		"lng": -96.847645
	},
	{
		"lat": 47.368438,
		"lng": -96.847186
	},
	{
		"lat": 47.368387,
		"lng": -96.846826
	},
	{
		"lat": 47.368253,
		"lng": -96.846116
	},
	{
		"lat": 47.368211,
		"lng": -96.845915
	},
	{
		"lat": 47.368175,
		"lng": -96.845767
	},
	{
		"lat": 47.368118,
		"lng": -96.845573
	},
	{
		"lat": 47.368039,
		"lng": -96.845006
	},
	{
		"lat": 47.368008,
		"lng": -96.844748
	},
	{
		"lat": 47.367993,
		"lng": -96.844591
	},
	{
		"lat": 47.367989,
		"lng": -96.844434
	},
	{
		"lat": 47.367996,
		"lng": -96.844277
	},
	{
		"lat": 47.368014,
		"lng": -96.844121
	},
	{
		"lat": 47.368021,
		"lng": -96.844016
	},
	{
		"lat": 47.368098,
		"lng": -96.843666
	},
	{
		"lat": 47.368169,
		"lng": -96.843369
	},
	{
		"lat": 47.368275,
		"lng": -96.843094
	},
	{
		"lat": 47.368393,
		"lng": -96.842829
	},
	{
		"lat": 47.368485,
		"lng": -96.842666
	},
	{
		"lat": 47.36855,
		"lng": -96.842541
	},
	{
		"lat": 47.368918,
		"lng": -96.841961
	},
	{
		"lat": 47.369218,
		"lng": -96.841504
	},
	{
		"lat": 47.369308,
		"lng": -96.84134
	},
	{
		"lat": 47.369495,
		"lng": -96.84102
	},
	{
		"lat": 47.369704,
		"lng": -96.840591
	},
	{
		"lat": 47.369851,
		"lng": -96.84023
	},
	{
		"lat": 47.369921,
		"lng": -96.840046
	},
	{
		"lat": 47.369999,
		"lng": -96.839809
	},
	{
		"lat": 47.370034,
		"lng": -96.839717
	},
	{
		"lat": 47.370058,
		"lng": -96.839618
	},
	{
		"lat": 47.370124,
		"lng": -96.839431
	},
	{
		"lat": 47.370147,
		"lng": -96.839332
	},
	{
		"lat": 47.370224,
		"lng": -96.839094
	},
	{
		"lat": 47.37037,
		"lng": -96.838671
	},
	{
		"lat": 47.37061,
		"lng": -96.838145
	},
	{
		"lat": 47.370664,
		"lng": -96.838009
	},
	{
		"lat": 47.370686,
		"lng": -96.837967
	},
	{
		"lat": 47.370808,
		"lng": -96.837773
	},
	{
		"lat": 47.371021,
		"lng": -96.837489
	},
	{
		"lat": 47.371291,
		"lng": -96.837141
	},
	{
		"lat": 47.371322,
		"lng": -96.837112
	},
	{
		"lat": 47.371363,
		"lng": -96.837092
	},
	{
		"lat": 47.371424,
		"lng": -96.837037
	},
	{
		"lat": 47.371458,
		"lng": -96.837018
	},
	{
		"lat": 47.371669,
		"lng": -96.836948
	},
	{
		"lat": 47.371771,
		"lng": -96.836892
	},
	{
		"lat": 47.371959,
		"lng": -96.836735
	},
	{
		"lat": 47.372028,
		"lng": -96.836706
	},
	{
		"lat": 47.372244,
		"lng": -96.836673
	},
	{
		"lat": 47.372316,
		"lng": -96.836667
	},
	{
		"lat": 47.372605,
		"lng": -96.836691
	},
	{
		"lat": 47.37264,
		"lng": -96.836699
	},
	{
		"lat": 47.372742,
		"lng": -96.836752
	},
	{
		"lat": 47.372775,
		"lng": -96.836775
	},
	{
		"lat": 47.372867,
		"lng": -96.836857
	},
	{
		"lat": 47.372924,
		"lng": -96.836922
	},
	{
		"lat": 47.372978,
		"lng": -96.836992
	},
	{
		"lat": 47.373129,
		"lng": -96.837218
	},
	{
		"lat": 47.373216,
		"lng": -96.837385
	},
	{
		"lat": 47.373274,
		"lng": -96.837519
	},
	{
		"lat": 47.37338,
		"lng": -96.837853
	},
	{
		"lat": 47.37341,
		"lng": -96.838004
	},
	{
		"lat": 47.373438,
		"lng": -96.838101
	},
	{
		"lat": 47.373497,
		"lng": -96.838404
	},
	{
		"lat": 47.373527,
		"lng": -96.83877
	},
	{
		"lat": 47.373547,
		"lng": -96.839137
	},
	{
		"lat": 47.373552,
		"lng": -96.839294
	},
	{
		"lat": 47.373532,
		"lng": -96.839661
	},
	{
		"lat": 47.373516,
		"lng": -96.839817
	},
	{
		"lat": 47.373495,
		"lng": -96.839972
	},
	{
		"lat": 47.373443,
		"lng": -96.840224
	},
	{
		"lat": 47.373343,
		"lng": -96.840619
	},
	{
		"lat": 47.3733,
		"lng": -96.840763
	},
	{
		"lat": 47.373216,
		"lng": -96.841111
	},
	{
		"lat": 47.373201,
		"lng": -96.841159
	},
	{
		"lat": 47.373144,
		"lng": -96.841292
	},
	{
		"lat": 47.373073,
		"lng": -96.841475
	},
	{
		"lat": 47.372932,
		"lng": -96.84178
	},
	{
		"lat": 47.372822,
		"lng": -96.841988
	},
	{
		"lat": 47.37263,
		"lng": -96.842303
	},
	{
		"lat": 47.372403,
		"lng": -96.842642
	},
	{
		"lat": 47.372298,
		"lng": -96.842786
	},
	{
		"lat": 47.372134,
		"lng": -96.842992
	},
	{
		"lat": 47.37176,
		"lng": -96.843406
	},
	{
		"lat": 47.371622,
		"lng": -96.843576
	},
	{
		"lat": 47.371338,
		"lng": -96.843901
	},
	{
		"lat": 47.371255,
		"lng": -96.844003
	},
	{
		"lat": 47.371042,
		"lng": -96.844287
	},
	{
		"lat": 47.370865,
		"lng": -96.84455
	},
	{
		"lat": 47.370701,
		"lng": -96.844831
	},
	{
		"lat": 47.370658,
		"lng": -96.844915
	},
	{
		"lat": 47.370601,
		"lng": -96.845049
	},
	{
		"lat": 47.370442,
		"lng": -96.845578
	},
	{
		"lat": 47.370348,
		"lng": -96.845976
	},
	{
		"lat": 47.370318,
		"lng": -96.846128
	},
	{
		"lat": 47.370294,
		"lng": -96.846281
	},
	{
		"lat": 47.370278,
		"lng": -96.84649
	},
	{
		"lat": 47.370265,
		"lng": -96.847016
	},
	{
		"lat": 47.37027,
		"lng": -96.847121
	},
	{
		"lat": 47.370288,
		"lng": -96.847276
	},
	{
		"lat": 47.370303,
		"lng": -96.84734
	},
	{
		"lat": 47.37039,
		"lng": -96.847904
	},
	{
		"lat": 47.370412,
		"lng": -96.848004
	},
	{
		"lat": 47.370433,
		"lng": -96.848158
	},
	{
		"lat": 47.370453,
		"lng": -96.848259
	},
	{
		"lat": 47.370463,
		"lng": -96.848364
	},
	{
		"lat": 47.370519,
		"lng": -96.848613
	},
	{
		"lat": 47.370563,
		"lng": -96.848758
	},
	{
		"lat": 47.370589,
		"lng": -96.848911
	},
	{
		"lat": 47.370621,
		"lng": -96.849062
	},
	{
		"lat": 47.370719,
		"lng": -96.849457
	},
	{
		"lat": 47.370776,
		"lng": -96.849651
	},
	{
		"lat": 47.37093,
		"lng": -96.850126
	},
	{
		"lat": 47.370951,
		"lng": -96.850169
	},
	{
		"lat": 47.370986,
		"lng": -96.85026
	},
	{
		"lat": 47.371065,
		"lng": -96.850436
	},
	{
		"lat": 47.371138,
		"lng": -96.850617
	},
	{
		"lat": 47.371203,
		"lng": -96.850744
	},
	{
		"lat": 47.371641,
		"lng": -96.851444
	},
	{
		"lat": 47.371687,
		"lng": -96.851526
	},
	{
		"lat": 47.371818,
		"lng": -96.851841
	},
	{
		"lat": 47.371962,
		"lng": -96.852143
	},
	{
		"lat": 47.372018,
		"lng": -96.852278
	},
	{
		"lat": 47.372137,
		"lng": -96.852542
	},
	{
		"lat": 47.372227,
		"lng": -96.85277
	},
	{
		"lat": 47.372295,
		"lng": -96.853014
	},
	{
		"lat": 47.372355,
		"lng": -96.853205
	},
	{
		"lat": 47.372381,
		"lng": -96.853303
	},
	{
		"lat": 47.372463,
		"lng": -96.853537
	},
	{
		"lat": 47.372517,
		"lng": -96.853672
	},
	{
		"lat": 47.37255,
		"lng": -96.853822
	},
	{
		"lat": 47.372583,
		"lng": -96.853916
	},
	{
		"lat": 47.372605,
		"lng": -96.853958
	},
	{
		"lat": 47.372705,
		"lng": -96.85411
	},
	{
		"lat": 47.372814,
		"lng": -96.854248
	},
	{
		"lat": 47.372872,
		"lng": -96.85431
	},
	{
		"lat": 47.372903,
		"lng": -96.854337
	},
	{
		"lat": 47.372968,
		"lng": -96.854382
	},
	{
		"lat": 47.373209,
		"lng": -96.854493
	},
	{
		"lat": 47.373315,
		"lng": -96.85453
	},
	{
		"lat": 47.37378,
		"lng": -96.854622
	},
	{
		"lat": 47.373997,
		"lng": -96.854623
	},
	{
		"lat": 47.374069,
		"lng": -96.854617
	},
	{
		"lat": 47.374105,
		"lng": -96.854609
	},
	{
		"lat": 47.374173,
		"lng": -96.854572
	},
	{
		"lat": 47.374237,
		"lng": -96.854523
	},
	{
		"lat": 47.374387,
		"lng": -96.854377
	},
	{
		"lat": 47.374443,
		"lng": -96.85431
	},
	{
		"lat": 47.374597,
		"lng": -96.854088
	},
	{
		"lat": 47.374645,
		"lng": -96.85401
	},
	{
		"lat": 47.374687,
		"lng": -96.853924
	},
	{
		"lat": 47.374842,
		"lng": -96.853509
	},
	{
		"lat": 47.37493,
		"lng": -96.853221
	},
	{
		"lat": 47.374938,
		"lng": -96.85317
	},
	{
		"lat": 47.375009,
		"lng": -96.852871
	},
	{
		"lat": 47.375023,
		"lng": -96.852698
	},
	{
		"lat": 47.375026,
		"lng": -96.852662
	},
	{
		"lat": 47.375034,
		"lng": -96.852453
	},
	{
		"lat": 47.375048,
		"lng": -96.852243
	},
	{
		"lat": 47.37505,
		"lng": -96.852138
	},
	{
		"lat": 47.375044,
		"lng": -96.85185
	},
	{
		"lat": 47.37504,
		"lng": -96.851665
	},
	{
		"lat": 47.375043,
		"lng": -96.851507
	},
	{
		"lat": 47.375051,
		"lng": -96.851403
	},
	{
		"lat": 47.37509,
		"lng": -96.851146
	},
	{
		"lat": 47.375103,
		"lng": -96.850937
	},
	{
		"lat": 47.3751,
		"lng": -96.850524
	},
	{
		"lat": 47.375099,
		"lng": -96.850358
	},
	{
		"lat": 47.375087,
		"lng": -96.850254
	},
	{
		"lat": 47.375057,
		"lng": -96.850102
	},
	{
		"lat": 47.374979,
		"lng": -96.849643
	},
	{
		"lat": 47.374907,
		"lng": -96.849127
	},
	{
		"lat": 47.37482,
		"lng": -96.848617
	},
	{
		"lat": 47.374805,
		"lng": -96.84856
	},
	{
		"lat": 47.374756,
		"lng": -96.848308
	},
	{
		"lat": 47.374749,
		"lng": -96.848203
	},
	{
		"lat": 47.374745,
		"lng": -96.848045
	},
	{
		"lat": 47.374739,
		"lng": -96.847046
	},
	{
		"lat": 47.374729,
		"lng": -96.846625
	},
	{
		"lat": 47.374742,
		"lng": -96.8461
	},
	{
		"lat": 47.374754,
		"lng": -96.845943
	},
	{
		"lat": 47.374785,
		"lng": -96.845792
	},
	{
		"lat": 47.374801,
		"lng": -96.845745
	},
	{
		"lat": 47.374836,
		"lng": -96.845596
	},
	{
		"lat": 47.374853,
		"lng": -96.845549
	},
	{
		"lat": 47.37492,
		"lng": -96.845305
	},
	{
		"lat": 47.374952,
		"lng": -96.845211
	},
	{
		"lat": 47.374973,
		"lng": -96.84511
	},
	{
		"lat": 47.375001,
		"lng": -96.845013
	},
	{
		"lat": 47.375172,
		"lng": -96.844611
	},
	{
		"lat": 47.375203,
		"lng": -96.844517
	},
	{
		"lat": 47.375248,
		"lng": -96.844434
	},
	{
		"lat": 47.375285,
		"lng": -96.844344
	},
	{
		"lat": 47.375355,
		"lng": -96.844223
	},
	{
		"lat": 47.375556,
		"lng": -96.843921
	},
	{
		"lat": 47.375639,
		"lng": -96.843819
	},
	{
		"lat": 47.375697,
		"lng": -96.843757
	},
	{
		"lat": 47.375751,
		"lng": -96.843688
	},
	{
		"lat": 47.375839,
		"lng": -96.843595
	},
	{
		"lat": 47.375902,
		"lng": -96.843544
	},
	{
		"lat": 47.376035,
		"lng": -96.843462
	},
	{
		"lat": 47.376104,
		"lng": -96.843429
	},
	{
		"lat": 47.376136,
		"lng": -96.843406
	},
	{
		"lat": 47.37624,
		"lng": -96.843357
	},
	{
		"lat": 47.376344,
		"lng": -96.843316
	},
	{
		"lat": 47.376451,
		"lng": -96.843289
	},
	{
		"lat": 47.376704,
		"lng": -96.843274
	},
	{
		"lat": 47.376885,
		"lng": -96.843283
	},
	{
		"lat": 47.376991,
		"lng": -96.843313
	},
	{
		"lat": 47.377059,
		"lng": -96.843348
	},
	{
		"lat": 47.377225,
		"lng": -96.843452
	},
	{
		"lat": 47.377415,
		"lng": -96.843605
	},
	{
		"lat": 47.377713,
		"lng": -96.843904
	},
	{
		"lat": 47.377799,
		"lng": -96.843999
	},
	{
		"lat": 47.37793,
		"lng": -96.844179
	},
	{
		"lat": 47.378079,
		"lng": -96.844409
	},
	{
		"lat": 47.378271,
		"lng": -96.844724
	},
	{
		"lat": 47.378417,
		"lng": -96.845025
	},
	{
		"lat": 47.378593,
		"lng": -96.845423
	},
	{
		"lat": 47.378813,
		"lng": -96.845966
	},
	{
		"lat": 47.379088,
		"lng": -96.846706
	},
	{
		"lat": 47.379116,
		"lng": -96.846803
	},
	{
		"lat": 47.379165,
		"lng": -96.846944
	},
	{
		"lat": 47.379202,
		"lng": -96.847034
	},
	{
		"lat": 47.379293,
		"lng": -96.84732
	},
	{
		"lat": 47.379435,
		"lng": -96.847745
	},
	{
		"lat": 47.37946,
		"lng": -96.847844
	},
	{
		"lat": 47.379598,
		"lng": -96.848272
	},
	{
		"lat": 47.379763,
		"lng": -96.84868
	},
	{
		"lat": 47.37987,
		"lng": -96.848892
	},
	{
		"lat": 47.380047,
		"lng": -96.849155
	},
	{
		"lat": 47.380126,
		"lng": -96.849264
	},
	{
		"lat": 47.380183,
		"lng": -96.849328
	},
	{
		"lat": 47.380273,
		"lng": -96.849415
	},
	{
		"lat": 47.380367,
		"lng": -96.849495
	},
	{
		"lat": 47.380422,
		"lng": -96.849562
	},
	{
		"lat": 47.380476,
		"lng": -96.849603
	},
	{
		"lat": 47.380625,
		"lng": -96.849752
	},
	{
		"lat": 47.380748,
		"lng": -96.849862
	},
	{
		"lat": 47.380938,
		"lng": -96.850015
	},
	{
		"lat": 47.381038,
		"lng": -96.850075
	},
	{
		"lat": 47.381107,
		"lng": -96.850107
	},
	{
		"lat": 47.381215,
		"lng": -96.85012
	},
	{
		"lat": 47.381287,
		"lng": -96.85012
	},
	{
		"lat": 47.381503,
		"lng": -96.850081
	},
	{
		"lat": 47.381608,
		"lng": -96.850046
	},
	{
		"lat": 47.38171,
		"lng": -96.849993
	},
	{
		"lat": 47.381843,
		"lng": -96.849908
	},
	{
		"lat": 47.381969,
		"lng": -96.849806
	},
	{
		"lat": 47.382165,
		"lng": -96.849575
	},
	{
		"lat": 47.382345,
		"lng": -96.849317
	},
	{
		"lat": 47.382418,
		"lng": -96.8492
	},
	{
		"lat": 47.382521,
		"lng": -96.848983
	},
	{
		"lat": 47.382589,
		"lng": -96.848799
	},
	{
		"lat": 47.38265,
		"lng": -96.848565
	},
	{
		"lat": 47.382666,
		"lng": -96.848504
	},
	{
		"lat": 47.382701,
		"lng": -96.848354
	},
	{
		"lat": 47.382724,
		"lng": -96.8482
	},
	{
		"lat": 47.382743,
		"lng": -96.847992
	},
	{
		"lat": 47.382747,
		"lng": -96.847875
	},
	{
		"lat": 47.382751,
		"lng": -96.847729
	},
	{
		"lat": 47.382736,
		"lng": -96.847414
	},
	{
		"lat": 47.382699,
		"lng": -96.847157
	},
	{
		"lat": 47.38266,
		"lng": -96.847011
	},
	{
		"lat": 47.382625,
		"lng": -96.846861
	},
	{
		"lat": 47.38261,
		"lng": -96.846814
	},
	{
		"lat": 47.382573,
		"lng": -96.846724
	},
	{
		"lat": 47.382546,
		"lng": -96.846626
	},
	{
		"lat": 47.382493,
		"lng": -96.846488
	},
	{
		"lat": 47.382429,
		"lng": -96.846361
	},
	{
		"lat": 47.382293,
		"lng": -96.846051
	},
	{
		"lat": 47.382203,
		"lng": -96.845887
	},
	{
		"lat": 47.382058,
		"lng": -96.845653
	},
	{
		"lat": 47.381552,
		"lng": -96.844901
	},
	{
		"lat": 47.381405,
		"lng": -96.844669
	},
	{
		"lat": 47.381286,
		"lng": -96.844471
	},
	{
		"lat": 47.381195,
		"lng": -96.844308
	},
	{
		"lat": 47.38114,
		"lng": -96.844172
	},
	{
		"lat": 47.381072,
		"lng": -96.843987
	},
	{
		"lat": 47.380999,
		"lng": -96.843747
	},
	{
		"lat": 47.380949,
		"lng": -96.843607
	},
	{
		"lat": 47.38091,
		"lng": -96.84346
	},
	{
		"lat": 47.380893,
		"lng": -96.843413
	},
	{
		"lat": 47.380836,
		"lng": -96.84322
	},
	{
		"lat": 47.380747,
		"lng": -96.84282
	},
	{
		"lat": 47.380729,
		"lng": -96.842718
	},
	{
		"lat": 47.380693,
		"lng": -96.842407
	},
	{
		"lat": 47.380681,
		"lng": -96.841881
	},
	{
		"lat": 47.380685,
		"lng": -96.841408
	},
	{
		"lat": 47.380694,
		"lng": -96.841198
	},
	{
		"lat": 47.380702,
		"lng": -96.841094
	},
	{
		"lat": 47.380765,
		"lng": -96.840523
	},
	{
		"lat": 47.38078,
		"lng": -96.84042
	},
	{
		"lat": 47.380836,
		"lng": -96.840115
	},
	{
		"lat": 47.380875,
		"lng": -96.839969
	},
	{
		"lat": 47.380933,
		"lng": -96.839776
	},
	{
		"lat": 47.381082,
		"lng": -96.839415
	},
	{
		"lat": 47.381165,
		"lng": -96.839244
	},
	{
		"lat": 47.381396,
		"lng": -96.838911
	},
	{
		"lat": 47.381502,
		"lng": -96.838767
	},
	{
		"lat": 47.381666,
		"lng": -96.838561
	},
	{
		"lat": 47.381723,
		"lng": -96.838497
	},
	{
		"lat": 47.381813,
		"lng": -96.838409
	},
	{
		"lat": 47.381845,
		"lng": -96.838384
	},
	{
		"lat": 47.381879,
		"lng": -96.838366
	},
	{
		"lat": 47.382141,
		"lng": -96.83819
	},
	{
		"lat": 47.382209,
		"lng": -96.838154
	},
	{
		"lat": 47.382384,
		"lng": -96.838085
	},
	{
		"lat": 47.382487,
		"lng": -96.838038
	},
	{
		"lat": 47.382593,
		"lng": -96.838
	},
	{
		"lat": 47.382694,
		"lng": -96.837977
	},
	{
		"lat": 47.38273,
		"lng": -96.837974
	},
	{
		"lat": 47.382911,
		"lng": -96.837988
	},
	{
		"lat": 47.383018,
		"lng": -96.838011
	},
	{
		"lat": 47.383156,
		"lng": -96.838071
	},
	{
		"lat": 47.383222,
		"lng": -96.838115
	},
	{
		"lat": 47.38329,
		"lng": -96.838149
	},
	{
		"lat": 47.383491,
		"lng": -96.838268
	},
	{
		"lat": 47.383717,
		"lng": -96.838435
	},
	{
		"lat": 47.383935,
		"lng": -96.838621
	},
	{
		"lat": 47.384083,
		"lng": -96.838771
	},
	{
		"lat": 47.384225,
		"lng": -96.838934
	},
	{
		"lat": 47.384395,
		"lng": -96.839207
	},
	{
		"lat": 47.384489,
		"lng": -96.839367
	},
	{
		"lat": 47.38468,
		"lng": -96.839749
	},
	{
		"lat": 47.38478,
		"lng": -96.839968
	},
	{
		"lat": 47.384856,
		"lng": -96.840147
	},
	{
		"lat": 47.385056,
		"lng": -96.840646
	},
	{
		"lat": 47.385176,
		"lng": -96.840909
	},
	{
		"lat": 47.385352,
		"lng": -96.841243
	},
	{
		"lat": 47.385654,
		"lng": -96.841767
	},
	{
		"lat": 47.385755,
		"lng": -96.841917
	},
	{
		"lat": 47.385894,
		"lng": -96.842087
	},
	{
		"lat": 47.385924,
		"lng": -96.842114
	},
	{
		"lat": 47.38599,
		"lng": -96.842159
	},
	{
		"lat": 47.386025,
		"lng": -96.842171
	},
	{
		"lat": 47.386169,
		"lng": -96.84217
	},
	{
		"lat": 47.386348,
		"lng": -96.842126
	},
	{
		"lat": 47.386525,
		"lng": -96.842074
	},
	{
		"lat": 47.386699,
		"lng": -96.842006
	},
	{
		"lat": 47.3868,
		"lng": -96.841949
	},
	{
		"lat": 47.386831,
		"lng": -96.841923
	},
	{
		"lat": 47.38692,
		"lng": -96.841832
	},
	{
		"lat": 47.387002,
		"lng": -96.841729
	},
	{
		"lat": 47.387103,
		"lng": -96.841579
	},
	{
		"lat": 47.387222,
		"lng": -96.84138
	},
	{
		"lat": 47.387379,
		"lng": -96.841027
	},
	{
		"lat": 47.387432,
		"lng": -96.84089
	},
	{
		"lat": 47.387526,
		"lng": -96.840606
	},
	{
		"lat": 47.387594,
		"lng": -96.840362
	},
	{
		"lat": 47.387617,
		"lng": -96.840263
	},
	{
		"lat": 47.387632,
		"lng": -96.840215
	},
	{
		"lat": 47.38768,
		"lng": -96.840017
	},
	{
		"lat": 47.38775,
		"lng": -96.839609
	},
	{
		"lat": 47.387762,
		"lng": -96.83956
	},
	{
		"lat": 47.387777,
		"lng": -96.839457
	},
	{
		"lat": 47.387849,
		"lng": -96.83916
	},
	{
		"lat": 47.387866,
		"lng": -96.839114
	},
	{
		"lat": 47.387917,
		"lng": -96.838917
	},
	{
		"lat": 47.387946,
		"lng": -96.838821
	},
	{
		"lat": 47.387969,
		"lng": -96.838721
	},
	{
		"lat": 47.387987,
		"lng": -96.838675
	},
	{
		"lat": 47.388031,
		"lng": -96.838531
	},
	{
		"lat": 47.388117,
		"lng": -96.8383
	},
	{
		"lat": 47.38818,
		"lng": -96.838172
	},
	{
		"lat": 47.388365,
		"lng": -96.837921
	},
	{
		"lat": 47.388395,
		"lng": -96.837892
	},
	{
		"lat": 47.388428,
		"lng": -96.83787
	},
	{
		"lat": 47.388488,
		"lng": -96.837812
	},
	{
		"lat": 47.388716,
		"lng": -96.837653
	},
	{
		"lat": 47.389025,
		"lng": -96.837503
	},
	{
		"lat": 47.389095,
		"lng": -96.837477
	},
	{
		"lat": 47.389274,
		"lng": -96.837444
	},
	{
		"lat": 47.389527,
		"lng": -96.837465
	},
	{
		"lat": 47.389563,
		"lng": -96.837472
	},
	{
		"lat": 47.389633,
		"lng": -96.837496
	},
	{
		"lat": 47.389771,
		"lng": -96.837561
	},
	{
		"lat": 47.389941,
		"lng": -96.837651
	},
	{
		"lat": 47.390006,
		"lng": -96.837695
	},
	{
		"lat": 47.390141,
		"lng": -96.837773
	},
	{
		"lat": 47.390339,
		"lng": -96.837899
	},
	{
		"lat": 47.3906,
		"lng": -96.838081
	},
	{
		"lat": 47.390724,
		"lng": -96.838189
	},
	{
		"lat": 47.390991,
		"lng": -96.838458
	},
	{
		"lat": 47.39118,
		"lng": -96.838614
	},
	{
		"lat": 47.391209,
		"lng": -96.838645
	},
	{
		"lat": 47.391303,
		"lng": -96.838725
	},
	{
		"lat": 47.391368,
		"lng": -96.83877
	},
	{
		"lat": 47.391493,
		"lng": -96.838876
	},
	{
		"lat": 47.39178,
		"lng": -96.839098
	},
	{
		"lat": 47.391974,
		"lng": -96.839234
	},
	{
		"lat": 47.39211,
		"lng": -96.839306
	},
	{
		"lat": 47.392393,
		"lng": -96.839441
	},
	{
		"lat": 47.392496,
		"lng": -96.83951
	},
	{
		"lat": 47.39259,
		"lng": -96.839573
	},
	{
		"lat": 47.392652,
		"lng": -96.839626
	},
	{
		"lat": 47.392769,
		"lng": -96.839751
	},
	{
		"lat": 47.392889,
		"lng": -96.839869
	},
	{
		"lat": 47.392999,
		"lng": -96.840004
	},
	{
		"lat": 47.393098,
		"lng": -96.840157
	},
	{
		"lat": 47.393193,
		"lng": -96.840316
	},
	{
		"lat": 47.393214,
		"lng": -96.840359
	},
	{
		"lat": 47.393249,
		"lng": -96.840451
	},
	{
		"lat": 47.393278,
		"lng": -96.840547
	},
	{
		"lat": 47.393311,
		"lng": -96.840698
	},
	{
		"lat": 47.39332,
		"lng": -96.840802
	},
	{
		"lat": 47.393318,
		"lng": -96.840907
	},
	{
		"lat": 47.393312,
		"lng": -96.840959
	},
	{
		"lat": 47.39329,
		"lng": -96.841059
	},
	{
		"lat": 47.393249,
		"lng": -96.841205
	},
	{
		"lat": 47.393168,
		"lng": -96.841378
	},
	{
		"lat": 47.393068,
		"lng": -96.84153
	},
	{
		"lat": 47.393015,
		"lng": -96.841602
	},
	{
		"lat": 47.392741,
		"lng": -96.841944
	},
	{
		"lat": 47.392663,
		"lng": -96.842052
	},
	{
		"lat": 47.392613,
		"lng": -96.842129
	},
	{
		"lat": 47.392501,
		"lng": -96.842335
	},
	{
		"lat": 47.392362,
		"lng": -96.842642
	},
	{
		"lat": 47.392345,
		"lng": -96.842689
	},
	{
		"lat": 47.392319,
		"lng": -96.842787
	},
	{
		"lat": 47.392281,
		"lng": -96.842876
	},
	{
		"lat": 47.392226,
		"lng": -96.84307
	},
	{
		"lat": 47.392169,
		"lng": -96.843375
	},
	{
		"lat": 47.392163,
		"lng": -96.843427
	},
	{
		"lat": 47.392143,
		"lng": -96.843793
	},
	{
		"lat": 47.392145,
		"lng": -96.844003
	},
	{
		"lat": 47.39216,
		"lng": -96.844318
	},
	{
		"lat": 47.392175,
		"lng": -96.844527
	},
	{
		"lat": 47.392203,
		"lng": -96.844733
	},
	{
		"lat": 47.39223,
		"lng": -96.844885
	},
	{
		"lat": 47.392281,
		"lng": -96.845082
	},
	{
		"lat": 47.39232,
		"lng": -96.845284
	},
	{
		"lat": 47.392512,
		"lng": -96.846077
	},
	{
		"lat": 47.392544,
		"lng": -96.846171
	},
	{
		"lat": 47.39259,
		"lng": -96.84637
	},
	{
		"lat": 47.392671,
		"lng": -96.846662
	},
	{
		"lat": 47.392703,
		"lng": -96.846756
	},
	{
		"lat": 47.39273,
		"lng": -96.846853
	},
	{
		"lat": 47.392853,
		"lng": -96.847176
	},
	{
		"lat": 47.392996,
		"lng": -96.847654
	},
	{
		"lat": 47.393241,
		"lng": -96.848313
	},
	{
		"lat": 47.393425,
		"lng": -96.848755
	},
	{
		"lat": 47.393531,
		"lng": -96.848896
	},
	{
		"lat": 47.393622,
		"lng": -96.848981
	},
	{
		"lat": 47.39375,
		"lng": -96.849079
	},
	{
		"lat": 47.393784,
		"lng": -96.849098
	},
	{
		"lat": 47.393889,
		"lng": -96.849133
	},
	{
		"lat": 47.393962,
		"lng": -96.849133
	},
	{
		"lat": 47.393998,
		"lng": -96.849128
	},
	{
		"lat": 47.394471,
		"lng": -96.848925
	},
	{
		"lat": 47.394789,
		"lng": -96.848824
	},
	{
		"lat": 47.394959,
		"lng": -96.848733
	},
	{
		"lat": 47.395123,
		"lng": -96.848625
	},
	{
		"lat": 47.395397,
		"lng": -96.84837
	},
	{
		"lat": 47.395455,
		"lng": -96.848307
	},
	{
		"lat": 47.395659,
		"lng": -96.848011
	},
	{
		"lat": 47.395745,
		"lng": -96.847841
	},
	{
		"lat": 47.395799,
		"lng": -96.847705
	},
	{
		"lat": 47.395918,
		"lng": -96.847381
	},
	{
		"lat": 47.396049,
		"lng": -96.847006
	},
	{
		"lat": 47.396131,
		"lng": -96.846714
	},
	{
		"lat": 47.39623,
		"lng": -96.84632
	},
	{
		"lat": 47.396284,
		"lng": -96.84596
	},
	{
		"lat": 47.396329,
		"lng": -96.845545
	},
	{
		"lat": 47.396364,
		"lng": -96.845127
	},
	{
		"lat": 47.396382,
		"lng": -96.844971
	},
	{
		"lat": 47.396423,
		"lng": -96.844502
	},
	{
		"lat": 47.39644,
		"lng": -96.844346
	},
	{
		"lat": 47.3965,
		"lng": -96.843882
	},
	{
		"lat": 47.396537,
		"lng": -96.843679
	},
	{
		"lat": 47.396579,
		"lng": -96.843534
	},
	{
		"lat": 47.396602,
		"lng": -96.843435
	},
	{
		"lat": 47.396649,
		"lng": -96.843293
	},
	{
		"lat": 47.396751,
		"lng": -96.843016
	},
	{
		"lat": 47.396961,
		"lng": -96.842526
	},
	{
		"lat": 47.397047,
		"lng": -96.842358
	},
	{
		"lat": 47.397189,
		"lng": -96.842119
	},
	{
		"lat": 47.397232,
		"lng": -96.842034
	},
	{
		"lat": 47.397377,
		"lng": -96.841799
	},
	{
		"lat": 47.397421,
		"lng": -96.841716
	},
	{
		"lat": 47.397529,
		"lng": -96.841442
	},
	{
		"lat": 47.397559,
		"lng": -96.841347
	},
	{
		"lat": 47.397617,
		"lng": -96.841214
	},
	{
		"lat": 47.397742,
		"lng": -96.840894
	},
	{
		"lat": 47.397821,
		"lng": -96.840718
	},
	{
		"lat": 47.397913,
		"lng": -96.840491
	},
	{
		"lat": 47.397976,
		"lng": -96.840363
	},
	{
		"lat": 47.398054,
		"lng": -96.840186
	},
	{
		"lat": 47.398246,
		"lng": -96.839871
	},
	{
		"lat": 47.398347,
		"lng": -96.839722
	},
	{
		"lat": 47.398534,
		"lng": -96.839474
	},
	{
		"lat": 47.398748,
		"lng": -96.83928
	},
	{
		"lat": 47.398849,
		"lng": -96.839221
	},
	{
		"lat": 47.398881,
		"lng": -96.839197
	},
	{
		"lat": 47.398985,
		"lng": -96.839153
	},
	{
		"lat": 47.399091,
		"lng": -96.839119
	},
	{
		"lat": 47.399127,
		"lng": -96.839113
	},
	{
		"lat": 47.399199,
		"lng": -96.839114
	},
	{
		"lat": 47.399379,
		"lng": -96.839133
	},
	{
		"lat": 47.399414,
		"lng": -96.839148
	},
	{
		"lat": 47.399513,
		"lng": -96.839212
	},
	{
		"lat": 47.399575,
		"lng": -96.839265
	},
	{
		"lat": 47.39966,
		"lng": -96.839363
	},
	{
		"lat": 47.399757,
		"lng": -96.839519
	},
	{
		"lat": 47.399842,
		"lng": -96.839689
	},
	{
		"lat": 47.3999,
		"lng": -96.839822
	},
	{
		"lat": 47.399948,
		"lng": -96.839963
	},
	{
		"lat": 47.400002,
		"lng": -96.840101
	},
	{
		"lat": 47.400099,
		"lng": -96.84044
	},
	{
		"lat": 47.40015,
		"lng": -96.840636
	},
	{
		"lat": 47.400198,
		"lng": -96.840778
	},
	{
		"lat": 47.400236,
		"lng": -96.840926
	},
	{
		"lat": 47.400294,
		"lng": -96.841118
	},
	{
		"lat": 47.400357,
		"lng": -96.841307
	},
	{
		"lat": 47.400495,
		"lng": -96.841667
	},
	{
		"lat": 47.400717,
		"lng": -96.842147
	},
	{
		"lat": 47.400781,
		"lng": -96.842273
	},
	{
		"lat": 47.400922,
		"lng": -96.842514
	},
	{
		"lat": 47.401069,
		"lng": -96.842745
	},
	{
		"lat": 47.401187,
		"lng": -96.842945
	},
	{
		"lat": 47.40142,
		"lng": -96.843275
	},
	{
		"lat": 47.401689,
		"lng": -96.843625
	},
	{
		"lat": 47.401833,
		"lng": -96.843785
	},
	{
		"lat": 47.401924,
		"lng": -96.84387
	},
	{
		"lat": 47.402011,
		"lng": -96.843963
	},
	{
		"lat": 47.402405,
		"lng": -96.844335
	},
	{
		"lat": 47.402718,
		"lng": -96.844598
	},
	{
		"lat": 47.402892,
		"lng": -96.844786
	},
	{
		"lat": 47.403068,
		"lng": -96.845049
	},
	{
		"lat": 47.403132,
		"lng": -96.845177
	},
	{
		"lat": 47.403243,
		"lng": -96.845447
	},
	{
		"lat": 47.403293,
		"lng": -96.845588
	},
	{
		"lat": 47.403384,
		"lng": -96.845874
	},
	{
		"lat": 47.40346,
		"lng": -96.846169
	},
	{
		"lat": 47.403528,
		"lng": -96.846413
	},
	{
		"lat": 47.403663,
		"lng": -96.846957
	},
	{
		"lat": 47.403709,
		"lng": -96.8471
	},
	{
		"lat": 47.403738,
		"lng": -96.847251
	},
	{
		"lat": 47.403765,
		"lng": -96.847349
	},
	{
		"lat": 47.403927,
		"lng": -96.848101
	},
	{
		"lat": 47.403998,
		"lng": -96.848399
	},
	{
		"lat": 47.404026,
		"lng": -96.848551
	},
	{
		"lat": 47.404072,
		"lng": -96.848751
	},
	{
		"lat": 47.404106,
		"lng": -96.848955
	},
	{
		"lat": 47.404164,
		"lng": -96.849259
	},
	{
		"lat": 47.404221,
		"lng": -96.849508
	},
	{
		"lat": 47.404306,
		"lng": -96.84991
	},
	{
		"lat": 47.404432,
		"lng": -96.850346
	},
	{
		"lat": 47.404519,
		"lng": -96.850633
	},
	{
		"lat": 47.404638,
		"lng": -96.850957
	},
	{
		"lat": 47.404693,
		"lng": -96.851072
	},
	{
		"lat": 47.404823,
		"lng": -96.851345
	},
	{
		"lat": 47.404955,
		"lng": -96.851573
	},
	{
		"lat": 47.40501,
		"lng": -96.851667
	},
	{
		"lat": 47.405131,
		"lng": -96.851862
	},
	{
		"lat": 47.405231,
		"lng": -96.852014
	},
	{
		"lat": 47.405309,
		"lng": -96.852123
	},
	{
		"lat": 47.405449,
		"lng": -96.85229
	},
	{
		"lat": 47.405509,
		"lng": -96.852347
	},
	{
		"lat": 47.405668,
		"lng": -96.852473
	},
	{
		"lat": 47.405701,
		"lng": -96.852494
	},
	{
		"lat": 47.405754,
		"lng": -96.852538
	},
	{
		"lat": 47.405921,
		"lng": -96.85264
	},
	{
		"lat": 47.406023,
		"lng": -96.85269
	},
	{
		"lat": 47.406094,
		"lng": -96.852714
	},
	{
		"lat": 47.406201,
		"lng": -96.852735
	},
	{
		"lat": 47.406454,
		"lng": -96.852744
	},
	{
		"lat": 47.406489,
		"lng": -96.852736
	},
	{
		"lat": 47.406591,
		"lng": -96.852683
	},
	{
		"lat": 47.406623,
		"lng": -96.852658
	},
	{
		"lat": 47.406773,
		"lng": -96.852512
	},
	{
		"lat": 47.407081,
		"lng": -96.852067
	},
	{
		"lat": 47.407202,
		"lng": -96.851873
	},
	{
		"lat": 47.407222,
		"lng": -96.851829
	},
	{
		"lat": 47.407254,
		"lng": -96.851734
	},
	{
		"lat": 47.407309,
		"lng": -96.851598
	},
	{
		"lat": 47.407343,
		"lng": -96.851449
	},
	{
		"lat": 47.40739,
		"lng": -96.851141
	},
	{
		"lat": 47.407488,
		"lng": -96.85026
	},
	{
		"lat": 47.407565,
		"lng": -96.849428
	},
	{
		"lat": 47.407688,
		"lng": -96.848341
	},
	{
		"lat": 47.4077,
		"lng": -96.848292
	},
	{
		"lat": 47.407728,
		"lng": -96.848085
	},
	{
		"lat": 47.407773,
		"lng": -96.847831
	},
	{
		"lat": 47.40785,
		"lng": -96.847481
	},
	{
		"lat": 47.407902,
		"lng": -96.847285
	},
	{
		"lat": 47.408043,
		"lng": -96.846919
	},
	{
		"lat": 47.408253,
		"lng": -96.846491
	},
	{
		"lat": 47.408345,
		"lng": -96.84633
	},
	{
		"lat": 47.408541,
		"lng": -96.845953
	},
	{
		"lat": 47.408625,
		"lng": -96.845782
	},
	{
		"lat": 47.408672,
		"lng": -96.845703
	},
	{
		"lat": 47.408737,
		"lng": -96.845578
	},
	{
		"lat": 47.408939,
		"lng": -96.845141
	},
	{
		"lat": 47.408976,
		"lng": -96.845051
	},
	{
		"lat": 47.409139,
		"lng": -96.844704
	},
	{
		"lat": 47.409196,
		"lng": -96.84457
	},
	{
		"lat": 47.409261,
		"lng": -96.844444
	},
	{
		"lat": 47.409336,
		"lng": -96.844265
	},
	{
		"lat": 47.409495,
		"lng": -96.843852
	},
	{
		"lat": 47.40964,
		"lng": -96.84343
	},
	{
		"lat": 47.409681,
		"lng": -96.843343
	},
	{
		"lat": 47.40977,
		"lng": -96.843115
	},
	{
		"lat": 47.409835,
		"lng": -96.842988
	},
	{
		"lat": 47.409872,
		"lng": -96.842898
	},
	{
		"lat": 47.410011,
		"lng": -96.842655
	},
	{
		"lat": 47.410163,
		"lng": -96.842431
	},
	{
		"lat": 47.410295,
		"lng": -96.842251
	},
	{
		"lat": 47.410482,
		"lng": -96.842095
	},
	{
		"lat": 47.410517,
		"lng": -96.842077
	},
	{
		"lat": 47.410646,
		"lng": -96.841984
	},
	{
		"lat": 47.410715,
		"lng": -96.841954
	},
	{
		"lat": 47.410816,
		"lng": -96.841897
	},
	{
		"lat": 47.411063,
		"lng": -96.841813
	},
	{
		"lat": 47.411352,
		"lng": -96.841804
	},
	{
		"lat": 47.411387,
		"lng": -96.841812
	},
	{
		"lat": 47.411492,
		"lng": -96.841852
	},
	{
		"lat": 47.411543,
		"lng": -96.841891
	},
	{
		"lat": 47.41162,
		"lng": -96.84195
	},
	{
		"lat": 47.411738,
		"lng": -96.842073
	},
	{
		"lat": 47.411758,
		"lng": -96.842101
	},
	{
		"lat": 47.411789,
		"lng": -96.842146
	},
	{
		"lat": 47.411815,
		"lng": -96.842184
	},
	{
		"lat": 47.411883,
		"lng": -96.842307
	},
	{
		"lat": 47.411979,
		"lng": -96.842529
	},
	{
		"lat": 47.412033,
		"lng": -96.842725
	},
	{
		"lat": 47.412033,
		"lng": -96.842776
	},
	{
		"lat": 47.412027,
		"lng": -96.842828
	},
	{
		"lat": 47.412008,
		"lng": -96.842929
	},
	{
		"lat": 47.412006,
		"lng": -96.843087
	},
	{
		"lat": 47.412024,
		"lng": -96.843348
	},
	{
		"lat": 47.412042,
		"lng": -96.843502
	},
	{
		"lat": 47.41205,
		"lng": -96.843606
	},
	{
		"lat": 47.412055,
		"lng": -96.843763
	},
	{
		"lat": 47.412052,
		"lng": -96.843973
	},
	{
		"lat": 47.412035,
		"lng": -96.844287
	},
	{
		"lat": 47.411956,
		"lng": -96.844746
	},
	{
		"lat": 47.411914,
		"lng": -96.844947
	},
	{
		"lat": 47.411826,
		"lng": -96.845292
	},
	{
		"lat": 47.411767,
		"lng": -96.845483
	},
	{
		"lat": 47.411741,
		"lng": -96.845582
	},
	{
		"lat": 47.411704,
		"lng": -96.845672
	},
	{
		"lat": 47.411642,
		"lng": -96.845862
	},
	{
		"lat": 47.4116,
		"lng": -96.846007
	},
	{
		"lat": 47.411559,
		"lng": -96.846093
	},
	{
		"lat": 47.411543,
		"lng": -96.846141
	},
	{
		"lat": 47.411533,
		"lng": -96.846191
	},
	{
		"lat": 47.411477,
		"lng": -96.846327
	},
	{
		"lat": 47.411444,
		"lng": -96.84642
	},
	{
		"lat": 47.411405,
		"lng": -96.846508
	},
	{
		"lat": 47.411337,
		"lng": -96.846694
	},
	{
		"lat": 47.41129,
		"lng": -96.846836
	},
	{
		"lat": 47.411123,
		"lng": -96.847301
	},
	{
		"lat": 47.411111,
		"lng": -96.847351
	},
	{
		"lat": 47.410961,
		"lng": -96.847827
	},
	{
		"lat": 47.410949,
		"lng": -96.847877
	},
	{
		"lat": 47.410928,
		"lng": -96.84792
	},
	{
		"lat": 47.410778,
		"lng": -96.848511
	},
	{
		"lat": 47.41075,
		"lng": -96.848608
	},
	{
		"lat": 47.410709,
		"lng": -96.84881
	},
	{
		"lat": 47.410618,
		"lng": -96.849152
	},
	{
		"lat": 47.410602,
		"lng": -96.8492
	},
	{
		"lat": 47.410566,
		"lng": -96.849349
	},
	{
		"lat": 47.410519,
		"lng": -96.84949
	},
	{
		"lat": 47.410457,
		"lng": -96.849737
	},
	{
		"lat": 47.410203,
		"lng": -96.850665
	},
	{
		"lat": 47.410097,
		"lng": -96.851112
	},
	{
		"lat": 47.410003,
		"lng": -96.851566
	},
	{
		"lat": 47.409922,
		"lng": -96.852024
	},
	{
		"lat": 47.409848,
		"lng": -96.852376
	},
	{
		"lat": 47.409645,
		"lng": -96.853602
	},
	{
		"lat": 47.4096,
		"lng": -96.85391
	},
	{
		"lat": 47.409555,
		"lng": -96.854326
	},
	{
		"lat": 47.409512,
		"lng": -96.854796
	},
	{
		"lat": 47.4095,
		"lng": -96.855005
	},
	{
		"lat": 47.409503,
		"lng": -96.855321
	},
	{
		"lat": 47.409511,
		"lng": -96.855584
	},
	{
		"lat": 47.409577,
		"lng": -96.85642
	},
	{
		"lat": 47.409597,
		"lng": -96.856521
	},
	{
		"lat": 47.409669,
		"lng": -96.856818
	},
	{
		"lat": 47.409756,
		"lng": -96.857108
	},
	{
		"lat": 47.409796,
		"lng": -96.857194
	},
	{
		"lat": 47.409858,
		"lng": -96.857385
	},
	{
		"lat": 47.409897,
		"lng": -96.857473
	},
	{
		"lat": 47.409919,
		"lng": -96.857535
	},
	{
		"lat": 47.410019,
		"lng": -96.857754
	},
	{
		"lat": 47.410042,
		"lng": -96.857795
	},
	{
		"lat": 47.410244,
		"lng": -96.858096
	},
	{
		"lat": 47.410329,
		"lng": -96.858194
	},
	{
		"lat": 47.410482,
		"lng": -96.858334
	},
	{
		"lat": 47.410613,
		"lng": -96.858432
	},
	{
		"lat": 47.410707,
		"lng": -96.858502
	},
	{
		"lat": 47.410805,
		"lng": -96.858568
	},
	{
		"lat": 47.411031,
		"lng": -96.858733
	},
	{
		"lat": 47.411195,
		"lng": -96.858844
	},
	{
		"lat": 47.411259,
		"lng": -96.858893
	},
	{
		"lat": 47.411326,
		"lng": -96.858932
	},
	{
		"lat": 47.411358,
		"lng": -96.858957
	},
	{
		"lat": 47.411458,
		"lng": -96.859019
	},
	{
		"lat": 47.411527,
		"lng": -96.859052
	},
	{
		"lat": 47.411823,
		"lng": -96.859246
	},
	{
		"lat": 47.41189,
		"lng": -96.859285
	},
	{
		"lat": 47.412086,
		"lng": -96.859422
	},
	{
		"lat": 47.41212,
		"lng": -96.859439
	},
	{
		"lat": 47.412183,
		"lng": -96.859489
	},
	{
		"lat": 47.412282,
		"lng": -96.859554
	},
	{
		"lat": 47.412473,
		"lng": -96.859703
	},
	{
		"lat": 47.412658,
		"lng": -96.859867
	},
	{
		"lat": 47.412776,
		"lng": -96.859989
	},
	{
		"lat": 47.41287,
		"lng": -96.860069
	},
	{
		"lat": 47.412984,
		"lng": -96.860198
	},
	{
		"lat": 47.413104,
		"lng": -96.860314
	},
	{
		"lat": 47.413476,
		"lng": -96.860753
	},
	{
		"lat": 47.413598,
		"lng": -96.860894
	},
	{
		"lat": 47.41373,
		"lng": -96.861048
	},
	{
		"lat": 47.413989,
		"lng": -96.861334
	},
	{
		"lat": 47.414078,
		"lng": -96.861423
	},
	{
		"lat": 47.414201,
		"lng": -96.861533
	},
	{
		"lat": 47.414296,
		"lng": -96.861609
	},
	{
		"lat": 47.414394,
		"lng": -96.861678
	},
	{
		"lat": 47.41453,
		"lng": -96.861748
	},
	{
		"lat": 47.414669,
		"lng": -96.861806
	},
	{
		"lat": 47.414917,
		"lng": -96.861879
	},
	{
		"lat": 47.415098,
		"lng": -96.861897
	},
	{
		"lat": 47.415387,
		"lng": -96.861883
	},
	{
		"lat": 47.41553,
		"lng": -96.861858
	},
	{
		"lat": 47.415706,
		"lng": -96.861799
	},
	{
		"lat": 47.415778,
		"lng": -96.861784
	},
	{
		"lat": 47.415916,
		"lng": -96.861721
	},
	{
		"lat": 47.416085,
		"lng": -96.861631
	},
	{
		"lat": 47.41618,
		"lng": -96.861557
	},
	{
		"lat": 47.416247,
		"lng": -96.861516
	},
	{
		"lat": 47.416309,
		"lng": -96.861461
	},
	{
		"lat": 47.416374,
		"lng": -96.861416
	},
	{
		"lat": 47.416468,
		"lng": -96.86134
	},
	{
		"lat": 47.416568,
		"lng": -96.861278
	},
	{
		"lat": 47.416698,
		"lng": -96.861186
	},
	{
		"lat": 47.416766,
		"lng": -96.861151
	},
	{
		"lat": 47.416864,
		"lng": -96.861086
	},
	{
		"lat": 47.416966,
		"lng": -96.86103
	},
	{
		"lat": 47.416998,
		"lng": -96.861006
	},
	{
		"lat": 47.417199,
		"lng": -96.860889
	},
	{
		"lat": 47.417409,
		"lng": -96.86081
	},
	{
		"lat": 47.417445,
		"lng": -96.860807
	},
	{
		"lat": 47.417516,
		"lng": -96.86083
	},
	{
		"lat": 47.417549,
		"lng": -96.860849
	},
	{
		"lat": 47.417611,
		"lng": -96.860902
	},
	{
		"lat": 47.41769,
		"lng": -96.861011
	},
	{
		"lat": 47.417769,
		"lng": -96.861187
	},
	{
		"lat": 47.417801,
		"lng": -96.861281
	},
	{
		"lat": 47.417827,
		"lng": -96.861379
	},
	{
		"lat": 47.417869,
		"lng": -96.86158
	},
	{
		"lat": 47.417931,
		"lng": -96.861991
	},
	{
		"lat": 47.417967,
		"lng": -96.862725
	},
	{
		"lat": 47.417997,
		"lng": -96.863091
	},
	{
		"lat": 47.418028,
		"lng": -96.86335
	},
	{
		"lat": 47.418045,
		"lng": -96.863452
	},
	{
		"lat": 47.418067,
		"lng": -96.86366
	},
	{
		"lat": 47.418091,
		"lng": -96.863759
	},
	{
		"lat": 47.41815,
		"lng": -96.863951
	},
	{
		"lat": 47.418202,
		"lng": -96.864089
	},
	{
		"lat": 47.418242,
		"lng": -96.864176
	},
	{
		"lat": 47.418349,
		"lng": -96.864388
	},
	{
		"lat": 47.418573,
		"lng": -96.864801
	},
	{
		"lat": 47.41866,
		"lng": -96.864969
	},
	{
		"lat": 47.418797,
		"lng": -96.865278
	},
	{
		"lat": 47.418882,
		"lng": -96.86551
	},
	{
		"lat": 47.418975,
		"lng": -96.865852
	},
	{
		"lat": 47.418992,
		"lng": -96.865955
	},
	{
		"lat": 47.419005,
		"lng": -96.866111
	},
	{
		"lat": 47.419007,
		"lng": -96.866217
	},
	{
		"lat": 47.418991,
		"lng": -96.866637
	},
	{
		"lat": 47.418986,
		"lng": -96.866689
	},
	{
		"lat": 47.418938,
		"lng": -96.866943
	},
	{
		"lat": 47.418873,
		"lng": -96.867188
	},
	{
		"lat": 47.418844,
		"lng": -96.867284
	},
	{
		"lat": 47.418803,
		"lng": -96.867371
	},
	{
		"lat": 47.41872,
		"lng": -96.867605
	},
	{
		"lat": 47.418658,
		"lng": -96.867795
	},
	{
		"lat": 47.418617,
		"lng": -96.867881
	},
	{
		"lat": 47.418568,
		"lng": -96.868021
	},
	{
		"lat": 47.418406,
		"lng": -96.868432
	},
	{
		"lat": 47.418293,
		"lng": -96.868761
	},
	{
		"lat": 47.418227,
		"lng": -96.869061
	},
	{
		"lat": 47.418173,
		"lng": -96.869257
	},
	{
		"lat": 47.41813,
		"lng": -96.869512
	},
	{
		"lat": 47.418081,
		"lng": -96.869842
	},
	{
		"lat": 47.418082,
		"lng": -96.870136
	},
	{
		"lat": 47.418101,
		"lng": -96.870345
	},
	{
		"lat": 47.418118,
		"lng": -96.870447
	},
	{
		"lat": 47.418128,
		"lng": -96.870604
	},
	{
		"lat": 47.418152,
		"lng": -96.870704
	},
	{
		"lat": 47.418167,
		"lng": -96.870807
	},
	{
		"lat": 47.418239,
		"lng": -96.871048
	},
	{
		"lat": 47.418258,
		"lng": -96.871093
	},
	{
		"lat": 47.418484,
		"lng": -96.871434
	},
	{
		"lat": 47.418597,
		"lng": -96.871564
	},
	{
		"lat": 47.418629,
		"lng": -96.87159
	},
	{
		"lat": 47.418864,
		"lng": -96.871724
	},
	{
		"lat": 47.418935,
		"lng": -96.871748
	},
	{
		"lat": 47.419006,
		"lng": -96.871763
	},
	{
		"lat": 47.419115,
		"lng": -96.871768
	},
	{
		"lat": 47.419187,
		"lng": -96.871761
	},
	{
		"lat": 47.419222,
		"lng": -96.871751
	},
	{
		"lat": 47.419255,
		"lng": -96.87173
	},
	{
		"lat": 47.419392,
		"lng": -96.871663
	},
	{
		"lat": 47.419554,
		"lng": -96.871546
	},
	{
		"lat": 47.419585,
		"lng": -96.871518
	},
	{
		"lat": 47.419639,
		"lng": -96.871448
	},
	{
		"lat": 47.419724,
		"lng": -96.87135
	},
	{
		"lat": 47.419776,
		"lng": -96.871278
	},
	{
		"lat": 47.41985,
		"lng": -96.871163
	},
	{
		"lat": 47.419919,
		"lng": -96.871041
	},
	{
		"lat": 47.419958,
		"lng": -96.870952
	},
	{
		"lat": 47.420028,
		"lng": -96.870769
	},
	{
		"lat": 47.420114,
		"lng": -96.87048
	},
	{
		"lat": 47.420152,
		"lng": -96.870332
	},
	{
		"lat": 47.420169,
		"lng": -96.870285
	},
	{
		"lat": 47.420231,
		"lng": -96.869984
	},
	{
		"lat": 47.420247,
		"lng": -96.869881
	},
	{
		"lat": 47.420279,
		"lng": -96.869516
	},
	{
		"lat": 47.420352,
		"lng": -96.868205
	},
	{
		"lat": 47.420397,
		"lng": -96.867578
	},
	{
		"lat": 47.420454,
		"lng": -96.866953
	},
	{
		"lat": 47.420519,
		"lng": -96.866329
	},
	{
		"lat": 47.420536,
		"lng": -96.866242
	},
	{
		"lat": 47.420553,
		"lng": -96.866086
	},
	{
		"lat": 47.420598,
		"lng": -96.865831
	},
	{
		"lat": 47.420638,
		"lng": -96.865521
	},
	{
		"lat": 47.420681,
		"lng": -96.865321
	},
	{
		"lat": 47.420729,
		"lng": -96.865068
	},
	{
		"lat": 47.420795,
		"lng": -96.864823
	},
	{
		"lat": 47.420858,
		"lng": -96.864634
	},
	{
		"lat": 47.420939,
		"lng": -96.86446
	},
	{
		"lat": 47.421012,
		"lng": -96.864344
	},
	{
		"lat": 47.42149,
		"lng": -96.863625
	},
	{
		"lat": 47.421978,
		"lng": -96.862922
	},
	{
		"lat": 47.422147,
		"lng": -96.862647
	},
	{
		"lat": 47.422285,
		"lng": -96.862404
	},
	{
		"lat": 47.42237,
		"lng": -96.862234
	},
	{
		"lat": 47.422417,
		"lng": -96.862154
	},
	{
		"lat": 47.42246,
		"lng": -96.86207
	},
	{
		"lat": 47.422736,
		"lng": -96.861393
	},
	{
		"lat": 47.422839,
		"lng": -96.861115
	},
	{
		"lat": 47.422885,
		"lng": -96.860973
	},
	{
		"lat": 47.422907,
		"lng": -96.860873
	},
	{
		"lat": 47.422948,
		"lng": -96.860726
	},
	{
		"lat": 47.422982,
		"lng": -96.860634
	},
	{
		"lat": 47.423004,
		"lng": -96.860534
	},
	{
		"lat": 47.423052,
		"lng": -96.860393
	},
	{
		"lat": 47.423135,
		"lng": -96.860102
	},
	{
		"lat": 47.423199,
		"lng": -96.859856
	},
	{
		"lat": 47.423294,
		"lng": -96.85946
	},
	{
		"lat": 47.423321,
		"lng": -96.859307
	},
	{
		"lat": 47.423343,
		"lng": -96.859207
	},
	{
		"lat": 47.423394,
		"lng": -96.8589
	},
	{
		"lat": 47.423431,
		"lng": -96.85859
	},
	{
		"lat": 47.423455,
		"lng": -96.85833
	},
	{
		"lat": 47.42351,
		"lng": -96.857866
	},
	{
		"lat": 47.423668,
		"lng": -96.857002
	},
	{
		"lat": 47.423709,
		"lng": -96.856801
	},
	{
		"lat": 47.42378,
		"lng": -96.856503
	},
	{
		"lat": 47.42388,
		"lng": -96.856166
	},
	{
		"lat": 47.423901,
		"lng": -96.856123
	},
	{
		"lat": 47.42401,
		"lng": -96.855851
	},
	{
		"lat": 47.424181,
		"lng": -96.855511
	},
	{
		"lat": 47.424328,
		"lng": -96.85528
	},
	{
		"lat": 47.424457,
		"lng": -96.855096
	},
	{
		"lat": 47.42467,
		"lng": -96.85481
	},
	{
		"lat": 47.424901,
		"lng": -96.854558
	},
	{
		"lat": 47.424931,
		"lng": -96.85453
	},
	{
		"lat": 47.424996,
		"lng": -96.854483
	},
	{
		"lat": 47.425059,
		"lng": -96.85443
	},
	{
		"lat": 47.425197,
		"lng": -96.854371
	},
	{
		"lat": 47.425339,
		"lng": -96.854331
	},
	{
		"lat": 47.425411,
		"lng": -96.854323
	},
	{
		"lat": 47.425592,
		"lng": -96.854325
	},
	{
		"lat": 47.425807,
		"lng": -96.854371
	},
	{
		"lat": 47.425946,
		"lng": -96.854431
	},
	{
		"lat": 47.426044,
		"lng": -96.854497
	},
	{
		"lat": 47.426136,
		"lng": -96.854581
	},
	{
		"lat": 47.426254,
		"lng": -96.854703
	},
	{
		"lat": 47.426306,
		"lng": -96.854776
	},
	{
		"lat": 47.426429,
		"lng": -96.854968
	},
	{
		"lat": 47.426519,
		"lng": -96.855133
	},
	{
		"lat": 47.426555,
		"lng": -96.855224
	},
	{
		"lat": 47.426641,
		"lng": -96.855394
	},
	{
		"lat": 47.426719,
		"lng": -96.855571
	},
	{
		"lat": 47.426808,
		"lng": -96.8558
	},
	{
		"lat": 47.42684,
		"lng": -96.855895
	},
	{
		"lat": 47.426878,
		"lng": -96.855984
	},
	{
		"lat": 47.426946,
		"lng": -96.85617
	},
	{
		"lat": 47.427087,
		"lng": -96.856596
	},
	{
		"lat": 47.427149,
		"lng": -96.856844
	},
	{
		"lat": 47.427179,
		"lng": -96.856995
	},
	{
		"lat": 47.427232,
		"lng": -96.857301
	},
	{
		"lat": 47.427252,
		"lng": -96.857615
	},
	{
		"lat": 47.427259,
		"lng": -96.85793
	},
	{
		"lat": 47.427259,
		"lng": -96.858298
	},
	{
		"lat": 47.427241,
		"lng": -96.858824
	},
	{
		"lat": 47.427195,
		"lng": -96.859239
	},
	{
		"lat": 47.42716,
		"lng": -96.859498
	},
	{
		"lat": 47.427112,
		"lng": -96.859751
	},
	{
		"lat": 47.427089,
		"lng": -96.859851
	},
	{
		"lat": 47.42706,
		"lng": -96.859947
	},
	{
		"lat": 47.426996,
		"lng": -96.860192
	},
	{
		"lat": 47.426951,
		"lng": -96.860335
	},
	{
		"lat": 47.426915,
		"lng": -96.860426
	},
	{
		"lat": 47.426883,
		"lng": -96.860521
	},
	{
		"lat": 47.426789,
		"lng": -96.860745
	},
	{
		"lat": 47.426629,
		"lng": -96.861155
	},
	{
		"lat": 47.426569,
		"lng": -96.861346
	},
	{
		"lat": 47.426535,
		"lng": -96.861495
	},
	{
		"lat": 47.426479,
		"lng": -96.8618
	},
	{
		"lat": 47.426461,
		"lng": -96.862061
	},
	{
		"lat": 47.426455,
		"lng": -96.862482
	},
	{
		"lat": 47.42647,
		"lng": -96.862744
	},
	{
		"lat": 47.426493,
		"lng": -96.862952
	},
	{
		"lat": 47.426539,
		"lng": -96.863152
	},
	{
		"lat": 47.426601,
		"lng": -96.863342
	},
	{
		"lat": 47.426826,
		"lng": -96.863819
	},
	{
		"lat": 47.426864,
		"lng": -96.863908
	},
	{
		"lat": 47.426955,
		"lng": -96.864072
	},
	{
		"lat": 47.42716,
		"lng": -96.864369
	},
	{
		"lat": 47.427243,
		"lng": -96.864471
	},
	{
		"lat": 47.427367,
		"lng": -96.86458
	},
	{
		"lat": 47.427496,
		"lng": -96.864675
	},
	{
		"lat": 47.427564,
		"lng": -96.86471
	},
	{
		"lat": 47.427614,
		"lng": -96.864726
	},
	{
		"lat": 47.427733,
		"lng": -96.864749
	},
	{
		"lat": 47.428022,
		"lng": -96.864731
	},
	{
		"lat": 47.428094,
		"lng": -96.864715
	},
	{
		"lat": 47.428267,
		"lng": -96.864644
	},
	{
		"lat": 47.428401,
		"lng": -96.864563
	},
	{
		"lat": 47.428491,
		"lng": -96.864476
	},
	{
		"lat": 47.428554,
		"lng": -96.864425
	},
	{
		"lat": 47.428587,
		"lng": -96.864404
	},
	{
		"lat": 47.428785,
		"lng": -96.864176
	},
	{
		"lat": 47.428878,
		"lng": -96.864032
	},
	{
		"lat": 47.428972,
		"lng": -96.863873
	},
	{
		"lat": 47.429053,
		"lng": -96.863698
	},
	{
		"lat": 47.429128,
		"lng": -96.863519
	},
	{
		"lat": 47.429173,
		"lng": -96.863376
	},
	{
		"lat": 47.429293,
		"lng": -96.863051
	},
	{
		"lat": 47.429305,
		"lng": -96.863002
	},
	{
		"lat": 47.429342,
		"lng": -96.862911
	},
	{
		"lat": 47.429409,
		"lng": -96.862726
	},
	{
		"lat": 47.429516,
		"lng": -96.862392
	},
	{
		"lat": 47.429588,
		"lng": -96.86221
	},
	{
		"lat": 47.429632,
		"lng": -96.862066
	},
	{
		"lat": 47.429656,
		"lng": -96.861967
	},
	{
		"lat": 47.429674,
		"lng": -96.861921
	},
	{
		"lat": 47.429876,
		"lng": -96.86119
	},
	{
		"lat": 47.429991,
		"lng": -96.860862
	},
	{
		"lat": 47.430028,
		"lng": -96.860772
	},
	{
		"lat": 47.430238,
		"lng": -96.860411
	},
	{
		"lat": 47.430316,
		"lng": -96.860301
	},
	{
		"lat": 47.430401,
		"lng": -96.860204
	},
	{
		"lat": 47.430536,
		"lng": -96.86003
	},
	{
		"lat": 47.430768,
		"lng": -96.85978
	},
	{
		"lat": 47.430795,
		"lng": -96.859745
	},
	{
		"lat": 47.431194,
		"lng": -96.859295
	},
	{
		"lat": 47.431461,
		"lng": -96.859023
	},
	{
		"lat": 47.431553,
		"lng": -96.85894
	},
	{
		"lat": 47.431696,
		"lng": -96.858781
	},
	{
		"lat": 47.431775,
		"lng": -96.858671
	},
	{
		"lat": 47.432003,
		"lng": -96.858335
	},
	{
		"lat": 47.432073,
		"lng": -96.858214
	},
	{
		"lat": 47.432147,
		"lng": -96.858033
	},
	{
		"lat": 47.432244,
		"lng": -96.857751
	},
	{
		"lat": 47.432283,
		"lng": -96.857604
	},
	{
		"lat": 47.43233,
		"lng": -96.857405
	},
	{
		"lat": 47.432355,
		"lng": -96.857252
	},
	{
		"lat": 47.432365,
		"lng": -96.857148
	},
	{
		"lat": 47.432371,
		"lng": -96.856885
	},
	{
		"lat": 47.432364,
		"lng": -96.856727
	},
	{
		"lat": 47.432348,
		"lng": -96.856624
	},
	{
		"lat": 47.432325,
		"lng": -96.856525
	},
	{
		"lat": 47.432224,
		"lng": -96.856188
	},
	{
		"lat": 47.431906,
		"lng": -96.855485
	},
	{
		"lat": 47.431869,
		"lng": -96.855395
	},
	{
		"lat": 47.431717,
		"lng": -96.8551
	},
	{
		"lat": 47.43154,
		"lng": -96.854703
	},
	{
		"lat": 47.43144,
		"lng": -96.854422
	},
	{
		"lat": 47.431407,
		"lng": -96.854272
	},
	{
		"lat": 47.431396,
		"lng": -96.854168
	},
	{
		"lat": 47.431402,
		"lng": -96.85401
	},
	{
		"lat": 47.431437,
		"lng": -96.853699
	},
	{
		"lat": 47.431472,
		"lng": -96.853549
	},
	{
		"lat": 47.43149,
		"lng": -96.853447
	},
	{
		"lat": 47.431539,
		"lng": -96.853306
	},
	{
		"lat": 47.431578,
		"lng": -96.853217
	},
	{
		"lat": 47.431749,
		"lng": -96.852947
	},
	{
		"lat": 47.43182,
		"lng": -96.852892
	},
	{
		"lat": 47.431853,
		"lng": -96.852873
	},
	{
		"lat": 47.431994,
		"lng": -96.852823
	},
	{
		"lat": 47.43203,
		"lng": -96.852816
	},
	{
		"lat": 47.432247,
		"lng": -96.852811
	},
	{
		"lat": 47.432282,
		"lng": -96.852818
	},
	{
		"lat": 47.432388,
		"lng": -96.852858
	},
	{
		"lat": 47.432524,
		"lng": -96.852925
	},
	{
		"lat": 47.432623,
		"lng": -96.852991
	},
	{
		"lat": 47.43268,
		"lng": -96.853056
	},
	{
		"lat": 47.432782,
		"lng": -96.853205
	},
	{
		"lat": 47.432879,
		"lng": -96.853361
	},
	{
		"lat": 47.433146,
		"lng": -96.853859
	},
	{
		"lat": 47.433225,
		"lng": -96.854035
	},
	{
		"lat": 47.433299,
		"lng": -96.854216
	},
	{
		"lat": 47.433367,
		"lng": -96.8544
	},
	{
		"lat": 47.433414,
		"lng": -96.854543
	},
	{
		"lat": 47.43348,
		"lng": -96.854786
	},
	{
		"lat": 47.433536,
		"lng": -96.855037
	},
	{
		"lat": 47.433578,
		"lng": -96.855292
	},
	{
		"lat": 47.433614,
		"lng": -96.85555
	},
	{
		"lat": 47.433643,
		"lng": -96.855702
	},
	{
		"lat": 47.43368,
		"lng": -96.856013
	},
	{
		"lat": 47.433708,
		"lng": -96.85611
	},
	{
		"lat": 47.433741,
		"lng": -96.856368
	},
	{
		"lat": 47.433768,
		"lng": -96.856465
	},
	{
		"lat": 47.433783,
		"lng": -96.856568
	},
	{
		"lat": 47.433863,
		"lng": -96.856972
	},
	{
		"lat": 47.433913,
		"lng": -96.857387
	},
	{
		"lat": 47.433961,
		"lng": -96.858067
	},
	{
		"lat": 47.433984,
		"lng": -96.858275
	},
	{
		"lat": 47.434005,
		"lng": -96.858536
	},
	{
		"lat": 47.434037,
		"lng": -96.858795
	},
	{
		"lat": 47.43408,
		"lng": -96.858996
	},
	{
		"lat": 47.434101,
		"lng": -96.859151
	},
	{
		"lat": 47.434147,
		"lng": -96.85935
	},
	{
		"lat": 47.434198,
		"lng": -96.859547
	},
	{
		"lat": 47.43422,
		"lng": -96.859648
	},
	{
		"lat": 47.434312,
		"lng": -96.859991
	},
	{
		"lat": 47.434342,
		"lng": -96.860087
	},
	{
		"lat": 47.434376,
		"lng": -96.860179
	},
	{
		"lat": 47.434482,
		"lng": -96.860513
	},
	{
		"lat": 47.434585,
		"lng": -96.860791
	},
	{
		"lat": 47.434801,
		"lng": -96.861277
	},
	{
		"lat": 47.434969,
		"lng": -96.861619
	},
	{
		"lat": 47.435132,
		"lng": -96.861901
	},
	{
		"lat": 47.435257,
		"lng": -96.862091
	},
	{
		"lat": 47.435521,
		"lng": -96.862451
	},
	{
		"lat": 47.435608,
		"lng": -96.862545
	},
	{
		"lat": 47.435671,
		"lng": -96.862598
	},
	{
		"lat": 47.435802,
		"lng": -96.862685
	},
	{
		"lat": 47.435905,
		"lng": -96.862738
	},
	{
		"lat": 47.436045,
		"lng": -96.862788
	},
	{
		"lat": 47.436152,
		"lng": -96.862818
	},
	{
		"lat": 47.436295,
		"lng": -96.862846
	},
	{
		"lat": 47.436403,
		"lng": -96.862859
	},
	{
		"lat": 47.436658,
		"lng": -96.862817
	},
	{
		"lat": 47.436765,
		"lng": -96.862786
	},
	{
		"lat": 47.436936,
		"lng": -96.8627
	},
	{
		"lat": 47.436999,
		"lng": -96.862651
	},
	{
		"lat": 47.437034,
		"lng": -96.862634
	},
	{
		"lat": 47.437127,
		"lng": -96.862555
	},
	{
		"lat": 47.437216,
		"lng": -96.862464
	},
	{
		"lat": 47.437302,
		"lng": -96.862368
	},
	{
		"lat": 47.437432,
		"lng": -96.862185
	},
	{
		"lat": 47.43757,
		"lng": -96.861942
	},
	{
		"lat": 47.437624,
		"lng": -96.861805
	},
	{
		"lat": 47.437737,
		"lng": -96.861475
	},
	{
		"lat": 47.437762,
		"lng": -96.861376
	},
	{
		"lat": 47.4378,
		"lng": -96.861173
	},
	{
		"lat": 47.437881,
		"lng": -96.860606
	},
	{
		"lat": 47.437931,
		"lng": -96.859979
	},
	{
		"lat": 47.437935,
		"lng": -96.859716
	},
	{
		"lat": 47.437929,
		"lng": -96.859294
	},
	{
		"lat": 47.437913,
		"lng": -96.859138
	},
	{
		"lat": 47.437886,
		"lng": -96.858985
	},
	{
		"lat": 47.437873,
		"lng": -96.858882
	},
	{
		"lat": 47.43787,
		"lng": -96.858829
	},
	{
		"lat": 47.43787,
		"lng": -96.858567
	},
	{
		"lat": 47.437892,
		"lng": -96.858199
	},
	{
		"lat": 47.437926,
		"lng": -96.857888
	},
	{
		"lat": 47.437974,
		"lng": -96.85758
	},
	{
		"lat": 47.438041,
		"lng": -96.857336
	},
	{
		"lat": 47.438094,
		"lng": -96.857198
	},
	{
		"lat": 47.438137,
		"lng": -96.857113
	},
	{
		"lat": 47.438257,
		"lng": -96.85685
	},
	{
		"lat": 47.43838,
		"lng": -96.856657
	},
	{
		"lat": 47.43865,
		"lng": -96.856307
	},
	{
		"lat": 47.438794,
		"lng": -96.856149
	},
	{
		"lat": 47.438888,
		"lng": -96.856069
	},
	{
		"lat": 47.438952,
		"lng": -96.856021
	},
	{
		"lat": 47.439084,
		"lng": -96.855936
	},
	{
		"lat": 47.439221,
		"lng": -96.855867
	},
	{
		"lat": 47.439291,
		"lng": -96.855841
	},
	{
		"lat": 47.439363,
		"lng": -96.855824
	},
	{
		"lat": 47.439506,
		"lng": -96.855801
	},
	{
		"lat": 47.439723,
		"lng": -96.855814
	},
	{
		"lat": 47.439866,
		"lng": -96.855849
	},
	{
		"lat": 47.440041,
		"lng": -96.855915
	},
	{
		"lat": 47.440349,
		"lng": -96.856065
	},
	{
		"lat": 47.440592,
		"lng": -96.856169
	},
	{
		"lat": 47.440657,
		"lng": -96.856225
	},
	{
		"lat": 47.440669,
		"lng": -96.85623
	},
	{
		"lat": 47.440761,
		"lng": -96.856273
	},
	{
		"lat": 47.440861,
		"lng": -96.856332
	},
	{
		"lat": 47.441087,
		"lng": -96.856497
	},
	{
		"lat": 47.44115,
		"lng": -96.856548
	},
	{
		"lat": 47.441513,
		"lng": -96.856896
	},
	{
		"lat": 47.441571,
		"lng": -96.856958
	},
	{
		"lat": 47.441654,
		"lng": -96.857059
	},
	{
		"lat": 47.441826,
		"lng": -96.857251
	},
	{
		"lat": 47.442078,
		"lng": -96.85755
	},
	{
		"lat": 47.442254,
		"lng": -96.857734
	},
	{
		"lat": 47.44244,
		"lng": -96.857899
	},
	{
		"lat": 47.442567,
		"lng": -96.857997
	},
	{
		"lat": 47.44286,
		"lng": -96.858202
	},
	{
		"lat": 47.442928,
		"lng": -96.858239
	},
	{
		"lat": 47.442959,
		"lng": -96.858266
	},
	{
		"lat": 47.443129,
		"lng": -96.858356
	},
	{
		"lat": 47.443266,
		"lng": -96.858422
	},
	{
		"lat": 47.443408,
		"lng": -96.858465
	},
	{
		"lat": 47.443872,
		"lng": -96.858573
	},
	{
		"lat": 47.444087,
		"lng": -96.858607
	},
	{
		"lat": 47.444373,
		"lng": -96.858668
	},
	{
		"lat": 47.444648,
		"lng": -96.858798
	},
	{
		"lat": 47.444849,
		"lng": -96.858915
	},
	{
		"lat": 47.444912,
		"lng": -96.858968
	},
	{
		"lat": 47.444946,
		"lng": -96.858986
	},
	{
		"lat": 47.445268,
		"lng": -96.859222
	},
	{
		"lat": 47.445427,
		"lng": -96.859345
	},
	{
		"lat": 47.445457,
		"lng": -96.859375
	},
	{
		"lat": 47.445521,
		"lng": -96.859424
	},
	{
		"lat": 47.445687,
		"lng": -96.859527
	},
	{
		"lat": 47.445756,
		"lng": -96.859561
	},
	{
		"lat": 47.445934,
		"lng": -96.859607
	},
	{
		"lat": 47.446042,
		"lng": -96.859621
	},
	{
		"lat": 47.446402,
		"lng": -96.85958
	},
	{
		"lat": 47.446473,
		"lng": -96.85956
	},
	{
		"lat": 47.446508,
		"lng": -96.859544
	},
	{
		"lat": 47.44654,
		"lng": -96.859521
	},
	{
		"lat": 47.446675,
		"lng": -96.859447
	},
	{
		"lat": 47.446772,
		"lng": -96.859376
	},
	{
		"lat": 47.44683,
		"lng": -96.859313
	},
	{
		"lat": 47.446894,
		"lng": -96.859267
	},
	{
		"lat": 47.447037,
		"lng": -96.859106
	},
	{
		"lat": 47.447239,
		"lng": -96.858804
	},
	{
		"lat": 47.447501,
		"lng": -96.858301
	},
	{
		"lat": 47.447651,
		"lng": -96.858097
	},
	{
		"lat": 47.447818,
		"lng": -96.85787
	},
	{
		"lat": 47.447938,
		"lng": -96.857746
	},
	{
		"lat": 47.448101,
		"lng": -96.857576
	},
	{
		"lat": 47.448261,
		"lng": -96.857452
	},
	{
		"lat": 47.448354,
		"lng": -96.857373
	},
	{
		"lat": 47.448452,
		"lng": -96.857307
	},
	{
		"lat": 47.448554,
		"lng": -96.857252
	},
	{
		"lat": 47.448653,
		"lng": -96.857188
	},
	{
		"lat": 47.448847,
		"lng": -96.857049
	},
	{
		"lat": 47.449036,
		"lng": -96.857012
	},
	{
		"lat": 47.449203,
		"lng": -96.857034
	},
	{
		"lat": 47.449272,
		"lng": -96.857066
	},
	{
		"lat": 47.449371,
		"lng": -96.857133
	},
	{
		"lat": 47.449494,
		"lng": -96.857242
	},
	{
		"lat": 47.449611,
		"lng": -96.857367
	},
	{
		"lat": 47.449701,
		"lng": -96.857453
	},
	{
		"lat": 47.449813,
		"lng": -96.857587
	},
	{
		"lat": 47.449907,
		"lng": -96.857665
	},
	{
		"lat": 47.450144,
		"lng": -96.857907
	},
	{
		"lat": 47.450207,
		"lng": -96.857959
	},
	{
		"lat": 47.450497,
		"lng": -96.858272
	},
	{
		"lat": 47.450862,
		"lng": -96.858704
	},
	{
		"lat": 47.450969,
		"lng": -96.858845
	},
	{
		"lat": 47.451112,
		"lng": -96.859006
	},
	{
		"lat": 47.45127,
		"lng": -96.859135
	},
	{
		"lat": 47.451336,
		"lng": -96.859177
	},
	{
		"lat": 47.451405,
		"lng": -96.85921
	},
	{
		"lat": 47.451584,
		"lng": -96.859246
	},
	{
		"lat": 47.451728,
		"lng": -96.859258
	},
	{
		"lat": 47.451835,
		"lng": -96.85923
	},
	{
		"lat": 47.451972,
		"lng": -96.859161
	},
	{
		"lat": 47.452004,
		"lng": -96.859136
	},
	{
		"lat": 47.452061,
		"lng": -96.859072
	},
	{
		"lat": 47.452143,
		"lng": -96.858969
	},
	{
		"lat": 47.452269,
		"lng": -96.858781
	},
	{
		"lat": 47.45229,
		"lng": -96.858738
	},
	{
		"lat": 47.452343,
		"lng": -96.8586
	},
	{
		"lat": 47.452374,
		"lng": -96.858505
	},
	{
		"lat": 47.45243,
		"lng": -96.858255
	},
	{
		"lat": 47.452446,
		"lng": -96.858153
	},
	{
		"lat": 47.452477,
		"lng": -96.857894
	},
	{
		"lat": 47.452501,
		"lng": -96.85774
	},
	{
		"lat": 47.452564,
		"lng": -96.857116
	},
	{
		"lat": 47.452655,
		"lng": -96.855967
	},
	{
		"lat": 47.452673,
		"lng": -96.855865
	},
	{
		"lat": 47.452723,
		"lng": -96.855667
	},
	{
		"lat": 47.452843,
		"lng": -96.855343
	},
	{
		"lat": 47.452941,
		"lng": -96.855123
	},
	{
		"lat": 47.452964,
		"lng": -96.855082
	},
	{
		"lat": 47.453064,
		"lng": -96.854931
	},
	{
		"lat": 47.453168,
		"lng": -96.854784
	},
	{
		"lat": 47.453335,
		"lng": -96.854582
	},
	{
		"lat": 47.453457,
		"lng": -96.854469
	},
	{
		"lat": 47.453589,
		"lng": -96.854384
	},
	{
		"lat": 47.453795,
		"lng": -96.854286
	},
	{
		"lat": 47.453972,
		"lng": -96.85423
	},
	{
		"lat": 47.45408,
		"lng": -96.854218
	},
	{
		"lat": 47.454189,
		"lng": -96.854219
	},
	{
		"lat": 47.454406,
		"lng": -96.854232
	},
	{
		"lat": 47.454575,
		"lng": -96.854298
	},
	{
		"lat": 47.454675,
		"lng": -96.854359
	},
	{
		"lat": 47.454772,
		"lng": -96.854431
	},
	{
		"lat": 47.454795,
		"lng": -96.854455
	},
	{
		"lat": 47.454816,
		"lng": -96.854483
	},
	{
		"lat": 47.45483,
		"lng": -96.854492
	},
	{
		"lat": 47.454857,
		"lng": -96.854527
	},
	{
		"lat": 47.455005,
		"lng": -96.854759
	},
	{
		"lat": 47.455049,
		"lng": -96.854842
	},
	{
		"lat": 47.455086,
		"lng": -96.854933
	},
	{
		"lat": 47.455147,
		"lng": -96.855124
	},
	{
		"lat": 47.455166,
		"lng": -96.855168
	},
	{
		"lat": 47.455239,
		"lng": -96.855409
	},
	{
		"lat": 47.45532,
		"lng": -96.855644
	},
	{
		"lat": 47.455398,
		"lng": -96.855995
	},
	{
		"lat": 47.455424,
		"lng": -96.856093
	},
	{
		"lat": 47.455451,
		"lng": -96.856246
	},
	{
		"lat": 47.455495,
		"lng": -96.856555
	},
	{
		"lat": 47.455515,
		"lng": -96.856764
	},
	{
		"lat": 47.455522,
		"lng": -96.856921
	},
	{
		"lat": 47.45552,
		"lng": -96.857447
	},
	{
		"lat": 47.455516,
		"lng": -96.857605
	},
	{
		"lat": 47.455474,
		"lng": -96.858128
	},
	{
		"lat": 47.455443,
		"lng": -96.85844
	},
	{
		"lat": 47.455379,
		"lng": -96.858904
	},
	{
		"lat": 47.455332,
		"lng": -96.859212
	},
	{
		"lat": 47.455321,
		"lng": -96.859263
	},
	{
		"lat": 47.455275,
		"lng": -96.859624
	},
	{
		"lat": 47.455275,
		"lng": -96.860045
	},
	{
		"lat": 47.455299,
		"lng": -96.860412
	},
	{
		"lat": 47.455318,
		"lng": -96.860567
	},
	{
		"lat": 47.45533,
		"lng": -96.860724
	},
	{
		"lat": 47.455351,
		"lng": -96.860878
	},
	{
		"lat": 47.455368,
		"lng": -96.861088
	},
	{
		"lat": 47.455408,
		"lng": -96.861768
	},
	{
		"lat": 47.455459,
		"lng": -96.862129
	},
	{
		"lat": 47.455484,
		"lng": -96.862228
	},
	{
		"lat": 47.455504,
		"lng": -96.862272
	},
	{
		"lat": 47.455646,
		"lng": -96.862511
	},
	{
		"lat": 47.455745,
		"lng": -96.862664
	},
	{
		"lat": 47.456028,
		"lng": -96.863072
	},
	{
		"lat": 47.456164,
		"lng": -96.863244
	},
	{
		"lat": 47.456282,
		"lng": -96.863367
	},
	{
		"lat": 47.456372,
		"lng": -96.863453
	},
	{
		"lat": 47.456439,
		"lng": -96.863495
	},
	{
		"lat": 47.456829,
		"lng": -96.863606
	},
	{
		"lat": 47.45701,
		"lng": -96.863619
	},
	{
		"lat": 47.457154,
		"lng": -96.863604
	},
	{
		"lat": 47.457294,
		"lng": -96.863552
	},
	{
		"lat": 47.45743,
		"lng": -96.86348
	},
	{
		"lat": 47.45772,
		"lng": -96.863266
	},
	{
		"lat": 47.457782,
		"lng": -96.86321
	},
	{
		"lat": 47.457868,
		"lng": -96.863115
	},
	{
		"lat": 47.458074,
		"lng": -96.862819
	},
	{
		"lat": 47.458143,
		"lng": -96.862697
	},
	{
		"lat": 47.458217,
		"lng": -96.862516
	},
	{
		"lat": 47.458273,
		"lng": -96.862322
	},
	{
		"lat": 47.458305,
		"lng": -96.862171
	},
	{
		"lat": 47.458317,
		"lng": -96.861792
	},
	{
		"lat": 47.458233,
		"lng": -96.860035
	},
	{
		"lat": 47.458218,
		"lng": -96.859932
	},
	{
		"lat": 47.458205,
		"lng": -96.859776
	},
	{
		"lat": 47.458204,
		"lng": -96.85967
	},
	{
		"lat": 47.458209,
		"lng": -96.859565
	},
	{
		"lat": 47.458249,
		"lng": -96.859042
	},
	{
		"lat": 47.458272,
		"lng": -96.858888
	},
	{
		"lat": 47.458295,
		"lng": -96.858788
	},
	{
		"lat": 47.458322,
		"lng": -96.858635
	},
	{
		"lat": 47.458407,
		"lng": -96.858288
	},
	{
		"lat": 47.458437,
		"lng": -96.858193
	},
	{
		"lat": 47.458462,
		"lng": -96.858094
	},
	{
		"lat": 47.458572,
		"lng": -96.857823
	},
	{
		"lat": 47.459019,
		"lng": -96.8568
	},
	{
		"lat": 47.459122,
		"lng": -96.856584
	},
	{
		"lat": 47.459187,
		"lng": -96.856458
	},
	{
		"lat": 47.459264,
		"lng": -96.85628
	},
	{
		"lat": 47.459484,
		"lng": -96.855863
	},
	{
		"lat": 47.459497,
		"lng": -96.855813
	},
	{
		"lat": 47.459538,
		"lng": -96.855503
	},
	{
		"lat": 47.459543,
		"lng": -96.855398
	},
	{
		"lat": 47.459538,
		"lng": -96.855347
	},
	{
		"lat": 47.45951,
		"lng": -96.85528
	},
	{
		"lat": 47.459445,
		"lng": -96.855122
	},
	{
		"lat": 47.459399,
		"lng": -96.854923
	},
	{
		"lat": 47.45942,
		"lng": -96.85488
	},
	{
		"lat": 47.459445,
		"lng": -96.854841
	},
	{
		"lat": 47.459529,
		"lng": -96.854741
	},
	{
		"lat": 47.459692,
		"lng": -96.854533
	},
	{
		"lat": 47.459994,
		"lng": -96.854244
	},
	{
		"lat": 47.460239,
		"lng": -96.854019
	},
	{
		"lat": 47.460403,
		"lng": -96.853908
	},
	{
		"lat": 47.460539,
		"lng": -96.853838
	},
	{
		"lat": 47.46061,
		"lng": -96.853818
	},
	{
		"lat": 47.460754,
		"lng": -96.853792
	},
	{
		"lat": 47.46097,
		"lng": -96.853804
	},
	{
		"lat": 47.461149,
		"lng": -96.853841
	},
	{
		"lat": 47.461289,
		"lng": -96.853894
	},
	{
		"lat": 47.461529,
		"lng": -96.854012
	},
	{
		"lat": 47.461696,
		"lng": -96.854112
	},
	{
		"lat": 47.461731,
		"lng": -96.854128
	},
	{
		"lat": 47.461828,
		"lng": -96.854197
	},
	{
		"lat": 47.461987,
		"lng": -96.854323
	},
	{
		"lat": 47.46207,
		"lng": -96.854424
	},
	{
		"lat": 47.46213,
		"lng": -96.854483
	},
	{
		"lat": 47.462237,
		"lng": -96.854624
	},
	{
		"lat": 47.462489,
		"lng": -96.854924
	},
	{
		"lat": 47.462784,
		"lng": -96.855312
	},
	{
		"lat": 47.462861,
		"lng": -96.855424
	},
	{
		"lat": 47.462932,
		"lng": -96.855543
	},
	{
		"lat": 47.462952,
		"lng": -96.855586
	},
	{
		"lat": 47.462998,
		"lng": -96.855729
	},
	{
		"lat": 47.463041,
		"lng": -96.855814
	},
	{
		"lat": 47.463091,
		"lng": -96.85589
	},
	{
		"lat": 47.463145,
		"lng": -96.855961
	},
	{
		"lat": 47.463175,
		"lng": -96.85599
	},
	{
		"lat": 47.463239,
		"lng": -96.856039
	},
	{
		"lat": 47.463308,
		"lng": -96.856072
	},
	{
		"lat": 47.463331,
		"lng": -96.856111
	},
	{
		"lat": 47.463372,
		"lng": -96.856197
	},
	{
		"lat": 47.463514,
		"lng": -96.856437
	},
	{
		"lat": 47.463709,
		"lng": -96.856748
	},
	{
		"lat": 47.464065,
		"lng": -96.857272
	},
	{
		"lat": 47.464171,
		"lng": -96.857415
	},
	{
		"lat": 47.464388,
		"lng": -96.857693
	},
	{
		"lat": 47.464501,
		"lng": -96.857825
	},
	{
		"lat": 47.464743,
		"lng": -96.858057
	},
	{
		"lat": 47.46502,
		"lng": -96.858304
	},
	{
		"lat": 47.465116,
		"lng": -96.858378
	},
	{
		"lat": 47.46526,
		"lng": -96.858514
	},
	{
		"lat": 47.465325,
		"lng": -96.858561
	},
	{
		"lat": 47.465449,
		"lng": -96.85867
	},
	{
		"lat": 47.465514,
		"lng": -96.858715
	},
	{
		"lat": 47.465577,
		"lng": -96.858767
	},
	{
		"lat": 47.465643,
		"lng": -96.858808
	},
	{
		"lat": 47.465707,
		"lng": -96.858857
	},
	{
		"lat": 47.465838,
		"lng": -96.858946
	},
	{
		"lat": 47.465901,
		"lng": -96.858998
	},
	{
		"lat": 47.46623,
		"lng": -96.859215
	},
	{
		"lat": 47.466533,
		"lng": -96.859388
	},
	{
		"lat": 47.466844,
		"lng": -96.85953
	},
	{
		"lat": 47.466944,
		"lng": -96.859587
	},
	{
		"lat": 47.466979,
		"lng": -96.859602
	},
	{
		"lat": 47.467446,
		"lng": -96.859888
	},
	{
		"lat": 47.467541,
		"lng": -96.859961
	},
	{
		"lat": 47.467707,
		"lng": -96.860065
	},
	{
		"lat": 47.467845,
		"lng": -96.860129
	},
	{
		"lat": 47.468161,
		"lng": -96.860247
	},
	{
		"lat": 47.468409,
		"lng": -96.860319
	},
	{
		"lat": 47.468837,
		"lng": -96.860424
	},
	{
		"lat": 47.468908,
		"lng": -96.860446
	},
	{
		"lat": 47.469047,
		"lng": -96.860473
	},
	{
		"lat": 47.469267,
		"lng": -96.860515
	},
	{
		"lat": 47.469411,
		"lng": -96.860528
	},
	{
		"lat": 47.470062,
		"lng": -96.860557
	},
	{
		"lat": 47.470125,
		"lng": -96.860537
	},
	{
		"lat": 47.470172,
		"lng": -96.860487
	},
	{
		"lat": 47.470244,
		"lng": -96.860411
	},
	{
		"lat": 47.470274,
		"lng": -96.8604
	},
	{
		"lat": 47.470325,
		"lng": -96.860483
	},
	{
		"lat": 47.470376,
		"lng": -96.860556
	},
	{
		"lat": 47.470406,
		"lng": -96.860583
	},
	{
		"lat": 47.470759,
		"lng": -96.860697
	},
	{
		"lat": 47.470972,
		"lng": -96.860755
	},
	{
		"lat": 47.471437,
		"lng": -96.86086
	},
	{
		"lat": 47.471793,
		"lng": -96.860954
	},
	{
		"lat": 47.472082,
		"lng": -96.860991
	},
	{
		"lat": 47.472298,
		"lng": -96.861009
	},
	{
		"lat": 47.472443,
		"lng": -96.861009
	},
	{
		"lat": 47.472588,
		"lng": -96.861002
	},
	{
		"lat": 47.472768,
		"lng": -96.860977
	},
	{
		"lat": 47.472874,
		"lng": -96.860943
	},
	{
		"lat": 47.472977,
		"lng": -96.860893
	},
	{
		"lat": 47.473209,
		"lng": -96.860748
	},
	{
		"lat": 47.473241,
		"lng": -96.860723
	},
	{
		"lat": 47.47339,
		"lng": -96.860573
	},
	{
		"lat": 47.473475,
		"lng": -96.860475
	},
	{
		"lat": 47.473604,
		"lng": -96.860291
	},
	{
		"lat": 47.473676,
		"lng": -96.860172
	},
	{
		"lat": 47.473734,
		"lng": -96.860039
	},
	{
		"lat": 47.473768,
		"lng": -96.859946
	},
	{
		"lat": 47.47378,
		"lng": -96.859896
	},
	{
		"lat": 47.473827,
		"lng": -96.859753
	},
	{
		"lat": 47.473871,
		"lng": -96.859553
	},
	{
		"lat": 47.473892,
		"lng": -96.859398
	},
	{
		"lat": 47.4739,
		"lng": -96.859293
	},
	{
		"lat": 47.473923,
		"lng": -96.858609
	},
	{
		"lat": 47.47392,
		"lng": -96.858559
	},
	{
		"lat": 47.473883,
		"lng": -96.858468
	},
	{
		"lat": 47.473823,
		"lng": -96.858277
	},
	{
		"lat": 47.473726,
		"lng": -96.857937
	},
	{
		"lat": 47.473715,
		"lng": -96.857887
	},
	{
		"lat": 47.473707,
		"lng": -96.857782
	},
	{
		"lat": 47.473715,
		"lng": -96.857678
	},
	{
		"lat": 47.473739,
		"lng": -96.857578
	},
	{
		"lat": 47.473779,
		"lng": -96.85749
	},
	{
		"lat": 47.473824,
		"lng": -96.857408
	},
	{
		"lat": 47.473965,
		"lng": -96.857243
	},
	{
		"lat": 47.473989,
		"lng": -96.857204
	},
	{
		"lat": 47.474048,
		"lng": -96.857071
	},
	{
		"lat": 47.474064,
		"lng": -96.857023
	},
	{
		"lat": 47.474121,
		"lng": -96.856889
	},
	{
		"lat": 47.474185,
		"lng": -96.856762
	},
	{
		"lat": 47.474318,
		"lng": -96.856448
	},
	{
		"lat": 47.474402,
		"lng": -96.856277
	},
	{
		"lat": 47.47446,
		"lng": -96.856143
	},
	{
		"lat": 47.47469,
		"lng": -96.855736
	},
	{
		"lat": 47.474801,
		"lng": -96.855528
	},
	{
		"lat": 47.474972,
		"lng": -96.855188
	},
	{
		"lat": 47.475444,
		"lng": -96.854461
	},
	{
		"lat": 47.475905,
		"lng": -96.85379
	},
	{
		"lat": 47.476205,
		"lng": -96.85341
	},
	{
		"lat": 47.476339,
		"lng": -96.853232
	},
	{
		"lat": 47.476452,
		"lng": -96.853102
	},
	{
		"lat": 47.476515,
		"lng": -96.853049
	},
	{
		"lat": 47.476663,
		"lng": -96.852897
	},
	{
		"lat": 47.476805,
		"lng": -96.852734
	},
	{
		"lat": 47.476954,
		"lng": -96.852585
	},
	{
		"lat": 47.477107,
		"lng": -96.852445
	},
	{
		"lat": 47.477235,
		"lng": -96.852346
	},
	{
		"lat": 47.477326,
		"lng": -96.852293
	},
	{
		"lat": 47.477391,
		"lng": -96.852247
	},
	{
		"lat": 47.477697,
		"lng": -96.852088
	},
	{
		"lat": 47.477908,
		"lng": -96.85201
	},
	{
		"lat": 47.478155,
		"lng": -96.851929
	},
	{
		"lat": 47.47837,
		"lng": -96.851888
	},
	{
		"lat": 47.478696,
		"lng": -96.851896
	},
	{
		"lat": 47.478912,
		"lng": -96.851911
	},
	{
		"lat": 47.479055,
		"lng": -96.851946
	},
	{
		"lat": 47.479159,
		"lng": -96.85199
	},
	{
		"lat": 47.479228,
		"lng": -96.852025
	},
	{
		"lat": 47.47946,
		"lng": -96.852173
	},
	{
		"lat": 47.479556,
		"lng": -96.852245
	},
	{
		"lat": 47.479648,
		"lng": -96.852328
	},
	{
		"lat": 47.479693,
		"lng": -96.852357
	},
	{
		"lat": 47.479899,
		"lng": -96.852566
	},
	{
		"lat": 47.47999,
		"lng": -96.852652
	},
	{
		"lat": 47.480248,
		"lng": -96.853022
	},
	{
		"lat": 47.480418,
		"lng": -96.853296
	},
	{
		"lat": 47.480484,
		"lng": -96.85342
	},
	{
		"lat": 47.48061,
		"lng": -96.8538
	},
	{
		"lat": 47.480681,
		"lng": -96.854042
	},
	{
		"lat": 47.480718,
		"lng": -96.85419
	},
	{
		"lat": 47.480763,
		"lng": -96.854334
	},
	{
		"lat": 47.480785,
		"lng": -96.854435
	},
	{
		"lat": 47.48086,
		"lng": -96.85473
	},
	{
		"lat": 47.48104,
		"lng": -96.855531
	},
	{
		"lat": 47.481077,
		"lng": -96.855733
	},
	{
		"lat": 47.481114,
		"lng": -96.855882
	},
	{
		"lat": 47.481127,
		"lng": -96.855985
	},
	{
		"lat": 47.48115,
		"lng": -96.856085
	},
	{
		"lat": 47.481176,
		"lng": -96.856346
	},
	{
		"lat": 47.48121,
		"lng": -96.85655
	},
	{
		"lat": 47.481235,
		"lng": -96.856864
	},
	{
		"lat": 47.481243,
		"lng": -96.856915
	},
	{
		"lat": 47.481193,
		"lng": -96.857053
	},
	{
		"lat": 47.481152,
		"lng": -96.857199
	},
	{
		"lat": 47.481146,
		"lng": -96.857304
	},
	{
		"lat": 47.481151,
		"lng": -96.857672
	},
	{
		"lat": 47.481147,
		"lng": -96.857777
	},
	{
		"lat": 47.481154,
		"lng": -96.857829
	},
	{
		"lat": 47.481146,
		"lng": -96.858092
	},
	{
		"lat": 47.481125,
		"lng": -96.858459
	},
	{
		"lat": 47.481081,
		"lng": -96.858822
	},
	{
		"lat": 47.481063,
		"lng": -96.858924
	},
	{
		"lat": 47.481027,
		"lng": -96.859182
	},
	{
		"lat": 47.480916,
		"lng": -96.859793
	},
	{
		"lat": 47.480876,
		"lng": -96.85994
	},
	{
		"lat": 47.480858,
		"lng": -96.859985
	},
	{
		"lat": 47.480832,
		"lng": -96.860084
	},
	{
		"lat": 47.480656,
		"lng": -96.860543
	},
	{
		"lat": 47.48061,
		"lng": -96.860625
	},
	{
		"lat": 47.480509,
		"lng": -96.860776
	},
	{
		"lat": 47.480427,
		"lng": -96.860878
	},
	{
		"lat": 47.480367,
		"lng": -96.860937
	},
	{
		"lat": 47.480282,
		"lng": -96.861037
	},
	{
		"lat": 47.480163,
		"lng": -96.861156
	},
	{
		"lat": 47.480054,
		"lng": -96.861293
	},
	{
		"lat": 47.479799,
		"lng": -96.86159
	},
	{
		"lat": 47.479507,
		"lng": -96.861981
	},
	{
		"lat": 47.479341,
		"lng": -96.862184
	},
	{
		"lat": 47.479143,
		"lng": -96.862413
	},
	{
		"lat": 47.478966,
		"lng": -96.862596
	},
	{
		"lat": 47.478637,
		"lng": -96.862921
	},
	{
		"lat": 47.478541,
		"lng": -96.862994
	},
	{
		"lat": 47.47848,
		"lng": -96.863052
	},
	{
		"lat": 47.478252,
		"lng": -96.863209
	},
	{
		"lat": 47.478099,
		"lng": -96.86335
	},
	{
		"lat": 47.478067,
		"lng": -96.863374
	},
	{
		"lat": 47.47789,
		"lng": -96.863556
	},
	{
		"lat": 47.477401,
		"lng": -96.8641
	},
	{
		"lat": 47.477213,
		"lng": -96.864346
	},
	{
		"lat": 47.477136,
		"lng": -96.864457
	},
	{
		"lat": 47.47702,
		"lng": -96.86466
	},
	{
		"lat": 47.476933,
		"lng": -96.864827
	},
	{
		"lat": 47.476894,
		"lng": -96.864916
	},
	{
		"lat": 47.476822,
		"lng": -96.865158
	},
	{
		"lat": 47.476776,
		"lng": -96.865355
	},
	{
		"lat": 47.476725,
		"lng": -96.865716
	},
	{
		"lat": 47.476697,
		"lng": -96.866081
	},
	{
		"lat": 47.476689,
		"lng": -96.866344
	},
	{
		"lat": 47.47669,
		"lng": -96.866607
	},
	{
		"lat": 47.476695,
		"lng": -96.866765
	},
	{
		"lat": 47.476707,
		"lng": -96.866922
	},
	{
		"lat": 47.476738,
		"lng": -96.867073
	},
	{
		"lat": 47.476801,
		"lng": -96.867262
	},
	{
		"lat": 47.476839,
		"lng": -96.867352
	},
	{
		"lat": 47.476854,
		"lng": -96.8674
	},
	{
		"lat": 47.476914,
		"lng": -96.867532
	},
	{
		"lat": 47.476979,
		"lng": -96.867657
	},
	{
		"lat": 47.477073,
		"lng": -96.867818
	},
	{
		"lat": 47.477127,
		"lng": -96.867897
	},
	{
		"lat": 47.477377,
		"lng": -96.868267
	},
	{
		"lat": 47.477489,
		"lng": -96.868401
	},
	{
		"lat": 47.477579,
		"lng": -96.86849
	},
	{
		"lat": 47.477614,
		"lng": -96.868493
	},
	{
		"lat": 47.477756,
		"lng": -96.868458
	},
	{
		"lat": 47.477828,
		"lng": -96.868453
	},
	{
		"lat": 47.4779,
		"lng": -96.868438
	},
	{
		"lat": 47.478008,
		"lng": -96.868441
	},
	{
		"lat": 47.478116,
		"lng": -96.868454
	},
	{
		"lat": 47.478185,
		"lng": -96.868484
	},
	{
		"lat": 47.478221,
		"lng": -96.868492
	},
	{
		"lat": 47.478473,
		"lng": -96.868519
	},
	{
		"lat": 47.478725,
		"lng": -96.86849
	},
	{
		"lat": 47.478869,
		"lng": -96.868463
	},
	{
		"lat": 47.47901,
		"lng": -96.868415
	},
	{
		"lat": 47.479077,
		"lng": -96.868377
	},
	{
		"lat": 47.479142,
		"lng": -96.868329
	},
	{
		"lat": 47.479232,
		"lng": -96.868242
	},
	{
		"lat": 47.479344,
		"lng": -96.868109
	},
	{
		"lat": 47.479512,
		"lng": -96.867833
	},
	{
		"lat": 47.479554,
		"lng": -96.867748
	},
	{
		"lat": 47.47963,
		"lng": -96.867568
	},
	{
		"lat": 47.479674,
		"lng": -96.867484
	},
	{
		"lat": 47.479781,
		"lng": -96.86721
	},
	{
		"lat": 47.479802,
		"lng": -96.867167
	},
	{
		"lat": 47.479852,
		"lng": -96.867027
	},
	{
		"lat": 47.47993,
		"lng": -96.86685
	},
	{
		"lat": 47.480042,
		"lng": -96.866579
	},
	{
		"lat": 47.480106,
		"lng": -96.866452
	},
	{
		"lat": 47.480278,
		"lng": -96.866182
	},
	{
		"lat": 47.480336,
		"lng": -96.866119
	},
	{
		"lat": 47.480416,
		"lng": -96.866013
	},
	{
		"lat": 47.480505,
		"lng": -96.865921
	},
	{
		"lat": 47.480601,
		"lng": -96.865849
	},
	{
		"lat": 47.480635,
		"lng": -96.865829
	},
	{
		"lat": 47.480919,
		"lng": -96.865599
	},
	{
		"lat": 47.481163,
		"lng": -96.865372
	},
	{
		"lat": 47.481507,
		"lng": -96.864987
	},
	{
		"lat": 47.481667,
		"lng": -96.864864
	},
	{
		"lat": 47.481881,
		"lng": -96.864667
	},
	{
		"lat": 47.482163,
		"lng": -96.864431
	},
	{
		"lat": 47.482324,
		"lng": -96.864312
	},
	{
		"lat": 47.482386,
		"lng": -96.864257
	},
	{
		"lat": 47.482643,
		"lng": -96.864064
	},
	{
		"lat": 47.482779,
		"lng": -96.863992
	},
	{
		"lat": 47.483148,
		"lng": -96.863773
	},
	{
		"lat": 47.483278,
		"lng": -96.863681
	},
	{
		"lat": 47.483345,
		"lng": -96.863643
	},
	{
		"lat": 47.483663,
		"lng": -96.863392
	},
	{
		"lat": 47.483723,
		"lng": -96.863333
	},
	{
		"lat": 47.483809,
		"lng": -96.863236
	},
	{
		"lat": 47.483964,
		"lng": -96.863015
	},
	{
		"lat": 47.483988,
		"lng": -96.862975
	},
	{
		"lat": 47.484078,
		"lng": -96.862747
	},
	{
		"lat": 47.484154,
		"lng": -96.862395
	},
	{
		"lat": 47.484187,
		"lng": -96.86219
	},
	{
		"lat": 47.484209,
		"lng": -96.862089
	},
	{
		"lat": 47.484237,
		"lng": -96.861883
	},
	{
		"lat": 47.484256,
		"lng": -96.861621
	},
	{
		"lat": 47.484272,
		"lng": -96.861305
	},
	{
		"lat": 47.484264,
		"lng": -96.861148
	},
	{
		"lat": 47.48424,
		"lng": -96.86094
	},
	{
		"lat": 47.484174,
		"lng": -96.860841
	},
	{
		"lat": 47.484129,
		"lng": -96.860759
	},
	{
		"lat": 47.483997,
		"lng": -96.860444
	},
	{
		"lat": 47.483869,
		"lng": -96.860066
	},
	{
		"lat": 47.483827,
		"lng": -96.859921
	},
	{
		"lat": 47.483818,
		"lng": -96.85987
	},
	{
		"lat": 47.483736,
		"lng": -96.859578
	},
	{
		"lat": 47.483702,
		"lng": -96.859485
	},
	{
		"lat": 47.48366,
		"lng": -96.85934
	},
	{
		"lat": 47.483605,
		"lng": -96.85909
	},
	{
		"lat": 47.483579,
		"lng": -96.858936
	},
	{
		"lat": 47.483567,
		"lng": -96.858779
	},
	{
		"lat": 47.483564,
		"lng": -96.858621
	},
	{
		"lat": 47.483566,
		"lng": -96.858569
	},
	{
		"lat": 47.48359,
		"lng": -96.858414
	},
	{
		"lat": 47.48355,
		"lng": -96.858297
	},
	{
		"lat": 47.483448,
		"lng": -96.85796
	},
	{
		"lat": 47.483347,
		"lng": -96.857565
	},
	{
		"lat": 47.483301,
		"lng": -96.857365
	},
	{
		"lat": 47.483271,
		"lng": -96.857213
	},
	{
		"lat": 47.483204,
		"lng": -96.856803
	},
	{
		"lat": 47.483158,
		"lng": -96.856333
	},
	{
		"lat": 47.483148,
		"lng": -96.85607
	},
	{
		"lat": 47.483154,
		"lng": -96.855702
	},
	{
		"lat": 47.483189,
		"lng": -96.855283
	},
	{
		"lat": 47.483206,
		"lng": -96.855181
	},
	{
		"lat": 47.48325,
		"lng": -96.855037
	},
	{
		"lat": 47.48327,
		"lng": -96.854936
	},
	{
		"lat": 47.483338,
		"lng": -96.854692
	},
	{
		"lat": 47.48339,
		"lng": -96.854439
	},
	{
		"lat": 47.483425,
		"lng": -96.85429
	},
	{
		"lat": 47.483471,
		"lng": -96.854147
	},
	{
		"lat": 47.48349,
		"lng": -96.854102
	},
	{
		"lat": 47.483535,
		"lng": -96.85402
	},
	{
		"lat": 47.483576,
		"lng": -96.853933
	},
	{
		"lat": 47.48365,
		"lng": -96.853817
	},
	{
		"lat": 47.484011,
		"lng": -96.853301
	},
	{
		"lat": 47.484122,
		"lng": -96.853165
	},
	{
		"lat": 47.484322,
		"lng": -96.85294
	},
	{
		"lat": 47.484376,
		"lng": -96.852901
	},
	{
		"lat": 47.484387,
		"lng": -96.852893
	},
	{
		"lat": 47.484481,
		"lng": -96.852813
	},
	{
		"lat": 47.48451,
		"lng": -96.852782
	},
	{
		"lat": 47.484573,
		"lng": -96.852745
	},
	{
		"lat": 47.484667,
		"lng": -96.852664
	},
	{
		"lat": 47.484731,
		"lng": -96.852616
	},
	{
		"lat": 47.4848,
		"lng": -96.852583
	},
	{
		"lat": 47.484865,
		"lng": -96.852539
	},
	{
		"lat": 47.485278,
		"lng": -96.85234
	},
	{
		"lat": 47.485382,
		"lng": -96.852297
	},
	{
		"lat": 47.485559,
		"lng": -96.852243
	},
	{
		"lat": 47.485846,
		"lng": -96.852185
	},
	{
		"lat": 47.485954,
		"lng": -96.852175
	},
	{
		"lat": 47.486351,
		"lng": -96.852158
	},
	{
		"lat": 47.48653,
		"lng": -96.852203
	},
	{
		"lat": 47.486668,
		"lng": -96.852263
	},
	{
		"lat": 47.486769,
		"lng": -96.852321
	},
	{
		"lat": 47.486964,
		"lng": -96.852461
	},
	{
		"lat": 47.487021,
		"lng": -96.852524
	},
	{
		"lat": 47.487121,
		"lng": -96.852677
	},
	{
		"lat": 47.487222,
		"lng": -96.852895
	},
	{
		"lat": 47.487358,
		"lng": -96.853141
	},
	{
		"lat": 47.487475,
		"lng": -96.853407
	},
	{
		"lat": 47.487562,
		"lng": -96.853637
	},
	{
		"lat": 47.487598,
		"lng": -96.853841
	},
	{
		"lat": 47.487657,
		"lng": -96.85409
	},
	{
		"lat": 47.487742,
		"lng": -96.85438
	},
	{
		"lat": 47.487818,
		"lng": -96.854618
	},
	{
		"lat": 47.487911,
		"lng": -96.855017
	},
	{
		"lat": 47.487949,
		"lng": -96.85522
	},
	{
		"lat": 47.48802,
		"lng": -96.85579
	},
	{
		"lat": 47.488055,
		"lng": -96.856101
	},
	{
		"lat": 47.488065,
		"lng": -96.856152
	},
	{
		"lat": 47.488103,
		"lng": -96.856463
	},
	{
		"lat": 47.488121,
		"lng": -96.856565
	},
	{
		"lat": 47.488149,
		"lng": -96.856662
	},
	{
		"lat": 47.488183,
		"lng": -96.856755
	},
	{
		"lat": 47.48821,
		"lng": -96.857015
	},
	{
		"lat": 47.488225,
		"lng": -96.857118
	},
	{
		"lat": 47.488235,
		"lng": -96.857222
	},
	{
		"lat": 47.488271,
		"lng": -96.857371
	},
	{
		"lat": 47.488299,
		"lng": -96.857523
	},
	{
		"lat": 47.488344,
		"lng": -96.857724
	},
	{
		"lat": 47.488395,
		"lng": -96.858031
	},
	{
		"lat": 47.48842,
		"lng": -96.858129
	},
	{
		"lat": 47.488459,
		"lng": -96.858218
	},
	{
		"lat": 47.488527,
		"lng": -96.858342
	},
	{
		"lat": 47.488602,
		"lng": -96.858453
	},
	{
		"lat": 47.488643,
		"lng": -96.858656
	},
	{
		"lat": 47.488633,
		"lng": -96.858759
	},
	{
		"lat": 47.488629,
		"lng": -96.858865
	},
	{
		"lat": 47.488635,
		"lng": -96.85897
	},
	{
		"lat": 47.488673,
		"lng": -96.859173
	},
	{
		"lat": 47.488741,
		"lng": -96.859359
	},
	{
		"lat": 47.488803,
		"lng": -96.859549
	},
	{
		"lat": 47.488863,
		"lng": -96.859797
	},
	{
		"lat": 47.488893,
		"lng": -96.859949
	},
	{
		"lat": 47.488917,
		"lng": -96.860103
	},
	{
		"lat": 47.488998,
		"lng": -96.860452
	},
	{
		"lat": 47.489001,
		"lng": -96.860609
	},
	{
		"lat": 47.489015,
		"lng": -96.860765
	},
	{
		"lat": 47.489037,
		"lng": -96.860866
	},
	{
		"lat": 47.489091,
		"lng": -96.861003
	},
	{
		"lat": 47.489152,
		"lng": -96.861134
	},
	{
		"lat": 47.489179,
		"lng": -96.861287
	},
	{
		"lat": 47.489208,
		"lng": -96.861384
	},
	{
		"lat": 47.489247,
		"lng": -96.86164
	},
	{
		"lat": 47.48926,
		"lng": -96.86169
	},
	{
		"lat": 47.4893,
		"lng": -96.861778
	},
	{
		"lat": 47.489386,
		"lng": -96.861946
	},
	{
		"lat": 47.489425,
		"lng": -96.862035
	},
	{
		"lat": 47.489454,
		"lng": -96.862131
	},
	{
		"lat": 47.489514,
		"lng": -96.862435
	},
	{
		"lat": 47.489564,
		"lng": -96.862632
	},
	{
		"lat": 47.489704,
		"lng": -96.863001
	},
	{
		"lat": 47.489683,
		"lng": -96.863154
	},
	{
		"lat": 47.48968,
		"lng": -96.863206
	},
	{
		"lat": 47.489685,
		"lng": -96.863417
	},
	{
		"lat": 47.489695,
		"lng": -96.863467
	},
	{
		"lat": 47.489711,
		"lng": -96.863514
	},
	{
		"lat": 47.489733,
		"lng": -96.863556
	},
	{
		"lat": 47.489791,
		"lng": -96.86369
	},
	{
		"lat": 47.489911,
		"lng": -96.863886
	},
	{
		"lat": 47.489963,
		"lng": -96.863959
	},
	{
		"lat": 47.490193,
		"lng": -96.864351
	},
	{
		"lat": 47.490453,
		"lng": -96.864718
	},
	{
		"lat": 47.490543,
		"lng": -96.864806
	},
	{
		"lat": 47.49067,
		"lng": -96.864906
	},
	{
		"lat": 47.49074,
		"lng": -96.864932
	},
	{
		"lat": 47.490794,
		"lng": -96.864961
	},
	{
		"lat": 47.491005,
		"lng": -96.865034
	},
	{
		"lat": 47.491184,
		"lng": -96.865071
	},
	{
		"lat": 47.491328,
		"lng": -96.865087
	},
	{
		"lat": 47.491544,
		"lng": -96.865068
	},
	{
		"lat": 47.491651,
		"lng": -96.86504
	},
	{
		"lat": 47.491824,
		"lng": -96.864969
	},
	{
		"lat": 47.49189,
		"lng": -96.864926
	},
	{
		"lat": 47.491987,
		"lng": -96.864852
	},
	{
		"lat": 47.492017,
		"lng": -96.864823
	},
	{
		"lat": 47.492186,
		"lng": -96.864626
	},
	{
		"lat": 47.492233,
		"lng": -96.864545
	},
	{
		"lat": 47.492253,
		"lng": -96.864499
	},
	{
		"lat": 47.492355,
		"lng": -96.864403
	},
	{
		"lat": 47.492561,
		"lng": -96.863966
	},
	{
		"lat": 47.492587,
		"lng": -96.863615
	},
	{
		"lat": 47.492579,
		"lng": -96.863302
	},
	{
		"lat": 47.492488,
		"lng": -96.862876
	},
	{
		"lat": 47.492425,
		"lng": -96.862725
	},
	{
		"lat": 47.492051,
		"lng": -96.862121
	},
	{
		"lat": 47.492026,
		"lng": -96.861526
	},
	{
		"lat": 47.492032,
		"lng": -96.861422
	},
	{
		"lat": 47.492056,
		"lng": -96.861214
	},
	{
		"lat": 47.492087,
		"lng": -96.861063
	},
	{
		"lat": 47.492123,
		"lng": -96.860914
	},
	{
		"lat": 47.49217,
		"lng": -96.860773
	},
	{
		"lat": 47.492182,
		"lng": -96.860723
	},
	{
		"lat": 47.492316,
		"lng": -96.860351
	},
	{
		"lat": 47.492442,
		"lng": -96.860031
	},
	{
		"lat": 47.492473,
		"lng": -96.859936
	},
	{
		"lat": 47.492512,
		"lng": -96.859848
	},
	{
		"lat": 47.492618,
		"lng": -96.859572
	},
	{
		"lat": 47.492676,
		"lng": -96.859379
	},
	{
		"lat": 47.49271,
		"lng": -96.85923
	},
	{
		"lat": 47.49279,
		"lng": -96.858936
	},
	{
		"lat": 47.492839,
		"lng": -96.858795
	},
	{
		"lat": 47.492883,
		"lng": -96.858652
	},
	{
		"lat": 47.492953,
		"lng": -96.858468
	},
	{
		"lat": 47.493001,
		"lng": -96.858327
	},
	{
		"lat": 47.49307,
		"lng": -96.858142
	},
	{
		"lat": 47.493098,
		"lng": -96.858045
	},
	{
		"lat": 47.493198,
		"lng": -96.857766
	},
	{
		"lat": 47.493296,
		"lng": -96.857427
	},
	{
		"lat": 47.493359,
		"lng": -96.857238
	},
	{
		"lat": 47.493406,
		"lng": -96.857039
	},
	{
		"lat": 47.493449,
		"lng": -96.856895
	},
	{
		"lat": 47.493499,
		"lng": -96.856697
	},
	{
		"lat": 47.493551,
		"lng": -96.856558
	},
	{
		"lat": 47.493607,
		"lng": -96.856424
	},
	{
		"lat": 47.493817,
		"lng": -96.856126
	},
	{
		"lat": 47.493894,
		"lng": -96.856023
	},
	{
		"lat": 47.493954,
		"lng": -96.855963
	},
	{
		"lat": 47.49402,
		"lng": -96.855922
	},
	{
		"lat": 47.494125,
		"lng": -96.855882
	},
	{
		"lat": 47.494301,
		"lng": -96.855829
	},
	{
		"lat": 47.494335,
		"lng": -96.855809
	},
	{
		"lat": 47.494439,
		"lng": -96.855765
	},
	{
		"lat": 47.494572,
		"lng": -96.855681
	},
	{
		"lat": 47.494694,
		"lng": -96.855571
	},
	{
		"lat": 47.495026,
		"lng": -96.855255
	},
	{
		"lat": 47.495172,
		"lng": -96.8551
	},
	{
		"lat": 47.495262,
		"lng": -96.855011
	},
	{
		"lat": 47.495417,
		"lng": -96.854792
	},
	{
		"lat": 47.495636,
		"lng": -96.85444
	},
	{
		"lat": 47.49568,
		"lng": -96.854357
	},
	{
		"lat": 47.495796,
		"lng": -96.854092
	},
	{
		"lat": 47.495838,
		"lng": -96.854007
	},
	{
		"lat": 47.495875,
		"lng": -96.853917
	},
	{
		"lat": 47.495901,
		"lng": -96.853879
	},
	{
		"lat": 47.49605,
		"lng": -96.853584
	},
	{
		"lat": 47.496131,
		"lng": -96.853349
	},
	{
		"lat": 47.496158,
		"lng": -96.853251
	},
	{
		"lat": 47.496166,
		"lng": -96.8532
	},
	{
		"lat": 47.496193,
		"lng": -96.853102
	},
	{
		"lat": 47.496338,
		"lng": -96.852679
	},
	{
		"lat": 47.496364,
		"lng": -96.852581
	},
	{
		"lat": 47.496418,
		"lng": -96.852444
	},
	{
		"lat": 47.496464,
		"lng": -96.852301
	},
	{
		"lat": 47.4965,
		"lng": -96.85221
	},
	{
		"lat": 47.49653,
		"lng": -96.852114
	},
	{
		"lat": 47.496585,
		"lng": -96.851978
	},
	{
		"lat": 47.496675,
		"lng": -96.851692
	},
	{
		"lat": 47.496732,
		"lng": -96.851535
	},
	{
		"lat": 47.496788,
		"lng": -96.851341
	},
	{
		"lat": 47.496908,
		"lng": -96.850846
	},
	{
		"lat": 47.496955,
		"lng": -96.850704
	},
	{
		"lat": 47.497026,
		"lng": -96.850521
	},
	{
		"lat": 47.497056,
		"lng": -96.850427
	},
	{
		"lat": 47.497255,
		"lng": -96.849988
	},
	{
		"lat": 47.497311,
		"lng": -96.849853
	},
	{
		"lat": 47.497398,
		"lng": -96.849686
	},
	{
		"lat": 47.497585,
		"lng": -96.849368
	},
	{
		"lat": 47.497778,
		"lng": -96.849089
	},
	{
		"lat": 47.497815,
		"lng": -96.849035
	},
	{
		"lat": 47.4979,
		"lng": -96.848933
	},
	{
		"lat": 47.497927,
		"lng": -96.848901
	},
	{
		"lat": 47.497968,
		"lng": -96.848865
	},
	{
		"lat": 47.498051,
		"lng": -96.848793
	},
	{
		"lat": 47.498084,
		"lng": -96.848771
	},
	{
		"lat": 47.498227,
		"lng": -96.848744
	},
	{
		"lat": 47.498299,
		"lng": -96.848737
	},
	{
		"lat": 47.498479,
		"lng": -96.848735
	},
	{
		"lat": 47.498623,
		"lng": -96.848755
	},
	{
		"lat": 47.498867,
		"lng": -96.848854
	},
	{
		"lat": 47.498969,
		"lng": -96.848908
	},
	{
		"lat": 47.498991,
		"lng": -96.848923
	},
	{
		"lat": 47.499067,
		"lng": -96.848974
	},
	{
		"lat": 47.499131,
		"lng": -96.849024
	},
	{
		"lat": 47.499247,
		"lng": -96.84915
	},
	{
		"lat": 47.499346,
		"lng": -96.849304
	},
	{
		"lat": 47.499545,
		"lng": -96.849678
	},
	{
		"lat": 47.499689,
		"lng": -96.849981
	},
	{
		"lat": 47.499726,
		"lng": -96.850071
	},
	{
		"lat": 47.499812,
		"lng": -96.850241
	},
	{
		"lat": 47.499858,
		"lng": -96.850384
	},
	{
		"lat": 47.499901,
		"lng": -96.850477
	},
	{
		"lat": 47.499922,
		"lng": -96.850523
	},
	{
		"lat": 47.499979,
		"lng": -96.850645
	},
	{
		"lat": 47.499986,
		"lng": -96.850664
	},
	{
		"lat": 47.500006,
		"lng": -96.850712
	},
	{
		"lat": 47.500015,
		"lng": -96.850735
	},
	{
		"lat": 47.500034,
		"lng": -96.850782
	},
	{
		"lat": 47.50004,
		"lng": -96.850805
	},
	{
		"lat": 47.500048,
		"lng": -96.85083
	},
	{
		"lat": 47.500146,
		"lng": -96.851114
	},
	{
		"lat": 47.500204,
		"lng": -96.851363
	},
	{
		"lat": 47.500224,
		"lng": -96.851407
	},
	{
		"lat": 47.500256,
		"lng": -96.851502
	},
	{
		"lat": 47.500286,
		"lng": -96.851653
	},
	{
		"lat": 47.500301,
		"lng": -96.851701
	},
	{
		"lat": 47.500358,
		"lng": -96.851852
	},
	{
		"lat": 47.500423,
		"lng": -96.852025
	},
	{
		"lat": 47.500447,
		"lng": -96.852124
	},
	{
		"lat": 47.500532,
		"lng": -96.852357
	},
	{
		"lat": 47.500623,
		"lng": -96.852584
	},
	{
		"lat": 47.500667,
		"lng": -96.852667
	},
	{
		"lat": 47.500715,
		"lng": -96.852746
	},
	{
		"lat": 47.500869,
		"lng": -96.85297
	},
	{
		"lat": 47.500949,
		"lng": -96.853076
	},
	{
		"lat": 47.50104,
		"lng": -96.853162
	},
	{
		"lat": 47.501199,
		"lng": -96.853287
	},
	{
		"lat": 47.501267,
		"lng": -96.853323
	},
	{
		"lat": 47.501333,
		"lng": -96.853366
	},
	{
		"lat": 47.501504,
		"lng": -96.853454
	},
	{
		"lat": 47.501571,
		"lng": -96.853495
	},
	{
		"lat": 47.501817,
		"lng": -96.853583
	},
	{
		"lat": 47.501888,
		"lng": -96.853601
	},
	{
		"lat": 47.502103,
		"lng": -96.853642
	},
	{
		"lat": 47.502247,
		"lng": -96.85366
	},
	{
		"lat": 47.502464,
		"lng": -96.853659
	},
	{
		"lat": 47.502636,
		"lng": -96.853644
	},
	{
		"lat": 47.50279,
		"lng": -96.853631
	},
	{
		"lat": 47.50286,
		"lng": -96.853609
	},
	{
		"lat": 47.502932,
		"lng": -96.853595
	},
	{
		"lat": 47.503221,
		"lng": -96.853561
	},
	{
		"lat": 47.5034,
		"lng": -96.853529
	},
	{
		"lat": 47.503505,
		"lng": -96.853492
	},
	{
		"lat": 47.503613,
		"lng": -96.853473
	},
	{
		"lat": 47.503649,
		"lng": -96.853462
	},
	{
		"lat": 47.503682,
		"lng": -96.853443
	},
	{
		"lat": 47.503843,
		"lng": -96.853392
	},
	{
		"lat": 47.503982,
		"lng": -96.853333
	},
	{
		"lat": 47.504015,
		"lng": -96.853311
	},
	{
		"lat": 47.50422,
		"lng": -96.85321
	},
	{
		"lat": 47.50429,
		"lng": -96.853183
	},
	{
		"lat": 47.504528,
		"lng": -96.853058
	},
	{
		"lat": 47.504667,
		"lng": -96.852996
	},
	{
		"lat": 47.504878,
		"lng": -96.852929
	},
	{
		"lat": 47.505057,
		"lng": -96.852887
	},
	{
		"lat": 47.505129,
		"lng": -96.852885
	},
	{
		"lat": 47.505455,
		"lng": -96.852901
	},
	{
		"lat": 47.505707,
		"lng": -96.852928
	},
	{
		"lat": 47.505996,
		"lng": -96.852937
	},
	{
		"lat": 47.506176,
		"lng": -96.852964
	},
	{
		"lat": 47.506499,
		"lng": -96.853023
	},
	{
		"lat": 47.506571,
		"lng": -96.853031
	},
	{
		"lat": 47.506752,
		"lng": -96.853029
	},
	{
		"lat": 47.506897,
		"lng": -96.853017
	},
	{
		"lat": 47.506967,
		"lng": -96.852993
	},
	{
		"lat": 47.507,
		"lng": -96.85297
	},
	{
		"lat": 47.507102,
		"lng": -96.852916
	},
	{
		"lat": 47.507165,
		"lng": -96.852865
	},
	{
		"lat": 47.507318,
		"lng": -96.852726
	},
	{
		"lat": 47.507377,
		"lng": -96.852666
	},
	{
		"lat": 47.507491,
		"lng": -96.852536
	},
	{
		"lat": 47.507564,
		"lng": -96.852419
	},
	{
		"lat": 47.507608,
		"lng": -96.852335
	},
	{
		"lat": 47.507625,
		"lng": -96.852289
	},
	{
		"lat": 47.507666,
		"lng": -96.852142
	},
	{
		"lat": 47.507682,
		"lng": -96.85204
	},
	{
		"lat": 47.507684,
		"lng": -96.851935
	},
	{
		"lat": 47.507674,
		"lng": -96.851831
	},
	{
		"lat": 47.507651,
		"lng": -96.851676
	},
	{
		"lat": 47.507616,
		"lng": -96.851527
	},
	{
		"lat": 47.5076,
		"lng": -96.851479
	},
	{
		"lat": 47.507579,
		"lng": -96.851436
	},
	{
		"lat": 47.507487,
		"lng": -96.851211
	},
	{
		"lat": 47.507351,
		"lng": -96.850955
	},
	{
		"lat": 47.507332,
		"lng": -96.850918
	},
	{
		"lat": 47.507237,
		"lng": -96.85076
	},
	{
		"lat": 47.507195,
		"lng": -96.850674
	},
	{
		"lat": 47.507102,
		"lng": -96.850513
	},
	{
		"lat": 47.507059,
		"lng": -96.850428
	},
	{
		"lat": 47.50687,
		"lng": -96.850108
	},
	{
		"lat": 47.50676,
		"lng": -96.849899
	},
	{
		"lat": 47.506719,
		"lng": -96.849813
	},
	{
		"lat": 47.506702,
		"lng": -96.849767
	},
	{
		"lat": 47.506641,
		"lng": -96.849636
	},
	{
		"lat": 47.506525,
		"lng": -96.849369
	},
	{
		"lat": 47.506478,
		"lng": -96.849226
	},
	{
		"lat": 47.506444,
		"lng": -96.849076
	},
	{
		"lat": 47.506412,
		"lng": -96.848871
	},
	{
		"lat": 47.506392,
		"lng": -96.848716
	},
	{
		"lat": 47.506378,
		"lng": -96.848506
	},
	{
		"lat": 47.506404,
		"lng": -96.847823
	},
	{
		"lat": 47.506495,
		"lng": -96.84699
	},
	{
		"lat": 47.506552,
		"lng": -96.846578
	},
	{
		"lat": 47.506576,
		"lng": -96.84637
	},
	{
		"lat": 47.506614,
		"lng": -96.846112
	},
	{
		"lat": 47.506686,
		"lng": -96.845814
	},
	{
		"lat": 47.506769,
		"lng": -96.845522
	},
	{
		"lat": 47.506788,
		"lng": -96.845477
	},
	{
		"lat": 47.506888,
		"lng": -96.845081
	},
	{
		"lat": 47.506943,
		"lng": -96.844887
	},
	{
		"lat": 47.506977,
		"lng": -96.844794
	},
	{
		"lat": 47.507003,
		"lng": -96.844695
	},
	{
		"lat": 47.507085,
		"lng": -96.84446
	},
	{
		"lat": 47.507112,
		"lng": -96.844363
	},
	{
		"lat": 47.507371,
		"lng": -96.843724
	},
	{
		"lat": 47.507454,
		"lng": -96.843551
	},
	{
		"lat": 47.507512,
		"lng": -96.843417
	},
	{
		"lat": 47.507554,
		"lng": -96.843332
	},
	{
		"lat": 47.507602,
		"lng": -96.843253
	},
	{
		"lat": 47.507828,
		"lng": -96.842912
	},
	{
		"lat": 47.508042,
		"lng": -96.842629
	},
	{
		"lat": 47.508102,
		"lng": -96.842569
	},
	{
		"lat": 47.508157,
		"lng": -96.842501
	},
	{
		"lat": 47.508219,
		"lng": -96.842447
	},
	{
		"lat": 47.508253,
		"lng": -96.842426
	},
	{
		"lat": 47.508322,
		"lng": -96.842395
	},
	{
		"lat": 47.508423,
		"lng": -96.84234
	},
	{
		"lat": 47.508528,
		"lng": -96.842299
	},
	{
		"lat": 47.508636,
		"lng": -96.84228
	},
	{
		"lat": 47.508961,
		"lng": -96.842295
	},
	{
		"lat": 47.509033,
		"lng": -96.842308
	},
	{
		"lat": 47.509206,
		"lng": -96.842386
	},
	{
		"lat": 47.509371,
		"lng": -96.842492
	},
	{
		"lat": 47.509434,
		"lng": -96.842544
	},
	{
		"lat": 47.509523,
		"lng": -96.842633
	},
	{
		"lat": 47.50966,
		"lng": -96.842805
	},
	{
		"lat": 47.509886,
		"lng": -96.843147
	},
	{
		"lat": 47.509924,
		"lng": -96.843237
	},
	{
		"lat": 47.509946,
		"lng": -96.843278
	},
	{
		"lat": 47.510036,
		"lng": -96.843507
	},
	{
		"lat": 47.510121,
		"lng": -96.843677
	},
	{
		"lat": 47.5102,
		"lng": -96.843854
	},
	{
		"lat": 47.510217,
		"lng": -96.8439
	},
	{
		"lat": 47.510309,
		"lng": -96.844244
	},
	{
		"lat": 47.510403,
		"lng": -96.844697
	},
	{
		"lat": 47.510416,
		"lng": -96.844801
	},
	{
		"lat": 47.510437,
		"lng": -96.844901
	},
	{
		"lat": 47.510459,
		"lng": -96.845056
	},
	{
		"lat": 47.510479,
		"lng": -96.845265
	},
	{
		"lat": 47.510492,
		"lng": -96.845475
	},
	{
		"lat": 47.510489,
		"lng": -96.845685
	},
	{
		"lat": 47.510464,
		"lng": -96.846369
	},
	{
		"lat": 47.510443,
		"lng": -96.846577
	},
	{
		"lat": 47.510413,
		"lng": -96.846783
	},
	{
		"lat": 47.510382,
		"lng": -96.846935
	},
	{
		"lat": 47.510217,
		"lng": -96.847575
	},
	{
		"lat": 47.510196,
		"lng": -96.847676
	},
	{
		"lat": 47.510129,
		"lng": -96.84792
	},
	{
		"lat": 47.510082,
		"lng": -96.848119
	},
	{
		"lat": 47.510064,
		"lng": -96.848165
	},
	{
		"lat": 47.510035,
		"lng": -96.848261
	},
	{
		"lat": 47.510011,
		"lng": -96.84836
	},
	{
		"lat": 47.509976,
		"lng": -96.848453
	},
	{
		"lat": 47.509887,
		"lng": -96.848797
	},
	{
		"lat": 47.509857,
		"lng": -96.848894
	},
	{
		"lat": 47.509792,
		"lng": -96.849163
	},
	{
		"lat": 47.509726,
		"lng": -96.84944
	},
	{
		"lat": 47.50971,
		"lng": -96.849486
	},
	{
		"lat": 47.509669,
		"lng": -96.849688
	},
	{
		"lat": 47.509649,
		"lng": -96.849844
	},
	{
		"lat": 47.5096,
		"lng": -96.850312
	},
	{
		"lat": 47.509589,
		"lng": -96.850469
	},
	{
		"lat": 47.509582,
		"lng": -96.85068
	},
	{
		"lat": 47.509591,
		"lng": -96.851101
	},
	{
		"lat": 47.509599,
		"lng": -96.851205
	},
	{
		"lat": 47.50962,
		"lng": -96.851361
	},
	{
		"lat": 47.509629,
		"lng": -96.851465
	},
	{
		"lat": 47.509676,
		"lng": -96.851774
	},
	{
		"lat": 47.5097,
		"lng": -96.851873
	},
	{
		"lat": 47.509757,
		"lng": -96.852067
	},
	{
		"lat": 47.509803,
		"lng": -96.852183
	},
	{
		"lat": 47.509941,
		"lng": -96.852427
	},
	{
		"lat": 47.510015,
		"lng": -96.852543
	},
	{
		"lat": 47.510198,
		"lng": -96.852798
	},
	{
		"lat": 47.510253,
		"lng": -96.852866
	},
	{
		"lat": 47.51037,
		"lng": -96.852989
	},
	{
		"lat": 47.510464,
		"lng": -96.853068
	},
	{
		"lat": 47.510561,
		"lng": -96.853141
	},
	{
		"lat": 47.510653,
		"lng": -96.853224
	},
	{
		"lat": 47.510784,
		"lng": -96.853314
	},
	{
		"lat": 47.510848,
		"lng": -96.853364
	},
	{
		"lat": 47.511015,
		"lng": -96.853465
	},
	{
		"lat": 47.511185,
		"lng": -96.853552
	},
	{
		"lat": 47.511362,
		"lng": -96.853606
	},
	{
		"lat": 47.511506,
		"lng": -96.853625
	},
	{
		"lat": 47.511687,
		"lng": -96.853625
	},
	{
		"lat": 47.511928,
		"lng": -96.853594
	},
	{
		"lat": 47.512047,
		"lng": -96.853579
	},
	{
		"lat": 47.512083,
		"lng": -96.853568
	},
	{
		"lat": 47.512151,
		"lng": -96.853535
	},
	{
		"lat": 47.512292,
		"lng": -96.853483
	},
	{
		"lat": 47.512394,
		"lng": -96.853429
	},
	{
		"lat": 47.512463,
		"lng": -96.853402
	},
	{
		"lat": 47.512592,
		"lng": -96.853307
	},
	{
		"lat": 47.512654,
		"lng": -96.853251
	},
	{
		"lat": 47.512681,
		"lng": -96.853217
	},
	{
		"lat": 47.512989,
		"lng": -96.852771
	},
	{
		"lat": 47.513083,
		"lng": -96.852612
	},
	{
		"lat": 47.513126,
		"lng": -96.852527
	},
	{
		"lat": 47.513182,
		"lng": -96.852391
	},
	{
		"lat": 47.513262,
		"lng": -96.852216
	},
	{
		"lat": 47.513362,
		"lng": -96.851936
	},
	{
		"lat": 47.513409,
		"lng": -96.851793
	},
	{
		"lat": 47.513434,
		"lng": -96.851694
	},
	{
		"lat": 47.5135,
		"lng": -96.851394
	},
	{
		"lat": 47.513545,
		"lng": -96.851085
	},
	{
		"lat": 47.513565,
		"lng": -96.85077
	},
	{
		"lat": 47.513554,
		"lng": -96.850455
	},
	{
		"lat": 47.513533,
		"lng": -96.850141
	},
	{
		"lat": 47.51352,
		"lng": -96.850037
	},
	{
		"lat": 47.513495,
		"lng": -96.849884
	},
	{
		"lat": 47.513422,
		"lng": -96.849531
	},
	{
		"lat": 47.513391,
		"lng": -96.849436
	},
	{
		"lat": 47.51337,
		"lng": -96.849335
	},
	{
		"lat": 47.513331,
		"lng": -96.849188
	},
	{
		"lat": 47.513299,
		"lng": -96.849094
	},
	{
		"lat": 47.513214,
		"lng": -96.848803
	},
	{
		"lat": 47.513157,
		"lng": -96.848669
	},
	{
		"lat": 47.51306,
		"lng": -96.848387
	},
	{
		"lat": 47.512968,
		"lng": -96.84816
	},
	{
		"lat": 47.512928,
		"lng": -96.848072
	},
	{
		"lat": 47.512861,
		"lng": -96.847885
	},
	{
		"lat": 47.512803,
		"lng": -96.847752
	},
	{
		"lat": 47.512752,
		"lng": -96.847612
	},
	{
		"lat": 47.512567,
		"lng": -96.847159
	},
	{
		"lat": 47.512483,
		"lng": -96.846987
	},
	{
		"lat": 47.512433,
		"lng": -96.846846
	},
	{
		"lat": 47.512394,
		"lng": -96.846759
	},
	{
		"lat": 47.512365,
		"lng": -96.846662
	},
	{
		"lat": 47.512354,
		"lng": -96.846612
	},
	{
		"lat": 47.512321,
		"lng": -96.846406
	},
	{
		"lat": 47.512297,
		"lng": -96.846198
	},
	{
		"lat": 47.512284,
		"lng": -96.846041
	},
	{
		"lat": 47.512302,
		"lng": -96.845663
	},
	{
		"lat": 47.512328,
		"lng": -96.845148
	},
	{
		"lat": 47.512385,
		"lng": -96.844681
	},
	{
		"lat": 47.512409,
		"lng": -96.844581
	},
	{
		"lat": 47.512439,
		"lng": -96.844486
	},
	{
		"lat": 47.512488,
		"lng": -96.844287
	},
	{
		"lat": 47.512601,
		"lng": -96.8439
	},
	{
		"lat": 47.51263,
		"lng": -96.843842
	},
	{
		"lat": 47.512684,
		"lng": -96.843705
	},
	{
		"lat": 47.512726,
		"lng": -96.843619
	},
	{
		"lat": 47.512848,
		"lng": -96.843425
	},
	{
		"lat": 47.512918,
		"lng": -96.843304
	},
	{
		"lat": 47.513016,
		"lng": -96.84315
	},
	{
		"lat": 47.513043,
		"lng": -96.843115
	},
	{
		"lat": 47.513275,
		"lng": -96.842863
	},
	{
		"lat": 47.513307,
		"lng": -96.842839
	},
	{
		"lat": 47.513422,
		"lng": -96.842712
	},
	{
		"lat": 47.513482,
		"lng": -96.842652
	},
	{
		"lat": 47.513545,
		"lng": -96.8426
	},
	{
		"lat": 47.51368,
		"lng": -96.842524
	},
	{
		"lat": 47.513776,
		"lng": -96.842451
	},
	{
		"lat": 47.513981,
		"lng": -96.842349
	},
	{
		"lat": 47.514281,
		"lng": -96.842167
	},
	{
		"lat": 47.514351,
		"lng": -96.842137
	},
	{
		"lat": 47.514418,
		"lng": -96.842101
	},
	{
		"lat": 47.514523,
		"lng": -96.842057
	},
	{
		"lat": 47.514591,
		"lng": -96.842022
	},
	{
		"lat": 47.514662,
		"lng": -96.841999
	},
	{
		"lat": 47.514949,
		"lng": -96.841949
	},
	{
		"lat": 47.515238,
		"lng": -96.841951
	},
	{
		"lat": 47.515382,
		"lng": -96.841962
	},
	{
		"lat": 47.515525,
		"lng": -96.841994
	},
	{
		"lat": 47.515631,
		"lng": -96.842031
	},
	{
		"lat": 47.515836,
		"lng": -96.842132
	},
	{
		"lat": 47.515969,
		"lng": -96.842217
	},
	{
		"lat": 47.516032,
		"lng": -96.842268
	},
	{
		"lat": 47.516116,
		"lng": -96.842368
	},
	{
		"lat": 47.516214,
		"lng": -96.842523
	},
	{
		"lat": 47.516322,
		"lng": -96.842735
	},
	{
		"lat": 47.51642,
		"lng": -96.842956
	},
	{
		"lat": 47.516463,
		"lng": -96.843041
	},
	{
		"lat": 47.516582,
		"lng": -96.843305
	},
	{
		"lat": 47.516748,
		"lng": -96.843714
	},
	{
		"lat": 47.516778,
		"lng": -96.843809
	},
	{
		"lat": 47.516832,
		"lng": -96.843946
	},
	{
		"lat": 47.516873,
		"lng": -96.844093
	},
	{
		"lat": 47.51692,
		"lng": -96.844292
	},
	{
		"lat": 47.51695,
		"lng": -96.844444
	},
	{
		"lat": 47.516982,
		"lng": -96.844757
	},
	{
		"lat": 47.517001,
		"lng": -96.845177
	},
	{
		"lat": 47.517001,
		"lng": -96.845546
	},
	{
		"lat": 47.516987,
		"lng": -96.845809
	},
	{
		"lat": 47.516955,
		"lng": -96.846121
	},
	{
		"lat": 47.516915,
		"lng": -96.846432
	},
	{
		"lat": 47.516894,
		"lng": -96.846533
	},
	{
		"lat": 47.516841,
		"lng": -96.84684
	},
	{
		"lat": 47.516725,
		"lng": -96.847339
	},
	{
		"lat": 47.516642,
		"lng": -96.847572
	},
	{
		"lat": 47.51628,
		"lng": -96.84836
	},
	{
		"lat": 47.516208,
		"lng": -96.848543
	},
	{
		"lat": 47.516143,
		"lng": -96.848668
	},
	{
		"lat": 47.515929,
		"lng": -96.849026
	},
	{
		"lat": 47.515824,
		"lng": -96.84924
	},
	{
		"lat": 47.515789,
		"lng": -96.849332
	},
	{
		"lat": 47.515763,
		"lng": -96.849431
	},
	{
		"lat": 47.515717,
		"lng": -96.849573
	},
	{
		"lat": 47.515627,
		"lng": -96.849918
	},
	{
		"lat": 47.515592,
		"lng": -96.850009
	},
	{
		"lat": 47.515538,
		"lng": -96.850205
	},
	{
		"lat": 47.515416,
		"lng": -96.850586
	},
	{
		"lat": 47.515382,
		"lng": -96.850679
	},
	{
		"lat": 47.515343,
		"lng": -96.850768
	},
	{
		"lat": 47.51531,
		"lng": -96.850861
	},
	{
		"lat": 47.515282,
		"lng": -96.850958
	},
	{
		"lat": 47.515185,
		"lng": -96.85118
	},
	{
		"lat": 47.515171,
		"lng": -96.851228
	},
	{
		"lat": 47.515112,
		"lng": -96.851361
	},
	{
		"lat": 47.515042,
		"lng": -96.851545
	},
	{
		"lat": 47.514998,
		"lng": -96.85163
	},
	{
		"lat": 47.514963,
		"lng": -96.851721
	},
	{
		"lat": 47.51486,
		"lng": -96.851938
	},
	{
		"lat": 47.514828,
		"lng": -96.852032
	},
	{
		"lat": 47.514772,
		"lng": -96.852168
	},
	{
		"lat": 47.514746,
		"lng": -96.852265
	},
	{
		"lat": 47.514696,
		"lng": -96.852405
	},
	{
		"lat": 47.514671,
		"lng": -96.852504
	},
	{
		"lat": 47.514627,
		"lng": -96.852648
	},
	{
		"lat": 47.514587,
		"lng": -96.852851
	},
	{
		"lat": 47.514545,
		"lng": -96.852996
	},
	{
		"lat": 47.514534,
		"lng": -96.853046
	},
	{
		"lat": 47.514476,
		"lng": -96.853405
	},
	{
		"lat": 47.514414,
		"lng": -96.853924
	},
	{
		"lat": 47.5144,
		"lng": -96.854292
	},
	{
		"lat": 47.514403,
		"lng": -96.855082
	},
	{
		"lat": 47.51442,
		"lng": -96.855609
	},
	{
		"lat": 47.514492,
		"lng": -96.856445
	},
	{
		"lat": 47.514516,
		"lng": -96.856599
	},
	{
		"lat": 47.514539,
		"lng": -96.856807
	},
	{
		"lat": 47.514588,
		"lng": -96.857169
	},
	{
		"lat": 47.514623,
		"lng": -96.857373
	},
	{
		"lat": 47.514653,
		"lng": -96.857579
	},
	{
		"lat": 47.514747,
		"lng": -96.858088
	},
	{
		"lat": 47.514807,
		"lng": -96.858336
	},
	{
		"lat": 47.514823,
		"lng": -96.858439
	},
	{
		"lat": 47.514871,
		"lng": -96.858638
	},
	{
		"lat": 47.514934,
		"lng": -96.858941
	},
	{
		"lat": 47.514961,
		"lng": -96.859093
	},
	{
		"lat": 47.515026,
		"lng": -96.859394
	},
	{
		"lat": 47.515114,
		"lng": -96.85974
	},
	{
		"lat": 47.515157,
		"lng": -96.859941
	},
	{
		"lat": 47.515274,
		"lng": -96.860326
	},
	{
		"lat": 47.515286,
		"lng": -96.860376
	},
	{
		"lat": 47.515335,
		"lng": -96.860517
	},
	{
		"lat": 47.515379,
		"lng": -96.860661
	},
	{
		"lat": 47.515465,
		"lng": -96.860892
	},
	{
		"lat": 47.515556,
		"lng": -96.86112
	},
	{
		"lat": 47.515664,
		"lng": -96.861331
	},
	{
		"lat": 47.51587,
		"lng": -96.861717
	},
	{
		"lat": 47.515886,
		"lng": -96.861747
	},
	{
		"lat": 47.516001,
		"lng": -96.861949
	},
	{
		"lat": 47.516249,
		"lng": -96.862333
	},
	{
		"lat": 47.516457,
		"lng": -96.862627
	},
	{
		"lat": 47.516596,
		"lng": -96.862794
	},
	{
		"lat": 47.51677,
		"lng": -96.862983
	},
	{
		"lat": 47.517049,
		"lng": -96.863229
	},
	{
		"lat": 47.51716,
		"lng": -96.86331
	},
	{
		"lat": 47.517194,
		"lng": -96.863327
	},
	{
		"lat": 47.517474,
		"lng": -96.863435
	},
	{
		"lat": 47.517721,
		"lng": -96.863512
	},
	{
		"lat": 47.5179,
		"lng": -96.863558
	},
	{
		"lat": 47.518007,
		"lng": -96.863578
	},
	{
		"lat": 47.518188,
		"lng": -96.863578
	},
	{
		"lat": 47.518731,
		"lng": -96.863555
	},
	{
		"lat": 47.519309,
		"lng": -96.863517
	},
	{
		"lat": 47.519635,
		"lng": -96.863517
	},
	{
		"lat": 47.519743,
		"lng": -96.863531
	},
	{
		"lat": 47.51985,
		"lng": -96.863559
	},
	{
		"lat": 47.520025,
		"lng": -96.863622
	},
	{
		"lat": 47.52013,
		"lng": -96.863666
	},
	{
		"lat": 47.520197,
		"lng": -96.863704
	},
	{
		"lat": 47.520266,
		"lng": -96.863736
	},
	{
		"lat": 47.520435,
		"lng": -96.863829
	},
	{
		"lat": 47.520501,
		"lng": -96.863874
	},
	{
		"lat": 47.520693,
		"lng": -96.864022
	},
	{
		"lat": 47.520784,
		"lng": -96.864108
	},
	{
		"lat": 47.520817,
		"lng": -96.864129
	},
	{
		"lat": 47.520937,
		"lng": -96.864246
	},
	{
		"lat": 47.521,
		"lng": -96.864299
	},
	{
		"lat": 47.52115,
		"lng": -96.864444
	},
	{
		"lat": 47.521234,
		"lng": -96.864545
	},
	{
		"lat": 47.521353,
		"lng": -96.864665
	},
	{
		"lat": 47.521445,
		"lng": -96.864748
	},
	{
		"lat": 47.521617,
		"lng": -96.864941
	},
	{
		"lat": 47.521679,
		"lng": -96.864994
	},
	{
		"lat": 47.521827,
		"lng": -96.865147
	},
	{
		"lat": 47.521889,
		"lng": -96.865201
	},
	{
		"lat": 47.522008,
		"lng": -96.865317
	},
	{
		"lat": 47.522181,
		"lng": -96.865508
	},
	{
		"lat": 47.522245,
		"lng": -96.865557
	},
	{
		"lat": 47.52233,
		"lng": -96.865656
	},
	{
		"lat": 47.52239,
		"lng": -96.865715
	},
	{
		"lat": 47.522546,
		"lng": -96.865849
	},
	{
		"lat": 47.522905,
		"lng": -96.866108
	},
	{
		"lat": 47.523185,
		"lng": -96.866212
	},
	{
		"lat": 47.523398,
		"lng": -96.866272
	},
	{
		"lat": 47.52383,
		"lng": -96.866337
	},
	{
		"lat": 47.524587,
		"lng": -96.86643
	},
	{
		"lat": 47.524839,
		"lng": -96.866473
	},
	{
		"lat": 47.524946,
		"lng": -96.866498
	},
	{
		"lat": 47.525015,
		"lng": -96.866526
	},
	{
		"lat": 47.525254,
		"lng": -96.86665
	},
	{
		"lat": 47.525351,
		"lng": -96.86672
	},
	{
		"lat": 47.525523,
		"lng": -96.866914
	},
	{
		"lat": 47.525674,
		"lng": -96.86714
	},
	{
		"lat": 47.525744,
		"lng": -96.867262
	},
	{
		"lat": 47.525787,
		"lng": -96.867346
	},
	{
		"lat": 47.525852,
		"lng": -96.867535
	},
	{
		"lat": 47.525872,
		"lng": -96.867579
	},
	{
		"lat": 47.525903,
		"lng": -96.867674
	},
	{
		"lat": 47.525929,
		"lng": -96.867772
	},
	{
		"lat": 47.525986,
		"lng": -96.868022
	},
	{
		"lat": 47.526016,
		"lng": -96.868118
	},
	{
		"lat": 47.526036,
		"lng": -96.868273
	},
	{
		"lat": 47.52606,
		"lng": -96.868373
	},
	{
		"lat": 47.526082,
		"lng": -96.868581
	},
	{
		"lat": 47.526098,
		"lng": -96.868684
	},
	{
		"lat": 47.526121,
		"lng": -96.868892
	},
	{
		"lat": 47.526145,
		"lng": -96.869047
	},
	{
		"lat": 47.526183,
		"lng": -96.869465
	},
	{
		"lat": 47.526225,
		"lng": -96.869721
	},
	{
		"lat": 47.526251,
		"lng": -96.869928
	},
	{
		"lat": 47.526263,
		"lng": -96.870058
	},
	{
		"lat": 47.526362,
		"lng": -96.870212
	},
	{
		"lat": 47.526395,
		"lng": -96.870305
	},
	{
		"lat": 47.526444,
		"lng": -96.870383
	},
	{
		"lat": 47.526462,
		"lng": -96.870428
	},
	{
		"lat": 47.526506,
		"lng": -96.870512
	},
	{
		"lat": 47.526538,
		"lng": -96.870561
	},
	{
		"lat": 47.526608,
		"lng": -96.870666
	},
	{
		"lat": 47.526631,
		"lng": -96.870708
	},
	{
		"lat": 47.526668,
		"lng": -96.870801
	},
	{
		"lat": 47.526686,
		"lng": -96.870861
	},
	{
		"lat": 47.526826,
		"lng": -96.870929
	},
	{
		"lat": 47.526885,
		"lng": -96.870977
	},
	{
		"lat": 47.527024,
		"lng": -96.871065
	},
	{
		"lat": 47.527115,
		"lng": -96.871111
	},
	{
		"lat": 47.527162,
		"lng": -96.871136
	},
	{
		"lat": 47.527268,
		"lng": -96.871172
	},
	{
		"lat": 47.52734,
		"lng": -96.871177
	},
	{
		"lat": 47.527628,
		"lng": -96.871146
	},
	{
		"lat": 47.527699,
		"lng": -96.871122
	},
	{
		"lat": 47.527764,
		"lng": -96.871077
	},
	{
		"lat": 47.527867,
		"lng": -96.871026
	},
	{
		"lat": 47.527964,
		"lng": -96.870959
	},
	{
		"lat": 47.528027,
		"lng": -96.870908
	},
	{
		"lat": 47.528145,
		"lng": -96.870787
	},
	{
		"lat": 47.528229,
		"lng": -96.870686
	},
	{
		"lat": 47.528406,
		"lng": -96.870423
	},
	{
		"lat": 47.528529,
		"lng": -96.87023
	},
	{
		"lat": 47.528648,
		"lng": -96.869968
	},
	{
		"lat": 47.528699,
		"lng": -96.869828
	},
	{
		"lat": 47.528756,
		"lng": -96.869693
	},
	{
		"lat": 47.528801,
		"lng": -96.86955
	},
	{
		"lat": 47.528826,
		"lng": -96.869452
	},
	{
		"lat": 47.528881,
		"lng": -96.869201
	},
	{
		"lat": 47.528906,
		"lng": -96.869047
	},
	{
		"lat": 47.528945,
		"lng": -96.868684
	},
	{
		"lat": 47.528958,
		"lng": -96.868421
	},
	{
		"lat": 47.528977,
		"lng": -96.867477
	},
	{
		"lat": 47.528976,
		"lng": -96.867319
	},
	{
		"lat": 47.528926,
		"lng": -96.865793
	},
	{
		"lat": 47.528932,
		"lng": -96.865214
	},
	{
		"lat": 47.528917,
		"lng": -96.864953
	},
	{
		"lat": 47.528896,
		"lng": -96.864321
	},
	{
		"lat": 47.528897,
		"lng": -96.864058
	},
	{
		"lat": 47.528906,
		"lng": -96.863585
	},
	{
		"lat": 47.528946,
		"lng": -96.862799
	},
	{
		"lat": 47.528966,
		"lng": -96.862485
	},
	{
		"lat": 47.528999,
		"lng": -96.862173
	},
	{
		"lat": 47.529017,
		"lng": -96.862072
	},
	{
		"lat": 47.529031,
		"lng": -96.861968
	},
	{
		"lat": 47.529056,
		"lng": -96.861869
	},
	{
		"lat": 47.529107,
		"lng": -96.861617
	},
	{
		"lat": 47.529126,
		"lng": -96.861571
	},
	{
		"lat": 47.529168,
		"lng": -96.861426
	},
	{
		"lat": 47.529233,
		"lng": -96.861238
	},
	{
		"lat": 47.529365,
		"lng": -96.860925
	},
	{
		"lat": 47.52943,
		"lng": -96.860798
	},
	{
		"lat": 47.529524,
		"lng": -96.860639
	},
	{
		"lat": 47.529751,
		"lng": -96.860302
	},
	{
		"lat": 47.529965,
		"lng": -96.860017
	},
	{
		"lat": 47.53008,
		"lng": -96.859891
	},
	{
		"lat": 47.530188,
		"lng": -96.859751
	},
	{
		"lat": 47.530272,
		"lng": -96.859652
	},
	{
		"lat": 47.530391,
		"lng": -96.859533
	},
	{
		"lat": 47.530501,
		"lng": -96.859396
	},
	{
		"lat": 47.53059,
		"lng": -96.859307
	},
	{
		"lat": 47.530675,
		"lng": -96.859212
	},
	{
		"lat": 47.530728,
		"lng": -96.85914
	},
	{
		"lat": 47.530786,
		"lng": -96.859076
	},
	{
		"lat": 47.530847,
		"lng": -96.859022
	},
	{
		"lat": 47.530934,
		"lng": -96.858928
	},
	{
		"lat": 47.531025,
		"lng": -96.858843
	},
	{
		"lat": 47.531088,
		"lng": -96.858792
	},
	{
		"lat": 47.531117,
		"lng": -96.858761
	},
	{
		"lat": 47.531182,
		"lng": -96.85872
	},
	{
		"lat": 47.531273,
		"lng": -96.858634
	},
	{
		"lat": 47.531337,
		"lng": -96.858587
	},
	{
		"lat": 47.531502,
		"lng": -96.858481
	},
	{
		"lat": 47.531564,
		"lng": -96.858427
	},
	{
		"lat": 47.531632,
		"lng": -96.858393
	},
	{
		"lat": 47.531764,
		"lng": -96.858306
	},
	{
		"lat": 47.531934,
		"lng": -96.858221
	},
	{
		"lat": 47.532339,
		"lng": -96.857999
	},
	{
		"lat": 47.532404,
		"lng": -96.857954
	},
	{
		"lat": 47.532571,
		"lng": -96.857858
	},
	{
		"lat": 47.532602,
		"lng": -96.857832
	},
	{
		"lat": 47.532873,
		"lng": -96.857684
	},
	{
		"lat": 47.533074,
		"lng": -96.857568
	},
	{
		"lat": 47.533105,
		"lng": -96.85754
	},
	{
		"lat": 47.533202,
		"lng": -96.857473
	},
	{
		"lat": 47.533359,
		"lng": -96.857346
	},
	{
		"lat": 47.5336,
		"lng": -96.857114
	},
	{
		"lat": 47.533876,
		"lng": -96.856866
	},
	{
		"lat": 47.533901,
		"lng": -96.856828
	},
	{
		"lat": 47.534047,
		"lng": -96.856675
	},
	{
		"lat": 47.534208,
		"lng": -96.856466
	},
	{
		"lat": 47.534362,
		"lng": -96.856244
	},
	{
		"lat": 47.534714,
		"lng": -96.855718
	},
	{
		"lat": 47.535291,
		"lng": -96.854776
	},
	{
		"lat": 47.535403,
		"lng": -96.854569
	},
	{
		"lat": 47.535545,
		"lng": -96.854331
	},
	{
		"lat": 47.535647,
		"lng": -96.854181
	},
	{
		"lat": 47.535912,
		"lng": -96.853822
	},
	{
		"lat": 47.535967,
		"lng": -96.853755
	},
	{
		"lat": 47.536117,
		"lng": -96.853609
	},
	{
		"lat": 47.536179,
		"lng": -96.853555
	},
	{
		"lat": 47.536213,
		"lng": -96.853534
	},
	{
		"lat": 47.536775,
		"lng": -96.853344
	},
	{
		"lat": 47.536955,
		"lng": -96.853311
	},
	{
		"lat": 47.537172,
		"lng": -96.853323
	},
	{
		"lat": 47.537422,
		"lng": -96.853378
	},
	{
		"lat": 47.53763,
		"lng": -96.853462
	},
	{
		"lat": 47.537691,
		"lng": -96.853507
	},
	{
		"lat": 47.537758,
		"lng": -96.853545
	},
	{
		"lat": 47.537854,
		"lng": -96.853618
	},
	{
		"lat": 47.537914,
		"lng": -96.853677
	},
	{
		"lat": 47.537991,
		"lng": -96.853788
	},
	{
		"lat": 47.538038,
		"lng": -96.853867
	},
	{
		"lat": 47.538081,
		"lng": -96.853953
	},
	{
		"lat": 47.538119,
		"lng": -96.854041
	},
	{
		"lat": 47.538142,
		"lng": -96.854083
	},
	{
		"lat": 47.538207,
		"lng": -96.854271
	},
	{
		"lat": 47.538261,
		"lng": -96.854466
	},
	{
		"lat": 47.538275,
		"lng": -96.854568
	},
	{
		"lat": 47.538281,
		"lng": -96.854673
	},
	{
		"lat": 47.538275,
		"lng": -96.855146
	},
	{
		"lat": 47.538263,
		"lng": -96.855409
	},
	{
		"lat": 47.538224,
		"lng": -96.855664
	},
	{
		"lat": 47.538181,
		"lng": -96.855865
	},
	{
		"lat": 47.538129,
		"lng": -96.856062
	},
	{
		"lat": 47.538079,
		"lng": -96.856202
	},
	{
		"lat": 47.53807,
		"lng": -96.856253
	},
	{
		"lat": 47.538005,
		"lng": -96.856441
	},
	{
		"lat": 47.537912,
		"lng": -96.856663
	},
	{
		"lat": 47.53763,
		"lng": -96.857274
	},
	{
		"lat": 47.537557,
		"lng": -96.857455
	},
	{
		"lat": 47.537458,
		"lng": -96.857675
	},
	{
		"lat": 47.537358,
		"lng": -96.857956
	},
	{
		"lat": 47.537328,
		"lng": -96.85805
	},
	{
		"lat": 47.537293,
		"lng": -96.858199
	},
	{
		"lat": 47.537259,
		"lng": -96.858293
	},
	{
		"lat": 47.537214,
		"lng": -96.858493
	},
	{
		"lat": 47.5372,
		"lng": -96.858596
	},
	{
		"lat": 47.537171,
		"lng": -96.858749
	},
	{
		"lat": 47.537147,
		"lng": -96.858957
	},
	{
		"lat": 47.537134,
		"lng": -96.859218
	},
	{
		"lat": 47.537123,
		"lng": -96.85964
	},
	{
		"lat": 47.537161,
		"lng": -96.860216
	},
	{
		"lat": 47.537167,
		"lng": -96.860269
	},
	{
		"lat": 47.537229,
		"lng": -96.860572
	},
	{
		"lat": 47.53726,
		"lng": -96.860667
	},
	{
		"lat": 47.537321,
		"lng": -96.860914
	},
	{
		"lat": 47.537422,
		"lng": -96.861194
	},
	{
		"lat": 47.537464,
		"lng": -96.86128
	},
	{
		"lat": 47.53752,
		"lng": -96.861415
	},
	{
		"lat": 47.53763,
		"lng": -96.861624
	},
	{
		"lat": 47.537819,
		"lng": -96.86201
	},
	{
		"lat": 47.537987,
		"lng": -96.862285
	},
	{
		"lat": 47.538299,
		"lng": -96.862726
	},
	{
		"lat": 47.53838,
		"lng": -96.862831
	},
	{
		"lat": 47.538551,
		"lng": -96.863024
	},
	{
		"lat": 47.538643,
		"lng": -96.863109
	},
	{
		"lat": 47.538707,
		"lng": -96.863156
	},
	{
		"lat": 47.5388,
		"lng": -96.863238
	},
	{
		"lat": 47.539102,
		"lng": -96.863415
	},
	{
		"lat": 47.539201,
		"lng": -96.863479
	},
	{
		"lat": 47.539237,
		"lng": -96.863491
	},
	{
		"lat": 47.53927,
		"lng": -96.863511
	},
	{
		"lat": 47.5393,
		"lng": -96.863541
	},
	{
		"lat": 47.539334,
		"lng": -96.863559
	},
	{
		"lat": 47.539369,
		"lng": -96.86357
	},
	{
		"lat": 47.539549,
		"lng": -96.863588
	},
	{
		"lat": 47.539729,
		"lng": -96.863565
	},
	{
		"lat": 47.53998,
		"lng": -96.863523
	},
	{
		"lat": 47.54026,
		"lng": -96.863424
	},
	{
		"lat": 47.540329,
		"lng": -96.86339
	},
	{
		"lat": 47.540494,
		"lng": -96.863282
	},
	{
		"lat": 47.540589,
		"lng": -96.863205
	},
	{
		"lat": 47.540757,
		"lng": -96.863006
	},
	{
		"lat": 47.540817,
		"lng": -96.862948
	},
	{
		"lat": 47.541021,
		"lng": -96.862642
	},
	{
		"lat": 47.541091,
		"lng": -96.862521
	},
	{
		"lat": 47.541195,
		"lng": -96.862306
	},
	{
		"lat": 47.541252,
		"lng": -96.862172
	},
	{
		"lat": 47.541336,
		"lng": -96.861939
	},
	{
		"lat": 47.541363,
		"lng": -96.861842
	},
	{
		"lat": 47.541383,
		"lng": -96.861798
	},
	{
		"lat": 47.541398,
		"lng": -96.86175
	},
	{
		"lat": 47.541421,
		"lng": -96.86165
	},
	{
		"lat": 47.541449,
		"lng": -96.861554
	},
	{
		"lat": 47.541537,
		"lng": -96.861153
	},
	{
		"lat": 47.541603,
		"lng": -96.860797
	},
	{
		"lat": 47.541654,
		"lng": -96.8606
	},
	{
		"lat": 47.541725,
		"lng": -96.860358
	},
	{
		"lat": 47.541813,
		"lng": -96.859956
	},
	{
		"lat": 47.541835,
		"lng": -96.859801
	},
	{
		"lat": 47.541849,
		"lng": -96.859753
	},
	{
		"lat": 47.541897,
		"lng": -96.859498
	},
	{
		"lat": 47.54192,
		"lng": -96.859344
	},
	{
		"lat": 47.541944,
		"lng": -96.859136
	},
	{
		"lat": 47.54196,
		"lng": -96.859033
	},
	{
		"lat": 47.541981,
		"lng": -96.858932
	},
	{
		"lat": 47.542035,
		"lng": -96.858572
	},
	{
		"lat": 47.542095,
		"lng": -96.858213
	},
	{
		"lat": 47.542128,
		"lng": -96.858063
	},
	{
		"lat": 47.542191,
		"lng": -96.857651
	},
	{
		"lat": 47.542214,
		"lng": -96.85739
	},
	{
		"lat": 47.542222,
		"lng": -96.857338
	},
	{
		"lat": 47.542245,
		"lng": -96.856942
	},
	{
		"lat": 47.54225,
		"lng": -96.856626
	},
	{
		"lat": 47.54225,
		"lng": -96.856309
	},
	{
		"lat": 47.542243,
		"lng": -96.856152
	},
	{
		"lat": 47.542234,
		"lng": -96.856047
	},
	{
		"lat": 47.542226,
		"lng": -96.855996
	},
	{
		"lat": 47.542159,
		"lng": -96.855695
	},
	{
		"lat": 47.542085,
		"lng": -96.855398
	},
	{
		"lat": 47.542023,
		"lng": -96.855209
	},
	{
		"lat": 47.541987,
		"lng": -96.855118
	},
	{
		"lat": 47.541927,
		"lng": -96.854927
	},
	{
		"lat": 47.541874,
		"lng": -96.85479
	},
	{
		"lat": 47.541862,
		"lng": -96.85474
	},
	{
		"lat": 47.541747,
		"lng": -96.854473
	},
	{
		"lat": 47.541681,
		"lng": -96.854346
	},
	{
		"lat": 47.541644,
		"lng": -96.854257
	},
	{
		"lat": 47.541337,
		"lng": -96.853671
	},
	{
		"lat": 47.541208,
		"lng": -96.853417
	},
	{
		"lat": 47.540955,
		"lng": -96.85297
	},
	{
		"lat": 47.540832,
		"lng": -96.852777
	},
	{
		"lat": 47.540676,
		"lng": -96.852557
	},
	{
		"lat": 47.54046,
		"lng": -96.852276
	},
	{
		"lat": 47.540344,
		"lng": -96.852151
	},
	{
		"lat": 47.540094,
		"lng": -96.851938
	},
	{
		"lat": 47.539833,
		"lng": -96.851755
	},
	{
		"lat": 47.539662,
		"lng": -96.851669
	},
	{
		"lat": 47.539092,
		"lng": -96.851338
	},
	{
		"lat": 47.538863,
		"lng": -96.851184
	},
	{
		"lat": 47.538729,
		"lng": -96.851106
	},
	{
		"lat": 47.538664,
		"lng": -96.851058
	},
	{
		"lat": 47.538529,
		"lng": -96.850982
	},
	{
		"lat": 47.538497,
		"lng": -96.850958
	},
	{
		"lat": 47.538407,
		"lng": -96.850872
	},
	{
		"lat": 47.538142,
		"lng": -96.850595
	},
	{
		"lat": 47.537982,
		"lng": -96.850381
	},
	{
		"lat": 47.537679,
		"lng": -96.849929
	},
	{
		"lat": 47.537563,
		"lng": -96.849726
	},
	{
		"lat": 47.537417,
		"lng": -96.849425
	},
	{
		"lat": 47.537329,
		"lng": -96.849259
	},
	{
		"lat": 47.537259,
		"lng": -96.849073
	},
	{
		"lat": 47.537202,
		"lng": -96.848824
	},
	{
		"lat": 47.537169,
		"lng": -96.848511
	},
	{
		"lat": 47.53717,
		"lng": -96.8483
	},
	{
		"lat": 47.537183,
		"lng": -96.847879
	},
	{
		"lat": 47.537206,
		"lng": -96.847565
	},
	{
		"lat": 47.537219,
		"lng": -96.847461
	},
	{
		"lat": 47.537242,
		"lng": -96.847361
	},
	{
		"lat": 47.537279,
		"lng": -96.847158
	},
	{
		"lat": 47.537324,
		"lng": -96.847014
	},
	{
		"lat": 47.537404,
		"lng": -96.84672
	},
	{
		"lat": 47.537422,
		"lng": -96.846674
	},
	{
		"lat": 47.537486,
		"lng": -96.846547
	},
	{
		"lat": 47.53758,
		"lng": -96.846387
	},
	{
		"lat": 47.537654,
		"lng": -96.846271
	},
	{
		"lat": 47.537784,
		"lng": -96.846089
	},
	{
		"lat": 47.537898,
		"lng": -96.845959
	},
	{
		"lat": 47.538083,
		"lng": -96.845794
	},
	{
		"lat": 47.538286,
		"lng": -96.845682
	},
	{
		"lat": 47.538357,
		"lng": -96.845657
	},
	{
		"lat": 47.538493,
		"lng": -96.845485
	},
	{
		"lat": 47.538752,
		"lng": -96.845323
	},
	{
		"lat": 47.53896,
		"lng": -96.845285
	},
	{
		"lat": 47.539267,
		"lng": -96.845296
	},
	{
		"lat": 47.539563,
		"lng": -96.845383
	},
	{
		"lat": 47.539753,
		"lng": -96.84555
	},
	{
		"lat": 47.539922,
		"lng": -96.845706
	},
	{
		"lat": 47.540028,
		"lng": -96.845742
	},
	{
		"lat": 47.540124,
		"lng": -96.845783
	},
	{
		"lat": 47.540167,
		"lng": -96.845809
	},
	{
		"lat": 47.540374,
		"lng": -96.845905
	},
	{
		"lat": 47.540612,
		"lng": -96.84603
	},
	{
		"lat": 47.540838,
		"lng": -96.846194
	},
	{
		"lat": 47.540991,
		"lng": -96.846337
	},
	{
		"lat": 47.5413,
		"lng": -96.846701
	},
	{
		"lat": 47.541667,
		"lng": -96.847209
	},
	{
		"lat": 47.541724,
		"lng": -96.847273
	},
	{
		"lat": 47.541806,
		"lng": -96.847377
	},
	{
		"lat": 47.541878,
		"lng": -96.847455
	},
	{
		"lat": 47.542059,
		"lng": -96.847714
	},
	{
		"lat": 47.542208,
		"lng": -96.847944
	},
	{
		"lat": 47.542349,
		"lng": -96.848184
	},
	{
		"lat": 47.542369,
		"lng": -96.848227
	},
	{
		"lat": 47.542533,
		"lng": -96.848509
	},
	{
		"lat": 47.542577,
		"lng": -96.848592
	},
	{
		"lat": 47.542638,
		"lng": -96.848722
	},
	{
		"lat": 47.542689,
		"lng": -96.848862
	},
	{
		"lat": 47.542728,
		"lng": -96.848951
	},
	{
		"lat": 47.542778,
		"lng": -96.849091
	},
	{
		"lat": 47.542822,
		"lng": -96.849236
	},
	{
		"lat": 47.542887,
		"lng": -96.849424
	},
	{
		"lat": 47.542962,
		"lng": -96.849604
	},
	{
		"lat": 47.543168,
		"lng": -96.85022
	},
	{
		"lat": 47.543178,
		"lng": -96.85027
	},
	{
		"lat": 47.543208,
		"lng": -96.850366
	},
	{
		"lat": 47.543254,
		"lng": -96.850566
	},
	{
		"lat": 47.543296,
		"lng": -96.850712
	},
	{
		"lat": 47.543365,
		"lng": -96.851011
	},
	{
		"lat": 47.54338,
		"lng": -96.851063
	},
	{
		"lat": 47.543408,
		"lng": -96.851156
	},
	{
		"lat": 47.543431,
		"lng": -96.851256
	},
	{
		"lat": 47.543449,
		"lng": -96.851358
	},
	{
		"lat": 47.543474,
		"lng": -96.851457
	},
	{
		"lat": 47.54357,
		"lng": -96.85202
	},
	{
		"lat": 47.543635,
		"lng": -96.852322
	},
	{
		"lat": 47.543661,
		"lng": -96.852475
	},
	{
		"lat": 47.543699,
		"lng": -96.852623
	},
	{
		"lat": 47.543728,
		"lng": -96.85283
	},
	{
		"lat": 47.543783,
		"lng": -96.853135
	},
	{
		"lat": 47.543809,
		"lng": -96.853234
	},
	{
		"lat": 47.543894,
		"lng": -96.853637
	},
	{
		"lat": 47.543951,
		"lng": -96.853943
	},
	{
		"lat": 47.543987,
		"lng": -96.854092
	},
	{
		"lat": 47.544022,
		"lng": -96.854296
	},
	{
		"lat": 47.544136,
		"lng": -96.854906
	},
	{
		"lat": 47.544191,
		"lng": -96.855157
	},
	{
		"lat": 47.544228,
		"lng": -96.855306
	},
	{
		"lat": 47.544272,
		"lng": -96.85545
	},
	{
		"lat": 47.54432,
		"lng": -96.855648
	},
	{
		"lat": 47.544341,
		"lng": -96.855692
	},
	{
		"lat": 47.544397,
		"lng": -96.855886
	},
	{
		"lat": 47.544489,
		"lng": -96.856286
	},
	{
		"lat": 47.544517,
		"lng": -96.856383
	},
	{
		"lat": 47.544574,
		"lng": -96.856633
	},
	{
		"lat": 47.544597,
		"lng": -96.856787
	},
	{
		"lat": 47.544684,
		"lng": -96.857133
	},
	{
		"lat": 47.544751,
		"lng": -96.857434
	},
	{
		"lat": 47.54481,
		"lng": -96.857738
	},
	{
		"lat": 47.54488,
		"lng": -96.858038
	},
	{
		"lat": 47.544908,
		"lng": -96.858148
	},
	{
		"lat": 47.544943,
		"lng": -96.858285
	},
	{
		"lat": 47.545014,
		"lng": -96.858527
	},
	{
		"lat": 47.545065,
		"lng": -96.858667
	},
	{
		"lat": 47.54514,
		"lng": -96.858906
	},
	{
		"lat": 47.545207,
		"lng": -96.859093
	},
	{
		"lat": 47.545303,
		"lng": -96.859315
	},
	{
		"lat": 47.545335,
		"lng": -96.859409
	},
	{
		"lat": 47.545398,
		"lng": -96.859538
	},
	{
		"lat": 47.545448,
		"lng": -96.859678
	},
	{
		"lat": 47.54557,
		"lng": -96.85994
	},
	{
		"lat": 47.545748,
		"lng": -96.860203
	},
	{
		"lat": 47.545855,
		"lng": -96.860345
	},
	{
		"lat": 47.545947,
		"lng": -96.860428
	},
	{
		"lat": 47.546014,
		"lng": -96.860468
	},
	{
		"lat": 47.546119,
		"lng": -96.860504
	},
	{
		"lat": 47.546192,
		"lng": -96.860509
	},
	{
		"lat": 47.546264,
		"lng": -96.860503
	},
	{
		"lat": 47.546407,
		"lng": -96.860481
	},
	{
		"lat": 47.546515,
		"lng": -96.860455
	},
	{
		"lat": 47.546583,
		"lng": -96.860422
	},
	{
		"lat": 47.546682,
		"lng": -96.860358
	},
	{
		"lat": 47.546796,
		"lng": -96.860227
	},
	{
		"lat": 47.546894,
		"lng": -96.860072
	},
	{
		"lat": 47.547036,
		"lng": -96.859767
	},
	{
		"lat": 47.547105,
		"lng": -96.859585
	},
	{
		"lat": 47.547054,
		"lng": -96.859067
	},
	{
		"lat": 47.54704,
		"lng": -96.858874
	},
	{
		"lat": 47.547058,
		"lng": -96.858692
	},
	{
		"lat": 47.547106,
		"lng": -96.858585
	},
	{
		"lat": 47.547378,
		"lng": -96.858254
	},
	{
		"lat": 47.547818,
		"lng": -96.857676
	},
	{
		"lat": 47.547839,
		"lng": -96.857595
	},
	{
		"lat": 47.54793,
		"lng": -96.857308
	},
	{
		"lat": 47.547997,
		"lng": -96.857121
	},
	{
		"lat": 47.548017,
		"lng": -96.85702
	},
	{
		"lat": 47.548081,
		"lng": -96.856774
	},
	{
		"lat": 47.548137,
		"lng": -96.856524
	},
	{
		"lat": 47.548153,
		"lng": -96.856476
	},
	{
		"lat": 47.548173,
		"lng": -96.856376
	},
	{
		"lat": 47.548198,
		"lng": -96.856276
	},
	{
		"lat": 47.548352,
		"lng": -96.855742
	},
	{
		"lat": 47.548403,
		"lng": -96.855545
	},
	{
		"lat": 47.548419,
		"lng": -96.855498
	},
	{
		"lat": 47.548541,
		"lng": -96.855059
	},
	{
		"lat": 47.54859,
		"lng": -96.854918
	},
	{
		"lat": 47.54863,
		"lng": -96.85483
	},
	{
		"lat": 47.548675,
		"lng": -96.854748
	},
	{
		"lat": 47.548758,
		"lng": -96.854575
	},
	{
		"lat": 47.548805,
		"lng": -96.854495
	},
	{
		"lat": 47.548865,
		"lng": -96.854364
	},
	{
		"lat": 47.548959,
		"lng": -96.854203
	},
	{
		"lat": 47.549202,
		"lng": -96.853813
	},
	{
		"lat": 47.54936,
		"lng": -96.853596
	},
	{
		"lat": 47.549523,
		"lng": -96.853388
	},
	{
		"lat": 47.549774,
		"lng": -96.853088
	},
	{
		"lat": 47.550086,
		"lng": -96.852662
	},
	{
		"lat": 47.550196,
		"lng": -96.852512
	},
	{
		"lat": 47.55028,
		"lng": -96.852412
	},
	{
		"lat": 47.550655,
		"lng": -96.851917
	},
	{
		"lat": 47.551049,
		"lng": -96.851375
	},
	{
		"lat": 47.551451,
		"lng": -96.850846
	},
	{
		"lat": 47.551779,
		"lng": -96.850431
	},
	{
		"lat": 47.551896,
		"lng": -96.850309
	},
	{
		"lat": 47.552114,
		"lng": -96.850124
	},
	{
		"lat": 47.552245,
		"lng": -96.850034
	},
	{
		"lat": 47.552516,
		"lng": -96.849886
	},
	{
		"lat": 47.552658,
		"lng": -96.849844
	},
	{
		"lat": 47.55273,
		"lng": -96.849832
	},
	{
		"lat": 47.55291,
		"lng": -96.84982
	},
	{
		"lat": 47.553163,
		"lng": -96.849835
	},
	{
		"lat": 47.553234,
		"lng": -96.849852
	},
	{
		"lat": 47.553304,
		"lng": -96.849878
	},
	{
		"lat": 47.553476,
		"lng": -96.84996
	},
	{
		"lat": 47.553577,
		"lng": -96.850018
	},
	{
		"lat": 47.553738,
		"lng": -96.850138
	},
	{
		"lat": 47.553829,
		"lng": -96.850223
	},
	{
		"lat": 47.553991,
		"lng": -96.850433
	},
	{
		"lat": 47.554189,
		"lng": -96.850741
	},
	{
		"lat": 47.554283,
		"lng": -96.850901
	},
	{
		"lat": 47.554476,
		"lng": -96.851283
	},
	{
		"lat": 47.554503,
		"lng": -96.851381
	},
	{
		"lat": 47.554648,
		"lng": -96.851744
	},
	{
		"lat": 47.554699,
		"lng": -96.851942
	},
	{
		"lat": 47.554706,
		"lng": -96.851994
	},
	{
		"lat": 47.554733,
		"lng": -96.852092
	},
	{
		"lat": 47.554779,
		"lng": -96.852347
	},
	{
		"lat": 47.554799,
		"lng": -96.852502
	},
	{
		"lat": 47.554849,
		"lng": -96.85313
	},
	{
		"lat": 47.554891,
		"lng": -96.853961
	},
	{
		"lat": 47.554933,
		"lng": -96.854047
	},
	{
		"lat": 47.55498,
		"lng": -96.85419
	},
	{
		"lat": 47.555,
		"lng": -96.854291
	},
	{
		"lat": 47.555022,
		"lng": -96.854763
	},
	{
		"lat": 47.555023,
		"lng": -96.854868
	},
	{
		"lat": 47.555044,
		"lng": -96.855445
	},
	{
		"lat": 47.555037,
		"lng": -96.855708
	},
	{
		"lat": 47.555017,
		"lng": -96.855809
	},
	{
		"lat": 47.554987,
		"lng": -96.855913
	},
	{
		"lat": 47.555013,
		"lng": -96.856105
	},
	{
		"lat": 47.555031,
		"lng": -96.856314
	},
	{
		"lat": 47.555041,
		"lng": -96.856365
	},
	{
		"lat": 47.555082,
		"lng": -96.856729
	},
	{
		"lat": 47.555117,
		"lng": -96.856934
	},
	{
		"lat": 47.555176,
		"lng": -96.857183
	},
	{
		"lat": 47.555192,
		"lng": -96.857231
	},
	{
		"lat": 47.555212,
		"lng": -96.857275
	},
	{
		"lat": 47.555265,
		"lng": -96.857471
	},
	{
		"lat": 47.555404,
		"lng": -96.85784
	},
	{
		"lat": 47.555447,
		"lng": -96.857925
	},
	{
		"lat": 47.555561,
		"lng": -96.858129
	},
	{
		"lat": 47.555634,
		"lng": -96.858247
	},
	{
		"lat": 47.555837,
		"lng": -96.858547
	},
	{
		"lat": 47.556135,
		"lng": -96.858932
	},
	{
		"lat": 47.556241,
		"lng": -96.859075
	},
	{
		"lat": 47.556681,
		"lng": -96.859536
	},
	{
		"lat": 47.556712,
		"lng": -96.859563
	},
	{
		"lat": 47.556827,
		"lng": -96.859692
	},
	{
		"lat": 47.556947,
		"lng": -96.859809
	},
	{
		"lat": 47.557283,
		"lng": -96.860119
	},
	{
		"lat": 47.557339,
		"lng": -96.860185
	},
	{
		"lat": 47.557458,
		"lng": -96.860305
	},
	{
		"lat": 47.557631,
		"lng": -96.860497
	},
	{
		"lat": 47.557781,
		"lng": -96.860645
	},
	{
		"lat": 47.557873,
		"lng": -96.860727
	},
	{
		"lat": 47.557938,
		"lng": -96.860775
	},
	{
		"lat": 47.557999,
		"lng": -96.860832
	},
	{
		"lat": 47.558157,
		"lng": -96.860958
	},
	{
		"lat": 47.558398,
		"lng": -96.861192
	},
	{
		"lat": 47.558554,
		"lng": -96.861324
	},
	{
		"lat": 47.558769,
		"lng": -96.861518
	},
	{
		"lat": 47.558867,
		"lng": -96.861588
	},
	{
		"lat": 47.558897,
		"lng": -96.861618
	},
	{
		"lat": 47.5589,
		"lng": -96.86162
	},
	{
		"lat": 47.559028,
		"lng": -96.861707
	},
	{
		"lat": 47.559063,
		"lng": -96.861721
	},
	{
		"lat": 47.559134,
		"lng": -96.861737
	},
	{
		"lat": 47.559279,
		"lng": -96.861749
	},
	{
		"lat": 47.559496,
		"lng": -96.861746
	},
	{
		"lat": 47.559676,
		"lng": -96.86173
	},
	{
		"lat": 47.559779,
		"lng": -96.86168
	},
	{
		"lat": 47.559876,
		"lng": -96.861608
	},
	{
		"lat": 47.560029,
		"lng": -96.861466
	},
	{
		"lat": 47.560117,
		"lng": -96.861375
	},
	{
		"lat": 47.560246,
		"lng": -96.86119
	},
	{
		"lat": 47.560386,
		"lng": -96.860948
	},
	{
		"lat": 47.560442,
		"lng": -96.860813
	},
	{
		"lat": 47.560494,
		"lng": -96.860674
	},
	{
		"lat": 47.560519,
		"lng": -96.860584
	},
	{
		"lat": 47.560538,
		"lng": -96.860539
	},
	{
		"lat": 47.560609,
		"lng": -96.860297
	},
	{
		"lat": 47.560636,
		"lng": -96.860144
	},
	{
		"lat": 47.560652,
		"lng": -96.859987
	},
	{
		"lat": 47.560659,
		"lng": -96.859724
	},
	{
		"lat": 47.560644,
		"lng": -96.859408
	},
	{
		"lat": 47.560637,
		"lng": -96.859357
	},
	{
		"lat": 47.560594,
		"lng": -96.859156
	},
	{
		"lat": 47.560478,
		"lng": -96.858712
	},
	{
		"lat": 47.560412,
		"lng": -96.858524
	},
	{
		"lat": 47.560371,
		"lng": -96.858378
	},
	{
		"lat": 47.560338,
		"lng": -96.858285
	},
	{
		"lat": 47.560301,
		"lng": -96.858136
	},
	{
		"lat": 47.560259,
		"lng": -96.85799
	},
	{
		"lat": 47.560225,
		"lng": -96.857897
	},
	{
		"lat": 47.560183,
		"lng": -96.857695
	},
	{
		"lat": 47.560147,
		"lng": -96.857546
	},
	{
		"lat": 47.560084,
		"lng": -96.857243
	},
	{
		"lat": 47.560044,
		"lng": -96.856986
	},
	{
		"lat": 47.560017,
		"lng": -96.856779
	},
	{
		"lat": 47.559972,
		"lng": -96.856361
	},
	{
		"lat": 47.559966,
		"lng": -96.856256
	},
	{
		"lat": 47.559965,
		"lng": -96.856098
	},
	{
		"lat": 47.559988,
		"lng": -96.855731
	},
	{
		"lat": 47.560009,
		"lng": -96.855575
	},
	{
		"lat": 47.560023,
		"lng": -96.855419
	},
	{
		"lat": 47.560079,
		"lng": -96.855059
	},
	{
		"lat": 47.5601,
		"lng": -96.854957
	},
	{
		"lat": 47.560176,
		"lng": -96.854661
	},
	{
		"lat": 47.560244,
		"lng": -96.854475
	},
	{
		"lat": 47.560359,
		"lng": -96.854207
	},
	{
		"lat": 47.560459,
		"lng": -96.853987
	},
	{
		"lat": 47.560503,
		"lng": -96.853903
	},
	{
		"lat": 47.560597,
		"lng": -96.853743
	},
	{
		"lat": 47.560772,
		"lng": -96.853477
	},
	{
		"lat": 47.560828,
		"lng": -96.853409
	},
	{
		"lat": 47.561229,
		"lng": -96.8528
	},
	{
		"lat": 47.56195,
		"lng": -96.851767
	},
	{
		"lat": 47.5622,
		"lng": -96.851386
	},
	{
		"lat": 47.562356,
		"lng": -96.851167
	},
	{
		"lat": 47.562495,
		"lng": -96.850998
	},
	{
		"lat": 47.562963,
		"lng": -96.85034
	},
	{
		"lat": 47.563079,
		"lng": -96.850138
	},
	{
		"lat": 47.563255,
		"lng": -96.849804
	},
	{
		"lat": 47.563425,
		"lng": -96.849464
	},
	{
		"lat": 47.563507,
		"lng": -96.84929
	},
	{
		"lat": 47.563797,
		"lng": -96.84875
	},
	{
		"lat": 47.563917,
		"lng": -96.848553
	},
	{
		"lat": 47.563993,
		"lng": -96.84844
	},
	{
		"lat": 47.564125,
		"lng": -96.84826
	},
	{
		"lat": 47.564394,
		"lng": -96.847908
	},
	{
		"lat": 47.564651,
		"lng": -96.847615
	},
	{
		"lat": 47.564743,
		"lng": -96.847531
	},
	{
		"lat": 47.564829,
		"lng": -96.847465
	},
	{
		"lat": 47.564963,
		"lng": -96.847386
	},
	{
		"lat": 47.565209,
		"lng": -96.847296
	},
	{
		"lat": 47.565245,
		"lng": -96.847289
	},
	{
		"lat": 47.56557,
		"lng": -96.84726
	},
	{
		"lat": 47.56575,
		"lng": -96.847264
	},
	{
		"lat": 47.565822,
		"lng": -96.847278
	},
	{
		"lat": 47.565929,
		"lng": -96.847308
	},
	{
		"lat": 47.566064,
		"lng": -96.847383
	},
	{
		"lat": 47.566226,
		"lng": -96.847499
	},
	{
		"lat": 47.566313,
		"lng": -96.847593
	},
	{
		"lat": 47.566443,
		"lng": -96.847777
	},
	{
		"lat": 47.56651,
		"lng": -96.847901
	},
	{
		"lat": 47.566587,
		"lng": -96.84808
	},
	{
		"lat": 47.566598,
		"lng": -96.84813
	},
	{
		"lat": 47.566633,
		"lng": -96.848222
	},
	{
		"lat": 47.566707,
		"lng": -96.848462
	},
	{
		"lat": 47.566715,
		"lng": -96.848513
	},
	{
		"lat": 47.566744,
		"lng": -96.848609
	},
	{
		"lat": 47.566769,
		"lng": -96.849029
	},
	{
		"lat": 47.566763,
		"lng": -96.849187
	},
	{
		"lat": 47.566722,
		"lng": -96.849497
	},
	{
		"lat": 47.566663,
		"lng": -96.849746
	},
	{
		"lat": 47.566576,
		"lng": -96.849977
	},
	{
		"lat": 47.566516,
		"lng": -96.850109
	},
	{
		"lat": 47.566388,
		"lng": -96.850363
	},
	{
		"lat": 47.56618,
		"lng": -96.850728
	},
	{
		"lat": 47.566114,
		"lng": -96.850855
	},
	{
		"lat": 47.566038,
		"lng": -96.851034
	},
	{
		"lat": 47.565976,
		"lng": -96.851164
	},
	{
		"lat": 47.565925,
		"lng": -96.851303
	},
	{
		"lat": 47.565846,
		"lng": -96.85148
	},
	{
		"lat": 47.565712,
		"lng": -96.851855
	},
	{
		"lat": 47.565666,
		"lng": -96.852054
	},
	{
		"lat": 47.565613,
		"lng": -96.852307
	},
	{
		"lat": 47.565538,
		"lng": -96.852768
	},
	{
		"lat": 47.565493,
		"lng": -96.853185
	},
	{
		"lat": 47.56539,
		"lng": -96.854015
	},
	{
		"lat": 47.565359,
		"lng": -96.854221
	},
	{
		"lat": 47.56534,
		"lng": -96.854377
	},
	{
		"lat": 47.565309,
		"lng": -96.854582
	},
	{
		"lat": 47.56525,
		"lng": -96.854886
	},
	{
		"lat": 47.565238,
		"lng": -96.85499
	},
	{
		"lat": 47.56517,
		"lng": -96.85529
	},
	{
		"lat": 47.565117,
		"lng": -96.855486
	},
	{
		"lat": 47.565068,
		"lng": -96.855627
	},
	{
		"lat": 47.565057,
		"lng": -96.855677
	},
	{
		"lat": 47.565027,
		"lng": -96.855773
	},
	{
		"lat": 47.564961,
		"lng": -96.855959
	},
	{
		"lat": 47.564921,
		"lng": -96.856105
	},
	{
		"lat": 47.564902,
		"lng": -96.85615
	},
	{
		"lat": 47.564872,
		"lng": -96.856244
	},
	{
		"lat": 47.564833,
		"lng": -96.856334
	},
	{
		"lat": 47.564718,
		"lng": -96.85672
	},
	{
		"lat": 47.564622,
		"lng": -96.856943
	},
	{
		"lat": 47.564595,
		"lng": -96.857041
	},
	{
		"lat": 47.56444,
		"lng": -96.857397
	},
	{
		"lat": 47.564405,
		"lng": -96.857489
	},
	{
		"lat": 47.563975,
		"lng": -96.858337
	},
	{
		"lat": 47.563479,
		"lng": -96.859244
	},
	{
		"lat": 47.563371,
		"lng": -96.859456
	},
	{
		"lat": 47.563337,
		"lng": -96.859548
	},
	{
		"lat": 47.563235,
		"lng": -96.859781
	},
	{
		"lat": 47.563163,
		"lng": -96.859964
	},
	{
		"lat": 47.563132,
		"lng": -96.860059
	},
	{
		"lat": 47.563012,
		"lng": -96.860322
	},
	{
		"lat": 47.562979,
		"lng": -96.860416
	},
	{
		"lat": 47.562896,
		"lng": -96.860709
	},
	{
		"lat": 47.56286,
		"lng": -96.8608
	},
	{
		"lat": 47.562828,
		"lng": -96.860895
	},
	{
		"lat": 47.562734,
		"lng": -96.861237
	},
	{
		"lat": 47.562661,
		"lng": -96.861535
	},
	{
		"lat": 47.562641,
		"lng": -96.861636
	},
	{
		"lat": 47.562616,
		"lng": -96.861735
	},
	{
		"lat": 47.562543,
		"lng": -96.862198
	},
	{
		"lat": 47.562514,
		"lng": -96.862458
	},
	{
		"lat": 47.562498,
		"lng": -96.862667
	},
	{
		"lat": 47.56249,
		"lng": -96.862824
	},
	{
		"lat": 47.562486,
		"lng": -96.863088
	},
	{
		"lat": 47.562496,
		"lng": -96.863193
	},
	{
		"lat": 47.562511,
		"lng": -96.863296
	},
	{
		"lat": 47.562569,
		"lng": -96.8636
	},
	{
		"lat": 47.562612,
		"lng": -96.863745
	},
	{
		"lat": 47.562614,
		"lng": -96.863757
	},
	{
		"lat": 47.562669,
		"lng": -96.863995
	},
	{
		"lat": 47.562707,
		"lng": -96.864143
	},
	{
		"lat": 47.562791,
		"lng": -96.864434
	},
	{
		"lat": 47.562912,
		"lng": -96.864757
	},
	{
		"lat": 47.562971,
		"lng": -96.86489
	},
	{
		"lat": 47.563006,
		"lng": -96.864982
	},
	{
		"lat": 47.563238,
		"lng": -96.865452
	},
	{
		"lat": 47.563397,
		"lng": -96.865739
	},
	{
		"lat": 47.563619,
		"lng": -96.866085
	},
	{
		"lat": 47.56377,
		"lng": -96.866311
	},
	{
		"lat": 47.564138,
		"lng": -96.866817
	},
	{
		"lat": 47.564225,
		"lng": -96.866912
	},
	{
		"lat": 47.564364,
		"lng": -96.86708
	},
	{
		"lat": 47.564481,
		"lng": -96.867204
	},
	{
		"lat": 47.564908,
		"lng": -96.867599
	},
	{
		"lat": 47.565111,
		"lng": -96.86782
	},
	{
		"lat": 47.565323,
		"lng": -96.86802
	},
	{
		"lat": 47.565512,
		"lng": -96.868176
	},
	{
		"lat": 47.565609,
		"lng": -96.868246
	},
	{
		"lat": 47.565768,
		"lng": -96.868372
	},
	{
		"lat": 47.565962,
		"lng": -96.868514
	},
	{
		"lat": 47.566061,
		"lng": -96.868576
	},
	{
		"lat": 47.566157,
		"lng": -96.86865
	},
	{
		"lat": 47.566365,
		"lng": -96.868741
	},
	{
		"lat": 47.566646,
		"lng": -96.868845
	},
	{
		"lat": 47.566751,
		"lng": -96.868878
	},
	{
		"lat": 47.567002,
		"lng": -96.868934
	},
	{
		"lat": 47.567183,
		"lng": -96.868939
	},
	{
		"lat": 47.567363,
		"lng": -96.868932
	},
	{
		"lat": 47.56758,
		"lng": -96.868904
	},
	{
		"lat": 47.567687,
		"lng": -96.868885
	},
	{
		"lat": 47.567756,
		"lng": -96.868852
	},
	{
		"lat": 47.567861,
		"lng": -96.868813
	},
	{
		"lat": 47.567929,
		"lng": -96.868778
	},
	{
		"lat": 47.568061,
		"lng": -96.868691
	},
	{
		"lat": 47.568095,
		"lng": -96.868675
	},
	{
		"lat": 47.568192,
		"lng": -96.868604
	},
	{
		"lat": 47.568284,
		"lng": -96.868519
	},
	{
		"lat": 47.568369,
		"lng": -96.868422
	},
	{
		"lat": 47.568544,
		"lng": -96.868236
	},
	{
		"lat": 47.568597,
		"lng": -96.868165
	},
	{
		"lat": 47.568825,
		"lng": -96.867826
	},
	{
		"lat": 47.568892,
		"lng": -96.867703
	},
	{
		"lat": 47.568986,
		"lng": -96.867478
	},
	{
		"lat": 47.568963,
		"lng": -96.867279
	},
	{
		"lat": 47.568964,
		"lng": -96.867227
	},
	{
		"lat": 47.56897,
		"lng": -96.867175
	},
	{
		"lat": 47.568991,
		"lng": -96.867074
	},
	{
		"lat": 47.569041,
		"lng": -96.866934
	},
	{
		"lat": 47.569128,
		"lng": -96.866768
	},
	{
		"lat": 47.569249,
		"lng": -96.866575
	},
	{
		"lat": 47.569377,
		"lng": -96.866394
	},
	{
		"lat": 47.56945,
		"lng": -96.866278
	},
	{
		"lat": 47.569507,
		"lng": -96.866215
	},
	{
		"lat": 47.569538,
		"lng": -96.866187
	},
	{
		"lat": 47.569605,
		"lng": -96.866145
	},
	{
		"lat": 47.569655,
		"lng": -96.865869
	},
	{
		"lat": 47.569661,
		"lng": -96.865818
	},
	{
		"lat": 47.569665,
		"lng": -96.865712
	},
	{
		"lat": 47.569663,
		"lng": -96.865607
	},
	{
		"lat": 47.569667,
		"lng": -96.865554
	},
	{
		"lat": 47.569658,
		"lng": -96.86533
	},
	{
		"lat": 47.569634,
		"lng": -96.865176
	},
	{
		"lat": 47.569594,
		"lng": -96.865029
	},
	{
		"lat": 47.569534,
		"lng": -96.864837
	},
	{
		"lat": 47.569451,
		"lng": -96.864666
	},
	{
		"lat": 47.569104,
		"lng": -96.864463
	},
	{
		"lat": 47.568917,
		"lng": -96.864223
	},
	{
		"lat": 47.568826,
		"lng": -96.863806
	},
	{
		"lat": 47.568702,
		"lng": -96.863235
	},
	{
		"lat": 47.568631,
		"lng": -96.862828
	},
	{
		"lat": 47.568641,
		"lng": -96.862588
	},
	{
		"lat": 47.568563,
		"lng": -96.862141
	},
	{
		"lat": 47.568519,
		"lng": -96.86194
	},
	{
		"lat": 47.568461,
		"lng": -96.861746
	},
	{
		"lat": 47.568391,
		"lng": -96.861563
	},
	{
		"lat": 47.568271,
		"lng": -96.8613
	},
	{
		"lat": 47.5681,
		"lng": -96.861029
	},
	{
		"lat": 47.567868,
		"lng": -96.860696
	},
	{
		"lat": 47.567814,
		"lng": -96.860627
	},
	{
		"lat": 47.567713,
		"lng": -96.860475
	},
	{
		"lat": 47.567494,
		"lng": -96.860055
	},
	{
		"lat": 47.567395,
		"lng": -96.859835
	},
	{
		"lat": 47.567284,
		"lng": -96.859389
	},
	{
		"lat": 47.567225,
		"lng": -96.859086
	},
	{
		"lat": 47.567201,
		"lng": -96.858931
	},
	{
		"lat": 47.567146,
		"lng": -96.858463
	},
	{
		"lat": 47.567118,
		"lng": -96.85796
	},
	{
		"lat": 47.567117,
		"lng": -96.857939
	},
	{
		"lat": 47.56711,
		"lng": -96.857622
	},
	{
		"lat": 47.567121,
		"lng": -96.857307
	},
	{
		"lat": 47.567147,
		"lng": -96.85694
	},
	{
		"lat": 47.567165,
		"lng": -96.856838
	},
	{
		"lat": 47.56719,
		"lng": -96.85647
	},
	{
		"lat": 47.567209,
		"lng": -96.856315
	},
	{
		"lat": 47.56727,
		"lng": -96.855476
	},
	{
		"lat": 47.567301,
		"lng": -96.855163
	},
	{
		"lat": 47.567318,
		"lng": -96.85506
	},
	{
		"lat": 47.567337,
		"lng": -96.854904
	},
	{
		"lat": 47.567423,
		"lng": -96.854447
	},
	{
		"lat": 47.567467,
		"lng": -96.854246
	},
	{
		"lat": 47.567528,
		"lng": -96.853997
	},
	{
		"lat": 47.567659,
		"lng": -96.853564
	},
	{
		"lat": 47.56771,
		"lng": -96.853424
	},
	{
		"lat": 47.567732,
		"lng": -96.853324
	},
	{
		"lat": 47.567762,
		"lng": -96.853227
	},
	{
		"lat": 47.567798,
		"lng": -96.853078
	},
	{
		"lat": 47.567855,
		"lng": -96.852885
	},
	{
		"lat": 47.567874,
		"lng": -96.85284
	},
	{
		"lat": 47.567897,
		"lng": -96.852799
	},
	{
		"lat": 47.56793,
		"lng": -96.852712
	},
	{
		"lat": 47.567989,
		"lng": -96.852579
	},
	{
		"lat": 47.568092,
		"lng": -96.852363
	},
	{
		"lat": 47.56814,
		"lng": -96.852284
	},
	{
		"lat": 47.568335,
		"lng": -96.851905
	},
	{
		"lat": 47.568387,
		"lng": -96.851832
	},
	{
		"lat": 47.568498,
		"lng": -96.851698
	},
	{
		"lat": 47.56856,
		"lng": -96.851644
	},
	{
		"lat": 47.568593,
		"lng": -96.851623
	},
	{
		"lat": 47.568655,
		"lng": -96.851568
	},
	{
		"lat": 47.568758,
		"lng": -96.851518
	},
	{
		"lat": 47.569005,
		"lng": -96.851442
	},
	{
		"lat": 47.569113,
		"lng": -96.851419
	},
	{
		"lat": 47.569257,
		"lng": -96.851423
	},
	{
		"lat": 47.569467,
		"lng": -96.851503
	},
	{
		"lat": 47.569575,
		"lng": -96.851525
	},
	{
		"lat": 47.569786,
		"lng": -96.851598
	},
	{
		"lat": 47.570247,
		"lng": -96.851734
	},
	{
		"lat": 47.570351,
		"lng": -96.851779
	},
	{
		"lat": 47.570384,
		"lng": -96.851801
	},
	{
		"lat": 47.570521,
		"lng": -96.851869
	},
	{
		"lat": 47.570652,
		"lng": -96.851957
	},
	{
		"lat": 47.570832,
		"lng": -96.852135
	},
	{
		"lat": 47.570943,
		"lng": -96.85227
	},
	{
		"lat": 47.571031,
		"lng": -96.852362
	},
	{
		"lat": 47.571414,
		"lng": -96.852922
	},
	{
		"lat": 47.571521,
		"lng": -96.853064
	},
	{
		"lat": 47.57155,
		"lng": -96.853095
	},
	{
		"lat": 47.571704,
		"lng": -96.853317
	},
	{
		"lat": 47.571851,
		"lng": -96.853551
	},
	{
		"lat": 47.571941,
		"lng": -96.853715
	},
	{
		"lat": 47.572228,
		"lng": -96.854384
	},
	{
		"lat": 47.572277,
		"lng": -96.854525
	},
	{
		"lat": 47.572357,
		"lng": -96.854701
	},
	{
		"lat": 47.572425,
		"lng": -96.854887
	},
	{
		"lat": 47.572486,
		"lng": -96.855018
	},
	{
		"lat": 47.57256,
		"lng": -96.855259
	},
	{
		"lat": 47.572653,
		"lng": -96.855601
	},
	{
		"lat": 47.572703,
		"lng": -96.855742
	},
	{
		"lat": 47.572714,
		"lng": -96.855792
	},
	{
		"lat": 47.572767,
		"lng": -96.85593
	},
	{
		"lat": 47.572788,
		"lng": -96.855973
	},
	{
		"lat": 47.573065,
		"lng": -96.856652
	},
	{
		"lat": 47.573184,
		"lng": -96.856977
	},
	{
		"lat": 47.573212,
		"lng": -96.857073
	},
	{
		"lat": 47.573295,
		"lng": -96.857308
	},
	{
		"lat": 47.573424,
		"lng": -96.857625
	},
	{
		"lat": 47.573473,
		"lng": -96.857766
	},
	{
		"lat": 47.573531,
		"lng": -96.857959
	},
	{
		"lat": 47.573641,
		"lng": -96.858291
	},
	{
		"lat": 47.57368,
		"lng": -96.858439
	},
	{
		"lat": 47.573698,
		"lng": -96.858484
	},
	{
		"lat": 47.573809,
		"lng": -96.85893
	},
	{
		"lat": 47.573841,
		"lng": -96.859025
	},
	{
		"lat": 47.573889,
		"lng": -96.859224
	},
	{
		"lat": 47.573957,
		"lng": -96.859468
	},
	{
		"lat": 47.574016,
		"lng": -96.859601
	},
	{
		"lat": 47.574099,
		"lng": -96.859773
	},
	{
		"lat": 47.574144,
		"lng": -96.859856
	},
	{
		"lat": 47.574322,
		"lng": -96.860118
	},
	{
		"lat": 47.574408,
		"lng": -96.860215
	},
	{
		"lat": 47.574534,
		"lng": -96.860317
	},
	{
		"lat": 47.574601,
		"lng": -96.860357
	},
	{
		"lat": 47.574666,
		"lng": -96.860405
	},
	{
		"lat": 47.574806,
		"lng": -96.860457
	},
	{
		"lat": 47.575022,
		"lng": -96.860476
	},
	{
		"lat": 47.575166,
		"lng": -96.860457
	},
	{
		"lat": 47.575237,
		"lng": -96.860432
	},
	{
		"lat": 47.575327,
		"lng": -96.860343
	},
	{
		"lat": 47.575381,
		"lng": -96.860273
	},
	{
		"lat": 47.575382,
		"lng": -96.860054
	},
	{
		"lat": 47.575338,
		"lng": -96.859794
	},
	{
		"lat": 47.575351,
		"lng": -96.859484
	},
	{
		"lat": 47.575473,
		"lng": -96.859084
	},
	{
		"lat": 47.575774,
		"lng": -96.858494
	},
	{
		"lat": 47.57611,
		"lng": -96.857973
	},
	{
		"lat": 47.576215,
		"lng": -96.85762
	},
	{
		"lat": 47.576293,
		"lng": -96.857381
	},
	{
		"lat": 47.576363,
		"lng": -96.857198
	},
	{
		"lat": 47.576427,
		"lng": -96.85707
	},
	{
		"lat": 47.576461,
		"lng": -96.856977
	},
	{
		"lat": 47.57655,
		"lng": -96.85681
	},
	{
		"lat": 47.576609,
		"lng": -96.856677
	},
	{
		"lat": 47.57668,
		"lng": -96.856558
	},
	{
		"lat": 47.576744,
		"lng": -96.85643
	},
	{
		"lat": 47.576839,
		"lng": -96.85627
	},
	{
		"lat": 47.576881,
		"lng": -96.856185
	},
	{
		"lat": 47.576976,
		"lng": -96.856025
	},
	{
		"lat": 47.577365,
		"lng": -96.855401
	},
	{
		"lat": 47.577514,
		"lng": -96.855203
	},
	{
		"lat": 47.577552,
		"lng": -96.855153
	},
	{
		"lat": 47.577638,
		"lng": -96.855056
	},
	{
		"lat": 47.577769,
		"lng": -96.854873
	},
	{
		"lat": 47.578046,
		"lng": -96.854534
	},
	{
		"lat": 47.578151,
		"lng": -96.85439
	},
	{
		"lat": 47.578208,
		"lng": -96.854323
	},
	{
		"lat": 47.578268,
		"lng": -96.854265
	},
	{
		"lat": 47.578323,
		"lng": -96.854197
	},
	{
		"lat": 47.578562,
		"lng": -96.853958
	},
	{
		"lat": 47.578624,
		"lng": -96.853905
	},
	{
		"lat": 47.578787,
		"lng": -96.85379
	},
	{
		"lat": 47.57885,
		"lng": -96.853739
	},
	{
		"lat": 47.579192,
		"lng": -96.853565
	},
	{
		"lat": 47.579223,
		"lng": -96.853539
	},
	{
		"lat": 47.579304,
		"lng": -96.853497
	},
	{
		"lat": 47.579537,
		"lng": -96.853351
	},
	{
		"lat": 47.579642,
		"lng": -96.853313
	},
	{
		"lat": 47.57971,
		"lng": -96.853277
	},
	{
		"lat": 47.58009,
		"lng": -96.853102
	},
	{
		"lat": 47.58023,
		"lng": -96.853054
	},
	{
		"lat": 47.580333,
		"lng": -96.853003
	},
	{
		"lat": 47.580582,
		"lng": -96.852938
	},
	{
		"lat": 47.58094,
		"lng": -96.852862
	},
	{
		"lat": 47.581084,
		"lng": -96.85284
	},
	{
		"lat": 47.581482,
		"lng": -96.852831
	},
	{
		"lat": 47.581844,
		"lng": -96.85284
	},
	{
		"lat": 47.582204,
		"lng": -96.85289
	},
	{
		"lat": 47.582566,
		"lng": -96.852904
	},
	{
		"lat": 47.582752,
		"lng": -96.853159
	},
	{
		"lat": 47.582924,
		"lng": -96.853285
	},
	{
		"lat": 47.58325,
		"lng": -96.853336
	},
	{
		"lat": 47.583634,
		"lng": -96.853252
	},
	{
		"lat": 47.583865,
		"lng": -96.853114
	},
	{
		"lat": 47.584157,
		"lng": -96.852877
	},
	{
		"lat": 47.584288,
		"lng": -96.852724
	},
	{
		"lat": 47.584311,
		"lng": -96.852479
	},
	{
		"lat": 47.584417,
		"lng": -96.852425
	},
	{
		"lat": 47.584438,
		"lng": -96.852407
	},
	{
		"lat": 47.58448,
		"lng": -96.852374
	},
	{
		"lat": 47.584614,
		"lng": -96.852296
	},
	{
		"lat": 47.584684,
		"lng": -96.85227
	},
	{
		"lat": 47.584741,
		"lng": -96.852226
	},
	{
		"lat": 47.584819,
		"lng": -96.85219
	},
	{
		"lat": 47.584879,
		"lng": -96.852163
	},
	{
		"lat": 47.58495,
		"lng": -96.852122
	},
	{
		"lat": 47.584962,
		"lng": -96.852114
	},
	{
		"lat": 47.585001,
		"lng": -96.852092
	},
	{
		"lat": 47.585014,
		"lng": -96.852085
	},
	{
		"lat": 47.585047,
		"lng": -96.852066
	},
	{
		"lat": 47.585115,
		"lng": -96.852032
	},
	{
		"lat": 47.585198,
		"lng": -96.851971
	},
	{
		"lat": 47.585309,
		"lng": -96.85189
	},
	{
		"lat": 47.585506,
		"lng": -96.851759
	},
	{
		"lat": 47.585607,
		"lng": -96.851699
	},
	{
		"lat": 47.585677,
		"lng": -96.851671
	},
	{
		"lat": 47.585751,
		"lng": -96.851632
	},
	{
		"lat": 47.585779,
		"lng": -96.851618
	},
	{
		"lat": 47.585955,
		"lng": -96.851558
	},
	{
		"lat": 47.586133,
		"lng": -96.851512
	},
	{
		"lat": 47.586458,
		"lng": -96.851479
	},
	{
		"lat": 47.586855,
		"lng": -96.851471
	},
	{
		"lat": 47.586903,
		"lng": -96.851466
	},
	{
		"lat": 47.587223,
		"lng": -96.851384
	},
	{
		"lat": 47.587365,
		"lng": -96.851342
	},
	{
		"lat": 47.587508,
		"lng": -96.851314
	},
	{
		"lat": 47.587614,
		"lng": -96.851278
	},
	{
		"lat": 47.5879,
		"lng": -96.85121
	},
	{
		"lat": 47.587969,
		"lng": -96.851183
	},
	{
		"lat": 47.588003,
		"lng": -96.851164
	},
	{
		"lat": 47.588143,
		"lng": -96.851111
	},
	{
		"lat": 47.588212,
		"lng": -96.851077
	},
	{
		"lat": 47.588319,
		"lng": -96.851051
	},
	{
		"lat": 47.588457,
		"lng": -96.850989
	},
	{
		"lat": 47.588599,
		"lng": -96.850948
	},
	{
		"lat": 47.588775,
		"lng": -96.850885
	},
	{
		"lat": 47.588914,
		"lng": -96.850827
	},
	{
		"lat": 47.589016,
		"lng": -96.850775
	},
	{
		"lat": 47.58912,
		"lng": -96.85073
	},
	{
		"lat": 47.589359,
		"lng": -96.850606
	},
	{
		"lat": 47.589493,
		"lng": -96.850528
	},
	{
		"lat": 47.589528,
		"lng": -96.850515
	},
	{
		"lat": 47.589902,
		"lng": -96.85032
	},
	{
		"lat": 47.589967,
		"lng": -96.850272
	},
	{
		"lat": 47.590001,
		"lng": -96.850255
	},
	{
		"lat": 47.590163,
		"lng": -96.850139
	},
	{
		"lat": 47.590263,
		"lng": -96.85008
	},
	{
		"lat": 47.590367,
		"lng": -96.850033
	},
	{
		"lat": 47.590541,
		"lng": -96.849965
	},
	{
		"lat": 47.590725,
		"lng": -96.849915
	},
	{
		"lat": 47.590754,
		"lng": -96.849908
	},
	{
		"lat": 47.590826,
		"lng": -96.849897
	},
	{
		"lat": 47.590898,
		"lng": -96.849896
	},
	{
		"lat": 47.591114,
		"lng": -96.849915
	},
	{
		"lat": 47.591256,
		"lng": -96.849957
	},
	{
		"lat": 47.59136,
		"lng": -96.850002
	},
	{
		"lat": 47.591493,
		"lng": -96.850085
	},
	{
		"lat": 47.591783,
		"lng": -96.850299
	},
	{
		"lat": 47.591905,
		"lng": -96.850412
	},
	{
		"lat": 47.591992,
		"lng": -96.850507
	},
	{
		"lat": 47.592047,
		"lng": -96.850575
	},
	{
		"lat": 47.592324,
		"lng": -96.850991
	},
	{
		"lat": 47.592579,
		"lng": -96.851437
	},
	{
		"lat": 47.59264,
		"lng": -96.851569
	},
	{
		"lat": 47.59267,
		"lng": -96.851664
	},
	{
		"lat": 47.592705,
		"lng": -96.851757
	},
	{
		"lat": 47.592833,
		"lng": -96.852306
	},
	{
		"lat": 47.592849,
		"lng": -96.852462
	},
	{
		"lat": 47.592866,
		"lng": -96.852565
	},
	{
		"lat": 47.592876,
		"lng": -96.852723
	},
	{
		"lat": 47.592897,
		"lng": -96.852931
	},
	{
		"lat": 47.592904,
		"lng": -96.853036
	},
	{
		"lat": 47.592967,
		"lng": -96.853662
	},
	{
		"lat": 47.59298,
		"lng": -96.853712
	},
	{
		"lat": 47.592997,
		"lng": -96.853868
	},
	{
		"lat": 47.593011,
		"lng": -96.853917
	},
	{
		"lat": 47.593043,
		"lng": -96.854123
	},
	{
		"lat": 47.593112,
		"lng": -96.854366
	},
	{
		"lat": 47.593122,
		"lng": -96.854417
	},
	{
		"lat": 47.593219,
		"lng": -96.854639
	},
	{
		"lat": 47.593252,
		"lng": -96.854734
	},
	{
		"lat": 47.593303,
		"lng": -96.854829
	},
	{
		"lat": 47.593378,
		"lng": -96.855009
	},
	{
		"lat": 47.593419,
		"lng": -96.855096
	},
	{
		"lat": 47.593455,
		"lng": -96.855187
	},
	{
		"lat": 47.593497,
		"lng": -96.855274
	},
	{
		"lat": 47.593554,
		"lng": -96.855408
	},
	{
		"lat": 47.593644,
		"lng": -96.855637
	},
	{
		"lat": 47.593745,
		"lng": -96.855916
	},
	{
		"lat": 47.59379,
		"lng": -96.85606
	},
	{
		"lat": 47.593825,
		"lng": -96.856153
	},
	{
		"lat": 47.593849,
		"lng": -96.856252
	},
	{
		"lat": 47.593909,
		"lng": -96.856444
	},
	{
		"lat": 47.594059,
		"lng": -96.856865
	},
	{
		"lat": 47.594071,
		"lng": -96.856914
	},
	{
		"lat": 47.594401,
		"lng": -96.857853
	},
	{
		"lat": 47.594475,
		"lng": -96.858034
	},
	{
		"lat": 47.59458,
		"lng": -96.858249
	},
	{
		"lat": 47.594626,
		"lng": -96.85833
	},
	{
		"lat": 47.594832,
		"lng": -96.858627
	},
	{
		"lat": 47.594917,
		"lng": -96.858725
	},
	{
		"lat": 47.595009,
		"lng": -96.858809
	},
	{
		"lat": 47.595103,
		"lng": -96.858887
	},
	{
		"lat": 47.595136,
		"lng": -96.858909
	},
	{
		"lat": 47.595205,
		"lng": -96.858941
	},
	{
		"lat": 47.595347,
		"lng": -96.858981
	},
	{
		"lat": 47.595564,
		"lng": -96.858981
	},
	{
		"lat": 47.595636,
		"lng": -96.858974
	},
	{
		"lat": 47.595742,
		"lng": -96.858937
	},
	{
		"lat": 47.595872,
		"lng": -96.858846
	},
	{
		"lat": 47.595932,
		"lng": -96.858788
	},
	{
		"lat": 47.596011,
		"lng": -96.858679
	},
	{
		"lat": 47.59611,
		"lng": -96.858525
	},
	{
		"lat": 47.596181,
		"lng": -96.858341
	},
	{
		"lat": 47.596204,
		"lng": -96.858242
	},
	{
		"lat": 47.596236,
		"lng": -96.858147
	},
	{
		"lat": 47.596253,
		"lng": -96.857991
	},
	{
		"lat": 47.596256,
		"lng": -96.857727
	},
	{
		"lat": 47.596252,
		"lng": -96.857569
	},
	{
		"lat": 47.59624,
		"lng": -96.857359
	},
	{
		"lat": 47.596209,
		"lng": -96.856992
	},
	{
		"lat": 47.59617,
		"lng": -96.856204
	},
	{
		"lat": 47.596156,
		"lng": -96.855678
	},
	{
		"lat": 47.59611,
		"lng": -96.85521
	},
	{
		"lat": 47.596085,
		"lng": -96.854996
	},
	{
		"lat": 47.59605,
		"lng": -96.854691
	},
	{
		"lat": 47.59598,
		"lng": -96.853909
	},
	{
		"lat": 47.595974,
		"lng": -96.853804
	},
	{
		"lat": 47.595973,
		"lng": -96.853645
	},
	{
		"lat": 47.595984,
		"lng": -96.853488
	},
	{
		"lat": 47.596034,
		"lng": -96.853181
	},
	{
		"lat": 47.596075,
		"lng": -96.853035
	},
	{
		"lat": 47.596169,
		"lng": -96.85275
	},
	{
		"lat": 47.596211,
		"lng": -96.852664
	},
	{
		"lat": 47.596267,
		"lng": -96.852528
	},
	{
		"lat": 47.59633,
		"lng": -96.852399
	},
	{
		"lat": 47.596449,
		"lng": -96.852201
	},
	{
		"lat": 47.596653,
		"lng": -96.851903
	},
	{
		"lat": 47.596811,
		"lng": -96.851686
	},
	{
		"lat": 47.596896,
		"lng": -96.851588
	},
	{
		"lat": 47.597047,
		"lng": -96.851444
	},
	{
		"lat": 47.597274,
		"lng": -96.851281
	},
	{
		"lat": 47.597375,
		"lng": -96.851224
	},
	{
		"lat": 47.597479,
		"lng": -96.851179
	},
	{
		"lat": 47.597547,
		"lng": -96.851143
	},
	{
		"lat": 47.597688,
		"lng": -96.851095
	},
	{
		"lat": 47.59794,
		"lng": -96.851051
	},
	{
		"lat": 47.598046,
		"lng": -96.85102
	},
	{
		"lat": 47.598154,
		"lng": -96.851007
	},
	{
		"lat": 47.598189,
		"lng": -96.850993
	},
	{
		"lat": 47.598292,
		"lng": -96.850983
	},
	{
		"lat": 47.598508,
		"lng": -96.851012
	},
	{
		"lat": 47.598544,
		"lng": -96.851021
	},
	{
		"lat": 47.598752,
		"lng": -96.851113
	},
	{
		"lat": 47.598854,
		"lng": -96.851166
	},
	{
		"lat": 47.598988,
		"lng": -96.851245
	},
	{
		"lat": 47.599145,
		"lng": -96.851376
	},
	{
		"lat": 47.599264,
		"lng": -96.851495
	},
	{
		"lat": 47.59938,
		"lng": -96.851621
	},
	{
		"lat": 47.599511,
		"lng": -96.851802
	},
	{
		"lat": 47.599717,
		"lng": -96.852099
	},
	{
		"lat": 47.599807,
		"lng": -96.852264
	},
	{
		"lat": 47.599922,
		"lng": -96.852531
	},
	{
		"lat": 47.599957,
		"lng": -96.852624
	},
	{
		"lat": 47.599969,
		"lng": -96.852673
	},
	{
		"lat": 47.600048,
		"lng": -96.852911
	},
	{
		"lat": 47.600257,
		"lng": -96.853697
	},
	{
		"lat": 47.600306,
		"lng": -96.853896
	},
	{
		"lat": 47.600337,
		"lng": -96.853991
	},
	{
		"lat": 47.600374,
		"lng": -96.85414
	},
	{
		"lat": 47.600434,
		"lng": -96.854331
	},
	{
		"lat": 47.600471,
		"lng": -96.854535
	},
	{
		"lat": 47.600488,
		"lng": -96.854582
	},
	{
		"lat": 47.600574,
		"lng": -96.854931
	},
	{
		"lat": 47.600619,
		"lng": -96.855075
	},
	{
		"lat": 47.60063,
		"lng": -96.855126
	},
	{
		"lat": 47.600698,
		"lng": -96.855312
	},
	{
		"lat": 47.60071,
		"lng": -96.855363
	},
	{
		"lat": 47.600772,
		"lng": -96.855492
	},
	{
		"lat": 47.60079,
		"lng": -96.855538
	},
	{
		"lat": 47.600897,
		"lng": -96.855752
	},
	{
		"lat": 47.600966,
		"lng": -96.855876
	},
	{
		"lat": 47.601088,
		"lng": -96.856072
	},
	{
		"lat": 47.601164,
		"lng": -96.856184
	},
	{
		"lat": 47.601272,
		"lng": -96.856327
	},
	{
		"lat": 47.601419,
		"lng": -96.856484
	},
	{
		"lat": 47.60154,
		"lng": -96.856601
	},
	{
		"lat": 47.601698,
		"lng": -96.856727
	},
	{
		"lat": 47.601832,
		"lng": -96.856812
	},
	{
		"lat": 47.601937,
		"lng": -96.856856
	},
	{
		"lat": 47.602255,
		"lng": -96.856963
	},
	{
		"lat": 47.602326,
		"lng": -96.856981
	},
	{
		"lat": 47.602398,
		"lng": -96.856991
	},
	{
		"lat": 47.602471,
		"lng": -96.856992
	},
	{
		"lat": 47.602869,
		"lng": -96.85696
	},
	{
		"lat": 47.602941,
		"lng": -96.856949
	},
	{
		"lat": 47.603099,
		"lng": -96.856904
	},
	{
		"lat": 47.603142,
		"lng": -96.85683
	},
	{
		"lat": 47.60317,
		"lng": -96.856797
	},
	{
		"lat": 47.603262,
		"lng": -96.85671
	},
	{
		"lat": 47.603358,
		"lng": -96.856636
	},
	{
		"lat": 47.603662,
		"lng": -96.856473
	},
	{
		"lat": 47.603694,
		"lng": -96.856449
	},
	{
		"lat": 47.603795,
		"lng": -96.85639
	},
	{
		"lat": 47.603969,
		"lng": -96.856315
	},
	{
		"lat": 47.60404,
		"lng": -96.856292
	},
	{
		"lat": 47.604108,
		"lng": -96.856258
	},
	{
		"lat": 47.604143,
		"lng": -96.856248
	},
	{
		"lat": 47.604253,
		"lng": -96.85625
	},
	{
		"lat": 47.604305,
		"lng": -96.856198
	},
	{
		"lat": 47.604369,
		"lng": -96.856147
	},
	{
		"lat": 47.604486,
		"lng": -96.856023
	},
	{
		"lat": 47.60455,
		"lng": -96.855972
	},
	{
		"lat": 47.60464,
		"lng": -96.855883
	},
	{
		"lat": 47.604696,
		"lng": -96.855816
	},
	{
		"lat": 47.604877,
		"lng": -96.855641
	},
	{
		"lat": 47.60494,
		"lng": -96.85559
	},
	{
		"lat": 47.605029,
		"lng": -96.855498
	},
	{
		"lat": 47.605281,
		"lng": -96.855291
	},
	{
		"lat": 47.605477,
		"lng": -96.85515
	},
	{
		"lat": 47.605578,
		"lng": -96.855093
	},
	{
		"lat": 47.605784,
		"lng": -96.854993
	},
	{
		"lat": 47.605961,
		"lng": -96.85493
	},
	{
		"lat": 47.606103,
		"lng": -96.85489
	},
	{
		"lat": 47.606319,
		"lng": -96.854845
	},
	{
		"lat": 47.606391,
		"lng": -96.854837
	},
	{
		"lat": 47.606681,
		"lng": -96.854824
	},
	{
		"lat": 47.606862,
		"lng": -96.854821
	},
	{
		"lat": 47.607151,
		"lng": -96.854859
	},
	{
		"lat": 47.607259,
		"lng": -96.854881
	},
	{
		"lat": 47.607614,
		"lng": -96.854992
	},
	{
		"lat": 47.607888,
		"lng": -96.855073
	},
	{
		"lat": 47.608182,
		"lng": -96.855161
	},
	{
		"lat": 47.608464,
		"lng": -96.855261
	},
	{
		"lat": 47.608848,
		"lng": -96.855408
	},
	{
		"lat": 47.609021,
		"lng": -96.855488
	},
	{
		"lat": 47.609122,
		"lng": -96.855542
	},
	{
		"lat": 47.609188,
		"lng": -96.855586
	},
	{
		"lat": 47.609257,
		"lng": -96.855616
	},
	{
		"lat": 47.609325,
		"lng": -96.855653
	},
	{
		"lat": 47.609555,
		"lng": -96.855807
	},
	{
		"lat": 47.609714,
		"lng": -96.855933
	},
	{
		"lat": 47.609866,
		"lng": -96.856074
	},
	{
		"lat": 47.609955,
		"lng": -96.856165
	},
	{
		"lat": 47.61024,
		"lng": -96.856487
	},
	{
		"lat": 47.610329,
		"lng": -96.856579
	},
	{
		"lat": 47.610606,
		"lng": -96.856917
	},
	{
		"lat": 47.610666,
		"lng": -96.856975
	},
	{
		"lat": 47.610745,
		"lng": -96.857082
	},
	{
		"lat": 47.610921,
		"lng": -96.857348
	},
	{
		"lat": 47.611286,
		"lng": -96.857932
	},
	{
		"lat": 47.611378,
		"lng": -96.858096
	},
	{
		"lat": 47.611565,
		"lng": -96.858484
	},
	{
		"lat": 47.611788,
		"lng": -96.858962
	},
	{
		"lat": 47.611899,
		"lng": -96.859234
	},
	{
		"lat": 47.611986,
		"lng": -96.859464
	},
	{
		"lat": 47.612028,
		"lng": -96.859551
	},
	{
		"lat": 47.612068,
		"lng": -96.859698
	},
	{
		"lat": 47.612139,
		"lng": -96.859996
	},
	{
		"lat": 47.612169,
		"lng": -96.860092
	},
	{
		"lat": 47.612193,
		"lng": -96.860192
	},
	{
		"lat": 47.61221,
		"lng": -96.860348
	},
	{
		"lat": 47.612229,
		"lng": -96.86045
	},
	{
		"lat": 47.61228,
		"lng": -96.860811
	},
	{
		"lat": 47.612314,
		"lng": -96.861232
	},
	{
		"lat": 47.612318,
		"lng": -96.861283
	},
	{
		"lat": 47.612347,
		"lng": -96.861756
	},
	{
		"lat": 47.61237,
		"lng": -96.862336
	},
	{
		"lat": 47.612366,
		"lng": -96.863022
	},
	{
		"lat": 47.612345,
		"lng": -96.863549
	},
	{
		"lat": 47.612333,
		"lng": -96.864129
	},
	{
		"lat": 47.61233,
		"lng": -96.864709
	},
	{
		"lat": 47.612338,
		"lng": -96.864814
	},
	{
		"lat": 47.612353,
		"lng": -96.864918
	},
	{
		"lat": 47.612363,
		"lng": -96.865022
	},
	{
		"lat": 47.612429,
		"lng": -96.865433
	},
	{
		"lat": 47.612467,
		"lng": -96.865581
	},
	{
		"lat": 47.612485,
		"lng": -96.865627
	},
	{
		"lat": 47.612526,
		"lng": -96.865773
	},
	{
		"lat": 47.612561,
		"lng": -96.865923
	},
	{
		"lat": 47.612675,
		"lng": -96.866252
	},
	{
		"lat": 47.61279,
		"lng": -96.86652
	},
	{
		"lat": 47.612835,
		"lng": -96.866602
	},
	{
		"lat": 47.612986,
		"lng": -96.866829
	},
	{
		"lat": 47.613064,
		"lng": -96.866939
	},
	{
		"lat": 47.613256,
		"lng": -96.86718
	},
	{
		"lat": 47.613342,
		"lng": -96.867276
	},
	{
		"lat": 47.613493,
		"lng": -96.867421
	},
	{
		"lat": 47.613671,
		"lng": -96.867602
	},
	{
		"lat": 47.613735,
		"lng": -96.867651
	},
	{
		"lat": 47.613794,
		"lng": -96.867713
	},
	{
		"lat": 47.613887,
		"lng": -96.867793
	},
	{
		"lat": 47.61392,
		"lng": -96.867816
	},
	{
		"lat": 47.614012,
		"lng": -96.8679
	},
	{
		"lat": 47.614075,
		"lng": -96.867951
	},
	{
		"lat": 47.614109,
		"lng": -96.867971
	},
	{
		"lat": 47.614232,
		"lng": -96.868082
	},
	{
		"lat": 47.614295,
		"lng": -96.868133
	},
	{
		"lat": 47.614413,
		"lng": -96.868255
	},
	{
		"lat": 47.614469,
		"lng": -96.868302
	},
	{
		"lat": 47.614548,
		"lng": -96.86841
	},
	{
		"lat": 47.614647,
		"lng": -96.868565
	},
	{
		"lat": 47.614714,
		"lng": -96.868688
	},
	{
		"lat": 47.61477,
		"lng": -96.868824
	},
	{
		"lat": 47.614836,
		"lng": -96.869012
	},
	{
		"lat": 47.614848,
		"lng": -96.869061
	},
	{
		"lat": 47.61486,
		"lng": -96.869165
	},
	{
		"lat": 47.614866,
		"lng": -96.86927
	},
	{
		"lat": 47.614863,
		"lng": -96.869481
	},
	{
		"lat": 47.614858,
		"lng": -96.869534
	},
	{
		"lat": 47.61482,
		"lng": -96.869737
	},
	{
		"lat": 47.614791,
		"lng": -96.869833
	},
	{
		"lat": 47.614782,
		"lng": -96.869884
	},
	{
		"lat": 47.61474,
		"lng": -96.87003
	},
	{
		"lat": 47.614704,
		"lng": -96.870122
	},
	{
		"lat": 47.614658,
		"lng": -96.870265
	},
	{
		"lat": 47.614638,
		"lng": -96.870309
	},
	{
		"lat": 47.614515,
		"lng": -96.870631
	},
	{
		"lat": 47.614434,
		"lng": -96.870806
	},
	{
		"lat": 47.614343,
		"lng": -96.870969
	},
	{
		"lat": 47.614111,
		"lng": -96.871302
	},
	{
		"lat": 47.614026,
		"lng": -96.871401
	},
	{
		"lat": 47.613782,
		"lng": -96.871715
	},
	{
		"lat": 47.613711,
		"lng": -96.871835
	},
	{
		"lat": 47.613606,
		"lng": -96.872049
	},
	{
		"lat": 47.61354,
		"lng": -96.872294
	},
	{
		"lat": 47.613501,
		"lng": -96.872498
	},
	{
		"lat": 47.613487,
		"lng": -96.872601
	},
	{
		"lat": 47.613478,
		"lng": -96.872706
	},
	{
		"lat": 47.613475,
		"lng": -96.873075
	},
	{
		"lat": 47.613487,
		"lng": -96.873338
	},
	{
		"lat": 47.613501,
		"lng": -96.873442
	},
	{
		"lat": 47.613525,
		"lng": -96.873541
	},
	{
		"lat": 47.613533,
		"lng": -96.873592
	},
	{
		"lat": 47.613546,
		"lng": -96.873641
	},
	{
		"lat": 47.613565,
		"lng": -96.873687
	},
	{
		"lat": 47.61374,
		"lng": -96.873952
	},
	{
		"lat": 47.613768,
		"lng": -96.873987
	},
	{
		"lat": 47.613827,
		"lng": -96.874047
	},
	{
		"lat": 47.613889,
		"lng": -96.874101
	},
	{
		"lat": 47.613989,
		"lng": -96.874161
	},
	{
		"lat": 47.614278,
		"lng": -96.874186
	},
	{
		"lat": 47.614348,
		"lng": -96.874186
	},
	{
		"lat": 47.614652,
		"lng": -96.87412
	},
	{
		"lat": 47.61479,
		"lng": -96.874059
	},
	{
		"lat": 47.614891,
		"lng": -96.874005
	},
	{
		"lat": 47.614989,
		"lng": -96.873936
	},
	{
		"lat": 47.615048,
		"lng": -96.873876
	},
	{
		"lat": 47.615111,
		"lng": -96.873824
	},
	{
		"lat": 47.615258,
		"lng": -96.873671
	},
	{
		"lat": 47.615314,
		"lng": -96.873605
	},
	{
		"lat": 47.615445,
		"lng": -96.873425
	},
	{
		"lat": 47.615595,
		"lng": -96.873196
	},
	{
		"lat": 47.615716,
		"lng": -96.873001
	},
	{
		"lat": 47.615762,
		"lng": -96.872919
	},
	{
		"lat": 47.615882,
		"lng": -96.872656
	},
	{
		"lat": 47.615898,
		"lng": -96.872609
	},
	{
		"lat": 47.615984,
		"lng": -96.872439
	},
	{
		"lat": 47.616036,
		"lng": -96.8723
	},
	{
		"lat": 47.616118,
		"lng": -96.872128
	},
	{
		"lat": 47.616272,
		"lng": -96.871771
	},
	{
		"lat": 47.616528,
		"lng": -96.871398
	},
	{
		"lat": 47.616641,
		"lng": -96.871266
	},
	{
		"lat": 47.616777,
		"lng": -96.871094
	},
	{
		"lat": 47.616861,
		"lng": -96.870995
	},
	{
		"lat": 47.616924,
		"lng": -96.870944
	},
	{
		"lat": 47.616958,
		"lng": -96.870925
	},
	{
		"lat": 47.617023,
		"lng": -96.870878
	},
	{
		"lat": 47.617127,
		"lng": -96.870832
	},
	{
		"lat": 47.617234,
		"lng": -96.870813
	},
	{
		"lat": 47.617415,
		"lng": -96.870792
	},
	{
		"lat": 47.617559,
		"lng": -96.8708
	},
	{
		"lat": 47.617703,
		"lng": -96.870822
	},
	{
		"lat": 47.61781,
		"lng": -96.870847
	},
	{
		"lat": 47.617877,
		"lng": -96.870885
	},
	{
		"lat": 47.617981,
		"lng": -96.87093
	},
	{
		"lat": 47.618074,
		"lng": -96.87101
	},
	{
		"lat": 47.61816,
		"lng": -96.871106
	},
	{
		"lat": 47.618264,
		"lng": -96.871253
	},
	{
		"lat": 47.618359,
		"lng": -96.871411
	},
	{
		"lat": 47.618428,
		"lng": -96.871597
	},
	{
		"lat": 47.618476,
		"lng": -96.871796
	},
	{
		"lat": 47.618497,
		"lng": -96.872004
	},
	{
		"lat": 47.61836,
		"lng": -96.872338
	},
	{
		"lat": 47.618379,
		"lng": -96.872708
	},
	{
		"lat": 47.618451,
		"lng": -96.872954
	},
	{
		"lat": 47.61851,
		"lng": -96.873187
	},
	{
		"lat": 47.618745,
		"lng": -96.874167
	},
	{
		"lat": 47.618863,
		"lng": -96.874659
	},
	{
		"lat": 47.619065,
		"lng": -96.875433
	},
	{
		"lat": 47.619084,
		"lng": -96.876003
	},
	{
		"lat": 47.619008,
		"lng": -96.877108
	},
	{
		"lat": 47.618796,
		"lng": -96.877876
	},
	{
		"lat": 47.618792,
		"lng": -96.878579
	},
	{
		"lat": 47.618812,
		"lng": -96.878982
	},
	{
		"lat": 47.619039,
		"lng": -96.879421
	},
	{
		"lat": 47.619336,
		"lng": -96.879726
	},
	{
		"lat": 47.619864,
		"lng": -96.879767
	},
	{
		"lat": 47.620255,
		"lng": -96.879705
	},
	{
		"lat": 47.620533,
		"lng": -96.879307
	},
	{
		"lat": 47.621324,
		"lng": -96.877809
	},
	{
		"lat": 47.621628,
		"lng": -96.876975
	},
	{
		"lat": 47.622069,
		"lng": -96.876277
	},
	{
		"lat": 47.622622,
		"lng": -96.875916
	},
	{
		"lat": 47.623059,
		"lng": -96.875822
	},
	{
		"lat": 47.623449,
		"lng": -96.87586
	},
	{
		"lat": 47.62402,
		"lng": -96.876404
	},
	{
		"lat": 47.62445,
		"lng": -96.877516
	},
	{
		"lat": 47.624491,
		"lng": -96.878221
	},
	{
		"lat": 47.62451,
		"lng": -96.878824
	},
	{
		"lat": 47.624666,
		"lng": -96.879597
	},
	{
		"lat": 47.624779,
		"lng": -96.879867
	},
	{
		"lat": 47.625236,
		"lng": -96.880376
	},
	{
		"lat": 47.625625,
		"lng": -96.880582
	},
	{
		"lat": 47.626016,
		"lng": -96.880487
	},
	{
		"lat": 47.62634,
		"lng": -96.880055
	},
	{
		"lat": 47.626713,
		"lng": -96.879223
	},
	{
		"lat": 47.626765,
		"lng": -96.878318
	},
	{
		"lat": 47.626681,
		"lng": -96.87711
	},
	{
		"lat": 47.626594,
		"lng": -96.876271
	},
	{
		"lat": 47.626552,
		"lng": -96.875567
	},
	{
		"lat": 47.626554,
		"lng": -96.875357
	},
	{
		"lat": 47.626778,
		"lng": -96.874722
	},
	{
		"lat": 47.626913,
		"lng": -96.874519
	},
	{
		"lat": 47.627077,
		"lng": -96.874412
	},
	{
		"lat": 47.627264,
		"lng": -96.874331
	},
	{
		"lat": 47.62744,
		"lng": -96.874332
	},
	{
		"lat": 47.627824,
		"lng": -96.874373
	},
	{
		"lat": 47.628171,
		"lng": -96.874529
	},
	{
		"lat": 47.628349,
		"lng": -96.87472
	},
	{
		"lat": 47.628572,
		"lng": -96.874997
	},
	{
		"lat": 47.628694,
		"lng": -96.875196
	},
	{
		"lat": 47.628736,
		"lng": -96.875357
	},
	{
		"lat": 47.62869,
		"lng": -96.875358
	},
	{
		"lat": 47.62887,
		"lng": -96.875967
	},
	{
		"lat": 47.628912,
		"lng": -96.876638
	},
	{
		"lat": 47.628882,
		"lng": -96.877777
	},
	{
		"lat": 47.628832,
		"lng": -96.878413
	},
	{
		"lat": 47.628714,
		"lng": -96.87878
	},
	{
		"lat": 47.628711,
		"lng": -96.87935
	},
	{
		"lat": 47.628889,
		"lng": -96.880157
	},
	{
		"lat": 47.629459,
		"lng": -96.880902
	},
	{
		"lat": 47.63003,
		"lng": -96.88148
	},
	{
		"lat": 47.630626,
		"lng": -96.881655
	},
	{
		"lat": 47.631428,
		"lng": -96.881867
	},
	{
		"lat": 47.632233,
		"lng": -96.881845
	},
	{
		"lat": 47.632875,
		"lng": -96.881954
	},
	{
		"lat": 47.633127,
		"lng": -96.882058
	},
	{
		"lat": 47.63347,
		"lng": -96.882297
	},
	{
		"lat": 47.633699,
		"lng": -96.882468
	},
	{
		"lat": 47.634018,
		"lng": -96.882794
	},
	{
		"lat": 47.634523,
		"lng": -96.883495
	},
	{
		"lat": 47.635113,
		"lng": -96.884526
	},
	{
		"lat": 47.636261,
		"lng": -96.885949
	},
	{
		"lat": 47.636835,
		"lng": -96.886647
	},
	{
		"lat": 47.637723,
		"lng": -96.887631
	},
	{
		"lat": 47.638316,
		"lng": -96.888074
	},
	{
		"lat": 47.638911,
		"lng": -96.88821
	},
	{
		"lat": 47.639648,
		"lng": -96.888092
	},
	{
		"lat": 47.639967,
		"lng": -96.887534
	},
	{
		"lat": 47.640148,
		"lng": -96.886901
	},
	{
		"lat": 47.640326,
		"lng": -96.886285
	},
	{
		"lat": 47.640437,
		"lng": -96.885263
	},
	{
		"lat": 47.640583,
		"lng": -96.88437
	},
	{
		"lat": 47.640983,
		"lng": -96.883506
	},
	{
		"lat": 47.641389,
		"lng": -96.883051
	},
	{
		"lat": 47.641883,
		"lng": -96.882571
	},
	{
		"lat": 47.642656,
		"lng": -96.882351
	},
	{
		"lat": 47.643041,
		"lng": -96.882382
	},
	{
		"lat": 47.643426,
		"lng": -96.882592
	},
	{
		"lat": 47.643827,
		"lng": -96.882828
	},
	{
		"lat": 47.644266,
		"lng": -96.882859
	},
	{
		"lat": 47.645169,
		"lng": -96.882718
	},
	{
		"lat": 47.645977,
		"lng": -96.88255
	},
	{
		"lat": 47.646521,
		"lng": -96.882481
	},
	{
		"lat": 47.646959,
		"lng": -96.882384
	},
	{
		"lat": 47.647364,
		"lng": -96.882236
	},
	{
		"lat": 47.648083,
		"lng": -96.882118
	},
	{
		"lat": 47.649389,
		"lng": -96.882212
	},
	{
		"lat": 47.650053,
		"lng": -96.882477
	},
	{
		"lat": 47.650609,
		"lng": -96.883329
	},
	{
		"lat": 47.650869,
		"lng": -96.883717
	},
	{
		"lat": 47.651077,
		"lng": -96.884052
	},
	{
		"lat": 47.651246,
		"lng": -96.884301
	},
	{
		"lat": 47.651348,
		"lng": -96.88446
	},
	{
		"lat": 47.651381,
		"lng": -96.884516
	},
	{
		"lat": 47.65156,
		"lng": -96.884819
	},
	{
		"lat": 47.651718,
		"lng": -96.885173
	},
	{
		"lat": 47.651844,
		"lng": -96.885431
	},
	{
		"lat": 47.651932,
		"lng": -96.885599
	},
	{
		"lat": 47.652051,
		"lng": -96.885797
	},
	{
		"lat": 47.652305,
		"lng": -96.886174
	},
	{
		"lat": 47.652386,
		"lng": -96.886278
	},
	{
		"lat": 47.652473,
		"lng": -96.886373
	},
	{
		"lat": 47.652563,
		"lng": -96.886461
	},
	{
		"lat": 47.652631,
		"lng": -96.886517
	},
	{
		"lat": 47.652752,
		"lng": -96.886616
	},
	{
		"lat": 47.652886,
		"lng": -96.886695
	},
	{
		"lat": 47.652991,
		"lng": -96.886734
	},
	{
		"lat": 47.653204,
		"lng": -96.886794
	},
	{
		"lat": 47.653419,
		"lng": -96.886838
	},
	{
		"lat": 47.653671,
		"lng": -96.886845
	},
	{
		"lat": 47.654069,
		"lng": -96.886813
	},
	{
		"lat": 47.65414,
		"lng": -96.88679
	},
	{
		"lat": 47.654644,
		"lng": -96.88672
	},
	{
		"lat": 47.65486,
		"lng": -96.886697
	},
	{
		"lat": 47.654932,
		"lng": -96.886681
	},
	{
		"lat": 47.655148,
		"lng": -96.886658
	},
	{
		"lat": 47.655474,
		"lng": -96.886679
	},
	{
		"lat": 47.655582,
		"lng": -96.886693
	},
	{
		"lat": 47.655688,
		"lng": -96.88673
	},
	{
		"lat": 47.655865,
		"lng": -96.886782
	},
	{
		"lat": 47.656424,
		"lng": -96.887002
	},
	{
		"lat": 47.65699,
		"lng": -96.887174
	},
	{
		"lat": 47.657094,
		"lng": -96.887219
	},
	{
		"lat": 47.657437,
		"lng": -96.887384
	},
	{
		"lat": 47.657542,
		"lng": -96.887425
	},
	{
		"lat": 47.657648,
		"lng": -96.887457
	},
	{
		"lat": 47.657935,
		"lng": -96.887518
	},
	{
		"lat": 47.658188,
		"lng": -96.88753
	},
	{
		"lat": 47.658405,
		"lng": -96.887518
	},
	{
		"lat": 47.658729,
		"lng": -96.887485
	},
	{
		"lat": 47.658905,
		"lng": -96.887425
	},
	{
		"lat": 47.659083,
		"lng": -96.887382
	},
	{
		"lat": 47.659188,
		"lng": -96.88734
	},
	{
		"lat": 47.659291,
		"lng": -96.887291
	},
	{
		"lat": 47.659456,
		"lng": -96.887184
	},
	{
		"lat": 47.659621,
		"lng": -96.887079
	},
	{
		"lat": 47.659649,
		"lng": -96.887046
	},
	{
		"lat": 47.659745,
		"lng": -96.886971
	},
	{
		"lat": 47.659811,
		"lng": -96.88693
	},
	{
		"lat": 47.660264,
		"lng": -96.886607
	},
	{
		"lat": 47.660327,
		"lng": -96.886555
	},
	{
		"lat": 47.660456,
		"lng": -96.886463
	},
	{
		"lat": 47.660582,
		"lng": -96.886363
	},
	{
		"lat": 47.660612,
		"lng": -96.886333
	},
	{
		"lat": 47.660775,
		"lng": -96.886221
	},
	{
		"lat": 47.660867,
		"lng": -96.886137
	},
	{
		"lat": 47.660964,
		"lng": -96.886067
	},
	{
		"lat": 47.661026,
		"lng": -96.886011
	},
	{
		"lat": 47.661257,
		"lng": -96.885862
	},
	{
		"lat": 47.661317,
		"lng": -96.885803
	},
	{
		"lat": 47.661361,
		"lng": -96.88577
	},
	{
		"lat": 47.661702,
		"lng": -96.885587
	},
	{
		"lat": 47.661842,
		"lng": -96.885535
	},
	{
		"lat": 47.66209,
		"lng": -96.885456
	},
	{
		"lat": 47.662159,
		"lng": -96.885427
	},
	{
		"lat": 47.662302,
		"lng": -96.885391
	},
	{
		"lat": 47.662442,
		"lng": -96.885341
	},
	{
		"lat": 47.662586,
		"lng": -96.885317
	},
	{
		"lat": 47.662694,
		"lng": -96.885308
	},
	{
		"lat": 47.662875,
		"lng": -96.885306
	},
	{
		"lat": 47.663063,
		"lng": -96.885309
	},
	{
		"lat": 47.663201,
		"lng": -96.885312
	},
	{
		"lat": 47.663381,
		"lng": -96.885329
	},
	{
		"lat": 47.663597,
		"lng": -96.88536
	},
	{
		"lat": 47.663884,
		"lng": -96.885419
	},
	{
		"lat": 47.664268,
		"lng": -96.885571
	},
	{
		"lat": 47.664644,
		"lng": -96.885761
	},
	{
		"lat": 47.664978,
		"lng": -96.885961
	},
	{
		"lat": 47.665141,
		"lng": -96.886075
	},
	{
		"lat": 47.665266,
		"lng": -96.88618
	},
	{
		"lat": 47.665699,
		"lng": -96.886449
	},
	{
		"lat": 47.665728,
		"lng": -96.886479
	},
	{
		"lat": 47.665924,
		"lng": -96.886615
	},
	{
		"lat": 47.666019,
		"lng": -96.886691
	},
	{
		"lat": 47.666149,
		"lng": -96.886785
	},
	{
		"lat": 47.666211,
		"lng": -96.886839
	},
	{
		"lat": 47.666361,
		"lng": -96.886987
	},
	{
		"lat": 47.666534,
		"lng": -96.887179
	},
	{
		"lat": 47.666741,
		"lng": -96.887392
	},
	{
		"lat": 47.666804,
		"lng": -96.887444
	},
	{
		"lat": 47.667238,
		"lng": -96.888004
	},
	{
		"lat": 47.667378,
		"lng": -96.888171
	},
	{
		"lat": 47.667402,
		"lng": -96.888191
	},
	{
		"lat": 47.667441,
		"lng": -96.888224
	},
	{
		"lat": 47.667548,
		"lng": -96.888365
	},
	{
		"lat": 47.667693,
		"lng": -96.888525
	},
	{
		"lat": 47.667882,
		"lng": -96.888771
	},
	{
		"lat": 47.668119,
		"lng": -96.889013
	},
	{
		"lat": 47.668405,
		"lng": -96.889335
	},
	{
		"lat": 47.668529,
		"lng": -96.889443
	},
	{
		"lat": 47.668591,
		"lng": -96.889481
	},
	{
		"lat": 47.668616,
		"lng": -96.8895
	},
	{
		"lat": 47.668655,
		"lng": -96.88953
	},
	{
		"lat": 47.668756,
		"lng": -96.889587
	},
	{
		"lat": 47.668888,
		"lng": -96.889675
	},
	{
		"lat": 47.669165,
		"lng": -96.889794
	},
	{
		"lat": 47.669341,
		"lng": -96.889856
	},
	{
		"lat": 47.669373,
		"lng": -96.889862
	},
	{
		"lat": 47.669735,
		"lng": -96.889937
	},
	{
		"lat": 47.669771,
		"lng": -96.889939
	},
	{
		"lat": 47.670167,
		"lng": -96.889878
	},
	{
		"lat": 47.670345,
		"lng": -96.889834
	},
	{
		"lat": 47.670413,
		"lng": -96.889798
	},
	{
		"lat": 47.670606,
		"lng": -96.889654
	},
	{
		"lat": 47.670726,
		"lng": -96.889535
	},
	{
		"lat": 47.670866,
		"lng": -96.889368
	},
	{
		"lat": 47.671017,
		"lng": -96.889142
	},
	{
		"lat": 47.67118,
		"lng": -96.88886
	},
	{
		"lat": 47.671289,
		"lng": -96.888641
	},
	{
		"lat": 47.671308,
		"lng": -96.888604
	},
	{
		"lat": 47.671402,
		"lng": -96.888378
	},
	{
		"lat": 47.671501,
		"lng": -96.888159
	},
	{
		"lat": 47.671565,
		"lng": -96.888031
	},
	{
		"lat": 47.671633,
		"lng": -96.88787
	},
	{
		"lat": 47.671679,
		"lng": -96.887762
	},
	{
		"lat": 47.671722,
		"lng": -96.887666
	},
	{
		"lat": 47.671779,
		"lng": -96.887542
	},
	{
		"lat": 47.671969,
		"lng": -96.887093
	},
	{
		"lat": 47.671984,
		"lng": -96.887053
	},
	{
		"lat": 47.672041,
		"lng": -96.886909
	},
	{
		"lat": 47.672063,
		"lng": -96.886846
	},
	{
		"lat": 47.67209,
		"lng": -96.886768
	},
	{
		"lat": 47.67215,
		"lng": -96.886637
	},
	{
		"lat": 47.672154,
		"lng": -96.886629
	},
	{
		"lat": 47.672243,
		"lng": -96.886475
	},
	{
		"lat": 47.672341,
		"lng": -96.886253
	},
	{
		"lat": 47.672445,
		"lng": -96.886038
	},
	{
		"lat": 47.672469,
		"lng": -96.885997
	},
	{
		"lat": 47.672593,
		"lng": -96.885797
	},
	{
		"lat": 47.672606,
		"lng": -96.885774
	},
	{
		"lat": 47.672639,
		"lng": -96.885723
	},
	{
		"lat": 47.672649,
		"lng": -96.885708
	},
	{
		"lat": 47.672665,
		"lng": -96.885687
	},
	{
		"lat": 47.672708,
		"lng": -96.885641
	},
	{
		"lat": 47.672738,
		"lng": -96.885603
	},
	{
		"lat": 47.672925,
		"lng": -96.885362
	},
	{
		"lat": 47.672983,
		"lng": -96.8853
	},
	{
		"lat": 47.673074,
		"lng": -96.885215
	},
	{
		"lat": 47.673143,
		"lng": -96.88518
	},
	{
		"lat": 47.673242,
		"lng": -96.885117
	},
	{
		"lat": 47.673349,
		"lng": -96.885089
	},
	{
		"lat": 47.67349,
		"lng": -96.885042
	},
	{
		"lat": 47.673562,
		"lng": -96.885033
	},
	{
		"lat": 47.673697,
		"lng": -96.885064
	},
	{
		"lat": 47.673705,
		"lng": -96.885066
	},
	{
		"lat": 47.673757,
		"lng": -96.885091
	},
	{
		"lat": 47.673808,
		"lng": -96.885116
	},
	{
		"lat": 47.673906,
		"lng": -96.885185
	},
	{
		"lat": 47.673966,
		"lng": -96.885243
	},
	{
		"lat": 47.674044,
		"lng": -96.885353
	},
	{
		"lat": 47.674068,
		"lng": -96.885393
	},
	{
		"lat": 47.674128,
		"lng": -96.885525
	},
	{
		"lat": 47.674177,
		"lng": -96.885666
	},
	{
		"lat": 47.674201,
		"lng": -96.885766
	},
	{
		"lat": 47.674246,
		"lng": -96.886021
	},
	{
		"lat": 47.674251,
		"lng": -96.886074
	},
	{
		"lat": 47.674263,
		"lng": -96.88639
	},
	{
		"lat": 47.674255,
		"lng": -96.886706
	},
	{
		"lat": 47.674245,
		"lng": -96.886811
	},
	{
		"lat": 47.674204,
		"lng": -96.887068
	},
	{
		"lat": 47.674165,
		"lng": -96.887215
	},
	{
		"lat": 47.674146,
		"lng": -96.887317
	},
	{
		"lat": 47.674112,
		"lng": -96.887467
	},
	{
		"lat": 47.674079,
		"lng": -96.887562
	},
	{
		"lat": 47.674056,
		"lng": -96.887662
	},
	{
		"lat": 47.673994,
		"lng": -96.887852
	},
	{
		"lat": 47.673983,
		"lng": -96.887902
	},
	{
		"lat": 47.673932,
		"lng": -96.888042
	},
	{
		"lat": 47.673909,
		"lng": -96.888142
	},
	{
		"lat": 47.673875,
		"lng": -96.888235
	},
	{
		"lat": 47.673835,
		"lng": -96.888382
	},
	{
		"lat": 47.673803,
		"lng": -96.888476
	},
	{
		"lat": 47.673761,
		"lng": -96.888622
	},
	{
		"lat": 47.673676,
		"lng": -96.888854
	},
	{
		"lat": 47.673634,
		"lng": -96.888985
	},
	{
		"lat": 47.673615,
		"lng": -96.889046
	},
	{
		"lat": 47.673555,
		"lng": -96.889295
	},
	{
		"lat": 47.67349,
		"lng": -96.88954
	},
	{
		"lat": 47.673387,
		"lng": -96.889992
	},
	{
		"lat": 47.673304,
		"lng": -96.890397
	},
	{
		"lat": 47.673117,
		"lng": -96.891579
	},
	{
		"lat": 47.673069,
		"lng": -96.891995
	},
	{
		"lat": 47.673042,
		"lng": -96.892309
	},
	{
		"lat": 47.673027,
		"lng": -96.892572
	},
	{
		"lat": 47.673029,
		"lng": -96.892889
	},
	{
		"lat": 47.673055,
		"lng": -96.893521
	},
	{
		"lat": 47.673074,
		"lng": -96.893784
	},
	{
		"lat": 47.673099,
		"lng": -96.893882
	},
	{
		"lat": 47.673124,
		"lng": -96.894037
	},
	{
		"lat": 47.673158,
		"lng": -96.894187
	},
	{
		"lat": 47.673178,
		"lng": -96.894231
	},
	{
		"lat": 47.673231,
		"lng": -96.894427
	},
	{
		"lat": 47.673295,
		"lng": -96.894616
	},
	{
		"lat": 47.673349,
		"lng": -96.894754
	},
	{
		"lat": 47.673389,
		"lng": -96.894842
	},
	{
		"lat": 47.673439,
		"lng": -96.894982
	},
	{
		"lat": 47.673598,
		"lng": -96.895335
	},
	{
		"lat": 47.673703,
		"lng": -96.89555
	},
	{
		"lat": 47.67382,
		"lng": -96.895751
	},
	{
		"lat": 47.673894,
		"lng": -96.895866
	},
	{
		"lat": 47.674075,
		"lng": -96.896125
	},
	{
		"lat": 47.674194,
		"lng": -96.896246
	},
	{
		"lat": 47.674355,
		"lng": -96.896365
	},
	{
		"lat": 47.674457,
		"lng": -96.896421
	},
	{
		"lat": 47.674527,
		"lng": -96.896449
	},
	{
		"lat": 47.674577,
		"lng": -96.896479
	},
	{
		"lat": 47.674753,
		"lng": -96.896541
	},
	{
		"lat": 47.675005,
		"lng": -96.896588
	},
	{
		"lat": 47.67533,
		"lng": -96.896598
	},
	{
		"lat": 47.675402,
		"lng": -96.896592
	},
	{
		"lat": 47.675725,
		"lng": -96.896541
	},
	{
		"lat": 47.675796,
		"lng": -96.896515
	},
	{
		"lat": 47.676117,
		"lng": -96.896443
	},
	{
		"lat": 47.676257,
		"lng": -96.896388
	},
	{
		"lat": 47.676615,
		"lng": -96.896314
	},
	{
		"lat": 47.676684,
		"lng": -96.896284
	},
	{
		"lat": 47.676896,
		"lng": -96.896216
	},
	{
		"lat": 47.676965,
		"lng": -96.896183
	},
	{
		"lat": 47.677142,
		"lng": -96.896127
	},
	{
		"lat": 47.677211,
		"lng": -96.896098
	},
	{
		"lat": 47.677531,
		"lng": -96.896011
	},
	{
		"lat": 47.677855,
		"lng": -96.895971
	},
	{
		"lat": 47.677964,
		"lng": -96.895971
	},
	{
		"lat": 47.678181,
		"lng": -96.895988
	},
	{
		"lat": 47.678288,
		"lng": -96.896009
	},
	{
		"lat": 47.678395,
		"lng": -96.896038
	},
	{
		"lat": 47.67871,
		"lng": -96.89616
	},
	{
		"lat": 47.67884,
		"lng": -96.89622
	},
	{
		"lat": 47.678985,
		"lng": -96.896286
	},
	{
		"lat": 47.679464,
		"lng": -96.896524
	},
	{
		"lat": 47.679739,
		"lng": -96.896653
	},
	{
		"lat": 47.679806,
		"lng": -96.896692
	},
	{
		"lat": 47.679904,
		"lng": -96.896759
	},
	{
		"lat": 47.680271,
		"lng": -96.89698
	},
	{
		"lat": 47.680341,
		"lng": -96.897011
	},
	{
		"lat": 47.680473,
		"lng": -96.897096
	},
	{
		"lat": 47.680542,
		"lng": -96.897129
	},
	{
		"lat": 47.680743,
		"lng": -96.897247
	},
	{
		"lat": 47.680847,
		"lng": -96.897289
	},
	{
		"lat": 47.681016,
		"lng": -96.897384
	},
	{
		"lat": 47.681118,
		"lng": -96.897435
	},
	{
		"lat": 47.681329,
		"lng": -96.897515
	},
	{
		"lat": 47.68154,
		"lng": -96.897583
	},
	{
		"lat": 47.681751,
		"lng": -96.89766
	},
	{
		"lat": 47.682386,
		"lng": -96.897871
	},
	{
		"lat": 47.682562,
		"lng": -96.897935
	},
	{
		"lat": 47.682596,
		"lng": -96.897953
	},
	{
		"lat": 47.682703,
		"lng": -96.89798
	},
	{
		"lat": 47.682844,
		"lng": -96.898028
	},
	{
		"lat": 47.683018,
		"lng": -96.898097
	},
	{
		"lat": 47.683086,
		"lng": -96.898133
	},
	{
		"lat": 47.683191,
		"lng": -96.898177
	},
	{
		"lat": 47.683463,
		"lng": -96.898321
	},
	{
		"lat": 47.683562,
		"lng": -96.898386
	},
	{
		"lat": 47.683666,
		"lng": -96.898431
	},
	{
		"lat": 47.684039,
		"lng": -96.898631
	},
	{
		"lat": 47.68435,
		"lng": -96.898772
	},
	{
		"lat": 47.684702,
		"lng": -96.898895
	},
	{
		"lat": 47.684915,
		"lng": -96.898956
	},
	{
		"lat": 47.685558,
		"lng": -96.899108
	},
	{
		"lat": 47.685665,
		"lng": -96.899128
	},
	{
		"lat": 47.686099,
		"lng": -96.899139
	},
	{
		"lat": 47.686822,
		"lng": -96.899086
	},
	{
		"lat": 47.687284,
		"lng": -96.899069
	},
	{
		"lat": 47.687383,
		"lng": -96.899081
	},
	{
		"lat": 47.687416,
		"lng": -96.899082
	},
	{
		"lat": 47.687744,
		"lng": -96.899092
	},
	{
		"lat": 47.687924,
		"lng": -96.899088
	},
	{
		"lat": 47.687962,
		"lng": -96.899088
	},
	{
		"lat": 47.688685,
		"lng": -96.89907
	},
	{
		"lat": 47.688866,
		"lng": -96.899077
	},
	{
		"lat": 47.689047,
		"lng": -96.899096
	},
	{
		"lat": 47.689227,
		"lng": -96.899122
	},
	{
		"lat": 47.689405,
		"lng": -96.899169
	},
	{
		"lat": 47.689579,
		"lng": -96.899237
	},
	{
		"lat": 47.689912,
		"lng": -96.899446
	},
	{
		"lat": 47.690048,
		"lng": -96.899518
	},
	{
		"lat": 47.690214,
		"lng": -96.89962
	},
	{
		"lat": 47.690376,
		"lng": -96.899736
	},
	{
		"lat": 47.690443,
		"lng": -96.899777
	},
	{
		"lat": 47.690781,
		"lng": -96.900083
	},
	{
		"lat": 47.690865,
		"lng": -96.900183
	},
	{
		"lat": 47.690928,
		"lng": -96.900234
	},
	{
		"lat": 47.690958,
		"lng": -96.900264
	},
	{
		"lat": 47.691097,
		"lng": -96.900431
	},
	{
		"lat": 47.691345,
		"lng": -96.900814
	},
	{
		"lat": 47.691397,
		"lng": -96.900888
	},
	{
		"lat": 47.691444,
		"lng": -96.900968
	},
	{
		"lat": 47.691539,
		"lng": -96.901192
	},
	{
		"lat": 47.691631,
		"lng": -96.901479
	},
	{
		"lat": 47.69165,
		"lng": -96.901581
	},
	{
		"lat": 47.691669,
		"lng": -96.901626
	},
	{
		"lat": 47.691681,
		"lng": -96.901676
	},
	{
		"lat": 47.691705,
		"lng": -96.901884
	},
	{
		"lat": 47.691714,
		"lng": -96.902042
	},
	{
		"lat": 47.691687,
		"lng": -96.902409
	},
	{
		"lat": 47.691675,
		"lng": -96.902514
	},
	{
		"lat": 47.691658,
		"lng": -96.90256
	},
	{
		"lat": 47.691622,
		"lng": -96.90271
	},
	{
		"lat": 47.691539,
		"lng": -96.902944
	},
	{
		"lat": 47.691495,
		"lng": -96.903028
	},
	{
		"lat": 47.691455,
		"lng": -96.903116
	},
	{
		"lat": 47.691305,
		"lng": -96.903346
	},
	{
		"lat": 47.691195,
		"lng": -96.903482
	},
	{
		"lat": 47.691105,
		"lng": -96.90357
	},
	{
		"lat": 47.690909,
		"lng": -96.903707
	},
	{
		"lat": 47.690783,
		"lng": -96.903808
	},
	{
		"lat": 47.690685,
		"lng": -96.903875
	},
	{
		"lat": 47.69046,
		"lng": -96.904042
	},
	{
		"lat": 47.690393,
		"lng": -96.904083
	},
	{
		"lat": 47.690296,
		"lng": -96.904154
	},
	{
		"lat": 47.690195,
		"lng": -96.90421
	},
	{
		"lat": 47.690063,
		"lng": -96.904296
	},
	{
		"lat": 47.689971,
		"lng": -96.904378
	},
	{
		"lat": 47.689936,
		"lng": -96.904395
	},
	{
		"lat": 47.689745,
		"lng": -96.904544
	},
	{
		"lat": 47.689705,
		"lng": -96.904586
	},
	{
		"lat": 47.689578,
		"lng": -96.904686
	},
	{
		"lat": 47.689437,
		"lng": -96.904852
	},
	{
		"lat": 47.689275,
		"lng": -96.905063
	},
	{
		"lat": 47.68918,
		"lng": -96.905223
	},
	{
		"lat": 47.688896,
		"lng": -96.905768
	},
	{
		"lat": 47.688879,
		"lng": -96.905815
	},
	{
		"lat": 47.688798,
		"lng": -96.90599
	},
	{
		"lat": 47.688748,
		"lng": -96.906131
	},
	{
		"lat": 47.688703,
		"lng": -96.906275
	},
	{
		"lat": 47.688692,
		"lng": -96.906325
	},
	{
		"lat": 47.688637,
		"lng": -96.90652
	},
	{
		"lat": 47.688567,
		"lng": -96.906819
	},
	{
		"lat": 47.688546,
		"lng": -96.906974
	},
	{
		"lat": 47.688527,
		"lng": -96.907183
	},
	{
		"lat": 47.68851,
		"lng": -96.907552
	},
	{
		"lat": 47.688505,
		"lng": -96.907869
	},
	{
		"lat": 47.688519,
		"lng": -96.907972
	},
	{
		"lat": 47.688521,
		"lng": -96.908025
	},
	{
		"lat": 47.688529,
		"lng": -96.908077
	},
	{
		"lat": 47.688608,
		"lng": -96.908426
	},
	{
		"lat": 47.688657,
		"lng": -96.908568
	},
	{
		"lat": 47.688698,
		"lng": -96.908655
	},
	{
		"lat": 47.688749,
		"lng": -96.908795
	},
	{
		"lat": 47.688818,
		"lng": -96.908916
	},
	{
		"lat": 47.689013,
		"lng": -96.909228
	},
	{
		"lat": 47.68919,
		"lng": -96.909493
	},
	{
		"lat": 47.689218,
		"lng": -96.909527
	},
	{
		"lat": 47.68943,
		"lng": -96.909728
	},
	{
		"lat": 47.689496,
		"lng": -96.909771
	},
	{
		"lat": 47.689601,
		"lng": -96.909812
	},
	{
		"lat": 47.689777,
		"lng": -96.90987
	},
	{
		"lat": 47.690064,
		"lng": -96.909928
	},
	{
		"lat": 47.690172,
		"lng": -96.909937
	},
	{
		"lat": 47.690822,
		"lng": -96.909965
	},
	{
		"lat": 47.691112,
		"lng": -96.909949
	},
	{
		"lat": 47.691398,
		"lng": -96.909899
	},
	{
		"lat": 47.691433,
		"lng": -96.909887
	},
	{
		"lat": 47.691605,
		"lng": -96.909803
	},
	{
		"lat": 47.691709,
		"lng": -96.909763
	},
	{
		"lat": 47.69181,
		"lng": -96.909703
	},
	{
		"lat": 47.691939,
		"lng": -96.909608
	},
	{
		"lat": 47.692156,
		"lng": -96.909419
	},
	{
		"lat": 47.692246,
		"lng": -96.90933
	},
	{
		"lat": 47.692357,
		"lng": -96.909195
	},
	{
		"lat": 47.69241,
		"lng": -96.909123
	},
	{
		"lat": 47.692633,
		"lng": -96.908853
	},
	{
		"lat": 47.692863,
		"lng": -96.908516
	},
	{
		"lat": 47.693009,
		"lng": -96.908282
	},
	{
		"lat": 47.693421,
		"lng": -96.907547
	},
	{
		"lat": 47.693522,
		"lng": -96.907396
	},
	{
		"lat": 47.693635,
		"lng": -96.907263
	},
	{
		"lat": 47.693789,
		"lng": -96.907128
	},
	{
		"lat": 47.69389,
		"lng": -96.907068
	},
	{
		"lat": 47.693993,
		"lng": -96.90702
	},
	{
		"lat": 47.694065,
		"lng": -96.907007
	},
	{
		"lat": 47.694137,
		"lng": -96.907004
	},
	{
		"lat": 47.694426,
		"lng": -96.907019
	},
	{
		"lat": 47.694569,
		"lng": -96.907051
	},
	{
		"lat": 47.694676,
		"lng": -96.907081
	},
	{
		"lat": 47.694817,
		"lng": -96.90713
	},
	{
		"lat": 47.694954,
		"lng": -96.907195
	},
	{
		"lat": 47.695124,
		"lng": -96.907285
	},
	{
		"lat": 47.695177,
		"lng": -96.907305
	},
	{
		"lat": 47.695472,
		"lng": -96.907505
	},
	{
		"lat": 47.69569,
		"lng": -96.907689
	},
	{
		"lat": 47.695924,
		"lng": -96.907939
	},
	{
		"lat": 47.696059,
		"lng": -96.908114
	},
	{
		"lat": 47.696244,
		"lng": -96.908366
	},
	{
		"lat": 47.696414,
		"lng": -96.908562
	},
	{
		"lat": 47.696549,
		"lng": -96.908738
	},
	{
		"lat": 47.69669,
		"lng": -96.908904
	},
	{
		"lat": 47.696865,
		"lng": -96.909092
	},
	{
		"lat": 47.696926,
		"lng": -96.909147
	},
	{
		"lat": 47.697022,
		"lng": -96.909221
	},
	{
		"lat": 47.697208,
		"lng": -96.909384
	},
	{
		"lat": 47.697274,
		"lng": -96.909427
	},
	{
		"lat": 47.697305,
		"lng": -96.909455
	},
	{
		"lat": 47.697667,
		"lng": -96.909696
	},
	{
		"lat": 47.697901,
		"lng": -96.909839
	},
	{
		"lat": 47.698276,
		"lng": -96.91003
	},
	{
		"lat": 47.698343,
		"lng": -96.910072
	},
	{
		"lat": 47.698378,
		"lng": -96.910084
	},
	{
		"lat": 47.698566,
		"lng": -96.910187
	},
	{
		"lat": 47.698663,
		"lng": -96.910259
	},
	{
		"lat": 47.698707,
		"lng": -96.91028
	},
	{
		"lat": 47.69911,
		"lng": -96.910471
	},
	{
		"lat": 47.699245,
		"lng": -96.910545
	},
	{
		"lat": 47.69931,
		"lng": -96.910591
	},
	{
		"lat": 47.699515,
		"lng": -96.910696
	},
	{
		"lat": 47.699619,
		"lng": -96.910742
	},
	{
		"lat": 47.700339,
		"lng": -96.911092
	},
	{
		"lat": 47.700806,
		"lng": -96.911377
	},
	{
		"lat": 47.700837,
		"lng": -96.911404
	},
	{
		"lat": 47.700936,
		"lng": -96.911467
	},
	{
		"lat": 47.701062,
		"lng": -96.91157
	},
	{
		"lat": 47.701241,
		"lng": -96.911749
	},
	{
		"lat": 47.701465,
		"lng": -96.912017
	},
	{
		"lat": 47.701617,
		"lng": -96.912244
	},
	{
		"lat": 47.701756,
		"lng": -96.912486
	},
	{
		"lat": 47.701833,
		"lng": -96.912665
	},
	{
		"lat": 47.701896,
		"lng": -96.912855
	},
	{
		"lat": 47.701914,
		"lng": -96.912957
	},
	{
		"lat": 47.701943,
		"lng": -96.913054
	},
	{
		"lat": 47.701946,
		"lng": -96.913212
	},
	{
		"lat": 47.701942,
		"lng": -96.913477
	},
	{
		"lat": 47.701918,
		"lng": -96.913631
	},
	{
		"lat": 47.701868,
		"lng": -96.913829
	},
	{
		"lat": 47.701803,
		"lng": -96.914017
	},
	{
		"lat": 47.701735,
		"lng": -96.91414
	},
	{
		"lat": 47.701582,
		"lng": -96.914365
	},
	{
		"lat": 47.700871,
		"lng": -96.915343
	},
	{
		"lat": 47.700357,
		"lng": -96.916009
	},
	{
		"lat": 47.699848,
		"lng": -96.916686
	},
	{
		"lat": 47.69979,
		"lng": -96.916749
	},
	{
		"lat": 47.699627,
		"lng": -96.916959
	},
	{
		"lat": 47.699549,
		"lng": -96.917069
	},
	{
		"lat": 47.699476,
		"lng": -96.917186
	},
	{
		"lat": 47.699408,
		"lng": -96.91731
	},
	{
		"lat": 47.69935,
		"lng": -96.917443
	},
	{
		"lat": 47.699289,
		"lng": -96.917635
	},
	{
		"lat": 47.699226,
		"lng": -96.917883
	},
	{
		"lat": 47.699176,
		"lng": -96.918191
	},
	{
		"lat": 47.69915,
		"lng": -96.918399
	},
	{
		"lat": 47.69914,
		"lng": -96.918556
	},
	{
		"lat": 47.69915,
		"lng": -96.919031
	},
	{
		"lat": 47.699191,
		"lng": -96.919449
	},
	{
		"lat": 47.699244,
		"lng": -96.919756
	},
	{
		"lat": 47.699267,
		"lng": -96.919856
	},
	{
		"lat": 47.699317,
		"lng": -96.919997
	},
	{
		"lat": 47.699328,
		"lng": -96.920047
	},
	{
		"lat": 47.699346,
		"lng": -96.920093
	},
	{
		"lat": 47.699392,
		"lng": -96.920175
	},
	{
		"lat": 47.699569,
		"lng": -96.92044
	},
	{
		"lat": 47.699649,
		"lng": -96.920546
	},
	{
		"lat": 47.699853,
		"lng": -96.920764
	},
	{
		"lat": 47.699976,
		"lng": -96.920875
	},
	{
		"lat": 47.700043,
		"lng": -96.920915
	},
	{
		"lat": 47.700146,
		"lng": -96.920998
	},
	{
		"lat": 47.700285,
		"lng": -96.921059
	},
	{
		"lat": 47.700356,
		"lng": -96.921081
	},
	{
		"lat": 47.700499,
		"lng": -96.921112
	},
	{
		"lat": 47.700571,
		"lng": -96.92112
	},
	{
		"lat": 47.700755,
		"lng": -96.921092
	},
	{
		"lat": 47.700894,
		"lng": -96.921071
	},
	{
		"lat": 47.701,
		"lng": -96.921038
	},
	{
		"lat": 47.701069,
		"lng": -96.921005
	},
	{
		"lat": 47.701305,
		"lng": -96.920873
	},
	{
		"lat": 47.701401,
		"lng": -96.9208
	},
	{
		"lat": 47.70155,
		"lng": -96.92065
	},
	{
		"lat": 47.701616,
		"lng": -96.920605
	},
	{
		"lat": 47.701733,
		"lng": -96.920482
	},
	{
		"lat": 47.701815,
		"lng": -96.920379
	},
	{
		"lat": 47.702045,
		"lng": -96.920042
	},
	{
		"lat": 47.702244,
		"lng": -96.919734
	},
	{
		"lat": 47.702529,
		"lng": -96.919329
	},
	{
		"lat": 47.702704,
		"lng": -96.919062
	},
	{
		"lat": 47.702876,
		"lng": -96.91879
	},
	{
		"lat": 47.702971,
		"lng": -96.918632
	},
	{
		"lat": 47.703108,
		"lng": -96.918385
	},
	{
		"lat": 47.703149,
		"lng": -96.918298
	},
	{
		"lat": 47.70324,
		"lng": -96.918134
	},
	{
		"lat": 47.703277,
		"lng": -96.918044
	},
	{
		"lat": 47.703319,
		"lng": -96.917897
	},
	{
		"lat": 47.703356,
		"lng": -96.917807
	},
	{
		"lat": 47.70337,
		"lng": -96.917758
	},
	{
		"lat": 47.703379,
		"lng": -96.917707
	},
	{
		"lat": 47.703408,
		"lng": -96.917611
	},
	{
		"lat": 47.70344,
		"lng": -96.917405
	},
	{
		"lat": 47.703447,
		"lng": -96.917141
	},
	{
		"lat": 47.703444,
		"lng": -96.916983
	},
	{
		"lat": 47.70343,
		"lng": -96.916667
	},
	{
		"lat": 47.703407,
		"lng": -96.916406
	},
	{
		"lat": 47.703398,
		"lng": -96.916248
	},
	{
		"lat": 47.703391,
		"lng": -96.915931
	},
	{
		"lat": 47.703397,
		"lng": -96.915668
	},
	{
		"lat": 47.703416,
		"lng": -96.915353
	},
	{
		"lat": 47.703441,
		"lng": -96.915039
	},
	{
		"lat": 47.703481,
		"lng": -96.914836
	},
	{
		"lat": 47.703494,
		"lng": -96.914787
	},
	{
		"lat": 47.703515,
		"lng": -96.914744
	},
	{
		"lat": 47.703547,
		"lng": -96.914649
	},
	{
		"lat": 47.703608,
		"lng": -96.914518
	},
	{
		"lat": 47.703653,
		"lng": -96.914436
	},
	{
		"lat": 47.70395,
		"lng": -96.913958
	},
	{
		"lat": 47.704017,
		"lng": -96.913851
	},
	{
		"lat": 47.70422,
		"lng": -96.913549
	},
	{
		"lat": 47.704351,
		"lng": -96.913368
	},
	{
		"lat": 47.704462,
		"lng": -96.913233
	},
	{
		"lat": 47.704721,
		"lng": -96.912948
	},
	{
		"lat": 47.704902,
		"lng": -96.912776
	},
	{
		"lat": 47.705063,
		"lng": -96.912656
	},
	{
		"lat": 47.705097,
		"lng": -96.912642
	},
	{
		"lat": 47.705226,
		"lng": -96.912546
	},
	{
		"lat": 47.705329,
		"lng": -96.912495
	},
	{
		"lat": 47.705399,
		"lng": -96.91247
	},
	{
		"lat": 47.705434,
		"lng": -96.912464
	},
	{
		"lat": 47.705505,
		"lng": -96.91244
	},
	{
		"lat": 47.705676,
		"lng": -96.912357
	},
	{
		"lat": 47.705921,
		"lng": -96.91227
	},
	{
		"lat": 47.70623,
		"lng": -96.912123
	},
	{
		"lat": 47.706331,
		"lng": -96.912066
	},
	{
		"lat": 47.706363,
		"lng": -96.912042
	},
	{
		"lat": 47.706432,
		"lng": -96.912012
	},
	{
		"lat": 47.7065,
		"lng": -96.911975
	},
	{
		"lat": 47.706641,
		"lng": -96.911927
	},
	{
		"lat": 47.706745,
		"lng": -96.911881
	},
	{
		"lat": 47.706817,
		"lng": -96.911868
	},
	{
		"lat": 47.706925,
		"lng": -96.911864
	},
	{
		"lat": 47.707214,
		"lng": -96.911885
	},
	{
		"lat": 47.707393,
		"lng": -96.911923
	},
	{
		"lat": 47.707638,
		"lng": -96.912011
	},
	{
		"lat": 47.707741,
		"lng": -96.912063
	},
	{
		"lat": 47.707894,
		"lng": -96.91219
	},
	{
		"lat": 47.707927,
		"lng": -96.91221
	},
	{
		"lat": 47.708071,
		"lng": -96.912372
	},
	{
		"lat": 47.708276,
		"lng": -96.912669
	},
	{
		"lat": 47.708319,
		"lng": -96.912754
	},
	{
		"lat": 47.708406,
		"lng": -96.912985
	},
	{
		"lat": 47.708426,
		"lng": -96.913087
	},
	{
		"lat": 47.708448,
		"lng": -96.913242
	},
	{
		"lat": 47.708461,
		"lng": -96.913399
	},
	{
		"lat": 47.70847,
		"lng": -96.913714
	},
	{
		"lat": 47.70848,
		"lng": -96.91519
	},
	{
		"lat": 47.70849,
		"lng": -96.915401
	},
	{
		"lat": 47.708564,
		"lng": -96.916293
	},
	{
		"lat": 47.708626,
		"lng": -96.91654
	},
	{
		"lat": 47.708634,
		"lng": -96.916592
	},
	{
		"lat": 47.708696,
		"lng": -96.91684
	},
	{
		"lat": 47.708727,
		"lng": -96.916935
	},
	{
		"lat": 47.7088,
		"lng": -96.917117
	},
	{
		"lat": 47.708883,
		"lng": -96.917352
	},
	{
		"lat": 47.708943,
		"lng": -96.917484
	},
	{
		"lat": 47.709028,
		"lng": -96.917717
	},
	{
		"lat": 47.709082,
		"lng": -96.917846
	},
	{
		"lat": 47.709085,
		"lng": -96.917852
	},
	{
		"lat": 47.70919,
		"lng": -96.918128
	},
	{
		"lat": 47.709269,
		"lng": -96.918305
	},
	{
		"lat": 47.709302,
		"lng": -96.918399
	},
	{
		"lat": 47.709463,
		"lng": -96.918749
	},
	{
		"lat": 47.709602,
		"lng": -96.918993
	},
	{
		"lat": 47.709878,
		"lng": -96.919412
	},
	{
		"lat": 47.710011,
		"lng": -96.919591
	},
	{
		"lat": 47.710095,
		"lng": -96.919691
	},
	{
		"lat": 47.710157,
		"lng": -96.919746
	},
	{
		"lat": 47.71019,
		"lng": -96.919766
	},
	{
		"lat": 47.710377,
		"lng": -96.919927
	},
	{
		"lat": 47.710571,
		"lng": -96.920068
	},
	{
		"lat": 47.710773,
		"lng": -96.920183
	},
	{
		"lat": 47.710911,
		"lng": -96.920246
	},
	{
		"lat": 47.711016,
		"lng": -96.920287
	},
	{
		"lat": 47.711229,
		"lng": -96.920344
	},
	{
		"lat": 47.711363,
		"lng": -96.920353
	},
	{
		"lat": 47.711409,
		"lng": -96.920356
	},
	{
		"lat": 47.711518,
		"lng": -96.920352
	},
	{
		"lat": 47.711771,
		"lng": -96.920331
	},
	{
		"lat": 47.711987,
		"lng": -96.920306
	},
	{
		"lat": 47.712238,
		"lng": -96.92026
	},
	{
		"lat": 47.712343,
		"lng": -96.920222
	},
	{
		"lat": 47.712522,
		"lng": -96.920187
	},
	{
		"lat": 47.712591,
		"lng": -96.920157
	},
	{
		"lat": 47.712691,
		"lng": -96.920094
	},
	{
		"lat": 47.712794,
		"lng": -96.920047
	},
	{
		"lat": 47.712964,
		"lng": -96.91996
	},
	{
		"lat": 47.71303,
		"lng": -96.919918
	},
	{
		"lat": 47.713059,
		"lng": -96.919888
	},
	{
		"lat": 47.713091,
		"lng": -96.919864
	},
	{
		"lat": 47.713159,
		"lng": -96.919827
	},
	{
		"lat": 47.713322,
		"lng": -96.919715
	},
	{
		"lat": 47.71346,
		"lng": -96.919651
	},
	{
		"lat": 47.713524,
		"lng": -96.919603
	},
	{
		"lat": 47.713761,
		"lng": -96.919473
	},
	{
		"lat": 47.713861,
		"lng": -96.919412
	},
	{
		"lat": 47.714036,
		"lng": -96.919314
	},
	{
		"lat": 47.714099,
		"lng": -96.919263
	},
	{
		"lat": 47.714165,
		"lng": -96.919221
	},
	{
		"lat": 47.714228,
		"lng": -96.919169
	},
	{
		"lat": 47.714329,
		"lng": -96.919113
	},
	{
		"lat": 47.714433,
		"lng": -96.919066
	},
	{
		"lat": 47.714855,
		"lng": -96.918923
	},
	{
		"lat": 47.715034,
		"lng": -96.918893
	},
	{
		"lat": 47.715143,
		"lng": -96.918886
	},
	{
		"lat": 47.715359,
		"lng": -96.918908
	},
	{
		"lat": 47.715574,
		"lng": -96.918951
	},
	{
		"lat": 47.715886,
		"lng": -96.919088
	},
	{
		"lat": 47.715947,
		"lng": -96.919118
	},
	{
		"lat": 47.716262,
		"lng": -96.919277
	},
	{
		"lat": 47.716428,
		"lng": -96.919379
	},
	{
		"lat": 47.716526,
		"lng": -96.919449
	},
	{
		"lat": 47.716593,
		"lng": -96.919487
	},
	{
		"lat": 47.716895,
		"lng": -96.919775
	},
	{
		"lat": 47.716928,
		"lng": -96.919799
	},
	{
		"lat": 47.716982,
		"lng": -96.919868
	},
	{
		"lat": 47.717112,
		"lng": -96.920051
	},
	{
		"lat": 47.717263,
		"lng": -96.920278
	},
	{
		"lat": 47.717411,
		"lng": -96.92051
	},
	{
		"lat": 47.717575,
		"lng": -96.920791
	},
	{
		"lat": 47.717595,
		"lng": -96.920835
	},
	{
		"lat": 47.717609,
		"lng": -96.920884
	},
	{
		"lat": 47.71767,
		"lng": -96.921015
	},
	{
		"lat": 47.717739,
		"lng": -96.9212
	},
	{
		"lat": 47.71782,
		"lng": -96.921493
	},
	{
		"lat": 47.717865,
		"lng": -96.921636
	},
	{
		"lat": 47.717907,
		"lng": -96.921894
	},
	{
		"lat": 47.717922,
		"lng": -96.922104
	},
	{
		"lat": 47.717928,
		"lng": -96.922315
	},
	{
		"lat": 47.717919,
		"lng": -96.922525
	},
	{
		"lat": 47.717907,
		"lng": -96.922683
	},
	{
		"lat": 47.717882,
		"lng": -96.922837
	},
	{
		"lat": 47.717803,
		"lng": -96.923132
	},
	{
		"lat": 47.717681,
		"lng": -96.923455
	},
	{
		"lat": 47.717639,
		"lng": -96.923541
	},
	{
		"lat": 47.717488,
		"lng": -96.923768
	},
	{
		"lat": 47.717352,
		"lng": -96.923942
	},
	{
		"lat": 47.717294,
		"lng": -96.924005
	},
	{
		"lat": 47.717052,
		"lng": -96.924236
	},
	{
		"lat": 47.716756,
		"lng": -96.924539
	},
	{
		"lat": 47.716665,
		"lng": -96.924625
	},
	{
		"lat": 47.716617,
		"lng": -96.924663
	},
	{
		"lat": 47.716349,
		"lng": -96.924882
	},
	{
		"lat": 47.716228,
		"lng": -96.924999
	},
	{
		"lat": 47.715889,
		"lng": -96.925303
	},
	{
		"lat": 47.715793,
		"lng": -96.925376
	},
	{
		"lat": 47.715731,
		"lng": -96.92543
	},
	{
		"lat": 47.715644,
		"lng": -96.925524
	},
	{
		"lat": 47.715493,
		"lng": -96.92567
	},
	{
		"lat": 47.71538,
		"lng": -96.925803
	},
	{
		"lat": 47.715318,
		"lng": -96.925857
	},
	{
		"lat": 47.715018,
		"lng": -96.926239
	},
	{
		"lat": 47.71482,
		"lng": -96.926546
	},
	{
		"lat": 47.714656,
		"lng": -96.926828
	},
	{
		"lat": 47.714456,
		"lng": -96.927268
	},
	{
		"lat": 47.714392,
		"lng": -96.927458
	},
	{
		"lat": 47.714351,
		"lng": -96.927604
	},
	{
		"lat": 47.714315,
		"lng": -96.927809
	},
	{
		"lat": 47.714261,
		"lng": -96.928277
	},
	{
		"lat": 47.714258,
		"lng": -96.92833
	},
	{
		"lat": 47.714261,
		"lng": -96.928541
	},
	{
		"lat": 47.714287,
		"lng": -96.928695
	},
	{
		"lat": 47.714297,
		"lng": -96.928906
	},
	{
		"lat": 47.71432,
		"lng": -96.92906
	},
	{
		"lat": 47.714331,
		"lng": -96.929164
	},
	{
		"lat": 47.714425,
		"lng": -96.929563
	},
	{
		"lat": 47.714439,
		"lng": -96.929611
	},
	{
		"lat": 47.714477,
		"lng": -96.929701
	},
	{
		"lat": 47.714499,
		"lng": -96.929742
	},
	{
		"lat": 47.714537,
		"lng": -96.929833
	},
	{
		"lat": 47.714554,
		"lng": -96.929868
	},
	{
		"lat": 47.714663,
		"lng": -96.93009
	},
	{
		"lat": 47.714866,
		"lng": -96.930391
	},
	{
		"lat": 47.715,
		"lng": -96.930569
	},
	{
		"lat": 47.715061,
		"lng": -96.930624
	},
	{
		"lat": 47.715159,
		"lng": -96.930692
	},
	{
		"lat": 47.715221,
		"lng": -96.930747
	},
	{
		"lat": 47.715387,
		"lng": -96.930853
	},
	{
		"lat": 47.715448,
		"lng": -96.93091
	},
	{
		"lat": 47.715547,
		"lng": -96.930973
	},
	{
		"lat": 47.715724,
		"lng": -96.931031
	},
	{
		"lat": 47.715904,
		"lng": -96.931056
	},
	{
		"lat": 47.716012,
		"lng": -96.931063
	},
	{
		"lat": 47.716229,
		"lng": -96.931066
	},
	{
		"lat": 47.716553,
		"lng": -96.931049
	},
	{
		"lat": 47.716698,
		"lng": -96.931031
	},
	{
		"lat": 47.716981,
		"lng": -96.930946
	},
	{
		"lat": 47.717156,
		"lng": -96.930883
	},
	{
		"lat": 47.717362,
		"lng": -96.930781
	},
	{
		"lat": 47.717426,
		"lng": -96.930732
	},
	{
		"lat": 47.717561,
		"lng": -96.930657
	},
	{
		"lat": 47.717721,
		"lng": -96.930538
	},
	{
		"lat": 47.717847,
		"lng": -96.930435
	},
	{
		"lat": 47.717959,
		"lng": -96.930301
	},
	{
		"lat": 47.718062,
		"lng": -96.930153
	},
	{
		"lat": 47.718118,
		"lng": -96.930086
	},
	{
		"lat": 47.718243,
		"lng": -96.929895
	},
	{
		"lat": 47.718264,
		"lng": -96.929853
	},
	{
		"lat": 47.718314,
		"lng": -96.929711
	},
	{
		"lat": 47.718394,
		"lng": -96.929535
	},
	{
		"lat": 47.718483,
		"lng": -96.929305
	},
	{
		"lat": 47.718531,
		"lng": -96.929163
	},
	{
		"lat": 47.71858,
		"lng": -96.928965
	},
	{
		"lat": 47.718613,
		"lng": -96.92887
	},
	{
		"lat": 47.718639,
		"lng": -96.928772
	},
	{
		"lat": 47.718684,
		"lng": -96.928628
	},
	{
		"lat": 47.718744,
		"lng": -96.928379
	},
	{
		"lat": 47.718885,
		"lng": -96.927723
	},
	{
		"lat": 47.718949,
		"lng": -96.927365
	},
	{
		"lat": 47.718996,
		"lng": -96.927165
	},
	{
		"lat": 47.719037,
		"lng": -96.926962
	},
	{
		"lat": 47.719098,
		"lng": -96.926713
	},
	{
		"lat": 47.719267,
		"lng": -96.926245
	},
	{
		"lat": 47.719293,
		"lng": -96.926147
	},
	{
		"lat": 47.719339,
		"lng": -96.926003
	},
	{
		"lat": 47.719422,
		"lng": -96.925768
	},
	{
		"lat": 47.719561,
		"lng": -96.925339
	},
	{
		"lat": 47.71968,
		"lng": -96.925012
	},
	{
		"lat": 47.71972,
		"lng": -96.924865
	},
	{
		"lat": 47.719752,
		"lng": -96.924771
	},
	{
		"lat": 47.719789,
		"lng": -96.92468
	},
	{
		"lat": 47.719803,
		"lng": -96.924631
	},
	{
		"lat": 47.719864,
		"lng": -96.9245
	},
	{
		"lat": 47.719893,
		"lng": -96.924418
	},
	{
		"lat": 47.719949,
		"lng": -96.924282
	},
	{
		"lat": 47.720074,
		"lng": -96.924023
	},
	{
		"lat": 47.720353,
		"lng": -96.923386
	},
	{
		"lat": 47.720387,
		"lng": -96.923311
	},
	{
		"lat": 47.720494,
		"lng": -96.923097
	},
	{
		"lat": 47.720585,
		"lng": -96.922932
	},
	{
		"lat": 47.720658,
		"lng": -96.922749
	},
	{
		"lat": 47.720727,
		"lng": -96.922627
	},
	{
		"lat": 47.720829,
		"lng": -96.922409
	},
	{
		"lat": 47.720905,
		"lng": -96.922229
	},
	{
		"lat": 47.720938,
		"lng": -96.922135
	},
	{
		"lat": 47.721035,
		"lng": -96.921912
	},
	{
		"lat": 47.721089,
		"lng": -96.921774
	},
	{
		"lat": 47.721104,
		"lng": -96.921726
	},
	{
		"lat": 47.721241,
		"lng": -96.921414
	},
	{
		"lat": 47.721334,
		"lng": -96.921187
	},
	{
		"lat": 47.721375,
		"lng": -96.921101
	},
	{
		"lat": 47.721509,
		"lng": -96.920851
	},
	{
		"lat": 47.721749,
		"lng": -96.920455
	},
	{
		"lat": 47.72203,
		"lng": -96.920043
	},
	{
		"lat": 47.722085,
		"lng": -96.919973
	},
	{
		"lat": 47.722214,
		"lng": -96.919788
	},
	{
		"lat": 47.722297,
		"lng": -96.919685
	},
	{
		"lat": 47.72287,
		"lng": -96.91904
	},
	{
		"lat": 47.723053,
		"lng": -96.918869
	},
	{
		"lat": 47.723086,
		"lng": -96.918848
	},
	{
		"lat": 47.723117,
		"lng": -96.91882
	},
	{
		"lat": 47.723144,
		"lng": -96.918786
	},
	{
		"lat": 47.723175,
		"lng": -96.918757
	},
	{
		"lat": 47.723244,
		"lng": -96.918725
	},
	{
		"lat": 47.723308,
		"lng": -96.918676
	},
	{
		"lat": 47.723342,
		"lng": -96.918658
	},
	{
		"lat": 47.723412,
		"lng": -96.918634
	},
	{
		"lat": 47.72348,
		"lng": -96.918599
	},
	{
		"lat": 47.723621,
		"lng": -96.918551
	},
	{
		"lat": 47.723722,
		"lng": -96.918496
	},
	{
		"lat": 47.723898,
		"lng": -96.918433
	},
	{
		"lat": 47.723969,
		"lng": -96.918413
	},
	{
		"lat": 47.724041,
		"lng": -96.918413
	},
	{
		"lat": 47.724186,
		"lng": -96.91843
	},
	{
		"lat": 47.724187,
		"lng": -96.91843
	},
	{
		"lat": 47.724221,
		"lng": -96.918439
	},
	{
		"lat": 47.724359,
		"lng": -96.918504
	},
	{
		"lat": 47.724527,
		"lng": -96.918603
	},
	{
		"lat": 47.724559,
		"lng": -96.918628
	},
	{
		"lat": 47.72465,
		"lng": -96.918715
	},
	{
		"lat": 47.724808,
		"lng": -96.918931
	},
	{
		"lat": 47.724879,
		"lng": -96.919052
	},
	{
		"lat": 47.724916,
		"lng": -96.919143
	},
	{
		"lat": 47.72498,
		"lng": -96.919271
	},
	{
		"lat": 47.725122,
		"lng": -96.91964
	},
	{
		"lat": 47.725195,
		"lng": -96.919881
	},
	{
		"lat": 47.725229,
		"lng": -96.919975
	},
	{
		"lat": 47.725283,
		"lng": -96.92017
	},
	{
		"lat": 47.725342,
		"lng": -96.920419
	},
	{
		"lat": 47.725371,
		"lng": -96.920572
	},
	{
		"lat": 47.725386,
		"lng": -96.920676
	},
	{
		"lat": 47.725434,
		"lng": -96.9212
	},
	{
		"lat": 47.725451,
		"lng": -96.921302
	},
	{
		"lat": 47.725481,
		"lng": -96.921563
	},
	{
		"lat": 47.725529,
		"lng": -96.922086
	},
	{
		"lat": 47.725549,
		"lng": -96.922188
	},
	{
		"lat": 47.72556,
		"lng": -96.922293
	},
	{
		"lat": 47.725616,
		"lng": -96.922653
	},
	{
		"lat": 47.725636,
		"lng": -96.922755
	},
	{
		"lat": 47.725711,
		"lng": -96.923052
	},
	{
		"lat": 47.72586,
		"lng": -96.923473
	},
	{
		"lat": 47.725945,
		"lng": -96.923644
	},
	{
		"lat": 47.726062,
		"lng": -96.923846
	},
	{
		"lat": 47.726137,
		"lng": -96.92396
	},
	{
		"lat": 47.726242,
		"lng": -96.924105
	},
	{
		"lat": 47.726478,
		"lng": -96.92435
	},
	{
		"lat": 47.726611,
		"lng": -96.924432
	},
	{
		"lat": 47.726926,
		"lng": -96.924554
	},
	{
		"lat": 47.727068,
		"lng": -96.924597
	},
	{
		"lat": 47.727354,
		"lng": -96.924659
	},
	{
		"lat": 47.727389,
		"lng": -96.924671
	},
	{
		"lat": 47.727819,
		"lng": -96.924765
	},
	{
		"lat": 47.727997,
		"lng": -96.924781
	},
	{
		"lat": 47.728216,
		"lng": -96.924801
	},
	{
		"lat": 47.72861,
		"lng": -96.924869
	},
	{
		"lat": 47.728936,
		"lng": -96.924882
	},
	{
		"lat": 47.72937,
		"lng": -96.924891
	},
	{
		"lat": 47.729586,
		"lng": -96.924926
	},
	{
		"lat": 47.729657,
		"lng": -96.924943
	},
	{
		"lat": 47.729726,
		"lng": -96.924975
	},
	{
		"lat": 47.729997,
		"lng": -96.925125
	},
	{
		"lat": 47.730061,
		"lng": -96.925173
	},
	{
		"lat": 47.730091,
		"lng": -96.925202
	},
	{
		"lat": 47.730233,
		"lng": -96.925366
	},
	{
		"lat": 47.730338,
		"lng": -96.925512
	},
	{
		"lat": 47.730424,
		"lng": -96.925637
	},
	{
		"lat": 47.730517,
		"lng": -96.925774
	},
	{
		"lat": 47.730628,
		"lng": -96.925909
	},
	{
		"lat": 47.730912,
		"lng": -96.926369
	},
	{
		"lat": 47.731065,
		"lng": -96.926615
	},
	{
		"lat": 47.731449,
		"lng": -96.927174
	},
	{
		"lat": 47.73153,
		"lng": -96.927278
	},
	{
		"lat": 47.731676,
		"lng": -96.927435
	},
	{
		"lat": 47.731789,
		"lng": -96.927566
	},
	{
		"lat": 47.731849,
		"lng": -96.927625
	},
	{
		"lat": 47.731905,
		"lng": -96.927692
	},
	{
		"lat": 47.732025,
		"lng": -96.927811
	},
	{
		"lat": 47.732057,
		"lng": -96.927836
	},
	{
		"lat": 47.732145,
		"lng": -96.927929
	},
	{
		"lat": 47.732176,
		"lng": -96.927956
	},
	{
		"lat": 47.732289,
		"lng": -96.928086
	},
	{
		"lat": 47.732501,
		"lng": -96.928289
	},
	{
		"lat": 47.732589,
		"lng": -96.928381
	},
	{
		"lat": 47.7326,
		"lng": -96.928391
	},
	{
		"lat": 47.732711,
		"lng": -96.928496
	},
	{
		"lat": 47.732797,
		"lng": -96.928592
	},
	{
		"lat": 47.732906,
		"lng": -96.928731
	},
	{
		"lat": 47.7332,
		"lng": -96.929037
	},
	{
		"lat": 47.733252,
		"lng": -96.929077
	},
	{
		"lat": 47.733625,
		"lng": -96.929494
	},
	{
		"lat": 47.73376,
		"lng": -96.92967
	},
	{
		"lat": 47.734064,
		"lng": -96.930046
	},
	{
		"lat": 47.734215,
		"lng": -96.930192
	},
	{
		"lat": 47.734329,
		"lng": -96.93032
	},
	{
		"lat": 47.73439,
		"lng": -96.930378
	},
	{
		"lat": 47.734486,
		"lng": -96.930452
	},
	{
		"lat": 47.734725,
		"lng": -96.93069
	},
	{
		"lat": 47.73492,
		"lng": -96.930926
	},
	{
		"lat": 47.734978,
		"lng": -96.930989
	},
	{
		"lat": 47.73507,
		"lng": -96.931073
	},
	{
		"lat": 47.735196,
		"lng": -96.931178
	},
	{
		"lat": 47.735285,
		"lng": -96.931267
	},
	{
		"lat": 47.735381,
		"lng": -96.931342
	},
	{
		"lat": 47.73541,
		"lng": -96.931374
	},
	{
		"lat": 47.735503,
		"lng": -96.931454
	},
	{
		"lat": 47.73557,
		"lng": -96.931491
	},
	{
		"lat": 47.735636,
		"lng": -96.931537
	},
	{
		"lat": 47.735696,
		"lng": -96.931594
	},
	{
		"lat": 47.735849,
		"lng": -96.931757
	},
	{
		"lat": 47.735901,
		"lng": -96.931812
	},
	{
		"lat": 47.736086,
		"lng": -96.931977
	},
	{
		"lat": 47.736282,
		"lng": -96.93211
	},
	{
		"lat": 47.736416,
		"lng": -96.932189
	},
	{
		"lat": 47.736722,
		"lng": -96.93235
	},
	{
		"lat": 47.736788,
		"lng": -96.932396
	},
	{
		"lat": 47.736848,
		"lng": -96.932455
	},
	{
		"lat": 47.73698,
		"lng": -96.932539
	},
	{
		"lat": 47.737215,
		"lng": -96.932677
	},
	{
		"lat": 47.737523,
		"lng": -96.93283
	},
	{
		"lat": 47.737734,
		"lng": -96.932904
	},
	{
		"lat": 47.737951,
		"lng": -96.932926
	},
	{
		"lat": 47.738637,
		"lng": -96.932965
	},
	{
		"lat": 47.738854,
		"lng": -96.932988
	},
	{
		"lat": 47.738925,
		"lng": -96.933005
	},
	{
		"lat": 47.739249,
		"lng": -96.933052
	},
	{
		"lat": 47.739357,
		"lng": -96.933038
	},
	{
		"lat": 47.7395,
		"lng": -96.93301
	},
	{
		"lat": 47.739571,
		"lng": -96.932991
	},
	{
		"lat": 47.739605,
		"lng": -96.932975
	},
	{
		"lat": 47.739746,
		"lng": -96.932931
	},
	{
		"lat": 47.739885,
		"lng": -96.93287
	},
	{
		"lat": 47.73992,
		"lng": -96.932859
	},
	{
		"lat": 47.740065,
		"lng": -96.932776
	},
	{
		"lat": 47.740258,
		"lng": -96.932632
	},
	{
		"lat": 47.740293,
		"lng": -96.932616
	},
	{
		"lat": 47.740387,
		"lng": -96.932539
	},
	{
		"lat": 47.740477,
		"lng": -96.932451
	},
	{
		"lat": 47.740662,
		"lng": -96.932286
	},
	{
		"lat": 47.740772,
		"lng": -96.932148
	},
	{
		"lat": 47.74083,
		"lng": -96.932085
	},
	{
		"lat": 47.741304,
		"lng": -96.931436
	},
	{
		"lat": 47.741536,
		"lng": -96.931102
	},
	{
		"lat": 47.742104,
		"lng": -96.930144
	},
	{
		"lat": 47.742483,
		"lng": -96.929577
	},
	{
		"lat": 47.742689,
		"lng": -96.929363
	},
	{
		"lat": 47.74275,
		"lng": -96.929307
	},
	{
		"lat": 47.742877,
		"lng": -96.929209
	},
	{
		"lat": 47.742936,
		"lng": -96.929148
	},
	{
		"lat": 47.742999,
		"lng": -96.929097
	},
	{
		"lat": 47.743032,
		"lng": -96.929078
	},
	{
		"lat": 47.743161,
		"lng": -96.928984
	},
	{
		"lat": 47.743365,
		"lng": -96.928878
	},
	{
		"lat": 47.743812,
		"lng": -96.928673
	},
	{
		"lat": 47.743918,
		"lng": -96.928645
	},
	{
		"lat": 47.744025,
		"lng": -96.928624
	},
	{
		"lat": 47.74406,
		"lng": -96.928609
	},
	{
		"lat": 47.744167,
		"lng": -96.928578
	},
	{
		"lat": 47.744489,
		"lng": -96.928521
	},
	{
		"lat": 47.744776,
		"lng": -96.928483
	},
	{
		"lat": 47.744945,
		"lng": -96.928464
	},
	{
		"lat": 47.745207,
		"lng": -96.928435
	},
	{
		"lat": 47.745605,
		"lng": -96.928417
	},
	{
		"lat": 47.745965,
		"lng": -96.92838
	},
	{
		"lat": 47.746725,
		"lng": -96.92838
	},
	{
		"lat": 47.747196,
		"lng": -96.92836
	},
	{
		"lat": 47.747738,
		"lng": -96.928374
	},
	{
		"lat": 47.748063,
		"lng": -96.928393
	},
	{
		"lat": 47.748316,
		"lng": -96.928416
	},
	{
		"lat": 47.748675,
		"lng": -96.928477
	},
	{
		"lat": 47.748747,
		"lng": -96.928479
	},
	{
		"lat": 47.748818,
		"lng": -96.928504
	},
	{
		"lat": 47.749031,
		"lng": -96.928561
	},
	{
		"lat": 47.74921,
		"lng": -96.928597
	},
	{
		"lat": 47.749319,
		"lng": -96.928602
	},
	{
		"lat": 47.749498,
		"lng": -96.928642
	},
	{
		"lat": 47.749532,
		"lng": -96.92866
	},
	{
		"lat": 47.749629,
		"lng": -96.92873
	},
	{
		"lat": 47.749744,
		"lng": -96.928857
	},
	{
		"lat": 47.749834,
		"lng": -96.928945
	},
	{
		"lat": 47.749867,
		"lng": -96.928967
	},
	{
		"lat": 47.749902,
		"lng": -96.928982
	},
	{
		"lat": 47.749972,
		"lng": -96.92895
	},
	{
		"lat": 47.750007,
		"lng": -96.92894
	},
	{
		"lat": 47.750111,
		"lng": -96.928984
	},
	{
		"lat": 47.750376,
		"lng": -96.929152
	},
	{
		"lat": 47.75047,
		"lng": -96.92923
	},
	{
		"lat": 47.750651,
		"lng": -96.929405
	},
	{
		"lat": 47.750737,
		"lng": -96.929501
	},
	{
		"lat": 47.750874,
		"lng": -96.929673
	},
	{
		"lat": 47.750898,
		"lng": -96.929712
	},
	{
		"lat": 47.750994,
		"lng": -96.929838
	},
	{
		"lat": 47.751005,
		"lng": -96.929853
	},
	{
		"lat": 47.751181,
		"lng": -96.930119
	},
	{
		"lat": 47.751276,
		"lng": -96.930277
	},
	{
		"lat": 47.751342,
		"lng": -96.930404
	},
	{
		"lat": 47.751465,
		"lng": -96.930664
	},
	{
		"lat": 47.751772,
		"lng": -96.931379
	},
	{
		"lat": 47.751937,
		"lng": -96.931725
	},
	{
		"lat": 47.752354,
		"lng": -96.93265
	},
	{
		"lat": 47.75238,
		"lng": -96.932727
	},
	{
		"lat": 47.752401,
		"lng": -96.932771
	},
	{
		"lat": 47.752451,
		"lng": -96.932911
	},
	{
		"lat": 47.752463,
		"lng": -96.932961
	},
	{
		"lat": 47.752578,
		"lng": -96.93329
	},
	{
		"lat": 47.752597,
		"lng": -96.933334
	},
	{
		"lat": 47.752681,
		"lng": -96.933567
	},
	{
		"lat": 47.752756,
		"lng": -96.933748
	},
	{
		"lat": 47.752801,
		"lng": -96.933892
	},
	{
		"lat": 47.752854,
		"lng": -96.93403
	},
	{
		"lat": 47.752901,
		"lng": -96.934173
	},
	{
		"lat": 47.752953,
		"lng": -96.934311
	},
	{
		"lat": 47.753048,
		"lng": -96.934596
	},
	{
		"lat": 47.753122,
		"lng": -96.934894
	},
	{
		"lat": 47.753151,
		"lng": -96.934991
	},
	{
		"lat": 47.753181,
		"lng": -96.935144
	},
	{
		"lat": 47.753228,
		"lng": -96.935344
	},
	{
		"lat": 47.753299,
		"lng": -96.935699
	},
	{
		"lat": 47.753305,
		"lng": -96.935751
	},
	{
		"lat": 47.753344,
		"lng": -96.935955
	},
	{
		"lat": 47.753359,
		"lng": -96.936058
	},
	{
		"lat": 47.753401,
		"lng": -96.936205
	},
	{
		"lat": 47.753423,
		"lng": -96.936305
	},
	{
		"lat": 47.75347,
		"lng": -96.93656
	},
	{
		"lat": 47.75353,
		"lng": -96.93681
	},
	{
		"lat": 47.753558,
		"lng": -96.936907
	},
	{
		"lat": 47.753567,
		"lng": -96.936959
	},
	{
		"lat": 47.753598,
		"lng": -96.937219
	},
	{
		"lat": 47.753657,
		"lng": -96.937469
	},
	{
		"lat": 47.753681,
		"lng": -96.937647
	},
	{
		"lat": 47.753685,
		"lng": -96.937677
	},
	{
		"lat": 47.753703,
		"lng": -96.937779
	},
	{
		"lat": 47.753751,
		"lng": -96.937979
	},
	{
		"lat": 47.75378,
		"lng": -96.938075
	},
	{
		"lat": 47.753787,
		"lng": -96.938127
	},
	{
		"lat": 47.753799,
		"lng": -96.938177
	},
	{
		"lat": 47.753816,
		"lng": -96.938224
	},
	{
		"lat": 47.753843,
		"lng": -96.938322
	},
	{
		"lat": 47.753865,
		"lng": -96.938422
	},
	{
		"lat": 47.75388,
		"lng": -96.93847
	},
	{
		"lat": 47.753942,
		"lng": -96.938601
	},
	{
		"lat": 47.753978,
		"lng": -96.938692
	},
	{
		"lat": 47.754081,
		"lng": -96.938909
	},
	{
		"lat": 47.754199,
		"lng": -96.93911
	},
	{
		"lat": 47.754429,
		"lng": -96.939446
	},
	{
		"lat": 47.754488,
		"lng": -96.939508
	},
	{
		"lat": 47.754583,
		"lng": -96.939584
	},
	{
		"lat": 47.754684,
		"lng": -96.939642
	},
	{
		"lat": 47.754788,
		"lng": -96.939685
	},
	{
		"lat": 47.754931,
		"lng": -96.939718
	},
	{
		"lat": 47.755147,
		"lng": -96.939751
	},
	{
		"lat": 47.755292,
		"lng": -96.939753
	},
	{
		"lat": 47.755436,
		"lng": -96.939731
	},
	{
		"lat": 47.755506,
		"lng": -96.939706
	},
	{
		"lat": 47.755773,
		"lng": -96.939544
	},
	{
		"lat": 47.755898,
		"lng": -96.939437
	},
	{
		"lat": 47.755955,
		"lng": -96.939371
	},
	{
		"lat": 47.756159,
		"lng": -96.939072
	},
	{
		"lat": 47.756205,
		"lng": -96.93899
	},
	{
		"lat": 47.756261,
		"lng": -96.938795
	},
	{
		"lat": 47.756296,
		"lng": -96.938702
	},
	{
		"lat": 47.756332,
		"lng": -96.938553
	},
	{
		"lat": 47.756381,
		"lng": -96.938243
	},
	{
		"lat": 47.756398,
		"lng": -96.938087
	},
	{
		"lat": 47.7564,
		"lng": -96.937928
	},
	{
		"lat": 47.756396,
		"lng": -96.937557
	},
	{
		"lat": 47.756364,
		"lng": -96.937243
	},
	{
		"lat": 47.756356,
		"lng": -96.937209
	},
	{
		"lat": 47.756312,
		"lng": -96.936998
	},
	{
		"lat": 47.756234,
		"lng": -96.936759
	},
	{
		"lat": 47.756157,
		"lng": -96.936462
	},
	{
		"lat": 47.756127,
		"lng": -96.936366
	},
	{
		"lat": 47.756092,
		"lng": -96.936274
	},
	{
		"lat": 47.756067,
		"lng": -96.936174
	},
	{
		"lat": 47.756001,
		"lng": -96.935986
	},
	{
		"lat": 47.755965,
		"lng": -96.935895
	},
	{
		"lat": 47.7559,
		"lng": -96.935768
	},
	{
		"lat": 47.755885,
		"lng": -96.93572
	},
	{
		"lat": 47.75573,
		"lng": -96.935363
	},
	{
		"lat": 47.755688,
		"lng": -96.935277
	},
	{
		"lat": 47.755641,
		"lng": -96.935197
	},
	{
		"lat": 47.755553,
		"lng": -96.935028
	},
	{
		"lat": 47.755389,
		"lng": -96.934617
	},
	{
		"lat": 47.755302,
		"lng": -96.934386
	},
	{
		"lat": 47.755222,
		"lng": -96.934149
	},
	{
		"lat": 47.755176,
		"lng": -96.934068
	},
	{
		"lat": 47.755083,
		"lng": -96.933841
	},
	{
		"lat": 47.755036,
		"lng": -96.933699
	},
	{
		"lat": 47.755009,
		"lng": -96.933601
	},
	{
		"lat": 47.754918,
		"lng": -96.9332
	},
	{
		"lat": 47.754872,
		"lng": -96.933056
	},
	{
		"lat": 47.754849,
		"lng": -96.932955
	},
	{
		"lat": 47.754814,
		"lng": -96.93275
	},
	{
		"lat": 47.754742,
		"lng": -96.932178
	},
	{
		"lat": 47.754719,
		"lng": -96.931649
	},
	{
		"lat": 47.754711,
		"lng": -96.931174
	},
	{
		"lat": 47.754711,
		"lng": -96.930962
	},
	{
		"lat": 47.754763,
		"lng": -96.930279
	},
	{
		"lat": 47.75477,
		"lng": -96.930227
	},
	{
		"lat": 47.7548,
		"lng": -96.930074
	},
	{
		"lat": 47.754827,
		"lng": -96.929866
	},
	{
		"lat": 47.754875,
		"lng": -96.929612
	},
	{
		"lat": 47.754946,
		"lng": -96.929369
	},
	{
		"lat": 47.754967,
		"lng": -96.929326
	},
	{
		"lat": 47.755021,
		"lng": -96.929188
	},
	{
		"lat": 47.755067,
		"lng": -96.929107
	},
	{
		"lat": 47.755172,
		"lng": -96.92896
	},
	{
		"lat": 47.755201,
		"lng": -96.928929
	},
	{
		"lat": 47.755296,
		"lng": -96.928854
	},
	{
		"lat": 47.755472,
		"lng": -96.928792
	},
	{
		"lat": 47.755544,
		"lng": -96.928782
	},
	{
		"lat": 47.755724,
		"lng": -96.928804
	},
	{
		"lat": 47.755795,
		"lng": -96.928827
	},
	{
		"lat": 47.755926,
		"lng": -96.928916
	},
	{
		"lat": 47.756004,
		"lng": -96.929005
	},
	{
		"lat": 47.75604,
		"lng": -96.929046
	},
	{
		"lat": 47.756066,
		"lng": -96.929082
	},
	{
		"lat": 47.756211,
		"lng": -96.929318
	},
	{
		"lat": 47.756301,
		"lng": -96.929484
	},
	{
		"lat": 47.756362,
		"lng": -96.929615
	},
	{
		"lat": 47.756646,
		"lng": -96.93029
	},
	{
		"lat": 47.756699,
		"lng": -96.930428
	},
	{
		"lat": 47.756815,
		"lng": -96.930697
	},
	{
		"lat": 47.756829,
		"lng": -96.930746
	},
	{
		"lat": 47.756864,
		"lng": -96.930838
	},
	{
		"lat": 47.756953,
		"lng": -96.931127
	},
	{
		"lat": 47.756989,
		"lng": -96.931219
	},
	{
		"lat": 47.757105,
		"lng": -96.931605
	},
	{
		"lat": 47.757143,
		"lng": -96.931754
	},
	{
		"lat": 47.7572,
		"lng": -96.931948
	},
	{
		"lat": 47.757233,
		"lng": -96.932099
	},
	{
		"lat": 47.757275,
		"lng": -96.932245
	},
	{
		"lat": 47.757333,
		"lng": -96.932495
	},
	{
		"lat": 47.757372,
		"lng": -96.932643
	},
	{
		"lat": 47.757429,
		"lng": -96.932894
	},
	{
		"lat": 47.75746,
		"lng": -96.93299
	},
	{
		"lat": 47.757474,
		"lng": -96.93308
	},
	{
		"lat": 47.757477,
		"lng": -96.933093
	},
	{
		"lat": 47.75749,
		"lng": -96.933142
	},
	{
		"lat": 47.757509,
		"lng": -96.933187
	},
	{
		"lat": 47.757555,
		"lng": -96.933388
	},
	{
		"lat": 47.757583,
		"lng": -96.93354
	},
	{
		"lat": 47.757669,
		"lng": -96.933823
	},
	{
		"lat": 47.757678,
		"lng": -96.933875
	},
	{
		"lat": 47.757784,
		"lng": -96.934268
	},
	{
		"lat": 47.757937,
		"lng": -96.934746
	},
	{
		"lat": 47.757977,
		"lng": -96.934834
	},
	{
		"lat": 47.758044,
		"lng": -96.935022
	},
	{
		"lat": 47.758115,
		"lng": -96.935205
	},
	{
		"lat": 47.758173,
		"lng": -96.935339
	},
	{
		"lat": 47.758195,
		"lng": -96.935381
	},
	{
		"lat": 47.758231,
		"lng": -96.935473
	},
	{
		"lat": 47.75838,
		"lng": -96.935772
	},
	{
		"lat": 47.758521,
		"lng": -96.936013
	},
	{
		"lat": 47.758668,
		"lng": -96.936247
	},
	{
		"lat": 47.758721,
		"lng": -96.936325
	},
	{
		"lat": 47.758898,
		"lng": -96.936586
	},
	{
		"lat": 47.759085,
		"lng": -96.936835
	},
	{
		"lat": 47.759141,
		"lng": -96.936901
	},
	{
		"lat": 47.759288,
		"lng": -96.937056
	},
	{
		"lat": 47.759461,
		"lng": -96.937223
	},
	{
		"lat": 47.75948,
		"lng": -96.937241
	},
	{
		"lat": 47.759499,
		"lng": -96.937259
	},
	{
		"lat": 47.759594,
		"lng": -96.937335
	},
	{
		"lat": 47.759656,
		"lng": -96.937391
	},
	{
		"lat": 47.759721,
		"lng": -96.937437
	},
	{
		"lat": 47.759814,
		"lng": -96.937518
	},
	{
		"lat": 47.759912,
		"lng": -96.937587
	},
	{
		"lat": 47.76004,
		"lng": -96.937687
	},
	{
		"lat": 47.760237,
		"lng": -96.937853
	},
	{
		"lat": 47.760321,
		"lng": -96.937925
	},
	{
		"lat": 47.760387,
		"lng": -96.937966
	},
	{
		"lat": 47.760417,
		"lng": -96.937997
	},
	{
		"lat": 47.760582,
		"lng": -96.938105
	},
	{
		"lat": 47.760716,
		"lng": -96.938184
	},
	{
		"lat": 47.760747,
		"lng": -96.93821
	},
	{
		"lat": 47.760813,
		"lng": -96.938253
	},
	{
		"lat": 47.760876,
		"lng": -96.938279
	},
	{
		"lat": 47.761161,
		"lng": -96.938397
	},
	{
		"lat": 47.761266,
		"lng": -96.938434
	},
	{
		"lat": 47.761518,
		"lng": -96.938469
	},
	{
		"lat": 47.761627,
		"lng": -96.938474
	},
	{
		"lat": 47.762097,
		"lng": -96.938474
	},
	{
		"lat": 47.762169,
		"lng": -96.938481
	},
	{
		"lat": 47.762423,
		"lng": -96.938476
	},
	{
		"lat": 47.762531,
		"lng": -96.938464
	},
	{
		"lat": 47.762638,
		"lng": -96.93844
	},
	{
		"lat": 47.762884,
		"lng": -96.938352
	},
	{
		"lat": 47.762991,
		"lng": -96.938321
	},
	{
		"lat": 47.763094,
		"lng": -96.938272
	},
	{
		"lat": 47.763229,
		"lng": -96.938196
	},
	{
		"lat": 47.763389,
		"lng": -96.938073
	},
	{
		"lat": 47.76354,
		"lng": -96.937928
	},
	{
		"lat": 47.763666,
		"lng": -96.937823
	},
	{
		"lat": 47.763699,
		"lng": -96.937803
	},
	{
		"lat": 47.763793,
		"lng": -96.937723
	},
	{
		"lat": 47.764338,
		"lng": -96.937202
	},
	{
		"lat": 47.764449,
		"lng": -96.937067
	},
	{
		"lat": 47.765038,
		"lng": -96.936286
	},
	{
		"lat": 47.765152,
		"lng": -96.936156
	},
	{
		"lat": 47.765523,
		"lng": -96.935652
	},
	{
		"lat": 47.765581,
		"lng": -96.935589
	},
	{
		"lat": 47.765825,
		"lng": -96.935273
	},
	{
		"lat": 47.76597,
		"lng": -96.935116
	},
	{
		"lat": 47.766063,
		"lng": -96.935035
	},
	{
		"lat": 47.766092,
		"lng": -96.935004
	},
	{
		"lat": 47.766222,
		"lng": -96.93491
	},
	{
		"lat": 47.766457,
		"lng": -96.934773
	},
	{
		"lat": 47.766633,
		"lng": -96.934718
	},
	{
		"lat": 47.766794,
		"lng": -96.934707
	},
	{
		"lat": 47.766901,
		"lng": -96.934732
	},
	{
		"lat": 47.767042,
		"lng": -96.934784
	},
	{
		"lat": 47.767209,
		"lng": -96.934883
	},
	{
		"lat": 47.767268,
		"lng": -96.934945
	},
	{
		"lat": 47.767331,
		"lng": -96.934998
	},
	{
		"lat": 47.767415,
		"lng": -96.935098
	},
	{
		"lat": 47.767466,
		"lng": -96.935174
	},
	{
		"lat": 47.767534,
		"lng": -96.935296
	},
	{
		"lat": 47.76762,
		"lng": -96.935467
	},
	{
		"lat": 47.767659,
		"lng": -96.935556
	},
	{
		"lat": 47.767687,
		"lng": -96.935653
	},
	{
		"lat": 47.767707,
		"lng": -96.935697
	},
	{
		"lat": 47.767747,
		"lng": -96.935845
	},
	{
		"lat": 47.767824,
		"lng": -96.936197
	},
	{
		"lat": 47.767861,
		"lng": -96.936345
	},
	{
		"lat": 47.767893,
		"lng": -96.936497
	},
	{
		"lat": 47.767914,
		"lng": -96.936653
	},
	{
		"lat": 47.767935,
		"lng": -96.936862
	},
	{
		"lat": 47.767948,
		"lng": -96.936911
	},
	{
		"lat": 47.768024,
		"lng": -96.937803
	},
	{
		"lat": 47.768046,
		"lng": -96.937903
	},
	{
		"lat": 47.768061,
		"lng": -96.93806
	},
	{
		"lat": 47.768092,
		"lng": -96.938266
	},
	{
		"lat": 47.768128,
		"lng": -96.938416
	},
	{
		"lat": 47.76819,
		"lng": -96.938607
	},
	{
		"lat": 47.768279,
		"lng": -96.938837
	},
	{
		"lat": 47.768462,
		"lng": -96.939229
	},
	{
		"lat": 47.768698,
		"lng": -96.939696
	},
	{
		"lat": 47.768766,
		"lng": -96.93982
	},
	{
		"lat": 47.768862,
		"lng": -96.939978
	},
	{
		"lat": 47.768988,
		"lng": -96.940166
	},
	{
		"lat": 47.769196,
		"lng": -96.940459
	},
	{
		"lat": 47.769868,
		"lng": -96.941342
	},
	{
		"lat": 47.769981,
		"lng": -96.941474
	},
	{
		"lat": 47.770042,
		"lng": -96.941531
	},
	{
		"lat": 47.770205,
		"lng": -96.94174
	},
	{
		"lat": 47.770292,
		"lng": -96.941834
	},
	{
		"lat": 47.770563,
		"lng": -96.942184
	},
	{
		"lat": 47.770682,
		"lng": -96.942305
	},
	{
		"lat": 47.770817,
		"lng": -96.942481
	},
	{
		"lat": 47.77097,
		"lng": -96.942705
	},
	{
		"lat": 47.771165,
		"lng": -96.943016
	},
	{
		"lat": 47.77127,
		"lng": -96.943232
	},
	{
		"lat": 47.771467,
		"lng": -96.943674
	},
	{
		"lat": 47.771577,
		"lng": -96.944005
	},
	{
		"lat": 47.771612,
		"lng": -96.944096
	},
	{
		"lat": 47.771672,
		"lng": -96.944228
	},
	{
		"lat": 47.771704,
		"lng": -96.944313
	},
	{
		"lat": 47.771817,
		"lng": -96.944518
	},
	{
		"lat": 47.771969,
		"lng": -96.944814
	},
	{
		"lat": 47.772165,
		"lng": -96.945124
	},
	{
		"lat": 47.772372,
		"lng": -96.945419
	},
	{
		"lat": 47.772458,
		"lng": -96.945517
	},
	{
		"lat": 47.772729,
		"lng": -96.94578
	},
	{
		"lat": 47.772829,
		"lng": -96.94584
	},
	{
		"lat": 47.772899,
		"lng": -96.945871
	},
	{
		"lat": 47.773112,
		"lng": -96.94593
	},
	{
		"lat": 47.7734,
		"lng": -96.945973
	},
	{
		"lat": 47.774087,
		"lng": -96.946006
	},
	{
		"lat": 47.774231,
		"lng": -96.946017
	},
	{
		"lat": 47.774338,
		"lng": -96.946041
	},
	{
		"lat": 47.774478,
		"lng": -96.946094
	},
	{
		"lat": 47.774649,
		"lng": -96.946183
	},
	{
		"lat": 47.774678,
		"lng": -96.946215
	},
	{
		"lat": 47.77471,
		"lng": -96.94624
	},
	{
		"lat": 47.774777,
		"lng": -96.946278
	},
	{
		"lat": 47.774842,
		"lng": -96.946326
	},
	{
		"lat": 47.774898,
		"lng": -96.946392
	},
	{
		"lat": 47.774948,
		"lng": -96.946468
	},
	{
		"lat": 47.774994,
		"lng": -96.94655
	},
	{
		"lat": 47.775091,
		"lng": -96.946773
	},
	{
		"lat": 47.775215,
		"lng": -96.947213
	},
	{
		"lat": 47.77526,
		"lng": -96.947468
	},
	{
		"lat": 47.775294,
		"lng": -96.947619
	},
	{
		"lat": 47.77532,
		"lng": -96.947827
	},
	{
		"lat": 47.775337,
		"lng": -96.94809
	},
	{
		"lat": 47.775349,
		"lng": -96.948673
	},
	{
		"lat": 47.775341,
		"lng": -96.948884
	},
	{
		"lat": 47.775332,
		"lng": -96.948989
	},
	{
		"lat": 47.775311,
		"lng": -96.949144
	},
	{
		"lat": 47.775289,
		"lng": -96.949354
	},
	{
		"lat": 47.77526,
		"lng": -96.949561
	},
	{
		"lat": 47.775223,
		"lng": -96.949765
	},
	{
		"lat": 47.775207,
		"lng": -96.949813
	},
	{
		"lat": 47.775179,
		"lng": -96.949966
	},
	{
		"lat": 47.775103,
		"lng": -96.950319
	},
	{
		"lat": 47.775034,
		"lng": -96.950563
	},
	{
		"lat": 47.774955,
		"lng": -96.950914
	},
	{
		"lat": 47.774912,
		"lng": -96.95106
	},
	{
		"lat": 47.774873,
		"lng": -96.95115
	},
	{
		"lat": 47.774849,
		"lng": -96.951248
	},
	{
		"lat": 47.77481,
		"lng": -96.951338
	},
	{
		"lat": 47.774733,
		"lng": -96.951634
	},
	{
		"lat": 47.774667,
		"lng": -96.951936
	},
	{
		"lat": 47.774621,
		"lng": -96.952191
	},
	{
		"lat": 47.774556,
		"lng": -96.952604
	},
	{
		"lat": 47.774537,
		"lng": -96.952706
	},
	{
		"lat": 47.774513,
		"lng": -96.952915
	},
	{
		"lat": 47.774499,
		"lng": -96.953178
	},
	{
		"lat": 47.774503,
		"lng": -96.95397
	},
	{
		"lat": 47.774518,
		"lng": -96.954181
	},
	{
		"lat": 47.774563,
		"lng": -96.954652
	},
	{
		"lat": 47.774576,
		"lng": -96.954756
	},
	{
		"lat": 47.774595,
		"lng": -96.954858
	},
	{
		"lat": 47.774616,
		"lng": -96.955014
	},
	{
		"lat": 47.774632,
		"lng": -96.95517
	},
	{
		"lat": 47.774662,
		"lng": -96.955323
	},
	{
		"lat": 47.774748,
		"lng": -96.955671
	},
	{
		"lat": 47.774815,
		"lng": -96.955858
	},
	{
		"lat": 47.774859,
		"lng": -96.955942
	},
	{
		"lat": 47.77492,
		"lng": -96.956073
	},
	{
		"lat": 47.774966,
		"lng": -96.956155
	},
	{
		"lat": 47.775092,
		"lng": -96.956345
	},
	{
		"lat": 47.775202,
		"lng": -96.956482
	},
	{
		"lat": 47.775232,
		"lng": -96.956511
	},
	{
		"lat": 47.775331,
		"lng": -96.956578
	},
	{
		"lat": 47.775431,
		"lng": -96.956638
	},
	{
		"lat": 47.77549,
		"lng": -96.956652
	},
	{
		"lat": 47.775779,
		"lng": -96.956643
	},
	{
		"lat": 47.775955,
		"lng": -96.956584
	},
	{
		"lat": 47.776091,
		"lng": -96.956512
	},
	{
		"lat": 47.776224,
		"lng": -96.956426
	},
	{
		"lat": 47.776287,
		"lng": -96.956375
	},
	{
		"lat": 47.776438,
		"lng": -96.956229
	},
	{
		"lat": 47.776524,
		"lng": -96.956132
	},
	{
		"lat": 47.776607,
		"lng": -96.95603
	},
	{
		"lat": 47.776789,
		"lng": -96.955773
	},
	{
		"lat": 47.776847,
		"lng": -96.955708
	},
	{
		"lat": 47.777206,
		"lng": -96.955185
	},
	{
		"lat": 47.777578,
		"lng": -96.954608
	},
	{
		"lat": 47.777669,
		"lng": -96.954443
	},
	{
		"lat": 47.777712,
		"lng": -96.954372
	},
	{
		"lat": 47.777814,
		"lng": -96.954208
	},
	{
		"lat": 47.777859,
		"lng": -96.954125
	},
	{
		"lat": 47.777931,
		"lng": -96.954006
	},
	{
		"lat": 47.778106,
		"lng": -96.953668
	},
	{
		"lat": 47.778389,
		"lng": -96.953188
	},
	{
		"lat": 47.778765,
		"lng": -96.952692
	},
	{
		"lat": 47.778796,
		"lng": -96.952663
	},
	{
		"lat": 47.778993,
		"lng": -96.952534
	},
	{
		"lat": 47.779123,
		"lng": -96.95244
	},
	{
		"lat": 47.779225,
		"lng": -96.952385
	},
	{
		"lat": 47.779296,
		"lng": -96.95237
	},
	{
		"lat": 47.779441,
		"lng": -96.952377
	},
	{
		"lat": 47.779476,
		"lng": -96.952386
	},
	{
		"lat": 47.779544,
		"lng": -96.952423
	},
	{
		"lat": 47.779607,
		"lng": -96.952475
	},
	{
		"lat": 47.779696,
		"lng": -96.952567
	},
	{
		"lat": 47.779752,
		"lng": -96.952634
	},
	{
		"lat": 47.779777,
		"lng": -96.952673
	},
	{
		"lat": 47.779867,
		"lng": -96.952838
	},
	{
		"lat": 47.779904,
		"lng": -96.952929
	},
	{
		"lat": 47.779934,
		"lng": -96.953025
	},
	{
		"lat": 47.779966,
		"lng": -96.953231
	},
	{
		"lat": 47.77997,
		"lng": -96.953337
	},
	{
		"lat": 47.779953,
		"lng": -96.953653
	},
	{
		"lat": 47.779919,
		"lng": -96.953966
	},
	{
		"lat": 47.779896,
		"lng": -96.954121
	},
	{
		"lat": 47.779866,
		"lng": -96.954381
	},
	{
		"lat": 47.779844,
		"lng": -96.954537
	},
	{
		"lat": 47.779785,
		"lng": -96.955165
	},
	{
		"lat": 47.779776,
		"lng": -96.955323
	},
	{
		"lat": 47.779772,
		"lng": -96.955904
	},
	{
		"lat": 47.779774,
		"lng": -96.956063
	},
	{
		"lat": 47.779812,
		"lng": -96.956749
	},
	{
		"lat": 47.779838,
		"lng": -96.95701
	},
	{
		"lat": 47.779855,
		"lng": -96.957274
	},
	{
		"lat": 47.779882,
		"lng": -96.957535
	},
	{
		"lat": 47.779906,
		"lng": -96.957635
	},
	{
		"lat": 47.779938,
		"lng": -96.957824
	},
	{
		"lat": 47.779941,
		"lng": -96.95784
	},
	{
		"lat": 47.77999,
		"lng": -96.958039
	},
	{
		"lat": 47.780061,
		"lng": -96.958282
	},
	{
		"lat": 47.780103,
		"lng": -96.958386
	},
	{
		"lat": 47.780187,
		"lng": -96.958559
	},
	{
		"lat": 47.780335,
		"lng": -96.95879
	},
	{
		"lat": 47.780441,
		"lng": -96.958935
	},
	{
		"lat": 47.780497,
		"lng": -96.959002
	},
	{
		"lat": 47.780585,
		"lng": -96.959094
	},
	{
		"lat": 47.780742,
		"lng": -96.959225
	},
	{
		"lat": 47.780842,
		"lng": -96.959288
	},
	{
		"lat": 47.780979,
		"lng": -96.959353
	},
	{
		"lat": 47.781121,
		"lng": -96.959398
	},
	{
		"lat": 47.781193,
		"lng": -96.959405
	},
	{
		"lat": 47.781301,
		"lng": -96.959392
	},
	{
		"lat": 47.781661,
		"lng": -96.959333
	},
	{
		"lat": 47.781766,
		"lng": -96.959292
	},
	{
		"lat": 47.781869,
		"lng": -96.959244
	},
	{
		"lat": 47.782067,
		"lng": -96.959115
	},
	{
		"lat": 47.782169,
		"lng": -96.959061
	},
	{
		"lat": 47.782201,
		"lng": -96.959036
	},
	{
		"lat": 47.782335,
		"lng": -96.958956
	},
	{
		"lat": 47.782398,
		"lng": -96.958904
	},
	{
		"lat": 47.782495,
		"lng": -96.958834
	},
	{
		"lat": 47.782595,
		"lng": -96.958772
	},
	{
		"lat": 47.782788,
		"lng": -96.958627
	},
	{
		"lat": 47.782908,
		"lng": -96.958509
	},
	{
		"lat": 47.783003,
		"lng": -96.958432
	},
	{
		"lat": 47.783063,
		"lng": -96.958373
	},
	{
		"lat": 47.783321,
		"lng": -96.958182
	},
	{
		"lat": 47.783542,
		"lng": -96.958003
	},
	{
		"lat": 47.783906,
		"lng": -96.957769
	},
	{
		"lat": 47.784078,
		"lng": -96.957685
	},
	{
		"lat": 47.784182,
		"lng": -96.957641
	},
	{
		"lat": 47.784253,
		"lng": -96.957618
	},
	{
		"lat": 47.78432,
		"lng": -96.957581
	},
	{
		"lat": 47.78446,
		"lng": -96.957529
	},
	{
		"lat": 47.78464,
		"lng": -96.957501
	},
	{
		"lat": 47.784928,
		"lng": -96.957504
	},
	{
		"lat": 47.785108,
		"lng": -96.957534
	},
	{
		"lat": 47.785284,
		"lng": -96.957595
	},
	{
		"lat": 47.785388,
		"lng": -96.957639
	},
	{
		"lat": 47.785455,
		"lng": -96.957677
	},
	{
		"lat": 47.785487,
		"lng": -96.957704
	},
	{
		"lat": 47.785515,
		"lng": -96.957737
	},
	{
		"lat": 47.785658,
		"lng": -96.957976
	},
	{
		"lat": 47.785678,
		"lng": -96.95802
	},
	{
		"lat": 47.785693,
		"lng": -96.958069
	},
	{
		"lat": 47.78571,
		"lng": -96.958171
	},
	{
		"lat": 47.785708,
		"lng": -96.95833
	},
	{
		"lat": 47.785674,
		"lng": -96.958481
	},
	{
		"lat": 47.785633,
		"lng": -96.958568
	},
	{
		"lat": 47.785588,
		"lng": -96.95865
	},
	{
		"lat": 47.785512,
		"lng": -96.958765
	},
	{
		"lat": 47.78543,
		"lng": -96.958869
	},
	{
		"lat": 47.785343,
		"lng": -96.958963
	},
	{
		"lat": 47.785278,
		"lng": -96.959012
	},
	{
		"lat": 47.785186,
		"lng": -96.959094
	},
	{
		"lat": 47.7851,
		"lng": -96.95919
	},
	{
		"lat": 47.785037,
		"lng": -96.959244
	},
	{
		"lat": 47.784979,
		"lng": -96.959307
	},
	{
		"lat": 47.784917,
		"lng": -96.959362
	},
	{
		"lat": 47.784878,
		"lng": -96.959405
	},
	{
		"lat": 47.784815,
		"lng": -96.959457
	},
	{
		"lat": 47.784695,
		"lng": -96.959577
	},
	{
		"lat": 47.784499,
		"lng": -96.959811
	},
	{
		"lat": 47.784322,
		"lng": -96.959996
	},
	{
		"lat": 47.784193,
		"lng": -96.960155
	},
	{
		"lat": 47.784073,
		"lng": -96.960302
	},
	{
		"lat": 47.783915,
		"lng": -96.960519
	},
	{
		"lat": 47.783741,
		"lng": -96.960787
	},
	{
		"lat": 47.783645,
		"lng": -96.960947
	},
	{
		"lat": 47.783443,
		"lng": -96.961319
	},
	{
		"lat": 47.783392,
		"lng": -96.961423
	},
	{
		"lat": 47.783339,
		"lng": -96.961535
	},
	{
		"lat": 47.783264,
		"lng": -96.961716
	},
	{
		"lat": 47.783242,
		"lng": -96.961817
	},
	{
		"lat": 47.783148,
		"lng": -96.96216
	},
	{
		"lat": 47.783025,
		"lng": -96.962712
	},
	{
		"lat": 47.782997,
		"lng": -96.962865
	},
	{
		"lat": 47.782971,
		"lng": -96.963073
	},
	{
		"lat": 47.782953,
		"lng": -96.963283
	},
	{
		"lat": 47.782951,
		"lng": -96.963442
	},
	{
		"lat": 47.782955,
		"lng": -96.9636
	},
	{
		"lat": 47.782977,
		"lng": -96.963863
	},
	{
		"lat": 47.783005,
		"lng": -96.964016
	},
	{
		"lat": 47.783009,
		"lng": -96.964069
	},
	{
		"lat": 47.783018,
		"lng": -96.96412
	},
	{
		"lat": 47.783071,
		"lng": -96.964317
	},
	{
		"lat": 47.783105,
		"lng": -96.96441
	},
	{
		"lat": 47.783132,
		"lng": -96.964508
	},
	{
		"lat": 47.783209,
		"lng": -96.964687
	},
	{
		"lat": 47.783385,
		"lng": -96.964954
	},
	{
		"lat": 47.783439,
		"lng": -96.965024
	},
	{
		"lat": 47.783512,
		"lng": -96.965103
	},
	{
		"lat": 47.783573,
		"lng": -96.96516
	},
	{
		"lat": 47.783672,
		"lng": -96.965225
	},
	{
		"lat": 47.783775,
		"lng": -96.965278
	},
	{
		"lat": 47.783879,
		"lng": -96.965322
	},
	{
		"lat": 47.783985,
		"lng": -96.965358
	},
	{
		"lat": 47.784199,
		"lng": -96.965406
	},
	{
		"lat": 47.784344,
		"lng": -96.965415
	},
	{
		"lat": 47.784524,
		"lng": -96.965394
	},
	{
		"lat": 47.78474,
		"lng": -96.965354
	},
	{
		"lat": 47.785159,
		"lng": -96.965188
	},
	{
		"lat": 47.785228,
		"lng": -96.965155
	},
	{
		"lat": 47.785333,
		"lng": -96.965118
	},
	{
		"lat": 47.785401,
		"lng": -96.965079
	},
	{
		"lat": 47.78566,
		"lng": -96.964892
	},
	{
		"lat": 47.78576,
		"lng": -96.964833
	},
	{
		"lat": 47.785823,
		"lng": -96.964779
	},
	{
		"lat": 47.78589,
		"lng": -96.964738
	},
	{
		"lat": 47.785983,
		"lng": -96.964657
	},
	{
		"lat": 47.78608,
		"lng": -96.964586
	},
	{
		"lat": 47.786301,
		"lng": -96.964407
	},
	{
		"lat": 47.786361,
		"lng": -96.964347
	},
	{
		"lat": 47.786426,
		"lng": -96.964302
	},
	{
		"lat": 47.786484,
		"lng": -96.964253
	},
	{
		"lat": 47.786615,
		"lng": -96.964145
	},
	{
		"lat": 47.786713,
		"lng": -96.964077
	},
	{
		"lat": 47.786838,
		"lng": -96.96397
	},
	{
		"lat": 47.787268,
		"lng": -96.963577
	},
	{
		"lat": 47.787387,
		"lng": -96.963456
	},
	{
		"lat": 47.787772,
		"lng": -96.962975
	},
	{
		"lat": 47.78783,
		"lng": -96.962912
	},
	{
		"lat": 47.787885,
		"lng": -96.962844
	},
	{
		"lat": 47.787964,
		"lng": -96.962734
	},
	{
		"lat": 47.788047,
		"lng": -96.962632
	},
	{
		"lat": 47.788205,
		"lng": -96.962415
	},
	{
		"lat": 47.788536,
		"lng": -96.961928
	},
	{
		"lat": 47.78866,
		"lng": -96.961735
	},
	{
		"lat": 47.788706,
		"lng": -96.961653
	},
	{
		"lat": 47.788747,
		"lng": -96.961567
	},
	{
		"lat": 47.788802,
		"lng": -96.96143
	},
	{
		"lat": 47.788871,
		"lng": -96.961307
	},
	{
		"lat": 47.788976,
		"lng": -96.961092
	},
	{
		"lat": 47.789015,
		"lng": -96.961003
	},
	{
		"lat": 47.78914,
		"lng": -96.960681
	},
	{
		"lat": 47.789186,
		"lng": -96.960537
	},
	{
		"lat": 47.789212,
		"lng": -96.960439
	},
	{
		"lat": 47.789282,
		"lng": -96.960083
	},
	{
		"lat": 47.789322,
		"lng": -96.959935
	},
	{
		"lat": 47.789356,
		"lng": -96.959785
	},
	{
		"lat": 47.789412,
		"lng": -96.959478
	},
	{
		"lat": 47.78944,
		"lng": -96.959381
	},
	{
		"lat": 47.789473,
		"lng": -96.95923
	},
	{
		"lat": 47.789488,
		"lng": -96.959182
	},
	{
		"lat": 47.789504,
		"lng": -96.959078
	},
	{
		"lat": 47.789571,
		"lng": -96.958833
	},
	{
		"lat": 47.789589,
		"lng": -96.95873
	},
	{
		"lat": 47.789677,
		"lng": -96.958328
	},
	{
		"lat": 47.78972,
		"lng": -96.958182
	},
	{
		"lat": 47.789757,
		"lng": -96.958034
	},
	{
		"lat": 47.7898,
		"lng": -96.957888
	},
	{
		"lat": 47.789834,
		"lng": -96.957795
	},
	{
		"lat": 47.789875,
		"lng": -96.957708
	},
	{
		"lat": 47.789908,
		"lng": -96.957613
	},
	{
		"lat": 47.78998,
		"lng": -96.957495
	},
	{
		"lat": 47.790167,
		"lng": -96.957244
	},
	{
		"lat": 47.790227,
		"lng": -96.957186
	},
	{
		"lat": 47.790293,
		"lng": -96.957141
	},
	{
		"lat": 47.790466,
		"lng": -96.957066
	},
	{
		"lat": 47.790537,
		"lng": -96.957047
	},
	{
		"lat": 47.790645,
		"lng": -96.957028
	},
	{
		"lat": 47.791007,
		"lng": -96.957051
	},
	{
		"lat": 47.791077,
		"lng": -96.957074
	},
	{
		"lat": 47.791318,
		"lng": -96.957187
	},
	{
		"lat": 47.791552,
		"lng": -96.957332
	},
	{
		"lat": 47.791615,
		"lng": -96.957383
	},
	{
		"lat": 47.791681,
		"lng": -96.957427
	},
	{
		"lat": 47.791797,
		"lng": -96.957519
	},
	{
		"lat": 47.791959,
		"lng": -96.95767
	},
	{
		"lat": 47.79198,
		"lng": -96.957689
	},
	{
		"lat": 47.792156,
		"lng": -96.957877
	},
	{
		"lat": 47.792235,
		"lng": -96.957985
	},
	{
		"lat": 47.792399,
		"lng": -96.958194
	},
	{
		"lat": 47.792504,
		"lng": -96.958339
	},
	{
		"lat": 47.792675,
		"lng": -96.958613
	},
	{
		"lat": 47.79272,
		"lng": -96.958695
	},
	{
		"lat": 47.793014,
		"lng": -96.959363
	},
	{
		"lat": 47.793047,
		"lng": -96.959458
	},
	{
		"lat": 47.793103,
		"lng": -96.959593
	},
	{
		"lat": 47.793152,
		"lng": -96.959734
	},
	{
		"lat": 47.793211,
		"lng": -96.959868
	},
	{
		"lat": 47.793392,
		"lng": -96.960325
	},
	{
		"lat": 47.793458,
		"lng": -96.960514
	},
	{
		"lat": 47.793515,
		"lng": -96.960649
	},
	{
		"lat": 47.793658,
		"lng": -96.961017
	},
	{
		"lat": 47.793823,
		"lng": -96.961488
	},
	{
		"lat": 47.793853,
		"lng": -96.961584
	},
	{
		"lat": 47.79415,
		"lng": -96.962371
	},
	{
		"lat": 47.794196,
		"lng": -96.962515
	},
	{
		"lat": 47.794325,
		"lng": -96.962838
	},
	{
		"lat": 47.794342,
		"lng": -96.96288
	},
	{
		"lat": 47.79443,
		"lng": -96.963111
	},
	{
		"lat": 47.794488,
		"lng": -96.963246
	},
	{
		"lat": 47.794631,
		"lng": -96.963552
	},
	{
		"lat": 47.794761,
		"lng": -96.963806
	},
	{
		"lat": 47.795088,
		"lng": -96.9643
	},
	{
		"lat": 47.795246,
		"lng": -96.964517
	},
	{
		"lat": 47.795356,
		"lng": -96.964655
	},
	{
		"lat": 47.795386,
		"lng": -96.964684
	},
	{
		"lat": 47.795528,
		"lng": -96.964849
	},
	{
		"lat": 47.795588,
		"lng": -96.964907
	},
	{
		"lat": 47.795704,
		"lng": -96.965034
	},
	{
		"lat": 47.795796,
		"lng": -96.965119
	},
	{
		"lat": 47.796141,
		"lng": -96.965409
	},
	{
		"lat": 47.796206,
		"lng": -96.965455
	},
	{
		"lat": 47.796427,
		"lng": -96.965636
	},
	{
		"lat": 47.796592,
		"lng": -96.965743
	},
	{
		"lat": 47.796623,
		"lng": -96.965769
	},
	{
		"lat": 47.796724,
		"lng": -96.965827
	},
	{
		"lat": 47.7971,
		"lng": -96.96602
	},
	{
		"lat": 47.797204,
		"lng": -96.966061
	},
	{
		"lat": 47.797275,
		"lng": -96.966083
	},
	{
		"lat": 47.797346,
		"lng": -96.966098
	},
	{
		"lat": 47.79749,
		"lng": -96.966117
	},
	{
		"lat": 47.79767,
		"lng": -96.966132
	},
	{
		"lat": 47.797743,
		"lng": -96.966128
	},
	{
		"lat": 47.798212,
		"lng": -96.966076
	},
	{
		"lat": 47.798573,
		"lng": -96.966064
	},
	{
		"lat": 47.798862,
		"lng": -96.966082
	},
	{
		"lat": 47.799005,
		"lng": -96.966114
	},
	{
		"lat": 47.799144,
		"lng": -96.966175
	},
	{
		"lat": 47.799349,
		"lng": -96.966277
	},
	{
		"lat": 47.799449,
		"lng": -96.966339
	},
	{
		"lat": 47.799514,
		"lng": -96.966391
	},
	{
		"lat": 47.799569,
		"lng": -96.966459
	},
	{
		"lat": 47.799614,
		"lng": -96.966522
	},
	{
		"lat": 47.799621,
		"lng": -96.966532
	},
	{
		"lat": 47.799695,
		"lng": -96.966648
	},
	{
		"lat": 47.799737,
		"lng": -96.966735
	},
	{
		"lat": 47.799809,
		"lng": -96.966918
	},
	{
		"lat": 47.799852,
		"lng": -96.96712
	},
	{
		"lat": 47.799861,
		"lng": -96.967225
	},
	{
		"lat": 47.799861,
		"lng": -96.967489
	},
	{
		"lat": 47.799848,
		"lng": -96.967753
	},
	{
		"lat": 47.799841,
		"lng": -96.967805
	},
	{
		"lat": 47.799788,
		"lng": -96.968057
	},
	{
		"lat": 47.799729,
		"lng": -96.96825
	},
	{
		"lat": 47.799634,
		"lng": -96.968476
	},
	{
		"lat": 47.799526,
		"lng": -96.968751
	},
	{
		"lat": 47.799448,
		"lng": -96.968929
	},
	{
		"lat": 47.799117,
		"lng": -96.969623
	},
	{
		"lat": 47.798894,
		"lng": -96.97004
	},
	{
		"lat": 47.798724,
		"lng": -96.970381
	},
	{
		"lat": 47.798644,
		"lng": -96.970558
	},
	{
		"lat": 47.798591,
		"lng": -96.970685
	},
	{
		"lat": 47.798496,
		"lng": -96.97092
	},
	{
		"lat": 47.79823,
		"lng": -96.971669
	},
	{
		"lat": 47.798189,
		"lng": -96.971816
	},
	{
		"lat": 47.798029,
		"lng": -96.972292
	},
	{
		"lat": 47.797978,
		"lng": -96.972431
	},
	{
		"lat": 47.797967,
		"lng": -96.972482
	},
	{
		"lat": 47.797922,
		"lng": -96.972625
	},
	{
		"lat": 47.797855,
		"lng": -96.972871
	},
	{
		"lat": 47.797821,
		"lng": -96.973022
	},
	{
		"lat": 47.797776,
		"lng": -96.973278
	},
	{
		"lat": 47.797707,
		"lng": -96.973744
	},
	{
		"lat": 47.797683,
		"lng": -96.973952
	},
	{
		"lat": 47.79765,
		"lng": -96.974532
	},
	{
		"lat": 47.797648,
		"lng": -96.975007
	},
	{
		"lat": 47.797675,
		"lng": -96.975798
	},
	{
		"lat": 47.797681,
		"lng": -96.975851
	},
	{
		"lat": 47.797717,
		"lng": -96.976056
	},
	{
		"lat": 47.79774,
		"lng": -96.976156
	},
	{
		"lat": 47.797768,
		"lng": -96.976254
	},
	{
		"lat": 47.797855,
		"lng": -96.976422
	},
	{
		"lat": 47.797982,
		"lng": -96.976611
	},
	{
		"lat": 47.798146,
		"lng": -96.976818
	},
	{
		"lat": 47.798184,
		"lng": -96.97685
	},
	{
		"lat": 47.798209,
		"lng": -96.976871
	},
	{
		"lat": 47.798477,
		"lng": -96.977029
	},
	{
		"lat": 47.798753,
		"lng": -96.977158
	},
	{
		"lat": 47.798968,
		"lng": -96.977203
	},
	{
		"lat": 47.799293,
		"lng": -96.977236
	},
	{
		"lat": 47.799474,
		"lng": -96.977222
	},
	{
		"lat": 47.799833,
		"lng": -96.977158
	},
	{
		"lat": 47.800045,
		"lng": -96.977089
	},
	{
		"lat": 47.800114,
		"lng": -96.977059
	},
	{
		"lat": 47.800222,
		"lng": -96.977035
	},
	{
		"lat": 47.800361,
		"lng": -96.976978
	},
	{
		"lat": 47.800468,
		"lng": -96.976948
	},
	{
		"lat": 47.800641,
		"lng": -96.976872
	},
	{
		"lat": 47.800783,
		"lng": -96.97683
	},
	{
		"lat": 47.801022,
		"lng": -96.976709
	},
	{
		"lat": 47.801156,
		"lng": -96.976629
	},
	{
		"lat": 47.801251,
		"lng": -96.976552
	},
	{
		"lat": 47.801366,
		"lng": -96.97647
	},
	{
		"lat": 47.801389,
		"lng": -96.976448
	},
	{
		"lat": 47.801458,
		"lng": -96.976387
	},
	{
		"lat": 47.801542,
		"lng": -96.976285
	},
	{
		"lat": 47.801665,
		"lng": -96.976092
	},
	{
		"lat": 47.801747,
		"lng": -96.975917
	},
	{
		"lat": 47.80182,
		"lng": -96.975676
	},
	{
		"lat": 47.801845,
		"lng": -96.975576
	},
	{
		"lat": 47.801871,
		"lng": -96.975422
	},
	{
		"lat": 47.80189,
		"lng": -96.975212
	},
	{
		"lat": 47.801885,
		"lng": -96.974842
	},
	{
		"lat": 47.801855,
		"lng": -96.97405
	},
	{
		"lat": 47.801806,
		"lng": -96.973526
	},
	{
		"lat": 47.801799,
		"lng": -96.97342
	},
	{
		"lat": 47.801793,
		"lng": -96.973156
	},
	{
		"lat": 47.801795,
		"lng": -96.972997
	},
	{
		"lat": 47.801804,
		"lng": -96.972839
	},
	{
		"lat": 47.80182,
		"lng": -96.972736
	},
	{
		"lat": 47.801833,
		"lng": -96.972687
	},
	{
		"lat": 47.801853,
		"lng": -96.972635
	},
	{
		"lat": 47.80187,
		"lng": -96.972596
	},
	{
		"lat": 47.801919,
		"lng": -96.972454
	},
	{
		"lat": 47.801962,
		"lng": -96.972369
	},
	{
		"lat": 47.802068,
		"lng": -96.972224
	},
	{
		"lat": 47.802133,
		"lng": -96.972177
	},
	{
		"lat": 47.802201,
		"lng": -96.972143
	},
	{
		"lat": 47.802233,
		"lng": -96.972119
	},
	{
		"lat": 47.802268,
		"lng": -96.972104
	},
	{
		"lat": 47.802304,
		"lng": -96.972096
	},
	{
		"lat": 47.802448,
		"lng": -96.972092
	},
	{
		"lat": 47.802521,
		"lng": -96.9721
	},
	{
		"lat": 47.802556,
		"lng": -96.972109
	},
	{
		"lat": 47.802691,
		"lng": -96.972186
	},
	{
		"lat": 47.802756,
		"lng": -96.972233
	},
	{
		"lat": 47.802787,
		"lng": -96.972261
	},
	{
		"lat": 47.802815,
		"lng": -96.9723
	},
	{
		"lat": 47.802847,
		"lng": -96.972345
	},
	{
		"lat": 47.802918,
		"lng": -96.972442
	},
	{
		"lat": 47.802973,
		"lng": -96.972511
	},
	{
		"lat": 47.803072,
		"lng": -96.972665
	},
	{
		"lat": 47.803187,
		"lng": -96.97287
	},
	{
		"lat": 47.80328,
		"lng": -96.973097
	},
	{
		"lat": 47.80333,
		"lng": -96.973237
	},
	{
		"lat": 47.803376,
		"lng": -96.973381
	},
	{
		"lat": 47.803576,
		"lng": -96.974175
	},
	{
		"lat": 47.803617,
		"lng": -96.974377
	},
	{
		"lat": 47.803631,
		"lng": -96.974426
	},
	{
		"lat": 47.803639,
		"lng": -96.974478
	},
	{
		"lat": 47.803665,
		"lng": -96.974793
	},
	{
		"lat": 47.803677,
		"lng": -96.975004
	},
	{
		"lat": 47.803681,
		"lng": -96.975215
	},
	{
		"lat": 47.80368,
		"lng": -96.975849
	},
	{
		"lat": 47.803666,
		"lng": -96.976476
	},
	{
		"lat": 47.803663,
		"lng": -96.97659
	},
	{
		"lat": 47.803678,
		"lng": -96.9768
	},
	{
		"lat": 47.8037,
		"lng": -96.976955
	},
	{
		"lat": 47.803797,
		"lng": -96.977519
	},
	{
		"lat": 47.803811,
		"lng": -96.977623
	},
	{
		"lat": 47.803818,
		"lng": -96.977728
	},
	{
		"lat": 47.803844,
		"lng": -96.977882
	},
	{
		"lat": 47.803854,
		"lng": -96.977987
	},
	{
		"lat": 47.803889,
		"lng": -96.978246
	},
	{
		"lat": 47.803926,
		"lng": -96.978559
	},
	{
		"lat": 47.80398,
		"lng": -96.978921
	},
	{
		"lat": 47.804,
		"lng": -96.979022
	},
	{
		"lat": 47.804015,
		"lng": -96.979125
	},
	{
		"lat": 47.804032,
		"lng": -96.979282
	},
	{
		"lat": 47.804051,
		"lng": -96.979385
	},
	{
		"lat": 47.80409,
		"lng": -96.979643
	},
	{
		"lat": 47.804135,
		"lng": -96.979844
	},
	{
		"lat": 47.804165,
		"lng": -96.97994
	},
	{
		"lat": 47.804206,
		"lng": -96.980198
	},
	{
		"lat": 47.804266,
		"lng": -96.980448
	},
	{
		"lat": 47.804321,
		"lng": -96.980699
	},
	{
		"lat": 47.804395,
		"lng": -96.980941
	},
	{
		"lat": 47.804411,
		"lng": -96.981019
	},
	{
		"lat": 47.804426,
		"lng": -96.981093
	},
	{
		"lat": 47.804457,
		"lng": -96.981189
	},
	{
		"lat": 47.804489,
		"lng": -96.98134
	},
	{
		"lat": 47.804538,
		"lng": -96.981482
	},
	{
		"lat": 47.804582,
		"lng": -96.981683
	},
	{
		"lat": 47.804683,
		"lng": -96.982023
	},
	{
		"lat": 47.804864,
		"lng": -96.982481
	},
	{
		"lat": 47.804885,
		"lng": -96.982524
	},
	{
		"lat": 47.804987,
		"lng": -96.982773
	},
	{
		"lat": 47.805111,
		"lng": -96.983021
	},
	{
		"lat": 47.80535,
		"lng": -96.983394
	},
	{
		"lat": 47.805383,
		"lng": -96.983446
	},
	{
		"lat": 47.805872,
		"lng": -96.984153
	},
	{
		"lat": 47.806273,
		"lng": -96.984765
	},
	{
		"lat": 47.806419,
		"lng": -96.985001
	},
	{
		"lat": 47.806579,
		"lng": -96.985288
	},
	{
		"lat": 47.806704,
		"lng": -96.985548
	},
	{
		"lat": 47.806859,
		"lng": -96.985905
	},
	{
		"lat": 47.806888,
		"lng": -96.986001
	},
	{
		"lat": 47.806906,
		"lng": -96.986047
	},
	{
		"lat": 47.80695,
		"lng": -96.986192
	},
	{
		"lat": 47.806998,
		"lng": -96.986392
	},
	{
		"lat": 47.807024,
		"lng": -96.986546
	},
	{
		"lat": 47.807035,
		"lng": -96.98665
	},
	{
		"lat": 47.807064,
		"lng": -96.986803
	},
	{
		"lat": 47.807083,
		"lng": -96.987067
	},
	{
		"lat": 47.8071,
		"lng": -96.987489
	},
	{
		"lat": 47.8071,
		"lng": -96.987753
	},
	{
		"lat": 47.807106,
		"lng": -96.987965
	},
	{
		"lat": 47.807154,
		"lng": -96.988862
	},
	{
		"lat": 47.807187,
		"lng": -96.989282
	},
	{
		"lat": 47.807213,
		"lng": -96.98949
	},
	{
		"lat": 47.807213,
		"lng": -96.989544
	},
	{
		"lat": 47.807268,
		"lng": -96.989839
	},
	{
		"lat": 47.807319,
		"lng": -96.990036
	},
	{
		"lat": 47.807351,
		"lng": -96.990188
	},
	{
		"lat": 47.807416,
		"lng": -96.990377
	},
	{
		"lat": 47.807441,
		"lng": -96.990476
	},
	{
		"lat": 47.807515,
		"lng": -96.990717
	},
	{
		"lat": 47.807533,
		"lng": -96.990763
	},
	{
		"lat": 47.807672,
		"lng": -96.991007
	},
	{
		"lat": 47.807798,
		"lng": -96.991195
	},
	{
		"lat": 47.807938,
		"lng": -96.991363
	},
	{
		"lat": 47.80809,
		"lng": -96.991506
	},
	{
		"lat": 47.808187,
		"lng": -96.991578
	},
	{
		"lat": 47.808256,
		"lng": -96.991611
	},
	{
		"lat": 47.808327,
		"lng": -96.991633
	},
	{
		"lat": 47.808544,
		"lng": -96.991644
	},
	{
		"lat": 47.808797,
		"lng": -96.991616
	},
	{
		"lat": 47.808832,
		"lng": -96.991606
	},
	{
		"lat": 47.808901,
		"lng": -96.991571
	},
	{
		"lat": 47.809034,
		"lng": -96.991491
	},
	{
		"lat": 47.809097,
		"lng": -96.991437
	},
	{
		"lat": 47.809154,
		"lng": -96.991373
	},
	{
		"lat": 47.809215,
		"lng": -96.991315
	},
	{
		"lat": 47.809272,
		"lng": -96.99125
	},
	{
		"lat": 47.809324,
		"lng": -96.991176
	},
	{
		"lat": 47.809365,
		"lng": -96.991129
	},
	{
		"lat": 47.80941,
		"lng": -96.991079
	},
	{
		"lat": 47.809462,
		"lng": -96.991006
	},
	{
		"lat": 47.809583,
		"lng": -96.99081
	},
	{
		"lat": 47.809701,
		"lng": -96.990482
	},
	{
		"lat": 47.809743,
		"lng": -96.990335
	},
	{
		"lat": 47.809765,
		"lng": -96.990235
	},
	{
		"lat": 47.809811,
		"lng": -96.990091
	},
	{
		"lat": 47.809833,
		"lng": -96.98999
	},
	{
		"lat": 47.809859,
		"lng": -96.989836
	},
	{
		"lat": 47.809877,
		"lng": -96.989679
	},
	{
		"lat": 47.809894,
		"lng": -96.989577
	},
	{
		"lat": 47.809932,
		"lng": -96.989103
	},
	{
		"lat": 47.809939,
		"lng": -96.988945
	},
	{
		"lat": 47.809943,
		"lng": -96.987994
	},
	{
		"lat": 47.809906,
		"lng": -96.987574
	},
	{
		"lat": 47.809878,
		"lng": -96.987153
	},
	{
		"lat": 47.809866,
		"lng": -96.987048
	},
	{
		"lat": 47.809797,
		"lng": -96.986583
	},
	{
		"lat": 47.809726,
		"lng": -96.98601
	},
	{
		"lat": 47.809479,
		"lng": -96.98485
	},
	{
		"lat": 47.809418,
		"lng": -96.98449
	},
	{
		"lat": 47.809366,
		"lng": -96.984237
	},
	{
		"lat": 47.809292,
		"lng": -96.983828
	},
	{
		"lat": 47.809249,
		"lng": -96.983517
	},
	{
		"lat": 47.809209,
		"lng": -96.983259
	},
	{
		"lat": 47.80919,
		"lng": -96.983103
	},
	{
		"lat": 47.809165,
		"lng": -96.982948
	},
	{
		"lat": 47.809132,
		"lng": -96.982689
	},
	{
		"lat": 47.809068,
		"lng": -96.98233
	},
	{
		"lat": 47.809035,
		"lng": -96.98207
	},
	{
		"lat": 47.809016,
		"lng": -96.98186
	},
	{
		"lat": 47.809011,
		"lng": -96.981649
	},
	{
		"lat": 47.809016,
		"lng": -96.981596
	},
	{
		"lat": 47.809026,
		"lng": -96.981545
	},
	{
		"lat": 47.809066,
		"lng": -96.980966
	},
	{
		"lat": 47.809088,
		"lng": -96.980703
	},
	{
		"lat": 47.809119,
		"lng": -96.980496
	},
	{
		"lat": 47.809171,
		"lng": -96.980243
	},
	{
		"lat": 47.809176,
		"lng": -96.980226
	},
	{
		"lat": 47.809203,
		"lng": -96.980148
	},
	{
		"lat": 47.809227,
		"lng": -96.980048
	},
	{
		"lat": 47.809259,
		"lng": -96.979953
	},
	{
		"lat": 47.809298,
		"lng": -96.979816
	},
	{
		"lat": 47.809435,
		"lng": -96.979444
	},
	{
		"lat": 47.809537,
		"lng": -96.979226
	},
	{
		"lat": 47.809683,
		"lng": -96.978991
	},
	{
		"lat": 47.809892,
		"lng": -96.9787
	},
	{
		"lat": 47.810039,
		"lng": -96.978547
	},
	{
		"lat": 47.810193,
		"lng": -96.978407
	},
	{
		"lat": 47.810288,
		"lng": -96.978331
	},
	{
		"lat": 47.810387,
		"lng": -96.978266
	},
	{
		"lat": 47.810491,
		"lng": -96.978219
	},
	{
		"lat": 47.810557,
		"lng": -96.978178
	},
	{
		"lat": 47.810899,
		"lng": -96.978006
	},
	{
		"lat": 47.811149,
		"lng": -96.97795
	},
	{
		"lat": 47.811474,
		"lng": -96.977901
	},
	{
		"lat": 47.811654,
		"lng": -96.977919
	},
	{
		"lat": 47.811797,
		"lng": -96.97795
	},
	{
		"lat": 47.81201,
		"lng": -96.978015
	},
	{
		"lat": 47.812081,
		"lng": -96.978032
	},
	{
		"lat": 47.812151,
		"lng": -96.978059
	},
	{
		"lat": 47.812357,
		"lng": -96.978161
	},
	{
		"lat": 47.812457,
		"lng": -96.978222
	},
	{
		"lat": 47.812489,
		"lng": -96.978248
	},
	{
		"lat": 47.812621,
		"lng": -96.978332
	},
	{
		"lat": 47.812652,
		"lng": -96.97836
	},
	{
		"lat": 47.812749,
		"lng": -96.978429
	},
	{
		"lat": 47.812932,
		"lng": -96.978601
	},
	{
		"lat": 47.813057,
		"lng": -96.978708
	},
	{
		"lat": 47.813208,
		"lng": -96.978852
	},
	{
		"lat": 47.813241,
		"lng": -96.978874
	},
	{
		"lat": 47.813328,
		"lng": -96.97897
	},
	{
		"lat": 47.813451,
		"lng": -96.979081
	},
	{
		"lat": 47.813515,
		"lng": -96.97913
	},
	{
		"lat": 47.813606,
		"lng": -96.979218
	},
	{
		"lat": 47.81367,
		"lng": -96.979268
	},
	{
		"lat": 47.813728,
		"lng": -96.97933
	},
	{
		"lat": 47.813819,
		"lng": -96.979416
	},
	{
		"lat": 47.813944,
		"lng": -96.979523
	},
	{
		"lat": 47.814009,
		"lng": -96.979571
	},
	{
		"lat": 47.814109,
		"lng": -96.979633
	},
	{
		"lat": 47.814278,
		"lng": -96.979726
	},
	{
		"lat": 47.814443,
		"lng": -96.979833
	},
	{
		"lat": 47.814453,
		"lng": -96.979838
	},
	{
		"lat": 47.814511,
		"lng": -96.979871
	},
	{
		"lat": 47.81479,
		"lng": -96.979985
	},
	{
		"lat": 47.815109,
		"lng": -96.980074
	},
	{
		"lat": 47.815323,
		"lng": -96.980125
	},
	{
		"lat": 47.816005,
		"lng": -96.98025
	},
	{
		"lat": 47.816362,
		"lng": -96.980339
	},
	{
		"lat": 47.816541,
		"lng": -96.980373
	},
	{
		"lat": 47.816722,
		"lng": -96.980377
	},
	{
		"lat": 47.816867,
		"lng": -96.980373
	},
	{
		"lat": 47.817047,
		"lng": -96.980358
	},
	{
		"lat": 47.817771,
		"lng": -96.980319
	},
	{
		"lat": 47.818096,
		"lng": -96.980321
	},
	{
		"lat": 47.818602,
		"lng": -96.980335
	},
	{
		"lat": 47.818927,
		"lng": -96.980357
	},
	{
		"lat": 47.819035,
		"lng": -96.980378
	},
	{
		"lat": 47.819081,
		"lng": -96.980397
	},
	{
		"lat": 47.819259,
		"lng": -96.980442
	},
	{
		"lat": 47.819403,
		"lng": -96.980466
	},
	{
		"lat": 47.819765,
		"lng": -96.980477
	},
	{
		"lat": 47.820127,
		"lng": -96.980495
	},
	{
		"lat": 47.820702,
		"lng": -96.980581
	},
	{
		"lat": 47.821208,
		"lng": -96.980579
	},
	{
		"lat": 47.821642,
		"lng": -96.980556
	},
	{
		"lat": 47.821714,
		"lng": -96.980544
	},
	{
		"lat": 47.821856,
		"lng": -96.9805
	},
	{
		"lat": 47.822129,
		"lng": -96.980363
	},
	{
		"lat": 47.822259,
		"lng": -96.980269
	},
	{
		"lat": 47.822379,
		"lng": -96.98015
	},
	{
		"lat": 47.822484,
		"lng": -96.980004
	},
	{
		"lat": 47.822532,
		"lng": -96.979924
	},
	{
		"lat": 47.822552,
		"lng": -96.979881
	},
	{
		"lat": 47.8226,
		"lng": -96.979738
	},
	{
		"lat": 47.822631,
		"lng": -96.979586
	},
	{
		"lat": 47.822636,
		"lng": -96.979534
	},
	{
		"lat": 47.822639,
		"lng": -96.979428
	},
	{
		"lat": 47.822611,
		"lng": -96.979059
	},
	{
		"lat": 47.82255,
		"lng": -96.978755
	},
	{
		"lat": 47.822526,
		"lng": -96.978655
	},
	{
		"lat": 47.82234,
		"lng": -96.978058
	},
	{
		"lat": 47.822286,
		"lng": -96.977884
	},
	{
		"lat": 47.82219,
		"lng": -96.977485
	},
	{
		"lat": 47.822136,
		"lng": -96.977177
	},
	{
		"lat": 47.822121,
		"lng": -96.977073
	},
	{
		"lat": 47.822084,
		"lng": -96.976707
	},
	{
		"lat": 47.822082,
		"lng": -96.97639
	},
	{
		"lat": 47.822089,
		"lng": -96.976073
	},
	{
		"lat": 47.822107,
		"lng": -96.975598
	},
	{
		"lat": 47.82212,
		"lng": -96.97544
	},
	{
		"lat": 47.822146,
		"lng": -96.975286
	},
	{
		"lat": 47.822219,
		"lng": -96.975045
	},
	{
		"lat": 47.822313,
		"lng": -96.97482
	},
	{
		"lat": 47.822336,
		"lng": -96.974778
	},
	{
		"lat": 47.822373,
		"lng": -96.974687
	},
	{
		"lat": 47.822493,
		"lng": -96.97452
	},
	{
		"lat": 47.822578,
		"lng": -96.974421
	},
	{
		"lat": 47.822609,
		"lng": -96.974394
	},
	{
		"lat": 47.822804,
		"lng": -96.974255
	},
	{
		"lat": 47.822906,
		"lng": -96.974202
	},
	{
		"lat": 47.822978,
		"lng": -96.974184
	},
	{
		"lat": 47.823115,
		"lng": -96.974117
	},
	{
		"lat": 47.823223,
		"lng": -96.974102
	},
	{
		"lat": 47.823404,
		"lng": -96.974105
	},
	{
		"lat": 47.823474,
		"lng": -96.974128
	},
	{
		"lat": 47.823682,
		"lng": -96.974222
	},
	{
		"lat": 47.823715,
		"lng": -96.974243
	},
	{
		"lat": 47.823807,
		"lng": -96.974327
	},
	{
		"lat": 47.824029,
		"lng": -96.974506
	},
	{
		"lat": 47.824149,
		"lng": -96.974623
	},
	{
		"lat": 47.824246,
		"lng": -96.974696
	},
	{
		"lat": 47.824304,
		"lng": -96.974758
	},
	{
		"lat": 47.824367,
		"lng": -96.974812
	},
	{
		"lat": 47.824394,
		"lng": -96.974846
	},
	{
		"lat": 47.824517,
		"lng": -96.974958
	},
	{
		"lat": 47.824546,
		"lng": -96.97499
	},
	{
		"lat": 47.824726,
		"lng": -96.975252
	},
	{
		"lat": 47.8248,
		"lng": -96.975367
	},
	{
		"lat": 47.824942,
		"lng": -96.975607
	},
	{
		"lat": 47.825,
		"lng": -96.975742
	},
	{
		"lat": 47.825031,
		"lng": -96.975837
	},
	{
		"lat": 47.825068,
		"lng": -96.975928
	},
	{
		"lat": 47.825128,
		"lng": -96.97612
	},
	{
		"lat": 47.825164,
		"lng": -96.97627
	},
	{
		"lat": 47.825197,
		"lng": -96.976364
	},
	{
		"lat": 47.825208,
		"lng": -96.976414
	},
	{
		"lat": 47.82526,
		"lng": -96.976584
	},
	{
		"lat": 47.825267,
		"lng": -96.976607
	},
	{
		"lat": 47.825279,
		"lng": -96.976657
	},
	{
		"lat": 47.825296,
		"lng": -96.97676
	},
	{
		"lat": 47.825364,
		"lng": -96.977062
	},
	{
		"lat": 47.825401,
		"lng": -96.977266
	},
	{
		"lat": 47.825441,
		"lng": -96.977524
	},
	{
		"lat": 47.825484,
		"lng": -96.977726
	},
	{
		"lat": 47.825493,
		"lng": -96.977831
	},
	{
		"lat": 47.825547,
		"lng": -96.978247
	},
	{
		"lat": 47.825561,
		"lng": -96.978404
	},
	{
		"lat": 47.82561,
		"lng": -96.978768
	},
	{
		"lat": 47.825675,
		"lng": -96.97961
	},
	{
		"lat": 47.825707,
		"lng": -96.980242
	},
	{
		"lat": 47.825711,
		"lng": -96.980454
	},
	{
		"lat": 47.825695,
		"lng": -96.980983
	},
	{
		"lat": 47.825662,
		"lng": -96.981456
	},
	{
		"lat": 47.82565,
		"lng": -96.98172
	},
	{
		"lat": 47.825638,
		"lng": -96.981878
	},
	{
		"lat": 47.825593,
		"lng": -96.982189
	},
	{
		"lat": 47.825556,
		"lng": -96.982393
	},
	{
		"lat": 47.82553,
		"lng": -96.982601
	},
	{
		"lat": 47.825513,
		"lng": -96.982704
	},
	{
		"lat": 47.825383,
		"lng": -96.983365
	},
	{
		"lat": 47.825313,
		"lng": -96.98383
	},
	{
		"lat": 47.825265,
		"lng": -96.984247
	},
	{
		"lat": 47.825189,
		"lng": -96.985193
	},
	{
		"lat": 47.825192,
		"lng": -96.985775
	},
	{
		"lat": 47.82521,
		"lng": -96.986145
	},
	{
		"lat": 47.82528,
		"lng": -96.98661
	},
	{
		"lat": 47.825301,
		"lng": -96.986711
	},
	{
		"lat": 47.825317,
		"lng": -96.986758
	},
	{
		"lat": 47.82555,
		"lng": -96.987105
	},
	{
		"lat": 47.825579,
		"lng": -96.987137
	},
	{
		"lat": 47.825675,
		"lng": -96.987212
	},
	{
		"lat": 47.825745,
		"lng": -96.987238
	},
	{
		"lat": 47.825816,
		"lng": -96.987254
	},
	{
		"lat": 47.825924,
		"lng": -96.987269
	},
	{
		"lat": 47.826033,
		"lng": -96.987263
	},
	{
		"lat": 47.826104,
		"lng": -96.98725
	},
	{
		"lat": 47.826139,
		"lng": -96.987236
	},
	{
		"lat": 47.826264,
		"lng": -96.987129
	},
	{
		"lat": 47.82635,
		"lng": -96.987032
	},
	{
		"lat": 47.826453,
		"lng": -96.986883
	},
	{
		"lat": 47.826568,
		"lng": -96.986679
	},
	{
		"lat": 47.826693,
		"lng": -96.98642
	},
	{
		"lat": 47.826859,
		"lng": -96.986009
	},
	{
		"lat": 47.826996,
		"lng": -96.985637
	},
	{
		"lat": 47.827042,
		"lng": -96.985493
	},
	{
		"lat": 47.827084,
		"lng": -96.985384
	},
	{
		"lat": 47.827096,
		"lng": -96.985356
	},
	{
		"lat": 47.827128,
		"lng": -96.985261
	},
	{
		"lat": 47.827165,
		"lng": -96.98517
	},
	{
		"lat": 47.827215,
		"lng": -96.985029
	},
	{
		"lat": 47.827255,
		"lng": -96.98494
	},
	{
		"lat": 47.82727,
		"lng": -96.984892
	},
	{
		"lat": 47.827325,
		"lng": -96.984755
	},
	{
		"lat": 47.827385,
		"lng": -96.984623
	},
	{
		"lat": 47.827496,
		"lng": -96.984351
	},
	{
		"lat": 47.827599,
		"lng": -96.984071
	},
	{
		"lat": 47.827689,
		"lng": -96.983842
	},
	{
		"lat": 47.827746,
		"lng": -96.983648
	},
	{
		"lat": 47.827787,
		"lng": -96.983561
	},
	{
		"lat": 47.827839,
		"lng": -96.983421
	},
	{
		"lat": 47.827986,
		"lng": -96.98312
	},
	{
		"lat": 47.828058,
		"lng": -96.983
	},
	{
		"lat": 47.828101,
		"lng": -96.982915
	},
	{
		"lat": 47.828391,
		"lng": -96.982442
	},
	{
		"lat": 47.828581,
		"lng": -96.982196
	},
	{
		"lat": 47.828724,
		"lng": -96.982034
	},
	{
		"lat": 47.828754,
		"lng": -96.982006
	},
	{
		"lat": 47.828915,
		"lng": -96.981884
	},
	{
		"lat": 47.828977,
		"lng": -96.98183
	},
	{
		"lat": 47.829141,
		"lng": -96.981718
	},
	{
		"lat": 47.829312,
		"lng": -96.981634
	},
	{
		"lat": 47.829486,
		"lng": -96.981558
	},
	{
		"lat": 47.829558,
		"lng": -96.98155
	},
	{
		"lat": 47.829738,
		"lng": -96.98155
	},
	{
		"lat": 47.829883,
		"lng": -96.981558
	},
	{
		"lat": 47.829991,
		"lng": -96.981573
	},
	{
		"lat": 47.830274,
		"lng": -96.981655
	},
	{
		"lat": 47.830477,
		"lng": -96.981766
	},
	{
		"lat": 47.830641,
		"lng": -96.981878
	},
	{
		"lat": 47.83073,
		"lng": -96.98197
	},
	{
		"lat": 47.830883,
		"lng": -96.982111
	},
	{
		"lat": 47.830917,
		"lng": -96.982131
	},
	{
		"lat": 47.830947,
		"lng": -96.98216
	},
	{
		"lat": 47.831061,
		"lng": -96.982291
	},
	{
		"lat": 47.831153,
		"lng": -96.982375
	},
	{
		"lat": 47.831186,
		"lng": -96.982396
	},
	{
		"lat": 47.831273,
		"lng": -96.98249
	},
	{
		"lat": 47.831412,
		"lng": -96.98266
	},
	{
		"lat": 47.831611,
		"lng": -96.98289
	},
	{
		"lat": 47.831742,
		"lng": -96.983072
	},
	{
		"lat": 47.831844,
		"lng": -96.983223
	},
	{
		"lat": 47.83224,
		"lng": -96.98384
	},
	{
		"lat": 47.832287,
		"lng": -96.983906
	},
	{
		"lat": 47.832528,
		"lng": -96.984242
	},
	{
		"lat": 47.832666,
		"lng": -96.984413
	},
	{
		"lat": 47.832725,
		"lng": -96.984474
	},
	{
		"lat": 47.832806,
		"lng": -96.984581
	},
	{
		"lat": 47.832982,
		"lng": -96.984764
	},
	{
		"lat": 47.833138,
		"lng": -96.9849
	},
	{
		"lat": 47.833271,
		"lng": -96.984983
	},
	{
		"lat": 47.8333,
		"lng": -96.985013
	},
	{
		"lat": 47.833333,
		"lng": -96.985037
	},
	{
		"lat": 47.833435,
		"lng": -96.985089
	},
	{
		"lat": 47.833535,
		"lng": -96.98515
	},
	{
		"lat": 47.833567,
		"lng": -96.985176
	},
	{
		"lat": 47.833691,
		"lng": -96.985239
	},
	{
		"lat": 47.833967,
		"lng": -96.985364
	},
	{
		"lat": 47.834144,
		"lng": -96.985418
	},
	{
		"lat": 47.834678,
		"lng": -96.985562
	},
	{
		"lat": 47.834892,
		"lng": -96.985608
	},
	{
		"lat": 47.835073,
		"lng": -96.985628
	},
	{
		"lat": 47.835468,
		"lng": -96.985684
	},
	{
		"lat": 47.835684,
		"lng": -96.985709
	},
	{
		"lat": 47.835756,
		"lng": -96.985722
	},
	{
		"lat": 47.835827,
		"lng": -96.985743
	},
	{
		"lat": 47.835899,
		"lng": -96.985757
	},
	{
		"lat": 47.836005,
		"lng": -96.985792
	},
	{
		"lat": 47.836144,
		"lng": -96.98585
	},
	{
		"lat": 47.836389,
		"lng": -96.985942
	},
	{
		"lat": 47.83691,
		"lng": -96.986163
	},
	{
		"lat": 47.83708,
		"lng": -96.986254
	},
	{
		"lat": 47.837113,
		"lng": -96.986276
	},
	{
		"lat": 47.837175,
		"lng": -96.986331
	},
	{
		"lat": 47.837305,
		"lng": -96.986423
	},
	{
		"lat": 47.83739,
		"lng": -96.986523
	},
	{
		"lat": 47.83748,
		"lng": -96.986611
	},
	{
		"lat": 47.837543,
		"lng": -96.986663
	},
	{
		"lat": 47.8376,
		"lng": -96.986729
	},
	{
		"lat": 47.837679,
		"lng": -96.986838
	},
	{
		"lat": 47.837754,
		"lng": -96.986953
	},
	{
		"lat": 47.837871,
		"lng": -96.987155
	},
	{
		"lat": 47.837947,
		"lng": -96.987335
	},
	{
		"lat": 47.837997,
		"lng": -96.987476
	},
	{
		"lat": 47.838046,
		"lng": -96.987675
	},
	{
		"lat": 47.838079,
		"lng": -96.987881
	},
	{
		"lat": 47.838102,
		"lng": -96.98809
	},
	{
		"lat": 47.838105,
		"lng": -96.989043
	},
	{
		"lat": 47.838098,
		"lng": -96.989255
	},
	{
		"lat": 47.838073,
		"lng": -96.98957
	},
	{
		"lat": 47.838046,
		"lng": -96.989832
	},
	{
		"lat": 47.838019,
		"lng": -96.989986
	},
	{
		"lat": 47.838003,
		"lng": -96.990034
	},
	{
		"lat": 47.83798,
		"lng": -96.990134
	},
	{
		"lat": 47.837912,
		"lng": -96.990492
	},
	{
		"lat": 47.837868,
		"lng": -96.990749
	},
	{
		"lat": 47.837812,
		"lng": -96.99111
	},
	{
		"lat": 47.837776,
		"lng": -96.991369
	},
	{
		"lat": 47.837749,
		"lng": -96.991897
	},
	{
		"lat": 47.837747,
		"lng": -96.992003
	},
	{
		"lat": 47.837761,
		"lng": -96.992266
	},
	{
		"lat": 47.837779,
		"lng": -96.992501
	},
	{
		"lat": 47.837786,
		"lng": -96.992581
	},
	{
		"lat": 47.837793,
		"lng": -96.992633
	},
	{
		"lat": 47.837882,
		"lng": -96.993035
	},
	{
		"lat": 47.837914,
		"lng": -96.993129
	},
	{
		"lat": 47.838051,
		"lng": -96.993441
	},
	{
		"lat": 47.838119,
		"lng": -96.993565
	},
	{
		"lat": 47.838299,
		"lng": -96.993826
	},
	{
		"lat": 47.838408,
		"lng": -96.993965
	},
	{
		"lat": 47.8385,
		"lng": -96.994049
	},
	{
		"lat": 47.8386,
		"lng": -96.994109
	},
	{
		"lat": 47.838739,
		"lng": -96.994172
	},
	{
		"lat": 47.838844,
		"lng": -96.994207
	},
	{
		"lat": 47.838988,
		"lng": -96.994231
	},
	{
		"lat": 47.839061,
		"lng": -96.994231
	},
	{
		"lat": 47.839205,
		"lng": -96.994216
	},
	{
		"lat": 47.839312,
		"lng": -96.994187
	},
	{
		"lat": 47.83945,
		"lng": -96.994124
	},
	{
		"lat": 47.839585,
		"lng": -96.994047
	},
	{
		"lat": 47.839749,
		"lng": -96.993936
	},
	{
		"lat": 47.839876,
		"lng": -96.993834
	},
	{
		"lat": 47.83991,
		"lng": -96.993816
	},
	{
		"lat": 47.840135,
		"lng": -96.993647
	},
	{
		"lat": 47.840234,
		"lng": -96.99358
	},
	{
		"lat": 47.840305,
		"lng": -96.993508
	},
	{
		"lat": 47.840431,
		"lng": -96.993405
	},
	{
		"lat": 47.840497,
		"lng": -96.993361
	},
	{
		"lat": 47.840982,
		"lng": -96.993008
	},
	{
		"lat": 47.841083,
		"lng": -96.992949
	},
	{
		"lat": 47.841377,
		"lng": -96.992746
	},
	{
		"lat": 47.841478,
		"lng": -96.992684
	},
	{
		"lat": 47.841636,
		"lng": -96.992557
	},
	{
		"lat": 47.841939,
		"lng": -96.992384
	},
	{
		"lat": 47.842046,
		"lng": -96.992357
	},
	{
		"lat": 47.842155,
		"lng": -96.992348
	},
	{
		"lat": 47.842444,
		"lng": -96.992368
	},
	{
		"lat": 47.842515,
		"lng": -96.992391
	},
	{
		"lat": 47.842548,
		"lng": -96.992411
	},
	{
		"lat": 47.842643,
		"lng": -96.992488
	},
	{
		"lat": 47.84272,
		"lng": -96.9926
	},
	{
		"lat": 47.842791,
		"lng": -96.992721
	},
	{
		"lat": 47.842825,
		"lng": -96.992814
	},
	{
		"lat": 47.842843,
		"lng": -96.992917
	},
	{
		"lat": 47.842849,
		"lng": -96.993001
	},
	{
		"lat": 47.84286,
		"lng": -96.993127
	},
	{
		"lat": 47.84285,
		"lng": -96.993232
	},
	{
		"lat": 47.842828,
		"lng": -96.993388
	},
	{
		"lat": 47.842772,
		"lng": -96.993639
	},
	{
		"lat": 47.842733,
		"lng": -96.993788
	},
	{
		"lat": 47.842681,
		"lng": -96.993927
	},
	{
		"lat": 47.842602,
		"lng": -96.994104
	},
	{
		"lat": 47.842585,
		"lng": -96.994151
	},
	{
		"lat": 47.842574,
		"lng": -96.994201
	},
	{
		"lat": 47.842558,
		"lng": -96.994249
	},
	{
		"lat": 47.842496,
		"lng": -96.99438
	},
	{
		"lat": 47.842453,
		"lng": -96.994525
	},
	{
		"lat": 47.84238,
		"lng": -96.994708
	},
	{
		"lat": 47.84228,
		"lng": -96.994928
	},
	{
		"lat": 47.842248,
		"lng": -96.995023
	},
	{
		"lat": 47.842207,
		"lng": -96.99511
	},
	{
		"lat": 47.842175,
		"lng": -96.995206
	},
	{
		"lat": 47.842154,
		"lng": -96.995249
	},
	{
		"lat": 47.842105,
		"lng": -96.99539
	},
	{
		"lat": 47.842068,
		"lng": -96.995481
	},
	{
		"lat": 47.842036,
		"lng": -96.995576
	},
	{
		"lat": 47.841995,
		"lng": -96.995663
	},
	{
		"lat": 47.841945,
		"lng": -96.995804
	},
	{
		"lat": 47.841819,
		"lng": -96.996125
	},
	{
		"lat": 47.841779,
		"lng": -96.996213
	},
	{
		"lat": 47.841699,
		"lng": -96.996451
	},
	{
		"lat": 47.841662,
		"lng": -96.9966
	},
	{
		"lat": 47.841579,
		"lng": -96.997005
	},
	{
		"lat": 47.841542,
		"lng": -96.997319
	},
	{
		"lat": 47.841534,
		"lng": -96.997636
	},
	{
		"lat": 47.841537,
		"lng": -96.997689
	},
	{
		"lat": 47.84155,
		"lng": -96.997793
	},
	{
		"lat": 47.841578,
		"lng": -96.99789
	},
	{
		"lat": 47.841756,
		"lng": -96.998155
	},
	{
		"lat": 47.841838,
		"lng": -96.998259
	},
	{
		"lat": 47.841932,
		"lng": -96.998337
	},
	{
		"lat": 47.841967,
		"lng": -96.998353
	},
	{
		"lat": 47.842003,
		"lng": -96.998359
	},
	{
		"lat": 47.842256,
		"lng": -96.998368
	},
	{
		"lat": 47.842365,
		"lng": -96.99836
	},
	{
		"lat": 47.842471,
		"lng": -96.998328
	},
	{
		"lat": 47.842543,
		"lng": -96.998312
	},
	{
		"lat": 47.842646,
		"lng": -96.998265
	},
	{
		"lat": 47.842711,
		"lng": -96.998217
	},
	{
		"lat": 47.842881,
		"lng": -96.998127
	},
	{
		"lat": 47.843015,
		"lng": -96.998045
	},
	{
		"lat": 47.843109,
		"lng": -96.997965
	},
	{
		"lat": 47.8432,
		"lng": -96.997879
	},
	{
		"lat": 47.843294,
		"lng": -96.9978
	},
	{
		"lat": 47.843485,
		"lng": -96.997651
	},
	{
		"lat": 47.843577,
		"lng": -96.997565
	},
	{
		"lat": 47.843768,
		"lng": -96.997414
	},
	{
		"lat": 47.843979,
		"lng": -96.99721
	},
	{
		"lat": 47.84426,
		"lng": -96.996797
	},
	{
		"lat": 47.844331,
		"lng": -96.996677
	},
	{
		"lat": 47.844374,
		"lng": -96.996591
	},
	{
		"lat": 47.844483,
		"lng": -96.99632
	},
	{
		"lat": 47.844485,
		"lng": -96.996318
	},
	{
		"lat": 47.844552,
		"lng": -96.99613
	},
	{
		"lat": 47.844594,
		"lng": -96.995984
	},
	{
		"lat": 47.844658,
		"lng": -96.995737
	},
	{
		"lat": 47.844756,
		"lng": -96.995395
	},
	{
		"lat": 47.844789,
		"lng": -96.995302
	},
	{
		"lat": 47.844845,
		"lng": -96.995114
	},
	{
		"lat": 47.844963,
		"lng": -96.994848
	},
	{
		"lat": 47.845114,
		"lng": -96.994486
	},
	{
		"lat": 47.84516,
		"lng": -96.994406
	},
	{
		"lat": 47.84532,
		"lng": -96.994189
	},
	{
		"lat": 47.845379,
		"lng": -96.994128
	},
	{
		"lat": 47.84551,
		"lng": -96.994041
	},
	{
		"lat": 47.84565,
		"lng": -96.993983
	},
	{
		"lat": 47.845721,
		"lng": -96.993962
	},
	{
		"lat": 47.845865,
		"lng": -96.993963
	},
	{
		"lat": 47.845974,
		"lng": -96.993974
	},
	{
		"lat": 47.846,
		"lng": -96.993983
	},
	{
		"lat": 47.846043,
		"lng": -96.993998
	},
	{
		"lat": 47.846178,
		"lng": -96.994074
	},
	{
		"lat": 47.846275,
		"lng": -96.994147
	},
	{
		"lat": 47.846373,
		"lng": -96.994213
	},
	{
		"lat": 47.846435,
		"lng": -96.994268
	},
	{
		"lat": 47.846501,
		"lng": -96.994314
	},
	{
		"lat": 47.846708,
		"lng": -96.994525
	},
	{
		"lat": 47.846867,
		"lng": -96.994743
	},
	{
		"lat": 47.846994,
		"lng": -96.994931
	},
	{
		"lat": 47.84719,
		"lng": -96.995243
	},
	{
		"lat": 47.8474,
		"lng": -96.995608
	},
	{
		"lat": 47.847435,
		"lng": -96.995701
	},
	{
		"lat": 47.847522,
		"lng": -96.995871
	},
	{
		"lat": 47.84758,
		"lng": -96.996004
	},
	{
		"lat": 47.847667,
		"lng": -96.996174
	},
	{
		"lat": 47.847847,
		"lng": -96.996506
	},
	{
		"lat": 47.848011,
		"lng": -96.996792
	},
	{
		"lat": 47.848161,
		"lng": -96.997003
	},
	{
		"lat": 47.84817,
		"lng": -96.997016
	},
	{
		"lat": 47.84822,
		"lng": -96.997085
	},
	{
		"lat": 47.848275,
		"lng": -96.997154
	},
	{
		"lat": 47.848367,
		"lng": -96.997238
	},
	{
		"lat": 47.848468,
		"lng": -96.997298
	},
	{
		"lat": 47.848712,
		"lng": -96.997396
	},
	{
		"lat": 47.848817,
		"lng": -96.997433
	},
	{
		"lat": 47.848853,
		"lng": -96.997439
	},
	{
		"lat": 47.848924,
		"lng": -96.997461
	},
	{
		"lat": 47.849139,
		"lng": -96.997505
	},
	{
		"lat": 47.849392,
		"lng": -96.997535
	},
	{
		"lat": 47.8495,
		"lng": -96.997538
	},
	{
		"lat": 47.849753,
		"lng": -96.997518
	},
	{
		"lat": 47.849969,
		"lng": -96.997483
	},
	{
		"lat": 47.85022,
		"lng": -96.997433
	},
	{
		"lat": 47.85036,
		"lng": -96.997381
	},
	{
		"lat": 47.850503,
		"lng": -96.997346
	},
	{
		"lat": 47.850608,
		"lng": -96.997308
	},
	{
		"lat": 47.850883,
		"lng": -96.997174
	},
	{
		"lat": 47.851023,
		"lng": -96.997121
	},
	{
		"lat": 47.851166,
		"lng": -96.997086
	},
	{
		"lat": 47.851236,
		"lng": -96.997062
	},
	{
		"lat": 47.851593,
		"lng": -96.996975
	},
	{
		"lat": 47.851735,
		"lng": -96.996933
	},
	{
		"lat": 47.851807,
		"lng": -96.996919
	},
	{
		"lat": 47.851983,
		"lng": -96.996857
	},
	{
		"lat": 47.852306,
		"lng": -96.996799
	},
	{
		"lat": 47.852559,
		"lng": -96.996773
	},
	{
		"lat": 47.852848,
		"lng": -96.996755
	},
	{
		"lat": 47.853078,
		"lng": -96.996747
	},
	{
		"lat": 47.853282,
		"lng": -96.996739
	},
	{
		"lat": 47.853536,
		"lng": -96.996743
	},
	{
		"lat": 47.854078,
		"lng": -96.996772
	},
	{
		"lat": 47.854331,
		"lng": -96.996798
	},
	{
		"lat": 47.854764,
		"lng": -96.996852
	},
	{
		"lat": 47.855196,
		"lng": -96.996923
	},
	{
		"lat": 47.856125,
		"lng": -96.99713
	},
	{
		"lat": 47.856377,
		"lng": -96.997169
	},
	{
		"lat": 47.856444,
		"lng": -96.997185
	},
	{
		"lat": 47.856555,
		"lng": -96.997211
	},
	{
		"lat": 47.856626,
		"lng": -96.997236
	},
	{
		"lat": 47.856946,
		"lng": -96.997324
	},
	{
		"lat": 47.857087,
		"lng": -96.997372
	},
	{
		"lat": 47.857265,
		"lng": -96.997422
	},
	{
		"lat": 47.857548,
		"lng": -96.997514
	},
	{
		"lat": 47.857713,
		"lng": -96.997583
	},
	{
		"lat": 47.857791,
		"lng": -96.997616
	},
	{
		"lat": 47.858168,
		"lng": -96.997802
	},
	{
		"lat": 47.858412,
		"lng": -96.997902
	},
	{
		"lat": 47.858618,
		"lng": -96.998
	},
	{
		"lat": 47.858857,
		"lng": -96.998125
	},
	{
		"lat": 47.859191,
		"lng": -96.998328
	},
	{
		"lat": 47.859221,
		"lng": -96.998356
	},
	{
		"lat": 47.859289,
		"lng": -96.998393
	},
	{
		"lat": 47.859326,
		"lng": -96.998425
	},
	{
		"lat": 47.859359,
		"lng": -96.998445
	},
	{
		"lat": 47.859488,
		"lng": -96.998542
	},
	{
		"lat": 47.859549,
		"lng": -96.9986
	},
	{
		"lat": 47.859614,
		"lng": -96.998644
	},
	{
		"lat": 47.859837,
		"lng": -96.99882
	},
	{
		"lat": 47.859927,
		"lng": -96.998908
	},
	{
		"lat": 47.860014,
		"lng": -96.999003
	},
	{
		"lat": 47.860134,
		"lng": -96.999121
	},
	{
		"lat": 47.860201,
		"lng": -96.999201
	},
	{
		"lat": 47.860358,
		"lng": -96.999389
	},
	{
		"lat": 47.860419,
		"lng": -96.999447
	},
	{
		"lat": 47.860557,
		"lng": -96.999619
	},
	{
		"lat": 47.860795,
		"lng": -96.999943
	},
	{
		"lat": 47.860897,
		"lng": -97.000093
	},
	{
		"lat": 47.860978,
		"lng": -97.0002
	},
	{
		"lat": 47.861006,
		"lng": -97.000243
	},
	{
		"lat": 47.861179,
		"lng": -97.000505
	},
	{
		"lat": 47.861394,
		"lng": -97.000862
	},
	{
		"lat": 47.861637,
		"lng": -97.001324
	},
	{
		"lat": 47.861642,
		"lng": -97.001333
	},
	{
		"lat": 47.861683,
		"lng": -97.001421
	},
	{
		"lat": 47.86172,
		"lng": -97.001497
	},
	{
		"lat": 47.861778,
		"lng": -97.001631
	},
	{
		"lat": 47.861911,
		"lng": -97.001883
	},
	{
		"lat": 47.861983,
		"lng": -97.002066
	},
	{
		"lat": 47.862369,
		"lng": -97.002835
	},
	{
		"lat": 47.862384,
		"lng": -97.002862
	},
	{
		"lat": 47.862571,
		"lng": -97.003209
	},
	{
		"lat": 47.862892,
		"lng": -97.003851
	},
	{
		"lat": 47.863028,
		"lng": -97.004098
	},
	{
		"lat": 47.863357,
		"lng": -97.004662
	},
	{
		"lat": 47.86387,
		"lng": -97.005409
	},
	{
		"lat": 47.863979,
		"lng": -97.005549
	},
	{
		"lat": 47.864096,
		"lng": -97.005672
	},
	{
		"lat": 47.864253,
		"lng": -97.005805
	},
	{
		"lat": 47.864321,
		"lng": -97.005841
	},
	{
		"lat": 47.864496,
		"lng": -97.005907
	},
	{
		"lat": 47.864532,
		"lng": -97.005916
	},
	{
		"lat": 47.864641,
		"lng": -97.005921
	},
	{
		"lat": 47.864785,
		"lng": -97.005907
	},
	{
		"lat": 47.864857,
		"lng": -97.00589
	},
	{
		"lat": 47.864962,
		"lng": -97.005854
	},
	{
		"lat": 47.865029,
		"lng": -97.005813
	},
	{
		"lat": 47.86509,
		"lng": -97.005755
	},
	{
		"lat": 47.865174,
		"lng": -97.005655
	},
	{
		"lat": 47.865252,
		"lng": -97.005544
	},
	{
		"lat": 47.865298,
		"lng": -97.005462
	},
	{
		"lat": 47.865316,
		"lng": -97.00542
	},
	{
		"lat": 47.865376,
		"lng": -97.005283
	},
	{
		"lat": 47.865411,
		"lng": -97.00519
	},
	{
		"lat": 47.86551,
		"lng": -97.004849
	},
	{
		"lat": 47.865538,
		"lng": -97.004695
	},
	{
		"lat": 47.865597,
		"lng": -97.004012
	},
	{
		"lat": 47.86562,
		"lng": -97.003856
	},
	{
		"lat": 47.865638,
		"lng": -97.003646
	},
	{
		"lat": 47.865662,
		"lng": -97.003491
	},
	{
		"lat": 47.865709,
		"lng": -97.003285
	},
	{
		"lat": 47.86572,
		"lng": -97.00324
	},
	{
		"lat": 47.865734,
		"lng": -97.003192
	},
	{
		"lat": 47.865818,
		"lng": -97.002957
	},
	{
		"lat": 47.865877,
		"lng": -97.002823
	},
	{
		"lat": 47.865969,
		"lng": -97.002595
	},
	{
		"lat": 47.866035,
		"lng": -97.002469
	},
	{
		"lat": 47.866107,
		"lng": -97.00235
	},
	{
		"lat": 47.866208,
		"lng": -97.002199
	},
	{
		"lat": 47.866279,
		"lng": -97.002117
	},
	{
		"lat": 47.86631,
		"lng": -97.002089
	},
	{
		"lat": 47.866508,
		"lng": -97.001858
	},
	{
		"lat": 47.866562,
		"lng": -97.0018
	},
	{
		"lat": 47.866713,
		"lng": -97.00164
	},
	{
		"lat": 47.866869,
		"lng": -97.001505
	},
	{
		"lat": 47.866902,
		"lng": -97.001484
	},
	{
		"lat": 47.866972,
		"lng": -97.001454
	},
	{
		"lat": 47.867007,
		"lng": -97.001443
	},
	{
		"lat": 47.867043,
		"lng": -97.001432
	},
	{
		"lat": 47.86715,
		"lng": -97.001406
	},
	{
		"lat": 47.8673,
		"lng": -97.001398
	},
	{
		"lat": 47.867367,
		"lng": -97.001393
	},
	{
		"lat": 47.867475,
		"lng": -97.001404
	},
	{
		"lat": 47.867511,
		"lng": -97.001416
	},
	{
		"lat": 47.867718,
		"lng": -97.001511
	},
	{
		"lat": 47.867816,
		"lng": -97.00158
	},
	{
		"lat": 47.867883,
		"lng": -97.001618
	},
	{
		"lat": 47.867948,
		"lng": -97.001666
	},
	{
		"lat": 47.868071,
		"lng": -97.001776
	},
	{
		"lat": 47.868104,
		"lng": -97.001799
	},
	{
		"lat": 47.868134,
		"lng": -97.001828
	},
	{
		"lat": 47.868218,
		"lng": -97.001928
	},
	{
		"lat": 47.868335,
		"lng": -97.002053
	},
	{
		"lat": 47.868552,
		"lng": -97.002334
	},
	{
		"lat": 47.869005,
		"lng": -97.002863
	},
	{
		"lat": 47.869058,
		"lng": -97.002934
	},
	{
		"lat": 47.86921,
		"lng": -97.003161
	},
	{
		"lat": 47.869454,
		"lng": -97.003554
	},
	{
		"lat": 47.869548,
		"lng": -97.003715
	},
	{
		"lat": 47.869654,
		"lng": -97.003929
	},
	{
		"lat": 47.86969,
		"lng": -97.004021
	},
	{
		"lat": 47.869854,
		"lng": -97.00437
	},
	{
		"lat": 47.869889,
		"lng": -97.004463
	},
	{
		"lat": 47.86993,
		"lng": -97.00455
	},
	{
		"lat": 47.870072,
		"lng": -97.00492
	},
	{
		"lat": 47.870183,
		"lng": -97.005253
	},
	{
		"lat": 47.870221,
		"lng": -97.005402
	},
	{
		"lat": 47.87024,
		"lng": -97.005447
	},
	{
		"lat": 47.870341,
		"lng": -97.005845
	},
	{
		"lat": 47.870371,
		"lng": -97.005941
	},
	{
		"lat": 47.870394,
		"lng": -97.006042
	},
	{
		"lat": 47.870452,
		"lng": -97.006236
	},
	{
		"lat": 47.870477,
		"lng": -97.006335
	},
	{
		"lat": 47.870517,
		"lng": -97.006538
	},
	{
		"lat": 47.870534,
		"lng": -97.006695
	},
	{
		"lat": 47.870562,
		"lng": -97.006849
	},
	{
		"lat": 47.870616,
		"lng": -97.007046
	},
	{
		"lat": 47.870653,
		"lng": -97.007251
	},
	{
		"lat": 47.870697,
		"lng": -97.007395
	},
	{
		"lat": 47.870717,
		"lng": -97.007497
	},
	{
		"lat": 47.870731,
		"lng": -97.007601
	},
	{
		"lat": 47.870742,
		"lng": -97.007652
	},
	{
		"lat": 47.870809,
		"lng": -97.007897
	},
	{
		"lat": 47.870818,
		"lng": -97.007949
	},
	{
		"lat": 47.870842,
		"lng": -97.008158
	},
	{
		"lat": 47.87086,
		"lng": -97.008357
	},
	{
		"lat": 47.870865,
		"lng": -97.008413
	},
	{
		"lat": 47.870884,
		"lng": -97.008632
	},
	{
		"lat": 47.870917,
		"lng": -97.008838
	},
	{
		"lat": 47.870929,
		"lng": -97.008888
	},
	{
		"lat": 47.870956,
		"lng": -97.009042
	},
	{
		"lat": 47.870999,
		"lng": -97.009244
	},
	{
		"lat": 47.871064,
		"lng": -97.009603
	},
	{
		"lat": 47.871076,
		"lng": -97.009653
	},
	{
		"lat": 47.871148,
		"lng": -97.010118
	},
	{
		"lat": 47.87117,
		"lng": -97.010328
	},
	{
		"lat": 47.871186,
		"lng": -97.010592
	},
	{
		"lat": 47.871197,
		"lng": -97.010682
	},
	{
		"lat": 47.871202,
		"lng": -97.010788
	},
	{
		"lat": 47.871205,
		"lng": -97.011
	},
	{
		"lat": 47.871223,
		"lng": -97.011423
	},
	{
		"lat": 47.871226,
		"lng": -97.011582
	},
	{
		"lat": 47.871196,
		"lng": -97.012641
	},
	{
		"lat": 47.87117,
		"lng": -97.013223
	},
	{
		"lat": 47.871162,
		"lng": -97.013488
	},
	{
		"lat": 47.871172,
		"lng": -97.01407
	},
	{
		"lat": 47.871222,
		"lng": -97.015181
	},
	{
		"lat": 47.871237,
		"lng": -97.015445
	},
	{
		"lat": 47.871251,
		"lng": -97.015549
	},
	{
		"lat": 47.871288,
		"lng": -97.015987
	},
	{
		"lat": 47.871296,
		"lng": -97.016076
	},
	{
		"lat": 47.871346,
		"lng": -97.016547
	},
	{
		"lat": 47.871371,
		"lng": -97.016647
	},
	{
		"lat": 47.871377,
		"lng": -97.016684
	},
	{
		"lat": 47.871389,
		"lng": -97.016749
	},
	{
		"lat": 47.871403,
		"lng": -97.016798
	},
	{
		"lat": 47.871461,
		"lng": -97.01716
	},
	{
		"lat": 47.871504,
		"lng": -97.017361
	},
	{
		"lat": 47.871532,
		"lng": -97.017538
	},
	{
		"lat": 47.871553,
		"lng": -97.017672
	},
	{
		"lat": 47.871689,
		"lng": -97.018276
	},
	{
		"lat": 47.871693,
		"lng": -97.018292
	},
	{
		"lat": 47.871765,
		"lng": -97.018573
	},
	{
		"lat": 47.871781,
		"lng": -97.018655
	},
	{
		"lat": 47.871796,
		"lng": -97.018703
	},
	{
		"lat": 47.871843,
		"lng": -97.018904
	},
	{
		"lat": 47.871882,
		"lng": -97.019052
	},
	{
		"lat": 47.871913,
		"lng": -97.019148
	},
	{
		"lat": 47.872006,
		"lng": -97.019493
	},
	{
		"lat": 47.872157,
		"lng": -97.019974
	},
	{
		"lat": 47.872206,
		"lng": -97.020116
	},
	{
		"lat": 47.872242,
		"lng": -97.020208
	},
	{
		"lat": 47.872319,
		"lng": -97.020447
	},
	{
		"lat": 47.872343,
		"lng": -97.020511
	},
	{
		"lat": 47.872372,
		"lng": -97.020585
	},
	{
		"lat": 47.872447,
		"lng": -97.020827
	},
	{
		"lat": 47.872526,
		"lng": -97.021065
	},
	{
		"lat": 47.872566,
		"lng": -97.021152
	},
	{
		"lat": 47.8726,
		"lng": -97.021238
	},
	{
		"lat": 47.872656,
		"lng": -97.021374
	},
	{
		"lat": 47.87266,
		"lng": -97.021383
	},
	{
		"lat": 47.872699,
		"lng": -97.02146
	},
	{
		"lat": 47.87279,
		"lng": -97.021625
	},
	{
		"lat": 47.87289,
		"lng": -97.021798
	},
	{
		"lat": 47.87297,
		"lng": -97.021935
	},
	{
		"lat": 47.873001,
		"lng": -97.021988
	},
	{
		"lat": 47.87311,
		"lng": -97.02215
	},
	{
		"lat": 47.873153,
		"lng": -97.022214
	},
	{
		"lat": 47.873388,
		"lng": -97.022545
	},
	{
		"lat": 47.873446,
		"lng": -97.022608
	},
	{
		"lat": 47.873527,
		"lng": -97.022713
	},
	{
		"lat": 47.873588,
		"lng": -97.022771
	},
	{
		"lat": 47.873702,
		"lng": -97.0229
	},
	{
		"lat": 47.873827,
		"lng": -97.023007
	},
	{
		"lat": 47.873894,
		"lng": -97.023049
	},
	{
		"lat": 47.873964,
		"lng": -97.023078
	},
	{
		"lat": 47.874009,
		"lng": -97.023107
	},
	{
		"lat": 47.874063,
		"lng": -97.023142
	},
	{
		"lat": 47.874239,
		"lng": -97.023205
	},
	{
		"lat": 47.874348,
		"lng": -97.023215
	},
	{
		"lat": 47.87478,
		"lng": -97.023275
	},
	{
		"lat": 47.874816,
		"lng": -97.023267
	},
	{
		"lat": 47.87485,
		"lng": -97.023248
	},
	{
		"lat": 47.874911,
		"lng": -97.023191
	},
	{
		"lat": 47.874952,
		"lng": -97.023159
	},
	{
		"lat": 47.87497,
		"lng": -97.023138
	},
	{
		"lat": 47.875003,
		"lng": -97.023108
	},
	{
		"lat": 47.875012,
		"lng": -97.023096
	},
	{
		"lat": 47.875081,
		"lng": -97.022998
	},
	{
		"lat": 47.875166,
		"lng": -97.022898
	},
	{
		"lat": 47.875341,
		"lng": -97.022629
	},
	{
		"lat": 47.875461,
		"lng": -97.022431
	},
	{
		"lat": 47.875526,
		"lng": -97.022304
	},
	{
		"lat": 47.875556,
		"lng": -97.022236
	},
	{
		"lat": 47.875702,
		"lng": -97.021903
	},
	{
		"lat": 47.875794,
		"lng": -97.021615
	},
	{
		"lat": 47.875818,
		"lng": -97.021514
	},
	{
		"lat": 47.875861,
		"lng": -97.021369
	},
	{
		"lat": 47.875938,
		"lng": -97.021072
	},
	{
		"lat": 47.875984,
		"lng": -97.020928
	},
	{
		"lat": 47.87608,
		"lng": -97.020586
	},
	{
		"lat": 47.876114,
		"lng": -97.020492
	},
	{
		"lat": 47.876125,
		"lng": -97.020441
	},
	{
		"lat": 47.876173,
		"lng": -97.020299
	},
	{
		"lat": 47.87625,
		"lng": -97.02012
	},
	{
		"lat": 47.876294,
		"lng": -97.019975
	},
	{
		"lat": 47.876419,
		"lng": -97.019652
	},
	{
		"lat": 47.876521,
		"lng": -97.019434
	},
	{
		"lat": 47.876673,
		"lng": -97.019136
	},
	{
		"lat": 47.876721,
		"lng": -97.019058
	},
	{
		"lat": 47.876963,
		"lng": -97.018738
	},
	{
		"lat": 47.877019,
		"lng": -97.018672
	},
	{
		"lat": 47.877384,
		"lng": -97.018327
	},
	{
		"lat": 47.877618,
		"lng": -97.018186
	},
	{
		"lat": 47.877858,
		"lng": -97.018069
	},
	{
		"lat": 47.877964,
		"lng": -97.018031
	},
	{
		"lat": 47.87818,
		"lng": -97.018
	},
	{
		"lat": 47.878289,
		"lng": -97.017993
	},
	{
		"lat": 47.878651,
		"lng": -97.018014
	},
	{
		"lat": 47.878686,
		"lng": -97.01802
	},
	{
		"lat": 47.878757,
		"lng": -97.018044
	},
	{
		"lat": 47.878929,
		"lng": -97.018127
	},
	{
		"lat": 47.879095,
		"lng": -97.018233
	},
	{
		"lat": 47.879164,
		"lng": -97.018285
	},
	{
		"lat": 47.879259,
		"lng": -97.018342
	},
	{
		"lat": 47.879421,
		"lng": -97.01846
	},
	{
		"lat": 47.879546,
		"lng": -97.018566
	},
	{
		"lat": 47.879634,
		"lng": -97.01866
	},
	{
		"lat": 47.879756,
		"lng": -97.018774
	},
	{
		"lat": 47.879783,
		"lng": -97.018809
	},
	{
		"lat": 47.879843,
		"lng": -97.01887
	},
	{
		"lat": 47.879926,
		"lng": -97.01897
	},
	{
		"lat": 47.880129,
		"lng": -97.019273
	},
	{
		"lat": 47.880392,
		"lng": -97.019711
	},
	{
		"lat": 47.88046,
		"lng": -97.019835
	},
	{
		"lat": 47.880524,
		"lng": -97.019963
	},
	{
		"lat": 47.880744,
		"lng": -97.020451
	},
	{
		"lat": 47.880798,
		"lng": -97.020588
	},
	{
		"lat": 47.880838,
		"lng": -97.020677
	},
	{
		"lat": 47.8809,
		"lng": -97.020868
	},
	{
		"lat": 47.880942,
		"lng": -97.020954
	},
	{
		"lat": 47.881034,
		"lng": -97.021212
	},
	{
		"lat": 47.881271,
		"lng": -97.021746
	},
	{
		"lat": 47.881306,
		"lng": -97.021839
	},
	{
		"lat": 47.881364,
		"lng": -97.021967
	},
	{
		"lat": 47.881396,
		"lng": -97.022039
	},
	{
		"lat": 47.881426,
		"lng": -97.022104
	},
	{
		"lat": 47.881572,
		"lng": -97.022407
	},
	{
		"lat": 47.881661,
		"lng": -97.022583
	},
	{
		"lat": 47.881832,
		"lng": -97.022917
	},
	{
		"lat": 47.8819,
		"lng": -97.023041
	},
	{
		"lat": 47.881996,
		"lng": -97.023199
	},
	{
		"lat": 47.882224,
		"lng": -97.023539
	},
	{
		"lat": 47.882413,
		"lng": -97.023788
	},
	{
		"lat": 47.882499,
		"lng": -97.023885
	},
	{
		"lat": 47.882619,
		"lng": -97.024003
	},
	{
		"lat": 47.882682,
		"lng": -97.024075
	},
	{
		"lat": 47.882762,
		"lng": -97.024165
	},
	{
		"lat": 47.883058,
		"lng": -97.02447
	},
	{
		"lat": 47.883096,
		"lng": -97.024518
	},
	{
		"lat": 47.883276,
		"lng": -97.024691
	},
	{
		"lat": 47.883463,
		"lng": -97.024854
	},
	{
		"lat": 47.883494,
		"lng": -97.024874
	},
	{
		"lat": 47.883496,
		"lng": -97.024875
	},
	{
		"lat": 47.883591,
		"lng": -97.024952
	},
	{
		"lat": 47.883691,
		"lng": -97.025014
	},
	{
		"lat": 47.883794,
		"lng": -97.025064
	},
	{
		"lat": 47.884179,
		"lng": -97.025213
	},
	{
		"lat": 47.884356,
		"lng": -97.025273
	},
	{
		"lat": 47.884926,
		"lng": -97.025422
	},
	{
		"lat": 47.884985,
		"lng": -97.025432
	},
	{
		"lat": 47.885178,
		"lng": -97.025467
	},
	{
		"lat": 47.885394,
		"lng": -97.025495
	},
	{
		"lat": 47.885466,
		"lng": -97.025497
	},
	{
		"lat": 47.885516,
		"lng": -97.025491
	},
	{
		"lat": 47.885935,
		"lng": -97.02544
	},
	{
		"lat": 47.886006,
		"lng": -97.025422
	},
	{
		"lat": 47.88611,
		"lng": -97.025373
	},
	{
		"lat": 47.886216,
		"lng": -97.025338
	},
	{
		"lat": 47.886285,
		"lng": -97.025308
	},
	{
		"lat": 47.886591,
		"lng": -97.025145
	},
	{
		"lat": 47.886656,
		"lng": -97.025097
	},
	{
		"lat": 47.886791,
		"lng": -97.025022
	},
	{
		"lat": 47.886887,
		"lng": -97.024948
	},
	{
		"lat": 47.887011,
		"lng": -97.024839
	},
	{
		"lat": 47.887077,
		"lng": -97.024793
	},
	{
		"lat": 47.887136,
		"lng": -97.024733
	},
	{
		"lat": 47.887222,
		"lng": -97.024635
	},
	{
		"lat": 47.887356,
		"lng": -97.024456
	},
	{
		"lat": 47.887638,
		"lng": -97.024045
	},
	{
		"lat": 47.887738,
		"lng": -97.023892
	},
	{
		"lat": 47.887807,
		"lng": -97.023769
	},
	{
		"lat": 47.887927,
		"lng": -97.023504
	},
	{
		"lat": 47.888042,
		"lng": -97.023234
	},
	{
		"lat": 47.888147,
		"lng": -97.022956
	},
	{
		"lat": 47.888228,
		"lng": -97.022719
	},
	{
		"lat": 47.888287,
		"lng": -97.022526
	},
	{
		"lat": 47.888324,
		"lng": -97.022435
	},
	{
		"lat": 47.888362,
		"lng": -97.022286
	},
	{
		"lat": 47.88837,
		"lng": -97.022265
	},
	{
		"lat": 47.88838,
		"lng": -97.02224
	},
	{
		"lat": 47.88845,
		"lng": -97.021996
	},
	{
		"lat": 47.888517,
		"lng": -97.021808
	},
	{
		"lat": 47.888555,
		"lng": -97.021717
	},
	{
		"lat": 47.888611,
		"lng": -97.021546
	},
	{
		"lat": 47.888618,
		"lng": -97.021527
	},
	{
		"lat": 47.88872,
		"lng": -97.021246
	},
	{
		"lat": 47.888814,
		"lng": -97.020959
	},
	{
		"lat": 47.888865,
		"lng": -97.020819
	},
	{
		"lat": 47.888905,
		"lng": -97.020672
	},
	{
		"lat": 47.889078,
		"lng": -97.020206
	},
	{
		"lat": 47.889187,
		"lng": -97.019932
	},
	{
		"lat": 47.889292,
		"lng": -97.019717
	},
	{
		"lat": 47.889361,
		"lng": -97.019594
	},
	{
		"lat": 47.889461,
		"lng": -97.019444
	},
	{
		"lat": 47.889463,
		"lng": -97.019443
	},
	{
		"lat": 47.889623,
		"lng": -97.019228
	},
	{
		"lat": 47.889746,
		"lng": -97.019116
	},
	{
		"lat": 47.889877,
		"lng": -97.019027
	},
	{
		"lat": 47.889908,
		"lng": -97.018999
	},
	{
		"lat": 47.889973,
		"lng": -97.018953
	},
	{
		"lat": 47.890004,
		"lng": -97.018924
	},
	{
		"lat": 47.890116,
		"lng": -97.018888
	},
	{
		"lat": 47.890184,
		"lng": -97.018852
	},
	{
		"lat": 47.890212,
		"lng": -97.01884
	},
	{
		"lat": 47.890254,
		"lng": -97.018825
	},
	{
		"lat": 47.890433,
		"lng": -97.018783
	},
	{
		"lat": 47.890542,
		"lng": -97.018782
	},
	{
		"lat": 47.890879,
		"lng": -97.0188
	},
	{
		"lat": 47.890903,
		"lng": -97.018802
	},
	{
		"lat": 47.890975,
		"lng": -97.018818
	},
	{
		"lat": 47.891091,
		"lng": -97.018873
	},
	{
		"lat": 47.891216,
		"lng": -97.018933
	},
	{
		"lat": 47.891248,
		"lng": -97.018956
	},
	{
		"lat": 47.891497,
		"lng": -97.019173
	},
	{
		"lat": 47.891669,
		"lng": -97.019368
	},
	{
		"lat": 47.891728,
		"lng": -97.019428
	},
	{
		"lat": 47.891833,
		"lng": -97.019574
	},
	{
		"lat": 47.891863,
		"lng": -97.019605
	},
	{
		"lat": 47.891991,
		"lng": -97.019792
	},
	{
		"lat": 47.892165,
		"lng": -97.020061
	},
	{
		"lat": 47.892333,
		"lng": -97.020339
	},
	{
		"lat": 47.89259,
		"lng": -97.020852
	},
	{
		"lat": 47.892691,
		"lng": -97.021072
	},
	{
		"lat": 47.892939,
		"lng": -97.021657
	},
	{
		"lat": 47.893046,
		"lng": -97.021933
	},
	{
		"lat": 47.893086,
		"lng": -97.022021
	},
	{
		"lat": 47.893138,
		"lng": -97.022161
	},
	{
		"lat": 47.893176,
		"lng": -97.022251
	},
	{
		"lat": 47.893303,
		"lng": -97.022521
	},
	{
		"lat": 47.893483,
		"lng": -97.022906
	},
	{
		"lat": 47.893668,
		"lng": -97.023231
	},
	{
		"lat": 47.893797,
		"lng": -97.023487
	},
	{
		"lat": 47.894126,
		"lng": -97.02398
	},
	{
		"lat": 47.89431,
		"lng": -97.024235
	},
	{
		"lat": 47.89442,
		"lng": -97.024373
	},
	{
		"lat": 47.894506,
		"lng": -97.024471
	},
	{
		"lat": 47.894566,
		"lng": -97.024531
	},
	{
		"lat": 47.89468,
		"lng": -97.024661
	},
	{
		"lat": 47.894769,
		"lng": -97.024751
	},
	{
		"lat": 47.894896,
		"lng": -97.024855
	},
	{
		"lat": 47.89503,
		"lng": -97.024936
	},
	{
		"lat": 47.895203,
		"lng": -97.025014
	},
	{
		"lat": 47.89538,
		"lng": -97.025068
	},
	{
		"lat": 47.895703,
		"lng": -97.025131
	},
	{
		"lat": 47.896065,
		"lng": -97.02514
	},
	{
		"lat": 47.89639,
		"lng": -97.025119
	},
	{
		"lat": 47.896786,
		"lng": -97.025045
	},
	{
		"lat": 47.897031,
		"lng": -97.024953
	},
	{
		"lat": 47.897101,
		"lng": -97.024922
	},
	{
		"lat": 47.897166,
		"lng": -97.024877
	},
	{
		"lat": 47.897333,
		"lng": -97.024776
	},
	{
		"lat": 47.897535,
		"lng": -97.024629
	},
	{
		"lat": 47.897624,
		"lng": -97.024539
	},
	{
		"lat": 47.897716,
		"lng": -97.024455
	},
	{
		"lat": 47.897775,
		"lng": -97.024392
	},
	{
		"lat": 47.897879,
		"lng": -97.024244
	},
	{
		"lat": 47.898003,
		"lng": -97.024052
	},
	{
		"lat": 47.898057,
		"lng": -97.023959
	},
	{
		"lat": 47.898097,
		"lng": -97.02389
	},
	{
		"lat": 47.898163,
		"lng": -97.023764
	},
	{
		"lat": 47.898305,
		"lng": -97.023523
	},
	{
		"lat": 47.898369,
		"lng": -97.023395
	},
	{
		"lat": 47.898446,
		"lng": -97.023215
	},
	{
		"lat": 47.898569,
		"lng": -97.022952
	},
	{
		"lat": 47.89878,
		"lng": -97.022458
	},
	{
		"lat": 47.898985,
		"lng": -97.021954
	},
	{
		"lat": 47.899059,
		"lng": -97.021775
	},
	{
		"lat": 47.899146,
		"lng": -97.021606
	},
	{
		"lat": 47.899246,
		"lng": -97.021385
	},
	{
		"lat": 47.899339,
		"lng": -97.021222
	},
	{
		"lat": 47.899594,
		"lng": -97.020846
	},
	{
		"lat": 47.899674,
		"lng": -97.020738
	},
	{
		"lat": 47.899761,
		"lng": -97.020642
	},
	{
		"lat": 47.899872,
		"lng": -97.020506
	},
	{
		"lat": 47.899936,
		"lng": -97.020455
	},
	{
		"lat": 47.899996,
		"lng": -97.020397
	},
	{
		"lat": 47.90006,
		"lng": -97.020347
	},
	{
		"lat": 47.900152,
		"lng": -97.020264
	},
	{
		"lat": 47.900316,
		"lng": -97.02015
	},
	{
		"lat": 47.900453,
		"lng": -97.020083
	},
	{
		"lat": 47.900518,
		"lng": -97.020036
	},
	{
		"lat": 47.900623,
		"lng": -97.019998
	},
	{
		"lat": 47.900761,
		"lng": -97.019931
	},
	{
		"lat": 47.900831,
		"lng": -97.019905
	},
	{
		"lat": 47.901046,
		"lng": -97.019861
	},
	{
		"lat": 47.901336,
		"lng": -97.019846
	},
	{
		"lat": 47.901588,
		"lng": -97.019886
	},
	{
		"lat": 47.901658,
		"lng": -97.019913
	},
	{
		"lat": 47.901828,
		"lng": -97.020002
	},
	{
		"lat": 47.901991,
		"lng": -97.020118
	},
	{
		"lat": 47.902303,
		"lng": -97.020387
	},
	{
		"lat": 47.902336,
		"lng": -97.02041
	},
	{
		"lat": 47.902459,
		"lng": -97.020523
	},
	{
		"lat": 47.902516,
		"lng": -97.020588
	},
	{
		"lat": 47.902727,
		"lng": -97.020878
	},
	{
		"lat": 47.903103,
		"lng": -97.021453
	},
	{
		"lat": 47.903398,
		"lng": -97.021921
	},
	{
		"lat": 47.903538,
		"lng": -97.022128
	},
	{
		"lat": 47.903704,
		"lng": -97.022373
	},
	{
		"lat": 47.903923,
		"lng": -97.022726
	},
	{
		"lat": 47.904105,
		"lng": -97.022985
	},
	{
		"lat": 47.904277,
		"lng": -97.023179
	},
	{
		"lat": 47.904337,
		"lng": -97.023238
	},
	{
		"lat": 47.904394,
		"lng": -97.023304
	},
	{
		"lat": 47.904571,
		"lng": -97.023488
	},
	{
		"lat": 47.904698,
		"lng": -97.023589
	},
	{
		"lat": 47.904787,
		"lng": -97.023682
	},
	{
		"lat": 47.904942,
		"lng": -97.02382
	},
	{
		"lat": 47.905001,
		"lng": -97.023879
	},
	{
		"lat": 47.905064,
		"lng": -97.023932
	},
	{
		"lat": 47.905154,
		"lng": -97.024022
	},
	{
		"lat": 47.905307,
		"lng": -97.024161
	},
	{
		"lat": 47.905458,
		"lng": -97.024307
	},
	{
		"lat": 47.905546,
		"lng": -97.024383
	},
	{
		"lat": 47.905583,
		"lng": -97.024416
	},
	{
		"lat": 47.905942,
		"lng": -97.024668
	},
	{
		"lat": 47.905973,
		"lng": -97.024694
	},
	{
		"lat": 47.906041,
		"lng": -97.024733
	},
	{
		"lat": 47.906105,
		"lng": -97.024782
	},
	{
		"lat": 47.90624,
		"lng": -97.024854
	},
	{
		"lat": 47.906482,
		"lng": -97.024964
	},
	{
		"lat": 47.906726,
		"lng": -97.025065
	},
	{
		"lat": 47.907044,
		"lng": -97.025171
	},
	{
		"lat": 47.907258,
		"lng": -97.025227
	},
	{
		"lat": 47.907366,
		"lng": -97.025239
	},
	{
		"lat": 47.907511,
		"lng": -97.025244
	},
	{
		"lat": 47.907728,
		"lng": -97.025229
	},
	{
		"lat": 47.907808,
		"lng": -97.025208
	},
	{
		"lat": 47.907835,
		"lng": -97.025202
	},
	{
		"lat": 47.907906,
		"lng": -97.025177
	},
	{
		"lat": 47.908004,
		"lng": -97.025111
	},
	{
		"lat": 47.908129,
		"lng": -97.025002
	},
	{
		"lat": 47.908215,
		"lng": -97.024905
	},
	{
		"lat": 47.908342,
		"lng": -97.024716
	},
	{
		"lat": 47.908382,
		"lng": -97.024643
	},
	{
		"lat": 47.908394,
		"lng": -97.024622
	},
	{
		"lat": 47.90841,
		"lng": -97.024593
	},
	{
		"lat": 47.908429,
		"lng": -97.024548
	},
	{
		"lat": 47.908502,
		"lng": -97.024305
	},
	{
		"lat": 47.908532,
		"lng": -97.024098
	},
	{
		"lat": 47.908537,
		"lng": -97.023833
	},
	{
		"lat": 47.908529,
		"lng": -97.023727
	},
	{
		"lat": 47.908515,
		"lng": -97.023623
	},
	{
		"lat": 47.908479,
		"lng": -97.023473
	},
	{
		"lat": 47.908462,
		"lng": -97.023427
	},
	{
		"lat": 47.908407,
		"lng": -97.02323
	},
	{
		"lat": 47.908387,
		"lng": -97.023187
	},
	{
		"lat": 47.908355,
		"lng": -97.023091
	},
	{
		"lat": 47.908236,
		"lng": -97.022826
	},
	{
		"lat": 47.908168,
		"lng": -97.022702
	},
	{
		"lat": 47.90807,
		"lng": -97.022546
	},
	{
		"lat": 47.907943,
		"lng": -97.022356
	},
	{
		"lat": 47.907785,
		"lng": -97.022139
	},
	{
		"lat": 47.90767,
		"lng": -97.02201
	},
	{
		"lat": 47.907341,
		"lng": -97.021682
	},
	{
		"lat": 47.907138,
		"lng": -97.021459
	},
	{
		"lat": 47.906751,
		"lng": -97.021067
	},
	{
		"lat": 47.906475,
		"lng": -97.020724
	},
	{
		"lat": 47.906297,
		"lng": -97.02046
	},
	{
		"lat": 47.906229,
		"lng": -97.020336
	},
	{
		"lat": 47.906133,
		"lng": -97.020177
	},
	{
		"lat": 47.905956,
		"lng": -97.019842
	},
	{
		"lat": 47.905904,
		"lng": -97.019703
	},
	{
		"lat": 47.905827,
		"lng": -97.019463
	},
	{
		"lat": 47.905751,
		"lng": -97.019165
	},
	{
		"lat": 47.905685,
		"lng": -97.018862
	},
	{
		"lat": 47.905671,
		"lng": -97.018758
	},
	{
		"lat": 47.905652,
		"lng": -97.018656
	},
	{
		"lat": 47.905644,
		"lng": -97.018561
	},
	{
		"lat": 47.90562,
		"lng": -97.018287
	},
	{
		"lat": 47.905613,
		"lng": -97.018076
	},
	{
		"lat": 47.905618,
		"lng": -97.017917
	},
	{
		"lat": 47.905635,
		"lng": -97.017681
	},
	{
		"lat": 47.905639,
		"lng": -97.017616
	},
	{
		"lat": 47.905648,
		"lng": -97.017495
	},
	{
		"lat": 47.905679,
		"lng": -97.01718
	},
	{
		"lat": 47.90569,
		"lng": -97.01713
	},
	{
		"lat": 47.905705,
		"lng": -97.017083
	},
	{
		"lat": 47.905766,
		"lng": -97.01689
	},
	{
		"lat": 47.905803,
		"lng": -97.016798
	},
	{
		"lat": 47.905816,
		"lng": -97.016749
	},
	{
		"lat": 47.905895,
		"lng": -97.016571
	},
	{
		"lat": 47.905947,
		"lng": -97.016432
	},
	{
		"lat": 47.906029,
		"lng": -97.016257
	},
	{
		"lat": 47.906047,
		"lng": -97.016211
	},
	{
		"lat": 47.906111,
		"lng": -97.016082
	},
	{
		"lat": 47.906226,
		"lng": -97.015877
	},
	{
		"lat": 47.906352,
		"lng": -97.015687
	},
	{
		"lat": 47.906459,
		"lng": -97.015544
	},
	{
		"lat": 47.906489,
		"lng": -97.015515
	},
	{
		"lat": 47.906585,
		"lng": -97.015441
	},
	{
		"lat": 47.906646,
		"lng": -97.015382
	},
	{
		"lat": 47.906709,
		"lng": -97.015332
	},
	{
		"lat": 47.90708,
		"lng": -97.01512
	},
	{
		"lat": 47.907224,
		"lng": -97.015056
	},
	{
		"lat": 47.907288,
		"lng": -97.015027
	},
	{
		"lat": 47.90732,
		"lng": -97.015002
	},
	{
		"lat": 47.907387,
		"lng": -97.014976
	},
	{
		"lat": 47.907529,
		"lng": -97.014933
	},
	{
		"lat": 47.907708,
		"lng": -97.014892
	},
	{
		"lat": 47.907961,
		"lng": -97.01487
	},
	{
		"lat": 47.908287,
		"lng": -97.014881
	},
	{
		"lat": 47.908576,
		"lng": -97.014904
	},
	{
		"lat": 47.908648,
		"lng": -97.014918
	},
	{
		"lat": 47.909184,
		"lng": -97.015052
	},
	{
		"lat": 47.909326,
		"lng": -97.015094
	},
	{
		"lat": 47.909573,
		"lng": -97.015179
	},
	{
		"lat": 47.909816,
		"lng": -97.015282
	},
	{
		"lat": 47.910096,
		"lng": -97.015392
	},
	{
		"lat": 47.910443,
		"lng": -97.015547
	},
	{
		"lat": 47.910621,
		"lng": -97.015619
	},
	{
		"lat": 47.910712,
		"lng": -97.015656
	},
	{
		"lat": 47.911002,
		"lng": -97.015773
	},
	{
		"lat": 47.911081,
		"lng": -97.015812
	},
	{
		"lat": 47.911207,
		"lng": -97.015875
	},
	{
		"lat": 47.911479,
		"lng": -97.016021
	},
	{
		"lat": 47.911612,
		"lng": -97.016107
	},
	{
		"lat": 47.91178,
		"lng": -97.016204
	},
	{
		"lat": 47.912107,
		"lng": -97.016436
	},
	{
		"lat": 47.912138,
		"lng": -97.016459
	},
	{
		"lat": 47.912233,
		"lng": -97.016538
	},
	{
		"lat": 47.912428,
		"lng": -97.016677
	},
	{
		"lat": 47.912616,
		"lng": -97.016835
	},
	{
		"lat": 47.912736,
		"lng": -97.016955
	},
	{
		"lat": 47.912828,
		"lng": -97.017038
	},
	{
		"lat": 47.912921,
		"lng": -97.017149
	},
	{
		"lat": 47.91294,
		"lng": -97.017172
	},
	{
		"lat": 47.913178,
		"lng": -97.0175
	},
	{
		"lat": 47.913329,
		"lng": -97.017729
	},
	{
		"lat": 47.913549,
		"lng": -97.01808
	},
	{
		"lat": 47.913759,
		"lng": -97.018446
	},
	{
		"lat": 47.913979,
		"lng": -97.018906
	},
	{
		"lat": 47.913987,
		"lng": -97.018923
	},
	{
		"lat": 47.914182,
		"lng": -97.019371
	},
	{
		"lat": 47.914248,
		"lng": -97.019537
	},
	{
		"lat": 47.914291,
		"lng": -97.019646
	},
	{
		"lat": 47.914335,
		"lng": -97.019791
	},
	{
		"lat": 47.914385,
		"lng": -97.019932
	},
	{
		"lat": 47.914428,
		"lng": -97.020078
	},
	{
		"lat": 47.914569,
		"lng": -97.02068
	},
	{
		"lat": 47.914646,
		"lng": -97.021033
	},
	{
		"lat": 47.914682,
		"lng": -97.021293
	},
	{
		"lat": 47.914702,
		"lng": -97.021389
	},
	{
		"lat": 47.914713,
		"lng": -97.021446
	},
	{
		"lat": 47.914744,
		"lng": -97.021542
	},
	{
		"lat": 47.914756,
		"lng": -97.021592
	},
	{
		"lat": 47.914773,
		"lng": -97.021695
	},
	{
		"lat": 47.914809,
		"lng": -97.021845
	},
	{
		"lat": 47.914829,
		"lng": -97.022002
	},
	{
		"lat": 47.914877,
		"lng": -97.022257
	},
	{
		"lat": 47.91491,
		"lng": -97.022409
	},
	{
		"lat": 47.914997,
		"lng": -97.0227
	},
	{
		"lat": 47.915094,
		"lng": -97.022984
	},
	{
		"lat": 47.915186,
		"lng": -97.023213
	},
	{
		"lat": 47.915253,
		"lng": -97.023338
	},
	{
		"lat": 47.915456,
		"lng": -97.02364
	},
	{
		"lat": 47.915545,
		"lng": -97.023732
	},
	{
		"lat": 47.915579,
		"lng": -97.023751
	},
	{
		"lat": 47.915614,
		"lng": -97.023763
	},
	{
		"lat": 47.915722,
		"lng": -97.02378
	},
	{
		"lat": 47.915831,
		"lng": -97.02378
	},
	{
		"lat": 47.916012,
		"lng": -97.023764
	},
	{
		"lat": 47.916082,
		"lng": -97.023737
	},
	{
		"lat": 47.916114,
		"lng": -97.023714
	},
	{
		"lat": 47.916144,
		"lng": -97.023683
	},
	{
		"lat": 47.916184,
		"lng": -97.023656
	},
	{
		"lat": 47.916215,
		"lng": -97.023628
	},
	{
		"lat": 47.916325,
		"lng": -97.02349
	},
	{
		"lat": 47.916504,
		"lng": -97.023227
	},
	{
		"lat": 47.916651,
		"lng": -97.022993
	},
	{
		"lat": 47.916746,
		"lng": -97.022832
	},
	{
		"lat": 47.916807,
		"lng": -97.022701
	},
	{
		"lat": 47.916944,
		"lng": -97.022328
	},
	{
		"lat": 47.916991,
		"lng": -97.022185
	},
	{
		"lat": 47.917011,
		"lng": -97.02214
	},
	{
		"lat": 47.917101,
		"lng": -97.021852
	},
	{
		"lat": 47.91715,
		"lng": -97.021652
	},
	{
		"lat": 47.917183,
		"lng": -97.021558
	},
	{
		"lat": 47.917208,
		"lng": -97.021458
	},
	{
		"lat": 47.917252,
		"lng": -97.021313
	},
	{
		"lat": 47.917313,
		"lng": -97.021064
	},
	{
		"lat": 47.917367,
		"lng": -97.020812
	},
	{
		"lat": 47.917472,
		"lng": -97.020475
	},
	{
		"lat": 47.917492,
		"lng": -97.020431
	},
	{
		"lat": 47.917515,
		"lng": -97.02033
	},
	{
		"lat": 47.91757,
		"lng": -97.020134
	},
	{
		"lat": 47.917657,
		"lng": -97.019786
	},
	{
		"lat": 47.917698,
		"lng": -97.019638
	},
	{
		"lat": 47.917734,
		"lng": -97.019488
	},
	{
		"lat": 47.917846,
		"lng": -97.019155
	},
	{
		"lat": 47.917889,
		"lng": -97.019009
	},
	{
		"lat": 47.91794,
		"lng": -97.018869
	},
	{
		"lat": 47.917981,
		"lng": -97.018783
	},
	{
		"lat": 47.918018,
		"lng": -97.018691
	},
	{
		"lat": 47.918088,
		"lng": -97.018569
	},
	{
		"lat": 47.918129,
		"lng": -97.018482
	},
	{
		"lat": 47.918153,
		"lng": -97.018442
	},
	{
		"lat": 47.918319,
		"lng": -97.018215
	},
	{
		"lat": 47.918551,
		"lng": -97.017899
	},
	{
		"lat": 47.918636,
		"lng": -97.0178
	},
	{
		"lat": 47.918755,
		"lng": -97.01768
	},
	{
		"lat": 47.918787,
		"lng": -97.017657
	},
	{
		"lat": 47.918823,
		"lng": -97.017644
	},
	{
		"lat": 47.918924,
		"lng": -97.017588
	},
	{
		"lat": 47.918996,
		"lng": -97.017578
	},
	{
		"lat": 47.919177,
		"lng": -97.017579
	},
	{
		"lat": 47.919322,
		"lng": -97.017595
	},
	{
		"lat": 47.919393,
		"lng": -97.017613
	},
	{
		"lat": 47.919672,
		"lng": -97.01773
	},
	{
		"lat": 47.919911,
		"lng": -97.017854
	},
	{
		"lat": 47.92001,
		"lng": -97.01792
	},
	{
		"lat": 47.920106,
		"lng": -97.017994
	},
	{
		"lat": 47.920228,
		"lng": -97.018107
	},
	{
		"lat": 47.920393,
		"lng": -97.018315
	},
	{
		"lat": 47.920546,
		"lng": -97.01854
	},
	{
		"lat": 47.920643,
		"lng": -97.018698
	},
	{
		"lat": 47.920854,
		"lng": -97.019061
	},
	{
		"lat": 47.921051,
		"lng": -97.019441
	},
	{
		"lat": 47.92148,
		"lng": -97.020362
	},
	{
		"lat": 47.921732,
		"lng": -97.020813
	},
	{
		"lat": 47.921767,
		"lng": -97.020885
	},
	{
		"lat": 47.921779,
		"lng": -97.020907
	},
	{
		"lat": 47.92178,
		"lng": -97.020909
	},
	{
		"lat": 47.921923,
		"lng": -97.021129
	},
	{
		"lat": 47.922034,
		"lng": -97.021267
	},
	{
		"lat": 47.922189,
		"lng": -97.021404
	},
	{
		"lat": 47.922214,
		"lng": -97.021419
	},
	{
		"lat": 47.922356,
		"lng": -97.021509
	},
	{
		"lat": 47.922425,
		"lng": -97.021541
	},
	{
		"lat": 47.922479,
		"lng": -97.021739
	},
	{
		"lat": 47.922518,
		"lng": -97.021857
	},
	{
		"lat": 47.92267,
		"lng": -97.02231
	},
	{
		"lat": 47.922707,
		"lng": -97.022402
	},
	{
		"lat": 47.922886,
		"lng": -97.022734
	},
	{
		"lat": 47.923109,
		"lng": -97.023082
	},
	{
		"lat": 47.923451,
		"lng": -97.023589
	},
	{
		"lat": 47.923643,
		"lng": -97.023873
	},
	{
		"lat": 47.924061,
		"lng": -97.02446
	},
	{
		"lat": 47.924162,
		"lng": -97.024612
	},
	{
		"lat": 47.92422,
		"lng": -97.024706
	},
	{
		"lat": 47.924258,
		"lng": -97.024769
	},
	{
		"lat": 47.924334,
		"lng": -97.024883
	},
	{
		"lat": 47.924493,
		"lng": -97.025101
	},
	{
		"lat": 47.924578,
		"lng": -97.025199
	},
	{
		"lat": 47.924967,
		"lng": -97.025676
	},
	{
		"lat": 47.925111,
		"lng": -97.025838
	},
	{
		"lat": 47.925195,
		"lng": -97.025939
	},
	{
		"lat": 47.925258,
		"lng": -97.026024
	},
	{
		"lat": 47.925272,
		"lng": -97.026034
	},
	{
		"lat": 47.925285,
		"lng": -97.026041
	},
	{
		"lat": 47.925299,
		"lng": -97.02608
	},
	{
		"lat": 47.925328,
		"lng": -97.026119
	},
	{
		"lat": 47.925448,
		"lng": -97.026238
	},
	{
		"lat": 47.925504,
		"lng": -97.026305
	},
	{
		"lat": 47.925656,
		"lng": -97.026448
	},
	{
		"lat": 47.925714,
		"lng": -97.02652
	},
	{
		"lat": 47.925822,
		"lng": -97.026654
	},
	{
		"lat": 47.92615,
		"lng": -97.027149
	},
	{
		"lat": 47.926379,
		"lng": -97.027559
	},
	{
		"lat": 47.926606,
		"lng": -97.027903
	},
	{
		"lat": 47.926776,
		"lng": -97.028177
	},
	{
		"lat": 47.926887,
		"lng": -97.028396
	},
	{
		"lat": 47.926906,
		"lng": -97.028433
	},
	{
		"lat": 47.92692,
		"lng": -97.028467
	},
	{
		"lat": 47.926979,
		"lng": -97.028616
	},
	{
		"lat": 47.927063,
		"lng": -97.02885
	},
	{
		"lat": 47.927103,
		"lng": -97.028938
	},
	{
		"lat": 47.927288,
		"lng": -97.029265
	},
	{
		"lat": 47.92744,
		"lng": -97.029495
	},
	{
		"lat": 47.927485,
		"lng": -97.029578
	},
	{
		"lat": 47.927521,
		"lng": -97.029669
	},
	{
		"lat": 47.92754,
		"lng": -97.029729
	},
	{
		"lat": 47.927542,
		"lng": -97.029736
	},
	{
		"lat": 47.927567,
		"lng": -97.029814
	},
	{
		"lat": 47.927622,
		"lng": -97.029951
	},
	{
		"lat": 47.927793,
		"lng": -97.030292
	},
	{
		"lat": 47.927913,
		"lng": -97.030558
	},
	{
		"lat": 47.927989,
		"lng": -97.030739
	},
	{
		"lat": 47.928024,
		"lng": -97.030832
	},
	{
		"lat": 47.928146,
		"lng": -97.031217
	},
	{
		"lat": 47.928171,
		"lng": -97.031317
	},
	{
		"lat": 47.928202,
		"lng": -97.031412
	},
	{
		"lat": 47.928284,
		"lng": -97.031707
	},
	{
		"lat": 47.928329,
		"lng": -97.031852
	},
	{
		"lat": 47.928395,
		"lng": -97.032042
	},
	{
		"lat": 47.928489,
		"lng": -97.032284
	},
	{
		"lat": 47.928556,
		"lng": -97.032457
	},
	{
		"lat": 47.928588,
		"lng": -97.032552
	},
	{
		"lat": 47.928694,
		"lng": -97.03283
	},
	{
		"lat": 47.928762,
		"lng": -97.033075
	},
	{
		"lat": 47.928801,
		"lng": -97.033165
	},
	{
		"lat": 47.928871,
		"lng": -97.033351
	},
	{
		"lat": 47.929026,
		"lng": -97.033709
	},
	{
		"lat": 47.929128,
		"lng": -97.03392
	},
	{
		"lat": 47.929166,
		"lng": -97.03401
	},
	{
		"lat": 47.929337,
		"lng": -97.034353
	},
	{
		"lat": 47.929761,
		"lng": -97.035078
	},
	{
		"lat": 47.929939,
		"lng": -97.035343
	},
	{
		"lat": 47.930387,
		"lng": -97.035961
	},
	{
		"lat": 47.930495,
		"lng": -97.036103
	},
	{
		"lat": 47.930781,
		"lng": -97.036428
	},
	{
		"lat": 47.930995,
		"lng": -97.036627
	},
	{
		"lat": 47.931027,
		"lng": -97.036652
	},
	{
		"lat": 47.931209,
		"lng": -97.036826
	},
	{
		"lat": 47.931372,
		"lng": -97.036943
	},
	{
		"lat": 47.931505,
		"lng": -97.037026
	},
	{
		"lat": 47.93157,
		"lng": -97.037075
	},
	{
		"lat": 47.931603,
		"lng": -97.037094
	},
	{
		"lat": 47.931916,
		"lng": -97.037232
	},
	{
		"lat": 47.932092,
		"lng": -97.037291
	},
	{
		"lat": 47.932341,
		"lng": -97.03736
	},
	{
		"lat": 47.932485,
		"lng": -97.037388
	},
	{
		"lat": 47.932558,
		"lng": -97.037393
	},
	{
		"lat": 47.932992,
		"lng": -97.037362
	},
	{
		"lat": 47.933222,
		"lng": -97.037328
	},
	{
		"lat": 47.933246,
		"lng": -97.037324
	},
	{
		"lat": 47.93328,
		"lng": -97.037319
	},
	{
		"lat": 47.93335,
		"lng": -97.037292
	},
	{
		"lat": 47.933419,
		"lng": -97.037257
	},
	{
		"lat": 47.933518,
		"lng": -97.037194
	},
	{
		"lat": 47.933586,
		"lng": -97.037157
	},
	{
		"lat": 47.933684,
		"lng": -97.037089
	},
	{
		"lat": 47.933699,
		"lng": -97.037081
	},
	{
		"lat": 47.933856,
		"lng": -97.037003
	},
	{
		"lat": 47.934259,
		"lng": -97.036766
	},
	{
		"lat": 47.934362,
		"lng": -97.036714
	},
	{
		"lat": 47.934491,
		"lng": -97.036618
	},
	{
		"lat": 47.934595,
		"lng": -97.036571
	},
	{
		"lat": 47.934694,
		"lng": -97.036505
	},
	{
		"lat": 47.935009,
		"lng": -97.036258
	},
	{
		"lat": 47.935077,
		"lng": -97.036206
	},
	{
		"lat": 47.935208,
		"lng": -97.036115
	},
	{
		"lat": 47.935311,
		"lng": -97.036064
	},
	{
		"lat": 47.935343,
		"lng": -97.036039
	},
	{
		"lat": 47.935443,
		"lng": -97.035978
	},
	{
		"lat": 47.93558,
		"lng": -97.035908
	},
	{
		"lat": 47.935657,
		"lng": -97.035859
	},
	{
		"lat": 47.935713,
		"lng": -97.035825
	},
	{
		"lat": 47.935919,
		"lng": -97.035723
	},
	{
		"lat": 47.936024,
		"lng": -97.035682
	},
	{
		"lat": 47.936093,
		"lng": -97.035649
	},
	{
		"lat": 47.936198,
		"lng": -97.03561
	},
	{
		"lat": 47.936266,
		"lng": -97.035573
	},
	{
		"lat": 47.936324,
		"lng": -97.035558
	},
	{
		"lat": 47.936409,
		"lng": -97.035537
	},
	{
		"lat": 47.936565,
		"lng": -97.035513
	},
	{
		"lat": 47.936587,
		"lng": -97.035509
	},
	{
		"lat": 47.936697,
		"lng": -97.035492
	},
	{
		"lat": 47.937313,
		"lng": -97.035475
	},
	{
		"lat": 47.937928,
		"lng": -97.035524
	},
	{
		"lat": 47.93818,
		"lng": -97.035571
	},
	{
		"lat": 47.938644,
		"lng": -97.035693
	},
	{
		"lat": 47.93882,
		"lng": -97.035757
	},
	{
		"lat": 47.938991,
		"lng": -97.035845
	},
	{
		"lat": 47.939222,
		"lng": -97.035996
	},
	{
		"lat": 47.939335,
		"lng": -97.036083
	},
	{
		"lat": 47.939392,
		"lng": -97.036149
	},
	{
		"lat": 47.939631,
		"lng": -97.036473
	},
	{
		"lat": 47.93976,
		"lng": -97.03666
	},
	{
		"lat": 47.939883,
		"lng": -97.036855
	},
	{
		"lat": 47.940029,
		"lng": -97.037159
	},
	{
		"lat": 47.940138,
		"lng": -97.037412
	},
	{
		"lat": 47.940164,
		"lng": -97.037473
	},
	{
		"lat": 47.940252,
		"lng": -97.037705
	},
	{
		"lat": 47.940299,
		"lng": -97.037849
	},
	{
		"lat": 47.940421,
		"lng": -97.038291
	},
	{
		"lat": 47.940531,
		"lng": -97.038796
	},
	{
		"lat": 47.940547,
		"lng": -97.038953
	},
	{
		"lat": 47.940586,
		"lng": -97.039449
	},
	{
		"lat": 47.940589,
		"lng": -97.039481
	},
	{
		"lat": 47.940612,
		"lng": -97.039904
	},
	{
		"lat": 47.940634,
		"lng": -97.041338
	},
	{
		"lat": 47.940645,
		"lng": -97.041647
	},
	{
		"lat": 47.940651,
		"lng": -97.041814
	},
	{
		"lat": 47.940678,
		"lng": -97.042237
	},
	{
		"lat": 47.940689,
		"lng": -97.042342
	},
	{
		"lat": 47.940707,
		"lng": -97.042606
	},
	{
		"lat": 47.940765,
		"lng": -97.043237
	},
	{
		"lat": 47.94082,
		"lng": -97.043708
	},
	{
		"lat": 47.940877,
		"lng": -97.043959
	},
	{
		"lat": 47.940896,
		"lng": -97.044062
	},
	{
		"lat": 47.940957,
		"lng": -97.044312
	},
	{
		"lat": 47.941013,
		"lng": -97.044619
	},
	{
		"lat": 47.941037,
		"lng": -97.044774
	},
	{
		"lat": 47.941067,
		"lng": -97.044871
	},
	{
		"lat": 47.941085,
		"lng": -97.044949
	},
	{
		"lat": 47.941102,
		"lng": -97.045022
	},
	{
		"lat": 47.941152,
		"lng": -97.045163
	},
	{
		"lat": 47.941212,
		"lng": -97.045413
	},
	{
		"lat": 47.941241,
		"lng": -97.045566
	},
	{
		"lat": 47.941266,
		"lng": -97.045829
	},
	{
		"lat": 47.941301,
		"lng": -97.04598
	},
	{
		"lat": 47.941334,
		"lng": -97.046074
	},
	{
		"lat": 47.94137,
		"lng": -97.046225
	},
	{
		"lat": 47.941504,
		"lng": -97.046717
	},
	{
		"lat": 47.941654,
		"lng": -97.047199
	},
	{
		"lat": 47.941668,
		"lng": -97.047239
	},
	{
		"lat": 47.941705,
		"lng": -97.04734
	},
	{
		"lat": 47.941814,
		"lng": -97.047616
	},
	{
		"lat": 47.941843,
		"lng": -97.047713
	},
	{
		"lat": 47.941883,
		"lng": -97.047801
	},
	{
		"lat": 47.941966,
		"lng": -97.048037
	},
	{
		"lat": 47.942021,
		"lng": -97.048174
	},
	{
		"lat": 47.942036,
		"lng": -97.048222
	},
	{
		"lat": 47.942114,
		"lng": -97.048401
	},
	{
		"lat": 47.942237,
		"lng": -97.048664
	},
	{
		"lat": 47.942331,
		"lng": -97.048881
	},
	{
		"lat": 47.942382,
		"lng": -97.049022
	},
	{
		"lat": 47.942444,
		"lng": -97.049152
	},
	{
		"lat": 47.942664,
		"lng": -97.049574
	},
	{
		"lat": 47.942744,
		"lng": -97.049751
	},
	{
		"lat": 47.94283,
		"lng": -97.049921
	},
	{
		"lat": 47.943076,
		"lng": -97.050381
	},
	{
		"lat": 47.943354,
		"lng": -97.050871
	},
	{
		"lat": 47.943579,
		"lng": -97.051287
	},
	{
		"lat": 47.943728,
		"lng": -97.051587
	},
	{
		"lat": 47.94412,
		"lng": -97.052212
	},
	{
		"lat": 47.944535,
		"lng": -97.052806
	},
	{
		"lat": 47.944617,
		"lng": -97.05291
	},
	{
		"lat": 47.944881,
		"lng": -97.053274
	},
	{
		"lat": 47.944941,
		"lng": -97.053335
	},
	{
		"lat": 47.945025,
		"lng": -97.053435
	},
	{
		"lat": 47.945043,
		"lng": -97.053452
	},
	{
		"lat": 47.945117,
		"lng": -97.053521
	},
	{
		"lat": 47.94526,
		"lng": -97.053683
	},
	{
		"lat": 47.945324,
		"lng": -97.053732
	},
	{
		"lat": 47.945506,
		"lng": -97.053907
	},
	{
		"lat": 47.945858,
		"lng": -97.05418
	},
	{
		"lat": 47.946044,
		"lng": -97.054345
	},
	{
		"lat": 47.946163,
		"lng": -97.054466
	},
	{
		"lat": 47.946318,
		"lng": -97.054603
	},
	{
		"lat": 47.946378,
		"lng": -97.054662
	},
	{
		"lat": 47.946474,
		"lng": -97.054737
	},
	{
		"lat": 47.946629,
		"lng": -97.054874
	},
	{
		"lat": 47.946828,
		"lng": -97.055001
	},
	{
		"lat": 47.9471,
		"lng": -97.055147
	},
	{
		"lat": 47.94725,
		"lng": -97.055215
	},
	{
		"lat": 47.947412,
		"lng": -97.055289
	},
	{
		"lat": 47.947515,
		"lng": -97.055341
	},
	{
		"lat": 47.94762,
		"lng": -97.055383
	},
	{
		"lat": 47.947832,
		"lng": -97.055451
	},
	{
		"lat": 47.94826,
		"lng": -97.055562
	},
	{
		"lat": 47.948513,
		"lng": -97.055595
	},
	{
		"lat": 47.94861,
		"lng": -97.0556
	},
	{
		"lat": 47.948658,
		"lng": -97.055603
	},
	{
		"lat": 47.949085,
		"lng": -97.055598
	},
	{
		"lat": 47.949129,
		"lng": -97.055597
	},
	{
		"lat": 47.949382,
		"lng": -97.055565
	},
	{
		"lat": 47.949598,
		"lng": -97.05553
	},
	{
		"lat": 47.950074,
		"lng": -97.055434
	},
	{
		"lat": 47.950172,
		"lng": -97.055414
	},
	{
		"lat": 47.950277,
		"lng": -97.055373
	},
	{
		"lat": 47.950384,
		"lng": -97.055345
	},
	{
		"lat": 47.950523,
		"lng": -97.055288
	},
	{
		"lat": 47.950695,
		"lng": -97.055204
	},
	{
		"lat": 47.950779,
		"lng": -97.05517
	},
	{
		"lat": 47.95087,
		"lng": -97.055133
	},
	{
		"lat": 47.950904,
		"lng": -97.055115
	},
	{
		"lat": 47.951036,
		"lng": -97.055027
	},
	{
		"lat": 47.951408,
		"lng": -97.054818
	},
	{
		"lat": 47.951469,
		"lng": -97.05476
	},
	{
		"lat": 47.95163,
		"lng": -97.054639
	},
	{
		"lat": 47.951721,
		"lng": -97.054554
	},
	{
		"lat": 47.951852,
		"lng": -97.054462
	},
	{
		"lat": 47.951945,
		"lng": -97.054379
	},
	{
		"lat": 47.952046,
		"lng": -97.054321
	},
	{
		"lat": 47.952174,
		"lng": -97.054221
	},
	{
		"lat": 47.952293,
		"lng": -97.054136
	},
	{
		"lat": 47.952356,
		"lng": -97.054085
	},
	{
		"lat": 47.952423,
		"lng": -97.054044
	},
	{
		"lat": 47.952581,
		"lng": -97.053915
	},
	{
		"lat": 47.952768,
		"lng": -97.053752
	},
	{
		"lat": 47.953057,
		"lng": -97.053531
	},
	{
		"lat": 47.953222,
		"lng": -97.053422
	},
	{
		"lat": 47.953256,
		"lng": -97.053405
	},
	{
		"lat": 47.953319,
		"lng": -97.053352
	},
	{
		"lat": 47.953586,
		"lng": -97.05319
	},
	{
		"lat": 47.953784,
		"lng": -97.053056
	},
	{
		"lat": 47.953885,
		"lng": -97.052999
	},
	{
		"lat": 47.954017,
		"lng": -97.052912
	},
	{
		"lat": 47.954422,
		"lng": -97.052681
	},
	{
		"lat": 47.954739,
		"lng": -97.05257
	},
	{
		"lat": 47.954878,
		"lng": -97.052511
	},
	{
		"lat": 47.954984,
		"lng": -97.052475
	},
	{
		"lat": 47.955198,
		"lng": -97.052418
	},
	{
		"lat": 47.955304,
		"lng": -97.052382
	},
	{
		"lat": 47.955372,
		"lng": -97.052345
	},
	{
		"lat": 47.955478,
		"lng": -97.052314
	},
	{
		"lat": 47.955766,
		"lng": -97.052261
	},
	{
		"lat": 47.955874,
		"lng": -97.052253
	},
	{
		"lat": 47.956599,
		"lng": -97.052267
	},
	{
		"lat": 47.956816,
		"lng": -97.052289
	},
	{
		"lat": 47.957032,
		"lng": -97.052328
	},
	{
		"lat": 47.957422,
		"lng": -97.052451
	},
	{
		"lat": 47.957666,
		"lng": -97.052548
	},
	{
		"lat": 47.958082,
		"lng": -97.052736
	},
	{
		"lat": 47.958253,
		"lng": -97.052826
	},
	{
		"lat": 47.958386,
		"lng": -97.052909
	},
	{
		"lat": 47.958482,
		"lng": -97.052985
	},
	{
		"lat": 47.958746,
		"lng": -97.053159
	},
	{
		"lat": 47.9591,
		"lng": -97.053427
	},
	{
		"lat": 47.959159,
		"lng": -97.053489
	},
	{
		"lat": 47.959251,
		"lng": -97.053575
	},
	{
		"lat": 47.959368,
		"lng": -97.053699
	},
	{
		"lat": 47.959452,
		"lng": -97.0538
	},
	{
		"lat": 47.95969,
		"lng": -97.054126
	},
	{
		"lat": 47.960197,
		"lng": -97.054883
	},
	{
		"lat": 47.96038,
		"lng": -97.055141
	},
	{
		"lat": 47.960533,
		"lng": -97.055367
	},
	{
		"lat": 47.96077,
		"lng": -97.055768
	},
	{
		"lat": 47.960904,
		"lng": -97.056019
	},
	{
		"lat": 47.961085,
		"lng": -97.056416
	},
	{
		"lat": 47.961238,
		"lng": -97.056778
	},
	{
		"lat": 47.961346,
		"lng": -97.057054
	},
	{
		"lat": 47.961506,
		"lng": -97.05753
	},
	{
		"lat": 47.961594,
		"lng": -97.057821
	},
	{
		"lat": 47.961628,
		"lng": -97.057915
	},
	{
		"lat": 47.961655,
		"lng": -97.058013
	},
	{
		"lat": 47.961705,
		"lng": -97.058154
	},
	{
		"lat": 47.961734,
		"lng": -97.05825
	},
	{
		"lat": 47.961867,
		"lng": -97.058627
	},
	{
		"lat": 47.961905,
		"lng": -97.058718
	},
	{
		"lat": 47.961922,
		"lng": -97.058777
	},
	{
		"lat": 47.961942,
		"lng": -97.058821
	},
	{
		"lat": 47.961969,
		"lng": -97.058908
	},
	{
		"lat": 47.962008,
		"lng": -97.059028
	},
	{
		"lat": 47.96201,
		"lng": -97.059061
	},
	{
		"lat": 47.962011,
		"lng": -97.059081
	},
	{
		"lat": 47.962007,
		"lng": -97.059126
	},
	{
		"lat": 47.962,
		"lng": -97.05924
	},
	{
		"lat": 47.962025,
		"lng": -97.059266
	},
	{
		"lat": 47.96207,
		"lng": -97.05928
	},
	{
		"lat": 47.962133,
		"lng": -97.0593
	},
	{
		"lat": 47.962242,
		"lng": -97.059328
	},
	{
		"lat": 47.962263,
		"lng": -97.059354
	},
	{
		"lat": 47.962244,
		"lng": -97.059572
	},
	{
		"lat": 47.96226,
		"lng": -97.059617
	},
	{
		"lat": 47.962317,
		"lng": -97.059723
	},
	{
		"lat": 47.962418,
		"lng": -97.059908
	},
	{
		"lat": 47.962728,
		"lng": -97.060427
	},
	{
		"lat": 47.962938,
		"lng": -97.06072
	},
	{
		"lat": 47.963046,
		"lng": -97.060861
	},
	{
		"lat": 47.96321,
		"lng": -97.061044
	},
	{
		"lat": 47.963305,
		"lng": -97.061151
	},
	{
		"lat": 47.963455,
		"lng": -97.061301
	},
	{
		"lat": 47.963517,
		"lng": -97.061354
	},
	{
		"lat": 47.963596,
		"lng": -97.061411
	},
	{
		"lat": 47.96365,
		"lng": -97.061449
	},
	{
		"lat": 47.963745,
		"lng": -97.061518
	},
	{
		"lat": 47.963948,
		"lng": -97.061629
	},
	{
		"lat": 47.964123,
		"lng": -97.061699
	},
	{
		"lat": 47.964335,
		"lng": -97.061767
	},
	{
		"lat": 47.964514,
		"lng": -97.061812
	},
	{
		"lat": 47.964731,
		"lng": -97.061831
	},
	{
		"lat": 47.965165,
		"lng": -97.061803
	},
	{
		"lat": 47.965379,
		"lng": -97.061747
	},
	{
		"lat": 47.965448,
		"lng": -97.061716
	},
	{
		"lat": 47.965549,
		"lng": -97.061656
	},
	{
		"lat": 47.965745,
		"lng": -97.061519
	},
	{
		"lat": 47.965999,
		"lng": -97.061317
	},
	{
		"lat": 47.966098,
		"lng": -97.06125
	},
	{
		"lat": 47.966165,
		"lng": -97.061211
	},
	{
		"lat": 47.966355,
		"lng": -97.061057
	},
	{
		"lat": 47.966445,
		"lng": -97.060967
	},
	{
		"lat": 47.966539,
		"lng": -97.060888
	},
	{
		"lat": 47.966656,
		"lng": -97.060763
	},
	{
		"lat": 47.967157,
		"lng": -97.060089
	},
	{
		"lat": 47.967216,
		"lng": -97.06001
	},
	{
		"lat": 47.967301,
		"lng": -97.059911
	},
	{
		"lat": 47.967612,
		"lng": -97.059465
	},
	{
		"lat": 47.967806,
		"lng": -97.059226
	},
	{
		"lat": 47.968635,
		"lng": -97.058115
	},
	{
		"lat": 47.968747,
		"lng": -97.057982
	},
	{
		"lat": 47.968996,
		"lng": -97.057765
	},
	{
		"lat": 47.969126,
		"lng": -97.05767
	},
	{
		"lat": 47.969226,
		"lng": -97.057609
	},
	{
		"lat": 47.96929,
		"lng": -97.05756
	},
	{
		"lat": 47.969424,
		"lng": -97.057478
	},
	{
		"lat": 47.969664,
		"lng": -97.057358
	},
	{
		"lat": 47.969984,
		"lng": -97.057267
	},
	{
		"lat": 47.970271,
		"lng": -97.057213
	},
	{
		"lat": 47.970308,
		"lng": -97.05721
	},
	{
		"lat": 47.970525,
		"lng": -97.05722
	},
	{
		"lat": 47.970597,
		"lng": -97.057234
	},
	{
		"lat": 47.970667,
		"lng": -97.057261
	},
	{
		"lat": 47.970769,
		"lng": -97.057314
	},
	{
		"lat": 47.970936,
		"lng": -97.057418
	},
	{
		"lat": 47.971038,
		"lng": -97.057473
	},
	{
		"lat": 47.971204,
		"lng": -97.05758
	},
	{
		"lat": 47.971298,
		"lng": -97.057658
	},
	{
		"lat": 47.971688,
		"lng": -97.057939
	},
	{
		"lat": 47.971719,
		"lng": -97.057967
	},
	{
		"lat": 47.971818,
		"lng": -97.058034
	},
	{
		"lat": 47.972,
		"lng": -97.058207
	},
	{
		"lat": 47.972034,
		"lng": -97.058227
	},
	{
		"lat": 47.972215,
		"lng": -97.058402
	},
	{
		"lat": 47.972355,
		"lng": -97.058519
	},
	{
		"lat": 47.972949,
		"lng": -97.058913
	},
	{
		"lat": 47.973177,
		"lng": -97.059075
	},
	{
		"lat": 47.973279,
		"lng": -97.05913
	},
	{
		"lat": 47.973417,
		"lng": -97.059195
	},
	{
		"lat": 47.973665,
		"lng": -97.059272
	},
	{
		"lat": 47.973916,
		"lng": -97.059326
	},
	{
		"lat": 47.974132,
		"lng": -97.059357
	},
	{
		"lat": 47.974277,
		"lng": -97.059362
	},
	{
		"lat": 47.974567,
		"lng": -97.059355
	},
	{
		"lat": 47.974821,
		"lng": -97.059341
	},
	{
		"lat": 47.975324,
		"lng": -97.059255
	},
	{
		"lat": 47.975519,
		"lng": -97.05917
	},
	{
		"lat": 47.975932,
		"lng": -97.058993
	},
	{
		"lat": 47.976102,
		"lng": -97.058914
	},
	{
		"lat": 47.97614,
		"lng": -97.058897
	},
	{
		"lat": 47.976298,
		"lng": -97.05883
	},
	{
		"lat": 47.976556,
		"lng": -97.058721
	},
	{
		"lat": 47.976956,
		"lng": -97.058465
	},
	{
		"lat": 47.977269,
		"lng": -97.058279
	},
	{
		"lat": 47.977388,
		"lng": -97.058209
	},
	{
		"lat": 47.977507,
		"lng": -97.058131
	},
	{
		"lat": 47.977724,
		"lng": -97.057985
	},
	{
		"lat": 47.977808,
		"lng": -97.057935
	},
	{
		"lat": 47.978188,
		"lng": -97.057713
	},
	{
		"lat": 47.978652,
		"lng": -97.057489
	},
	{
		"lat": 47.978752,
		"lng": -97.057419
	},
	{
		"lat": 47.979049,
		"lng": -97.057216
	},
	{
		"lat": 47.979117,
		"lng": -97.05717
	},
	{
		"lat": 47.979235,
		"lng": -97.057108
	},
	{
		"lat": 47.979808,
		"lng": -97.056809
	},
	{
		"lat": 47.979995,
		"lng": -97.056712
	},
	{
		"lat": 47.98,
		"lng": -97.056709
	},
	{
		"lat": 47.980556,
		"lng": -97.056481
	},
	{
		"lat": 47.981068,
		"lng": -97.056305
	},
	{
		"lat": 47.981127,
		"lng": -97.056287
	},
	{
		"lat": 47.981404,
		"lng": -97.056193
	},
	{
		"lat": 47.981651,
		"lng": -97.056085
	},
	{
		"lat": 47.982076,
		"lng": -97.055905
	},
	{
		"lat": 47.982732,
		"lng": -97.055681
	},
	{
		"lat": 47.983227,
		"lng": -97.055495
	},
	{
		"lat": 47.983244,
		"lng": -97.055489
	},
	{
		"lat": 47.983313,
		"lng": -97.055468
	},
	{
		"lat": 47.983708,
		"lng": -97.055345
	},
	{
		"lat": 47.984156,
		"lng": -97.055201
	},
	{
		"lat": 47.984844,
		"lng": -97.054945
	},
	{
		"lat": 47.985484,
		"lng": -97.054641
	},
	{
		"lat": 47.98598,
		"lng": -97.054401
	},
	{
		"lat": 47.986508,
		"lng": -97.054193
	},
	{
		"lat": 47.987068,
		"lng": -97.053985
	},
	{
		"lat": 47.987628,
		"lng": -97.053761
	},
	{
		"lat": 47.987951,
		"lng": -97.053543
	},
	{
		"lat": 47.9883,
		"lng": -97.053441
	},
	{
		"lat": 47.98847,
		"lng": -97.053376
	},
	{
		"lat": 47.98857,
		"lng": -97.053338
	},
	{
		"lat": 47.988636,
		"lng": -97.053313
	},
	{
		"lat": 47.98873,
		"lng": -97.053273
	},
	{
		"lat": 47.98897,
		"lng": -97.053203
	},
	{
		"lat": 47.98934,
		"lng": -97.053089
	},
	{
		"lat": 47.989708,
		"lng": -97.053057
	},
	{
		"lat": 47.990252,
		"lng": -97.053089
	},
	{
		"lat": 47.990444,
		"lng": -97.053089
	},
	{
		"lat": 47.990477,
		"lng": -97.053104
	},
	{
		"lat": 47.990498,
		"lng": -97.053114
	},
	{
		"lat": 47.990652,
		"lng": -97.053185
	},
	{
		"lat": 47.990844,
		"lng": -97.053217
	},
	{
		"lat": 47.991058,
		"lng": -97.053284
	},
	{
		"lat": 47.991148,
		"lng": -97.053313
	},
	{
		"lat": 47.991314,
		"lng": -97.053387
	},
	{
		"lat": 47.991436,
		"lng": -97.053441
	},
	{
		"lat": 47.991612,
		"lng": -97.053553
	},
	{
		"lat": 47.9919,
		"lng": -97.053809
	},
	{
		"lat": 47.992268,
		"lng": -97.054161
	},
	{
		"lat": 47.99229,
		"lng": -97.054188
	},
	{
		"lat": 47.992334,
		"lng": -97.05424
	},
	{
		"lat": 47.992588,
		"lng": -97.054545
	},
	{
		"lat": 47.992924,
		"lng": -97.054945
	},
	{
		"lat": 47.99326,
		"lng": -97.055521
	},
	{
		"lat": 47.993564,
		"lng": -97.056161
	},
	{
		"lat": 47.99374,
		"lng": -97.056689
	},
	{
		"lat": 47.993884,
		"lng": -97.057137
	},
	{
		"lat": 47.994092,
		"lng": -97.057825
	},
	{
		"lat": 47.994284,
		"lng": -97.058465
	},
	{
		"lat": 47.994492,
		"lng": -97.059153
	},
	{
		"lat": 47.994732,
		"lng": -97.059745
	},
	{
		"lat": 47.994892,
		"lng": -97.060129
	},
	{
		"lat": 47.995036,
		"lng": -97.060481
	},
	{
		"lat": 47.995228,
		"lng": -97.060897
	},
	{
		"lat": 47.995516,
		"lng": -97.061409
	},
	{
		"lat": 47.995692,
		"lng": -97.061761
	},
	{
		"lat": 47.995804,
		"lng": -97.061937
	},
	{
		"lat": 47.995948,
		"lng": -97.062257
	},
	{
		"lat": 47.996156,
		"lng": -97.062561
	},
	{
		"lat": 47.996412,
		"lng": -97.062881
	},
	{
		"lat": 47.996604,
		"lng": -97.063025
	},
	{
		"lat": 47.9968,
		"lng": -97.063183
	},
	{
		"lat": 47.996886,
		"lng": -97.063258
	},
	{
		"lat": 47.997112,
		"lng": -97.063462
	},
	{
		"lat": 47.997388,
		"lng": -97.063745
	},
	{
		"lat": 47.99766,
		"lng": -97.063937
	},
	{
		"lat": 47.997928,
		"lng": -97.064048
	},
	{
		"lat": 47.997957,
		"lng": -97.064059
	},
	{
		"lat": 47.998124,
		"lng": -97.064129
	},
	{
		"lat": 47.998508,
		"lng": -97.064289
	},
	{
		"lat": 47.998892,
		"lng": -97.064416
	},
	{
		"lat": 47.999308,
		"lng": -97.064465
	},
	{
		"lat": 47.99998,
		"lng": -97.064533
	},
	{
		"lat": 48.000378,
		"lng": -97.0645
	},
	{
		"lat": 48.001914,
		"lng": -97.064409
	},
	{
		"lat": 48.002671,
		"lng": -97.064413
	},
	{
		"lat": 48.003399,
		"lng": -97.064513
	},
	{
		"lat": 48.003913,
		"lng": -97.064684
	},
	{
		"lat": 48.004373,
		"lng": -97.064837
	},
	{
		"lat": 48.004406,
		"lng": -97.064849
	},
	{
		"lat": 48.005712,
		"lng": -97.065405
	},
	{
		"lat": 48.006159,
		"lng": -97.065596
	},
	{
		"lat": 48.007075,
		"lng": -97.065986
	},
	{
		"lat": 48.00718,
		"lng": -97.066028
	},
	{
		"lat": 48.007807,
		"lng": -97.066278
	},
	{
		"lat": 48.007978,
		"lng": -97.066355
	},
	{
		"lat": 48.008841,
		"lng": -97.066744
	},
	{
		"lat": 48.009558,
		"lng": -97.066762
	},
	{
		"lat": 48.010365,
		"lng": -97.066577
	},
	{
		"lat": 48.011332,
		"lng": -97.06542
	},
	{
		"lat": 48.012442,
		"lng": -97.063859
	},
	{
		"lat": 48.012567,
		"lng": -97.063684
	},
	{
		"lat": 48.013179,
		"lng": -97.063012
	},
	{
		"lat": 48.013795,
		"lng": -97.062856
	},
	{
		"lat": 48.014004,
		"lng": -97.062888
	},
	{
		"lat": 48.014466,
		"lng": -97.06296
	},
	{
		"lat": 48.014989,
		"lng": -97.063289
	},
	{
		"lat": 48.015269,
		"lng": -97.063976
	},
	{
		"lat": 48.015658,
		"lng": -97.064927
	},
	{
		"lat": 48.015932,
		"lng": -97.068519
	},
	{
		"lat": 48.016176,
		"lng": -97.069284
	},
	{
		"lat": 48.0162,
		"lng": -97.069329
	},
	{
		"lat": 48.016552,
		"lng": -97.06998
	},
	{
		"lat": 48.016639,
		"lng": -97.070132
	},
	{
		"lat": 48.016722,
		"lng": -97.070293
	},
	{
		"lat": 48.016918,
		"lng": -97.070654
	},
	{
		"lat": 48.017146,
		"lng": -97.07088
	},
	{
		"lat": 48.017548,
		"lng": -97.07128
	},
	{
		"lat": 48.017584,
		"lng": -97.071316
	},
	{
		"lat": 48.018023,
		"lng": -97.071751
	},
	{
		"lat": 48.018057,
		"lng": -97.071785
	},
	{
		"lat": 48.018149,
		"lng": -97.071825
	},
	{
		"lat": 48.018962,
		"lng": -97.072176
	},
	{
		"lat": 48.019107,
		"lng": -97.072239
	},
	{
		"lat": 48.019511,
		"lng": -97.072307
	},
	{
		"lat": 48.020046,
		"lng": -97.072399
	},
	{
		"lat": 48.020638,
		"lng": -97.072184
	},
	{
		"lat": 48.021395,
		"lng": -97.071911
	},
	{
		"lat": 48.022757,
		"lng": -97.071304
	},
	{
		"lat": 48.024655,
		"lng": -97.069922
	},
	{
		"lat": 48.026267,
		"lng": -97.068988
	},
	{
		"lat": 48.027694,
		"lng": -97.068713
	},
	{
		"lat": 48.029035,
		"lng": -97.06881
	},
	{
		"lat": 48.029378,
		"lng": -97.068869
	},
	{
		"lat": 48.029738,
		"lng": -97.06892
	},
	{
		"lat": 48.031258,
		"lng": -97.069175
	},
	{
		"lat": 48.033351,
		"lng": -97.069792
	},
	{
		"lat": 48.033364,
		"lng": -97.069793
	},
	{
		"lat": 48.033404,
		"lng": -97.069799
	},
	{
		"lat": 48.033418,
		"lng": -97.069801
	},
	{
		"lat": 48.036065,
		"lng": -97.070148
	},
	{
		"lat": 48.036239,
		"lng": -97.070126
	},
	{
		"lat": 48.037366,
		"lng": -97.069987
	},
	{
		"lat": 48.041765,
		"lng": -97.070411
	},
	{
		"lat": 48.044051,
		"lng": -97.070899
	},
	{
		"lat": 48.044679,
		"lng": -97.071038
	},
	{
		"lat": 48.045797,
		"lng": -97.071288
	},
	{
		"lat": 48.047361,
		"lng": -97.071955
	},
	{
		"lat": 48.048068,
		"lng": -97.072257
	},
	{
		"lat": 48.049577,
		"lng": -97.073059
	},
	{
		"lat": 48.049896,
		"lng": -97.073229
	},
	{
		"lat": 48.051209,
		"lng": -97.074026
	},
	{
		"lat": 48.052018,
		"lng": -97.074723
	},
	{
		"lat": 48.052725,
		"lng": -97.075641
	},
	{
		"lat": 48.053275,
		"lng": -97.076711
	},
	{
		"lat": 48.053612,
		"lng": -97.077414
	},
	{
		"lat": 48.053997,
		"lng": -97.078252
	},
	{
		"lat": 48.054217,
		"lng": -97.078863
	},
	{
		"lat": 48.054264,
		"lng": -97.078989
	},
	{
		"lat": 48.054287,
		"lng": -97.07905
	},
	{
		"lat": 48.054321,
		"lng": -97.079164
	},
	{
		"lat": 48.054456,
		"lng": -97.079544
	},
	{
		"lat": 48.054809,
		"lng": -97.080468
	},
	{
		"lat": 48.05523,
		"lng": -97.081561
	},
	{
		"lat": 48.055794,
		"lng": -97.082895
	},
	{
		"lat": 48.056259,
		"lng": -97.083824
	},
	{
		"lat": 48.056351,
		"lng": -97.084009
	},
	{
		"lat": 48.05642,
		"lng": -97.084145
	},
	{
		"lat": 48.056641,
		"lng": -97.084585
	},
	{
		"lat": 48.057455,
		"lng": -97.08594
	},
	{
		"lat": 48.058222,
		"lng": -97.086986
	},
	{
		"lat": 48.058715,
		"lng": -97.087444
	},
	{
		"lat": 48.058799,
		"lng": -97.087547
	},
	{
		"lat": 48.059031,
		"lng": -97.087818
	},
	{
		"lat": 48.059116,
		"lng": -97.087899
	},
	{
		"lat": 48.059562,
		"lng": -97.088256
	},
	{
		"lat": 48.06,
		"lng": -97.08861
	},
	{
		"lat": 48.060428,
		"lng": -97.088866
	},
	{
		"lat": 48.061,
		"lng": -97.089282
	},
	{
		"lat": 48.062634,
		"lng": -97.09054
	},
	{
		"lat": 48.062707,
		"lng": -97.090597
	},
	{
		"lat": 48.063035,
		"lng": -97.090818
	},
	{
		"lat": 48.064152,
		"lng": -97.091824
	},
	{
		"lat": 48.064385,
		"lng": -97.092034
	},
	{
		"lat": 48.065236,
		"lng": -97.093232
	},
	{
		"lat": 48.066837,
		"lng": -97.095153
	},
	{
		"lat": 48.06761,
		"lng": -97.095828
	},
	{
		"lat": 48.068213,
		"lng": -97.09611
	},
	{
		"lat": 48.068702,
		"lng": -97.09634
	},
	{
		"lat": 48.069982,
		"lng": -97.096985
	},
	{
		"lat": 48.069999,
		"lng": -97.096993
	},
	{
		"lat": 48.070357,
		"lng": -97.097157
	},
	{
		"lat": 48.070584,
		"lng": -97.097261
	},
	{
		"lat": 48.07108,
		"lng": -97.097772
	},
	{
		"lat": 48.071171,
		"lng": -97.097972
	},
	{
		"lat": 48.07131,
		"lng": -97.098275
	},
	{
		"lat": 48.071328,
		"lng": -97.098333
	},
	{
		"lat": 48.071477,
		"lng": -97.098829
	},
	{
		"lat": 48.071511,
		"lng": -97.099523
	},
	{
		"lat": 48.071525,
		"lng": -97.099786
	},
	{
		"lat": 48.071497,
		"lng": -97.101287
	},
	{
		"lat": 48.071669,
		"lng": -97.103052
	},
	{
		"lat": 48.071696,
		"lng": -97.10315
	},
	{
		"lat": 48.071898,
		"lng": -97.103867
	},
	{
		"lat": 48.072204,
		"lng": -97.104223
	},
	{
		"lat": 48.072428,
		"lng": -97.104483
	},
	{
		"lat": 48.073094,
		"lng": -97.104697
	},
	{
		"lat": 48.073703,
		"lng": -97.104565
	},
	{
		"lat": 48.073935,
		"lng": -97.104516
	},
	{
		"lat": 48.074578,
		"lng": -97.104154
	},
	{
		"lat": 48.077182,
		"lng": -97.101086
	},
	{
		"lat": 48.077453,
		"lng": -97.100768
	},
	{
		"lat": 48.077985,
		"lng": -97.1005
	},
	{
		"lat": 48.078581,
		"lng": -97.100234
	},
	{
		"lat": 48.078757,
		"lng": -97.100155
	},
	{
		"lat": 48.07987,
		"lng": -97.099862
	},
	{
		"lat": 48.082106,
		"lng": -97.099431
	},
	{
		"lat": 48.083708,
		"lng": -97.099433
	},
	{
		"lat": 48.084848,
		"lng": -97.099619
	},
	{
		"lat": 48.085884,
		"lng": -97.099798
	},
	{
		"lat": 48.086827,
		"lng": -97.100163
	},
	{
		"lat": 48.088335,
		"lng": -97.101263
	},
	{
		"lat": 48.089122,
		"lng": -97.102165
	},
	{
		"lat": 48.089335,
		"lng": -97.102648
	},
	{
		"lat": 48.08971,
		"lng": -97.103498
	},
	{
		"lat": 48.090103,
		"lng": -97.104736
	},
	{
		"lat": 48.090486,
		"lng": -97.10766
	},
	{
		"lat": 48.090537,
		"lng": -97.108046
	},
	{
		"lat": 48.09088,
		"lng": -97.109338
	},
	{
		"lat": 48.090901,
		"lng": -97.109418
	},
	{
		"lat": 48.090962,
		"lng": -97.109472
	},
	{
		"lat": 48.091006,
		"lng": -97.109511
	},
	{
		"lat": 48.091053,
		"lng": -97.109552
	},
	{
		"lat": 48.091119,
		"lng": -97.109611
	},
	{
		"lat": 48.091224,
		"lng": -97.109704
	},
	{
		"lat": 48.091332,
		"lng": -97.109801
	},
	{
		"lat": 48.091395,
		"lng": -97.109857
	},
	{
		"lat": 48.091469,
		"lng": -97.109824
	},
	{
		"lat": 48.091502,
		"lng": -97.109808
	},
	{
		"lat": 48.091554,
		"lng": -97.109786
	},
	{
		"lat": 48.091604,
		"lng": -97.109762
	},
	{
		"lat": 48.091638,
		"lng": -97.109747
	},
	{
		"lat": 48.092512,
		"lng": -97.109521
	},
	{
		"lat": 48.092873,
		"lng": -97.108894
	},
	{
		"lat": 48.093025,
		"lng": -97.108368
	},
	{
		"lat": 48.093447,
		"lng": -97.106913
	},
	{
		"lat": 48.093806,
		"lng": -97.104027
	},
	{
		"lat": 48.094084,
		"lng": -97.103195
	},
	{
		"lat": 48.094503,
		"lng": -97.102558
	},
	{
		"lat": 48.094882,
		"lng": -97.102303
	},
	{
		"lat": 48.095248,
		"lng": -97.102058
	},
	{
		"lat": 48.095896,
		"lng": -97.101876
	},
	{
		"lat": 48.096694,
		"lng": -97.102249
	},
	{
		"lat": 48.096805,
		"lng": -97.102389
	},
	{
		"lat": 48.097276,
		"lng": -97.102983
	},
	{
		"lat": 48.097901,
		"lng": -97.104183
	},
	{
		"lat": 48.098607,
		"lng": -97.106086
	},
	{
		"lat": 48.098623,
		"lng": -97.106126
	},
	{
		"lat": 48.099157,
		"lng": -97.107429
	},
	{
		"lat": 48.099342,
		"lng": -97.107757
	},
	{
		"lat": 48.099509,
		"lng": -97.108051
	},
	{
		"lat": 48.099672,
		"lng": -97.108239
	},
	{
		"lat": 48.099857,
		"lng": -97.108438
	},
	{
		"lat": 48.099867,
		"lng": -97.108448
	},
	{
		"lat": 48.100257,
		"lng": -97.108691
	},
	{
		"lat": 48.100759,
		"lng": -97.108817
	},
	{
		"lat": 48.101616,
		"lng": -97.108959
	},
	{
		"lat": 48.102726,
		"lng": -97.108895
	},
	{
		"lat": 48.103778,
		"lng": -97.109097
	},
	{
		"lat": 48.104723,
		"lng": -97.109535
	},
	{
		"lat": 48.105254,
		"lng": -97.110336
	},
	{
		"lat": 48.105558,
		"lng": -97.110794
	},
	{
		"lat": 48.105913,
		"lng": -97.11147
	},
	{
		"lat": 48.106145,
		"lng": -97.112417
	},
	{
		"lat": 48.106152,
		"lng": -97.112545
	},
	{
		"lat": 48.106188,
		"lng": -97.113194
	},
	{
		"lat": 48.106042,
		"lng": -97.114874
	},
	{
		"lat": 48.105804,
		"lng": -97.115888
	},
	{
		"lat": 48.105619,
		"lng": -97.116938
	},
	{
		"lat": 48.10551,
		"lng": -97.118109
	},
	{
		"lat": 48.105383,
		"lng": -97.119735
	},
	{
		"lat": 48.105381,
		"lng": -97.119773
	},
	{
		"lat": 48.105592,
		"lng": -97.120841
	},
	{
		"lat": 48.10589,
		"lng": -97.12182
	},
	{
		"lat": 48.106001,
		"lng": -97.122063
	},
	{
		"lat": 48.106112,
		"lng": -97.1223
	},
	{
		"lat": 48.106238,
		"lng": -97.122568
	},
	{
		"lat": 48.106506,
		"lng": -97.122981
	},
	{
		"lat": 48.10665,
		"lng": -97.123202
	},
	{
		"lat": 48.107218,
		"lng": -97.123484
	},
	{
		"lat": 48.107781,
		"lng": -97.123614
	},
	{
		"lat": 48.108004,
		"lng": -97.123666
	},
	{
		"lat": 48.109497,
		"lng": -97.123135
	},
	{
		"lat": 48.11067,
		"lng": -97.122166
	},
	{
		"lat": 48.110848,
		"lng": -97.12202
	},
	{
		"lat": 48.112281,
		"lng": -97.12104
	},
	{
		"lat": 48.113365,
		"lng": -97.120592
	},
	{
		"lat": 48.114987,
		"lng": -97.120702
	},
	{
		"lat": 48.115857,
		"lng": -97.12106
	},
	{
		"lat": 48.116925,
		"lng": -97.121586
	},
	{
		"lat": 48.119461,
		"lng": -97.123384
	},
	{
		"lat": 48.122182,
		"lng": -97.125313
	},
	{
		"lat": 48.122205,
		"lng": -97.12533
	},
	{
		"lat": 48.122235,
		"lng": -97.125351
	},
	{
		"lat": 48.12225,
		"lng": -97.1254
	},
	{
		"lat": 48.12226,
		"lng": -97.125428
	},
	{
		"lat": 48.122324,
		"lng": -97.125626
	},
	{
		"lat": 48.122656,
		"lng": -97.125802
	},
	{
		"lat": 48.12326,
		"lng": -97.126124
	},
	{
		"lat": 48.124125,
		"lng": -97.126752
	},
	{
		"lat": 48.124277,
		"lng": -97.126862
	},
	{
		"lat": 48.124577,
		"lng": -97.127004
	},
	{
		"lat": 48.124637,
		"lng": -97.12703
	},
	{
		"lat": 48.124983,
		"lng": -97.127178
	},
	{
		"lat": 48.125771,
		"lng": -97.127572
	},
	{
		"lat": 48.126035,
		"lng": -97.127704
	},
	{
		"lat": 48.127185,
		"lng": -97.128279
	},
	{
		"lat": 48.129,
		"lng": -97.128882
	},
	{
		"lat": 48.130458,
		"lng": -97.129
	},
	{
		"lat": 48.130804,
		"lng": -97.129028
	},
	{
		"lat": 48.131991,
		"lng": -97.129245
	},
	{
		"lat": 48.132144,
		"lng": -97.129272
	},
	{
		"lat": 48.132374,
		"lng": -97.129314
	},
	{
		"lat": 48.132603,
		"lng": -97.129356
	},
	{
		"lat": 48.132757,
		"lng": -97.129384
	},
	{
		"lat": 48.133133,
		"lng": -97.129453
	},
	{
		"lat": 48.133962,
		"lng": -97.130041
	},
	{
		"lat": 48.133975,
		"lng": -97.130051
	},
	{
		"lat": 48.134984,
		"lng": -97.131451
	},
	{
		"lat": 48.135789,
		"lng": -97.132374
	},
	{
		"lat": 48.136504,
		"lng": -97.133238
	},
	{
		"lat": 48.136606,
		"lng": -97.133277
	},
	{
		"lat": 48.137101,
		"lng": -97.133468
	},
	{
		"lat": 48.137436,
		"lng": -97.133016
	},
	{
		"lat": 48.137554,
		"lng": -97.132733
	},
	{
		"lat": 48.137607,
		"lng": -97.132601
	},
	{
		"lat": 48.137641,
		"lng": -97.13252
	},
	{
		"lat": 48.137599,
		"lng": -97.132185
	},
	{
		"lat": 48.137582,
		"lng": -97.132045
	},
	{
		"lat": 48.137572,
		"lng": -97.13198
	},
	{
		"lat": 48.137507,
		"lng": -97.131737
	},
	{
		"lat": 48.137263,
		"lng": -97.13082
	},
	{
		"lat": 48.137182,
		"lng": -97.130515
	},
	{
		"lat": 48.137132,
		"lng": -97.130328
	},
	{
		"lat": 48.136855,
		"lng": -97.129506
	},
	{
		"lat": 48.13667,
		"lng": -97.128954
	},
	{
		"lat": 48.136193,
		"lng": -97.127652
	},
	{
		"lat": 48.136056,
		"lng": -97.126705
	},
	{
		"lat": 48.13606,
		"lng": -97.126451
	},
	{
		"lat": 48.136077,
		"lng": -97.125392
	},
	{
		"lat": 48.136078,
		"lng": -97.125351
	},
	{
		"lat": 48.136099,
		"lng": -97.125267
	},
	{
		"lat": 48.136193,
		"lng": -97.124898
	},
	{
		"lat": 48.136225,
		"lng": -97.124775
	},
	{
		"lat": 48.136372,
		"lng": -97.124194
	},
	{
		"lat": 48.136384,
		"lng": -97.124149
	},
	{
		"lat": 48.136969,
		"lng": -97.123093
	},
	{
		"lat": 48.136996,
		"lng": -97.123044
	},
	{
		"lat": 48.13702,
		"lng": -97.12303
	},
	{
		"lat": 48.137413,
		"lng": -97.122796
	},
	{
		"lat": 48.137492,
		"lng": -97.12275
	},
	{
		"lat": 48.137935,
		"lng": -97.122503
	},
	{
		"lat": 48.138091,
		"lng": -97.122416
	},
	{
		"lat": 48.138352,
		"lng": -97.122369
	},
	{
		"lat": 48.138597,
		"lng": -97.122326
	},
	{
		"lat": 48.139066,
		"lng": -97.122382
	},
	{
		"lat": 48.139563,
		"lng": -97.122741
	},
	{
		"lat": 48.13975,
		"lng": -97.122876
	},
	{
		"lat": 48.139875,
		"lng": -97.12305
	},
	{
		"lat": 48.139964,
		"lng": -97.123174
	},
	{
		"lat": 48.140178,
		"lng": -97.123475
	},
	{
		"lat": 48.14023,
		"lng": -97.123549
	},
	{
		"lat": 48.140319,
		"lng": -97.123675
	},
	{
		"lat": 48.14042,
		"lng": -97.123816
	},
	{
		"lat": 48.140548,
		"lng": -97.123992
	},
	{
		"lat": 48.140649,
		"lng": -97.124279
	},
	{
		"lat": 48.140708,
		"lng": -97.124444
	},
	{
		"lat": 48.140758,
		"lng": -97.124582
	},
	{
		"lat": 48.14085,
		"lng": -97.124836
	},
	{
		"lat": 48.140924,
		"lng": -97.124993
	},
	{
		"lat": 48.140987,
		"lng": -97.125127
	},
	{
		"lat": 48.141091,
		"lng": -97.125351
	},
	{
		"lat": 48.14152,
		"lng": -97.126626
	},
	{
		"lat": 48.141697,
		"lng": -97.127645
	},
	{
		"lat": 48.141714,
		"lng": -97.127741
	},
	{
		"lat": 48.14201,
		"lng": -97.129419
	},
	{
		"lat": 48.142392,
		"lng": -97.131914
	},
	{
		"lat": 48.142978,
		"lng": -97.134753
	},
	{
		"lat": 48.143079,
		"lng": -97.135403
	},
	{
		"lat": 48.143292,
		"lng": -97.136768
	},
	{
		"lat": 48.143237,
		"lng": -97.137911
	},
	{
		"lat": 48.14321,
		"lng": -97.13801
	},
	{
		"lat": 48.142994,
		"lng": -97.138807
	},
	{
		"lat": 48.142862,
		"lng": -97.139301
	},
	{
		"lat": 48.142206,
		"lng": -97.140708
	},
	{
		"lat": 48.141987,
		"lng": -97.141062
	},
	{
		"lat": 48.141673,
		"lng": -97.141572
	},
	{
		"lat": 48.141588,
		"lng": -97.141783
	},
	{
		"lat": 48.14152,
		"lng": -97.141946
	},
	{
		"lat": 48.141413,
		"lng": -97.142204
	},
	{
		"lat": 48.141315,
		"lng": -97.142434
	},
	{
		"lat": 48.141246,
		"lng": -97.142597
	},
	{
		"lat": 48.141236,
		"lng": -97.142623
	},
	{
		"lat": 48.141212,
		"lng": -97.142674
	},
	{
		"lat": 48.141188,
		"lng": -97.142792
	},
	{
		"lat": 48.140997,
		"lng": -97.143569
	},
	{
		"lat": 48.141031,
		"lng": -97.144206
	},
	{
		"lat": 48.141051,
		"lng": -97.144461
	},
	{
		"lat": 48.141054,
		"lng": -97.144493
	},
	{
		"lat": 48.141294,
		"lng": -97.145464
	},
	{
		"lat": 48.141649,
		"lng": -97.146122
	},
	{
		"lat": 48.14222,
		"lng": -97.146505
	},
	{
		"lat": 48.143203,
		"lng": -97.146667
	},
	{
		"lat": 48.144055,
		"lng": -97.146531
	},
	{
		"lat": 48.145104,
		"lng": -97.145887
	},
	{
		"lat": 48.146212,
		"lng": -97.145005
	},
	{
		"lat": 48.146238,
		"lng": -97.144984
	},
	{
		"lat": 48.146575,
		"lng": -97.144717
	},
	{
		"lat": 48.14742,
		"lng": -97.143666
	},
	{
		"lat": 48.147476,
		"lng": -97.143594
	},
	{
		"lat": 48.147786,
		"lng": -97.143309
	},
	{
		"lat": 48.147993,
		"lng": -97.14313
	},
	{
		"lat": 48.148544,
		"lng": -97.142659
	},
	{
		"lat": 48.148659,
		"lng": -97.142561
	},
	{
		"lat": 48.150033,
		"lng": -97.141321
	},
	{
		"lat": 48.150143,
		"lng": -97.141189
	},
	{
		"lat": 48.15061,
		"lng": -97.140634
	},
	{
		"lat": 48.150824,
		"lng": -97.140378
	},
	{
		"lat": 48.150894,
		"lng": -97.140295
	},
	{
		"lat": 48.151335,
		"lng": -97.139518
	},
	{
		"lat": 48.1515,
		"lng": -97.139228
	},
	{
		"lat": 48.151529,
		"lng": -97.139176
	},
	{
		"lat": 48.152236,
		"lng": -97.137118
	},
	{
		"lat": 48.152421,
		"lng": -97.136457
	},
	{
		"lat": 48.153433,
		"lng": -97.132862
	},
	{
		"lat": 48.154251,
		"lng": -97.130525
	},
	{
		"lat": 48.155133,
		"lng": -97.128162
	},
	{
		"lat": 48.155145,
		"lng": -97.128133
	},
	{
		"lat": 48.155923,
		"lng": -97.126343
	},
	{
		"lat": 48.156188,
		"lng": -97.12541
	},
	{
		"lat": 48.156205,
		"lng": -97.12535
	},
	{
		"lat": 48.15655,
		"lng": -97.124481
	},
	{
		"lat": 48.156966,
		"lng": -97.123742
	},
	{
		"lat": 48.157021,
		"lng": -97.123646
	},
	{
		"lat": 48.157682,
		"lng": -97.122551
	},
	{
		"lat": 48.158226,
		"lng": -97.121713
	},
	{
		"lat": 48.158725,
		"lng": -97.121165
	},
	{
		"lat": 48.159086,
		"lng": -97.12102
	},
	{
		"lat": 48.159552,
		"lng": -97.120968
	},
	{
		"lat": 48.160738,
		"lng": -97.121035
	},
	{
		"lat": 48.161076,
		"lng": -97.121157
	},
	{
		"lat": 48.161102,
		"lng": -97.121167
	},
	{
		"lat": 48.161478,
		"lng": -97.121467
	},
	{
		"lat": 48.161677,
		"lng": -97.121857
	},
	{
		"lat": 48.162048,
		"lng": -97.122447
	},
	{
		"lat": 48.162122,
		"lng": -97.122635
	},
	{
		"lat": 48.162266,
		"lng": -97.122998
	},
	{
		"lat": 48.16241,
		"lng": -97.123361
	},
	{
		"lat": 48.162457,
		"lng": -97.123534
	},
	{
		"lat": 48.162506,
		"lng": -97.123704
	},
	{
		"lat": 48.16262,
		"lng": -97.1241
	},
	{
		"lat": 48.162627,
		"lng": -97.124131
	},
	{
		"lat": 48.162775,
		"lng": -97.124759
	},
	{
		"lat": 48.16282,
		"lng": -97.125351
	},
	{
		"lat": 48.162748,
		"lng": -97.127392
	},
	{
		"lat": 48.162515,
		"lng": -97.128552
	},
	{
		"lat": 48.161929,
		"lng": -97.13056
	},
	{
		"lat": 48.161472,
		"lng": -97.131967
	},
	{
		"lat": 48.161423,
		"lng": -97.132116
	},
	{
		"lat": 48.161387,
		"lng": -97.13223
	},
	{
		"lat": 48.161234,
		"lng": -97.132547
	},
	{
		"lat": 48.161166,
		"lng": -97.132689
	},
	{
		"lat": 48.160804,
		"lng": -97.133441
	},
	{
		"lat": 48.160295,
		"lng": -97.134502
	},
	{
		"lat": 48.159936,
		"lng": -97.135782
	},
	{
		"lat": 48.159771,
		"lng": -97.136376
	},
	{
		"lat": 48.15974,
		"lng": -97.136593
	},
	{
		"lat": 48.15969,
		"lng": -97.136941
	},
	{
		"lat": 48.159616,
		"lng": -97.137463
	},
	{
		"lat": 48.15954,
		"lng": -97.137985
	},
	{
		"lat": 48.159491,
		"lng": -97.138333
	},
	{
		"lat": 48.159478,
		"lng": -97.138419
	},
	{
		"lat": 48.159459,
		"lng": -97.13856
	},
	{
		"lat": 48.159478,
		"lng": -97.138679
	},
	{
		"lat": 48.159493,
		"lng": -97.138766
	},
	{
		"lat": 48.159755,
		"lng": -97.140347
	},
	{
		"lat": 48.159763,
		"lng": -97.140378
	},
	{
		"lat": 48.160202,
		"lng": -97.14195
	},
	{
		"lat": 48.161065,
		"lng": -97.143138
	},
	{
		"lat": 48.16249,
		"lng": -97.144242
	},
	{
		"lat": 48.162491,
		"lng": -97.144242
	},
	{
		"lat": 48.163288,
		"lng": -97.144384
	},
	{
		"lat": 48.164092,
		"lng": -97.144575
	},
	{
		"lat": 48.164672,
		"lng": -97.144714
	},
	{
		"lat": 48.165253,
		"lng": -97.144852
	},
	{
		"lat": 48.165758,
		"lng": -97.144973
	},
	{
		"lat": 48.166264,
		"lng": -97.145093
	},
	{
		"lat": 48.16628,
		"lng": -97.145097
	},
	{
		"lat": 48.166706,
		"lng": -97.145199
	},
	{
		"lat": 48.167465,
		"lng": -97.145426
	},
	{
		"lat": 48.168583,
		"lng": -97.146331
	},
	{
		"lat": 48.170572,
		"lng": -97.14751
	},
	{
		"lat": 48.172276,
		"lng": -97.147511
	},
	{
		"lat": 48.172407,
		"lng": -97.147511
	},
	{
		"lat": 48.172631,
		"lng": -97.147295
	},
	{
		"lat": 48.172947,
		"lng": -97.14699
	},
	{
		"lat": 48.173004,
		"lng": -97.146934
	},
	{
		"lat": 48.173178,
		"lng": -97.146768
	},
	{
		"lat": 48.173197,
		"lng": -97.146751
	},
	{
		"lat": 48.173223,
		"lng": -97.146703
	},
	{
		"lat": 48.173596,
		"lng": -97.14604
	},
	{
		"lat": 48.17397,
		"lng": -97.145378
	},
	{
		"lat": 48.174046,
		"lng": -97.145243
	},
	{
		"lat": 48.174106,
		"lng": -97.144871
	},
	{
		"lat": 48.174207,
		"lng": -97.144251
	},
	{
		"lat": 48.174308,
		"lng": -97.143631
	},
	{
		"lat": 48.174338,
		"lng": -97.143444
	},
	{
		"lat": 48.174501,
		"lng": -97.141732
	},
	{
		"lat": 48.174656,
		"lng": -97.13895
	},
	{
		"lat": 48.175357,
		"lng": -97.137131
	},
	{
		"lat": 48.175693,
		"lng": -97.136676
	},
	{
		"lat": 48.175763,
		"lng": -97.136582
	},
	{
		"lat": 48.176043,
		"lng": -97.136415
	},
	{
		"lat": 48.17674,
		"lng": -97.13601
	},
	{
		"lat": 48.177036,
		"lng": -97.136008
	},
	{
		"lat": 48.177678,
		"lng": -97.136001
	},
	{
		"lat": 48.178321,
		"lng": -97.135995
	},
	{
		"lat": 48.178897,
		"lng": -97.135994
	},
	{
		"lat": 48.180866,
		"lng": -97.13668
	},
	{
		"lat": 48.181173,
		"lng": -97.137044
	},
	{
		"lat": 48.181664,
		"lng": -97.137626
	},
	{
		"lat": 48.182154,
		"lng": -97.138208
	},
	{
		"lat": 48.182304,
		"lng": -97.138386
	},
	{
		"lat": 48.182386,
		"lng": -97.13867
	},
	{
		"lat": 48.182518,
		"lng": -97.139124
	},
	{
		"lat": 48.182649,
		"lng": -97.139577
	},
	{
		"lat": 48.182942,
		"lng": -97.140601
	},
	{
		"lat": 48.183013,
		"lng": -97.141382
	},
	{
		"lat": 48.182762,
		"lng": -97.14324
	},
	{
		"lat": 48.18233,
		"lng": -97.145547
	},
	{
		"lat": 48.182058,
		"lng": -97.146768
	},
	{
		"lat": 48.182433,
		"lng": -97.148458
	},
	{
		"lat": 48.183498,
		"lng": -97.14981
	},
	{
		"lat": 48.185374,
		"lng": -97.149766
	},
	{
		"lat": 48.185824,
		"lng": -97.149755
	},
	{
		"lat": 48.186382,
		"lng": -97.149155
	},
	{
		"lat": 48.186672,
		"lng": -97.148827
	},
	{
		"lat": 48.187144,
		"lng": -97.148292
	},
	{
		"lat": 48.187617,
		"lng": -97.147758
	},
	{
		"lat": 48.187842,
		"lng": -97.147503
	},
	{
		"lat": 48.188734,
		"lng": -97.146105
	},
	{
		"lat": 48.189471,
		"lng": -97.144921
	},
	{
		"lat": 48.190996,
		"lng": -97.142922
	},
	{
		"lat": 48.191223,
		"lng": -97.142702
	},
	{
		"lat": 48.191307,
		"lng": -97.142615
	},
	{
		"lat": 48.192518,
		"lng": -97.141518
	},
	{
		"lat": 48.193321,
		"lng": -97.141383
	},
	{
		"lat": 48.193602,
		"lng": -97.141233
	},
	{
		"lat": 48.193987,
		"lng": -97.141082
	},
	{
		"lat": 48.194059,
		"lng": -97.141053
	},
	{
		"lat": 48.194133,
		"lng": -97.141024
	},
	{
		"lat": 48.194279,
		"lng": -97.140967
	},
	{
		"lat": 48.194426,
		"lng": -97.140911
	},
	{
		"lat": 48.194443,
		"lng": -97.140904
	},
	{
		"lat": 48.195047,
		"lng": -97.13973
	},
	{
		"lat": 48.195471,
		"lng": -97.138359
	},
	{
		"lat": 48.196264,
		"lng": -97.136508
	},
	{
		"lat": 48.197126,
		"lng": -97.135672
	},
	{
		"lat": 48.198277,
		"lng": -97.135911
	},
	{
		"lat": 48.198325,
		"lng": -97.135921
	},
	{
	},
	{
	{