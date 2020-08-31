function myFunction(id) {
  document.getElementById(id).classList.toggle("show");
}

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

window.addEventListener('load', function() {

  /*REVISAR*/
  let universityInput = document.querySelector('#universities');
  let carrersInput = document.querySelector('#carrers');
  let cursesInput = document.querySelector('#curses');
  let programsInput = document.querySelector('#programs');

  let universityBtn = document.querySelector('.universities');
  let carrersBtn = document.querySelector('.carrers');
  let cursesBtn = document.querySelector('.curses');
  let programsBtn = document.querySelector('.programs');



  universityBtn.addEventListener('click', function(){
    if($(universityInput).is(":inherit")){
      universityInput.style.display = "none";
    }
    universityInput.style.display = "inherit";
    carrersInput.style.display = "none";
    cursesInput.style.display = "none";
    programsInput.style.display = "none";
    console.log('entro');
  });
  carrersBtn.addEventListener('click', function(){
    if($(carrersInput).is(":inherit")){
      carrersInput.style.display = "none";
    }
    carrersInput.style.display = "inherit";
    universityInput.style.display = "none";
    cursesInput.style.display = "none";
    programsInput.style.display = "none";
  });
  cursesBtn.addEventListener('click', function(){
    if($(cursesInput).is(":inherit")){
      cursesInput.style.display = "none";
    }
    cursesInput.style.display = "inherit";
    carrersInput.style.display = "none";
    universityInput.style.display = "none";
    programsInput.style.display = "none";
  });
  programsBtn.addEventListener('click', function(){
    if($(programsInput).is(":inherit")){
      programsInput.style.display = "none";
    }
    programsInput.style.display = "inherit";
    carrersInput.style.display = "none";
    cursesInput.style.display = "none";
    universityInput.style.display = "none";
  });
  /*FIN REVISAR*/
  
  let tipsBtn = document.querySelector('.tipsPhoneBtn');
  let tipsDiv = document.querySelector('.mobileTips');
  let closeMobBtn = document.querySelector('.mobileTipsCross');
  tipsBtn.addEventListener('click', function(){
    tipsBtn.classList.add('d-none')
    tipsDiv.classList.add('openMobileTips');
  })
  
  closeMobBtn.addEventListener('click', function(){
    tipsBtn.classList.remove('d-none');
    tipsDiv.classList.remove('openMobileTips');
  })




  /*FUNCIONAMIENTO DE BOTONES NAVEGACION*/
  let genBtn = document.querySelector('.general-btn');
  let faqsTipsBtn = document.querySelector('.faqs-tips-btn');
  let lessonsBtn = document.querySelector('.lessons-btn');

  let generalView = document.querySelector('.generalFlap');
  let faqsTipsView = document.querySelector('.faqs-tips-container');
  let lessonsView = document.querySelector('.lessons-container');

  /*DEFAULTS*/
  // faqsTipsView.classList.add('d-none');
  // lessonsView.classList.add('d-none');


  genBtn.addEventListener('click', function(){
    generalView.classList.remove('d-none');
    faqsTipsView.classList.add('d-none');
    lessonsView.classList.add('d-none');

  });

  faqsTipsBtn.addEventListener('click', function(){
    faqsTipsView.classList.remove('d-none');
    generalView.classList.add('d-none');
    lessonsView.classList.add('d-none');
  });

  lessonsBtn.addEventListener('click', function(){
    generalView.classList.add('d-none');
    faqsTipsView.classList.add('d-none');
    lessonsView.classList.remove('d-none');
  });


})