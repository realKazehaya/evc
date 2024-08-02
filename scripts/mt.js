document.addEventListener('DOMContentLoaded', function () {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vShAuoT87Pot71paYFaXCl6WF-pXq3C6qzi_g4CuUGLs0uZfp_OZEy2DzOWOtRMwifM9qQsfaTOt53p/pub?gid=1887495544&single=true&output=csv';
    const containerDiv = document.getElementById('container');
    const tableContainer = document.getElementById('tableCont');
    const columnDropdown = document.getElementById('columnDropdown');
    const valueDropdown = document.getElementById('valueDropdown');
    const applyFilterButton = document.getElementById('applyFilter');
    const filtersDiv = document.getElementById('filters');

    let filters = [];
    let tableData = [];
    let originalData = [];

    function populateTable(data) {
        console.log('Populating table with data:', data); // Agregado para verificar los datos
        const table = document.getElementById('dataTable');
        const thead = table.querySelector('thead');
        const tbody = table.querySelector('tbody');
        const columns = Object.keys(data[0]);

        thead.innerHTML = '';
        tbody.innerHTML = '';

        const headerRow = document.createElement('tr');
        columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col;
            th.setAttribute('data-column', col);
            th.addEventListener('click', () => sortTableByColumn(col));
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        data.forEach(row => {
            const tr = document.createElement('tr');
            columns.forEach(col => {
                const td = document.createElement('td');
                td.textContent = row[col];
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        applyStyles();
    }

    function applyStyles() {
        const rows = document.querySelectorAll('#dataTable tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                if (cell.textContent === 'Cyber') {
                    cell.classList.add('cyber');
                } else if (cell.textContent === 'Necro') {
                    cell.classList.add('necro');
                } else if (cell.textContent === 'Saber') {
                    cell.classList.add('saber');
                } else if (cell.textContent === 'Zoomorph') {
                    cell.classList.add('zoomorph');
                } else if (cell.textContent === 'Galactic') {
                    cell.classList.add('galactic');
                } else if (cell.textContent === 'Mythic') {
                    cell.classList.add('mythic');
                }
            });
        });
    }

    function sortTableByColumn(column) {
        let sortedData = [...tableData];
        const currentTh = document.querySelector(`th[data-column="${column}"]`);
        const isAscending = currentTh.classList.contains('sort-asc');

        sortedData.sort((a, b) => {
            if (a[column] < b[column]) return isAscending ? -1 : 1;
            if (a[column] > b[column]) return isAscending ? 1 : -1;
            return 0;
        });

        document.querySelectorAll('th').forEach(th => {
            th.classList.remove('sort-asc', 'sort-desc');
        });
        currentTh.classList.toggle('sort-asc', !isAscending);
        currentTh.classList.toggle('sort-desc', isAscending);

        populateTable(sortedData);
    }

    function populateDropdowns(data) {
        console.log('Populating dropdowns with data:', data); // Agregado para verificar los datos
        const columns = Object.keys(data[0]);

        columns.forEach(col => {
            const option = document.createElement('option');
            option.value = col;
            option.textContent = col;
            columnDropdown.appendChild(option);
        });

        columnDropdown.addEventListener('change', () => {
            const selectedColumn = columnDropdown.value;
            valueDropdown.innerHTML = '<option value="">Seleccionar Valor</option>';
            valueDropdown.disabled = !selectedColumn;
            applyFilterButton.disabled = true;

            if (selectedColumn) {
                const uniqueValues = [...new Set(data.map(item => item[selectedColumn]))];
                uniqueValues.forEach(val => {
                    const option = document.createElement('option');
                    option.value = val;
                    option.textContent = val;
                    valueDropdown.appendChild(option);
                });
            }
        });

        valueDropdown.addEventListener('change', () => {
            applyFilterButton.disabled = !valueDropdown.value;
        });

        applyFilterButton.addEventListener('click', () => {
            const selectedColumn = columnDropdown.value;
            const selectedValue = valueDropdown.value;
            filters.push({ column: selectedColumn, value: selectedValue });
            applyFilters();
        });
    }

    function applyFilters() {
        let filteredData = originalData;
        filtersDiv.innerHTML = '';

        filters.forEach(filter => {
            const filterBox = document.createElement('div');
            filterBox.classList.add('filter-box');
            filterBox.innerHTML = `<span>${filter.column}: ${filter.value}</span><button class="remove-filter">X</button>`;
            filtersDiv.appendChild(filterBox);

            filterBox.querySelector('.remove-filter').addEventListener('click', () => {
                filters = filters.filter(f => f !== filter);
                applyFilters();
            });

            filteredData = filteredData.filter(row => row[filter.column] === filter.value);
        });

        tableData = filteredData;
        populateTable(filteredData);
    }

    Papa.parse(csvUrl, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            console.log(results); // Agregado para verificar los resultados
            originalData = results.data;
            tableData = [...originalData];
            populateTable(tableData);
            populateDropdowns(tableData);
            tableContainer.style.display = 'block';
        }
    });
});
