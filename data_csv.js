// all declarations of global variables
function globalDeclarations(){
    window.fileInput = document.getElementById("csv"); // Element DOM: input[type="file"]
    window.fileName = document.getElementById("fileName"); // Div that shows the name of selected file

    window.buttonShowGraph = document.getElementById("button_graph");
    window.divData = document.getElementById("data"); // Div that belongs all information from selected file
    window.divTableData = document.getElementById("dataset"); // Div that shows data preview in a table
}
globalDeclarations(); // execute


/* processCSV is a function that reads, process the data from .csv file and
show the table result at the desired element DOM (4th parameter) */
//* BEGIN FUNCTION **//
async function processCSV(button, fileInput, dataDiv, tableContainer){
      var result = []; // get the raw data from .csv to be separeted in parts
      var lines = []; // get all lines from .csv
      var elements = []; // get all element cell from .csv
      dataDiv.innerHTML = "";

      var reader = new FileReader();
      reader.onload = function () {

          // it allows user sees the button to generate chart
          button.style.display = "flex";
          // it allows user sees the inputs to insert the desired lines and rows from generated data table
          document.getElementById("interest_data").style.display = "flex";


          result = reader.result;
          result = result.replaceAll("\\", ""); // remove all "\\"
          result = result.replaceAll("\r", ""); // remove all "\r"
          result = result.split("\n"); // separeted data in each break-line ("\n")
          // result is now an array that contains all lines from .csv

          var str = ""; // initializing an empty string

          // walk all lines from .csv
          for(var c=0; c<result.length; c++){

                  // at first line *from .csv*
                  if (c==0) {
                      // split line at commas
                      elements = result[c].split(',');
                      // remove all array's indexes that is empty
                      elements = elements.filter(function (el) {
                        return el != "";
                      });
                      // now filling row
                      // create first line of table (line of index columns)
                      lines[0] = new Array(elements.length+1);
                      lines[0] = [];
                      lines[0][0] = ""; // the first cell of first line is empty, it's the intersection between both axis of table
                      // create second line of table (line of label columns)
                      lines[1] = new Array(elements.length+1);
                  	  lines[1] = [];
                      lines[1][0] = "1"; // the first cell of second line of table has the index 1, it's the first line of information from .csv

                      for (var i = 0; i < elements.length; i++) {
                          lines[0].push(String(i+1)); // fill first line with index of columns
                          // lines[1].push(elements[i]); // fill second line with labels (head / first information) from .csv

                          // replace an amount of quotes for only one
                          elements[i].replaceAll("''", "'");
                          elements[i].replaceAll("'''", "'");
                          elements[i].replaceAll('""', '"');
                          elements[i].replaceAll('"""', '"');
                          // if the first character of a cell is a quote and this cell is not the last of the line
                          if ( (i < (elements.length - 1) ) && ( (countChar(elements[i], '"') == 1) || (countChar(elements[i], "'") == 1) ) ) {

                              // ...and if the last character of next cell is a quote, join the previous cell with this one
                              if ( (elements[i+1].indexOf('"') > -1) || (elements[i+1].indexOf("'") > -1) ){
                                  lines[1].push( String(elements[i]) + String(elements[i+1]) );
                                  i = i + 1; // jump to next cell (because i+1 was already used)
                              }

                              else{
                                  var j = i+2; // initial index of search of quote
                                  var found = false; // boolean variable to indicate when quote had been found
                                  while ( (j < elements.length) && (found == false) ) {
                                      // walk cells of line until find a quote as last character
                                      if ( (elements[j].indexOf("'") > -1) || (elements[j].indexOf('"') > -1) ){
                                          found = true; // indicate that quote was found
                                          // variable to join the cells between quotes in only one
                                          var strJoin = ""
                                          var k = i; // k is the initial index of string that will be joined
                                          while (k<=j){ // join all cells between quotes
                                              strJoin = strJoin + String(elements[k]);
                                              k++;
                                          }
                                          lines[1].push(strJoin); // add joined cell to table
                                          i = j; // jump to the last index already analised
                                      }
                                      j++;
                                  }
                              }
                          }else{ // if the first character it's not a quote, just add it to table
                            lines[1].push(elements[i]);
                          }



                      }

                  }else{ // in all other lines

                      // split line at commas
                      elements = result[c].split(',');
                      // remove all array's indexes that is empty
                      elements = elements.filter(function (el) {
                        return el != "";
                      });

                      // now filling row
                      // create an empty array
                      lines[c+1] = new Array(elements.length+1);
                      lines[c+1] = [];
                      // if it's still in table range, fill the first cell of line with index of it
                      if (c+1<result.length) {
                          lines[c+1][0] = String(c+1);
                      }

                      // fill line with data from .csv
                      for (var i = 0; i < elements.length; i++) {

                          // if the first character of a cell is a quote and this cell is not the last of the line
                          if ( (i < elements.length - 1) && ( (countChar(elements[i], '"') > 2) || (countChar(elements[i], "'") > 2) ) ) {

                              // ...and if the last character of next cell is a quote, join the previous cell with this one
                              if ( (elements[i+1].indexOf('"') > -1) || (elements[i+1].indexOf("'") > -1) ){
                                  lines[c+1].push( String( String(elements[i]) + String(elements[i+1]) ) );
                                  i = i + 1; // jump to next cell (because i+1 was already used)
                              }

                              else{
                                  var j = i+2; // initial index of search of quote
                                  var found = false; // boolean variable to indicate when quote had been found
                                  while ( (j < elements.length) && (found == false) ) {
                                      // walk cells of line until find a quote as last character
                                      if ( (elements[j].indexOf("'") > -1) || (elements[j].indexOf('"') > -1) ){
                                          found = true; // indicate that quote was found
                                          // variable to join the cells between quotes in only one
                                          var strJoin = ""
                                          var k = i; // k is the initial index of string that will be joined
                                          while (k<=j){ // join all cells between quotes
                                              strJoin = strJoin + String(elements[k]);
                                              k++;
                                          }
                                          lines[c+1].push(strJoin); // add joined cell to table
                                          i = j; // jump to the last index already analised
                                      }
                                      j++;
                                  }
                              }
                          }else{ // if the first character it's not a quote, just add it to table
                            lines[c+1].push(elements[i]);
                          }

                      }
                  }

          }
          // console.log(lines);

          lines = lines.filter(null_array); // remove empty lines

          for(var i=0; i<lines.length; i++){
            var tempRow = document.createElement("div"); // create div
            tempRow.className = "row"; // add class 'row'
            tempRow.id = "row" + String(i); // add id 'row{i}'  (i - index row)
            tempRow.innerText = decode_utf8(lines[i]); // fill div content with entire line {i}
            dataDiv.appendChild(tempRow); // append div to div of data
          }

          var columns = [];
          columns = transpose(lines);

          for(var i=0; i<columns.length; i++){
            var tempCol = document.createElement("div"); // create div
            tempCol.className = "column"; // add class 'column'
            tempCol.id = "column" + String(i); // add id 'column{i}'  (i - index column)
            tempCol.innerText = decode_utf8(columns[i]); // fill div content with entire column {i}
            dataDiv.appendChild(tempCol); // append div to div of data
          }




          /* BUILDING VISUAL TABLE TO PREVIEW DATA */
          /* begin */
            str = '<table id="result">';
            for (var i=0; i<lines.length; i++){
               str = str + "<tr>";
          	   for (var j=0; j<lines[i].length; j++){
                  if ((j!=0 && i!=0) || (j==0 && i==0)){
                      str = str + "<td>" + String(lines[i][j]) + "</td>";
                  }else if(j==0){
                      str = str + "<td class='indexRow marked' onclick='mark_line(this)'>" + String(lines[i][j]) + "</td>";
                  }else if (i==0){
                      str = str + "<td class='indexColumn marked' onclick='mark_line(this)'>" + String(lines[i][j]) + "</td>";
                  }
          	   }
          	   str = str + "</tr>";
            }
            str = str.replaceAll(",", ", ");
            str = decode_utf8(str);
            tableContainer.innerHTML = str;
          /* end */
      }
      // start reading the file. When it is done, calls the onload event defined above.
      reader.readAsBinaryString(fileInput.files[0]);
}
//* END FUNCTION  **/

// encode string in utf8 format
function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

// decode string in utf8 format
function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}

// check if array is empty, return a boolean value
function null_array(array){
	return array.length > 1;
}

// if the given matrix is A, the function returns A^t
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

// count how many times a char appears in a string
function countChar(string, char){
  var cont = 0;
  for (var i=0; i<string.length; i++){
    if(char == string[i]){
      cont++;
    }
  }
  return cont;
}

// Write the name of selected file .csv at the indicated div
function displayFileName(fileInput, divFileName){
    divFileName.innerText = "Arquivo: " + fileInput.files[0].name;
}

// add event (when fileInput changes, when some file is selected)
fileInput.addEventListener('change', function (){

  displayFileName(fileInput, fileName);

  processCSV(buttonShowGraph,
             fileInput,
             divData,
             divTableData);

});
