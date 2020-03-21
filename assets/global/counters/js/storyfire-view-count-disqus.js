function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value
	});
	return vars
  }

var video = "";

if (!getUrlVars()["v"]) {
  video = "5e4da7a5ae67aa13fb7dd7de";
} else {
  video = getUrlVars()["v"];
}

var disqus_config = function () {
    this.page.url = 'https://livecounts.io/storyfire-view-count/?v='+video;
	this.page.identifier = video;
};

(function() {
var d = document, s = d.createElement('script');
s.src = 'https://livecounts-io.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();