const API             = "http://localhost:5052/mantenimiento";
const API_APARTAMENTO = "http://localhost:5052/apartamento";
const API_EMPLEADO    = "http://localhost:5052/empleado";
const API_PERSONA     = "http://localhost:5052/persona";

let editando     = false;
let idEditando   = null;
let apartamentos = [];
let empleados    = [];
let personas     = [];

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([cargarApartamentos(), cargarPersonas()])
        .then(() => cargarEmpleados())
        .then(() => listar());
});

// ── CARGAR PERSONAS (necesario para resolver nombre del empleado) ──
function cargarPersonas() {
    return fetch(API_PERSONA)
        .then(r => r.json())
        .then(data => { personas = data; })
        .catch(() => console.error("No se pudieron cargar las personas."));
}

// ── CARGAR COMBO APARTAMENTOS ─────────────────────────────
function cargarApartamentos() {
    return fetch(API_APARTAMENTO)
        .then(r => r.json())
        .then(data => {
            apartamentos = data;

            const selForm = document.getElementById("idApartamento");
            selForm.innerHTML = '<option value="">-- Seleccione un apartamento --</option>';
            data.forEach(a => {
                selForm.innerHTML += `<option value="${a.id}">Apto #${a.id}</option>`;
            });

            const selFiltro = document.getElementById("filtroApartamento");
            selFiltro.innerHTML = '<option value="">-- Todos --</option>';
            data.forEach(a => {
                selFiltro.innerHTML += `<option value="${a.id}">Apto #${a.id}</option>`;
            });
        })
        .catch(() => console.error("No se pudieron cargar los apartamentos."));
}

// ── CARGAR COMBO EMPLEADOS ────────────────────────────────
function cargarEmpleados() {
    return fetch(API_EMPLEADO)
        .then(r => r.json())
        .then(data => {
            empleados = data;
            const sel = document.getElementById("idEmpleado");
            sel.innerHTML = '<option value="">-- Seleccione un empleado --</option>';
            data.forEach(e => {
                const nombre = getNombrePersona(e.idPersona);
                const cargo  = e.cargo ? ` (${e.cargo})` : "";
                sel.innerHTML += `<option value="${e.id}">${nombre}${cargo}</option>`;
            });
        })
        .catch(() => console.error("No se pudieron cargar los empleados."));
}

// ── HELPERS ───────────────────────────────────────────────
function getNombrePersona(idPersona) {
    const p = personas.find(x => x.id == idPersona);
    return p ? `${p.nombre} ${p.apellido}` : "ID " + idPersona;
}

function getNombreEmpleado(idEmpleado) {
    const e = empleados.find(x => x.id == idEmpleado);
    if (!e) return "ID " + idEmpleado;
    return getNombrePersona(e.idPersona);
}

function getNombreApto(id) {
    const a = apartamentos.find(x => x.id == id);
    return a ? `Apto #${a.id}` : "ID " + id;
}

function formatFecha(dt) {
    if (!dt) return "—";
    return new Date(dt).toLocaleDateString("es-CO", { year: "numeric", month: "2-digit", day: "2-digit" });
}

// ── LISTAR ────────────────────────────────────────────────
function listar() {
    const filtro = document.getElementById("filtroApartamento").value;
    const url = filtro ? `${API}/apartamento/${filtro}` : API;

    fetch(url)
        .then(r => { if (!r.ok) throw new Error("Error " + r.status); return r.json(); })
        .then(data => {
            let filas = "";
            data.forEach(m => {
                filas += `
                <tr>
                    <td>${m.id}</td>
                    <td>${getNombreApto(m.idApartamento)}</td>
                    <td>${getNombreEmpleado(m.idEmpleado)}</td>
                    <td>${formatFecha(m.fecha)}</td>
                    <td>${m.descripcion}</td>
                    <td>
                        <div class="acciones">
                            <button class="btn-editar"   onclick="cargarEdicion(${m.id})">✏ Editar</button>
                            <button class="btn-eliminar" onclick="eliminar(${m.id})">🗑 Eliminar</button>
                        </div>
                    </td>
                </tr>`;
            });
            document.getElementById("tabla").innerHTML =
                filas || `<tr><td colspan="6">No hay mantenimientos registrados.</td></tr>`;
        })
        .catch(err => alert("Error al cargar mantenimientos:\n" + err.message));
}

// ── GUARDAR / ACTUALIZAR ─────────────────────────────────
function guardar() {
    const idApartamento = document.getElementById("idApartamento").value;
    const idEmpleado    = document.getElementById("idEmpleado").value;
    const fecha         = document.getElementById("fecha").value;
    const descripcion   = document.getElementById("descripcion").value.trim();

    if (!idApartamento || !idEmpleado || !fecha || !descripcion) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const mantenimiento = {
        idApartamento: parseInt(idApartamento),
        idEmpleado:    parseInt(idEmpleado),
        fecha:         fecha + ":00",
        descripcion
    };

    const metodo = editando ? "PUT" : "POST";
    const url    = editando ? `${API}/${idEditando}` : API;

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mantenimiento)
    })
    .then(res => { if (!res.ok) return res.text().then(t => { throw new Error(t || "Error " + res.status); }); return res.json(); })
    .then(() => { limpiar(); listar(); })
    .catch(err => alert("Error al guardar:\n" + err.message));
}

// ── CARGAR DATOS PARA EDITAR ─────────────────────────────
function cargarEdicion(id) {
    fetch(`${API}/${id}`)
        .then(r => r.json())
        .then(m => {
            document.getElementById("idApartamento").value = m.idApartamento;
            document.getElementById("idEmpleado").value    = m.idEmpleado;
            document.getElementById("fecha").value         = m.fecha ? m.fecha.substring(0, 16) : "";
            document.getElementById("descripcion").value   = m.descripcion;
            editando   = true;
            idEditando = id;
            document.getElementById("form-titulo").textContent = "Editando Mantenimiento #" + id;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}

// ── ELIMINAR ─────────────────────────────────────────────
function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar este mantenimiento?\nSe eliminarán también sus pagos.")) return;
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => { if (!res.ok) throw new Error("No se pudo eliminar."); listar(); })
        .catch(err => alert("Error: " + err.message));
}

// ── LIMPIAR FORMULARIO ────────────────────────────────────
function limpiar() {
    document.getElementById("idApartamento").value = "";
    document.getElementById("idEmpleado").value    = "";
    document.getElementById("fecha").value         = "";
    document.getElementById("descripcion").value   = "";
    editando   = false;
    idEditando = null;
    document.getElementById("form-titulo").textContent = "Nuevo Mantenimiento";
}
