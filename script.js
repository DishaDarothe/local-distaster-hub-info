
document.getElementById("helpForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const location = document.getElementById("location").value.trim();
  const message = document.getElementById("help").value.trim(); // ✅ renamed

  if (!name || !location || !message) {
    document.getElementById("formMessage").style.color = "red";
    document.getElementById("formMessage").innerText = "⚠️ All fields are required!";
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:5000/api/submit", { // ✅ correct route
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, location, help: message }), // ✅ send 'help'
    });

    const data = await res.json();

    if (data.success) { // ✅ match backend response
      document.getElementById("formMessage").style.color = "green";
      document.getElementById("formMessage").innerText = "✅ Request submitted successfully!";
      document.getElementById("helpForm").reset();

      setTimeout(() => {
        window.location.href = "request-list.html"; // ✅ correct filename
      }, 2000);

    } else {
      document.getElementById("formMessage").style.color = "red";
      document.getElementById("formMessage").innerText = "❌ " + (data.error || "Submission failed");
    }
  } catch (err) {
    document.getElementById("formMessage").style.color = "red";
    document.getElementById("formMessage").innerText = "⚠️ Server error!";
    console.error(err);
  }
});
