module.exports = {
    format: function(time){
        if(String(time.seconds).length == 3 || time.seconds > 60){

            let newMinutes = time.seconds / 60;
            newMinutes = Math.floor(newMinutes);
            time.minutes += newMinutes;
            /*DETERMINO LOS SEGUNDOS*/
            time.seconds = time.seconds - (60 * newMinutes);

        }

        if(String(time.minutes).length == 3 || time.minutes > 60){
            let newHours = time.minutes / 60;
            newHours = Math.floor(newHours)
            time.hours += newHours;
            /*DETERMINO LOS MINUTOS*/
            time.minutes = time.minutes - (60 * newHours);
        }
        

        if(time.hours == ''){
            time.hours = 00;
        }
        if(time.minutes == ''){
            time.minutes = 00;
        }
        if(time.seconds == ''){
            time.minutes = 00;
        }
        return time;
    }
}