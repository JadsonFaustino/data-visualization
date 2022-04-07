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
			env_cylinder();
			break;
		case "line":
			env_line();
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
}

function env_cylinder(){
	document.getElementById("graph3d").checked = true;
	document.getElementById("graph3d").disabled = true;
}


function env_line(){
	document.getElementById("trId7").style.display="table-row";
	document.getElementById("trId8").style.display="table-row";
	document.getElementById("trId9").style.display="table-row";
	document.getElementById("trId12").style.display="table-row";
	document.getElementById("trId13").style.display="table-row";
	document.getElementById("trId14").style.display="table-row";
	document.getElementById("trId16").style.display="table-row";
	document.getElementById("trId17").style.display="table-row";
	document.getElementById("trId18").style.display="table-row";
	document.getElementById("trId19").style.display="table-row";
	document.getElementById("trId40").style.display="table-row";
	document.getElementById("trId41").style.display="table-row";
	document.getElementById("trId43").style.display="table-row";
	
	document.getElementById("trId20").style.display="none";
	document.getElementById("trId21").style.display="none";
	document.getElementById("trId39").style.display="none";
}

function env_intensify(){
	document.getElementById("trId7").style.display="none";
	document.getElementById("trId8").style.display="none";
	document.getElementById("trId9").style.display="none";
	document.getElementById("trId12").style.display="none";
	document.getElementById("trId13").style.display="none";
	document.getElementById("trId14").style.display="none";
	document.getElementById("trId16").style.display="none";
	document.getElementById("trId17").style.display="none";
	document.getElementById("trId18").style.display="none";
	document.getElementById("trId19").style.display="none";
	document.getElementById("trId40").style.display="none";
	document.getElementById("trId41").style.display="none";
	document.getElementById("trId43").style.display="none";
	
	document.getElementById("trId20").style.display="table-row";
	document.getElementById("trId21").style.display="table-row";
	document.getElementById("trId39").style.display="table-row";
}