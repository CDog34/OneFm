/**
 * Created by CDog on 15/10/4.
 */
var $cdfm={};

$cdfm.cdp=document.getElementById("main-player");
$cdfm.playPauseBtn=document.getElementById("ctrl-play-pause");
$cdfm.pauseBtn=document.getElementById("ctrl-pause");
$cdfm.processMinute=document.getElementById("process-minute");
$cdfm.processSecond=document.getElementById("process-second");
$cdfm.processInner=document.getElementsByClassName("process-inner")[0];
$cdfm.processWrapper=document.getElementsByClassName("process-wrapper")[0];
$cdfm.title=document.getElementsByClassName("title")[0];
$cdfm.subTitle=document.getElementsByClassName("subtitle")[0];
$cdfm.artist=document.getElementsByClassName("artist")[0];
$cdfm.cover=document.getElementsByClassName("cover")[0];
$cdfm.vData={};
$cdfm.hash=[];
$cdfm.coverImg=document.getElementById("cover-img");
$cdfm.idIn=document.getElementById("id-in");
$cdfm.so=document.getElementById("so");
$cdfm.oldHash="/";
$cdfm.curPlaying=0;
$cdfm.forwordBtn=document.getElementById("ctrl-fwd");
$cdfm.backwordBtn=document.getElementById("ctrl-bwd");
$cdfm.hktSrc="";



window.onload=function(){



    //$cdfm.init();


    $cdfm.hashChange();

    window.onhashchange=$cdfm.hashChange;

    $cdfm.cdp.oncanplaythrough=$cdfm.ready2Play;

    //$cdfm.cdp.ontimeupdate=$cdfm.updateTime;


    $cdfm.cdp.ontimeupdate=$cdfm.updateTime;

    $cdfm.processWrapper.onclick=$cdfm.fly;
    $cdfm.playPauseBtn.disabled=true;

    $cdfm.playPauseBtn.onclick=$cdfm.playPause;
    $cdfm.forwordBtn.onclick=$cdfm.forword;
    $cdfm.backwordBtn.onclick=$cdfm.backword;
    $cdfm.so.onclick=$cdfm.doso;

    $cdfm.cdp.onended=$cdfm.forword;


};
$cdfm.hashChange=function () {
    $cdfm.hash=location.hash.substr(2).split("/");
    console.log($cdfm.oldHash,location.hash);
    if($cdfm.oldHash!=location.hash){
        $cdfm.playPause(false);

        if ($cdfm.hash[0]=="song"){
            $cd.ajax({
                url:"http://m163.proxy.izhai.net/api/song/detail/",
                data:{
                    ids:"["+$cdfm.hash[1]+"]"
                },
                success:function(txt,xml){
                    var json=JSON.parse(txt);
                    if (json.code==200&&json.songs.length>0){
                        $cdfm.oldHash=location.hash;
                        $cdfm.vData=json;
                        $cdfm.curPlaying=0;
                        $cdfm.newSong();
                    }else{
                        location.hash="/list/"+$cdfm.hash[1];
                        $cdfm.playPause(true);
                    }

                }
            })
        }else if ($cdfm.hash[0]=="list"){
            $cd.ajax({
                url:"http://m163.proxy.izhai.net/api/playlist/detail/",
                data:{
                    id:$cdfm.hash[1]
                },
                success:function(txt,xml){
                    var json=JSON.parse(txt);
                    if (json.code==200){
                        $cdfm.vData={songs:[]};
                        for (var i in json.result.tracks){
                            $cdfm.vData.songs.push(json.result.tracks[i]);
                        }
                        $cdfm.oldHash=location.hash;
                        $cdfm.curPlaying=0;
                        $cdfm.newSong();
                    }else{
                        location.hash=$cdfm.oldHash;
                        $cdfm.playPause(true);
                    }

                }
            })
        }else{
            location.hash="/list/85043989";
        }
    }

}
$cdfm.newSong=function(){
    console.log("Preparing a new song");
    $cdfm.cdp.src=$cdfm.vData.songs[$cdfm.curPlaying].mp3Url;
    $cdfm.title.innerHTML=$cdfm.vData.songs[$cdfm.curPlaying].name;
    if ($cdfm.vData.songs[$cdfm.curPlaying].alias[0]){
        $cdfm.subTitle.innerHTML=$cdfm.vData.songs[$cdfm.curPlaying].alias[0];
    }else{
        $cdfm.subTitle.innerHTML="";
        (function(){
            console.log("次の曲が始まるです")
            $cdfm.hktSrc=document.createElement('script');
            $cdfm.hktSrc.setAttribute('src','http://api.hitokoto.us/rand?encode=jsc&fun=showHitokoto');
            document.body.appendChild($cdfm.hktSrc);
        })();
    }
    $cdfm.artist.innerHTML=$cdfm.vData.songs[$cdfm.curPlaying].artists[0].name;
    $cdfm.cover.style.backgroundImage="url("+$cdfm.vData.songs[$cdfm.curPlaying].album.picUrl+")";
    $cdfm.coverImg.src=$cdfm.vData.songs[$cdfm.curPlaying].album.picUrl;
    $cdfm.cdp.load();
    $cdfm.playPauseBtn.className="fa fa-play";
    $cdfm.changeTitle($cdfm.title.innerHTML);
    $cdfm.playPause(true);




};
$cdfm.ready2Play=function(){

    console.log("Ready to Play √");
    $cdfm.playPauseBtn.innerHTML="";
    if (!$cdfm.cdp.paused){
        $cdfm.playPauseBtn.className="fa fa-pause";
    }else{
        $cdfm.playPauseBtn.className="fa fa-play";
    }
};
$cdfm.updateTime=function (e) {
    $cdfm.processMinute.innerHTML=($cdfm.cdp.currentTime/60).toFixed(0) <10 ? "0"+($cdfm.cdp.currentTime/60).toFixed(0) : ($cdfm.cdp.currentTime/60).toFixed(0);
    $cdfm.processSecond.innerHTML=($cdfm.cdp.currentTime % 60).toFixed(0) < 10 ? "0"+($cdfm.cdp.currentTime % 60).toFixed(0) : ($cdfm.cdp.currentTime % 60).toFixed(0);
    $cdfm.processInner.style.width=(($cdfm.cdp.currentTime/$cdfm.cdp.duration)*100)+"%";
};
$cdfm.fly=function (e) {
    $cdfm.cdp.currentTime=e.offsetX/$cdfm.processWrapper.offsetWidth*$cdfm.cdp.duration;
};
$cdfm.playPause=function (e) {
    if ($cdfm.cdp.paused&&e){
        $cdfm.cdp.play();
        $cdfm.cover.style.animationPlayState="running";
        $cdfm.playPauseBtn.className="fa fa-pause";
    }else{
        $cdfm.cdp.pause();
        $cdfm.cover.style.animationPlayState="paused";
        $cdfm.playPauseBtn.className="fa fa-play";
    }

};
$cdfm.changeTitle=function(newTitle){
    var t_array=document.title.split("|");
    t_array[1]=newTitle;
    document.title=t_array.join("|");
}
$cdfm.doso=function(){
    if ($cdfm.idIn.value){
        location.hash="/song/"+$cdfm.idIn.value;
        $cdfm.idIn.value="";
    }
}
$cdfm.forword=function(){
    if (++$cdfm.curPlaying<$cdfm.vData.songs.length){
        $cdfm.newSong();
    }else{
        $cdfm.curPlaying=0;
        $cdfm.newSong();
    }

}
$cdfm.backword=function(){
    if (--$cdfm.curPlaying>=0){
        $cdfm.newSong();
    }else{
        $cdfm.curPlaying=0;
        $cdfm.newSong();
    }

}

function showHitokoto(hkt){
    if (!$cdfm.vData.songs[$cdfm.curPlaying].alias[0]){
        $cdfm.subTitle.innerHTML=hkt.hitokoto;
    }
    document.getElementsByTagName("body")[0].removeChild($cdfm.hktSrc);
}


