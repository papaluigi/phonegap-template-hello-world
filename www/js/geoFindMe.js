(function() {
  $(document).ready(function() {
    $('.switch').on('change', function() {
      var isChecked = $('#HighAccuracySwitch').is(':checked');
      var selectedData;

      if(isChecked) {
        selectedData = true;
      } else {
        selectedData = false;
      }

      //alert('Selected data: ' + isChecked);
      document.getElementById("HighAccuracy").value = isChecked;
    });
  });

})();

function geoFindMe() {
  
  //var eHA= document.getElementById("HighAccuracy");	
  //alert(eHA.value);  
  
  var output = document.getElementById("out");
  var lat = document.getElementById("latitude");
  var lon = document.getElementById("longitude");
  var ts = document.getElementById("timestamp");
  
  var geo_options = {
  enableHighAccuracy: document.getElementById("HighAccuracy"), 
  //ms
  maximumAge        : 20 * 1000, 
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

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
	lat.value = latitude;
	lon.value = longitude;
	ts.value = timestamp;

    //var img = new Image();
    //img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    //output.appendChild(img);
	
	/*uploadFileLFG();*/
	
	$.post("http://86.238.111.97:8080/write_file.php",
	/*$.post("http://posttestserver.com/post.php",*/
        {
          name : device.uuid,
		  //name : "LFG",
          lon: longitude,
          lat: latitude,
		  ts: timestamp,
          evtid: "SPOT"
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

  navigator.geolocation.getCurrentPosition(success, error, geo_options);
}
