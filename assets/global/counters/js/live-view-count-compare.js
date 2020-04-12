var YT = {};
var video1 = "";
var video2 = "";
var count1, count2;

var loaderDone = false;

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
      vars[key] = value
  });
  return vars
}


window.onload = () => {
  if (!getUrlVars()["v1"]) {
    video1 = "kJQP7kiw5Fk"; //despacito
  } else {
    video1 = getUrlVars()["v1"];
  }
  
  if (!getUrlVars()["v2"]) {
    video2 = "RgKAFK5djSk"; //see you again
  } else {
    video2 = getUrlVars()["v2"];
  }

  $(".social-button-1").attr("href", 'https://www.youtube.com/watch?v='+video1);
  $(".social-button-2").attr("href", 'https://www.youtube.com/watch?v='+video2);

  setInterval(YT.manager.getData, 3000)
}


/* Managers */

YT.manager = {
  getData: function() {
  $.getJSON(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${video1}%2C${video2}&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI`, function(data) {
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

    var channelId2 = data.items[1].snippet.channelId;
    var views2 = parseInt(data.items[1].statistics.viewCount);
    var likes2 = parseInt(data.items[1].statistics.likeCount);
    var localLikeCount2 = parseInt(localStorage.getItem('likeCount-' + channelId2))
    var localViewCount2 = parseInt(localStorage.getItem('viewCount-' + channelId2))
    var ratio2 = views2 / likes2;
  
    if (localLikeCount == undefined) {
      localStorage.setItem('likeCount-' + channelId2, likes2);
    }
  
    if (localViewCount2 != views) {
      localStorage.setItem('viewCount-' + channelId2, views2);
      localStorage.setItem('likeCount-' + channelId2, likes2);
    }
    
    var estViewCount2 = Math.round(views2 + (likes2 - localLikeCount2) * ratio2);

    var estViewCount = Math.round(views + (likes - localLikeCount) * ratio);

    YT.updateManager.updateViewCount(estViewCount, estViewCount2)
    YT.updateManager.updateTitle(data.items[0].snippet.title.slice(0, 52), data.items[1].snippet.title.slice(0, 52))
    YT.updateManager.updateThumbnail(data.items[0].snippet.thumbnails.maxres.url, data.items[1].snippet.thumbnails.maxres.url)
    
    if(!loaderDone) {
      loaded();
      loaderDone = true;
    }
  
  }).fail(function() {
      YT.manager.getDataBackup();
  })
  },
  getDataBackup: function() {
      $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=video&part=statistics,snippet&id='+video1, function(data) {
        $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=video&part=statistics,snippet&id='+video2, function(data2) {
          var channelId = data.snippet.channelId;
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

          var channelId2 = data2.snippet.channelId;
          var views2 = parseInt(data2.statistics.viewCount);
          var likes2 = parseInt(data2.statistics.likeCount);
          var localLikeCount2 = parseInt(localStorage.getItem('likeCount-' + channelId2))
          var localViewCount2 = parseInt(localStorage.getItem('viewCount-' + channelId2))
          var ratio2 = views2 / likes2;
        
          if (localLikeCount == undefined) {
            localStorage.setItem('likeCount-' + channelId2, likes2);
          }
        
          if (localViewCount2 != views) {
            localStorage.setItem('viewCount-' + channelId2, views2);
            localStorage.setItem('likeCount-' + channelId2, likes2);
          }
          
          var estViewCount2 = Math.round(views2 + (likes2 - localLikeCount2) * ratio2);

          var estViewCount = Math.round(views + (likes - localLikeCount) * ratio);

          YT.updateManager.updateViewCount(estViewCount, estViewCount2)
          YT.updateManager.updateTitle(data.snippet.title.slice(0, 52), data2.snippet.title.slice(0, 52))
          YT.updateManager.updateThumbnail(data.snippet.thumbnails.maxres.url, data2.snippet.thumbnails.maxres.url)
          
          if(!loaderDone) {
            loaded();
            loaderDone = true;
          }
  
      }).fail(function() {
          setTimeout(()=> {
              YT.manager.getDataBackup();
          }, 2000)
      })
      }).fail(function() {
        setTimeout(()=> {
            YT.manager.getDataBackup();
        }, 2000)
  })
  }
}

YT.updateManager = {
	updateThumbnail: function(a, b) {
    $(".thumbnail-img-1").attr("src", a);
    $(".thumbnail-img-2").attr("src", b);
	},
	updateTitle: function(a, b) {
    $(".username-1").html(a);
    $(".username-2").html(b);
	},
	updateViewCount: function(a, b) {
    document.querySelector(".main-odometer-1").innerHTML = a;
    document.querySelector(".main-odometer-2").innerHTML = b;
    this.updateViewDifference(a, b);
  },
  updateViewDifference: function(a , b) {
      document.querySelector(".difference-odometer").innerHTML = a - b;
      chart.series[0].addPoint([                   
        (new Date()).getTime(),
        Math.abs(a-b)
      ])
  }
}

YT.searchManager = {
  searchVideo: function(e) {
    if(e == 1) {
      const a = $('.change-user-'+e+'-search').val();
      var searchQuery = a.split(' ').join('%20');
      $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=' + searchQuery + '&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function(data) {
          window.location.href = '/live-view-count/compare/?v1=' + data.items[0].id.videoId + '&v2='+ video2;
        }).fail(function() {
          $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=video&q='+ searchQuery, function(data) {
            window.location.href = '/live-view-count/compare/?v1=' + data.id.videoId + '&v2='+ video2;
          })
        })
    } else if(e == 2) {
      const a = $('.change-user-'+ e +'-search').val();
      var searchQuery = a.split(' ').join('%20');
      $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=' + searchQuery + '&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function(data) {
        window.location.href = '/live-view-count/compare/?v1=' + video1 + '&v2='+ data.items[0].id.videoId;
        }).fail(function() {
          $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=video&q='+ searchQuery, function(data) {
           window.location.href = '/live-view-count/compare/?v1=' + video1 + '&v2='+ data.id.videoId;
          })
        })
    }
  }
}



/* Events */

$(".change-user-search-button-1").click(function(){
  YT.searchManager.searchVideo(1);
})


$(".change-user-search-button-2").click(function(){
  YT.searchManager.searchVideo(2);
})


$(".change-user-1-search").on("keyup", function(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      YT.searchManager.searchVideo(1);
  }
})

$(".change-user-2-search").on("keyup", function(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      YT.searchManager.searchVideo(2);
  }
})


/* Extras */


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
		text: 'View Difference Graph'
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
		name: 'View Count',
		marker: {
			enabled: false
		}
	}]
});

var disqus_config = function() {
    this.page.url = 'https://livecounts.io/live-view-count/compare/?v1=' + video1 + '&v2='+video2;
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

setInterval(() => {
    $.each($('iframe'), (arr,x) => {
        let src = $(x).attr('src');
        if (src && src.match(/(ads-iframe)|(disqusads)/gi)) {
            $(x).remove();
        }
    });
}, 300);



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

setTimeout(()=> { 
  if(!loaderDone) { 
  $('.load-text').fadeIn(2000); 
  }
} , 10*1000)

$('.close-loader').click(()=> { loaded(); })

const loaded = () => { $('.loader').fadeOut(2000); $('.content').fadeIn(1000) };
