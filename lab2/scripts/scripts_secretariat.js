const container = document.getElementById("myDiv1");

fetch("../data/resources_secretariat.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Nothing works here, no need to look!");
        }
        return response.json();
    })
    .then(data => {
        const sec = data.secretariat;

        let htmlContent = `
            <h2>${sec.name}</h2>
            <h3>Location:</h3>
            <ul>
                <li>Building: ${sec.location.building}</li>
                <li>Floor: ${sec.location.floor}</li>
                <li>Address: ${sec.location.address}</li>
            </ul>
            <p><strong>Email:</strong> ${sec.contact.email}</p>
            <p><strong>Phone:</strong> ${sec.contact.phone}</p>
        `;

        htmlContent += `
            <h3>Schedule:</h3>
            <ul>
                <li>Mon‑Fri: ${sec.schedule.monday_friday}</li>
                <li>Saturday: ${sec.schedule.saturday}</li>
                <li>Sunday: ${sec.schedule.sunday}</li>
            </ul>
        `;

        htmlContent += "<h3>Services:</h3><ul>";
        sec.services.forEach(service => {
            htmlContent += `<li>${service}</li>`;
        });
        htmlContent += "</ul>";

        htmlContent += "<h3>Departments:</h3><ul>";
        sec.departments.forEach(dep => {
            htmlContent += `<li><strong>${dep.name}</strong>
                <br>Phone: ${dep.phone}
                <br>Email: ${dep.email}
            </li><br>`;
        });
        htmlContent += "</ul>";

        // staff list
        htmlContent += "<h3>Staff:</h3><ul>";
        sec.staff.forEach(st => {
            htmlContent += `<li><strong>${st.name}</strong> - ${st.position}
                <br>Email: ${st.email}
            </li><br>`;
        });
        htmlContent += "</ul>";

        // policies
        htmlContent += "<h3>Policies:</h3>";
        htmlContent += `<p>Visiting hours: ${sec.policies.visiting_hours}</p>`;
        htmlContent += "<ul>";
        sec.policies.requirements.forEach(req => {
            htmlContent += `<li>${req}</li>`;
        });
        htmlContent += "</ul>";

        // news
        htmlContent += "<h3>News:</h3><ul>";
        sec.news.forEach(n => {
            htmlContent += `<li>${n.date}: ${n.announcement}</li>`;
        });
        htmlContent += "</ul>";

        container.innerHTML = htmlContent;
    })
    .catch(err => {
        console.error("Failed to load secretariat data:", err);
        if (container) {
            container.innerHTML = "<p>Unable to load information at this time.</p>";
        }
    });