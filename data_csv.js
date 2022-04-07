function extractFirstText(str){
  const matches = str.match(/"(.*?)"/);
  return console.log(matches
    ? matches[1]
    : str);
}


function extractAllText(str){
  const re = /"(.*?)"/g;
  const result = [];
  let current;
  while (current = re.exec(str)) {
    result.push(current.pop());
  }
  return result.length > 0
    ? result
    : [str];
}

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}

function null_array(array){
	return array.length > 1;
}

function transpose(a) {

  var w = a.length || 0;
  var h = a[0] instanceof Array ? a[0].length : 0;

  if(h === 0 || w === 0) { return []; }
  var i, j, t = [];

  for(i=0; i<h; i++) {
    t[i] = [];
    for(j=0; j<w; j++) {
      t[i][j] = a[j][i];
    }
  }
  return t;
}

var fileInput = document.getElementById("csv");
var fileName = document.getElementById("fileName");

function displayFileName(){
    fileName.innerText = "Arquivo: " + fileInput.files[0].name;
}
fileInput.addEventListener('change', displayFileName);

// READ FILE AND WRITE IN A DIV
var button = document.getElementById("button_graph");
var result = [];
var lines = [];
var elements = [];
readFile = function () {
    var reader = new FileReader();
    reader.onload = function () {

        document.getElementById("interest_data").style.display="flex";
        button.style.display = "flex";
        result = reader.result;
        // result = result.replaceAll(" ", "");
        result = result.replaceAll("\\", "");
        // result = result.replaceAll('"', "");
        result = result.split("\n");
        var str = "";

        for(var c=0; c<result.length; c++){
                if (c==0) {
                    
                    if(extractAllText(result[c]).length > 1){
                        elements = extractAllText(result[c]);
                    }else{
                        elements = result[c].split(',');
                    }

                    elements = elements.filter(function (el) {
                      return el != "";
                    });
                    // console.log(elements);

                }else{
                    if(extractAllText(result[c-1]).length > 1){
        		      elements = extractAllText(result[c-1]);
                    }
                    else{
                        elements = result[c-1].split(',');
                    }

                    elements = elements.filter(function (el) {
                      return el != "";
                    });
                }
        		lines[c] = new Array(elements.length+1);
            	lines[c] = [];
                if(c==0){
                    lines[c][0] = "";
                    for (var i = 0; i < elements.length; i++) {
                        lines[c].push(String(i+1));
                    }
                }else{
                    if (c+1<result.length) {
                        lines[c][0] = String(c);
                    }
                    for (var i = 0; i < elements.length; i++) {
                        lines[c].push(elements[i]);
                    }
                }
        }

        var text1 = "";
        lines = lines.filter(null_array);
        for(var i=0; i<lines.length; i++){
        	text1 = text1 + '<div class="row" id="row'+String(i)+'">' + lines[i] + '</div>';
        }
        var columns = [];
        columns = transpose(lines);
        var text = "";
        for(var i=0; i<columns.length; i++){
        	text = text + '<div class="column" id="column'+String(i)+'">' + columns[i] + '</div>';
        }

        text = decode_utf8(text);
        text1 = decode_utf8(text1);

        document.getElementById("data").innerHTML = text1+text;

        str = '<table id="result">';
        for (var i=0; i<lines.length; i++){
            if(i==0){
                str = str + "<tr>";
            }else{
                str = str + "<tr>";    
            }
        	
        	for (var j=0; j<lines[i].length; j++){
                if ((j!=0 && i!=0) || (j==0 && i==0)){
                    str = str + "<td>" + String(lines[i][j]) + "</td>";    
                }
                else if(j==0){
                    str = str + "<td class='indexRow marked' onclick='mark_line(this)'>" + String(lines[i][j]) + "</td>";    
                }else if (i==0){
                    str = str + "<td class='indexColumn marked' onclick='mark_line(this)'>" + String(lines[i][j]) + "</td>";    
                }
        		
        	}
        	str = str + "</tr>";
        }
        str = str.replaceAll(",", ", ");
        str = decode_utf8(str);

        document.getElementById('dataset').innerHTML = str;
    }
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(fileInput.files[0]);
};

// button.addEventListener('click', readFile);

fileInput.addEventListener('change', readFile);