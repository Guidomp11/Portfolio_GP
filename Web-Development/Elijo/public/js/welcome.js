window.addEventListener('load', function(){

    let orderList = qs('.orderListv2');

    let popUpBg = document.querySelector('.pop-up-background');
    let popUpCross = document.querySelector('.quit-btn');
    let popUpSend = document.querySelector('.pop-up-send-btn');
    let popUp = document.querySelector('.pop-up');
    let popUpChilds = document.querySelectorAll('.pop-up-child');

    /*window.scroll(false);*/
    popUpBg.classList.remove('close');
    popUpBg.classList.add('open');
    popUp.classList.toggle('show');
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
    });

    popUpSend.addEventListener('click', function(){
        popUpBg.classList.remove('open');
        popUpBg.classList.add('close');
        popUp.classList.toggle('show');
        orderList.classList.add('d-none');
        //ENVIA INFO
    });
})