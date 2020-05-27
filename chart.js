var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    
    var myState = myObj.states_daily;
    var len = myState.length/3;
    var x ;
    var statecode = "br" ;
    
    var date = [] ;
    var confirmed = [];
    var deceased = [];
    var recovered = [];
    for (x = 0 ; x<len ;x++){
      confirmed[x] = Number(myState[3*x].br) ;
      recovered[x] = Number(myState[3*x+1].br) ;
      deceased[x] = Number(myState[3*x+2].br) ;
      date[x] = myState[3*x].date;
    }
   
    Highcharts.chart('container', {

      title: {
        text: 'Daily Cases in Bihar'
      },

      subtitle: {
        text: 'Source: covid19india.org'
      },

        yAxis: {
    title: {
      text: ''
    }
  },

  xAxis: {
    categories: date,
    tickmarkPlacement: 'on',
    title: {
      enabled: false
    }
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      
    }
  },
  series: [{
        name: 'Confirmed',
        data: confirmed
      }, {
        name: 'Recovered',
        data: recovered
      }, {
        name: 'Deceased',
        data: deceased
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }

    });
  }
};
xmlhttp.open("GET", "https://api.covid19india.org/states_daily.json", true);
xmlhttp.send();

Highcharts.theme = {
  colors: ['orange', 'green','red'],
};
Highcharts.setOptions( Highcharts.theme);

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    
    var myState = myObj.states_tested_data;
    var len = myState.length;
    var x ;
    var testdata = 0 ;
    var positivedata = 0 ;
    var datedata = "" ;
    
    var date = [] ;
    var test = [];
    var positive =[] ;
    var check = false ;
    for (x = 0 ; x<len ;x++){
      
      if (myState[x].state == "Bihar"){
        if (check == false){
          testdata = Number(myState[x].totaltested) ;
          positivedata = Number(myState[x].positive) ;
          check = true ;
          datedata = myState[x].updatedon ;
          
        }
        else {
          date.push(datedata) ;
		  if (Number(myState[x].totaltested)-testdata != Number(myState[x].totaltested) ){
			test.push(Number(myState[x].totaltested)-testdata) ;
		  }
		  else {
			  test.push(0) ;
		  }
          positive.push(Number(myState[x].positive)-positivedata) ;
          testdata = Number(myState[x].totaltested) ;
          positivedata = Number(myState[x].positive) ;
          datedata = myState[x].updatedon ;
        }
        
       }
    }
	document.getElementById("testdata").innerHTML = testdata;
   
    Highcharts.chart('container1', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Daily Samples Collection in Bihar'
      },
      subtitle: {
        text: 'Source: covid19india.org'
      },
      xAxis: {
        categories:date.slice(2,len),
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Daily Samples Collected'
        }
      },
      
      
      series: [{
        name: 'Samples Collected',
        data: test.slice(2,len) 

      }]
    });
  }
};
xmlhttp.open("GET", "https://api.covid19india.org/state_test_data.json", true);
xmlhttp.send();

