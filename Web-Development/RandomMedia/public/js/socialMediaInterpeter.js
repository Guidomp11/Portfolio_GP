function createInstagramStructure(url){    
    url = url.split('?')
    return `
    <iframe class="min-width-c min-height-c" src="${url[0]}embed" width="400" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe> 
    `;
}

function createTwitterInterpeter(url){
    let encodedU = encodeURIComponent('https://twitter.com/TyCSports/status/1345514196524527618');
    
    return `
    <iframe class="min-width-c min-height-c-t" border=0 frameborder=0 height=1000 width=550
        src="https://twitframe.com/show?url=${encodedU}"></iframe> 
    `;
}


function extractSocialMedia(publications){
    for(let i = 0; i < publications.length; i++){
        if(publications[i].classList.contains('instagram-media')){
            let newLink = createInstagramStructure(publications[i].dataset.instgrmPermalink);
            publications[i].parentNode.innerHTML = newLink;
            publications[i].parentNode.classList.add('min-height-c');

        }else if(publications[i].classList.contains('twitter-tweet')){
            let newLink = createTwitterInterpeter(publications[i].firstElementChild.firstElementChild.href);
            publications[i].parentNode.innerHTML = newLink;
        }
    }
}

window.addEventListener('load', () => {
    let publications = document.querySelectorAll('blockquote');
    



    extractSocialMedia(publications);
});