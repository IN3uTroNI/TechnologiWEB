const container = document.getElementById("dive");
fetch("../data/resources_cafeteria.json")
    .then(response => {
        if(!response.ok) {
            throw new Error("Nothing works here, no need to look!");
        }
        return response.json();
    })
    .then(data => {
        const cafeteria = data.cafeteria;

        let htmlContent = `
            <h2>${cafeteria.name}</h2>
            <h3>Location: </h3>
            <ul>
                <li>Building: ${cafeteria.location.building}</li> 
                <li>Floor: ${cafeteria.location.floor}</li> 
                <li>Addres: ${cafeteria.location.addres}</li> 
            </ul>
            <p><strong>Email: ${cafeteria.contact.email}</p>
            <p><strong>Phone: ${cafeteria.contact.phone}</p>
        `;

        htmlContent += `
            <h3>Schedule: </h3>
            <ul>
                <li>Mionday - Friday: ${cafeteria.schedule.monday_friday}</li>
                <li>Saturday: ${cafeteria.schedule.saturday}</li>
                <li>Sunday: ${cafeteria.schedule.sunday}</li>
            </ul>
        `

        htmlContent += "<h3>Services</h3><ul>";
        cafeteria.services.forEach(service =>{
            htmlContent += `<li>${service}</li>`
        });
        htmlContent += "</ul>";

        htmlContent += "<h3>Menu: </h3>";
        htmlContent += "<h3>Breakfest: </h3><ul>";
        cafeteria.menu.breakfast.forEach(food =>{
            htmlContent += `<li>id: ${food.id}
                <br>Name: ${food.name}
                <br>Price: ${food.price} ${food.currency}         
                <br>Este mancarea: ${food.available}        
            </li>
            <br>`
        });
        htmlContent += "</ul>";

        htmlContent += "<h3>Main Courses: </h3><ul>";
        cafeteria.menu.main_courses.forEach(food =>{
            htmlContent += `<li>id: ${food.id}
                <br>Name: ${food.name}
                <br>Price: ${food.price} ${food.currency}         
                <br>Este mancarea: ${food.available}        
            </li>
            <br>`
        });
        htmlContent += "</ul>";

        htmlContent += "<h3>Drinks: </h3><ul>";
        cafeteria.menu.drinks.forEach(food =>{
            htmlContent += `<li>id: ${food.id}
                <br>Name: ${food.name}
                <br>Price: ${food.price} ${food.currency}         
                <br>Este mancarea: ${food.available}        
            </li>
            <br>`
        });
        htmlContent += "</ul>";

        container.innerHTML = htmlContent;
    });