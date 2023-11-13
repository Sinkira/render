export function isBuildNewFormat(build){
    let k = build["k"];

    return isCharIdNewFormat(k);
}

export function isCharIdNewFormat(k){
    let result = false;
    let newFormats = ["1208", "1102", "1003", "1212"];
    
    if(newFormats.includes(k)){
        result = true;
    }
    
    return result;
}