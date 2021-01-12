window.addEventListener('load', function(){
    
    let coursesContainer = document.querySelector("#courseContainer");
    let amountCourses = document.querySelector('#amountCourses');

    amountCourses.addEventListener('change', (event) => {
        coursesContainer.innerHTML = '';
        for(let i = 0; i < amountCourses.value; i++) {
            coursesContainer.innerHTML += `
            <div id="course">
                <h4 class="mt-3 ">Nombre:</h4>
                <input required class="" name="course_name" type="text" placeholder="Diseño UX">

                <h4 class="mt-3 ">Link de la pagina:</h4>
                <input required class="" name="course_plan_link" type="text" placeholder="www.digitalhouse.edu/diseñoUx">

                <h4 class="mt-3 ">Precio:</h4>
                <input required class="" name="course_price" type="text" placeholder="10000">

                <h4 class="mt-3 ">Calificación:</h4>
                <input required class="" name="course_calification" type="text" placeholder="De 1 a 10 (stats)">

                <h4 class="mt-3 ">Duración:</h4>
                <input required class="" name="course_duration" type="text" placeholder="Horas de duracion">

                <h4 class="mt-3 ">Dificultad:</h4>
                <input required class="" name="course_difficulty" type="text" placeholder="De 1 a 10 (stats)">

                <h4 class="mt-3 ">Salida laboral:</h4>
                <input required class="" name="course_job_exit" type="text" placeholder="De 1 a 10 (stats)">

                <h4 class="mt-3 ">Horas de estudio:</h4>
                <input required class="" name="course_study_hours" type="text" placeholder="Por ej: 70">
            </div>`;
        }
    })


})