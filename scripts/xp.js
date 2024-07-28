document.addEventListener('DOMContentLoaded', () => {
    const xpOrbs1 = document.getElementById('xp-orbs1');
    const xpOrbs2 = document.getElementById('xp-orbs2');
    const xpOrbs3 = document.getElementById('xp-orbs3');
    const xpOrbsDropdown1 = document.getElementById('xp-orbs-dropdown1');
    const xpOrbsDropdown2 = document.getElementById('xp-orbs-dropdown2');
    const xpOrbsDropdown3 = document.getElementById('xp-orbs-dropdown3');

    const xpOrbsOptions = [1, 5, 10, 20, 50, 100];

    function createDropdownContent(dropdown, targetImg) {
        xpOrbsOptions.forEach(value => {
            const img = document.createElement('img');
            img.src = "main/images/misc/xp7.png";
            img.dataset.value = value;
            img.alt = `${value} XP`;
            img.addEventListener('click', () => {
                targetImg.dataset.value = value;
                targetImg.src = img.src;
                dropdown.style.display = 'none';
            });
            dropdown.appendChild(img);
        });
    }

    createDropdownContent(xpOrbsDropdown1, xpOrbs1);
    createDropdownContent(xpOrbsDropdown2, xpOrbs2);
    createDropdownContent(xpOrbsDropdown3, xpOrbs3);

    const consumables = document.querySelectorAll('.consumable');
    consumables.forEach(consumable => {
        consumable.addEventListener('click', () => {
            const isChecked = consumable.dataset.checked === 'true';
            consumable.dataset.checked = isChecked ? 'false' : 'true';
            consumable.style.filter = isChecked ? 'grayscale(100%)' : 'none';
        });
    });

    const form = document.getElementById('xp-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const currentLevel = parseInt(document.getElementById('current-level').value);
        const targetLevel = parseInt(document.getElementById('target-level').value);
        const xpOrbs1Value = parseInt(xpOrbs1.dataset.value);
        const xpOrbs2Value = parseInt(xpOrbs2.dataset.value);
        const xpOrbs3Value = parseInt(xpOrbs3.dataset.value);
        const xpPerFight = parseInt(document.getElementById('xp-per-fight').value) || 0;
        const fightDuration = parseInt(document.getElementById('fight-duration').value) || 0;

        let doubleXp = document.getElementById('double-xp').dataset.checked === 'true';
        let tripleXp = document.getElementById('triple-xp').dataset.checked === 'true';

        if (targetLevel <= currentLevel) {
            document.getElementById('target-warning').style.display = 'block';
            return;
        } else {
            document.getElementById('target-warning').style.display = 'none';
        }

        if (currentLevel < 1) {
            document.getElementById('current-warning').style.display = 'block';
            return;
        } else {
            document.getElementById('current-warning').style.display = 'none';
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

        let xpNeeded = (targetLevel - currentLevel) * (xpPerFight + xpOrbs1Value + xpOrbs2Value + xpOrbs3Value);
        if (doubleXp) xpNeeded *= 2;
        if (tripleXp) xpNeeded *= 3;

        let resultText = `You need ${xpNeeded} XP to reach level ${targetLevel}.`;
        if (fightDuration > 0) {
            let fightsNeeded = Math.ceil(xpNeeded / xpPerFight);
            let totalTime = fightsNeeded * fightDuration;
            let minutes = Math.floor(totalTime / 60);
            let seconds = totalTime % 60;
            resultText += ` This will take approximately ${minutes} minutes and ${seconds} seconds.`;
        }

        showResult(resultText);
    });

    function showResult(text) {
        const modal = document.getElementById('resultModal');
        const modalText = document.getElementById('modal-text');
        const closeBtn = document.querySelector('.close');

        modalText.textContent = text;
        modal.style.display = 'block';

        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
});
