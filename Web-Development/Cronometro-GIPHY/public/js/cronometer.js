window.addEventListener('load', function(){
    let homeBtn = document.querySelector('#homeBtn');
    let stop = document.querySelector('#stop');
    let resume = document.querySelector('#resume');
    let isPaused = false;

    let hours = document.querySelector('h3.hours');
    let minutes = document.querySelector('h3.minutes');
    let seconds = document.querySelector('h3.seconds');
    
    let hoursTime = hours.textContent;
    let minutesTime = minutes.textContent;
    let secondsTime = seconds.textContent;
    
    
    function timeFormatter(time){
        if(String(time).length == 1){
            let formattedNumber = ("0" + time);
            time = formattedNumber;
        }
        return time;
    }

    hoursTime = timeFormatter(hoursTime);
    hours.innerHTML = hoursTime;
    minutesTime = timeFormatter(minutesTime);
    minutes.innerHTML = minutesTime;
    secondsTime = timeFormatter(secondsTime);
    seconds.innerHTML = secondsTime;   


    function verifyTime(){
        if(hoursTime == '00' && minutesTime == '00' && secondsTime == '00'){
            return true;
        }else{
            return false;
        }
    }

    let crono = setInterval(() => {
        if(!isPaused){
            secondsTime-=1;
            secondsTime = timeFormatter(secondsTime);
            seconds.innerHTML = secondsTime;
    
            if(secondsTime == '00'){
                if(verifyTime()){
                    
                    alert('TERMINO VIEJOOOOOOO');
                    window.location = '/';
    
                }else{
                    if(minutesTime == '00'){
                        minutesTime = '60';
                        minutes.innerHTML = minutesTime;
    
                        hoursTime-= 1;
                        hoursTime = timeFormatter(hoursTime);
                        hours.innerHTML = hoursTime;
                    }else{
                        minutesTime -= 1;
                        minutesTime = timeFormatter(minutesTime);
                        minutes.innerHTML = minutesTime;
                    }
                    
                }
                secondsTime = '60';
            }
        }
    }, 1000);

    stop.addEventListener('click', function(event){
        if(!isPaused){
            isPaused = true;
        }
    });
    resume.addEventListener('click', function(event){
        if(isPaused){
            isPaused = false;
        }
    });
    homeBtn.addEventListener('click', function(event){
        window.location = '/'
    });
});
