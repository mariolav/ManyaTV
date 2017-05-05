//June 6, 2015
//Contributed by Adrian Nicolaiev
//Website http://www.tobem.com
//LinkedIn https://www.linkedin.com/in/nicolaiev

//"jPlayer is the completely free and open source (MIT) media library written in JavaScript. 
//A jQuery plugin, jPlayer allows you to rapidly weave cross platform audio and video into your web pages."

//At http://www.tobem.com/jPlayer you can see a RTMP (Flash Live Streaming) And a M3U8 (HLS HTTP Live Streaming) example.
//A NSBasic "Container" was used To host jPlayer DIV. "Container" is really a very powerful recent feature in AppStudio.

//Source code: http://pastebin.com/f1e6jddP

//Media Support:
//HTML5: mp3, mp4 (AAC/H.264), ogg (Vorbis/Theora), webm (Vorbis/VP8), wav
//Flash: mp3, mp4 (AAC/H.264), rtmp, flv


ListChannels.onclick = function(button) {
    switch (true) {
        case ((button) == 1):
            m3uFile = "https://edge13.verliga.me/live/vtv/index.m3u8";
            break;
        case ((button) == 2):
            m3uFile = "http://rt-eng-live.hls.adaptive.level3.net/rt/eng/index2500.m3u8";
            break;
        case ((button) == 3):
            m3uFile = "http://109.236.85.100:8081/sipTV/live/playlist.m3u8";
            break;
        case ((button) == 4):
            m3uFile = "http://aztecalive-lh.akamaihd.net/i/0oxnvzh8a_1@175671/master.m3u8";
            break;
        case ((button) == 5):
            m3uFile = "http://xcmain.mine.nu:8080/live/internal_stalker/internal_use/6329.ts";
    }
    NSB.WaitCursor(true);
    progressMsg("Loading.");
    loadvideoold();
    ContainerList.hide();
};

function loadvideoold() {
    var m3 = m3uFile;
    jPlayerContainer = $("#jPlayerContainer").jPlayer({
        ready: function(event) {
            $(this).jPlayer("setMedia", {
                title: "NBR",
                m3u8v: m3,
                poster: "http://conteudo.ebcservicos.com.br/streaming/images/logo-nbr-nova.png"
            });
        },
        swfPath: "http://www.jplayer.org/latest/dist/jplayer",
        supplied: "m3u8v",

        solution: "html,flash",
        preload: "none",
        nativeVideoControls: {},
        wmode: "window",
        size: {
            width: "100%",
            height: "100%"
        },
    });
    // progressMsg("Loading");
    //    while($(!"#jPlayerContainer").jPlayer.status.waitForLoad)
    //    {
    //            //alert('--- media not ready');
    //    }

    $("#jPlayerContainer").jPlayer("setMedia", {
        m3u8v: m3,
        size: {
            width: "100%",
            height: "100%"
        }
    });
    //// ' myTimer=SetTimeout(startvideo,1000)
    jPlayerContainer.jPlayer("play");
    NSB.WaitCursor(false);
    progressMsg("");
    localStorage.setItem("url", m3uFile);
}

function startvideo() {
    jPlayerContainer.jPlayer("play");
}

function onDeviceReady() {}
Form1.onshow = function() {
    // MsgBox "Started"
    myTimer = setTimeout(loadvideoold, 1000);
};

jPlayerContainer.onclick = function() {
    ContainerList.show();
};

function progressMsg(s) {
    count = 0;
    if (s != "") {
        psProgress = s;
        updateMessage();
        IntervalRefID = setInterval(updateMessage, 150);
    } else {
        NSB.ShowProgress(false);
        clearInterval(IntervalRefID);
    }
}

function updateMessage() {
    count = count + 1;
    if (count < 20) {
        NSB.ShowProgress(psProgress + _vbsString(count, "."));
    } else {
        count = 0;
    }
}
var myTimer;
var m3uFile;
var count = 0;
var IntervalRefID;
var psProgress = "";
//m3uFile="https://edge13.verliga.me/live/vtv/index.m3u8"
m3uFile = "http://rt-eng-live.hls.adaptive.level3.net/rt/eng/index2500.m3u8";

function Main() {
    document.addEventListener("deviceready", onDeviceReady, False);
    var x;
    x = localStorage.getItem("url");
    if (x != "") {
        m3uFile = x;
    }
    myTimer = setTimeout(loadvideoold, 1000);

}