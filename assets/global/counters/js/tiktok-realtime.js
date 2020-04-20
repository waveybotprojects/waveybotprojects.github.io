var TikTok = {};
var user;
var startRefresh;
var ok;
var tiktokUrl = 'https://tiktok.livecounts.io/tiktok/';


if (!getUrlVars()["u"]) {
  user = "charlidamelio";
} else {
  user = getUrlVars()["u"];
}

window.onload = () => {
  getData()
  TikTok.updateManager.updateYear()
  TikTok.refreshManager.start()

  var pattern = Trianglify({
    width: 1110,
    height: 160
  });
  
  document.querySelector(".banner").src = pattern.png()
}


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

    if (window.location.href.includes("?u=")) {
      document.title = "Livecounts.io - "+a+"'s TikTok Live Follower Count";
      document.querySelector('meta[name="description"]').setAttribute("content","Livecounts.io is the simple way to check "+a+"'s Follower Count on TikTok, upadated in real-time!");
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

TikTok.refreshManager = {
  start: function() {
    startRefresh = setInterval(function() {
      $.getJSON(tiktokUrl + user, function(data) {
        if (!ok) {
          TikTok.updateManager.updateUsername(data.username)
          TikTok.updateManager.updateAvatar(data.avatar)
          TikTok.updateManager.updateFollowerCount(data.followCount)
          TikTok.updateManager.updateHeartCount(data.heartCount) 
          ok = true;       
        }
        TikTok.updateManager.updateFollowerCount(data.followCount)
        TikTok.updateManager.updateHeartCount(data.heartCount)
      })
    }, 3000)
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
    $.getJSON(tiktokUrl+user, function(data) {
      TikTok.updateManager.updateUsername(data.username)
      TikTok.updateManager.updateAvatar(data.avatar)
      TikTok.updateManager.updateFollowerCount(data.followCount)
      TikTok.updateManager.updateHeartCount(data.heartCount)
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

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-119417406-7');

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

//------------------------------------------------//

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

$('.more-toggle').click(() => {
  if($('.more-toggle').attr('data-moretoggle') == "true") {
    $('.more-users').css('display','none');
    $('.more-users').css('opacity','0');
    $('.nav-link .fa-arrow-down').css('transform', 'rotate(0deg)')
    $('.more-toggle').attr('data-moretoggle','false');
  } else {
    $('.more-users').css('display','block');
    $('.more-users').css('opacity','1');
    $('.nav-link .fa-arrow-down').css('transform', 'rotate(180deg)')
    $('.more-toggle').attr('data-moretoggle','true');
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
	$("h1,h3,h4,h5,h6,p, .username").css({
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
	$("h1,h3,h4,h5,h6,p, .odometer, .form-control, a, .year, .navbar-text-gone, .username").css("color", "rgb(199, 195, 186)");

	$("h1,h3,h4,h5,h6,p, .username").css({
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