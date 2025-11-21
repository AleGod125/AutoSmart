import { fetchPendingVehicles, approveVehicule, fetchVehicles, fetchSales  } from "/domain/ViewModel.js";

const radios = document.querySelectorAll('input[name="nav"]');

const inventario = document.getElementById("inventario")
const numInv = document.getElementById("numInv")
const InvList = document.getElementById("inv-list")

const pendiente = document.getElementById("pendiente")
const PendienteList = document.getElementById("pendiente-list");
const numPendientes = document.getElementById("numPendientes")

const Factura = document.getElementById("Factura")
const InvFactura = document.getElementById("Ventas-list")
const numF = document.getElementById("numF")



const secciones = [pendiente, inventario,Factura];

const fila = document.createElement("div");
fila.classList.add("fila");

document.addEventListener("DOMContentLoaded", () => {

    secciones.forEach(sec => sec.style.display = "none");
    inventario.style.display = "block";
    document.querySelector('input[value="Inventario"]').checked = true;

    cargarPendientes();
    cargarVehicule();
    cargarVentas();

});


radios.forEach(radio => {
    radio.addEventListener("change", () => {
        console.log("Seleccionaste:", radio.value);

        secciones.forEach(sec => sec.style.display = "none");

        switch (radio.value) {
            case "Pendientes":
                pendiente.style.display = "block";
                break;

            case "Inventario":
                inventario.style.display = "block";
                break;

            case "Facturas":
                Factura.style.display = "block";
                break;

            default:
                break;
        }
    });
});

async function cargarVehicule() {
    InvList.innerHTML = `<p style="margin-left:16px;">Cargando...</p>`;

    try {
        const data = await fetchVehicles();
        numInv.textContent = data.length;
        InvList.innerHTML = "";

        if (!data || data.length === 0) {
            InvList.innerHTML = `<p style="margin-left:16px;">No hay vehículos 😭</p>`;
            return;
        }

        data.forEach(v => {
            const fila = document.createElement("div");  // ← NUEVA FILA
            fila.classList.add("fila");

            fila.innerHTML = `
                <img style="margin: 14px;" src="${v.img}" width="70">
                <p style="margin-right: 7%;">${v.brand} ${v.model}</p>
                <p>${v.type || "N/A"}</p>
                <p>${v.year}</p>
                <p>$${v.price}</p>
                <p>${v.condition}</p>

                <button style="margin-right: 4%;" class="btn-approve">👁️</button>
            `;

            InvList.appendChild(fila);
        });

    } catch (error) {
        InvList.innerHTML = `<p style="color:red; margin-left:16px;">Error cargando vehículos</p>`;
        console.error(error);
    }
}


async function cargarPendientes() {
    PendienteList.innerHTML = `<p style="margin-left:16px;">Cargando...</p>`;

    try {
        const data = await fetchPendingVehicles();
        numPendientes.textContent = data.length;
        PendienteList.innerHTML = "";

        if (!data || data.length === 0) {
            PendienteList.innerHTML = `<p style="margin-left:16px;">No hay vehículos pendientes 🎉</p>`;
            return;
        }

        data.forEach(v => {
            const fila = document.createElement("div"); // ← NUEVA FILA
            fila.classList.add("fila");

            fila.innerHTML = `
                <img style="margin: 14px;" src="${v.img}" width="70">
                <p style="margin-right: 7%;">${v.brand} ${v.model}</p>
                <p style="margin-right: 6%;">${v.propietario?.name || "N/A"}</p>
                <p>${v.type}</p>
                <p>${v.year}</p>
                <p>$${v.price}</p>

                <button class="btn-approve" onclick="aprobar(${v.id})">✅</button>
                <button class="btn-decline" onclick="rechazar(${v.id})">❌</button>
            `;

            PendienteList.appendChild(fila);
        });

    } catch (error) {
        PendienteList.innerHTML = `<p style="color:red; margin-left:16px;">Error cargando vehículos</p>`;
        console.error(error);
    }
}

async function cargarVentas() {
    InvFactura.innerHTML = `<p style="margin-left:16px;">Cargando...</p>`;

    try {
        const data = await fetchSales();
        numF.textContent = data.length;
        InvFactura.innerHTML = "";

        if (!data || data.length === 0) {
            InvFactura.innerHTML = `<p style="margin-left:16px;">No hay vehículos pendientes 🎉</p>`;
            return;
        }

        data.forEach(v => {
            const fila = document.createElement("div"); 
            fila.classList.add("fila");

            fila.innerHTML = `
                <p style="margin-left: 16px;">${v.invoice_number}</p>
                <p style="margin-left: 10%;">${v.vehicle}</p>
                <p style="margin-left: 2%;">${v.buyer}</p>
                <p>${new Date(v.date).toLocaleDateString()}</p>
                <p>${v.payment_method}</p>
                <p>$${v.amount}</p>
                <button class="btn-approve">👁️</button>
            `;

            InvFactura.appendChild(fila);
        });

    } catch (error) {
        InvFactura.innerHTML = `<p style="color:red; margin-left:16px;">Error cargando vehículos</p>`;
        console.error(error);
    }
}

window.aprobar = async function (id) {
    try {
        await approveVehicule(id);
        alert("Vehículo aprobado ✔️");
        cargarPendientes();
    } catch (err) {
        alert("Error al aprobar el vehículo");
        console.error(err);
    }
};

window.rechazar = function (id) {
    alert("Función de rechazar aún no está implementada ❌");
};

