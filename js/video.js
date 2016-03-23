(function (window, document) {

    var doc = document;

    //  ��ȡҪ������Ԫ��
    var video = doc.getElementById("video");
    var videoControls = doc.getElementById("videoControls");
    var videoContainer = doc.getElementById("videoContainer");
    var playBtn = doc.getElementById("playBtn");
    var stopBtn = doc.getElementById("stopBtn");
    var fullScreenBtn = doc.getElementById("fullScreenBtn");
    var progressWrap = doc.getElementById("progressWrap");
    var playProgress = doc.getElementById("playProgress");

    //  ������Ƶ����������
    var videoPlayer = {
        init: function () {
            var that = this;
            bindEvent(video, "loadeddata", videoPlayer.initControls);
            videoPlayer.operateControls();
        },
        initControls: function () {
            videoPlayer.showHideControls();
        },
        showHideControls: function () {
            bindEvent(video, "mouseover", showControls);
            bindEvent(videoControls, "mouseover", showControls);
            bindEvent(video, "mouseout", hideControls);
            bindEvent(videoControls, "mouseout", hideControls);
        },
        operateControls: function () {
            bindEvent(playBtn, "click", play);
            bindEvent(stopBtn, "click", stop);
            bindEvent(video, "click", play);
            bindEvent(fullScreenBtn, "click", fullScreen);
            bindEvent(progressWrap, "mousedown", videoSeek);
            bindEvent(video, "timeupdate", getProgress);
        }
    };

    videoPlayer.init();
    //  �¼��󶨺���
    function bindEvent(ele, eventName, func) {
        if (window.addEventListener) {
            ele.addEventListener(eventName, func);
        }
        else {
            ele.attachEvent('on' + eventName, func);     // IE
        }
    }

    //  �ؼ���ʾ
    function showControls() {
        videoControls.style.opacity = 1;
    }

    //  �ؼ�����
    function hideControls() {
        videoControls.style.opacity = 0;
    }

    //  ��Ƶ����/��ͣ
    function play() {
        if (video.paused || video.ended) {
            if (video.ended) {
                video.currentTime = 0;
            }
            video.play();
            playBtn.innerHTML = "Pause";
        }
        else {
            video.pause();
            playBtn.innerHTML = "Play";
        }
    }

    //  ��Ƶֹͣ
    function stop() {
        video.pause();
        video.currentTime = 0;
    }

    //  ��Ƶȫ��
    function fullScreen() {
        if (video.webkitIsFullScreen) {     //@todo��֧��Chrome�����
            video.webkitCancelFullScreen();
        }
        else {
            video.webkitRequestFullscreen();
        }
    }

    //  ��Ƶ������
    function getProgress() {
        playProgress.style.width = (video.currentTime / video.duration * 100) + "%";
        showProgress.innerHTML = timeConvent(video.currentTime);
    }

    //  ��Ƶ����������¼�������
    function videoSeek(e) {
        if (video.paused || video.ended) {
            play();
            enhanceVideoSeek(e);
        }
        else {
            enhanceVideoSeek(e);
        }

    }

    //  ���²��Ž���
    function enhanceVideoSeek(e) {
        //  console.log(getElementPosition(progressWrap).x);
        //  console.log(progressWrap.getBoundingClientRect().left);
        var length = e.clientX - progressWrap.getBoundingClientRect().left;
        var percent = length / progressWrap.offsetWidth;
        video.currentTime = (percent * video.duration);
        //  console.log(video.currentTime);
        playProgress.style.width = (video.currentTime / video.duration * 100) + "%";
    }

    //  ʱ���ʽ��
    function timeConvent(ts) {
        ts = Math.round(ts * 100) / 100;
        var mm = checkTime(parseInt(ts / 60));
        var ss = checkTime(parseInt(ts % 60));
        return mm + ":" + ss;
    }

    //  ʱ������
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    /*
     //  ��ȡ�ӿ�����(getBoundingClientRect����)
     function getElementPosition(elt) {
     var x = 0, y = 0;
     for (var e = elt; e != null; e = e.offsetParent) {
     x += e.offsetLeft;
     y += e.offsetTop;
     }

     for (var e = elt.parentNode; e != null && e.nodeType == 1; e = e.parentNode) {
     x -= e.scrollLeft;
     y -= e.scrollTop;
     }
     return {x: x, y: y};
     }
     */
}(this, document))