var TikTok = {};
var goal = "";
var video = "";
var user = "";

var ok;

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
      vars[key] = value
  });
  return vars
}

var corsProxies = [
	"https://cors.livecounts.io/",
	"https://nice-cors-proxy-1.glitch.me/",
	"https://nice-cors-proxy-2.glitch.me/",
	"https://nice-cors-proxy-3.glitch.me/",
	"https://nice-cors-proxy-4.glitch.me/",
	"https://shazyy-cors-anywhere.glitch.me/",
	"https://shazyy-cors-anywhere-1.glitch.me/",
    "https://shazyy-cors-anywhere-2.glitch.me/",
    "https://nextcounts-cors01.glitch.me/",
    "https://nextcounts-cors02.glitch.me/",
    "https://nextcounts-cors03.glitch.me/",
    "https://nextcounts-cors04.glitch.me/",
    "https://nextcounts-cors05.glitch.me/",
    "https://nextcounts-cors06.glitch.me/",
    "https://nextcounts-cors07.glitch.me/",
    "https://nextcounts-cors08.glitch.me/",
    "https://nextcounts-cors09.glitch.me/",
    "https://nextcounts-cors10.glitch.me/",
    "https://nextcounts-cors11.glitch.me/",
	"https://nextcounts-cors12.glitch.me/",
	"https://corsanywherebinus.glitch.me/",
	"https://corsanywhere.glitch.me/",
	"https://glitch-cors-anywhere.glitch.me/",
	"https://rob--w-cors-anywhere.glitch.me/",
	"https://rob--w-cors-anywhere-7.glitch.me/",
	"https://rob--w-cors-anywhere-6.glitch.me/",
	"https://cors-anyhere.glitch.me/",
	"https://working-proxy.glitch.me/",
	"https://cors-anywhere-15.glitch.me/",
	"https://chriszs-cors-anywhere.glitch.me/",
	"https://usp-cors-proxy.glitch.me/",
	"https://lightning-meerkat.glitch.me/",
	"https://redditpx-cors.glitch.me/",
	"https://redditpx-cors-2.glitch.me/",
	"https://image-cors-proxy.glitch.me/",
	"https://no-cors.glitch.me/",
	"https://b-b-cors-fix.glitch.me/",
	"https://zcors.glitch.me/",
	"https://poc-radio-proxy.glitch.me/",
	"https://unique-shoe.glitch.me/",
	"https://easrng-cors-anywhere.glitch.me/",
	"https://proxyoga.glitch.me/",
	"https://scarlet-cirrus.glitch.me/",
	"https://rich-collard.glitch.me/",
	"https://melodic-anorak.glitch.me/",
	"https://mesquite-estimate.glitch.me/",
	"https://canva-proxy.glitch.me/",
	"https://stump-jasper.glitch.me/",
	"https://diamond-scallop.glitch.me/",
	"https://sapphire-plate.glitch.me/",
	"https://branched-geese.glitch.me/",
	"https://bony-scribe.glitch.me/",
	"https://wiggly-van.glitch.me/",
	"https://catkin-principal.glitch.me/",
	"https://private-bubbler.glitch.me/",
	"https://feather-bull-1cpvaykota.glitch.me/",
	"https://tropical-walkover.glitch.me/",
	"https://airy-measure.glitch.me/",
	"https://pentagonal-paddleboat-1.glitch.me/",
	"https://clever-aquatic-ketchup.glitch.me/",
	"https://hail-eggplant.glitch.me/",
	"https://iced-scallop.glitch.me/",
	"https://moor-geranium.glitch.me/",
	"https://shorthaired-sedum.glitch.me/",
	"https://dog-trombone.glitch.me/",
	"https://cotton-relation.glitch.me/",
	"https://api.allorigins.win/get?url=",
	"https://corsproxy.glitch.me/",
	"https://shazyy-cors-anywhere-6.glitch.me/",
	"https://shazyy-cors-anywhere-7.glitch.me/",
	"https://shazyy-cors-anywhere-8.glitch.me/",
	"https://shazyy-cors-anywhere-9.glitch.me/",
	"https://shazyy-cors-anywhere-10.glitch.me/",
	"https://ajar-patch-fox.glitch.me/",
	"https://chestnut-almond-painter.glitch.me/",
	"https://tested-brash-minnow.glitch.me/",
	"https://candied-dazzling-handball.glitch.me/",
	"https://mint-spice-bass.glitch.me/",
	"https://futuristic-bald-citrus.glitch.me/",
	"https://plausible-momentous-parrot.glitch.me/",
	"https://loud-alpine-silver.glitch.me/",
	"https://power-boat.glitch.me/",
	"https://fresh-alert-opera.glitch.me/",
	"https://stingy-button-cowbell.glitch.me/",
	"https://amber-attractive-record.glitch.me/",
	"https://grizzly-stirring-seer.glitch.me/",
	"https://amazing-mewing-hellebore.glitch.me/",
	"https://holy-decorous-mango.glitch.me/",
	"https://miniature-lofty-pyroraptor.glitch.me/",
	"https://opalescent-wirehaired-saffron.glitch.me/",
	"https://sordid-silken-snowstorm.glitch.me/",
	"https://waiting-foamy-cappelletti.glitch.me/",
	"https://spotless-fortune-ground.glitch.me/",
	"https://literate-cobalt-locust.glitch.me/",
	"https://elderly-standing-anemone.glitch.me/",
	"https://fluttering-deluxe-roquefort.glitch.me/",
	"https://alder-glib-basin.glitch.me/",
	"https://juvenile-overjoyed-meadowlark.glitch.me/",
	"https://extreme-jumpy-caboc.glitch.me/",
	"https://cors-proxy1.herokuapp.com/",
	"https://livecountsio-cors-1.herokuapp.com/",
	"https://next-is-thief-1.herokuapp.com/",
	"https://next-is-thief-2.herokuapp.com/",
	"https://next-is-thief-3.herokuapp.com/",
	"https://next-is-thief-4.herokuapp.com/",
	"https://next-is-thief-5.herokuapp.com/",
	"https://next-is-thief-6.herokuapp.com/",
	"https://next-is-thief-7.herokuapp.com/",
	"https://next-is-thief-8.herokuapp.com/",
	"https://next-is-thief-9.herokuapp.com/",
	"https://next-is-thief-10.herokuapp.com/",
	"https://next-is-thief-11.herokuapp.com/"
]


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

setTimeout(function() {

  if (!getUrlVars()["u"]) {
      user = "lorengray";
  } else {
      user = getUrlVars()["u"];
  }

  if (!getUrlVars()["id"]) {
    video = "6809718958074236166";
} else {
    video = getUrlVars()["id"];
}

  $.getJSON(corsProxies[Math.floor(Math.random() *corsProxies.length)] + 'https://www.tiktok.com/node/share/video/@'+user+'/'+video, function(data) {
    if (data.body.videoData.itemInfos.text.length >=52) {
      $(".video-title").css("font-size", "calc(7px + 1vw)");
    }  

    TikTok.UpdateManager.updateTitle(data.body.videoData.itemInfos.text)
    TikTok.UpdateManager.updateViews(data.body.videoData.itemInfos.playCount)
    TikTok.UpdateManager.updateLikes(data.body.videoData.itemInfos.diggCount)
    TikTok.UpdateManager.updateComments(data.body.videoData.itemInfos.commentCount)
    TikTok.GoalManager.load(data.body.videoData.itemInfos.diggCount)

    document.querySelector(".video-author").text = data.body.videoObjectPageProps.videoProps.creator.name

  })


    $(".links").load("/assets/global/other.html");

    document.getElementById("shareurl").value = window.location.href;
    document.getElementById("obsurl").value = window.location.href;
    document.getElementById("embed-website").value = '<iframe height="180px" width="500px" frameborder="0" src="' +window.location.href+ '" allowfullscreen></iframe>';

    if (window.location.href.indexOf(user) > -1) {
      return;
    } else {
      history.pushState(null,'',window.location.href+'?u='+user)
    }

    setTimeout(function() {
      if (window.location.href.indexOf(video) > -1) {
        return;
      } else {
        history.pushState(null,'',window.location.href+'&id='+video)
      }
    }, 500)
}, 1)

setInterval(function() {
  $.getJSON(corsProxies[Math.floor(Math.random() *corsProxies.length)] + 'https://www.tiktok.com/node/share/video/@'+user+'/'+video, function(data) {
    if (!ok) {
      TikTok.UpdateManager.updateTitle(data.body.videoData.itemInfos.text)
      document.querySelector(".video-author").innerHTML = data.body.videoObjectPageProps.videoProps.creator.name
      ok = true;
    }
    TikTok.UpdateManager.updateViews(data.body.videoData.itemInfos.playCount)
    TikTok.UpdateManager.updateLikes(data.body.videoData.itemInfos.diggCount)
    TikTok.UpdateManager.updateComments(data.body.videoData.itemInfos.commentCount)
    TikTok.GoalManager.load(data.body.videoData.itemInfos.diggCount)

  })
}, 2500)

TikTok.GoalManager = {
  load: function(a) {
		if (a < 0) goal = 0;
		if (a < 10 && a > 0) goal = 10 - a;
		if (a < 20 && a > 10) goal = 20 - a;
		if (a < 30 && a > 20) goal = 30 - a;
		if (a < 40 && a > 30) goal = 40 - a;
		if (a < 50 && a > 40) goal = 50 - a;
		if (a < 60 && a > 50) goal = 60 - a;
		if (a < 70 && a > 60) goal = 70 - a;
		if (a < 80 && a > 70) goal = 80 - a;
		if (a < 90 && a > 80) goal = 90 - a;
		if (a < 100 && a > 90) goal = 100 - a;
		if (a < 200 && a > 100) goal = 200 - a;
		if (a < 300 && a > 200) goal = 300 - a;
		if (a < 400 && a > 300) goal = 400 - a;
		if (a < 500 && a > 400) goal = 500 - a;
		if (a < 600 && a > 500) goal = 600 - a;
		if (a < 700 && a > 600) goal = 700 - a;
		if (a < 800 && a > 700) goal = 800 - a;
		if (a < 900 && a > 800) goal = 900 - a;
		if (a < 1000 && a > 900) goal = 1000 - a;
		if (a < 2000 && a > 1000) goal = 2000 - a;
		if (a < 3000 && a > 2000) goal = 3000 - a;
		if (a < 4000 && a > 3000) goal = 4000 - a;
		if (a < 5000 && a > 4000) goal = 5000 - a;
		if (a < 6000 && a > 5000) goal = 6000 - a;
		if (a < 7000 && a > 6000) goal = 7000 - a;
		if (a < 8000 && a > 7000) goal = 8000 - a;
		if (a < 9000 && a > 8000) goal = 9000 - a;
		if (a < 10000 && a > 9000) goal = 10000 - a;
		if (a < 20000 && a > 10000) goal = 20000 - a;
		if (a < 30000 && a > 20000) goal = 30000 - a;
		if (a < 40000 && a > 30000) goal = 40000 - a;
		if (a < 50000 && a > 40000) goal = 50000 - a;
		if (a < 60000 && a > 50000) goal = 60000 - a;
		if (a < 70000 && a > 60000) goal = 70000 - a;
		if (a < 80000 && a > 70000) goal = 80000 - a;
		if (a < 90000 && a > 80000) goal = 90000 - a;
		if (a < 100000 && a > 90000) goal = 100000 - a;
		if (a < 200000 && a > 100000) goal = 200000 - a;
		if (a < 300000 && a > 200000) goal = 300000 - a;
		if (a < 400000 && a > 300000) goal = 400000 - a;
		if (a < 500000 && a > 400000) goal = 500000 - a;
		if (a < 600000 && a > 500000) goal = 600000 - a;
		if (a < 700000 && a > 600000) goal = 700000 - a;
		if (a < 800000 && a > 700000) goal = 800000 - a;
		if (a < 900000 && a > 800000) goal = 900000 - a;
		if (a < 1000000 && a > 900000) goal = 1000000 - a;
		if (a < 2000000 && a > 1000000) goal = 2000000 - a;
		if (a < 3000000 && a > 2000000) goal = 3000000 - a;
		if (a < 4000000 && a > 3000000) goal = 4000000 - a;
		if (a < 5000000 && a > 4000000) goal = 5000000 - a;
		if (a < 6000000 && a > 5000000) goal = 6000000 - a;
		if (a < 7000000 && a > 6000000) goal = 7000000 - a;
		if (a < 8000000 && a > 7000000) goal = 8000000 - a;
		if (a < 9000000 && a > 8000000) goal = 9000000 - a;
		if (a < 10000000 && a > 9000000) goal = 10000000 - a;
		if (a < 20000000 && a > 10000000) goal = 20000000 - a;
		if (a < 30000000 && a > 20000000) goal = 30000000 - a;
		if (a < 40000000 && a > 30000000) goal = 40000000 - a;
		if (a < 50000000 && a > 40000000) goal = 50000000 - a;
		if (a < 60000000 && a > 50000000) goal = 60000000 - a;
		if (a < 70000000 && a > 60000000) goal = 70000000 - a;
		if (a < 80000000 && a > 70000000) goal = 80000000 - a;
		if (a < 90000000 && a > 80000000) goal = 90000000 - a;
		if (a < 100000000 && a > 90000000) goal = 100000000 - a;
		if (a < 200000000 && a > 100000000) goal = 200000000 - a;
		if (a < 300000000 && a > 200000000) goal = 300000000 - a;
		if (a < 400000000 && a > 300000000) goal = 400000000 - a;
		if (a < 500000000 && a > 400000000) goal = 500000000 - a;
		if (a < 600000000 && a > 500000000) goal = 600000000 - a;
		if (a < 700000000 && a > 600000000) goal = 700000000 - a;
		if (a < 800000000 && a > 700000000) goal = 800000000 - a;
		if (a < 900000000 && a > 800000000) goal = 900000000 - a;
    if (a < 1000000000 && a > 900000000) goal = 1000000000 - a;
    if (a < 2000000000 && a > 1000000000) goal = 2000000000 - a;
    if (a < 3000000000 && a > 2000000000) goal = 3000000000 - a;
    if (a < 4000000000 && a > 3000000000) goal = 4000000000 - a;
    if (a < 5000000000 && a > 4000000000) goal = 5000000000 - a;
    if (a < 6000000000 && a > 5000000000) goal = 6000000000 - a;
    if (a < 7000000000 && a > 6000000000) goal = 7000000000 - a;
    if (a < 8000000000 && a > 7000000000) goal = 8000000000 - a;
    if (a < 9000000000 && a > 8000000000) goal = 9000000000 - a;
    if (a < 10000000000 && a > 9000000000) goal = 10000000000 - a;
    if (a < 20000000000 && a > 10000000000) goal = 20000000000 - a;
    TikTok.UpdateManager.updateGoal(goal)
  }
}

TikTok.UpdateManager = {
  updateTitle: function(a) {
    document.querySelector(".video-title").innerText = a;
  },
  updateViews: function(a) {
    document.querySelector(".view-odo").innerHTML=a;
  },
  updateLikes: function(a) {
    document.querySelector(".likes-odo").innerHTML=a;
  },
  updateGoal: function(a) {
    document.querySelector(".goal-odo").innerHTML=a;
  },
  updateComments: function(a) {
    document.querySelector(".comments-odo").innerHTML=a;
  },
  /*updateEstimatedCounts: function(a, b, c) {
    document.querySelector(".estimated-per-2-seconds-odo").innerHTML = a;
    document.querySelector(".estimated-per-1-min-odo").innerHTML = b;
    document.querySelector(".estimated-per-1-hr-odo").innerHTML = c;
  }*/
}

function search() {
  var replaceurl = document.getElementById('search').value
  if (!replaceurl.includes("tiktok.com") && !replaceurl.includes("video")) {
    alert("Invalid Video URL! Check our Guide down below!")
  } else {
    var url = replaceurl.split("/")
    window.location.href = "/tiktok-live-view-count/?u="+url[3].replace("@", "")+"&id="+url[5]
  }
}

$("#searchbutton").click(function(){
search();
})

document.getElementById("search").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      search()
  }
})