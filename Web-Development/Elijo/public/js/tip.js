function qs(element) {
    return document.querySelectorAll(element)
};

window.addEventListener('load', function(){
    let tipSelect = qs('.toQualify');
    let tipText = qs('.tipText');
    let tipForm = qs('.tipForm')
    let tipBtn = qs('.tipBtn');
    let erSelect = qs('.erSelect');
    let erText = qs('.erText');
    
    tipBtn.addEventListener('click', function(e){
        e.preventDefault();

        let errors = {};

        if(tipText.value.length < 1){
            errors.text = 'Tenes que escribir un tip'
        }

        if(Object.keys(errors).length >= 1){
            erText.innerText = errors.text
        } else {
            tipForm.submit();
        }

    })
})