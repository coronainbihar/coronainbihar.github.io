var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		
		var myObj = JSON.parse(this.responseText);
		var len = myObj.length ;

		var htxt = "" ;
		htxt += "<c>Confirmed<br>"+myObj[len-1].confirmed+"</c><a >Active<br>"+myObj[len-1].active+"</a><r>Recovered<br>"+myObj[len-1].recovered+"</r><d>Deceased<br>"+myObj[len-1].deceased+"</d>" ;
		document.getElementById("hdemo").innerHTML = htxt;
		
		var txt = "" ;
		txt += "<table>" ;

		txt += "<tr><th>Block</th><th>New Confirmed</th><th>Confirmed</th><th>Active</th><th>Recovered</th><th>Deceased</th></tr>" ;
		var x ;
		for (x = 0; x < len-1; x++) {
		  /* txt += "<tr><td>" + myObj[x].name + "</td></tr>"; */
		  txt += "<tr><td>"+myObj[x].block+"</td><td>"+myObj[x].new_confirmed+"</td><td>"+myObj[x].confirmed+"</td><td>"+myObj[x].active+"</td><td>"+myObj[x].recovered+"</td><td>"+myObj[x].deceased+"</td></tr>" ;
		}
		txt += "</table>"    
		document.getElementById("demo").innerHTML = txt;
	  }
	};
	xmlhttp.open("GET", "Muzaffarpurcsv.json", true);
	xmlhttp.send();