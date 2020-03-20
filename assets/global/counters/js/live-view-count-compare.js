var YT = {};
var video1 = "";
var video2 = "";
var key = "";
var rightKeys = [];
var actualChannelID1;
var actualChannelID2;

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
            text: 'Estimated View Difference Graph'
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
            name: 'Estimated View Difference',
            marker: {
                enabled: false
            }
        }]
    });

window.onload = () => {
    var rightKey = rightKeys[Math.floor(Math.random()*rightKeys.length)];
    var urlsplit = location.href.split("/")
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


        $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+video1+','+video2+'&key=AIzaSyAzRmWRQKbQpnAIH-Ws0ruzgxafjECdBCg', function(data) {
            if (data.items[0].id == video1) {
                YT.UpdateManager.updateTitle(data.items[0].snippet.title, data.items[1].snippet.title)
                actualChannelID1 = data.items[0].snippet.channelId
                actualChannelID2 = data.items[1].snippet.channelId
            } else {
                YT.UpdateManager.updateTitle(data.items[1].snippet.title, data.items[0].snippet.title)
                actualChannelID1 = data.items[1].snippet.channelId
                actualChannelID2 = data.items[0].snippet.channelId
            }
        }).fail(function() {
          $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=video&part=snippet&id='+video1, function(data) {
            $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=video&part=snippet&id='+video2, function(data2) {
              YT.UpdateManager.updateTitle(data.snippet.title, data2.snippet.title)
              actualChannelID1 = data.snippet.channelId
              actualChannelID2 = data2.snippet.channelId
            })
          })
        })

    YT.UpdateManager.updateThumbnail('https://i3.ytimg.com/vi/'+video1+'/maxresdefault.jpg', 'https://i3.ytimg.com/vi/'+video2+'/maxresdefault.jpg')

    if (window.location.href.indexOf(video1 || video2) > -1) {
        return;
    } else {
        history.pushState(null,'',window.location.href+'?v1='+video1+'&v2='+video2)
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

setInterval(function () {
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
			console.log("Invalid key detected in right key array, removing it...")
		}
		console.log("Invalid key, retrying...")
  })

  var rightKey = rightKeys[Math.floor(Math.random()*rightKeys.length)];

    $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id='+video1+','+video2+'&key='+rightKey, function(data) {
        if (data.items[0].id == video1) {
		  var channelId = data.items[0].snippet.channelId;
		  var views = parseInt(data.items[0].statistics.viewCount);
		  var likes = parseInt(data.items[0].statistics.likeCount);
		  var localLikeCount = parseInt(localStorage.getItem('likeCount-' + channelId))
		  var localViewCount = parseInt(localStorage.getItem('viewCount-' + channelId))
		  var ratio = views / likes;
		  
		  var channelId2 = data.items[1].snippet.channelId;
		  var views2 = parseInt(data.items[1].statistics.viewCount);
		  var likes2 = parseInt(data.items[1].statistics.likeCount);
		  var localLikeCount2 = parseInt(localStorage.getItem('likeCount2-' + channelId2))
		  var localViewCount2 = parseInt(localStorage.getItem('viewCount2-' + channelId2))
		  var ratio2 = views2 / likes2;
		  
		  if (localLikeCount == undefined) {
			localStorage.setItem('likeCount-' + channelId, likes);
		  }
		  
		 if (localLikeCount2 == undefined) {
			localStorage.setItem('likeCount2-' + channelId2, likes2);
		  }
		  
		  if (localViewCount != views) {
			localStorage.setItem('viewCount-' + channelId, views);
			localStorage.setItem('likeCount-' + channelId, likes);
		  }
		  
		if (localViewCount2 != views2) {
			localStorage.setItem('viewCount2-' + channelId2, views2);
			localStorage.setItem('likeCount2-' + channelId2, likes2);
		  }
		  
		  var estimatedViews = Math.round(views + (likes - localLikeCount) * ratio);
		  var estimatedViews2 = Math.round(views2 + (likes2 - localLikeCount2) * ratio2);

            YT.UpdateManager.updateViews(estimatedViews, estimatedViews2, parseInt(estimatedViews - estimatedViews2))

            chart.series[0].addPoint([                   
                (new Date()).getTime(),
                estimatedViews - estimatedViews2
            ])

            if (chart.series[0].data.length >= 900) {
                chart.series[0].data[0].remove()
            }

        } else {
		  var channelId = data.items[1].snippet.channelId;
		  var views = parseInt(data.items[1].statistics.viewCount);
		  var likes = parseInt(data.items[1].statistics.likeCount);
		  var localLikeCount = parseInt(localStorage.getItem('likeCount-' + channelId))
		  var localViewCount = parseInt(localStorage.getItem('viewCount-' + channelId))
		  var ratio = views / likes;
		  
		  var channelId2 = data.items[0].snippet.channelId;
		  var views2 = parseInt(data.items[0].statistics.viewCount);
		  var likes2 = parseInt(data.items[0].statistics.likeCount);
		  var localLikeCount2 = parseInt(localStorage.getItem('likeCount2-' + channelId))
		  var localViewCount2 = parseInt(localStorage.getItem('viewCount2-' + channelId))
		  var ratio2 = views2 / likes2;
		  
		  if (localLikeCount == undefined) {
			localStorage.setItem('likeCount-' + channelId, likes);
		  }
		  
		 if (localLikeCount2 == undefined) {
			localStorage.setItem('likeCount2-' + channelId2, likes2);
		  }
		  
		  if (localViewCount != views) {
			localStorage.setItem('viewCount-' + channelId, views);
			localStorage.setItem('likeCount-' + channelId, likes);
		  }
		  
		if (localViewCount2 != views2) {
			localStorage.setItem('viewCount2-' + channelId2, views2);
			localStorage.setItem('likeCount2-' + channelId2, likes2);
		  }
		  
		  var estimatedViews = Math.round(views + (likes - localLikeCount) * ratio);
		  var estimatedViews2 = Math.round(views2 + (likes2 - localLikeCount2) * ratio2);

            YT.UpdateManager.updateViews(estimatedViews, estimatedViews2, parseInt(estimatedViews - estimatedViews2))

            chart.series[0].addPoint([                   
                (new Date()).getTime(),
                estimatedViews - estimatedViews2
            ])

            if (chart.series[0].data.length >= 900) {
                chart.series[0].data[0].remove()
            }
        }
  }).fail(function() {
    $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=video&part=statistics&id='+video1, function(data) {
      $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=video&part=statistics&id='+video2, function(data2) {
        var channelId = actualChannelID1;
        var views = parseInt(data.statistics.viewCount);
        var likes = parseInt(data.statistics.likeCount);
        var localLikeCount = parseInt(localStorage.getItem('likeCount-' + channelId))
        var localViewCount = parseInt(localStorage.getItem('viewCount-' + channelId))
        var ratio = views / likes;
        
        var channelId2 = actualChannelID2;
        var views2 = parseInt(data2.statistics.viewCount);
        var likes2 = parseInt(data2.statistics.likeCount);
        var localLikeCount2 = parseInt(localStorage.getItem('likeCount2-' + channelId2))
        var localViewCount2 = parseInt(localStorage.getItem('viewCount2-' + channelId2))
        var ratio2 = views2 / likes2;
        
        if (localLikeCount == undefined) {
        localStorage.setItem('likeCount-' + channelId, likes);
        }
        
       if (localLikeCount2 == undefined) {
        localStorage.setItem('likeCount2-' + channelId2, likes2);
        }
        
        if (localViewCount != views) {
        localStorage.setItem('viewCount-' + channelId, views);
        localStorage.setItem('likeCount-' + channelId, likes);
        }
        
      if (localViewCount2 != views2) {
        localStorage.setItem('viewCount2-' + channelId2, views2);
        localStorage.setItem('likeCount2-' + channelId2, likes2);
        }
        
        var estimatedViews = Math.round(views + (likes - localLikeCount) * ratio);
        var estimatedViews2 = Math.round(views2 + (likes2 - localLikeCount2) * ratio2);
  
              YT.UpdateManager.updateViews(estimatedViews, estimatedViews2, parseInt(estimatedViews - estimatedViews2))
  
              chart.series[0].addPoint([                   
                  (new Date()).getTime(),
                  estimatedViews - estimatedViews2
              ])
  
              if (chart.series[0].data.length >= 900) {
                  chart.series[0].data[0].remove()
              }     
     })
    })
  })

}, 2500)

YT.UpdateManager = {
    updateThumbnail: function(a,b) {
        document.querySelector(".thumbnail1").src = a;
        document.querySelector(".thumbnail2").src = b;
    },

    updateTitle: function(a,b) {
        document.querySelector(".title1").innerText= a;
        document.querySelector(".title2").innerText= b;
    },

    updateViews: function(a,b,c) {
        document.querySelector(".odo1").innerHTML=a;
        document.querySelector(".odo2").innerHTML=b;
        document.querySelector(".difference-odo").innerHTML=c;
    }
}


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

function search1() {
    var replaceurl = document.getElementById('search1').value.replace("%20", " ");
    var rightKey = rightKeys[Math.floor(Math.random()*rightKeys.length)];
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=' + replaceurl + '&key=' + rightKey, function(data) {
        window.location.href = '/live-view-count/compare/?v1=' + data.items[0].id.videoId + '&v2=' + video2;
      }).fail(function() {
        $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=video&q='+replaceurl, function(data) {
          window.location.href = '/live-view-count/compare/?v1='+data.id.videoId+'&v2='+video2;
        })
      })

}

function search2() {
    var replaceurl = document.getElementById('search2').value.replace("%20", " ");
    var rightKey = rightKeys[Math.floor(Math.random()*rightKeys.length)];
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=' + replaceurl + '&key=' + rightKey, function(data) {
        window.location.href = '/live-view-count/compare/?v1=' + video1 + '&v2=' + data.items[0].id.videoId;
      }).fail(function() {
        $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=video&q='+replaceurl, function(data) {
          window.location.href = '/live-view-count/compare/?v1='+video2+'&v2='+data.id.videoId;
        })
      })
}

$("#searchbutton1").click(function(){
    search1();
    })

    $("#searchbutton2").click(function(){
        search2();
        })
  
