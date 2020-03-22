var YT = {};
var user = "";
var key = "";
var goal = "";

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-119417406-7');
var rightKeys = [];
var rightKey;
var ok;
var estimatedArray = [];
var previousCount;
var isUsingEstimatedCounters;
var isChartEnabled;

$('#theme-select').on('change', function(){
	window.location = 'https://livecounts.io/yt-sub-counter/theme/' + $(this).val();
})

setInterval(() => {
	$.each($('iframe'), (arr,x) => {
		let src = $(x).attr('src');
		if (src && src.match(/(ads-iframe)|(disqusads)/gi)) {
			$(x).remove();
		}
	});
}, 300);

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}

if(!getUrlVars()["c"]){
	user="UCaEk4apVOqy-sFVh3xnpJyw";
} else {
	user=getUrlVars()["c"];
}

if (getUrlVars()["o"] == "1") {
	document.getElementById('style').href='../../assets/global/odometer-fast.css';
	$(".checkbox-odo-slow").prop("checked", false);
	$(".checkbox-odo-fast").prop("checked", true);
} else {
	$(".checkbox-odo-slow").prop("checked", true);
	$(".checkbox-odo-fast").prop("checked", false);
}

if (getUrlVars()["ch"] == "0") {
	var chart = undefined
	$(".checkbox-chart-enable").prop("checked", false);
	$(".checkbox-chart-disable").prop("checked", true);
} else {
	var chart = new Highcharts.chart({
		chart: {
			renderTo: 'chart',
			type: 'line'
		},
		title: {
			text: 'Subscriber Count Graph',
			color: '#66666'
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
			name: 'Subscriber Count',
			marker: {
				enabled: false
			}
		}]
	});
	$(".checkbox-chart-enable").prop("checked", true);
	$(".checkbox-chart-disable").prop("checked", false);
}

$(".checkbox-odo-slow").click(function(){
	window.location = window.location.href.replace("o=1", "o=0")
})

$(".checkbox-odo-fast").click(function(){
	window.location = window.location.href.replace("o=0", "o=1")
})

$(".checkbox-chart-enable").click(function(){
	window.location = window.location.href.replace("ch=0", "ch=1")
})

$(".checkbox-chart-disable").click(function(){
	window.location = window.location.href.replace("ch=1", "ch=0")
})

setInterval(function() {
	if ($(window).width() < 1253) {
		document.querySelector(".card-container").classList.remove('offset-md-1');
		document.querySelector(".goal-container").classList.remove('offset-md-2');
		document.querySelector(".estimatedText").classList.remove('offset-md-3');
		document.querySelector(".estimated-container").classList.remove('offset-md-2');
		$('.md1-row').removeClass('offset-md-1');
	}
	
	if ($(window).width() > 1253) {
		document.querySelector(".card-container").classList.add('offset-md-1');
		document.querySelector(".goal-container").classList.add('offset-md-2');
		document.querySelector(".estimatedText").classList.add('offset-md-3');
		document.querySelector(".estimated-container").classList.add('offset-md-2');
		$('.md1-row').addClass('offset-md-1');
	}

	if ($(window).width() < 991) {
		document.querySelector(".ad").classList.remove('offset-md-1');
	}
}, 250)

function checkKeys() {
	for (let i=0; i<APIKeys.length; i++) {
		setTimeout( function timer(){
						var checkKey = APIKeys[Math.floor(Math.random()*APIKeys.length)];
				$.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=hHW1oY26kxQ&key='+checkKey, function() {
				if (rightKeys.includes(checkKey)) {
					console.log("Tried to add key that already exists in array! Returning...")
					return;
				} else {
					rightKeys.push(checkKey)
					console.log("Valid key! Added to array, trying more...")
				}
				}).fail(function() {
					if (rightKeys.includes(checkKey)) {
						rightKeys.pop(checkKey)
						console.log("Invalid key detected in array, removing it...")
					}
					console.log("Invalid key, retrying...")
			}) 
		}, i*25 );
	} 
}

checkKeys();

setInterval(function() {
	checkKeys();
}, 1 * 3600 * 1000)


setInterval(function() {
	var estimated1Minute = parseFloat(estimatedArray.reduce((a, b) => a + b, 0) * 30 / estimatedArray.length).toFixed(2)
	YT.UpdateManager.updateEstimatedCount2(estimated1Minute)
}, 60000)

setInterval(function() {
	var estimated1Hour = parseFloat(estimatedArray.reduce((a, b) => a + b, 0) * 1800 / estimatedArray.length).toFixed(2)
	YT.UpdateManager.updateEstimatedCount3(estimated1Hour)
}, 3600000)

var estimatedCountRefresh = setInterval(function() {
		$.getJSON('https://api.livecounts.io/yt_subs', function(data2) {
			var result = data2.filter(x => x.cid === user);
			if (result.length != 0) {
				YT.UpdateManager.updateSubs(YT.UpdateManager.updateSubs(result[0].subscriberCount))
				YT.GoalManager.load(YT.GoalManager.load(result[0].subscriberCount))

				document.querySelector(".estimatedText").innerText = "Please keep in mind this count is estimated! That means it might not be 100% accurate!!"
				
				if (getUrlVars()["ch"] == "1") {
					chart.series[0].addPoint([                   
						(new Date()).getTime(),
						parseInt(result[0].subscriberCount)
					])

					if (chart.series[0].data.length >= 900) {
						chart.series[0].data[0].remove()
					}
				}

				if (!isNaN(result[0].subscriberCount)) {
					if (previousCount) {
						estimatedArray.push(result[0].subscriberCount - previousCount)
						if (estimatedArray.length > 61) {
							estimatedArray.shift()
						}
					}
				}
				previousCount = result[0].subscriberCount
				var estimated2Seconds = parseFloat(estimatedArray.reduce((a, b) => a + b, 0) * 2 / estimatedArray.length).toFixed(2)

				YT.UpdateManager.updateEstimatedCount1(estimated2Seconds)
				

			}
		})

}, 2000)

var totalViewsRefresh = setInterval(function() {
	$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id='+user+'&key='+rightKey, function(data) {
		YT.UpdateManager.updateTotalViews(parseInt(data.items[0].statistics.viewCount))
	})
}, 10 * 60 * 1000)

var normalCountRefresh = setInterval(function() {
	var rightKey = rightKeys[Math.floor(Math.random()*rightKeys.length)];

	$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id='+user+'&key='+rightKey, function(data) {
		YT.UpdateManager.updateSubs(data.items[0].statistics.subscriberCount)
		YT.GoalManager.load(data.items[0].statistics.subscriberCount)

		if (getUrlVars()["ch"] == "1") {
			chart.series[0].addPoint([                   
				(new Date()).getTime(),
				parseInt(data.items[0].statistics.subscriberCount)
			])

			
			if (chart.series[0].data.length >= 900) {
				chart.series[0].data[0].remove()
			}
		}
			
	}).fail(function() {
		rightKeys.pop(rightKey)
		console.log("Invalid key detected in right keys array, removing it...")
			$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=statistics&id='+user, function(data) {
				YT.UpdateManager.updateSubs(data.statistics.subscriberCount)
				YT.GoalManager.load(data.statistics.subscriberCount)
		
				if (getUrlVars()["ch"] == "1") {
					chart.series[0].addPoint([                   
						(new Date()).getTime(),
						parseInt(data.statistics.subscriberCount)
					])
		
					
					if (chart.series[0].data.length >= 900) {
						chart.series[0].data[0].remove()
					}
				}
			})
	});
}, 60000)

window.onload = () => {
	YT.UrlManager.addUser();
	YT.UrlManager.addTheme();
	YT.UrlManager.addOdometer();
	YT.UrlManager.addChart();
	YT.ThemeManager.load();
	YT.GoalManager.load();

	$.getJSON('https://api.livecounts.io/yt_subs', function(data) {
		var result = data.filter(x => x.cid === user);
		if (result.length != 0) {
			isUsingEstimatedCounters = true
			clearInterval(normalCountRefresh);
		} else {
			clearInterval(estimatedCountRefresh);
			if (rightKeys.length == 0) {
				$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=statistics&id='+user, function(data) {
					YT.UpdateManager.updateSubs(data.statistics.subscriberCount)
					YT.GoalManager.load(data.statistics.subscriberCount)
			
					if (getUrlVars()["ch"] == "1") {
						chart.series[0].addPoint([                   
							(new Date()).getTime(),
							parseInt(data.statistics.subscriberCount)
						])
					}
				})
			}
		}
	})

	$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings&id='+user+'&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function(data) {
			YT.UpdateManager.updateName(data.items[0].snippet.title)
			YT.UpdateManager.updateAvatar(data.items[0].snippet.thumbnails.high.url)
			document.querySelector('.youtube-link').href = 'https://www.youtube.com/channel/'+data.items[0].id
			document.querySelector('.username').innerText = data.items[0].snippet.title;
			if (data.items[0].brandingSettings.image.bannerImageUrl.toString() != "http://s.ytimg.com/yts/img/channels/c4/default_banner-vfl7DRgTn.png") {
				YT.UpdateManager.updateBanner(data.items[0].brandingSettings.image.bannerImageUrl)
				$.post('https://api.livecounts.io/subGainPost', {username: data.items[0].snippet.title, cid: user})
			} else {
				if (user == "UCZJ7m7EnCNodqnu5SAtg8eQ" || user == "UCYiGq8XF7YQD00x7wAd62Zg") {
					YT.UpdateManager.updateBanner("https://livecounts.io/yt-sub-counter/assets/img/german-banner.png")
				} else {
					YT.UpdateManager.updateBanner("https://livecounts.io/yt-sub-counter/compare/assets/img/banner.jpg")
				}
			}
	}).fail(function() {
		$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=snippet&id='+user, function(data) {
			YT.UpdateManager.updateName(data.snippet.title)
			YT.UpdateManager.updateAvatar(data.snippet.thumbnails.high.url)
			document.querySelector('.youtube-link').href = 'https://www.youtube.com/channel/'+data.id
			document.querySelector('.username').innerText = data.snippet.title;
			if (data.brandingSettings.image.bannerImageUrl.toString() != "http://s.ytimg.com/yts/img/channels/c4/default_banner-vfl7DRgTn.png") {
				YT.UpdateManager.updateBanner(data.brandingSettings.image.bannerImageUrl)
				$.post('https://api.livecounts.io/subGainPost', {username: data.snippet.title, cid: user})
			} else {
				if (user == "UCZJ7m7EnCNodqnu5SAtg8eQ" || user == "UCYiGq8XF7YQD00x7wAd62Zg") {
					YT.UpdateManager.updateBanner("https://livecounts.io/yt-sub-counter/assets/img/german-banner.png")
				} else {
					YT.UpdateManager.updateBanner("https://livecounts.io/yt-sub-counter/compare/assets/img/banner.jpg")
				}
			}
		})
	})
	
	document.querySelector('.share-link').value= window.location.href;
	document.querySelector('.embed-link').value = '<iframe height="180px" width="500px" frameborder="0" src="https://livecounts.io/yt-sub-counter/embed/?c='+user+'" allowfullscreen></iframe>';
	document.querySelector('.embed-obs-link').value = 'https://livecounts.io/yt-sub-counter/embed/?c='+user;
	$(".links").load("/assets/global/other.html");

	if (getUrlVars["t"] == "0") {
		$("#square-white").css("outline-style", "solid")
		$("#square-white").css("outline-color", "black")
	}

	$.getJSON("https://api.livecounts.io/channelPromotions", function(data) {
		data.forEach(function(r){
			var HTML = '<li class="link"><i class="fas fa-user"></i><a href="/yt-sub-counter/?c='+r.channelId+'"> '+r.channelName+'</li></a><br>';
			$('.channelPromotions').append(HTML); 
		})
	})
}

YT.GoalManager = {
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
		YT.UpdateManager.updateGoal(goal);
	}
}

YT.UpdateManager = {
	updateName: function(a) {
		document.querySelector(".name").innerText = a;
	},

	updateBanner: function(a) {
		document.querySelector('.banner').src = a;
	},
	
	updateAvatar: function(a) {
		document.querySelector('.pfp').src = a;
	},
	
	updateSubs: function(a) {
		document.querySelector(".main-odo").innerHTML = a;
	},
	
	updateGoal: function(a) {
		document.querySelector(".goal-odo").innerHTML = a;
	},
	
	updateTotalViews: function(a) {
		document.querySelector(".total-views-odo").innerHTML = a;
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

YT.UrlManager = {
	addUser: function() {
		if (!getUrlVars()["c"]) {
			if (window.location.href.indexOf("?")>-1){
				history.pushState(null,'',window.location.href+'&c='+user)
			} else {
				history.pushState(null,'',window.location.href+'?c='+user);
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
	},

	addChart: function() {
		if (!getUrlVars()["ch"]) {
			if (window.location.href.indexOf("?")>-1){
				history.pushState(null,'',window.location.href+'&ch=1')
			} else {
				history.pushState(null,'',window.location.href+'?ch=1');
			}
		}
	}
}


YT.ThemeManager = {
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
				if (isChartEnabled) {
					chart.chartBackground.css({color: '#fff'});
				}
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
				if (isChartEnabled) {
					chart.chartBackground.css({color: '#000'});
				}
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
				if (isChartEnabled) {
					chart.chartBackground.css({color: '#000'});
				}
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
				if (isChartEnabled) {
					chart.chartBackground.css({color: '#fff'});
				}
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
					if (isChartEnabled) {
						chart.chartBackground.css({color: '#fff'});
					}
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
					if (isChartEnabled) {
						chart.chartBackground.css({color: '#000'});
					};
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
					if (isChartEnabled) {
						chart.chartBackground.css({color: '#000'});
					}
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
					if (isChartEnabled) {
						chart.chartBackground.css({color: '#fff'});
					}
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

function search() {
	var replaceurl = document.getElementById('search').value.replace("%20", " ");
	var rightKey = rightKeys[Math.floor(Math.random()*rightKeys.length)];
	if (rightKeys.length == 0) {
		$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=channel&q='+replaceurl, function(data) {
			window.location.href = 'https://livecounts.io/yt-sub-counter/?c='+data.snippet.channelId
		})
	} else {
		$.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&fields=items%2Fsnippet&q=' + replaceurl + '&key='+rightKey, function(data) {
			window.location.href = 'https://livecounts.io/yt-sub-counter/?c='+data.items[0].snippet.channelId
		})
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
