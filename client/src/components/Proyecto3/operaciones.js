/*Funcion que encuentra donde esta la incognita,
y devuelve la posicion, que se usara el hallarX
*/
function dondeX(numeros) {
    
    return numeros.findIndex(n => n.includes("x"));

}

/* Función que recibe tres numeros y halla la x que se encuentra en uno de ellos */
export function hallarX(numeros) {

    const pos = dondeX(numeros);
    let x1; //auxiliar para comparar
    let x; //la incognita

    switch (pos) {
        case 0:
            x1 = parseInt(numeros[2]) - parseInt(numeros[1]);
            break;
        case 1:
            x1 = parseInt(numeros[2]) - parseInt(numeros[0]);
            break;
        case 2:
            x1 = parseInt(numeros[0]) + parseInt(numeros[1]);
            break;
        default:
            return "x no encontrada";
    }

    /*Compara si el numero ingresado y el calculado tienen igual longitud
    y encuentra en que valor difieren
    */
    if ((x1<=0) || numeros[pos].length !== String(x1).length) {
        return x = "Datos incorrectos";
    }

    for (let i = 0; i < numeros[pos].length; i++) {

        if (numeros[pos][i] !== String(x1)[i]) {
            return x = String(x1)[i];
        }
       
    }

     return "x no encontrada";
}