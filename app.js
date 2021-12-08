const UCO = {lat: 35.6575, lng: -97.4709};

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
	map = new google.maps.Map(document.getElementById("map"), options)
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

function go() {
	let useHAR = document.getElementById('HAR-toggle').checked;
	let destination = document.getElementById('destination').value;
	
	if (destination == 'Library') {
		// route to library
		if (useHAR) {
			// route to closest HAR node
		} else {
			// route to any closest node
		}
	} else if (destination == 'CS Building') {
		// route to CS Building
		if (useHAR) {
			// route to closest HAR node
		} else {
			// route to any closest node
		}
	} else if (destination == 'NUC') {
		//route to NUC
		if (useHAR) {
			// route to closest HAR node
		} else {
			// route to any closest node
		}
	}
}