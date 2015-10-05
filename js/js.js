/**
 * Created by CDog on 15/10/4.
 */
var $cdfm={};

$cdfm.cdp=document.getElementById("main-player");
$cdfm.playPauseBtn=document.getElementById("ctrl-play-pause");
$cdfm.pauseBtn=document.getElementById("ctrl-pause");
$cdfm.processMinute=document.getElementById("process-minute");
$cdfm.processSecond=document.getElementById("process-second");
$cdfm.processMilsecond=document.getElementById("process-milsecond");
$cdfm.processInner=document.getElementsByClassName("process-inner")[0];
$cdfm.processWrapper=document.getElementsByClassName("process-wrapper")[0];
$cdfm.title=document.getElementsByClassName("title")[0];
$cdfm.subTitle=document.getElementsByClassName("subtitle")[0];
$cdfm.artist=document.getElementsByClassName("artist")[0];
$cdfm.cover=document.getElementsByClassName("cover")[0];
$cdfm.vData={};
$cdfm.hash=[];
$cdfm.coverImg=document.getElementById("cover-img");


window.onload=function(){



    //$cdfm.init();


    $cdfm.hashChange();

    window.onhashchange=$cdfm.hashChange;

    $cdfm.cdp.oncanplay=$cdfm.ready2Play;

    //$cdfm.cdp.ontimeupdate=$cdfm.updateTime;
    setInterval(function () {
        $cdfm.processMilsecond.innerHTML=$cdfm.cdp.currentTime.toFixed(1) * 10 % 10 ;
        $cdfm.updateTime();

    },100);
    $cdfm.processWrapper.onclick=$cdfm.fly;
    $cdfm.playPauseBtn.disabled=true;

    $cdfm.playPauseBtn.onclick=$cdfm.playPause;


};
$cdfm.hashChange=function () {
    $cdfm.playPause(false);
    $cdfm.hash=location.hash.substr(2).split("/");
    if ($cdfm.hash[0]=="song"){
        $cd.ajax({
            url:"http://m163.proxy.izhai.net/api/song/detail/",
            data:{
                ids:"["+$cdfm.hash[1]+"]"
            },
            success:function(txt,xml){
                $cdfm.vData=JSON.parse(txt);
                console.log($cdfm.vData);
                $cdfm.newSong();
            }
        })
    }
}
$cdfm.newSong=function(){
    console.log("Preparing a new song");
    $cdfm.cdp.src=$cdfm.vData.songs[0].mp3Url;
    $cdfm.title.innerHTML=$cdfm.vData.songs[0].name;
    if ($cdfm.vData.songs[0].alias[0]){
        $cdfm.subTitle.innerHTML=$cdfm.vData.songs[0].alias[0];
    }else{
        $cdfm.subTitle.innerHTML="";
    }
    $cdfm.artist.innerHTML=$cdfm.vData.songs[0].artists[0].name;
    $cdfm.cover.style.backgroundImage="url("+$cdfm.vData.songs[0].album.picUrl+")";
    $cdfm.coverImg.src=$cdfm.vData.songs[0].album.picUrl;
    $cdfm.cdp.load();
    $cdfm.playPauseBtn.className="fa fa-play";

    $cdfm.processMilsecond.innerHTML="00";
    $cdfm.processSecond.innerHTML="00";
    $cdfm.processMinute.innerHTML="0";
    $cdfm.changeTitle($cdfm.title.innerHTML);

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
    console.log(e.offsetX/$cdfm.processWrapper.offsetWidth*$cdfm.cdp.duration);
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


