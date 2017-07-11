function geoFindMe() {
  var output = document.getElementById("out");
  var lat = document.getElementById("latitude");
  var lon = document.getElementById("longitude");
  var ts = document.getElementById("timestamp");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
	var timestamp = new Date(position.timestamp);

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
	lat.value = latitude;
	lon.value = longitude;
	ts.value = timestamp;

    //var img = new Image();
    //img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    //output.appendChild(img);
	
	$.post("https://86.238.111.97/write_file.php",
        {
          //name : device.uuid,
		  name : "LFG",
          lon: longitude,
          lat: latitude,
          evtid: timestamp
        },
        function(uname,status){
            alert("Data: " + uname + "\nStatus: " + status);
        })
		.fail(function(response) {
             alert('Error: ' + response.responseText);
             });
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}
