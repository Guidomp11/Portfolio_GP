function qs(element) {
    return document.querySelectorAll(element)
};

window.addEventListener('load', function(){
    let ansForm = qs('.ansForm');
    let ansSelect = qs('.ansSelect');
    let ansText = qs('.ansText');
    let ansBtn = qs('.ansBtn');
    let erSel = qs('.erSel');
    let erAns = qs('.erAns');
    
    ansBtn.addEventListener('click', function(e){
        e.preventDefault();

        let errors = {};

        if(ansSelect.value == ''){
            errors.select = 'Tenes que seleccionar una pregunta'
        }

        if(ansText.value.length < 1){
            errors.text = 'Tenes que escribir una respuesta'
        }

        if(Object.keys(errors).length >= 1){
            erSel.innerText = (errors.select != '') ? errors.select : '     '
            erAns.innerText = (errors.text != '') ? errors.text : '    '
        } else {
            ansForm.submit();
        }        

    })
})