// Función que compara dos números
function calcularMayor(numero1, numero2) {
    if (isNaN(numero1) || isNaN(numero2)) {
        alert("Tienes que ingresar numeros validos.");
        return;
    }

    if (numero1 > numero2) {
        alert("El número mayor es: " + numero1);
    } else if (numero2 > numero1) {
        alert("El número mayor es: " + numero2);
    } else {
        alert("Ambos números son iguales: " + numero1);
    }
}

// Funcion para pedir datos y ejecutar calcularMayor()
function ejecutar() {
    let n1 = parseFloat(prompt("Ingresa el primer número:"));
    let n2 = parseFloat(prompt("Ingresa el segundo número:"));

    // Llamamos a la funcion principal
    calcularMayor(n1, n2);
}