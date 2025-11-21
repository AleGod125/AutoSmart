import { savevehicule, signupApi, loguinApi, getPendingVehicles, approveVehicle, getVehicles,createSale, getSales } from "./data/Api.js";

export async function registerUser(name, email, password, phone) {

    if (!name || !email || !password) {
        throw new Error("Todos los campos son obligatorios");
    }
    if (phone && phone.length !== 10) {
        throw new Error("El teléfono debe tener 10 dígitos");
    }
    return await signupApi({
        name,
        email,
        password,
        phone
    });
}

export async function loginUser(email, password) {
    if (!email || !password) {
        throw new Error("Todos los campos son obligatorios");
    }
    return await loguinApi({
        email,
        password,
    });
}

export async function saveVehicule(data) {
    if (!data) {
        throw new Error("No se envió información del vehículo");
    }

    if (!data.images || data.images.length === 0) {
        throw new Error("Debe incluirse al menos una imagen");
    }

    return await savevehicule(data);
}

export function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = err => reject(err);
    });
}

export async function fetchPendingVehicles() {
    try {
        return await getPendingVehicles();
    } catch (error) {
        throw new Error("Error obteniendo vehículos pendientes");
    }
}

export async function fetchVehicles() {
    try {
        return await getVehicles();
    } catch (error) {
        throw new Error("Error obteniendo vehículos pendientes");
    }
}

export async function approveVehicule(id) {
    if (!id) throw new Error("ID del vehículo requerido");

    try {
        return await approveVehicle(id);
    } catch (error) {
        throw new Error("Error aprobando el vehículo");
    }
}


export async function fetchSales() {
    return await getSales();
}

export async function saveSale(data) {
    return await createSale(data);
}
