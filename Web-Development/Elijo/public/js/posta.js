function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function closeButton(){
  let universityInput = document.querySelector('#universities');
  let institutesInput = document.querySelector('#institute');
  let programsInput = document.querySelector('#region');

  universityInput.classList.remove("show");
  institutesInput.classList.remove("show");
  programsInput.classList.remove("show");
}

window.addEventListener('load', function() {

  /*REVISAR*/
  let universityInput = document.querySelector('#universities');
  let institutesInput = document.querySelector('#institute');
  let programsInput = document.querySelector('#region');

  let universityBtn = document.querySelector('.universities');
  let institutesBtn = document.querySelector('.institute');
  let programsBtn = document.querySelector('.region');

  
  universityBtn.addEventListener('click', function(){
    universityInput.classList.toggle("show");
    institutesInput.classList.remove("show");
    programsInput.classList.remove("show");
  });
  institutesBtn.addEventListener('click', function(){
    institutesInput.classList.toggle("show");
    universityInput.classList.remove("show");
    programsInput.classList.remove("show");
  });

  programsBtn.addEventListener('click', function(){
    programsInput.classList.toggle("show");
    universityInput.classList.remove("show");
    institutesInput.classList.remove("show");
  });

  /*FUNCIONAMIENTO DE BOTONES NAVEGACION*/
  let genBtn = document.querySelector('.general-btn');
  let faqsTipsBtn = document.querySelector('.faqs-tips-btn');
  let lessonsBtn = document.querySelector('.lessons-btn');

  let generalView = document.querySelector('.generalFlap');
  let faqsTipsView = document.querySelector('.faqs-tips-container');
  let lessonsView = document.querySelector('.tips-container');

  genBtn.addEventListener('click', function(){
    genBtn.classList.add('selected');
    faqsTipsBtn.classList.remove('selected');
    lessonsBtn.classList.remove('selected');

    generalView.classList.remove('d-none');
    faqsTipsView.classList.add('d-none');
    lessonsView.classList.add('d-none');

  });

  faqsTipsBtn.addEventListener('click', function(){
    genBtn.classList.remove('selected');
    faqsTipsBtn.classList.add('selected');
    lessonsBtn.classList.remove('selected');

    faqsTipsView.classList.remove('d-none');
    generalView.classList.add('d-none');
    lessonsView.classList.add('d-none');
  });

  lessonsBtn.addEventListener('click', function(){
    genBtn.classList.remove('selected');
    faqsTipsBtn.classList.remove('selected');
    lessonsBtn.classList.add('selected');

    generalView.classList.add('d-none');
    faqsTipsView.classList.add('d-none');
    lessonsView.classList.remove('d-none');
  });
})


// clases 
// lessons-btn-click
// faqs-tips-btn-click
// general-btn-click