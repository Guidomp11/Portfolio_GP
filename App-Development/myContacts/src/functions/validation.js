export const validateNewUser = (inputs) => {
    let response = true;
    inputs.map(input => {
        if([input][0].trim() === ''){
            response = false;
            return;
        }
    })

    return response;
}