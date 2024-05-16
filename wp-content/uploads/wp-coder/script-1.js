// File Upload
//
function ekUpload(){
  function Init() {

    console.log("Upload Initialised");

    var fileSelect    = document.getElementById('file-upload'),
        fileDrag      = document.getElementById('file-drag'),
        submitButton  = document.getElementById('submit-button');

    fileSelect.addEventListener('change', fileSelectHandler, false);

    // Is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
      // File Drop
      fileDrag.addEventListener('dragover', fileDragHover, false);
      fileDrag.addEventListener('dragleave', fileDragHover, false);
      fileDrag.addEventListener('drop', fileSelectHandler, false);
    }
  }

  function fileDragHover(e) {
    var fileDrag = document.getElementById('file-drag');

    e.stopPropagation();
    e.preventDefault();

    fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
  }

  function fileSelectHandler(e) {
    // Fetch FileList object
    var files = e.target.files || e.dataTransfer.files;

    // Cancel event and hover styling
    fileDragHover(e);

    // Process all File objects
    for (var i = 0, f; f = files[i]; i++) {
      parseFile(f);
      uploadFile(f);
    }
  }

  // Output
  function output(msg) {
    // Response
    var m = document.getElementById('messages');
    m.innerHTML = msg;
  }

  function parseFile(file) {

    console.log(file.name);


    // var fileType = file.type;
    // console.log(fileType);
    var imageName = file.name;

    var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
    if (isGood) {
      document.getElementById('start').classList.add("hidden");
      document.getElementById('response').classList.remove("hidden");
      document.getElementById('notimage').classList.add("hidden");
      // Thumbnail Preview
      document.getElementById('file-image').classList.remove("hidden");
      document.getElementById('file-image').src = URL.createObjectURL(file);
    }
    else {
      document.getElementById('file-image').classList.add("hidden");
      document.getElementById('notimage').classList.remove("hidden");
      document.getElementById('start').classList.remove("hidden");
      document.getElementById('response').classList.add("hidden");
      document.getElementById("file-upload-form").reset();
    }
  }

  async function uploadFile(file) {

    const formData = new FormData();
    formData.append('file', file);

    fetch("https://us-central1-ml-project-apis-336603.cloudfunctions.net/HRecognizer", {
      method: "POST",
      body: formData,
      mode:'cors'
			
	
    }).then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
				console.log(response);
        return;
      }
			

      // Examine the text in the response
      response.text().then(function(data) {
        document.getElementById('prediction').innerText = 'Prediction: '+data
      });
    }
  )
  .catch(function(err) {
		document.getElementById('load_label').innerText = 'Select a file or drag here'
    console.log('Fetch Error :-S', err);
  });

  }

  function setPrediction(data){
    console.log(data)
    document.getElementById('prediction').innerText = 'Prediction: '+data[0]

  }

	function setTimer(secs){
		for(i=0;i<sec;i++){
			setTimeout(() => {console.log("this is the third message "+i)}, 1000);
		}
	}

  // Check for the various File API support.
  if (window.File && window.FileList && window.FileReader) {
		document.getElementById('load_label').innerText = 'Loading... please wait'
		uploadFile(null);
		
    Init();
  } else {
    document.getElementById('file-drag').style.display = 'none';
  }
}
ekUpload();


