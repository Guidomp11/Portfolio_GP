
window.addEventListener('load', function() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'radar',

        // The data for our dataset
        
        data: {
            labels: ['Precio', 'Salida Laboral', 'Horas de Estudio', 'Dificultad', 'Años'],
            datasets: [{
                label: 'Universidad del Salvador',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [15, 15, 15, 15, 15]
            }]
        },

        // Configuration options go here
        options: {}
    });
});
