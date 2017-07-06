function geoWatchMe() {
  var output = document.getElementById("out"); 
  var uname = document.getElementById("username").value;
  var watchId = document.getElementById("watchId");
  var evtId = document.getElementById("evtId").value;

  var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 30000, 
  timeout           : 27000
  };
  
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
	
	watchId.value = id;
	    
    //var name = "'.$_SESSION['name'].'";

    output.innerHTML = '<p>User is ' + uname + '<p>Race is ' + evtId +'<p>WatchID is ' + id + '<br>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    //var img = new Image();
    //img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    //output.appendChild(img);
    
    
    
        $.post("write_file.php",
        {
          name : uname,
          lon: longitude,
          lat: latitude,
          evtid: evtId
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
