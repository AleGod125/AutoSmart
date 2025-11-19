import { signupApi } from "/data/authApi.js";

export async function registerUser(name, email, password, phone) {

    if (!name || !email || !password) {
        throw new Error("Todos los campos son obligatorios");
    }

    if (phone && phone.length !== 10) {
        throw new Error("El teléfono debe tener 10 dígitos");
    }

    // Llamada al API (capa data)
    return await signupApi({
        name,
        email,
        password,
        phone
    });
}
