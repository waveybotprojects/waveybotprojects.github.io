var StopTheFire = {};
var goal = "";
var count = "";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

setInterval(() => {
  $.each($('iframe'), (arr,x) => {
      let src = $(x).attr('src');
      if (src && src.match(/(ads-iframe)|(disqusads)/gi)) {
          $(x).remove();
      }
  });
}, 300);

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
      text: 'Live Count Graph'
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
      name: 'Live Count',
      marker: {
          enabled: false
      }
  }]
});

window.onload = () => {
    $(".links").load("/assets/global/other.html");
}

setInterval(function() {
    $.getJSON('https://app.softgiving.com/api/aussie-fires/campaign', function(data) {
      var num = data.initiative.total_donation_amount_cents
      var num2 = num.toString();
      var result = num2.slice(0, -2) +"."+num2.slice(-2);
      StopTheFire.UpdateManager.updateCount(numberWithCommas(result))

      chart.series[0].addPoint([                   
        (new Date()).getTime(),
        parseInt(result)
    ])

    if (chart.series[0].data.length >= 900) {
        chart.series[0].data[0].remove()
    }

    })

}, 2000)


StopTheFire.UpdateManager = {
  updateCount: function(a) {
    document.querySelector(".view-odo").innerHTML=a;
  }
}