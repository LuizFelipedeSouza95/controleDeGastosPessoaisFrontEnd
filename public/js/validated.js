async function signIn() {
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  const validate = { email, password };
  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validationEmail = regexEmail.test(validate.email);

  const errors = {
    email: false,
    password: false,
  };

  function hasErrors() {
    return Object.values(errors).some((error) => error === true);
  }

  function setError(field, message) {
    if (!errors[field]) {
      const errorDiv = document.getElementById(
        `returnError${field.charAt(0).toUpperCase() + field.slice(1)}Login`
      );
      const pError = document.createElement("p");
      pError.innerHTML = message;
      pError.className = "error";
      errorDiv.appendChild(pError);
      errors[field] = true;
    }
  }

  const errorDivs = document.querySelectorAll(".returnErrors");
  errorDivs.forEach((div) => {
    div.innerHTML = "";
  });

  if (email.trim() === "") {
    setError("email", "Enter a email");
  } else if (!validationEmail) {
    setError("email", "Enter a valid email");
  } else if (hasErrors()) {
    return;
  } else {
    const response = await fetch(
      `http://localhost:3000/searchUser?email=${email}`
    );
    const result = await response.json();
    const user = result[0];

    if (user == undefined) {
      setError("email", "email not found");
    } else if (user.password !== password) {
      setError("password", "Incorrect password");
    } else if (user.email === email && user.password === password) {

      const successDiv = document.getElementById("returnSuccessCreate");
      const pSuccess = document.createElement("p");
      pSuccess.id = "successMessage"
      pSuccess.innerHTML = "Successfully!";
      pSuccess.className = "success";
      successDiv.appendChild(pSuccess);

      const successMessage = document.getElementById("successMessage");
      const emailCreateInput = document.getElementById("emailLogin");
      const passwordCreateInput = document.getElementById("passwordLogin");

      if (emailCreateInput && passwordCreateInput) {
        emailCreateInput.value = "";
        passwordCreateInput.value = "";
      }

      setTimeout(function () {
        successDiv.removeChild(successMessage);
        window.location.href = `/spending/` + user.name;
      }, 1000);
    } else {
      console.log("nao passou");
    }
  }
}

document.addEventListener("formLogin", function () {
  el.addEventListener("submit", getContent, false);
});
