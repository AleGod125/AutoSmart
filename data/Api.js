const API_URL = "https://autosmartapi.onrender.com";

export async function signupApi(data) {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error en el registro");
    }

    return response.json();
}

export async function loguinApi(data) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error en el login");
    }

    return response.json();
}

export async function savevehicule(data) {
    const response = await fetch(`${API_URL}/vehicles/saveVehicule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error guardando vehículo");
    }

    return response.json();
}

export async function getPendingVehicles() {
    const response = await fetch(`${API_URL}/vehicles/pending`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error obteniendo vehículos pendientes");
    }

    return response.json();
}

export async function getVehicles() {
    const response = await fetch(`${API_URL}/vehicles/inventario`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error obteniendo vehículos pendientes");
    }

    return response.json();
}

export async function approveVehicle(id) {
    const response = await fetch(`${API_URL}/vehicles/approve/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error aprobando vehículo");
    }

    return response.json();
}

export async function createSale(data) {
    const response = await fetch(`${API_URL}/sales/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Error creando venta");
    }

    return response.json();
}

export async function getSales() {
    const response = await fetch(`${API_URL}/sales/all`);
    return response.json();
}
