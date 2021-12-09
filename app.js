// proxy design pattern

function GeoCoder() {

    this.getLatLng = function (location) {

        if (location === "UCO") {
            return {lat: 35.6575, lng: -97.4709};
        } else if (location === "MCS_HAR1") {
            return {lat: 35.65398610414391, lng: -97.47304078722226};
        } else if (location === "MSC_NON_HAR1") {
            return {lat: 35.65424327694166, lng: -97.47289594793779};
        } else if (location === "MSC_NON_HAR2") {
            return {lat: 35.65387386321416, lng: -97.47253116751762};
        } else if (location === "UC_HAR1") {
            return {lat: 35.65438078536891, lng: -97.4714516326025};
        } else if (location === "UC_HAR2") {
            return {lat: 35.6546946216972, lng: -97.47120218716813};
        } else if (location === "UC_HAR3") {
            return {lat: 35.655079734496105, lng: -97.47184606951829};
        } else if (location === "UC_HAR4") {
            return {lat: 35.65564419818894, lng: -97.47177230877114};
        } else if (location === "UC_HAR5") {
            return {lat: 35.65573225141894, lng: -97.47165021187153};
        } else if (location === "UC_HAR6") {
            return {lat: 35.65573007203257, lng: -97.47128543145136};
        } else if (location === "UC_HAR7") {
            return {lat: 35.655348678500296, lng: -97.47122105843604};
        } else if (location === "UC_NON_HAR1") {
            return {lat: 35.65468962019296, lng: -97.47175219220264};
        } else if (location === "UC_NON_HAR2") {
            return {lat: 35.65507950487029, lng: -97.47121061062671};
        } else if (location === "UC_NON_HAR3") {
            return {lat: 35.65556879727545, lng: -97.4718165088278};
        } else if (location === "LIB_HAR1") {
            return {lat: 35.65836414769805, lng: -97.47334064142974};
        } else if (location === "LIB_HAR2") {
            return {lat: 35.657987707399535, lng: -97.47371536172811};
        } else {
            return {lat: 35.6575, lng: -97.4709};
        }
    };
}

function GeoProxy() {
    var geocoder = new GeoCoder();
    var geocache = {};

    return {
        getLatLng: function (location) {
            if (!geocache[location]) {
                geocache[location] = geocoder.getLatLng(location);
            }
            console.log(location + ": " + geocache[location]);
            return geocache[location];
        },
        getCount: function () {
            var count = 0;
            for (var code in geocache) { count++; }
            return count;
        }
    };
}

// global geoProxy object
var geo = new GeoProxy();

// global map api objects
let directionsService;
let directionsRenderer;
let pos;

// global building location array variables
let LibHARs = [geo.getLatLng("LIB_HAR1"), geo.getLatLng("LIB_HAR2")];
let MCSHARs = [geo.getLatLng("MCS_HAR1")];
let MCSnonHARs = [geo.getLatLng("MSC_NON_HAR1"), geo.getLatLng("MSC_NON_HAR2")];
let UCHARs = [geo.getLatLng("UC_HAR1"), geo.getLatLng("UC_HAR2"), geo.getLatLng("UC_HAR3"), geo.getLatLng("UC_HAR4"), 
				geo.getLatLng("UC_HAR5"), geo.getLatLng("UC_HAR6"), geo.getLatLng("UC_HAR7")];
let UCnonHARs = [geo.getLatLng("UC_NON_HAR1"), geo.getLatLng("UC_NON_HAR2"), geo.getLatLng("UC_NON_HAR3")];

// default map center
UCO = geo.getLatLng("UCO");

// log size of cache after populating
console.log("\nCache size: " + geo.getCount());

// initialize google maps
function initMap(){
	infoWindow = new google.maps.InfoWindow();

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
			pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent("Location found.");
			infoWindow.open(map);
			map.setCenter(pos);
			},
			() => {
			handleLocationError(true, infoWindow, map.getCenter());
			}
		);
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}

	var options = {
		center: UCO,
		zoom: 17,
		mapTypeControl: true,
		mapTypeControlOptions: {
			  style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			  position: google.maps.ControlPosition.RIGHT_TOP,
		},
		zoomControl: true,
		zoomControlOptions: {
			  position: google.maps.ControlPosition.LEFT_CENTER,
		},
		scaleControl: true,
		streetViewControl: true,
			streetViewControlOptions: {
			  position: google.maps.ControlPosition.LEFT_TOP,
		},
		fullscreenControl: false
	}
	map = new google.maps.Map(document.getElementById("map"), options);
	directionsService = new google.maps.DirectionsService();
	 directionsRenderer = new google.maps.DirectionsRenderer();
	directionsRenderer.setMap(map);
}

// facade design pattern
function Compass() {
	
	// perform routing via maps api call based on user location and selected destination
	this.routing = function routing(location1, location2) {
		var request = {
			origin: location1,
			destination: location2,
			travelMode: 'WALKING',
		}
		directionsService.route(request, function(result,status) {
			if (status == 'OK') {
				directionsRenderer.setDirections(result);
			  }
			else {
				console.log('Status: ' + status);
				console.log(request);
			}
		});
	}
	
	// determine best node to route to based on user inputs
	this.chooseEntrance = function chooseEntrance(origin,building,HARtoggle) {
		var bestChoice;
		var smallestTotalDifference = 1000;
		var tempDifference;
		if (building == 'NUC') { //route to Nigh University Center
			for (var i = 0; i < UCHARs.length;i++ ) { //search HAR routes for best one
				tempDifference = Math.abs(UCHARs[i].lat - origin.lat) + Math.abs(UCHARs[i].lng - origin.lng);
				if (tempDifference < smallestTotalDifference) {
					smallestTotalDifference = tempDifference;
					bestChoice = UCHARs[i];
				}
			}
			if (!HARtoggle) { //if HAR toggle is off, search nonHARs as well
				for (var i = 0; i < UCnonHARs.length;i++ ) {
					tempDifference = Math.abs(UCnonHARs[i].lat - origin.lat) + Math.abs(UCnonHARs[i].lng - origin.lng);
					if (tempDifference < smallestTotalDifference) {
						smallestTotalDifference = tempDifference;
						bestChoice = UCnonHARs[i];
					}
				}
			}
		}
		else if (building == 'CS Building') { //route to cs building
			for (var i = 0; i < MCSHARs.length;i++ ) { //search HAR routes for best one
				tempDifference = Math.abs(MCSHARs[i].lat - origin.lat) + Math.abs(MCSHARs[i].lng - origin.lng);
				if (tempDifference < smallestTotalDifference) {
					smallestTotalDifference = tempDifference;
					bestChoice = MCSHARs[i];
				}
			}
			if (!HARtoggle) { //if toggle is off, search nonHARs as well
				for (var i = 0; i < MCSnonHARs.length;i++ ) {
					tempDifference = Math.abs(MCSnonHARs[i].lat - origin.lat) + Math.abs(MCSnonHARs[i].lng - origin.lng);
					if (tempDifference < smallestTotalDifference) {
						smallestTotalDifference = tempDifference;
						bestChoice = MCSnonHARs[i];
					}
				}
			}
		}
		else if (building == 'Library') { // route to library, only has HAR available
			for (var i = 0; i < LibHARs.length;i++ ) {
				tempDifference = Math.abs(LibHARs[i].lat - origin.lat) + Math.abs(LibHARs[i].lng - origin.lng);
				if (tempDifference < smallestTotalDifference) {
					smallestTotalDifference = tempDifference;
					bestChoice = LibHARs[i];
				}
			}
		}
		if (bestChoice != null) {
			this.routing(origin, bestChoice);
		}
	}
}

// UI message helper function
function sendMessage(message) {
	const messageDiv = document.getElementById('message-div');
	const HARToggle = document.getElementById('HAR-toggle');
	const destinationDropDown = document.getElementById('destination');
	const goButton = document.getElementById('go-button');

	// disable inputs while animation is taking place
	HARToggle.disabled = true;
	destinationDropDown.disabled = true;
	goButton.disabled = true;

	// add animation class with appropriate message and reset opacity
	messageDiv.classList.remove('run-animation');
	messageDiv.textContent = message;
	messageDiv.style.opacity = '1';
	messageDiv.classList.add('run-animation');

	// delay until after animation is finished
	const delay = 1000;
	setTimeout(function() {
		// after animation has completed, reenable inputs
		HARToggle.disabled = false;
		destinationDropDown.disabled = false;
		goButton.disabled = false;

		// finished with animation, hide the message div
		messageDiv.style.opacity = '0';
		messageDiv.classList.remove('run-animation');
	}, delay);
}

// tying it all together
function go() {
	let useHAR = document.getElementById('HAR-toggle').checked;
	let destination = document.getElementById('destination').value;
	var CampusCompass = new Compass();

	if (!destination)
		sendMessage('Select a destination');
	else
		CampusCompass.chooseEntrance(pos,destination,useHAR);
}
