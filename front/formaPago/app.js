const API = "http://localhost:5052/formaPago";

let editando   = false;
let idEditando = null;

document.addEventListener("DOMContentLoaded", () => {
    listar();
});

// ── LISTAR ────────────────────────────────────────────────
function listar() {
    fetch(API)
        .then(r => { if (!r.ok) throw new Error("Error " + r.status); return r.json(); })
        .then(data => {
            let filas = "";
            data.forEach(f => {
                filas += `
                <tr>
                    <td>${f.id}</td>
                    <td>${f.descripcion}</td>
                    <td>
                        <div class="acciones">
                            <button class="btn-editar"   onclick="cargarEdicion(${f.id})">✏ Editar</button>
                            <button class="btn-eliminar" onclick="eliminar(${f.id})">🗑 Eliminar</button>
                        </div>
                    </td>
                </tr>`;
            });
            document.getElementById("tabla").innerHTML =
                filas || `<tr><td colspan="3">No hay formas de pago registradas.</td></tr>`;
        })
        .catch(err => alert("Error al cargar formas de pago:\n" + err.message));
}

// ── GUARDAR / ACTUALIZAR ─────────────────────────────────
function guardar() {
    const descripcion = document.getElementById("descripcion").value.trim();

    if (!descripcion) {
        alert("La descripción es obligatoria.");
        return;
    }

    const formaPago = { descripcion };
    const metodo = editando ? "PUT" : "POST";
    const url    = editando ? `${API}/${idEditando}` : API;

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formaPago)
    })
    .then(res => { if (!res.ok) return res.text().then(t => { throw new Error(t || "Error " + res.status); }); return res.json(); })
    .then(() => { limpiar(); listar(); })
    .catch(err => alert("Error al guardar:\n" + err.message));
}

// ── CARGAR DATOS PARA EDITAR ─────────────────────────────
function cargarEdicion(id) {
    fetch(`${API}/${id}`)
        .then(r => r.json())
        .then(f => {
            document.getElementById("descripcion").value = f.descripcion;
            editando   = true;
            idEditando = id;
            document.getElementById("form-titulo").textContent = "Editando Forma de Pago #" + id;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}

// ── ELIMINAR ─────────────────────────────────────────────
function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar esta forma de pago?")) return;
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => { if (!res.ok) throw new Error("No se pudo eliminar."); listar(); })
        .catch(err => alert("Error: " + err.message));
}

// ── LIMPIAR FORMULARIO ────────────────────────────────────
function limpiar() {
    document.getElementById("descripcion").value = "";
    editando   = false;
    idEditando = null;
    document.getElementById("form-titulo").textContent = "Nueva Forma de Pago";
}
