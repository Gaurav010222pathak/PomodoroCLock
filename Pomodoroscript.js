
var h = document.getElementById("hrs");
var m = document.getElementById("mins");
var s = document.getElementById("secs");
var startBtn = document.getElementById("start");
var splus = document.getElementById("Splus");
var sminus = document.getElementById("Sminus");
var bplus = document.getElementById("Bplus");
var bminus = document.getElementById("Bminus");
var pause = document.getElementById("pause");
var reset = document.getElementById("reset");
var breakTime = 0;
var sessionTime = 0;
var current = document.getElementById("current");


                     // HANDLING TIME PLUS MINUS BUTTONS

if(sessionTime==0){
	sminus.disabled = true;
}

if(breakTime==0){
	bminus.disabled = true;
}

splus.addEventListener("click", handlesplus);
function handlesplus(event){
	sminus.disabled = false;
	sessionTime++;
	ST.innerHTML = sessionTime + " " + "min";
}
sminus.addEventListener("click", handlesminus);
function handlesminus(event){
	
	sessionTime--;
	if(sessionTime==0){
		sminus.disabled = true;
	}
	ST.innerHTML = sessionTime + " " + "min";
	
}
bplus.addEventListener("click", handlebplus);
function handlebplus(event){
	bminus.disabled = false;
	breakTime++;
	BT.innerHTML = breakTime + " " + "min";
}
bminus.addEventListener("click", handlebminus);
function handlebminus(event){
	
	breakTime--;
	if(breakTime==0){
		bminus.disabled = true;
	}
	BT.innerHTML = breakTime + " " + "min";
	
}


                   //HANDLE START BUTTON

startBtn.addEventListener("click", handleStart);
	
var timer = 0;
var Clock;
function handleStart(event){  
	current.innerHTML = "Session Time";
	timer = sessionTime*60;
	if(timer>0){
		sminus.disabled = true;
		bminus.disabled = true;
		splus.disabled = true;
		bplus.disabled = true;
	} 

	Clock = setInterval(function() {
		
		if(timer==0){
			clearInterval(Clock);
			sminus.disabled = false;
			bminus.disabled = false;
			splus.disabled = false;
			bplus.disabled = false;
			startBtn.disabled = false;

			//initiate break time
			initiateBreakTime(breakTime);
		} 
		
		var hh = parseInt(timer/60/60);
		var mm = parseInt((timer/60)%60);
		var ss = parseInt(timer%60);

		h.innerHTML = hh + " h ";
		m.innerHTML = mm + " m ";
		s.innerHTML = ss + " s ";

		timer--;
	}, 1000);

	startBtn.disabled = true;

};


					// HANDLE PAUSE
pause.addEventListener("click", handlePause);
function handlePause(event){
	setTimeout(function(){
		clearInterval(Clock);
	},0);
	console.log(timer);
	startBtn.disabled = false;
	sessionTime = timer/60;
}




							//BREAK TIME
//handle break buttons
//if !session time && breaktime display Break time!
//if session time ends start break time

var BrkClock;
function initiateBreakTime(breakTime){
	current.innerHTML = "Break !";
	var timer = breakTime*60;
	BrkClock = setInterval(function(){
		if(timer==0){
			clearInterval(BrkClock);
		}
		var hh = parseInt(timer/60/60);
		var mm = parseInt((timer/60)%60);
		var ss = parseInt(timer%60);

		h.innerHTML = hh + " h ";
		m.innerHTML = mm + " m ";
		s.innerHTML = ss + " s ";

		timer--;
	}, 1000);
}


						//HANDLING RESET BUTTON

reset.addEventListener("click", handleReset);
function handleReset(event){
	current.innerHTML = "Start Again!"
	setTimeout(function(){
		clearInterval(Clock);
	},0);
	setTimeout(function(){
		clearInterval(BrkClock);
	},0);
	console.log(timer);
	
	sessionTime = 0;
	breakTime = 0;
	sminus.disabled = false;
	bminus.disabled = false;
	splus.disabled = false;
	bplus.disabled = false;
	startBtn.disabled = false;
	if(sessionTime==0){
		sminus.disabled = true;
		bminus.disabled = true;
	}
	startBtn.addEventListener("click", handleStart);
}
