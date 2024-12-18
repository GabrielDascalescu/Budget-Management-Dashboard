const forgotPasswordForm = document.getElementById("forgotPasswordForm");
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        if (validateEmail()) {
            const email = document.getElementById("email").value;
            try{
                const response = await fetch("upload.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `email=${encodeURIComponent(email)}`,
                });
                const result = await response.text();
                alert(result)
                forgotPasswordForm.reset();
            } catch(error){
                alert("An error occurred while sending the request.")
            };
        }
    });
}


function validateEmail() {
    const emailInput = document.getElementById("email").value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailInput)) {
        alert("Please enter a valid email address with a correct domain (e.g., .com, .net, .org).");
        return false; 
    }
    return true;
}
