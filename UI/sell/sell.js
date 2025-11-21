import { saveVehicule, convertToBase64 } from "/domain/ViewModel.js";

const typeSelect = document.getElementById("vehicle_type");
const brandInput = document.getElementById("marca");
const modelInput = document.getElementById("Modelo");
const yearInput = document.getElementById("year");
const engineInput = document.getElementById("motor");
const kmInput = document.getElementById("Km");
const priceInput = document.getElementById("precie");
const fuelSelect = document.getElementById("conbustible");
const transSelect = document.getElementById("trasmision");
const descripcionInput = document.getElementById("Descripcion");
const radioNuevo = document.getElementById("radioDefault1");
const radioUsado = document.getElementById("radioDefault2");
const btnSubmit = document.getElementById("btnEnviar");
const fileInput = document.getElementById("img");
const uploadBox = document.querySelector(".upload-box");

let selectedFiles = []; 
const previewContainer = document.createElement("div");
previewContainer.style.display = "flex";
previewContainer.style.flexWrap = "wrap";
previewContainer.style.marginTop = "10px";
uploadBox.appendChild(previewContainer);

document.addEventListener("DOMContentLoaded", () => {
    formatNumberInput(kmInput);
    formatNumberInput(priceInput);

    typeSelect.addEventListener("change", (e) => {
        const type = e.target.value;
        engineInput.placeholder = type === "Moto" ? "cc (Ej: 150, 200, 650)" : "L (Ej: 1.6, 2.0, 5.0)";
    });

    fileInput.addEventListener("change", () => {
        selectedFiles = [...fileInput.files];
        renderPreview();
    });

    btnSubmit.addEventListener("click", enviarFormulario);
});

async function enviarFormulario() {
    try {
        if (selectedFiles.length === 0) {
            alert("Debes subir al menos una imagen");
            return;
        }

        const type = typeSelect.value;
        const brand = brandInput.value.trim();
        const model = modelInput.value.trim();
        const year = Number(yearInput.value);
        const engine_size = Number(engineInput.value);
        const km = Number(kmInput.value.replace(/\./g, ""));
        const price = parseFloat(priceInput.value.replace(/\./g, "")).toFixed(2);
        if (isNaN(price)) {
            alert("Precio inválido");
            return;
        }

        const fuel = fuelSelect.options[fuelSelect.selectedIndex].text;
        const transmission = transSelect.options[transSelect.selectedIndex].text;
        const descripcion = descripcionInput.value.trim();
        const propietario_id = Number(localStorage.getItem("userid")) || 1;
        const condition = radioNuevo.checked ? "Nuevo" : "Usado";

        const images = await Promise.all(selectedFiles.map(file => convertToBase64(file)));

        const payload = {
            type,
            brand,
            model,
            year,
            engine_size,
            fuel,
            transmission,
            km,
            condition,
            price,
            propietario_id,
            descripcion,
            images: images.map(url => ({ url }))
        };

        console.log("Payload enviado:", payload);

        const result = await saveVehicule(payload);
        alert("Vehículo publicado correctamente");
        console.log("Servidor:", result);

        limpiarFormulario();
    } catch (err) {
        console.error(err);
        alert(err.message || "Error al enviar el vehículo");
    }
}

function formatNumberInput(input) {
    input.addEventListener("input", () => {
        let value = input.value.replace(/\D/g, "");
        input.value = value === "" ? "" : new Intl.NumberFormat("es-CO").format(value);
    });
}

function renderPreview() {
    previewContainer.innerHTML = "";
    selectedFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const wrapper = document.createElement("div");
            wrapper.style.position = "relative";
            wrapper.style.marginRight = "10px";
            wrapper.style.marginBottom = "10px";

            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.width = "80px";
            img.style.height = "80px";
            img.style.objectFit = "cover";
            img.style.border = "1px solid #ccc";
            img.style.borderRadius = "4px";

            const btnRemove = document.createElement("button");
            btnRemove.textContent = "✕";
            btnRemove.style.position = "absolute";
            btnRemove.style.top = "-5px";
            btnRemove.style.right = "-5px";
            btnRemove.style.background = "red";
            btnRemove.style.color = "white";
            btnRemove.style.border = "none";
            btnRemove.style.borderRadius = "50%";
            btnRemove.style.width = "20px";
            btnRemove.style.height = "20px";
            btnRemove.style.cursor = "pointer";
            btnRemove.addEventListener("click", () => {
                selectedFiles.splice(index, 1);
                renderPreview();
            });

            wrapper.appendChild(img);
            wrapper.appendChild(btnRemove);
            previewContainer.appendChild(wrapper);
        };
        reader.readAsDataURL(file);
    });
}

function limpiarFormulario() {
    brandInput.value = "";
    modelInput.value = "";
    yearInput.value = "";
    engineInput.value = "";
    kmInput.value = "";
    priceInput.value = "";
    descripcionInput.value = "";
    selectedFiles = [];
    renderPreview();
}