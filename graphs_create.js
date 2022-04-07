function isNumeric(str) {
	if (typeof str != "string") return false // we only process strings!  
	return !isNaN(str) && !isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function create_graph(){
	document.getElementById("container").style.display="flex";

	var select = document.getElementById('type_graph');
	var graph_type = select.options[select.selectedIndex].value;

	var legend_position_box = document.getElementById('legend_position');
	var legend_position = legend_position_box.options[legend_position_box.selectedIndex].value;
	
	var title_box = document.getElementById('title_graph');
	var title_graph = title_box.value;

	var subtitle_box = document.getElementById('subtitle_graph');
	var subtitle_graph = subtitle_box.value;
	
	var title_xbox = document.getElementById('title_xaxes');
	var title_xaxes = title_xbox.value;
	
	var title_ybox = document.getElementById('title_yaxes');
	var title_yaxes = title_ybox.value;

	var data_inline = document.querySelector('#data_inline').checked;
	var markers = document.querySelector('#markers').checked;
	var inverted = document.querySelector('#inverted').checked;
	var trendlineLinear = document.querySelector('#trendlineLinear').checked;
	var trendlineSquare = document.querySelector('#trendlineSquare').checked;
	var trendlinePolynomial = document.querySelector('#trendlinePolynomial').checked;
	var removeOriginalLines = document.querySelector('#removeOriginalLines').checked;
	var jump = document.querySelector('#jump').value;
	var generateXAxisAuto = document.querySelector('#generateXAxisAuto').checked;
	var graph3d = document.querySelector('#graph3d').checked;

	var workWithMedian = document.querySelector('#workWithMedian').checked;

	if(graph_type=="cylinder"){
		graph3d = true;
	}
	

	var colorsLine = document.querySelectorAll('.colorsSeries');
	var colorArr = Array();
	for (var i=0; i<colorsLine.length; i++){
		colorArr.push(colorsLine[i].value);
	}
	// console.log(colorArr);

	var colorBackground = document.querySelector('#colorBackground').value.trim();
	var colorxAxis = document.querySelector('#color_xaxis').value.trim();
	var coloryAxis = document.querySelector('#color_yaxis').value.trim();
	var width_xaxis = document.querySelector('#width_xaxis').value.trim();
	var width_yaxis = document.querySelector('#width_yaxis').value.trim();
	var tickWidth_xaxis = document.querySelector('#tickWidth_xaxis').value.trim();
	var tickWidth_yaxis = document.querySelector('#tickWidth_yaxis').value.trim();
	var textColor = document.querySelector('#textColor').value.trim();

	var rotationX = parseInt(document.querySelector('#rotationX').value);
	var rotationY = parseInt(document.querySelector('#rotationY').value);
	
	var widthHeatMap = parseInt(document.querySelector('#widthHeatMap').value);

	var regExp = /[a-zA-Z]/g;
	            
	if(parseFloat(jump)<0 || regExp.test(jump)){
		window.alert("Número de saltos inválido");
	}else{
		jump = parseFloat(jump)+1;
	}

	if (legend_position == "left" || legend_position == "right") {
		var legend_layout = "vertical";
		var legend_yposition = "middle";
		var legend_xposition = legend_position;
	}
	if (legend_position == "bottom" || legend_position == "top") {
		var legend_layout = "horizontal";
		var legend_yposition = legend_position;
		var legend_xposition = "center";
	}

	///////////////////////

	// SELECT DATA
	var columnsMarked = Array();
	for (var i = 0; i < document.querySelectorAll(".indexColumn.marked").length; i++){
		columnsMarked.push(parseInt(document.querySelectorAll(".indexColumn.marked")[i].innerText));
	}
	var rowsMarked = Array();
	for (var i = 0; i < document.querySelectorAll(".indexRow.marked").length; i++){
		rowsMarked.push(parseInt(document.querySelectorAll(".indexRow.marked")[i].innerText));
	}

	if (columnsMarked.length==0) {
		window.alert("Nenhuma coluna de interesse selecionada!");
		return;
	}
	if (rowsMarked.length==0) {
		window.alert("Nenhuma linha de interesse selecionada!");
		return;
	}

	/////////////////

	// var select_rows = document.getElementsByName('select_rows')[0].value.split(',');
	// var select_columns = document.getElementsByName('select_columns')[0].value.split(',');
	var select_rows = rowsMarked;
	var select_columns = columnsMarked;

	var content;
	var rows = Array();
	var columns = Array();

	// GETTING ALL DESIRED DATA
	// var checkRowsSelected = document.getElementsByName('select_rows')[0].value.trim()!="";
	// var checkColumnsSelected = document.getElementsByName('select_columns')[0].value.trim()!="";
	var checkRowsSelected = select_rows!="";
	var checkColumnsSelected = select_columns!="";
	

	// SELECTING ROWS

		for(var i=0; i<document.getElementsByClassName("row").length; i++){
			content = document.getElementsByClassName("row")[i].innerText;
			content = content.split(',');
			content.shift();
			rows.push(content);
		}
		rows.shift();

		// start added
		var desireRows = Array();
		for(var i=0; i<select_rows.length; i++){
			desireRows.push(rows[select_rows[i] - 1]);
		}
		rows = desireRows;
		// final added

		// TREATMENT OF DATA
		var seriesTitles = Array();
		for(var i=0; i<columns.length; i++){
			seriesTitles.push(columns[i].shift());
		}

		var xAxisTitle = seriesTitles.shift();

		var xAxis = columns.shift();


	// SELECTING COLUMNS
	
		for(var i=0; i<document.getElementsByClassName("column").length; i++){
			content = document.getElementsByClassName("column")[i].innerText;
			content = content.split(',');
			content.shift();

			var column = Array();
			for(var j=0; j<content.length; j+=jump){
				if(select_rows.indexOf(j+1)!=-1){ // select just marked rows (added)
					column.push(content[j]);
				}
			}
			columns.push(column);
		}

		// DROP INDEXES COLUMN
		columns.shift();	

		// start added
		var desireColumns = Array();
		for(var i=0; i<select_columns.length; i++){
			desireColumns.push(columns[select_columns[i] - 1]);
		}
		columns = desireColumns;

		// CASE THERE'S ONLY ONE DATA COLUMN CREATE AUTOMATICALLY X AXIS
		if(columns.length<2){
			document.getElementById("generateXAxisAuto").checked = true;
			generateXAxisAuto = true;
		}

		// console.log(columns);
		// final added

		// TREATMENT OF DATA
		var seriesTitles = Array();
		for(var i=0; i<columns.length; i++){
			seriesTitles.push(columns[i].shift());
		}

	
		var array = Array();
		for(var j=0; j<columns[0].length; j++){
			array.push(j);
		}

		if(!generateXAxisAuto){
			var xAxis = columns.shift();
			var xAxisTitle = seriesTitles.shift();
		}else{
			var xAxis = array;
			var xAxisTitle = "";
		}

		// CASTING DATA TO FLOAT TYPE
		for(var i=0; i<columns.length; i++){
			for(var j=0; j<columns[i].length; j++){
				if(columns[i][j]==""){
					columns[i][j] = 0;
				}
				columns[i][j] = parseFloat(columns[i][j]);
			}
		}

		var seriesData = new Array();
		
		for(var i=0; i<seriesTitles.length; i++){
			if(!removeOriginalLines){
				var ser = new Object;
				ser.name = seriesTitles[i];
				ser.data = columns[i];
				seriesData.push(ser);
			}
			if (trendlineLinear){
				var ser = new Object;
				ser.name = seriesTitles[i];
				if(trendlineSquare){
					ser.name = ser.name+" Linear Trend";
				}
				else if(!removeOriginalLines){
					ser.name = ser.name+" Trend";
				}
				ser.data = findLineByLeastSquares(array, columns[i])[1];
				seriesData.push(ser);
			}
			if (trendlineSquare){
				var ser = new Object;
				ser.name = seriesTitles[i];
				if(trendlineLinear){
					ser.name = ser.name+" Square Trend";
				}
				else if(!removeOriginalLines){
					ser.name = ser.name+" Trend";
				}
				var auxArr = Array();
				for(var j=0; j<columns[i].length; j++){
					auxArr.push(squareProject(columns[i], array[j]));
				}
				ser.data = auxArr;
				seriesData.push(ser);
			}
			if (trendlinePolynomial){
				var ser = new Object;
				ser.name = seriesTitles[i];
				if(trendlineLinear || trendlineSquare){
					ser.name = ser.name+" Polynomial Trend";
				}
				else if(!removeOriginalLines){
					ser.name = ser.name+" Trend";
				}

				var auxArr = Array();
				for(var j=0; j<columns[i].length; j++){
					var x = array[j];
					var y = columns[i][j];
					var coord = [x,y];
					auxArr.push(coord);
				}

				var result = regression('polynomial', auxArr);
				var points = result.points;
				var dataExp = Array();
				for(var a=0; a<points.length; a++){
					dataExp.push(points[a][1]);
				}

				ser.data = dataExp;
				seriesData.push(ser);
			}

		}

		
		// BEGIN OF DATA TREATMENT: "WORK WITH MEDIAN"

		if(workWithMedian){
			newSeriesData = new Array();

			for (var i=0; i<seriesData.length; i++){

				var sumForMedium = 0;
				
				for (var j=0; j<seriesData[i]["data"].length; j++){
					
					if (!isNaN(seriesData[i]["data"][j])){
						sumForMedium += seriesData[i]["data"][j];
					}

				}
				
				var seriesMedian = sumForMedium/j;
				
				newCellData = new Object;
				newCellData.name = seriesData[i]["name"];
				newCellData.data = [seriesMedian];

				newSeriesData.push(newCellData); 
			}

			seriesData = newSeriesData;
		}
		// END OF DATA TREATMENT: "WORK WITH MEDIAN"


	// BUILDING GRAPHIC
	document.getElementById('container').style.minHeight = "700px";

	// graph_type = "intensity";
	if(graph_type == "intensity"){ // BEGIN OF IF

		document.getElementById('container').style.minHeight = "auto";
		document.getElementById('container').style.width = "auto";
		document.getElementById('container').style.marginTop = "20px";

		var colorMinIntensityHex = document.getElementById("colorMinIntensity").value;
		var colorMaxIntensityHex = document.getElementById("colorMaxIntensity").value;
		var colorMinIntensity = hexToRgb(colorMinIntensityHex);
		var colorMaxIntensity = hexToRgb(colorMaxIntensityHex);

		var table = document.createElement("table");
		table.style.borderCollapse = "collapse";

		var head = document.createElement("tr");
		head.appendChild(document.createElement("td"));

		if(inverted){

			for (var i=0; i<xAxis.length; i++){
				var tdHead = document.createElement("td");
				var tdData = document.createTextNode(String(xAxis[i]).trim());
				tdHead.appendChild(tdData);
				tdHead.className = "labelsX_intensify_graph";
				tdHead.style.display = "none";
				table.style.display = "flex";
				table.style.flexWrap = "wrap";
				table.style.flexDirection = "column";
				table.style.alignItems = "flex-end";
				document.getElementById('container').style.width = "auto";
				document.getElementById('container').style.alignItems = "flex-start";
				head.appendChild(tdHead);			
			}

		}else{

			for (var i=0; i<seriesData.length; i++){
				var tdHead = document.createElement("td");
				var tdData = document.createTextNode(String(seriesData[i]['name']).trim());
				tdHead.appendChild(tdData);
				tdHead.className = "labelsX_intensify_graph";
				head.appendChild(tdHead);			
			}

		}
		table.appendChild(head);

		var max = -(Number.MAX_SAFE_INTEGER);
		var min = Number.MAX_SAFE_INTEGER;

		if(inverted){

			for (var i=0; i<seriesData.length; i++){
				var line = document.createElement("tr");
				line.style.margin = "2px 0px";

				var tdLine = document.createElement("td");
				var lineData = document.createTextNode(String(seriesData[i]['name']));
				tdLine.appendChild(lineData);
				tdLine.className = "labelsY_intensify_graph";
				line.appendChild(tdLine);

				for (var j=0; j<seriesData[0]['data'].length; j++){

					// ANALISING MAX AND MIN VALUE IN ALL DATA
					if(isNaN(seriesData[i]['data'][j])){
						alert("Só é possível gerar gráfico de intensidade com valores numéricos!");
						break;
					}else{
						if( seriesData[i]['data'][j] > max){
							max = seriesData[i]['data'][j];
						}
						if ( seriesData[i]['data'][j] < min){
							min = seriesData[i]['data'][j];
						}
					}
					var tdLine2 = document.createElement("td");

					tdLine2.className = "intensify";
					tdLine2.style.padding = String(widthHeatMap)+"px";

					var lineData2 = document.createTextNode(String(seriesData[i]['data'][j]).trim());
					tdLine2.appendChild(lineData2);
					line.appendChild(tdLine2);

				} // END FOR
				table.className = "intensify_graph";
				table.appendChild(line);

			} // END FOR

		}else{

			for (var i=0; i<seriesData[0]['data'].length; i++){
				var line = document.createElement("tr");
				var tdLine = document.createElement("td");
				var lineData = document.createTextNode(String(xAxis[i]));
				tdLine.appendChild(lineData);
				tdLine.className = "labelsY_intensify_graph";

				line.appendChild(tdLine);

				for (var j=0; j<seriesData.length; j++){

					// ANALISING MAX AND MIN VALUE IN ALL DATA
					if(isNaN(seriesData[j]['data'][i])){
						alert("Só é possível gerar gráfico de intensidade com valores numéricos!");
						break;
					}else{
						if( seriesData[j]['data'][i] > max){
							max = seriesData[j]['data'][i];
						}
						if ( seriesData[j]['data'][i] < min){
							min = seriesData[j]['data'][i];
						}
					}
					var tdLine2 = document.createElement("td");

					tdLine2.className = "intensify";
					tdLine2.style.padding = String(widthHeatMap)+"px";

					var lineData2 = document.createTextNode(String(seriesData[j]['data'][i]).trim());
					tdLine2.appendChild(lineData2);
					line.appendChild(tdLine2);

				} // END FOR
				table.className = "intensify_graph";
				table.appendChild(line);

			} // END FOR

		} // END ELSE
		
		// COLORING BY INTENSITY
		var tds2color = table.getElementsByClassName("intensify");
		for(var k=0; k<tds2color.length; k++){
			var intensity = (parseFloat(tds2color[k].innerText) - min)/(max-min);
			var R = intensity*(colorMaxIntensity.r - colorMinIntensity.r) + colorMinIntensity.r;
			var G = intensity*(colorMaxIntensity.g - colorMinIntensity.g) + colorMinIntensity.g;
			var B = intensity*(colorMaxIntensity.b - colorMinIntensity.b) + colorMinIntensity.b;
			tds2color[k].style.backgroundColor = "rgb("+String(R)+','+String(G)+','+String(B)+')';
			// if(inverted){
			// 	tds2color[k].style.borderWidth = "0px";
			// }
			
			// SHOWING OR NOT DATA IN EACH CELL
			if(!data_inline){
				tds2color[k].innerText = "";
			}
		}

		document.getElementById('container').style.backgroundColor = colorBackground;
		table.style.color = textColor;

		// CLEANING CONTAINER
		document.getElementById('container').innerText = "";
		document.getElementById('container').innerHTML = "";

		// ADDING TITLE
		if(title_graph != ""){
			var titleNode = document.createElement("h2");
			titleNode.appendChild(document.createTextNode(title_graph));
			titleNode.style.color = textColor;
			document.getElementById('container').appendChild(titleNode);
		}
		// ADDING SUBTITLE
		if(subtitle_graph != ""){
			var subtitleNode = document.createElement("h3");
			subtitleNode.appendChild(document.createTextNode(subtitle_graph));
			subtitleNode.style.color = textColor;
			document.getElementById('container').appendChild(subtitleNode);
		}

		// ADDING INTENSITY GRAPH
		document.getElementById('container').appendChild(table);

		var legend_intensity_graph = document.createElement("div");
		
		var minLabel = document.createElement("label");
		var minTextLabel = document.createTextNode(min);
		minLabel.style.padding = "10px"
		minLabel.appendChild(minTextLabel);

		var maxLabel = document.createElement("label");
		var maxTextLabel = document.createTextNode(max);
		maxLabel.style.padding = "10px"
		maxLabel.appendChild(maxTextLabel);
		
		legend_intensity_graph.style.display = "flex";
		legend_intensity_graph.style.flexDirection = "row";
		legend_intensity_graph.style.width = table.offsetWidth+"px";
		legend_intensity_graph.style.height = "40px";
		legend_intensity_graph.style.background = "linear-gradient(to right, "+ colorMinIntensityHex + ", " + colorMaxIntensityHex + ")";
		legend_intensity_graph.style.color = textColor;
		legend_intensity_graph.style.justifyContent = "space-between";
		legend_intensity_graph.style.alignItems = "center";

		legend_intensity_graph.appendChild(minLabel);
		legend_intensity_graph.appendChild(maxLabel);

		// PLACING LEGEND OF INTENSITY
		if(legend_position == "bottom"){
			document.getElementById('container').style.flexDirection = "column";
			document.getElementById('container').appendChild(legend_intensity_graph);
		}
		if(legend_position == "top"){
			document.getElementById('container').style.flexDirection = "column";
			document.getElementById('container').insertBefore(legend_intensity_graph, document.getElementById('container').firstElementChild);
		}
		if(legend_position == "left"){
			legend_intensity_graph.style.height = table.offsetHeight+"px";
			legend_intensity_graph.style.width = "40px";
			legend_intensity_graph.style.flexDirection = "column";
			legend_intensity_graph.style.background = "linear-gradient(to bottom, "+ colorMinIntensityHex + ", " + colorMaxIntensityHex + ")";
			document.getElementById('container').style.flexDirection = "row";
			document.getElementById('container').insertBefore(legend_intensity_graph, document.getElementById('container').firstElementChild);
		}
		if(legend_position == "right"){
			legend_intensity_graph.style.height = table.offsetHeight+"px";
			legend_intensity_graph.style.width = "40px";
			legend_intensity_graph.style.flexDirection = "column";
			legend_intensity_graph.style.background = "linear-gradient(to bottom, "+ colorMinIntensityHex + ", " + colorMaxIntensityHex + ")";
			document.getElementById('container').style.flexDirection = "row";
			document.getElementById('container').appendChild(legend_intensity_graph);
		}

		// console.log(seriesData);
		// console.log(head);
		// console.log(title_graph);
		// console.log(xAxis);



		// END OF IF
	}else{ // BEGIN OF ELSE

		const chart = Highcharts.chart('container', {
		    chart: {
		        type: graph_type,
		        // type: "cylinder",
		        zoomType: 'x',
		        inverted: inverted,
		        backgroundColor: colorBackground,
		        style: {
		        	color: textColor
		        },
		        options3d: {
		            enabled: graph3d,
		            alpha: rotationX,
		            beta: rotationY,
		            depth: 50,
		            viewDistance: 25
		        }
		    },

		    title: {
		        text: title_graph,
		        style: {
		        	color: textColor
		        }
		    },
			
			subtitle: {
		        text: subtitle_graph,
		        style: {
		        	color: textColor
		        }
		    },

		    xAxis: {
		    	title: {
		    		text: xAxisTitle,
		    		style: {
		    			color: textColor
		    		}
		    	},
		    	labels: {
		        	style: {
		        		color: textColor
		        	}
		        },
		    	lineColor: colorxAxis,
		    	tickColor: colorxAxis,
		    	lineWidth: width_xaxis,
		    	tickWidth: tickWidth_xaxis,
		        categories: xAxis
		    },

		    yAxis: {
		        title: {
		            text: title_yaxes,
		            style: {
		    			color: textColor
		    		}
		        },
		        labels: {
		        	style: {
		        		color: textColor
		        	}
		        },
		        lineWidth: width_yaxis,
		        tickWidth: tickWidth_yaxis,
		        lineColor: coloryAxis,
		        tickColor: coloryAxis
		    },

		    colors: colorArr,

		    series: seriesData,

		    responsive: {
	        	rules: [{
	            	condition: {
	                	maxWidth: 500,
	                	maxHeight: 500,
	           		}
	        	}]
	    	},

	    	legend: {
	        	layout: legend_layout,
	        	align: legend_xposition,
	        	verticalAlign: legend_yposition,
	        	itemStyle: {
	        		color: textColor
	        	}
	    	},

	    	plotOptions: {
	        	line: {
	            	dataLabels: {
	                	enabled: data_inline
	            	},
	            	enableMouseTracking: true
	        	},
	        	series: {
	        		marker: {
	        			enabled: markers
	        		},
	        		depth: 25
	        	}
	    	}
		});

	} // END OF ELSE

}

var button_graph = document.getElementById("button_graph");
button_graph.addEventListener('click', create_graph);





function findLineByLeastSquares(values_x, values_y) {
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var count = 0;

    /*
     * We'll use those variables for faster read/write access.
     */
    var x = 0;
    var y = 0;
    var values_length = values_x.length;

    if (values_length != values_y.length) {
        throw new Error('The parameters values_x and values_y need to have same size!');
    }

    /*
     * Nothing to do.
     */
    if (values_length === 0) {
        return [ [], [] ];
    }

    /*
     * Calculate the sum for each of the parts necessary.
     */
    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = values_y[v];
        sum_x += x;
        sum_y += y;
        sum_xx += x*x;
        sum_xy += x*y;
        count++;
    }

    /*
     * Calculate m and b for the formular:
     * y = x * m + b
     */
    var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
    var b = (sum_y/count) - (m*sum_x)/count;

    /*
     * We will make the x and y result line now
     */
    var result_values_x = [];
    var result_values_y = [];

    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = x * m + b;
        result_values_x.push(x);
        result_values_y.push(y);
    }

    return [result_values_x, result_values_y];
}


function SquareFitter()
{
    this.count = 0;
    this.sumX = 0;
    this.sumX2 = 0;
    this.sumX3 = 0;
    this.sumX4 = 0;
    this.sumY = 0;
    this.sumXY = 0;
    this.sumX2Y = 0;
}

SquareFitter.prototype = {
    'add': function(x, y)
    {
        this.count++;
        this.sumX += x;
        this.sumX2 += x*x;
        this.sumX3 += x*x*x;
        this.sumX4 += x*x*x*x;
        this.sumY += y;
        this.sumXY += x*y;
        this.sumX2Y += x*x*y;
    },
    'project': function(x)
    {
        var det = this.count*this.sumX2*this.sumX4 - this.count*this.sumX3*this.sumX3 - this.sumX*this.sumX*this.sumX4 + 2*this.sumX*this.sumX2*this.sumX3 - this.sumX2*this.sumX2*this.sumX2;
        var offset = this.sumX*this.sumX2Y*this.sumX3 - this.sumX*this.sumX4*this.sumXY - this.sumX2*this.sumX2*this.sumX2Y + this.sumX2*this.sumX3*this.sumXY + this.sumX2*this.sumX4*this.sumY - this.sumX3*this.sumX3*this.sumY;
        var scale = -this.count*this.sumX2Y*this.sumX3 + this.count*this.sumX4*this.sumXY + this.sumX*this.sumX2*this.sumX2Y - this.sumX*this.sumX4*this.sumY - this.sumX2*this.sumX2*this.sumXY + this.sumX2*this.sumX3*this.sumY;
        var accel = this.sumY*this.sumX*this.sumX3 - this.sumY*this.sumX2*this.sumX2 - this.sumXY*this.count*this.sumX3 + this.sumXY*this.sumX2*this.sumX - this.sumX2Y*this.sumX*this.sumX + this.sumX2Y*this.count*this.sumX2;
        return (offset + x*scale + x*x*accel)/det;
    }
};

function squareProject(data, x)
{
    var fitter = new SquareFitter();
    for (var i = 0; i < data.length; i++)
    {
        fitter.add(i, data[i]);
    }
    return fitter.project(x);
}
