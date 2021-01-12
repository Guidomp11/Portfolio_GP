function qs(element) {
    return document.querySelectorAll(element)
};

window.addEventListener('load', function(){
    let calRadio = document.getElementsByName('qualification');
    let calText = qs('.calText');
    let calBtn = qs('.calBtn');
    let calForm = qs('.calForm');
    let erCal = qs('.erCal');
    let erOp = qs('.erOp')
    
    calBtn.addEventListener('click', function(e){
        e.preventDefault();

        let errors = {};

        let radiosChecked = 0

        for(let i = 0 ; i < calRadio.length ; i++){
            if(calRadio[i].checked){
                console.log('')
            }else{
                radiosChecked++
            }
        }

        if(radiosChecked == 11){
            errors.calificacion = 'Tenes que seleccionar una calificacion'
        }

        if(calText.value.length < 1){
            errors.opinion = 'Tenes que escribir una opinion'
        }

        if(Object.keys(errors).length >= 1){
            erCal.innerText = (errors.calificacion != '') ? errors.calificacion : '     '
            erOp.innerText = (errors.opinion != '') ? errors.opinion : '    '
        } else {
            calForm.submit();
        }        

    })
})