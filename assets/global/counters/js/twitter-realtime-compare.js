var Twitter = {};
var user1 = "";
var user2 = "";

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

if (!getUrlVars()["u1"]) {
    user1 = "barackobama";
} else {
    user1 = getUrlVars()["u1"]
}

if (!getUrlVars()["u2"]) {
    user2 = "katyperry";
} else {
    user2 = getUrlVars()["u2"]
}

if (getUrlVars()["o"] == "1") {
	document.getElementById('odometer').href='https://livecounts.io/assets/global/odometer-fast.css';
	$(".checkbox-odo-slow").prop("checked", false);
	$(".checkbox-odo-fast").prop("checked", true);
} else {
	$(".checkbox-odo-slow").prop("checked", true);
	$(".checkbox-odo-fast").prop("checked", false);
}

$(".checkbox-odo-slow").click(function(){
	window.location = window.location.href.replace("o=1", "o=0")
})

$(".checkbox-odo-fast").click(function(){
	window.location = window.location.href.replace("o=0", "o=1")
})

window.onload = () => {

    Twitter.UrlManager.addUsers();
	Twitter.UrlManager.addTheme();
	Twitter.UrlManager.addOdometer();
	Twitter.ThemeManager.load();

	setTimeout(function() {
		$.getJSON('https://api.thesocialcounter.com/twitter/?name='+user1, function(data) {
			$.getJSON('https://api.thesocialcounter.com/twitter/?name='+user2, function(data2) {
				Twitter.UpdateManager.updateName(data.name, data2.name)
				Twitter.UpdateManager.updateAvatar(data.profile_image_url_https.replace("default", "400x400"), data2.profile_image_url_https)
			})
		})
	},1)

    if (window.location.href.indexOf(user1 || user2) > -1) {
        return;
      } else {
        history.pushState(null,'',window.location.href+'?u1='+user1+'&u2='+user2)
      }
}

Twitter.UpdateManager = {
    updateName: function(a,b) {
        document.querySelector(".username1").innerText = a;
        document.querySelector(".username2").innerText = b;
    },

    updateAvatar: function(a,b) {
        document.querySelector('.pfp1').src = a;
        document.querySelector('.pfp2').src = b;
    },

    updateFollowers: function(a,b,c) {
        document.querySelector(".odo1").innerHTML=a;
        document.querySelector(".odo2").innerHTML=b;
        document.querySelector(".difference-odo").innerHTML=c;
    },

    updateBanner: function(a,b) {
        document.querySelector('.banner1').src = a;
        document.querySelector('.banner2').src = b;
    }
};

setInterval(function() {
    $.getJSON('https://bastet.socialblade.com/twitter/lookup?query='+user1,function(data) {
        $.getJSON('https://bastet.socialblade.com/twitter/lookup?query='+user2,function(data2) {
            Twitter.UpdateManager.updateFollowers(data, data2, data - data2);
            chart.series[0].addPoint([                   
                (new Date()).getTime(),
                Math.abs(data - data2)
			])
			if (chart.series[0].data.length >= 900) {
				chart.series[0].data[0].remove()
			}    
        })
    })
}, 2000)

Twitter.UrlManager = {
	addUsers: function() {
		if (!getUrlVars()["u1"]) {
			if (window.location.href.indexOf("?")>-1){
				history.pushState(null,'',window.location.href+'&u1='+user1)
			} else {
				history.pushState(null,'',window.location.href+'?u1='+user1);
			}
        }
        
        if (!getUrlVars()["u2"]) {
			if (window.location.href.indexOf("?")>-1){
				history.pushState(null,'',window.location.href+'&u2='+user2)
			} else {
				history.pushState(null,'',window.location.href+'?u2='+user2);
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

function search1() {
    var replaceurl = document.getElementById('search1').value.replace(" ", "");
    window.location.href = '/twitter-realtime/compare/?u1='+replaceurl+'&u2='+user2;
}

function search2() {
    var replaceurl = document.getElementById('search2').value.replace(" ", "");
    window.location.href = '/twitter-realtime/compare/?u1='+user1+'&u2='+replaceurl;
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

Twitter.ThemeManager = {
	load: function() {
		if (getUrlVars()["t"] == "0") {
			$(document).ready(function() {
				$("body").css("background-color", "#EFF4F8");
				$(".card").css("background-color", "white");
				$(".odometer").css("color", "#000");
				$(".text").css("color", "#000");
				$(".username").css("color", "#000");
				$("h4").css("color", "#000");
				$("h6").css("color", "#000");
				$("p").css("color", "#000");
				$("ul").css("background-color", "white");
				$(".odometer").removeClass('rainbow-text');
				$("li").removeClass('rainbow-text');
				$(".username").removeClass('rainbow-text');
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
				$(".username").css("color", "#808080");
				$("h4").css("color", "#808080");
				$("h6").css("color", "#808080");
				$("p").css("color", "#808080");
				$("ul").css("background-color", "black");
				$(".odometer").removeClass('rainbow-text');
				$("li").removeClass('rainbow-text');
				$(".username").removeClass('rainbow-text');
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
				$(".username").addClass('rainbow-text');
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
				$(".username").addClass('rainbow-text');
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
					$(".odometer").css("color", "#000");
					$(".text").css("color", "#000");
					$(".username").css("color", "#000");
					$("h4").css("color", "#000");
					$("h6").css("color", "#000");
					$("p").css("color", "#000");
					$("ul").css("background-color", "white");
					$(".odometer").removeClass('rainbow-text');
					$("li").removeClass('rainbow-text');
					$(".username").removeClass('rainbow-text');
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
					$(".username").css("color", "#808080");
					$("h4").css("color", "#808080");
					$("h6").css("color", "#808080");
					$("p").css("color", "#808080");
					$("ul").css("background-color", "black");
					$(".odometer").removeClass('rainbow-text');
					$("li").removeClass('rainbow-text');
					$(".username").removeClass('rainbow-text');
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
					$(".username").addClass('rainbow-text');
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
					$(".username").addClass('rainbow-text');
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