YT.query = {
    newSearch: function (e) {
        if (e.trim() == YT.live.channelID || e.trim() == "") {
            return;
        }
        YT.live.stop();
        if (e.trim().substr(0, 2).toUpperCase() == "UC" && e.trim().length >= 24) {
            $.getJSON("https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + encodeURIComponent(e) + "&key=" + YT.keyManager.getKey(), function (e) {
                var gsnippet = e.items[0];
                YT.updateManager.updateChannelID(gsnippet.id);
                YT.query.getCover(gsnippet.id);
                YT.updateManager.updateName(gsnippet.snippet.title);
                YT.updateManager.updateProfile(gsnippet.snippet.thumbnails.high.url ? gsnippet.snippet.thumbnails.high.url : gsnippet.snippet.thumbnails.default.url);
                YT.urls.pushState(gsnippet.id);
                YT.live.start();
            }).fail(function() {
                $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=snippet&id='+encodeURIComponent(e), function(e) {

                    YT.updateManager.updateChannelID(e.id);
                    YT.query.getCover(e.id);
                    YT.updateManager.updateName(e.snippet.title);
                    YT.updateManager.updateProfile(e.snippet.thumbnails.high.url ? e.snippet.thumbnails.high.url : e.snippet.thumbnails.default.url);
                    YT.urls.pushState(e.id);
                    YT.live.start();
                })
            });
        } else {
            $.getJSON("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + encodeURIComponent(e) + "&type=channel&maxResults=1&key=" + YT.keyManager.getKey(), function (e) {
                var snippet = e.items[0].snippet;
                YT.updateManager.updateChannelID(snippet.channelId);
                YT.query.getCover(snippet.channelId);
                YT.updateManager.updateName(snippet.channelTitle);
                YT.updateManager.updateProfile(snippet.thumbnails.high.url ? snippet.thumbnails.high.url : snippet.thumbnails.default.url);
                YT.urls.pushState(snippet.channelId);
                YT.live.start();
            }).fail(function() {
                $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=search&part=channel&q='+encodeURIComponent(e), function(e) {
                    var snippet = e.snippet;
                    YT.updateManager.updateChannelID(snippet.channelId);
                    YT.query.getCover(snippet.channelId);
                    YT.updateManager.updateName(snippet.channelTitle);
                    YT.updateManager.updateProfile(snippet.thumbnails.high.url ? snippet.thumbnails.high.url : snippet.thumbnails.default.url);
                    YT.urls.pushState(snippet.channelId);
                    YT.live.start();  
                })
            })
        }
    },
    getCover: function (e) {
        $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=snippet&id='+encodeURIComponent(e), function(e) {
            YT.updateManager.updateCover(e.brandingSettings.image.bannerImageUrl);
        })
    },
    search: function (e) {
        e.preventDefault();
        YT.query.newSearch($("#yt_searchvalue").val());
        $("#yt_searchvalue").val("");
    },
    bind: function () {
        $("#yt_search").on("submit", this.search);
        $("#yt_searchbutton").on("click", this.search);
    }
};