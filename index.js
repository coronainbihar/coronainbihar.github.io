var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    
    var myObj = JSON.parse(this.responseText);
    var len = myObj.length ;

    var htxt = "" ;
    htxt += "<c>Confirmed<br>"+"<font color = \"red\">[+"+myObj[len-1].new_confirmed+"]  </font>"+myObj[len-1].confirmed+"</c><a >Active<br>"+myObj[len-1].active+"</a><r>Recovered<br>"+myObj[len-1].recovered+"</r><d>Deceased<br>"+myObj[len-1].deceased+"</d>" ;
    document.getElementById("hdemo").innerHTML = htxt;
    
    var txt = "" ;
    txt += "<table>" ;

    txt += "<tr><th onclick=\"sortTable(0, 0)\">District &#8645</th><th onclick=\"sortTable(1, 1)\" style=\"color:orange;\">Confirmed &#8645</th><th onclick=\"sortTable(2, 1)\" style=\"color:blue;\">Active &#8645</th><th onclick=\"sortTable(3, 1)\" style=\"color:green;\">Recovered &#8645</th><th onclick=\"sortTable(4, 1)\" style=\"color:red;\">Deceased &#8645</th></tr>" ;
    var x ;
    for (x = 0; x < len-1; x++) {
      /* txt += "<tr><td>" + myObj[x].name + "</td></tr>"; */
	  var nc = "" ;
	  if (myObj[x].new_confirmed > 0){
		  nc = "<font color = \"red\">[+"+myObj[x].new_confirmed+"]  </font>" ;
	  }
	  txt += "<tr onclick=\"window.location=\'"+myObj[x].link+"\';\"><td>"+myObj[x].district+"</td><td>"+nc+myObj[x].confirmed+"</td><td>"+myObj[x].active+"</td><td>"+myObj[x].recovered+"</td><td>"+myObj[x].deceased+"</td></tr>" ;
    }
    txt += "</table>"    
    document.getElementById("demo").innerHTML = txt;
  }
};
xmlhttp.open("GET", "Biharcsv.json", true);
xmlhttp.send();
