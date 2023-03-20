export function valida(input) {
    const tipoInput = input.dataset.tipo;
    if (validadores[tipoInput]) {
        validadores[tipoInput](input)
    }
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajesDeError(tipoInput, input);
    }
};

const tipoDeErrores = ["valueMissing", "typeMismatch", "patternMismatch", "customError"];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacío"
    },
    email: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Almenos 8 caracteres, mínimo una letra minúscula, una mayúscula y sin caracteres especiales."
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Para continuar deber ser mayor de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es de 10 números"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Ingresa una dirección válida"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Ingresa una ciudad válida"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Ingresa un estado válido"
    }
};

const validadores = {
    nacimiento: (input) => validarNAcimiento(input),
};

function mostrarMensajesDeError(tipoInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoInput][error];
        }
    });
    return mensaje;
};
function validarNAcimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorEdad(fechaCliente)) {
        mensaje = "Para continuar deber ser mayor de edad"
    }
    input.setCustomValidity(mensaje)
};

function mayorEdad(fecha) {
    const today = new Date();
    const diferencia = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate())
    return (today > diferencia);
};
