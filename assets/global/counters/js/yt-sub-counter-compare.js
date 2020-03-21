var YT = {};
var user1 = "";
var user2 = "";
var key = "";
var rightKeys = [];
var rightKey;
var typeOfCounter;
var isChartEnabled;
var ok;

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

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}

if (getUrlVars()["ch"] == "1" || !getUrlVars()["ch"]) {

	var chart = new Highcharts.chart({
		chart: {
			renderTo: 'chart',
			type: 'line'
		},
		title: {
			text: 'Subscriber Difference Graph'
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
			name: 'Subscriber Difference',
			marker: {
				enabled: false
			}
		}]
	});
}

if (getUrlVars()["o"] == "1") {
    document.getElementById('style').href='../../../assets/global/odometer-fast.css';
}

if (!getUrlVars()["c1"]) {
    user1 = "UC-lHJZR3Gqxm24_Vd_AJ5Yw";
} else {
    user1 = getUrlVars()["c1"];
}
if (!getUrlVars()["c2"]) {
    user2 = "UCq-Fj5jknLsUf-MWSy4_brA";
} else {
    user2 = getUrlVars()["c2"];
}

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
  var rightKey = rightKeys[Math.floor(Math.random()*rightKeys.length)];


if (typeOfCounter == 1) {
	$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+user1+'&key='+rightKey, function(data) {
		$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+user2+'&key='+rightKey, function(data2) {
						if (data.items[0].id == user1) {
							YT.UpdateManager.updateSubs(data.items[0].statistics.subscriberCount, data2.items[0].statistics.subscriberCount)
							YT.UpdateManager.updateDifference(Math.abs(data.items[0].statistics.subscriberCount - data2.items[0].statistics.subscriberCount))
							
							if (getUrlVars()["ch"] == "1" || !getUrlVars()["ch"]) {
							chart.series[0].addPoint([                   
								(new Date()).getTime(),
								Math.abs(parseInt(data.items[0].statistics.subscriberCount - data2.items[0].statistics.subscriberCount))
							])
						}
						} else {
							YT.UpdateManager.updateSubs(data2.items[0].statistics.subscriberCount, data.items[0].statistics.subscriberCount)
							YT.UpdateManager.updateDifference(Math.abs(data2.items[0].statistics.subscriberCount - data.items[0].statistics.subscriberCount))
							
							if (getUrlVars()["ch"] == "1" || !getUrlVars()["ch"]) {
							chart.series[0].addPoint([                   
								(new Date()).getTime(),
								Math.abs(parseInt(data.items[0].statistics.subscriberCount - data2.items[0].statistics.subscriberCount))
							])

							
					if (chart.series[0].data.length >= 900) {
						chart.series[0].data[0].remove()
					}
						}
					}
					}).fail(function() {
						if (rightKeys.length == 0) {
							$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=statistics&id='+user1, function(data) {
								$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=statistics&id='+user2, function(data2) {
									if (data.id == user1) {
										YT.UpdateManager.updateSubs(data.statistics.subscriberCount, data2.statistics.subscriberCount)
										YT.UpdateManager.updateDifference(Math.abs(data.statistics.subscriberCount - data2.statistics.subscriberCount))
										
										if (getUrlVars()["ch"] == "1" || !getUrlVars()["ch"]) {
										chart.series[0].addPoint([                   
											(new Date()).getTime(),
											Math.abs(parseInt(data.statistics.subscriberCount - data2.statistics.subscriberCount))
										])
									}
									} else {
										YT.UpdateManager.updateSubs(data2.statistics.subscriberCount, data.statistics.subscriberCount)
										YT.UpdateManager.updateDifference(Math.abs(data2.statistics.subscriberCount - data.statistics.subscriberCount))
										
										if (getUrlVars()["ch"] == "1" || !getUrlVars()["ch"]) {
										chart.series[0].addPoint([                   
											(new Date()).getTime(),
											Math.abs(parseInt(data.statistics.subscriberCount - data2.statistics.subscriberCount))
										])
			
										
									if (chart.series[0].data.length >= 900) {
										chart.series[0].data[0].remove()
									}
										}
									}
								})
							})
						}
					})
				})
}

			if (typeOfCounter == 2) {
				$.getJSON('https://api.livecounts.io/yt_subs', function(data) {
					$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+user2+'&key='+rightKey, function(data2) {
						var result1 = data.filter(x => x.cid === user1);

						YT.UpdateManager.updateSubs(result1[0].subscriberCount, data2.items[0].statistics.subscriberCount)
									YT.UpdateManager.updateDifference(Math.abs(result1[0].subscriberCount - data2.items[0].statistics.subscriberCount))
									if (getUrlVars()["ch"] == "1" || !getUrlVars()["ch"]) {
									chart.series[0].addPoint([                   
										(new Date()).getTime(),
										Math.abs(parseInt(result1[0].subscriberCount - data2.items[0].statistics.subscriberCount))
									])

									
					if (chart.series[0].data.length >= 900) {
						chart.series[0].data[0].remove()
					}
								}
						})
				})
			}

			if (typeOfCounter == 3) {
				$.getJSON('https://api.livecounts.io/yt_subs', function(data2) {
					$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+user+'&key='+rightKey, function(data) {
						var result1 = data2.filter(x => x.cid === user2);

						YT.UpdateManager.updateSubs(data.items[0].statistics.subscriberCount, result1[0].subscriberCount)
									YT.UpdateManager.updateDifference(Math.abs(data.items[0].statistics.subscriberCount, result1[0].subscriberCount))
									if (getUrlVars()["ch"] == "1" || !getUrlVars()["ch"]) {
									chart.series[0].addPoint([                   
										(new Date()).getTime(),
										Math.abs(parseInt(data.items[0].statistics.subscriberCount - result1[0].subscriberCount))
									])

									
					if (chart.series[0].data.length >= 900) {
						chart.series[0].data[0].remove()
					}
								}
					})
				})
			}

			if (typeOfCounter == 4) {
				$.getJSON('https://api.livecounts.io/yt_subs', function(data3) {
					var result1 = data3.filter(x => x.cid === user1);
					var result2 = data3.filter(x => x.cid === user2);
					if (result1.length != 0) {
						if (result2.length != 0) {

								YT.UpdateManager.updateSubs(result1[0].subscriberCount, result2[0].subscriberCount)
								YT.UpdateManager.updateDifference(Math.abs(result1[0].subscriberCount - result2[0].subscriberCount))
								if (getUrlVars()["ch"] == "1" || !getUrlVars()["ch"]) {
								chart.series[0].addPoint([                   
									(new Date()).getTime(),
									Math.abs(parseInt(result1[0].subscriberCount - result2[0].subscriberCount))
								])

								
					if (chart.series[0].data.length >= 900) {
						chart.series[0].data[0].remove()
					}
							}
						
							}
						}
				})
			}

			if (!ok) {
				$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings&id='+user1+'&key=AIzaSyAzRmWRQKbQpnAIH-Ws0ruzgxafjECdBCg', function(data) {
					$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings&id='+user2+'&key=AIzaSyAzRmWRQKbQpnAIH-Ws0ruzgxafjECdBCg', function(data2) {
						YT.UpdateManager.updateAvatars(data.items[0].snippet.thumbnails.high.url, data2.items[0].snippet.thumbnails.high.url)
						YT.UpdateManager.updateDisqusNames(data.items[0].snippet.title, data2.items[0].snippet.title)
			
						if (data.items[0].brandingSettings.image.bannerImageUrl != "http://s.ytimg.com/yts/img/channels/c4/default_banner-vfl7DRgTn.png") {
							if (data2.items[0].brandingSettings.image.bannerImageUrl != "http://s.ytimg.com/yts/img/channels/c4/default_banner-vfl7DRgTn.png") {
								YT.UpdateManager.updateBanners(data.items[0].brandingSettings.image.bannerImageUrl, data2.items[0].brandingSettings.image.bannerImageUrl)
							} else {
								YT.UpdateManager.updateBanners(data.items[0].brandingSettings.image.bannerImageUrl, "https://livecounts.io/yt-sub-counter/compare/assets/img/banner.jpg")
							}
						} else {
							YT.UpdateManager.updateBanners("https://livecounts.io/yt-sub-counter/compare/assets/img/banner.jpg", data2.items[0].brandingSettings.image.bannerImageUrl)
						}
			
						if (data.items[0].brandingSettings.image.bannerImageUrl == "http://s.ytimg.com/yts/img/channels/c4/default_banner-vfl7DRgTn.png" && data2.items[0].brandingSettings.image.bannerImageUrl == "http://s.ytimg.com/yts/img/channels/c4/default_banner-vfl7DRgTn.png") {
							YT.UpdateManager.updateBanners("https://livecounts.io/yt-sub-counter/compare/assets/img/banner.jpg", "https://livecounts.io/yt-sub-counter/compare/assets/img/banner.jpg")
						}
			
						YT.UpdateManager.updateNames(data.items[0].snippet.title, data2.items[0].snippet.title)
						ok = true;
					}).fail(function() {
						$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=snippet&id='+user1, function(data) {
							$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=snippet&id='+user2, function(data2) {
								YT.UpdateManager.updateAvatars(data.snippet.thumbnails.high.url, data2.snippet.thumbnails.high.url)
								YT.UpdateManager.updateDisqusNames(data.snippet.title, data2.snippet.title)
								YT.UpdateManager.updateBanners(data.brandingSettings.image.bannerImageUrl, data2.brandingSettings.image.bannerImageUrl)
								YT.UpdateManager.updateNames(data.snippet.title, data2.snippet.title)
								ok = true;
							})	
						})
					})
				}).fail(function() {
					$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=snippet&id='+user1, function(data) {
						$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=snippet&id='+user2, function(data2) {
							YT.UpdateManager.updateAvatars(data.snippet.thumbnails.high.url, data2.snippet.thumbnails.high.url)
							YT.UpdateManager.updateDisqusNames(data.snippet.title, data2.snippet.title)
							YT.UpdateManager.updateBanners(data.brandingSettings.image.bannerImageUrl, data2.brandingSettings.image.bannerImageUrl)
							YT.UpdateManager.updateNames(data.snippet.title, data2.snippet.title)
							ok = true;
						})	
					})
				})
			}

}, 5000)

window.onload = () => {
    YT.UrlManager.addUser1();
    YT.UrlManager.addUser2();
	YT.ThemeManager.load();

	$.getJSON('https://api.livecounts.io/yt_subs', function(data3) {
		var result1 = data3.filter(x => x.cid === user1);
		var result2 = data3.filter(x => x.cid === user2);
		if (result1.length == 0 && result2.length == 0) {
			typeOfCounter = 1
		}

		if (result1.length != 0 && result2.length == 0) {
			typeOfCounter = 2
		}

		if (result1.length == 0 && result2.length != 0) {
			typeOfCounter = 3
		}

		if (result1.length != 0 && result2.length != 0) {
			typeOfCounter = 4
		}
	})

    if (getUrlVars["t"] == "0") {
		$("#square-white").css("outline-style", "solid")
		$("#square-white").css("outline-color", "black")
	}

    if (!getUrlVars()["t"]) {
        if (window.location.href.indexOf("?")>-1){
            history.pushState(null,'',window.location.href+'&t=0')
        } else {
            history.pushState(null,'',window.location.href+'?t=0');
        }
    }

    if (!getUrlVars()["o"]) {
        if (window.location.href.indexOf("?")>-1){
            history.pushState(null,'',window.location.href+'&o=0')
        } else {
            history.pushState(null,'',window.location.href+'?o=0');
        }
	}
	
	if (!getUrlVars()["ch"]) {
        if (window.location.href.indexOf("?")>-1){
            history.pushState(null,'',window.location.href+'&ch=1')
        } else {
            history.pushState(null,'',window.location.href+'?ch=1');
        }
    }
}

YT.UpdateManager = {
	updateNames: function(a,b) {
        document.querySelector("#name1").innerText = a;
        document.querySelector("#name2").innerText = b;
	},

	updateBanners: function(a,b) {
        document.querySelector('#banner1').src = a;
        document.querySelector('#banner2').src = b;
	},
	
	updateAvatars: function(a,b) {
        document.querySelector('#user_pic1').src = a;
        document.querySelector('#user_pic2').src = b;
	},
	
	updateSubs: function(a,b) {
        document.querySelector("#odometer1").innerHTML = a;
        document.querySelector("#odometer2").innerHTML = b;
    },
    
    updateDifference: function(a) {
        document.querySelector("#difference").innerHTML = a;
	},
	
	updateDisqusNames: function(a,b) {
		document.querySelector(".channel1").innerText = a;
		document.querySelector(".channel2").innerText = b;
	}
}

YT.UrlManager = {
	addUser1: function() {
		if (!getUrlVars()["c1"]) {
			if (window.location.href.indexOf("?")>-1){
				history.pushState(null,'',window.location.href+'&c1='+user1)
			} else {
				history.pushState(null,'',window.location.href+'?c1='+user1);
			}
		}
    },
    addUser2: function() {
        if (!getUrlVars()["c2"]) {
			if (window.location.href.indexOf("?")>-1){
				history.pushState(null,'',window.location.href+'&c2='+user2)
			} else {
				history.pushState(null,'',window.location.href+'?c2='+user2);
			}
		}
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
	var replaceurl = document.getElementById('search1').value.replace("%20", " ");
	var rightKey = rightKeys[Math.floor(Math.random()*rightKeys.length)];
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&fields=items%2Fsnippet%2FchannelId&q=' + replaceurl + '&key='+rightKey, function(data) {
        window.location.href = '/yt-sub-counter/compare/?c1=' + data.items[0].snippet.channelId + '&c2=' + user2;
	}).fail(function() {
		$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=channel&q='+replaceurl, function(data) {
			window.location.href = "https://livecounts.io/yt-sub-counter/compare/?c1="+data.snippet.channelId+"&c2="+user2
		})
	})
}

function search2() {
	var replaceurl = document.getElementById('search2').value.replace("%20", " ");
	var rightKey = rightKeys[Math.floor(Math.random()*rightKeys.length)];
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&fields=items%2Fsnippet%2FchannelId&q=' + replaceurl + '&key='+rightKey, function(data) {
        window.location.href = '/yt-sub-counter/compare/?c1=' + user1 + '&c2=' + data.items[0].snippet.channelId;
	}).fail(function() {
		$.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=channel&q='+replaceurl, function(data) {
			window.location.href = "https://livecounts.io/yt-sub-counter/compare/?c1="+user1+"&c2="+data.snippet.channelId
		})
	})
}

YT.ThemeManager = {
	load: function() {
		if (getUrlVars()["t"] == "0") {
			$(document).ready(function() {
				$("html").css("background-color", "transparent");
				$(".card").css("background-color", "white");
				$(".odometer").css("color", "#455a64");
				$(".text").css("color", "#455a64");
				$("ul").css("background-color", "white");
                $(".odometer").removeClass('rainbow-text');
                $("h6").removeClass('rainbow-text');
				$(".text").removeClass('rainbow-text');
				$("li").removeClass('rainbow-text');
				$("#square-dark").css("outline", "none")
				$("#square-white").css("outline-style", "solid")
				$("#square-white").css("outline-color", "black")
				$("#square-rainbow-black").css("outline", "none")
				$("#square-rainbow-white").css("outline", "none")
			})
		}
		if (getUrlVars()["t"] == "1") {
			$(document).ready(function() {
				$("html").css("background-color", "black");
				$(".card").css("background-color", "black");
				$(".odometer").css("color", "#808080");
                $(".text").css("color", "#808080");
                $("h6").css("color", "#808080");
                $("h6").removeClass('rainbow-text');
                $("h3").css("color", "#808080");
				$("ul").css("background-color", "black");
				$(".odometer").removeClass('rainbow-text');
				$("li").removeClass('rainbow-text');;
				$("#square-dark").css("outline-style", "solid")
				$("#square-dark").css("outline-color", "white")
				$("#square-white").css("outline", "none")
				$("#square-rainbow-black").css("outline", "none")
				$("#square-rainbow-white").css("outline", "none")
			})
		}
		if (getUrlVars()["t"] == "2") {
			$(document).ready(function() {
				$("html").css("background-color", "black");
				$(".card").css("background-color", "black");
				$("ul").css("background-color", "black");
                $(".odometer").addClass('rainbow-text');
                $("h6").addClass('rainbow-text');
                $("h3").addClass('rainbow-text');
				$(".text").addClass('rainbow-text');
				$("li").addClass('rainbow-text');
				$("#square-dark").css("outline", "none")
				$("#square-white").css("outline-style", "solid")
				$("#square-white").css("outline-color", "black")
				$("#square-rainbow-black").css("outline", "none")
				$("#square-rainbow-white").css("outline", "none")
			})
		}
		if (getUrlVars()["t"] == "3") {
			$(document).ready(function() {
				$("html").css("background-color", "white");
				$(".card").css("background-color", "white");
				$("ul").css("background-color", "white");
                $(".odometer").addClass('rainbow-text');
                $("h6").addClass('rainbow-text');
                $("h3").addClass('rainbow-text');
				$(".text").addClass('rainbow-text');
				$("li").addClass('rainbow-text');
				$("#square-dark").css("outline", "none")
				$("#square-rainbow-white").css("outline-style", "solid")
				$("#square-rainbow-white").css("outline-color", "black")
				$("#square-white").css("outline", "none")
				$("#square-rainbow-black").css("outline", "none")
			})
		}
	},
	setTheme: function(theme) {
		switch(theme) {
			case 0: {
				if (window.location.href.indexOf("t=0") > -1) {
				return;
				} else {
					$("html").css("background-color", "transparent");
					$(".card").css("background-color", "white");
					$(".odometer").css("color", "#455a64");
					$(".text").css("color", "#455a64");
                    $("ul").css("background-color", "white");
                    $("h3").removeClass('rainbow-text')
                    $("h6").removeClass('rainbow-text');
					$(".odometer").removeClass('rainbow-text');
					$(".text").removeClass('rainbow-text');
					$("li").removeClass('rainbow-text');
					$("#square-dark").css("outline", "none")
					$("#square-white").css("outline-style", "solid")
					$("#square-white").css("outline-color", "black")
					$("#square-rainbow-black").css("outline", "none")
					$("#square-rainbow-white").css("outline", "none")
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
					$("html").css("background-color", "black");
					$(".card").css("background-color", "black");
					$(".odometer").css("color", "#808080");
                    $(".text").css("color", "#808080");
                    $("h3").css("color", "#808080");
                    $("h6").css("color", "#808080");
                    $("h3").removeClass('rainbow-text')
                    $("h6").removeClass('rainbow-text');
					$("ul").css("background-color", "black");
					$(".odometer").removeClass('rainbow-text');
					$(".text").removeClass('rainbow-text');
					$("li").removeClass('rainbow-text');;
					$("#square-dark").css("outline-style", "solid")
					$("#square-dark").css("outline-color", "white")
					$("#square-white").css("outline", "none")
					$("#square-rainbow-black").css("outline", "none")
					$("#square-rainbow-white").css("outline", "none")
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
					$("html").css("background-color", "black");
				$(".card").css("background-color", "black");
				$("ul").css("background-color", "black");
				$(".odometer").addClass('rainbow-text');
                $(".text").addClass('rainbow-text');
                $("h3").addClass('rainbow-text')
                $("h6").addClass('rainbow-text');
				$("li").addClass('rainbow-text');
				$("#square-dark").css("outline", "none")
				$("#square-white").css("outline-style", "solid")
				$("#square-white").css("outline-color", "black")
				$("#square-rainbow-black").css("outline", "none")
				$("#square-rainbow-white").css("outline", "none")
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
					$("html").css("background-color", "transparent");
					$("ul").css("background-color", "white");
					$(".odometer").addClass('rainbow-text');
					$(".text").addClass('rainbow-text');
                    $("li").addClass('rainbow-text');
                    $("h3").addClass('rainbow-text')
                    $("h6").addClass('rainbow-text');
					$(".card").css("background-color", "white");
					$("#square-dark").css("outline", "none")
					$("#square-white").css("outline", "none")
					$("#square-rainbow-black").css("outline", "none")
					$("#square-rainbow-white").css("outline-style", "solid")
					$("#square-rainbow-white").css("outline-color", "black")
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