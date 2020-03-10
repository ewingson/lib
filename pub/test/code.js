//to identify links in a given doc and add them to POD (ttl)

function maininit(id, zeile, link, title)
{
    //pseudo-sleep
    for (var n=0; n<25; n++) { console.log ("."); }
    //print line
    console.log("here"+id+" "+zeile+" "+link+" "+title);
    //PATCH INSERT DATA goes here
    //set id variable
    var no = "#" + Math.random() + "_" + id;
    //to examine:
    //writefile name
    let source = 'https://ewingson.solidweb.org/public/eighteenlix.ttl';
    let date = new Date().toISOString();
    //set querytext
    const query = ` INSERT DATA {
    <${no}> a <http://www.w3.org/2002/01/bookmark#Bookmark> ;
    <http://purl.org/dc/terms/title>   """${title}""" ;
    <http://xmlns.com/foaf/0.1/maker>   <https://ewingson.solidweb.org/profile/card#me> ;
    <http://purl.org/dc/terms/created>  "${date}"^^<http://www.w3.org/2001/XMLSchema#dateTime> ;
    <http://www.w3.org/2002/01/bookmark#recalls> <${link}> .
    <> <http://purl.org/dc/terms/references> <${no}> .
    }`
    //to examine:
    //pseudo-sleep
    for (n=0; n<25; n++) { console.log ("."); }
    //fire query
    solid.auth.fetch(source, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/sparql-update' },
        body: query,
        credentials: 'include',
        }).then((ret) => {
        console.log("finished", ret)
        location.reload()
        }).catch(err => {
        console.log("error updating", source, err)
        })
	//pseudo-sleep
        for (n=0; n<25; n++) { console.log ("."); }
}

function Sleep(milliseconds) {
   return new Promise(resolve => setTimeout(resolve, milliseconds));
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
    //onclick
    document.getElementById('btnOpen').onclick = function()
    {
	//open file(name)
        openFile(function(txt)
        {
	    //initialize variables	
            var hit = new Array();
            var id1 = 0;
            var zeile1 = new Array();
            var link1 = new Array();
            var title1 = new Array();
	    //which data ?
            document.getElementById('tbMain').value = txt;
            //console.log (txt);
	    //set source doc code
            var textArea = document.getElementById('tbMain');
	    //line by line
            var line = textArea.value.split("\n");
	    //loop over the lines
            for(var i = 0;i < line.length-1;i++)
            {
                console.log (i+":"+line[i]+line[i].length);
                //await Sleep(200);
                //loop over actual line
                for (var j=0; j<line[i].length; j++)
                {
                    //search for "<a href = \'"
                    var expression=line[i].substr(j,11);
                    if (expression == "<a href = \'") 
                    {
                        //console.log("hit");
                        var anfang = j+11;
			//nested loop for end character
                        for (var k=anfang; k<line[i].length; k++)
                        {
                            if (line[i].substr(k,1) == "\'")
                            {
                                //console.log ("the end");
                                var ende = k;
                                hit[i] = 1;
                                //console.log(hit[i]+":"+line[i].substr(anfang, ende-anfang));
				//suche linktext
                                if (line[i].substr(k+1,1) == ">")
                                {
                                    for (var l=k+2; l<line[i].length; l++)
                                    {
                                        if (line[i].substr(l, 1) == "<")
                                        {
					    //set array variables
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
                //await Sleep(200);
                maininit(m, zeile1[m], link1[m], title1[m]);
                //await Sleep(200);
	    }       
       	});//end function openFile (L43)
    }//end function onclick (L42)	
}//end function execCode (L39)
