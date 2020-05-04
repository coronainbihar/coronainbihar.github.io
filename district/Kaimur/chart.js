
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		var myObj = JSON.parse(this.responseText);
		
		var myDis = myObj.districtsDaily.Bihar.Kaimur;
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
			text: 'Total cases in Kaimur '
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
		Highcharts.theme = {
		colors: ['blue', 'green', 'red'],
		}
		Highcharts.setOptions(Highcharts.theme);
	  }
	  
	};
	xmlhttp.open("GET", "https://api.covid19india.org/districts_daily.json", true);
	xmlhttp.send();


	