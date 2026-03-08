const container = document.getElementById("myDiv");
fetch("../data/resources_library.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Nothing works here, no need to look!");
        }
        return response.json();
    })
    .then(data => {
        const library = data.library;

        let htmlContent = `
            <h2>${library.name}</h2>
            <p><strong>Address:</strong> ${library.location.address}</p>
            <p><strong>Building:</strong> ${library.location.building}</p>
            <p><strong>Floor:</strong> ${library.location.floors}</p>
            <p><strong>Email:</strong> ${library.contact.email}</p>
            <p><strong>Phone:</strong> ${library.contact.phone}</p>
        `;

        htmlContent += `
            <h3>Schedule</h3>
            <ul>
                <li>Mon-Fri: ${library.schedule.monday_friday}</li>
                <li>Saturday: ${library.schedule.saturday}</li>
                <li>Sunday: ${library.schedule.sunday}</li>
            </ul>
        `;

        htmlContent += "<h3>Services</h3><ul>";
        library.services.forEach(service => {
            htmlContent += `<li>${service}</li>`;
        });
        htmlContent += "</ul>";

        htmlContent += "<h3>Books</h3><ul>";
        library.books.forEach(book => {
            htmlContent += `
                <li>
                    <strong>${book.title}</strong> by ${book.author}
                    <br>Available: ${book.available_copies}/${book.total_copies}
                    <br>Shelf: ${book.shelf_location}
                    <br>Category: ${book.category}
                </li>
                <br>
            `;
        });
        htmlContent += "</ul>";

        container.innerHTML = htmlContent;
    })
    .catch(err => {
        console.error("Failed to load library data:", err);
        if (container) {
            container.innerHTML = "<p>Unable to load library information.</p>";
        }
    });