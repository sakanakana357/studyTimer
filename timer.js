let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let bgm = document.getElementById("bgm");
let msgContainer = document.getElementById("msg")
let can = document.getElementById("can");
let c = can.getContext("2d");

let interval;
let msgInterval;
let studying;
let studyTime = 25;
let breakTime = 5;
let mins = 0;
let tid;
let stringFrame = 0;
let msg;

can.width = innerWidth*0.8;
bgm.volume = 0.5;
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);

c.fillStyle = "#222222";
c.fillRect(0, 0, can.width, can.height);


function start (){

    clearInterval(interval);

    msgInterval = setInterval(repMsg, 1000);
    interval = setInterval(mesure, 1000 * 60);
    studying = true;
    
    tid = setTimeout(() => {
        mins = 0;
        bgm.play();
        takeBreak();
    }, 1000 * 60 * studyTime);
}

function takeBreak(){
    
    studying = false;
    
    setTimeout(() => {
        mins = 0;
        bgm.play();
        start();
    }, 1000 * 60 * breakTime);
}

function mesure (){

    c.fillStyle = "#222222";
    c.fillRect(0, 0, can.width, can.height);
    mins++;

    if(studying){
        let studyGauge = can.width / studyTime;
        c.fillStyle = "#eeee33";
        for(let i = 0; i < mins; i++){
            c.fillRect(i * studyGauge, 0, studyGauge, can.height);
            c.strokeRect(i * studyGauge, 0, studyGauge, can.height);
        }
    }else{
        let breakGauge = can.width / breakTime;
        c.fillStyle = "#33ee33";
        for(let i = 0; i < mins; i++){
            c.fillRect(i * breakGauge, 0, breakGauge, can.height);
            c.strokeRect(i * breakGauge, 0,  breakGauge, can.height);
        }
    }
}

function stop (){
    clearInterval(msgInterval);
    clearInterval(interval);
    mins = 0;
    c.fillStyle = "#222222";
    c.fillRect(0, 0, can.width, can.height);
}

function repMsg(){
    stringFrame++;
    if(studying){
        msg = "studying";
    }else{
        msg = "breaking";
    }
    for(let i = 0; i < stringFrame % 4; i++) {
        msg += ".";
    }
    msgContainer.innerHTML = msg;
}