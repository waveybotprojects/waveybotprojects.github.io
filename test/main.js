var TikTok = {};
var user;
var startRefresh;
var TikTokURL = "https://www.tiktok.com/node/share/user/@"

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
    
    //SEO
    document.title = "Livecounts.io - "+a+"'s TikTok Live Follower Count"
    document.querySelector('meta[name="title"]').setAttribute("content", "Livecounts.io - "+a+"'s TikTok Live Follower Count");
    document.querySelector('meta[name="description"]').setAttribute("content", "Livecounts.io is the simple way to check "+a+"'s TikTok Follower Count, updated in real-time!");
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
    //retry in case of failure
      setTimeout(function() {
        getData();
      }, 2000)
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