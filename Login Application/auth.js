document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      // Assuming your backend returns {accessToken, refreshToken}
      localStorage.setItem("jwtToken", data.jwtToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("username",data.username);
      localStorage.setItem("name",data.name);
      localStorage.setItem("role",data.role);

      console.log(localStorage.getItem("jwtToken"));
      console.log(localStorage.getItem("refreshToken"));
      console.log(localStorage.getItem("username"));
      console.log(localStorage.getItem("name"));
      console.log(localStorage.getItem("role"));

      if(data.role === "ADMIN")window.location.href="dashboard.html";
      else window.location.href="User.html";

    } else {
      document.getElementById("errorMsg").classList.remove("d-none");
    }
  } catch (err) {
    console.error("Error:", err);
    document.getElementById("errorMsg").classList.remove("d-none");
  }
});


