var Twitch = {};
var user1 = "";
var user2 = "";
var parser = new DOMParser()

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
        text: 'Follower Difference Graph'
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
        name: 'Follower Difference',
        marker: {
            enabled: false
        }
    }]
});

window.onload = () => {
    if (!getUrlVars()["u1"]) {
        user1 = "Ninja";
    } else {
        user1 = getUrlVars()["u1"];
    }

    if (!getUrlVars()["u2"]) {
        user2 = "Shroud";
    } else {
        user2 = getUrlVars()["u2"];
    }

    $.get("https://cors.livecounts.io/https://www.lurker.tv/module/livestats.php?grab=channelinfo&channel="+user1)
        .done(function(response) {
            $.get("https://cors.livecounts.io/https://www.lurker.tv/module/livestats.php?grab=channelinfo&channel="+user2)
            .done(function(response2) {
                var parse1 = parser.parseFromString(response, "text/html")
                var avatar1 = parse1.querySelector('img').src
                var name1 = parse1.querySelector('a').text
                var parse2 = parser.parseFromString(response2, "text/html")
                var avatar2 = parse2.querySelector('img').src
                var name2 = parse2.querySelector('a').text
                Twitch.UpdateManager.updatePicture(avatar1, avatar2)
                Twitch.UpdateManager.updateName(name1, name2)
            })
    })
	

    if (window.location.href.indexOf(user1 || user2) > -1) {
        return;
      } else {
        history.pushState(null,'',window.location.href+'?u1='+user1+'&u2='+user2)
      }
}

Twitch.UpdateManager = {
    updateName: function(a,b) {
        document.querySelector(".username1").innerText = a;
        document.querySelector(".username2").innerText = b;
    },

    updatePicture: function(a,b) {
        document.querySelector('.pfp1').src = a;
        document.querySelector('.pfp2').src = b;
    },

    updateFollowers: function(a,b,c) {
        document.querySelector(".odo1").innerHTML=a;
        document.querySelector(".odo2").innerHTML=b;
        document.querySelector(".difference-odo").innerHTML=c;
    }
};

setInterval(function() {
    var today = new Date();
    $.getJSON('https://cors.livecounts.io/https://www.lurker.tv/module/livestats.php?grab=followers&channel='+user1,function(data) {
        $.getJSON('https://cors.livecounts.io/https://www.lurker.tv/module/livestats.php?grab=followers&channel='+user2,function(data2) {
            Twitch.UpdateManager.updateFollowers(data, data2, data - data2);
            chart.series[0].addPoint([                   
                (new Date()).getTime(),
                data - data2
            ]) 

            if (chart.series[0].data.length >= 900) {
                chart.series[0].data[0].remove()
            }
        })
    })
}, 2000)

function search1() {
    var replaceurl = document.getElementById('search1').value.replace(" ", "");
    window.location.href = '/twitch-realtime/compare/?u1=' +replaceurl+'&u2='+user2;
}

function search2() {
    var replaceurl = document.getElementById('search2').value.replace(" ", "");
    window.location.href = '/twitch-realtime/compare/?u1='+user1+'&u2='+replaceurl;
}

$("#searchbutton1").click(function(){
	search1();
})

$("#searchbutton2").click(function(){
	search2();
})

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