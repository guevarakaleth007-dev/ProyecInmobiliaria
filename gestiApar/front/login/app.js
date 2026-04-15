const API = "http://localhost:5052/auth";

function login() {
    const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
    const clave = document.getElementById("clave").value.trim();

    if (!nombreUsuario || !clave) {
        mostrarMensaje("Por favor completa todos los campos.", "error");
        return;
    }

    fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreUsuario, clave })
    })
    .then(res => res.json())
    .then(data => {
        if (data.exito) {
            // Guardar datos de sesión en localStorage
            localStorage.setItem("idUsuario", data.idUsuario);
            localStorage.setItem("nombreUsuario", data.nombreUsuario);
            localStorage.setItem("nombreCompleto", data.nombreCompleto);
            localStorage.setItem("idPerfil", data.idPerfil);

            mostrarMensaje("¡Bienvenido " + data.nombreCompleto + "! Redirigiendo...", "exito");

            // Redirigir al menú principal después de 1.2 segundos
            setTimeout(() => {
                window.location.href = "../inicio/index.html";
            }, 1200);
        } else {
            mostrarMensaje(data.mensaje, "error");
        }
    })
    .catch(() => {
        mostrarMensaje("Error al conectar con el servidor.", "error");
    });
}

function mostrarMensaje(texto, tipo) {
    const div = document.getElementById("mensaje");
    div.textContent = texto;
    div.className = "mensaje " + tipo;
}

// Permitir Enter en el campo de contraseña
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("clave").addEventListener("keydown", e => {
        if (e.key === "Enter") login();
    });
    document.getElementById("nombreUsuario").addEventListener("keydown", e => {
        if (e.key === "Enter") login();
    });
});
