const arr = [0, 5, 125, 625, 3125, 15625, 78125, 390625, 1953125, 9765625, 48828125, 244140625, 1220703125];

function populateDropdown(dropdownId, max) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = '';
    arr.slice(0, max + 1).forEach((value, index) => {
        const img = document.createElement('img');
        img.src = `https://mgg.autos/images/misc/xp${index + 1}.png`;
        img.dataset.value = value;
        img.alt = `${value} XP`;
        img.onclick = () => {
            const orbElement = document.getElementById(dropdownId.slice(0, -10));
            orbElement.dataset.value = value;
            orbElement.src = img.src; // Actualiza la imagen del orbe
            dropdown.style.display = 'none'; // Cierra el dropdown
        };
        dropdown.appendChild(img);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateDropdown('xp-orbs-dropdown1', 5);
    populateDropdown('xp-orbs-dropdown2', 5);
    populateDropdown('xp-orbs-dropdown3', 5);
    
    document.querySelectorAll('.consumable').forEach(el => {
        el.addEventListener('click', () => {
            el.dataset.checked = el.dataset.checked === 'true' ? 'false' : 'true';
            el.style.filter = el.dataset.checked === 'true' ? 'none' : 'grayscale(100%)';
        });
    });

    const form = document.getElementById('xp-form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        
        const currentLevel = parseInt(document.getElementById('current-level').value);
        const targetLevel = parseInt(document.getElementById('target-level').value);
        const xpPerFight = parseInt(document.getElementById('xp-per-fight').value) || 0;
        const fightDuration = parseInt(document.getElementById('fight-duration').value) || 0;
        
        if (currentLevel < 1) {
            document.getElementById('current-warning').style.display = 'block';
            return;
        } else {
            document.getElementById('current-warning').style.display = 'none';
        }
        
        if (targetLevel <= currentLevel) {
            document.getElementById('target-warning').style.display = 'block';
            return;
        } else {
            document.getElementById('target-warning').style.display = 'none';
        }
        
        if (xpPerFight < 0) {
            document.getElementById('xp-fight-warning').style.display = 'block';
            return;
        } else {
            document.getElementById('xp-fight-warning').style.display = 'none';
        }
        
        if (fightDuration < 0) {
            document.getElementById('fight-duration-warning').style.display = 'block';
            return;
        } else {
            document.getElementById('fight-duration-warning').style.display = 'none';
        }
        
        const xpOrbs = [
            parseInt(document.getElementById('xp-orbs1').dataset.value),
            parseInt(document.getElementById('xp-orbs2').dataset.value),
            parseInt(document.getElementById('xp-orbs3').dataset.value),
        ];
        
        const doubleXp = document.getElementById('double-xp').dataset.checked === 'true';
        const tripleXp = document.getElementById('triple-xp').dataset.checked === 'true';
        
        let totalXp = 0;
        for (let i = currentLevel; i < targetLevel; i++) {
            totalXp += xpOrbs[i % 3];
        }
        
        if (doubleXp) totalXp *= 2;
        if (tripleXp) totalXp *= 3;
        
        const fightsNeeded = Math.ceil(totalXp / xpPerFight);
        const timeNeeded = fightsNeeded * fightDuration;
        
        const resultModal = document.getElementById('resultModal');
        const modalText = document.getElementById('modal-text');
        modalText.textContent = `Necesitas ${fightsNeeded} combates y ${timeNeeded} segundos para alcanzar el Nivel ${targetLevel}.`;
        resultModal.style.display = 'block';
        
        document.querySelector('.close').onclick = () => {
            resultModal.style.display = 'none';
        };
        
        window.onclick = (event) => {
            if (event.target === resultModal) {
                resultModal.style.display = 'none';
            }
        };
    });
});
