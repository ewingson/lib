//to identify links in a given doc and add them to markbook
function openFile(callBack){
  var element = document.createElement('input');
  element.setAttribute('type', "file");
  element.setAttribute('id', "btnOpenFile");
  element.onchange = function(){
      readText(this,callBack);
      document.body.removeChild(this);
      }

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
}

function readText(filePath,callBack) {
    var reader;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
    } else {
        alert('file APIs not supported. case fallback.');
        return false;
    }
    var output = ""; //placeholder for text output
    if(filePath.files && filePath.files[0]) {           
        reader.onload = function (e) {
            output = e.target.result;
            callBack(output);
        };//end onload()
        reader.readAsText(filePath.files[0]);
    }//end if html5 filelist support
    else { //this is where you could fallback to Java Applet, Flash or similar
        return false;
    }       
    return true;
}

function execCode() {
console.log ("start of code");

document.getElementById('btnOpen').onclick = function(){
    openFile(function(txt){
        document.getElementById('tbMain').value = txt;
	//console.log (txt);
	var textArea = document.getElementById('tbMain');
	var line = textArea.value.split("\n");
for(var i = 0;i < line.length-1;i++){
console.log (i+":"+line[i]+line[i].length);
}

    });
}
//build link-array
//SPARQL_markbook
}