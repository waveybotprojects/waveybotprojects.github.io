var YT = {};
var rightKeys = [];
var goal = "";
var video = "";
var rightKey;

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
      vars[key] = value
  });
  return vars
}

var estimatedArray = [];
var previousCount;
var actualChannelID;

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

window.onload = () => {

  if (!getUrlVars()["v"]) {
      video = "kJQP7kiw5Fk"; //despacito
  } else {
      video = getUrlVars()["v"];
  }

  $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id='+video+'&key='+rightKey, function(data) {
	  var channelId = data.items[0].snippet.channelId;
      var views = parseInt(data.items[0].statistics.viewCount);
      var likes = parseInt(data.items[0].statistics.likeCount);
	  var localLikeCount = parseInt(localStorage.getItem('likeCount-' + channelId))
	  var localViewCount = parseInt(localStorage.getItem('viewCount-' + channelId))
      var ratio = views / likes;
	  
      if (localLikeCount == undefined) {
		localStorage.setItem('likeCount-' + channelId, likes);
      }
	  
	  if (localViewCount != views) {
		localStorage.setItem('viewCount-' + channelId, views);
		localStorage.setItem('likeCount-' + channelId, likes);
      }
      var estViewCount = Math.round(views + (likes - localLikeCount) * ratio);
	  
	  
      YT.UpdateManager.updateViews(estViewCount)
      YT.UpdateManager.updateLikes(data.items[0].statistics.likeCount)
      YT.UpdateManager.updateDislikes(data.items[0].statistics.dislikeCount)
      YT.UpdateManager.updateComments(data.items[0].statistics.commentCount)
      YT.GoalManager.load(estViewCount);
    
    }).fail(function() {
      if (rightKeys.includes(rightKey)) {
        rightKeys.pop(rightKey)
        console.log("Invalid key detected in right key array, removing it...")
      }

      if (rightKeys.length == 0) {
        $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=video&part=statistics,snippet&id='+video, function(data) {
            var channelId = actualChannelID;
            var views = parseInt(data.statistics.viewCount);
            var likes = parseInt(data.statistics.likeCount);
          var localLikeCount = parseInt(localStorage.getItem('likeCount-' + channelId))
          var localViewCount = parseInt(localStorage.getItem('viewCount-' + channelId))
            var ratio = views / likes;
          
            if (localLikeCount == undefined) {
          localStorage.setItem('likeCount-' + channelId, likes);
            }
          
          if (localViewCount != views) {
          localStorage.setItem('viewCount-' + channelId, views);
          localStorage.setItem('likeCount-' + channelId, likes);
            }
            var estViewCount = Math.round(views + (likes - localLikeCount) * ratio);
          
          
            YT.UpdateManager.updateViews(estViewCount)
            YT.UpdateManager.updateLikes(data.statistics.likeCount)
            YT.UpdateManager.updateDislikes(data.statistics.dislikeCount)
            YT.UpdateManager.updateComments(data.statistics.commentCount)
            YT.GoalManager.load(estViewCount);
          
        })
      }
    })



    $(".links").load("/assets/global/other.html");

        $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+video+'&key='+rightKey, function(data) {
          if (data.items[0].snippet.title.length >=52) {
            $(".video-title").css("font-size", "calc(7px + 1vw)");
          }
          YT.UpdateManager.updateTitle(data.items[0].snippet.title)
          actualChannelID = data.items[0].snippet.channelId
        }).fail(function() {
          $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=video&part=snippet&id='+video, function(data) {
            if (data.snippet.title.length >=52) {
              $(".video-title").css("font-size", "calc(7px + 1vw)");
            }
            YT.UpdateManager.updateTitle(data.snippet.title)
            actualChannelID = data.snippet.channelId
          })
        })

    document.getElementById("shareurl").value = window.location.href;
    document.getElementById("obsurl").value = window.location.href;
    document.getElementById("embed-website").value = '<iframe height="180px" width="500px" frameborder="0" src="' +window.location.href+ '" allowfullscreen></iframe>';

    if (window.location.href.indexOf(video) > -1) {
      return;
    } else {
      history.pushState(null,'',window.location.href+'?v='+video)
    }
}

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

setInterval(function() {
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

  var rightKey = rightKeys[Math.floor(Math.random()*rightKeys.length)];
  
    $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id='+video+'&key='+rightKey, function(data) {
	  var channelId = data.items[0].snippet.channelId;
      var views = parseInt(data.items[0].statistics.viewCount);
      var likes = parseInt(data.items[0].statistics.likeCount);
	  var localLikeCount = parseInt(localStorage.getItem('likeCount-' + channelId))
	  var localViewCount = parseInt(localStorage.getItem('viewCount-' + channelId))
      var ratio = views / likes;
	  
      if (localLikeCount == undefined) {
		localStorage.setItem('likeCount-' + channelId, likes);
      }
	  
	  if (localViewCount != views) {
		localStorage.setItem('viewCount-' + channelId, views);
		localStorage.setItem('likeCount-' + channelId, likes);
      }
      var estViewCount = Math.round(views + (likes - localLikeCount) * ratio);
	  
	  
      YT.UpdateManager.updateViews(estViewCount)
      YT.UpdateManager.updateLikes(data.items[0].statistics.likeCount)
      YT.UpdateManager.updateDislikes(data.items[0].statistics.dislikeCount)
      YT.UpdateManager.updateComments(data.items[0].statistics.commentCount)
      YT.GoalManager.load(estViewCount);
    
    }).fail(function() {
      if (rightKeys.includes(rightKey)) {
        rightKeys.pop(rightKey)
        console.log("Invalid key detected in right key array, removing it...")
      }

      if (rightKeys.length == 0) {
        $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=video&part=statistics&id='+video, function(data) {
            var channelId = actualChannelID;
            var views = parseInt(data.statistics.viewCount);
            var likes = parseInt(data.statistics.likeCount);
          var localLikeCount = parseInt(localStorage.getItem('likeCount-' + channelId))
          var localViewCount = parseInt(localStorage.getItem('viewCount-' + channelId))
            var ratio = views / likes;
          
            if (localLikeCount == undefined) {
          localStorage.setItem('likeCount-' + channelId, likes);
            }
          
          if (localViewCount != views) {
          localStorage.setItem('viewCount-' + channelId, views);
          localStorage.setItem('likeCount-' + channelId, likes);
            }
            var estViewCount = Math.round(views + (likes - localLikeCount) * ratio);
          
          
            YT.UpdateManager.updateViews(estViewCount)
            YT.UpdateManager.updateLikes(data.statistics.likeCount)
            YT.UpdateManager.updateDislikes(data.statistics.dislikeCount)
            YT.UpdateManager.updateComments(data.statistics.commentCount)
            YT.GoalManager.load(estViewCount);
          
        })
      }
    })


}, 2500)

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
  updateTitle: function(a) {
    document.querySelector(".video-title").innerText = a;
    document.title = "Livecounts.io - "+a.split(/ +/).slice(0, 3).join(" ")+" Youtube Live View Count"
   document.querySelector('meta[name="description"]').setAttribute("content", "Livecounts is a simple way to check "+a.split(/ +/).slice(0, 3).join(" ")+"'s Youtube Live View Count updated in real-time!");
  },
  updateViews: function(a) {
    document.querySelector(".view-odo").innerHTML=a;
  },
  updateLikes: function(a) {
    document.querySelector(".likes-odo").innerHTML=a;
  },
  updateDislikes: function(a) {
    document.querySelector(".dislikes-odo").innerHTML=a;
  },
  updateGoal: function(a) {
    document.querySelector(".goal-odo").innerHTML=a;
  },
  updateComments: function(a) {
    document.querySelector(".comments-odo").innerHTML=a;
  },
  /*updateEstimatedCounts: function(a, b, c) {
    document.querySelector(".estimated-per-2-seconds-odo").innerHTML = a;
    document.querySelector(".estimated-per-1-min-odo").innerHTML = b;
    document.querySelector(".estimated-per-1-hr-odo").innerHTML = c;
  }*/
}

function search() {
  var replaceurl = document.getElementById('search').value.replace("%20", " ");
  var rightKey = rightKeys[Math.floor(Math.random()*rightKeys.length)];
  $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=' + replaceurl + '&key=' + rightKey, function(data) {
      window.location.href = '/live-view-count/?v=' + data.items[0].id.videoId;
    }).fail(function() {
      $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=video&q='+replaceurl, function(data) {
        window.location.href = '/live-view-count/?v='+data.id.videoId;
      })
    })
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

if (!window.obsstudio) {
	$("head").append(`<script type="text/javascript" async="async">
		var elem = document.createElement('script');
		elem.src = 'https://quantcast.mgr.consensu.org/cmp.js';
		elem.async = true;
		elem.type = "text/javascript";
		var scpt = document.getElementsByTagName('script')[0];
		scpt.parentNode.insertBefore(elem, scpt);
		(function() {
		var gdprAppliesGlobally = false;
		function addFrame() {
			if (!window.frames['__cmpLocator']) {
			if (document.body) {
				var body = document.body,
					iframe = document.createElement('iframe');
				iframe.style = 'display:none';
				iframe.name = '__cmpLocator';
				body.appendChild(iframe);
			} else {
				setTimeout(addFrame, 5);
			}
			}
		}
		addFrame();
		function cmpMsgHandler(event) {
			var msgIsString = typeof event.data === "string";
			var json;
			if(msgIsString) {
			json = event.data.indexOf("__cmpCall") != -1 ? JSON.parse(event.data) : {};
			} else {
			json = event.data;
			}
			if (json.__cmpCall) {
			var i = json.__cmpCall;
			window.__cmp(i.command, i.parameter, function(retValue, success) {
				var returnMsg = {"__cmpReturn": {
				"returnValue": retValue,
				"success": success,
				"callId": i.callId
				}};
				event.source.postMessage(msgIsString ?
				JSON.stringify(returnMsg) : returnMsg, '*');
			});
			}
		}
		window.__cmp = function (c) {
			var b = arguments;
			if (!b.length) {
			return __cmp.a;
			}
			else if (b[0] === 'ping') {
			b[2]({"gdprAppliesGlobally": gdprAppliesGlobally,
				"cmpLoaded": false}, true);
			} else if (c == '__cmp')
			return false;
			else {
			if (typeof __cmp.a === 'undefined') {
				__cmp.a = [];
			}
			__cmp.a.push([].slice.apply(b));
			}
		}
		window.__cmp.gdprAppliesGlobally = gdprAppliesGlobally;
		window.__cmp.msgHandler = cmpMsgHandler;
		if (window.addEventListener) {
			window.addEventListener('message', cmpMsgHandler, false);
		}
		else {
			window.attachEvent('onmessage', cmpMsgHandler);
		}
		})();
		window.__cmp('init', {
				'Language': 'en',
			'Initial Screen Body Text Option': 1,
			'Publisher Name': 'Moneytizer',
			'Default Value for Toggles': 'off',
			'UI Layout': 'banner',
			'No Option': false,
		});
		</script>
		<style>
			.qc-cmp-button,
			.qc-cmp-button.qc-cmp-secondary-button:hover {
				background-color: #000000 !important;
				border-color: #000000 !important;
			}
			.qc-cmp-button:hover,
			.qc-cmp-button.qc-cmp-secondary-button {
				background-color: transparent !important;
				border-color: #000000 !important;
			}
			.qc-cmp-alt-action,
			.qc-cmp-link {
				color: #000000 !important;
			}
			.qc-cmp-button,
			.qc-cmp-button.qc-cmp-secondary-button:hover {
				color: #ffffff !important;
			}
			.qc-cmp-button:hover,
			.qc-cmp-button.qc-cmp-secondary-button {
				color: #000000 !important;
			}
			.qc-cmp-small-toggle,
			.qc-cmp-toggle {
				background-color: #000000 !important;
				border-color: #000000 !important;
			}
			.qc-cmp-main-messaging,
			.qc-cmp-messaging,
			.qc-cmp-sub-title,
			.qc-cmp-privacy-settings-title,
			.qc-cmp-purpose-list,
			.qc-cmp-tab,
			.qc-cmp-title,
			.qc-cmp-vendor-list,
			.qc-cmp-vendor-list-title,
			.qc-cmp-enabled-cell,
			.qc-cmp-toggle-status,
			.qc-cmp-table,
			.qc-cmp-table-header {
				color: #000000 !important;
			}
			
			.qc-cmp-ui {
				background-color: #ffffff !important;
			}

			.qc-cmp-table,
			.qc-cmp-table-row {
				border: 1px solid !important;
				border-color: #000000 !important;
			} 
		#qcCmpButtons a {
				text-decoration: none !important;

		}

		.qc-cmp-qc-link-container{
		display:none;
		}
		</style>
	`)
}
