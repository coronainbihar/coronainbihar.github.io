var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    
    var myObj = JSON.parse(this.responseText);
    var len = myObj.length ;

    var htxt = "" ;
    htxt += "<ccard>Confirmed<br>"+"<font color = \"red\">[+"+myObj[len-1].new_confirmed+"]  </font>"+myObj[len-1].confirmed+"</ccard><acard >Active<br>"+myObj[len-1].active+"</acard><rcard>Recovered<br>"+myObj[len-1].recovered+"</rcard><dcard>Deceased<br>"+myObj[len-1].deceased+"</dcard>" ;
    document.getElementById("hdemo").innerHTML = htxt;
    
    
    var txt = "" ;
    txt += "<table><thead>" ;

    txt += "<tr><th onclick=\"sortTable(0, 0)\">District &#8645</th><th onclick=\"sortTable(1, 1)\" style=\"color:red;\">New Confirmed  &#8645</th><th onclick=\"sortTable(2, 1)\" style=\"color:orange;\">Confirmed &#8645</th><th onclick=\"sortTable(3, 1)\" style=\"color:blue;\">Active &#8645</th><th onclick=\"sortTable(4, 1)\" style=\"color:green;\">Recovered &#8645</th><th onclick=\"sortTable(5, 1)\" style=\"color:red;\">Deceased &#8645</th></tr></thead><tbody>" ;
    var x ;
    for (x = 0; x < len-1; x++) {
      /* txt += "<tr><td>" + myObj[x].name + "</td></tr>"; */
	  var nc = "" ;
	  var zcolor = "" ;
	  
	  /*if (myObj[x].new_confirmed > 0){
		  nc = "<font color = \"red\">[+"+myObj[x].new_confirmed+"]  </font>" ;
	  }*/
	  
	  if (myObj[x].color == "red"){
		  zcolor = " rgba(255, 0, 0, 0.2)" ;
	  }
	  else if (myObj[x].color == "orange"){
		  zcolor = " rgba(255, 165, 0, 0.2)" ;
	  }
	  else if (myObj[x].color == "green") {
		  zcolor = " rgba(0, 128, 0, 0.2)"
	  }
	  else {
		  zcolor = " " ;
	  }
	  txt += "<tr style=\"background-color:"+zcolor+";\" onclick=\"window.location=\'"+myObj[x].link+"\';\"><td>"+myObj[x].district+"</td><td style=\"color:red;\">"+myObj[x].new_confirmed+"</td><td>"+nc+myObj[x].confirmed+"</td><td style=\"color:blue;\">"+myObj[x].active+"</td><td style=\"color:green;\">"+myObj[x].recovered+"</td><td style=\"color:red;\">"+myObj[x].deceased+"</td></tr>" ;
    }
    txt += "</tbody></table>"    
    document.getElementById("myTable").innerHTML = txt;
  }
};
xmlhttp.open("GET", "Biharcsv.json", true);
xmlhttp.send();


function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

function openWin() {
  window.open("https://forms.gle/BB1eWe9bJ6HmqqHc8");
}
function openWin1() {
  window.open("https://github.com/coronainbihar/coronainbihar.github.io");
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}