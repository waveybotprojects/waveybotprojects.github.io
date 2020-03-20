function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value
	});
	return vars
  }

var video = "";

  if (!getUrlVars()["v"]) {
      video = "kJQP7kiw5Fk"; //despacito
  } else {
      video = getUrlVars()["v"];
  }

var disqus_config = function () {
    this.page.url = 'https://livecounts.io/live-view-count/?v='+video;
	this.page.identifier = video;
};

(function() {
var d = document, s = d.createElement('script');
s.src = 'https://livecounts-io.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();