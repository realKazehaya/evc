document.addEventListener('DOMContentLoaded', function () {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSrX65kNGw3u6SEuCXujnHInVDGJLyJL6OrSFBr_bkHQAqu1Ke69tDBiVWCGZ-jHcHV5bWwtp8UtoP7/pub?output=csv';

    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function (results) {
            const data = results.data;
            const columnDropdown = document.getElementById('columnDropdown');
            const valueDropdown = document.getElementById('valueDropdown');
            const applyFilterButton = document.getElementById('applyFilter');
            const filtersContainer = document.getElementById('filters');
            const tableContainer = document.getElementById('tableCont');
            const table = document.getElementById('dataTable');
            const tableHead = table.querySelector('thead tr');
            const tableBody = table.querySelector('tbody');
            const headers = results.meta.fields;

            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                tableHead.appendChild(th);

                const option = document.createElement('option');
                option.value = header;
                option.textContent = header;
                columnDropdown.appendChild(option);
            });

            columnDropdown.addEventListener('change', function () {
                const selectedColumn = columnDropdown.value;
                valueDropdown.innerHTML = '<option value="">Seleccionar Valor</option>';

                if (selectedColumn) {
                    const uniqueValues = [...new Set(data.map(item => item[selectedColumn]))];

                    uniqueValues.forEach(value => {
                        const option = document.createElement('option');
                        option.value = value;
                        option.textContent = value;
                        valueDropdown.appendChild(option);
                    });

                    valueDropdown.disabled = false;
                } else {
                    valueDropdown.disabled = true;
                }

                applyFilterButton.disabled = !selectedColumn || !valueDropdown.value;
            });

            valueDropdown.addEventListener('change', function () {
                applyFilterButton.disabled = !valueDropdown.value;
            });

            applyFilterButton.addEventListener('click', function () {
                const selectedColumn = columnDropdown.value;
                const selectedValue = valueDropdown.value;

                addFilter(selectedColumn, selectedValue);
            });

            function addFilter(column, value) {
                const filterBox = document.createElement('div');
                filterBox.classList.add('filter-box');
                filterBox.innerHTML = `<span>${column}: ${value}</span><button class="remove-filter">X</button>`;

                filtersContainer.appendChild(filterBox);

                filterBox.querySelector('.remove-filter').addEventListener('click', function () {
                    filtersContainer.removeChild(filterBox);
                    applyFilters();
                });

                applyFilters();
            }

            function applyFilters() {
                const activeFilters = Array.from(filtersContainer.querySelectorAll('.filter-box')).map(filterBox => {
                    const [column, value] = filterBox.querySelector('span').textContent.split(': ');
                    return { column, value };
                });

                const filteredData = data.filter(item => {
                    return activeFilters.every(filter => item[filter.column] === filter.value);
                });

                renderTable(filteredData);
            }

            function renderTable(data) {
                tableBody.innerHTML = '';

                data.forEach(item => {
                    const row = document.createElement('tr');
                    headers.forEach(header => {
                        const cell = document.createElement('td');
                        cell.textContent = item[header];
                        row.appendChild(cell);
                    });
                    tableBody.appendChild(row);
                });

                tableContainer.style.display = data.length > 0 ? 'block' : 'none';
            }

            renderTable(data);

            // Hide loading animation when done
            document.getElementById('loading').style.display = 'none';
        }
    });

    document.getElementById('columnDropdown').addEventListener('change', function () {
        document.getElementById('valueDropdown').disabled = !this.value;
        document.getElementById('applyFilter').disabled = !(this.value && document.getElementById('valueDropdown').value);
    });

    document.getElementById('valueDropdown').addEventListener('change', function () {
        document.getElementById('applyFilter').disabled = !this.value;
    });

    document.getElementById('applyFilter').addEventListener('click', function () {
        const column = document.getElementById('columnDropdown').value;
        const value = document.getElementById('valueDropdown').value;
        addFilter(column, value);
    });

    function addFilter(column, value) {
        const filterBox = document.createElement('div');
        filterBox.classList.add('filter-box');
        filterBox.innerHTML = `<span>${column}: ${value}</span><button class="remove-filter">X</button>`;
        document.getElementById('filters').appendChild(filterBox);

        filterBox.querySelector('.remove-filter').addEventListener('click', function () {
            this.parentNode.remove();
            applyFilters();
        });

        applyFilters();
    }

    function applyFilters() {
        const filters = Array.from(document.getElementsByClassName('filter-box')).map(filterBox => {
            const text = filterBox.querySelector('span').textContent;
            const [column, value] = text.split(': ');
            return { column, value };
        });

        Papa.parse(csvUrl, {
            download: true,
            header: true,
            complete: function (results) {
                const data = results.data;
                const filteredData = data.filter(row => {
                    return filters.every(filter => row[filter.column] === filter.value);
                });
                renderTable(filteredData);
            }
        });
    }

    function renderTable(data) {
        const table = document.getElementById('dataTable');
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        data.forEach(row => {
            const tr = document.createElement('tr');
            for (const key in row) {
                const td = document.createElement('td');
                td.textContent = row[key];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });

        document.getElementById('tableCont').style.display = data.length > 0 ? 'block' : 'none';
    }
});
