function qs(element) {
    return document.querySelectorAll(element)
};

window.addEventListener('load', function(){
    let inputEmail = qs('.inputEmail');
    let inputPassword = qs('.inputPassword');
    let loginForm = qs('.loginForm');
    let submitBtn = qs('.submitBtn');
    let erEmail = qs('.erEmail');
    let erPassword = qs('.erPassword');

    


    submitBtn.addEventListener('click', function(e){
        e.preventDefault();

        let errors = {}

        if(inputEmail.value.length < 1){
            errors.email = 'Credenciales Inválidas'
        }

        if(inputPassword.value.length < 1){
            errors.password = 'Credenciales Inválidas'
        }

        if(Object.keys(errors).length >= 1){
            erEmail.innerText = (errors.email || errors.password) ? errors.email : '';
        } else {
            loginForm.submit();
        }
    })
    
})