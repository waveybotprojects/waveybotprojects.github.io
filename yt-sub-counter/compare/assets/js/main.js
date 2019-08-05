//---------------------------------------------------------------//
//  ______ _    _ _   _  _____ _______ _____ ____  _   _  _____  //
// |  ____| |  | | \ | |/ ____|__   __|_   _/ __ \| \ | |/ ____| //
// | |__  | |  | |  \| | |       | |    | || |  | |  \| | (___   //
// |  __| | |  | | . ` | |       | |    | || |  | | . ` |\___ \  //
// | |    | |__| | |\  | |____   | |   _| || |__| | |\  |____) | //
// |_|     \____/|_| \_|\_____|  |_|  |_____\____/|_| \_|_____/  //
//                                                        		 //
//---------------------------------------------------------------//     
var user1 = "";
var user2 = "";
var key = "AIzaSyAzRmWRQKbQpnAIH-Ws0ruzgxafjECdBCg";

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars;
}

/*setInterval(getKey, 20000)
function getKey() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200 && this.responseText) {
            key = this.responseText;
            $.getJSON('https://www.googleapis.com/youtube/v3/channels?id=' + user1 + '&part=snippet&key=' + key, function(data) {
                $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&part=snippet&id=' + user1 + '&key=' + key, function(data2) {
                    $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&part=snippet&id=' + user2 + '&key=' + key, function(data3) {
                        $.getJSON('https://www.googleapis.com/youtube/v3/channels?id=' + user2 + '&part=snippet&key=' + key, function(data4) {
                            document.getElementById("banner1").src = data2.items[0].brandingSettings.image.bannerImageUrl;
                            document.getElementById("banner2").src = data3.items[0].brandingSettings.image.bannerImageUrl;
                            document.getElementById("name1").innerHTML = data.items[0].snippet.title;
                            document.getElementById("name2").innerHTML = data4.items[0].snippet.title;
                            document.querySelector('#user_pic1').src = data.items[0].snippet.thumbnails.default.url
                            document.querySelector('#user_pic2').src = data4.items[0].snippet.thumbnails.default.url
                        })
                    })
                })
            })
        }
    };
    xhttp.open("GET", 'https://api.shaz.lol/counters/getKey.php', true);
    xhttp.send()
}*/

document.addEventListener("DOMContentLoaded", function(){
    $.getJSON('https://www.googleapis.com/youtube/v3/channels?id=' + user1 + '&part=snippet&key=' + key, function(data) {
                $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&part=snippet&id=' + user1 + '&key=' + key, function(data2) {
                    $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&part=snippet&id=' + user2 + '&key=' + key, function(data3) {
                        $.getJSON('https://www.googleapis.com/youtube/v3/channels?id=' + user2 + '&part=snippet&key=' + key, function(data4) {
                            document.getElementById("banner1").src = data2.items[0].brandingSettings.image.bannerImageUrl;
                            document.getElementById("banner2").src = data3.items[0].brandingSettings.image.bannerImageUrl;
                            document.getElementById("name1").innerHTML = data.items[0].snippet.title;
                            document.getElementById("name2").innerHTML = data4.items[0].snippet.title;
                            document.querySelector('#user_pic1').src = data.items[0].snippet.thumbnails.default.url
                            document.querySelector('#user_pic2').src = data4.items[0].snippet.thumbnails.default.url
                        })
                    })
                })
            })
            $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + user1 + '&key=' + key, function(data) {
                $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + user2 + '&key=' + key, function(data2) {
                $('#odometer1').html(data.items[0].statistics.subscriberCount);
                $('#odometer2').html(data2.items[0].statistics.subscriberCount);
                var difference = data1.items[0].statistics.subscriberCount - data2.items[0].statistics.subscriberCount;
                var difference_converted = Math.abs(difference);
                $('#difference').html(difference_converted);
            });

            });




})

if (!getUrlVars()["c1"]) {
    user1 = "UC-lHJZR3Gqxm24_Vd_AJ5Yw";
} else {
    user1 = getUrlVars()["c1"];
}

if (!getUrlVars()["c2"]) {
    user2 = "UCq-Fj5jknLsUf-MWSy4_brA";
} else {
    user2 = getUrlVars()["c2"];
}

if (!getUrlVars()["c1"] && !getUrlVars()["c2"]) {
    $(document).ready(function() {
        if (window.location.href.indexOf("?") > -1) {
            history.pushState(null, '', window.location.href + '&c1=' + user1 + '&c2=' + user2);
        } else {
            history.pushState(null, '', window.location.href + '?c1=' + user1 + '&c2=' + user2);
        }
    });
}

//-------------------------------------------------------------------------------------------------//   
//  _    _ _____  _____       _______ ______   __  __          _   _          _____ ______ _____   //
// | |  | |  __ \|  __ \   /\|__   __|  ____| |  \/  |   /\   | \ | |   /\   / ____|  ____|  __ \  //
// | |  | | |__) | |  | | /  \  | |  | |__    | \  / |  /  \  |  \| |  /  \ | |  __| |__  | |__) | //
// | |  | |  ___/| |  | |/ /\ \ | |  |  __|   | |\/| | / /\ \ | . ` | / /\ \| | |_ |  __| |  _  /  //
// | |__| | |    | |__| / ____ \| |  | |____  | |  | |/ ____ \| |\  |/ ____ \ |__| | |____| | \ \  //
//  \____/|_|    |_____/_/    \_\_|  |______| |_|  |_/_/    \_\_| \_/_/    \_\_____|______|_|  \_\ //
//                                                                                                 //
//-------------------------------------------------------------------------------------------------//    

setInterval(function() {
    $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + user1 + '&key=' + key, function(data) {
        $('#odometer1').html(data.items[0].statistics.subscriberCount);
    });
}, 2000);
setInterval(function() {
    $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + user2 + '&key=' + key, function(data) {
        $('#odometer2').html(data.items[0].statistics.subscriberCount);
    });
}, 2000);

//had to add it because fucking gay series changes their banner like every single fucking day, fuck you tseries.
setInterval(function() {
    $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&part=snippet&id=' + user1 + '&key=' + key, function(data1) {
        $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&part=snippet&id=' + user2 + '&key=' + key, function(data2) {
            document.getElementById("banner1").src = data1.items[0].brandingSettings.image.bannerImageUrl;
            document.getElementById("banner2").src = data2.items[0].brandingSettings.image.bannerImageUrl;
        })
    });
}, 3600000);

setInterval(function() {
    $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + user1 + '&key=' + key, function(data1) {
        $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + user2 + '&key=' + key, function(data2) {
            var difference = data1.items[0].statistics.subscriberCount - data2.items[0].statistics.subscriberCount;
            var difference_converted = Math.abs(difference);
            $('#difference').html(difference_converted);
        })
    });
}, 2000);

//-----------------------------------------------//    
//   _____ ______          _____   _____ _    _  //
//  / ____|  ____|   /\   |  __ \ / ____| |  | | //
// | (___ | |__     /  \  | |__) | |    | |__| | //
//  \___ \|  __|   / /\ \ |  _  /| |    |  __  | //
//  ____) | |____ / ____ \| | \ \| |____| |  | | //
// |_____/|______/_/    \_\_|  \_\\_____|_|  |_| //
//												 //
//-----------------------------------------------//   

document.getElementById("search1").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        search1()
    }
})

document.getElementById("search2").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        search2()
    }
})

function search1() {
    var replaceurl = document.getElementById('search1').value.replace("%20", " ");
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&fields=items%2Fsnippet%2FchannelId&q=' + replaceurl + '&key=' + key, function(data) {
        window.location.href = '/yt-sub-counter/compare/?c1=' + data.items[0].snippet.channelId + '&c2=' + user2;
    })
}

function search2() {
    var replaceurl = document.getElementById('search2').value.replace("%20", " ");
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&fields=items%2Fsnippet%2FchannelId&q=' + replaceurl + '&key=' + key, function(data) {
        window.location.href = '/yt-sub-counter/compare/?c1=' + user1 + '&c2=' + data.items[0].snippet.channelId;
    })
}