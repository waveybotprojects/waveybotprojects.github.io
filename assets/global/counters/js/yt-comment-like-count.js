var YT = {};
var rightKeys = [];
var goal = "";
var comment = "";
var rightKey;

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value
  });
  return vars
}

window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-119417406-7');

setInterval(() => {
  $.each($('iframe'), (arr, x) => {
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
    text: 'Comment Like Count Graph'
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
    name: 'Comment Like Count',
    marker: {
      enabled: false
    }
  }]
});

function keysCheck() {
  for (let i = 0; i < APIKeys.length; i++) {
    setTimeout(function timer() {
      var checkKey = APIKeys[Math.floor(Math.random() * APIKeys.length)];
      $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=hHW1oY26kxQ&key=' + checkKey, function () {
        if (rightKeys.includes(checkKey)) {
          console.log("Tried to add key that already exists in array! Returning...")
          return;
        } else {
          rightKeys.push(checkKey)
          console.log("Valid key! Added to array, trying more...")
        }
      }).fail(function () {
        if (rightKeys.includes(checkKey)) {
          rightKeys.pop(checkKey)
          console.log("Invalid key detected in array, removing it...")
        }
        console.log("Invalid key, retrying...")
      })
    }, i * 25);
  }
}

keysCheck()

setInterval(function () {
  keysCheck();
}, 5 * 1000 * 3600)

setInterval(function () {
  rightKey = rightKeys[Math.floor(Math.random() * rightKeys.length)];

  $.getJSON('https://www.googleapis.com/youtube/v3/comments?part=snippet&id=' + comment + '&key=' + rightKey, function (data) {

    YT.UpdateManager.updateMain(data.items[0].snippet.likeCount)
    YT.GoalManager.load(data.items[0].snippet.likeCount)

    chart.series[0].addPoint([
      (new Date()).getTime(),
      data.items[0].snippet.likeCount
    ])


    if (chart.series[0].data.length >= 900) {
      chart.series[0].data[0].remove()
    }

  }).fail(function () {
    if (rightKeys.includes(rightKey)) {
      rightKeys.pop(rightKey)
      console.log("Invalid key detected in right key array, removing it...")
    }

    $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=comment&id=' + comment, function (data) {
      YT.UpdateManager.updateMain(data.snippet.likeCount)
      YT.GoalManager.load(data.snippet.likeCount)

      chart.series[0].addPoint([
        (new Date()).getTime(),
        data.snippet.likeCount
      ])


      if (chart.series[0].data.length >= 900) {
        chart.series[0].data[0].remove()
      }
    })
  })


}, 5000)

window.onload = () => {

  if (!getUrlVars()["q"]) {
    comment = "Ugyb0OkJoZemhn5BD194AaABAg"; //im the bald guy
  } else {
    comment = getUrlVars()["q"];
  }

  $.getJSON('https://www.googleapis.com/youtube/v3/comments?part=snippet&id=' + comment + '&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function (data) {
    if (data.items[0].snippet.textOriginal >= 52) {
      $(".comment-title").css("font-size", "calc(7px + 1vw)");
    }
    YT.UpdateManager.updateTitle(data.items[0].snippet.textOriginal)
  }).fail(function () {
    $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=comment&id=' + comment, function (data) {
      if (data.snippet.textOriginal >= 52) {
        $(".comment-title").css("font-size", "calc(7px + 1vw)");
      }
      YT.UpdateManager.updateTitle(data.snippet.textOriginal)
    })
  })

  $.getJSON('https://www.googleapis.com/youtube/v3/comments?part=snippet&id=' + comment + '&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function (data) {

    YT.UpdateManager.updateMain(data.items[0].snippet.likeCount)
    YT.GoalManager.load(data.items[0].snippet.likeCount)

    chart.series[0].addPoint([
      (new Date()).getTime(),
      data.items[0].snippet.likeCount
    ])


    if (chart.series[0].data.length >= 900) {
      chart.series[0].data[0].remove()
    }

  }).fail(function () {
    if (rightKeys.includes(rightKey)) {
      rightKeys.pop(rightKey)
      console.log("Invalid key detected in right key array, removing it...")
    }

    $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=comment&id=' + comment, function (data) {
      YT.UpdateManager.updateMain(data.snippet.likeCount)
      YT.GoalManager.load(data.snippet.likeCount)

      chart.series[0].addPoint([
        (new Date()).getTime(),
        data.snippet.likeCount
      ])


      if (chart.series[0].data.length >= 900) {
        chart.series[0].data[0].remove()
      }
    })
  })


  $(".links").load("/assets/global/other.html");

  document.getElementById("shareurl").value = window.location.href;
  document.getElementById("obsurl").value = window.location.href;
  document.getElementById("embed-website").value = '<iframe height="180px" width="500px" frameborder="0" src="' + window.location.href + '" allowfullscreen></iframe>';

  if (window.location.href.indexOf(comment) > -1) {
    return;
  } else {
    history.pushState(null, '', window.location.href + '?q=' + comment)
  }
}


YT.GoalManager = {
  load: function (a) {
    if (a < 0) goal = 0;
    if (a < 10 && a > 0) goal = 10 - a;
    if (a < 20 && a > 10) goal = 20 - a;
    if (a < 30 && a > 20) goal = 30 - a;
    if (a < 40 && a > 30) goal = 40 - a;
    if (a < 50 && a > 40) goal = 50 - a;
    if (a < 60 && a > 50) goal = 60 - a;
    if (a < 70 && a > 60) goal = 70 - a;
    if (a < 80 && a > 70) goal = 80 - a;
    if (a < 90 && a > 80) goal = 90 - a;
    if (a < 100 && a > 90) goal = 100 - a;
    if (a < 200 && a > 100) goal = 200 - a;
    if (a < 300 && a > 200) goal = 300 - a;
    if (a < 400 && a > 300) goal = 400 - a;
    if (a < 500 && a > 400) goal = 500 - a;
    if (a < 600 && a > 500) goal = 600 - a;
    if (a < 700 && a > 600) goal = 700 - a;
    if (a < 800 && a > 700) goal = 800 - a;
    if (a < 900 && a > 800) goal = 900 - a;
    if (a < 1000 && a > 900) goal = 1000 - a;
    if (a < 2000 && a > 1000) goal = 2000 - a;
    if (a < 3000 && a > 2000) goal = 3000 - a;
    if (a < 4000 && a > 3000) goal = 4000 - a;
    if (a < 5000 && a > 4000) goal = 5000 - a;
    if (a < 6000 && a > 5000) goal = 6000 - a;
    if (a < 7000 && a > 6000) goal = 7000 - a;
    if (a < 8000 && a > 7000) goal = 8000 - a;
    if (a < 9000 && a > 8000) goal = 9000 - a;
    if (a < 10000 && a > 9000) goal = 10000 - a;
    if (a < 20000 && a > 10000) goal = 20000 - a;
    if (a < 30000 && a > 20000) goal = 30000 - a;
    if (a < 40000 && a > 30000) goal = 40000 - a;
    if (a < 50000 && a > 40000) goal = 50000 - a;
    if (a < 60000 && a > 50000) goal = 60000 - a;
    if (a < 70000 && a > 60000) goal = 70000 - a;
    if (a < 80000 && a > 70000) goal = 80000 - a;
    if (a < 90000 && a > 80000) goal = 90000 - a;
    if (a < 100000 && a > 90000) goal = 100000 - a;
    if (a < 200000 && a > 100000) goal = 200000 - a;
    if (a < 300000 && a > 200000) goal = 300000 - a;
    if (a < 400000 && a > 300000) goal = 400000 - a;
    if (a < 500000 && a > 400000) goal = 500000 - a;
    if (a < 600000 && a > 500000) goal = 600000 - a;
    if (a < 700000 && a > 600000) goal = 700000 - a;
    if (a < 800000 && a > 700000) goal = 800000 - a;
    if (a < 900000 && a > 800000) goal = 900000 - a;
    if (a < 1000000 && a > 900000) goal = 1000000 - a;
    if (a < 2000000 && a > 1000000) goal = 2000000 - a;
    if (a < 3000000 && a > 2000000) goal = 3000000 - a;
    if (a < 4000000 && a > 3000000) goal = 4000000 - a;
    if (a < 5000000 && a > 4000000) goal = 5000000 - a;
    if (a < 6000000 && a > 5000000) goal = 6000000 - a;
    if (a < 7000000 && a > 6000000) goal = 7000000 - a;
    if (a < 8000000 && a > 7000000) goal = 8000000 - a;
    if (a < 9000000 && a > 8000000) goal = 9000000 - a;
    if (a < 10000000 && a > 9000000) goal = 10000000 - a;
    if (a < 20000000 && a > 10000000) goal = 20000000 - a;
    if (a < 30000000 && a > 20000000) goal = 30000000 - a;
    if (a < 40000000 && a > 30000000) goal = 40000000 - a;
    if (a < 50000000 && a > 40000000) goal = 50000000 - a;
    if (a < 60000000 && a > 50000000) goal = 60000000 - a;
    if (a < 70000000 && a > 60000000) goal = 70000000 - a;
    if (a < 80000000 && a > 70000000) goal = 80000000 - a;
    if (a < 90000000 && a > 80000000) goal = 90000000 - a;
    if (a < 100000000 && a > 90000000) goal = 100000000 - a;
    if (a < 200000000 && a > 100000000) goal = 200000000 - a;
    if (a < 300000000 && a > 200000000) goal = 300000000 - a;
    if (a < 400000000 && a > 300000000) goal = 400000000 - a;
    if (a < 500000000 && a > 400000000) goal = 500000000 - a;
    if (a < 600000000 && a > 500000000) goal = 600000000 - a;
    if (a < 700000000 && a > 600000000) goal = 700000000 - a;
    if (a < 800000000 && a > 700000000) goal = 800000000 - a;
    if (a < 900000000 && a > 800000000) goal = 900000000 - a;
    if (a < 1000000000 && a > 900000000) goal = 1000000000 - a;
    if (a < 2000000000 && a > 1000000000) goal = 2000000000 - a;
    if (a < 3000000000 && a > 2000000000) goal = 3000000000 - a;
    if (a < 4000000000 && a > 3000000000) goal = 4000000000 - a;
    if (a < 5000000000 && a > 4000000000) goal = 5000000000 - a;
    if (a < 6000000000 && a > 5000000000) goal = 6000000000 - a;
    if (a < 7000000000 && a > 6000000000) goal = 7000000000 - a;
    if (a < 8000000000 && a > 7000000000) goal = 8000000000 - a;
    if (a < 9000000000 && a > 8000000000) goal = 9000000000 - a;
    if (a < 10000000000 && a > 9000000000) goal = 10000000000 - a;
    if (a < 20000000000 && a > 10000000000) goal = 20000000000 - a;
    YT.UpdateManager.updateGoal(goal)
  }
}

YT.UpdateManager = {
  updateTitle: function (a) {
    document.querySelector(".comment-title").innerText = a;
  },
  updateMain: function (a) {
    document.querySelector(".view-odo").innerHTML = a;
  },
  updateGoal: function (a) {
    document.querySelector(".goal-odo").innerHTML = a;
  }
}

function search() {
  var value = document.getElementById('search').value;
  var actualId = value.split("&lc=")
  window.location.href = '/yt-comment-like-count/?q=' + actualId[1];
}

$("#searchbutton").click(function () {
  search();
})

document.getElementById("search").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    search()
  }
})