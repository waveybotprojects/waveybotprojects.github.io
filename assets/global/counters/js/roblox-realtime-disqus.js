function getUrlVars(){var vars={};var parts=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value){vars[key]=value});return vars}
var user = "";

if (!getUrlVars()["u"]) {
	user = "ShazGucci"
} else {
	user = getUrlVars()["u"];
}

var disqus_config = function () {
    this.page.url = 'https://livecounts.io/twitter-realtime/?u='+user;
	this.page.identifier = user;
};

(function() {
var d = document, s = d.createElement('script');
s.src = 'https://livecounts-io.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();