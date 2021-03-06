var TikTok = {};
var user1;
var user2
var startRefresh;

var TikTokURL = "https://tiktok.livecounts.io/tiktok/"

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-119417406-7');

TikTok.updateManager = {
  updateBanner: function(a,b) {
    document.querySelector(".banner-1").src = a;
    document.querySelector(".banner-2").src = b;
  },
  updateAvatar: function(a,b) {
    document.querySelector(".profile-picture-1").src = a;
    document.querySelector(".profile-picture-2").src = b;
  },
  updateUsername: function(a,b) {
    let items1 = document.querySelectorAll(".username-1");
    let items2 = document.querySelectorAll(".username-2");
    
    for (let i=0; i < items1.length; i++) {
      items1[i].innerHTML = a
    }
    
    for (let i=0; i < items2.length; i++) {
      items2[i].innerHTML = b
    }
    
    document.querySelector(".tiktok-button-1").href = "https://tiktok.com/@"+user1
    document.querySelector(".tiktok-button-2").href = "https://tiktok.com/@"+user2
  },
  updateFollowerCount: function(a,b) {
    document.querySelector(".main-odometer-1").innerHTML = a;
    document.querySelector(".main-odometer-2").innerHTML = b;
    
    //Update Difference
    document.querySelector(".difference-odometer").innerHTML = a - b
  }
}

TikTok.refreshManager = {
  start: function() {
    startRefresh = setInterval(function() {
     $.getJSON(TikTokURL + user1, function(data1) {
       $.getJSON(TikTokURL + user2, function(data2) {
          TikTok.updateManager.updateFollowerCount(data1.followCount, data2.followCount)
       })
      })
    }, 3000)
  },
  stop: function() {
    clearInterval(startRefresh)
  }
}

// ---------------------------------- //

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}

function getData() {
  $.getJSON(TikTokURL + user1, function(data1) {
     $.getJSON(TikTokURL +user2, function(data2) {
       TikTok.updateManager.updateAvatar(data1.avatar, data2.avatar)
       TikTok.updateManager.updateUsername(data1.username, data2.username)
       TikTok.updateManager.updateFollowerCount(data1.followCount, data2.followCount)
     }).fail(function() {
       setTimeout(function() {
         getData();
       }, 1000)
     })
  }).fail(function() {
    setTimeout(function() {
      getData();
    }, 1000)
  })
}

function searchUser1() {
  var change_user = document.querySelector(".change-user-1-search").value
  if (change_user.length == 0) {
    alert("Invalid Username!")
  } else {
    window.location.href = "/tiktok-realtime/compare/?user1="+change_user+"&user2="+user2
  }
}

function searchUser2() {
  var change_user = document.querySelector(".change-user-2-search").value
  if (change_user.length == 0) {
    alert("Invalid Username!")
  } else {
    window.location.href = "/tiktok-realtime/compare/?user1="+user1+"&user2="+change_user
  }
}


// ---------------------------------- //

if (!getUrlVars()["user1"]) {
    user1 = "charlidamelio";
    
} else {
    user1 = getUrlVars()["user1"];
}

if (!getUrlVars()["user2"]) {
    user2 = "lorengray";
} else {
    user2 = getUrlVars()["user2"];
}

setTimeout(function() {
  if (!getUrlVars()["user1"]) {
    history.pushState(null,'',window.location.href+'?user1='+user1)
  }
  
  setTimeout(function() {
    if (!getUrlVars()["user2"]) {
      history.pushState(null,'',window.location.href+'&user2='+user2)
    }
  }, 500)
  
  getData();
  TikTok.refreshManager.start();

  var pattern1 = Trianglify({
    width: 1110,
    height: 200
  });

  var pattern2 = Trianglify({
    width: 1110,
    height: 200
  });

  TikTok.updateManager.updateBanner(pattern1.png(), pattern2.png())
}, 1)

// ---------------------------------- //

// Change User Handler

$(".change-user-search-button-1").click(function() {
  searchUser1();
})

$(".change-user-1-search").keyup(function(event) {
    if (event.keyCode === 13) {
        searchUser1()
    }
});

// Compare User Handler

$(".change-user-search-button-2").click(function() {
  searchUser2();
})

$(".change-user-2-search").keyup(function(event) {
    if (event.keyCode === 13) {
        searchUser2();
    }
});


var disqus_config = function() {
    this.page.url = 'https://livecounts.io/tiktok-realtime/compare/?u1='+user1+'&u2='+user2;
    this.page.identifier = 'tiktok-compare-'+user1+'-'+user2;
};

(function() {
    var d = document,
        s = d.createElement('script');
    s.src = 'https://livecounts-io.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();

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