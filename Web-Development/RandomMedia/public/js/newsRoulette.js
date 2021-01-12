window.addEventListener('load', async function() {
    let rotateBtn = document.querySelector('#rotateBtn');
    let categoryToShow = document.querySelector('#categoryName');
    let roulette = document.querySelector('.roulette');
    
    fetch('/endpoints/categories')
    .then(response => {
        return response.json();
    })
    .then( categories => {
        let sub_categories = [];
        for(let i = 0; i < categories.length; i++){
            for(let j = 0; j < categories[i].sub_category.length; j++){
                sub_categories.push(categories[i].sub_category[j]);
            }
        }

        let sub_category_random;
        let finishRandom;
        let rouletteRounds = 0;
        let lastCat;

        rotateBtn.addEventListener('click', (event) => {
            let randomInterval = setInterval(function(){
                let catTemp;
                sub_category_random = sub_categories[Math.floor(Math.random()*sub_categories.length)];
                categoryToShow.innerHTML = sub_category_random.name;
                
                catTemp = sub_category_random.categoryId - 1;
                roulette.classList.remove(lastCat);
                roulette.classList.add(categories[catTemp].link);
                rouletteRounds++;

                finishRandom = Math.floor(Math.random()* 100);
                if(finishRandom > 70 && rouletteRounds > 10){
                    clearInterval(randomInterval);
                    setTimeout(function(){
                        window.location = '/news/'+sub_category_random.link;
                    }, 1000);
                }
                catTemp = sub_category_random.categoryId - 1; 
                lastCat = categories[catTemp].link;
            }, 100);
        });
    })
})