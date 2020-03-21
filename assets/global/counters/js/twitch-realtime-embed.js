var Twitch = {};
var user = "";
var parser = new DOMParser()


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

    if (!getUrlVars()["u"]) {
        user = "Ninja";
    } else {
        user = getUrlVars()["u"]
    }

    $.get("https://cors.livecounts.io/https://www.lurker.tv/module/livestats.php?grab=channelinfo&channel="+user)
      .done(function(response) {
          var parse = parser.parseFromString(response, "text/html")
          var avatar = parse.querySelector('img').src
          var name = parse.querySelector('a').text
          Twitch.UpdateManager.updateName(name)
          Twitch.UpdateManager.updateAvatar(avatar)
  })

    
    if (window.location.href.indexOf(user) > -1) {
        return;
      } else {
        history.pushState(null,'',window.location.href+'?u='+user)
      }
}

setInterval(function() {
	$.getJSON('https://cors.livecounts.io/https://www.lurker.tv/module/livestats.php?grab=followers&channel='+user, function(data) {
        Twitch.UpdateManager.updateOdometer(data)
    })
}, 2000)

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