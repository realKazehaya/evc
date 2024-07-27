// Función para restablecer todos los campos del formulario
function resetForm() {
    // Restablecer los campos de nivel
    document.getElementById('current-level').value = '';
    document.getElementById('target-level').value = '';

    // Restablecer los campos de XP por combate y duración
    document.getElementById('xp-per-fight').value = '';
    document.getElementById('fight-duration').value = '';

    // Restablecer los orbes de XP a sus valores predeterminados
    document.querySelectorAll('.dropdown img').forEach((img) => {
        img.src = 'images/misc/xp7.png'; // Imagen predeterminada
        img.setAttribute('data-value', '0');
    });

    // Restablecer los consumibles
    document.querySelectorAll('.consumable').forEach(consumable => {
        consumable.style.filter = 'grayscale(100%)'; // Estado no seleccionado
        consumable.setAttribute('data-checked', 'false');
    });

    // Ocultar las advertencias
    document.querySelectorAll('.warning').forEach(warning => {
        warning.style.display = 'none';
    });
}

// Función para calcular XP
function XPCalc(lvl) {
    const excess = lvl - 177;
    return (excess > 0) ? arr[176] + excess * 81600 : arr[lvl - 1];
}

// Función para validar y calcular los resultados
function validateAndCalculate() {
    const currentLevel = parseInt(document.getElementById('current-level').value);
    const targetLevel = parseInt(document.getElementById('target-level').value);
    const xpPerFight = document.getElementById('xp-per-fight').value;
    const fightDuration = document.getElementById('fight-duration').value;
    
    const para = [currentLevel < 1, targetLevel <= currentLevel, xpPerFight < 0, fightDuration < 0];
    const displayIDs = ['current-warning', 'target-warning', 'xp-fight-warning', 'fight-duration-warning'];
    
    const any = (arr, fn = Boolean) => arr.some(fn);
    const invalid = any(para);
    
    for (let i = 0; i < 4; i++) {
        document.getElementById(displayIDs[i]).style.display = para[i] ? 'block' : 'none';
    }
    
    if (invalid) return;
    
    const doubleXp = document.getElementById('double-xp').getAttribute('data-checked') === 'true';
    const tripleXp = document.getElementById('triple-xp').getAttribute('data-checked') === 'true';
    
    let multiplier = 100 + doubleXp * 100 + tripleXp * 200;
    for (let i = 1; i < 4; i++) {
        multiplier += parseInt(document.getElementById('xp-orbs' + i).getAttribute('data-value'));
    }
    
    const totalXP = XPCalc(targetLevel) - XPCalc(currentLevel);
    const xpRequired = 'XP total requerido: ' + totalXP.toLocaleString() + ' XP';
    let fights = 0;
    const output = document.getElementById('modal-text');
    const n = "\r\n";
    let final = xpRequired;
    
    const mult = 'Multiplicador de XP: ' + Math.round(multiplier / 100 * 100) / 100 + 'x';
    final += n + mult;
    
    if (xpPerFight) {
        const xpBoosted = Math.floor(xpPerFight * (multiplier / 100));
        const xpWithBoost = 'XP ganado con aumentos: ' + xpBoosted.toLocaleString() + ' XP';
        fights = Math.ceil(totalXP / xpBoosted);
        const numberOfFights = 'Número de combates: ' + fights.toLocaleString();
        final += n + xpWithBoost + n + numberOfFights;
        
        if (fightDuration) {
            const time = fightDuration * fights;
            let hours = Math.floor(time / 3600);
            let minutes = Math.floor((time - (hours * 3600)) / 60);
            let seconds = time - (hours * 3600) - (minutes * 60);
            
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            
            final += n + 'Duración estimada: ' + hours + ':' + minutes + ':' + seconds;
        }
    }
    
    output.style.whiteSpace = "pre";
    output.textContent = final;
    document.getElementById("resultModal").style.display = "block";
}

// Función para alternar entre escala de grises y color
function toggleGreyscale(img) {
    if (img.getAttribute('data-checked') === 'false') {
        img.style.filter = 'none';
        img.setAttribute('data-checked', 'true');
    } else {
        img.style.filter = 'grayscale(100%)';
        img.setAttribute('data-checked', 'false');
    }
}

// Configurar eventos de la página
document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const dropdownImage = dropdown.querySelector('img');
        
        dropdownContent.addEventListener('click', function (event) {
            if (event.target.tagName === 'IMG') {
                const selectedValue = event.target.getAttribute('data-value');
                dropdownImage.src = event.target.src;
                dropdownContent.style.display = 'none';
                dropdownImage.setAttribute('data-value', selectedValue);
                
                const inputId = dropdown.getAttribute('data-input-id');
                const inputField = document.getElementById(inputId);
                
                if (inputField) {
                    inputField.value = selectedValue;
                }
            }
        });
        
        dropdown.addEventListener('mouseover', function () {
            dropdownContent.style.display = 'block';
        });
        
        dropdown.addEventListener('mouseout', function () {
            dropdownContent.style.display = 'none';
        });
    });
    
    document.getElementById('xp-form').addEventListener('submit', function (event) {
        event.preventDefault();
        validateAndCalculate();
    });
    
    document.querySelector('.close').addEventListener('click', function () {
        document.getElementById("resultModal").style.display = "none";
    });
    
    document.getElementById('clear-button').addEventListener('click', function () {
        resetForm();
    });
    
    const consumables = document.querySelectorAll('.consumable');
    
    consumables.forEach(consumable => {
        consumable.addEventListener('click', function () {
            toggleGreyscale(consumable);
        });
    });
});
