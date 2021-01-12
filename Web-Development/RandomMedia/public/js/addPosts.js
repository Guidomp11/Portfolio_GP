let postsPagination = [];
let actualPage = 0;
const amountByPage = 7;

function makePagination(results){
    let amountOfPages = Math.ceil(results.length / amountByPage);
    let index = 0;
    let condition = amountByPage;
    postsPagination = [];
    for(let j = 0; j < amountOfPages; j++){
        let page = [];
        
        for(let i = index; i <= condition-1; i++){
            if(results[i] != undefined){
                page.push(results[i]);
            }
        }
        condition += amountByPage;
        index += amountByPage;
        postsPagination.push(page);
    }
    console.log(postsPagination);
}

function changePage(moveTo){
    if(postsPagination[actualPage] == null || postsPagination[actualPage] == undefined) return ;
    (moveTo > 0) ? actualPage++ : actualPage--;
    if(moveTo == 0) actualPage = 0;
    
    let postsContainer = document.querySelector('.lastestPosts');
    postsContainer.innerHTML = '';
    
    for(let i = 0; i < postsPagination[actualPage].length; i++){
        postsContainer.innerHTML += `
            <a href="article/${ postsPagination[actualPage][i].id }">
                <article class="row">
                    <img class="col-10 col-sm-3" src="/images/articles/${postsPagination[actualPage][i].cover_image}" alt="">
                    <div class="col-10 col-sm-9">
                        <h3> ${ postsPagination[actualPage][i].title  } </h3>
                        <p> ${ postsPagination[actualPage][i].synopsis  } </p>
                    </div>
                </article>
            </a>
        `;
        
    }
    
    
    let paginationContainer = document.querySelector('.paginationContainer');
    paginationContainer.innerHTML = '';
    if(actualPage > 0){
        paginationContainer.innerHTML += `
        <button onclick="changePage(-1)">Anterior</button>
        `;
    }
    if(actualPage < postsPagination.length-1){
        paginationContainer.innerHTML += `
        <button onclick="changePage(1)">Siguiente</button>
        `;
    }
}

window.addEventListener('load', () => {
    
    fetch('/endpoints'+window.location.pathname)
    .then(result => {
        return result.json();
    })
    .then(posts => {
        posts.shift();
        makePagination(posts);
        changePage(0);
    })
});