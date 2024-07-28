document.addEventListener('DOMContentLoaded', function() {
    const xpImg = "https://mgg.autos/images/misc/xp";
    const xpPercent = [10, 40, 80, 120, 150, 200, 300, 0];

    for (let d = 1; d < 4; d++) {
        for (let i = 0; i < 8; i++) {
            let elem = document.createElement("img");
            elem.setAttribute("src", xpImg + i + '.png');
            elem.setAttribute("data-value", xpPercent[i]);
            document.getElementById("xp-orbs-dropdown" + d).appendChild(elem);
        }
    }

    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const dropdownImage = dropdown.querySelector('img');

        dropdownContent.addEventListener('click', function(event) {
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

        dropdown.addEventListener('mouseover', function() {
            dropdownContent.style.display = 'block';
        });

        dropdown.addEventListener('mouseleave', function() {
            dropdownContent.style.display = 'none';
        });
    });

    function toggleGreyscale(img) { // Greyscale
        if (img.getAttribute('data-checked') === 'false') {
            img.style.filter = 'none';
            img.setAttribute('data-checked', 'true');
        } else {
            img.style.filter = 'grayscale(100%)';
            img.setAttribute('data-checked', 'false');
        }
    }

    document.querySelectorAll('.consumable').forEach(img => {
        img.addEventListener('click', function() {
            toggleGreyscale(img);
        });
    });

    document.getElementById('xp-form').addEventListener('submit', function(event) {
        event.preventDefault();
        validateAndCalculate();
    });

    const modal = document.getElementById("resultModal");
    const closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    function XPCalc(lvl) {
        const excess = lvl - 177;
        return (excess > 0) ? arr[176] + excess * 81600 : arr[lvl - 1];
    }

    function validateAndCalculate() {
        const currentLevel = parseInt(document.getElementById('current-level').value);
        const targetLevel = parseInt(document.getElementById('target-level').value);
        const xpPerFight = parseInt(document.getElementById('xp-per-fight').value) || 0;
        const fightDuration = parseInt(document.getElementById('fight-duration').value) || 0;

        const para = [currentLevel < 1, targetLevel <= currentLevel, xpPerFight < 0, fightDuration < 0];
        const displayIDs = ['current-warning', 'target-warning', 'xp-fight-warning', 'fight-duration-warning'];
        const any = (arr, fn = Boolean) => arr.some(fn);
        const invalid = any(para);
        
        displayIDs.forEach((id, index) => {
            document.getElementById(id).style.display = para[index] ? 'block' : 'none';
        });
        
        if (invalid) return;

        const doubleXp = document.getElementById('double-xp').getAttribute('data-checked') === 'true';
        const tripleXp = document.getElementById('triple-xp').getAttribute('data-checked') === 'true';
        let multiplier = 100 + (doubleXp ? 100 : 0) + (tripleXp ? 200 : 0);

        for (let i = 1; i < 4; i++) {
            multiplier += parseInt(document.getElementById('xp-orbs' + i).getAttribute('data-value'));
        }

        const totalXP = XPCalc(targetLevel) - XPCalc(currentLevel);
        const xpRequired = 'Total XP required: ' + totalXP.toLocaleString() + ' XP';
        let fights = 0;
        let output = document.getElementById('modal-text');
        let n = "\r\n";
        let final = xpRequired;
        let mult = 'XP Multiplier: ' + Math.round(multiplier / 100 * 100) / 100 + 'x';
        final += n + mult;

        if (xpPerFight) {
            let xpBoosted = Math.floor(xpPerFight * (multiplier / 100));
            let xpWithBoost = 'XP earned with boosts: ' + xpBoosted.toLocaleString() + ' XP';
            fights = Math.ceil(totalXP / xpBoosted);
            let numberOfFights = 'Number of fights: ' + fights.toLocaleString();
            final += n + xpWithBoost + n + numberOfFights;

            if (fightDuration) {
                const time = fightDuration * fights;
                const hours = Math.floor(time / 3600);
                const minutes = Math.floor((time - (hours * 3600)) / 60);
                const seconds = time - (hours * 3600) - (minutes * 60);
                final += n + 'Estimated duration: ' + [hours, minutes, seconds].map(num => num < 10 ? '0' + num : num).join(':');
            }
        }

        output.style.whiteSpace = "pre";
        output.textContent = final;
        modal.style.display = "block";
    }
});
