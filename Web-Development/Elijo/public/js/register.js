function qs(element){
    document.querySelector(element);
}

window.addEventListener('load', function(){
    let name = qs('.name');
    let last_name = qs('.last_name');
    let email = qs('.email');
    let password = qs('.password');
    let telephone = qs('.telephone');
    let rol = qs('.rol');
    let signUpForm = qs('.sign-up-form');
    let submitBtn = qs('.submitBtn');

    let regexMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

    let erName = qs('.erName');
    let erLastName = qs('.erLastName');
    let erEmail = qs('.erEmail');
    let erPassword = qs('.erPassword');
    let erTelephone = qs('.erTelephone');
    let erRol = qs('.erRol');

    submitBtn.addEventListener('click', function(e){
        e.preventDefault();

        let errors = {}

        if(name.value.length < 1){
            errors.name = 'Ingresar un nombre'
        }

        if(last_name.value.length < 1){
            errors.last_name = 'Ingresar un apellido'
        }

        if(email.value.length < 1){
            errors.email = 'Ingresar un email'
        }

        if(email.value.match(regexMail) == null){
            errors.email = 'Ingresar un mail válido'
        }

        if(password.value.length < 1){
            errors.password = 'Ingresar una constraseña'
        }else if(password.value.length < 8 ){
            errors.password = 'La constraseña debe tener al menos 8 caractéres'
        }

        if(telephone.value.length < 11){
            errors.telephone = 'Ingresar un telefono válido, por ejemplo +5491122334455'
        }

        if(rol.value.length < 1){
            errors.rol = 'Ingresar una categoria de estudiante'
        }

        if(Object.keys(errors).length >= 1){
            erName.innerText = (errors.name) ? errors.name : '';
            erLastName.innerText = (errors.last_name) ? errors.last_name : '';
            erEmail.innerText = (errors.email) ? errors.email : '';
            erPassword.innerText = (errors.password) ? errors.password : '';
            erTelephone.innerText = (errors.telephone) ? errors.telephone : '';
            erRol.innerText = (errors.rol) ? errors.rol : '';
        } else {
            signUpForm.submit();
        }
    })
})