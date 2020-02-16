//to identify links in a given doc and add them to POD (ttl)

function maininit(id, zeile, link, title)
{
console.log("here"+id+" "+zeile+" "+link+" "+title);
//PATCH INSERT DATA goes here
}

function openFile(callBack)
{
    var element = document.createElement('input');
    element.setAttribute('type', "file");
    element.setAttribute('id', "btnOpenFile");
    element.onchange = function()
    {
        readText(this,callBack);
        document.body.removeChild(this);
    }//end function onchange (L6)

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
}//end function openFile (L2)

function readText(filePath,callBack)
{
    var reader;
    if (window.File && window.FileReader && window.FileList && window.Blob)
    {
        reader = new FileReader();
    }
    else
    {
        alert('file APIs not supported. case fallback.');
        return false;
    }//end else
    var output = ""; //placeholder for text output
    if(filePath.files && filePath.files[0])
    {           
        reader.onload = function (e)
        {
            output = e.target.result;
            callBack(output);
        };//end function onload() (L27)
        reader.readAsText(filePath.files[0]);
    }//end if html5 filelist support
    else
    { //this is where you could fallback to Java Applet, Flash or similar
        return false;
    }//end else      
    return true;
}//end function readText (L17)

function execCode()
{
    console.log ("start of code");
    document.getElementById('btnOpen').onclick = function()
    {
        openFile(function(txt)
        {
            var hit = new Array();
            var id1 = 0;
            var zeile1 = new Array();
            var link1 = new Array();
            var title1 = new Array();
            document.getElementById('tbMain').value = txt;
            //console.log (txt);
            var textArea = document.getElementById('tbMain');
            var line = textArea.value.split("\n");
            for(var i = 0;i < line.length-1;i++)
            {
                console.log (i+":"+line[i]+line[i].length);

                for (var j=0; j<line[i].length; j++)
                {
                    //search for "<a href = \'"
                    var expression=line[i].substr(j,11);
                    if (expression == "<a href = \'") 
                    {
                        //console.log("hit");
                        var anfang = j+11;
                        for (var k=anfang; k<line[i].length; k++)
                        {
                            if (line[i].substr(k,1) == "\'")
                            {
                                //console.log ("the end");
                                var ende = k;
                                hit[i] = 1;
                                //console.log(hit[i]+":"+line[i].substr(anfang, ende-anfang));
                                if (line[i].substr(k+1,1) == ">")
                                {
                                    for (var l=k+2; l<line[i].length; l++)
                                    {
                                        if (line[i].substr(l, 1) == "<")
                                        {
                                            id1 += 1;
                                            title1[id1] = line[i].substr(k+2, l-(k+2));
                                            link1[id1] = line[i].substr(anfang, ende-anfang);
                                            zeile1[id1] = i;
                                            //console.log(line[i].substr(k+2, l-(k+2)));
                                            break;
                                        }
                                    }
                                }
                                break;
                            }//end if k
                            else { hit[i] = 0; }
                        }//end for k
                    }//end if expression
				
                }//end for j
            }//end for i
            var laenge = id1;
            for (var m = 1; m<laenge+1; m++)
            {
                console.log (m);
                console.log (zeile1[m]);
                console.log (link1[m]);
                console.log (title1[m]);

                maininit(m, zeile1[m], link1[m], title1[m]);
	    }       
       	});//end function openFile (L43)
    }//end function onclick (L42)	
}//end function execCode (L39)
