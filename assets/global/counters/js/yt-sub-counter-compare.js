var YT = {};
var user1;
var user2
var startRefresh;

var isUsingEstimatedCounters1;
var isUsingEstimatedCounters2;


window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-119417406-7');

YT.updateManager = {
	updateBanner: function(a,b) {
    document.querySelector(".banner-1").src = a
    document.querySelector(".banner-2").src = b
  },
  updateAvatar: function(a,b) {
    document.querySelector(".profile-picture-1").src = a
    document.querySelector(".profile-picture-2").src = b
  },
  updateName: function(a,b) {
    let name1 = document.querySelectorAll(".username-1")
    let name2 = document.querySelectorAll(".username-2")
    for (let i = 0; i < name1.length; i++) {
      name1[i].innerHTML = a;
    }
    for (let i = 0; i < name2.length; i++) {
      name2[i].innerHTML = b;
    }

    document.querySelector(".social-button-1").href = "https://www.youtube.com/channel/"+user1
    document.querySelector(".social-button-2").href = "https://www.youtube.com/channel/"+user2
  },
  updateSubscriberCount: function(a,b) {
    document.querySelector(".main-odometer-1").innerHTML = a;
    document.querySelector(".main-odometer-2").innerHTML = b;
    if (getUrlVars()["t"] == 4) {
      document.querySelector(".difference-odometer").innerHTML = Math.abs(a - b);
    } else {
      document.querySelector(".difference-odometer").innerHTML = a - b;
    }
    
    chart.series[0].addPoint([                   
			(new Date()).getTime(),
			Math.abs(a - b)
		])

		if (chart.series[0].data.length >= 600) {
			chart.series[0].data[0].remove()
		}
  }
}

YT.refreshManager = {
  start: function() {
    startRefresh = setInterval(function() {
      getSubData();
    }, 2500)
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

function checkData() {
	$.getJSON("https://api.livecounts.io/yt_subs", function(data) {
    var result1 = data.filter(x => x.cid === user1);
    var result2 = data.filter(x => x.cid === user2);
		if (result1.length != 0) {
			isUsingEstimatedCounters1 = true;
    }
    
    if (result2.length != 0) {
      isUsingEstimatedCounters2 = true;
    }
	})
}

function getData() {
  $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings&id='+user1+','+user2+'&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function(data) {
    if (data.items[0].id == user1) {
      YT.updateManager.updateBanner(data.items[0].brandingSettings.image.bannerImageUrl, data.items[1].brandingSettings.image.bannerImageUrl)
      YT.updateManager.updateAvatar(data.items[0].snippet.thumbnails.high.url, data.items[1].snippet.thumbnails.high.url)
      YT.updateManager.updateName(data.items[0].snippet.title, data.items[1].snippet.title)
    } else {
      YT.updateManager.updateBanner(data.items[1].brandingSettings.image.bannerImageUrl, data.items[0].brandingSettings.image.bannerImageUrl)
      YT.updateManager.updateAvatar(data.items[1].snippet.thumbnails.high.url, data.items[0].snippet.thumbnails.high.url)
      YT.updateManager.updateName(data.items[1].snippet.title, data.items[0].snippet.title)
    }
  }).fail(function() {
    getDataBackup();
  })
}

function getDataBackup() {
  $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=snippet&id='+user1, function(data1) {
    $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=snippet&id='+user2, function(data2) {
      YT.updateManager.updateBanner(data1.brandingSettings.image.bannerImageUrl, data2.brandingSettings.image.bannerImageUrl)
      YT.updateManager.updateAvatar(data1.snippet.thumbnails.high.url, data2.snippet.thumbnails.high.url)
      YT.updateManager.updateName(data1.snippet.title, data2.snippet.title)   
    }).fail(function() {
      setTimeout(function() {
        getDataBackup();
      }, 500)
    })
  }).fail(function() {
    setTimeout(function() {
      getDataBackup();
    }, 500)  
  })
}

function getSubData() {
  if (isUsingEstimatedCounters1 && isUsingEstimatedCounters2) {
    $.getJSON("https://api.livecounts.io/yt_subs", function(data) {
      var result1 = data.filter(x => x.cid === user1);
      var result2 = data.filter(x => x.cid === user2);

      YT.updateManager.updateSubscriberCount(result1[0].subscriberCount, result2[0].subscriberCount)
    })
  }

  if (isUsingEstimatedCounters1 && !isUsingEstimatedCounters2) {
    $.getJSON("https://api.livecounts.io/yt_subs", function(data) {
      $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=statistics&id='+user2, function(data2) {
        var result = data.filter(x => x.cid === user1);
        YT.updateManager.updateSubscriberCount(result[0].subscriberCount, data2.statistics.subscriberCount)
      })
    })
  }

  if (!isUsingEstimatedCounters1 && isUsingEstimatedCounters2) {
    $.getJSON("https://api.livecounts.io/yt_subs", function(data) {
      $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=statistics&id='+user1, function(data2) {
        var result = data.filter(x => x.cid === user2);
        YT.updateManager.updateSubscriberCount(data2.statistics.subscriberCount, result[0].subscriberCount)
      })
    }) 
  }

  if (!isUsingEstimatedCounters1 && !isUsingEstimatedCounters2) {
    $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=statistics&id='+user1, function(data) {
      $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=statistics&id='+user2, function(data2) {
        YT.updateManager.updateSubscriberCount(data.statistics.subscriberCount, data2.statistics.subscriberCount)
      })
    })
  }
}

function searchUser1() {
  $(".channel-list-compare-1").html("");
  var change_user = document.querySelector(".change-user-1-search").value
  if (change_user.value != 0) {
    $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=channel&maxResults=5&q='+change_user,function(data) {
      for (let i = 0; i < data.items.length; i++) {
        $(".channel-list-compare-1").append('<a href="/yt-sub-counter/compare/?user1='+data.items[i].id.channelId+'&user2='+user2+'" class="mt-2 card"><div class="d-flex"><img class="rounded-circle" width="64" height="64" src="'+data.items[i].snippet.thumbnails.default.url+'"><h5 style="margin-top: 20px;" class="ml-2">'+data.items[i].snippet.title+'</h5></div></a>');
      }
    }).fail(function() {
      setTimeout(function() {
        searchUser();
      }, 1000)	
    })
  }
}

function searchUser2() {
  $(".channel-list-compare-2").html("");
  var change_user = document.querySelector(".change-user-2-search").value
  if (change_user.value != 0) {
    $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=channel&maxResults=5&q='+change_user,function(data) {
      for (let i = 0; i < data.items.length; i++) {
        $(".channel-list-compare-2").append('<a href="/yt-sub-counter/compare/?user1='+user1+'&user2='+data.items[i].id.channelId+'" class="mt-2 card"><div class="d-flex"><img class="rounded-circle" width="64" height="64" src="'+data.items[i].snippet.thumbnails.default.url+'"><h5 style="margin-top: 20px;" class="ml-2">'+data.items[i].snippet.title+'</h5></div></a>');
      }
    }).fail(function() {
      setTimeout(function() {
        searchUser2();
      }, 1000)	
    })
  }
}


// ---------------------------------- //

checkData();

if (!getUrlVars()["user1"]) {
    user1 = "UC-lHJZR3Gqxm24_Vd_AJ5Yw"; //PewDiePie
    
} else {
    user1 = getUrlVars()["user1"];
}

if (!getUrlVars()["user2"]) {
    user2 = "UCq-Fj5jknLsUf-MWSy4_brA"; //T-Series
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

    getData();
    getSubData();
  }, 500)


  YT.refreshManager.start();
}, 1)

// ---------------------------------- //

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
		color: '#FF0000',
		marker: {
			enabled: false
		}
	}]
});

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
    this.page.url = 'https://livecounts.io/yt-sub-counter/compare/?user1='+user1+'&user2='+user2;
    this.page.identifier = 'youtube-sub-count-compare-'+user1+'-vs-'+user2
};

(function() {
    var d = document,
        s = d.createElement('script');
    s.src = 'https://livecounts-io.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();


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