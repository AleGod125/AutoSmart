  import { fetchVehicles } from "/domain/ViewModel.js";

    document.addEventListener("DOMContentLoaded", async () => {

        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        if (!id) {
            alert("Error: no se encontró el vehículo");
            return;
        }

        const data = await fetchVehicles();

        const vehiculo = data.find(v => v.id == id);

        if (!vehiculo) {
            alert("Vehículo no encontrado");
            return;
        }

        document.getElementById("img").src = vehiculo.img;
        document.getElementById("nombre").textContent = `${vehiculo.brand} ${vehiculo.model}`;
        document.getElementById("precio").textContent = `$ ${vehiculo.price}`;
        document.getElementById("descripcion").textContent = vehiculo.descripcion;

        document.getElementById("tipo").textContent = vehiculo.type;
        document.getElementById("marca").textContent = vehiculo.brand;
        document.getElementById("modelo").textContent = vehiculo.model;
        document.getElementById("ano").textContent = vehiculo.year;
        document.getElementById("km").textContent = vehiculo.km;
        document.getElementById("transmision").textContent = vehiculo.transmission;
        document.getElementById("combustible").textContent = vehiculo.fuel;
        document.getElementById("condicion").textContent = vehiculo.condition;
    });