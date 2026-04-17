const API          = "http://localhost:5052/propietario";
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
        .then(propietarios => {
            let filas = "";
            propietarios.forEach(pr => {
                const p = personas.find(x => x.id == pr.idPersona) || {};
                filas += `
                <tr>
                    <td>${pr.id}</td>
                    <td>${p.nombre || "-"}</td>
                    <td>${p.apellido || "-"}</td>
                    <td>${p.telefono || "-"}</td>
                    <td>${p.correo || "-"}</td>
                    <td>
                        <div class="acciones">
                            <button class="btn-editar"   onclick="cargarEdicion(${pr.id})">✏ Editar</button>
                            <button class="btn-eliminar" onclick="eliminar(${pr.id})">🗑 Eliminar</button>
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
        .then(pr => {
            document.getElementById("idPersona").value = pr.idPersona;
            editando   = true;
            idEditando = id;
            document.getElementById("form-titulo").textContent = "Editando Propietario #" + id;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}

function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar este propietario?")) return;
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => { if (!res.ok) throw new Error("No se pudo eliminar."); listar(); })
        .catch(err => alert("Error: " + err.message));
}

function limpiar() {
    document.getElementById("idPersona").value = "";
    editando   = false;
    idEditando = null;
    document.getElementById("form-titulo").textContent = "Nuevo Propietario";
}
