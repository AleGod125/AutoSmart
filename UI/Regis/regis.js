import { registerUser } from "/domain/ViewModel.js";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    try {
        const result = await registerUser(name, email, password, phone);

        alert("Usuario registrado con éxito");
        console.log(result);


    } catch (error) {
        console.log(error.message);
    }
});
