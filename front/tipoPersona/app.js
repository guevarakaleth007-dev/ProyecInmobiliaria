const API = "http://localhost:5052/tipopersona";

let editando = false;
let idEditando = null;

// LISTAR
function listar() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            let tabla = "";
            data.forEach(item => {
                tabla += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.descripcion}</td>
                        <td>
                            <button class="btn-editar" onclick="editar(${item.id}, '${item.descripcion}')">Editar</button>
                            <button class="btn-eliminar" onclick="eliminar(${item.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
            document.getElementById("tabla").innerHTML = tabla;
        });
}

// GUARDAR / ACTUALIZAR
function guardar() {
    const descripcion = document.getElementById("descripcion").value;

    let metodo = editando ? "PUT" : "POST";
    let url = editando ? `${API}/${idEditando}` : API;

    fetch(url, {
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ descripcion })
    })
    .then(() => {
        limpiar();
        listar();
    });
}

// EDITAR
function editar(id, descripcion) {
    document.getElementById("descripcion").value = descripcion;
    editando = true;
    idEditando = id;
}

// ELIMINAR
function eliminar(id) {
    if (confirm("¿Seguro que quieres eliminar?")) {
        fetch(`${API}/${id}`, {
            method: "DELETE"
        })
        .then(() => listar());
    }
}

// LIMPIAR
function limpiar() {
    document.getElementById("descripcion").value = "";
    editando = false;
    idEditando = null;
}

// AUTO CARGA
listar();