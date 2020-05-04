import csv
import os

csvfile = open('districtlist.csv', 'r')
reader = csv.reader(csvfile)
for row in reader:
	district = row[0]
	htmlurl = row[1]
	jsurl = row[2]
	charturl = row[3]
	
	if not os.path.exists(os.path.dirname(htmlurl)):
		try:
			os.makedirs(os.path.dirname(htmlurl))
		except OSError as exc: # Guard against race condition
			if exc.errno != errno.EEXIST:
				raise

	htmlfile = open(htmlurl, 'w')

	jsfile = open(jsurl, 'w')
	
	chartfile = open(charturl, 'w')


	htmltxt = '''<!DOCTYPE html>
	<html lang="en">
	<head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-164997550-2"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'UA-164997550-2');
	</script>


	<title>Coronavirus in '''+district+''' | coronainbihar.github.io</title>
	<meta name="title" content="Coronavirus Outbreak in'''+district+''': Blockwise Dashboard"/>
	<link rel="icon" type="image/png"  href="../../icon.png"/>
	<meta charset="utf-8">
	<meta name="description" content="An effort to track coronavirus outbreak in Bihar with tables of the number of cases by district and block.">
	<meta name="keywords" content="Corona, Bihar, Covid-19, Blockwise, Block, Coronavirus">
	<meta name="author" content="Anand Kumar Verma">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="../../index.css">
	<link href="../../chart.css" rel="stylesheet" type="text/css" />
	<script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
	</head>
	<body>

	<div class="header">
	  <h1>Covid-19 Dashboard for '''+district+'''</h1>
	  <p id="hdemo"></p>
	  <figure class="highcharts-figure">
		<div id="container"></div>
      
	  </figure>
	  <script src="chart.js"></script>
	  
	</div>

	<div class="row">
	  <div class="column side">
		
	  </div>
	  
	  <div class="column middle">
		<p><br></p>

		
		<div style="overflow-x:auto;">
			<table id="demo"></table>
		</div>
		<script src="index.js" type="text/javascript"></script>
		
	  </div>
	  
	  <div class="column side">
		
	  </div>
	</div>
	<div class="footer">
	  <form>
		<input type="button" id = "error_button" value="Report an Error / Feedback" onclick="openWin()">
	  </form>
	  <p>Developed by <a target="_blank" href="https://www.linkedin.com/in/anand-kumar-verma/">Anand Kumar Verma.</a></p>  
	</div>
	</body>
	</html>
	'''
	jstxt = '''var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		
		var myObj = JSON.parse(this.responseText);
		var len = myObj.length ;

		var htxt = "" ;
		htxt += "<ccard>Confirmed<br>"+myObj[len-1].confirmed+"</ccard><acard >Active<br>"+myObj[len-1].active+"</acard><rcard>Recovered<br>"+myObj[len-1].recovered+"</rcard><dcard>Deceased<br>"+myObj[len-1].deceased+"</dcard>" ;
		document.getElementById("hdemo").innerHTML = htxt;
		
		var txt = "" ;
		txt += "<table>" ;

		txt += "<tr><th onclick=\\"sortTable(0, 0)\\">Block &#8645</th><th onclick=\\"sortTable(1, 1)\\" style=\\"color:orange;\\">Confirmed &#8645</th><th onclick=\\"sortTable(2, 1)\\" style=\\"color:blue;\\">Active &#8645</th><th onclick=\\"sortTable(3, 1)\\" style=\\"color:green;\\">Recovered &#8645</th><th onclick=\\"sortTable(4, 1)\\" style=\\"color:red;\\">Deceased &#8645</th></tr>" ;
		var x ;
		for (x = 0; x < len-1; x++) {
		  /* txt += "<tr><td>" + myObj[x].name + "</td></tr>"; */
		  txt += "<tr><td>"+myObj[x].block+"</td><td>"+myObj[x].confirmed+"</td><td>"+myObj[x].active+"</td><td>"+myObj[x].recovered+"</td><td>"+myObj[x].deceased+"</td></tr>" ;
		}
		txt += "</table>"    
		document.getElementById("demo").innerHTML = txt;
	  }
	};
	xmlhttp.open("GET", "'''+district+'''csv.json", true);
	xmlhttp.send();
	
	function sortTable(n, type) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("demo");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "desc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (type == 0){
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      else {
        if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
			  shouldSwitch = true;
			  break;
			}
        } else if (dir == "desc") {
			if (Number(x.innerHTML) < Number(y.innerHTML)) {
			  shouldSwitch = true;
			  break;
			}
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "desc") {
        dir = "asc";
        switching = true;
      }
    }
  }
  
}

function openWin() {
  window.open("https://forms.gle/BB1eWe9bJ6HmqqHc8");
}

	'''
	
	charttxt = '''
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		var myObj = JSON.parse(this.responseText);
		
		var myDis = myObj.districtsDaily.Bihar.'''+district+''';
		var len = myDis.length;
		var x ;
		var date = [] ;
		var active = [] ;
		var confirmed = [];
		var deceased = [];
		var recovered = [];
		for (x = 0 ; x<len ;x++){
		  active[x] = myDis[x].active ;
		  confirmed[x] = myDis[x].confirmed ;
		  deceased[x] = myDis[x].deceased ;
		  recovered[x] = myDis[x].recovered ;
		  date[x] = myDis[x].date;
		}
		Highcharts.chart('container', {
		  chart: {
			type: 'area'
		  },
		  title: {
			text: 'Total cases in '''+district+''' '
		  },
		  subtitle: {
			text: 'Source: covid19india.org'
		  },
		  xAxis: {
			categories: date,
			tickmarkPlacement: 'on',
			title: {
			  enabled: false
			}
		  },
		  yAxis: {
			title: {
			  text: ''
			},
			labels: {
			  formatter: function () {
				return this.value ;
			  }
			}
		  },
		  tooltip: {
			split: true,
			valueSuffix: ' '
		  },
		  plotOptions: {
			area: {
			  stacking: 'normal',
			  lineColor: '#666666',
			  lineWidth: 1,
			  marker: {
				lineWidth: 1,
				lineColor: '#666666'
			  }
			}
		  },
		  series: [{
			name: 'Active',
			data: active
		  }, {
			name: 'Recovered',
			data: recovered
		  }, {
			name: 'Deceased',
			data: deceased
		  }]
		});
		}
		
	};
	xmlhttp.open("GET", "https://api.covid19india.org/districts_daily.json", true);
xmlhttp.send();

Highcharts.theme = {
  colors: ['rgba(0, 0, 255, 0.4)', 'rgba(0, 128, 0, 0.4)','rgba(255, 0, 0, 0.4)'],
};
Highcharts.setOptions( Highcharts.theme);'''

	htmlfile.write(htmltxt)
	jsfile.write(jstxt)
	chartfile.write(charttxt)