const API_URL = "https://autosmartapi-1.onrender.com";

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
