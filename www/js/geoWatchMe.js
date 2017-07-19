function geoWatchMe() {
  var output = document.getElementById("out");
  var lat = document.getElementById("latitude");
  var lon = document.getElementById("longitude");
  var ts = document.getElementById("timestamp");
  var watchId = document.getElementById("watchId");

  var geo_options = {
  enableHighAccuracy: true, 
  //ms
  maximumAge        : 0, 
  //ms
  timeout           : 512 * 24 * 60 * 60 * 1000
  };
  
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
	var timestamp = new Date(position.timestamp);
	
	watchId.value = id;
	    
    //var name = "'.$_SESSION['name'].'";

    output.innerHTML = '<p>WatchID is ' + id + '<br>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
	
	lat.value = latitude;
	lon.value = longitude;
	ts.value = timestamp;

    //var img = new Image();
    //img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    //output.appendChild(img);
    
    
    
        $.post("http://86.238.111.97:8080/write_file.php",
        {
          name : device.uuid,
          lon: longitude,
          lat: latitude,
		  ts: timestamp,
          evtid: "WATCH"
        },
        function(uname,status){
           // alert("Data: " + uname + "\nStatus: " + status);
        });
    

    
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating</p>";

  //navigator.geolocation.getCurrentPosition(success, error);
  
  id = navigator.geolocation.watchPosition(success, error, geo_options);
}
