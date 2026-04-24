const API      = "http://localhost:5052/departamento";
const API_PAIS = "http://localhost:5052/pais";

let editando   = false;
let idEditando = null;
let paises     = []; // cache de países

document.addEventListener("DOMContentLoaded", () => {
    cargarPaises();
    listar();
});

// ── CARGAR COMBO PAÍSES ──────────────────────────────────
function cargarPaises() {
    fetch(API_PAIS)
        .then(res => res.json())
        .then(data => {
            paises = data;

            // Combo del formulario
            const selectForm = document.getElementById("idPais");
            selectForm.innerHTML = '<option value="">-- Seleccione un país --</option>';
            data.forEach(p => {
                selectForm.innerHTML += `<option value="${p.id}">${p.nombre}</option>`;
            });

            // Combo del filtro de tabla
            const selectFiltro = document.getElementById("filtroPais");
            selectFiltro.innerHTML = '<option value="">-- Todos --</option>';
            data.forEach(p => {
                selectFiltro.innerHTML += `<option value="${p.id}">${p.nombre}</option>`;
            });
        })
        .catch(() => console.error("No se pudieron cargar los países."));
}

function getNombrePais(idPais) {
    const p = paises.find(x => x.id == idPais);
    return p ? p.nombre : idPais;
}

// ── LISTAR (con filtro opcional por país) ────────────────
function listar() {
    const idPaisFiltro = document.getElementById("filtroPais").value;
    const url = idPaisFiltro ? `${API}/pais/${idPaisFiltro}` : API;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let filas = "";
            data.forEach(d => {
                filas += `
                <tr>
                    <td>${d.id}</td>
                    <td>${getNombrePais(d.idPais)}</td>
                    <td>${d.nombre}</td>
                    <td>
                        <div class="acciones">
                            <button class="btn-editar"   onclick="cargarEdicion(${d.id})">✏ Editar</button>
                            <button class="btn-eliminar" onclick="eliminar(${d.id})">🗑 Eliminar</button>
                        </div>
                    </td>
                </tr>`;
            });
            document.getElementById("tabla").innerHTML =
                filas || `<tr><td colspan="4">No hay departamentos registrados.</td></tr>`;
        })
        .catch(() => alert("Error al conectar con el servidor."));
}

// ── FILTRAR TABLA AL CAMBIAR PAÍS EN FORMULARIO ──────────
// (solo actualiza la tabla si no estamos editando)
function filtrarPorPais() {
    if (!editando) {
        const idPais = document.getElementById("idPais").value;
        document.getElementById("filtroPais").value = idPais;
        listar();
    }
}

// ── GUARDAR / ACTUALIZAR ─────────────────────────────────
function guardar() {
    const idPais = document.getElementById("idPais").value;
    const nombre = document.getElementById("nombre").value.trim();

    if (!idPais || !nombre) {
        alert("El país y el nombre del departamento son obligatorios.");
        return;
    }

    const departamento = { idPais: parseInt(idPais), nombre };
    const metodo = editando ? "PUT" : "POST";
    const url    = editando ? `${API}/${idEditando}` : API;

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(departamento)
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
        .then(d => {
            document.getElementById("idPais").value = d.idPais;
            document.getElementById("nombre").value = d.nombre;
            editando   = true;
            idEditando = id;
            document.getElementById("form-titulo").textContent = "Editando Departamento #" + id;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}

// ── ELIMINAR ─────────────────────────────────────────────
function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar este departamento?\nSe eliminarán también sus ciudades.")) return;

    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) throw new Error("No se pudo eliminar. Puede tener registros relacionados.");
            listar();
        })
        .catch(err => alert("Error: " + err.message));
}

// ── LIMPIAR FORMULARIO ────────────────────────────────────
function limpiar() {
    document.getElementById("idPais").value = "";
    document.getElementById("nombre").value = "";
    editando   = false;
    idEditando = null;
    document.getElementById("form-titulo").textContent = "Nuevo Departamento";
}
