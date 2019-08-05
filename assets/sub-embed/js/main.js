//write ur own code retard, go away

setInterval(getKey, 20000)
setInterval(function() {
    $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + user + '&key=' + key, function(data) {
        $('#odometer').html(data.items[0].statistics.subscriberCount);
    });
}, 2000);

function search() {
    var replaceurl = document.getElementById('search').value.replace("%20", " ");
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&fields=items%2Fsnippet%2FchannelId&q=' + replaceurl + '&key=' + key, function(data) {
        window.location.href = '/yt-sub-counter/?c=' + data.items[0].snippet.channelId
    })
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}

function getKey() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200 && this.responseText) {
            key = this.responseText;
            $.getJSON('https://www.googleapis.com/youtube/v3/channels?id=' + user + '&part=snippet&key=' + key, function(data) {
				document.getElementById("name").innerHTML = data.items[0].snippet.title;		
                var image = document.querySelector('#user_pic');
                image.src = data.items[0].snippet.thumbnails.default.url
            })
        }
    };
    xhttp.open("GET", '../../assets/global/getKey.php', true);
    xhttp.send()
}

//----------------------------------------------//
//  _______ _    _ ______ __  __ ______  _____  //
// |__   __| |  | |  ____|  \/  |  ____|/ ____| //
//    | |  | |__| | |__  | \  / | |__  | (___   //
//    | |  |  __  |  __| | |\/| |  __|  \___ \  //
//    | |  | |  | | |____| |  | | |____ ____) | //
//    |_|  |_|  |_|______|_|  |_|______|_____/  //
//												//
//----------------------------------------------//                                                                          
$(document).ready(function() {
	$("#square-white").css("outline-style", "solid")
	$("#square-white").css("outline-color", "black")
})

if (getUrlVars()["theme"] == "0") {
    $(document).ready(function() {
        $("body").css("background-color", "transparent");
        $("#odometer").css("color", "#24292E");
        $("#name").css("color", "#000000");
        $("#nav").css("color", "#000000");
		$("#odometer").removeClass('rainbow-text');
		$("#name").removeClass('rainbow-text');
		
		$("#square-dark").css("outline", "none")
		$("#square-white").css("outline-style", "solid")
		$("#square-white").css("outline-color", "black")
		$("#square-rainbow-black").css("outline", "none")
		$("#square-rainbow-white").css("outline", "none")
    })
}

if (getUrlVars()["theme"] == "1") {
    $(document).ready(function() {
        $("body").css("background-color", "black");
        $("#odometer").css("color", "#808080");
        $("#name").css("color", "#808080");
        $("#nav").css("color", "#808080");
		$("#odometer").removeClass('rainbow-text');
		$("#name").removeClass('rainbow-text');
		
		$("#square-dark").css("outline-style", "solid")
		$("#square-dark").css("outline-color", "white")
		$("#square-white").css("outline", "none")
		$("#square-rainbow-black").css("outline", "none")
		$("#square-rainbow-white").css("outline", "none")
    })
}

if (getUrlVars()["theme"] == "2") {
    $(document).ready(function() {
        $("body").css("background-color", "black");
		$("#odometer").addClass('rainbow-text');
		$("#name").addClass('rainbow-text');
		
		$("#square-dark").css("outline", "none")
		$("#square-white").css("outline-style", "solid")
		$("#square-white").css("outline-color", "black")
		$("#square-rainbow-black").css("outline", "none")
		$("#square-rainbow-white").css("outline", "none")
    })
}

if (getUrlVars()["theme"] == "3") {
    $(document).ready(function() {
        $("body").css("background-color", "white");
		$("#odometer").addClass('rainbow-text');
		$("#name").addClass('rainbow-text');
		
		$("#square-dark").css("outline", "none")
		$("#square-rainbow-white").css("outline-style", "solid")
		$("#square-rainbow-white").css("outline-color", "black")
		$("#square-white").css("outline", "none")
		$("#square-rainbow-black").css("outline", "none")
    })
}

if (!getUrlVars()["c"]) {
    $(document).ready(function() {
        if (window.location.href.indexOf("?") > -1) {
            history.pushState(null, '', window.location.href + '&c=' + user);
        } else {
            history.pushState(null, '', window.location.href + '?c=' + user);
        }
    });
}


if (getUrlVars()["odometer"] == "fast") {
	$('head').append('<link rel="stylesheet" type="text/css" href="assets/css/odometer-fast.css">');
} else {
	$('head').append('<link rel="stylesheet" type="text/css" href="assets/css/odometer-slow.css">');
}