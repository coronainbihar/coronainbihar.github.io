var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    
    var myObj = JSON.parse(this.responseText);
    var myState = myObj.Bihar.districtData ;
    var tnconfirmed = 0, tconfirmed = 0, tactive = 0, trecovered = 0, tdeceased = 0;
    
    districtlist = ["Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur","Bhojpur","Buxar","Darbhanga","East Champaran","Gaya","Gopalganj","Jamui","Jehanabad","Kaimur","Katihar","Khagaria","Kishanganj","Lakhisarai","Madhepura","Madhubani","Munger","Muzaffarpur","Nalanda","Nawada","Patna","Purnia","Rohtas","Saharsa","Samastipur","Saran","Sheikhpura","Sheohar","Sitamarhi","Siwan","Supaul","Vaishali","West Champaran"]
    /* districtlist = ["Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur","Bhojpur","Buxar","Darbhanga","East Champaran","Gaya","Gopalganj","Jamui","Jehanabad","Kaimur","Katihar","Khagaria","Kishanganj","Lakhisarai","Madhepura","Madhubani","Munger","Muzaffarpur","Nalanda","Nawada","Patna","Purnia","Rohtas","Saharsa","Samastipur","Saran","Sheikhpura","Sheohar","Sitamarhi","Siwan","Supaul","Vaishali","West Champaran","Unknown"] */
	var len = districtlist.length ;
    

    var txt = "" ;
    txt += "<table><thead>" ;

    txt += "<tr><th onclick=\"sortTable(0, 0)\">District &#8645</th><th onclick=\"sortTable(1, 1)\" style=\"color:red;\">New Confirmed  &#8645</th><th onclick=\"sortTable(2, 1)\" style=\"color:orange;\">Confirmed &#8645</th><th onclick=\"sortTable(3, 1)\" style=\"color:blue;\">Active &#8645</th><th onclick=\"sortTable(4, 1)\" style=\"color:green;\">Recovered &#8645</th><th onclick=\"sortTable(5, 1)\" style=\"color:red;\">Deceased &#8645</th></tr></thead><tbody>" ;
    var x ;
    for (x = 0; x < len; x++) {
      /* txt += "<tr><td>" + myObj[x].name + "</td></tr>"; */
      var district = districtlist[x] ;
      var myDis = myState[district] ;
      var new_confirmed = Number(myDis.delta.confirmed) ;
      var confirmed = Number(myDis.confirmed) ;
      var active = Number(myDis.active) ;
      var recovered = Number(myDis.recovered) ;
      var deceased = Number(myDis.deceased) ;

      tnconfirmed += new_confirmed;
      tconfirmed += confirmed ;
      tactive += active ;
      trecovered += recovered ;
      tdeceased += deceased ;

	  if (district.localeCompare("Unknown") == 0){
		  txt += "<tr><td>"+district+"</td><td style=\"color:red;\">"+new_confirmed+"</td><td>"+confirmed+"</td><td style=\"color:blue;\">"+active+"</td><td style=\"color:green;\">"+recovered+"</td><td style=\"color:red;\">"+deceased+"</td></tr>" ;
	  }
	  else {
		txt += "<tr onclick=\"window.location=\'district/"+district+"/index.html\';\"><td>"+district+"</td><td style=\"color:red;\">"+new_confirmed+"</td><td>"+confirmed+"</td><td style=\"color:blue;\">"+active+"</td><td style=\"color:green;\">"+recovered+"</td><td style=\"color:red;\">"+deceased+"</td></tr>" ;
	  }    
	}
    txt += "</tbody></table>"    
    document.getElementById("myTable").innerHTML = txt;

    var htxt = "" ;
    htxt += "<ccard>Confirmed<br>"+"<font color = \"red\">[+"+tnconfirmed+"]  </font>"+tconfirmed+"</ccard><acard >Active<br>"+tactive+"</acard><rcard>Recovered<br>"+trecovered+"</rcard><dcard>Deceased<br>"+tdeceased+"</dcard>" ;
    document.getElementById("hdemo").innerHTML = htxt;
  }
};
xmlhttp.open("GET", "https://api.covid19india.org/state_district_wise.json", true);
xmlhttp.send();


function searchFunction() {
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