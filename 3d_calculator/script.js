let email = "";

function generateEmail() {
    let randomStr = Math.random().toString(36).substring(2, 10);
    email = randomStr + "@mail.tm";  // Using a temp mail domain

    document.getElementById("generated-email").textContent = email;
}

function checkInbox() {
    if (!email) {
        alert("Generate an email first!");
        return;
    }

    fetch(`https://api.mail.tm/messages`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer YOUR_API_KEY"
        }
    })
    .then(response => response.json())
    .then(data => {
        let inbox = document.getElementById("inbox");
        inbox.innerHTML = "";

        if (data.length === 0) {
            inbox.innerHTML = "<p>No new emails.</p>";
            return;
        }

        data.forEach(msg => {
            let emailContent = document.createElement("div");
            emailContent.innerHTML = `<strong>From:</strong> ${msg.from.address}<br>
                                      <strong>Subject:</strong> ${msg.subject}<br>
                                      <p>${msg.text}</p>`;
            inbox.appendChild(emailContent);
        });
    })
    .catch(error => console.error("Error fetching inbox:", error));
}
