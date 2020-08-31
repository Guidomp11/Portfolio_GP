function gifRandomPosition(element){	
	let rdmT = Math.random() * 80;
	let rdmB = Math.random() * 80;
	let rdmR = Math.random() * 80;
	let rdmL = Math.random() * 80;

	element.style.top = Math.floor(rdmT)+ '%';
	element.style.bottom = Math.floor(rdmB)+ '%';
	element.style.right = Math.floor(rdmR)+ '%';
	element.style.left = Math.floor(rdmL)+ '%';
}


window.addEventListener('load', function(){
	let stop = document.querySelector('#stop');
    let resume = document.querySelector('#resume');
    let isPaused = false;


	let gif1 = document.querySelector('#gif1');
	let h1 = document.querySelector('h1');

	let tag = h1.textContent;

    let apiKey = 'KtTJpigfVTLoHe6aXrm1tSmlqawY7wt1';

	const giphy = {
		baseURL: "https://api.giphy.com/v1/gifs/",
		apiKey: "KtTJpigfVTLoHe6aXrm1tSmlqawY7wt1",
		tag: (typeof tag == 'undefined') ? "" : tag ,
		type: "random",
		rating: "pg-13"
	};

	
	let giphyURL = encodeURI(
		giphy.baseURL + giphy.type + "?api_key=" + giphy.apiKey + "&tag=" + giphy.tag + "&rating=" + giphy.rating
	);

	let inter = setInterval(function(){
		if(!isPaused){
			let api =  fetch(giphyURL)
			.then((response) => {return response.json()})
			.then(function(result){
				console.log(result.data.images.original.url);
				gifRandomPosition(gif1);
				gif1.setAttribute('src', result.data.images.original.url);
				setTimeout(function(){
					gif1.classList.add('makeAppear');
				}, 1000);
				
			})
			.catch(function(e){
				console.log(e);
			})
			setTimeout(function(){
				gif1.classList.remove('makeAppear');
				firstIsActive = false;
			}, 5000);

			setTimeout(function(){
				gif1.setAttribute('src', '');
			}, 6000);
		}
	}, 6000);

	stop.addEventListener('click', function(event){
        if(!isPaused){
            isPaused = true;
        }
    });
    resume.addEventListener('click', function(event){
        if(isPaused){
            isPaused = false;
        }
    });
});