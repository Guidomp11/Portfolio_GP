export function obtenerDiferenciaYear(year){
    return new Date().getFullYear() - year;
}

export function calcularMarca(marca){
    let incremento;

    switch(marca){
        
        case 'americano':
            incremento = 1.15;
            break;
        case 'europeo':
            incremento = 1.30;
            break;
        case 'asiatico':
            incremento = 1.05;
            break;
        default:
            break;
    }

    return incremento;
}

export function calcularPlan(plan){
    return (plan === 'basico') ? 1.20 : 1.50;
}

export function primerMayuscula(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
}