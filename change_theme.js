function change_theme(){
	// var button = document.getElementById("buttonTheme");
	if (document.body.className != "darkMode") {
		document.getElementById("stylesheet").href = "indexDark.css";
		document.body.className = "darkMode";
		localStorage.setItem('theme', 'dark');
	}else{
		document.getElementById("stylesheet").href = "index.css";
		document.body.className = "lightMode";
		localStorage.setItem('theme', 'light');
	}
}

function change_toDark(){
	document.getElementById("stylesheet").href = "indexDark.css";
	document.body.className = "darkMode";
	localStorage.setItem('theme', 'dark');
}

function change_toLight(){
	document.getElementById("stylesheet").href = "index.css";
	document.body.className = "lightMode";
	localStorage.setItem('theme', 'light');
}

document.getElementById("buttonTheme").addEventListener('click', change_theme);


function load_theme(){
	var theme = localStorage.getItem('theme');
	if (theme=="dark") {
	    change_toDark();
		localStorage.setItem('theme', 'dark');
	} else{
	    change_toLight();
		localStorage.setItem('theme', 'light');
	}
}

window.addEventListener('load', load_theme);

function openSettings(){
	var buttonSet = document.getElementById('settings');
	var painelGraph = document.getElementById('modal_settings');
	if(buttonSet.className == "openSettings"){
		painelGraph.style.display = "flex";
		buttonSet.className = "closeSettings";
	}else{
		painelGraph.style.display = "none";
		buttonSet.className = "openSettings";
	}
}

function closeSettings(e){
	if(e.key==="Escape"){   
		var buttonSet = document.getElementById('settings');
		var painelGraph = document.getElementById('modal_settings');
		painelGraph.style.display = "none";
		buttonSet.className = "openSettings";
	}
}
document.addEventListener('keydown', closeSettings, false);

function isNumber(value) {
   return typeof value === 'number' && isFinite(value);
}

function filter(input){
	// REGEX OF NUMBERS, COMMAS AND "-"
	var er = /[^0-9,-]/gi;
	// JUST ALLOW CHARACTERS OF REGEX
	input.value = input.value.replaceAll(er, "");		
}

function markColumnsCSV(input){
	// GETTING COLUMNS SEPARATED BY COMMAS
	var columns = input.value.split(",");
	// GETTING ALL ELEMENTS NODE OF INDEX COLUMN
	var columnsCSV = document.querySelectorAll(".indexColumn");

	// ADDING COLUMNS SEPARATED BY "-"
	for (var i=0; i<columns.length; i++){
		columns[i] = String(columns[i]);
		var sep = columns[i].split("-");
		if (sep.length==2){
			var beg = sep[0];
			var end = sep[1];
			for(var k = parseInt(beg); k <= parseInt(end); k++){
				columns.push(k);
			}
		}
	}

	// REMOVING ALL MARKED INDEX COLUMNS
	for (var i=0; i<columnsCSV.length; i++){
		columnsCSV[i].className = columnsCSV[i].className.replaceAll(" marked", "");
	}

	// IF INPUT IS EMPTY THEN MARK ALL INDEXES
	if(input.value == ""){
		for (var i=0; i<columnsCSV.length; i++){
			columnsCSV[i].className = columnsCSV[i].className + " marked";
		}
	}

	// MARK ALL INDEXES THAT'S IN ARRAY COLUMNS
	for (var i=0; i<columns.length; i++){
		for (var j=0; j<columnsCSV.length; j++){
			if (columns[i].trim()==columnsCSV[j].innerText.trim()){
				if(columnsCSV[j].className.indexOf(" marked")==-1){
					columnsCSV[j].className = columnsCSV[j].className + " marked";
				} 
			}
		}
	}
}

function markRowsCSV(input){
	var rows = input.value.split(",");
	var rowsCSV = document.querySelectorAll(".indexRow");

	// ADDING ROWS SEPARATED BY "-"
	for (var i=0; i<rows.length; i++){
		rows[i] = String(rows[i]);
		var sep = rows[i].split("-");
		if (sep.length==2){
			var beg = sep[0];
			var end = sep[1];
			for(var k = parseInt(beg); k <= parseInt(end); k++){
				rows.push(k);
			}
		}
	}

	for (var i=0; i<rowsCSV.length; i++){
		rowsCSV[i].className = rowsCSV[i].className.replaceAll(" marked", "");
	}

	if(input.value == ""){
		for (var i=0; i<rowsCSV.length; i++){
			rowsCSV[i].className = rowsCSV[i].className + " marked";
		}
	}

	for (var i=0; i<rows.length; i++){
		for (var j=0; j<rowsCSV.length; j++){
			if (rows[i].trim()==rowsCSV[j].innerText.trim()){
				if(rowsCSV[j].className.indexOf(" marked")==-1){
					rowsCSV[j].className = rowsCSV[j].className + " marked";
				} 
			}
		}
	}
}

function noEmpty(input){
	if(input.value.trim()==""){
		input.value = "0";
	}
}

function noNegative(input){
	input.value = parseInt(String(input.value).replaceAll("-",""));
}

document.getElementById('settings').addEventListener('click', openSettings);
document.getElementById('closePainel_graph').addEventListener('click', openSettings);