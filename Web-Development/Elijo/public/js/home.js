function qs(element){
    return document.querySelector(element)
}

window.addEventListener('load', function(){
    
    let body = qs('body')
    let laPostaReminder = qs('#la-posta-reminder');
    let meetStudentsReminder = qs('#meet-students-reminder');
    let postaLI = qs('.posta');
    let meetLI = qs('.meet');
    let mainHome = qs('.mainHomeContainer')
    let popUpHelp = qs('.pop-up-background');

    var timeoutInMiliseconds = 5000;
    var timeoutId; 

    function resetTimer() { 
        window.clearTimeout(timeoutId)
        startTimer();
    }

    function startTimer() { 
        timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
    }
    
    function doInactive() {
        if(!popUpHelp.classList.contains('open')){
            if(!meetLI.classList.contains('gradient-border')){
                postaLI.classList.add('gradient-border');
                laPostaReminder.classList.remove('d-none');
        
                window.addEventListener('click', function(){
                    postaLI.classList.remove('gradient-border');
                    laPostaReminder.classList.add('d-none');
        
                    meetLI.classList.add('gradient-border');
                    meetStudentsReminder.classList.remove('d-none')
                })
    
                
            }
            let inter = setInterval(function(){
                if(meetLI.classList.contains('gradient-border')){
                    window.addEventListener('click', function(){
                        meetLI.classList.remove('gradient-border');
                        meetStudentsReminder.classList.add('d-none')
                    })
                    
                    mainHome.addEventListener('click', function(){
                        mainHome.classList.remove('guide-div')
                    })
                }
                
            }, 2000)
            
            
            
            mainHome.classList.add('guide-div')
        }
        
        


        console.log('inactividad')
       
    }
    
    function setupTimers () {
        document.addEventListener("mousemove", resetTimer, false);
        document.addEventListener("mousedown", resetTimer, false);
        document.addEventListener("keypress", resetTimer, false);
        document.addEventListener("touchmove", resetTimer, false);

        startTimer();
    }
    
        $(document).ready(function(){   
            if(screen.width > 768){  
                setupTimers();
            }
        })
    
    
})    