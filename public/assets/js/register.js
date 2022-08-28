function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!email) {
    console.log(email);
    alert("you must have an email to sign up!");
    return;
  }
  if (username.length < 5) {
    alert("username must be at least 5 characters");
    return;
  }
  if (password.length < 8) {
    alert("password must be at least 8 characters to sign up");
    return;
  }

  if (!validateEmail(email)) {
    alert("email must have valid format to sign up");
    return;
  }

  axios
    .post("/api/users/register", {
      email,
      username,
      password,
    })
    .then((res) => {
      console.log(res);
      alert("account created!");
      window.location = "/login";
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 409) {
        alert(err.response.data);
        return;
      }

      alert("Sorry, there was a problem registering. Please try again later");
    });
});
