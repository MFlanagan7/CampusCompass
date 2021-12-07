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
const UC_NON_HAR2 = {lat: 35.65556879727545, lng: -97.4718165088278}; // second floor

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
	messageDiv.classList.remove('run-animation');
	messageDiv.textContent = message;
	messageDiv.style.opacity = '1';
	messageDiv.classList.add('run-animation');
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