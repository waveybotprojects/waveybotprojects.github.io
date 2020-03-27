YT.live = {
    channelID: "",
    update: function () {
        $.getJSON('https://api.livecounts.io/yt_subs', function(data) {
            $.getJSON('https://reeeeeeeeee.livecounts.io/yt_data?type=channel&part=statistics&id='+this.channelID, function (e) {
                console.log(e, result[0])
                var result = data.filter(x => x.cid === this.channelID);
                if (result.length != 0) {
                    YT.updateManager.updateSubscribers(result[0].subscriberCount)
                    YT.updateManager.updateViews(e.statistics.viewCount);
                    YT.updateManager.updateVideos(e.statistics.videoCount);
                } else {
                    YT.updateManager.updateSubscribers(e.statistics.subscriberCount);
                    YT.updateManager.updateViews(e.statistics.viewCount);
                    YT.updateManager.updateVideos(e.statistics.videoCount);
                }
            })
        })
    },
    timer: null,
    start: function () {
        this.stop();
        this.timer = setInterval(function (e) {
            YT.live.update();
        }, 2500);
        YT.live.update();
    },
    stop: function () {
        clearInterval(this.timer);
    }
};