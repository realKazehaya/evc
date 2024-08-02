document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("admin-form");
    const mutantList = {
        mythic: document.getElementById("mythic"),
        galactic: document.getElementById("galactic"),
        zoomorph: document.getElementById("zoomorph"),
        saber: document.getElementById("saber"),
        necro: document.getElementById("necro"),
        cyber: document.getElementById("cyber")
    };

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const photo = document.getElementById("photo").value;
        const attack1 = document.getElementById("attack1").value;
        const damage1 = document.getElementById("damage1").value;
        const attack1Type = document.querySelector('input[name="attack1-type"]:checked').value;
        const attack2 = document.getElementById("attack2").value;
        const damage2 = document.getElementById("damage2").value;
        const attack2Type = document.querySelector('input[name="attack2-type"]:checked').value;
        const health = document.getElementById("health").value;
        const speed = document.getElementById("speed").value;
        const ability = document.getElementById("ability").value;
        const rarity = document.getElementById("rarity").value;
        const genes = Array.from(document.querySelectorAll('input[name="genes"]:checked')).map(gene => gene.value);
        const hybridizable = document.querySelector('input[name="hybridizable"]:checked').value;
        const category = genes.length > 1 ? "hybrid" : genes[0];

        const mutantElement = document.createElement("div");
        mutantElement.classList.add("mutant");
        mutantElement.innerHTML = `
            <img src="${photo}" alt="${name}">
            <h3>${name}</h3>
            <div class="mutant-stats"><label>Ataque 1:</label> ${attack1} (Daño: ${damage1}, Tipo: ${attack1Type})</div>
            <div class="mutant-stats"><label>Ataque 2:</label> ${attack2} (Daño: ${damage2}, Tipo: ${attack2Type})</div>
            <div class="mutant-stats"><label>Vida:</label> ${health}</div>
            <div class="mutant-stats"><label>Velocidad:</label> ${speed}</div>
            <div class="mutant-stats"><label>Habilidad:</label> ${ability}</div>
            <div class="mutant-stats"><label>Rareza:</label> ${rarity}</div>
            <div class="mutant-stats"><label>Genes:</label> ${genes.join(", ")}</div>
            <div class="mutant-stats"><label>Hibridación:</label> ${hybridizable}</div>
        `;

        if (category === "hybrid") {
            // Aquí puedes implementar la lógica para híbridos, si es necesario
            mutantList.mythic.appendChild(mutantElement);
        } else {
            mutantList[category].appendChild(mutantElement);
        }

        form.reset();
    });
});
