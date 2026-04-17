const API        = "http://localhost:5052/persona";
const API_TIPO   = "http://localhost:5052/tipopersona";

let editando   = false;
let idEditando = null;
let tiposPersona = []; // cache de tipos para mostrar en tabla

// ── INICIALIZAR ──────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    cargarTipos();
    listar();
});

// ── CARGAR COMBO TIPO PERSONA ────────────────────────────
function cargarTipos() {
    fetch(API_TIPO)
        .then(res => res.json())
        .then(data => {
            tiposPersona = data;
            const select = document.getElementById("idTipoPersona");
            select.innerHTML = '<option value="">-- Seleccione --</option>';
            data.forEach(t => {
                select.innerHTML += `<option value="${t.id}">${t.descripcion}</option>`;
            });
        })
        .catch(() => console.error("No se pudieron cargar los tipos de persona."));
}

function getNombreTipo(idTipo) {
    const tipo = tiposPersona.find(t => t.id == idTipo);
    return tipo ? tipo.descripcion : idTipo;
}

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
                    <td>${p.apellido}</td>
                    <td>${getNombreTipo(p.idTipoPersona)}</td>
                    <td>${p.telefono || "-"}</td>
                    <td>${p.correo || "-"}</td>
                    <td>
                        <div class="acciones">
                            <button class="btn-editar"   onclick="cargarEdicion(${p.id})">✏ Editar</button>
                            <button class="btn-eliminar" onclick="eliminar(${p.id})">🗑 Eliminar</button>
                        </div>
                    </td>
                </tr>`;
            });
            document.getElementById("tabla").innerHTML = filas || `<tr><td colspan="7">No hay registros.</td></tr>`;
        });
}

// ── GUARDAR / ACTUALIZAR ─────────────────────────────────
function guardar() {
    const nombre          = document.getElementById("nombre").value.trim();
    const apellido        = document.getElementById("apellido").value.trim();
    const idTipoPersona   = document.getElementById("idTipoPersona").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const telefono        = document.getElementById("telefono").value.trim();
    const correo          = document.getElementById("correo").value.trim();
    const domicilio       = document.getElementById("domicilio").value.trim();

    if (!nombre || !apellido || !idTipoPersona) {
        alert("Los campos Nombre, Apellido y Tipo de Persona son obligatorios.");
        return;
    }

    const persona = {
        nombre,
        apellido,
        idTipoPersona: parseInt(idTipoPersona),
        fechaNacimiento: fechaNacimiento || null,
        telefono,
        correo,
        domicilio
    };

    const metodo = editando ? "PUT" : "POST";
    const url    = editando ? `${API}/${idEditando}` : API;

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(persona)
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al guardar");
        return res.json();
    })
    .then(() => {
        limpiar();
        listar();
    })
    .catch(err => alert("Error: " + err.message));
}

// ── CARGAR DATOS PARA EDITAR ─────────────────────────────
function cargarEdicion(id) {
    fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(p => {
            document.getElementById("nombre").value          = p.nombre;
            document.getElementById("apellido").value        = p.apellido;
            document.getElementById("idTipoPersona").value   = p.idTipoPersona;
            document.getElementById("fechaNacimiento").value = p.fechaNacimiento || "";
            document.getElementById("telefono").value        = p.telefono || "";
            document.getElementById("correo").value          = p.correo || "";
            document.getElementById("domicilio").value       = p.domicilio || "";

            editando   = true;
            idEditando = id;
            document.getElementById("form-titulo").textContent = "Editando Persona #" + id;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}

// ── ELIMINAR ─────────────────────────────────────────────
function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar esta persona?")) return;

    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) throw new Error("No se pudo eliminar. Puede que tenga registros relacionados.");
            listar();
        })
        .catch(err => alert("Error: " + err.message));
}

// ── LIMPIAR FORMULARIO ────────────────────────────────────
function limpiar() {
    document.getElementById("nombre").value          = "";
    document.getElementById("apellido").value        = "";
    document.getElementById("idTipoPersona").value   = "";
    document.getElementById("fechaNacimiento").value = "";
    document.getElementById("telefono").value        = "";
    document.getElementById("correo").value          = "";
    document.getElementById("domicilio").value       = "";

    editando   = false;
    idEditando = null;
    document.getElementById("form-titulo").textContent = "Nueva Persona";
}
