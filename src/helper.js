//Obtain year difference
export function obtainYearDifference(year){
    return new Date().getFullYear() - year;
}

//Calculate total by brand
export function calculateBrand(brand){
    let increase;

    switch(brand){
        case 'europeo': increase = 1.30; break; 
        case 'americano': increase = 1.15; break; 
        case 'asiatico': increase = 1.05; break; 
        default: increase=0; break;
    }

    return increase;
}

//Calculate insurance type
export function calculateInsuranceType(plan){
    return (plan === 'vanilla') ? 1.20 : 1.50;
}

//Capitalize the first letter
export function firstCapitalize(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
}