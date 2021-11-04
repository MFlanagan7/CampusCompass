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