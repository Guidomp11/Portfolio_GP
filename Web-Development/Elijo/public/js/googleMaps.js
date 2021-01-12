let map = "";

function initMap(){
    let options = {
        center : {
            lat: 123.456,
            lng: 781.456
        },
        zoom: 5
    };
    map = new google.maps.Map(document.getElementById('map'), options);
}