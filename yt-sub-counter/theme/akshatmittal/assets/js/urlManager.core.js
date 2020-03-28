YT.urls = {
    onchange: function () {
        var q = location.hash.split("!/")[1];
        if (q) {
            YT.query.newSearch(location.hash.split("!/")[1]);
        } else {
            var coolGuys = ['UC-lHJZR3Gqxm24_Vd_AJ5Yw', 'UCX6OQ3DkcsbYNE6H8uQQuVA', 'UCaEk4apVOqy-sFVh3xnpJyw'];
            YT.query.newSearch(coolGuys[Math.floor(Math.random() * coolGuys.length)]);
        }
    },
    pushState: function (e) {
        history.pushState(null, null, "#!/" + e);
        YT.query.newSearch(e);
    },
    getCurrent: function () {
        return baseURL + "#!/" + YT.live.channelID;
    }
};