const API            = "http://localhost:5052/pagoContrato";
const API_CONTRATO   = "http://localhost:5052/contrato";
const API_FORMAPAGO  = "http://localhost:5052/formaPago";

let editando    = false;
let idEditando  = null;
let contratos   = [];
let formasPago  = [];

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([cargarContratos(), cargarFormasPago()])
        .then(() => listar());
});

// ── CARGAR COMBOS ─────────────────────────────────────────
function cargarContratos() {
    return fetch(API_CONTRATO)
        .then(r => r.json())
        .then(data => {
            contratos = data;
            const sel = document.getElementById("idContrato");
            sel.innerHTML = '<option value="">-- Seleccione un contrato --</option>';
            data.forEach(c => {
                sel.innerHTML += `<option value="${c.id}">Contrato #${c.id} (Cliente ID ${c.idCliente})</option>`;
            });
        })
        .catch(() => console.error("No se pudieron cargar los contratos."));
}

function cargarFormasPago() {
    return fetch(API_FORMAPAGO)
        .then(r => r.json())
        .then(data => {
            formasPago = data;
            const sel = document.getElementById("idFormaPago");
            sel.innerHTML = '<option value="">-- Seleccione forma de pago --</option>';
            data.forEach(f => {
                sel.innerHTML += `<option value="${f.id}">${f.descripcion}</option>`;
            });
        })
        .catch(() => console.error("No se pudieron cargar las formas de pago."));
}

function getNombreContrato(id) {
    const c = contratos.find(x => x.id == id);
    return c ? `Contrato #${c.id}` : "ID " + id;
}

function getNombreFormaPago(id) {
    const f = formasPago.find(x => x.id == id);
    return f ? f.descripcion : "ID " + id;
}

function formatFecha(dt) {
    if (!dt) return "—";
    return new Date(dt).toLocaleDateString("es-CO", { year: "numeric", month: "2-digit", day: "2-digit" });
}

// ── LISTAR ────────────────────────────────────────────────
function listar() {
    fetch(API)
        .then(r => { if (!r.ok) throw new Error("Error " + r.status); return r.json(); })
        .then(data => {
            let filas = "";
            data.forEach(p => {
                filas += `
                <tr>
                    <td>${p.id}</td>
                    <td>${getNombreContrato(p.idContrato)}</td>
                    <td>${getNombreFormaPago(p.idFormaPago)}</td>
                    <td>${formatFecha(p.fechaPago)}</td>
                    <td>$${Number(p.valor).toLocaleString("es-CO")}</td>
                    <td>
                        <div class="acciones">
                            <button class="btn-editar"   onclick="cargarEdicion(${p.id})">✏ Editar</button>
                            <button class="btn-eliminar" onclick="eliminar(${p.id})">🗑 Eliminar</button>
                        </div>
                    </td>
                </tr>`;
            });
            document.getElementById("tabla").innerHTML =
                filas || `<tr><td colspan="6">No hay pagos de contrato registrados.</td></tr>`;
        })
        .catch(err => alert("Error al cargar pagos:\n" + err.message));
}

// ── GUARDAR / ACTUALIZAR ─────────────────────────────────
function guardar() {
    const idContrato  = document.getElementById("idContrato").value;
    const idFormaPago = document.getElementById("idFormaPago").value;
    const fechaPago   = document.getElementById("fechaPago").value;
    const valor       = document.getElementById("valor").value;

    if (!idContrato || !idFormaPago || !fechaPago || !valor) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const pago = {
        idContrato:  parseInt(idContrato),
        idFormaPago: parseInt(idFormaPago),
        fechaPago:   fechaPago + ":00",
        valor:       parseFloat(valor)
    };

    const metodo = editando ? "PUT" : "POST";
    const url    = editando ? `${API}/${idEditando}` : API;

    fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pago)
    })
    .then(res => { if (!res.ok) return res.text().then(t => { throw new Error(t || "Error " + res.status); }); return res.json(); })
    .then(() => { limpiar(); listar(); })
    .catch(err => alert("Error al guardar:\n" + err.message));
}

// ── CARGAR DATOS PARA EDITAR ─────────────────────────────
function cargarEdicion(id) {
    fetch(`${API}/${id}`)
        .then(r => r.json())
        .then(p => {
            document.getElementById("idContrato").value  = p.idContrato;
            document.getElementById("idFormaPago").value = p.idFormaPago;
            document.getElementById("fechaPago").value   = p.fechaPago ? p.fechaPago.substring(0, 16) : "";
            document.getElementById("valor").value       = p.valor;
            editando   = true;
            idEditando = id;
            document.getElementById("form-titulo").textContent = "Editando Pago #" + id;
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}

// ── ELIMINAR ─────────────────────────────────────────────
function eliminar(id) {
    if (!confirm("¿Seguro que deseas eliminar este pago?")) return;
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(res => { if (!res.ok) throw new Error("No se pudo eliminar."); listar(); })
        .catch(err => alert("Error: " + err.message));
}

// ── LIMPIAR FORMULARIO ────────────────────────────────────
function limpiar() {
    document.getElementById("idContrato").value  = "";
    document.getElementById("idFormaPago").value = "";
    document.getElementById("fechaPago").value   = "";
    document.getElementById("valor").value       = "";
    editando   = false;
    idEditando = null;
    document.getElementById("form-titulo").textContent = "Nuevo Pago de Contrato";
}
