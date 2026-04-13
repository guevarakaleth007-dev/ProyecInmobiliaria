const API = "http://localhost:5052/auth";

function registrar() {
    const nombre        = document.getElementById("nombre").value.trim();
    const apellido      = document.getElementById("apellido").value.trim();
    const correo        = document.getElementById("correo").value.trim();
    const telefono      = document.getElementById("telefono").value.trim();
    const domicilio     = document.getElementById("domicilio").value.trim();
    const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
    const clave         = document.getElementById("clave").value.trim();
    const claveConfirm  = document.getElementById("claveConfirm").value.trim();

    // Validaciones básicas
    if (!nombre || !apellido || !nombreUsuario || !clave || !claveConfirm) {
        mostrarMensaje("Los campos marcados con * son obligatorios.", "error");
        return;
    }

    if (clave !== claveConfirm) {
        mostrarMensaje("Las contraseñas no coinciden.", "error");
        return;
    }

    if (clave.length < 4) {
        mostrarMensaje("La contraseña debe tener al menos 4 caracteres.", "error");
        return;
    }

    const datos = {
        nombre,
        apellido,
        correo,
        telefono,
        domicilio,
        nombreUsuario,
        clave,
        idTipoPersona: 1,
        idPerfil: 1
    };

    fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then(res => {
        if (!res.ok) {
            return res.text().then(t => { throw new Error("Error del servidor: " + res.status + " - " + t); });
        }
        return res.json();
    })
    .then(data => {
        if (data.exito) {
            mostrarMensaje("¡Registro exitoso! Redirigiendo al login...", "exito");
            setTimeout(() => {
                window.location.href = "../login/index.html";
            }, 1500);
        } else {
            mostrarMensaje(data.mensaje, "error");
        }
    })
    .catch(err => {
        mostrarMensaje("Error: " + err.message, "error");
    });
}

function mostrarMensaje(texto, tipo) {
    const div = document.getElementById("mensaje");
    div.textContent = texto;
    div.className = "mensaje " + tipo;
}
