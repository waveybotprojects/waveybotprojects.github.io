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
    $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + user + '&key=' + key, function(data) {
        $('#odometer').html(data.items[0].statistics.subscriberCount);
    });
	$.getJSON('https://www.googleapis.com/youtube/v3/channels?id=' + user + '&part=snippet&key=' + key, function(data) {
                document.getElementById("name").innerHTML = data.items[0].snippet.title;
                var image = document.querySelector('#user_pic');
                image.src = data.items[0].snippet.thumbnails.default.url
    })
	
}, 2000);

//---------------------------------------------------------------//
//  ______ _    _ _   _  _____ _______ _____ ____  _   _  _____  //
// |  ____| |  | | \ | |/ ____|__   __|_   _/ __ \| \ | |/ ____| //
// | |__  | |  | |  \| | |       | |    | || |  | |  \| | (___   //
// |  __| | |  | | . ` | |       | |    | || |  | | . ` |\___ \  //
// | |    | |__| | |\  | |____   | |   _| || |__| | |\  |____) | //
// |_|     \____/|_| \_|\_____|  |_|  |_____\____/|_| \_|_____/  //
//                                                        		 //
//---------------------------------------------------------------//                                                            

var user = "";
var key = "AIzaSyAzRmWRQKbQpnAIH-Ws0ruzgxafjECdBCg";


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}
$(document).ready(function () {

    $.getJSON('https://www.googleapis.com/youtube/v3/channels?id=' + user + '&part=snippet&key=' + key, function(data) {
                document.getElementById("name").innerHTML = data.items[0].snippet.title;
                var image = document.querySelector('#user_pic');
                image.src = data.items[0].snippet.thumbnails.default.url
            })
	$.getJSON('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + user + '&key=' + key, function(data) {
        $('#odometer').html(data.items[0].statistics.subscriberCount);
    });

        })

        //setInterval(getKey, 20000)
//function getKey() {
//    var xhttp = new XMLHttpRequest();
//    xhttp.onreadystatechange = function() {
//        if (this.readyState == 4 && this.status == 200 && this.responseText) {
//            key = this.responseText;
//           $.getJSON('https://www.googleapis.com/youtube/v3/channels?id=' + user + '&part=snippet&key=' + key, function(data) {
//                document.getElementById("name").innerHTML = data.items[0].snippet.title;
//                var image = document.querySelector('#user_pic');
//                image.src = data.items[0].snippet.thumbnails.default.url
//            })
//        }
//    };
//    xhttp.open("GET", 'https://api.shaz.lol/counters/getKey.php', true);
//    xhttp.send()
//}


if (!getUrlVars()["c"]) {
    $(document).ready(function() {
        if (window.location.href.indexOf("?") > -1) {
            history.pushState(null, '', window.location.href + '&c=' + user);
        } else {
            history.pushState(null, '', window.location.href + '?c=' + user);
        }
    });
}

if (!getUrlVars()["theme"]) {
	$(document).ready(function() {
        if (window.location.href.indexOf("?") > -1) {
            history.pushState(null, '', window.location.href + '&theme=0');
        } else {
            history.pushState(null, '', window.location.href + '?theme=0');
        }
    });
}

if (!getUrlVars()["c"]) {
	user = "UCaEk4apVOqy-sFVh3xnpJyw";
} else {
	user = getUrlVars()["c"];
}

var embed = document.getElementById('embed');
embed.href = '/yt-sub-counter/embed/?c='+user;

//-----------------------------------------------//    
//												 //
//   _____ ______          _____   _____ _    _  //
//  / ____|  ____|   /\   |  __ \ / ____| |  | | //
// | (___ | |__     /  \  | |__) | |    | |__| | //
//  \___ \|  __|   / /\ \ |  _  /| |    |  __  | //
//  ____) | |____ / ____ \| | \ \| |____| |  | | //
// |_____/|______/_/    \_\_|  \_\\_____|_|  |_| //
//												 //
//-----------------------------------------------//                                          
                                              
											 
function search() {
    var replaceurl = document.getElementById('search').value.replace("%20", " ");
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&fields=items%2Fsnippet%2FchannelId&q=' + replaceurl + '&key=' + key, function(data) {
        window.location.href = '/yt-sub-counter/?c=' + data.items[0].snippet.channelId
    })
}

$(document).ready(function() {
    $('#searchbutton').click(function() {
        search()
    })
});
document.getElementById("search").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        search()
    }
})

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
		$("ul").css("background-color", "white");
		$("#odometer").removeClass('rainbow-text');
		$("#name").removeClass('rainbow-text');
		$("li").removeClass('rainbow-text');
		
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
        $("ul").css("background-color", "black");
		$("#odometer").removeClass('rainbow-text');
		$("li").removeClass('rainbow-text');;
		
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
		$("ul").css("background-color", "black");
		$("#odometer").addClass('rainbow-text');
		$("#name").addClass('rainbow-text');
		$("li").addClass('rainbow-text');
		
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
		$("ul").css("background-color", "white");
		$("#odometer").addClass('rainbow-text');
		$("#name").addClass('rainbow-text');
		$("li").addClass('rainbow-text');
		
		$("#square-dark").css("outline", "none")
		$("#square-rainbow-white").css("outline-style", "solid")
		$("#square-rainbow-white").css("outline-color", "black")
		$("#square-white").css("outline", "none")
		$("#square-rainbow-black").css("outline", "none")
    })
}

$("#square-dark").click(function(e) {
    if (window.location.href.indexOf("theme=1") > -1) {
        return;
    } else {
        $("body").css("background-color", "black");
        $("#odometer").css("color", "#808080");
        $("#name").css("color", "#808080");
        $("ul").css("background-color", "black");
		$("#odometer").removeClass('rainbow-text');
		$("#name").removeClass('rainbow-text');
		$("li").removeClass('rainbow-text');
		
		$("#square-dark").css("outline-style", "solid")
		$("#square-dark").css("outline-color", "white")
		$("#square-white").css("outline", "none")
		$("#square-rainbow-black").css("outline", "none")
		$("#square-rainbow-white").css("outline", "none")
        if (window.location.href.indexOf("?") > -1) {
            if (window.location.href.indexOf("theme=0") > -1) {
                history.pushState(null, '', window.location.toString().replace('&theme=0', '&theme=1'));
            }
			if (window.location.href.indexOf("theme=2") > -1) {
                history.pushState(null, '', window.location.toString().replace('&theme=2', '&theme=1'));
            }
			if (window.location.href.indexOf("theme=3") > -1) {
                history.pushState(null, '', window.location.toString().replace('&theme=3', '&theme=1'));
            }
        } else {
            if (window.location.href.indexOf("theme=0") > -1) {
                history.pushState(null, '', window.location.toString().replace('?theme=0', '?theme=1'));
            }
			if (window.location.href.indexOf("theme=2") > -1) {
                history.pushState(null, '', window.location.toString().replace('?theme=2', '?theme=1'));
            }
			if (window.location.href.indexOf("theme=3") > -1) {
                history.pushState(null, '', window.location.toString().replace('?theme=3', '?theme=1'));
            }
        }
    }
});

$("#square-white").click(function(e) {
    if (window.location.href.indexOf("theme=0") > -1) {
        return;
    } else {
        $("body").css("background-color", "transparent");
        $("#odometer").css("color", "#24292E");
        $("#name").css("color", "#000000");
        $("ul").css("background-color", "white");
		$("#odometer").removeClass('rainbow-text');
		$("#name").removeClass('rainbow-text');
		$("li").removeClass('rainbow-text');
		
		$("#square-dark").css("outline", "none")
		$("#square-white").css("outline-style", "solid")
		$("#square-white").css("outline-color", "black")
		$("#square-rainbow-white").css("outline", "none")
		$("#square-rainbow-black").css("outline", "none")
        if (window.location.href.indexOf("?") > -1) {
            if (window.location.href.indexOf("theme=1") > -1) {
                history.pushState(null, '', window.location.toString().replace('&theme=1', '&theme=0'));
            }
            if (window.location.href.indexOf("theme=2") > -1) {
                history.pushState(null, '', window.location.toString().replace('&theme=2', '&theme=0'));
            }
			if (window.location.href.indexOf("theme=3") > -1) {
                history.pushState(null, '', window.location.toString().replace('&theme=3', '&theme=0'));
            }
        } else {
            if (window.location.href.indexOf("theme=1") > -1) {
                history.pushState(null, '', window.location.toString().replace('?theme=1', '?theme=0'));
            }
			if (window.location.href.indexOf("theme=2") > -1) {
                history.pushState(null, '', window.location.toString().replace('?theme=2', '?theme=0'));
            }
			if (window.location.href.indexOf("theme=3") > -1) {
                history.pushState(null, '', window.location.toString().replace('?theme=3', '?theme=0'));
            }
			
        }
    }
});

$("#square-rainbow-black").click(function(e) {
    if (window.location.href.indexOf("theme=2") > -1) {
        return;
    } else {
        $("body").css("background-color", "black");
		$("ul").css("background-color", "black");
		$("#odometer").addClass('rainbow-text');
		$("#name").addClass('rainbow-text');
		$("li").addClass('rainbow-text');
		
		$("#square-dark").css("outline", "none")
		$("#square-white").css("outline", "none")
		$("#square-rainbow-white").css("outline", "none")
		$("#square-rainbow-black").css("outline-style", "solid")
		$("#square-rainbow-black").css("outline-color", "white")
        if (window.location.href.indexOf("?") > -1) {
            if (window.location.href.indexOf("theme=1") > -1) {
                history.pushState(null, '', window.location.toString().replace('&theme=1', '&theme=2'));
            }
            if (window.location.href.indexOf("theme=0") > -1) {
                history.pushState(null, '', window.location.toString().replace('&theme=0', '&theme=2'));
            }
			if (window.location.href.indexOf("theme=3") > -1) {
                history.pushState(null, '', window.location.toString().replace('&theme=3', '&theme=2'));
            }
        } else {
            if (window.location.href.indexOf("theme=1") > -1) {
                history.pushState(null, '', window.location.toString().replace('?theme=1', '?theme=2'));
            }
			if (window.location.href.indexOf("theme=0") > -1) {
                history.pushState(null, '', window.location.toString().replace('?theme=0', '?theme=2'));
            }
			if (window.location.href.indexOf("theme=3") > -1) {
                history.pushState(null, '', window.location.toString().replace('?theme=3', '?theme=2'));
            }
			
        }
    }
});

$("#square-rainbow-white").click(function(e) {
    if (window.location.href.indexOf("theme=3") > -1) {
        return;
    } else {
        $("body").css("background-color", "transparent");
		$("ul").css("background-color", "white");
		$("#odometer").addClass('rainbow-text');
		$("#name").addClass('rainbow-text');
		$("li").addClass('rainbow-text');
		
		$("#square-dark").css("outline", "none")
		$("#square-white").css("outline", "none")
		$("#square-rainbow-black").css("outline", "none")
		$("#square-rainbow-white").css("outline-style", "solid")
		$("#square-rainbow-white").css("outline-color", "black")
        if (window.location.href.indexOf("?") > -1) {
            if (window.location.href.indexOf("theme=1") > -1) {
                history.pushState(null, '', window.location.toString().replace('&theme=1', '&theme=3'));
            }
            if (window.location.href.indexOf("theme=0") > -1) {
                history.pushState(null, '', window.location.toString().replace('&theme=0', '&theme=3'));
            }
			if (window.location.href.indexOf("theme=2") > -1) {
                history.pushState(null, '', window.location.toString().replace('&theme=2', '&theme=3'));
            }
        } else {
            if (window.location.href.indexOf("theme=1") > -1) {
                history.pushState(null, '', window.location.toString().replace('?theme=1', '?theme=3'));
            }
			if (window.location.href.indexOf("theme=0") > -1) {
                history.pushState(null, '', window.location.toString().replace('?theme=0', '?theme=3'));
            }
			if (window.location.href.indexOf("theme=2") > -1) {
                history.pushState(null, '', window.location.toString().replace('?theme=2', '?theme=3'));
            }
			
        }
    }
});