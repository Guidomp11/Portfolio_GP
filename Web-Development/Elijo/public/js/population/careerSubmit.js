window.addEventListener('load', function(){
    console.log("entre");
    
    let submitBtn = document.querySelector("#BtnSubmitCareer");
    let newCareerInput = document.querySelector("#newCareer");
    let form = document.querySelector("form");
    
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        let promptInfo = prompt("¿Queres cargar otra carrera? SI - NO - CANCELAR = no hace nada");
        
        if(promptInfo == 'si'){
            newCareerInput.value = 'si'
            form.submit();
        }else if(promptInfo == 'no'){
            console.log('no')
            form.submit();
        }
        
        
    });
    
})