window.addEventListener('load', () => {
    let tag_input = document.querySelector('.tag-input');
    let tag_btn = document.querySelector('#tag-btn');
    let tag_results = document.querySelector('#tags-results');

    let tags_container = document.querySelector('.tags-container');

    tag_btn.addEventListener('click', event => {
        event.preventDefault();
        
        tags_container.innerHTML += `<input type="button" id="tags" name="tags" value="${tag_input.value}">`;
        
        tag_input.value = '';
    });

    let tags = [];
    fetch('/endpoints/tags')
    .then(response => {
        return response.json();
    })
    .then( tagsResponse => {
        tags = tagsResponse;
    })

    if(tags != null){
        tag_input.addEventListener('input', event => {
            if(event.target.value == '' || event.target.value == null){
                tag_results.innerHTML = '';         
                return;
            }
            if(tags.length > 0){
                let inputData = event.target.value.toLowerCase();
                for(let i = 0; i < tags.length; i++){
                    let tag = tags[i].tag.toLowerCase();
                    
                    if(tag.includes(inputData.toLowerCase())){
                        tag_results.innerHTML +=`<button id="inputButton" value="${tags[i].tag}">${tags[i].tag}</button>`
                        
                        let inputButtonComplete = document.querySelector('#inputButton');
                        inputButtonComplete.addEventListener('click', event => {
                            tag_results.innerHTML = '';
                            tag_input.value = inputButtonComplete.value;
                        });
                    }
                    
                }
            }
        });
    }
});