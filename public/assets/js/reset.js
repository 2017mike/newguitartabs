document.getElementById("resetForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  let resetPasswordKey = params.key; // "some_value"
  console.log(resetPasswordKey);
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const newPassword = document.getElementById("password").value;
  const retypedPassword = document.getElementById("retypePassword").value;

  if (!email || !username || !newPassword || !retypedPassword) {
    alert("please fill in all of the information");
    return;
  }

  if (newPassword !== retypedPassword) {
    alert("passwords do not match");
    return;
  }

  const user = {
    email,
    username,
    newPassword,
    resetPasswordKey,
  };

  axios
    .put("/api/users/password", user)
    .then((res) => {
      console.log(res);
      alert(res.data);
      window.location = "/login";
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data);
    });
});
