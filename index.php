<!DOCTYPE html>
<html style="filter: none;" lang="pt-br">
<head>
	<title>Pesquisa | Visualização de Dados</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="index.css" id="stylesheet">
	<link rel="icon" type="image/png" href="icons/lupa.png"/>

	<script src="https://code.highcharts.com/highcharts.js"></script>

	<script src="graphs_create.js" defer></script>
	<script src="data_csv.js" defer></script>
	<script src="change_theme.js" defer></script>
	<script src="select.js" defer></script>
	<script src="addColor.js" defer></script>

	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/regression/1.4.0/regression.min.js"></script>
	    <script src="https://code.highcharts.com/highcharts.js"></script>
			<script src="https://code.highcharts.com/modules/exporting.js"></script>
			<script src="https://code.highcharts.com/modules/export-data.js"></script>
			<script src="https://code.highcharts.com/modules/accessibility.js"></script>

			<script src="https://code.highcharts.com/highcharts.js"></script>
			<script src="https://code.highcharts.com/highcharts-more.js"></script>
			<script src="https://code.highcharts.com/modules/exporting.js"></script>
			<script src="https://code.highcharts.com/modules/export-data.js"></script>
			<script src="https://code.highcharts.com/modules/accessibility.js"></script>

			<script src="https://code.highcharts.com/highcharts.js"></script>
			<script src="https://code.highcharts.com/highcharts-more.js"></script>
			<script src="https://code.highcharts.com/modules/dumbbell.js"></script>
			<script src="https://code.highcharts.com/modules/lollipop.js"></script>

			<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-3d.js"></script>
<script src="https://code.highcharts.com/modules/cylinder.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>

</head>
<body>
	<span id="buttonTheme" class="themeButton"></span>

	<div id="painel">

		<div id="painel_csv">
			<label>Faça upload de um arquivo CSV</label>
			<input id="csv" type="file" accept=".csv">
			<label for="csv" class="sendFile">Selecionar Arquivo</label>
			<p id="fileName">Nenhum arquivo selecionado</p>
		</div>

	</div>

	<div id="data"></div>

	<div id="out">
		<h2>Dados</h2>
	    <div id="dataset">
	    	O arquivo CSV aparecerá aqui
		</div>
	</div>

	<div id="interest_data">
		<div class="inline">
			<h3>Dados de interesse</h3>
			<div class="info">
				<span>?</span>
				<div>
					<h4>Exemplos</h4>
					<b>Índices de 1 a 5:</b> <p>1-5</p>
					<b>Índices 1, 3 e 5:</b> <p>1,3,5</p>
					<b>Índices 1,3 e de 5 a 10:</b> <p> 1,3,5-10</p>
					<b>Todos os índices:</b> <i>{Vazio}</i>
				</div>
			</div>
		</div>
		<div>
			<label for="interestColoumns">Colunas:</label>
			<input type="text" name="interestColoumns" id="interestColoumns" placeholder="Ex.: 1,5,8..." oninput="filter(this)" onkeyup="markColumnsCSV(this)">
		</div>

		<br>

		<div>
			<label for="interestRows">Linhas:</label>
			<input type="text" name="interestRows" id="interestRows" placeholder="Ex.: 1,5,8..." oninput="filter(this)" onkeyup="markRowsCSV(this)">
		</div>
	</div>

	<img src="icons/settings.png" id="settings" class="openSettings">

	<div id="modal_settings">
		<div id="painel_graph">
			<span id="closePainel_graph">&times;</span>
			<h2>Configure o Gráfico</h2>

			<table>
				<tr id="trId1">
					<td><label for="type_graph">Tipo de Gráfico</label></td>
					<td>
						<select name="type_graph" id="type_graph" onchange="ontypegraph(this)">
							<option value="area">Área</option>
							<option value="areaspline">Área Suave</option>
							<option value="bar">Barra</option>
							<option value="cylinder">Cilíndro</option>
							<option value="line" selected>Linha</option>
							<option value="spline">Linha Suave</option>
							<option value="intensity">Mapa de Calor</option>
							<option value="columnpyramid">Pirâmide</option>
							<option value="lollipop">Pirulito</option>
							<option value="pie">Pizza</option>
							<option value="scatter">Pontos</option>
						</select>
					</td>
				</tr>
				<tr id="trId2">
					<td><label for="title_graph">Título do Gráfico</label></td>
					<td><input type="text" name="title_graph" id="title_graph" placeholder="Título do Gráfico..."></td>
				</tr>
				<tr id="trId3">
					<td><label for="subtitle_graph">Subtítulo do Gráfico</label></td>
					<td><input type="text" name="subtitle_graph" id="subtitle_graph" placeholder="Subtítulo do Gráfico..."></td>
				</tr>
				<tr id="trId4">
					<td><label for="legend_position">Posição da Legenda</label></td>
					<td>
						<select name="legend_position" id="legend_position">
							<option value="bottom">Embaixo</option>
							<option value="top">Em cima</option>
							<option value="left">Esquerda</option>
							<option value="right">Direita</option>
						</select>
					</td>
				</tr>

				<tr id="trId5"><td colspan="2"><h3>Eixo X</h3></td></tr>

				<tr id="trId6">
					<td><label for="title_xaxes">Título do Eixo X</label></td>
					<td><input type="text" name="title_xaxes" id="title_xaxes" placeholder="Título do Eixo X..."></td>
				</tr>
				<tr id="trId7">
					<td><label for="color_xaxis">Cor do Eixo X</label></td>
					<td><input type="color" name="color_xaxis" id="color_xaxis"></td>
				</tr>
				<tr id="trId8">
					<td><label for="width_xaxis">Largura do Eixo X</label></td>
					<!-- <td><input type="number" name="width_xaxis" id="width_xaxis" value="1" min="0" max="10" onblur="noEmpty(this)" oninput="noNegative(this)"></td> -->
					<td><input type="range" min="0" max="10" value="1" class="slider" id="width_xaxis"></td>
				</tr>
				<tr id="trId9">
					<td><label for="tickWidth_xaxis">Largura dos Marcadores do Eixo X</label></td>
					<!-- <td><input type="number" name="tickWidth_xaxis" id="tickWidth_xaxis" value="1" min="0" max="5" onblur="noEmpty(this)" oninput="noNegative(this)"></td> -->
					<td><input type="range" min="0" max="10" value="1" class="slider" id="tickWidth_xaxis"></td>
				</tr>

				<tr id="trId10"><td colspan="2"><h3>Eixo Y</h3></td></tr>

				<tr id="trId11">
					<td><label for="title_yaxes">Título do Eixo Y</label></td>
					<td><input type="text" name="title_yaxes" id="title_yaxes" placeholder="Título do Eixo Y..."></td>
				</tr>
				<tr id="trId12">
					<td><label for="color_yaxis">Cor do Eixo Y</label></td>
					<td><input type="color" name="color_yaxis" id="color_yaxis"></td>
				</tr>
				<tr id="trId13">
					<td><label for="width_yaxis">Largura do Eixo Y</label></td>
					<!-- <td><input type="number" name="width_yaxis" id="width_yaxis" value="1" min="0" max="10" onblur="noEmpty(this)" oninput="noNegative(this)"></td> -->
					<td><input type="range" min="0" max="10" value="1" class="slider" id="width_yaxis"></td>
				</tr>
				<tr id="trId14">
					<td><label for="tickWidth_yaxis">Largura dos Marcadores do Eixo Y</label></td>
					<!-- <td><input type="number" name="tickWidth_yaxis" id="tickWidth_yaxis" value="1" min="0" max="5" onblur="noEmpty(this)" oninput="noNegative(this)"></td> -->
					<td><input type="range" min="0" max="10" value="1" class="slider" id="tickWidth_yaxis"></td>
				</tr>

				<tr id="trId15"><td colspan="2"><h3>Cores</h3></td></tr>

				<tr id="trId16">
					<td class="inputsColors"><label>Cores de linha</label></td>
					<td class="inputsColors"><input type="color" name="colorsSeries" class="colorsSeries" value="#2f7ed8"></td>
				</tr>
				<tr id="trId17">
					<td></td>
					<td class="inputsColors"><input type="color" name="colorsSeries" class="colorsSeries" value="#0d233a"></td>
				</tr>
				<tr id="trId18">
					<td></td>
					<td class="inputsColors"><input type="color" name="colorsSeries" class="colorsSeries" value="#8bbc21"></td>
				</tr>
				<tr id="trId19">
					<td></td>
					<td class="inputsColors"><input type="color" name="colorsSeries" class="colorsSeries" value="#910000"><span id="addColor" onclick="addColor(this)" title="Adicionar Cor">+</span></td>
				</tr>

				<tr id="trId20">
					<td class="inputsColors"><label>Cor de Intensidade Mínima</label></td>
					<td class="inputsColors"><input type="color" name="colorMinIntensity" id="colorMinIntensity" value="#00ff00"></td>
				</tr>
				<tr id="trId21">
					<td class="inputsColors"><label>Cor de Intensidade Máxima</label></td>
					<td class="inputsColors"><input type="color" name="colorMaxIntensity" id="colorMaxIntensity" value="#ff0000"></td>
				</tr>

				<tr id="trId22">
					<td><label for="colorBackground">Cor de Fundo</label></td>
					<td><input type="color" name="colorBackground" id="colorBackground" value="#ffffff"></td>
				</tr>
				<tr id="trId23">
					<td><label for="colorBackground">Cor do Texto</label></td>
					<td><input type="color" name="textColor" id="textColor" value="#000000"></td>
				</tr>

				<tr id="trId24"><td colspan="2"><h3>Visualização de Dados</h3></td></tr>

				<tr id="trId25">
					<td>
						<table>
							<tr id="trId26">
							<td><label for="jump">Número de Saltos: </label></td>
							<td><input type="number" name="jump" id="jump" min="0" value="0" required="" onblur="noEmpty(this)" oninput="noNegative(this)"></td>
							</tr>
						</table>
					</td>
					<td>
						<table>
							<tr id="trId27">
							<td><input type="checkbox" name="data_inline" id="data_inline"></td>
							<td><label for="data_inline">Rótulo sobre pontos</label></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr id="trId28">
					<td>
						<table>
							<tr id="trId29">
							<td><input type="checkbox" name="inverted" id="inverted"></td>
							<td><label for="inverted">Gráfico Invertido</label></td>
							</tr>
						</table>
					</td>
					<td>
						<table>
							<tr id="trId30">
							<td><input type="checkbox" name="markers" id="markers" checked></td>
							<td><label for="markers">Marcadores</label></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr id="trId31">
					<td>
						<table>
							<tr id="trId32">
							<td><input type="checkbox" name="trendlineLinear" id="trendlineLinear"></td>
							<td><label for="trendlineLinear">Linha de Tendência Linear</label></td>
							</tr>
						</table>
					</td>
					<td>
						<table>
							<tr id="trId33">
							<td><input type="checkbox" name="trendlineSquare" id="trendlineSquare"></td>
							<td><label for="trendlineSquare">Linha de Tendência Quadrática</label></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr id="trId34">
					<td>
						<table>
							<tr id="trId35">
							<td><input type="checkbox" name="trendlinePolynomial" id="trendlinePolynomial"></td>
							<td><label for="trendlinePolynomial">Linha de Tendência Polinomial</label></td>
							</tr>
						</table>
					</td>
					<td>
						<table>
							<tr id="trId36">
							<td><input type="checkbox" name="removeOriginalLines" id="removeOriginalLines"></td>
							<td><label for="removeOriginalLines">Remover Linhas Originais</label></td>
							</tr>
						</table>
					</td>
				</tr>

				<td>
					<table>
						<tr id="trId37">
							<td><input type="checkbox" name="workWithMedian" id="workWithMedian"></td>
							<td><label for="workWithMedian">Usar Média de Valores</label></td>
							</tr>
						</table>
				</td>

				<tr id="trId38">
					<td>
						<table>
							<tr id="trId39">
							<td><input type="checkbox" name="generateXAxisAuto" id="generateXAxisAuto"></td>
							<td><label for="generateXAxisAuto">Gerar Eixo X Automaticamente</label></td>
							</tr>
						</table>
					</td>

					<td>
						<div class="info">
							<span>?</span>
							<div>
								<h4>Gerar Eixo X Automaticamente</h4>
								<p>Ativar quando o CSV conter somente uma coluna de interesse ou desejar utilizar a primeira coluna como dado, e não como rótulo</p>
							</div>
						</div>
					</td>
				</tr>

				<tr id="trId40">
					<td><label>Tamanho das Células no Mapa de Calor</label></td>

					<td><input type="range" min="1" max="10" value="1" class="slider" id="widthHeatMap" name="widthHeatMap"></td>
				</tr>

			</table>

			<table>
				<tr id="trId41"><td colspan="2"><h3>Opções 3D</h3></td></tr>

				<tr id="trId42">
					<td>
						<table>
							<tr id="trId43">
							<td><input type="checkbox" name="graph3d" id="graph3d"></td>
							<td><label for="graph3d">Gráfico 3D</label></td>
							</tr>
						</table>
					</td>
					<td>

					</td>
				</tr>

				<tr id="trId44">
					<td>
						<table>
							<tr id="trId45">
							<!-- <td><input type="number" name="rotationX" id="rotationX" onblur="noEmpty(this)" value="5"></td> -->
							<td><input type="range" min="-50" max="50" value="5" class="slider" id="rotationX" name="rotationX"></td>
							<td><label for="rotationX">Rotação Eixo X</label></td>
							</tr>
						</table>
					</td>
					<td>
						<table>
							<tr id="trId46">
							<!-- <td><input type="number" name="rotationY" id="rotationY" onblur="noEmpty(this)" value="10"></td> -->
							<td><input type="range" min="-50" max="50" value="5" class="slider" id="rotationY" name="rotationY"></td>
							<td><label for="rotationY">Rotação Eixo Y</label></td>
							</tr>
						</table>
					</td>

				</tr>
			</table>

			</table>

		</div>
	</div>
		<button id="button_graph">Gerar Gráfico</button>

	<div id="container">O GRÁFICO APARECERÁ AQUI</div>




</body>
</html>
