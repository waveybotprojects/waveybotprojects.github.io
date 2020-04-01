var TikTok = {};
var user = "";
var goal = "";

var ok = false;


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
		text: 'Follower Count Graph'
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
		name: 'Follower Count',
		marker: {
			enabled: false
		}
	}]
});

document.querySelector(".options-save-button").onclick = function() {
	if (document.querySelector(".checkbox-odo-slow").checked) {
		window.location = window.location.href.replace("o=1", "o=0")
	} else {
		window.location = window.location.href.replace("o=0", "o=1")
	}
}

TikTok.UrlManager = {
	addUser: function() {
		if (!getUrlVars()["u"]) {
			if (window.location.href.indexOf("?")>-1){
				history.pushState(null,'',window.location.href+'&u='+user)
			} else {
				history.pushState(null,'',window.location.href+'?u='+user);
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


setTimeout(function() {


    if (!getUrlVars()["u"]) {
        user = "charlidamelio";
    } else {
        user = getUrlVars()["u"]
	}

	TikTok.UrlManager.addUser();
	TikTok.UrlManager.addOdometer();
	
	if (getUrlVars()["o"] == "1") {
		document.getElementById('odometer').href='https://livecounts.io/assets/global/odometer-fast.css';
		$(".checkbox-odo-slow").prop("checked", false);
		$(".checkbox-odo-fast").prop("checked", true);
	} else {
		$(".checkbox-odo-slow").prop("checked", true);
		$(".checkbox-odo-fast").prop("checked", false);
	}

	$(".links").load("/assets/global/other.html");


	$.getJSON(corsProxies[Math.floor(Math.random() * corsProxies.length)]+'https://www.tiktok.com/node/share/user/@'+user, function(data) {
		if (data.body.userData) {
			document.querySelector(".url").href = "https://tiktok.com/@"+user
			document.querySelector("#shareurl").value = window.location.href
			TikTok.UpdateManager.updateAvatar(data.body.userData.coversMedium[0])
			document.querySelector("#embed-website").value = '<iframe height="80px" width="300px" frameborder="0" src="https://livecounts.io/tiktok-realtime/embed/?u='+user+'" allowfullscreen></iframe>'
			document.querySelector("#obs-url").value = 'https://livecounts.io/tiktok-realtime/embed/?u='+user
			document.title = "Livecounts.io - "+data.body.userData.nickName+" TikTok Live Follower Count"
			document.querySelector('meta[name="description"]').setAttribute("content", "Livecounts is a simple way to check "+data.body.userData.nickName+"'s TikTok Follower Count updated in real-time!");
			if (data.body.userData.verified) {
				TikTok.UpdateManager.updateName(data.body.userData.nickName + ' <img width="32" height="32" title="Verified" alt="Verified" src="/assets/global/tiktok-verified.png">')
			} else {
				TikTok.UpdateManager.updateName(data.body.userData.nickName)
			}
			TikTok.UpdateManager.updateOdometer(data.body.userData.fans)
			TikTok.UpdateManager.updateHearts(data.body.userData.heart)
			TikTok.GoalManager.load(data.body.userData.fans)
		} else {
			$("#errorModal").modal()
		}
	})
}, 1)

setInterval(function () {
	$.getJSON(corsProxies[Math.floor(Math.random() * corsProxies.length)]+'https://www.tiktok.com/node/share/user/@'+user, function(data) {
		TikTok.UpdateManager.updateOdometer(data.body.userData.fans)
		TikTok.UpdateManager.updateHearts(data.body.userData.heart)
		TikTok.GoalManager.load(data.body.userData.fans)

		if (!ok) {
			TikTok.UpdateManager.updateAvatar(data.body.userData.coversMedium[0])
			document.title = "Livecounts.io - "+data.body.userData.nickName+" TikTok Live Follower Count"
			document.querySelector('meta[name="description"]').setAttribute("content", "Livecounts is a simple way to check "+data.body.userData.nickName+"'s TikTok Follower Count updated in real-time!");
			document.querySelector(".url").href = "https://tiktok.com/@"+user
			document.querySelector("#shareurl").value = window.location.href
			document.querySelector("#embed-website").value = '<iframe height="80px" width="300px" frameborder="0" src="https://livecounts.io/tiktok-realtime/embed/?u='+user+'" allowfullscreen></iframe>'
			document.querySelector("#obs-url").value = 'https://livecounts.io/tiktok-realtime/embed/?u='+user
			if (data.body.userData.verified) {
				TikTok.UpdateManager.updateName(data.body.userData.nickName + ' <img width="32" height="32" title="Verified" alt="Verified" src="/assets/global/tiktok-verified.png">')
			} else {
				TikTok.UpdateManager.updateName(data.body.userData.nickName)
			}

			ok = true;
		}

		chart.series[0].addPoint([                   
			(new Date()).getTime(),
			data.body.userData.fans
		])

		if (chart.series[0].data.length >= 900) {
			chart.series[0].data[0].remove()
		}
	})
}, 2000)

TikTok.UpdateManager = {
	updateAvatar: function(a) {
		document.querySelector(".pfp").src = a;
	},
	updateName: function(a) {
		document.querySelector(".title").innerHTML = a;
	},
	updateOdometer: function(a) {
		document.querySelector(".main-odo").innerHTML=a;
	},
	updateGoal: function(a) {
		document.querySelector(".goal-odo").innerHTML=a;
	},
	updateHearts: function(a) {
		document.querySelector(".hearts-odo").innerHTML=a;
	}
}

TikTok.GoalManager = {
    load: function(a) {
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
		TikTok.UpdateManager.updateGoal(goal);
    }
}

function search() {
    window.location.href = '/tiktok-realtime/?u=' + document.getElementById('search').value.replace(" ", "").replace("@", "");
}

$("#searchbutton").click(function(){
	search();
})

document.getElementById("search").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        search()
    }
})