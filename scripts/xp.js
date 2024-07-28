document.addEventListener('DOMContentLoaded', () => {
    // Rellenar los menús desplegables con imágenes de orbes de XP
    const xpImgUrls = [
        'https://mgg.autos/images/misc/xp0.png',
        'https://mgg.autos/images/misc/xp1.png',
        'https://mgg.autos/images/misc/xp2.png',
        'https://mgg.autos/images/misc/xp3.png',
        'https://mgg.autos/images/misc/xp4.png',
        'https://mgg.autos/images/misc/xp5.png',
        'https://mgg.autos/images/misc/xp6.png',
        'https://mgg.autos/images/misc/xp7.png'
    ];
    const xpPercent = [0, 10, 20, 30, 40, 50, 60, 70];

    [1, 2, 3].forEach((dropdownIndex) => {
        const dropdownContent = document.getElementById(`xp-orbs-dropdown${dropdownIndex}`);
        xpImgUrls.forEach((url, index) => {
            const img = document.createElement('img');
            img.src = url;
            img.setAttribute('data-value', xpPercent[index]);
            img.addEventListener('mouseover', () => img.style.filter = 'grayscale(0%)');
            img.addEventListener('mouseleave', () => img.style.filter = 'grayscale(100%)');
            img.addEventListener('click', () => {
                document.querySelector(`#xp-orbs${dropdownIndex}`).src = url;
                document.querySelector(`#xp-orbs${dropdownIndex}`).setAttribute('data-value', xpPercent[index]);
                dropdownContent.style.display = 'none';
            });
            dropdownContent.appendChild(img);
        });
    });

    // Funcionalidad del modal
    const modal = document.getElementById('resultModal');
    const closeBtn = document.querySelector('.modal .close');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Manejador de envío del formulario
    document.getElementById('xp-form').addEventListener('submit', (event) => {
        event.preventDefault();
        calculateXP();
    });
});

function calculateXP() {
    const currentLevel = parseInt(document.getElementById('current-level').value);
    const targetLevel = parseInt(document.getElementById('target-level').value);
    const xpPerFight = parseInt(document.getElementById('xp-per-fight').value);
    const fightDuration = parseInt(document.getElementById('fight-duration').value);

    if (isNaN(currentLevel) || isNaN(targetLevel) || isNaN(xpPerFight) || isNaN(fightDuration)) {
        return; // Manejar entradas no válidas
    }

    // Realizar lógica de cálculo de XP aquí
    const xpNeeded = calculateXpNeeded(currentLevel, targetLevel);
    const estimatedDuration = calculateEstimatedDuration(xpNeeded, xpPerFight, fightDuration);

    showModal(`XP Necesario: ${xpNeeded.toLocaleString()}<br>Duración Estimada: ${estimatedDuration.toFixed(2)} segundos`);
}

function calculateXpNeeded(currentLevel, targetLevel) {
    // Lógica de cálculo de XP
    return 0; // Marcador de posición
}

function calculateEstimatedDuration(xpNeeded, xpPerFight, fightDuration) {
    // Lógica de cálculo de duración
    return 0; // Marcador de posición
}

function showModal(message) {
    document.getElementById('modal-text').innerHTML = message;
    document.getElementById('resultModal').style.display = 'block';
}
