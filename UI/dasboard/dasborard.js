import { fetchVehicles } from "/domain/ViewModel.js";
import { Iframe } from "/domain/UI.js";

const productos = document.getElementById("productos");

const filtroTransmision = document.getElementById("filtroTransmision");
const filtroAnio = document.getElementById("filtroAnio");
const filtroMarca = document.getElementById("filtroMarca");
const filtroModelo = document.getElementById("filtroModelo");
const btnFiltrar = document.getElementById("btnFiltrar");
const btnLimpiar = document.getElementById("btnLimpiar");

let catalogo = [];

document.addEventListener("DOMContentLoaded", () => {
    getcatalogo();
});


async function getcatalogo() {
    productos.innerHTML = `<p style="margin-left:16px;">Cargando...</p>`;

    try {
        const data = await fetchVehicles();
        console.log("Catalogo Vehiculos: ", data);
        productos.innerHTML = "";

        if (!data || data.length === 0) {
            productos.innerHTML = `<p style="margin-left:16px;">No hay vehículos 😭</p>`;
            return;
        }

        catalogo = data;

        llenarFiltroAnios(data);
        llenarFiltroMarcas(data);
        llenarFiltroModelos(data);

        renderCatalogo(data);

    } catch (error) {
        productos.innerHTML = `<p style="color:red; margin-left:16px;">Error cargando vehículos</p>`;
        console.error(error);
    }
}

function renderCatalogo(data) {
    productos.innerHTML = "";

    if (!data || data.length === 0) {
        productos.innerHTML = `<p style="margin-left:16px;">No hay resultados 😭</p>`;
        return;
    }

    data.forEach(v => {
        const item = document.createElement("div");
        item.classList.add("card");
        item.style.padding = "0";

        item.innerHTML = `
            <img style="width: 100%; height: 50%;" src="${v.img}" alt="">
            <div style="border-bottom: solid lightgray 1px; padding: 8px;">
                <div style="display: flex; justify-content: space-between;">
                    <p style="padding: 4px; border: 1px solid lightgray; border-radius: 8px;">${v.type}</p>
                    <p style="padding: 4px; border: 1px solid lightgray; border-radius: 8px;">${v.condition}</p>
                </div>
                <h2 style="margin: 0; color: #143c62;">${v.brand} ${v.model}</h2>
                <p class="textsecundario">${v.year} - ${v.km}km</p>
                <p class="textsecundario">${v.transmission} - ${v.fuel}</p>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 12px;">
                <h2 style="margin: 0; color: #143c62;">$ ${v.price}</h2>
                <button class="btn" onclick="verDetalles(${v.id})">Ver Detalles</button>
            </div>
        `;

        productos.appendChild(item);
    });
}

function llenarFiltroAnios(data) {
    const anios = [...new Set(data.map(v => v.year))].sort((a, b) => b - a);

    anios.forEach(a => {
        const op = document.createElement("option");
        op.value = a;
        op.textContent = a;
        filtroAnio.appendChild(op);
    });
}

function llenarFiltroMarcas(data) {
    const marcas = [...new Set(data.map(v => v.brand))].sort();

    marcas.forEach(m => {
        const op = document.createElement("option");
        op.value = m;
        op.textContent = m;
        filtroMarca.appendChild(op);
    });
}


function llenarFiltroModelos(data) {
    const modelos = [...new Set(data.map(v => v.model))].sort();

    modelos.forEach(m => {
        const op = document.createElement("option");
        op.value = m;
        op.textContent = m;
        filtroModelo.appendChild(op);
    });
}

btnFiltrar.addEventListener("click", () => {
    const trans = filtroTransmision.value;
    const anio = filtroAnio.value;
    const marca = filtroMarca.value;
    const modelo = filtroModelo.value;

    let filtrado = catalogo;

    if (trans) filtrado = filtrado.filter(v => v.transmission === trans);
    if (anio) filtrado = filtrado.filter(v => v.year == anio);
    if (marca) filtrado = filtrado.filter(v => v.brand === marca);
    if (modelo) filtrado = filtrado.filter(v => v.model === modelo);

    renderCatalogo(filtrado);
});

btnLimpiar.addEventListener("click", () => {
    filtroTransmision.value = "";
    filtroAnio.value = "";
    filtroMarca.value = "";
    filtroModelo.value = "";

    renderCatalogo(catalogo);
});


window.verDetalles = function (id) {
    Iframe(`UI/detalles/detalles.html?id=${id}`);
};
