var audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');


let clock = document.getElementById("clock");
let container = document.getElementById("container");
let valid_hour = false;
let valid_minute = false;
// console.log(realHTML)
/******************************************* FUNCTIONS FOR PLAYING AUDIO *******************************************/
//function to pause the audio

var audio_interval;
//function to play audio when its time 
function audio_player() {
    // console.log("inside audio_player()");
    let hour = document.getElementById("hour").value;
    let minute = document.getElementById("minute").value;
    let AM = document.getElementById("AM");
    let PM = document.getElementById("PM");
    let daytm = '';
    if (AM.checked) {
        daytm = "AM";
    }
    else if (PM.checked) {
        daytm = "PM";
    }
    let alarmtime = "";
    alarmtime = `${hour}:${minute}:00 ${daytm}`;
    clock.innerHTML = `<button  onclick="set_alarm()" > set new alarm</button>`;




    audio_interval = setInterval(() => {
        let current_time = gtime();
        // console.log("inpTime=", alarmtime, "  current time =" + current_time);
        if (current_time == alarmtime) {
            audio.play();
            clock.innerHTML = `<h2>Its been ${alarmtime}</h2>
                <button onclick="stop_alarm()">stop alarm</button>` ;
            clearInterval(audio_interval);
        }
    }, 1000);
    // console.log("after audio_ interval");
}




/******************************************* FUNCTIONS FOR SHOWING TIME LIVE ON DOM *******************************************/
//this function return the current time string
function gtime() {
    // console.log("inside gtime()");
    let time = new Date();
    hours = time.toLocaleTimeString();
    return `${hours}`;
}


//this is an asyncronous function to update the time in web every second
async function print_time() {
    // console.log("inside print_time()");
    let cont = document.getElementById("time");
    setInterval(() => {
        let time = gtime();
        //console.log(time)
        cont.innerText = time;
    }, 1000);
}
print_time();



/******************************************* FUNCTIONS FOR ALARM CLOCK *******************************************/
// This function changes dom to make it able to take input for setting alarm
async function set_alarm() {
    // console.log("inside set_alarm()");
    clock.innerHTML = `<li> <form>
    <div class="my-4">
        <label for="exampleInputEmail1" class="form-label ">Hour</label>
        <input type="email" class="form-control " id="hour" aria-describedby="emailHelp">
        <small id="emailvalid" class="form-text text-muted invalid-feedback">
                Type hour according to 12 hour clock
              </small>
    </div>
    <hr>
    <div class="mb-4">
        <label for="exampleInputEmail1" class="form-label">Minutes</label>
        <input type="email" class="form-control" id="minute" aria-describedby="emailHelp">
        <small id="emailvalid" class="form-text text-muted invalid-feedback">
                There are onlt 59 minutes in an hour or type atleast 2 digit no for ex (0[1-9])
              </small>
    </div>
                      </form></li>
                      <li><div class="form-check">
                            <input class="form-check-input" type="radio" name="type"id ="AM"  value="AM"
                                checked>
                            <label class="form-check-label" for="AM">
                                AM
                            </label>
                          </div>
                          <div class="form-check">
                              <input class="form-check-input" type="radio" name="type" id ="PM"  value="PM"
                                  checked>
                              <label class="form-check-label" for="PM">
                                  PM
                              </label>
                          </div></li>
                          <button id ="setalarm_F" onclick= "value_validator()" >set alarm</button>`;
    /*
    let setalarm_F = document.getElementById("setalarm_F")
    setalarm_F.addEventListener('click', audio_player())
    */

    //checking if the values are acceptable or not accoding to 12 hour clock
    let hour = document.getElementById("hour");
    let minute = document.getElementById("minute");
    hour.addEventListener('blur', () => {
        let Need_word = /^[(01)]{0,1}[(0-9)]{1}$/;
        let inp_value = hour.value;
        // console.log("Need_word.test(inp_value) == ", Need_word.test(inp_value));
        if (Need_word.test(inp_value)) {
            if (hour.value < 13) {
                hour.classList.remove("is-invalid");
                valid_hour = true;
            }
            else {
                hour.classList.add("is-invalid");
                valid_hour = false;
            }

        }
        else {
            hour.classList.add("is-invalid");
            valid_hour = false;
        }
    })

    minute.addEventListener('blur', () => {
        let Need_word = /^[(012345)]{1}[(0-9)]{1}$/;
        let inp_value = minute.value;
        if (Need_word.test(inp_value)) {
            minute.classList.remove("is-invalid");
            valid_minute = true;
        }
        else {
            minute.classList.add("is-invalid");
            valid_minute = false;
        }
    })

}
//function to stop the audio if alarm
function stop_alarm() {
    // console.log("inside stop_alarm()");
    audio.pause();
    stop_time();
    location.reload();
}
/******************************************* EVENT LISTNER FOR ALARM CLOCK *******************************************/
//adding event listners FOR SETTING ALARM
let setalarm = document.getElementById("setalarm");
setalarm.addEventListener('click', set_alarm);


/******************************************* VALUE VALIDATOR FOR ALARM CLOCK *******************************************/
//it validates the value of time and if value is corrrect then it calls the audio player function
async function value_validator() {

    if (valid_hour == true && valid_minute == true) {
        audio_player()
    }
}



/******************************************* FUNCTIONS FOR STOP WATCH *******************************************/
let stopwatch = document.getElementById("stopwatch")
stopwatch.addEventListener('click', stop_watch_counter)

//creaating function to count every second
let id
async function stop_watch_counter() {
    // console.log("inside stop_watch_counter()")
    let sec = 0;
    let min = 0;
    let hour = 0;
    id = setInterval(() => {
        // console.log(sec)
        if (sec == 60) {
            sec = 0
            min += 1
        }
        if (min == 60) {
            min = 0
            hour += 1
        }
        C_time = `${hour} hour ${min} min ${sec} sec`

        clock.innerHTML = `<h1>${C_time} </h1>
        <button onclick="stop_time()">Stop</button>
        <button onclick="stop_alarm()">Go Back</button>`
        sec++
    }, 1000);
}
// console.log(id);
function stop_time() {
    // console.log("inside stop_time()");
    if (id == undefined && id == "") { }
    else {
        clearInterval(id);
        id = "";
    }

}
/******************************************* FUNCTIONS FOR TIMER *******************************************/
async function Start_timer1() {
    // console.log("inside Start_timer1()");
    clock.innerHTML = `<ui><li><input type="text" id="timer_time"></li>
    <li><button id ="timer_btn" onclick="Start_timer2()">Start Timer</button></li></ui>`;
}
async function Start_timer2() {
    // console.log("inside Start_timer2()");
    let timer_time = document.getElementById("timer_time").value
    // console.log("value",timer_time);
    Start_timer3(timer_time)
}
async function Start_timer3(times) {
    // console.log("inside Start_timer3(times)");
    clock.innerHTML = `<li><button onclick="stop_alarm()">Stop Timer</button></li>`
    timer_watch = setInterval(() => {
        // console.log("times1 = ", times);
        let heading = document.getElementById("heading")
        if( times > 0) {
            // console.log("times = ", times);
            heading.innerText = `${times} sec left`
            if (times == 1) {
                clearInterval(timer_watch)
                audio.play();
                clock.innerHTML = `<button onclick="stop_alarm()">stop alarm</button>` ;
                return;
            }
            times -= 1;
        }


    }, 1000);
}

let settimer = document.getElementById("settimer")
settimer.addEventListener("click", Start_timer1)
