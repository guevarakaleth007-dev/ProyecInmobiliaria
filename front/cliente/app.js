const API          = "http://localhost:5052/cliente";
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
            listar(); 
        });
}

document.addEventListener("DOMContentLoaded", () => {
    cargarPersonas();
    
});

function listar() {
    fetch(API)
        .then(res => res.json())
        .then(clientes => {
            let filas = "";
            clientes.forEach(c => {
                const p = personas.find(x => x.id == c.idPersona) || {};
                filas += `
                <tr>
                    <td>${c.id}</td>
                    <td>${p.nombre || "-"}</td>
                    <td>${p.apellido || "-"}</td>
                    <td>${p.telefono || "-"}</td>
                    <td>${p.correo || "-"}</td>
                    <td>
                        <div class="acciones">
                            <button class="btn-editar"   onclick="cargarEdicion(${c.id})">✏ Editar</button>
                            <button class="btn-eliminar" onclick="eliminar(${c.id})">🗑 Eliminar</button>
                        </div>
                    </td>
                </tr>`;
            });
            document.getElementById("tabla").innerHTML = filas || `<tr><td colspan="6">No hay registros.</td></tr>`;
        });
}

function guardar() {
    const idPersona = document.getElementById("idPersona").value;
    if (!idPersona) { alert("Selecciona una persona."); return; }

    const datos  = { idPersona: parseInt(idPersona) };
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
        .then(c => {
            document.getElementById("idPersona").value = c.idPersona;
            editando   = true;
            idEditando = id;
            document.getElementById("form-titulo").textContent = "Editando Cliente #" + id;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}

function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => { if (!res.ok) throw new Error("No se pudo eliminar."); listar(); })
        .catch(err => alert("Error: " + err.message));
}

function limpiar() {
    document.getElementById("idPersona").value = "";
    editando   = false;
    idEditando = null;
    document.getElementById("form-titulo").textContent = "Nuevo Cliente";
}
