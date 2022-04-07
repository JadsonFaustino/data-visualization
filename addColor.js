function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function random_hex_color_code(){
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
}

function addColor(element){
	var line = element.parentNode.parentNode;
	var newLine = document.createElement("tr");

	var avoidColumn = document.createElement("td");
	var columnPlus = document.createElement("td");
	columnPlus.setAttribute("class", "inputsColors");

	var inputColor = document.createElement("input");
	inputColor.setAttribute("type", "color");
	inputColor.setAttribute("name", "colorsSeries");
	inputColor.setAttribute("class", "colorsSeries");
	inputColor.setAttribute("value", random_hex_color_code());

	var plus = document.createElement("span");
	plus.innerText = "+";
	plus.id = "addColor";
	plus.addEventListener('click', function () {
		addColor(this);
	});
	columnPlus.appendChild(inputColor);
	columnPlus.appendChild(plus);
	newLine.appendChild(avoidColumn);
	newLine.appendChild(columnPlus);
	element.remove();
	insertAfter(newLine, line);
}

