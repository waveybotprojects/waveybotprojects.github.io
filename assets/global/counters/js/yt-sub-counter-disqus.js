function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}

if(!getUrlVars()["c"]){
	user="UCaEk4apVOqy-sFVh3xnpJyw";
} else {
	user=getUrlVars()["c"];
}

var disqus_config = function () {
    this.page.url = 'https://livecounts.io/yt-sub-counter/?c='+user;
};

(function() {
var d = document, s = d.createElement('script');
s.src = 'https://livecounts-io.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
