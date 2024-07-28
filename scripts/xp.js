        const arr = [0, 5, 125, 265, 425, 785, 1385, 2265, 3225, 4395, 5795, 7295, 9055, 10925, 13085, 15555, 18155, 20885, 23965, 27185, 30785, 34535, 38695, 43015, 47495, 52425, 57525, 63105, 68865, 74805, 81265, 87915, 94755, 102155, 109755, 117555, 125955, 134565, 143385, 152905, 162595, 172540, 183340, 194320, 205570, 217000, 229000, 241240, 253720, 266970, 280470, 294220, 308220, 323040, 338140, 353480, 369080, 385775, 402680, 419900, 438160, 456750, 475230, 494370, 513840, 533850, 554150, 574740, 595620, 617520, 639720, 663120, 686880, 711880, 737255, 763905, 790945, 819430, 848185, 878425, 908945, 940990, 973470, 1007370, 1041720, 1077525, 1113795, 1151715, 1189955, 1229885, 1270145, 1312135, 1354635, 1397475, 1442100, 1487075, 1532575, 1579915, 1627615, 1675855, 1725805, 1776310, 1827370, 1878800, 1930785, 1983140, 2036050, 2089515, 2143350, 2197740, 2252500, 2307815, 2363685, 2419925, 2476720, 2533885, 2591605, 2649880, 2708525, 2767725, 2827295, 2887420, 2948100, 3009150, 3070755, 3134405, 3198625, 3263415, 3328585, 3394325, 3460445, 3527135, 3594395, 3662035, 3730245, 3798835, 3867995, 3937725, 4007835, 4078515, 4149575, 4221205, 4293405, 4365985, 4439135, 4512665, 4586765, 4661435, 4736485, 4812105, 4888105, 4966690, 5045860, 5125420, 5204980, 5284540, 5364100, 5443660, 5523220, 5602780, 5682340, 5761900, 5841460, 5921020, 6000580, 6080140, 6159700, 6239260, 6318820, 6398380, 6477940, 6557500, 6637060, 6716620, 6796180, 6875740, 6957340];
        var xpImg = "https://mgg.autos/images/misc/xp";
        var xpPercent = [10,40,80,120,150,200,300,0];
        for(var d = 1; d < 4; d++){
            for(var i = 0; i < 8; i++){
                var elem = document.createElement("img");
                elem.setAttribute("src", xpImg + i + '.png');
                elem.setAttribute("data-value", xpPercent[i]);
                document.getElementById("xp-orbs-dropdown"+d).appendChild(elem);
            }
        }
        document.addEventListener('DOMContentLoaded', function() {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                const dropdownImage = dropdown.querySelector('img');
                dropdownContent.addEventListener('click', function(event) {
                    if(event.target.tagName === 'IMG'){
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
            const consumableImages = document.querySelectorAll('.consumable');
            consumableImages.forEach(img => {
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
            }
            window.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            }
            function XPCalc(lvl){
                var excess = lvl - 177;
                return (excess > 0) ? arr[176] + excess*81600 : arr[lvl-1];
            }
            function validateAndCalculate() {
                var currentLevel = parseInt(document.getElementById('current-level').value);
                var targetLevel = parseInt(document.getElementById('target-level').value);
                var xpPerFight = document.getElementById('xp-per-fight').value;
                var fightDuration = document.getElementById('fight-duration').value;
                var para = [currentLevel < 1, targetLevel <= currentLevel, xpPerFight < 0, fightDuration < 0];
                var displayIDs = ['current-warning', 'target-warning', 'xp-fight-warning', 'fight-duration-warning'];
                const any = (arr, fn = Boolean) => arr.some(fn);
                let invalid = any(para);
                for(var i = 0; i < 4; i++){
                    document.getElementById(displayIDs[i]).style.display = para[i] ? 'block': 'none';
                }
                if (invalid) return;
                const doubleXp = document.getElementById('double-xp').getAttribute('data-checked') === 'true';
                const tripleXp = document.getElementById('triple-xp').getAttribute('data-checked') === 'true';
                let multiplier = 100 + doubleXp * 100 + tripleXp * 200;
                for (var i = 1; i < 4; i++) {
                    multiplier += parseInt(document.getElementById('xp-orbs' + i).getAttribute('data-value'));
                }
                const totalXP = XPCalc(targetLevel) - XPCalc(currentLevel);
                const xpRequired = 'Total XP required: ' + totalXP.toLocaleString() + ' XP';
                var fights = 0;
                var output = document.getElementById('modal-text');
                var n = "\r\n";
                var final = xpRequired;
                let mult = 'XP Multiplier: ' + Math.round(multiplier/100 * 100)/100 + 'x';
                final += n + mult;
                if(xpPerFight){
                    let xpBoosted = Math.floor(xpPerFight * (multiplier / 100));
                    let xpWithBoost = 'XP earned with boosts: ' + xpBoosted.toLocaleString() + ' XP';
                    let fights = Math.ceil(totalXP/xpBoosted);
                    let numberOfFights = 'Number of fights: ' + fights.toLocaleString();
                    final += n + xpWithBoost + n + numberOfFights;
                    if(fightDuration){
                        var time = fightDuration*fights;
                        var hours = Math.floor(time/3600);
                        var minutes = Math.floor((time-(hours*3600)) / 60);
                        var seconds = time - (hours * 3600) - (minutes * 60);
                        if(hours < 10){
                            hours = "0"+hours;
                        }
                        if(minutes < 10){
                            minutes = "0"+minutes;
                        }
                        if(seconds < 10){
                            seconds = "0"+seconds;
                        }
                        final += n + 'Estimated duration: ' + hours + ':' + minutes + ':' + seconds;
                    }
                }
                output.style.whiteSpace = "pre";
                output.textContent = final;
                modal.style.display = "block";
            }
        });
