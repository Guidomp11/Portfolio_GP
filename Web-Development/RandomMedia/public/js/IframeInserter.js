window.addEventListener('load', function() {
    let videosContainer = document.querySelector('#video-container');
    let videosOl = document.querySelector('#videos-ol');
	let container = document.querySelector('#carouselExampleIndicators');

    fetch('/endpoints/iframes')
    .then(response => {
        return response.json();
    })
    .then(iframes => {

        for(let i = 0; i < iframes.length; i++){
            if(i == 0){
                videosOl.innerHTML += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active"></li>`;
                videosContainer.innerHTML += `<div class="carousel-item active"> ${iframes[i].iframe} </div>`;
            }else{
                videosOl.innerHTML += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`;
                videosContainer.innerHTML += `<div class="carousel-item"> ${iframes[i].iframe} </div>`;
            }
            
        }
		
		if(iframes.length <= 0){
			container.innerHTML = '<h2>Todavía no se han subido videos</h2>'
		}
    })
    .catch(error => {
        return error;
    })
})

/*
<li data-target="#carouselExampleIndicators" data-slide-to="<%=i%>" class="active"></li>

*/