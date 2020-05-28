var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		
		var myObj = JSON.parse(this.responseText);
		var len = myObj.length ;

		
		
		var txt = "" ;
		txt += "<table>" ;

		txt += "<tr><th onclick=\"sortTable(0, 0)\">Block &#8645</th><th onclick=\"sortTable(1, 1)\" style=\"color:orange;\">Confirmed &#8645</th><th onclick=\"sortTable(2, 1)\" style=\"color:blue;\">Active &#8645</th><th onclick=\"sortTable(3, 1)\" style=\"color:green;\">Recovered &#8645</th><th onclick=\"sortTable(4, 1)\" style=\"color:red;\">Deceased &#8645</th></tr>" ;
		var x ;
		for (x = 0; x < len-1; x++) {
		  /* txt += "<tr><td>" + myObj[x].name + "</td></tr>"; */
		  txt += "<tr><td>"+myObj[x].block+"</td><td>"+myObj[x].confirmed+"</td><td  style=\"color:blue;\">"+myObj[x].active+"</td><td style=\"color:green;\">"+myObj[x].recovered+"</td><td style=\"color:red;\">"+myObj[x].deceased+"</td></tr>" ;
		}
		txt += "</table>"    
		document.getElementById("demo").innerHTML = txt;
	  }
	};
	xmlhttp.open("GET", "Purniacsv.json", true);
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
    for (i = 1; i < (rows.length - 2); i++) {
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

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
	