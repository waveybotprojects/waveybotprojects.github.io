var baseURL = "https://livecounts.io/yt-sub-counter/theme/akshatmittal/";
if (typeof isCustomPage == 'undefined') isCustomPage = 0;
if (window.location.hostname.indexOf("local.akshatmittal.com") < 0) {
   //if (window.location.protocol != "https:") window.location.replace("https:" + window.location.href.substring(window.location.protocol.length));
    if (location.hostname.indexOf("livecounts.io") == -1) window.location.replace(baseURL + location.hash);
    if (window.top !== window.self) window.top.location.replace(window.self.location.href);
}
Array.prototype.shuffle = function () {
    var i = this.length,
        j, temp;
    if (i == 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}
var YT = {};

setInterval(() => {
    $.each($('iframe'), (arr,x) => {
        let src = $(x).attr('src');
        if (src && src.match(/(ads-iframe)|(disqusads)/gi)) {
            $(x).remove();
        }
    });
}, 300);