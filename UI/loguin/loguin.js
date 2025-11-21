import { loginUser } from "/domain/ViewModel.js";
import { Iframe } from "/domain/UI.js";


const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const result = await loginUser(email, password);

        alert(`Bienvenido ${result.name}`);
        console.log("Login OK:", result);
        Iframe("UI/dasboard/dasboard.html")

        window.parent.postMessage({
            action: "setUser",
            user: {
                name: result.name,
                role: result.role
            }
        }, "*");

    } catch (error) {
        console.log("Error login:", error.message);
        alert("Email o contraseña incorrectos");
    }
});
