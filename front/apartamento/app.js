const API             = "http://localhost:5052/apartamento";
const API_PROPIETARIO = "http://localhost:5052/propietario";
const API_PERSONA     = "http://localhost:5052/persona";
const API_PAIS        = "http://localhost:5052/pais";
const API_DEPARTAMENTO = "http://localhost:5052/departamento";
const API_CIUDAD      = "http://localhost:5052/ciudad";

let editando   = false;
let idEditando = null;
let propietarios = [];
let ciudades     = [];

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        cargarPropietarios(),
        cargarPaisesForm()
    ]).then(() => listar());
});

function cargarPropietarios() {
    return Promise.all([
        fetch(API_PROPIETARIO).then(r => r.json()),
        fetch(API_PERSONA).then(r => r.json())
    ]).then(([props, personas]) => {
        propietarios = props.map(p => {
            const per = personas.find(x => x.id == p.idPersona);
            return { id: p.id, nombre: per ? (per.nombre + " " + per.apellido) : "ID " + p.idPersona };
        });
        const select = document.getElementById("idPropietario");
        select.innerHTML = '<option value="">-- Seleccione un propietario --</option>';
        propietarios.forEach(p => {
            select.innerHTML += `<option value="${p.id}">${p.nombre}</option>`;
        });
    }).catch(() => console.error("No se pudieron cargar los propietarios."));
}

function getNombrePropietario(id) {
    const p = propietarios.find(x => x.id == id);
    return p ? p.nombre : "ID " + id;
}

function getNombreCiudad(id) {
    const c = ciudades.find(x => x.id == id);
    return c ? c.nombre : "ID " + id;
}

// ── COMBOS EN CASCADA (formulario) ───────────────────────
function cargarPaisesForm() {
    fetch(API_PAIS)
        .then(r => r.json())
        .then(data => {
            const sel = document.getElementById("filtroPaisForm");
            sel.innerHTML = '<option value="">-- Seleccione un país --</option>';
            data.forEach(p => sel.innerHTML += `<option value="${p.id}">${p.nombre}</option>`);
        });
}

function cargarDepartamentosForm() {
    const idPais = document.getElementById("filtroPaisForm").value;
    const selDepto = document.getElementById("filtroDepartamentoForm");
    const selCiudad = document.getElementById("idCiudad");
    selDepto.innerHTML = '<option value="">-- Seleccione un departamento --</option>';
    selCiudad.innerHTML = '<option value="">-- Seleccione una ciudad --</option>';
    if (!idPais) return;
    fetch(`${API_DEPARTAMENTO}/pais/${idPais}`)
        .then(r => r.json())
        .then(data => data.forEach(d => selDepto.innerHTML += `<option value="${d.id}">${d.nombre}</option>`));
}

function cargarCiudadesForm() {
    const idDepto = document.getElementById("filtroDepartamentoForm").value;
    const selCiudad = document.getElementById("idCiudad");
    selCiudad.innerHTML = '<option value="">-- Seleccione una ciudad --</option>';
    if (!idDepto) return;
    fetch(`${API_CIUDAD}/departamento/${idDepto}`)
        .then(r => r.json())
        .then(data => data.forEach(c => selCiudad.innerHTML += `<option value="${c.id}">${c.nombre}</option>`));
}

// ── LISTAR ────────────────────────────────────────────────
function listar() {
    const filtroEstado = document.getElementById("filtroEstado").value;
    const url = filtroEstado !== "" ? `${API}/estado/${filtroEstado}` : API;

    // Cargar ciudades en paralelo con los apartamentos, sin bloquear si falla una
    const promCiudades = fetch(API_CIUDAD).then(r => r.json()).catch(() => []);
    const promApartamentos = fetch(url).then(r => {
        if (!r.ok) return r.text().then(t => { throw new Error("HTTP " + r.status + ":\n" + t); });
        return r.json();
    });

    Promise.all([promCiudades, promApartamentos])
        .then(([dataCiudades, data]) => {
            ciudades = dataCiudades;
            let filas = "";
            data.forEach(a => {
                const estadoLabel = a.estado ? "✅ Ocupado" : "🟢 Libre";
                filas += `
                <tr>
                    <td>${a.id}</td>
                    <td>${getNombrePropietario(a.idPropietario)}</td>
                    <td>${getNombreCiudad(a.idCiudad)}</td>
                    <td>${a.direccion}</td>
                    <td>${a.numeroHabitacion}</td>
                    <td>$${Number(a.pagoMensual).toLocaleString("es-CO")}</td>
                    <td>${estadoLabel}</td>
                    <td>
                        <div class="acciones">
                            <button class="btn-editar"   onclick="cargarEdicion(${a.id})">✏ Editar</button>
                            <button class="btn-eliminar" onclick="eliminar(${a.id})">🗑 Eliminar</button>
                        </div>
                    </td>
                </tr>`;
            });
            document.getElementById("tabla").innerHTML =
                filas || `<tr><td colspan="8">No hay apartamentos registrados.</td></tr>`;
        })
        .catch(err => alert("Error al conectar con el servidor:\n" + err.message));
}

// ── GUARDAR / ACTUALIZAR ─────────────────────────────────
function guardar() {
    const idPropietario    = document.getElementById("idPropietario").value;
    const idCiudad         = document.getElementById("idCiudad").value;
    const direccion        = document.getElementById("direccion").value.trim();
    const numeroHabitacion = document.getElementById("numeroHabitacion").value;
    const pagoMensual      = document.getElementById("pagoMensual").value;
    const estado           = document.getElementById("estado").value;

    if (!idPropietario || !idCiudad || !direccion || !numeroHabitacion || !pagoMensual || estado === "") {
        alert("Todos los campos marcados con * son obligatorios.");
        return;
    }

    const apartamento = {
        idPropietario: parseInt(idPropietario),
        idCiudad: parseInt(idCiudad),
        direccion,
        numeroHabitacion: parseInt(numeroHabitacion),
        pagoMensual: parseFloat(pagoMensual),
        estado: estado === "true"
    };

    const metodo = editando ? "PUT" : "POST";
    const url    = editando ? `${API}/${idEditando}` : API;

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apartamento)
    })
    .then(res => { if (!res.ok) return res.text().then(t => { throw new Error(t || "Error " + res.status); }); return res.json(); })
    .then(() => { limpiar(); listar(); })
    .catch(err => alert("Error al guardar apartamento:\n" + err.message));
}

// ── CARGAR DATOS PARA EDITAR ─────────────────────────────
function cargarEdicion(id) {
    fetch(`${API}/${id}`)
        .then(r => r.json())
        .then(a => {
            document.getElementById("idPropietario").value  = a.idPropietario;
            document.getElementById("direccion").value      = a.direccion;
            document.getElementById("numeroHabitacion").value = a.numeroHabitacion;
            document.getElementById("pagoMensual").value   = a.pagoMensual;
            document.getElementById("estado").value        = String(a.estado);

            // Cargar cascada para preseleccionar ciudad
            fetch(`${API_CIUDAD}/${a.idCiudad}`)
                .then(r => r.json())
                .then(ciudad => {
                    fetch(`${API_DEPARTAMENTO}/${ciudad.idDepartamento}`)
                        .then(r => r.json())
                        .then(depto => {
                            document.getElementById("filtroPaisForm").value = depto.idPais;
                            fetch(`${API_DEPARTAMENTO}/pais/${depto.idPais}`)
                                .then(r => r.json())
                                .then(deptos => {
                                    const selDepto = document.getElementById("filtroDepartamentoForm");
                                    selDepto.innerHTML = '<option value="">-- Seleccione un departamento --</option>';
                                    deptos.forEach(d => selDepto.innerHTML += `<option value="${d.id}">${d.nombre}</option>`);
                                    selDepto.value = ciudad.idDepartamento;
                                    fetch(`${API_CIUDAD}/departamento/${ciudad.idDepartamento}`)
                                        .then(r => r.json())
                                        .then(ciudades => {
                                            const selCiudad = document.getElementById("idCiudad");
                                            selCiudad.innerHTML = '<option value="">-- Seleccione una ciudad --</option>';
                                            ciudades.forEach(c => selCiudad.innerHTML += `<option value="${c.id}">${c.nombre}</option>`);
                                            selCiudad.value = a.idCiudad;
                                        });
                                });
                        });
                });

            editando   = true;
            idEditando = id;
            document.getElementById("form-titulo").textContent = "Editando Apartamento #" + id;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}

// ── ELIMINAR ─────────────────────────────────────────────
function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar este apartamento?")) return;
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => { if (!res.ok) throw new Error("No se pudo eliminar."); listar(); })
        .catch(err => alert("Error: " + err.message));
}

// ── LIMPIAR FORMULARIO ────────────────────────────────────
function limpiar() {
    document.getElementById("idPropietario").value  = "";
    document.getElementById("filtroPaisForm").value = "";
    document.getElementById("filtroDepartamentoForm").innerHTML = '<option value="">-- Seleccione un departamento --</option>';
    document.getElementById("idCiudad").innerHTML   = '<option value="">-- Seleccione una ciudad --</option>';
    document.getElementById("direccion").value      = "";
    document.getElementById("numeroHabitacion").value = "";
    document.getElementById("pagoMensual").value    = "";
    document.getElementById("estado").value         = "";
    editando   = false;
    idEditando = null;
    document.getElementById("form-titulo").textContent = "Nuevo Apartamento";
}
