window.addEventListener('load', function(){
    let popUp = document.querySelector('.pop-up');
    let popUpBg = document.querySelector('.pop-up-background');

    if(window.sessionStorage.getItem('homeSession') == 'true' || window.sessionStorage.getItem('homeSession') == true){
        popUp.classList.remove('show');
        return;
    }else{
        
        popUp.classList.add('show');
        popUpBg.classList.add('pop-up-background-open');
        popUpBg.classList.remove('close-pop-up');
        
        popUpBg.classList.remove('close');
        popUpBg.classList.add('open'); 
        //popUpBg.classList.add('open');
        
        //pop-up-background-open
    }

    let orderList = qs('.orderListv2');

    
    let popUpCross = document.querySelector('.quit-btn');
    let popUpSend = document.querySelector('.pop-up-send-btn');
    
    let popUpChilds = document.querySelectorAll('.pop-up-child');

    let blurBackground = qs('.blur-background');    

    let popUpForm = document.querySelector('#pop-up-form');
    let ordinaryForm = document.querySelector('#ordinary-form');
    let popUpTextarea = document.querySelector('#pop-up-opinion');
    let ordinaryTextarea = document.querySelector('#ordinary-opinion');

    let thankYouCard = document.querySelector('#thank-you');
    
    
    //Blur background
    // COMENTADO POR PEDIDO DE ANDRES (POPUP) blurBackground.style.filter = "blur(5px)"
    blurBackground.style.filter = "blur(5px)";

    /*window.scroll(false);*/
    //popUpBg.classList.remove('close');
    //popUpBg.classList.add('open');
    //popUp.classList.toggle('show');
    setTimeout(function(){
        popUp.classList.toggle('showHeight');

    }, 1000)
    setTimeout(function(){
        for(let i = 0; i < popUpChilds.length; i++){
            popUpChilds[i].classList.remove('d-none');
        }
    }, 2000);


    popUpCross.addEventListener('click', function(){
        popUpBg.classList.remove('open');
        popUpBg.classList.add('close');
        popUp.classList.toggle('show');
        orderList.classList.add('d-none');
        blurBackground.style.filter = "none";
    });

    popUpSend.addEventListener('click', function(){
        if(popUpTextarea.value != ''){
            thankYouCard.classList.remove('d-none');
            setTimeout( () => {
                popUpBg.classList.remove('open');
                popUpBg.classList.add('close');
                popUp.classList.toggle('show');
                orderList.classList.add('d-none');
                blurBackground.style.filter = "blur(0px)";
            }, 2000);
        }

    });

    popUpForm.addEventListener('submit', event => {

        event.preventDefault();

        console.log(popUpTextarea.value);

        if(popUpTextarea.value != ''){
            fetch('/endpoints/sendOpinion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({data: popUpTextarea.value})
            });
        }
    });

    ordinaryForm.addEventListener('submit', event => {
        event.preventDefault();

        if(ordinaryTextarea.value != ''){
            fetch('/endpoints/sendOpinion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({data: ordinaryTextarea.value})
            })
        }
    })

    window.sessionStorage.setItem('homeSession', 'true');
})