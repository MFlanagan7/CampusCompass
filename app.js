const UCO = {lat: 35.6575, lng: -97.4709};

const MCS_HAR1 = {lat: 35.65398610414391, lng: -97.47304078722226};
const MSC_NON_HAR1 = {lat: 35.65424327694166, lng: -97.47289594793779};
const MSC_NON_HAR2 = {lat: 35.65387386321416, lng: -97.47253116751762};

const UC_HAR1 = {lat: 35.65438078536891, lng: -97.4714516326025}; // first floor
const UC_HAR2 = {lat: 35.6546946216972, lng: -97.47120218716813}; // first floor
const UC_HAR3 = {lat: 35.655079734496105, lng: -97.47184606951829}; // first floor
const UC_HAR4 = {lat: 35.65564419818894, lng: -97.47177230877114}; // first floor
const UC_HAR5 = {lat: 35.65573225141894, lng: -97.47165021187153}; // second floor
const UC_HAR6 = {lat: 35.65573007203257, lng: -97.47128543145136}; // second floor
const UC_HAR7 = {lat: 35.655348678500296, lng: -97.47122105843604}; // second floor
const UC_NON_HAR1 = {lat: 35.65468962019296, lng: -97.47175219220264}; // first floor
const UC_NON_HAR2 = {lat: 35.65507950487029, lng: -97.47121061062671}; // first floor
const UC_NON_HAR3 = {lat: 35.65556879727545, lng: -97.4718165088278}; // second floor

let LibHARs = [LIB_HAR1,LIB_HAR2];
let MSCHARs = [MCS_HAR1];
let MSCnonHARs = [MSC_NON_HAR1,MSC_NON_HAR2];
let UCHARs = [UC_HAR1,UC_HAR2,UC_HAR3,UC_HAR4,UC_HAR5,UC_HAR6,UC_HAR7];
let UCnonHARs = [UC_NON_HAR1,UC_NON_HAR2,UC_NON_HAR3];

const LIB_HAR1 = {lat: 35.65836414769805, lng: -97.47334064142974};
const LIB_HAR2 = {lat: 35.657987707399535, lng: -97.47371536172811};

function initMap(){
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
	var directionsService = new google.maps.DirectionsService();
 	var directionsRenderer = new google.maps.DirectionsRenderer();
	directionsRenderer.setMap(map);
}

function sendMessage(message) {
	const messageDiv = document.getElementById('message-div');
	const HARToggle = document.getElementById('HAR-toggle');
	const destinationDropDown = document.getElementById('destination');

	// disable inputs while animation is taking place
	HARToggle.disabled = true;
	destinationDropDown.disabled = true;

	// add animation class with appropriate message and reset opacity
	messageDiv.classList.remove('run-animation');
	messageDiv.textContent = message;
	messageDiv.style.opacity = '1';
	messageDiv.classList.add('run-animation');

	// delay until after animation is finished
	const delay = 3550;
	setTimeout(function() {
		// after animation has completed, reenable inputs
		HARToggle.disabled = false;
		destinationDropDown.disabled = false;

		// finished with animation, hide the message div
		messageDiv.style.opacity = '0';
		messageDiv.classList.remove('run-animation');
	}, delay);
}

function routing(location1, location2) {
	var request = {
		origin: location1,
		destination: location2,
		travelMode: 'WALKING',
	}
	directionsService.route(request, function(result,status) {
		if (status == 'OK') {
			directionsRenderer.setDirections(result);
		  }
	});
}

function chooseEntrance(origin,building,HARtoggle) {
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
		for (var i = 0; i < MSCHARs.length;i++ ) { //search HAR routes for best one
			tempDifference = Math.abs(MSCHARs[i].lat - origin.lat) + Math.abs(MSCHARs[i].lng - origin.lng);
			if (tempDifference < smallestTotalDifference) {
				smallestTotalDifference = tempDifference;
				bestChoice = MSCHARs[i];
			}
		}
		if (!HARtoggle) { //if toggle is off, search nonHARs as well
			for (var i = 0; i < MSCnonHARs.length;i++ ) {
				tempDifference = Math.abs(MSCnonHARs[i].lat - origin.lat) + Math.abs(MSCnonHARs[i].lng - origin.lng);
				if (tempDifference < smallestTotalDifference) {
					smallestTotalDifference = tempDifference;
					bestChoice = MSCnonHARs[i];
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
		routing(origin, bestChoice);
	}
}

function go() {
	let useHAR = document.getElementById('HAR-toggle').checked;
	let destination = document.getElementById('destination').value;
	chooseEntrance(origin,destination,useHAR);
}
