const API             = "http://localhost:5052/ciudad";
const API_PAIS        = "http://localhost:5052/pais";
const API_DEPARTAMENTO = "http://localhost:5052/departamento";

let editando   = false;
let idEditando = null;
let departamentos = []; // cache para mostrar nombre en tabla

document.addEventListener("DOMContentLoaded", () => {
    cargarPaises();
    listar();
});

// ── CARGAR COMBO PAÍSES ──────────────────────────────────
function cargarPaises() {
    fetch(API_PAIS)
        .then(res => res.json())
        .then(data => {
            // Combo del formulario
            const selectPaisForm = document.getElementById("idPais");
            selectPaisForm.innerHTML = '<option value="">-- Seleccione un país --</option>';
            data.forEach(p => {
                selectPaisForm.innerHTML += `<option value="${p.id}">${p.nombre}</option>`;
            });

            // Combo del filtro de tabla
            const selectPaisFiltro = document.getElementById("filtroPais");
            selectPaisFiltro.innerHTML = '<option value="">-- Todos los países --</option>';
            data.forEach(p => {
                selectPaisFiltro.innerHTML += `<option value="${p.id}">${p.nombre}</option>`;
            });
        })
        .catch(() => console.error("No se pudieron cargar los países."));
}

// ── CARGAR DEPARTAMENTOS SEGÚN PAÍS (formulario) ─────────
function cargarDepartamentosForm() {
    const idPais = document.getElementById("idPais").value;
    const selectDepto = document.getElementById("idDepartamento");
    selectDepto.innerHTML = '<option value="">-- Seleccione un departamento --</option>';

    if (!idPais) return;

    fetch(`${API_DEPARTAMENTO}/pais/${idPais}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(d => {
                selectDepto.innerHTML += `<option value="${d.id}">${d.nombre}</option>`;
            });
        })
        .catch(() => console.error("No se pudieron cargar los departamentos."));
}

// ── CARGAR DEPARTAMENTOS SEGÚN PAÍS (filtro tabla) ───────
function cargarDepartamentosFiltro() {
    const idPais = document.getElementById("filtroPais").value;
    const selectDepto = document.getElementById("filtroDepartamento");
    selectDepto.innerHTML = '<option value="">-- Todos los departamentos --</option>';

    if (!idPais) {
        listar();
        return;
    }

    fetch(`${API_DEPARTAMENTO}/pais/${idPais}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(d => {
                selectDepto.innerHTML += `<option value="${d.id}">${d.nombre}</option>`;
            });
            listar();
        })
        .catch(() => console.error("No se pudieron cargar los departamentos."));
}

function getNombreDepartamento(idDepto) {
    const d = departamentos.find(x => x.id == idDepto);
    return d ? d.nombre : idDepto;
}

// ── LISTAR (con filtro opcional por departamento) ────────
function listar() {
    const idDeptFiltro = document.getElementById("filtroDepartamento").value;
    const url = idDeptFiltro ? `${API}/departamento/${idDeptFiltro}` : API;

    // Cargar todos los departamentos para el cache de nombres
    fetch(API_DEPARTAMENTO)
        .then(res => res.json())
        .then(deptos => {
            departamentos = deptos;
            return fetch(url);
        })
        .then(res => res.json())
        .then(data => {
            let filas = "";
            data.forEach(c => {
                filas += `
                <tr>
                    <td>${c.id}</td>
                    <td>${getNombreDepartamento(c.idDepartamento)}</td>
                    <td>${c.nombre}</td>
                    <td>
                        <div class="acciones">
                            <button class="btn-editar"   onclick="cargarEdicion(${c.id})">✏ Editar</button>
                            <button class="btn-eliminar" onclick="eliminar(${c.id})">🗑 Eliminar</button>
                        </div>
                    </td>
                </tr>`;
            });
            document.getElementById("tabla").innerHTML =
                filas || `<tr><td colspan="4">No hay ciudades registradas.</td></tr>`;
        })
        .catch(() => alert("Error al conectar con el servidor."));
}

// ── GUARDAR / ACTUALIZAR ─────────────────────────────────
function guardar() {
    const idDepartamento = document.getElementById("idDepartamento").value;
    const nombre         = document.getElementById("nombre").value.trim();

    if (!idDepartamento || !nombre) {
        alert("El departamento y el nombre de la ciudad son obligatorios.");
        return;
    }

    const ciudad = { idDepartamento: parseInt(idDepartamento), nombre };
    const metodo = editando ? "PUT" : "POST";
    const url    = editando ? `${API}/${idEditando}` : API;

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ciudad)
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
        .then(c => {
            // Primero buscar el departamento para saber su país
            fetch(`${API_DEPARTAMENTO}/${c.idDepartamento}`)
                .then(res => res.json())
                .then(depto => {
                    // Seleccionar el país en el combo
                    document.getElementById("idPais").value = depto.idPais;
                    // Cargar departamentos de ese país y luego seleccionar el correcto
                    fetch(`${API_DEPARTAMENTO}/pais/${depto.idPais}`)
                        .then(res => res.json())
                        .then(deptos => {
                            const selectDepto = document.getElementById("idDepartamento");
                            selectDepto.innerHTML = '<option value="">-- Seleccione un departamento --</option>';
                            deptos.forEach(d => {
                                selectDepto.innerHTML += `<option value="${d.id}">${d.nombre}</option>`;
                            });
                            selectDepto.value = c.idDepartamento;
                        });
                });

            document.getElementById("nombre").value = c.nombre;
            editando   = true;
            idEditando = id;
            document.getElementById("form-titulo").textContent = "Editando Ciudad #" + id;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}

// ── ELIMINAR ─────────────────────────────────────────────
function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar esta ciudad?")) return;

    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) throw new Error("No se pudo eliminar.");
            listar();
        })
        .catch(err => alert("Error: " + err.message));
}

// ── LIMPIAR FORMULARIO ────────────────────────────────────
function limpiar() {
    document.getElementById("idPais").value         = "";
    document.getElementById("idDepartamento").innerHTML = '<option value="">-- Seleccione un departamento --</option>';
    document.getElementById("nombre").value         = "";
    editando   = false;
    idEditando = null;
    document.getElementById("form-titulo").textContent = "Nueva Ciudad";
}
