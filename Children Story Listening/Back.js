const logMsg = document.getElementById("log-msg");

function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        showMessage("Please enter email and password!", false);
    } else if (email === "demo@kid.com" && password === "1234") {
        showMessage("Login successful! Redirecting to stories... 🎉", true);
        setTimeout(() => {
            window.location.href = "http://172.203.138.104";
        }, 2000);
    } else {
        showMessage("Oops! Wrong email or password", false);
    }
}

function loginGoogle() {
    showMessage("Google login demo! Redirecting... 🎈", true);
    setTimeout(() => {
        window.location.href = "http://172.203.138.104";
    }, 2000);
}

function showMessage(message, success) {
    logMsg.style.display = "block";
    logMsg.textContent = message;
    logMsg.classList.remove("login-success", "login-error");
    logMsg.classList.add(success ? "login-success" : "login-error");
}
