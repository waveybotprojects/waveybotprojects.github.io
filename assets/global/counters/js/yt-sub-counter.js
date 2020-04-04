var YT = {};

var user;
var subCountRefresh;
var totalViewsRefresh;
var isUsingEstimatedCounters = false;

// ----------------------------------- //

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}

function checkData() {
	$.getJSON("https://api.livecounts.io/yt_subs", function(data) {
		var result = data.filter(x => x.cid === user);
		if (result.length != 0) {
			isUsingEstimatedCounters = true;
		}
	})
}

function getData() {
	$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id='+user+'&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function(data) {
		if (data.items[0].brandingSettings.image.bannerImageUrl.toString() != "http://s.ytimg.com/yts/img/channels/c4/default_banner-vfl7DRgTn.png") {
			YT.updateManager.updateBanner(data.items[0].brandingSettings.image.bannerImageUrl)
		}

		YT.updateManager.updateAvatar(data.items[0].snippet.thumbnails.high.url)
		YT.updateManager.updateUsername(data.items[0].snippet.title)
		YT.updateManager.updateTotalVideoViewsCount(data.items[0].statistics.viewCount)

		if (!isUsingEstimatedCounters) {
			YT.updateManager.updateSubscriberCount(data.items[0].statistics.subscriberCount)
		} else {
			$.getJSON('https://api.livecounts.io/yt_subs', function(d) {
				var result = d.filter(x => x.cid === user);
				YT.updateManager.updateSubscriberCount(result[0].subscriberCount)
			})
		}
	}).fail(function() {
		$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=snippet,statistics&id='+user,function(data) {
			if (!data.brandingSettings.image.bannerImageUrl.toString() != "http://s.ytimg.com/yts/img/channels/c4/default_banner-vfl7DRgTn.png") {
				YT.updateManager.updateBanner(data.brandingSettings.image.bannerImageUrl)
			}
	
			YT.updateManager.updateAvatar(data.snippet.thumbnails.high.url)
			YT.updateManager.updateUsername(data.snippet.title)
			YT.updateManager.updateTotalVideoViewsCount(data.statistics.viewCount)
	
			if (!isUsingEstimatedCounters) {
				YT.updateManager.updateSubscriberCount(data.statistics.subscriberCount)
			} else {
				$.getJSON('https://api.livecounts.io/yt_subs', function(d) {
					var result = d.filter(x => x.cid === user);
					YT.updateManager.updateSubscriberCount(result[0].subscriberCount)
				})
			}	
		})
	}).fail(function() {
		setTimeout(function() {
			getData();
		}, 1000)
	})
}

function searchUser() {
	var value = document.querySelector(".changeuser-search").value
	$(".channel-list").html("");
	$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=channel&maxResults=5&q='+value,function(data) {
		for (let i = 0; i < data.items.length; i++) {
			$(".channel-list").append('<a href="/yt-sub-counter/?c='+data.items[i].id.channelId+'" class="mt-2 card"><div class="d-flex"><img class="rounded-circle" width="64" height="64" src="'+data.items[i].snippet.thumbnails.default.url+'"><h5 style="margin-top: 20px;" class="ml-2">'+data.items[i].snippet.title+'</h5></div></a>');
		}
	}).fail(function() {
		setTimeout(function() {
			searchUser();
		}, 1000)	
	})
}

function searchCompareUser() {
	var value = document.querySelector(".compare-search").value
	$(".channel-list").html("");
	$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=channel&maxResults=5&q='+value,function(data) {
		for (let i = 0; i < data.items.length; i++) {
			$(".channel-list-compare").append('<a href="/yt-sub-counter/compare/?c1='+user+'&c2='+data.items[i].id.channelId+'" class="mt-2 card"><div class="d-flex"><img class="rounded-circle" width="64" height="64" src="'+data.items[i].snippet.thumbnails.default.url+'"><h5 style="margin-top: 20px;" class="ml-2">'+data.items[i].snippet.title+'</h5></div></a>');
		}
	}).fail(function() {
		setTimeout(function() {
			searchCompareUser();
		}, 1000)	
	})	
}
// ----------------------------------- //

YT.updateManager = {
	updateBanner: function(a) {
		document.querySelector(".banner").src = a;
	},
	updateAvatar: function(a) {
		document.querySelector(".profile-picture").src = a;
	},
	updateUsername: function(a) {
		var all = document.querySelectorAll(".username");
		for (let i = 0; i < all.length; i++) {
			all[i].innerHTML = a;
		}

		document.querySelector(".share-url").value = window.location.href
		document.querySelector(".embed-website").value = '<iframe height="80px" width="300px" frameborder="0" src="https://livecounts.io/yt-sub-counter/embed/?c='+user+'" style="border: 0; width:300px; height:80px; background-color: #FFF;"></iframe>'
		document.querySelector(".embed-obs").value = 'https://livecounts.io/yt-sub-counter/embed/?c='+user
		document.querySelector(".youtube-url").href = 'https://www.youtube.com/channel/'+user
	},
	updateSubscriberCount: function(a) {
		document.querySelector(".main-odometer").innerHTML = a;

		const exponent = Math.floor(Math.log10(a));
		const factor = Math.ceil(a / 10**exponent);
		const final = factor * 10**exponent;
		document.querySelector(".goal-odometer").innerHTML = final - a;

		chart.series[0].addPoint([                   
			(new Date()).getTime(),
			parseInt(a)
		])
	},
	updateTotalVideoViewsCount: function(a) {
		document.querySelector(".total-video-views-odometer").innerHTML = a;
	},
	updateYear: function() {
		document.querySelector(".year").innerHTML = new Date().getFullYear()
	}
}

YT.refreshManager = {
	startSubCountRefresh: function() {
		subCountRefresh = setInterval(function() {
			if (!isUsingEstimatedCounters) {
				$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+user+'&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function(data) {
					YT.updateManager.updateSubscriberCount(data.items[0].statistics.subscriberCount)
				}).fail(function() {
					$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=statistics&id='+user,function(data) {
						YT.updateManager.updateSubscriberCount(data.statistics.subscriberCount)
					})
				})
			} else {
				$.getJSON('https://api.livecounts.io/yt_subs', function(data) {
					var result = data.filter(x => x.cid === user);
					YT.updateManager.updateSubscriberCount(result[0].subscriberCount)	
				})
			}

				
			if (chart.series[0].data.length >= 500) {
				chart.series[0].data[0].remove()
			}
		}, 3000)
	},

	startTotalViewsRefresh: function() {
		totalViewsRefresh = setInterval(function() {
			$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+user+'&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function(data) {
				YT.updateManager.updateTotalVideoViewsCount(data.items[0].statistics.viewCount)
			}).fail(function() {
				$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=statistics&id='+user,function(data) {
					YT.updateManager.updateTotalVideoViewsCount(data.statistics.viewCount)
				})
			})
		}, 300000)	
	},

	stopSubCountRefresh: function() {
		clearInterval(subCountRefresh)
	},

	stopTotalViewsRefresh: function() {
		clearInterval(totalViewsRefresh)
	}
}

// ----------------------------------- //

if (!getUrlVars()["c"]) {
	user = "UCaEk4apVOqy-sFVh3xnpJyw" //Shaz
} else {
	user = getUrlVars()["c"]
}

setTimeout(function() {
	if (!getUrlVars()["c"]) {
		history.pushState(null,'',window.location.href+'?c='+user)
	}

	checkData();

	setTimeout(function() {
		getData();
	}, 500)

	YT.refreshManager.startSubCountRefresh();
	YT.refreshManager.startTotalViewsRefresh();
	YT.updateManager.updateYear();

}, 1)

// ----------------------------------- //

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
		text: 'Subscriber Count Graph'
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

var disqus_config = function() {
    this.page.url = 'https://livecounts.io/yt-sub-counter/?c=' + user;
};

(function() {
    var d = document,
        s = d.createElement('script');
    s.src = 'https://livecounts-io.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();

$('.navbar-button').click(() => {
  if($('.navbar-button').attr('data-sidebar') == "true") {
    $('.sidebar').removeClass('sidebar-expand');
    $('.navbar-text-gone').css('font-size', '0px')
    $('.navbar-button').attr('data-sidebar','false');
  }
  else {
    $('.sidebar').addClass('sidebar-expand');
    $('.navbar-button').attr('data-sidebar','true');
    $('.navbar-text-gone').css('font-size', '18px')
  }
})

$('.change-user-search-button').click(() => {
	searchUser();
})

document.querySelector(".changeuser-search").addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		searchUser();
	}
  })

  $('.compare-search-button').click(() => {
	searchCompareUser();
})

document.querySelector(".compare-search").addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		searchCompareUser();
	}
  })


// ----------------------------------- //

$('.theme-options').on('change', function(){
	if (getUrlVars()["t"]) {
		window.location = window.location.href.substring(0, window.location.href.indexOf('&t')) + $(this).val()
	} else {
		window.location = window.location.href + $(this).val()
	}
})

$('.style-options').on('change', function(){
	if ($(this).val().includes("https")) {
		window.location = $(this).val()
	} else {
		if (getUrlVars()["t"]) {
			window.location = window.location.href.substring(0, window.location.href.indexOf('&t')) + $(this).val()
		} else {
			window.location = window.location.href + $(this).val()
		}
	}
})

if (getUrlVars()["t"] == 1) {
	$("body").css("background-color", "rgb(29, 31, 32)");
	$("a").css("color", "rgb(76, 176, 253)");
	$("h1,h2,h3,h4,h5,h6,p, .odometer, .form-control").css("color", "#D8D6D0");
	$(".card, input, nav, .modal-content").css({
		'background-color': 'rgb(24, 26, 27)',
		'border-top-color': 'rgba(102, 102, 102, 0.13)',
		'border-right-color': 'rgba(102, 102, 102, 0.13)',
		'border-bottom-color': 'rgba(102, 102, 102, 0.13)',
		'border-left-color': 'rgba(102, 102, 102, 0.13)'
	});
	chart.chartBackground.css({color: 'rgb(24, 26, 27)'})
}

if (getUrlVars()["t"] == 2) {
	$('head').append('<link rel="stylesheet" type="text/css" href="https://livecounts.io/assets/global/rainbow.css">');
	$("body").css("background-color", "rgb(29, 31, 32)");
	$("a,h1,h2,h3,h4,h5,h6,p, .odometer, .form-control, button").addClass("rainbow-text")
	$(".card, input, nav, .modal-content").css({
		'background-color': 'rgb(24, 26, 27)',
		'border-top-color': 'rgba(102, 102, 102, 0.13)',
		'border-right-color': 'rgba(102, 102, 102, 0.13)',
		'border-bottom-color': 'rgba(102, 102, 102, 0.13)',
		'border-left-color': 'rgba(102, 102, 102, 0.13)'
	});
	chart.chartBackground.css({color: 'rgb(24, 26, 27)'})
}

if (getUrlVars()["t"] == 3) {
	$('head').append('<link rel="stylesheet" type="text/css" href="https://livecounts.io/assets/global/rainbow.css">');
	$("a,h1,h2,h3,h4,h5,h6,p, .odometer, .form-control, button").addClass("rainbow-text")
}

if (getUrlVars()["t"] == 4) {
	$('head').append('<link rel="stylesheet" type="text/css" href="https://livecounts.io/assets/global/odometer-fast.css">');
	$("h2,h3,h4,h5,h6,p, .username").css({
		"font-weight": "400",
		"color": "#455A64"
	});
	$(".odometer").css({
		"font-weight": "300",
		"color": "#455A64"
	});
}

if (getUrlVars()["t"] == 5) {
	$('head').append('<link rel="stylesheet" type="text/css" href="https://livecounts.io/assets/global/odometer-fast.css">');
	$("body").css("background-color", "rgb(29, 31, 32)");
	$("h2,h3,h4,h5,h6,p, .odometer, .form-control, a, .year, .navbar-text-gone, .username").css("color", "rgb(199, 195, 186)");

	$("h2,h3,h4,h5,h6,p, .username").css({
		"font-weight": "400",
	});
	$(".odometer").css({
		"font-weight": "300",
	});

	$(".card, input, nav, .modal-content").css({
		'background-color': 'rgb(24, 26, 27)',
		'border-top-color': 'rgba(102, 102, 102, 0.13)',
		'border-right-color': 'rgba(102, 102, 102, 0.13)',
		'border-bottom-color': 'rgba(102, 102, 102, 0.13)',
		'border-left-color': 'rgba(102, 102, 102, 0.13)'
	});
	chart.chartBackground.css({color: 'rgb(24, 26, 27)'})
}