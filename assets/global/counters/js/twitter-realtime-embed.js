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

    if (!getUrlVars()["u"]) {
        user = "ShazGucci";
    } else {
        user = getUrlVars()["u"]
    }

    $.getJSON('https://api.thesocialcounter.com/twitter/?name='+user, function(data) {
      Twitch.UpdateManager.updateName(data.name)
      Twitch.UpdateManager.updateAvatar(data.profile_image_url_https.replace("normal", "400x400").replace("default", "400x400"))
    })
    
    if (window.location.href.indexOf(user) > -1) {
        return;
      } else {
        history.pushState(null,'',window.location.href+'?u='+user)
      }
}

setInterval(function() {
	$.getJSON('https://bastet.socialblade.com/twitter/lookup?query='+user, function(data) {
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