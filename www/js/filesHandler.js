function createFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
         alert('File creation successfull!')
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
	
};

function writeFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

         fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
               alert('Write completed.');
            };

            fileWriter.onerror = function(e) {
               alert('Write failed: ' + e.toString());
            };

            var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
            fileWriter.write(blob);
         }, errorCallback);
      }, errorCallback);
   };

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
};

function readFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {}, function(fileEntry) {

         fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
               var txtArea = document.getElementById('textarea');
               txtArea.value = this.result;
            };
            reader.readAsText(file);
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
};

function removeFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

         fileEntry.remove(function() {
            alert('File removed.');
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
};

function uploadFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {}, function(fileEntry) {
	     // !! Assumes variable fileURL contains a valid URL to a text file on the device, 
		var fileURL = fileEntry.toURL();
 
		var success = function (r) {
        console.log("Successful upload...");
        console.log("Code = " + r.responseCode);
		alert("Transfer Successful: " + r.response);
        // displayFileData(fileEntry.fullPath + " (content uploaded to server)"); 
		}
 
		var fail = function (error) {
        alert("An error has occurred: Code = " + error.code);
		}
 
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		options.mimeType = "text/plain";
 
        var latitude = document.getElementById("latitude").value;
		var longitude = document.getElementById("longitude").value;
		var timestamp = document.getElementById("timestamp").value;
 
        //var dt = new Date();
        //var now = dt.getTime();
        //var evt = $(this).serialize();
		//var evtid = $(this).serialize() + '&time=' + now.toString();
 
		var params = {};
		params.name = device.uuid;
		params.lon = longitude;
		params.lat = latitude;
		params.evtid = timestamp;
			
		//params.value1 = "test";
		//params.value2 = "param";
 
		options.params = params;
 
		var ft = new FileTransfer();
		// SERVER must be a URL that can handle the request, like 
		// http://some.server.com/upload.php 
		
		ft.upload(fileURL, encodeURI("http://posttestserver.com/post.php"), success, fail, options);
		}, errorCallback);
   }
   
   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
};

function uploadFileLFG() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {}, function(fileEntry) {
	     // !! Assumes variable fileURL contains a valid URL to a text file on the device, 
		var fileURL = fileEntry.toURL();
 
		var success = function (r) {
        console.log("Successful upload...");
        console.log("Code = " + r.responseCode);
		alert("Transfer Successful: " + r.response);
        // displayFileData(fileEntry.fullPath + " (content uploaded to server)"); 
		}
 
		var fail = function (error) {
        alert("An error has occurred: Code = " + error.code);
		}
 
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		options.mimeType = "text/plain";
		
 
        var latitude = document.getElementById("latitude").value;
		var longitude = document.getElementById("longitude").value;
		var timestamp = document.getElementById("timestamp").value;
 
        //var dt = new Date();
        //var now = dt.getTime();
        //var evt = $(this).serialize();
		//var evtid = $(this).serialize() + '&time=' + now.toString();
 
		var params = {};
		params.name = device.uuid;
		params.lon = longitude;
		params.lat = latitude;
		params.evtid = timestamp;
			
		//params.value1 = "test";
		//params.value2 = "param";
 
		options.params = params;
 
		var ft = new FileTransfer();
		// SERVER must be a URL that can handle the request, like 
		// http://some.server.com/upload.php 
		
		ft.upload(fileURL, encodeURI("http://86.238.111.97:8080/write_file.php"), success, fail, options);
		}, errorCallback);
   }
   
   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
};

function downloadFile() {
   var fileTransfer = new FileTransfer();
   var uri = encodeURI("http://s14.postimg.org/i8qvaxyup/bitcoin1.jpg");
   var fileURL =  "///storage/emulated/0/DCIM/myFile";

   fileTransfer.download(
      uri, fileURL, function(entry) {
         console.log("download complete: " + entry.toURL());
      },
		
      function(error) {
         console.log("download error source " + error.source);
         console.log("download error target " + error.target);
         console.log("download error code" + error.code);
      },
		
      false, {
         headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
         }
      }
   );
}
