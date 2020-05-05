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

  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      
    }
  },
  series: [{
        name: 'Active',
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

