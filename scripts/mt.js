document.addEventListener('DOMContentLoaded', function () {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSrX65kNGw3u6SEuCXujnHInVDGJLyJL6OrSFBr_bkHQAqu1Ke69tDBiVWCGZ-jHcHV5bWwtp8UtoP7/pub?output=csv';

    const genes = {
        '': '',
        'Cyber': 'a',
        'Necro': 'b',
        'Saber': 'c',
        'Zoomorph': 'd',
        'Galactic': 'e',
        'Mythic': 'f'
    };

    const columnDropdown = document.getElementById('columnDropdown');
    const valueDropdown = document.getElementById('valueDropdown');
    const applyFilter = document.getElementById('applyFilter');
    const tableContainer = document.getElementById('tableCont');
    const filtersContainer = document.getElementById('filters');
    const dataTable = document.getElementById('dataTable');

    let allData = [];
    let filteredData = [];

    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function (results) {
            allData = results.data;
            populateDropdowns();
            initializeTable();
        }
    });

    function populateDropdowns() {
        const columns = Object.keys(allData[0]);
        columns.forEach(column => {
            const option = document.createElement('option');
            option.value = column;
            option.textContent = column;
            columnDropdown.appendChild(option);
        });
    }

    function initializeTable() {
        if (allData.length === 0) return;

        const headers = Object.keys(allData[0]);
        const thead = dataTable.querySelector('thead tr');
        const tbody = dataTable.querySelector('tbody');

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            th.addEventListener('click', () => sortTable(header));
            thead.appendChild(th);
        });

        populateTable(allData);

        columnDropdown.addEventListener('change', function () {
            const selectedColumn = this.value;
            const values = new Set(allData.map(row => row[selectedColumn]));
            valueDropdown.innerHTML = '<option value="">Select Value</option>';
            values.forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                valueDropdown.appendChild(option);
            });
            valueDropdown.disabled = !selectedColumn;
            applyFilter.disabled = !selectedColumn;
        });

        applyFilter.addEventListener('click', applyFilters);
    }

    function populateTable(data) {
        const tbody = dataTable.querySelector('tbody');
        tbody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }

    function sortTable(header) {
        const th = dataTable.querySelector(`th:contains(${header})`);
        const index = Array.from(th.parentNode.children).indexOf(th);
        const isAsc = th.classList.toggle('sort-asc');
        filteredData.sort((a, b) => {
            const aValue = a[header];
            const bValue = b[header];
            if (aValue < bValue) return isAsc ? -1 : 1;
            if (aValue > bValue) return isAsc ? 1 : -1;
            return 0;
        });
        populateTable(filteredData);
    }

    function applyFilters() {
        const selectedColumn = columnDropdown.value;
        const selectedValue = valueDropdown.value;
        if (selectedColumn && selectedValue) {
            filteredData = allData.filter(row => row[selectedColumn] === selectedValue);
        } else {
            filteredData = [...allData];
        }
        populateTable(filteredData);
    }

    function showLoading() {
        document.getElementById('loading').style.display = 'flex';
    }

    function hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }

    showLoading();
    Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: function (results) {
            allData = results.data;
            populateDropdowns();
            initializeTable();
            hideLoading();
        }
    });
});
