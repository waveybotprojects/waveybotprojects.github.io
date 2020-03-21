var Roblox = {};
var user = "";
var parser = new DOMParser();

var estimatedArray = [];
var previousCount;

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
		text: 'Roblox Follower Graph'
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
		name: 'Roblox Followers',
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

window.onload = () => {

	
	if (!getUrlVars()["id"]) {
		user = "1";
	} else {
		user = getUrlVars()["id"]
	}

	Roblox.UrlManager.addUser();
	Roblox.UrlManager.addTheme();
	Roblox.UrlManager.addOdometer();
	Roblox.ThemeManager.load();

	$.getJSON('https://cors.livecounts.io/https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds='+user+'&size=150x150&format=Png&isCircular=false', function(data) {
		$.getJSON('https://cors.livecounts.io/https://api.roblox.com/users/'+user, function(data2) {
			Roblox.UpdateManager.updateAvatar(data.data[0].imageUrl)
			Roblox.UpdateManager.updateName(data2.Username)
		})
	})

	$.getJSON('https://cors.livecounts.io/https://friends.roblox.com/v1/users/'+user+'/followers/count', function(data) {
		Roblox.UpdateManager.updateOdometer(data.count)
		Roblox.GoalManager.load(data.count)

		chart.series[0].addPoint([                   
			(new Date()).getTime(),
			data.count
		])

		
		if (chart.series[0].data.length >= 900) {
			chart.series[0].data[0].remove()
		}

		if (!isNaN(data)) {
			if (previousCount) {
				estimatedArray.push(data - previousCount)
				if (estimatedArray.length > 61) {
					estimatedArray.shift()
				}
			}
		}
		previousCount = data
		var estimated2Seconds = parseFloat(estimatedArray.reduce((a, b) => a + b, 0) * 10 / estimatedArray.length).toFixed(2)
		var estimated1Minute = parseFloat(estimatedArray.reduce((a, b) => a + b, 0) * 6 / estimatedArray.length).toFixed(2)
		var estimated1Hour = parseFloat(estimatedArray.reduce((a, b) => a + b, 0) * 360 / estimatedArray.length).toFixed(2)

		Roblox.UpdateManager.updateEstimatedCounts(estimated2Seconds, estimated1Minute, estimated1Hour)
	})

	if (getUrlVars()["o"] == "1") {
		document.getElementById('odometer').href='https://livecounts.io/assets/global/odometer-fast.css';
		$(".checkbox-odo-slow").prop("checked", false);
		$(".checkbox-odo-fast").prop("checked", true);
	} else {
		$(".checkbox-odo-slow").prop("checked", true);
		$(".checkbox-odo-fast").prop("checked", false);
	}

	document.getElementById('embed').href = "/roblox-realtime/embed/?id="+user

	$(".links").load("/assets/global/other.html");

};

setInterval(function() {
	var estimated1Minute = parseFloat(estimatedArray.reduce((a, b) => a + b, 0) * 12 / estimatedArray.length).toFixed(2)
	Twitter.UpdateManager.updateEstimatedCount2(estimated1Minute)
}, 60000)

setInterval(function() {
	var estimated1Hour = parseFloat(estimatedArray.reduce((a, b) => a + b, 0) * 720 / estimatedArray.length).toFixed(2)
	Twitter.UpdateManager.updateEstimatedCount3(estimated1Hour)
}, 3600000)

setInterval(function () {
	$.getJSON('https://cors.livecounts.io/https://friends.roblox.com/v1/users/'+user+'/followers/count', function(data) {
		Roblox.UpdateManager.updateOdometer(data.count)
		Roblox.GoalManager.load(data.count)

		chart.series[0].addPoint([                   
			(new Date()).getTime(),
			data.count
		])

		
		if (chart.series[0].data.length >= 900) {
			chart.series[0].data[0].remove()
		}

		if (!isNaN(data)) {
			if (previousCount) {
				estimatedArray.push(data - previousCount)
				if (estimatedArray.length > 61) {
					estimatedArray.shift()
				}
			}
		}
		previousCount = data

		var estimated2Seconds = parseFloat(estimatedArray.reduce((a, b) => a + b, 0) * 5 / estimatedArray.length).toFixed(2)
		Twitter.UpdateManager.updateEstimatedCount1(estimated2Seconds)
	})
}, 5000)

Roblox.UpdateManager = {
	updateAvatar: function(a) {
		document.querySelector(".pfp").src = a;
	},
	updateName: function(a) {
		document.querySelector(".title").innerText = a;
	},
	updateOdometer: function(a) {
		document.querySelector(".main-odo").innerHTML=a;
	},
	updateGoal: function(a) {
		document.querySelector(".goal-odo").innerHTML=a;
	},
	updateEstimatedCount1: function(a) {
		document.querySelector(".estimated-per-2-seconds-odo").innerHTML = a;
	},
	updateEstimatedCount2: function(a) {
		document.querySelector(".estimated-per-1-min-odo").innerHTML = a;
	},
	updateEstimatedCount3: function(a) {
		document.querySelector(".estimated-per-1-hr-odo").innerHTML = a;
	}
}

Roblox.UrlManager = {
	addUser: function() {
		if (!getUrlVars()["id"]) {
			if (window.location.href.indexOf("?")>-1){
				history.pushState(null,'',window.location.href+'&id='+user)
			} else {
				history.pushState(null,'',window.location.href+'?id='+user);
			}
		}
	},
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


Roblox.GoalManager = {
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
		Roblox.UpdateManager.updateGoal(goal);
    }
}

function search() {
	var val = document.getElementById('search').value
	if (isNaN(val) == true) {
		if (val.includes("/profile")) {
			var get = val.split("/")
			window.location.href = "/roblox-realtime/?id="+get[4]
		} else {
			alert("Invalid URL")
		}
	} else {
		window.location.href = "/roblox-realtime/?id="+val
	}
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

Roblox.ThemeManager = {
	load: function() {
		if (getUrlVars()["t"] == "0") {
			$(document).ready(function() {
				$("body").css("background-color", "#EFF4F8");
				$(".card").css("background-color", "white");
				$(".odometer").css("color", "#455a64");
				$(".text").css("color", "#000");
				$("h1").css("color", "#455a64");
				$("h4").css("color", "#000");
				$("h6").css("color", "#000");
				$("p").css("color", "#000");
				$("ul").css("background-color", "white");
				$(".odometer").removeClass('rainbow-text');
				$("li").removeClass('rainbow-text');
				$("h1").removeClass('rainbow-text');
				$("h4").removeClass('rainbow-text');
				$("h6").removeClass('rainbow-text');
				$("a").removeClass('rainbow-text');
				$(".links").removeClass('rainbow-text');
				$("p").removeClass('rainbow-text');
				$(".text").removeClass('rainbow-text');
				$("#square-dark").css("outline-style", "solid")
				$("#square-dark").css("outline-color", "white")
				$("#square-white").css("outline", "none")
				$("#square-rainbow-black").css("outline", "none")
				$("#square-rainbow-white").css("outline", "none")
				chart.chartBackground.css({color: '#fff'});
			})
		}
		if (getUrlVars()["t"] == "1") {
			$(document).ready(function() {
				$("body").css("background-color", "black");
				$(".card").css("background-color", "black");
				$(".odometer").css("color", "#808080");
				$(".text").css("color", "#808080");
				$("h1").css("color", "#808080");
				$("h4").css("color", "#808080");
				$("h6").css("color", "#808080");
				$("p").css("color", "#808080");
				$("ul").css("background-color", "black");
				$(".odometer").removeClass('rainbow-text');
				$("li").removeClass('rainbow-text');
				$("h1").removeClass('rainbow-text');
				$("h4").removeClass('rainbow-text');
				$("h6").removeClass('rainbow-text');
				$("p").removeClass('rainbow-text');
				$("a").removeClass('rainbow-text');
				$(".links").removeClass('rainbow-text');
				$(".text").removeClass('rainbow-text');
				$("#square-dark").css("outline-style", "solid")
				$("#square-dark").css("outline-color", "white")
				$("#square-white").css("outline", "none")
				$("#square-rainbow-black").css("outline", "none")
				$("#square-rainbow-white").css("outline", "none")
				chart.chartBackground.css({color: '#000'});
			})
		}
		if (getUrlVars()["t"] == "2") {
			$(document).ready(function() {
				$("body").css("background-color", "black");
				$(".card").css("background-color", "black");
				$(".odometer").addClass('rainbow-text');
				$(".text").addClass('rainbow-text');
				$("h1").addClass('rainbow-text');
				$("h4").addClass('rainbow-text');
				$("h6").addClass('rainbow-text');
				$("a").addClass('rainbow-text');
				$(".links").addClass('rainbow-text');
				$("p").addClass('rainbow-text');
				$("ul").css("background-color", "black");
				$("#square-dark").css("outline-style", "solid")
				$("#square-dark").css("outline-color", "white")
				$("#square-white").css("outline", "none")
				$("#square-rainbow-black").css("outline", "none")
				$("#square-rainbow-white").css("outline", "none")
				chart.chartBackground.css({color: '#000'});
			})
		}
		if (getUrlVars()["t"] == "3") {
			$(document).ready(function() {
				$("body").css("background-color", "#EFF4F8");
				$(".card").css("background-color", "white");
				$(".odometer").addClass('rainbow-text');
				$(".text").addClass('rainbow-text');
				$("h1").addClass('rainbow-text');
				$("h4").addClass('rainbow-text');
				$("h6").addClass('rainbow-text');
				$("a").addClass('rainbow-text');
				$(".links").addClass('rainbow-text');
				$("p").addClass('rainbow-text');
				$("ul").css("background-color", "white");
				$("#square-dark").css("outline-style", "solid")
				$("#square-dark").css("outline-color", "white")
				$("#square-white").css("outline", "none")
				$("#square-rainbow-black").css("outline", "none")
				$("#square-rainbow-white").css("outline", "none")
				chart.chartBackground.css({color: '#fff'});
			})
		}
	},
	setTheme: function(theme) {
		switch(theme) {
			case 0: {
				if (window.location.href.indexOf("t=0") > -1) {
				return;
				} else {
					$("body").css("background-color", "#EFF4F8");
					$(".card").css("background-color", "white");
					$(".odometer").css("color", "#455a64");
					$(".text").css("color", "#000");
					$("h1").css("color", "#455a64");
					$("h4").css("color", "#000");
					$("h6").css("color", "#000");
					$("p").css("color", "#000");
					$("ul").css("background-color", "white");
					$(".odometer").removeClass('rainbow-text');
					$("li").removeClass('rainbow-text');
					$("h1").removeClass('rainbow-text');
					$("h4").removeClass('rainbow-text');
					$("h6").removeClass('rainbow-text');
					$("a").removeClass('rainbow-text');
					$(".links").removeClass('rainbow-text');
					$("p").removeClass('rainbow-text');
					$(".text").removeClass('rainbow-text');
					$("#square-dark").css("outline-style", "solid")
					$("#square-dark").css("outline-color", "white")
					$("#square-white").css("outline", "none")
					$("#square-rainbow-black").css("outline", "none")
					$("#square-rainbow-white").css("outline", "none")
					chart.chartBackground.css({color: '#fff'});
					if (window.location.href.indexOf("?") > -1) {
						if (window.location.href.indexOf("t=1") > -1) {
							history.pushState(null, '', window.location.toString().replace('&t=1', '&t=0'));
						}
						if (window.location.href.indexOf("t=2") > -1) {
							history.pushState(null, '', window.location.toString().replace('&t=2', '&t=0'));
						}
						if (window.location.href.indexOf("t=3") > -1) {
							history.pushState(null, '', window.location.toString().replace('&t=3', '&t=0'));
						}
					} else {
						if (window.location.href.indexOf("t=1") > -1) {
							history.pushState(null, '', window.location.toString().replace('?t=1', '?t=0'));
						}
						if (window.location.href.indexOf("t=2") > -1) {
							history.pushState(null, '', window.location.toString().replace('?t=2', '?t=0'));
						}
						if (window.location.href.indexOf("t=3") > -1) {
							history.pushState(null, '', window.location.toString().replace('?t=3', '?t=0'));
						}
					}
				}
			} break;
			case 1: {
				if (window.location.href.indexOf("t=1") > -1) {
					return;
				} else {
					$("body").css("background-color", "black");
					$(".card").css("background-color", "black");
					$(".odometer").css("color", "#808080");
					$(".text").css("color", "#808080");
					$("h1").css("color", "#808080");
					$("h4").css("color", "#808080");
					$("h6").css("color", "#808080");
					$("p").css("color", "#808080");
					$("ul").css("background-color", "black");
					$(".odometer").removeClass('rainbow-text');
					$("li").removeClass('rainbow-text');
					$("h1").removeClass('rainbow-text');
					$("h4").removeClass('rainbow-text');
					$("h6").removeClass('rainbow-text');
					$("p").removeClass('rainbow-text');
					$("a").removeClass('rainbow-text');
					$(".links").removeClass('rainbow-text');
					$(".text").removeClass('rainbow-text');
					$("#square-dark").css("outline-style", "solid")
					$("#square-dark").css("outline-color", "white")
					$("#square-white").css("outline", "none")
					$("#square-rainbow-black").css("outline", "none")
					$("#square-rainbow-white").css("outline", "none")
					chart.chartBackground.css({color: '#000'});
					if (window.location.href.indexOf("?") > -1) {
						if (window.location.href.indexOf("t=0") > -1) {
							history.pushState(null, '', window.location.toString().replace('&t=0', '&t=1'));
						}
						if (window.location.href.indexOf("t=2") > -1) {
							history.pushState(null, '', window.location.toString().replace('&t=2', '&t=1'));
						}
						if (window.location.href.indexOf("t=3") > -1) {
							history.pushState(null, '', window.location.toString().replace('&t=3', '&t=1'));
						}
					} else {
						if (window.location.href.indexOf("t=0") > -1) {
							history.pushState(null, '', window.location.toString().replace('?t=0', '?t=1'));
						}
						if (window.location.href.indexOf("t=2") > -1) {
							history.pushState(null, '', window.location.toString().replace('?t=2', '?t=1'));
						}
						if (window.location.href.indexOf("t=3") > -1) {
							history.pushState(null, '', window.location.toString().replace('?t=3', '?t=1'));
						}
					}
				}
			} break;
			case 2: {
				if (window.location.href.indexOf("t=2") > -1) {
				return;
				} else {
					$("body").css("background-color", "black");
					$(".card").css("background-color", "black");
					$(".odometer").addClass('rainbow-text');
					$(".text").addClass('rainbow-text');
					$("h1").addClass('rainbow-text');
					$("h4").addClass('rainbow-text');
					$("h6").addClass('rainbow-text');
					$("a").addClass('rainbow-text');
					$(".links").addClass('rainbow-text');
					$("p").addClass('rainbow-text');
					$("ul").css("background-color", "black");
					$("#square-dark").css("outline-style", "solid")
					$("#square-dark").css("outline-color", "white")
					$("#square-white").css("outline", "none")
					$("#square-rainbow-black").css("outline", "none")
					$("#square-rainbow-white").css("outline", "none")
					chart.chartBackground.css({color: '#000'});
					if (window.location.href.indexOf("?") > -1) {
						if (window.location.href.indexOf("t=1") > -1) {
							history.pushState(null, '', window.location.toString().replace('&t=1', '&t=2'));
						}
						if (window.location.href.indexOf("t=0") > -1) {
							history.pushState(null, '', window.location.toString().replace('&t=0', '&t=2'));
						}
						if (window.location.href.indexOf("t=3") > -1) {
							history.pushState(null, '', window.location.toString().replace('&t=3', '&t=2'));
						}
					} else {
						if (window.location.href.indexOf("t=1") > -1) {
							history.pushState(null, '', window.location.toString().replace('?t=1', '?t=2'));
						}
						if (window.location.href.indexOf("t=0") > -1) {
							history.pushState(null, '', window.location.toString().replace('?t=0', '?t=2'));
						}
						if (window.location.href.indexOf("t=3") > -1) {
							history.pushState(null, '', window.location.toString().replace('?t=3', '?t=2'));
						}
					}
				}
			} break;
			case 3: {
				if (window.location.href.indexOf("t=3") > -1) {
				return;
				} else {
					$("body").css("background-color", "#EFF4F8");
					$(".card").css("background-color", "white");
					$(".odometer").addClass('rainbow-text');
					$(".text").addClass('rainbow-text');
					$("h1").addClass('rainbow-text');
					$("h4").addClass('rainbow-text');
					$("h6").addClass('rainbow-text');
					$("a").addClass('rainbow-text');
					$(".links").addClass('rainbow-text');
					$("p").addClass('rainbow-text');
					$("ul").css("background-color", "white");
					$("#square-dark").css("outline-style", "solid")
					$("#square-dark").css("outline-color", "white")
					$("#square-white").css("outline", "none")
					$("#square-rainbow-black").css("outline", "none")
					$("#square-rainbow-white").css("outline", "none")
					chart.chartBackground.css({color: '#fff'});
					if (window.location.href.indexOf("?") > -1) {
						if (window.location.href.indexOf("t=1") > -1) {
							history.pushState(null, '', window.location.toString().replace('&t=1', '&t=3'));
						}
						if (window.location.href.indexOf("t=0") > -1) {
							history.pushState(null, '', window.location.toString().replace('&t=0', '&t=3'));
						}
						if (window.location.href.indexOf("t=2") > -1) {
							history.pushState(null, '', window.location.toString().replace('&t=2', '&t=3'));
						}
					} else {
						if (window.location.href.indexOf("t=1") > -1) {
							history.pushState(null, '', window.location.toString().replace('?t=1', '?t=3'));
						}
						if (window.location.href.indexOf("t=0") > -1) {
							history.pushState(null, '', window.location.toString().replace('?t=0', '?t=3'));
						}
						if (window.location.href.indexOf("t=2") > -1) {
							history.pushState(null, '', window.location.toString().replace('?t=2', '?t=3'));
						}
					}
				}
			} break;
		}
	}
}