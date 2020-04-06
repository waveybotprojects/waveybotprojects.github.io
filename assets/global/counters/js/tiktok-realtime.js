var TikTok = {};
var user;
var startRefresh;
var TikTokURL = "https://www.tiktok.com/node/share/user/@"

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

TikTok.updateManager = {
  updateUsername: function(a) {
    let items = document.querySelectorAll(".username")
    for (let i=0; i < items.length; i++) {
      items[i].innerHTML = a
    }
    
    document.querySelector(".tiktok-url").href = "https://tiktok.com/@"+user
    document.querySelector("#shareurl").value = window.location.href
    document.querySelector("#embed-website").value = '<iframe height="80px" width="300px" frameborder="0" src="https://livecounts.io/tiktok-realtime/embed/?u='+user+'" style="border: 0; width:300px; height:80px; background-color: #FFF;"></iframe>'
    document.querySelector("#obs-url").value = 'https://livecounts.io/tiktok-realtime/embed/?u='+user
  },
  updateAvatar: function(a) {
    document.querySelector(".profile-picture").src = a;
  },
  updateFollowerCount: function(a) {
    document.querySelector(".main-odometer").innerHTML = a;
    
    //also update goal
    a = a + 1;
    if (a < 10) return 10;
    const exponent = Math.floor(Math.log10(a));
    const factor = Math.ceil(a / 10**exponent);
    const final = factor * 10**exponent;
    document.querySelector(".goal-odometer").innerHTML = final - a;
    
    chart.series[0].addPoint([                   
			(new Date()).getTime(),
			a
		])

		if (chart.series[0].data.length >= 600) {
			chart.series[0].data[0].remove()
		}
  },
  updateHeartCount: function(a) {
    document.querySelector(".heart-odometer").innerHTML= a;
  },
  updateYear: function() {
    document.querySelector(".year").innerHTML = new Date().getFullYear()
  }
};

TikTok.corsManager = {
  get: function() {
    return corsProxies[Math.floor(Math.random() * corsProxies.length)];
  }
}

TikTok.refreshManager = {
  start: function() {
    startRefresh = setInterval(function() {
      $.getJSON(TikTok.corsManager.get() + TikTokURL + user, function(data) {
        TikTok.updateManager.updateFollowerCount(data.body.userData.fans)
        TikTok.updateManager.updateHeartCount(data.body.userData.heart)
      })
    }, 2000)
  },
  stop: function() {
    clearInterval(startRefresh)
  }
}

// --------------------------------- //

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}

function getData() {
    $.getJSON(TikTok.corsManager.get() + TikTokURL + user, function(data) {
      TikTok.updateManager.updateUsername(data.body.userData.nickName)
      TikTok.updateManager.updateAvatar(data.body.userData.coversMedium[0])
      TikTok.updateManager.updateFollowerCount(data.body.userData.fans)
      TikTok.updateManager.updateHeartCount(data.body.userData.heart)
  }).fail(function() {
      setTimeout(function() {
        getData();
      }, 500)
  })
}


function searchUser() {
  var change_user = document.querySelector(".changeuser-search").value
  if (change_user.length == 0) {
    alert("Invalid Username!")
  } else {
    window.location.href = "/tiktok-realtime/?u="+change_user
  }
}

function searchCompareUser() {
  var compare_user = document.querySelector(".compare-search").value
  if (compare_user.length == 0) {
    alert("Invalid Username!")
  } else {
    window.location.href = "/tiktok-realtime/compare/?user1="+user+"&user2="+compare_user
  }
}

// --------------------------------- //

if (!getUrlVars()["u"]) {
    user = "charlidamelio";
} else {
    user = getUrlVars()["u"];
}

// Change User Handler

$(".change-user-search-button").click(function() {
  searchUser();
})

$(".changeuser-search").keyup(function(event) {
    if (event.keyCode === 13) {
        searchUser()
    }
});

// Compare User Handler

$(".compare-search-button").click(function() {
  searchCompareUser();
})

$(".compare-search").keyup(function(event) {
    if (event.keyCode === 13) {
        searchCompareUser();
    }
});

setTimeout(function() {
  if (!getUrlVars()["u"]) {
    history.pushState(null,'',window.location.href+'?u='+user)
  }
  
  getData()
  TikTok.updateManager.updateYear()
  TikTok.refreshManager.start()
},1)


var disqus_config = function() {
    this.page.url = 'https://livecounts.io/tiktok-realtime/?u=' + user;
    this.page.identifier = user;
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