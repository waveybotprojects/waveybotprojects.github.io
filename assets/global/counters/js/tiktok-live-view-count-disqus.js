function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value
	});
	return vars
  }  

var user = "";
var video = "";

if (!getUrlVars()["u"]) {
	user = "lorengray";
} else {
	user = getUrlVars()["u"]
}

if (!getUrlVars()["id"]) {
	video = "6809718958074236166";
} else {
	video = getUrlVars()["id"]
}

var disqus_config = function () {
    this.page.url = 'https://livecounts.io/tiktok-video-stats/?u='+user+'&id='+video;
	this.page.identifier = 'tiktok-video-stats-'+user+"-"+video;
};

(function() {
var d = document, s = d.createElement('script');
s.src = 'https://livecounts-io.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();