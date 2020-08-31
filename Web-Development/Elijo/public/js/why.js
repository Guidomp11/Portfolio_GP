window.addEventListener('load', function(){
    let h3 = document.querySelector('.why-h3')
    let h6 = document.querySelector('.why-h6')
    let div1 = document.querySelector('#text')

    let img1 = document.querySelector('.why-img1')
    let divImg1 = document.querySelector('#img1')
    
    let h3_2 = document.querySelector('.why-h3-2')
    let h6_2 = document.querySelector('.why-h6-2')
    let div2 = document.querySelector('#text1')
    
    let img2 = document.querySelector('.why-img2')
    let divImg2 = document.querySelector('#img2')
    
    let h3_3 = document.querySelector('.why-h3-3')
    let h6_3 = document.querySelector('.why-h6-3')
    let ultimoDiv = document.querySelector('#text2')

    let mainContainer = document.querySelector('.why-main-container')

    window.setTimeout(function(){
        h3.classList.remove('d-none')
        h6.classList.remove('d-none')
        mainContainer.classList.remove('d-none')
        div1.classList.remove('d-none')
        mainContainer.classList.add('transition')
        div1.classList.add('transition')
    }, 1000)
    window.setTimeout(function(){
        img1.classList.remove('d-none')
        divImg1.classList.remove('d-none')
        divImg1.classList.add('transition')
    }, 2000)
    window.setTimeout(function(){
        h3_2.classList.remove('d-none')
        h6_2.classList.remove('d-none')
        div2.classList.remove('d-none')
        div2.classList.add('transition')
    }, 3000)
    window.setTimeout(function(){
        img2.classList.remove('d-none')
        divImg2.classList.remove('d-none')
        divImg2.classList.add('transition')
    }, 4000)
    window.setTimeout(function(){
        ultimoDiv.classList.remove('d-none')
        h3_3.classList.remove('d-none')
        h6_3.classList.remove('d-none')
        ultimoDiv.classList.add('transition')
    }, 5000)

})