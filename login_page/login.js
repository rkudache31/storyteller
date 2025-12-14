document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailLoginBtn = document.getElementById('emailLoginBtn');
  const googleLoginBtn = document.getElementById('googleLoginBtn');

  // Function to validate email
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  emailLoginBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  if (!email || !password || !isValidEmail(email)) {
    // Shake the login card
    const card = document.querySelector('.login-card');
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 400);
    alert("Please enter valid credentials!");
    return;
  }

  
setTimeout(() => {
  window.location.href = "http://172.203.138.104";
}, 1500);



  googleLoginBtn.addEventListener('click', () => {
    alert("Google login clicked! Integrate Firebase here for real login.");
  });

  function toggleEmailButton() {
    if (emailInput.value.trim() && passwordInput.value) {
      emailLoginBtn.disabled = false;
      emailLoginBtn.style.opacity = "1";
    } else {
      emailLoginBtn.disabled = true;
      emailLoginBtn.style.opacity = "0.6";
    }
  }

  toggleEmailButton();
  emailInput.addEventListener('input', toggleEmailButton);
  passwordInput.addEventListener('input', toggleEmailButton);
})  });
