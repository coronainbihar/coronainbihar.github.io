import csv
import os

csvfile = open('districtlist.csv', 'r')
reader = csv.reader(csvfile)
for row in reader:
	district = row[0]
	htmlurl = row[1]
	jsurl = row[2]
	
	if not os.path.exists(os.path.dirname(htmlurl)):
		try:
			os.makedirs(os.path.dirname(htmlurl))
		except OSError as exc: # Guard against race condition
			if exc.errno != errno.EEXIST:
				raise

	htmlfile = open(htmlurl, 'w')

	jsfile = open(jsurl, 'w')


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
	</head>
	<body>

	<div class="header">
	  <h1>Covid-19 Dashboard for '''+district+'''</h1>
	  
	</div>

	<div class="row">
	  <div class="column side">
		
	  </div>
	  
	  <div class="column middle">
		<p><br></p>

		<p id="hdemo"></p>
		<p id="demo"></p>
		<script src="index.js" type="text/javascript"></script>
	  </div>
	  
	  <div class="column side">
		
	  </div>
	</div>
	<div class="footer">
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
		htxt += "<c>Confirmed<br>"+myObj[len-1].confirmed+"</c><a >Active<br>"+myObj[len-1].active+"</a><r>Recovered<br>"+myObj[len-1].recovered+"</r><d>Deceased<br>"+myObj[len-1].deceased+"</d>" ;
		document.getElementById("hdemo").innerHTML = htxt;
		
		var txt = "" ;
		txt += "<table>" ;

		txt += "<tr><th>Block</th><th style=\\"color:orange;\\">Confirmed</th><th style=\\"color:blue;\\">Active</th><th style=\\"color:green;\\">Recovered</th><th style=\\"color:red;\\">Deceased</th></tr>" ;
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
	xmlhttp.send();'''

	htmlfile.write(htmltxt)
	jsfile.write(jstxt)