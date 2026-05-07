const API             = "http://localhost:5052/contrato";
const API_CLIENTE     = "http://localhost:5052/cliente";
const API_PERSONA     = "http://localhost:5052/persona";
const API_APARTAMENTO = "http://localhost:5052/apartamento";

let editando   = false;
let idEditando = null;
let clientes      = [];
let apartamentos  = [];

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        cargarClientes(),
        cargarApartamentos()
    ]).then(() => listar());
});

function cargarClientes() {
    return Promise.all([
        fetch(API_CLIENTE).then(r => r.json()),
        fetch(API_PERSONA).then(r => r.json())
    ]).then(([clis, personas]) => {
        clientes = clis.map(c => {
            const per = personas.find(x => x.id == c.idPersona);
            return { id: c.id, nombre: per ? (per.nombre + " " + per.apellido) : "ID " + c.idPersona };
        });
        const sel = document.getElementById("idCliente");
        sel.innerHTML = '<option value="">-- Seleccione un cliente --</option>';
        clientes.forEach(c => sel.innerHTML += `<option value="${c.id}">${c.nombre}</option>`);
    }).catch(() => console.error("No se pudieron cargar los clientes."));
}

function cargarApartamentos() {
    return fetch(API_APARTAMENTO)
        .then(r => r.json())
        .then(data => {
            apartamentos = data; // guarda todos para mostrar en tabla
            const sel = document.getElementById("idApartamento");
            sel.innerHTML = '<option value="">-- Seleccione un apartamento --</option>';
            // en el combo solo los libres
            data.filter(a => !a.estado).forEach(a => {
                sel.innerHTML += `<option value="${a.id}">${a.direccion} (ID ${a.id})</option>`;
            });
        });
}
function getNombreCliente(id) {
    const c = clientes.find(x => x.id == id);
    return c ? c.nombre : "ID " + id;
}

function getDireccionApartamento(id) {
    const a = apartamentos.find(x => x.id == id);
    return a ? a.direccion : "ID " + id;
}

function formatFecha(dt) {
    if (!dt) return "—";
    return new Date(dt).toLocaleDateString("es-CO", { year: "numeric", month: "2-digit", day: "2-digit" });
}

// ── LISTAR ────────────────────────────────────────────────
function listar() {
    fetch(API)
        .then(r => { if (!r.ok) throw new Error("Error del servidor: " + r.status); return r.json(); })
        .then(data => {
            let filas = "";
            data.forEach(c => {
                filas += `
                <tr>
                    <td>${c.id}</td>
                    <td>${getNombreCliente(c.idCliente)}</td>
                    <td>${getDireccionApartamento(c.idApartamento)}</td>
                    <td>${formatFecha(c.fechaInicio)}</td>
                    <td>${formatFecha(c.fechaFin)}</td>
                    <td>$${Number(c.valorMensual).toLocaleString("es-CO")}</td>
                    <td>${c.observacion || "—"}</td>
                    <td>
                        <div class="acciones">
                            <button class="btn-editar"   onclick="cargarEdicion(${c.id})">✏ Editar</button>
                            <button class="btn-eliminar" onclick="eliminar(${c.id})">🗑 Eliminar</button>
                        </div>
                    </td>
                </tr>`;
            });
            document.getElementById("tabla").innerHTML =
                filas || `<tr><td colspan="8">No hay contratos registrados.</td></tr>`;
        })
        .catch(err => alert("Error al cargar contratos:\n" + err.message));
}

// ── GUARDAR / ACTUALIZAR ─────────────────────────────────
function guardar() {
    const idCliente     = document.getElementById("idCliente").value;
    const idApartamento = document.getElementById("idApartamento").value;
    const fechaInicio   = document.getElementById("fechaInicio").value;
    const fechaFin      = document.getElementById("fechaFin").value;
    const valorMensual  = document.getElementById("valorMensual").value;
    const observacion   = document.getElementById("observacion").value.trim();

    if (!idCliente || !idApartamento || !fechaInicio || !valorMensual) {
        alert("Los campos Cliente, Apartamento, Fecha Inicio y Valor Mensual son obligatorios.");
        return;
    }

    const contrato = {
        idCliente: parseInt(idCliente),
        idApartamento: parseInt(idApartamento),
        fechaInicio: fechaInicio || null,
        fechaFin: fechaFin || null,
        valorMensual: parseFloat(valorMensual),
        observacion: observacion || null
    };

    const metodo = editando ? "PUT" : "POST";
    const url    = editando ? `${API}/${idEditando}` : API;

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contrato)
    })
    .then(res => { if (!res.ok) return res.text().then(t => { throw new Error(t || "Error " + res.status); }); return res.json(); })
    .then(() => { limpiar(); listar(); })
    .catch(err => alert("Error al guardar contrato:\n" + err.message));
}

// ── CARGAR DATOS PARA EDITAR ─────────────────────────────
function cargarEdicion(id) {
    fetch(`${API}/${id}`)
        .then(r => r.json())
        .then(c => {
            document.getElementById("idCliente").value     = c.idCliente;
            document.getElementById("idApartamento").value = c.idApartamento;
            // Formatear fecha para el input datetime-local
            document.getElementById("fechaInicio").value  = c.fechaInicio ? c.fechaInicio.substring(0, 16) : "";
            document.getElementById("fechaFin").value     = c.fechaFin ? c.fechaFin.substring(0, 16) : "";
            document.getElementById("valorMensual").value = c.valorMensual;
            document.getElementById("observacion").value  = c.observacion || "";
            editando   = true;
            idEditando = id;
            document.getElementById("form-titulo").textContent = "Editando Contrato #" + id;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}

// ── ELIMINAR ─────────────────────────────────────────────
function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar este contrato?")) return;
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => { if (!res.ok) throw new Error("No se pudo eliminar."); listar(); })
        .catch(err => alert("Error: " + err.message));
}

// ── LIMPIAR FORMULARIO ────────────────────────────────────
function limpiar() {
    document.getElementById("idCliente").value     = "";
    document.getElementById("idApartamento").value = "";
    document.getElementById("fechaInicio").value   = "";
    document.getElementById("fechaFin").value      = "";
    document.getElementById("valorMensual").value  = "";
    document.getElementById("observacion").value   = "";
    editando   = false;
    idEditando = null;
    document.getElementById("form-titulo").textContent = "Nuevo Contrato";
}
