var StoryFire = {};
var video1 = "";
var video2 = "";
var key = "";
var rightKeys = [];

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
            text: 'View Difference Graph'
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
            name: 'View Difference',
            marker: {
                enabled: false
            }
        }]
    });

window.onload = () => {
    if (!getUrlVars()["v1"]) {
        video1 = "5e5ca347bd322b00287a1ecc";
    } else {
        video1 = getUrlVars()["v1"];
    }

    if (!getUrlVars()["v2"]) {
        video2 = "5e5af541eb7beb0028039dfb";
    } else {
        video2 = getUrlVars()["v2"];
    }

    $.getJSON('https://storyfire.com/app/videoDetail/'+video1, function(data) {
      $.getJSON('https://storyfire.com/app/videoDetail/'+video2, function(data2) {
        StoryFire.UpdateManager.updateTitle(data.video.title, data2.video.title)
        StoryFire.UpdateManager.updateThumbnail(data.video.storyImage, data2.video.storyImage)
        StoryFire.UpdateManager.updateViews(data.video.views, data2.video.views, data.video.views - data2.video.views)
        chart.series[0].addPoint([(new Date()).getTime(), Math.abs(data.video.views - data2.video.views)])
      })
    })


    if (window.location.href.indexOf(video1 || video2) > -1) {
        return;
    } else {
        history.pushState(null,'',window.location.href+'?v1='+video1+'&v2='+video2)
    }
}

setInterval(function () {
  $.getJSON('https://storyfire.com/app/videoDetail/'+video1, function(data) {
    $.getJSON('https://storyfire.com/app/videoDetail/'+video2, function(data2) {
      StoryFire.UpdateManager.updateViews(data.video.views, data2.video.views, data.video.views - data2.video.views)
      chart.series[0].addPoint([(new Date()).getTime(), Math.abs(data.video.views - data2.video.views)])
      if (chart.series[0].data.length >= 900) {
          chart.series[0].data[0].remove()
      }
    })
  })
}, 5000)

StoryFire.UpdateManager = {
    updateThumbnail: function(a,b) {
        document.querySelector(".thumbnail1").src = a;
        document.querySelector(".thumbnail2").src = b;
    },

    updateTitle: function(a,b) {
        document.querySelector(".title1").innerText= a;
        document.querySelector(".title2").innerText= b;
    },

    updateViews: function(a,b,c) {
        document.querySelector(".odo1").innerHTML=a;
        document.querySelector(".odo2").innerHTML=b;
        document.querySelector(".difference-odo").innerHTML=c;
    }
}


document.getElementById("search1").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        search1()
    }
})
document.getElementById("search2").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        search2()
    }
})

function search1() {
  var val = document.getElementById('search1').value
  window.location.href = '/storyfire-view-count/compare/?v1=' + val.split("/")[4] + '&v2=' + video2;
}

function search2() {
  var val = document.getElementById('search2').value
  window.location.href = '/storyfire-view-count/compare/?v1=' + video1 + '&v2=' + val.split("/")[4];
}

$("#searchbutton1").click(function(){
    search1();
    })

    $("#searchbutton2").click(function(){
        search2();
        })
  
