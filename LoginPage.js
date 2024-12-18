const validUsername = "exampleUser";
const validPassword = "examplePassword";


const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const usernameInput = document.getElementById("username").value;
        const passwordInput = document.getElementById("password").value;

        if (usernameInput === validUsername && passwordInput === validPassword) {
            window.location.href = "main.html";
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });
}