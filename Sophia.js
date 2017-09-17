function videoPlay(id, size, videoId, loop, playlist) {
   var corpUrl = $('#CorpDialog' + id + 'Url');
    if (corpUrl.attr('value').indexOf("state") == -1)
        corpUrl.attr('value', corpUrl.attr('value') + "&state=-1" + "&volume=0" + "&time=0");

    url = corpUrl.attr('value');
//    var state = getParameter(url, "state").substring(getParameter(url, "state").indexOf("=") + 1);
    var volume = getParameter(url, "volume").substring(getParameter(url, "volume").indexOf("=") + 1);
//    var time = getParameter(url, "time").substring(getParameter(url, "time").indexOf("=") + 1);

    $('#widget' + id + ' .placeholderDashVideo').css('height', '100%');
    $('#widget' + id + ' #RptDashVideo').css('width', '100%');
    $('#widget' + id + ' #RptDashVideo').css('height', '100%');
    $('#widget' + id + ' #RptDashVideo tbody td:first').css('height', '100%');
    $('#widget' + id + ' #RptDashVideo tbody td:first').css('padding', '0px');
    $('#widget' + id + ' #player' + id).css('height', '100%');
    $('#widget' + id + ' #player' + id).css('width', '100%');

    var player = new YT.Player('player' + id, {
        videoId: videoId,
        playerVars: {
//            autoplay: !(state == YT.PlayerState.PAUSED),
            autoplay: 1,
//            start: time,
            modestbranding: 1,
            rel: 0,
            origin: 'https://localhost',
            iv_load_policy: 3
        },
        events: {
            'onReady': function (event) {
                player.setVolume(volume);

                YTtimer[id] = setInterval(function () {
                    if ($('#player' + id).length < 1)
                        clearInterval(YTtimer[id]);
                    corpUrl.attr('value', changeUrl(corpUrl.attr('value'), "volume", parseInt(!player.isMuted() * player.getVolume())));
//                    corpUrl.attr('value', changeUrl(corpUrl.attr('value'), "time", parseInt(player.getCurrentTime())));
                }, 1000);
            },
            'onStateChange': function (event) {
            //    corpUrl.attr('value', changeUrl(corpUrl.attr('value'), "state", event.data));
                if (event.data == YT.PlayerState.ENDED){
					if(loop == "on"){
                    player.playVideo();
					}
					if(playlist=="on"){//&& videoId=="wstXT214teY"){
					player.loadVideoById("HOg-UWxtb68",0,"large");
					
					}
				}
            }
        }
    });
}

function changeUrl(url, type, value) {
    return url.replace(getParameter(url, type), type + "=" + value);
}

function getParameter(url, type) {
    var parameter = url.substring(url.indexOf(type + "="));
    if (parameter.indexOf("&") != -1)
        parameter = parameter.substring(0, parameter.indexOf("&"));
    return parameter;
}