   //---------------------------------------------------------------//
   //  ______ _    _ _   _  _____ _______ _____ ____  _   _  _____  //
   // |  ____| |  | | \ | |/ ____|__   __|_   _/ __ \| \ | |/ ____| //
   // | |__  | |  | |  \| | |       | |    | || |  | |  \| | (___   //
   // |  __| | |  | | . ` | |       | |    | || |  | | . ` |\___ \  //
   // | |    | |__| | |\  | |____   | |   _| || |__| | |\  |____) | //
   // |_|     \____/|_| \_|\_____|  |_|  |_____\____/|_| \_|_____/  //
   //                                                        		 //
   //---------------------------------------------------------------// 
   var key = "AIzaSyAzRmWRQKbQpnAIH-Ws0ruzgxafjECdBCg";
   var video = "";

    /*getKey();
    setInterval(getKey, 20000)

    function getKey() {
       var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               key = this.responseText;

               $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=' + video + '&key=' + key, function(data) {
                   document.getElementById("title").innerHTML = data.items[0].snippet.title;
               })

           }
       };
       xhttp.open("GET", "https://api.shaz.lol/counters/getKey.php", true);
       xhttp.send();
   }*/

   document.addEventListener("DOMContentLoaded", function(){
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=' + video + '&key=' + key, function(data) {
        document.getElementById("title").innerHTML = data.items[0].snippet.title;
    })

    view();
    like();
    dislike();

   })

   function getUrlVars() {
       var vars = {};
       var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
           vars[key] = value
       });
       return vars
   }

   if (!getUrlVars()["q"]) {
       video = 'kJQP7kiw5Fk';
   } else {
       video = getUrlVars()["q"];
   }

   if (!getUrlVars()["q"]) {
       $(document).ready(function() {
           if (window.location.href.indexOf("?") > -1) {
               history.pushState(null, '', window.location.href + '&q=' + video);
           } else {
               history.pushState(null, '', window.location.href + '?q=' + video);
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


   if (getUrlVars()["theme"] == "0") {
       $(document).ready(function() {
           $("body").css("background-color", "transparent");
           $(".odometer").css("color", "#24292E");
           $(".title").css("color", "#000000");
           $("#nav").css("color", "#000000");
           $(".odometer").removeClass('rainbow-text');
           $(".title").removeClass('rainbow-text');
           $("#nav").removeClass('rainbow-text');

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
           $(".odometer").css("color", "#808080");
           $(".title").css("color", "#808080");
           $("#nav").css("color", "#808080");
           $(".odometer").removeClass('rainbow-text');
           $(".title").removeClass('rainbow-text');
           $("#nav").removeClass('rainbow-text');

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
           $(".odometer").addClass('rainbow-text');
           $(".title").addClass('rainbow-text');
           $("#nav").addClass('rainbow-text');

           $("#square-dark").css("outline", "none")
           $("#square-white").css("outline-style", "solid")
           $("#square-white").css("outline-color", "black")
           $("#square-rainbow-black").css("outline", "none")
           $("#square-rainbow-white").css("outline", "none")
       })
   }

   if (getUrlVars()["theme"] == "3") {
       $(document).ready(function() {
           $("body").css("background-color", "transparent");
           $(".odometer").addClass('rainbow-text');
           $(".title").addClass('rainbow-text');
           $("#nav").addClass('rainbow-text');

           $("#square-dark").css("outline", "none")
           $("#square-rainbow-white").css("outline-style", "solid")
           $("#square-rainbow-white").css("outline-color", "black")
           $("#square-white").css("outline", "none")
           $("#square-rainbow-black").css("outline", "none")
       })
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

   setInterval(view, 2500);
   setInterval(like, 2500);
   setInterval(dislike, 2500);

   function view() {
       $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + video + '&key=' + key, function(data) {
           $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + video + '&key=' + key + '&part=liveStreamingDetails&fields=items/liveStreamingDetails/concurrentViewers', function(data2) {
               $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + video + '&key=' + key, function(data3) {
                   if (data && data.error) {
                       location = location;
                   } else {
                       if (!data2.items[0]) {
                           var views = data.items[0].statistics.viewCount;
                           var likes = data.items[0].statistics.likeCount;
                           var channelId = data3.items[0].snippet.channelId;

                           var ratio = parseInt(views) / parseInt(likes);
                           if (localStorage.getItem('views' + channelId) == null) {
                               localStorage.setItem('likes' + channelId, parseInt(likes));
                               localStorage.setItem('views' + channelId, parseInt(views));
                           } else if (parseInt(localStorage.getItem('views' + channelId)) !== parseInt(views)) {
                               localStorage.setItem('views' + channelId, parseInt(views));
                               localStorage.setItem('likes' + channelId, parseInt(likes));
                           }

                           var localLikes = localStorage.getItem('likes' + channelId);
                           var finalRatio = ratio;
                           if (finalRatio < 1) finalRatio = 1;
                           var estimatedViews = parseInt(views) + parseInt((parseInt(likes) - localLikes) * finalRatio);

                           $('#view').html(estimatedViews);

                       } else {
                           $('#view').html(data2.items[0].liveStreamingDetails.concurrentViewers);
                       }

                   }
               })
           });
       });
   }


   function like() {
       $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + video + '&key=' + key, function(data) {
           $('#like').html(data.items[0].statistics.likeCount);
       });
   }

   function dislike() {
       $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + video + '&key=' + key, function(data) {
           $('#dislike').html(data.items[0].statistics.dislikeCount);
       });
   }

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
       $.getJSON('https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&type=video&q=' + replaceurl + '&key=' + key, function(data) {
           window.location.href = '/yt-like-counter/?q=' + data.items[0].id.videoId;
       })
   }


   $(document).ready(function() {
       $('#searchbutton').click(function() {
           search();
       });
   });

   document.getElementById("search").addEventListener("keyup", function(event) {
       if (event.keyCode === 13) {
           event.preventDefault();
           search();
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

   $("#square-dark").click(function(e) {
       if (window.location.href.indexOf("theme=1") > -1) {
           return;
       } else {
           $("body").css("background-color", "black");
           $(".odometer").css("color", "#808080");
           $("#title").css("color", "#808080");
           $("#nav").css("color", "#808080");
           $(".odometer").removeClass('rainbow-text');
           $("#title").removeClass('rainbow-text');
           $("#nav").removeClass('rainbow-text');

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
           $(".odometer").css("color", "#24292E");
           $("#title").css("color", "#000000");
           $("#nav").css("color", "#000000");
           $(".odometer").removeClass('rainbow-text');
           $("#title").removeClass('rainbow-text');
           $("#nav").removeClass('rainbow-text');

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
           $(".odometer").addClass('rainbow-text');
           $("#title").addClass('rainbow-text');
           $("#nav").addClass('rainbow-text');

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
           $(".odometer").addClass('rainbow-text');
           $("#title").addClass('rainbow-text');
           $("#nav").addClass('rainbow-text');

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