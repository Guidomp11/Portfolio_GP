window.addEventListener('load', async function() {
    
    let cat = document.querySelectorAll('.sub_category');
    let form = document.querySelector('#editorForm')
    let alert = document.querySelector('.alert');
    let publish_btn = document.querySelector('#publishBtn');

    


    form.addEventListener('submit', event => {
        let counter = 0;
        event.preventDefault();

        for(let i = 0; i < cat.length; i++){
            if(cat[i].checked){
                counter++;
            }
        }
        if(counter > 0){
            let tags = document.querySelectorAll("#tags");
            for(let i = 0; i < tags.length; i++){
                tags[i].type = 'input';
                console.log(tags[i]);
            }

            form.submit();
        }else{
            alert.removeAttribute('hidden');
        }
    })
})

