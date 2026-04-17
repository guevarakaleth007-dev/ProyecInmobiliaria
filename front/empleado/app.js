const API          = "http://localhost:5052/empleado";
const API_PERSONA  = "http://localhost:5052/persona";

let editando   = false;
let idEditando = null;
let personas   = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarPersonas();
    listar();
});

function cargarPersonas() {
    fetch(API_PERSONA)
        .then(res => res.json())
        .then(data => {
            personas = data;
            const sel = document.getElementById("idPersona");
            sel.innerHTML = '<option value="">-- Seleccione persona --</option>';
            data.forEach(p => {
                sel.innerHTML += `<option value="${p.id}">${p.nombre} ${p.apellido}</option>`;
            });
        });
}

function getNombrePersona(id) {
    const p = personas.find(x => x.id == id);
    return p ? `${p.nombre} ${p.apellido}` : id;
}

function listar() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            let filas = "";
            data.forEach(e => {
                filas += `
                <tr>
                    <td>${e.id}</td>
                    <td>${getNombrePersona(e.idPersona)}</td>
                    <td>${e.cargo || "-"}</td>
                    <td>
                        <div class="acciones">
                            <button class="btn-editar"   onclick="cargarEdicion(${e.id})">✏ Editar</button>
                            <button class="btn-eliminar" onclick="eliminar(${e.id})">🗑 Eliminar</button>
                        </div>
                    </td>
                </tr>`;
            });
            document.getElementById("tabla").innerHTML = filas || `<tr><td colspan="4">No hay registros.</td></tr>`;
        });
}

function guardar() {
    const idPersona = document.getElementById("idPersona").value;
    const cargo     = document.getElementById("cargo").value.trim();

    if (!idPersona) { alert("Selecciona una persona."); return; }

    const datos  = { idPersona: parseInt(idPersona), cargo };
    const metodo = editando ? "PUT" : "POST";
    const url    = editando ? `${API}/${idEditando}` : API;

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
    .then(res => { if (!res.ok) throw new Error("Error al guardar"); return res.json(); })
    .then(() => { limpiar(); listar(); })
    .catch(err => alert("Error: " + err.message));
}

function cargarEdicion(id) {
    fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(e => {
            document.getElementById("idPersona").value = e.idPersona;
            document.getElementById("cargo").value     = e.cargo || "";
            editando   = true;
            idEditando = id;
            document.getElementById("form-titulo").textContent = "Editando Empleado #" + id;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}

function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar este empleado?")) return;
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => { if (!res.ok) throw new Error("No se pudo eliminar."); listar(); })
        .catch(err => alert("Error: " + err.message));
}

function limpiar() {
    document.getElementById("idPersona").value = "";
    document.getElementById("cargo").value     = "";
    editando   = false;
    idEditando = null;
    document.getElementById("form-titulo").textContent = "Nuevo Empleado";
}
