

const API = "http://localhost:5052/login";
 
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
 
    // Validar que no estén vacíos
    if (!username || !password) {
        mostrarError("Por favor ingresa usuario y contraseña");
        return;
    }
 
    fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => {
        if (res.ok) {
            return res.json().then(usuario => {
                // Login exitoso: guardar usuario en sesión y redirigir
                sessionStorage.setItem("usuario", JSON.stringify(usuario));
                alert("¡Bienvenido, " + usuario.username + "!");
                // Redirigir al menú principal (ajusta la ruta según tu proyecto)
                window.location.href = "../../front/tipoPersona/index.html";
            });
        } else {
            mostrarError("Usuario o contraseña incorrectos");
        }
    })
    .catch(err => {
        mostrarError("Error al conectar con el servidor");
        console.error(err);
    });
}
 
function mostrarError(msg) {
    const div = document.getElementById("mensaje-error");
    div.textContent = msg;
    div.style.display = "block";
}
 
// Permitir login con la tecla Enter
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") login();
});