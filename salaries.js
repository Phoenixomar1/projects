// Get elements
let name = document.getElementById('name');
let basic = document.getElementById('basic');
let bonus = document.getElementById('bonus');
let deductions = document.getElementById('deductions');
let total = document.getElementById('total');
let department = document.getElementById('department');
let submit = document.getElementById('submit');
let searchName = document.getElementById('searchName');
let searchDepartment = document.getElementById('searchDepartment');

let mood = 'create';
let tmp;

// Calculate total salary
function getTotal() {
    if (basic.value != '') {
        let result = (+basic.value + +bonus.value) - +deductions.value;
        total.innerHTML = result;
    } else {
        total.innerHTML = '';
    }
}

// Create or update salary entry
let dataSalaries = localStorage.salary != null ? JSON.parse(localStorage.salary) : [];

submit.onclick = function () {
    let newData = {
        name: name.value,
        basic: basic.value,
        bonus: bonus.value,
        deductions: deductions.value,
        total: total.innerHTML,
        department: department.value
    };
    
    if (mood === 'create') {
        dataSalaries.push(newData);
    } else {
        dataSalaries[tmp] = newData;
        mood = 'create';
        submit.innerHTML = 'Create';
    }

    localStorage.setItem('salary', JSON.stringify(dataSalaries));
    clearData();
    showData();
};

// Clear input fields
function clearData() {
    name.value = '';
    basic.value = '';
    bonus.value = '';
    deductions.value = '';
    total.innerHTML = '';
    department.value = '';
}

// Show salary data
function showData() {
    let table = '';
    for (let i = 0; i < dataSalaries.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataSalaries[i].name}</td>
                <td>${dataSalaries[i].basic}</td>
                <td>${dataSalaries[i].bonus}</td>
                <td>${dataSalaries[i].deductions}</td>
                <td>${dataSalaries[i].total}</td>
                <td>${dataSalaries[i].department}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;

    let clearAll = document.getElementById('clearAlldata');
    clearAll.innerHTML = dataSalaries.length > 0 ? `<button onclick="clearAllData()">Clear All (${dataSalaries.length})</button>` : '';
}

// Delete salary entry
function deleteData(i) {
    dataSalaries.splice(i, 1);
    localStorage.setItem('salary', JSON.stringify(dataSalaries));
    showData();
}

// Clear all salary entries
function clearAllData() {
    dataSalaries = [];
    localStorage.setItem('salary', JSON.stringify(dataSalaries));
    showData();
}

// Update salary entry
function updateData(i) {
    name.value = dataSalaries[i].name;
    basic.value = dataSalaries[i].basic;
    bonus.value = dataSalaries[i].bonus;
    deductions.value = dataSalaries[i].deductions;
    department.value = dataSalaries[i].department;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    getTotal();
}

// Initial display of data
showData();
