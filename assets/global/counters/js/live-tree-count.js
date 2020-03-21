var YT = {};
var goal = "";
var count = "";
var parser = new DOMParser();

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-119417406-7');

var chart = new Highcharts.chart({
  chart: {
      renderTo: 'chart',
      type: 'line'
  },
  title: {
      text: 'Tree Count Graph'
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
      name: 'Tree Count',
      marker: {
          enabled: false
      }
  }]
});

window.onload = () => {
    $(".links").load("/assets/global/other.html");
}

setInterval(function() {
  $.get("https://cors.livecounts.io/https://teamtrees.org/")
			.done(function(response) {
        var parse = parser.parseFromString(response, "text/html")
        var data = parseInt(parse.querySelector("#totalTrees").dataset.count)

        YT.UpdateManager.updateViews(data)
        YT.GoalManager.load(data);
  
        chart.series[0].addPoint([                   
          (new Date()).getTime(),
          data
      ])

      if (chart.series[0].data.length >= 900) {
        chart.series[0].data[0].remove()
      }
    })

}, 2000)

YT.GoalManager = {
  load: function(a) {
		goal = 20000000 - a;
    YT.UpdateManager.updateGoal(goal)
  }
}

YT.UpdateManager = {
  updateViews: function(a) {
    document.querySelector(".view-odo").innerHTML=a;
  },
  updateGoal: function(a) {
    document.querySelector(".goal-odo").innerHTML=a;
  }
}