document.addEventListener("DOMContentLoaded", function() {
    const geneFilter = document.getElementById("gene-filter");
    const sortBy = document.getElementById("sort-by");
    const attackType = document.querySelectorAll('input[name="attack-type"]');
    const mutantContainers = document.querySelectorAll('.category');

    geneFilter.addEventListener("change", filterMutants);
    sortBy.addEventListener("change", sortMutants);
    attackType.forEach(radio => radio.addEventListener("change", filterMutants));

    function filterMutants() {
        const selectedGene = geneFilter.value;
        const selectedAttackType = document.querySelector('input[name="attack-type"]:checked').value;

        mutantContainers.forEach(container => {
            const mutants = container.querySelectorAll('.mutant');
            mutants.forEach(mutant => {
                const genes = mutant.querySelector('.mutant-stats').textContent.includes(selectedGene);
                const attackTypeMatch = mutant.querySelector('.mutant-stats').textContent.includes(selectedAttackType);
                
                if ((selectedGene === 'all' || genes) && (selectedAttackType === 'all' || attackTypeMatch)) {
                    mutant.style.display = 'block';
                } else {
                    mutant.style.display = 'none';
                }
            });
        });
    }

    function sortMutants() {
        const sortByValue = sortBy.value;

        mutantContainers.forEach(container => {
            const mutants = Array.from(container.querySelectorAll('.mutant'));
            mutants.sort((a, b) => {
                const aValue = parseInt(a.querySelector(`.mutant-stats:contains(${sortByValue})`).textContent.split(': ')[1]);
                const bValue = parseInt(b.querySelector(`.mutant-stats:contains(${sortByValue})`).textContent.split(': ')[1]);

                return bValue - aValue;
            });

            mutants.forEach(mutant => container.appendChild(mutant));
        });
    }
});
