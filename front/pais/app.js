const API = "http://localhost:5052/pais";

let editando   = false;
let idEditando = null;

document.addEventListener("DOMContentLoaded", () => listar());

// ── LISTAR ───────────────────────────────────────────────
function listar() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            let filas = "";
            data.forEach(p => {
                filas += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.nombre}</td>
                    <td>
                        <div class="acciones">
                            <button class="btn-editar"   onclick="cargarEdicion(${p.id})">✏ Editar</button>
                            <button class="btn-eliminar" onclick="eliminar(${p.id})">🗑 Eliminar</button>
                        </div>
                    </td>
                </tr>`;
            });
            document.getElementById("tabla").innerHTML =
                filas || `<tr><td colspan="4">No hay países registrados.</td></tr>`;
        })
        .catch(() => alert("Error al conectar con el servidor."));
}

// ── GUARDAR / ACTUALIZAR ─────────────────────────────────
function guardar() {
    const nombre = document.getElementById("nombre").value.trim();

    if (!nombre) {
        alert("El nombre del país es obligatorio.");
        return;
    }

    const pais   = { nombre };
    const metodo = editando ? "PUT" : "POST";
    const url    = editando ? `${API}/${idEditando}` : API;

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pais)
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al guardar");
        return res.json();
    })
    .then(() => { limpiar(); listar(); })
    .catch(err => alert("Error: " + err.message));
}

// ── CARGAR DATOS PARA EDITAR ─────────────────────────────
function cargarEdicion(id) {
    fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(p => {
            document.getElementById("nombre").value = p.nombre;
            editando   = true;
            idEditando = id;
            document.getElementById("form-titulo").textContent = "Editando País #" + id;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}

// ── ELIMINAR ─────────────────────────────────────────────
function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar este país?\nSe eliminarán también sus departamentos y ciudades.")) return;

    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) throw new Error("No se pudo eliminar. Puede tener registros relacionados.");
            listar();
        })
        .catch(err => alert("Error: " + err.message));
}

// ── LIMPIAR FORMULARIO ────────────────────────────────────
function limpiar() {
    document.getElementById("nombre").value = "";
    editando   = false;
    idEditando = null;
    document.getElementById("form-titulo").textContent = "Nuevo País";
}
