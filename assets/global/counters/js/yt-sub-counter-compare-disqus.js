function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}

if(!getUrlVars()["c1"]){
	user1="UC-lHJZR3Gqxm24_Vd_AJ5Yw";
} else {
	user1=getUrlVars()["c1"];
}

if(!getUrlVars()["c2"]){
	user2="UCq-Fj5jknLsUf-MWSy4_brA";
} else {
	user2=getUrlVars()["c2"];
}

var disqus_config = function () {
    this.page.url = 'https://livecounts.io/yt-sub-counter/?c1='+user1+'&c2='+user2;
};

(function() {
var d = document, s = d.createElement('script');
s.src = 'https://livecounts-io.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();