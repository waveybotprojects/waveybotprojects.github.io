var YT = {};

var video = '';

var loaderDone = false;

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}

if (!getUrlVars()["v"]) {
    video = "kJQP7kiw5Fk"; //Default - Despacito
} else {
    video = getUrlVars()["v"];
}

window.onload = () => {
    setInterval(YT.manager.getData, 3000);
  	$("#shareurl").val(window.location.href);
		$(".youtube-url").attr("href", 'https://www.youtube.com/watch?v='+video);
}



/* Events */

$(".change-user-search-button").click(function(){
    YT.searchManager.searchVideo();
})

$(".compare-search-button").click(function(){
    YT.searchManager.compareVideo();
})
    
$(".changeuser-search").on("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        YT.searchManager.searchVideo();
    }
})

$(".compare-search").on("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        YT.searchManager.compareVideo();
    }
})


/* Managers */
YT.manager = {
    getData: function() {
    $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id='+ video +'&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function(data) {
      var channelId = data.items[0].snippet.channelId;
      var views = parseInt(data.items[0].statistics.viewCount);
      var likes = parseInt(data.items[0].statistics.likeCount);
	  var localLikeCount = parseInt(localStorage.getItem('likeCount-' + channelId))
	  var localViewCount = parseInt(localStorage.getItem('viewCount-' + channelId))
      var ratio = views / likes;
	  
      if (!localViewCount) {
        localStorage.setItem('likeCount-' + channelId, parseInt(likes));
        localStorage.setItem('viewCount-' + channelId, parseInt(views));
      }

      if (localViewCount != views) {
        localStorage.setItem('viewCount-' + channelId, parseInt(views));
        localStorage.setItem('likeCount-' + channelId, parseInt(likes));
        return views;
      }

      var estViewCount = Math.round(views + (likes - localLikeCount) * ratio);
	  
      YT.updateManager.updateViewCount(estViewCount)
      YT.updateManager.updateTitle((data.items[0].snippet.title).slice(0, 52))
      YT.updateManager.updateThumbnail(data.items[0].snippet.thumbnails.maxres.url)
      YT.updateManager.updateLikes(data.items[0].statistics.likeCount)
      YT.updateManager.updateDislikes(data.items[0].statistics.dislikeCount)
      YT.updateManager.updateComments(data.items[0].statistics.commentCount)
      
      if(!loaderDone) {
        loaded();
        loaderDone = true;
      }
    
    }).fail(function() {
        YT.manager.getDataBackup();
    })
    },
    getDataBackup: function() {
        $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=video&part=statistics,snippet&id='+video, function(data) {
            var channelId = data.snippet.channelId;
            var views = parseInt(data.statistics.viewCount);
            var likes = parseInt(data.statistics.likeCount);
          var localLikeCount = parseInt(localStorage.getItem('likeCount-' + channelId))
          var localViewCount = parseInt(localStorage.getItem('viewCount-' + channelId))
            var ratio = views / likes;
          
            if (!localViewCount) {
              localStorage.setItem('likeCount-' + channelId, parseInt(likes));
              localStorage.setItem('viewCount-' + channelId, parseInt(views));
            }
      
            if (localViewCount != views) {
              localStorage.setItem('viewCount-' + channelId, parseInt(views));
              localStorage.setItem('likeCount-' + channelId, parseInt(likes));
              return views;
            }

            var estViewCount = Math.round(views + (likes - localLikeCount) * ratio);
          
            YT.updateManager.updateViewCount(estViewCount)
            YT.updateManager.updateTitle((data.snippet.title).slice(0, 52))
            YT.updateManager.updateThumbnail(data.snippet.thumbnails.maxres.url)
            YT.updateManager.updateLikes(data.statistics.likeCount)
            YT.updateManager.updateDislikes(data.statistics.dislikeCount)
            YT.updateManager.updateComments(data.statistics.commentCount)
          
          if(!loaderDone) {
            loaded();
            loaderDone = true;
          }
          
        }).fail(function() {
            setTimeout(()=> {
                YT.manager.getDataBackup();
            }, 2000)
        })
    }
}
    

YT.searchManager = {
    searchVideo: function() {
        const a = $('.changeuser-search').val();
        var searchQuery = a.split(' ').join('%20');
        $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=' + searchQuery + '&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function(data) {
            window.location.href = '/live-view-count/?v=' + data.items[0].id.videoId;
          }).fail(function() {
            $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=video&q='+ searchQuery, function(data) {
              window.location.href = '/live-view-count/?v='+data.id.videoId;
            })
          })
    },
    compareVideo: function() {
        const a = $('.compare-search').val();
        var searchQuery = a.split(' ').join('%20');
        $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=' + searchQuery + '&key=AIzaSyAuecFZ9xJXbGDkQYWBmYrtzOGJD-iDIgI', function(data) {
            window.location.href = 'compare/?v1='+ video + '&v2=' + data.items[0].id.videoId;
          }).fail(function() {
            $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=video&q='+ searchQuery, function(data) {
              window.location.href = 'compare/?v1='+ video + '&v2=' + data.id.videoId;
            })
          })
    }
}

YT.updateManager = {
	updateThumbnail: function(a) {
		$(".thumbnail-img").attr("src", a);
	},
	updateTitle: function(a) {
	    $(".username").html(a);
	},
	updateViewCount: function(a) {
		document.querySelector(".main-odometer").innerHTML = a;

		const exponent = Math.floor(Math.log10(a));
		const factor = Math.ceil(a / 10**exponent);
		const final = factor * 10**exponent;
		document.querySelector(".goal-odometer").innerHTML = final - a;

		chart.series[0].addPoint([                   
			(new Date()).getTime(),
			parseInt(a)
		])
    },
    updateComments: function(a) {
        document.querySelector(".comments-odometer").innerHTML = a;
    },
    updateLikes: function(a) {
         document.querySelector(".likes-odometer").innerHTML = a;
    },
    updateDislikes: function(a) {
         document.querySelector(".dislikes-odometer").innerHTML = a;
    }
}

/* Utils */

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
		text: 'View Count Graph'
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
    this.page.url = 'https://livecounts.io/live-view-count/?v=' + video;
    this.page.identifier = video;
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

/*setTimeout(()=> { 
  if(!loaderDone) { 
  $('.load-text').fadeIn(2000); 
  }
} , 10*1000)

$('.close-loader').click(()=> { loaded(); })

const loaded = () => { $('.loader').fadeOut(2000); $('.content').fadeIn(1000) };*/

