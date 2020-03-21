function getUrlVars(){var vars={};var parts=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(m,key,value){vars[key]=value});return vars}
var user1 = "";
var user2 = "";

if (!getUrlVars()["u1"]) {
    user1 = "barackobama";
} else {
    user1 = getUrlVars()["u1"]
}

if (!getUrlVars()["u2"]) {
    user2 = "katyperry";
} else {
    user2 = getUrlVars()["u2"]
}


var disqus_config = function () {
    this.page.url = 'https://livecounts.io/twitter-realtime/compare/?u1='+user1+'&u2='+user2;
	this.page.identifier = user1+'-vs-'+user2
};

(function() {
var d = document, s = d.createElement('script');
s.src = 'https://livecounts-io.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();