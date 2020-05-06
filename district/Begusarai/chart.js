
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		var myObj = JSON.parse(this.responseText);
		
		var myDis = myObj.districtsDaily.Bihar["Begusarai"];
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
			text: 'Total cases in Begusarai '
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
Highcharts.setOptions( Highcharts.theme);