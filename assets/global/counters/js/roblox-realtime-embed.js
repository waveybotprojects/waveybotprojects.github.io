var Twitch = {};
var user = "";

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

window.onload = () => {

    if (!getUrlVars()["id"]) {
        user = "1";
    } else {
        user = getUrlVars()["id"]
    }

    $.getJSON('https://cors.livecounts.io/https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds='+user+'&size=150x150&format=Png&isCircular=false', function(data) {
      $.getJSON('https://cors.livecounts.io/https://api.roblox.com/users/'+user, function(data2) {
        Twitch.UpdateManager.updateAvatar(data.data[0].imageUrl)
        Twitch.UpdateManager.updateName(data2.Username)
      })
    })

    $.getJSON('https://cors.livecounts.io/https://friends.roblox.com/v1/users/'+user+'/followers/count', function(data) {
      Twitch.UpdateManager.updateOdometer(data.count)
  })
    
    if (window.location.href.indexOf(user) > -1) {
        return;
      } else {
        history.pushState(null,'',window.location.href+'?id='+user)
      }
}

setInterval(function() {
	$.getJSON('https://cors.livecounts.io/https://friends.roblox.com/v1/users/'+user+'/followers/count', function(data) {
        Twitch.UpdateManager.updateOdometer(data.count)
    })
}, 5000)

Twitch.UpdateManager = {
    updateAvatar: function(a) {
		document.querySelector("#user_pic").src = a;
    },
    updateName: function(a) {
		document.querySelector("#name").innerText = a;
    },
    updateOdometer: function(a) {
		document.querySelector(".main-odo").innerHTML=a;
	}
}