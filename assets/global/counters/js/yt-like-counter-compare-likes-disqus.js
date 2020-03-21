var video1;
var video2;

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
  }

  if (!getUrlVars()["v1"]) {
	video1 = "IHNzOHi8sJs"; //dududududdudududud (not darude sandstorm tho)
} else {
	video1 = getUrlVars()["v1"];
}

if (!getUrlVars()["v2"]) {
	video2 = "2S24-y0Ij3Y"; //kill this love
} else {
	video2 = getUrlVars()["v2"];
}

var disqus_config = function () {
    this.page.url = 'https://livecounts.io/yt-like-counter/compare/likes/?v1='+video1+'&v2='+video2;
	this.page.identifier = video1+'-vs-'+video2;
};

(function() {
var d = document, s = d.createElement('script');
s.src = 'https://livecounts-io.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();