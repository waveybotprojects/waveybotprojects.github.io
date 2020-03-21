function getUrlVars(){var vars={};var parts=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value){vars[key]=value});return vars}
var user = "";

if (!getUrlVars()["q"]) {
	user = "Ugyb0OkJoZemhn5BD194AaABAg";
} else {
	user = getUrlVars()["q"]
}

var disqus_config = function () {
    this.page.url = 'https://livecounts.io/yt-comment-like-count/?q='+user;
	this.page.identifier = user;
};

(function() {
var d = document, s = d.createElement('script');
s.src = 'https://livecounts-io.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();