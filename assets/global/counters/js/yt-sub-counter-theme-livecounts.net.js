
var i = 0;
var howManyTimes = 0;
var instructionHidden = false;
var YT = {};
var rightKeys = [];

setTimeout(function() {
    var nameInterval = setInterval(function() {
        var color = ["green", "#00FF00"];
        document.getElementById("name").style.border = "3px solid "+color[i];
        i = (i + 1) % color.length;
        howManyTimes++
        if (howManyTimes >= 10) {
            clearInterval(nameInterval)
        }
    }, 300)
}, 2000)

setTimeout(function() {
    document.getElementById("name").style.removeProperty("border");
}, 10000)

setTimeout(function() {
    document.getElementById("instruction-text").style.display = "none";
    instructionHidden = true;
    document.getElementById("subscribeButton").style.removeProperty("display");
}, 5000)

setInterval(function() {
    if ($(window).width() <= 1571) {
        document.getElementById("name").style.marginTop = "0px";
    }
}, 100)


/*-----------------------------------*/
var user;

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}
if (!getUrlVars()["c"]) user = "UCq-Fj5jknLsUf-MWSy4_brA"
else user = getUrlVars()["c"]

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


$(".user-box").click(function(){
    var og = window.prompt("Enter channel name, username, ID, or URL:")
    if (og != null) {
        $.getJSON('https://ytdata-livecounts-io.glitch.me/yt_data?type=search&part=channel&q='+og, function(data) {
            window.location.href = 'https://livecounts.io/yt-sub-counter/theme/livecounts.net/?c='+data.snippet.channelId
        })
    }
});


window.onload = () => {
    YT.UrlManager.addUser();

	$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings&id='+user+'&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function(data) {
        YT.UpdateManager.updateName(data.items[0].snippet.title)
    }).fail(function() {
        $.getJSON('https://ytdata-livecounts-io.glitch.me/yt_data?type=channel&part=snippet&id='+user, function(data) {
            YT.UpdateManager.updateName(data.snippet.title)
        })
    })

    $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id='+user+'&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function(data) {
        YT.UpdateManager.updateTotalViews(parseInt(data.items[0].statistics.viewCount))
    }).fail(function() {
        $.getJSON('https://ytdata-livecounts-io.glitch.me/yt_data?type=channel&part=statistics&id='+user, function(data) {
            YT.UpdateManager.updateTotalViews(parseInt(data.statistics.viewCount)) 
        }) 
    })

    $.getJSON('https://api.livecounts.io/yt_subs', function(data) {
		var result = data.filter(x => x.cid === user);
		if (result.length != 0) {
			isUsingEstimatedCounters = true
			clearInterval(normalCountRefresh);
		} else {
			clearInterval(estimatedCountRefresh);
			if (rightKeys.length == 0) {
				$.getJSON('https://ytdata-livecounts-io.glitch.me/yt_data?type=channel&part=statistics&id='+user, function(data) {
					YT.UpdateManager.updateSubs(data.statistics.subscriberCount)
				})
			}
		}
	})

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
    }
}

checkKeys();

setInterval(function() {
	checkKeys();
}, 1 * 3600 * 1000)

var estimatedCountRefresh = setInterval(function() {
    $.getJSON('https://api.livecounts.io/yt_subs', function(data2) {
        var result = data2.filter(x => x.cid === user);
        if (result.length != 0) {
            YT.UpdateManager.updateSubs(YT.UpdateManager.updateSubs(result[0].subscriberCount))
            YT.GoalManager.load(YT.GoalManager.load(result[0].subscriberCount))
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
        $.getJSON('https://ytdata-livecounts-io.glitch.me/yt_data?type=channel&part=statistics&id='+user, function(data) {
            YT.UpdateManager.updateSubs(data.statistics.subscriberCount)
            YT.GoalManager.load(data.statistics.subscriberCount)
        })
    });
}, 60000)


YT.UpdateManager = {
	updateName: function(a) {
		document.querySelector(".username").innerText = a;
	},
	
	updateAvatar: function(a) {
		document.querySelector('.pfp').src = a;
	},
	
	updateSubs: function(a) {
		document.querySelector(".main-odometer").innerHTML = a;
	},
	
	updateTotalViews: function(a) {
		document.querySelector(".total-views-odometer").innerHTML = a;
	}
}