var surfacePlot;
		    var surfacePlot2;
			var data, options, basicPlotOptions, glOptions, plot1, values;
			var numRows = 85;
				var numCols = 85;
				var tooltipStrings = new Array();
				
				// Options for the webGL plot.
				var xLabels = [], yLabels = [], zLabels = [], dX = 1, dY = 1, num = 10;		
				
			var periods = 2;
				var coeff = periods*Math.PI/numRows;
				var idx = 0, x0 = 0, y0 = 0, tmpx = 0, tmpy = 0;
			
			function setUp()
			{
				
				values = new Array();
			
				data = {nRows: numRows, nCols: numCols, formattedValues: values};
				
				
				for (var i = 0; i < numRows; i++) 
				{
					values[i] = new Array();
					
					
					for (var j = 0; j < numCols; j++)
					{
						var x = coeff*i, y = coeff*j;
						var value = threeJJ(x, y, 2, 0.8, 0.05);
						
						//document.write('('+(x).toPrecision(2)+';'+(y).toPrecision(2)+'); ');
						values[i][j] = value / 4.0 - 0.25;
						
						//document.write((x).toPrecision(2)+' '+(y).toPrecision(2)+' '+2+' '+0.8+' '+0.05+'; '+(value).toPrecision(2)+";<br>");
						
						if ((i == numRows-2) && (j == numCols-2)) {
							dX = ((x-tmpx)).toPrecision(2);
							dY = ((y-tmpy)).toPrecision(2);
							tmpx = x;
							tmpy = y;
						}
						
						tooltipStrings[idx] = "x:" + i + ", y:" + j + " = " + value;
						
						idx++;
					}
				}
				
				for (var i = 0; i <= num; i++) {
					xLabels[num-i] = (0.1*(x0*coeff+dX*i)/Math.PI).toPrecision(2)+'pi';
					yLabels[i] = (0.1*(y0*coeff+dY*i)/Math.PI).toPrecision(2)+'pi';
					
				}

				surfacePlot = new SurfacePlot(document.getElementById("surfacePlotDiv"));
							
				// Don't fill polygons in IE < v9. It's too slow.
				var fillPly = true;
				
				// Define a colour gradient.
				var colour1 = {red:0, green:0, blue:255};
				var colour2 = {red:0, green:255, blue:255};
				var colour3 = {red:0, green:255, blue:0};
				var colour4 = {red:255, green:255, blue:0};
				var colour5 = {red:255, green:0, blue:0};
				var colours = [colour1, colour2, colour3, colour4, colour5];
				
				// Axis labels.
				var xAxisHeader	= "X-axis";
				var yAxisHeader	= "Y-axis";
				var zAxisHeader	= "Z-axis";
				
				var renderDataPoints = false;
				var background = '#ffffff';
				var axisForeColour = '#000000';
				var hideFloorPolygons = true;
				var chartOrigin = {x: 0, y:0};
				
				// Options for the basic canvas pliot.
				basicPlotOptions = {fillPolygons: fillPly, tooltips: tooltipStrings, renderPoints: renderDataPoints }
				
				
				
				//var xLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
				//var yLabels = [0, 1, 2, 3, 4, 5];
				//var zLabels = [0, 1, 2, 3, 4, 5, 6]; // These labels ar eused when autoCalcZScale is false;
				
				glOptions = {xLabels: xLabels, yLabels: yLabels, zLabels: zLabels, chkControlId: "allowWebGL", autoCalcZScale: true, animate: true};
				
				// Options common to both types of plot.
				options = {xPos:20, yPos: 20, width: 420, height: 420, colourGradient: colours, 
					xTitle: xAxisHeader, yTitle: yAxisHeader, zTitle: zAxisHeader, 
					backColour: background, axisTextColour: axisForeColour, hideFlatMinPolygons: hideFloorPolygons, origin: chartOrigin};
				
				surfacePlot.draw(data, options, basicPlotOptions, glOptions);
				
				//coordinateCharts();
				
			}
			
			function updatePlot () {
				E 		= parseFloat(document.getElementById("energy").value);
				alpha 	= parseFloat(document.getElementById("alpha").value);
				f 		= parseFloat(document.getElementById("f").value);
				
				idx = 0;
				tmpx = 0;
				tmpy = 0;
				
				for (var i = 0; i < numRows; i++) 
				{
					//values[i] = new Array();
					
					
					for (var j = 0; j < numCols; j++)
					{
						var x = coeff*i, y = coeff*j;
						var value = threeJJ(x, y, E, alpha, f);
						
						//document.write('('+x+';'+y+')');
						values[i][j] = value / 4.0 - 0.25
						
						//document.write((x).toPrecision(2)+' '+(y).toPrecision(2)+' '+E+' '+alpha+' '+f+'; '+(value).toPrecision(2)+";<br>");
						
						if ((i == numRows-2) && (j == numCols-2)) {
							dX = ((x-tmpx)).toPrecision(2);
							dY = ((y-tmpy)).toPrecision(2);
							tmpx = x;
							tmpy = y;
						}
						
						tooltipStrings[idx] = "x:" + i + ", y:" + j + " = " + value;
						
						idx++;
					}
					
				}
				
				
				for (var i = 0; i <= num; i++) {
					xLabels[num-i] = (0.1*(x0*coeff+dX*i)/Math.PI).toPrecision(2)+'pi';
					yLabels[i] = (0.1*(y0*coeff+dY*i)/Math.PI).toPrecision(2)+'pi';
					
				}
				
				
				
				surfacePlot.draw(data, options, basicPlotOptions, glOptions);
			}
			
			function threeJJ(x, y, E, alpha, f) {
				return E*(2+alpha-2*Math.cos(x)*Math.cos(y)-alpha*Math.cos(2*Math.PI*(f+1/2)+2*y));
			}
			
			function coordinateCharts() {
				
				// Link the two charts for rotation.
                plot1 = surfacePlot.getChart();
                plot2 = surfacePlot2.getChart();
                
                plot1.otherPlots = [plot2];  
                plot2.otherPlots = [plot1];  
				
			}
				
			setUp();
			
			function toggleChart(chkbox)
            { 
                surfacePlot.draw(data, options, basicPlotOptions, glOptions);
                
            } 