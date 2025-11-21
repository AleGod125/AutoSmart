import { fetchVehicles } from "/domain/ViewModel.js";
import { Iframe } from "/domain/UI.js";


const productos = document.getElementById("productos");

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
            productos.innerHTML = `
                <p style="margin-left:16px;">No hay vehículos 😭</p>
            `;
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

    } catch (error) {
        productos.innerHTML = `
            <p style="color:red; margin-left:16px;">Error cargando vehículos</p>
        `;
        console.error(error);
    }
}

window.verDetalles = function (id) {
    Iframe(`UI/detalles/detalles.html?id=${id}`);
};
