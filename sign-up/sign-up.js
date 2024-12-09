document.addEventListener("DOMContentLoaded", function () {
  const form = document.forms["sign-up"];
  const nameInput = form["name"];
  const usernameInput = form["username"];
  const phoneInput = form["phone"];
  const emailInput = form["email"];
  const passwordInput = form["password"];
  const errorContainer = document.createElement("div");
  errorContainer.style.color = "red";
  errorContainer.style.marginTop = "10px";

  form.addEventListener("submit", function (event) {
    let errors = [];

    if (!nameInput.value.trim()) {
      errors.push("Name is required.");
    } else if (!/^[a-zA-Z ]{2,}$/.test(nameInput.value)) {
      errors.push(
        "Name must contain only letters and spaces and be at least 2 characters long."
      );
    }

    if (!usernameInput.value.trim()) {
      errors.push("Username is required.");
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(usernameInput.value)) {
      errors.push(
        "Username must be 3-20 characters long and can only contain letters, numbers, and underscores."
      );
    }

    if (!phoneInput.value.trim()) {
      errors.push("Phone number is required.");
    } else if (!/^\+?[0-9]{7,15}$/.test(phoneInput.value)) {
      errors.push(
        "Phone number must contain only digits, optionally start with '+', and be 9-11 characters long."
      );
    }

    if (!emailInput.value.trim()) {
      errors.push("Email is required.");
    } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
      errors.push("Please enter a valid email address.");
    }

    if (!passwordInput.value.trim()) {
      errors.push("Password is required.");
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordInput.value)
    ) {
      errors.push(
        "Password must be at least 8 characters long and include at least one letter and one number."
      );
    }

    if (errors.length > 0) {
      event.preventDefault();
      errorContainer.innerHTML = errors.join("<br>");
      if (!form.contains(errorContainer)) {
        form.appendChild(errorContainer);
      }
    } else if (form.contains(errorContainer)) {
      form.removeChild(errorContainer);
    }
  });
});
