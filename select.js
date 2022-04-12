function mark_line(element){

	if(element.className.indexOf("marked")==-1){
		element.className = element.className + " marked";
	}else{
		element.className = element.className.replace(" marked", "");
	}

}

function ontypegraph(type){
	switch (type.value){
		case "intensity":
			env_intensify();
			break;
		case "cylinder":
			env_all();
			env_cylinder();
			break;
		case "line":
			env_line();
			break;
		case "scatter":
			env_scatter();
			break;
		default:
			env_all();
			break;
	}
}

function env_all(){
	for(var i=0; i<document.querySelectorAll("tr").length; i++){
		document.querySelectorAll("tr")[i].style.display="table-row";
	}
	document.getElementById("graph3d").disabled = false;
	document.querySelector("#markers").disabled = false;
}

function env_cylinder(){
	document.querySelector("#markers").disabled = true;
	document.getElementById("graph3d").checked = true;
	document.getElementById("graph3d").disabled = true;
}


function env_line(){
	document.querySelector("#markers").disabled = false;
	var show = ["trId7", "trId8", "trId9", "trId12", "trId13", "trId14", "trId16", "trId17",
							"trId18", "trId19", "trId41", "trId43"];
	var hide = ["trId20", "trId21", "trId40"];
	showAndHide(show, hide);
}

function env_intensify(){
	document.querySelector("#markers").disabled = false;
	var show = ["trId20", "trId21", "trId39", "trId40"];
	var hide = ["trId7", "trId8", "trId9", "trId12", "trId13", "trId14", "trId16", "trId17",
							"trId18", "trId19", "trId41", "trId43"];
	showAndHide(show, hide);
}

function env_scatter(){
	env_line();
	document.querySelector("#markers").checked = true;
	document.querySelector("#markers").disabled = true;
	document.getElementById("graph3d").checked = false;
	document.getElementById("graph3d").disabled = true;

	var hide = ["trId44"];
	var show = [];
	showAndHide(show, hide);
}

function showAndHide(showArr, hideArr){
	for (var i=0; i<showArr.length; i++){
			document.getElementById(showArr[i]).style.display="table-row";
	}
	for (var i=0; i<hideArr.length; i++){
		document.getElementById(hideArr[i]).style.display="none";
	}
}
