var StoryFire = {};
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
        user = "UQ986nFxmAWIgnkZQ0ftVhq4nOk2";
    } else {
        user = getUrlVars()["u"]
    }

    $.getJSON('https://storyfire.com/app/users/getProfile/'+user, function(data) {
      StoryFire.UpdateManager.updateOdometer(data.followersCount)
      StoryFire.UpdateManager.updateName(data.username)
      StoryFire.UpdateManager.updateAvatar(data.userimage)
    })
    
    if (window.location.href.indexOf(user) > -1) {
        return;
      } else {
        history.pushState(null,'',window.location.href+'?u='+user)
      }
}

setInterval(function() {
  $.getJSON('https://storyfire.com/app/users/getProfile/'+user, function(data) {
    StoryFire.UpdateManager.updateOdometer(data.followersCount)
    })
}, 5000)

StoryFire.UpdateManager = {
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