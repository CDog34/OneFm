/**
 * Created by CDog on 15/10/4.
 */

var cdp=document.getElementById("main-player");
var playPauseBtn=document.getElementById("ctrl-play-pause");
var pauseBtn=document.getElementById("ctrl-pause");
var processMinute=document.getElementById("process-minute");
var processSecond=document.getElementById("process-second");
var processMilsecond=document.getElementById("process-milsecond");
var processInner=document.getElementsByClassName("process-inner")[0];
var processWrapper=document.getElementsByClassName("process-wrapper")[0];
var title=document.getElementsByClassName("title")[0];
var subTitle=document.getElementsByClassName("subtitle")[0];
var artist=document.getElementsByClassName("artist")[0];
var cover=document.getElementsByClassName("cover")[0];
var vData={
    "songs": [
        {
            "starred": false,
            "popularity": 100,
            "starredNum": 0,
            "playedNum": 0,
            "dayPlays": 0,
            "hearTime": 0,
            "mp3Url": "http://m2.music.126.net/gyNK2GMN_T3bc4LSAYC1rA==/3286440256314296.mp3",
            "rtUrls": [],
            "name": "Bravely You",
            "id": 34077762,
            "position": 1,
            "duration": 328698,
            "status": 0,
            "alias": [
                "TV动画《Charlotte》OP"
            ],
            "artists": [
                {
                    "img1v1Id": 0,
                    "name": "Lia",
                    "id": 16993,
                    "alias": [],
                    "briefDesc": "",
                    "picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                    "picId": 0,
                    "albumSize": 0,
                    "img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                    "musicSize": 0,
                    "trans": ""
                }
            ],
            "score": 100,
            "album": {
                "songs": [],
                "name": "Bravely You / 灼け落ちない翼",
                "id": 3264622,
                "type": "专辑",
                "size": 6,
                "status": 0,
                "description": "",
                "tags": "",
                "alias": [
                    "TV动画《Charlotte》主题曲专辑"
                ],
                "artists": [
                    {
                        "img1v1Id": 0,
                        "name": "V.A.",
                        "id": 21138,
                        "alias": [],
                        "briefDesc": "",
                        "picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                        "picId": 0,
                        "albumSize": 0,
                        "img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                        "musicSize": 0,
                        "trans": ""
                    }
                ],
                "briefDesc": "",
                "artist": {
                    "img1v1Id": 0,
                    "name": "",
                    "id": 0,
                    "alias": [],
                    "briefDesc": "",
                    "picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                    "picId": 0,
                    "albumSize": 0,
                    "img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                    "musicSize": 0,
                    "trans": ""
                },
                "picUrl": "http://p4.music.126.net/BhWL_WN9jQRNWEdTUmmWXQ==/7901090558399010.jpg",
                "picId": 7901090558399010,
                "commentThreadId": "R_AL_3_3264622",
                "publishTime": 1440518400000,
                "company": "Key Sounds Label",
                "copyrightId": 0,
                "pic": 7901090558399010,
                "blurPicUrl": "http://p4.music.126.net/BhWL_WN9jQRNWEdTUmmWXQ==/7901090558399010.jpg",
                "companyId": 0
            },
            "fee": 0,
            "mMusic": {
                "name": null,
                "id": 105384130,
                "size": 6575064,
                "extension": "mp3",
                "dfsId": 8001146117927529,
                "playTime": 328698,
                "bitrate": 160000,
                "sr": 44100,
                "volumeDelta": -5.39
            },
            "lMusic": {
                "name": null,
                "id": 105384131,
                "size": 3945056,
                "extension": "mp3",
                "dfsId": 3286440256314296,
                "playTime": 328698,
                "bitrate": 96000,
                "sr": 44100,
                "volumeDelta": -5.41
            },
            "commentThreadId": "R_SO_4_34077762",
            "hMusic": {
                "name": null,
                "id": 105384129,
                "size": 13150084,
                "extension": "mp3",
                "dfsId": 8000046606299999,
                "playTime": 328698,
                "bitrate": 320000,
                "sr": 44100,
                "volumeDelta": -5.82
            },
            "copyrightId": 0,
            "mvid": 0,
            "ftype": 0,
            "rtype": 0,
            "rurl": null,
            "copyFrom": "",
            "bMusic": {
                "name": null,
                "id": 105384131,
                "size": 3945056,
                "extension": "mp3",
                "dfsId": 3286440256314296,
                "playTime": 328698,
                "bitrate": 96000,
                "sr": 44100,
                "volumeDelta": -5.41
            },
            "audition": {
                "name": "Bravely You",
                "id": 105380363,
                "size": 2662391,
                "extension": "m4a",
                "dfsId": 7976956862116882,
                "playTime": 328698,
                "bitrate": 64000,
                "sr": 44100,
                "volumeDelta": 0
            },
            "ringtone": null,
            "disc": "1",
            "no": 1,
            "crbt": null,
            "rtUrl": null
        }
    ],
    "equalizers": {},
    "code": 200
}

window.onload=function(){
    cdp.src=vData.songs[0].mp3Url;
    title.innerHTML=vData.songs[0].name;
    if (vData.songs[0].alias[0]){
        subTitle.innerHTML=vData.songs[0].alias[0];
    }
    artist.innerHTML=vData.songs[0].artists[0].name;
    cover.style.backgroundImage="url("+vData.songs[0].album.picUrl+")";
    cdp.load();
    playPauseBtn.className="fa fa-play";

    processMilsecond.innerHTML="00";
    processSecond.innerHTML="00";
    processMinute.innerHTML="0";

    cdp.oncanplay= function () {
        playPauseBtn.innerHTML="";
        if (!cdp.paused){
            playPauseBtn.className="fa fa-pause";
        }else{
            playPauseBtn.className="fa fa-play";
        }

    };
    cdp.ontimeupdate= function (e) {
        processMinute.innerHTML=(cdp.currentTime/60).toFixed(0) <10 ? "0"+(cdp.currentTime/60).toFixed(0) : (cdp.currentTime/60).toFixed(0);
        processSecond.innerHTML=(cdp.currentTime % 60).toFixed(0) < 10 ? "0"+(cdp.currentTime % 60).toFixed(0) : (cdp.currentTime % 60).toFixed(0);
        processInner.style.width=((cdp.currentTime/cdp.duration)*100)+"%";
    };
    setInterval(function () {
        processMilsecond.innerHTML=cdp.currentTime.toFixed(1) * 10 % 10 ;

    },100);
    processWrapper.onclick= function (e) {
        console.log(e.offsetX/processWrapper.offsetWidth*cdp.duration);
        cdp.currentTime=e.offsetX/processWrapper.offsetWidth*cdp.duration;
    };
    playPauseBtn.disabled=true;

    playPauseBtn.onclick=function () {
        if (cdp.paused){
            cdp.play();
            cover.style.animationPlayState="running";
            playPauseBtn.className="fa fa-pause";
        }else{
            cdp.pause();
            cover.style.animationPlayState="paused";
            playPauseBtn.className="fa fa-play";
        }

    };


};



