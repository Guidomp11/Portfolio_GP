window.addEventListener('load', function() {
    let password = document.querySelector('#password');
    let rePassword = document.querySelector('#rePassword');
    let form = document.querySelector('#form');
    let alert = document.querySelector('.alert');

    let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    

    form.addEventListener('submit', event => {
        let approveRequirement = regex.test(password.value);
        
        
        event.preventDefault();
        console.log('error');

        if(rePassword.value == null || rePassword.value == ''){
            alert.innerHTML = 'Las contraseñas deben coincidir';
            alert.removeAttribute('hidden');
            return;
        }

        if(approveRequirement){
            if(rePassword.value == password.value){
                form.submit();
            }else{
                alert.innerHTML = 'Las contraseñas debe concidir';
                alert.removeAttribute('hidden');
            }

        }else{
            alert.innerHTML = 'La contraseña debe contener al menos 8 cáracteres, una mayúscula, una minucula y un número.';
            alert.removeAttribute('hidden');
        }
    });

})