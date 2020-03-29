var Coronavirus = {};


function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value
	});
	return vars
  }
  

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-119417406-7');

setInterval(() => {
	$.each($('iframe'), (arr,x) => {
		let src = $(x).attr('src');
		if (src && src.match(/(ads-iframe)|(disqusads)/gi)) {
			$(x).remove();
		}
	});
}, 300);

var chart = new Highcharts.chart({
	chart: {
		renderTo: 'chart',
		type: 'line'
	},
	title: {
		text: 'Total Confirmed Graph'
	},
	xAxis: {
		type: 'datetime',
		tickPixelInterval: 150
	},
	yAxis: {
		title: {
			text: ''
		}
	},

	credits: {
		enabled: false
	},

	series: [{
		name: 'Total Confirmed',
		marker: {
			enabled: false
		}
	}]
});

$(".checkbox-odo-slow").click(function(){
	window.location = window.location.href.replace("o=1", "o=0")
})

$(".checkbox-odo-fast").click(function(){
	window.location = window.location.href.replace("o=0", "o=1")
})


setTimeout(function() {
	chart.chartBackground.css({color: '#1d1f20'});
	chart.title.css({color: '#fff'})

		$.get(
			"https://cors.livecounts.io/https://www.worldometers.info/coronavirus/", function(data) {
				var date1 = $(data).find('div.maincounter-number span')[0]
				var date2 = $(data).find('.maincounter-number')[1]
				var date3 = $(data).find('.maincounter-number')[2]

				var confirmed = $(date1).text().replace(/,/g, "")
				var deaths = $(date2).text().replace(/,/g, "")
				var recovered = $(date3).text().replace(/,/g, "")
	
				Coronavirus.UpdateManager.updateCounters(confirmed, deaths, recovered)

				chart.series[0].addPoint([                   
					(new Date()).getTime(),
					parseInt(confirmed)
				])
	
		})

	$(".links").load("/assets/global/other.html");

	$.getJSON('https://cors.livecounts.io/https://corona.lmao.ninja/countries',function(data) {
    	data.forEach(d => {
			//var country = d.country.split(",")
			//console.log(country[0].replace(/ /g, "-"))
			$('.selectCountry').append("<option>"+d.country+"</option>")
		})
	})
}, 1)

setInterval(function () {
	$.get(
		"https://cors.livecounts.io/https://www.worldometers.info/coronavirus/", function(data) {
			var date1 = $(data).find('div.maincounter-number span')[0]
			var date2 = $(data).find('.maincounter-number')[1]
			var date3 = $(data).find('.maincounter-number')[2]

			var confirmed = $(date1).text().replace(/,/g, "")
			var deaths = $(date2).text().replace(/,/g, "")
			var recovered = $(date3).text().replace(/,/g, "")

			Coronavirus.UpdateManager.updateCounters(confirmed, deaths, recovered)

			chart.series[0].addPoint([                   
				(new Date()).getTime(),
				parseInt(confirmed)
			])

		
		if (chart.series[0].data.length >= 900) {
			chart.series[0].data[0].remove()
		}
	})
}, 60000)

Coronavirus.UpdateManager = {
	updateCounters: function(a,b,c) {
		document.querySelector(".total-confirmed-odo").innerHTML=a;
		document.querySelector(".deaths-odo").innerHTML=b;
		document.querySelector(".recovered-odo").innerHTML=c;
	}
}

Coronavirus.UrlManager = {
	addTheme: function() {
		if (!getUrlVars()["t"]) {
			if (window.location.href.indexOf("?")>-1){
				history.pushState(null,'',window.location.href+'&t=0')
			} else {
				history.pushState(null,'',window.location.href+'?t=0');
			}
		}
	},
	
	addOdometer: function() {
		if (!getUrlVars()["o"]) {
			if (window.location.href.indexOf("?")>-1){
				history.pushState(null,'',window.location.href+'&o=0')
			} else {
				history.pushState(null,'',window.location.href+'?o=0');
			}
		}
	}
}